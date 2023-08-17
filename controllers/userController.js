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
    async getUserById(req, res) {
        try {
            
        } catch (error) {
            
        }
    },
    // post a new user
    async createUser(req, res) {
        try {
            
        } catch (error) {
            
        }
    },
    // update a user by its id
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
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
    async removeUser(req, res) {
        try {
            
        } catch (error) {
            
        }
    },
    // add a new friend to a user's friend list
    async addFriend(req, res) {
        try {
            
        } catch (error) {
            
        }
    },
    // delete to remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
            const friend = await  User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId } },
                { runValidators: true, new: true }
            );

            if (!friend) {
                return res.status(404).json({ message: "No user with this id!" });
              }
              res.json(friend);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = userController;