"use client";

import React, { useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  HardHat,
  Sofa,
  Pencil
} from "lucide-react";

const THEME = {
  forest: "#00626b",
  gold: "#f09f2d",
  white: "#ffffff",
};

const slides = [
  {
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
    title: "Precision Management",
    subtitle: "Orchestrating complex architectural visions with absolute technical rigor.Ensuring seamless project delivery through expert vendor and site synergy.",
    badge: "PMC"
  },
  {
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop",
    title: "Executive Elegance",
    subtitle: "Redefining the modern workspace with sophisticated, high-performance design.Crafting environments that amplify brand identity and corporate productivity.",
    badge: "COMMERCIAL"
  },
  {
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
    title: "Bespoke Living",
    subtitle: "Tailoring intimate residential sanctuaries to your unique personal narrativeWhere curated luxury meets the functional warmth of a modern home.",
    badge: "RESIDENTIAL"
  },
  {
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
    title: "Precision Management",
    subtitle: "Orchestrating complex architectural visions with absolute technical rigor.Ensuring seamless project delivery through expert vendor and site synergy.",
    badge: "PMC"
  },
  {
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop",
    title: "Executive Elegance",
    subtitle: "Redefining the modern workspace with sophisticated, high-performance design.Crafting environments that amplify brand identity and corporate productivity.",
    badge: "COMMERCIAL"
  },
  {
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
    title: "Bespoke Living",
    subtitle: "Tailoring intimate residential sanctuaries to your unique personal narrativeWhere curated luxury meets the functional warmth of a modern home.",
    badge: "RESIDENTIAL"
  },
  {
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
    title: "Precision Management",
    subtitle: "Orchestrating complex architectural visions with absolute technical rigor.Ensuring seamless project delivery through expert vendor and site synergy.",
    badge: "PMC"
  },
  {
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop",
    title: "Executive Elegance",
    subtitle: "Redefining the modern workspace with sophisticated, high-performance design.Crafting environments that amplify brand identity and corporate productivity.",
    badge: "COMMERCIAL"
  },
  {
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
    title: "Bespoke Living",
    subtitle: "Tailoring intimate residential sanctuaries to your unique personal narrativeWhere curated luxury meets the functional warmth of a modern home.",
    badge: "RESIDENTIAL"
  }

];

export default function HeroLuxuryFinal() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const progress = useMotionValue(0);

  const nextSlide = useCallback(() => {
    progress.set(0);
    setIndex((prev) => (prev + 1) % slides.length);
  }, [progress]);

  const prevSlide = useCallback(() => {
    progress.set(0);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [progress]);

  useAnimationFrame((_, delta) => {
    if (paused) return;
    const currentProgress = progress.get();
    const nextValue = currentProgress + delta / 6000;
    if (nextValue >= 1) nextSlide();
    else progress.set(nextValue);
  });

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-[#00626b83]"
      onMouseEnter={() => setPaused(false)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 1. BACKGROUND IMAGE LAYER */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={slides[index].image}
              className="w-full h-full object-cover"
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-black/40 md:bg-black/25" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. THE SWEEPING POLYGON (Gradient Filled for Premium Feel) */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
        <svg className="w-full h-full scale-[1.01]" viewBox="0 0 1880 1080" preserveAspectRatio="none">
          <defs>
            <linearGradient id="forestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#031E22" />
              <stop offset="55%" stopColor="#063A40" />
              <stop offset="100%" stopColor="#0A2E36" />
            </linearGradient>


          </defs>
          <path
            d="M0,0 L1150,0 C900,300 1050,700 550,1080 L0,1080 Z"
            fill="url(#forestGrad)"
            className="pointer-events-auto shadow-2xl"
          />
          <path
            d="M1150,0 C900,300 1050,700 550,1080"
            fill="none"
            stroke={THEME.gold}
            strokeWidth="18"
            strokeOpacity="0.9"
          />
        </svg>
      </div>

      {/* Mobile-only Gradient Overlays */}
      <div className="absolute inset-0 z-10 md:hidden bg-gradient-to-t from-[#00626b] via-[#1a4a38]/40 to-transparent" />
      <div className="absolute inset-0 z-10 md:hidden bg-gradient-to-r from-black/40 to-transparent" />

      {/* 3. FLOATING ICONS */}
      <div className="absolute inset-0 z-20 pointer-events-none hidden lg:block">
        <FloatingIcon Icon={Pencil} top="15%" left="58%" delay={0} />
        <FloatingIcon Icon={HardHat} top="45%" left="88%" delay={1} />
        <FloatingIcon Icon={Sofa} top="75%" left="82%" delay={2} />
      </div>

      {/* 4. MAIN TEXT LAYOUT */}
      <div className="relative z-30 h-full lg:pt-16 flex items-center px-6 md:px-16 lg:px-18">
        <div className="max-w-7xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 30, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl space-y-4"
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-4 py-1.5 bg-[#f09f2d] text-white text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase rounded-sm"
              >
                {slides[index].badge}
              </motion.span>

              <h1 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-bold tracking-tight leading-[1.1] drop-shadow-sm">
                {slides[index].title.split(' ')[0]} <br />
                <span className="font-serif italic font-normal text-white/90">
                  {slides[index].title.split(' ').slice(1).join(' ')}
                </span>
              </h1>

              <p className="text-white/90 text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-xl whitespace-pre-line drop-shadow-sm">
                {slides[index].subtitle}
              </p>

              <div className="flex flex-wrap gap-4 pt-3">
                <button className="px-8 py-4 bg-[#f09f2d] text-white font-bold uppercase tracking-widest text-xs hover:bg-[#d98b1a] transition-all transform hover:-translate-y-1 shadow-lg">
                  Explore Projects
                </button>
                <button className="px-8 py-4 border border-white/30 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all backdrop-blur-sm">
                  Contact Us
                </button>
              </div>

              {/* PROGRESS BAR */}
              <div className="pt-10 flex items-center gap-6">
                <div className="text-white/60 font-mono text-[10px] md:text-xs tracking-widest">
                  <span className="text-white">0{index + 1}</span> / 0{slides.length}
                </div>
                <div className="w-40 md:w-64 h-[2px] bg-white/10 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-[#f09f2d]"
                    style={{ width: "100%", scaleX: progress, transformOrigin: "left" }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 5. NAVIGATION ARROWS */}
      <div className="absolute bottom-12 right-8 md:bottom-12 md:right-12 z-50 flex gap-4">
        <NavButton onClick={prevSlide} Icon={ChevronLeft} />
        <NavButton onClick={nextSlide} Icon={ChevronRight} />
      </div>
    </section>
  );
}

function NavButton({ onClick, Icon }) {
  return (
    <button
      onClick={onClick}
      className="p-4 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 text-white hover:bg-[#f09f2d] hover:border-[#f09f2d] transition-all group shadow-xl"
    >
      <Icon size={24} className="group-active:scale-90 transition-transform" />
    </button>
  );
}

function FloatingIcon({ Icon, top, left, delay }) {
  return (
    <motion.div
      className="absolute p-5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/40 shadow-2xl"
      style={{ top, left }}
      animate={{
        y: [0, -25, 0],
        rotate: [0, 8, 0],
        opacity: [0.3, 0.6, 0.3]
      }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <Icon size={24} strokeWidth={1} />
    </motion.div>
  );
}