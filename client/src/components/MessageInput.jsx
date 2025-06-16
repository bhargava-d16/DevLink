import React, { useRef, useState } from "react";
import assets from "../assets/assets";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useMessagesStore } from "../store/messages";

const MessageInput = () => {

  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();
  const {sendMessages}=useMessagesStore();

  const handleImageChange = (e) => {
    
       const file=e.target.files[0];
       if(!file.type.startsWith("image")){
          toast.error("Please select an image file")
          return;
       }
       const reader=new FileReader();
       reader.onloadend=()=>{
         setImagePreview(reader.result);
       }
       reader.readAsDataURL(file);
  };

  const handleSendMessages = async(e) => { 
         e.preventDefault();
         if(!imagePreview && !text.trim()) return ;
         try{
            await sendMessages(
                {text:text.trim(),
                 image:imagePreview
                }
            )
            setText("");
            setImagePreview(null);
            if(fileInputRef.current.value) fileInputRef.current.value=""
         }
         catch(error){
           toast.error("Network Error: " + error.message);
        }
  };

  const removeImage = () => {
      setImagePreview(null);
      if(fileInputRef.current.value) fileInputRef.current.value=""
  };

  return (
    <div className="p-3 flex items-center gap-3 border-t border-gray-700">
      <div className="flex-1 flex items-center bg-gray-100/10 px-3 rounded-full">
        {imagePreview && (
          <div>
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-16 h-16 object-cover rounded-lg border border-zinc-700"
              />
              <button
                onClick={removeImage}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-800 text-white flex items-center justify-center"
                type="button"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
        <input
          type="text"
          placeholder="Send a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400 bg-transparent"
        />
        <input
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          hidden
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="icon" className="w-5 mr-2 cursor-pointer" />
        </label>
      </div>
       <button type="button" onClick={handleSendMessages}>
            <img src={assets.send_button} alt="Send" className="w-7 cursor-pointer"/>
       </button>
    </div>
  );
};

export default MessageInput;
