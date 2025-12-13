"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
// Added more related icons for interior design
import { 
    ChevronLeft, 
    ChevronRight, 
    Ruler, 
    Lightbulb, 
    Palette, 
    Sofa, 
    HardHat, // Architecture/Construction
    Square // Abstract design element
} from "lucide-react"; 
import heroBg from "../assets/hero-bg.png"; // Assuming this path is correct

/* ================= THEME ================= */
const THEME = {
  navy: "#0B1E39",
  forest: "rgb(0 97 107)",
  gold: "rgb(240 158 45)",
  sand: "#f5e6cd",
  white: "#ffffff",
};

/* ================= SLIDES (Subtitles Enhanced) ================= */
const slides = [
  { 
    image: "https://images.pexels.com/photos/1082355/pexels-photo-1082355.jpeg", 
    title: "Minimalist Haven", 
    subtitle: "A philosophy of 'less is more,' featuring clean lines, soft natural light, and a selection of purposeful, high-quality furniture pieces.", 
    badge: "INTERIOR" 
  },
  { 
    image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg", 
    title: "Urban Sanctuary", 
    subtitle: "Creating a peaceful retreat amidst the city bustle. Our residential designs focus on sound-dampening materials.", 
    badge: "RESIDENTIAL" 
  },
  { 
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg", 
    title: "Executive Elegance", 
    subtitle: "Timeless workspaces crafted with refined detail. We integrate sophisticated technology seamlessly into bespoke furniture.", 
    badge: "COMMERCIAL" 
  },
  { 
    image: "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg", 
    title: "Warm Nordic", 
    subtitle: "Inspired by Scandinavian design, this style emphasizes soft palettes, airy proportions, and the extensive use of natural materials.", 
    badge: "INTERIOR" 
  },
  { 
    image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg", 
    title: "Bespoke Living", 
    subtitle: "Every detail is a reflection of the client's unique style. We specialize in custom-crafted cabinetry, tailored millwork.", 
    badge: "RESIDENTIAL" 
  },
  { 
    image: "https://images.pexels.com/photos/534172/pexels-photo-534172.jpeg", 
    title: "Sculpted Light", 
    subtitle: "Expert lighting design that shapes form and emotion. We use a combination of ambient, task, and accent lighting.", 
    badge: "LIGHTING" 
  },
  { 
    image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg", 
    title: "Industrial Modern", 
    subtitle: "A stylish juxtaposition of raw textures like exposed brick and concrete, refined with sleek, contemporary finishes.", 
    badge: "DESIGN" 
  },
  { 
    image: "https://images.pexels.com/photos/1572051/pexels-photo-1572051.jpeg", 
    title: "Soft Contemporary", 
    subtitle: "Achieving balanced modern warmth. This approach utilizes curved furniture, plush textiles, and a neutral color scheme with pops.", 
    badge: "INTERIOR" 
  },
  { 
    image: "https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting-room.jpg", 
    title: "Boardroom Luxury", 
    subtitle: "A professional environment where leadership meets design. Our focus is on ergonomic luxury, superior acoustic treatment.", 
    badge: "COMMERCIAL" 
  },
  { 
    image: "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg", 
    title: "Timeless Harmony", 
    subtitle: "Blending classic architectural forms with a modern soul. We prioritize enduring materials and balanced proportions.", 
    badge: "DESIGN" 
  },
];

const AUTO_DURATION = 6;

/* ================= MASK ================= */
const MASK_OUTER = "polygon(0 0, 80% 0, 62% 50%, 80% 100%, 0 100%)";
const MASK_INNER = "polygon(0 0, 78% 0, 57% 50%, 78% 100%, 0 100%)";

