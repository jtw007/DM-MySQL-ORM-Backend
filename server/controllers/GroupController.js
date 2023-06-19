const { Group } = require("../models");

// Get all groups
const GroupController = {
  async getAllGroups(req, res) {
    try {
      const groups = await Group.findAll();
      return res.json(groups);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },

  // Get a group by id
  async getGroupById(req, res) {
    try {
      const group = await Group.findOne({ where: { id: req.params.id } });
      if (!group) {
        return res.status(404).json({ error: "Group not found" });
      }
      return res.json(group);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },

  // Create a new group
  async createGroup(req, res) {
    try {
      const group = await Group.create(req.body);
      return res.status(201).json(group);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },

  // Update a group by id
  async updateGroup(req, res) {
    try {
      const group = await Group.findOne({ where: { id: req.params.id } });
      if (!group) {
        return res.status(404).json({ error: "Group not found" });
      }
      return res.json(group);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Delete a group by id
  async deleteGroup(req, res) {
    try {
      await Group.destroy({ where: { id: req.params.id } });
      return res.json({ message: "Group deleted" });
    } catch {
      return res.status(500).json({ error: err.message });
    }
  },
};

module.exports = GroupController;
