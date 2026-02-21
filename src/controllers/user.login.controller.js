const userModel = require("../model/schema.model");
const jwt = require("jsonwebtoken");
const userLogin = async (req,res) => {
    const {email ,password} = req.body ;
    if(!email || !password){
        return res.status(400).json({
            message : "All fields are required "
        })
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
    try{
        const registeredUser =  await userModel.findOne({email : email}).select("+password");
        if(!registeredUser){
            return res.status(400).json({
                message : "Invalid email or password"
            })
        }
        const isPasswordValid = await registeredUser.comparePassword(password);
        if(!isPasswordValid){
            return res.status(400).json({
                message : "Invalid email or password"
            })
        }
        const token = jwt.sign({id: registeredUser._id }, process.env.JWT_KEY , {expiresIn: "1d"});
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.status(200).json({message : "Login successful"});
    } catch(error){
        return res.status(500).json({
            message: "Something went wrong",
        }); 
    }
};

module.exports = {userLogin} ;
