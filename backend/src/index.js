import { connectDB } from "./db/index.js";
import app from "./app.js";
import http from 'http'
const server = http.createServer(app)


connectDB()
        .then(()=>{
            app.on("error", (err) => {
                console.log("An error occurred while connecting with the database:", err);
              }); 
          
              // Socket.IO logic
              // initSocket(server);
          
              // Start server
              app.listen(process.env.PORT, () => {
                console.log(`Server listening on port ${process.env.PORT}`); 
              });
        })
        .catch((err)=>{
            throw new Error(err.message); 
        })
