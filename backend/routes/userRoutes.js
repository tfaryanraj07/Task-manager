const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Get all employees (Admin only)
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).select("-password");
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;