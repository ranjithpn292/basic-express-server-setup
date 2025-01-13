const express = require("express");
const {
  handleGetAllUsers,
  handleGetAllUsersAsHTML,
  createUser,
  getUserById,
  patchUserById,
  deleteUserById,
} = require("../controllers/user");

const router = express.Router();

//ROUTES
// for websites just return JSON
router.get("/web", handleGetAllUsersAsHTML);

router.route("/").get(handleGetAllUsers).post(createUser);

router
  .route("/:id")
  .get(getUserById)
  .patch(patchUserById)
  .delete(deleteUserById);

module.exports = router;
