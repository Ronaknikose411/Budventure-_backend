const ChatSession = require("../models/ChatSession");

let onlineAdmins = 0;

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // USER JOIN ROOM
    socket.on("joinRoom", (sessionId) => {
      socket.join(sessionId);
      console.log(`User joined room: ${sessionId}`);
    });

    // ADMIN JOIN ROOM
    socket.on("adminJoin", (sessionId) => {
      socket.join(sessionId);
      console.log(`Admin joined room: ${sessionId}`);
    });

    // USER SEND MESSAGE
    socket.on("userMessage", async ({ sessionId, text }) => {
      const session = await ChatSession.findOne({ userSessionId: sessionId });
      if (!session) return;

      session.messages.push({ sender: "user", text });
      await session.save();

      io.to(sessionId).emit("newMessage", { sender: "user", text });
    });

    // ADMIN SEND MESSAGE (adminId not needed)
    socket.on("adminMessage", async ({ sessionId, text }) => {
      const session = await ChatSession.findOne({ userSessionId: sessionId });
      if (!session) return;

      session.messages.push({ sender: "admin", text });
      await session.save();

      io.to(sessionId).emit("newMessage", { sender: "admin", text });
    });

    // TYPING INDICATOR
    socket.on("typing", ({ sessionId, sender }) => {
      socket.to(sessionId).emit("typing", { sender });
    });

    // ADMIN ONLINE STATUS
    socket.on("adminOnline", () => {
      onlineAdmins++;
      io.emit("adminStatus", onlineAdmins);
    });

    socket.on("adminOffline", () => {
      onlineAdmins = Math.max(0, onlineAdmins - 1);
      io.emit("adminStatus", onlineAdmins);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};



/* const ChatSession = require("../models/ChatSession");

let onlineAdmins = 0;

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // USER JOIN ROOM
    socket.on("joinRoom", (sessionId) => {
      socket.join(sessionId);
      console.log(`User joined room: ${sessionId}`);
    });

    // ADMIN JOIN ROOM
    socket.on("adminJoin", (sessionId) => {
      socket.join(sessionId);
      console.log(`Admin joined room: ${sessionId}`);
    });

    // USER SEND MESSAGE
    socket.on("userMessage", async ({ sessionId, text }) => {
      const session = await ChatSession.findOne({ userSessionId: sessionId });

      if (!session) return;

      session.messages.push({
        sender: "user",
        text,
      });

      await session.save();

      io.to(sessionId).emit("newMessage", {
        sender: "user",
        text,
      });
    });

    // ADMIN SEND MESSAGE
    socket.on("adminMessage", async ({ sessionId, text, adminId }) => {
      const session = await ChatSession.findOne({ userSessionId: sessionId });

      if (!session) return;

      session.messages.push({
        sender: "admin",
        text,
      });

      await session.save();

      io.to(sessionId).emit("newMessage", {
        sender: "admin",
        text,
      });
    });

    // TYPING INDICATOR
    socket.on("typing", ({ sessionId, sender }) => {
      socket.to(sessionId).emit("typing", { sender });
    });

    // ADMIN STATUS
    socket.on("adminOnline", () => {
      onlineAdmins++;
      io.emit("adminStatus", onlineAdmins);
    });

    socket.on("adminOffline", () => {
      onlineAdmins = Math.max(0, onlineAdmins - 1);
      io.emit("adminStatus", onlineAdmins);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};
 */