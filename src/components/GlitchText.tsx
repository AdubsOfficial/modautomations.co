import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className = '' }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 100);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <span className={`block ${isGlitching ? 'animate-glitch' : ''}`}>{text}</span>
      {isGlitching && (
        <>
          <span className="absolute top-0 left-0 w-full h-full text-[#0f0] opacity-50 translate-x-1">
            {text}
          </span>
          <span className="absolute top-0 left-0 w-full h-full text-[#f00] opacity-50 -translate-x-1">
            {text}
          </span>
        </>
      )}
    </div>
  );
}