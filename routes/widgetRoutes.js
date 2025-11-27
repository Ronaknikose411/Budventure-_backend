const express = require("express");
const router = express.Router();
const {
  getWidgetConfig,
  getSessionHistory,
} = require("../controllers/widgetController");

// Load widget settings for iframe
router.get("/config", getWidgetConfig);

// Get previous chat history for user session
router.get("/history/:sessionId", getSessionHistory);

module.exports = router;
