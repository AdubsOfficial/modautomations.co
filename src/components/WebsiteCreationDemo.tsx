import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Zap, Globe, Target, Shield, Building, Users, Award, Heart, Book, ChefHat, ShoppingBag, GraduationCap, DollarSign } from 'lucide-react';
import TypewriterText from './TypewriterText';
import GlitchText from './GlitchText';

interface WebsiteContent {
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    font: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    image: string;
  };
  features: Array<{
    title: string;
    description: string;
    icon: any;
  }>;
  services: Array<{
    title: string;
    description: string;
    price: string;
    image: string;
  }>;
  about: {
    title: string;
    description: string;
    mission: string;
    values: string[];
    image: string;
  };
  contact: {
    title: string;
    description: string;
    fields: Array<{
      label: string;
      type: string;
      placeholder: string;
    }>;
  };
}

interface WebsiteCreationDemoProps {
  onClose: () => void;
}

export default function WebsiteCreationDemo({ onClose }: WebsiteCreationDemoProps) {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState<WebsiteContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate generation time
    const content = generateContent(prompt);
    setGeneratedContent(content);
    setIsGenerating(false);
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
            <h2 className="text-2xl font-bold text-[#0f0]">Website Creation Demo</h2>
            <p className="text-[#0f0]/60 text-sm mt-1">Experience AI-powered website generation</p>
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
          {/* Input Section */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-[#0f0]/60 mb-2">
              Describe your website
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A modern fitness website with online class booking"
                className="flex-1 p-3 rounded-lg bg-black/40 border border-[#0f0]/20 
                         text-[#0f0] focus:outline-none focus:border-[#0f0]"
              />
              <button
                onClick={handleGenerate}
                disabled={!prompt || isGenerating}
                className="bg-[#0f0]/20 text-[#0f0] px-6 py-3 rounded-lg font-medium
                         hover:bg-[#0f0]/30 transition-colors disabled:opacity-50
                         disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isGenerating ? 'Generating...' : 'Generate Website'}
              </button>
            </div>
          </div>

          {/* Preview Section */}
          {generatedContent && (
            <div className="space-y-8">
              {/* Navigation Tabs */}
              <div className="flex gap-4 border-b border-[#0f0]/20">
                {['home', 'about', 'services', 'contact'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 font-medium transition-colors ${
                      activeTab === tab
                        ? 'text-[#0f0] border-b-2 border-[#0f0]'
                        : 'text-[#0f0]/60 hover:text-[#0f0]'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Preview Content */}
              <div 
                className="rounded-lg overflow-hidden transition-all duration-500"
                style={{
                  background: generatedContent.theme.background,
                  fontFamily: generatedContent.theme.font
                }}
              >
                {/* Home Page */}
                {activeTab === 'home' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-12"
                  >
                    {/* Hero Section */}
                    <section className="relative h-[400px] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
                      <img
                        src={generatedContent.hero.image}
                        alt="Hero"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="relative z-20 h-full flex items-center px-12">
                        <div className="max-w-2xl">
                          <GlitchText 
                            text={generatedContent.hero.headline}
                            className="text-4xl md:text-5xl font-bold mb-4"
                          />
                          <TypewriterText
                            text={generatedContent.hero.subheadline}
                            className="text-xl text-white/80"
                            delay={50}
                          />
                        </div>
                      </div>
                    </section>

                    {/* Features Grid */}
                    <section className="px-12 py-16">
                      <div className="grid md:grid-cols-3 gap-8">
                        {generatedContent.features.map((feature, index) => {
                          const Icon = feature.icon;
                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="p-6 rounded-lg"
                              style={{
                                background: `${generatedContent.theme.primary}20`,
                                borderColor: generatedContent.theme.primary,
                                borderWidth: 1
                              }}
                            >
                              <Icon 
                                className="w-8 h-8 mb-4"
                                style={{ color: generatedContent.theme.accent }}
                              />
                              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                              <p style={{ color: `${generatedContent.theme.primary}99` }}>
                                {feature.description}
                              </p>
                            </motion.div>
                          );
                        })}
                      </div>
                    </section>
                  </motion.div>
                )}

                {/* About Page */}
                {activeTab === 'about' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-12 space-y-12"
                  >
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div>
                        <h2 className="text-3xl font-bold mb-6">{generatedContent.about.title}</h2>
                        <p className="mb-6" style={{ color: `${generatedContent.theme.primary}99` }}>
                          {generatedContent.about.description}
                        </p>
                        <div className="p-6 rounded-lg" style={{ background: `${generatedContent.theme.primary}10` }}>
                          <h3 className="font-bold mb-2">Our Mission</h3>
                          <p style={{ color: `${generatedContent.theme.primary}99` }}>
                            {generatedContent.about.mission}
                          </p>
                        </div>
                      </div>
                      <div>
                        <img
                          src={generatedContent.about.image}
                          alt="About"
                          className="rounded-lg shadow-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-6">Our Values</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {generatedContent.about.values.map((value, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 rounded-lg text-center"
                            style={{
                              background: `${generatedContent.theme.primary}10`,
                              color: generatedContent.theme.primary
                            }}
                          >
                            {value}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Services Page */}
                {activeTab === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-12"
                  >
                    <div className="grid md:grid-cols-3 gap-8">
                      {generatedContent.services.map((service, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="rounded-lg overflow-hidden"
                          style={{
                            background: `${generatedContent.theme.primary}10`,
                            borderColor: generatedContent.theme.primary,
                            borderWidth: 1
                          }}
                        >
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                            <p 
                              className="mb-4"
                              style={{ color: `${generatedContent.theme.primary}99` }}
                            >
                              {service.description}
                            </p>
                            <div 
                              className="text-2xl font-bold"
                              style={{ color: generatedContent.theme.accent }}
                            >
                              {service.price}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Contact Page */}
                {activeTab === 'contact' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-12"
                  >
                    <div className="max-w-2xl mx-auto">
                      <h2 className="text-3xl font-bold mb-6">{generatedContent.contact.title}</h2>
                      <p 
                        className="mb-8"
                        style={{ color: `${generatedContent.theme.primary}99` }}
                      >
                        {generatedContent.contact.description}
                      </p>
                      <form className="space-y-6">
                        {generatedContent.contact.fields.map((field, index) => (
                          <div key={index}>
                            <label 
                              className="block text-sm font-medium mb-2"
                              style={{ color: `${generatedContent.theme.primary}99` }}
                            >
                              {field.label}
                            </label>
                            {field.type === 'textarea' ? (
                              <textarea
                                placeholder={field.placeholder}
                                rows={4}
                                className="w-full p-3 rounded-lg"
                                style={{
                                  background: `${generatedContent.theme.primary}10`,
                                  borderColor: `${generatedContent.theme.primary}40`,
                                  borderWidth: 1
                                }}
                              />
                            ) : (
                              <input
                                type={field.type}
                                placeholder={field.placeholder}
                                className="w-full p-3 rounded-lg"
                                style={{
                                  background: `${generatedContent.theme.primary}10`,
                                  borderColor: `${generatedContent.theme.primary}40`,
                                  borderWidth: 1
                                }}
                              />
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          className="w-full py-3 rounded-lg font-medium transition-colors"
                          style={{
                            background: generatedContent.theme.accent,
                            color: generatedContent.theme.background
                          }}
                        >
                          Send Message
                        </button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// Helper functions
const analyzePrompt = (prompt: string) => {
  const industries = {
    tech: ['tech', 'technology', 'software', 'digital', 'ai', 'automation'],
    health: ['health', 'medical', 'healthcare', 'wellness', 'fitness', 'gym'],
    food: ['restaurant', 'food', 'catering', 'cafe', 'dining', 'bakery'],
    retail: ['shop', 'store', 'retail', 'ecommerce', 'fashion', 'boutique'],
    education: ['education', 'school', 'learning', 'training', 'course', 'academy'],
    finance: ['finance', 'financial', 'banking', 'investment', 'crypto', 'money']
  };

  const styles = {
    modern: ['modern', 'sleek', 'contemporary', 'clean'],
    minimal: ['minimal', 'simple', 'clean', 'minimalist'],
    bold: ['bold', 'dynamic', 'striking', 'powerful'],
    luxury: ['luxury', 'premium', 'elegant', 'sophisticated']
  };

  const promptLower = prompt.toLowerCase();
  
  let detectedIndustry = 'tech';
  for (const [industry, keywords] of Object.entries(industries)) {
    if (keywords.some(keyword => promptLower.includes(keyword))) {
      detectedIndustry = industry;
      break;
    }
  }

  let detectedStyle = 'modern';
  for (const [style, keywords] of Object.entries(styles)) {
    if (keywords.some(keyword => promptLower.includes(keyword))) {
      detectedStyle = style;
      break;
    }
  }

  return {
    industry: detectedIndustry,
    style: detectedStyle,
    isEcommerce: promptLower.includes('shop') || promptLower.includes('store') || promptLower.includes('ecommerce'),
    needsBlog: promptLower.includes('blog') || promptLower.includes('content'),
    isService: promptLower.includes('service') || promptLower.includes('consulting')
  };
};

const getTheme = (industry: string, style: string) => {
  const themes = {
    tech: {
      modern: {
        primary: '#00ff9d',
        secondary: '#00a3ff',
        accent: '#ff00ff',
        background: '#000000',
        font: "'Inter', sans-serif"
      },
      minimal: {
        primary: '#ffffff',
        secondary: '#cccccc',
        accent: '#00ff9d',
        background: '#0a0a0a',
        font: "'Inter', sans-serif"
      }
    },
    health: {
      modern: {
        primary: '#4CAF50',
        secondary: '#81C784',
        accent: '#00BFA5',
        background: '#FFFFFF',
        font: "'Inter', sans-serif"
      },
      minimal: {
        primary: '#2E7D32',
        secondary: '#A5D6A7',
        accent: '#00C853',
        background: '#F5F5F5',
        font: "'Inter', sans-serif"
      }
    },
    food: {
      modern: {
        primary: '#FF5722',
        secondary: '#FF8A65',
        accent: '#F44336',
        background: '#FFFFFF',
        font: "'Playfair Display', serif"
      },
      minimal: {
        primary: '#D84315',
        secondary: '#FFAB91',
        accent: '#FF3D00',
        background: '#FBE9E7',
        font: "'Playfair Display', serif"
      }
    }
  };

  return themes[industry as keyof typeof themes]?.[style as keyof (typeof themes)['tech']] || themes.tech.modern;
};

const getIndustryContent = (industry: string, style: string) => {
  const content = {
    tech: {
      hero: {
        headline: "Innovate with Cutting-Edge Technology",
        subheadline: "Transforming ideas into powerful digital solutions",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
      },
      features: [
        {
          title: "AI-Powered Solutions",
          description: "Leverage the latest in artificial intelligence",
          icon: Zap
        },
        {
          title: "Cloud Integration",
          description: "Seamless cloud-native architecture",
          icon: Globe
        },
        {
          title: "Advanced Analytics",
          description: "Data-driven insights for better decisions",
          icon: Target
        }
      ]
    },
    health: {
      hero: {
        headline: "Transform Your Life Through Fitness",
        subheadline: "Expert guidance for your wellness journey",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80"
      },
      features: [
        {
          title: "Expert Trainers",
          description: "Certified professionals to guide you",
          icon: Users
        },
        {
          title: "Custom Programs",
          description: "Tailored to your fitness goals",
          icon: Target
        },
        {
          title: "Modern Equipment",
          description: "State-of-the-art facilities",
          icon: Shield
        }
      ]
    },
    food: {
      hero: {
        headline: "Experience Culinary Excellence",
        subheadline: "Where every meal tells a story",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
      },
      features: [
        {
          title: "Fresh Ingredients",
          description: "Locally sourced, premium quality",
          icon: ChefHat
        },
        {
          title: "Expert Chefs",
          description: "Crafting memorable experiences",
          icon: Award
        },
        {
          title: "Unique Flavors",
          description: "Innovative culinary creations",
          icon: Heart
        }
      ]
    }
  };

  return content[industry as keyof typeof content] || content.tech;
};

const generateContent = (prompt: string): WebsiteContent => {
  const analysis = analyzePrompt(prompt);
  const theme = getTheme(analysis.industry, analysis.style);
  const industryContent = getIndustryContent(analysis.industry, analysis.style);

  const companyName = prompt
    .split(' ')
    .filter(word => word.length > 3)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .slice(0, 2)
    .join(' ');

  return {
    theme,
    hero: industryContent.hero,
    features: industryContent.features,
    services: [
      {
        title: "Essential Package",
        description: "Perfect for getting started",
        price: "$99/mo",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Professional Package",
        description: "Advanced features for growing needs",
        price: "$199/mo",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Enterprise Package",
        description: "Custom solutions for large organizations",
        price: "$499/mo",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
      }
    ],
    about: {
      title: `About ${companyName}`,
      description: `Leading provider of ${analysis.industry} solutions, dedicated to delivering exceptional experiences and driving innovation in the industry.`,
      mission: `To transform the ${analysis.industry} industry through innovation and excellence, making a positive impact on our customers and community.`,
      values: ["Innovation", "Quality", "Customer Focus", "Integrity"],
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
    },
    contact: {
      title: "Get in Touch",
      description: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      fields: [
        {
          label: "Name",
          type: "text",
          placeholder: "Enter your name"
        },
        {
          label: "Email",
          type: "email",
          placeholder: "Enter your email"
        },
        {
          label: "Phone",
          type: "tel",
          placeholder: "Enter your phone number"
        },
        {
          label: "Message",
          type: "textarea",
          placeholder: "How can we help you?"
        }
      ]
    }
  };
};