const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.get("/", protect, isAdmin, getUsers);
router.get("/:id", protect, getUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, isAdmin, deleteUser);

module.exports = router;
