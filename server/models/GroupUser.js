const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class GroupUser extends Model {}

GroupUser.init(
  {
    groupId: DataTypes.UUID,
    userId: DataTypes.UUID,
  },
  {
    sequelize,
    modelName: "GroupUser",
  }
);

module.exports = GroupUser;
