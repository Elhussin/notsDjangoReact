import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton, // استخدم ListItemButton بدلاً من ListItem
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

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
          <ListItemButton component={Link} to="/" onClick={toggleSidebar}>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton component={Link} to="/about" onClick={toggleSidebar}>
            <ListItemText primary="About" />
          </ListItemButton>
          <Divider />
          <ListItemButton component={Link} to="/dashboard" onClick={toggleSidebar}>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton component={Link} to="/branch" onClick={toggleSidebar}>
            <ListItemText primary="Branches" />
          </ListItemButton>
          <ListItemButton component={Link} to="/orderlist" onClick={toggleSidebar}>
            <ListItemText primary="Order List" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;