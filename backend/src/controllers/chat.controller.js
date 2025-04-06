import { ChatMessage } from "../models/chat.models.js";

export const getEventChatMessages = async (req, res) => {
  try {
    const { eventId } = req.params;
    const messages = await ChatMessage.find({ eventId }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages." });
  }
};
