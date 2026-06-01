const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdf = require("pdf-parse");
const fs = require("fs");
const PDFNote = require("../models/PDFNote");
const Chat = require("../models/Chat");
const { generateText } = require("../services/aiService");
const chunkText = require("../utils/chunkText");
const authMiddleware = require("../middleware/authMiddleware");
const upload = multer({
    dest: "uploads/",
});

router.post(
  "/upload",
  authMiddleware,
  upload.single("pdf"),
  async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        // Read pdf file
        const dataBuffer = fs.readFileSync(req.file.path);

        // Extract text
        const pdfData = await pdf(dataBuffer);
        const extractedText = pdfData.text;

        // AI prompt
        const prompt = `
Summarize the following PDF notes in simple study-friendly points:

${extractedText.slice(0, 3000)}
        `;

        // AI summary
        const summary = await generateText(prompt);

        // Save to MongoDB
        const chunks = chunkText(extractedText, 1000).map(c => ({
    text: c
}));

const savedNote = await PDFNote.create({
    user: req.user.id,

    title: req.file.originalname,

    originalName: req.file.originalname,

    summary,

    fullText: extractedText.slice(0, 20000),

    chunks,
});

        // Delete temp file
        fs.unlinkSync(req.file.path);

        // Response
        res.json({
            success: true,
            summary,
            id: savedNote._id,
        });

    } catch (error) {
        console.log("PDF Upload Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
router.get("/all", authMiddleware, async (req, res) => {
    try {
        const notes = await PDFNote.find({
    user: req.user.id
}).sort({ createdAt: -1 });

        res.json({
            success: true,
            notes
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
router.post("/ask", authMiddleware, async (req, res) => {
    try {
        const { noteId, question } = req.body;

        if (!noteId || !question) {
            return res.status(400).json({
                success: false,
                message: "noteId and question required"
            });
        }

        const note = await PDFNote.findOne({
    _id: noteId,
    user: req.user.id
});

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        const questionWords = question.toLowerCase().split(" ");

        // RAG RETRIEVAL 
        const scoredChunks = note.chunks.map((chunk) => {
            let score = 0;

            questionWords.forEach(word => {
                if (chunk.text.toLowerCase().includes(word)) {
                    score++;
                }
            });

            return {
                text: chunk.text,
                score
            };
        });

        scoredChunks.sort((a, b) => b.score - a.score);

        const topChunks = scoredChunks.slice(0, 3).map(c => c.text);

        const prompt = `
You are an AI study assistant.

Answer ONLY using the context below.

CONTEXT:
${topChunks.join("\n\n")}

QUESTION:
${question}

Give a clear, simple explanation.
`;

       const answer = await generateText(prompt);

await Chat.create({
    user: req.user.id,
    noteId,
    question,
    answer,
});

res.json({
    success: true,
    answer
});

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await PDFNote.findOneAndDelete({
  _id: req.params.id,
  user: req.user.id,
});

    res.json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;