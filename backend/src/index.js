import { connectDB } from "./db/index.js";
import app from "./app.js";
import http from 'http'
import { Server } from "socket.io";

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin : process.env.CORS_ORIGIN,
        methods: ["GET", "POST"],
        credentials: true,
    }
})

connectDB()
        .then(()=>{
            app.on("error", (err) => {
                console.log("An error occurred while connecting with the database:", err);
              });
          
              // Socket.IO logic
              io.on("connection", (socket) => {
                console.log("New socket connection:", socket.id);
          
                socket.on("joinRoom", (eventId) => {
                  socket.join(eventId);
                  console.log(`User ${socket.id} joined event room ${eventId}`);
                });
          
                socket.on("sendMessage", ({ eventId, user, message }) => {
                  const timestamp = new Date();
                  io.to(eventId).emit("receiveMessage", { user, message, timestamp });
                });
          
                socket.on("disconnect", () => {
                  console.log("Socket disconnected:", socket.id);
                });
              });
          
              // Start server
              server.listen(process.env.PORT, () => {
                console.log(`Server listening on port ${process.env.PORT}`);
              });
        })
        .catch((err)=>{
            throw new Error(err.message);
        })