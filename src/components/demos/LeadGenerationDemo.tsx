import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Users, Target, ChevronRight, Check, ArrowRight, Brain, Zap, Shield,
  Building, MapPin, Search, Download, Loader2, Filter, User, Mail, Phone,
  BarChart, Star, Clock, AlertCircle, Rocket, Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TypewriterText from '../TypewriterText';
import GlitchText from '../GlitchText';

interface LeadGenerationDemoProps {
  onClose: () => void;
}

interface Lead {
  name: string;
  title: string;
  company: string;
  location: string;
  email: string;
  phone: string;
  score: number;
  lastActivity: string;
  interests: string[];
}

export default function LeadGenerationDemo({ onClose }: LeadGenerationDemoProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    industry: '',
    location: '',
    companySize: '',
    title: ''
  });
  const [generatedLeads, setGeneratedLeads] = useState<Lead[]>([]);

  const handleGenerateLeads = async () => {
    if (!filters.industry || loading) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate sample leads
    const leads: Lead[] = Array.from({ length: 5 }, (_, i) => ({
      name: `John Doe ${i + 1}`,
      title: 'CTO',
      company: `Tech Corp ${i + 1}`,
      location: filters.location || 'San Francisco, CA',
      email: `john.doe${i + 1}@techcorp.com`,
      phone: `+1 (555) 000-${String(i + 1).padStart(4, '0')}`,
      score: 85 + Math.floor(Math.random() * 15),
      lastActivity: '2 days ago',
      interests: ['AI', 'Automation', 'Cloud Computing']
    }));
    
    setGeneratedLeads(leads);
    setLoading(false);
    setStep(2);
  };

  const handleUnlock = () => {
    onClose();
    navigate('/services/lead-generation');
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-black border border-[#0f0]/20 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#0f0]/20">
          <div>
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-[#0f0]" />
              <div>
                <h2 className="text-2xl font-bold text-[#0f0]">AI Lead Generation Demo</h2>
                <p className="text-[#0f0]/60 text-sm">Step {step}: {step === 1 ? 'Initial Lead Discovery' : 'Lead Analysis'}</p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#0f0]/60 hover:text-[#0f0] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <GlitchText 
                    text="AI LEAD DISCOVERY"
                    className="text-3xl font-bold mb-4"
                  />
                  <TypewriterText
                    text="Define your target audience and let AI find your ideal prospects"
                    className="text-lg text-[#0f0]/60"
                    delay={50}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0f0]/60 mb-2">
                        Industry
                      </label>
                      <input
                        type="text"
                        value={filters.industry}
                        onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
                        placeholder="e.g., Technology, Healthcare, Finance"
                        className="w-full p-3 rounded-lg bg-black/40 border border-[#0f0]/20 
                                 text-[#0f0] focus:outline-none focus:border-[#0f0]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0f0]/60 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={filters.location}
                        onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="e.g., San Francisco, CA"
                        className="w-full p-3 rounded-lg bg-black/40 border border-[#0f0]/20 
                                 text-[#0f0] focus:outline-none focus:border-[#0f0]"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0f0]/60 mb-2">
                        Company Size
                      </label>
                      <input
                        type="text"
                        value={filters.companySize}
                        onChange={(e) => setFilters(prev => ({ ...prev, companySize: e.target.value }))}
                        placeholder="e.g., 50-200 employees"
                        className="w-full p-3 rounded-lg bg-black/40 border border-[#0f0]/20 
                                 text-[#0f0] focus:outline-none focus:border-[#0f0]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0f0]/60 mb-2">
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={filters.title}
                        onChange={(e) => setFilters(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g., CTO, VP Engineering"
                        className="w-full p-3 rounded-lg bg-black/40 border border-[#0f0]/20 
                                 text-[#0f0] focus:outline-none focus:border-[#0f0]"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleGenerateLeads}
                  disabled={loading || !filters.industry}
                  className="w-full bg-[#0f0] text-black px-6 py-3 rounded-lg font-medium 
                           hover:bg-[#0f0]/90 transition-colors flex items-center justify-center
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating Leads...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      Generate Leads
                    </>
                  )}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <GlitchText 
                    text="LEADS GENERATED SUCCESSFULLY"
                    className="text-3xl font-bold mb-4"
                  />
                  <TypewriterText
                    text="This is just a sample of what our AI can do. Ready to unlock full potential?"
                    className="text-lg text-[#0f0]/60"
                    delay={50}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Generated Leads */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Generated Leads ({generatedLeads.length})
                    </h3>
                    <div className="space-y-4">
                      {generatedLeads.map((lead, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-lg bg-black/40 border border-[#0f0]/20"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-bold">{lead.name}</h4>
                              <p className="text-sm text-[#0f0]/60">{lead.title} at {lead.company}</p>
                            </div>
                            <span className="text-sm text-[#0f0]/60">{lead.location}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-[#0f0]/80">
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4" />
                              {lead.score}% Match
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {lead.lastActivity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Section */}
                  <div>
                    <div className="sticky top-6 space-y-6">
                      <div className="p-6 rounded-lg bg-black/40 border border-[#0f0]/20">
                        <h3 className="text-xl font-bold mb-4">Ready to Find More Leads?</h3>
                        <div className="space-y-4 mb-6">
                          <p className="text-sm text-[#0f0]/80">
                            Unlock our full lead generation capabilities:
                          </p>
                          <ul className="space-y-2 text-sm text-[#0f0]/60">
                            <li className="flex items-start">
                              <AlertCircle className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                              Advanced AI lead scoring and qualification
                            </li>
                            <li className="flex items-start">
                              <AlertCircle className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                              Automated email and social media outreach
                            </li>
                            <li className="flex items-start">
                              <AlertCircle className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                              Real-time lead activity tracking
                            </li>
                            <li className="flex items-start">
                              <AlertCircle className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                              CRM integration and analytics
                            </li>
                          </ul>
                        </div>
                        <button
                          onClick={handleUnlock}
                          className="w-full bg-[#0f0]/20 text-[#0f0] px-6 py-3 rounded-lg font-medium
                                   hover:bg-[#0f0]/30 transition-colors flex items-center justify-center"
                        >
                          <Rocket className="w-5 h-5 mr-2" />
                          Unlock Full Potential
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                      </div>

                      <div className="flex items-center justify-center text-[#0f0]/60 text-sm">
                        <Lock className="w-4 h-4 mr-2" />
                        Enterprise-Grade Security
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}