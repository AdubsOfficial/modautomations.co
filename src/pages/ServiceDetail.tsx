import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import ServiceDemo from '../components/ServiceDemo';
import { services } from '../data/services';
import { Terminal, ArrowLeft, Check, Play, ArrowRight } from 'lucide-react';
import TypewriterText from '../components/TypewriterText';
import GlitchText from '../components/GlitchText';

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [showDemo, setShowDemo] = useState(false);
  const service = services.find(s => s.id === serviceId);

  useEffect(() => {
    if (serviceId === 'full-survival-kit') {
      navigate('/services/full-survival-kit');
    }
  }, [serviceId, navigate]);

  if (!service) {
    return (
      <div className="min-h-screen bg-black text-[#0f0] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <PageTransition to="/services" className="text-[#0f0] hover:text-[#0f0]/80">
            Return to Services
          </PageTransition>
        </div>
      </div>
    );
  }

  const handlePackageSelect = (pkg: any) => {
    // Convert package name to URL-friendly format
    const packageSlug = pkg.name.toLowerCase().replace(/\s+/g, '-');
    
    // Navigate to checkout with package information
    navigate(`/services/${serviceId}/order/${packageSlug}`, {
      state: {
        originalPrice: pkg.price,
        setupFee: pkg.setupFee
      }
    });
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
          </div>
        </div>
      </nav>

      {/* Service Details */}
      <div className="pt-32 pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <PageTransition
            to="/services"
            className="inline-flex items-center text-[#0f0]/60 hover:text-[#0f0] mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            BACK TO PROTOCOLS
          </PageTransition>

          {/* Title */}
          <div className="text-center mb-12">
            <GlitchText 
              text={service.title.toUpperCase()}
              className="text-4xl md:text-5xl font-bold mb-4"
            />
            <TypewriterText
              text={service.description}
              className="text-xl text-[#0f0]/60"
              delay={50}
            />
          </div>

          {/* Demo Button */}
          <div className="text-center mb-12">
            <button
              onClick={() => setShowDemo(true)}
              className="inline-flex items-center bg-[#0f0]/20 text-[#0f0] px-6 py-3 rounded-lg
                       border border-[#0f0]/30 hover:bg-[#0f0]/10 hover:border-[#0f0]
                       transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              TRY INTERACTIVE DEMO
            </button>
          </div>

          {/* Packages Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {service.packages.map((pkg) => (
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
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold mb-1">{pkg.price}</div>
                  <div className="text-[#0f0]/60 text-sm">per {pkg.billingPeriod}</div>
                  {pkg.setupFee && (
                    <div className="text-[#0f0]/60 text-sm mt-1">
                      + {pkg.setupFee} setup fee
                    </div>
                  )}
                </div>
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
                  Select Package
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      {showDemo && serviceId && (
        <ServiceDemo serviceId={serviceId} onClose={() => setShowDemo(false)} />
      )}
    </div>
  );
}