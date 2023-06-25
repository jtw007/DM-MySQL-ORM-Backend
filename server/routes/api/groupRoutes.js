const router = require("express").Router();
const { authMiddleware } = require("../../utils/auth");
const {
  createGroup,
  createGroupMessage,
  getGroupContents,
  inviteUsers,
  acceptInvitation,
  declineInvitation,
} = require("../../controllers/GroupController");

router.route("/").post(authMiddleware, createGroup);

router
  .route("/:groupId/messages")
  .post(authMiddleware, createGroupMessage)
  .get(authMiddleware, getGroupContents);

router.route("/:groupId/invite").post(authMiddleware, inviteUsers);

router
  .route("/:groupId/invitation/accept")
  .post(authMiddleware, acceptInvitation);

router
  .route("/:groupId/invitation/decline")
  .post(authMiddleware, declineInvitation);

module.exports = router;
