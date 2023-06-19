const router = require("express").Router();

const userRoutes = require("./userRoutes");
const groupRoutes = require("./groupRoutes");
const messageRoutes = require("./messageRoutes");
const friendshipRoutes = require("./friendshipRoutes");
const groupUserRoutes = require("./groupUserRoutes");
const groupInviteRoutes = require("./groupInviteRoutes");

router.use("/users", userRoutes);
router.use("/groups", groupRoutes);
router.use("/messages", messageRoutes);
router.use("/friendships", friendshipRoutes);
router.use("/groupUsers", groupUserRoutes);
router.use("/groupInvites", groupInviteRoutes);

module.exports = router;
