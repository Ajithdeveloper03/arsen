"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Award, Zap } from "lucide-react";
// Replace this with your actual path or a placeholder for testing
import mapImgg from "../assets/map.png"; 

export default function PremiumPresenceSection() {
  // Using a placeholder URL for demonstration. Replace with your 'map' import.
  const mapImg = mapImgg;

  const locations = [
    { name: "Chandigarh", top: "14%", left: "32%" },
    { name: "Delhi", top: "23%", left: "33%" },
    { name: "Jaipur", top: "33%", left: "25%" },
    { name: "Ahmedabad", top: "46%", left: "16%" },
    { name: "Mumbai", top: "58%", left: "20%" },
    { name: "Pune", top: "62%", left: "23%" },
    { name: "Hyderabad", top: "63%", left: "45%" },
    { name: "Bangalore", top: "71%", left: "43%" },
    { name: "Chennai", top: "80%", left: "43%" },
    { name: "Kolkata", top: "45%", left: "70%" },
  ];

  return (
    <section className="relative py-16 md:py-32 bg-[#010B0A] overflow-hidden">
      {/* PREMIUM BACKGROUND ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] md:w-[40%] h-[40%] bg-[#0F5B54]/20 blur-[80px] md:blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] md:w-[40%] h-[40%] bg-[#FFA62B]/10 blur-[80px] md:blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
        
        {/* LEFT: 3D FLOATING MAP CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="relative group order-1 lg:order-1"
        >
          {/* Subtle Glow Behind Map */}
          <div className="absolute inset-0 bg-[#0F5B54]/30 blur-[60px] md:blur-[100px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000" />

          {/* Map wrapper with aspect ratio to keep pins aligned */}
          <div className="relative w-full max-w-[550px] aspect-[0.9] mx-auto">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              {/* THE MAP IMAGE */}
              <img
                src={mapImg}
                alt="India Presence"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] brightness-110 contrast-125"
              />

              {/* INTERACTIVE PINS */}
              {locations.map((loc, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ top: loc.top, left: loc.left }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 + (i * 0.05), type: "spring", stiffness: 150 }}
                  viewport={{ once: true }}
                >
                  <div className="relative group/pin -translate-x-1/2 -translate-y-1/2">
                    {/* Ripple Effect */}
                    <div className="absolute inset-0 bg-[#FFA62B] rounded-full animate-ping opacity-30 scale-[2] md:scale-150" />
                    <div className="absolute inset-0 bg-[#FFA62B] rounded-full animate-pulse opacity-20 scale-110" />

                    <MapPin
                      className="w-4 h-4 md:w-6 md:h-6 text-[#FFA62B] transition-transform duration-300 group-hover/pin:-translate-y-1.5 cursor-pointer"
                      fill="#010B0A"
                    />

                    {/* Premium Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/pin:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover/pin:translate-y-0 z-50">
                      <div className="bg-[#0F5B54]/90 backdrop-blur-md text-white text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold py-1.5 px-3 md:py-2 md:px-4 rounded-full border border-white/20 shadow-xl whitespace-nowrap">
                        {loc.name}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT: TEXT CONTENT */}
        <motion.div
          className="space-y-8 order-2 lg:order-2"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="space-y-4 text-center lg:text-left">
            <motion.span
              className="text-[#0F5B54] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Nationwide Excellence
            </motion.span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white italic tracking-tighter uppercase leading-[0.9] lg:leading-[0.85]">
              Our <br className="hidden lg:block" /> <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Presence</span>
            </h2>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <p className="text-lg md:text-2xl text-white/90 font-light italic leading-relaxed">
              Serving <span className="text-[#FFA62B] font-bold">10+ States</span> with precision and surgical efficiency.
            </p>
          </div>

          {/* PREMIUM BENTO STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="group bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] hover:bg-[#0F5B54]/20 transition-all duration-500">
              <Zap className="text-[#FFA62B] mb-3 md:mb-4 group-hover:rotate-12 transition-transform" size={20} />
              <h4 className="text-4xl md:text-5xl font-black text-white italic mb-1">15+</h4>
              <p className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">Strategic Hubs</p>
            </div>

            <div className="group bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] hover:bg-[#0F5B54]/20 transition-all duration-500">
              <Award className="text-[#FFA62B] mb-3 md:mb-4 group-hover:scale-110 transition-transform" size={20} />
              <h4 className="text-4xl md:text-5xl font-black text-white italic mb-1">500+</h4>
              <p className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">Flagship Projects</p>
            </div>
          </div>

          <motion.div
            whileHover={{ x: 10 }}
            className="flex items-center justify-center lg:justify-start gap-4 text-[#FFA62B] text-[10px] md:text-xs font-black uppercase tracking-[0.3em] cursor-pointer pt-2 group"
          >
            Explore Portfolio <div className="h-px w-8 md:w-12 bg-[#FFA62B] group-hover:w-16 md:group-hover:w-24 transition-all" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}