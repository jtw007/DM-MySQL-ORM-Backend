const { User } = require("../models");
const { signToken } = require("../utils/auth");

const UserController = {
  // Login a user
  async login(req, res) {
    try {
      const dbUserData = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!dbUserData) {
        res.status(400).json({ message: "No user found with this email" });
        return;
      }

      // Verify user password
      const validPassword = await dbUserData.isCorrectPassword(
        req.body.password
      );

      if (!validPassword) {
        res.status(401).json({ message: "Invalid password!" });
        return;
      }

      // If we got this far, the password is correct. Issue a token and return it
      const token = signToken(dbUserData);
      res.json({ userId: dbUserData.id, token });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Get all users
  async getAllUsers(req, res) {
    try {
      const dbUserData = await User.findAll({});
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Get current user's profile
  async getMyProfile(req, res) {
    try {
      const dbUserData = await User.findOne({
        where: {
          id: req.user.id,
        },
        include: {
          model: User,
          as: "friends",
          attributes: ["email"],
        },
      });

      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }

      // Get the friends count and friend names
      dbUserData.dataValues.friendsCount = dbUserData.friends.length;
      dbUserData.dataValues.friendNames = dbUserData.friends.map(
        (friend) => friend.email
      );

      // Remove the friends array from the response
      delete dbUserData.dataValues.friends;

      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Error creating user", error: err.message });
    }
  },

  // Update current user's profile
  async updateMyProfile(req, res) {
    try {
      const dbUserData = await User.update(req.body, {
        where: {
          id: req.user.id,
        },
      });

      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
      }

      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete user
  async deleteUser(req, res) {
    try {
      const dbUserData = await User.destroy({
        where: {
          id: req.user.id,
        },
      });

      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }

      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = UserController;
