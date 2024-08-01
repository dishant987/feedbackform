import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import AppAppBar from './AppBar';
import '../App.css';

const Home = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['accessToken']);

  useEffect(() => {
    if (cookies.accessToken) {
      navigate('/feedback'); // Redirect to feedback if user is already logged in
    }
  }, [cookies.accessToken, navigate]);

  return (
    <Box
      sx={{
        margin: 0,
        backgroundImage: 'url(./feedback.png)',
        backgroundColor: 'linear-gradient(rgba(0, 150, 255, 0.32), rgba(255, 222, 106, 0.26))',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '@media (max-width: 600px)': {
          backgroundSize:'contain',
          height: '100vh',
        },
        '@media (min-width: 601px) and (max-width: 960px)': {
          backgroundSize: 'cover',
          height: '100vh',
        },
        '@media (min-width: 961px)': {
          backgroundSize: 'cover',
          height: '100vh',
        },
      }}
    >
      <AppAppBar />
      {/* Add your content here */}
    </Box>
  );
};

export default Home;
