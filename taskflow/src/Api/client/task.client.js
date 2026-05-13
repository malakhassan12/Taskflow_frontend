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

taskClient.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && (error.response.status === 403 || error.response.status === 401)) {
      console.log("Access Forbidden or Unauthorized! Redirecting to login...");

      localStorage.removeItem("token");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default taskClient;
