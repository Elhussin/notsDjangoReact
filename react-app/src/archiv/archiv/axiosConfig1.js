

import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true, // Enables sending cookies with requests
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//       try {
//         await axiosInstance.post('token/refresh/');
//         return axiosInstance.request(error.config);
//       } catch (refreshError) {
//         console.error('Failed to refresh token:', refreshError);
//         window.location.href = '/login';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;


// import axios from "axios";
// import { toast } from "react-toastify"; // إذا كنت تستخدم مكتبة إشعارات

// const API_BASE_URL = "http://localhost:8000/api/";

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//     accept: "application/json",
//   },
// });

// export const setAuthToken = (token) => {
//   console.log("Token being set:", token);

//   if (token) {
//     axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete axiosInstance.defaults.headers.common["Authorization"];
//   }
// };

// const authAxios = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//     accept: "application/json",
//   },
// });

// export const refreshToken = async () => {
//   try {
//     const refresh = localStorage.getItem("refresh_token");
//     if (!refresh) {
//       throw new Error("Refresh token not found");
//     }
//     const response = await authAxios.post("token/refresh/", { refresh });
//     const { access } = response.data;
//     localStorage.setItem("access_token", access);
//     setAuthToken(access);
//   } catch (error) {
//     console.error("Failed to refresh token:", error);
//     // localStorage.removeItem("access_token");
//     // localStorage.removeItem("refresh_token");
//     // localStorage.removeItem("access_token_expires_at");
//     throw error;
//   }
// };

// const isTokenExpired = () => {
//   const expiresAt = parseInt(localStorage.getItem("access_token_expires_at"), 10);
//   if (!expiresAt) return true; 
//   return Date.now() > expiresAt; 

// };
// console.log(  Date.now() >parseInt(localStorage.getItem("access_token_expires_at"), 10))
// // console.log( Date.now() )

// axiosInstance.interceptors.request.use(
//   async (config) => {

//     if (isTokenExpired()) {
//       try {
//         await refreshToken();
//       } catch (error) {
//         console.error("Failed to refresh token:", error);
//         toast.error("Failed to refresh token.");
//         window.location.href = "/login";
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response && error.response.status === 401 && !error.config._retry) {
//       error.config._retry = true;
//       try {
//         await refreshToken();
//         error.config.headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`;
//         return axiosInstance.request(error.config);
//       } catch (refreshError) {
//         console.error("Token refresh failed:", refreshError);
//         toast.error("Session expired. Please log in again.");
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
