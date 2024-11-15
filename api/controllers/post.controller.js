const { postModel, userModel } = require('../models');

// Funciones
const getPost = async (removeEventListener, res) => {
    try {
        const data = await postModel.find({});
        res.send(data);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving posts.', error });
    }
};

const getPostByID = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await postModel.findById(id);
        if (!data) {
            return res.status(404).send({ message: 'Post not found.' });
        }
        res.send(data);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving post.', error });
    }
};

const createPost = async (req, res) => {
    try {
        const { body } = req;
        const data = await postModel.create(body);
        res.send(data);
    } catch (error) {
        res.status(500).send({ message: 'Error creating post.', error });
    }
};

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const data = await postModel.findByIdAndUpdate( id, body);
        if (!data) {
            return res.status(404).send({ message: 'Post not found.' });
        }
        res.send(data);
    } catch (error) {
        res.status(500).send({ message: 'Error updating post.', error });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await postModel.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).send({ message: 'Post not found' });
        }
        res.send({ message: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting post', error });
    }
};


// Exportar módulo
module.exports = {
    getPost,
    getPostByID,
    createPost,
    updatePost,
    deletePost
}
