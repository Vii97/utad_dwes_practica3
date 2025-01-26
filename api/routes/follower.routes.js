// Importo bibliotecas
const express = require("express");
const {
    getFollower,
    getFollowerByID,
    createFollower,
    updateFollower,
    deleteFollower
} = require("../controllers/follower.controller");

// Uso validadores en las rutas
const { validatorFollower } = require("../validators/follower.validator")

// Declaro constantes
const router = express.Router();

/**
 * @swagger
 * /api/follower:
 *   get:
 *     summary: Obtiene todos los seguidores
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de seguidores
 */
router.get("/", validatorFollower, getFollower);

/**
 * @swagger
 * /api/follower/{id}:
 *   get:
 *     summary: Obtiene un follower por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del follower a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Follower encontrado
 *       404:
 *         description: Follower no encontrado
 */
router.get("/:id", validatorFollower, getFollowerByID);

/**
 * @swagger
 * /api/follower:
 *   post:
 *     summary: Crea un nuevo follower
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               following:
 *                 type: string
 *                 example: "ID del usuario que sigue"
 *               followed:
 *                 type: string
 *                 example: "ID del usuario seguido"
 *     responses:
 *       201:
 *         description: Follower creado exitosamente
 *       400:
 *         description: Error en la creación del follower
 */
router.post("/", validatorFollower, createFollower);

/**
 * @swagger
 * /api/follower/{id}:
 *   put:
 *     summary: Actualiza un follower existente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del follower a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               following:
 *                 type: string
 *                 example: "ID del usuario que sigue"
 *               followed:
 *                 type: string
 *                 example: "ID del usuario seguido"
 *     responses:
 *       200:
 *         description: Follower actualizado exitosamente
 *       404:
 *         description: Follower no encontrado
 */
router.put("/:id", validatorFollower, updateFollower);

/**
 * @swagger
 * /api/follower/{id}:
 *   delete:
 *     summary: Elimina un follower
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del follower a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Follower eliminado exitosamente
 *       404:
 *         description: Follower no encontrado
 */
router.delete("/:id", validatorFollower, deleteFollower);

// Exportar módulo
module.exports = router;