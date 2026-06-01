const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
    filename: String,
    originalName: String,
    text: String
}, { timestamps: true });

module.exports = mongoose.model("PDF", pdfSchema);