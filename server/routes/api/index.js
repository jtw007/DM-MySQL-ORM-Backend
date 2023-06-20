const router = require("express").Router();
const userRoutes = require("./userRoutes");
const friendRequestRoutes = require("./friendRequestRoutes");
const friendRoutes = require("./friendRoutes");

router.use("/users", userRoutes);
router.use("/friendRequests", friendRequestRoutes);
router.use("/friends", friendRoutes);

module.exports = router;
