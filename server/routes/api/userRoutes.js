const router = require("express").Router();
const UserController = require("../../controllers/UserController");
const { authMiddleware } = require("../../utils/auth");

router.route("/login").post(UserController.login);

router
  .route("/")
  .get(UserController.getAllUsers)
  .post(UserController.createUser);

router
  .route("/me")
  .get(authMiddleware, UserController.getMyProfile)
  .put(authMiddleware, UserController.updateMyProfile)
  .delete(authMiddleware, UserController.deleteUser);

module.exports = router;
