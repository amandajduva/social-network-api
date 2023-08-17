const { Thought, User } = require("../models");

const userController = {
    // get all users
    getUsers(req, res) {
        User.find().then((users) => res.json(users)).catch((error) => res.status(500).json(error));
    },
    // get user by id and pupulate thought and friend data

    // post a new user

    // update a user by its id

    // remove user by its id 
        // bonus remove user's associated thoughts when deleted

    // add a new friend to a user's friend list

    // delete to remove a friend from a user's friend list
}

module.exports = userController;