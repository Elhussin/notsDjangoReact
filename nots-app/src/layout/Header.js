import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Link, Grid } from '@mui/material';

/**
 * Header Component
 * This component represents the header section of the website, containing
 * the website logo, navigation links, and action buttons.
 */
const Header = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#333' }}>
      <Toolbar>
        {/* Logo and Title Section */}
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
              Solo Vizion
            </Typography>
          </Grid>

          {/* Navigation Links */}
          <Grid item>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link href="/home" color="inherit" underline="hover">
                Home
              </Link>
              <Link href="/shop" color="inherit" underline="hover">
                Shop
              </Link>
              <Link href="/about" color="inherit" underline="hover">
                About
              </Link>
              <Link href="/contact" color="inherit" underline="hover">
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Action Buttons (e.g., Login, Cart) */}
          <Grid item>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit" href="/login">
                Login
              </Button>
              <Button color="inherit" href="/cart">
                Cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
