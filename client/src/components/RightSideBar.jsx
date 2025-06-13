import React from 'react';
import assets, { imagesDummyData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
const RightSideBar = ({ selectedUser }) => {
  if (!selectedUser) return null;
  const navigate=useNavigate()
  const HandleLogout=()=>{
      
      navigate("/login")
}

  return (
    <div
      className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll
      ${selectedUser ? 'max-md:hidden' : ''} p-4`}
    >
      <div className="pt-12 flex flex-col items-center gap-3 text-center font-light">
        <img
          src={selectedUser?.profilePic || assets.avatar_icon}
          alt="Profile"
          className="w-20 aspect-square rounded-full border-2 border-white/20 shadow-md"
        />
        <h1 className="text-xl font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          {selectedUser.fullName}
        </h1>
        <p className="text-sm opacity-75 px-6">{selectedUser.bio}</p>
      </div>

      <hr className="border-[#ffffff30] my-6" />
      <div className="px-2 text-sm">
        <p className="mb-2 font-medium text-white/90">Media</p>
        <div className="grid grid-cols-2 gap-4 max-h-[200px] overflow-y-auto pr-1">
          {imagesDummyData.map((url, index) => (
            <div
              key={url + index}
              onClick={() => window.open(url, '_blank')}
              className="cursor-pointer rounded-lg overflow-hidden hover:scale-105 transition-transform"
            >
              <img src={url} alt="Media" className="w-full h-full object-cover rounded-md" />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={HandleLogout}
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2
        bg-gradient-to-r from-purple-500 to-violet-600 text-white text-sm
        font-light py-2 px-10 rounded-full shadow-md hover:scale-105 transition-transform"
      >
        Log Out
      </button>
    </div>
  );
};

export default RightSideBar;
