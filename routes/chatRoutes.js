const express = require("express");
const router = express.Router();
const {
  createSession,
  userMessageToAI,
  requestHumanSupport,
} = require("../controllers/chatController");

// User creates session / no auth needed
router.post("/session/create", createSession);

// User sends message → AI
router.post("/session/:sessionId/message", userMessageToAI);

// User requests human support
router.post("/session/:sessionId/human", requestHumanSupport);

module.exports = router;
