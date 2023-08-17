const { Thought, User } = require("../models");

const userController = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            return res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // get user by id and pupulate thought and friend data

    // post a new user

    // update a user by its id
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user' })
            }

            res.json(user);
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // remove user by its id 
        // bonus remove user's associated thoughts when deleted

    // add a new friend to a user's friend list

    // delete to remove a friend from a user's friend list
}

module.exports = userController;