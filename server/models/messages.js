const mongoose=require("mongoose");
const UserModel = require("./users");
const messageSchema=new mongoose.Schema(
    {
       senderId:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"UserModel",
           required:true,
       }, 
        receiverId:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"UserModel",
           required:true,
       },
       text:{
           type:String,
       },
       image:{
           type:String,
       },
    },
    {timestamps:true}
)

const MessageModel=mongoose.model("Messages",messageSchema);
module.exports=MessageModel;