
const axios = require("axios");
const express = require("express");
const router = express.Router();

const StudyPlan = require("../models/StudyPlan");

// create Study Plan
router.post("/", async (req, res) => {
    try {
        const studyPlan = new StudyPlan({
            subject: req.body.subject,
            hoursAvailable: req.body.hoursAvailable,
            goal: req.body.goal,
            generatedPlan: req.body.generatedPlan
        });

        await studyPlan.save();

        res.status(201).json(studyPlan);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// GET All Study Plans
router.get("/", async (req, res) => {
    try {
        const studyPlans = await StudyPlan.find();

        res.status(200).json(studyPlans);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// generate Study Plan
router.post("/generate", async (req, res) => {
    try {
        const { subject, hoursAvailable, goal } = req.body;

        const prompt = `
Create a detailed study plan.

Subject: ${subject}
Hours Available Per Day: ${hoursAvailable}
Goal: ${goal}

Provide a structured study plan.
`;

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const generatedPlan =
            response.data.choices[0].message.content;

        const studyPlan = new StudyPlan({
            subject,
            hoursAvailable,
            goal,
            generatedPlan
        });

        await studyPlan.save();

        res.status(201).json(studyPlan);

    } catch (error) {
        console.error(error.response?.data || error.message);

        res.status(500).json({
            message: "Failed to generate study plan"
        });
    }
});
router.delete("/:id", async (req, res) => {
  try {
    await StudyPlan.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message:
        "Study plan deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;