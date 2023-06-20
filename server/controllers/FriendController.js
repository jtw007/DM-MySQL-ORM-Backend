const { User, Friend } = require("../models");

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

      const friend = await Friend.create({
        userId: req.body.userId,
        friendId: req.body.friendId,
      });

      res.json(friend);
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

      const friend = await Friend.destroy({
        where: {
          userId: req.params.userId,
          friendId: req.params.friendId,
        },
      });

      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = FriendController;
