// Importo bibliotecas
const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");
const { validatorRegister, validatorLogin } = require("../validators/auth.validator");

const router = express.Router();

router.post("/register", validatorRegister, registerUser);

router.post("/login", validatorLogin, loginUser);

// Exportar módulo
module.exports = router;

