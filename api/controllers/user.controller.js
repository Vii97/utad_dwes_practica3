const { userModel } = require('../models');

// Funciones
const getUser = async (removeEventListener, res) => {
    try {
        const data = await userModel.find({});
        res.send(data);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving users.', error });
    }
};

// Get User document by ID
const getUserByID = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await userModel.findById(id);
        if (!data) {
            return res.status(404).send({ message: 'User not found.' });
        }
        res.send(data);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving user.', error });
    }
};

// Create new User document
const createUser = async (req, res) => {
    try {
        const { body } = req;
        const data = await userModel.create(body);
        res.send(data);
    } catch (error) {
        res.status(500).send({ message: 'Error creating user.', error });
    }
};

// Update User document by ID
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const data = await userModel.findByIdAndUpdate(id, body);
        if (!data) {
            return res.status(404).send({ message: 'User not found.' });
        }
        res.send(data);
    } catch (error) {
        res.status(500).send({ message: 'Error updating user.', error });
    }
};

// Delete User document by ID
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await userModel.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).send({ message: 'User not found.' });
        }
        res.send({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting user.', error });
    }
};


// Exportar módulo
module.exports = {
    getUser,
    getUserByID,
    createUser,
    updateUser,
    deleteUser
}
