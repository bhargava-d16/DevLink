const MessageModel = require("../../models/messages");
const cloudinary=require('cloudinary')
const sendMessage = async(req,res)=>{
       try{
           const {text,image}=req.body;
           const senderId=req.user._id;
           const receiverId=req.params.id;
           let imageUrl;
           if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
           }

           const newMessage=new MessageModel({
                senderId,
                receiverId,
                text,
                image:imageUrl,
           })
          const savedMessage=await newMessage.save();
          console.log("saved data")
           res.status(201).json({
               success: true,
               message: savedMessage,
           });
          
          //socket.io 


          
        }
      
        catch (error) {
              console.error("Send Message Error:", error);  
        }

       
}
module.exports=sendMessage;