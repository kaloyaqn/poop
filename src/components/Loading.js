// LoadingScreen.js
import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const animationVariants = {
    initial: {
      opacity: 1,
      scale: 0,
      y: '100%',
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.2, // Delay before the circle starts growing
        duration: 1, // Time taken for the circle to fill the screen
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 10.5, // Increase the scale to make it disappear off-screen
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animationVariants}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#F8F7F6', // Set your background color
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <motion.div
        style={{
          width: 100, // Set your circle size
          height: 100,
          borderRadius: '50%',
          backgroundColor: '#5B3410', // Set your circle color
        }}
      />
    </motion.div>
  );
};

export default LoadingScreen;
