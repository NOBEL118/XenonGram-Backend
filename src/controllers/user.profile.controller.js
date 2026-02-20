const  userModel = require("../model/schema.model");

const userProfileController = async (req,res) => {
    try {
        const user = req.userID ;
        if(!user){
            return res.status(404).json({message : "User not found"});
        }
        const userProfile = await userModel.findById(user).select("-password");
        res.status(200).json({userProfile});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {userProfileController} ;