/* ================= HERO ================= */
export default function HeroLuxuryFinal() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const progress = useMotionValue(0);

  // Auto-slide animation logic
  useAnimationFrame((_, delta) => {
    if (paused) return;
    const next = progress.get() + delta / (AUTO_DURATION * 1000);
    if (next >= 1) {
      // **CORRECTION:** Reset progress before changing index
      progress.set(0); 
      setIndex((i) => (i + 1) % slides.length);
    } else {
      progress.set(next);
    }
  });

  // Manual slide change functions
  const nextSlide = () => {
    // **CORRECTION:** Only reset progress bar, auto-pause is handled by mouseEnter/Leave
    progress.set(0); 
    setIndex((i) => (i + 1) % slides.length);
  };

  const prevSlide = () => {
    // **CORRECTION:** Only reset progress bar, auto-pause is handled by mouseEnter/Leave
    progress.set(0); 
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      // Added mouse events to pause/resume auto-sliding
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ================= BACKGROUND ================= */}
      <AnimatePresence mode="sync">
        <motion.img
          key={index}
          src={slides[index].image}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }} 
        />
      </AnimatePresence>

      {/* IMAGE OVERLAY */}
      <div
        className="absolute inset-0"
        style={{
          // Darker overlay for better text contrast
          background:
            "linear-gradient(to right, rgba(11,30,57,0.7), rgba(11, 30, 57, 0.75), transparent)",
        }}
      />

      {/* ================= LEFT PANEL ================= */}
      <div
        className="absolute inset-y-0 left-0 z-30"
        style={{
          width: "82%", 
          clipPath: MASK_OUTER,
          background: THEME.forest,
        }}
      >
        {/* Pattern Background Image */}
        <img
          src={heroBg}
          className="absolute inset-0 w-full h-full object-cover opacity-100"
          style={{ clipPath: MASK_INNER }}
        />

        {/* Elegant light gradient (reduced opacity) */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: MASK_INNER,
            background: `
              linear-gradient(
                135deg,
                rgba(245, 230, 205, 0.35),
                rgba(250, 238, 220, 0.45),
                rgba(240, 159, 45, 0.4)
              )
            `,
          }}
        />

        {/* CONTENT */}
        <div
          className="relative z-10 h-full flex items-center px-8 md:px-28"
          style={{ clipPath: MASK_INNER }}
        >
          <motion.div
            key={slides[index].title}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
                duration: 1.0, 
                ease: [0.25, 0.46, 0.45, 0.94], 
                delay: 0.2
            }}
            className="max-w-2xl" 
          >
            <span
              className="inline-block mb-4 px-4 py-1 text-sm font-medium tracking-widest uppercase" 
              style={{ background: THEME.gold, color: THEME.white }}
            >
              {slides[index].badge}
            </span>

            <h1
              className="text-5xl md:text-7xl font-extrabold leading-snug" 
              style={{ color: THEME.forest }}
            >
              {slides[index].title}
            </h1>

            <p
              className="mt-6 text-xl md:text-2xl max-w-xl leading-snug" 
              style={{ color: THEME.navy }}
            >
              {slides[index].subtitle}
            </p>

            <div className="mt-10 flex gap-6"> 
              <button
                className="px-8 py-4 font-bold uppercase tracking-wider transition-transform hover:scale-[1.03]"
                style={{ background: THEME.gold, color: THEME.white }}
              >
                Explore Projects
              </button>
              <button
                className="px-8 py-4 border font-bold uppercase tracking-wider transition-colors hover:bg-white/10"
                style={{ borderColor: THEME.navy, color: THEME.navy }}
              >
                Contact Us
              </button>
            </div>

            {/* PROGRESS WITH SLIDER COUNT */}
            <div className="mt-16"> 
              <div className="flex items-center gap-4 mb-3">
                <p className="text-sm tracking-widest font-semibold" style={{ color: THEME.navy }}>
                  PROGRESS
                </p>
                {/* Active/Total Slider Count */}
                <span className="text-xl font-bold" style={{ color: THEME.navy }}>
                  {(index + 1).toString().padStart(2, '0')} 
                  <span className="text-lg opacity-50 font-normal"> / {slides.length.toString().padStart(2, '0')}</span>
                </span>
              </div>
              
              <div className="w-80 h-[4px] bg-black/10"> 
                <motion.div
                  className="h-full"
                  style={{
                    background: THEME.gold,
                    scaleX: progress,
                    transformOrigin: "left",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ================= FLOATING INTERIOR ELEMENTS (More animation and relevance) ================= */}
      
      {/* Element 1: Ruler/Measure icon (Design/Planning) - Complex Float */}
      <motion.div
        className="absolute top-16 left-[55%] z-50 p-3 rounded-full shadow-lg"
        style={{ background: THEME.white, color: THEME.gold }}
        animate={{ 
            y: [0, -20, 0], 
            rotate: [0, 5, -5, 0], 
            scale: [1, 1.05, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        <Ruler size={36} strokeWidth={1.5} />
      </motion.div>
      
      {/* Element 2: Lightbulb icon (Lighting/Idea) - Gentle Float */}
      <motion.div
        className="absolute top-24 right-40 z-50 p-3 rounded-full shadow-xl"
        style={{ background: THEME.gold, color: THEME.white }}
        animate={{ 
            y: [0, -40, 0], 
            scale: [1, 1.1, 1], 
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <Lightbulb size={40} strokeWidth={1.5} />
      </motion.div>

      {/* Element 3: Sofa icon (Furniture/Comfort) - Side Sway */}
      <motion.div
        className="absolute bottom-40 right-10 z-50 p-3 rounded-xl shadow-2xl"
        style={{ background: THEME.navy, color: THEME.white }}
        animate={{ 
            x: [0, -15, 0], 
            rotate: [0, 2, 0, -2, 0], // Small horizontal rotation
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "sineInOut" }}
      >
        <Sofa size={44} strokeWidth={1.5} />
      </motion.div>
      
      {/* Element 4: Palette icon (Color/Materials) - Slow Vertical Drift */}
      <motion.div
        className="absolute bottom-16 left-[60%] z-50 p-2 rounded-full shadow-lg"
        style={{ background: THEME.white, color: THEME.forest }}
        animate={{ 
            y: [0, 25, 0], 
            rotate: [0, -10, 10, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeOut" }}
      >
        <Palette size={32} strokeWidth={1.5} />
      </motion.div>
      
      {/* Element 5: Hard Hat (Construction/Project Management) - New Icon */}
      <motion.div
        className="absolute top-60 right-10 z-50 p-2 rounded-lg shadow-xl"
        style={{ background: THEME.navy, color: THEME.gold }}
        animate={{ 
            x: [0, 20, 0],
            rotate: [0, -5, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <HardHat size={30} strokeWidth={1.5} />
      </motion.div>

      {/* Element 6: Square (Abstract Geometry) - New Icon */}
      <motion.div
        className="absolute bottom-10 right-48 z-50 p-1 border"
        style={{ width: 40, height: 40, borderColor: THEME.gold }}
        animate={{ 
            rotate: [0, 90, 0],
            y: [0, -10, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      {/* ================= NAV ================= */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-5">
        <button
          onClick={prevSlide}
          className="p-3 bg-white/30 backdrop-blur border border-white/50 text-white hover:bg-white/50 transition"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 bg-white/30 backdrop-blur border border-white/50 text-white hover:bg-white/50 transition"
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}