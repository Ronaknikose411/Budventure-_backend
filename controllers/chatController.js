const {
  createChatSession,
  addUserMessage,
  addAIMessage,
  requestHuman,
} = require("../services/chatService");

const { aiRespond } = require("../services/aiService");

// CREATE SESSION
exports.createSession = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await createChatSession(sessionId);

    res.json({
      message: "Session created",
      session,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating session" });
  }
};

// USER SENDS MESSAGE → AI
exports.userMessageToAI = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { text } = req.body;

    await addUserMessage(sessionId, text);

    const aiReply = await aiRespond(text);

    await addAIMessage(sessionId, aiReply);

    res.json({
      sender: "ai",
      text: aiReply,
    });
  } catch (error) {
    res.status(500).json({ message: "AI response failed" });
  }
};

// USER REQUESTED HUMAN SUPPORT
exports.requestHumanSupport = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const updated = await requestHuman(sessionId);

    res.json({
      message: "Human support requested",
      session: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Error requesting human support" });
  }
};
