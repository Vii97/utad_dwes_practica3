const { matchedData } = require('express-validator');
const { userModel } = require('../models');
const { handleHTTPResponse, handleHTTPError, UNAUTHORIZED, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/handleResponse.util');
const { hashPassword, comparePassword } = require("../utils/handlePassword.util");
const { tokenSign } = require("../utils/handle.JWT.util");

// Registro de usuario
const registerUser = async(req, res) => {
    try{
        req = matchedData(req);
        const hashedPassword = await hashPassword(req.pwd);
        const body = { ...req, pwd: hashedPassword };
        const dataUser = await userModel.create(body);

        dataUser.set("pwd", undefined, {strict: false });

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        handleHTTPResponse(res, "User signed up successfully", data);
    }catch(error){
        console.log("ERROR[auth.controller / registerUser:\n" + error);
        handleHTTPError(res,"ERROR_REGISTER_USER", INTERNAL_SERVER_ERROR);
    }
}

// Login de usuario
const loginUser = async (req, res) => {
    try{
        req = matchedData(req);
        const user = await userModel.findOne({ email: req.email }).select("pwd email")
        // Compruebo que existe el user
        if(!user){
            handleHTTPError(res, "USER_NOT_EXISTS", NOT_FOUND);
            return;
        }
        // Compruebo la contraseña con comparePassword
        const check = await comparePassword(req.pwd, user.pwd);
        if(!check){
            handleHTTPError(res, "INVALID_PASSWORD", UNAUTHORIZED);
            return;
        }
        // Devuelvo el user
        user.set("pwd", undefined, {strict: false});
        const data = {
            token: await tokenSign(user),
            user
        }
        handleHTTPResponse(res, "Authentication success", data);

    } catch(error){
        console.log("ERROR[auth.controller / loginUser]:\n"+error);
        handleHTTPError(res,"ERROR_LOGIN_USER", INTERNAL_SERVER_ERROR);
    }
}

// Exportar módulo
module.exports = {
    registerUser,
    loginUser
}