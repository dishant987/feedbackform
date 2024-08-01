import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import AppBar from './AppBar';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import AppAppBar from './AppBar';
const Home = () => {

  const navigate = useNavigate()
  const [cookies] = useCookies(['accessToken']);

  useEffect(() => {
    if (cookies.accessToken) {
      navigate('/feedback'); // Redirect to feedback if user is already logged in
    }
  }, [cookies.accessToken]);
  return (
    <Box
      sx={{
        margin: '0px',
        backgroundImage: `url(./feedback.png)`,
        backgroundColor: 'linear-gradient( rgba(0, 150, 255, 0.32), rgba(255, 222, 106, 0.26))',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',

        // minHeight: '100vh',
        height: '1000px'

      }}
    >
      
      <AppAppBar />
      {/* Add your content here */}
    </Box>
  );
};

export default Home;
