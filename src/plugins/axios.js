import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // from .env
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false, // we are not using auth cookies
});

export default api;
