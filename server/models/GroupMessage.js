const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class GroupMessage extends Model {}

GroupMessage.init(
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
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: "groupMessage",
  }
);

module.exports = GroupMessage;
