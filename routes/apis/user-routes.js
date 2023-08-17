const router = require("express").Router();

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    removeUser,
    addFriend,
    removeFriend,
  } = require("../../controllers/userController");
  
  // /api/users
  router.route("/").get(getUsers).post(createUser);
  
  // /api/users/:id
  router.route("/:id").get(getUserById).put(updateUser).delete(removeUser);
  
  // /api/users/:userId/friends/:friendId
  router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;