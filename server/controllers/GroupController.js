const { GroupChat, GroupUser, GroupMessage, User } = require("../models");

const groupController = {
  // Create a new group
  createGroup: async (req, res) => {
    try {
      const group = await GroupChat.create({
        groupName: req.body.groupName,
        creatorId: req.user.id,
      });

      // Automatically add the creator to the group
      await GroupUser.create({
        userId: req.user.id,
        groupId: group.id,
        status: "ACCEPTED",
      });

      // Invite users to the group
      const { invitees } = req.body;
      for (let inviteeId of invitees) {
        if (inviteeId === req.user.id) continue; // The creator should not invite himself
        await GroupUser.create({
          userId: inviteeId,
          groupId: group.id,
          status: "PENDING",
        });
      }

      res.json(group);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // Send a message to a group
  createGroupMessage: async (req, res) => {
    try {
      // check if the user is part of the group
      const groupUser = await GroupUser.findOne({
        where: {
          groupId: req.params.groupId,
          userId: req.user.id,
        },
      });

      if (!groupUser) {
        return res.status(403).json({ message: "Not authorized" });
      }

      const message = await GroupMessage.create({
        userId: req.user.id,
        groupId: req.params.groupId,
        message: req.body.message,
      });
      res.json(message);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // Get all group messages from a user
  getGroupContents: async (req, res) => {
    try {
      const groupUser = await GroupUser.findOne({
        where: {
          groupId: req.params.groupId,
          userId: req.user.id,
        },
      });
      if (!groupUser) {
        return res.status(403).json({ message: "Not authorized" });
      }
      const group = await GroupChat.findOne({
        where: { id: req.params.groupId },
        include: [
          { model: User, as: "users" },
          {
            model: GroupMessage,
            as: "groupMessages",
            include: [{ model: User, as: "fromUser" }],
          },
        ],
      });
      res.json(group);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // Allows group members to invite other users to the group
  inviteUsers: async (req, res) => {
    try {
      const { invitees } = req.body; // Extract invitees from the request body
      const { groupId } = req.params; // Extract groupId from the route parameters

      // Check if the requester is a member of the group
      const groupUser = await GroupUser.findOne({
        where: {
          groupId: groupId,
          userId: req.user.id,
          status: "ACCEPTED",
        },
      });
      if (!groupUser) {
        return res.status(403).json({ message: "Not authorized" });
      }

      // Iterate through the invitees array
      for (let inviteeId of invitees) {
        const alreadyInvited = await GroupUser.findOne({
          where: {
            groupId: groupId,
            userId: inviteeId,
          },
        });
        // Skip if the user is already invited or a member
        if (alreadyInvited) continue;

        // Create a new invitation for the user
        await GroupUser.create({
          userId: inviteeId,
          groupId: groupId,
          status: "PENDING",
        });
      }

      res.json({ message: "Invitations sent" });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Aceept a group invitation
  acceptInvitation: async (req, res) => {
    try {
      const { groupId } = req.params;
      const invitation = await GroupUser.findOne({
        where: {
          groupId: groupId,
          userId: req.user.id,
          status: "PENDING",
        },
      });
      if (!invitation) {
        return res.status(403).json({ message: "No invitation found" });
      }
      invitation.status = "ACCEPTED";
      await invitation.save();
      res.json({ message: "Invitation accepted" });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Decline a group invitation
  declineInvitation: async (req, res) => {
    try {
      const { groupId } = req.params;
      const invitation = await GroupUser.findOne({
        where: {
          groupId: groupId,
          userId: req.user.id,
          status: "PENDING",
        },
      });
      if (!invitation) {
        return res.status(403).json({ message: "No invitation found" });
      }
      await invitation.destroy();
      res.json({ message: "Invitation declined" });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // Leaving a group
  leaveGroup: async (req, res) => {
    try {
      const { groupId } = req.params;

      // Check if the user is a member of the group
      const groupUser = await GroupUser.findOne({
        where: {
          groupId: groupId,
          userId: req.user.id,
          status: "ACCEPTED",
        },
      });
      if (!groupUser) {
        return res.status(403).json({ message: "Not a group member" });
      }

      // Delete the user's record from the GroupUser table
      await GroupUser.destroy({
        where: {
          groupId: groupId,
          userId: req.user.id,
        },
      });

      res.json({ message: "Successfully left the group" });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = groupController;
