import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", 
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`[요청] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("[응답 에러]", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
