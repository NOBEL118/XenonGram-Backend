const userModel = require("../model/schema.model");

const homeController = async (req,res) => {
    try {
        const feed = await userModel.find({});
        res.status(200).json({feed});
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

module.exports = {homeController} ;