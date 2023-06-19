const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Message extends Model {}

Message.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    recipientId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Message",
  }
);

module.exports = Message;
