import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Ensure the correct import for JWT decoding
import { toast } from "react-toastify";

// Create an API instance using Axios for interacting with the backend API
export const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api/", // Base URL for all API requests
});

// Add interceptors to include the access token in every request header if available
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token"); // Retrieve the access token from localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Attach the token to the Authorization header
    }
    return config; // Return the updated config
});

API.interceptors.response.use(
    (response) => response, // Pass through successful responses
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized - redirecting to login");
            toast.warn("Session expired. Redirecting to login.");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("exp_token");
            window.location.href = "/login";
        }
        return Promise.reject(error); // Pass the error further
    }
);

const TOKEN_EXPIRY_BUFFER = 5 * 60; // Buffer of 5 minutes in seconds

// Function to check if the access token has expired
const isTokenExpired = () => {
    const exp = localStorage.getItem("exp_token"); // Retrieve the token expiration time from localStorage

    if (exp) {
        const currentTime = Math.floor(Date.now() / 1000); // Get the current time in seconds
        return currentTime > exp - TOKEN_EXPIRY_BUFFER; // Check if token will expire soon and Return true if the token is expired
    }
    return true; // If no expiration time is available, assume the token is expired
};

export const RefreshToken = async () => {
    const refresh = localStorage.getItem("refresh_token");
    if (!refresh) {
        console.error("Refresh token not found");
        window.location.href = "/login"; // Redirect to login page
        throw new Error("Refresh token not found");
    }
    try {
        const response = await API.post(
            "token/refresh/",
            { refresh },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const { access } = response.data;
        const decodedToken = jwtDecode(access);
        localStorage.setItem("access_token", access);
        localStorage.setItem("exp_token", decodedToken.exp);
        return access;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error("Refresh token expired. Redirecting to login...");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("exp_token");
            window.location.href = "/login"; // Redirect to login page
        } else {
            console.error("Failed to refresh token:", error);
            throw error;
        }
    }
};
// Ensure the token is valid, and refresh it if expired
export const ensureTokenValidity = async () => {
    if (isTokenExpired()) {
        return await RefreshToken();
    }
};

export const SecureRequest = async (method, url, data = null) => {
    try {
        await ensureTokenValidity(); // Ensure the token is valid
        const response = await API[method](url, data); // Make the API request
        console.log("Response:", response.data); // Log the response data
        return response.data; // Return the response data
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error("Session expired. Redirecting to login...");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("exp_token");
            window.location.href = "/login"; // Redirect to login page
        } else if (error.request) {
            // Errors due to network issues
            console.error("No response from the server:", error.request);
            toast.warn("Network error. Please check your connection.");
        } else {
            // Other errors
            console.error("Error occurred:", error.message);
        }
        throw error;
    }
};