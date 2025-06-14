const jwt=require("jsonwebtoken");
const UserModel = require("../models/users");

const protectRoute = async(req,res,next)=>{
    const authorization=req.body.headers;
    if(!authorization){
        res.status(401).json({message:"You must be logged in"})
    }

    const token=authorization.split(" ")[1];
    token = token.replace(/^"|"$/g, '');

    try{
        const {userId}=jwt.verify(token,process.env.JWT_SECRET)
        const user=await UserModel.findOne({_id:userId})
        if(!user) {
            return res.json({message:"User not found"})
        }
        req.user=user;
        next();
    }
    catch(error){
         return res.send(401).json({message:"Response is not authorized"})
    }
}

module.exports=protectRoute;