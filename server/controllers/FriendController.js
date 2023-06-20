const { User, Friend } = require("../models");

const FriendController = {
  // Function to create a new friendship
  createFriendship: async (req, res) => {
    try {
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
