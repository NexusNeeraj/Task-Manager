const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");
const { downloadDocument } = require("../controllers/taskController");

router.get("/", protect, getTasks);
router.post("/", protect, upload.array("documents", 3), createTask);
router.get("/:id", protect, getTask);
router.put("/:id", protect, upload.array("documents", 3), updateTask);
router.delete("/:id", protect, deleteTask);
router.get("/download/:filePath", protect, downloadDocument);

module.exports = router;
