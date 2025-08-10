import React, { useEffect, useState } from "react";
import { Camera, Mail, Pencil, User, UserRoundPen, X } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center relative bg-cover bg-center">
      <div
        className="absolute inset-0 bg-center bg-cover brightness-30 backdrop-blur-sm z-0"
        style={{ backgroundImage: `url('/bgImage.svg')` }}
      />
      <div className="absolute -left-20 -top-20 w-[600px] h-[600px] bg-gradient-to-br from-purple-600 via-indigo-500 to-purple-900 rounded-full blur-[140px] opacity-50 z-0" />
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-gradient-to-tr from-purple-700 via-indigo-600 to-purple-900 rounded-full blur-[120px] opacity-40 z-0" />

      <div className="relative z-10 bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-10 max-w-md w-full text-center space-y-8 text-white">
        <div>
          <h1 className="text-3xl font-semibold">Profile</h1>
          <p className="text-sm text-gray-400">
            See or edit your profile information
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={selectedImg || authUser?.profilePic || avatar_icon}
              alt=""
              className="size-32 rounded-full object-cover border-4 border-white"
            />
            <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer">
              <Camera className="size-4 text-black" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-sm text-gray-400">
            Click the camera icon to update your photo
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-zinc-400 flex items-center gap-2">
              <User className="w-4 h-4" />
              Username
            </label>
            <div className="px-4 py-2.5 bg-zinc-800 rounded-lg border border-zinc-700 text-white">
              <div className="relative flex justify-center items-center h-10">
                <div className="absolute right-0 pr-2">
                  <button
                    onClick={() => openEditModal("username")}
                    className="h-4 w-4 cursor-pointer"
                  >
                    <UserRoundPen />
                  </button>
                </div>
                <div className="text-white font-medium">
                  {authUser?.username || "Username"}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-zinc-400 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </label>
            <div className="px-4 py-2.5 bg-zinc-800 rounded-lg border border-zinc-700 text-white">
              <div className="relative flex justify-center items-center h-10">
                <div className="absolute right-0">
                  <button
                    onClick={() => openEditModal("email")}
                    className="cursor-pointer"
                  >
                    <Pencil />
                  </button>
                </div>
                <div className="text-white font-medium">{authUser?.email}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-zinc-900 border border-zinc-700 rounded-xl p-6 text-sm text-zinc-300 space-y-4">
          <h2 className="text-lg font-medium text-white">
            Account Information
          </h2>
          <div className="flex items-center justify-between py-2 border-b border-zinc-700">
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative w-[90%] max-w-md bg-gradient-to-br from-[#1e1e2f] to-[#12121c] border border-zinc-700 shadow-2xl rounded-2xl p-6 text-white animate-fade-in">
            <button
              className="absolute top-3 right-3 text-zinc-400 hover:text-white transition"
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
              className="w-full px-4 py-3 mb-4 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
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