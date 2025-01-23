import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { Terminal, Shield, Lock, AlertTriangle, Check, ArrowRight, Radiation } from 'lucide-react';
import TypewriterText from '../components/TypewriterText';
import GlitchText from '../components/GlitchText';

const BUNKER_PASSCODE = 'discounts';

interface SurvivalPackage {
  name: string;
  price: string;
  originalPrice: string;
  setupFee?: string;
  description: string;
  features: string[];
  highlight?: string;
}

const survivalPackages: SurvivalPackage[] = [
  {
    name: 'MOD STARTUP',
    price: '$795',
    originalPrice: '$994',
    description: 'Essential survival protocols for emerging threats',
    features: [
      'AI Lead Generation System',
      'Basic Website Creation',
      'Email Automation',
      'Customer Support Chatbot',
      'CRM Integration',
      'Basic Analytics Dashboard',
      'Weekly Strategy Calls',
      'Emergency Response Team'
    ]
  },
  {
    name: 'MOD PREMIUM',
    price: '$637',
    originalPrice: '$797',
    setupFee: '$1,035',
    description: 'Advanced protection against digital warfare',
    features: [
      'Everything in STARTUP, plus:',
      'Advanced AI Lead Intelligence',
      'Multi-Channel Lead Generation',
      'Custom Website with AI Integration',
      '24/7 AI Support System',
      'Advanced Analytics & Reporting',
      'Automated Social Media Management',
      'Priority Emergency Response',
      'Dedicated Survival Specialist'
    ],
    highlight: 'Most Popular'
  },
  {
    name: 'MOD SCALE',
    price: '$1,837',
    originalPrice: '$2,297',
    setupFee: '$3,997',
    description: 'Maximum security and operational resilience',
    features: [
      'Everything in PREMIUM, plus:',
      'Custom AI Models & Integration',
      'Enterprise-Grade Infrastructure',
      'Predictive Lead Analytics',
      'AI Voice Calling System',
      'White-Label Solutions',
      'API Access & Custom Development',
      'Elite Emergency Response Team',
      'Direct Line to Command Center'
    ]
  }
];

