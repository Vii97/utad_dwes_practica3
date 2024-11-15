// Importo el módulo 'path'
const path = require('path'); 

// Cargo el valor de la variable de entorno de .env
const { ENGINE_DB } = process.env

// Determino la ruta de los modelos
const pathModels = (ENGINE_DB === 'nosql') ? './nosql/' : './mysql'

const models = {
    userModel: require(path.join(__dirname, pathModels, 'user.model')),
    postModel: require(path.join(__dirname, pathModels, 'post.model')),
    followerModel: require(path.join(__dirname, pathModels, 'follower.model')),
    likeModel: require(path.join(__dirname, pathModels, 'like.model')),
    feedModel: require(path.join(__dirname, pathModels, 'feed.model')),
}

// Exporto el módulo
module.exports = models