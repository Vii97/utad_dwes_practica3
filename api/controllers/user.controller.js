const { matchedData } = require('express-validator');
const { userModel } = require('../models');
const { handleHTTPResponse, handleHTTPError, INTERNAL_SERVER_ERROR } = require('../utils/handleResponse.util');

// Funciones

// Obtener todos los usuarios
const getUser = async (req, res) => {
    try {
        const data = await userModel.find({});
        handleHTTPResponse(res, "Users retrieved successfully.", data);
    } catch (error) {
        console.log("ERROR [user.controller / getUser]: " + error);
        handleHTTPError(res, "Users couldn't be retrieved", INTERNAL_SERVER_ERROR);
    }
};

// Obtener usuario por id
const getUserByID = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await userModel.findById(id);
        handleHTTPResponse(res, "User retrieved successfully.", data);
    } catch (error) {
        console.log("ERROR [user.controller / getUserByID]: " + error);
        handleHTTPError(res, "Users couldn't be retrieved", INTERNAL_SERVER_ERROR);
    }
};

// crear usuario
const createUser = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await userModel.create(body);
        handleHTTPResponse(res, "User created successfully.", data);
    } catch (error) {
        console.log("ERROR [user.controller / createUser]: " + error);
        handleHTTPError(res, "Users couldn't be created", INTERNAL_SERVER_ERROR);
    }
};

// Actualizar usuario
const updateUser = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        const data = await userModel.findByIdAndUpdate(id, body);
        handleHTTPResponse(res, "User updated successfully.", data);
    } catch (error) {
        console.log("ERROR [user.controller / updateUser]: " + error);
        handleHTTPError(res, "Users couldn't be updated", INTERNAL_SERVER_ERROR);
    }
};

// Borrado lógico
const archiveUser = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await userModel.delete({ _id: id });
        handleHTTPResponse(res, "User archived successfully.", data);
    } catch (error) {
        console.log("ERROR [user.controller / archiveUser]: " + error);
        handleHTTPError(res, "User couldn't be archived", INTERNAL_SERVER_ERROR);
    }
}

// Borrado físico
const deleteUser = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await userModel.findByIdAndDelete(id);
        handleHTTPResponse(res, "User deleted successfully.", data);
    } catch (error) {
        console.log("ERROR [user.controller / deleteUser]: " + error);
        handleHTTPError(res, "User couldn't be deleted", INTERNAL_SERVER_ERROR);
    }
};




// Exportar módulo
module.exports = {
    getUser,
    getUserByID,
    createUser,
    updateUser,
    archiveUser,
    deleteUser
}
