// Importo bibliotecas
const express = require('express');
const {
    getPost,
    getPostByID,
    createPost,
    updatePost,
    deletePost,
    uploadImg
} = require('../controllers/post.controller');

// Uso validadores en las rutas
const { validatorGetPost, validatorCreatePost, validatorChangePost } = require("../validators/post.validator");

// Declaro constantes
const router = express.Router();
const authMiddleware = require("../middlewares/session.middleware.js");
const uploadMiddleware = require('../utils/handleStorage.util.js');

/**
 * @swagger
 * /api/post:
 *   get:
 *     summary: Obtiene todos los posts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de posts
 */
router.get("/", authMiddleware, validatorGetPost, getPost);

/**
 * @swagger
 * /api/post/{id}:
 *   get:
 *     summary: Obtiene un post por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del post a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post encontrado
 *       404:
 *         description: Post no encontrado
 */
router.get("/:id", authMiddleware, validatorGetPost, getPostByID);


/**
 * @swagger
 * /api/post:
 *   post:
 *     summary: Crea un nuevo post
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/post'
 *     responses:
 *       201:
 *         description: Post creado exitosamente
 *       400:
 *         description: Error en la creación del post
 */
router.post("/", authMiddleware, validatorCreatePost, createPost);

/**
 * @swagger
 * /api/post/{id}:
 *   put:
 *     summary: Actualiza un post existente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del post a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/post'
 *     responses:
 *       200:
 *         description: Post actualizado exitosamente
 *       404:
 *         description: Post no encontrado
 */
router.put("/:id", authMiddleware, validatorChangePost, updatePost);

/**
 * @swagger
 * /api/post/{id}:
 *   delete:
 *     summary: Elimina un post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del post a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post eliminado exitosamente
 *       404:
 *         description: Post no encontrado
 */
router.delete("/:id", authMiddleware, validatorGetPost, deletePost);

router.post("/images", uploadMiddleware.single("img"), uploadImg);

// Exportar módulo
module.exports = router;