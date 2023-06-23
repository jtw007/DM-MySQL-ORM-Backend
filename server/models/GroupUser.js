const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class GroupUser extends Model {}

GroupUser.init(
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "groupChat",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("PENDING", "ACCEPTED"),
      allowNull: false,
      defaultValue: "PENDING",
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: "groupUser",
  }
);

module.exports = GroupUser;
