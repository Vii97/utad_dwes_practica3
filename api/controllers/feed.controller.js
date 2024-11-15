const { followerModel, postModel } = require('../models');

// Funciones
const getFeed = async (req, res) => {
    try {
        const { id } = req.params;
        const followers = await followerModel.find({ user_follower: id });
        const followed = followers.map(follower => follower.user_followed);
        const posts = await postModel.find({ user: { $in: followed } }).sort({ createdAt: -1 });

        res.send(posts);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving feed', error });
    }
};


// Exportar módulo
module.exports = {
    getFeed
}
