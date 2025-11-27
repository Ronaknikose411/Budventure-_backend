const express = require("express");
const router = express.Router();

const {
  getWaitingChats,
  acceptChatRequest,
  getActiveChat,
  closeChat,
} = require("../controllers/adminChatController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// Only admin & superadmin can access admin chat
const allowAdmins = [authMiddleware, roleMiddleware(["admin", "superadmin"])];

// GET ALL WAITING CHAT REQUESTS
router.get("/waiting", allowAdmins, getWaitingChats);

// ACCEPT CHAT REQUEST
router.post("/accept/:sessionId", allowAdmins, acceptChatRequest);

// GET ACTIVE CHAT FOR THIS ADMIN
router.get("/active/:sessionId", allowAdmins, getActiveChat);

// CLOSE CHAT SESSION
router.post("/close/:sessionId", allowAdmins, closeChat);

module.exports = router;
