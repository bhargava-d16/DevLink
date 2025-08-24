import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://devlink-7v35.onrender.com/api",
//   baseURL:"http://localhost:/api",
  withCredentials: true,
});
