"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

export default function ProjectCard({ project, index }) {
  // We use different heights for the cards based on index to create a Masonry look
  const isTall = index % 3 === 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative group w-full overflow-hidden rounded-xl bg-white/5 cursor-pointer ${
        isTall ? "aspect-[3/4]" : "aspect-square"
      }`}
    >
      {/* IMAGE LAYER */}
      <div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-110">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      </div>

      {/* TEXT OVERLAY */}
      <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
        <div className="flex items-center gap-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
           <MapPin size={12} className="text-[#D4AF37]" />
           <span className="text-[10px] text-white/60 tracking-widest uppercase">{project.location}</span>
        </div>
        
        <h3 className="text-3xl text-white font-light tracking-tight mb-2">
          {project.title}
        </h3>
        
        <div className="h-0 group-hover:h-12 overflow-hidden transition-all duration-500 flex items-center justify-between border-t border-white/20 mt-4">
           <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest">
             {project.category}
           </span>
           <ArrowUpRight size={18} className="text-white" />
        </div>
      </div>

      {/* TECHNICAL OVERLAY (Gives it that interior design 'spec' look) */}
      <div className="absolute top-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="text-[9px] font-mono text-white/40 leading-none">
          REF: {project.id.slice(0, 8).toUpperCase()} <br />
          SQFT: {project.area || '2,400'}
        </div>
      </div>
    </motion.div>
  );
}