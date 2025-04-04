import { User } from "../models/user.model.js";

export const register = async (req, res) => {
    console.log(req.body);
    if (typeof req.body === "string") {
        console.log("🔹 Parsing String Body...");
        try {
            req.body = JSON.parse(req.body); // Manually parse JSON
        } catch (error) {
            console.log("❌ JSON Parsing Failed:", error);
        }
    }

    const { username, fullName, email, password } = req.body;
    console.log(username, fullName, email, password);

    if (!username || !fullName || !email || !password) {
        return res.status(400).json({ error: "Fill the required fields" });
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
        return res.status(400).json({ error: "User Already exists" });
    }

    const newUser = await User.create({
        username,
        fullName,
        email,
        password
    })

    if (!newUser) {
        return res.status(400).json({ error: "Error occured while creating the User" });
    }

    return res.status(200).json(newUser);
}


export const login = async (req, res) => {
    res.json({ message: "Login successful", user: req.user });
}