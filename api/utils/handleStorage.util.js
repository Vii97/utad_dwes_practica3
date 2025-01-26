// Importo bibliotecas
const multer = require('multer');
const path = require('path'); // Importa el módulo 'path' para manejar rutas

// Función callback
const storage = multer.diskStorage({
    destination: function(req, file, callBack) {
        // Corrige la ruta de destino
        const pathStorage = path.join(__dirname, "../storage"); // Usa path.join para construir la ruta
        console.log("Ruta de destino:", pathStorage);
        callBack(null, pathStorage);
    },

    filename: function(req, file, callBack) {
        const ext = file.originalname.split(".").pop();
        const filename = "file-" + Date.now() + "." + ext;
        callBack(null, filename);
    }
});

// Middleware entre la ruta y el controlador
const uploadMiddleware = multer({ storage });

// Exporto módulo
module.exports = uploadMiddleware;