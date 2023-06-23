const { User, FriendRequest } = require("../models");

const FriendRequestController = {
  // Send a friend request
  async sendFriendRequest(req, res) {
    try {
      const toUserId = req.params.id;

      if (req.user.id === toUserId) {
        return res
          .status(400)
          .json({ message: "You cannot send a friend request to yourself" });
      }

      const existingFriendRequest = await FriendRequest.findOne({
        where: {
          fromUserId: req.user.id,
          toUserId: toUserId,
        },
      });

      if (existingFriendRequest) {
        return res.status(400).json({ message: "Friend request already sent" });
      }

      const friendRequest = await FriendRequest.create({
        fromUserId: req.user.id,
        toUserId: toUserId,
      });

      res.json(friendRequest);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Error creating friend request",
        error: err.message,
      });
    }
  },

  // Accept a friend request
  async acceptFriendRequest(req, res) {
    try {
      const friendRequest = await FriendRequest.findOne({
        where: {
          id: req.params.id,
          toUserId: req.user.id,
        },
      });

      if (!friendRequest) {
        return res
          .status(404)
          .json({ message: "No friend request found with this id" });
      }

      if (friendRequest.status !== "pending") {
        return res
          .status(400)
          .json({ message: "This friend request is not pending" });
      }

      // Find the user who sent the friend request
      const fromUser = await User.findByPk(friendRequest.fromUserId);

      // Find the user who is currently logged in
      const toUser = await User.findByPk(req.user.id);

      // Create friendships in both directions
      await fromUser.addFriend(toUser);
      await toUser.addFriend(fromUser);
      await friendRequest.update({ status: "accepted" });

      res.json({ message: "Friend request accepted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Error finding friend request",
        error: err.message,
      });
    }
  },

  // Reject a friend request
  async rejectFriendRequest(req, res) {
    try {
      const deletedCount = await FriendRequest.destroy({
        where: {
          id: req.params.id,
          toUserId: req.user.id,
        },
      });

      if (deletedCount === 0) {
        return res
          .status(404)
          .json({ message: "No friend request found to reject" });
      }
      res.json({ message: "Friend request rejected" });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Error rejecting friend request",
        error: err.message,
      });
    }
  },
};

module.exports = FriendRequestController;
