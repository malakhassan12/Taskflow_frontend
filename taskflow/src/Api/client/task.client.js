import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/Task";

const taskClient = axios.create({
  baseURL: API_URL,
  headers: "application/json",
});

taskClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default taskClient;
