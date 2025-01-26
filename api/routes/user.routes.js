// Importo bibliotecas
const express = require("express");
const {
    getUser,
    getUserByID,
    createUser,
    updateUser,
    archiveUser,
    deleteUser
} = require("../controllers/user.controller");

// Uso validadores en las rutas
const { validatorGetUser, validatorCreateUser, validatorChangeUser } = require("../validators/user.validator.js");

const authMiddleware = require("../middlewares/session.middleware.js");

// Declaro constantes
const router = express.Router();

// Importo el middleware para subir imágenes
const uploadMiddleware = require("../utils/handleStorage.util");

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/", authMiddleware, getUser);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/:id", authMiddleware, validatorGetUser, getUserByID);

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Crea un nuevo usuario
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error en la creación del usuario
 */
router.post("/", authMiddleware, validatorCreateUser, createUser);

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user' 
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.put("/:id", authMiddleware, validatorChangeUser, updateUser);

/**
 * @swagger
 * /api/user/logical/{id}:
 *   delete:
 *     summary: Archiva un usuario (borrado lógico)
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario a archivar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario archivado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete("/logical/:id", authMiddleware, archiveUser, validatorGetUser);

/**
 * @swagger
 * /api/user/physical/{id}:
 *   delete:
 *     summary: Elimina un usuario (borrado físico)
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete("/physical/:id", authMiddleware, deleteUser, validatorGetUser);

// Exportar módulo
module.exports = router;