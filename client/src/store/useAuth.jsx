import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import axios from "axios";
import toast from "react-hot-toast";

export const useAuth = create((set)=>({
    authUser:null,
    setAuthUser: (user) => set({ authUser: user }),
    isCheckingAuth:true,
    isUpdatingProfile:false,
    checkAuth:async()=>{
        try{
             const response=await axiosInstance.get("/check");
             if(response.data){
                  set({authUser:response.data})
             }
        }
        catch(error){
             console.log("Error in checkAuth",error.response)   
             set({authUser:null})
        }    
        finally{
            set({isCheckingAuth:false});
        }
    },

    logout:async()=>{
         try{
             const response=await axiosInstance.post("/logout")
             toast.success("Logged out successfully");
             set({authUser:null});
         }
         catch(error){
            toast.success("Logout failed")
         }
    },

    updateProfile:async(data)=>{
         set({isUpdatingProfile:true});
         try{
             const response=await axiosInstance.put("/update-profile",data);
             set({authUser:response.data});
             toast.success("Profile updated successfully")
         }
         catch(error){
            toast.error(error.response.data.message)
         }
         finally{
            set({isUpdatingProfile:false});
         }
    }
}))