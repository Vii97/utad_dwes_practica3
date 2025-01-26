// Importo bibliotecas
const express = require("express");
const {
    getLike,
    getLikeByID,
    createLike,
    updateLike,
    deleteLike
} = require("../controllers/like.controller");

// Uso validadores en las rutas
const { validatorLike } = require("../validators/like.validator");

// Declaro constantes
const router = express.Router();

/**
 * @swagger
 * /api/like:
 *   get:
 *     summary: Obtiene todos los likes
 *     responses:
 *       200:
 *         description: Lista de likes
 */
router.get("/", validatorLike, getLike);

/**
 * @swagger
 * /api/like/{id}:
 *   get:
 *     summary: Obtiene un like por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del like a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Like encontrado
 *       404:
 *         description: Like no encontrado
 */
router.get("/:id", validatorLike, getLikeByID);

/**
 * @swagger
 * /api/like:
 *   post:
 *     summary: Crea un nuevo like
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_liking:
 *                 type: string
 *                 example: "ID del usuario que da like"
 *               liked:
 *                 type: string
 *                 example: "ID del post que recibe el like"
 *     responses:
 *       201:
 *         description: Like creado exitosamente
 *       400:
 *         description: Error en la creación del like
 */
router.post("/", validatorLike, createLike);

/**
 * @swagger
 * /api/like/{id}:
 *   put:
 *     summary: Actualiza un like existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del like a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_liking:
 *                 type: string
 *                 example: "ID del usuario que da like"
 *               liked:
 *                 type: string
 *                 example: "ID del post que recibe el like"
 *     responses:
 *       200:
 *         description: Like actualizado exitosamente
 *       404:
 *         description: Like no encontrado
 */
router.put("/:id", validatorLike, updateLike);

/**
 * @swagger
 * /api/like/{id}:
 *   delete:
 *     summary: Elimina un like
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del like a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Like eliminado exitosamente
 *       404:
 *         description: Like no encontrado
 */
router.delete("/:id", validatorLike, deleteLike);

// Exportar módulo
module.exports = router;