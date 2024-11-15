// Importo bibliotecas
const express = require("express");
const {
    getUser,
    getUserByID,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/user.controller");

// Declaro constantes
const router = express.Router();

// Rutas
router.get("/", getUser);
router.get("/:id", getUserByID);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// Exportar módulo
module.exports = router;