import React from 'react';
import { Box, Typography, Container, Grid, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionTypography = motion(Typography);
const MotionLink = motion(Link);

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '2rem 0',
        marginTop: 'auto',
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <MotionTypography
              variant="h6"
              sx={{ mb: 2 }}
              whileHover={{ scale: 1.1, color: '#ff9800', transition: { duration: 0.3 } }}
            >
              Company
            </MotionTypography>
            <MotionTypography
              variant="body2"
              sx={{ mb: 1 }}
              whileHover={{ color: '#ff9800', transition: { duration: 0.3 } }}
            >
              <MotionLink href="#" color="inherit" underline="none">
                About Us
              </MotionLink>
            </MotionTypography>
            <MotionTypography
              variant="body2"
              sx={{ mb: 1 }}
              whileHover={{ color: '#ff9800', transition: { duration: 0.3 } }}
            >
              <MotionLink href="#" color="inherit" underline="none">
                Careers
              </MotionLink>
            </MotionTypography>
            <MotionTypography
              variant="body2"
              sx={{ mb: 1 }}
              whileHover={{ color: '#ff9800', transition: { duration: 0.3 } }}
            >
              <MotionLink href="#" color="inherit" underline="none">
                Blog
              </MotionLink>
            </MotionTypography>
            <MotionTypography
              variant="body2"
              sx={{ mb: 1 }}
              whileHover={{ color: '#ff9800', transition: { duration: 0.3 } }}
            >
              <MotionLink href="#" color="inherit" underline="none">
                Contact
              </MotionLink>
            </MotionTypography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MotionTypography
              variant="h6"
              sx={{ mb: 2 }}
              whileHover={{ scale: 1.1, color: '#ff9800', transition: { duration: 0.3 } }}
            >
              Services
            </MotionTypography>
            <MotionTypography
              variant="body2"
              sx={{ mb: 1 }}
              whileHover={{ color: '#ff9800', transition: { duration: 0.3 } }}
            >
              <MotionLink href="#" color="inherit" underline="none">
                Feedback Management
              </MotionLink>
            </MotionTypography>
            <MotionTypography
              variant="body2"
              sx={{ mb: 1 }}
              whileHover={{ color: '#ff9800', transition: { duration: 0.3 } }}
            >
              <MotionLink href="#" color="inherit" underline="none">
                Customer Support
              </MotionLink>
            </MotionTypography>
            <MotionTypography
              variant="body2"
              sx={{ mb: 1 }}
              whileHover={{ color: '#ff9800', transition: { duration: 0.3 } }}
            >
              <MotionLink href="#" color="inherit" underline="none">
                Consulting
              </MotionLink>
            </MotionTypography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MotionTypography
              variant="h6"
              sx={{ mb: 2 }}
              whileHover={{ scale: 1.1, color: '#ff9800', transition: { duration: 0.3 } }}
            >
              Follow Us
            </MotionTypography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                component={motion.div}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                color="inherit"
              >
                <Facebook />
              </IconButton>
              <IconButton
                component={motion.div}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                color="inherit"
              >
                <Twitter />
              </IconButton>
              <IconButton
                component={motion.div}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                color="inherit"
              >
                <Instagram />
              </IconButton>
              <IconButton
                component={motion.div}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                color="inherit"
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MotionTypography
              variant="h6"
              sx={{ mb: 2 }}
              whileHover={{ scale: 1.1, color: '#ff9800', transition: { duration: 0.3 } }}
            >
              Subscribe
            </MotionTypography>
            <MotionTypography
              variant="body2"
              sx={{ mb: 1 }}
              whileHover={{ color: '#ff9800', transition: { duration: 0.3 } }}
            >
              <MotionLink href="#" color="inherit" underline="none">
                Newsletter
              </MotionLink>
            </MotionTypography>
            <MotionTypography
              variant="body2"
              sx={{ mb: 1 }}
              whileHover={{ color: '#ff9800', transition: { duration: 0.3 } }}
            >
              <MotionLink href="#" color="inherit" underline="none">
                Updates
              </MotionLink>
            </MotionTypography>
          </Grid>
        </Grid>
        <Box
          sx={{
            textAlign: 'center',
            marginTop: '2rem',
            borderTop: '1px solid #444',
            paddingTop: '1rem',
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Dishant. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
