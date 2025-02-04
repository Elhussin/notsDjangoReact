import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import React, { memo } from 'react';
const About = memo(function About() {

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {/* Main Heading */}
      <h1>Welcome to My App</h1>

      {/* Subheading with introduction */}
      <h2>I'm Hussain</h2>

      {/* Button to navigate to the home page */}
      <Button 
        variant="contained" 
        color="primary" 
        style={{ marginTop: '20px' }}  // Adds margin above the button for spacing
      >
        {/* Link wrapped inside the button to navigate to Home */}
        <Link 
          to="/home" 
          style={{ textDecoration: 'none', color: 'white' }} // Removes underline and sets text color to white
        >
          Home
        </Link>
      </Button>
      
    </div>
  );
});

export default About;
