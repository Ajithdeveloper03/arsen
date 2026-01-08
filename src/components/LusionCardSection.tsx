"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import LusionCard from "./LusionCard";

export default function LusionCardSection({ features }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start animating when the top of the container is 80% down the viewport
    offset: ["start 0.9", "end start"],
  });

  // Smoother Spring physics: less "heavy", more "fluid"
  const progress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  const pathLength = useTransform(progress, [0, 0.8], [0, 1]);
  const lineOpacity = useTransform(progress, [0, 0.1], [0, 0.4]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#f8faff] py-24 overflow-hidden"
    >
      {/* Background Decorative Path */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 1200 1000" 
          fill="none" 
          preserveAspectRatio="none"
        >
          <motion.path
            d="M600,0 C600,300 150,300 150,500 C150,700 1050,700 1050,500 C1050,300 600,700 600,1000"
            stroke="#16697A"
            strokeWidth="8"
            strokeDasharray="15 15"
            strokeLinecap="round"
            style={{ 
              pathLength, 
              opacity: lineOpacity,
            }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#FFA62B] font-bold tracking-[0.3em] uppercase mb-4 block text-sm"
          >
            Our Values
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-[#16697A] tracking-tight"
          >
            Why Choose Us
          </motion.h2>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {features.map((feature, i) => (
            <LusionCard 
              key={i} 
              feature={feature} 
              index={i} 
              progress={progress} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}