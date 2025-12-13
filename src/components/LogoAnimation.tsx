import {useEffect, useState } from 'react';
import logo from '../assets/arsen-logo.png';

interface LogoAnimationProps {
  onAnimationComplete: () => void;
}

export default function LogoAnimation({ onAnimationComplete }: LogoAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(true);
  const DURATION_MS = 3000; 
  const REVEAL_DELAY_MS = 500; 

  useEffect(() => {
    const endTimer = setTimeout(() => {
      setIsAnimating(false);
      onAnimationComplete();
    }, DURATION_MS);

    return () => {
      clearTimeout(endTimer);
    };
  }, [onAnimationComplete]);

  if (!isAnimating) return null;

  return (
    // Note: Tailwind classes are used here for layout, colors, and shadows,
    // but the animation classes (animate-*) are defined in your index.css now.
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 overflow-hidden"
    >
      {/* 1. Background Grid/Scanline Effect */}
      <div className="absolute inset-0 opacity-10 animate-scanline-bg pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            // CSS for the visual grid pattern
            backgroundImage: 'repeating-linear-gradient(0deg, #3b82f6 0.5px, transparent 1.5px)',
            opacity: 0.15,
          }}
        />
      </div>

      {/* 2. Logo Container */}
      <div className="relative flex items-center justify-center p-6">
        
        {/* Outer Animated Ring (Subtle Pulsing) */}
        <div className="absolute w-52 h-52 border-2 border-cyan-400 rounded-full animate-pulse-slow opacity-20" />
        
        {/* Inner Logo Element */}
        <div className="w-44 h-44 bg-white rounded-full shadow-2xl flex items-center justify-center overflow-hidden">
          
          <img 
            src={logo} 
            alt="Arsen Logo"
            // KEY: This class now triggers the CSS logo-reveal keyframe
            className={`w-full h-full object-contain p-6 animate-logo-reveal`}
            style={{
              animationDelay: `${REVEAL_DELAY_MS}ms`,
            }}
          />
        </div>
      </div>
    </div>
  );
}