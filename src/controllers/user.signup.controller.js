const userModel = require("../model/schema.model");
const jwt = require("jsonwebtoken");
const userSignUp = async (req, res) => {
    const { username, email, password } = req.body;  
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address"
      });
    }
    if (password.length < 6 || password.length > 21) {
        return res.status(400).json({
            message: "Password must be between 6 and 21 characters long"
        });
    }
    if (username.length < 3 || username.length > 30) {
        return res.status(400).json({
            message: "Username must be between 3 and 30 characters long"
        });
    }
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already in use"
            });
        }
        const registeredUser = await userModel.create({
            username,
            email,
            password
        });

        const token = jwt.sign(
            { id: registeredUser._id },
            process.env.JWT_KEY,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

module.exports = { userSignUp };
