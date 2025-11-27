const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const app = require("./app");
const socketHandler = require("./config/socket");
const seedSuperAdmin = require("./config/seedSuperAdmin");
require("dotenv").config();
const cors = require("cors");

const server = http.createServer(app);

// -------- EXPRESS CORS FIX --------
app.use(
  cors({
    origin: [
      "http://localhost:5173",     // React Admin Panel
      "http://localhost:7000",     // Widget Localhost iframe
      "http://127.0.0.1:5173",
      "*"
    ],
    credentials: true,
  })
);

// -------- SOCKET.IO CORS FIX --------
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",      // Frontend admin panel
      "http://localhost:7000",      // Widget
      "*"
    ],
    methods: ["GET", "POST"],
  },
});

// Initialize sockets
socketHandler(io);

// Connect DB + Seed
connectDB().then(() => {
  seedSuperAdmin();
});

const PORT = process.env.PORT || 7000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
