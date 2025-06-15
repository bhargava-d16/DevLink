import React, { useEffect, useState } from 'react';
import { Camera, Mail, User } from 'lucide-react';
import { useAuth } from '../store/useAuth';
import avatar_icon from '../assets/avatar_icon.png';
import toast from 'react-hot-toast';
const ProfilePage = () => {
  const { authUser,updateProfile,checkAuth,isCheckingAuth} = useAuth();
  const [selectedImg, setSelectedImg] = useState(null);
  
    useEffect(() => {
      checkAuth();
  
    }, [checkAuth]);
  
  
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image); 

      await updateProfile({profilePic:base64Image})
    };
  };
  
//  useEffect(() => {
//   const fetchProfile = async () => {
//     await updateProfile(selectedImg);
//     toast.success("Profile loaded!");
//   };
//   fetchProfile();
// }, []);


  return (
    <div className="min-h-screen flex items-center justify-center relative bg-cover bg-center">
     
      <div
        className="absolute inset-0 bg-center bg-cover brightness-30 backdrop-blur-sm z-0"
        style={{ backgroundImage: `url('/bgImage.svg')` }}
      />
      <div className="absolute -left-20 -top-20 w-[600px] h-[600px] bg-gradient-to-br from-purple-600 via-indigo-500 to-purple-900 rounded-full blur-[140px] opacity-50 z-0" />
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-gradient-to-tr from-purple-700 via-indigo-600 to-purple-900 rounded-full blur-[120px] opacity-40 z-0" />

     
      <div className="relative z-10 bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-10 max-w-md w-full text-center space-y-8 text-white">
        <div>
          <h1 className="text-3xl font-semibold">Profile</h1>
          <p className="text-sm text-gray-400">See or edit your profile information</p>
        </div>

       
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={selectedImg || authUser?.profilePic ||  avatar_icon}
              alt=""
              className="size-32 rounded-full object-cover border-4 border-white"
            />
            <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer">
              <Camera className="size-4 text-black" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-sm text-gray-400">Click the camera icon to update your photo</p>
        </div>

        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-zinc-400 flex items-center gap-2">
              <User className="w-4 h-4" />
              Username
            </label>
            <p className="px-4 py-2.5 bg-zinc-800 rounded-lg border border-zinc-700 text-white">
              {authUser?.username}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-zinc-400 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </label>
            <p className="px-4 py-2.5 bg-zinc-800 rounded-lg border border-zinc-700 text-white">
              {authUser?.email}
            </p>
          </div>
        </div>

        <div className="mt-6 bg-zinc-900 border border-zinc-700 rounded-xl p-6 text-sm text-zinc-300 space-y-4">
          <h2 className="text-lg font-medium text-white">Account Information</h2>
          <div className="flex items-center justify-between py-2 border-b border-zinc-700">
            <span>Member Since</span>
            <span className="text-white">
              {authUser?.createdAt?.split('T')[0] || 'N/A'}
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span>Account Status</span>
            <span className="text-green-400 font-medium">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
