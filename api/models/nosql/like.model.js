// Importo Bibliotecas
const mongoose = require('mongoose');

// Nombre de la tabla en SQL
const LikeScheme = new mongoose.Schema(
    {
            user_liking:  {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            liked:  {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post'
            }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

// Exporto el módulo
module.exports = mongoose.model("like", LikeScheme)