const { Message } = require("../models");

const MessageController = {
  // Get all messages
  async getAllMessages(req, res) {
    try {
      const messages = await Message.findAll();
      return res.json(messages);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Get a message by id
  async getMessageById(req, res) {
    try {
      const message = await Message.findOne({ where: { id: req.params.id } });
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }
      return res.json(message);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Create a new message
  async createMessage(req, res) {
    try {
      const message = await Message.create(req.body);
      return res.status(201).json(message);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Update a message by id
  async updateMessage(req, res) {
    try {
      await Message.update(req.body, { where: { id: req.params.id } });
      const updatedMessage = await Message.findOne({
        where: { id: req.params.id },
      });
      if (!updatedMessage) {
        return res.status(404).json({ error: "Message not found" });
      }
      return res.json(updatedMessage);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Delete a message by id
  async deleteMessage(req, res) {
    try {
      await Message.destroy({ where: { id: req.params.id } });
      return res.status(204).json({ message: "Message deleted" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};

module.exports = MessageController;
