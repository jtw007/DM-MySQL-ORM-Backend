const { User, FriendRequest } = require("../models");

const FriendRequestController = {
  // Send a friend request
  sendFriendRequest(req, res) {
    FriendRequest.create({
      fromUserId: req.user.id,
      toUserId: req.params.id,
    })
      .then((friendRequest) => res.json(friendRequest))
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          message: "Error creating friend request",
          error: err.message,
        });
      });
  },

  // Accept a friend request
  acceptFriendRequest(req, res) {
    FriendRequest.findOne({
      where: {
        id: req.params.id,
        toUserId: req.user.id,
      },
    })
      .then((friendRequest) => {
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
        return User.findByPk(friendRequest.fromUserId).then((fromUser) => {
          // Find the user who is currently logged in
          return User.findByPk(req.user.id).then((toUser) => {
            // Create friendships in both directions
            return fromUser
              .addFriend(toUser)
              .then(() => toUser.addFriend(fromUser))
              .then(() => friendRequest.update({ status: "accepted" }))
              .then(() => res.json({ message: "Friend request accepted" }));
          });
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          message: "Error finding friend request",
          error: err.message,
        });
      });
  },

  // Reject a friend request
  rejectFriendRequest(req, res) {
    FriendRequest.destroy({
      where: {
        id: req.params.id,
        toUserId: req.user.id,
      },
    })
      .then((deletedCount) => {
        if (deletedCount === 0) {
          return res
            .status(404)
            .json({ message: "No friend request found to reject" });
        }
        res.json({ message: "Friend request rejected" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          message: "Error rejecting friend request",
          error: err.message,
        });
      });
  },
};

module.exports = FriendRequestController;
