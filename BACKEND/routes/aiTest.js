const express = require("express");
const router = express.Router();

const { generateText } = require("../services/aiService");

router.get("/", async (req, res) => {
  try {
    const response = await generateText(
      "Give me a 3-day DSA study plan for Graphs."
    );

    res.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;