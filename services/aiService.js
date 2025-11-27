const TrainingData = require("../models/TrainingData");
const similarity = require("../utils/textSimilarity");

const aiRespond = async (userMessage) => {
  const trainingData = await TrainingData.find();

  if (!trainingData.length) {
    return "Sorry, no AI data available.";
  }

  let bestMatch = null;
  let highestScore = 0;

  trainingData.forEach((item) => {
    const score = similarity(userMessage, item.question);

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  });

  // Threshold for matching (small keyword-level AI)
  if (highestScore < 0.3) {
    const fallback = await TrainingData.findOne({ tags: "fallback" });
    return fallback ? fallback.answer : "Sorry, I did not understand that.";
  }

  return bestMatch.answer;
};

module.exports = {
  aiRespond,
};
