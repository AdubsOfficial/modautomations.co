import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowLeft, Terminal, Shield, Zap, Target, Lock } from 'lucide-react';
import { services } from '../data/services';
import TypewriterText from '../components/TypewriterText';
import GlitchText from '../components/GlitchText';

function ThankYou() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, serviceId, packageName } = location.state || {};
  const [showContent, setShowContent] = useState(false);
  
  const service = services.find(s => s.id === serviceId);
  const packageDetails = service?.packages.find(p => 
    p.name.toLowerCase().replace(/\s+/g, '-') === packageName?.toLowerCase()
  );

  useEffect(() => {
    if (!service || !packageDetails) {
      navigate('/');
      return;
    }

    // Create initial transition effect
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[100] pointer-events-none';
    overlay.style.background = `
      radial-gradient(circle at center, rgba(0, 255, 0, 0.3) 0%, black 100%),
      repeating-linear-gradient(
        0deg,
        rgba(0, 255, 0, 0.1) 0px,
        rgba(0, 255, 0, 0.1) 1px,
        transparent 1px,
        transparent 2px
      )
    `;

    // Add success message container
    const messageContainer = document.createElement('div');
    messageContainer.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-[101] pointer-events-none';
    messageContainer.innerHTML = `
      <div class="text-[#0f0] font-mono text-4xl font-bold mb-4 animate-pulse">PROTOCOL ACTIVATION SUCCESSFUL</div>
      <div class="text-[#0f0] font-mono text-xl">INITIALIZING SECURE ENVIRONMENT...</div>
      <div class="flex justify-center items-center gap-4 mt-4">
        <div class="w-3 h-3 bg-[#0f0] rounded-full animate-ping"></div>
        <div class="w-3 h-3 bg-[#0f0] rounded-full animate-ping" style="animation-delay: 200ms"></div>
        <div class="w-3 h-3 bg-[#0f0] rounded-full animate-ping" style="animation-delay: 400ms"></div>
      </div>
    `;

    // Add scanning effect
    const scanLine = document.createElement('div');
    scanLine.className = 'fixed left-0 right-0 h-px bg-[#0f0] z-[102] pointer-events-none';
    scanLine.style.boxShadow = '0 0 10px #0f0';
    scanLine.style.animation = 'scan-line 2s linear';

    // Add keyframes for scan line
    const style = document.createElement('style');
    style.textContent = `
      @keyframes scan-line {
        from { top: -10px; }
        to { top: 100vh; }
      }
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(messageContainer);
    document.body.appendChild(scanLine);
    document.head.appendChild(style);

    // Create success sound
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, context.currentTime);
    gainNode.gain.setValueAtTime(0.1, context.currentTime);
    
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1);

    // Remove effects and show content
    setTimeout(() => {
      document.body.removeChild(overlay);
      document.body.removeChild(messageContainer);
      document.body.removeChild(scanLine);
      document.head.removeChild(style);
      setShowContent(true);
      oscillator.stop();
    }, 2000);
  }, [service, packageDetails, navigate]);

  if (!service || !packageDetails) return null;

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-black text-[#0f0] font-mono relative overflow-hidden">
      <div className="fixed inset-0 bg-grid-pattern opacity-20"></div>
      <div className="fixed inset-0 bg-glitch-pattern opacity-10"></div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-[#0f0]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center text-[#0f0]">
              <Terminal className="w-8 h-8" />
              <span className="ml-2 text-xl font-bold tracking-tight">MOD Automations</span>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-16"
          >
            <div className="max-w-3xl mx-auto text-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="mb-8 relative"
              >
                <div className="absolute inset-0 animate-pulse bg-[#0f0]/20 rounded-full blur-xl"></div>
                <CheckCircle className="w-20 h-20 text-[#0f0] mx-auto relative" />
              </motion.div>

              <GlitchText 
                text="PROTOCOL INITIALIZATION SUCCESSFUL"
                className="text-4xl md:text-5xl font-bold mb-6"
              />

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-4 mb-8"
              >
                <Icon className="w-8 h-8" />
                <h2 className="text-2xl font-bold">{service.title.toUpperCase()}</h2>
                <Icon className="w-8 h-8" />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-black/40 border border-[#0f0]/20 rounded-lg p-8 backdrop-blur-sm mb-8"
              >
                <TypewriterText
                  text={`GREETINGS, ${name || 'OPERATIVE'}!`}
                  className="text-xl mb-4 block"
                  delay={50}
                />
                
                <p className="text-[#0f0]/80 mb-6">
                  You have successfully activated {packageName} for {service.title}. 
                  Your journey towards enhanced operational efficiency begins now.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-[#0f0]/10 rounded-lg">
                    <Target className="w-6 h-6 text-[#0f0] mb-2" />
                    <div className="font-bold">300% ROI</div>
                    <div className="text-sm text-[#0f0]/60">Average Return</div>
                  </div>
                  <div className="p-4 bg-[#0f0]/10 rounded-lg">
                    <Zap className="w-6 h-6 text-[#0f0] mb-2" />
                    <div className="font-bold">24/7</div>
                    <div className="text-sm text-[#0f0]/60">System Uptime</div>
                  </div>
                </div>

                <div className="space-y-4 text-left mb-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    ACTIVATED CAPABILITIES:
                  </h3>
                  {packageDetails.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-start"
                    >
                      <CheckCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5 text-[#0f0]" />
                      <span className="text-[#0f0]/80">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="text-[#0f0]/60 text-sm flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  SYSTEM STATUS: ONLINE | INITIALIZATION COMPLETE | PROTOCOLS ACTIVE
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="space-y-4"
              >
                <p className="text-[#0f0]/80">
                  Our team of elite operatives will contact you within 24 hours to begin your system integration.
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center text-[#0f0] hover:text-[#0f0]/80 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  RETURN TO COMMAND CENTER
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ThankYou;