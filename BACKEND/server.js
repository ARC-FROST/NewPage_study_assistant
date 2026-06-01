const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const User = require("./models/User");
const app = express();
const aiTestRoute = require("./routes/aiTest");
const authRoutes = require("./routes/authRoutes");

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json());

/* ---------------- ROUTES ---------------- */
const aiRoutes = require("./routes/aiRoutes");
const noteRoutes = require("./routes/noteRoutes");
const studyPlanRoutes = require("./routes/studyPlanRoutes");
const pdfRoutes = require("./routes/pdfRoutes");
const quizRoutes = require("./routes/quizRoutes");
const chatRoutes = require("./routes/chatRoutes");

app.use("/api/ai", aiRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/studyplans", studyPlanRoutes);
app.use("/api/ai-test", aiTestRoute);
app.use("/api/pdf", pdfRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/quiz", quizRoutes);


/* 🔥 FIXED POSITION */
app.use("/api/auth", authRoutes);

/* ---------------- HEALTH CHECK ---------------- */
app.get("/", (req, res) => {
    res.send("AI Study Assistant Backend Running 🚀");
});

app.post("/api/users", async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email
        });

        await user.save();

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
/* ---------------- DB + SERVER START ---------------- */
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((err) => {
    console.log("MongoDB Error:", err);
});
