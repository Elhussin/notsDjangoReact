
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Typography, Slide } from '@mui/material';
import { Link } from 'react-router-dom';
import { useUser } from "../components/UserContext";
import Logout from '../components/Logout';
import ThemeToggle from './ThemeToggle';  // Import the ThemeToggle component

// Navbar component using Material-UI AppBar for a responsive navbar
const Navbar = () => {
  const { user } = useUser();
  const [showNavbar, setShowNavbar] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Track scroll to hide/show Navbar
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // Hide when scroll down
      } else {
        setShowNavbar(true); // Show when Scroll UP
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup event listener
  }, []);

  // Toggle dark mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-theme');  // Add dark theme class
    } else {
      document.body.classList.remove('dark-theme');  // Remove dark theme class
    }
  };

  return (
    <Slide direction="down" in={showNavbar} mountOnEnter unmountOnExit>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
          </Typography>

          {/* Conditional rendering of navbar items based on user role */}
          {user ? (
            <>
              <Button color="inherit">
                <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
              </Button>
              {user.userRole === "admin" && (
                <>
                  <Button color="inherit">
                    <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>Admin</Link>
                  </Button>
                  <Button color="inherit">
                    <Link to="/branch" style={{ color: 'white', textDecoration: 'none' }}>Branches</Link>
                  </Button>
                </>
              )}
              <Button color="inherit">
                <Logout />
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit">
                <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
              </Button>
              <Button color="inherit">
                <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
              </Button>
            </>
          )}

          {/* Add ThemeToggle button */}
          <ThemeToggle toggleTheme={toggleTheme} />
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export default Navbar;
