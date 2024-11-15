// Importo Bibliotecas
const mongoose = require('mongoose');

// Nombre de la tabla en SQL
const PostScheme = new mongoose.Schema(
    {
            user:  {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            txt:  {
                type: String
            },
            img:  {
                type: String
            }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

// Exporto el módulo
module.exports = mongoose.model("post", PostScheme)