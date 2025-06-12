import React from 'react';
import assets, { userDummyData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const SideBar = ({ selectedUser, setselectedUser }) => {
  const navigate = useNavigate();

return (
 <div>

      <div className="flex justify-between items-center px-3">
        <img src={assets.logo} alt="logo" className="max-w-40" />

        <div className="relative py-2 group">
          <img
            src={assets.menu_icon}
            alt="menu"
            className="h-6 w-6 cursor-pointer"
          />
          <div className="absolute top-full right-0 z-20 w-36 mt-2 p-4 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block shadow-md transition-all">
            <p
              onClick={() => navigate('/profile')}
              className="cursor-pointer text-sm hover:text-purple-300"
            >
              Edit Profile
            </p>
            <hr className="my-2 border-t border-gray-500" />
            <p
              onClick={() => {
                // Add logout logic here
              }}
              className="cursor-pointer text-sm hover:text-red-400"
            >
              Log Out
            </p>
          </div>
        </div>
      </div>



      <div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5 mx-3 shadow-inner border border-gray-600">
        <img src={assets.search_icon} alt="search" className="w-4" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent border-none outline-none text-white text-sm placeholder:text-[#c8c8c8] w-full"
        />
      </div>
      


<div className="flex flex-col mt-4 px-3 gap-3">
        {userDummyData.map((user, index) => (
  <div
    key={index}
    onClick={() => setselectedUser(user)}
    className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer ${
      selectedUser?._id === user._id ? 'bg-[#282142]/60' : ''
    } hover:bg-[#282142]/30`}
  >
    <img
      src={user.profilePic || assets.avatar_icon}
      className="w-9 h-9 rounded-full object-cover"
      alt="avatar"
    />
    <div className="flex flex-col leading-5">
      <p className="text-sm font-medium text-white">{user.fullName}</p>
      <p className="text-xs text-gray-400">
        {index < 3 ? 'Active now' : 'Offline'}
      </p>
    </div>
    {index > 2 && (
      <span className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500 text-white">
        {index}
      </span>
    )}
  </div>
))}
</div>


</div>
  );
};

export default SideBar;

