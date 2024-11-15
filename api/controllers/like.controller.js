const { likeModel, userModel } = require('../models');

// Funciones
const getLike = async (removeEventListener, res) => {
    try {
        const data = await likeModel.find({});
        res.send(data);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving likes.', error });
    }
};

const getLikeByID = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await likeModel.findById(id);
        if (!data) {
            return res.status(404).send({ message: 'Like not found.' });
        }
        res.send(data);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving like.', error });
    }
};

const createLike = async (req, res) => {
    try {
        const { body } = req;
        const data = await likeModel.create(body);
        res.send(data);
    } catch (error) {
        res.status(500).send({ message: 'Error creating like.', error });
    }
};

const updateLike = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const data = await likeModel.findByIdAndUpdate(id, body);
        if (!data) {
            return res.status(404).send({ message: 'Like not found.' });
        }
        res.send(data);
    } catch (error) {
        res.status(500).send({ message: 'Error updating like.', error });
    }
};

const deleteLike = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await likeModel.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).send({ message: 'Like not found.' });
        }
        res.send({ message: 'Like deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting like.', error });
    }
};


// Exportar módulo
module.exports = {
    getLike,
    getLikeByID,
    createLike,
    updateLike,
    deleteLike
}