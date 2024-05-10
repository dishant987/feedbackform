import React, { useState } from 'react';
import { Box } from '@mui/material';
import AppBar from './AppBar';
import '../App.css'
const Home = () => {
  return (
    <Box
      sx={{
        margin:'0px',
        backgroundImage: `url(./feedback.png)`,
        backgroundColor:'linear-gradient( rgba(0, 150, 255, 0.32), rgba(255, 222, 106, 0.26))',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
       
        // minHeight: '100vh',
        height:'1000px'
        
      }}
    >
      <AppBar />
      {/* Add your content here */}
    </Box>
  );
};

export default Home;
