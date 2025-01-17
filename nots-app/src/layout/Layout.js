import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar.js';
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import Footer from './Footer.js';
import { Outlet } from 'react-router-dom';
import Mesage from '../components/Message';

/**
 * Layout Component
 * This component defines the main layout structure of the website,
 * including the Navbar, Header, Sidebar, main content area, and Footer.
 * It ensures that the Navbar doesn't cover any content and remains responsive.
 */
const Layout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Ensures the layout takes the full height of the viewport
        paddingTop: '60px', // Adds space to the top to avoid content being covered by fixed navbar
      }}
    >
      <Mesage />
      <Navbar />
      <Header />

      <Box
        sx={{
          display: 'flex',        // Use flexbox to arrange the Sidebar and content area horizontally
          flex: 1,                // Allow content to take up the remaining space between header and footer
        }}
      >
        <Sidebar sx={{ width: '250px' }} />
        <Box
          sx={{
            flex: 1,               // Take up the remaining space for the main content
            padding: '20px',       // Add padding for better spacing
          }}
        >
          {/* Outlet to render nested routes (e.g., Home, Contact) */}
          <Outlet />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;
