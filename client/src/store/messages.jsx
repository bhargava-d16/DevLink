import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "./useAuth";

export const useMessagesStore= create((set,get)=>({
      chattedUsers: [],   
      setchattedUsers :(data)=>set({chattedUsers:data}),
      searchResults: [],
      setsearchResults :(data)=>set({searchResults:data}),
      clearSearchResults: () => set({ searchResults: [] }),
      selectedUser:false,
      setselectedUser:(data)=>set({selectedUser:data}),
      getmessages:[],
      setgetmessages:(data)=>set({getmessages:data}),


      fetchChattedUsers:async()=>{
        try{
           const response=await axiosInstance.get("/message/chatted-users")
           if(response.data){
               set({chattedUsers:response.data})
           }
        }
        catch(error){
            console.log(error);
            toast.error(error.response.data.message)
        }
      },

      searchUsers:async (query)=>{
          try{
            if(!query) {
              set({searchResults:[]});
              return;
            }
            const res=await axiosInstance.get(`/message/search?query=${query}`);
            set({searchResults:res.data});
          }
          catch{
             console.log(error);
          }
      },

      addToChattedUsers: (newUser) => {
          const { chattedUsers } = get();
          const updated = chattedUsers.filter(user => user._id !== newUser._id);
          set({ chattedUsers: [newUser, ...updated] });
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
      },

      listentoMessages:()=>{
           const {selectedUser}=get();
           if(!selectedUser) return;

           const socket=useAuth.getState().socket;

           socket.on("newMessage",(newMessage)=>{
               set({getmessages:[...get().getmessages,newMessage],
              })
           })
      },

      stopListening:()=>{
          const socket=useAuth.getState().socket;
          if (socket) {
                socket.off("newMessage");
          }
      },
}))