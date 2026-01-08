"use client";

import { motion, useTransform } from "framer-motion";

export default function LusionCard({ feature, index, progress }) {
  // Staggering logic: Cards start appearing one after another
  const step = 0.1; 
  const duration = 0.3;
  const start = index * step;
  const end = Math.min(start + duration, 1);

  // Map the global scroll progress to a local 0-1 range for this specific card
  const localProgress = useTransform(progress, [start, end], [0, 1]);

  // Positional logic for entrance direction based on grid column
  const col = index % 3;
  const initialX = col === 0 ? -60 : col === 2 ? 60 : 0;
  const initialY = 40;

  // Transform mappings
  const x = useTransform(localProgress, [0, 1], [initialX, 0]);
  const y = useTransform(localProgress, [0, 1], [initialY, 0]);
  const rotateY = useTransform(localProgress, [0, 1], [-45, 0]); // Subtle 3D tilt
  const rotateX = useTransform(localProgress, [0, 1], [20, 0]);
  const scale = useTransform(localProgress, [0, 0.8, 1], [0.8, 1.05, 1]); // Slight bounce scale
  const opacity = useTransform(localProgress, [0, 0.5], [0, 1]);

  return (
    <div className="relative w-full h-[320px] [perspective:1200px] z-10">
      <motion.div
        style={{
          x,
          y,
          rotateY,
          rotateX,
          scale,
          opacity,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative"
      >
        {/* Card Body */}
        <div className="absolute inset-0 bg-white rounded-[2.5rem] border border-slate-100 p-8 flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-shadow duration-500 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)]">
          
          {/* Icon Container */}
          <div className="w-20 h-20 bg-[#f0f9fa] rounded-3xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
            <feature.icon className="w-10 h-10 text-[#16697A]" />
          </div>

          <h3 className="text-2xl font-bold text-slate-800">{feature.title}</h3>

          <p className="text-gray-500 mt-3 text-center leading-relaxed">
            {feature.description}
          </p>
          
          {/* Subtle Bottom Glow */}
          <div className="absolute bottom-0 w-1/2 h-1 bg-gradient-to-r from-transparent via-[#16697A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </motion.div>
    </div>
  );
}