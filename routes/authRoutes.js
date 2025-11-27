const express = require("express");
const router = express.Router();
const { loginAdmin, createAdmin,getAllAdmins,verifyToken } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// Public
router.post("/login", loginAdmin);

// Only SuperAdmin can create Admin
router.post("/create", authMiddleware, roleMiddleware("superadmin"), createAdmin);

// SUPERADMIN ONLY CAN VIEW ALL ADMINS
router.get(
  "/viewAll/admins",
  authMiddleware,
  roleMiddleware(["superadmin"]),
  getAllAdmins
);


// Verify token → admin OR superadmin both allowed
router.get(
  "/verify/token",
  authMiddleware,
  roleMiddleware(["admin", "superadmin"]),
  verifyToken
);
module.exports = router;
