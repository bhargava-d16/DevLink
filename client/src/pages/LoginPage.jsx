import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import assets from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { useAuth } from '../store/useAuth';

const LoginPage = () => {
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [isLoading,setisLoading]=useState(false);
  const [showPassword,setshowPassword]=useState(false);
  const navigate=useNavigate();
  const {authUser,setAuthUser,connectSocket,login} =useAuth();

  const emailChange=(e)=>{
     setEmail(e.target.value);
  }

  const passwordChange=(e)=>{
     setPassword(e.target.value);
  }

  const submitHandler=async(e)=>{
    setisLoading(true);
    e.preventDefault();
    try{
      await login({
       email:email,
       password:password,
      })
       navigate("/home")
    }
    catch(error){
       console.log(error);
    }
    finally{
      setisLoading(false);
    }
    
  }


  return (
   <div className="min-h-screen bg-center bg-cover relative flex items-center justify-center">
      
      <form onSubmit={submitHandler}>
      <div
        className="absolute inset-0 bg-center bg-cover brightness-30 backdrop-blur-sm z-0"
        style={{
          backgroundImage: `url('/bgImage.svg')`,
        }}
      />

      
      <div className="absolute -left-20 -top-20 w-[600px] h-[600px] bg-gradient-to-br from-purple-600 via-indigo-500 to-purple-900 rounded-full blur-[140px] opacity-50 z-0" />
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-gradient-to-tr from-purple-700 via-indigo-600 to-purple-900 rounded-full blur-[120px] opacity-40 z-0" />

      
      <div className="relative z-10 bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-10 max-w-md w-full text-center space-y-6">
        <img src={assets.logo} alt="Logo" className="w-36 mx-auto drop-shadow-xl" />

        <h2 className="text-3xl font-bold text-white">Welcome to ChatApp 👋</h2>
        <p className="text-gray-400 text-sm">Log in with your account</p>

       
        <input
          onChange={emailChange}
          type="email"
          placeholder="Email address"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white border border-gray-700 focus:outline-none"
        />
        <div className="relative w-full">
        <input
          onChange={passwordChange}
          type={showPassword?"text":"password"}
          placeholder="Password"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white border border-gray-700 focus:outline-none"
        />

        <button
          type="button"
          className='absolute inset-y-0 right-0 pr-3 flex items-center'
          onClick={()=>setshowPassword(!showPassword)}
          >
            {showPassword?(
               <EyeOff className='size-5 text-base-content/40 text-white'/>
            ):(
                <Eye className='size-5 text-base-content/40  text-white'/>
            )}
        </button>
        </div>

        <button disabled={isLoading} className="w-full px-4 py-3 mt-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-xl  opacity-50">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader className="animate-spin h-5 w-5 text-white" />
              Logging in...
            </div>
          ) : (
            'Log In'
          )}

        </button>

      </div>
      </form>
    </div>
  );
};

export default LoginPage;
