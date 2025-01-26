const { likeModel } = require('../models');
const { handleHTTPResponse, handleHTTPError, INTERNAL_SERVER_ERROR } = require('../utils/handleResponse.util');
const { matchedData } = require('express-validator');

// Obtener todos los likes
const getLike = async (req, res) => {
    try {
        const data = await likeModel.find({}).populate('user post');
        handleHTTPResponse(res, "Likes retrieved successfully", data);
    } catch (error) {
        console.log("ERROR[like.controller/getLikes]:" + error);
        handleHTTPError(res, "Error retrieving likes", INTERNAL_SERVER_ERROR);
    }
};

// Obtener un like por ID
const getLikeByID = async (req, res) => {
    try {
        const { id } = matchedData(req); 
        const data = await likeModel.findById(id).populate('user post');
        handleHTTPResponse(res, "Like retrieved successfully", data);
    } catch (error) {
        console.log("ERROR[like.controller/getLikeById]:" + error);
        handleHTTPError(res, "Error retrieving like", INTERNAL_SERVER_ERROR);
    }
};

// Crear un nuevo like
const createLike = async (req, res) => {
    try {
        const { postId } = matchedData(req); 
        const userId = req.user.id;
        const newLike = new likeModel({ user: userId, post: postId });
        const savedLike = await newLike.save();
        handleHTTPResponse(res, "Like created successfully", savedLike);
    } catch (error) {
        console.log("ERROR[like.controller/createLike]:" + error);
        handleHTTPError(res, "Error creating like", INTERNAL_SERVER_ERROR);
    }
};

// Actualizar un like
const updateLike = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req); 
        const data = await likeModel.findByIdAndUpdate(id, body);

        handleHTTPResponse(res, "Like updated successfully", data);
    } catch (error) {
        console.log("ERROR[like.controller/updateLike]:" + error);
        handleHTTPError(res, "Error updating like", INTERNAL_SERVER_ERROR);
    }
};

// Borrar un like
const deleteLike = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await likeModel.findByIdAndDelete(id);
        handleHTTPResponse(res, "Like deleted successfully", data);
    } catch (error) {
        console.error("ERROR[like.controller/deleteLike]:" + error);
        handleHTTPError(res, "Error deleting like", INTERNAL_SERVER_ERROR);
    }
};

// Exportar módulo
module.exports = {
    getLike,
    getLikeByID,
    createLike,
    updateLike,
    deleteLike
};