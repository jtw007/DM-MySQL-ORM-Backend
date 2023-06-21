const router = require("express").Router();
const FriendController = require("../../controllers/FriendController");

// Route to delete a friendship
router.delete("/:userId/:friendId", FriendController.deleteFriendship);

module.exports = router;
