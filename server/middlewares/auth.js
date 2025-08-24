const jwt=require("jsonwebtoken");
const UserModel = require("../models/users");

const protectRoute = async(req,res,next)=>{
    
    const token=req.cookies.jwt;
    if(!token){
        return res.status(401).json({message:"Unouthorized User"})
    }
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