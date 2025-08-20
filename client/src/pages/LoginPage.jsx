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
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const navigate = useNavigate();
  const { authUser, setAuthUser, connectSocket, login } = useAuth();

  const emailChange = (e) => {
    setEmail(e.target.value);
  }

  const passwordChange = (e) => {
    setPassword(e.target.value);
  }

  const submitHandler = async (e) => {
    setisLoading(true);
    e.preventDefault();
    try {
      await login({
        email: email,
        password: password,
      })
      navigate("/dashboard")
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setisLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
              💬
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              DevLink
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-400">
            Sign in to continue coding and chatting with your team
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8">
          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                onChange={emailChange}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  onChange={passwordChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all pr-12"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setshowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-gray-400 hover:text-white transition-colors" />
                  ) : (
                    <Eye className="size-5 text-gray-400 hover:text-white transition-colors" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 rounded" />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader className="animate-spin h-5 w-5 text-white" />
                  Logging in...
                </div>
              ) : (
                'Log In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-sm text-gray-400">or continue with</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 rounded-lg transition-all">
              <span className="text-lg">🐙</span>
              <span className="font-medium">GitHub</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 rounded-lg transition-all">
              <span className="text-lg">🌐</span>
              <span className="font-medium">Google</span>
            </button>
          </div>

    
          {/* Switch to signup */}
          <div className="mt-6 text-center">
            <span className="text-gray-400">Don't have an account?</span>
            <button
              onClick={()=>{
                   navigate("/signup")
              }}
              type="button"
              className="ml-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;