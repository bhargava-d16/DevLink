import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import assets from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import axios from 'axios';

const SignUpPage = () => {
  // const { loginWithPopup, logout, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [email,setEmail]=useState("");
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  
  
  // const handleSignIn=async (provider) => {
  // try {
  //   await loginWithPopup({ connection: provider });
  //   // if(user && isAuthenticated){
  //   //      saveOAuthUser(user);
  //   // }
  //   // toast.success("Login successfull")
  //   navigate('/');
  // } catch (err) {
  //   toast.error("Login failed");
  // }
  // };


  // const saveOAuthUser=async(user)=>{
  //      try{
  //          const response=await axios.post("http://localhost:8080/api/auth0-signUp",
  //           {
  //             username:user.name,
  //             email:user.email,
  //             password:user.password,
  //             provider: user.sub.split('|')[0],
  //           }
  //          )
  //      }
  //      catch(error){
  //         toast.error("Login failed");
  //      }
  // }


  const usernameChange=(e)=>{
     setUsername(e.target.value);
  }

  const emailChange=(e)=>{
     setEmail(e.target.value);
  }

  const passwordChange=(e)=>{
     setPassword(e.target.value);
  }

  const submitHandler = async(e)=>{
    e.preventDefault();
    try{
         const response=await axios.post("http://localhost:8080/api/signUp",
              {username,email,password},
              { 
                headers:{
                "Content-Type":"application/json"
              }
            },
         )
         if(response.data){
          console.log(response.data);
            toast.success("Sign Up successfull")
            navigate("/home")
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

        <h2 className="text-3xl font-bold text-white">Create your account</h2>
        <p className="text-gray-400 text-sm">Sign up with your details</p>

      
        <input
          required
          value={username}
          onChange={usernameChange}
          type="text"
          placeholder="Username"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white border border-gray-700 focus:outline-none"
        />

       
        <input
          required
          value={email}
          onChange={emailChange}
          type="email"
          placeholder="Email address"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white border border-gray-700 focus:outline-none"
        />
        <input
          required
          value={password}
          onChange={passwordChange}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white border border-gray-700 focus:outline-none"
        />

        <button className="w-full px-4 py-3 mt-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-xl opacity-50">
          Sign Up
        </button>

        {/* <div className="text-gray-400 text-sm">or continue with</div> */}

        {/* Social Buttons Side-by-side */}
        {/* <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
          <button
            onClick={() => handleSignIn('google-oauth2')}
            className="flex-1 flex items-center justify-center gap-3 px-4 py-3 bg-white text-black font-medium rounded-xl shadow hover:bg-gray-100 transition"
          >
            <img src={assets.google} alt="Google" className="w-6 h-6" />
            Google
          </button>

          <button
            onClick={() => handleSignIn('github')}
            className="flex-1 flex items-center justify-center gap-3 px-4 py-3 bg-[#333] text-white font-medium rounded-xl shadow hover:bg-[#222] transition"
          >
            <img src={assets.github} alt="GitHub" className="w-7 h-7" />
            GitHub
          </button>
        </div> */}

        <div className="text-l text-gray-400 mt-6">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-purple-400 hover:underline cursor-pointer"
          >
            Log in
          </span>
        </div>
      </div>
      </form>
    </div>
  );
};

export default SignUpPage;
