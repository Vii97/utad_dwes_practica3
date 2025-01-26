// Importo Bibliotecas
const mongoose = require('mongoose');

// Nombre de la tabla en SQL
const LikeScheme = new mongoose.Schema(
    {
            user_liking:  {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            liked:  {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post',
                required: true
            }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

// Exporto el módulo
module.exports = mongoose.model("Like", LikeScheme)