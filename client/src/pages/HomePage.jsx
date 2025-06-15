import React, { useState ,useEffect} from 'react'
import SideBar from '../components/SideBar'
import ChatContainer from '../components/ChatContainer'
import RightSideBar from '../components/RightSideBar'
import { useAuth } from '../store/useAuth';
import { useMessagesStore } from '../store/messages';
const HomePage = () => {
  const {selectedUser,setselectedUser}=useMessagesStore()
  const {checkAuth} = useAuth();
  useEffect(() => {
        checkAuth();
    
      }, [checkAuth]);
  return(
    <div className='border w-screen h-screen'>
       <div className={`backdrop-blur-xl border-2 border-gray-600 overflow-hidden  rounded-2xl h-full w-full grid grid-cols-1 relative
        ${selectedUser ?'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]':'md:grid-cols-2'}`}>
         <SideBar selectedUser={selectedUser} setselectedUser={setselectedUser}/>
         <ChatContainer selectedUser={selectedUser} setselectedUser={setselectedUser}/>
          {selectedUser && <RightSideBar selectedUser={selectedUser}/>}
       </div>
    </div>
  )
}

export default HomePage
