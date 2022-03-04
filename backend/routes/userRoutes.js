const express = require("express");
const router = express.Router();
const { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUserById } = require("../controllers/userController");
const admin = require("../middleware/adminMiddleware");
const protect = require("../middleware/authMiddleware");

router.post("/login", authUser);
router.route("/")
  .post(registerUser)
  .get(protect, admin, getUsers);

router.route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserById);


module.exports = router;
