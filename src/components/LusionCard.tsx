"use client";

import { motion, useTransform } from "framer-motion";

export default function LusionCard({ feature, index, progress }) {
  // Faster staggering: cards will now pop in quickly as you enter the section
  const step = 0.08; 
  const duration = 0.2;
  const start = index * step;
  const end = Math.min(start + duration, 1);

  const localProgress = useTransform(progress, [start, end], [0, 1]);

  const col = index % 3;
  const initialX = col === 0 ? -40 : col === 2 ? 40 : 0;
  const initialY = 30;

  const x = useTransform(localProgress, [0, 1], [initialX, 0]);
  const y = useTransform(localProgress, [0, 1], [initialY, 0]);
  const rotateY = useTransform(localProgress, [0, 1], [-25, 0]);
  const rotateX = useTransform(localProgress, [0, 1], [15, 0]);
  const scale = useTransform(localProgress, [0, 0.8, 1], [0.9, 1.03, 1]);
  const opacity = useTransform(localProgress, [0, 0.4], [0, 1]);

  return (
    <div className="relative w-full h-[320px] [perspective:1200px] z-10 group">
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
        <div className="absolute inset-0 bg-white rounded-[2.5rem] border border-slate-100 p-8 flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] group-hover:-translate-y-2">
          
          <div className="w-20 h-20 bg-[#f0f9fa] rounded-3xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
            <feature.icon className="w-10 h-10 text-[#16697A]" />
          </div>

          <h3 className="text-2xl font-bold text-slate-800 text-center">{feature.title}</h3>

          <p className="text-gray-500 mt-3 text-center leading-relaxed text-lg">
            {feature.description}
          </p>
          
          <div className="absolute bottom-0 w-1/2 h-1 bg-gradient-to-r from-transparent via-[#16697A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </motion.div>
    </div>
  );
}