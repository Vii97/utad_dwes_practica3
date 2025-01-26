// Importo Bibliotecas
const mongoose = require('mongoose');

// Nombre de la tabla en SQL
const FollowerScheme = new mongoose.Schema(
    {
            following:  {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true

            },
            followed: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

// Exporto el módulo
module.exports = mongoose.model("Follower", FollowerScheme)