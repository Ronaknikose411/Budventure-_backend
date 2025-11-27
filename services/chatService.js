const ChatSession = require("../models/ChatSession");

const createChatSession = async (sessionId) => {
  let session = await ChatSession.findOne({ userSessionId: sessionId });

  if (!session) {
    session = await ChatSession.create({
      userSessionId: sessionId,
      status: "ai",
      messages: [],
    });
  }

  return session;
};

const addUserMessage = async (sessionId, text) => {
  const session = await ChatSession.findOne({ userSessionId: sessionId });

  if (!session) return null;

  session.messages.push({
    sender: "user",
    text,
  });

  await session.save();

  return session;
};

const addAIMessage = async (sessionId, text) => {
  const session = await ChatSession.findOne({ userSessionId: sessionId });

  if (!session) return null;

  session.messages.push({
    sender: "ai",
    text,
  });

  await session.save();

  return session;
};

const requestHuman = async (sessionId) => {
  const session = await ChatSession.findOne({ userSessionId: sessionId });

  if (!session) return null;

  session.isHumanRequested = true;
  session.status = "waiting";

  await session.save();
  return session;
};

const acceptChat = async (sessionId, adminId) => {
  const session = await ChatSession.findOne({ userSessionId: sessionId });

  if (!session) return null;

  session.assignedAdmin = adminId;
  session.status = "connected";

  await session.save();
  return session;
};

const closeChat = async (sessionId) => {
  const session = await ChatSession.findOne({ userSessionId: sessionId });
  if (!session) return null;

  session.status = "closed";
  await session.save();

  return session;
};

module.exports = {
  createChatSession,
  addUserMessage,
  addAIMessage,
  requestHuman,
  acceptChat,
  closeChat,
};
