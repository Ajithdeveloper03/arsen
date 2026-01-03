import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, ChevronDown, Play, Maximize, MoveRight } from "lucide-react";

const EliteDesign = () => {
  return (
    <div className="bg-[#FCFCFA] text-[#010B0A] selection:bg-[#FDBA74]">
      {/* 1. THE MONOLITH HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#010B0A]">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Interior Architecture"
          />
        </motion.div>

        <div className="relative z-10 text-center uppercase">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="text-[#FDBA74] tracking-[1em] text-[10px] font-bold mb-8 block">
              Redefining Space
            </span>
            <h1 className="text-[14vw] md:text-[12vw] font-black leading-none tracking-tighter text-white italic">
              Arsen<span className="text-transparent font-outline" style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 1)' }}>Elite</span>
            </h1>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-10 text-white/40 text-[10px] tracking-widest font-bold rotate-90 origin-left">
          SCROLL TO EXPLORE
        </div>
      </section>

      {/* 2. THE FLOATING NARRATIVE (Asymmetrical) */}
      <section className="py-40 px-6 md:px-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 order-2 md:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
                Design <br /> <span className="text-[#FDBA74]">Without</span> <br /> Borders.
              </h2>
              <p className="text-gray-500 max-w-sm text-lg italic">
                "We don't just manage projects; we orchestrate symphonies of stone, light, and timber."
              </p>
              <button className="group flex items-center gap-6 text-xs font-black uppercase tracking-[0.4em] pt-4">
                The Methodology <MoveRight className="group-hover:translate-x-4 transition-transform text-[#FDBA74]" />
              </button>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            className="md:col-span-7 order-1 md:order-2 relative aspect-[4/5] md:aspect-video rounded-[4rem] overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200" 
              className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-[3s]"
              alt="Luxury Living"
            />
          </motion.div>
        </div>
      </section>

      {/* 3. THE "GALLERY SLIDE" SECTION */}
      <section className="bg-[#032d29] py-32 rounded-[5rem] overflow-hidden text-white">
        <div className="px-6 md:px-24 mb-20">
          <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">Our Focus Areas</h3>
        </div>

        <div className="flex gap-8 overflow-x-auto px-6 md:px-24 no-scrollbar pb-10">
          {[
            { title: "Bespoke Residential", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800" },
            { title: "Corporate Arenas", img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800" },
            { title: "Hospitality Elite", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800" },
            { title: "Retail Identity", img: "https://images.unsplash.com/photo-1555529669-2269763671c0?w=800" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -20 }}
              className="min-w-[300px] md:min-w-[450px] group relative h-[600px] rounded-[3rem] overflow-hidden"
            >
              <img src={item.img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-12 flex flex-col justify-end">
                <h4 className="text-3xl font-bold tracking-tighter italic uppercase">{item.title}</h4>
                <div className="w-0 group-hover:w-full h-1 bg-[#FDBA74] transition-all duration-700 mt-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. THE STATISTICAL MONUMENT */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
          <div className="grid grid-cols-2 gap-4 flex-1">
            <div className="h-64 bg-[#FDBA74] rounded-[3rem] p-10 flex flex-col justify-between italic">
               <Maximize size={32} />
               <p className="text-5xl font-black leading-none">1.1K+</p>
               <p className="text-[10px] font-bold uppercase tracking-widest">Projects</p>
            </div>
            <div className="h-64 bg-black text-white rounded-[3rem] p-10 flex flex-col justify-between">
               <div className="flex gap-1"><div className="w-2 h-2 bg-[#FDBA74] rounded-full animate-pulse" /></div>
               <p className="text-5xl font-black leading-none italic">230+</p>
               <p className="text-[10px] font-bold uppercase tracking-widest">Cities India-wide</p>
            </div>
          </div>
          <div className="flex-1 space-y-8">
            <h2 className="text-6xl font-black tracking-tighter uppercase leading-none">
              Data Driven. <br /> <span className="text-[#032d29]">Design Led.</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Our Project Management Consultancy (PMC) uses proprietary tracking systems to ensure 25% faster delivery than industry standards.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CINEMATIC CLOSURE */}
      <section className="relative py-60 flex items-center justify-center bg-[#010B0A] text-white rounded-t-[6rem] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <div className="relative z-10 text-center">
          <h2 className="text-7xl md:text-[10vw] font-black italic tracking-tighter uppercase mb-12">Ready?</h2>
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: "#FDBA74", color: "#000" }}
            className="px-20 py-8 border-2 border-white rounded-full font-black uppercase text-xs tracking-[0.6em] transition-all"
          >
            Initiate Consultation
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default EliteDesign;