"use client";

import React from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Activity, Globe, ChevronRight, Layers, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

// Helper to open the header popup
const openContactPopup = () => {
  window.dispatchEvent(new Event("open-contact"));
};

const PROJECTS = [
  {
    id: 1,
    title: "Temenos – KG360",
    progress: 92,
    location: "Perungudi, Chennai",
    img: "https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/640eff394904ce001dea70b8.jpg", // Modern Tech Park Interior
    address: "IT Business Park, Plot No. 232/1 Veera am Street, OMR Bypass Road"
  },
  {
    id: 2,
    title: "GMMCO",
    progress: 74,
    location: "Salem",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop", // Industrial/Corporate facade
    address: "Strategic Industrial Development"
  },
  {
    id: 3,
    title: "Sundaram Finance",
    progress: 85,
    location: "Mount Road, Chennai",
    img: "https://cdn.buildofy.com/projects/1809e23e-c606-43ce-a215-c6d42c03002f.jpeg", // Premium Financial HQ
    address: "Iconic Mount Road Landmark"
  }
];

export default function OngoingBiophilicProjects() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <div className="bg-black min-h-screen text-white font-sans overflow-x-hidden selection:bg-[#c9a050] selection:text-black">

      {/* 1. CINEMATIC PARALLAX HERO (UNCHANGED) */}
      <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ scale, opacity }}>
          <img
            src="https://amazingarchitecture.com/storage/1529/n_cube_villa_cubism_architects_and_interiors_india.jpg"
            alt="Biophilic Masterpiece"
            className="w-full h-full object-cover filter brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
        </motion.div>

        <motion.div
          className="relative z-10 text-center px-4 w-full max-w-5xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <span className="text-[10px] md:text-[12px] font-black tracking-[0.2em] md:tracking-[0.3em] text-[#c9a050] uppercase block mb-4 md:mb-8">
            Ongoing Projects
          </span>
          <h1 className="text-[15vw] md:text-[8vw] font-black uppercase tracking-tighter leading-[0.85] italic">
            Shaping <br className="md:hidden" /> <span className="text-[#c9a050]">Tomorrow</span>
          </h1>
          <p className="mt-6 text-white/60 text-lg md:text-lg font-medium uppercase tracking-[0.2em] md:tracking-widest max-w-lg mx-auto leading-relaxed">
            Sustainable projects transforming Tamil Nadu's landscape
          </p>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={24} className="text-[#c9a050] opacity-50" />
        </motion.div>
      </section>

      {/* 2. FULL-SCREEN PROJECT REVEALS */}
      <section className="relative">
        <AnimatePresence>
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              className="relative min-h-screen md:h-screen w-full flex items-center justify-center overflow-hidden py-20 md:py-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1 }}
            >
              <motion.img
                src={project.img}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35]"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 10 }}
              />
              <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black via-black/40 to-transparent" />

              <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 lg:gap-20 items-center">

                <motion.div
                  className="space-y-6 md:space-y-8 text-center md:text-left"
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="flex items-center justify-center md:justify-start gap-3 text-[#c9a050]">
                    <Globe size={18} />
                    <span className="text-xs md:text-sm font-black uppercase tracking-widest">{project.location}</span>
                  </div>
                  <h3 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter italic leading-none">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0">
                    {project.address}. <br /> Currently at {project.progress}% completion, executing high-performance architectural standards.
                  </p>
                  <Link to="/contact" className="flex items-center gap-3 text-[#c9a050] hover:text-white transition-colors mx-auto md:mx-0">
                    <span className="text-[10px] md:text-md font-black uppercase tracking-[0.2em]">View Details</span>
                    <ChevronRight size={16} />
                  </Link>
                </motion.div>

                <motion.div
                  className="bg-white/[0.03] backdrop-blur-xl p-6 md:p-10 rounded-[2rem] space-y-6 border border-white/10 w-full max-w-md mx-auto"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="flex justify-between items-end">
                    <span className="text-[14px] font-black uppercase tracking-widest text-white/40">Build Status</span>
                    <span className="text-5xl font-black text-[#c9a050] leading-none">{project.progress}%</span>
                  </div>

                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#c9a050]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${project.progress}%` }}
                      transition={{ duration: 2, ease: "circOut" }}
                    />
                  </div>

                  <div className="flex items-center gap-3 text-[#c9a050]/80">
                    <Activity size={18} className="animate-pulse" />
                    <span className="text-[14px] font-black uppercase tracking-widest">Execution Phase Live</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {/* 3. RESPONSIVE STATS FINALE (UNCHANGED) */}
      <section className="py-24 md:py-32 bg-black relative overflow-hidden px-6">
        <Layers className="absolute -top-20 -left-20 text-[#c9a050]/5 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rotate-12" />

        <div className="max-w-5xl mx-auto text-center space-y-12 md:space-y-16">
          <motion.h2
            className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            The <span className="text-[#c9a050]">Journey</span> <br className="md:hidden" /> Continues
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {[
              { label: "Ventures", value: "12+" },
              { label: "Cities", value: "10+" },
              { label: "Sustain", value: "100%" },
              { label: "Level", value: "MAX" },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <span className="text-3xl md:text-5xl font-black text-[#c9a050] block">{stat.value}</span>
                <span className="text-[8px] md:text-[14px] font-black uppercase tracking-[0.2em] text-white/40 block">{stat.label}</span>
              </div>
            ))}
          </div>

          <motion.button
            onClick={openContactPopup}
            className="w-full md:w-auto bg-[#c9a050] text-black px-12 md:px-20 py-5 md:py-6 rounded-full font-black uppercase tracking-[0.2em] text-[10px] md:text-xs"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Opportunities
          </motion.button>
        </div>
      </section>
    </div>
  );
}