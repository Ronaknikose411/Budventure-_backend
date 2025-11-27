const ChatSession = require("../models/ChatSession");
const TrainingData = require("../models/TrainingData");

// RETURN WIDGET CONFIG
exports.getWidgetConfig = async (req, res) => {
  try {
    const welcome = await TrainingData.findOne({ tags: "welcome" });

    res.json({
      welcomeMessage: welcome?.answer || "Hello! How can I help you?",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load widget config" });
  }
};

// USER SESSION HISTORY
exports.getSessionHistory = async (req, res) => {
  try {
    const session = await ChatSession.findOne({
      userSessionId: req.params.sessionId,
    });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.json(session.messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch session history" });
  }
};
