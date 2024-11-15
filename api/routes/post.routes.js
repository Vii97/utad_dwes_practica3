// Importo bibliotecas
const express = require("express");
const {
    getPost,
    getPostByID,
    createPost,
    updatePost,
    deletePost
} = require("../controllers/post.controller");

// Declaro constantes
const router = express.Router();

// Rutas
router.get("/", getPost);
router.get("/:id", getPostByID);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

// Exportar módulo
module.exports = router;