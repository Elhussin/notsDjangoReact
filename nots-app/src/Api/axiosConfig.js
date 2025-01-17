import axios from 'axios';
import { jwtDecode } from "jwt-decode"; // Ensure the correct import for JWT decoding
import { toast } from "react-toastify";

// Create an API instance using Axios for interacting with the backend API
export const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/', // Base URL for all API requests
});

// Add interceptors to include the access token in every request header if available
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token'); // Retrieve the access token from localStorage
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
            // Unauthorized error, possibly token expired
            toast.warn("Session expired. Redirecting to login.",{
                onClose: () => {
                    // Redirect to login page with Redirect to login page
                    window.location.href="/login"
                },
                autoClose: 3000,
            });

        }
        return Promise.reject(error); // Pass the error further
    }
);


const TOKEN_EXPIRY_BUFFER = 5 * 60; // Buffer of 5 minutes in seconds

// Function to check if the access token has expired
const isTokenExpired = () => {
    const exp = localStorage.getItem('exp_token'); // Retrieve the token expiration time from localStorage
    
    if (exp) {
        const currentTime = Math.floor(Date.now() / 1000); // Get the current time in seconds
        return currentTime > (exp - TOKEN_EXPIRY_BUFFER); // Check if token will expire soon and Return true if the token is expired
    }
    return true; // If no expiration time is available, assume the token is expired
};



// Function to refresh the access token using the refresh token
export const refreshToken = async () => {
    const refresh = localStorage.getItem("refresh_token"); // Retrieve the refresh token from localStorage
    if (!refresh) {
        console.error("Refresh token not found");
        throw new Error("Refresh token not found");
    }
    console.log("Attempting token refresh with:", refresh);
    try {
        // Send a POST request to refresh the access token
        const response = await API.post("api/token/refresh/", { refresh });
        const { access } = response.data;

        // Decode the token to extract the expiration time
        const decodedToken = jwtDecode(access);

        // Update the access token and its expiration time in localStorage
        localStorage.setItem("access_token", access);
        localStorage.setItem("exp_token", decodedToken.exp);

        console.log("Token refreshed successfully");
        return access; // Return the new access token
    } catch (error) {
        console.error("Failed to refresh token:", error);
        throw error; // Throw the error for further handling
    }
};

// Ensure the token is valid, and refresh it if expired
export const ensureTokenValidity = async () => {
    if (isTokenExpired()) {
        console.log("Token expired, refreshing...");
        return await refreshToken();
    }
    console.log("Token is valid");
};


// Perform secure API requests with token validation and refresh mechanism
export const secureRequest = async (method, url, data = null, app='api/') => {
    console.log("data",data)
    url=app+url
    // const navigate= useNavigate
    try {
        await ensureTokenValidity(); // Ensure the token is valid
        const response = await API[method](url, data); // Make the API request with the given method and URL
        return response.data; // Return the response data
    } catch (error) {
        if (error.response) {
            // Errors returned from the server
            console.error(`Server responded with error: ${error.response.status}`, error.response.data);
            if (error.response.status === 401) {
                // Unauthorized error, possibly token expired
                toast.warn("Session expired. Please log in again.",{
                    
                    onClose: () => {
                        window.location.href='/login'

                    },
                    autoClose: 3000,

                });


            }
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
