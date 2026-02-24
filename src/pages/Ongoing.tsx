"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Activity, Globe, ChevronRight, MoveRight, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import api, { BASE_URL } from "../services/api";
import banner from '../assets/corporate3.jpg';
import { HARDCODED_ONGOING_PROJECTS } from "../data/ongoingProjects";
import { mergeProjectsWithApi } from "../utils/projectMerge";

// Helper to open the header popup
const openContactPopup = () => {
  window.dispatchEvent(new Event("open-contact"));
};

export default function OngoingBiophilicProjects() {
  const [apiProjects, setApiProjects] = useState<any[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/public/projects");
      const data = res.data;
      if (data && data.length > 0) {
        setApiProjects(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const FINAL_PROJECTS = useMemo(() => {
    const merged = mergeProjectsWithApi(HARDCODED_ONGOING_PROJECTS, apiProjects, true);
    return merged.filter((p: any) => p.status === 'ongoing');
  }, [apiProjects]);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <div className="bg-black min-h-screen text-white font-sans overflow-x-hidden selection:bg-[#c9a050] selection:text-black">

      {/* 1. CINEMATIC PARALLAX HERO */}
      <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ scale, opacity }}>
          <img
            src={banner}
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
            Sustainable projects transforming landscape
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
          {FINAL_PROJECTS.map((project: any) => (
            <motion.div
              key={project.id}
              className="relative min-h-screen md:h-screen w-full flex items-center justify-center overflow-hidden py-20 md:py-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1 }}
            >
              <motion.img
                // Handle different image sources (Hardcoded import vs API URL)
                src={project.image_url || project.img}
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
                    {project.address || project.description}. <br /> Currently at {project.progress}% completion, executing high-performance architectural standards.
                  </p>
                  <Link to="/contact" className="flex items-center gap-3 text-[#c9a050] hover:text-white transition-colors mx-auto md:mx-0">
                    <span className="text-[10px] md:text-md font-black uppercase tracking-[0.2em]">Know more</span>
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

      {/* 3. PREMIUM MINIMAL CALL TO ACTION */}
      <section className="py-14 md:py-26 bg-black relative overflow-hidden px-6 text-center">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#c9a050]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-[#c9a050] font-black text-[10px] md:text-xs tracking-[0.6em] uppercase block mb-10">
              Start Your Transformation
            </span>

            <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-12 italic">
              Ready to <br />
              <span className="text-transparent font-outline" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.5)' }}>
                Collaborate?
              </span>
            </h2>

            <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto mb-16">
              We are currently accepting a limited number of premium residential and commercial commissions for the upcoming quarter.
            </p>

            <motion.button
              onClick={openContactPopup}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-6 px-12 py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-[12px] rounded-full transition-all hover:bg-[#c9a050] hover:text-white"
            >
              Consult with an Architect
              <MoveRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </motion.button>


          </motion.div>
        </div>
      </section>
    </div>
  );
}