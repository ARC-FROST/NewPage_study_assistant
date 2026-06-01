const mongoose = require("mongoose");

const chunkSchema = new mongoose.Schema({
  text: String,
  pageNumber: Number,
});

const pdfNoteSchema = new mongoose.Schema(
  {
    // Connect PDF 
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: String,

    fullText: String,

    summary: String,

    originalName: String,

    // RAG chunks
    chunks: [chunkSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "PDFNote",
  pdfNoteSchema
);