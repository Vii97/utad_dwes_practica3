// Importo bibliotecas
const express = require("express");
const cors = require("cors");

// Cargo el fichero de entorno
require("dotenv").config();

// Conexión con la base de datos
const mongooseDBConnect = require("./api/config/mongodb.config");

// Conexión con Slack y Discord
const morganBody = require("morgan-body");
const { IncomingWebhook } = require("@slack/webhook");
const { WebhookClient } = require('discord.js');

const { INTERNAL_SERVER_ERROR } = process.env.SLACK_WEBHOOK;

const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK;
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK;

const webhook  = new IncomingWebhook(SLACK_WEBHOOK);
const discordWebhook = new WebhookClient({ url: DISCORD_WEBHOOK });

const loggerStream = {
    write: message => {
        // Slack
        webhook.send({
            text: message
        });
        // Discord
        discordWebhook.send({
            content: message
        });
    }
};

// Swagger
const swaggerUI = require("swagger-ui-express");
const swaggerSpecs = require("./api/docs/swagger.docs");

// Declaro la constante de Express
const app = express();

// Middlewares: uso cors para evitar errores de Cross-Domain (XD)
app.use(cors())
app.use(express.json())

// Añado la documentación Swagger
app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpecs)
);

// Añado las rutas
app.use("/api", require("./api/routes/index"))

// Añado el middleware para ficheros
app.use(express.static("./api/storage"));

// Inicio el servidor ejecutando la app de Express
const API_PORT = process.env.API_PORT || 3000;
app.listen(API_PORT, () => {
    console.log(`Server listening on port ${API_PORT}...`);
    console.log(`Attempting to connect to MongoDB...`);
    mongooseDBConnect();
});

// Inicialización del logger a Slack (código de respuesta >= 500)
morganBody(app, {
    noColors: true,
    skip: function(req, res){
        return res.statusCode < INTERNAL_SERVER_ERROR
    },
    stream: loggerStream
});

// Exportar app para el testing
module.exports = app;