// Importo Bibliotecas
const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

// Nombre de la tabla en SQL
const UserScheme = new mongoose.Schema(
    {
            username: {
                type: String,
                required: true,
                unique: true,
                lowercase: true
            },
            fullname: {
                type: String,
                required: true
            },
            description:  {
                type: String,
                default: ""
            },
            email:  {
                type: String,
                required: true,
                unique: true,
                lowercase: true
            },
            profile_pic:  {
                type: String,
                default: ""
            },
            pwd:  {
                type: String,
                required: true
            }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

// Borrado lógico
UserScheme.plugin(mongoose_delete, { overrideMethods: "all" });

// Exporto el módulo
module.exports = mongoose.model("User", UserScheme)