import { User } from "../models/user.model.js";

<<<<<<< HEAD
export const register = async (req, res) => {
=======
export const register = async(req,res)=>{
>>>>>>> f70c59ee447e91501c23151c99ae6702b4f125e8
    console.log(req.body);
    if (typeof req.body === "string") {
        console.log("🔹 Parsing String Body...");
        try {
            req.body = JSON.parse(req.body); // Manually parse JSON
        } catch (error) {
            console.log("❌ JSON Parsing Failed:", error);
        }
    }
<<<<<<< HEAD

    const { username, fullName, email, password } = req.body;
    console.log(username, fullName, email, password);

    if (!username || !fullName || !email || !password) {
        return res.status(400).json({ error: "Fill the required fields" });
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
        return res.status(400).json({ error: "User Already exists" });
=======
    
    const {username, fullName, email, password} = req.body;
    console.log(username,fullName,email,password);
    
    if(!username || !fullName || !email || !password){
        return res.status(400).json({error:"Fill the required fields"});
    }

    const existedUser = await User.findOne({email});
    if(existedUser){
        return res.status(400).json({error:"User Already exists"});
>>>>>>> f70c59ee447e91501c23151c99ae6702b4f125e8
    }

    const newUser = await User.create({
        username,
        fullName,
        email,
        password
    })

<<<<<<< HEAD
    if (!newUser) {
        return res.status(400).json({ error: "Error occured while creating the User" });
=======
    if(!newUser){
        return res.status(400).json({error:"Error occured while creating the User"});
>>>>>>> f70c59ee447e91501c23151c99ae6702b4f125e8
    }

    return res.status(200).json(newUser);
}


<<<<<<< HEAD
export const login = async (req, res) => {
=======
export const login = async(req,res)=>{
>>>>>>> f70c59ee447e91501c23151c99ae6702b4f125e8
    res.json({ message: "Login successful", user: req.user });
}