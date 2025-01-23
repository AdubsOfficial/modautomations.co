import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CountdownTimerProps {
  onExpire?: () => void;
  mini?: boolean;
}

// Helper function to get timer state from localStorage
const getStoredTimerState = () => {
  const stored = localStorage.getItem('timerState');
  if (stored) {
    const { endTime } = JSON.parse(stored);
    if (endTime && new Date(endTime).getTime() > Date.now()) {
      const diff = Math.floor((new Date(endTime).getTime() - Date.now()) / 1000);
      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;
      return { hours, minutes, seconds };
    }
  }
  // If no valid stored state, start with 2 hours
  const endTime = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
  localStorage.setItem('timerState', JSON.stringify({ endTime }));
  return { hours: 2, minutes: 0, seconds: 0 };
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ onExpire, mini = false }) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(getStoredTimerState);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showFinalCountdown, setShowFinalCountdown] = useState(false);
  const [countdownNumber, setCountdownNumber] = useState(10);
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);

  // Create clock tick sound
  const createTickSound = useCallback(() => {
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(1000, context.currentTime);
    gainNode.gain.setValueAtTime(0.05, context.currentTime);
    
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.05);
    
    setTimeout(() => {
      oscillator.stop();
    }, 50);
  }, []);

  // Create alarm sound
  const createAlarmSound = useCallback(() => {
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(440, context.currentTime);
    gainNode.gain.setValueAtTime(0.1, context.currentTime);
    
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1);
    
    setTimeout(() => {
      oscillator.stop();
    }, 1000);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const totalSeconds = timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds;
      
      if (totalSeconds <= 0) {
        // Timer expired
        createAlarmSound();
        localStorage.removeItem('timerState');
        setShowTimeUpModal(true);
        if (onExpire) onExpire();
        return;
      }

      // Show warning modal at 30 seconds
      if (totalSeconds === 30) {
        setShowWarningModal(true);
        createAlarmSound();
      }

      // Start final countdown at 10 seconds
      if (totalSeconds === 10) {
        setShowFinalCountdown(true);
        setCountdownNumber(10);
        createAlarmSound();
      }

      // Play tick sound and flash screen in last 10 seconds
      if (totalSeconds <= 10) {
        createTickSound();
        setIsWarning(true);
        setIsGlitching(true);
        setCountdownNumber(totalSeconds);
        
        // Flash the screen red
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-red-500/20 pointer-events-none z-50';
        document.body.appendChild(overlay);
        setTimeout(() => {
          document.body.removeChild(overlay);
        }, 500);
      }

      // Calculate new time values
      const newTotalSeconds = totalSeconds - 1;
      const newHours = Math.floor(newTotalSeconds / 3600);
      const newMinutes = Math.floor((newTotalSeconds % 3600) / 60);
      const newSeconds = newTotalSeconds % 60;

      const newTimeLeft = {
        hours: newHours,
        minutes: newMinutes,
        seconds: newSeconds
      };

      setTimeLeft(newTimeLeft);

      // Update localStorage with new end time
      const endTime = new Date(Date.now() + newTotalSeconds * 1000).toISOString();
      localStorage.setItem('timerState', JSON.stringify({ endTime }));
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onExpire, createAlarmSound, createTickSound]);

  const TimerDigit = ({ value }: { value: number }) => (
    <motion.div
      className={`inline-flex justify-center items-center ${
        mini ? 'w-8 h-8 text-lg' : 'w-16 h-16 text-4xl'
      } bg-black border ${
        isWarning ? 'border-red-500' : 'border-[#0f0]'
      } rounded-lg font-mono font-bold ${
        isWarning ? 'text-red-500' : 'text-[#0f0]'
      } ${isGlitching ? 'animate-glitch' : ''}`}
      animate={{
        borderColor: isWarning ? ['#ff0000', '#ff000080'] : ['#00ff00', '#00ff0080'],
        opacity: isGlitching ? [1, 0.8, 1] : 1,
      }}
      transition={{ duration: 0.5, repeat: Infinity }}
    >
      {String(value).padStart(2, '0')}
    </motion.div>
  );

  const Separator = () => (
    <div className={`mx-2 ${isWarning ? 'text-red-500' : 'text-[#0f0]'}`}>:</div>
  );

  return (
    <>
      <div className={`text-center ${mini ? 'scale-75' : ''}`}>
        {!mini && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <div className="flex items-center justify-center gap-2 text-red-500 mb-2">
              <AlertTriangle className={`w-6 h-6 ${isWarning ? 'animate-pulse' : ''}`} />
              <h2 className="text-xl font-bold">CRITICAL SYSTEM ALERT</h2>
              <AlertTriangle className={`w-6 h-6 ${isWarning ? 'animate-pulse' : ''}`} />
            </div>
            <p className="text-[#0f0]/80 font-mono">
              PROTOCOL TERMINATION IMMINENT - SECURE YOUR ACCESS NOW
            </p>
          </motion.div>
        )}

        <div className="flex items-center justify-center gap-2">
          <TimerDigit value={timeLeft.hours} />
          <Separator />
          <TimerDigit value={timeLeft.minutes} />
          <Separator />
          <TimerDigit value={timeLeft.seconds} />
        </div>

        {!mini && (
          <motion.p
            className="mt-4 text-red-500 font-mono"
            animate={{
              opacity: isWarning ? [1, 0.5] : 1,
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            SYSTEM PURGE ACTIVATED - ALL ACCESS WILL BE TERMINATED
          </motion.p>
        )}
      </div>

      {/* Warning Modal at 30 seconds */}
      <AnimatePresence>
        {showWarningModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black border border-red-500 rounded-lg p-8 max-w-md mx-4 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold text-red-500 mb-4">
                WARNING: BUNKER LOCKDOWN IMMINENT
              </h2>
              <p className="text-white mb-6">
                The bunker will be closed and locked when the timer runs out. 
                Enter the bunker now!
              </p>
              <button
                onClick={() => {
                  setShowWarningModal(false);
                  navigate('/bunker');
                }}
                className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold
                         hover:bg-red-600 transition-colors flex items-center justify-center
                         w-full"
              >
                Enter Bunker
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Countdown Overlay */}
      <AnimatePresence>
        {showFinalCountdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-red-500/20 pointer-events-none z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-red-500 text-9xl font-bold font-mono"
            >
              {countdownNumber}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Time's Up Modal */}
      <AnimatePresence>
        {showTimeUpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black border border-red-500 rounded-lg p-8 max-w-md mx-4 text-center"
            >
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-500 mb-4">
                Time's Up! The bunker is now locked.
              </h2>
              <p className="text-white mb-6">
                Stay tuned for the next opportunity to secure your access.
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setShowTimeUpModal(false);
                    window.location.reload(); // Restart timer
                  }}
                  className="w-full bg-red-500 text-white px-6 py-3 rounded-lg font-bold
                           hover:bg-red-600 transition-colors"
                >
                  Restart Process
                </button>
                <button
                  onClick={() => {
                    setShowTimeUpModal(false);
                    navigate('/');
                  }}
                  className="w-full bg-black text-red-500 px-6 py-3 rounded-lg font-bold
                           border border-red-500 hover:bg-red-500/10 transition-colors"
                >
                  Return to Main Page
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CountdownTimer;