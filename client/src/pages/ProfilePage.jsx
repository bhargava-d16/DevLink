import React, { useEffect, useState } from "react";
import { Camera, Mail, Pencil, User, Edit, X } from "lucide-react";
import { useAuth } from "../store/useAuth";
import avatar_icon from "../assets/avatar_icon.png";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, updateProfile, checkAuth, updateUsername, updateEmail } =
    useAuth();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authUser && editingField) {
      setEditingValue(authUser[editingField]);
    }
  }, [authUser, editingField]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
      toast.success("Profile picture updated!");
    };
  };

  const openEditModal = (field) => {
    setEditingField(field);
    setEditingValue(authUser?.[field] || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingField(null);
    setEditingValue("");
  };

  const handleSaveUsername = async () => {
    if (!editingValue.trim()) {
      toast.error("Username cannot be empty");
      return;
    }
    await updateUsername({ username: editingValue.trim() });
    closeModal();
  };

  const handleSaveEmail = async () => {
    if (!editingValue.trim()) {
      toast.error("Email cannot be empty");
      return;
    }
    await updateEmail({ email: editingValue.trim() });
    closeModal();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      {/* Main Profile Card */}
      <div className="overflow-y-auto bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 max-w-md w-full mx-4 text-center space-y-6 text-white shadow-xl">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-gradient-to-r from-purple-400 to-pink-400">
            Profile
          </h1>
          <p className="text-gray-400 text-sm">
            See or edit your profile information
          </p>
        </div>

        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={
                authUser?.profilePic
                  || avatar_icon
              }
              alt="Profile"
              crossOrigin="anonymous"
              className="w-32 h-32 rounded-full object-cover border-4 border-white"
            />
            <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
              <Camera className="w-4 h-4 text-black" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-gray-400 text-sm">
            Click the camera icon to update your photo
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center gap-2 text-left">
              <User className="w-4 h-4" />
              Username
            </label>
            <div className="px-4 py-2.5 bg-gray-700 rounded-lg border border-gray-600 text-white">
              <div className="relative flex justify-center items-center h-10">
                <div className="absolute right-0 pr-2">
                  <button
                    onClick={() => openEditModal("username")}
                    className="h-4 w-4 cursor-pointer text-gray-400 hover:text-white transition-colors"
                  >
                    <Edit />
                  </button>
                </div>
                <div className="text-white font-medium">
                  {authUser?.username || "Username"}
                </div>
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center gap-2 text-left">
              <Mail className="w-4 h-4" />
              Email Address
            </label>
            <div className="px-4 py-2.5 bg-gray-700 rounded-lg border border-gray-600 text-white">
              <div className="relative flex justify-center items-center h-10">
                <div className="absolute right-0">
                  <button
                    onClick={() => openEditModal("email")}
                    className="cursor-pointer text-gray-400 hover:text-white transition-colors"
                  >
                    <Pencil />
                  </button>
                </div>
                <div className="text-white font-medium">{authUser?.email}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="mt-6 bg-gray-800 border border-gray-700 rounded-xl p-6 text-sm text-gray-300 space-y-4">
          <h2 className="text-lg font-medium text-white">
            Account Information
          </h2>
          <div className="flex items-center justify-between py-2 border-b border-gray-700">
            <span>Member Since</span>
            <span className="text-white">
              {authUser?.createdAt
                ? new Date(authUser.createdAt).toISOString().split("T")[0]
                : "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span>Account Status</span>
            <span className="text-green-400 font-medium">Active</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative w-[90%] max-w-md bg-gray-800 border border-gray-700 shadow-2xl rounded-2xl p-6 text-white">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
              onClick={closeModal}
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-semibold mb-5 tracking-wide">
              Update {editingField === "username" ? "Username" : "Email"}
            </h2>
            <input
              type="text"
              value={editingValue}
              onChange={(e) => setEditingValue(e.target.value)}
              placeholder={`Enter new ${editingField}`}
              className="w-full px-4 py-3 mb-4 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
            />

            <button
              onClick={
                editingField === "username"
                  ? handleSaveUsername
                  : handleSaveEmail
              }
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:brightness-110 active:scale-95 transition-all font-medium text-white shadow-md"
            >
              Save {editingField === "username" ? "Username" : "Email"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
