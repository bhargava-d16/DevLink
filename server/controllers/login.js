const UserModel=require("../models/users");
const bcrypt=require("bcrypt");
const loginUser = async(req,res,next) =>{
     const {email,password}=req.body;
     try{
         const formattedEmail=email.toLowerCase();
         const isUser=await UserModel.findOne({email:formattedEmail});
         if(!isUser){
             return res.status(400).json({message:"The user does not exist"})
         }
         const isPassword=await bcrypt.compare(password,isUser.password);
         if(!isPassword){
             return res.status(400).json({message:"Incorrect pasword"});
         }

         res.status(200).json({message:"Login successfull",status:true,username:isUser.username})
     }
     catch(err){
        next(err);
     }
}
module.exports=loginUser