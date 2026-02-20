const jwt = require("jsonwebtoken");

const verifyToken =  (req,res,next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message : "Unauthorized"
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY); // gives 3 things : id , iat , exp 
        req.userID = decoded.id; // we attached the id for  use it in "/profile" route ;) 
        next();
    }catch(error){
        return res.status(401).json({
            message : "Unauthorized"
        })
    }
}

module.exports = {verifyToken} ;