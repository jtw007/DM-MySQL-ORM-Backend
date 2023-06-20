const router = require("express").Router();
const FriendRequestController = require("../../controllers/FriendRequestController");
const { authMiddleware } = require("../../utils/auth");

// Send a friend request
router.post(
  "/request/:id",
  authMiddleware,
  FriendRequestController.sendFriendRequest
);

// Accept a friend request
router.post(
  "/accept/:id",
  authMiddleware,
  FriendRequestController.acceptFriendRequest
);

// Reject a friend request
router.delete(
  "/reject/:id",
  authMiddleware,
  FriendRequestController.rejectFriendRequest
);

module.exports = router;
