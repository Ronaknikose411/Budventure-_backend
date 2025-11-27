const TrainingData = require("../models/TrainingData");

const addTrainingData = async (data) => {
  const newData = await TrainingData.create(data);
  return newData;
};

const updateTrainingData = async (id, data) => {
  const updated = await TrainingData.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updated;
};

const deleteTrainingData = async (id) => {
  await TrainingData.findByIdAndDelete(id);
};

const getAllTrainingData = async () => {
  return await TrainingData.find().sort({ createdAt: -1 });
};

module.exports = {
  addTrainingData,
  updateTrainingData,
  deleteTrainingData,
  getAllTrainingData,
};
