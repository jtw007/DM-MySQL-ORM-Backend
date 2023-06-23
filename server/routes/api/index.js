const router = require("express").Router();
const userRoutes = require("./userRoutes");
const friendRequestRoutes = require("./friendRequestRoutes");
const friendRoutes = require("./friendRoutes");
const messageRoutes = require("./messageRoutes");
const groupRoutes = require("./groupRoutes");

router.use("/users", userRoutes);
router.use("/friendRequests", friendRequestRoutes);
router.use("/friends", friendRoutes);
router.use("/messages", messageRoutes);
router.use("/groups", groupRoutes);

module.exports = router;
