// Importo bibliotecas
const express = require("express");
const {
    getFeed
} = require("../controllers/feed.controller");

// Declaro constantes
const router = express.Router();

// Rutas
router.get("/user/:id", getFeed);

// Exportar módulo
module.exports = router;