import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';


const CustomConfetti = ({ numberOfPieces, duration }) => {
  const  height  = window.innerHeight
  const  width = window.innerWidth
  return (
    <Confetti
      numberOfPieces={numberOfPieces}
      width={width}
      height={height}
      recycle={false}
    />
  );
};

export default CustomConfetti;
