const { 
  addTrainingData,
  updateTrainingData,
  deleteTrainingData,
  getAllTrainingData,
} = require("../services/trainingService");

// Helper: sanitize training data response
const formatTraining = (item) => {
  const formatted = {
    _id: item._id,
    question: item.question,
    answer: item.answer,
    tags: item.tags,
    __v: item.__v,
    createdAt: item.createdAt,
};

  // Only include context if not empty
  if (item.context && item.context.trim() !== "") {
    formatted.context = item.context;
  }

  return formatted;
};

// ADD TRAINING DATA
exports.addTraining = async (req, res) => {
  try {
    const data = { ...req.body, createdBy: req.admin._id };
    const created = await addTrainingData(data);

    const sanitized = formatTraining(created);
    res.status(201).json(sanitized);
  } catch (error) {
    res.status(500).json({ message: "Error adding training data" });
  }
};

// UPDATE TRAINING DATA
exports.updateTraining = async (req, res) => {
  try {
    const updated = await updateTrainingData(req.params.id, req.body);

    const sanitized = formatTraining(updated);
    res.json(sanitized);
  } catch (error) {
    res.status(500).json({ message: "Error updating training data" });
  }
};

// DELETE TRAINING DATA
exports.deleteTraining = async (req, res) => {
  try {
    await deleteTrainingData(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting training data" });
  }
};

// GET ALL TRAINING DATA
exports.getAllTraining = async (req, res) => {
  try {
    const data = await getAllTrainingData();

    const sanitized = data.map((item) => formatTraining(item));
    res.json(sanitized);
  } catch (error) {
    res.status(500).json({ message: "Error fetching training data" });
  }
};
