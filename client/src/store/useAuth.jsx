import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:8080";

export const useAuth = create((set, get) => ({
  authUser: null,
  setAuthUser: (user) => set({ authUser: user }),
  isCheckingAuth: true,
  isUpdatingProfile: false,
  isSigningUp: true,
  isLoggingIn: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/check");
      if (response.data) {
        set({ authUser: response.data });
        get().connectSocket();
      }
    } catch (error) {
      console.log("Error in checkAuth", error.response);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  connectSocket: () => {
    const authUser = get().authUser;
    const socket = get().socket;
    if (!authUser || !authUser._id || socket?.connected) return;

    const newSocket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });

    newSocket.on("connect", () => {
      console.log("Connected to socket:", newSocket.id);
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      console.log("👥 Frontend received online userIds:", userIds);
      set({ onlineUsers: userIds });
    });

    set({ socket: newSocket });
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      setTimeout(() => get().connectSocket(), 100);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/logout");
      toast.success("Logged out successfully");
      set({ authUser: null });
      get().disconnectSocket();
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put("/update-profile", data);
      set({ authUser: response.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
