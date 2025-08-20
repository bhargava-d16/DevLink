import { useState, useEffect, useRef } from "react";
import { useAuth } from "../store/useAuth";
import { useMessagesStore } from "../store/messages";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import avatar_icon from "../assets/avatar_icon.png";
import { formatMessageTime } from "../lib/utils";
import { X } from "lucide-react";

import toast from "react-hot-toast";
import JSZip from "jszip";
import { isReady } from "../lib/filesready";

export default function QuickChatDashboard() {
  const fileInputRef = useRef();
  const scrollEnd = useRef();
  const navigate = useNavigate();
  const {
    getusers,
    getAllusers,
    fetchChattedUsers,
    selectedUser,
    setselectedUser,
    searchResults,
    searchUsers,
    chattedUsers,
    setchattedUsers,
    setsearchResults,
    getmessages,
    getAllmessages,
    listentoMessages,
    stopListening,
    sendMessages,
  } = useMessagesStore();

  const { onlineUsers, checkAuth, authUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [messageText, setMessageText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [zip, setZip] = useState(null);
  const [githubUrl, setGithubUrl] = useState("");

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await fetchChattedUsers();
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [fetchChattedUsers]);

  useEffect(() => {
    if (selectedUser) {
      listentoMessages(selectedUser._id);

      getAllmessages(selectedUser._id);
    }

    return () => {
      if (selectedUser) {
        stopListening();
      }
    };
  }, [selectedUser, listentoMessages, getAllmessages, stopListening]);

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [getmessages]);

  useEffect(() => {
    setImagePreview(null);
    setMessageText("");
  }, [selectedUser]);

  const usersToShow = searchResults.length > 0 ? searchResults : chattedUsers;

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    searchUsers(value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if ((!messageText.trim() && !imagePreview) || !selectedUser) {
      return;
    }

    try {
      await sendMessages({ text: messageText.trim(), image: imagePreview });
      setMessageText("");
      setImagePreview(null);
      if (fileInputRef.current.value) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current.value) fileInputRef.current.value = "";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleZipUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".zip")) {
      setZip(file);
      setGithubUrl("");
    } else {
      toast.error("Please upload a valid ZIP file.");
    }
  };

  const handleContinue = async () => {
    try {
      if (zip) {
        await isReady({ type: "zip", file: zip });
        navigate("/codeeditor");
      } else if (githubUrl) {
        await isReady({ type: "github", url: githubUrl });
        navigate("/codeeditor");
      } else {
        toast.error("Please upload a ZIP or enter a GitHub URL.");
      }
    } catch (error) {
      toast.error("Something went wrong while extracting files");
      console.log(error);
    }
  };

  const handleGithubUrl = (e) => {
    setGithubUrl(e.target.value);
    setZip(null);
  };

  const [activeTab, setActiveTab] = useState("chats");

  const repositories = [
    {
      id: 1,
      name: "frontend-app",
      branch: "main",
      lastCommit: "Fix responsive design",
      time: "3h ago",
      language: "React",
    },
    {
      id: 2,
      name: "api-backend",
      branch: "development",
      lastCommit: "Add authentication",
      time: "5h ago",
      language: "Node.js",
    },
    {
      id: 3,
      name: "mobile-app",
      branch: "feature/login",
      lastCommit: "Update navigation",
      time: "1d ago",
      language: "React Native",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 border-r border-gray-700 z-30">
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-700">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
            💬
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            DevLink
          </span>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {[
            { id: "chats", label: "Chats", icon: "💬" },
            { id: "repos", label: "Repositories", icon: "📁" },
            { id: "code", label: "Code Editor", icon: "⚡" },
            { id: "team", label: "Team", icon: "👥" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="flex items-center gap-3">
            <img
              src={
                authUser?.profilePic
                  ||avatar_icon
              }
              alt="img"
              crossOrigin="anonymous"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="font-medium">{authUser?.username}</div>
              <div className="text-sm text-gray-400">{authUser?.email}</div>
            </div>
            <button
              onClick={() => navigate("/settings")}
              className="text-gray-400 hover:text-white cursor-pointer"
            >
              ⚙️
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1">
        <header className="bg-gray-900 border-b border-gray-700 px-6 py-4 shadow-md">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white tracking-wide">
              {activeTab === "chats" && "Chats"}
              {activeTab === "repos" && "Repositories"}
              {activeTab === "code" && "Code Editor"}
              {activeTab === "team" && "Team"}
            </h1>

            <div className="flex items-center gap-5">
              {/* Search Bar */}
              <div className="bg-[#2c254d] rounded-full flex items-center gap-2 py-2 px-4 shadow-inner border border-gray-600 focus-within:border-purple-400 transition-all">
                <input
                  onChange={handleSearch}
                  value={searchQuery}
                  type="text"
                  placeholder="Search"
                  className="bg-transparent border-none outline-none text-white text-sm placeholder:text-gray-400 w-40 focus:w-56 transition-all duration-300"
                />
              </div>

              {/* Button */}
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-purple-500/30 text-sm font-medium text-white transition-all duration-300">
                + New Chat
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">
          {activeTab === "chats" && (
            <div className="relative grid gap-6 lg:grid-cols-3 h-[calc(100vh-140px)]">
              {/* Chat List */}
              <div className="lg:col-span-1 flex flex-col overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4 text-purple-300">
                  Recent Chats
                </h2>
                <div className="space-y-3">
                  {usersToShow?.map((user, index) => (
                    <div
                      key={user._id || index}
                      onClick={() => {
                        setselectedUser(user);
                        const exists = chattedUsers.find(
                          (u) => u._id === user._id
                        );
                        const updated = exists
                          ? [
                              user,
                              ...chattedUsers.filter((u) => u._id !== user._id),
                            ]
                          : [user, ...chattedUsers];
                        setchattedUsers(updated);
                        setsearchResults([]);
                        setSearchQuery("");
                      }}
                      className="p-4 rounded-lg bg-gray-800 border border-gray-700 hover:border-purple-500/50 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg">
                          <img
                            src={
                              user?.profilePic
                                || avatar_icon
                            }
                            className="w-9 h-9 rounded-full object-cover"
                            crossOrigin="anonymous"
                            alt="avatar"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium truncate">
                              {user.username}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Window */}
              <div className="lg:col-span-2 flex flex-col overflow-hidden">
                <div className="flex-1 bg-gray-800 rounded-lg border border-gray-700 flex flex-col min-h-0">
                  {selectedUser ? (
                    <>
                      {/* Header */}
                      <div className="p-4 border-b border-gray-700 flex items-center gap-3 shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <img
                            src={
                              selectedUser?.profilePic
                                ||  avatar_icon
                            }
                            alt="img"
                            crossOrigin="anonymous"
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-white">
                            {selectedUser.username}
                          </h3>
                        </div>
                        <img
                          onClick={() => setselectedUser(null)}
                          src={assets.arrow_icon}
                          alt="arrow"
                          className="md:hidden w-6 h-6 cursor-pointer hover:opacity-70 transition-opacity"
                        />
                      </div>

                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto p-4">
                        {getmessages?.length === 0 && (
                          <div className="text-center text-gray-400 text-sm">
                            No messages yet. Start the conversation!
                          </div>
                        )}

                        {getmessages?.map((msg) => {
                          if (!authUser) return null;
                          const isSender = msg.senderId === authUser._id;

                          return (
                            <div
                              key={msg._id}
                              className={`flex items-end gap-2 mb-3 ${
                                isSender ? "justify-end" : "justify-start"
                              }`}
                            >
                              {!isSender && (
                                <img
                                  src={
                                    authUser?.profilePic
                                      || avatar_icon
                                  }
                                  alt="receiver"
                                  crossOrigin="anonymous"
                                  className="w-7 h-7 rounded-full"
                                />
                              )}

                              <div className="flex flex-col max-w-[230px] h-200px">
                                {msg.image ? (
                                  <img
                                    src={msg.image}
                                    alt="media"
                                    crossOrigin="anonymous"
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

                              {isSender && (
                                <img
                                  src={
                                    authUser?.profilePic
                                      || avatar_icon
                                  }
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

                      {/* Input */}
                      <div className="p-4 border-t border-gray-700 shrink-0">
                        <form
                          onSubmit={handleSendMessage}
                          className="flex flex-col gap-2"
                        >
                          {/* Image Preview */}
                          {imagePreview && (
                            <div className="relative w-16 h-16">
                              <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-16 h-16 object-cover rounded-lg border border-zinc-700"
                              />
                              <button
                                onClick={removeImage}
                                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-800 text-white flex items-center justify-center shadow"
                                type="button"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          )}

                          {/* Input Bar */}
                          <div className="flex items-center bg-gray-700 rounded-lg border border-gray-600 px-3">
                            {/* File Upload */}
                            <div className="relative">
                              <input
                                type="file"
                                id="image"
                                accept="image/png, image/jpeg"
                                hidden
                                ref={fileInputRef}
                                onChange={handleImageChange}
                              />
                              <label
                                htmlFor="image"
                                className="cursor-pointer flex items-center"
                              >
                                <img
                                  src={assets.gallery_icon}
                                  alt="Upload"
                                  className="w-5 opacity-80 hover:opacity-100"
                                />
                              </label>
                            </div>

                            {/* Text Input */}
                            <input
                              type="text"
                              value={messageText}
                              onChange={(e) => setMessageText(e.target.value)}
                              onKeyPress={handleKeyPress}
                              placeholder="Type a message..."
                              className="flex-1 px-3 py-2 bg-transparent focus:outline-none text-white placeholder-gray-400"
                            />

                            {/* Send Button */}
                            <button
                              type="submit"
                              disabled={!messageText.trim()}
                            >
                              <img
                                src={assets.send_button}
                                alt="Send"
                                className="w-7 ml-2 cursor-pointer"
                              />
                            </button>
                          </div>
                        </form>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4">
                          <svg
                            className="w-8 h-8 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl text-gray-400 font-medium">
                          Select a user to start chatting
                        </h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "repos" && (
            <div className="space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-purple-300">
                  Your Repositories
                </h2>
              </div>

              {/* Actions Side-by-Side */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Upload ZIP */}
                <div className="p-6 rounded-lg bg-gray-800 border border-gray-700">
                  <h3 className="mb-8  text-white font-semibold mb-4">
                    Upload a ZIP Project
                  </h3>
                  <label className="px-4 py-2 w-fit rounded-lg cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow hover:from-purple-600 hover:to-pink-600 transition-all">
                    + Open Zip Folder
                    <input
                      type="file"
                      accept=".zip"
                      onChange={handleZipUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={handleContinue}
                    className="mt-8 px-6 py-2 w-full rounded-lg bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow"
                  >
                    Continue
                  </button>
                </div>

                {/* Import from GitHub */}
                <div className="p-6 rounded-lg bg-gray-800 border border-gray-700">
                  <h3 className="text-white font-semibold mb-4">
                    Import from GitHub
                  </h3>

                  <input
                    type="text"
                    placeholder="https://github.com/user/repo"
                    value={githubUrl}
                    onChange={handleGithubUrl}
                    className="mt-3 w-full bg-white/10 border border-white/30 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 text-white placeholder-gray-400"
                  />
                  <button
                    onClick={handleContinue}
                    className="mt-5.5 px-6 py-2 w-full rounded-lg bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow"
                  >
                    Continue
                  </button>
                </div>
              </div>

              {/* Repo Cards */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {repositories.map((repo) => (
                  <div
                    key={repo.id}
                    className="p-6 rounded-xl bg-gray-800 border border-gray-700 hover:border-purple-500/40 shadow-md hover:shadow-purple-500/10 transition-all"
                  >
                    {/* Repo Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-lg">
                        📁
                      </div>
                      <h3 className="font-semibold text-white truncate">
                        {repo.name}
                      </h3>
                    </div>

                    {/* Repo Meta Info */}
                    <div className="space-y-3 text-sm text-gray-400">
                      <div className="flex justify-between">
                        <span>Branch:</span>
                        <span className="text-purple-300">{repo.branch}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Language:</span>
                        <span className="text-pink-300">{repo.language}</span>
                      </div>
                      <div className="text-xs">
                        <p className="truncate">{repo.lastCommit}</p>
                        <p className="text-gray-500">{repo.time}</p>
                      </div>
                    </div>

                    {/* Open Button */}
                    <button className="w-full mt-6 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all shadow">
                      Open in Editor
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "code" && (
            <div className="bg-gray-800 rounded-lg border border-gray-700 h-96">
              <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                <h3 className="font-medium">Code Editor</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-gray-700 rounded hover:bg-gray-600">
                    Save
                  </button>
                  <button className="px-3 py-1 text-sm bg-gradient-to-r from-purple-500 to-pink-500 rounded hover:from-purple-600 hover:to-pink-600">
                    Run
                  </button>
                </div>
              </div>
              <div className="p-4 h-full">
                <div className="bg-gray-900 rounded p-4 font-mono text-sm h-full">
                  <div className="text-purple-400">
                    // Welcome to QuickChat Code Editor
                  </div>
                  <div className="text-pink-400">
                    function <span className="text-yellow-400">helloWorld</span>
                    () {`{`}
                  </div>
                  <div className="text-gray-300 ml-4">
                    console.log(
                    <span className="text-green-400">"Hello, QuickChat!"</span>
                    );
                  </div>
                  <div className="text-pink-400">{`}`}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div className="text-center py-12">
              <h2 className="text-xl text-gray-400">
                Team section coming soon...
              </h2>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
