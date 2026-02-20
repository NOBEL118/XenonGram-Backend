const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true,
        unique : [true , "Username already exists"],
        minlength : [3 , "Username must be at least 3 characters long"],
        maxlength : [30 , "Username must be less than 31 characters long"]
    } ,
    email : {
        type : String,
        required : true,
        unique : [true , "Email already exists"],
        match : [/^[^\s@]+@[^\s@]+\.[^\s@]+$/ , "please enter a valid email address"],
        trim : true,
        lowercase : true
    } , 
    password : {
        type : String,
        required : [true , "Password is required"],
        minlength : [6 , "Password must be at least 6 characters long"],
        maxlength : [20 , "Password must be less than 21 characters long"]
    }
});

userSchema.pre("save", async function () {
  try{
    // Only hash if password is modified (important!)
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    } catch(error) {
        return error ;
  }
});
// checking hashed password with user entered password for security reasons 
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword , this.password)
}
const userModel = mongoose.model("registers" , userSchema);

module.exports = userModel;