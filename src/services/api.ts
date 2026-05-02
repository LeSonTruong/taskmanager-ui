import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Port của NestJS
  headers: {
    "Content-Type": "application/json",
  },
});

// Tự động đính kèm JWT Token vào Header nếu có
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
