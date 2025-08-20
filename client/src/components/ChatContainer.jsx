import React, { useEffect, useRef, useState } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { useMessagesStore } from "../store/messages";
import { useAuth } from "../store/useAuth";
import avatar_icon from "../assets/avatar_icon.png";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const scrollEnd = useRef();
  const {
    selectedUser,
    setselectedUser,
    getmessages,
    getAllmessages,
    listentoMessages,
    stopListening,
  } = useMessagesStore();
  const { authUser, onlineUsers } = useAuth();
  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [getmessages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (selectedUser && selectedUser._id) {
          await getAllmessages(selectedUser._id);
          listentoMessages();
        }
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };
    fetchMessages();

    return () => {
      stopListening();
    };
  }, [getAllmessages, selectedUser]);

  return selectedUser ? (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Top bar (fixed height) */}
      <div className="flex items-center gap-3 py-3 px-4 border-b border-stone-500">
        <img
          src={selectedUser?.profilePic || avatar_icon}
          alt="img"
          crossOrigin="anonymous"
          className="w-8 rounded-full"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.username}
          {onlineUsers?.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
        </p>
        <img
          onClick={() => setselectedUser(null)}
          src={assets.arrow_icon}
          alt="arrow"
          className="md:hidden max-w-7"
        />
        <img src={assets.help_icon} alt="help_icon" className="max-w-5" />
      </div>

      {/* Middle message scroll area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {" "}
        {/* 🔑 Makes this area scroll */}
        {getmessages?.map((msg) => {
          if (!authUser) return null;
          const isSender = msg.senderId === authUser._id;

          return (
            <div
              key={msg._id}
              className={`flex items-end gap-2 ${
                isSender ? "justify-end" : "justify-start"
              }`}
            >
              {/* Left avatar */}
              {!isSender && (
                <img
                  src={
                    `http://localhost:5000/profile-image/${user._id}` ||
                    avatar_icon
                  }
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
                        ? "bg-purple-600 rounded-br-none"
                        : "bg-violet-500/30 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </p>
                )}
                <span
                  className={`text-xs text-gray-400 mt-1 ${
                    isSender ? "text-right" : "text-left"
                  }`}
                >
                  {formatMessageTime(msg.createdAt)}
                </span>
              </div>

              {/* Right avatar */}
              {isSender && (
                <img
                  src={authUser?.profilePic || avatar_icon}
                  alt="sender"
                  crossOrigin="anonymous"
                  className="w-7 h-7 rounded-full"
                />
              )}
            </div>
          );
        })}
        <div ref={scrollEnd}></div>
      </div>
      {/* Bottom input (fixed height) */}
      <MessageInput />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden p-6">
      <img src={assets.logo_icon} className=" max-w-16" alt="logo" />
      <p className="text-lg font-medium text-white">Chat Anytime, Anywhere</p>
    </div>
  );
};

export default ChatContainer;
