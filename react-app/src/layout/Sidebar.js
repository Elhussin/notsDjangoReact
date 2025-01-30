import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

/**
 * Sidebar component with toggle functionality using Material-UI Drawer.
 * Allows users to open or close the sidebar dynamically.
 */
const Sidebar = () => {
  // State to manage the sidebar's open/close status
  const [isOpen, setIsOpen] = useState(true);

  /**
   * Toggles the sidebar's open/close state.
   */
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Button to open the sidebar */}
      <IconButton
        onClick={toggleSidebar}
        sx={{ position: 'absolute', top: 10, left: 10 }}
        color="inherit"
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        open={isOpen}
        onClose={toggleSidebar}
        anchor="left"
      >
        {/* List of sidebar links */}
        <List>
          <ListItem component={Link} to="/" button onClick={toggleSidebar} style={{ textDecoration: 'none' }}>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem component={Link} to="/about" button onClick={toggleSidebar} style={{ textDecoration: 'none' }}>
            <ListItemText primary="About" />
          </ListItem>

          <Divider />

          <ListItem component={Link} to="/dashboard" button onClick={toggleSidebar} style={{ textDecoration: 'none' }}>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem component={Link} to="/branch" button onClick={toggleSidebar} style={{ textDecoration: 'none' }}>
            <ListItemText primary="Branches" />
          </ListItem>

          <ListItem component={Link} to="/orderlist" button onClick={toggleSidebar} style={{ textDecoration: 'none' }}>
            <ListItemText primary="Order List" />
          </ListItem>
        </List>

      </Drawer>
    </>
  );
};

export default Sidebar;
