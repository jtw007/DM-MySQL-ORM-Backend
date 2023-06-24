const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Friend extends Model {}

Friend.init(
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    friendId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "friend",
    underscored: true,
  }
);

module.exports = Friend;
