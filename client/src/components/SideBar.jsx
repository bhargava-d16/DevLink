import React, { useEffect } from 'react';
import assets, { userDummyData } from '../assets/assets';

import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useMessagesStore } from '../store/messages';
import { useAuth } from '../store/useAuth';
const SideBar = () => {
  const navigate = useNavigate();

  const {getusers,getAllusers,selectedUser,setselectedUser}=useMessagesStore()
  const {onlineUsers}=useAuth();

   useEffect(()=>{
      const fetchUsers=async()=>{
      try {
         await getAllusers(selectedUser._id);
      }
      catch (error) {
         console.error("Error fetching users:", error);
      }
      }
      fetchUsers()
   },[])
return (
 <div className='flex flex-col h-full overflow-y-auto'>
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
                  navigate("/home")
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
      {getusers?.map((user, index) => {
         console.log("Online Users List:", onlineUsers); 

  return (
    <div
      key={index}
      onClick={() => setselectedUser(user)}
      className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer ${
        selectedUser?._id === user._id ? 'bg-[#282142]/60' : ''
      } hover:bg-[#282142]/30`}
    >
      
     <div className="relative">
          <img
              src={user.profilePic || assets.avatar_icon}
              className="w-9 h-9 rounded-full object-cover"
               alt="avatar"
          />
         {onlineUsers?.includes(user._id) && (
         <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500" />
        )}
    </div>
      
      <div className="flex flex-col leading-5">
        <p className="text-sm font-medium text-white">{user.username}</p>
        <p className="text-xs text-gray-400">
          {onlineUsers?.includes(user._id) ? 'Active now' : 'Offline'}
        </p>
      </div>
      {index > 2 && (
        <span className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500 text-white">
          {index}
        </span>
      )}
    </div>
  );
})}

</div>

       <div className="flex justify-end p-4 mt-50 ">
        <button
          className="w-12 h-12 flex items-center justify-center bg-violet-600 hover:bg-violet-700 text-white rounded-full shadow-lg transition duration-200"
          onClick={() => alert("Add user")}
        >
          <Plus size={24} />
        </button>
      </div>
      
</div>
  );
};

export default SideBar;

