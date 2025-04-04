import { User } from "../models/user.model.js";


import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;
    console.log(username, fullName, email, password);

    // Check for missing fields
    if (!username || !fullName || !email || !password) {
      return res.status(400).json({ error: "Please fill in all required fields." });
    }

    // Check if user already exists (by email)
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json({ error: "User already exists with this email." });
    }

    // Optional: check for username duplication if it's also unique
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already taken." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      username,
      fullName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        _id: newUser._id,
        username: newUser.username,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Registration Error:", err);
    return res.status(500).json({ error: "Something went wrong during registration." });
  }
};


export const profile = async (req,res)=>{
    
}