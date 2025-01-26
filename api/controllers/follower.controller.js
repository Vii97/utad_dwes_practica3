const { followerModel } = require('../models');
const { handleHTTPResponse, handleHTTPError, INTERNAL_SERVER_ERROR } = require('../utils/handleResponse.util');
const { matchedData } = require('express-validator');

// Obtener todos los seguidores
const getFollower = async (req, res) => {
    try {
        const data = await followerModel.find({}).populate('follower following');
        handleHTTPResponse(res, "Followers retrieved successfully", data);
    } catch (error) {
        console.log("ERROR[follower.controller/getFollower]:" + error);
        handleHTTPError(res, "Error retrieving followers", INTERNAL_SERVER_ERROR);
    }
};

// Obtener un seguidor por ID
const getFollowerByID = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await followerModel.findById(id).populate('follower following');
        handleHTTPResponse(res, "Follower retrieved successfully", data);
    } catch (error) {
        console.log("ERROR[follower.controller/getFollowerByID]:" + error);
        handleHTTPError(res, "Error retrieving follower", INTERNAL_SERVER_ERROR);
    }
};

// Crear un nuevo seguidor
const createFollower = async (req, res) => {
    try {
        const { body } = matchedData(req);
        const newFollower = new followerModel(body);
        const savedFollower = await newFollower.save();
        handleHTTPResponse(res, "Follower created successfully", savedFollower);
    } catch (error) {
        console.log("ERROR[follower.controller/createFollower]:" + error);
        handleHTTPError(res, "Error creating follower", INTERNAL_SERVER_ERROR);
    }
};

// Actualizar un seguidor
const updateFollower = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        const data = await followerModel.findByIdAndUpdate(id, body);
        handleHTTPResponse(res, "Follower updated successfully", data);
    } catch (error) {
        console.log("ERROR[follower.controller/updateFollower]:", error);
        handleHTTPError(res, "Error updating follower", INTERNAL_SERVER_ERROR);
    }
};

// Borrar un seguidor
const deleteFollower = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await followerModel.findByIdAndDelete(id);
        handleHTTPResponse(res, "Follower deleted successfully", data);
    } catch (error) {
        console.log("ERROR[follower.controller/deleteFollower]:" + error);
        handleHTTPError(res, "Error deleting follower", INTERNAL_SERVER_ERROR);
    }
};

// Exportar módulo
module.exports = {
    getFollower,
    getFollowerByID,
    createFollower,
    updateFollower,
    deleteFollower
};