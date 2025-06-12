import React, { useEffect, useRef } from 'react';
import assets, { messagesDummyData } from '../assets/assets';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = ({ selectedUser, setselectedUser }) => {
  const scrollEnd = useRef();
   
 useEffect(() => {
  const timer = setTimeout(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  },100);  
},[selectedUser,messagesDummyData]);


  const yourId = '680f5116f10f3cd28382ed02';


  return selectedUser ? (
    <div className="flex flex-col h-full overflow-hidden">
      
      {/* Top bar (fixed height) */}
      <div className="flex items-center gap-3 py-3 px-4 border-b border-stone-500">
        <img src={assets.profile_martin} alt="img" className="w-8 rounded-full" />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          Martin Johnson
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
        </p>
        <img
          onClick={() => setselectedUser(null)}
          src={assets.arrow_icon}
          alt="arrow"
          className="md:hidden max-w-7"
        />
        <img
          src={assets.help_icon}
          alt="help_icon"
          className="max-w-5"
        />
      </div>

      {/* Middle message scroll area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3"> {/* 🔑 Makes this area scroll */}
        {messagesDummyData.map((msg, index) => {
          const isSender = msg.senderId === yourId;

          return (
            <div
              key={selectedUser._id}
              className={`flex items-end gap-2 ${
                isSender ? 'justify-end' : 'justify-start'
              }`}
            >
              {/* Left avatar */}
              {!isSender && (
                <img
                  src={assets.profile_martin}
                  alt="receiver"
                  className="w-7 h-7 rounded-full"
                />
              )}

              {/* Message content */}
              <div className="flex flex-col max-w-[230px]">
                {msg.image ? (
                  <img
                    src={msg.image}
                    alt="media"
                    className="border border-gray-700 rounded-lg overflow-hidden"
                  />
                ) : (
                  <p
                    className={`p-2 md:text-sm font-light rounded-lg break-words text-white ${
                      isSender
                        ? 'bg-purple-600 rounded-br-none'
                        : 'bg-violet-500/30 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </p>
                )}
                <span
                  className={`text-xs text-gray-400 mt-1 ${
                    isSender ? 'text-right' : 'text-left'
                  }`}
                >
                  {formatMessageTime(msg.createdAt)}
                </span>
              </div>

              {/* Right avatar */}
              {isSender && (
                <img
                  src={assets.avatar_icon}
                  alt="sender"
                  className="w-7 h-7 rounded-full"
                />
              )}
            </div>
          );
        })}
        <div ref={scrollEnd}></div>
      </div>

      {/* Bottom input (fixed height) */}
      <div className="p-3 flex items-center gap-3 ">
        <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full">
          <input
            type="text"
            placeholder="Send a message"
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400 bg-transparent"
          />
          <input type="file" id="image" accept="image/png,image/jpeg" hidden />
          <label htmlFor="image">
            <img src={assets.gallery_icon} alt="icon" className="w-5 mr-2 cursor-pointer" />
          </label>
        </div>
        <img src={assets.send_button} alt="button" className="w-7 cursor-pointer" />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden p-6">
      <img src={assets.logo_icon} className="max-w-16" alt="logo" />
      <p className="text-lg font-medium text-white">Chat Anytime, Anywhere</p>
    </div>
  );
};

export default ChatContainer;
