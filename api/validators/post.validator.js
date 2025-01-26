// Importo bibliotecas externas e internas
const { check } = require("express-validator");
const { validateResults } = require("../utils/handleValidator.util");

// Validador para POST posts
const validatorCreatePost = [
    check("user").exists().notEmpty().isMongoId(),
    check("txt").exists().notEmpty().isLength({min: 1, max: 99}),
    check("img").exists().notEmpty(),

    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

// Validador para GET, GetByID y para borrados
const validatorGetPost = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

// Validador para PUT
const validatorChangePost = [
    check("user").exists().notEmpty().isMongoId(),
    check("txt").optional().notEmpty().isLength({min: 1, max: 99}),
    check("img").optional().notEmpty(),

    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

// Exportar módulo
module.exports = {
    validatorCreatePost,
    validatorGetPost,
    validatorChangePost
}