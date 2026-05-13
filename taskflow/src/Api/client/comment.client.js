import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/Comment";

const commentClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

commentClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
commentClient.interceptors.response.use(
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


export default commentClient;
