const express = require("express");
const router = express.Router();

//test
router.get("/", (req, res) => {
    res.json({ message: "Notes route working 🚀" });
});

router.post("/create", (req, res) => {
    try {
        const { title, content } = req.body;

        res.json({
            message: "Note created successfully",
            note: { title, content }
        });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;