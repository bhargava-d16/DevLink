const UserModel = require("../../models/users");

const getUsers=async(req,res)=>{
     try{ 
         const userId=req.user._id;
         const usersList=await UserModel.find({_id:{$ne:userId}}).select("-password");
         res.status(200).json(usersList);
     }
     catch(error){
        res.status(500).json({message:"Internal Server Error"})
     }
}
module.exports=getUsers;