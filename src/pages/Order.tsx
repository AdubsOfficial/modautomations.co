import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { services } from '../data/services';
import { Terminal, ArrowLeft, Shield, Target, Lock, Check, Users, Clock, Calendar } from 'lucide-react';
import TypewriterText from '../components/TypewriterText';
import GlitchText from '../components/GlitchText';

export default function Order() {
  const { serviceId, packageName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { originalPrice, setupFee } = location.state || {};
  
  const service = services.find(s => s.id === serviceId);
  const packageDetails = service?.packages.find(p => 
    p.name.toLowerCase().replace(/\s+/g, '-') === packageName?.toLowerCase()
  );

  const [formData, setFormData] = useState({
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

  if (!service || !packageDetails) {
    return (
      <div className="min-h-screen bg-black text-[#0f0] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Package Not Found</h1>
          <PageTransition to="/services" className="text-[#0f0] hover:text-[#0f0]/80">
            Return to Services
          </PageTransition>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Navigate to thank you page with order details
    navigate('/thank-you', {
      state: {
        name: formData.name,
        serviceId,
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
            to={`/services/${serviceId}`}
            className="inline-flex items-center text-[#0f0]/60 hover:text-[#0f0] mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            BACK TO {service.title.toUpperCase()}
          </PageTransition>

          {/* Title */}
          <div className="text-center mb-12">
            <GlitchText 
              text="SYSTEM UPGRADE INITIALIZATION"
              className="text-4xl font-bold mb-4"
            />
            <TypewriterText
              text="TRANSFORM YOUR BUSINESS WITH ENTERPRISE-GRADE AI"
              className="text-xl text-[#0f0]/60"
              delay={50}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="bg-black/40 border border-[#0f0]/20 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-4">Contact Information</h3>
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
                        Phone Number
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
                  <h3 className="text-xl font-bold mb-4">Payment Information</h3>
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
                          CVC
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
                  Schedule Onboarding Call
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0f0] text-black px-6 py-4 rounded-lg font-bold
                           hover:bg-[#0f0]/90 transition-colors flex items-center justify-center
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      Complete Order
                      <Lock className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* ROI Projection */}
                <div className="bg-black/40 border border-[#0f0] rounded-lg p-6 backdrop-blur-sm mb-6">
                  <h3 className="text-xl font-bold mb-4">ROI Projection</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-[#0f0]" />
                      <div>
                        <div className="font-bold">300% Average ROI</div>
                        <div className="text-sm text-[#0f0]/60">Based on client data</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-[#0f0]" />
                      <div>
                        <div className="font-bold">10x Lead Generation</div>
                        <div className="text-sm text-[#0f0]/60">Compared to manual methods</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[#0f0]" />
                      <div>
                        <div className="font-bold">80% Time Saved</div>
                        <div className="text-sm text-[#0f0]/60">Automated workflows</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-black/40 border border-[#0f0]/20 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-4">Investment Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold">{packageDetails.name}</h4>
                        <p className="text-sm text-[#0f0]/60">{service.title}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{originalPrice || packageDetails.price}</div>
                        <div className="text-sm text-[#0f0]/60">
                          ${Math.round(parseInt(packageDetails.price.replace(/\$|,/g, '')) / 30)} per day
                        </div>
                      </div>
                    </div>
                    {setupFee && (
                      <div className="flex justify-between items-center pt-4 border-t border-[#0f0]/20">
                        <div>
                          <span>Setup & Integration</span>
                          <div className="text-sm text-[#0f0]/60">One-time fee</div>
                        </div>
                        <span>{setupFee}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Guarantee Box */}
                <div className="bg-black/40 border border-[#0f0]/20 rounded-lg p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-5 h-5 text-[#0f0]" />
                    <h3 className="text-lg font-bold">Performance Guarantee</h3>
                  </div>
                  <p className="text-sm text-[#0f0]/80 mb-4">
                    We guarantee a minimum 2x ROI within 90 days or receive an additional month of service free.
                  </p>
                  <div className="text-xs text-[#0f0]/60">
                    *Based on proper implementation and usage of the system
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center text-[#0f0]/60 text-sm">
                  <Lock className="w-4 h-4 mr-2" />
                  Enterprise-Grade Security
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}