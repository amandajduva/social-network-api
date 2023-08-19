const { Thought, User } = require("../models");

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
                .select("-__v");
            return res.json(thoughts);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // get a thought by id
    async getThoughtById(req, res) {
        try {
            const singleThought = await Thought.findOne({ _id: req.params.id })
                .select("-__v");
            return res.json(singleThought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // post/create a new thought 
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            )

            if (!user) {
                res.status(404).json("Thought created, but no user with that username found!");
            }

            res.status(201).json("Thought successfully created!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // put/update a thought by id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            )

            if (!thought) {
                res.status(404).json("No thought found!");
            }

            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // delete to remove a thought by its id
    async removeThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                { _id: req.params.id }
            )

            const user = await User.findOneAndUpdate(
                { username: thought.username },
                { $pull: { thoughts: req.params.id } },
                { new: true }
            )

            if (!user) {
                res.status(404).json("Thought deleted, but no user with that username found!");
            }

            res.json("Thought successfully deleted!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // post/create a reaction stored in a single thought's reactions array field
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            )

            if (!thought) {
                res.status(404).jsom("No thought with that ID found :(");
            }

            res.status(201).json("Reaction added!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // delete a reaction by the reaction's reactionId value
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            )

            if (!thought) {
                res.status(404).jsom("No thought with that ID found :(");
            }

            res.status(200).json("Reaction removed!");
        } catch (error) {

        }
    }
};