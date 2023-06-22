const User = require("./User");
const Friend = require("./Friend");
const FriendRequest = require("./FriendRequest");
const Message = require("./Message");

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

User.hasMany(Message, {
  foreignKey: "fromUserId",
  as: "sendMessages",
  onDelete: "CASCADE",
});

User.hasMany(Message, {
  foreignKey: "toUserId",
  as: "receiveMessages",
  onDelete: "CASCADE",
});

module.exports = { User, FriendRequest, Friend, Message };
