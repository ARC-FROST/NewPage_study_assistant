const fs = require("fs");
const pdfParse = require("pdf-parse");
const PDF = require("../models/Pdf");

const uploadPDF = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Read PDF file
        const dataBuffer = fs.readFileSync(req.file.path);
        const pdfData = await pdfParse(dataBuffer);

        // Save to MongoDB
        const newPdf = await PDF.create({
            filename: req.file.filename,
            originalName: req.file.originalname,
            text: pdfData.text
        });

        res.status(201).json({
            message: "PDF uploaded, extracted & saved",
            data: newPdf
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { uploadPDF };