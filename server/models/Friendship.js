const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Friendship extends Model {}

Friendship.init(
  {
    userId: DataTypes.UUID,
    friendId: DataTypes.UUID,
  },
  {
    sequelize,
    modelName: "Friendship",
  }
);