function Bunker() {
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [error, setError] = useState('');
  const [doorState, setDoorState] = useState<'closed' | 'opening' | 'open'>('closed');

  const handlePackageSelect = (pkg: SurvivalPackage) => {
    // Convert package name to URL-friendly format
    const packageSlug = pkg.name.toLowerCase().replace(/\s+/g, '-');
    
    // Navigate to bunker order page with package information
    navigate(`/bunker/order/${packageSlug}`, {
      state: {
        discountedPrice: pkg.price,
        originalPrice: pkg.originalPrice,
        setupFee: pkg.setupFee
      }
    });
  };

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === BUNKER_PASSCODE) {
      setIsAuthorized(true);
      
      // Add warning overlay
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 z-[60] pointer-events-none';
      overlay.style.background = `
        radial-gradient(circle at center, rgba(0, 255, 0, 0.2) 0%, black 100%),
        repeating-linear-gradient(
          0deg,
          rgba(0, 255, 0, 0.1) 0px,
          rgba(0, 255, 0, 0.1) 1px,
          transparent 1px,
          transparent 2px
        )
      `;
      document.body.appendChild(overlay);

      // Add warning text
      const warning = document.createElement('div');
      warning.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-[61] pointer-events-none';
      warning.innerHTML = `
        <div class="text-[#0f0] font-mono text-4xl font-bold mb-4 animate-pulse">BUNKER ACCESS GRANTED</div>
        <div class="text-[#0f0] font-mono text-xl">INITIATING LOCKDOWN SEQUENCE...</div>
      `;
      document.body.appendChild(warning);

      // Play alarm sound
      const alarm = new Audio();
      alarm.src = 'data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQZCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=';
      alarm.play();

      // Start door animation
      setDoorState('opening');
      
      // Complete sequence
      setTimeout(() => {
        document.body.removeChild(overlay);
        document.body.removeChild(warning);
        setDoorState('open');
        setShowContent(true);
      }, 2000);
    } else {
      setError('ACCESS DENIED - INVALID PASSCODE');
      setTimeout(() => setError(''), 2000);
    }
    setPasscode('');
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black text-[#0f0] font-mono">
        <div className="fixed inset-0 bg-grid-pattern opacity-20"></div>
        <div className="fixed inset-0 bg-glitch-pattern opacity-10"></div>

        {/* Navigation */}
        <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-[#0f0]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <PageTransition to="/" className="flex items-center hover:text-[#0f0] transition-colors">
                <Terminal className="w-8 h-8" />
                <span className="ml-2 text-xl font-bold tracking-tight">MOD Automations</span>
              </PageTransition>
            </div>
          </div>
        </nav>

        {/* Passcode Form */}
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <Shield className="mx-auto h-16 w-16 text-[#0f0] mb-4" />
              <GlitchText 
                text="EMERGENCY BUNKER ACCESS"
                className="text-3xl font-bold mb-2"
              />
              <TypewriterText
                text="ENTER PASSCODE TO PROCEED"
                className="text-[#0f0]/60"
                delay={50}
              />
            </div>

            <form onSubmit={handlePasscodeSubmit} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="passcode" className="sr-only">Passcode</label>
                  <input
                    type="password"
                    required
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-4 bg-black/40
                             border border-[#0f0]/20 placeholder-[#0f0]/40 text-[#0f0]
                             rounded-md focus:outline-none focus:ring-[#0f0]/50 focus:border-[#0f0]
                             focus:z-10 sm:text-sm font-mono tracking-widest text-center"
                    placeholder="ENTER PASSCODE"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-center font-bold animate-pulse">
                  {error}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-[#0f0]/20
                           text-sm font-medium rounded-md text-[#0f0] bg-[#0f0]/10
                           hover:bg-[#0f0]/20 focus:outline-none focus:ring-2 focus:ring-offset-2
                           focus:ring-[#0f0]/50 transition-colors"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-[#0f0] group-hover:text-[#0f0]/80" />
                  </span>
                  VERIFY ACCESS
                </button>
              </div>
            </form>

            <div className="flex items-center justify-center text-[#0f0]/40 text-sm">
              <AlertTriangle className="w-4 h-4 mr-2" />
              AUTHORIZED PERSONNEL ONLY
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-[#0f0] font-mono">
      {showContent && (
        <>
          <div className="fixed inset-0 bg-grid-pattern opacity-20"></div>
          <div className="fixed inset-0 bg-glitch-pattern opacity-10"></div>

          {/* Navigation */}
          <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-[#0f0]/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <PageTransition to="/" className="flex items-center hover:text-[#0f0] transition-colors">
                  <Terminal className="w-8 h-8" />
                  <span className="ml-2 text-xl font-bold tracking-tight">MOD Automations</span>
                </PageTransition>
              </div>
            </div>
          </nav>

          {/* Bunker Content */}
          <div className="pt-32 pb-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Warning Message */}
              <div className="text-center mb-12">
                <div className="inline-block">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Radiation className="w-8 h-8 text-red-500 animate-pulse" />
                    <GlitchText 
                      text="DIGITAL APOCALYPSE IMMINENT"
                      className="text-4xl md:text-5xl font-bold text-red-500"
                    />
                    <Radiation className="w-8 h-8 text-red-500 animate-pulse" />
                  </div>
                  <TypewriterText
                    text="SECURE YOUR BUSINESS SURVIVAL WITH COMPREHENSIVE PROTECTION"
                    className="text-xl text-[#0f0]/60 block"
                    delay={50}
                  />
                </div>
              </div>

              {/* Survival Packages */}
              <div className="grid md:grid-cols-3 gap-8">
                {survivalPackages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className={`relative p-6 rounded-lg bg-black/40 border ${
                      pkg.highlight ? 'border-[#0f0]' : 'border-[#0f0]/20'
                    } backdrop-blur-sm group hover:scale-105 transition-all duration-300`}
                  >
                    {pkg.highlight && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#0f0] text-black px-4 py-1 rounded-full text-sm font-bold">
                        {pkg.highlight}
                      </div>
                    )}
                    <div className="absolute -top-3 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                      20% OFF
                    </div>
                    
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                      <div className="text-3xl font-bold mb-1">
                        <span>{pkg.price}</span>
                        <span className="text-base text-[#0f0]/60 line-through ml-2">
                          {pkg.originalPrice}
                        </span>
                      </div>
                      <div className="text-[#0f0]/60 text-sm">per month</div>
                      {pkg.setupFee && (
                        <div className="text-[#0f0]/60 text-sm mt-1">
                          + {pkg.setupFee} setup
                        </div>
                      )}
                    </div>

                    <p className="text-[#0f0]/80 mb-6 text-center">{pkg.description}</p>

                    <div className="space-y-4 mb-6">
                      {pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <Check className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
                          <span className="text-[#0f0]/80">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePackageSelect(pkg)}
                      className={`w-full ${
                        pkg.highlight
                          ? 'bg-[#0f0] text-black hover:bg-[#0f0]/90'
                          : 'bg-[#0f0]/20 text-[#0f0] hover:bg-[#0f0]/30'
                      } px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center`}
                    >
                      Secure Your Survival
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Emergency Warning */}
              <div className="mt-12 text-center text-red-500/80 animate-pulse">
                <TypewriterText
                  text="WARNING: SURVIVAL PROTOCOLS MUST BE INITIALIZED BEFORE SYSTEM COLLAPSE"
                  className="text-lg"
                  delay={50}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Bunker;