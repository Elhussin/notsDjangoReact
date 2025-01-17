import React from "react";
import { useUser } from "./UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

/**
 * Logout Component
 * Handles user logout by clearing user data and tokens, then redirects to the login page.
 */
const Logout = () => {
  const { setUser } = useUser(); // Access user context to update user state
  const navigate = useNavigate(); // Hook for programmatic navigation

  /**
   * Handle logout process.
   * Clears user state, removes tokens, and redirects to the login page.
   */
  const handleLogout = () => {
    // Display a toast notification for logout success
    toast.warn("Logged out successfully");

    // Clear user tokens and state
    localStorage.clear();
    setUser(null);

    // Navigate to the login page
    navigate("/login");
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleLogout}
      aria-label="Logout Button"
      fullWidth
    >
      Logout
    </Button>
  );
};

export default Logout;
