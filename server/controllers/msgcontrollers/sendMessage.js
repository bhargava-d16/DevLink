const MessageModel = require("../../models/messages");

const sendMessage = async(req,res)=>{
       try{
           const {text,image}=req.body;
           const senderId=req.user._id;
           const {id:receiverId}=req.params.id;

           let imageUrl;
           if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
           }

           const newMessage=({
                senderId,
                receiverId,
                text,
                image:imageUrl,
           })
          await newMessage.save();
          
          //socket.io 


          
        }
       catch(error){
         res.status(500).json({Message:"Intenal Server Error"})
       }
}
module.exports=sendMessage;