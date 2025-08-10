const UserModel = require("../../models/users");

const updateEmail = async(req,res)=>{
     try{
          const newEmail=req.body.email;
          const userId=req.user._id;

          if(!newEmail){
            return res.status(400).json({message:"New email is required"});
          }
          const update=await UserModel.findByIdAndUpdate(userId,{email:newEmail},{new:true})
          res.status(200).json(update);
     }
     catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
     }
}

module.exports=updateEmail;