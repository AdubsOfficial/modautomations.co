import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SolutionFunnel from '../components/SolutionFunnel';
import { Terminal, ArrowRight, Radiation } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import TypewriterText from '../components/TypewriterText';
import GlitchText from '../components/GlitchText';
import TestimonialCard from '../components/TestimonialCard';

export default function LandingPage() {
  const [showFunnel, setShowFunnel] = useState(false);
  const navigate = useNavigate();

  const heroRef = useIntersectionObserver<HTMLDivElement>();
  const testimonialsRef = useIntersectionObserver<HTMLDivElement>();
  const ctaRef = useIntersectionObserver<HTMLDivElement>();

  const testimonials = [
    {
      name: "Mike Anderson",
      role: "Marketing Director",
      company: "Nexus Tech",
      content: "The lead generation system has been solid. We're getting about 40% more qualified leads per month, and the AI helps us respond faster. Setup took a couple weeks but the team was there to help when we needed it.",
      rating: 5
    },
    {
      name: "Sarah Thompson",
      role: "Sales Manager",
      company: "Bright Solutions",
      content: "Been using MOD's system for 8 months now. Our sales team saves around 15 hours a week on prospecting, and lead quality has definitely improved. The AI actually learns from our feedback, which is pretty impressive.",
      rating: 5
    },
    {
      name: "James Liu",
      role: "Operations Lead",
      company: "DataCore Systems",
      content: "What stood out was how well it integrated with our existing CRM. The automation handles about 70% of our routine tasks now. Support team is responsive - usually get answers within a few hours when we need help.",
      rating: 5
    }
  ];

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
              <PageTransition to="/services" className="hover:text-[#0f0] transition-colors tracking-wide">
                PROTOCOLS
              </PageTransition>
              <PageTransition to="/blog" className="hover:text-[#0f0] transition-colors tracking-wide">
                INTEL
              </PageTransition>
              <button 
                onClick={() => setShowFunnel(true)}
                className="bg-[#0f0]/10 text-[#0f0] px-6 py-2 rounded-md border border-[#0f0]/20 hover:bg-[#0f0]/20 transition-all duration-300"
              >
                INITIALIZE
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden reveal-section"
      >
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <GlitchText 
            text="WELCOME TO THE FUTURE"
            className="text-5xl md:text-7xl font-bold mb-6"
          />
          <TypewriterText
            text="WHERE EFFICIENCY IS THE MOST POWERFUL WEAPON"
            className="text-xl md:text-2xl text-[#0f0]/60 mb-12 block"
            delay={50}
          />
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => setShowFunnel(true)}
              className="group bg-[#0f0]/20 text-[#0f0] px-8 py-4 rounded-md text-lg font-mono
                       border border-[#0f0]/30 hover:bg-[#0f0]/10 hover:border-[#0f0]
                       transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">INITIALIZE SYSTEM</span>
              <div className="absolute inset-0 bg-[#0f0]/5 animate-scan"></div>
            </button>
            <PageTransition 
              to="/services" 
              className="group bg-black/50 text-[#0f0] px-8 py-4 rounded-md text-lg font-mono
                        border border-[#0f0]/20 hover:border-[#0f0]/40 transition-all duration-300"
            >
              VIEW PROTOCOLS
              <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
            </PageTransition>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <section 
        ref={testimonialsRef}
        className="py-20 relative reveal-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <GlitchText 
              text="MISSION REPORTS"
              className="text-4xl font-bold mb-4"
            />
            <TypewriterText
              text="CLASSIFIED FEEDBACK FROM OUR OPERATIVES"
              className="text-xl text-[#0f0]/60"
              delay={50}
            />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                {...testimonial}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Additional CTA Section */}
      <section 
        ref={ctaRef}
        className="py-20 relative reveal-section"
      >
        <div className="absolute inset-0 bg-[#0f0]/5"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <GlitchText 
            text="READY TO INITIALIZE?" 
            className="text-4xl font-bold mb-6"
          />
          <p className="text-xl text-[#0f0]/60 mb-8">
            <TypewriterText 
              text="SELECT YOUR PROTOCOL AND BEGIN THE TRANSFORMATION" 
              delay={50}
            />
          </p>
          <button
            onClick={() => setShowFunnel(true)}
            className="bg-[#0f0]/20 text-[#0f0] px-12 py-4 rounded-md text-lg font-mono
                     border border-[#0f0]/30 hover:bg-[#0f0]/10 hover:border-[#0f0]
                     transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10">INITIALIZE SYSTEM</span>
            <div className="absolute inset-0 bg-[#0f0]/5 animate-scan"></div>
          </button>
        </div>
      </section>

      {/* Hidden Bunker Access */}
      <div className="relative py-8 border-t border-[#0f0]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4">
            <PageTransition 
              to="/bunker" 
              className="group opacity-20 hover:opacity-100 transition-opacity duration-500
                        bg-red-500/20 text-red-500 px-6 py-3 rounded-md text-sm font-mono
                        border border-red-500/30 hover:bg-red-500/30 hover:border-red-500
                        flex items-center justify-center gap-2"
            >
              <Radiation className="w-4 h-4" />
              EMERGENCY BUNKER ACCESS
              <Radiation className="w-4 h-4" />
            </PageTransition>
            <p className="text-[#0f0]/40 text-sm font-mono">
              Looking for the key to survival? Ask our assistant—it knows the way.
            </p>
          </div>
        </div>
      </div>

      {/* Solution Funnel Modal */}
      {showFunnel && <SolutionFunnel onClose={() => setShowFunnel(false)} />}
    </div>
  );
}