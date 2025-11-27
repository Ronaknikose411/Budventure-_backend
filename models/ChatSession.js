const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ["user", "ai", "admin"],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

const chatSessionSchema = new mongoose.Schema(
  {
    userSessionId: {
      type: String,
      required: true,
    },

    messages: [messageSchema],

    isHumanRequested: {
      type: Boolean,
      default: false,
    },

    assignedAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    status: {
      type: String,
      enum: ["ai", "waiting", "connected", "closed"],
      default: "ai",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatSession", chatSessionSchema);
