"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, LayoutGrid, ArrowUpRight } from "lucide-react";

// --- DYNAMIC DATA GENERATION ---
const ALL_PROJECTS = Array.from({ length: 120 }).map((_, i) => ({
  id: i,
  title: ["Serene Shores Villa", "Adyar Elite Residence", "ECR Coastal Haven", "Boat Club Luxe", "Chettinad Modern Manor", "Anna Nagar Pinnacle", "Velachery Grand", "OMR Skyline Residence"][i % 8],
  category: ["Residential", "Commercial", "Hospitality", "Luxe Detail"][i % 4],
  location: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tiruppur", "Erode", "Thoothukudi"][i % 8],
  image: `https://images.unsplash.com/photo-${
    [
      "1505843513577-22bb7d21e455",
      "1613977257363-707ba9348227",
      "1580587771525-78b9dba3b914",
      "1512917774080-9991f1c4c750",
      "1591474200742-8e512e6f98f8",
      "1544984243-ec57ea16fe25",
      "1593714604578-d9e41b00c6c6",
      "1613545325278-f24b0cae1224"
    ][i % 8]
  }?q=80&w=1200&auto=format&fit=crop`,
  isLarge: i % 8 === 0 
}));

const CATEGORIES = ["All", "Residential", "Commercial", "Hospitality", "Luxe Detail"];

export default function ArsenArchive() {
  const [filter, setFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(20);

  const filtered = useMemo(() => 
    ALL_PROJECTS.filter(p => filter === "All" || p.category === filter),
    [filter]
  );

  const displayedProjects = filtered.slice(0, visibleCount);

  return (
    <div className="bg-[#050707] min-h-screen text-white font-sans selection:bg-[#F28C28] overflow-x-hidden">
      
      {/* 1. KINETIC HERO */}
      <section className="relative h-[70vh] md:h-[85vh] w-full flex items-center justify-center overflow-hidden border-b border-white/5 px-6">
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
            className="w-full h-full"
          >
            <img 
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2000&auto=format&fit=crop" 
              alt="Luxury Villa Architecture"
              className="w-full h-full object-cover opacity-35 grayscale"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050707] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center w-full max-w-5xl">
          <motion.span 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-[8px] md:text-[10px] font-black tracking-[0.5em] md:tracking-[1em] text-[#F28C28] uppercase block"
          >
            Tamil Nadu Legacy Developments
          </motion.span>
          <h1 className="text-[12vw] md:text-[9vw] font-black leading-[0.9] md:leading-[0.85] tracking-tighter mt-6 uppercase break-words">
            Completed <br /> 
            <span className="text-outline text-transparent italic" style={{ WebkitTextStroke: '1px #fff' }}>
              Masterpieces
            </span>
          </h1>
        </div>
      </section>

      {/* 2. DYNAMIC FILTER NAVIGATION */}
      <nav className="sticky top-0 z-[100] bg-[#050707]/95 backdrop-blur-2xl border-b border-white/5 py-4 md:py-8">
        <div className="max-w-[1600px] mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          
          {/* Scrollable container for mobile buttons */}
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
            <div className="flex flex-nowrap md:flex-wrap gap-2 p-1 bg-white/5 rounded-full border border-white/10 w-max md:w-auto mx-auto md:mx-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setFilter(cat); setVisibleCount(20); }}
                  className={`whitespace-nowrap px-4 md:px-6 py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                    filter === cat ? "bg-[#F28C28] text-black" : "text-white/40 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            <LayoutGrid size={12} className="hidden md:block" /> 
            <span>{filtered.length} Completed Projects</span>
          </div>
        </div>
      </nav>

      {/* 3. THE ARCHIVE MATRIX */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-10 py-12 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[350px] md:auto-rows-[450px]">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`group relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#0F1111] border border-white/5 transition-all duration-500 hover:border-[#F28C28]/40 ${
                  project.isLarge ? "sm:col-span-2 sm:row-span-1" : ""
                }`}
              >
                {/* Mobile Friendly Link Indicator */}
                <div className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 md:bg-white/10 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={16} />
                </div>

                {/* Project Image */}
                <div className="h-[60%] md:h-[65%] w-full overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110 sm:grayscale sm:group-hover:grayscale-0"
                  />
                </div>

                {/* Project Details */}
                <div className="p-5 md:p-8 h-[40%] md:h-[35%] flex flex-col justify-between">
                  <div>
                    <span className="text-[8px] md:text-[9px] font-black text-[#F28C28] tracking-[0.2em] uppercase">
                      {project.location}, TN
                    </span>
                    <h3 className="text-lg md:text-xl font-bold uppercase tracking-tighter mt-1 leading-tight">
                      {project.title}
                    </h3>
                  </div>
                  <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                    {project.category}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 4. LOAD MORE */}
        {visibleCount < filtered.length && (
          <div className="mt-20 md:mt-32 flex flex-col items-center px-4">
            <button 
              onClick={() => setVisibleCount(v => v + 20)}
              className="w-full md:w-auto group relative flex items-center justify-center gap-4 md:gap-8 px-8 md:px-16 py-6 md:py-8 rounded-full bg-white text-black transition-all duration-300 active:scale-95"
            >
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">
                Reveal Next 20
              </span>
              <Plus size={18} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
            <p className="mt-6 text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-20 text-center">
              Showing {visibleCount} of {filtered.length} Archives
            </p>
          </div>
        )}
      </section>

      <style jsx>{`
        .text-outline {
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}