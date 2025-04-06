import { Server } from "socket.io";
import { Message } from '../models/chat.models.js';

let io; 

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId); // Join personal room
    });

    socket.on("private-message", async ({ senderId, receiverId, message }) => {
      const newMessage = await Message.create({ senderId, receiverId, message });

      io.to(receiverId).emit("receive-message", {
        senderId,
        message,
        timestamp: newMessage.timestamp,
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
