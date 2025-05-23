const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get all users (admin only)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get single user by ID (admin or self)
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Admins or the user themselves
    if (req.user.role !== "admin" && req.user.id !== user.id) {
      return res.status(403).json({ msg: "Access denied" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const update = {};
    if (email) update.email = email;
    if (password) update.password = await bcrypt.hash(password, 10);
    if (role && req.user.role === "admin") update.role = role;

    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true }).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ msg: "User deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
