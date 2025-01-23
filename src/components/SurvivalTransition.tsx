import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface SurvivalTransitionProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const SurvivalTransition: React.FC<SurvivalTransitionProps> = ({
  to,
  children,
  className = ''
}) => {
  const navigate = useNavigate();

  const handleTransition = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Create apocalyptic overlay
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[100] pointer-events-none';
    overlay.style.background = `
      radial-gradient(circle at center, rgba(255, 0, 0, 0.2) 0%, black 100%),
      repeating-linear-gradient(
        0deg,
        rgba(255, 0, 0, 0.1) 0px,
        rgba(255, 0, 0, 0.1) 1px,
        transparent 1px,
        transparent 2px
      )
    `;
    
    // Add warning text
    const warning = document.createElement('div');
    warning.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-[101] pointer-events-none';
    warning.innerHTML = `
      <div class="text-red-500 font-mono text-4xl font-bold mb-4 animate-pulse">SYSTEM BREACH DETECTED</div>
      <div class="text-red-400 font-mono text-xl">INITIATING EMERGENCY PROTOCOLS...</div>
      <div class="flex justify-center items-center gap-4 mt-4">
        <div class="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
        <div class="w-3 h-3 bg-red-500 rounded-full animate-ping" style="animation-delay: 200ms"></div>
        <div class="w-3 h-3 bg-red-500 rounded-full animate-ping" style="animation-delay: 400ms"></div>
      </div>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(warning);

    // Add glitch effect to all text
    document.querySelectorAll('h1, h2, h3, p, span, button').forEach(el => {
      el.classList.add('animate-glitch');
    });

    // Create alarm sound
    const alarm = new AudioContext();
    const oscillator = alarm.createOscillator();
    const gainNode = alarm.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(alarm.destination);
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(440, alarm.currentTime);
    gainNode.gain.setValueAtTime(0.1, alarm.currentTime);
    
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.00001, alarm.currentTime + 1);

    // Add scanning line effect
    const scanLine = document.createElement('div');
    scanLine.className = 'fixed left-0 right-0 h-px bg-red-500 z-[102] pointer-events-none';
    scanLine.style.boxShadow = '0 0 10px rgb(239, 68, 68)';
    scanLine.style.animation = 'scan-line 2s linear';
    document.body.appendChild(scanLine);

    // Add keyframes for scan line animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes scan-line {
        from { top: -10px; }
        to { top: 100vh; }
      }
    `;
    document.head.appendChild(style);

    // Navigate after effects
    setTimeout(() => {
      navigate(to);
      document.body.removeChild(overlay);
      document.body.removeChild(warning);
      document.body.removeChild(scanLine);
      document.head.removeChild(style);
      document.querySelectorAll('h1, h2, h3, p, span, button').forEach(el => {
        el.classList.remove('animate-glitch');
      });
      oscillator.stop();
    }, 2000);
  };

  return (
    <motion.button
      onClick={handleTransition}
      className={`group relative ${className}`}
      whileHover={{
        scale: 1.05,
        textShadow: "0 0 8px rgb(255, 0, 0)",
        boxShadow: "0 0 8px rgb(255, 0, 0)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 bg-red-500/5 group-hover:animate-scan rounded-lg"></div>
      <div className="relative z-10 flex items-center">
        {children}
      </div>
    </motion.button>
  );
};

export default SurvivalTransition;