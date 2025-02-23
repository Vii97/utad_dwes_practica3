const express = require("express")
const fs = require("fs")
const router = express.Router()
const path = require("path");

const removeExtension = (fileName) => {
    return fileName.split('.').shift()
}

fs.readdirSync(__dirname).filter((file) => {
    const name = removeExtension(file)
    if(name !== 'index') {
        router.use('/' + name, require('./'+name+'.routes'))
    }
})

router.get('/', (req, res) => {
    // cwd = dónde se ha inicializado
    res.sendFile(path.join(process.cwd(), 'client', 'index.html'), (err) => {
        if (err) {
            res.status(err.status).send('Error al enviar el archivo: ' + err.message);
        }
    });
});

module.exports = router