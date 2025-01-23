import React, { useEffect, useRef } from 'react';

interface CodeRainProps {
  onComplete?: () => void;
}

const CodeRain: React.FC<CodeRainProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}=+-*/';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(0);
    let frame = 0;
    const maxFrames = 120; // Animation duration in frames

    ctx.font = `${fontSize}px monospace`;

    const draw = () => {
      ctx.fillStyle = `rgba(0, 0, 0, ${frame / maxFrames * 0.15})`; // Gradually increase opacity
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00A3FF';
      for (let i = 0; i < drops.length; i++) {
        const char = characters[Math.floor(Math.random() * characters.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.99) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      frame++;

      if (frame < maxFrames) {
        requestAnimationFrame(draw);
      } else {
        // Fade out
        const fadeOut = () => {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          if (ctx.globalAlpha > 0) {
            ctx.globalAlpha -= 0.05;
            requestAnimationFrame(fadeOut);
          } else {
            if (onComplete) onComplete();
          }
        };
        fadeOut();
      }
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.font = `${fontSize}px monospace`;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
}

export default CodeRain;