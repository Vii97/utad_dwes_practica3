// Para el hashing de contraseñas

// Importo bibliotecas
const bcryptjs = require("bcryptjs");

// Defino constantes
const SALT_ROUNDS = 10;

// Funciones
const hashPassword = async (pwd) => {
    const hash = await bcryptjs.hash(pwd, SALT_ROUNDS);
    return hash;
}

// Comparo la contraseña con su hash 
const comparePassword = async (pwd, hash) => {
    const result = await bcryptjs.compare(pwd, hash);
    return result;
}

// Exportar módulo
module.exports = {
    hashPassword,
    comparePassword
}