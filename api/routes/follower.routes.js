// Importo bibliotecas
const express = require("express");
const {
    getFollower,
    getFollowerByID,
    createFollower,
    updateFollower,
    deleteFollower
} = require("../controllers/follower.controller");

// Declaro constantes
const router = express.Router();

// Rutas
router.get("/", getFollower);
router.get("/:id", getFollowerByID);
router.post("/", createFollower);
router.put("/:id", updateFollower);
router.delete("/:id", deleteFollower);

// Exportar módulo
module.exports = router;