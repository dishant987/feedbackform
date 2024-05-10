import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const CustomConfetti = ({ numberOfPieces, duration }) => {


  return (
    <Confetti
      numberOfPieces={numberOfPieces}
      recycle={false}
    />
  );
};

export default CustomConfetti;
