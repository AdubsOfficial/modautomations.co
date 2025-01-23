import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Shield, Radiation, Lock, Zap, Target, CheckCircle, ArrowLeft,
  DollarSign, Clock, Users, Brain, Cpu, Database
} from 'lucide-react';
import TypewriterText from '../components/TypewriterText';
import GlitchText from '../components/GlitchText';

const calculateSavings = (packageName: string) => {
  const savingsData = {
    'mod-startup': { saved: 199, timeValue: 4500, efficiency: 80 },
    'mod-premium': { saved: 397, timeValue: 9000, efficiency: 85 },
    'mod-scale': { saved: 460, timeValue: 15000, efficiency: 90 }
  };
  return savingsData[packageName as keyof typeof savingsData] || savingsData['mod-startup'];
};

function BunkerThankYou() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, packageName } = location.state || {};
  const [showContent, setShowContent] = useState(false);
  const [securityLevel, setSecurityLevel] = useState(0);
  const [showBenefits, setShowBenefits] = useState(false);

  const savings = calculateSavings(packageName?.toLowerCase());

  useEffect(() => {
    if (!packageName) {
      navigate('/');
      return;
    }

    // Create initial emergency effect
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
      <div class="text-[#0f0] font-mono text-4xl font-bold mb-4 animate-pulse">BUNKER ACCESS GRANTED</div>
      <div class="text-[#0f0] font-mono text-xl">INITIALIZING SURVIVAL PROTOCOLS...</div>
      <div class="flex justify-center items-center gap-4 mt-4">
        <div class="w-3 h-3 bg-[#0f0] rounded-full animate-ping"></div>
        <div class="w-3 h-3 bg-[#0f0] rounded-full animate-ping" style="animation-delay: 200ms"></div>
        <div class="w-3 h-3 bg-[#0f0] rounded-full animate-ping" style="animation-delay: 400ms"></div>
      </div>
    `;

    // Add scanning effect
    const scanLine = document.createElement('div');
    scanLine.className = 'fixed left-0 right-0 h-px bg-[#0f0] z-[102] pointer-events-none';
    scanLine.style.boxShadow = '0 0 20px #0f0';
    scanLine.style.animation = 'bunker-scan 2s linear';

    // Add keyframes for scan line
    const style = document.createElement('style');
    style.textContent = `
      @keyframes bunker-scan {
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

    // Simulate security level increase
    const securityInterval = setInterval(() => {
      setSecurityLevel(prev => {
        if (prev >= 100) {
          clearInterval(securityInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    // Show content after effects
    setTimeout(() => {
      document.body.removeChild(overlay);
      document.body.removeChild(messageContainer);
      document.body.removeChild(scanLine);
      document.head.removeChild(style);
      setShowContent(true);
      oscillator.stop();
      
      // Animate in benefits after a delay
      setTimeout(() => setShowBenefits(true), 1000);
    }, 2000);

    return () => clearInterval(securityInterval);
  }, [packageName, navigate]);

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

      {/* Security Level Indicator */}
      <div className="fixed top-16 left-0 right-0 bg-black/80 backdrop-blur-md border-b border-[#0f0]/20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#0f0]" />
              <span className="text-sm">SECURITY LEVEL:</span>
            </div>
            <div className="flex-1 mx-4 bg-[#0f0]/20 h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#0f0]"
                initial={{ width: 0 }}
                animate={{ width: `${securityLevel}%` }}
                transition={{ duration: 2 }}
              />
            </div>
            <span className="text-sm font-bold">{securityLevel}%</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-32"
          >
            <div className="max-w-4xl mx-auto text-center">
              {/* Success Icon */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="mb-8 relative"
              >
                <div className="absolute inset-0 animate-pulse bg-[#0f0]/20 rounded-full blur-xl"></div>
                <Radiation className="w-20 h-20 text-[#0f0] mx-auto relative" />
              </motion.div>

              {/* Main Title */}
              <GlitchText 
                text="EMERGENCY PROTOCOL ACTIVATED"
                className="text-4xl md:text-5xl font-bold mb-6"
              />

              {/* Package Info */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-4 mb-8"
              >
                <Shield className="w-8 h-8" />
                <h2 className="text-2xl font-bold">BUNKER ACCESS GRANTED</h2>
                <Shield className="w-8 h-8" />
              </motion.div>

              {/* Main Content */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-black/40 border-2 border-[#0f0] rounded-lg p-8 backdrop-blur-sm mb-8"
              >
                <TypewriterText
                  text={`CONGRATULATIONS ON YOUR SURVIVAL, ${name || 'OPERATIVE'}!`}
                  className="text-xl mb-4 block"
                  delay={50}
                />
                
                <p className="text-[#0f0]/80 mb-8">
                  You've successfully secured your position in our emergency bunker with {packageName}. 
                  Your quick action has not only ensured your business survival but also secured significant strategic advantages.
                </p>

                {/* Savings Grid */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="p-4 bg-[#0f0]/10 rounded-lg border border-[#0f0]/20"
                  >
                    <DollarSign className="w-6 h-6 text-[#0f0] mb-2" />
                    <div className="text-2xl font-bold">${savings.saved}</div>
                    <div className="text-sm text-[#0f0]/60">Emergency Savings</div>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="p-4 bg-[#0f0]/10 rounded-lg border border-[#0f0]/20"
                  >
                    <Clock className="w-6 h-6 text-[#0f0] mb-2" />
                    <div className="text-2xl font-bold">${savings.timeValue}</div>
                    <div className="text-sm text-[#0f0]/60">Time Value Saved</div>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="p-4 bg-[#0f0]/10 rounded-lg border border-[#0f0]/20"
                  >
                    <Zap className="w-6 h-6 text-[#0f0] mb-2" />
                    <div className="text-2xl font-bold">{savings.efficiency}%</div>
                    <div className="text-sm text-[#0f0]/60">Efficiency Boost</div>
                  </motion.div>
                </div>

                {/* Benefits Section */}
                <AnimatePresence>
                  {showBenefits && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                        <Brain className="w-5 h-5" />
                        ACTIVATED AI CAPABILITIES:
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { icon: Cpu, title: "Neural Processing", desc: "Advanced AI decision making" },
                          { icon: Database, title: "Data Fortress", desc: "Secure business intelligence" },
                          { icon: Users, title: "Lead Generation", desc: "Automated prospect acquisition" },
                          { icon: Target, title: "Market Analysis", desc: "Real-time opportunity detection" }
                        ].map((benefit, index) => (
                          <motion.div
                            key={index}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1 + index * 0.1 }}
                            className="flex items-start gap-3 p-4 bg-[#0f0]/5 rounded-lg"
                          >
                            <benefit.icon className="w-5 h-5 shrink-0 mt-0.5 text-[#0f0]" />
                            <div>
                              <div className="font-bold">{benefit.title}</div>
                              <div className="text-sm text-[#0f0]/60">{benefit.desc}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Status Footer */}
                <div className="mt-8 text-[#0f0]/60 text-sm flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  BUNKER STATUS: SECURE | AI CORE: ACTIVE | DEFENSES: ONLINE
                </div>
              </motion.div>

              {/* Next Steps */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="space-y-4"
              >
                <p className="text-[#0f0]/80">
                  Our emergency response team will contact you within 2 hours to begin your survival protocol implementation.
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

export default BunkerThankYou;