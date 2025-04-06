import express from "express";
import { Message } from "../models/chat.models.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Get messages between two users
router.get("/messages/:userId", isAuthenticated ,async (req, res) => {
  const currentUserId = req.user._id;
  const { userId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: userId },
        { senderId: userId, receiverId: currentUserId },
      ],
    }).sort("timestamp");

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;
