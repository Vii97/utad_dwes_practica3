// Importo bibliotecas
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const https = require("https");
const { Server } = require("socket.io");
const dotenv = require("dotenv");

// Cargo el fichero de entorno
dotenv.config();

// Conexión con la base de datos
const mongooseDBConnect = require("./api/config/mongodb.config");

// Declaro la constante de Express
const app = express();

// Uso los ficheros estáticos del cliente
app.use(express.static(path.join(__dirname, 'client')));

// Middlewares: uso cors para evitar errores de Cross-Domain (XD)
app.use(cors());
app.use(express.json());
app.use("/api", require("./api/routes/index"));

// Ruta principal para servir el archivo HTML del cliente
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Configuración del servidor HTTPS
const options = {
    key: fs.readFileSync(path.join(__dirname, "cert/localhost-key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert/localhost.pem"))
};

const server = https.createServer(options, app);
const io = new Server(server);

// Configuración de Socket.io
const configureSocket = require("./server/socket");
configureSocket(io);

// Inicio el servidor ejecutando la app de Express
const API_PORT = process.env.API_PORT || 4000;
server.listen(API_PORT, () => {
    console.log(`Server listening on port ${API_PORT}...`);
    console.log(`Attempting to connect to MongoDB...`);
    mongooseDBConnect();
});