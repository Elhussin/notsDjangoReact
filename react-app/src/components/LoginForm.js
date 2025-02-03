import React, { useState } from "react";
import { login,getUsersByToken } from "../Api/api"; // Import the login API function
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {jwtDecode} from "jwt-decode"; // Correct import for jwtDecode
import { useUser } from "./UserContext"; // Use context for managing user data
import { Button, TextField, CircularProgress } from "@mui/material";

/**
 * LoginForm Component
 * Handles user login by submitting credentials and managing authentication state.
 */
const LoginForm = () => {
  const [username, setUsername] = useState(""); // State for username input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate(); // Navigation hook for redirecting
  const { setUser } = useUser(); // Context for managing user state

  /**
   * Handle form submission for login.
   * @param {Event} e - Form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading indicator
    setError(""); // Clear previous error messages

    try {
      // Call the login API
      const response = await login({ username, password });

      // Show success toast
      toast.success("Login successful!");

      if (response.access) {
        try {
          // Decode JWT token to extract user data
          const decodedToken = jwtDecode(response.access);

          // Store tokens in localStorage
          localStorage.setItem("access_token", response.access);
          localStorage.setItem("refresh_token", response.refresh);

          // Check token expiry
          const currentTime = Math.floor(Date.now() / 1000);
          if (decodedToken.exp > currentTime) {
            const Data = await getUsersByToken();
            const userData=Data[0];
            console.log("User data Login:", userData);
            // Determine user role based on token claims
            let userRole = "user";
            if (userData.staff && userData.superuser) {
              userRole = "admin";
            } else if (userData.staff && !userData.superuser) {
              userRole = "staff";
            } else if (!userData.staff && userData.superuser) {
              userRole = "manager";
            }


            // Set user data in context
            setUser({
              username: userData.username,
              email: userData.email,
              'userRole':userRole,
              id: userData.id,
            });
          } else {
            toast.error("Token expired. Please login again.");
          }
        } catch (error) {
          console.error("Invalid token:", error);
        }
      }

      // Redirect to the dashboard after successful login
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Login error:", error);

      // Set error message for user
      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError("Network error. Please try again.");
      }

      // Show error toast
      toast.error("Invalid username or password.");
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div  className="register-container" >
      <h2>Login</h2>
      {/* Display error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
