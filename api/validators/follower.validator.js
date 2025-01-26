// Importo bibliotecas externas e internas
const { check } = require("express-validator");
const { validateResults } = require("../utils/handleValidator.util");

// Validador para followers
const validatorFollower = [
    check("following").exists().notEmpty().isMongoId(),
    check("followed").exists().notEmpty().isMongoId(),

    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

// Exportar módulo
module.exports = {
    validatorFollower
}