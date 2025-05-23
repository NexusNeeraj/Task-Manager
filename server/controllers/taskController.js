const Task = require("../models/Task");
const path = require("path");
const fs = require("fs");

// Create task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, assignedTo } = req.body;
    const files = req.files?.map(file => file.path) || [];

    if (files.length > 3) {
      return res.status(400).json({ msg: "You can upload up to 3 files." });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
      documents: files,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all tasks with filtering, sorting, pagination
exports.getTasks = async (req, res) => {
  try {
    const { status, priority, sortBy = "dueDate", page = 1, limit = 10 } = req.query;
    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const tasks = await Task.find(query)
      .sort({ [sortBy]: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("assignedTo", "email");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get single task
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("assignedTo", "email");
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const update = { ...req.body };

    // Add new files if provided
    const files = req.files?.map(file => file.path) || [];
    if (files.length > 3) return res.status(400).json({ msg: "Max 3 files allowed" });
    if (files.length) update.documents = files;

    const task = await Task.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Download document
exports.downloadDocument = (req, res) => {
  const filePath = path.join(__dirname, "..", req.params.filePath);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ msg: "File not found" });
  }
  res.download(filePath);
};