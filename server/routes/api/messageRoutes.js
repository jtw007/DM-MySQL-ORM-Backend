const router = require("express").Router();
const messageController = require("../../controllers/messageController");
const { authMiddleware } = require("../../utils/auth");

router.route("/").post(authMiddleware, messageController.createMessage);

router
  .route("/all")
  .get(authMiddleware, messageController.getAllMessagesForUser);

router
  .route("/:messageId")
  .delete(authMiddleware, messageController.deleteMessage);

module.exports = router;
