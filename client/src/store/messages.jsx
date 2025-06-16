import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import axios from "axios";
import toast from "react-hot-toast";

export const useMessagesStore= create((set,get)=>({
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
            toast.error(error.response.data.message)
        }
      },

      getAllmessages:async(id)=>{
        
          try{
           const response=await axiosInstance.get(`/message/${id}`,{
              receiverId: id,
           })
           if(response.data){
               set({getmessages:response.data})
           }
        }
        catch(error){
            console.log(error);
            toast.error(error.response.data.message)
        }
      },

      sendMessages:async(messageData)=>{
       const { selectedUser, getmessages } = get();
          try{
             const response=await axiosInstance.post(`/message/send/${selectedUser._id}`,
             messageData
           )
           if(response.data){
               set({getmessages:[...getmessages,response.data.message]})
           }
        }
        catch(error){
            console.log(error);
            toast.error(error.response.data.message)
        }
      }
}))