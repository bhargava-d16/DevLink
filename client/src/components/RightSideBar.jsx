import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import assets from '../assets/assets';
import { useAuth } from '../store/useAuth';
import { useMessagesStore } from '../store/messages';
import JSZip from "jszip";
import { isReady } from '../lib/filesready';
const RightSideBar = () => {
  const { selectedUser, getAllusers, getAllmessages } = useMessagesStore();
  const { onlineUsers, logout } = useAuth();
  const navigate = useNavigate();

  const [zip, setZip] = useState(null);
  const [githubUrl, setGithubUrl] = useState('');  

  if (!selectedUser) return null;

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const handleZipUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.zip')) {
      setZip(file);
      setGithubUrl('');
    } else {
      toast.error('Please upload a valid ZIP file.');
    }
  };

  const handleGithubUrl = (e) => {
    setGithubUrl(e.target.value);
    setZip(null);
  };
  
  
  const handleContinue=async ()=>{
        try {
    if (zip) {
      await isReady({ type: 'zip', file: zip });
      navigate("/codeeditor");
    } else if (githubUrl) {
      await isReady({ type: 'github', url: githubUrl });
      navigate("/codeeditor");
    } else {
      toast.error('Please upload a ZIP or enter a GitHub URL.');
    }
  } catch (error) {
    toast.error("Something went wrong while extracting files");
    console.log(error);
  }
  };

  return (
    <div className={`bg-[#8185B2]/10 w-full text-white p-6 relative overflow-y-auto ${selectedUser ? 'max-md:hidden' : ''}`}>
      <div className="pt-10 flex flex-col items-center gap-2 text-center">
        <img
          src={selectedUser?.profilePic || assets.avatar_icon}
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-white/20 shadow-lg object-cover"
        />
        <h1 className="text-xl font-semibold mt-2 flex items-center gap-2">
          {onlineUsers?.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
          {selectedUser.username}
        </h1>
        <p className="text-sm text-white/70 max-w-xs">{selectedUser.bio}</p>
      </div>

      <hr className="border-white/20 my-6" />

      <div className="flex flex-col gap-4 text-sm text-white/90">
        <div className="text-center">
          <p className="text-xl font-semibold">Collaborate on Projects</p>
          <p className="text-base text-white/60">Upload your project as a ZIP file or paste a GitHub repo link below.</p>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <label className="text-sm font-medium">Upload ZIP File:</label>
          <input
            type="file"
            accept=".zip"
            onChange={handleZipUpload}
            className="bg-white/10 border border-white/30 rounded px-3 py-2 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-violet-600 file:text-white hover:file:bg-violet-700"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Or GitHub Repo URL:</label>
          <input
            type="text"
            placeholder="https://github.com/user/repo"
            value={githubUrl}
            onChange={handleGithubUrl}
            className="bg-white/10 border border-white/30 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <div className='mt-4 flex flex-col items-center '>
            <button onClick={handleContinue} className="h-10 w-30 bg-white/10 rounded-full">
                  Continue
            </button>
        </div>
    
      </div>
      <hr className="border-white/20 my-6" />
      <button
        onClick={handleLogout}
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-violet-600 text-white text-sm font-medium py-2 px-8 rounded-full shadow-md hover:scale-105 transition-transform"
      >
        Log Out
      </button>
    </div>
  );
};

export default RightSideBar;
