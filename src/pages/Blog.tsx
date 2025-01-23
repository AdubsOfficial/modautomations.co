import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { blogPosts } from '../data/blogPosts';
import TypewriterText from '../components/TypewriterText';
import GlitchText from '../components/GlitchText';
import { 
  Terminal, Clock, ArrowRight, Mail, Shield, AlertTriangle, Lock, Zap, ChevronRight,
  ChevronLeft, Brain, Target, Users, Database, Globe, MessageSquare, Cpu, Gift
} from 'lucide-react';

function Blog() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
  const postsPerPage = 6;
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  // Update URL when page changes
  useEffect(() => {
    setSearchParams({ page: currentPage.toString() });
  }, [currentPage, setSearchParams]);

  // Update page state when URL changes
  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1');
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [searchParams, currentPage]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubscribing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Success effects
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[60] pointer-events-none';
    overlay.style.background = `
      radial-gradient(circle at center, rgba(0, 255, 0, 0.2) 0%, black 100%),
      repeating-linear-gradient(
        0deg,
        rgba(0, 255, 0, 0.1) 0px,
        rgba(0, 255, 0, 0.1) 1px,
        transparent 1px,
        transparent 2px
      )
    `;
    document.body.appendChild(overlay);

    const message = document.createElement('div');
    message.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-[61] pointer-events-none';
    message.innerHTML = `
      <div class="text-[#0f0] font-mono text-4xl font-bold mb-4 animate-pulse">INTELLIGENCE ACCESS GRANTED</div>
      <div class="text-[#0f0] font-mono text-xl">WELCOME TO THE NETWORK, OPERATIVE</div>
    `;
    document.body.appendChild(message);

    // Create success sound
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, context.currentTime);
    gainNode.gain.setValueAtTime(0.1, context.currentTime);
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1);

    setTimeout(() => {
      document.body.removeChild(overlay);
      document.body.removeChild(message);
      oscillator.stop();
      setEmail('');
      setIsSubscribing(false);
    }, 2000);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentPosts = blogPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

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
              <PageTransition to="/services" className="hover:text-[#0f0] transition-colors tracking-wide">
                PROTOCOLS
              </PageTransition>
              <button 
                onClick={() => setIsSubscribing(true)}
                className="bg-[#0f0]/10 text-[#0f0] px-6 py-2 rounded-md border border-[#0f0]/20 hover:bg-[#0f0]/20 transition-all duration-300"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Blog Header */}
      <div className="pt-32 pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GlitchText 
            text="INTELLIGENCE BRIEFINGS" 
            className="text-5xl md:text-7xl font-bold mb-6"
          />
          <TypewriterText
            text="CLASSIFIED INFORMATION FOR AUTHORIZED PERSONNEL ONLY"
            className="text-xl md:text-2xl text-[#0f0]/60 block mb-12"
            delay={50}
          />

          {/* Subscribe Form */}
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for classified intel"
                className="flex-1 p-3 rounded-lg bg-black/40 border border-[#0f0]/20 
                         text-[#0f0] focus:outline-none focus:border-[#0f0]"
              />
              <button
                type="submit"
                disabled={isSubscribing || !email}
                className="bg-[#0f0]/20 text-[#0f0] px-6 py-3 rounded-lg font-medium
                         hover:bg-[#0f0]/30 transition-colors flex items-center gap-2
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubscribing ? (
                  <>
                    <Lock className="w-5 h-5" />
                    PROCESSING...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    SUBSCRIBE
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Blog Grid */}
      <AnimatePresence mode="wait">
        <motion.section 
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="pb-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post) => (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative p-6 rounded-lg bg-black/40 border border-[#0f0]/20 backdrop-blur-sm
                           transition-all duration-300 group overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/blog/${post.slug}`)}
                >
                  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                  <div className="absolute inset-0 bg-[#0f0]/5 animate-scan"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between text-sm text-[#0f0]/60 mb-4">
                      <span className="bg-[#0f0]/10 px-3 py-1 rounded-full border border-[#0f0]/20">
                        {post.category}
                      </span>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4">{post.title}</h3>
                    <p className="text-[#0f0]/60 mb-6">{post.excerpt}</p>
                    
                    <div className="text-[#0f0] flex items-center group-hover:text-[#0f0]/80 transition-colors">
                      ACCESS FILE <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-8 mt-16">
              <motion.button
                onClick={prevPage}
                disabled={currentPage === 1}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0f0]/10 text-[#0f0] 
                         hover:bg-[#0f0]/20 disabled:opacity-50 disabled:cursor-not-allowed
                         border border-[#0f0]/20 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </motion.button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <motion.button
                    key={page}
                    onClick={() => goToPage(page)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      currentPage === page
                        ? 'bg-[#0f0] text-black'
                        : 'bg-[#0f0]/10 text-[#0f0] hover:bg-[#0f0]/20'
                    }`}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0f0]/10 text-[#0f0]
                         hover:bg-[#0f0]/20 disabled:opacity-50 disabled:cursor-not-allowed
                         border border-[#0f0]/20 transition-all duration-300"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-8 border-t border-[#0f0]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <TypewriterText
            text={`SYSTEM STATUS: ONLINE | LAST UPDATED: ${new Date().getFullYear()}`}
            className="text-[#0f0]/60 block"
            delay={50}
          />
          <p className="text-[#0f0]/40 mt-2">
            STAY CONNECTED. THE FUTURE DEPENDS ON IT.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Blog;