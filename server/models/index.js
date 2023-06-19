const User = require("./User");
const Group = require("./Group");
const Message = require("./Message");
const Friendship = require("./Friendship");
const GroupUser = require("./GroupUser");
const GroupInvite = require("./GroupInvite");

User.belongsToMany(User, { through: Friendship, as: "Friends" });
User.belongsToMany(Group, { through: GroupUser, as: "Groups" });
Group.belongsToMany(User, { through: GroupUser, as: "Users" });
Group.belongsToMany(User, { through: GroupInvite, as: "Invites" });
User.belongsToMany(Group, { through: GroupInvite, as: "GroupInvites" });

Message.belongsTo(User, { as: "Sender" });
Message.belongsTo(User, { as: "Recipient", allowNull: true });
Message.belongsTo(Group, { as: "Group", allowNull: true });

Group.hasMany(Message, { as: "Messages" });

module.exports = { User, Group, Message, Friendship, GroupUser, GroupInvite };
