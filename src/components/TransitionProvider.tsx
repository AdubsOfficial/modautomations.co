import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import CountdownTimer from './CountdownTimer';

interface TransitionProviderProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 1
  },
  animate: {
    opacity: 1
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};

// Get the end time from localStorage or set it if not exists
const getEndTime = () => {
  const storedEndTime = localStorage.getItem('countdownEndTime');
  if (storedEndTime) {
    return new Date(parseInt(storedEndTime));
  }
  
  // Set end time to 24 hours from now
  const endTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  localStorage.setItem('countdownEndTime', endTime.getTime().toString());
  return endTime;
};

export default function TransitionProvider({ children }: TransitionProviderProps) {
  const location = useLocation();
  const endTime = getEndTime();
  const isServicesPage = location.pathname === '/services';

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen"
        onAnimationStart={() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto'
          });
        }}
      >
        {/* Only show timer on services page */}
        {isServicesPage && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <CountdownTimer endTime={endTime} />
          </div>
        )}
        {children}
      </motion.div>
    </AnimatePresence>
  );
}