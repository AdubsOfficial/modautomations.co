import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2, X, AlertCircle, ArrowRight, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Lead {
  name: string;
  email: string;
  company: string;
  title: string;
  summary: string;
  location: string;
  companySize: string;
  industry: string;
  experience: string;
  education: string;
}

interface FormData {
  jobTitles: string;
  location: string;
  industry: string;
  companySize: string;
  seniority: string;
  department: string;
  leadCount: number;
}

interface LeadGenerationDemoProps {
  onClose: () => void;
}

const sampleData = {
  names: [
    "Sarah Johnson", "Michael Chen", "Emily Rodriguez", "David Kim", 
    "Rachel Patel", "James Wilson", "Maria Garcia", "Alex Thompson",
    "Lisa Wong", "Daniel Lee", "Anna Kowalski", "Thomas Anderson",
    "Sophia Martinez", "John Smith", "Laura Miller", "Kevin Zhang",
    "Nina Patel", "Chris Taylor", "Maya Singh", "Robert Brown"
  ],
  companies: [
    "Innovate Tech", "DataFlow Systems", "NextGen Solutions", "Quantum Dynamics",
    "FutureTech Inc", "CloudScale", "Digital Forge", "TechVision",
    "AI Dynamics", "CyberPeak", "SmartSys", "InnovateLabs",
    "TechSphere", "DataCore", "FutureWave", "CloudMind",
    "IntelliTech", "ByteForge", "DataSmart", "TechPro Solutions"
  ],
  titles: [
    "Chief Technology Officer", "VP of Engineering", "Technical Director",
    "Head of Innovation", "Director of AI", "Lead Architect",
    "Engineering Manager", "Product Director", "Solutions Architect",
    "Technical Lead", "Innovation Manager", "Development Director",
    "Systems Architect", "Technology Lead", "R&D Director",
    "Platform Manager", "Software Director", "Tech Lead",
    "Engineering Director", "Solutions Manager"
  ],
  summaryTemplates: [
    "A visionary {title} with {experience}+ years driving innovation in the {industry} sector. Known for spearheading transformative initiatives and delivering exceptional results.",
    "Strategic {title} bringing {experience}+ years of expertise to the {industry} landscape. Proven track record of scaling operations and fostering technological advancement.",
    "Dynamic {title} with {experience}+ years revolutionizing {industry} solutions. Expertise in leading high-impact projects and building high-performance teams.",
    "Forward-thinking {title} offering {experience}+ years of hands-on experience in {industry}. Recognized for implementing cutting-edge solutions and driving business growth.",
    "Accomplished {title} with {experience}+ years shaping the future of {industry}. Demonstrated success in optimizing operations and accelerating digital transformation.",
    "Innovative {title} bringing {experience}+ years of strategic leadership to the {industry} space. Specializes in emerging technologies and market expansion.",
    "Results-driven {title} with {experience}+ years pioneering advancements in {industry}. Expert in leveraging technology to solve complex business challenges.",
    "Seasoned {title} offering {experience}+ years of transformative leadership in {industry}. Known for developing scalable solutions and driving operational excellence.",
    "Influential {title} with {experience}+ years revolutionizing {industry} practices. Proven ability to navigate complex technological landscapes and deliver measurable impact.",
    "Experienced {title} bringing {experience}+ years of expertise to {industry} initiatives. Specializes in strategic planning and innovative solution development."
  ],
  achievements: [
    "Led digital transformation initiatives resulting in 40% efficiency improvement",
    "Successfully scaled operations across multiple global markets",
    "Pioneered AI-driven solutions that reduced costs by 30%",
    "Developed innovative strategies leading to 200% revenue growth",
    "Implemented cutting-edge technologies driving 50% productivity gains",
    "Orchestrated successful merger integrations and technology consolidations",
    "Launched revolutionary products capturing significant market share",
    "Established strategic partnerships with industry leaders",
    "Built and mentored high-performing technical teams",
    "Secured major enterprise clients through innovative solutions"
  ]
};

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function LeadGenerationDemo({ onClose }: LeadGenerationDemoProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedLeads, setGeneratedLeads] = useState<Lead[]>([]);
  const [formData, setFormData] = useState<FormData>({
    jobTitles: '',
    location: '',
    industry: '',
    companySize: '',
    seniority: '',
    department: '',
    leadCount: 5
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'leadCount' ? Math.min(Math.max(1, parseInt(value) || 1), 20) : value 
    }));
  };

  const generateUniqueLeads = (count: number): Lead[] => {
    const shuffledNames = shuffleArray(sampleData.names);
    const shuffledCompanies = shuffleArray(sampleData.companies);
    const shuffledTitles = shuffleArray(sampleData.titles);
    const shuffledSummaries = shuffleArray(sampleData.summaryTemplates);
    const shuffledAchievements = shuffleArray(sampleData.achievements);
    
    return Array.from({ length: count }, (_, i) => {
      const name = shuffledNames[i % shuffledNames.length];
      const company = shuffledCompanies[i % shuffledCompanies.length];
      const title = shuffledTitles[i % shuffledTitles.length];
      const summaryTemplate = shuffledSummaries[i % shuffledSummaries.length];
      const achievement = shuffledAchievements[i % shuffledAchievements.length];
      const experience = 10 + Math.floor(Math.random() * 15);
      
      const email = `${name.toLowerCase().split(' ')[0]}.${
        name.toLowerCase().split(' ')[1]
      }@${company.toLowerCase().replace(/\s+/g, '')}.com`;

      const summary = summaryTemplate
        .replace('{title}', title)
        .replace('{experience}', experience.toString())
        .replace('{industry}', formData.industry || 'technology') +
        ` ${achievement}.`;

      return {
        name,
        email,
        company,
        title,
        summary,
        location: formData.location || `San Francisco, CA`,
        companySize: formData.companySize || "1000-5000",
        industry: formData.industry || "Technology",
        experience: `${experience}+ years`,
        education: "MS Computer Science, Top-tier University"
      };
    });
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const leads = generateUniqueLeads(formData.leadCount);
    setGeneratedLeads(leads);
    setIsLoading(false);
  };

  const handleDownload = () => {
    const headers = ['Name', 'Email', 'Company', 'Title', 'Location', 'Industry', 'Company Size', 'Experience', 'Education', 'Summary'];
    const csvContent = [
      headers.join(','),
      ...generatedLeads.map(lead => [
        lead.name,
        lead.email,
        lead.company,
        lead.title,
        lead.location,
        lead.industry,
        lead.companySize,
        lead.experience,
        lead.education,
        `"${lead.summary.replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'generated_leads.csv';
    link.click();
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
            <h2 className="text-2xl font-bold text-[#0f0]">Lead Generation Demo</h2>
            <p className="text-[#0f0]/60 text-sm mt-1">Experience the power of AI-driven lead generation</p>
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
          <div className="grid md:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#0f0]/60 mb-1">
                    Number of Leads (1-20)
                  </label>
                  <input
                    type="number"
                    name="leadCount"
                    min="1"
                    max="20"
                    value={formData.leadCount}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-black/40 border border-[#0f0]/20 text-[#0f0] focus:outline-none focus:border-[#0f0]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0f0]/60 mb-1">
                    Job Titles (comma separated)
                  </label>
                  <input
                    type="text"
                    name="jobTitles"
                    value={formData.jobTitles}
                    onChange={handleInputChange}
                    placeholder="e.g. CTO, VP Engineering, Technical Director"
                    className="w-full p-3 rounded-lg bg-black/40 border border-[#0f0]/20 text-[#0f0] focus:outline-none focus:border-[#0f0]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0f0]/60 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. San Francisco, CA"
                    className="w-full p-3 rounded-lg bg-black/40 border border-[#0f0]/20 text-[#0f0] focus:outline-none focus:border-[#0f0]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0f0]/60 mb-1">
                    Industry
                  </label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    placeholder="e.g. Technology, Healthcare, Finance"
                    className="w-full p-3 rounded-lg bg-black/40 border border-[#0f0]/20 text-[#0f0] focus:outline-none focus:border-[#0f0]"
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isLoading || !formData.jobTitles}
                  className="w-full bg-[#0f0]/20 text-[#0f0] px-6 py-3 rounded-lg font-medium
                           hover:bg-[#0f0]/30 transition-colors flex items-center justify-center
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating Leads...
                    </>
                  ) : (
                    'Generate Leads'
                  )}
                </button>
              </div>

              {/* Results Section */}
              {generatedLeads.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Generated Leads ({generatedLeads.length})</h3>
                    <button
                      onClick={handleDownload}
                      className="flex items-center text-[#0f0] hover:text-[#0f0]/80 transition-colors"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download CSV
                    </button>
                  </div>
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
                        <p className="text-sm text-[#0f0]/80">{lead.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA Section */}
            <div className="md:col-span-1">
              <div className="sticky top-6 space-y-6">
                <div className="p-6 rounded-lg bg-black/40 border border-[#0f0]/20">
                  <h3 className="text-xl font-bold mb-4">Ready to Find More Clients?</h3>
                  <div className="space-y-4 mb-6">
                    <p className="text-sm text-[#0f0]/80">
                      Unlock our full lead generation capabilities:
                    </p>
                    <ul className="space-y-2 text-sm text-[#0f0]/60">
                      <li className="flex items-start">
                        <AlertCircle className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                        Automated email sequences
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                        Real-time analytics dashboard
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                        CRM integration
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                        Weekly optimization reports
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={handleUnlock}
                    className="w-full bg-[#0f0]/20 text-[#0f0] px-6 py-3 rounded-lg font-medium
                             hover:bg-[#0f0]/30 transition-colors flex items-center justify-center"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Find Clients
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}