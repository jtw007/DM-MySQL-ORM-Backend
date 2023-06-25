const User = require("./User");
const Friend = require("./Friend");
const FriendRequest = require("./FriendRequest");
const Message = require("./Message");
const GroupChat = require("./GroupChat");
const GroupUser = require("./GroupUser");
const GroupMessage = require("./GroupMessage");

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

Message.belongsTo(User, {
  foreignKey: "fromUserId",
  as: "fromUser",
});

Message.belongsTo(User, {
  foreignKey: "toUserId",
  as: "toUser",
});

User.belongsToMany(GroupChat, {
  through: GroupUser,
  as: "groups",
  foreignKey: "userId",
});

GroupChat.belongsToMany(User, {
  through: GroupUser,
  as: "users",
  foreignKey: "groupId",
});

GroupChat.hasMany(GroupMessage, {
  foreignKey: "groupId",
  as: "groupMessages",
});

User.hasMany(GroupMessage, {
  foreignKey: "userId",
  as: "groupMessages",
});

module.exports = {
  User,
  FriendRequest,
  Friend,
  Message,
  GroupChat,
  GroupUser,
  GroupMessage,
};
