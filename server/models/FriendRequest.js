const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class FriendRequest extends Model {}

FriendRequest.init(
  {
    fromUserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    toUserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "friendRequest",
  }
);

module.exports = FriendRequest;
