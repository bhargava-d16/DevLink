const MessageModel = require("../../models/messages");

const getMessage = async(req,res)=>{
     try{
        // const id=req.params;
        const {id:usertoChatId} = req.params.id;
        const  myId=req.user._id;

        const messages=await MessageModel.find({
            $or:[
                {senderId:myId,receiverId:usertoChatId},
                {senderId:usertoChatId,receiverId:myId}
            ]
        })
        res.status(200).json(messages);
     }
     catch{
        res.status(500).json({message:"Internal Server Error"})
     }
}
module.exports=getMessage
