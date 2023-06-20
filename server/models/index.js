// server/models/index.js
const User = require("./User");
const Friend = require("./Friend");
const FriendRequest = require("./FriendRequest");

User.belongsToMany(User, {
  through: Friend,
  as: "friends",
  foreignKey: "userId",
  otherKey: "friendId",
});

User.hasMany(FriendRequest, {
  foreignKey: "fromUserId",
  as: "outgoingFriendRequests",
  onDelete: "CASCADE",
});

User.hasMany(FriendRequest, {
  foreignKey: "toUserId",
  as: "incomingFriendRequests",
  onDelete: "CASCADE",
});

module.exports = { User, FriendRequest, Friend };
