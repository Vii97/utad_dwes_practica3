// Importo bibliotecas
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const https = require("https");
const dotenv = require("dotenv");
const { Server } = require("socket.io");

// Cargo el fichero de entorno
dotenv.config();

// Declaro la constante de Express
const app = express();

// Uso los ficheros estáticos
app.use(express.static(path.join(__dirname, '../client')));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Swagger
const swaggerUI = require("swagger-ui-express");
const swaggerSpecs = require("./api/docs/swagger.docs");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

// Añado las rutas
app.use("/api", require("./api/routes/index"));

// Añado el middleware para ficheros
app.use(express.static("./api/storage"));

// Ruta principal
app.get("/", (req, res) => {
    res.send("API OK");
});

// Configuración del servidor HTTPS
const options = {
    key: fs.readFileSync(path.join(__dirname, "cert/localhost-key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert/localhost.pem"))
};

const server = https.createServer(options, app);
const io = new Server(server);

// Conexión con la base de datos
const mongooseDBConnect = require("./api/config/mongodb.config");

// Conexión con Slack y Discord
const morganBody = require("morgan-body");
const { IncomingWebhook } = require("@slack/webhook");
const { WebhookClient } = require('discord.js');

const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK;
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK;
const INTERNAL_SERVER_ERROR = process.env.INTERNAL_SERVER_ERROR;

const webhook = new IncomingWebhook(SLACK_WEBHOOK);
const discordWebhook = new WebhookClient({ url: DISCORD_WEBHOOK });

const loggerStream = {
    write: message => {
        webhook.send({ text: message });
        discordWebhook.send({ content: message });
    }
};

morganBody(app, {
    noColors: true,
    skip: (req, res) => res.statusCode < INTERNAL_SERVER_ERROR,
    stream: loggerStream
});

// CHAT
const messages = [];
const MAX_MESSAGES = 100;
const users = new Map();

// Socket.io
io.on('connection', async (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    // Obtener token
    const token = socket.handshake.query.token; 

    // Verificar el token
    const tokenData = verifyToken(token);
    if (!tokenData) {
        console.log(`Conexión rechazada: ${socket.id} (token inválido)`);
        socket.emit("auth_error", "Token no válido o no proporcionado");
        socket.disconnect(); // Desconectar si no es válido
        return;
    }

    // Buscar el usuario en la base de datos
    const user = await userModel.findOne({ _id: tokenData._id });
    if (!user) {
        console.log(`Conexión rechazada: ${socket.id} (usuario no encontrado)`);
        socket.emit("auth_error", "Usuario no encontrado");
        socket.disconnect();
        return;
    }

    console.log(`Usuario autenticado: ${user.username}`);

    // Asignar el nombre de usuario a la conexión del socket
    users.set(socket.id, user.username);

    socket.emit('users', Object.fromEntries(users));

    // Enviar los últimos mensajes
    messages.forEach(msg => {
        socket.emit('groupMessage', msg);
    });

    // Manejo del registro de usuario
    socket.on('register', (username) => {
        socket.emit('notification', `Bienvenido, ${username}!`);
        socket.broadcast.emit('notification', `${username} se ha unido al chat`);
        io.emit('users', Object.fromEntries(users));
    });

    // Manejo de mensajes de grupo
    socket.on('groupMessage', (message) => {
        const username = users.get(socket.id);
        if (!username) return;

        const msg = { user: username, message, timestamp: Date.now() };
        messages.push(msg);

        // Máximo de mensajes
        if (messages.length > MAX_MESSAGES) {
            messages.shift();
        }

        io.emit('groupMessage', msg);
    });

    // Desconexión
    socket.on('disconnect', () => {
        const username = users.get(socket.id);
        if (username) {
            users.delete(socket.id);
            io.emit('notification', `${username} se ha ido del chat`);
            io.emit('users', Object.fromEntries(users));
        }
        console.log(`Usuario desconectado: ${socket.id}`);
    });
});

// Inicio el servidor ejecutando la app de Express (cambiado al puerto 4000)
const API_PORT = process.env.API_PORT || 4000; 
server.listen(API_PORT, () => {
    console.log(`Server listening on port ${API_PORT}...`);
    console.log(`Attempting to connect to MongoDB...`);
    mongooseDBConnect();
});

// Exportar app para el testing
module.exports = app;