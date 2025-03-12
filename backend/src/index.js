import { connectDB } from "./db/index.js";
import app from "./app.js";

connectDB()
        .then(()=>{
            app.on("error",(err)=>{
                console.log("An error occured while conneting eith database : ", err);
            })

            app.listen(process.env.PORT,()=>{
                console.log(`Server Listining on port ${process.env.PORT}`);
                
            })
        })