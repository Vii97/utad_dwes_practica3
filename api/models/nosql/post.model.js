// Importo Bibliotecas
const mongoose = require('mongoose');

// Nombre de la tabla en SQL
const PostScheme = new mongoose.Schema(
    {
            user:  {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            txt:  {
                type: String,
                required: true
            },
            img:  {
                type: String,
                default: ''
            }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

// Exporto el módulo
module.exports = mongoose.model("Post", PostScheme)