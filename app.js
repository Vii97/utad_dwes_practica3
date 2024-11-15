// Importo bibliotecas
const express = require("express");
const cors = require("cors");

// Cargo el fichero de entorno
require("dotenv").config();

// Conexión con la base de datos
const mongooseDBConnect = require("./api/config/mongodb.config");

// Declaro la constante de Express
const app = express();

// Middlewares: uso cors para evitar errores de Cross-Domain (XD)
app.use(cors())
app.use(express.json())
app.use("/api", require("./api/routes/index"))

// Inicio el servidor ejecutando la app de Express
const API_PORT = process.env.API_PORT || 3000;
app.listen(API_PORT, () => {
    console.log(`Server listening on port ${API_PORT}...`);
    console.log(`Attempting to connect to MongoDB...`);
    mongooseDBConnect();
});