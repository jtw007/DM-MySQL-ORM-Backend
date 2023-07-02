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
});

User.hasMany(FriendRequest, {
  foreignKey: "toUserId",
  as: "incomingFriendRequests",
});

User.hasMany(Message, {
  foreignKey: "fromUserId",
  as: "sendMessages",
});

User.hasMany(Message, {
  foreignKey: "toUserId",
  as: "receiveMessages",
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

GroupMessage.belongsTo(User, {
  foreignKey: "userId",
  as: "fromUser",
});

GroupMessage.belongsTo(GroupChat, {
  foreignKey: "groupId",
  as: "groupChat",
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
