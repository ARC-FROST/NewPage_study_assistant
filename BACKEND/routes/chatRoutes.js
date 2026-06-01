const express = require("express");

const router = express.Router();

const Chat = require("../models/Chat");

const authMiddleware = require("../middleware/authMiddleware");

// get chats for a pdf
router.get(
  "/:noteId",
  authMiddleware,
  async (req, res) => {
    try {
      const chats = await Chat.find({
        user: req.user.id,
        noteId: req.params.noteId,
      }).sort({ createdAt: 1 });

      res.json({
        success: true,
        chats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

module.exports = router;