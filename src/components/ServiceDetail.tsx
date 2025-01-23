import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTransition from './PageTransition';
import { services } from '../data/services';
import { 
  Terminal, ArrowLeft, ArrowRight, Shield, 
  Mail, MessageSquare, Megaphone, Phone, Globe, HeadsetIcon, 
  Users, Brain, Calendar, PenTool, DollarSign, Check, Zap,
  Target, ChartBar, Rocket, Lock, Cpu
} from 'lucide-react';
import TypewriterText from './TypewriterText';
import GlitchText from './GlitchText';
import CodeRain from './CodeRain';

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => s.id === serviceId);
  const [showCodeRain, setShowCodeRain] = useState(false);
  
  const isSurvivalKit = serviceId === 'full-survival-kit';

  useEffect(() => {
    if (isSurvivalKit) {
      setShowCodeRain(true);
      const timer = setTimeout(() => setShowCodeRain(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSurvivalKit]);

  if (!service) {
    return (
      <div className="min-h-screen bg-black text-[#0f0] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Protocol Not Found</h1>
          <PageTransition to="/services" className="text-[#0f0] hover:text-[#0f0]/80">
            Return to Protocols
          </PageTransition>
        </div>
      </div>
    );
  }

  const handleScheduleCall = () => {
    window.open('https://calendly.com/your-team', '_blank');
  };

  if (isSurvivalKit) {
    const generalFeatures = [
      { icon: Mail, title: 'Automated Email Sequences', description: 'AI-powered email campaigns that nurture and convert leads automatically' },
      { icon: MessageSquare, title: 'Automated Social Media DMs', description: 'Smart conversation management across all major platforms' },
      { icon: Megaphone, title: 'Social Media Advertising', description: 'AI-optimized ad campaigns for maximum ROI' },
      { icon: Phone, title: 'AI Voice Calling', description: 'Natural language processing for seamless customer interactions' },
      { icon: Globe, title: 'Advanced Website Creation', description: 'Custom AI-integrated web solutions that convert' },
      { icon: HeadsetIcon, title: 'Advanced Customer Support', description: '24/7 intelligent support systems that learn and adapt' },
      { icon: Users, title: 'Weekly Team Calls', description: 'Strategic alignment and performance optimization' }
    ];

    const exclusiveFeatures = [
      { icon: Brain, title: '1-on-1 Business Strategy', description: 'Personal guidance from an expert business growth consultant' },
      { icon: PenTool, title: '1-on-1 Content Creation', description: 'Dedicated AI content specialist for your brand' },
      { icon: DollarSign, title: '1-on-1 Paid Advertising', description: 'Expert campaign management and optimization' },
      { icon: Calendar, title: 'Weekly Strategy Calls', description: 'Customized growth planning and execution' }
    ];

    const performanceMetrics = [
      { icon: Target, value: '300%', label: 'Average ROI' },
      { icon: ChartBar, value: '10x', label: 'Lead Generation' },
      { icon: Rocket, value: '5x', label: 'Growth Rate' },
      { icon: Zap, value: '80%', label: 'Time Saved' }
    ];

    return (
      <div className="min-h-screen bg-black text-[#0f0] font-mono">
        {showCodeRain && <CodeRain />}
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

        {/* Hero Section */}
        <section className="min-h-screen flex items-center relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
            <div className="absolute inset-0 bg-[#0f0]/5 animate-scan"></div>
            <div className="absolute inset-0" style={{
              background: `
                repeating-linear-gradient(
                  90deg,
                  rgba(0, 255, 0, 0.03) 0px,
                  rgba(0, 255, 0, 0.03) 1px,
                  transparent 1px,
                  transparent 10px
                ),
                repeating-linear-gradient(
                  0deg,
                  rgba(0, 255, 0, 0.03) 0px,
                  rgba(0, 255, 0, 0.03) 1px,
                  transparent 1px,
                  transparent 10px
                )
              `
            }}></div>
          </div>
          
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <PageTransition
              to="/services"
              className="inline-flex items-center text-[#0f0]/60 hover:text-[#0f0] mb-16"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              BACK TO PROTOCOLS
            </PageTransition>

            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-8">
                <Shield className="w-16 h-16 text-[#0f0] animate-pulse" />
                <GlitchText 
                  text="FULL SURVIVAL KIT"
                  className="text-6xl font-bold"
                />
              </div>
              <TypewriterText
                text="YOUR ULTIMATE AI-POWERED SURVIVAL PLAN FOR BUSINESS DOMINANCE"
                className="text-3xl text-[#0f0]/80 mb-12"
                delay={50}
              />
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleScheduleCall}
                  className="group bg-[#0f0] text-black px-8 py-4 rounded-lg text-xl font-bold
                           hover:bg-[#0f0]/90 transition-colors inline-flex items-center
                           relative overflow-hidden"
                >
                  <span className="relative z-10">Schedule Strategy Call</span>
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#features"
                  className="group bg-black/40 text-[#0f0] px-8 py-4 rounded-lg text-xl font-bold
                           border border-[#0f0]/30 hover:bg-[#0f0]/10 hover:border-[#0f0]
                           transition-all duration-300 inline-flex items-center"
                >
                  Explore Features
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
              {performanceMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={index}
                    className="bg-black/40 border border-[#0f0]/20 rounded-lg p-6 backdrop-blur-sm
                             hover:border-[#0f0] transition-all duration-300 text-center group"
                  >
                    <Icon className="w-8 h-8 text-[#0f0] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-4xl font-bold mb-2">{metric.value}</div>
                    <div className="text-[#0f0]/60">{metric.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Sections */}
        <section id="features" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* General Features */}
            <div className="mb-24">
              <div className="text-center mb-16">
                <Cpu className="w-12 h-12 text-[#0f0] mx-auto mb-4" />
                <h2 className="text-3xl font-bold">GENERAL FEATURES</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#0f0] to-transparent mx-auto mt-4"></div>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {generalFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="group p-6 rounded-lg bg-black/40 border border-[#0f0]/20 backdrop-blur-sm
                               hover:border-[#0f0] transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-[#0f0]/5 animate-scan"></div>
                      <div className="relative z-10">
                        <Icon className="w-8 h-8 text-[#0f0] mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                        <p className="text-[#0f0]/60">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Exclusive Features */}
            <div className="mb-24">
              <div className="text-center mb-16">
                <Lock className="w-12 h-12 text-[#0f0] mx-auto mb-4" />
                <h2 className="text-3xl font-bold">EXCLUSIVE FEATURES</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#0f0] to-transparent mx-auto mt-4"></div>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {exclusiveFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="group p-8 rounded-lg bg-black/40 border border-[#0f0] backdrop-blur-sm
                               hover:bg-[#0f0]/10 transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-[#0f0]/5 animate-scan"></div>
                      <div className="relative z-10 flex items-start">
                        <Icon className="w-12 h-12 text-[#0f0] mr-6 group-hover:scale-110 transition-transform" />
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                          <p className="text-[#0f0]/60 text-lg">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pricing Section */}
            <div className="mb-24">
              <div className="max-w-3xl mx-auto">
                <div className="bg-black/40 border-2 border-[#0f0] rounded-lg p-12 text-center backdrop-blur-sm
                              relative overflow-hidden hover:border-[#0f0]/80 transition-colors group"
                >
                  <div className="absolute inset-0 bg-[#0f0]/5 animate-scan"></div>
                  <div className="relative z-10">
                    <div className="inline-block px-6 py-2 rounded-full bg-[#0f0] text-black text-lg font-bold mb-6">
                      ADVANCE PAYMENT
                    </div>
                    <div className="text-6xl font-bold mb-4">$12,797</div>
                    <p className="text-xl text-[#0f0]/60 mb-8">3-Month Retainer Included</p>
                    <button
                      onClick={handleScheduleCall}
                      className="bg-[#0f0] text-black px-12 py-6 rounded-lg text-xl font-bold
                               hover:bg-[#0f0]/90 transition-colors inline-flex items-center
                               group relative overflow-hidden mb-8"
                    >
                      <span className="relative z-10">Schedule Strategy Call</span>
                      <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-[#0f0]/60">
                      The Full Survival Kit is a personalized service tailored to your business. 
                      Schedule a call with our team to discuss your goals and create your ultimate strategy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#0f0] to-transparent mx-auto mb-8"></div>
              <p className="text-xl text-[#0f0]/80">
                Our clients have seen exponential growth with the Full Survival Kit. 
                Secure your business future today.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Regular service detail page rendering...
  return (
    // ... (rest of the code remains unchanged)
  );
}