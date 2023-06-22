const { User } = require("../models");
const { signToken } = require("../utils/auth");

const UserController = {
  // Login a user
  login(req, res) {
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then(async (dbUserData) => {
        if (!dbUserData) {
          res.status(400).json({ message: "No user found with this email" });
          return;
        }
        // Verify user password
        const validPassword = await dbUserData.isCorrectPassword(
          req.body.password
        );

        if (!validPassword) {
          res.status(401).json({ message: "Invalid passowrd!" });
          return;
        }
        // If we got this far, the password is correct. Issue a token and return it
        const token = signToken(dbUserData);

        res.json({ userId: dbUserData.id, token });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Get all users
  getAllUsers(req, res) {
    User.findAll({})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get current user's profile
  getMyProfile(req, res) {
    User.findOne({
      where: {
        id: req.user.id,
      },
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        // Get the friends count
        dbUserData.getFriends().then((friends) => {
          dbUserData.dataValues.friendsCount = friends.length;
          res.json(dbUserData);
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({ message: "Error creating user", error: err.message });
      });
  },

  // Update current user's profile
  updateMyProfile(req, res) {
    User.update(req.body, {
      where: {
        id: req.user.id,
      },
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete user
  deleteUser(req, res) {
    User.destroy({
      where: {
        id: req.user.id,
      },
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = UserController;
