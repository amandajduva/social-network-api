const { Thought, User } = require("../models");

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find()
            .select("-__v");
            return res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // get user by id and populate thought and friend data
    async getUserById(req, res) {
        try {
            const singleUser = await User.findOne( { _id: req.params.id })
            .populate("thoughts")
            .select("-__v");
            return res.json(singleUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // post a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (error) {
            res.status(500).json(error)
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
            res.status(500).json(error);
        }
    },

    // remove user by its id 
        // bonus remove user's associated thoughts when deleted
    async removeUser(req, res) {
        try {
            
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // add a new friend to a user's friend list
    async addFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendsId } },
                { runValidators: true, new: true }
            );

            if (!friend) {
                return res
                    .status(404)
                    .json({ message: "No friend found with that ID :(" })
            }

            res.json(friend);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // delete to remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
            const friend = await  User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
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
};