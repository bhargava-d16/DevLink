const UserModel = require("../models/users");
const bcrypt = require("bcrypt");
const joi = require("joi");
const jwt = require("jsonwebtoken");

const registerUser = async (req,res,next)=>{
     const{username,email,password}=req.body;
     try{
         const formattedEmail=email.toLowerCase();
         const formattedName=username.toLowerCase();
         const existingUser=await UserModel.findOne({email:formattedEmail,username:formattedName})
         if(existingUser){
           return res.status(400).json({message:"This user already exist"})
         }

         const hashedPassword= await bcrypt.hash(password,10);

         const newUser=new UserModel({
            username:formattedName,
            email:formattedEmail,
            password:hashedPassword,
         })

         await newUser.save();
         res.status(200).json({username:newUser.username,message:"User registered successfully"})

     }   
     catch(err){
          next(err);
     }
}

module.exports=registerUser;