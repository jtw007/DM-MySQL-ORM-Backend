const { Message } = require("../models");
const { Op } = require("sequelize");

const messageController = {
  // Create a new message
  createMessage: async (req, res) => {
    try {
      const { toUserId } = req.body;
      const newMessage = await Message.create({
        content: req.body.content,
        fromUserId: req.user.id,
        toUserId: toUserId,
      });
      res.status(200).json(newMessage);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Get all messages for a user
  getAllMessagesForUser: async (req, res) => {
    try {
      const messages = await Message.findAll({
        where: {
          [Op.or]: [{ fromUserId: req.user.id }, { toUserId: req.user.id }],
        },
        order: [["createdAt", "DESC"]], // order by date created descending
      });
      res.status(200).json(messages);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete a message
  deleteMessage: async (req, res) => {
    try {
      const messageToDelete = await Message.findOne({
        where: {
          id: req.params.messageId,
          fromUserId: req.user.id,
        },
      });
      if (!messageToDelete) {
        return res
          .status(404)
          .json({ message: "No message found with this id" });
      }
      await messageToDelete.destroy();

      res.status(200).json({ message: "Message deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = messageController;
