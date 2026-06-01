const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    actionType: String,
    result: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("History", historySchema);