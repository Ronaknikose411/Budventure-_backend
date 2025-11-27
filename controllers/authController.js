const Admin = require("../models/Admin");
const generateToken = require("../utils/generateToken");

// LOGIN ADMIN
// LOGIN ADMIN
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let admin = await Admin.findOne({ email }).select("+password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    // Remove password before sending response
    admin = {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      createdAt: admin.createdAt,
    };

    return res.json({
      message: "Login successful",
      token: generateToken(admin._id),
      admin,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// SUPERADMIN CREATES ADMIN
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const admin = await Admin.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({ message: "Admin created", admin });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin", error: error.message });
  }
};

// GET ALL ADMIN USERS (SUPERADMIN ONLY)
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");

    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin list" });
  }
};

// VERIFY TOKEN & RETURN ADMIN DETAILS
exports.verifyToken = async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.json({
      _id: req.admin._id,
      name: req.admin.name,
      email: req.admin.email,
      role: req.admin.role,
      createdAt: req.admin.createdAt
    });
  } catch (error) {
    res.status(500).json({ message: "Token verification failed" });
  }
};
