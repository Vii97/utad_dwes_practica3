const { followerModel, userModel } = require('../models');

// Funciones
const getFollower = async (removeEventListener, res) => {
    try {
        const data = await followerModel.find({});
        res.send(data);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving followers', error });
    }
};

// Get by ID
const getFollowerByID = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await followerModel.findById(id);
        if (!data) {
            return res.status(404).send({ message: 'Follower not found' });
        }
        res.send(data);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving followers', error });
    }
};

// Create new follower
const createFollower = async (req, res) => {
    try {
        const { body } = req;
        const data = await followerModel.create(body);
        res.send(data);
    } catch (error) {
        res.status(500).send({ message: 'Error creating followers', error });
    }
};

// Update follower
const updateFollower = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const data = await followerModel.findByIdAndUpdate(id, body);
        if (!data) {
            return res.status(404).send({ message: 'Follower not found' });
        }
        res.send(data);
    } catch (error) {
        res.status(500).send({ message: 'Error updating followers', error });
    }
};

// Delete follower
const deleteFollower = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await followerModel.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).send({ message: 'Follower not found' });
        }
        res.send({ message: 'Follower deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting followers', error });
    }
};


// Exportar módulo
module.exports = {
    getFollower,
    getFollowerByID,
    createFollower,
    updateFollower,
    deleteFollower
}
