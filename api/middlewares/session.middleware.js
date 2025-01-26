const { handleHTTPError, UNAUTHORIZED } = require("../utils/handleResponse.util");
const { verifyToken } = require("../utils/handle.JWT.util");
const userModel = require("../models/nosql/user.model");

// Autenticación
const authMiddleware = async (req, res, next) => {
    try{
        if(!req.headers.authorization){
            handleHTTPError(res,"NOT_TOKEN", UNAUTHORIZED);
            return;
        }

        const token = req.headers.authorization.split(' ').pop();

        const tokenData = verifyToken(token);
        if(!tokenData){
            handleHTTPError(res, "NOT_PAYLOAD_DATA");
            return;
        }

        const query = {
            _id: tokenData._id
        }

        const user = await userModel.findOne(query);
        req.user = user;

        next();


    } catch(error){
        console.log("ERROR[session.middleware / authMiddleware]:\n" + error);
        handleHTTPError(res,"NOT_SESSION", UNAUTHORIZED);
    }
}

// Exportar módulo
module.exports = authMiddleware;
