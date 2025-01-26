// Para manejar validadores

// Importo bibliotecas externas e internas
const { validationResult } = require("express-validator");
const { handleHTTPError } = require("./handleResponse.util");

// Funciones
const validateResults = (req, res, next) => {
    try{
        validationResult(req).throw();
        return next();
    } catch (error){
        handleHTTPError(res, "No validation data");
    }
}

//Exportar módulo
module.exports = {
    validateResults
};
