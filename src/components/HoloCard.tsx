import React from 'react';
import { motion } from 'framer-motion';

interface HoloCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function HoloCard({ icon, title, description }: HoloCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative p-6 rounded-lg bg-black/40 border border-[#0f0]/20 backdrop-blur-sm
                 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#0f0]/10 
                 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity
                 group overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="relative z-10">
        <div className="text-[#0f0] mb-4 group-hover:animate-pulse">{icon}</div>
        <h3 className="text-xl font-mono mb-2 text-[#0f0]">{title}</h3>
        <p className="text-[#0f0]/60 font-mono text-sm">{description}</p>
      </div>
      <div className="absolute inset-0 bg-[#0f0]/5 animate-scan"></div>
    </motion.div>
  );
}