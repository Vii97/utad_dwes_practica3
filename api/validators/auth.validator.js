// Importo bibliotecas externas e internas
const { check } = require("express-validator");
const { validateResults } = require("../utils/handleValidator.util");

// Validador para registrar users
const validatorRegister = [
    check("username").exists().notEmpty().isLength({min: 3, max: 15}),
    check("fullname").exists().notEmpty().isLength({min: 3, max: 99}),
    check("description").exists().notEmpty(),
    check("email").exists().isEmail(),
    check("profile_pic").exists().notEmpty(),
    check("pwd").exists().notEmpty().isLength({min: 8, max: 15}),

    (req, res, next) => {
        return validateResults(req, res, next);
    }
];
// Validador para login de users
const validatorLogin = [
    check("email").exists().notEmpty().isEmail(),
    check("pwd").exists().notEmpty().isLength({min: 8, max: 15}),

    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

// Exportar módulo
module.exports = {
    validatorRegister,
    validatorLogin
}