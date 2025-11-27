const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatSession",
      required: true,
    },

    sender: {
      type: String,
      enum: ["user", "ai", "admin"],
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    timestamp: {
      type: Date,
      default: Date.now,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
