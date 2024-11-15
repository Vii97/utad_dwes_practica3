// Importo Bibliotecas
const mongoose = require('mongoose');

// Nombre de la tabla en SQL
const UserScheme = new mongoose.Schema(
    {
            username: {
                type: String
            },
            fullname: {
                type: String
            },
            description:  {
                type: String
            },
            email:  {
                type: String
            },
            profile_pic:  {
                type: String
            },
            pwd:  {
                type: String
            }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

// Exporto el módulo
module.exports = mongoose.model("user", UserScheme)