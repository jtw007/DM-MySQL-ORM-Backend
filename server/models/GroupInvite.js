const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class GroupInvite extends Model {}

GroupInvite.init(
  {
    groupId: DataTypes.UUID,
    invitedUserId: DataTypes.UUID,
    inviterUserId: DataTypes.UUID,
  },
  {
    sequelize,
    modelName: "GroupInvite",
  }
);

module.exports = GroupInvite;
