import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import ChatContainer from '../components/ChatContainer'
import RightSideBar from '../components/RightSideBar'

const HomePage = () => {
  const [selectedUser,setselectedUser]=useState(false);
  return(
    <div className='border w-screen h-screen'>
       <div className={`backdrop-blur-xl border-2 border-gray-600 overflow-hidden  rounded-2xl h-full w-full grid grid-cols-1 relative
        ${selectedUser ?'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]':'md:grid-cols-2'}`}>
         <SideBar selectedUser={selectedUser} setselectedUser={setselectedUser}/>
         <ChatContainer selectedUser={selectedUser} setselectedUser={setselectedUser}/>
          {selectedUser && <RightSideBar />}
       </div>
    </div>
  )
}

export default HomePage
