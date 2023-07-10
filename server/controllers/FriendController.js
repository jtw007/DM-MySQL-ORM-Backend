const { User, Friend } = require("../models");

const FriendController = {
  // Function to delete a friendship
  deleteFriendship: async (req, res) => {
    try {
      // Check if the friendship exists
      const friendship = await Friend.findOne({
        where: {
          userId: req.user.id,
          friendId: req.params.friendId,
        },
      });

      if (!friendship) {
        return res.status(400).json({
          message: "Friendship does not exist",
        });
      }

      // Find the user who wants to remove a friend
      const user = await User.findByPk(req.user.id);

      // Find the friend who is being removed
      const friend = await User.findByPk(req.params.friendId);

      // Remove friendships in both directions
      await user.removeFriend(friend);
      await friend.removeFriend(user);

      res.json({ message: "Friendship deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = FriendController;
