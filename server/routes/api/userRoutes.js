const router = require("express").Router();
const UserController = require("../../controllers/UserController");

router.route("/login").post(UserController.login);

router
  .route("/")
  .get(UserController.getAllUsers)
  .post(UserController.createUser);

router
  .route("/:id")
  .get(UserController.getUserById)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = router;
