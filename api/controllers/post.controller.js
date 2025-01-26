// controllers/post.controller.js
const { postModel } = require('../models');
const { handleHTTPResponse, handleHTTPError, INTERNAL_SERVER_ERROR } = require('../utils/handleResponse.util');
const { matchedData } = require('express-validator');

// Obtener todos los posts
const getPost = async (req, res) => {
    try {
        const data = await postModel.find({}).populate('user');
        handleHTTPResponse(res, "Posts retrieved successfully.", data);
    } catch (error) {
        console.log("ERROR[post.controller/getPosts]:" + error);
        handleHTTPError(res, "Error retrieving posts", INTERNAL_SERVER_ERROR);
    }
};

// Obtener un post por ID
const getPostByID = async (req, res) => {
    try {
        const { id } = matchedData(req); 
        const data = await postModel.findById(id).populate('user');
        handleHTTPResponse(res, "Post retrieved successfully", data);
    } catch (error) {
        console.log("ERROR[post.controller/getPostById]:" + error);
        handleHTTPError(res, "Error retrieving post", INTERNAL_SERVER_ERROR);
    }
};

// Crear un nuevo post
const createPost = async (req, res) => {
    try {
        const { txt } = matchedData(req); 
        const userId = req.user.id; 
        const newPost = new postModel({ txt, user: userId }); 
        const savedPost = await newPost.save();
        handleHTTPResponse(res, "Post created successfully", savedPost);
    } catch (error) {
        console.log("ERROR[post.controller/createPost]:" + error);
        handleHTTPError(res, "Error creating post", INTERNAL_SERVER_ERROR);
    }
};

// Actualizar un post
const updatePost = async (req, res) => {
    try {
        const { id } = matchedData(req); 
        const { txt } = req.body; 
        const data = await postModel.findByIdAndUpdate(id, { txt });

        handleHTTPResponse(res, "Post updated successfully", data);
    } catch (error) {
        console.log("ERROR[post.controller/updatePost]:", error);
        handleHTTPError(res, "Error updating post", INTERNAL_SERVER_ERROR);
    }
};

// Borrar un post
const deletePost = async (req, res) => {
    try {
        const { id } = matchedData(req); 
        const data = await postModel.findByIdAndUpdate(id);
        handleHTTPResponse(res, "Post deleted successfully", data);
    } catch (error) {
        console.log("ERROR[post.controller/deletePost]:" + error);
        handleHTTPError(res, "Error deleting post", INTERNAL_SERVER_ERROR);
    }
};

// Subir una imagen
const uploadImg = async (req, res) => {
    try {
        const { file } = req; 
        const { txt } = matchedData(req); 
        const userId = req.user.id; 

        if (!file) {
            return handleHTTPError(res, "No file uploaded", 400);
        }

        const fileData = {
            user: userId,
            txt,
            img: `${process.env.PUBLIC_URL}/${file.filename}`
        };

        const newPost = new postModel(fileData);
        const savedPost = await newPost.save();
        handleHTTPResponse(res, "Image uploaded successfully", savedPost);
    } catch (error) {
        console.error("ERROR[post.controller/uploadImg]:", error);
        handleHTTPError(res, "File couldn't be stored", INTERNAL_SERVER_ERROR);
    }
};

// Exportar módulo
module.exports = {
    getPost,
    getPostByID,
    createPost,
    updatePost,
    deletePost,
    uploadImg
};