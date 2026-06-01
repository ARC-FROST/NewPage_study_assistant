const mongoose = require("mongoose");

const StudyPlanSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    hoursAvailable: {
        type: Number,
        required: true
    },
    goal: {
        type: String,
        required: true
    },
    generatedPlan: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("StudyPlan", StudyPlanSchema);