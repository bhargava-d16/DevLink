import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import axios from "axios";
import toast from "react-hot-toast";

export const useMessagesStore= create((set)=>({
      getusers:null,
      setgetusers :(data)=>set({getusers:data}),
      selectedUser:false,
      setselectedUser:(data)=>set({selectedUser:data}),
      getmessages:null,
      setgetmessages:(data)=>set({getmessages:data}),

      getAllusers:async()=>{
        try{
           const response=await axiosInstance.get("/message/users")
           if(response.data){
               set({getusers:response.data})
           }
        }
        catch(error){
            console.log(error);
            toast.success(error.response.data.message)
        }
      },

      getAllmessages:async(user1,user2)=>{
          try{
           const response=await axiosInstance.get(`/message/${id}`,{
              senderId: user1,
              receiverId: user2,
           })
           if(response.data){
               set({getmessages:response.data})
           }
        }
        catch(error){
            console.log(error);
            toast.success(error.response.data.message)
        }
      },

      sendMessages:async(id)=>{
          try{
           const response=await axiosInstance.get(`/message/send ${id}`,
            // {text,image},
           )
           if(response.data){
               set({getmessages:response.data})
           }
        }
        catch(error){
            console.log(error);
            toast.success(error.response.data.message)
        }
      }
}))