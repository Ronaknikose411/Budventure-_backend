const express = require("express");
const cors = require("cors");
const logger = require("./utils/logger");
const errorHandler = require("./middlewares/errorHandler");

// Routes
const authRoutes = require("./routes/authRoutes");
const trainingRoutes = require("./routes/trainingRoutes");
const chatRoutes = require("./routes/chatRoutes");
const widgetRoutes = require("./routes/widgetRoutes");
const adminChatRoutes = require("./routes/adminChatRoutes");

const app = express();

// MIDDLEWARES
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(logger);

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/widget", widgetRoutes);
app.use("/api/admin-chat", adminChatRoutes);

// HEALTH CHECK
app.get("/", (req, res) => {
  res.json({ message: "Chat Support Backend Running" });
});

// ERROR HANDLER (must be last)
app.use(errorHandler);

module.exports = app;
