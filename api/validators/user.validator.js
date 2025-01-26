// Importo bibliotecas externas e internas
const { check } = require("express-validator");
const { validateResults } = require("../utils/handleValidator.util");

// Validador para POST users
const validatorCreateUser = [
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
// Validador para GET, GetByID y para borrados
const validatorGetUser = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

// Validador para PUT (Añado optional porque ese campo puede cambiar o no)
const validatorChangeUser = [
    check("username").notEmpty().isLength({min: 3, max: 15}).optional(),
    check("fullname").notEmpty().isLength({min: 3, max: 99}).optional(),
    check("description").notEmpty().optional(),
    check("email").isEmail().optional(),
    check("profile_pic").notEmpty().optional(),
    check("pwd").notEmpty().isLength({min: 8, max: 15}).optional(),

    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

// Exportar módulo
module.exports = {
    validatorCreateUser,
    validatorGetUser,
    validatorChangeUser
}