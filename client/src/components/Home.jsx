import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Box, Typography, Button, Grid } from '@mui/material';
import AppAppBar from './AppBar';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../App.css';

// Sample feedback data
const feedbacks = [
  {
    name: 'John Doe',
    feedback: 'The feedback system is easy to use and has helped us improve our services!',
  },
  {
    name: 'Jane Smith',
    feedback: 'Great platform for managing customer feedback efficiently!',
  },
  {
    name: 'David Wilson',
    feedback: 'I love how organized the feedback process is now.',
  },
];

// Sample values data
const values = [
  { title: 'Integrity', description: 'We maintain honesty and transparency in all our interactions.' },
  { title: 'Innovation', description: 'We continuously seek new and creative solutions.' },
  { title: 'Customer Focus', description: 'We prioritize our customers’ needs and strive for their satisfaction.' },
  { title: 'Excellence', description: 'We are committed to delivering high-quality results in everything we do.' },
  { title: 'Collaboration', description: 'We work together to achieve common goals and foster teamwork.' },
  { title: 'Respect', description: 'We value and respect diverse perspectives and contributions.' },
];

const Home = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['accessToken']);

  React.useEffect(() => {
    if (cookies.accessToken) {
      navigate('/feedback');
    }
  }, [cookies.accessToken, navigate]);

  const sliderSettings = {
    dots: true, // Keep indicator dots
    arrows: false, // Remove left and right arrows
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <Box sx={{ minHeight: '100vh', marginTop: '8rem' }}>
      <AppAppBar />

      {/* Welcome Section with animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          sx={{
            padding: { xs: '2rem 1rem', sm: '4rem 2rem' },
            textAlign: 'center',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            borderRadius: '12px',
            margin: '2rem auto',
            maxWidth: '1300px', // Consistent maxWidth
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
            },
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', md: '2rem' } }}
          >
            Welcome to Our Feedback Management System
          </Typography>
          <Typography variant="body1" gutterBottom>
            Manage feedback efficiently and improve your services with our easy-to-use platform.
          </Typography>

          <Button
            variant="contained"
            sx={{
              marginTop: '2rem',
              padding: { xs: '0.5rem 1rem', md: '0.75rem 2rem' },
              fontSize: { xs: '0.8rem', md: '1rem' },
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: '#003d99', // Darker shade of the button color
              },
            }}
            onClick={() => navigate('/login')}
          >
            Get Started
          </Button>
        </Box>
      </motion.div>

      {/* Feedback Slider Section with animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Box
          sx={{
            padding: '3rem 1rem',
            backgroundColor: '#ecebeb',
            maxWidth: '1300px', // Consistent maxWidth
            borderRadius: '12px',
            textAlign: 'center',
            margin: '2rem auto',
            transition: 'box-shadow 0.3s',
            '&:hover': {
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              marginBottom: '2rem',
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              fontWeight: 'bold',
            }}
          >
            What Our Users Say
          </Typography>

          <Slider {...sliderSettings}>
            {feedbacks.map((item, index) => (
              <Box key={index} sx={{ padding: '1rem' }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Box
                    sx={{
                      backgroundColor: '#ffffff',
                      padding: { xs: '1.5rem', md: '2rem' },
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      borderRadius: '12px',
                      maxWidth: '600px', // Consistent maxWidth
                      margin: '0 auto',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                    
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontStyle: 'italic',
                        fontSize: { xs: '0.9rem', md: '1rem' },
                      }}
                    >
                      "{item.feedback}"
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ marginTop: '1rem', fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.25rem' } }}
                    >
                      - {item.name}
                    </Typography>
                  </Box>
                </motion.div>
              </Box>
            ))}
          </Slider>
        </Box>
      </motion.div>

      {/* Our Values Section with animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Box
          sx={{
            padding: '3rem 1rem', // Adjusted padding for smaller screens
            backgroundColor: '#ffffff',
            textAlign: 'center',
            margin: '2rem auto',
            borderRadius: '12px',
            maxWidth: '1300px', // Consistent maxWidth
            transition: 'box-shadow 0.3s',
           
          }}
        >
          <Typography
            variant="h5"
            sx={{
              marginBottom: '2rem',
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              fontWeight: 'bold',
            }}
          >
            Our Values
          </Typography>

          <Grid container spacing={2}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Box
                    sx={{
                      backgroundColor: '#f9f9f9',
                      padding: '2rem',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      borderRadius: '12px',
                      textAlign: 'center',
                      height: '100%', // Ensure boxes have consistent height
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                      }}
                    >
                      {value.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        marginTop: '0.5rem',
                        fontSize: { xs: '0.9rem', md: '1rem' },
                      }}
                    >
                      {value.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Home;
