"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import LusionCard from "./LusionCard";

export default function LusionCardSection({ features }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 15,
    mass: 0.8,
  });

  const pathLength = useTransform(progress, [0.1, 0.8], [0, 1]);
  const lineOpacity = useTransform(progress, [0, 0.2], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative w-full  bg-[#f1f5ff] overflow-hidden"
      style={{ perspective: "2000px" }}
    >
      <div className="absolute inset-0 top-0 w-full h-full pointer-events-none z-0">
        <svg className="w-full h-full opacity-30" viewBox="0 0 1200 900" fill="none">
          <motion.path
            d="M600,0 C600,200 200,200 200,400 C200,600 1000,600 1000,400 C1000,200 600,600 600,800"
            stroke="#16697A"
            strokeWidth="13"
            strokeDasharray="10 10"
            style={{ pathLength, opacity: lineOpacity }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-10">
        <div className="text-center mb-32">
          <span className="text-[#FFA62B] font-bold tracking-[0.2em] uppercase mb-3 block text-sm">
            Our Values
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#16697A]">
            Why Choose Us
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 pb-10 min-h-[800px]">
          {features.map((feature, i) => (
            <LusionCard key={i} feature={feature} index={i} progress={progress} />
          ))}
        </div>
      </div>
    </section>
  );
}
