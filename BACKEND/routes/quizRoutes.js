const express = require("express");
const router = express.Router();

const PDFNote = require("../models/PDFNote");
const { generateText } = require("../services/aiService");

router.post("/generate", async (req, res) => {
  try {
    const { noteId } = req.body;

    const note = await PDFNote.findById(noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    // Get content from chunks
    const content =
      note.chunks
        ?.slice(0, 3)
        .map((chunk) => chunk.text)
        .join("\n\n") || "";

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "No content found in PDF",
      });
    }

    const prompt = `
Generate 5 MCQs from the content.

Return ONLY valid JSON.

Format:

[
  {
    "question":"...",
    "options":["A","B","C","D"],
    "correctAnswer":"A"
  }
]

CONTENT:
${content}
`;

    const quiz = await generateText(prompt);

const cleanedQuiz = quiz
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

let quizData;

try {
  quizData = JSON.parse(cleanedQuiz);
} catch (err) {
  return res.status(500).json({
    success: false,
    message: "AI returned invalid quiz format",
  });
}

    res.json({
      success: true,
      quiz: quizData,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;