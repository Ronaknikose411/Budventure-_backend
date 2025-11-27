
const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    answer: {
      type: String,
      required: true,
      trim: true,
    },

    tags: [
      {
        type: String,
        trim: true,
      }
    ],

    context: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("TrainingData", trainingSchema);
