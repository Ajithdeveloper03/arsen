import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Globe, Award, Zap } from "lucide-react";
import map from "../assets/map.png";

export default function PremiumPresenceSection() {
  const mapImg = map;

  const locations = [
    { name: "Chandigarh", top: "13%", left: "33%" },
    { name: "Delhi", top: "20%", left: "34%" },
    { name: "Jaipur", top: "29%", left: "28%" },
    { name: "Ahmedabad", top: "43%", left: "20%" },
    { name: "Mumbai", top: "58%", left: "23%" },
    { name: "Pune", top: "62%", left: "26%" },
    { name: "Hyderabad", top: "60%", left: "45%" },
    { name: "Bangalore", top: "71%", left: "43%" },
    { name: "Chennai", top: "78%", left: "43%" },
    { name: "Kolkata", top: "42%", left: "72%" },
  ];

  return (
    <section className="relative py-32 bg-[#010B0A] overflow-hidden">
      {/* PREMIMUM BACKGROUND ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0F5B54]/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FFA62B]/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">

        {/* LEFT: 3D FLOATING MAP CONTAINER */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Subtle Glow Behind Map */}
          <div className="absolute inset-0 bg-[#0F5B54]/30 blur-[100px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000" />

          <div className="relative w-full max-w-[600px] aspect-[0.9] mx-auto perspective-1000">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
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
                  transition={{ delay: 0.5 + (i * 0.1), type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                >
                  <div className="relative group/pin -translate-x-1/2 -translate-y-1/2">
                    {/* Ripple Effect */}
                    <div className="absolute inset-0 bg-[#FFA62B] rounded-full animate-ping opacity-40 scale-150" />
                    <div className="absolute inset-0 bg-[#FFA62B] rounded-full animate-pulse opacity-20 scale-110" />

                    <MapPin
                      className="w-5 h-5 md:w-7 md:h-7 text-[#FFA62B] transition-transform duration-300 group-hover/pin:-translate-y-2 cursor-pointer"
                      fill="#010B0A"
                    />

                    {/* Premium Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover/pin:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover/pin:translate-y-0">
                      <div className="bg-[#0F5B54] backdrop-blur-md text-white text-[10px] uppercase tracking-[0.2em] font-bold py-2 px-4 rounded-full border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] whitespace-nowrap">
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
          className="space-y-8"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="space-y-4 text-center lg:text-left">
            <motion.span
              className="text-[#0F5B54] font-black uppercase tracking-[0.3em] text-xs inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Nationwide Excellence
            </motion.span>
            <h2 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-[0.85]">
              Our <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>Presence</span>
            </h2>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <p className="text-2xl text-white/90 font-light italic leading-relaxed">
              Serving <span className="text-[#FFA62B] font-bold">10+ States</span> with precision and surgical efficiency.
            </p>
            {/* <p className="text-white/40 text-sm md:text-base font-medium max-w-lg mx-auto lg:mx-0 leading-loose uppercase tracking-widest">
              From corporate hubs in Delhi to luxury retail in Bangalore, Arsen Interio delivers high-impact commercial solutions everywhere.
            </p> */}
          </div>

          {/* PREMIUM BENTO STATS */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="group bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] hover:bg-[#0F5B54]/20 transition-all duration-500">
              <Zap className="text-[#FFA62B] mb-4 group-hover:rotate-12 transition-transform" size={24} />
              <h4 className="text-5xl font-black text-white italic mb-1">15+</h4>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">Strategic Hubs</p>
            </div>

            <div className="group bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] hover:bg-[#0F5B54]/20 transition-all duration-500">
              <Award className="text-[#FFA62B] mb-4 group-hover:scale-110 transition-transform" size={24} />
              <h4 className="text-5xl font-black text-white italic mb-1">500+</h4>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">Flagship Projects</p>
            </div>
          </div>

          <motion.div
            whileHover={{ x: 10 }}
            className="flex items-center gap-4 text-[#FFA62B] text-xs font-black uppercase tracking-[0.3em] cursor-pointer pt-2 group"
          >
            Explore Portfolio <div className="h-px w-12 bg-[#FFA62B] group-hover:w-24 transition-all" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}