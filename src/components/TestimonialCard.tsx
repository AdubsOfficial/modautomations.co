import React from 'react';
import { motion } from 'framer-motion';
import { User, Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  delay: number;
}

export default function TestimonialCard({ 
  name, 
  role, 
  company, 
  content, 
  rating,
  delay 
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="relative p-6 rounded-lg bg-black/40 border border-[#0f0]/20 backdrop-blur-sm
                 group hover:scale-105 transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute inset-0 bg-[#0f0]/5 animate-scan"></div>
      
      <div className="relative z-10">
        {/* Rating */}
        <div className="flex mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-[#0f0] fill-current" />
          ))}
        </div>

        {/* Content */}
        <p className="text-[#0f0]/80 mb-6 font-mono">"{content}"</p>

        {/* Author */}
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full border border-[#0f0]/20 flex items-center justify-center bg-[#0f0]/10">
            <User className="w-6 h-6 text-[#0f0]" />
          </div>
          <div className="ml-3">
            <h4 className="font-bold text-[#0f0]">{name}</h4>
            <p className="text-sm text-[#0f0]/60">
              {role} @ {company}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}