// Para estandarizar las respuestas y comprobar errores

// Declaración de constantes para manejar errores

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;

const INTERNAL_SERVER_ERROR = 500;

// Funciones
const handleHTTPResponse = (res, message, content = {}) => {
    res.send({
        "ERROR": false,
        "MESSAGE": message,
        "CONTENT": content
    });
}

const handleHTTPError = (res, message, code = BAD_REQUEST) => {
    res.status(code).send({
        "ERROR": false,
        "MESSAGE": message
    });
}

// Exportar módulo
module.exports = {
    BAD_REQUEST,
    UNAUTHORIZED,
    NOT_FOUND,

    INTERNAL_SERVER_ERROR,

    handleHTTPResponse,
    handleHTTPError
}