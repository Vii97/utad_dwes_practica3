const { handleHTTPError, handleHTTPResponse, FORBIDDEN, INTERNAL_SERVER_ERROR } = require("../utils/handleResponse.util");

// Ver rol
const checkRol = (roles) => (req, res, next) => {
    try{
        const { user } = req;
        const userRol = user.role;

        const checkValueRol = roles.includes(userRol);
        if(!checkRol){
            handleHTTPError(res, "NOT_ALLOWED", FORBIDDEN);
            return;
        }
        next();
    } catch(error){
        console.log("ERROR [rol.middleware / checkRol]:\n"+ error);
        handleHTTPError(res, "ERROR_PERMISSIONS", INTERNAL_SERVER_ERROR);
    }
}

// Exportar módulos
module.exports = checkRol;

// checkRol([“admin”])