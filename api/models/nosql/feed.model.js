// Importo Bibliotecas
const mongoose = require('mongoose');

// Nombre de la tabla en SQL
const FeedScheme = new mongoose.Schema(
    {
            type: String
    },
    {
        timestamps: true,
        versionKey: false
    }
)

// Exporto el módulo
module.exports = mongoose.model("feed", FeedScheme)