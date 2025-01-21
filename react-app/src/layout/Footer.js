import React from 'react';
import { Box, Grid, Typography, Link } from '@mui/material';

/**
 * Footer Component
 * This component represents the footer section of the website, containing
 * useful links, social media icons, and contact information.
 */
const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#333',
        color: 'white',
        padding: '20px 0',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <Grid container spacing={3} justifyContent="space-between">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">About Us</Typography>
          <Typography variant="body2">
            We are a company that provides the best eyewear products to enhance your vision and style.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Quick Links</Typography>
          <Box>
            <Link href="/home" color="inherit" underline="hover">
              Home
            </Link>
            <br />
            <Link href="/shop" color="inherit" underline="hover">
              Shop
            </Link>
            <br />
            <Link href="/about" color="inherit" underline="hover">
              About
            </Link>
            <br />
            <Link href="/contact" color="inherit" underline="hover">
              Contact
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Follow Us</Typography>
          <Box>
            <Link href="https://facebook.com" color="inherit" target="_blank" rel="noopener noreferrer">
              Facebook
            </Link>
            <br />
            <Link href="https://instagram.com" color="inherit" target="_blank" rel="noopener noreferrer">
              Instagram
            </Link>
            <br />
            <Link href="https://twitter.com" color="inherit" target="_blank" rel="noopener noreferrer">
              Twitter
            </Link>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', marginTop: '20px', borderTop: '1px solid #444', paddingTop: '10px' }}>
        <Typography variant="body2" align="center">
          &copy; {new Date().getFullYear()} Solo Vizion. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
