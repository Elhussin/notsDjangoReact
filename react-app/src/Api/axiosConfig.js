import axios from "axios";
import { jwtDecode } from "jwt-decode"; // JWT decoding library
import { toast } from "react-toastify"; // Notifications library

// Helper functions for token management
const manageTokens = {
    clear: () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("exp_token");
    },
    redirectToLogin: () => {
        toast.warn("Session expired. Redirecting to login...");
        window.location.href = "/login";
    }
};

// Create an Axios instance with a predefined API base URL
export const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Request Interceptor: Attach the access token to each request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle 401 errors and refresh tokens
API.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Handle Unauthorized (401) responses by attempting to refresh the token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true //  Prevent infinite loops

            try {
                const newToken = await RefreshToken();
                API.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                return API(originalRequest); // Retry the original request
            } catch (refreshError) {
                manageTokens.clear();
                manageTokens.redirectToLogin();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Buffer of 5 minutes in seconds
const TOKEN_EXPIRY_BUFFER = 5 * 60; 

// Check if the access token has expired
const isTokenExpired = () => {
    const exp = localStorage.getItem("exp_token");
    if (!exp || isNaN(exp)) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime > exp - TOKEN_EXPIRY_BUFFER;
};

// Check if the refresh token is still valid
const isRefreshTokenValid = () => {
    const refresh = localStorage.getItem("refresh_token");
    if (!refresh) return false;

    try {
        const decoded = jwtDecode(refresh);
        return Math.floor(Date.now() / 1000) < decoded.exp; // Check if refresh token is still valid
    } catch (error) {
        console.error("Invalid refresh token:", error);
        return false;
    }
};

// Prevent multiple simultaneous refresh requests
let refreshPromise = null; 

export const RefreshToken = async () => {
    if (refreshPromise) return refreshPromise; 

    refreshPromise = (async () => {
        try {
            const refresh = localStorage.getItem("refresh_token");
            if (!refresh || !isRefreshTokenValid()) {
                throw new Error("Invalid or expired refresh token");
            }

            const response = await API.post("users/auth/token/refresh/", { refresh });
            // console.log("Token refreshed successfully:", response.data);
            if (!response.data.access) throw new Error("Invalid response");

            const decoded = jwtDecode(response.data.access);
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("exp_token", decoded.exp);

            return response.data.access;
        } catch (error) {
            console.error("RefreshToken Error:", error.response ? error.response.data : error.message);
            manageTokens.clear();
            manageTokens.redirectToLogin();
            throw error;
        } finally {
            refreshPromise = null;  // إعادة تعيين القيمة بعد انتهاء الطلب
        }
    })();

    return refreshPromise;
};

// Ensure the access token is valid
export const ensureTokenValidity = async () => {
    if (isTokenExpired()) {
        return await RefreshToken();
    }
};

export const SecureRequest = async (method, url, data = null) => {
  try {
      await ensureTokenValidity();
      const response = await API[method](url, data);
      return response.data;
  } catch (error) {
      if (error.response) {
          if (error.response.status === 401) {
              manageTokens.clear();
              manageTokens.redirectToLogin();
          }
      } else if (error.request) {
          console.warn("Network issue:", error.request);
          toast.warn("Network error. Please check your connection.");
      } else {
          console.error("Unexpected error:", error.message);
      }
      throw error;
  }
};
