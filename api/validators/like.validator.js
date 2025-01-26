// Importo bibliotecas externas e internas
const { check } = require("express-validator");
const { validateResults } = require("../utils/handleValidator.util");

// Validador para likes
const validatorLike = [
    check("user_liking").exists().notEmpty().isMongoId(),
    check("liked").exists().notEmpty().isMongoId(),

    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

// Exportar módulo
module.exports = {
    validatorLike
}