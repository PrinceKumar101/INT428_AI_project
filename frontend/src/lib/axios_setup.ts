import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api", // Use import.meta.env for Vite
  withCredentials: true, // If your backend uses cookies for authentication
});

export default axiosInstance;
