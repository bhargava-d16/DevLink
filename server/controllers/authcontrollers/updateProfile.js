const cloudinary = require("../../libs/cloudinary");

const UserModel = require("../../models/users");

const updateProfile=async(req,res)=>{
     try{
          const {profilePic}=req.body;   
          const userId=req.user._id;

          if(!profilePic){
            return res.status(400).json({message:"Profile pic is required"})
          }
          console.log("📦 profilePic received:", !!profilePic);
          // console.log("🖼 profilePic (first 50 chars):", profilePic?.slice(0, 50));
 console.log("📤 Uploading to Cloudinary...");
          const uploadResponse=await cloudinary.uploader.upload(profilePic);
         
            console.log("✅ Uploaded:", uploadResponse.secure_url);
          const updateUser=await UserModel.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
    console.log("✅ Uploaded to Cloudinary:", uploadResponse.secure_url);
          res.status(200).json(updateUser)
     }
     catch(error){
           console.error("❌ Cloudinary upload error:", error);
           res.status(500).json({message:"Internal Server Error"})
     }
}
module.exports=updateProfile;