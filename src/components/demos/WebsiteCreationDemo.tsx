import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Globe, Code, Layout, Palette, ChevronRight, Check, Loader2,
  Zap, Laptop, Smartphone, Monitor, ArrowRight, Eye, Download,
  PenTool, Image, Type, Sliders, Settings, Layers
} from 'lucide-react';
import TypewriterText from '../TypewriterText';
import GlitchText from '../GlitchText';

interface WebsiteCreationDemoProps {
  onClose: () => void;
}

export default function WebsiteCreationDemo({ onClose }: WebsiteCreationDemoProps) {
  const [step, setStep] = useState(1);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSite, setGeneratedSite] = useState<any>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate generated website data
    setGeneratedSite({
      theme: {
        primary: '#00ff9d',
        secondary: '#00a3ff',
        accent: '#ff00ff',
        background: '#000000',
        font: "'Inter', sans-serif"
      },
      layout: {
        type: 'modern',
        sections: ['hero', 'features', 'about', 'contact']
      },
      content: {
        title: 'AI-Generated Website',
        description: 'A modern website created with artificial intelligence',
        features: [
          'Responsive Design',
          'Modern UI/UX',
          'Fast Performance',
          'SEO Optimized'
        ]
      }
    });
    
    setIsGenerating(false);
    setStep(2);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <GlitchText 
                text="AI WEBSITE GENERATOR"
                className="text-3xl font-bold mb-4"
              />
              <TypewriterText
                text="Describe your website and let AI create it for you"
                className="text-lg text-[#0f0]/60"
                delay={50}
              />
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#0f0]/60 mb-2">
                  Website Description
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., A modern tech company website with dark theme, featuring product showcase and team sections..."
                  className="w-full h-32 p-4 rounded-lg bg-black/40 border border-[#0f0]/20 
                           text-[#0f0] focus:outline-none focus:border-[#0f0] resize-none"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-[#0f0]/10 border border-[#0f0]/20">
                  <Layout className="w-6 h-6 text-[#0f0] mb-2" />
                  <h3 className="font-bold mb-1">Smart Layout</h3>
                  <p className="text-sm text-[#0f0]/60">AI-optimized structure and flow</p>
                </div>
                <div className="p-4 rounded-lg bg-[#0f0]/10 border border-[#0f0]/20">
                  <Palette className="w-6 h-6 text-[#0f0] mb-2" />
                  <h3 className="font-bold mb-1">Dynamic Design</h3>
                  <p className="text-sm text-[#0f0]/60">Beautiful, cohesive visuals</p>
                </div>
                <div className="p-4 rounded-lg bg-[#0f0]/10 border border-[#0f0]/20">
                  <Code className="w-6 h-6 text-[#0f0] mb-2" />
                  <h3 className="font-bold mb-1">Clean Code</h3>
                  <p className="text-sm text-[#0f0]/60">Production-ready output</p>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full bg-[#0f0] text-black px-6 py-3 rounded-lg font-medium 
                         hover:bg-[#0f0]/90 transition-colors flex items-center justify-center
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Website...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Generate Website
                  </>
                )}
              </button>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <GlitchText 
                text="WEBSITE GENERATED SUCCESSFULLY"
                className="text-3xl font-bold mb-4"
              />
              <TypewriterText
                text="Your AI-powered website is ready for deployment"
                className="text-lg text-[#0f0]/60"
                delay={50}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Preview Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Preview
                </h3>
                <div className="aspect-video rounded-lg bg-black/40 border border-[#0f0]/20 p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-8 bg-[#0f0]/10 rounded animate-pulse"></div>
                    <div className="h-4 bg-[#0f0]/10 rounded w-2/3 animate-pulse"></div>
                    <div className="h-4 bg-[#0f0]/10 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="flex-1 p-2 rounded bg-[#0f0]/10 border border-[#0f0]/20">
                    <Laptop className="w-5 h-5 mx-auto" />
                  </button>
                  <button className="flex-1 p-2 rounded bg-[#0f0]/10 border border-[#0f0]/20">
                    <Smartphone className="w-5 h-5 mx-auto" />
                  </button>
                  <button className="flex-1 p-2 rounded bg-[#0f0]/10 border border-[#0f0]/20">
                    <Monitor className="w-5 h-5 mx-auto" />
                  </button>
                </div>
              </div>

              {/* Settings Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Generated Settings
                </h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-black/40 border border-[#0f0]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Palette className="w-4 h-4" />
                      <h4 className="font-bold">Theme</h4>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {['primary', 'secondary', 'accent'].map((color) => (
                        <div
                          key={color}
                          className="w-8 h-8 rounded"
                          style={{ background: generatedSite.theme[color] }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-black/40 border border-[#0f0]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="w-4 h-4" />
                      <h4 className="font-bold">Layout</h4>
                    </div>
                    <div className="space-y-1">
                      {generatedSite.layout.sections.map((section: string) => (
                        <div key={section} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#0f0]" />
                          <span className="capitalize">{section}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setStep(1)}
                className="bg-[#0f0]/20 text-[#0f0] px-6 py-3 rounded-lg font-medium
                         hover:bg-[#0f0]/30 transition-colors flex items-center"
              >
                <PenTool className="w-5 h-5 mr-2" />
                Edit Design
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-[#0f0] text-black px-6 py-3 rounded-lg font-medium
                         hover:bg-[#0f0]/90 transition-colors flex items-center"
              >
                Deploy Website
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <GlitchText 
                text="DEPLOYMENT READY"
                className="text-3xl font-bold mb-4"
              />
              <TypewriterText
                text="Your website is ready to go live"
                className="text-lg text-[#0f0]/60"
                delay={50}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Generated Files</h3>
                <div className="space-y-2">
                  {['index.html', 'styles.css', 'main.js', 'assets/'].map((file) => (
                    <div
                      key={file}
                      className="p-3 rounded-lg bg-black/40 border border-[#0f0]/20 
                               flex items-center justify-between"
                    >
                      <span>{file}</span>
                      <Download className="w-4 h-4 text-[#0f0]" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">Deployment Options</h3>
                <div className="space-y-2">
                  {['Netlify', 'Vercel', 'GitHub Pages'].map((platform) => (
                    <button
                      key={platform}
                      className="w-full p-3 rounded-lg bg-black/40 border border-[#0f0]/20 
                               hover:bg-[#0f0]/10 hover:border-[#0f0] transition-all duration-300
                               flex items-center justify-between"
                    >
                      <span>{platform}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setStep(1)}
                className="bg-[#0f0]/20 text-[#0f0] px-6 py-3 rounded-lg font-medium
                         hover:bg-[#0f0]/30 transition-colors flex items-center"
              >
                Start New Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
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
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-[#0f0]" />
              <h2 className="text-2xl font-bold text-[#0f0]">AI Website Creator</h2>
            </div>
            <p className="text-[#0f0]/60 text-sm mt-1">Generate a complete website from a text description</p>
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
            {renderStep()}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}