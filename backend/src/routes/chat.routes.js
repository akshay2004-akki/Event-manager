import express from "express";
import { Message } from "../models/chat.models.js"; // Adjust path if needed
import { isAuthenticated } from "../middlewares/auth.middleware.js"; // Adjust path if needed

const router = express.Router();

/**
 * @route GET /api/v1/chat/messages/:otherUserId
 * @description Get chat messages between the logged-in user and another user.
 * @access Private (Requires authentication)
 * @param {string} otherUserId - The ID of the other user in the chat.
 */
router.get("/messages/:otherUserId", isAuthenticated, async (req, res) => {
  // Get the logged-in user's ID from the request object (set by isAuthenticated middleware)
  const currentUserId = req.user?._id; // Use optional chaining for safety
  const { otherUserId } = req.params;

  // Basic validation
  if (!currentUserId) {
    return res.status(401).json({ error: "Authentication required." });
  }
  if (!otherUserId) {
    return res.status(400).json({ error: "Other user ID parameter is missing." });
  }

  try {
    // Fetch messages where the sender/receiver pair matches the current users
    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: currentUserId },
      ],
    })
    .sort({ timestamp: 1 }) // Sort by timestamp ascending (oldest first)
    .limit(100); // Optional: Limit the number of messages fetched for performance

    // Respond with the fetched messages
    res.status(200).json(messages);

  } catch (err) {
    console.error("Error fetching chat messages:", err);
    res.status(500).json({ error: "Internal server error. Failed to fetch messages." });
  }
});

export default router; // Export the router instance

// --- Make sure to mount this router in your main app.js/server.js ---
// Example:
// import chatRouter from './routes/chat.routes.js'; // Adjust path
// app.use('/api/v1/chat', chatRouter); // Mount under a base path like /api/v1/chat
