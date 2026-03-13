const express = require("express");
const router = express.Router();

const {
  getCurrentUser,
  updateUser,
  deleteUser,
  changePassword
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
const getUserFromToken = require("../middleware/userMiddleware");

router.get("/me", protect, getUserFromToken, getCurrentUser);
router.put("/me", protect, getUserFromToken, updateUser);
router.delete("/me", protect, getUserFromToken, deleteUser);
router.put("/me/change-password", protect, changePassword);

module.exports = router;