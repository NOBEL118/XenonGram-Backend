const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
    } ,
    msg : {
        type : String,
        required : true,
        min : 6,
    }
});

const userModel = mongoose.model("register" , userSchema);

module.exports = userModel;