const express = require("express");
const router = express.Router();
const {
  addTraining,
  updateTraining,
  deleteTraining,
  getAllTraining,
} = require("../controllers/trainingController");

const authMiddleware = require("../middlewares/authMiddleware");

// ALL TRAINING ROUTES ARE ADMIN ONLY
router.use(authMiddleware);

router.post("/add", addTraining);
router.put("/update/:id", updateTraining);
router.delete("/delete/:id", deleteTraining);
router.get("/all", getAllTraining);

module.exports = router;
