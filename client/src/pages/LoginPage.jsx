import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import assets from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from 'react';

const LoginPage = () => {
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  // const { loginWithPopup, logout, user, isAuthenticated } = useAuth0();
  const navigate=useNavigate();

  // const handleLogin=async (provider) => {
  // try {
  //   await loginWithPopup({ connection: provider });
  //   // if(user && isAuthenticated){
  //   //      saveOAuthUser(user);
  //   // }
  //   toast.success("Login successfull through"+provider)
  //   navigate('/');
  // } catch (err) {
  //   toast.error("Login failed");
  // }
  // };


  // const saveOAuthUser=async()=>{
  //      try{
  //          const response=await axios.post("http://localhost:8080/api/login")
  //      }
  //      catch(error){
  //         toast.error("Login failed");
  //      }
  // }

  const emailChange=(e)=>{
     setEmail(e.target.value);
  }

  const passwordChange=(e)=>{
     setPassword(e.target.value);
  }

  const submitHandler=async(e)=>{
    e.preventDefault();
    try{
         const response=await axios.post("http://localhost:8080/api/login",
              {email,password},
              { 
                headers:{
                "Content-type":"application/json"
              }
            },
         )
         if(response.data){
            toast.success("Login successfull");
            navigate("/home");
         }
    }
    catch(error){
        if(error.response){
            toast.error(error.response.data.message || "Login failed")
        }
        else if(error.request){
           toast.error("No response from the server.Please check your connection")
        }
        else{
           toast.error("An unexpected error occured.Please try again")
        }
    }
  }


  return (
   <div className="min-h-screen bg-center bg-cover relative flex items-center justify-center">
      {/* Background image with reduced brightness and blur */}
      <form onSubmit={submitHandler}>
      <div
        className="absolute inset-0 bg-center bg-cover brightness-30 backdrop-blur-sm z-0"
        style={{
          backgroundImage: `url('/bgImage.svg')`,
        }}
      />

      {/* Gradient blobs */}
      <div className="absolute -left-20 -top-20 w-[600px] h-[600px] bg-gradient-to-br from-purple-600 via-indigo-500 to-purple-900 rounded-full blur-[140px] opacity-50 z-0" />
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-gradient-to-tr from-purple-700 via-indigo-600 to-purple-900 rounded-full blur-[120px] opacity-40 z-0" />

      {/* Login Box */}
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
        <input
          onChange={passwordChange}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white border border-gray-700 focus:outline-none"
        />
        <button className="w-full px-4 py-3 mt-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-xl  opacity-50">
          Log in 
        </button>

        {/* <div className="text-gray-400 text-sm">or continue with</div>
        <div className="space-y-4">
   <div className="flex flex-col sm:flex-row sm:justify-center gap-4">       
  <button
    onClick={()=>handleLogin('google-oauth2')}
    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-black font-medium rounded-xl shadow hover:bg-gray-100 transition"
  >
    <img
      src={assets.google}
      alt="Google"
      className="w-6 h-6"
    />
    Google
  </button>

  <button
    onClick={()=>handleLogin('github')}
    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#333] text-white font-medium rounded-xl shadow hover:bg-[#222] transition"
  >
    <img
      src={assets.github}
      alt="Google"
      className="w-7 h-7"
    />
    GitHub
  </button>
  </div>  
 </div> */}

        {/* {isAuthenticated && (
          <div className="text-gray-300 text-sm pt-4 border-t border-gray-700 mt-4">
            Logged in as <strong>{user?.name || user?.email}</strong>
            <br />
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className="mt-2 text-red-400 underline"
            >
              Logout
            </button>
          </div>
        )} */}
      </div>
      </form>
    </div>
  );
};

export default LoginPage;
