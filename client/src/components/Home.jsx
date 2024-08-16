import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Box } from '@mui/material';
import AppAppBar from './AppBar';
import '../App.css';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['accessToken']);

  React.useEffect(() => {
    if (cookies.accessToken) {
      navigate('/feedback');
    }
  }, [cookies.accessToken, navigate]);

  const canvasRef = React.useRef(null);
  const contextRef = React.useRef(null);

  const frames = {
    cur: 0,
    maxIndex: 400,
  };

  const images = [];
  let imgLoaded = 0;

  const preloadImages = () => {
    for (let i = 1; i <= frames.maxIndex; i++) {
      const imageUrl = `/frames/frame_${i.toString().padStart(4, '0')}.jpg`;
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        imgLoaded++;
        if (imgLoaded === frames.maxIndex) {
          console.log('All images loaded');
          loadImage(frames.cur); // Load the first image
          startAnimation(); // Start the GSAP animation
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${imageUrl}`);
      };
      images.push(img);
    }
  };

  const loadImage = (index) => {
    if (index >= 0 && index < frames.maxIndex) {
      const img = images[index];
      const canvas = canvasRef.current;
      const context = contextRef.current;

      if (canvas && context) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        frames.cur = index;
      }
    }
  };

  const startAnimation = () => {
    gsap.timeline({
      scrollTrigger: {
        trigger: '.parent',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Adjust as needed

      },
    }).to(frames, {
      cur: frames.maxIndex - 1, // Adjust to maxIndex - 1 to fit zero-based index
      onUpdate: function () {
        loadImage(Math.floor(frames.cur));
      },
      ease: 'none',
    });
  };

  React.useEffect(() => {
    contextRef.current = canvasRef.current.getContext('2d');
    preloadImages();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <Box
    sx={{
      position: 'relative', // Corrected 'parent relative' to 'relative'
      height: '700vh', // Adjust this based on your needs

    }}
  >
    <AppAppBar />
    <Box
      className="h-screen"
      sx={{
        position: 'sticky',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
      }}
    >
      <canvas
        id="frame"
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  </Box>
  );
};

export default Home;
