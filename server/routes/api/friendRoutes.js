const router = require("express").Router();
const FriendController = require("../../controllers/FriendController");
const { authMiddleware } = require("../../utils/auth");

// Route to delete a friendship
router.delete("/:friendId", authMiddleware, FriendController.deleteFriendship);

module.exports = router;
