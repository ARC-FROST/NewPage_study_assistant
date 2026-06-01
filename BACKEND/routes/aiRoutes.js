const express = require("express");
const router = express.Router();

// test file
router.get("/", (req, res) => {
    res.json({ message: "AI route working 🚀" });
});

router.post("/generate", async (req, res) => {
    try {
        const { prompt } = req.body;

        // (later you will connect OpenAI here)
        res.json({
            message: "AI response generated",
            input: prompt,
            output: `This is a mock response for: ${prompt}`
        });

    } catch (error) {
        res.status(500).json({ error: "AI route failed" });
    }
});

module.exports = router;