import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, ChevronRight, Check, ArrowRight } from 'lucide-react';
import { services } from '../data/services';

interface FunnelStep {
  title: string;
  subtitle: string;
}

const steps: FunnelStep[] = [
  {
    title: "What do you need help with?",
    subtitle: "Select your primary business need"
  },
  {
    title: "Tell us more about your goals",
    subtitle: "Select all that apply"
  },
  {
    title: "What's your budget and timeline?",
    subtitle: "Help us understand your requirements"
  },
  {
    title: "Let's Get Started!",
    subtitle: "Enter your details to receive your personalized solution"
  }
];

interface SolutionFunnelProps {
  onClose: () => void;
}

export default function SolutionFunnel({ onClose }: SolutionFunnelProps) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    primaryNeed: '',
    goals: [] as string[],
    budget: '',
    timeline: '',
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  const serviceGoals = [
    "Increase Sales",
    "Improve Customer Service",
    "Reduce Operational Costs",
    "Scale Business Operations",
    "Enhance Online Presence",
    "Automate Workflows",
    "Generate Quality Leads",
    "Optimize Marketing ROI"
  ];

  const budgetRanges = [
    "Under $1,000/month",
    "$1,000 - $2,500/month",
    "$2,500 - $5,000/month",
    "$5,000+/month"
  ];

  const timelineOptions = [
    "Immediate (within 1 week)",
    "Short-term (1-4 weeks)",
    "Medium-term (1-3 months)",
    "Long-term (3+ months)"
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Submit form
      navigate('/thank-you', { state: { name: formData.name } });
      onClose();
    }
  };

  const handleServiceSelect = (serviceId: string) => {
    setFormData(prev => ({ ...prev, primaryNeed: serviceId }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {services.filter(service => !service.isCustomService).map((service) => {
                const Icon = service.icon;
                const isSelected = formData.primaryNeed === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className={`p-6 rounded-lg text-left transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#0f0] text-black'
                        : 'bg-[#0f0]/10 text-[#0f0] hover:bg-[#0f0]/20'
                    } relative overflow-hidden group`}
                  >
                    <div className="absolute inset-0 bg-[#0f0]/5 group-hover:animate-scan"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <Icon className={`w-8 h-8 ${isSelected ? 'text-black' : 'text-[#0f0]'}`} />
                        <div className={`w-5 h-5 rounded-md border ${
                          isSelected
                            ? 'bg-black border-black'
                            : 'border-[#0f0]'
                        } flex items-center justify-center ml-auto`}>
                          {isSelected && <Check className={`w-4 h-4 ${isSelected ? 'text-[#0f0]' : 'text-black'}`} />}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                      <p className={`text-sm ${isSelected ? 'text-black/80' : 'text-[#0f0]/60'}`}>
                        {service.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Full Survival Kit */}
            {services.filter(service => service.isCustomService).map((service) => {
              const Icon = service.icon;
              const isSelected = formData.primaryNeed === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service.id)}
                  className={`w-full p-6 rounded-lg text-left transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#0f0] text-black'
                      : 'bg-[#0f0]/10 text-[#0f0] hover:bg-[#0f0]/20'
                  } relative overflow-hidden group border-2 ${
                    isSelected ? 'border-black' : 'border-[#0f0]'
                  }`}
                >
                  <div className="absolute inset-0 bg-[#0f0]/5 group-hover:animate-scan"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <Icon className={`w-10 h-10 ${isSelected ? 'text-black' : 'text-[#0f0]'}`} />
                      <div className={`w-5 h-5 rounded-md border ${
                        isSelected
                          ? 'bg-black border-black'
                          : 'border-[#0f0]'
                      } flex items-center justify-center ml-auto`}>
                        {isSelected && <Check className={`w-4 h-4 ${isSelected ? 'text-[#0f0]' : 'text-black'}`} />}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className={`text-sm ${isSelected ? 'text-black/80' : 'text-[#0f0]/60'}`}>
                      {service.description}
                    </p>
                  </div>
                </button>
              );
            })}

            <button
              onClick={handleNext}
              disabled={!formData.primaryNeed}
              className="w-full bg-[#0f0] text-black px-6 py-3 rounded-lg font-medium 
                       hover:bg-[#0f0]/90 transition-all duration-300 disabled:opacity-50 
                       disabled:cursor-not-allowed mt-4"
            >
              Continue
              <ChevronRight className="inline ml-2" />
            </button>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {serviceGoals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      goals: prev.goals.includes(goal)
                        ? prev.goals.filter(g => g !== goal)
                        : [...prev.goals, goal]
                    }));
                  }}
                  className={`p-4 rounded-lg text-left transition-all duration-300 ${
                    formData.goals.includes(goal)
                      ? 'bg-[#0f0] text-black'
                      : 'bg-[#0f0]/10 text-[#0f0] hover:bg-[#0f0]/20'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-md border ${
                      formData.goals.includes(goal)
                        ? 'bg-black border-black'
                        : 'border-[#0f0]'
                    } mr-3 flex items-center justify-center`}>
                      {formData.goals.includes(goal) && <Check className="w-4 h-4 text-[#0f0]" />}
                    </div>
                    {goal}
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={formData.goals.length === 0}
              className="w-full bg-[#0f0] text-black px-6 py-3 rounded-lg font-medium 
                       hover:bg-[#0f0]/90 transition-all duration-300 disabled:opacity-50 
                       disabled:cursor-not-allowed"
            >
              Continue
              <ChevronRight className="inline ml-2" />
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-[#0f0]/60">Budget Range</label>
              <div className="grid grid-cols-2 gap-4">
                {budgetRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setFormData(prev => ({ ...prev, budget: range }))}
                    className={`p-4 rounded-lg text-left transition-all duration-300 ${
                      formData.budget === range
                        ? 'bg-[#0f0] text-black'
                        : 'bg-[#0f0]/10 text-[#0f0] hover:bg-[#0f0]/20'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-[#0f0]/60">Timeline</label>
              <div className="grid grid-cols-2 gap-4">
                {timelineOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setFormData(prev => ({ ...prev, timeline: option }))}
                    className={`p-4 rounded-lg text-left transition-all duration-300 ${
                      formData.timeline === option
                        ? 'bg-[#0f0] text-black'
                        : 'bg-[#0f0]/10 text-[#0f0] hover:bg-[#0f0]/20'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleNext}
              disabled={!formData.budget || !formData.timeline}
              className="w-full bg-[#0f0] text-black px-6 py-3 rounded-lg font-medium 
                       hover:bg-[#0f0]/90 transition-all duration-300 disabled:opacity-50 
                       disabled:cursor-not-allowed"
            >
              Continue
              <ChevronRight className="inline ml-2" />
            </button>
          </div>
        );

      case 3:
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-[#0f0]/60 mb-1">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 rounded-lg bg-[#0f0]/10 border border-[#0f0]/20 
                         text-[#0f0] focus:outline-none focus:border-[#0f0]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0f0]/60 mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-3 rounded-lg bg-[#0f0]/10 border border-[#0f0]/20 
                         text-[#0f0] focus:outline-none focus:border-[#0f0]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0f0]/60 mb-1">Phone</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full p-3 rounded-lg bg-[#0f0]/10 border border-[#0f0]/20 
                         text-[#0f0] focus:outline-none focus:border-[#0f0]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0f0]/60 mb-1">Company Name</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="w-full p-3 rounded-lg bg-[#0f0]/10 border border-[#0f0]/20 
                         text-[#0f0] focus:outline-none focus:border-[#0f0]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#0f0] text-black px-6 py-3 rounded-lg font-medium 
                       hover:bg-[#0f0]/90 transition-all duration-300"
            >
              Get Your Solution
              <ChevronRight className="inline ml-2" />
            </button>
          </form>
        );
    }
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
            <h2 className="text-2xl font-bold text-[#0f0]">{steps[currentStep].title}</h2>
            <p className="text-[#0f0]/60 text-sm mt-1">{steps[currentStep].subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#0f0]/60 hover:text-[#0f0] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-[#0f0]/10">
          <div
            className="h-full bg-[#0f0] transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderStepContent()}
        </div>
      </motion.div>
    </div>
  );
}