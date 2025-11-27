const ChatSession = require("../models/ChatSession");
const { acceptChat, closeChat } = require("../services/chatService");

// GET ALL WAITING CHATS (human requested)
exports.getWaitingChats = async (req, res) => {
  try {
    const sessions = await ChatSession.find({ status: "waiting" })
      .sort({ createdAt: -1 });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Error loading waiting chats" });
  }
};

// ADMIN ACCEPT CHAT
exports.acceptChatRequest = async (req, res) => {
  try {
    const updated = await acceptChat(req.params.sessionId, req.admin._id);

    res.json({
      message: "Chat connected",
      session: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Error accepting chat" });
  }
};

// ADMIN VIEW ACTIVE CHAT
exports.getActiveChat = async (req, res) => {
  try {
    const session = await ChatSession.findOne({
      userSessionId: req.params.sessionId,
      assignedAdmin: req.admin._id,
    });

    if (!session)
      return res.status(404).json({ message: "Chat not found or not assigned" });

    res.json(session);
  } catch (error) {
    res.status(500).json({ message: "Error loading chat" });
  }
};

// CLOSE CHAT
exports.closeChat = async (req, res) => {
  try {
    const updated = await closeChat(req.params.sessionId);

    res.json({
      message: "Chat closed",
      session: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Error closing chat" });
  }
};
