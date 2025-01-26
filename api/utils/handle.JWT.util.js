// Importar bibliotecas
const jwt = require("jsonwebtoken");

// Constantes
const JWT_SECRET = process.env.JWT_SECRET;
const NORMAL_TOKENS_EXPIRATION = "2h";

// Funciones
const tokenSign = (user) => {
    const sign = jwt.sign(
        {
            _id: user._id,
            rol: user.rol
        },
        JWT_SECRET,
        {
            expiresIn: NORMAL_TOKENS_EXPIRATION
        }
    );
    return sign;
}

const verifyToken = (JWTToken) => {
    try{
        return jwt.verify(JWTToken, JWT_SECRET);
    }
    catch(error){
        console.log(`ERROR [handleJWT.util / verifyToken]: ${error}`);
    }
}

// Exportar módulo
module.exports = {
    tokenSign,
    verifyToken
}