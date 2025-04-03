import { User } from "../models/user.model.js";

export const register = async(req,res)=>{
    const {username, fullname, email, password} = req.body;

    if(!username || !fullname || !email || !password){
        return res.status(400).json({error:"Fill the required fields"});
    }

    const existedUser = await User.findOne({email});
    if(existedUser){
        return res.status(400).json({error:"User Already exists"});
    }

    const newUser = await User.create({
        username,
        fullname,
        email,
        password
    })

    if(!newUser){
        return res.status(400).json({error:"Error occured while creating the User"});
    }

    return res.status(200).json(newUser);
}


export const login = async(req,res)=>{
    res.json({ message: "Login successful", user: req.user });
}