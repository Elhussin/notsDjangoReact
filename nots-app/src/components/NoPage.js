import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

/**
 * NoPage Component
 * 
 * This component displays a styled 404 error page with a message and a button to navigate back to the home page.
 * It uses Material-UI for styling and provides a user-friendly experience for handling unmatched routes.
 */
const NoPage = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  /**
   * Handles the click event to navigate back to the home page.
   */
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        padding: 2,
      }}
    >
      {/* 404 Title */}
      <Typography
        variant="h1"
        sx={{
          fontSize: '6rem',
          fontWeight: 'bold',
          color: '#ff6b6b',
          marginBottom: 2,
        }}
      >
        404
      </Typography>

      {/* Error Message */}
      <Typography
        variant="h5"
        sx={{
          fontSize: '1.5rem',
          color: '#555',
          marginBottom: 3,
        }}
      >
        Oops! The page you're looking for doesn't exist.
      </Typography>

      {/* Go Home Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        sx={{
          paddingX: 4,
          paddingY: 1,
          fontSize: '1rem',
        }}
      >
        Go to Home Page
      </Button>
    </Box>
  );
};

export default NoPage;
