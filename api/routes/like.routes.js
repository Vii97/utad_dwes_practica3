// Importo bibliotecas
const express = require("express");
const {
    getLike,
    getLikeByID,
    createLike,
    updateLike,
    deleteLike
} = require("../controllers/like.controller");

// Declaro constantes
const router = express.Router();

// Rutas
router.get("/", getLike);
router.get("/:id", getLikeByID);
router.post("/", createLike);
router.put("/:id", updateLike);
router.delete("/:id", deleteLike);

// Exportar módulo
module.exports = router;