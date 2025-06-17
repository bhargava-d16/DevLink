const cloudinary = require("../../libs/cloudinary");

const UserModel = require("../../models/users");

const updateProfile=async(req,res)=>{
     try{
          const {profilePic}=req.body;   
          const userId=req.user._id;

          if(!profilePic){
            return res.status(400).json({message:"Profile pic is required"})
          }
          
          const uploadResponse=await cloudinary.uploader.upload(profilePic);
          const updateUser=await UserModel.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
          res.status(200).json(updateUser)
     }
     catch(error){
           res.status(500).json({message:"Internal Server Error"})
     }
}
module.exports=updateProfile;