import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SolutionFunnel from '../components/SolutionFunnel';
import { services } from '../data/services';
import { Terminal, ArrowRight, Brain, Zap, Globe, MessageSquare } from 'lucide-react';
import TypewriterText from '../components/TypewriterText';
import GlitchText from '../components/GlitchText';
import HoloCard from '../components/HoloCard';
import ServiceDemo from '../components/ServiceDemo';

export default function Services() {
  const [showFunnel, setShowFunnel] = useState(false);
  const [showDemos, setShowDemos] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const navigate = useNavigate();

  // Separate regular services from custom services
  const regularServices = services.filter(service => !service.isCustomService);
  const customServices = services.filter(service => service.isCustomService);

  const demos = [
    {
      id: 'lead-generation',
      title: 'Lead Generation AI',
      description: 'Experience our advanced AI lead generation system in action.',
      icon: Brain,
      color: '#00ff9d'
    },
    {
      id: 'website-creation',
      title: 'Website Creator AI',
      description: 'Watch AI build a complete website from a simple text prompt.',
      icon: Globe,
      color: '#00A3FF'
    },
    {
      id: 'customer-support',
      title: 'Support AI',
      description: 'Interact with our intelligent customer support system.',
      icon: MessageSquare,
      color: '#ff00ff'
    }
  ];

  const handleDemoSelect = (demoId: string) => {
    setSelectedDemo(demoId);
  };

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
            <div className="hidden md:flex items-center space-x-8">
              <PageTransition to="/" className="hover:text-[#0f0] transition-colors tracking-wide">
                HOME
              </PageTransition>
              <PageTransition to="/blog" className="hover:text-[#0f0] transition-colors tracking-wide">
                INTEL
              </PageTransition>
              <button 
                onClick={() => setShowDemos(true)}
                className="bg-[#0f0]/10 text-[#0f0] px-6 py-2 rounded-md border border-[#0f0]/20 
                         hover:bg-[#0f0]/20 transition-all duration-300 flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                DEMOS
              </button>
              <button 
                onClick={() => setShowFunnel(true)}
                className="bg-[#0f0]/10 text-[#0f0] px-6 py-2 rounded-md border border-[#0f0]/20 
                         hover:bg-[#0f0]/20 transition-all duration-300"
              >
                INITIALIZE
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Empty space for timer */}
      <div className="pt-32 pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-48"></div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#0f0]/20 to-transparent mb-24"></div>

      {/* Services Section */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-24">
            <div className="inline-block p-6 bg-black/40 border border-[#0f0]/20 rounded-lg backdrop-blur-sm">
              <GlitchText 
                text="OPERATIONAL PROTOCOLS" 
                className="text-4xl md:text-5xl font-bold mb-6"
              />
              <TypewriterText
                text="SELECT YOUR MISSION PARAMETERS"
                className="text-xl text-[#0f0]/60 block"
                delay={50}
              />
            </div>
          </div>

          {/* Regular Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {regularServices.map((service) => {
              const Icon = service.icon;
              return (
                <PageTransition
                  key={service.id}
                  to={`/services/${service.id}`}
                  className="block"
                >
                  <HoloCard
                    icon={<Icon className="w-8 h-8" />}
                    title={service.title.toUpperCase()}
                    description={service.description}
                  />
                </PageTransition>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#0f0]/20 to-transparent my-16"></div>

          {/* Custom Services (Full Survival Kit) */}
          {customServices.map((service) => {
            const Icon = service.icon;
            return (
              <PageTransition
                key={service.id}
                to={`/services/${service.id}`}
                className="block w-full"
              >
                <div className="group p-8 rounded-lg bg-black/40 border-2 border-[#0f0] backdrop-blur-sm
                             hover:bg-[#0f0]/10 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#0f0]/5 animate-scan"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <Icon className="w-12 h-12 text-[#0f0]" />
                      <div>
                        <h3 className="text-2xl font-bold">{service.title.toUpperCase()}</h3>
                        <p className="text-[#0f0]/60">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <span className="inline-flex items-center text-[#0f0] group-hover:translate-x-2 transition-transform">
                        LEARN MORE <ArrowRight className="w-5 h-5 ml-2" />
                      </span>
                    </div>
                  </div>
                </div>
              </PageTransition>
            );
          })}
        </div>
      </section>

      {/* Demos Modal */}
      {showDemos && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-black border border-[#0f0]/20 rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-12">
                <GlitchText 
                  text="INTERACTIVE DEMOS"
                  className="text-3xl font-bold mb-4"
                />
                <TypewriterText
                  text="EXPERIENCE OUR AI SYSTEMS IN ACTION"
                  className="text-lg text-[#0f0]/60"
                  delay={50}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {demos.map((demo) => {
                  const Icon = demo.icon;
                  return (
                    <button
                      key={demo.id}
                      onClick={() => handleDemoSelect(demo.id)}
                      className="p-6 rounded-lg bg-black/40 border border-[#0f0]/20 hover:border-[#0f0]
                               text-left transition-all duration-300 group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-[#0f0]/5 group-hover:animate-scan"></div>
                      <div className="relative z-10">
                        <Icon className="w-8 h-8 mb-4" style={{ color: demo.color }} />
                        <h3 className="text-lg font-bold mb-2">{demo.title}</h3>
                        <p className="text-sm text-[#0f0]/60">{demo.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setShowDemos(false)}
                className="mt-8 w-full p-3 rounded-lg bg-[#0f0]/10 text-[#0f0] border border-[#0f0]/20
                         hover:bg-[#0f0]/20 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selected Demo */}
      {selectedDemo && (
        <ServiceDemo 
          serviceId={selectedDemo} 
          onClose={() => {
            setSelectedDemo(null);
            setShowDemos(false);
          }} 
        />
      )}

      {/* Solution Funnel Modal */}
      {showFunnel && <SolutionFunnel onClose={() => setShowFunnel(false)} />}
    </div>
  );
}