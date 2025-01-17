// import { Link } from "react-router-dom";
// import { toast } from "react-toastify"; 
// import Logout from '../components/Logout';
// import { useUser } from "../components/UserContext";
// import React from "react";
// import '../style/NavPar.css'; // Importing the CSS file for styling

// // Navbar component that dynamically renders navigation links based on the user's authentication status and role.
// const Navbar = () => {
//   // Access the current user context, which provides user authentication and role information
//   const { user } = useUser();

//   return (
//     <nav className="navbar">
//       <ul className="nav-list">
//         {/* Link to the Home page */}
//         <li className="nav-item">
//           <Link to="/" className="nav-link">Home</Link>
//         </li>

//         {/* Link to the About page */}
//         <li className="nav-item">
//           <Link to="/about" className="nav-link">About</Link>
//         </li>

//         {/* Conditionally render navigation items based on user authentication */}
//         {user ? (
//           <>
//             {/* Show "Order List" link for users with a "staff" role */}
//             {user.userRole === "staff" && (
//               <li className="nav-item">
//                 <Link to="/orderlist" className="nav-link">Order List</Link>
//               </li>
//             )}

//             {/* Always show the Dashboard link for authenticated users */}
//             <li className="nav-item">
//               <Link to="/dashboard" className="nav-link">Dashboard</Link>
//             </li>

//             {/* Show admin-specific links if the user is an admin */}
//             {user.userRole === "admin" && (
//               <>
//                 <li className="nav-item">
//                   <Link to="/admin" className="nav-link">Admin</Link>
//                 </li>

//                 <li className="nav-item">
//                   <Link to="/branch" className="nav-link">Branches</Link>
//                 </li>

//                 <li className="nav-item">
//                   <Link to="/orderlist" className="nav-link">Order List</Link>
//                 </li>
//               </>
//             )}

//             {/* Show manager-specific link if the user is a manager */}
//             {user.userRole === "manager" && (
//               <li className="nav-item">
//                 <Link to="/branch" className="nav-link">Branches</Link>
//               </li>
//             )}

//             {/* Show Branch Manager List link for all authenticated users */}
//             <li className="nav-item">
//               <Link to="/branchmanagerlist" className="nav-link">Branch Manager List</Link>
//             </li>

//             {/* Show the Logout button */}
//             <li className="nav-item">
//               <Logout />
//             </li>
//           </>
//         ) : (
//           // If the user is not authenticated, display Register and Login links
//           <>
//             <li className="nav-item">
//               <Link to="/register" className="nav-link">Register</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/login" className="nav-link">Login</Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

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
