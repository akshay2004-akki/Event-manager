import { User } from "../models/user.model.js";
import { Profile } from "../models/profile.model.js";


// import bcrypt from "bcryptjs";
import { isValidObjectId } from "mongoose";

export const register = async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;
    // console.log(username, fullName, email, password);

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


    // Create the new user
    const newUser = await User.create({
      username,
      fullName,
      email,
      password
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
    try {
        const userId = req.user?._id; // Get user ID from session (Passport)
        const { department, phoneNumber, section, collegeName, semester } = req.body;
    
        if (!userId || !department || !phoneNumber || !section || !collegeName || !semester) {
          return res.status(400).json({ error: "All fields are required." });
        }
    
        const newProfile = await Profile.create({
          userId,
          department,
          phoneNumber,
          section,
          collegeName,
          semester,
        });
    
        return res.status(201).json({ message: "Profile created successfully", profile: newProfile });
      } catch (error) {
        console.error("Error creating profile:", error);
        return res.status(500).json({ error: "Failed to create profile." });
      }
}

export const getProfile = async (req,res)=>{
  const userId = req.user?._id;

  if(!isValidObjectId(userId)){
    return new Error("Invalid User Id")
  }
  const details = await Profile.findOne({userId}).populate("userId")
  console.log(details);
  
  return res.status(200).json(details)
}

export const updateProfile = async (req,res)=>{
  try {
    const userId = req.user?._id;

    const { department, phoneNumber, section, collegeName, semester } = req.body;

    if(!isValidObjectId(userId)){
      return new Error("Invalid User Id")
    }

    if (!department || !phoneNumber || !section || !collegeName || !semester) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const updatedUser = await Profile.findByIdAndUpdate(userId, {department,phoneNumber, section, collegeName, semester}, {new:true})

  } catch (error) {
    
  }
}
