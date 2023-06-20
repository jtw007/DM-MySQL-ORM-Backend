const { User, FriendRequest } = require("../models");

const FriendController = {
  // Function to create a new friendship
  createFriendship: async (req, res) => {
    try {
      // Check if the friend request exists and has been accepted
      const friendRequest = await FriendRequest.findOne({
        where: {
          fromUserId: req.body.userId,
          toUserId: req.body.friendId,
          status: "accepted",
        },
      });

      if (!friendRequest) {
        return res.status(400).json({
          message: "Friend request does not exist or has not been accepted",
        });
      }

      // Find the user who sent the friend request
      const fromUser = await User.findByPk(req.body.userId);

      // Find the user who accepted the friend request
      const toUser = await User.findByPk(req.body.friendId);

      // Create friendships in both directions
      await fromUser.addFriend(toUser);
      await toUser.addFriend(fromUser);

      res.json({ message: "Friendship created successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Function to delete a friendship
  deleteFriendship: async (req, res) => {
    try {
      // Check if the friend request exists and has been accepted
      const friendRequest = await FriendRequest.findOne({
        where: {
          fromUserId: req.params.userId,
          toUserId: req.params.friendId,
          status: "accepted",
        },
      });

      if (!friendRequest) {
        return res.status(400).json({
          message: "Friend request does not exist or has not been accepted",
        });
      }

      // Find the user who sent the friend request
      const fromUser = await User.findByPk(req.params.userId);

      // Find the user who accepted the friend request
      const toUser = await User.findByPk(req.params.friendId);

      // Remove friendships in both directions
      await fromUser.removeFriend(toUser);
      await toUser.removeFriend(fromUser);

      res.json({ message: "Friendship deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = FriendController;
