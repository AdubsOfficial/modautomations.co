import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { Terminal, ArrowLeft, Shield, Lock, Check, Calendar, Radiation } from 'lucide-react';
import TypewriterText from '../components/TypewriterText';
import GlitchText from '../components/GlitchText';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  billingAddress: string;
}

function BunkerOrder() {
  const { packageName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { discountedPrice, originalPrice, setupFee } = location.state || {};

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    billingAddress: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Navigate to bunker thank you page with order details
    navigate('/bunker/thank-you', {
      state: {
        name: formData.name,
        packageName
      }
    });
  };

  const handleScheduleCall = () => {
    window.open('https://calendly.com/your-team', '_blank');
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

      {/* Checkout Form */}
      <div className="pt-32 pb-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <PageTransition
            to="/bunker"
            className="inline-flex items-center text-[#0f0]/60 hover:text-[#0f0] mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            BACK TO BUNKER
          </PageTransition>

          {/* Title */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Radiation className="w-12 h-12 text-red-500 animate-pulse" />
              <GlitchText 
                text="EMERGENCY PROTOCOL ACTIVATION"
                className="text-4xl font-bold"
              />
              <Radiation className="w-12 h-12 text-red-500 animate-pulse" />
            </div>
            <TypewriterText
              text="SECURE YOUR BUSINESS SURVIVAL NOW"
              className="text-xl text-[#0f0]/60"
              delay={50}
            />
          </div>

          {/* Form Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="bg-black/40 border border-[#0f0]/20 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-4">Emergency Contact Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0f0]/60 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg bg-black/40 border border-[#0f0]/20 
                                 text-[#0f0] focus:outline-none focus:border-[#0f0]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0f0]/60 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg bg-black/40 border border-[#0f0]/20 
                                 text-[#0f0] focus:outline-none focus:border-[#0f0]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0f0]/60 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg bg-black/40 border border-[#0f0]/20 
                                 text-[#0f0] focus:outline-none focus:border-[#0f0]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0f0]/60 mb-1">
                        Emergency Contact Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg bg-black/40 border border-[#0f0]/20 
                                 text-[#0f0] focus:outline-none focus:border-[#0f0]"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-black/40 border border-[#0f0]/20 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-4">Secure Payment Protocol</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0f0]/60 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        required
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full p-3 rounded-lg bg-black/40 border border-[#0f0]/20 
                                 text-[#0f0] focus:outline-none focus:border-[#0f0]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#0f0]/60 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiry"
                          required
                          value={formData.expiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="w-full p-3 rounded-lg bg-black/40 border border-[#0f0]/20 
                                   text-[#0f0] focus:outline-none focus:border-[#0f0]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#0f0]/60 mb-1">
                          Security Code
                        </label>
                        <input
                          type="text"
                          name="cvc"
                          required
                          value={formData.cvc}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="w-full p-3 rounded-lg bg-black/40 border border-[#0f0]/20 
                                   text-[#0f0] focus:outline-none focus:border-[#0f0]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0f0]/60 mb-1">
                        Billing Address
                      </label>
                      <input
                        type="text"
                        name="billingAddress"
                        required
                        value={formData.billingAddress}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg bg-black/40 border border-[#0f0]/20 
                                 text-[#0f0] focus:outline-none focus:border-[#0f0]"
                      />
                    </div>
                  </div>
                </div>

                {/* Schedule Call Button */}
                <button
                  type="button"
                  onClick={handleScheduleCall}
                  className="w-full bg-black/40 text-[#0f0] px-6 py-4 rounded-lg font-bold
                           border border-[#0f0]/20 hover:bg-[#0f0]/10 hover:border-[#0f0]
                           transition-all duration-300 flex items-center justify-center mb-4"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Emergency Briefing
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-500 text-white px-6 py-4 rounded-lg font-bold
                           hover:bg-red-600 transition-colors flex items-center justify-center
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>ACTIVATING PROTOCOLS...</>
                  ) : (
                    <>
                      ACTIVATE EMERGENCY PROTOCOLS
                      <Lock className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Summary Section */}
            <div className="md:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Package Summary */}
                <div className="bg-black/40 border border-red-500 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-4">Emergency Protocol</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold">{packageName}</h4>
                        <p className="text-sm text-[#0f0]/60">Survival Package</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{discountedPrice}</div>
                        <div className="text-sm text-[#0f0]/60 line-through">
                          {originalPrice}
                        </div>
                      </div>
                    </div>
                    {setupFee && (
                      <div className="flex justify-between items-center pt-4 border-t border-[#0f0]/20">
                        <span>Emergency Setup</span>
                        <span>{setupFee}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Security Features */}
                <div className="bg-black/40 border border-[#0f0]/20 rounded-lg p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-5 h-5 text-[#0f0]" />
                    <h3 className="text-lg font-bold">Security Measures</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      'Advanced AI Monitoring',
                      'Automated Defense Systems',
                      'Emergency Response Team',
                      'Secure Communication Channels'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#0f0]" />
                        <span className="text-sm text-[#0f0]/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center text-[#0f0]/60 text-sm">
                  <Lock className="w-4 h-4 mr-2" />
                  Military-Grade Encryption
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BunkerOrder;