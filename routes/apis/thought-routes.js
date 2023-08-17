const router = require("express").Router();

const {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    removeThought,
    createReaction,
    deleteReaction,
} = require("../../controller/thoughtController");

// Set up GET all and POST at /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
    .route("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;