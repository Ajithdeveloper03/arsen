"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { MapPin, ArrowUpRight, X, Briefcase, Users, Star, Globe, Filter } from "lucide-react";

const vacancies = [
  {
    id: "J-101",
    title: "Senior Project Manager",
    dept: "Project Management",
    loc: "Dubai, UAE",
    salary: "Competitive",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
    specs: ["12–15 Years Experience", "Luxury Residential Background", "International Vendor Management"]
  },
  {
    id: "J-102",
    title: "Lead Interior Architect",
    dept: "Design Studio",
    loc: "Remote / Mumbai",
    salary: "Industry Standard",
    img: "https://cdn.pixabay.com/photo/2015/04/20/06/46/office-730681_1280.jpg",
    specs: ["Concept to Execution", "Revit & Rhino Proficiency", "High-End FF&E Knowledge"]
  },
  {
    id: "J-103",
    title: "Visualizer (CGI)",
    dept: "Creative Team",
    loc: "Mumbai",
    salary: "Based on Portfolio",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200",
    specs: ["Unreal Engine Expertise", "Photorealistic Rendering", "3ds Max & V-Ray"]
  }
];

const Careers = () => {
  const [activeJob, setActiveJob] = useState(null);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div className="bg-[#F5F5F2] font-sans text-[#0F1F2A] selection:bg-[#DFA45B] selection:text-white overflow-x-hidden">

      {/* 1. LUXURY HERO SECTION */}
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden bg-[#0F1F2A]">
        <motion.div style={{ y: y1 }} className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1618219944342-824e40a13285?w=1800"
            className="w-full h-full object-cover scale-110"
            alt="Interior Background"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F1F2A]/60 to-[#0F1F2A]" />

        <div className="relative z-10 text-center px-6 w-full max-w-5xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block border border-[#DFA45B] text-[#DFA45B] px-4 py-1.5 rounded-full text-[10px] md:text-sm tracking-[0.2em] mb-6 uppercase"
          >
            Artistry in Execution
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl sm:text-7xl md:text-9xl font-medium text-white leading-[0.9] tracking-tighter"
          >
            Join the <span className="italic font-serif text-[#DFA45B]">Arsen</span><br />Legacy.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 md:mt-12 text-white/60 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed px-4"
          >
            We don’t just hire employees; we curate a collective of visionaries dedicated to redefining luxury living across the globe.
          </motion.p>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30"
        >
          <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-[#DFA45B] to-transparent" />
        </motion.div>
      </section>

      {/* 2. STATS / VALUES SECTION - RE-ENABLED & RESPONSIVE */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {[
            { icon: <Globe size={28}/>, title: "Global Presence", desc: "Projects spanning Dubai, Mumbai, and London." },
            { icon: <Star size={28}/>, title: "Excellence First", desc: "A meticulous approach to every joint and finish." },
            { icon: <Users size={28}/>, title: "Diverse Culture", desc: "A home for architects, artists, and engineers." }
          ].map((item, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={idx} 
              className="space-y-4"
            >
              <div className="text-[#2A6F72]">{item.icon}</div>
              <h4 className="text-xl font-bold uppercase tracking-tight">{item.title}</h4>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. MODERN JOB GRID */}
      <section className="px-6 md:px-12 lg:px-24 py-20 md:py-32 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-medium leading-[1.1]">
              Current <br />
              <span className="font-serif italic text-[#2A6F72]">Opportunities</span>
            </h2>
          </div>
          
          <div className="w-full md:w-auto overflow-x-auto pb-2">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Filter size={12}/> Filter by Department
            </p>
            <div className="flex gap-4 md:gap-6 whitespace-nowrap">
              {['All', 'Design', 'Management', 'Creative'].map(tab => (
                <button key={tab} className="text-[10px] md:text-xs font-bold hover:text-[#DFA45B] transition-colors uppercase tracking-[0.2em] border-b-2 border-transparent hover:border-[#DFA45B] pb-1">
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {vacancies.map((job) => (
            <motion.div
              layoutId={job.id}
              whileHover={{ y: -10 }}
              key={job.id}
              onClick={() => setActiveJob(job)}
              className="group cursor-pointer bg-white rounded-2xl md:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col"
            >
              <div className="relative h-60 md:h-72 overflow-hidden">
                <img src={job.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase shadow-sm">
                  {job.dept}
                </div>
              </div>

              <div className="p-6 md:p-8 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-[#2A6F72] transition-colors leading-tight">
                    {job.title}
                  </h3>
                  <ArrowUpRight className="text-gray-300 group-hover:text-[#DFA45B] transition-colors flex-shrink-0" size={24} />
                </div>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#DFA45B]" /> {job.loc}</span>
                  <span className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full" />
                  <span className="font-mono text-[10px] uppercase tracking-tighter bg-gray-50 px-2 py-0.5 rounded">{job.id}</span>
                </div>

                <div className="mt-auto pt-5 border-t border-gray-100">
                  <span className="text-[10px] font-black text-[#DFA45B] uppercase tracking-[0.2em] group-hover:gap-4 transition-all flex items-center gap-2">
                    Explore Role <div className="h-[1px] w-4 bg-[#DFA45B] group-hover:w-8 transition-all" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. SPECULATIVE SECTION */}
      <section className="px-6 md:px-12 lg:px-24 mb-24 md:mb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-[#2A6F72] rounded-[2rem] md:rounded-[3.5rem] p-10 md:p-24 text-white overflow-hidden relative"
        >
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10 text-center lg:text-left">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-light leading-tight mb-6 tracking-tight">
                Don’t see your <br className="hidden md:block" /> perfect fit?
              </h2>
              <p className="text-white/70 text-base md:text-xl font-light">
                We are always looking for exceptional designers, engineers, and creative thinkers. 
                Our team is built on talent, not just timing.
              </p>
            </div>
            <button className="w-full lg:w-auto px-10 py-5 bg-[#DFA45B] hover:bg-white hover:text-[#0F1F2A] transition-all rounded-full font-bold uppercase tracking-widest text-xs whitespace-nowrap shadow-xl">
              General Application
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
        </motion.div>
      </section>

      {/* MODERN MODAL - MOBILE OPTIMIZED */}
      <AnimatePresence>
        {activeJob && (
          <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0F1F2A]/95 backdrop-blur-lg flex items-end md:items-center justify-center p-0 md:p-8 lg:p-12 z-[100]"
          >
            <motion.div
              layoutId={activeJob.id}
              initial={{ y: "100%", opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white rounded-t-[2.5rem] md:rounded-[2.5rem] w-full max-w-6xl max-h-[95vh] md:max-h-[90vh] overflow-hidden relative shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveJob(null)}
                className="absolute top-6 right-6 z-[110] p-3 bg-white/90 md:bg-gray-100 rounded-full hover:bg-[#DFA45B] hover:text-white transition-all shadow-lg md:shadow-none"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 h-56 sm:h-72 md:h-auto relative overflow-hidden flex-shrink-0">
                <img src={activeJob.img} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:hidden" />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 overflow-y-auto custom-scrollbar">
                <div className="mb-8 md:mb-12">
                  <span className="text-[#2A6F72] font-black uppercase tracking-[0.3em] text-[10px]">
                    {activeJob.dept}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-bold mt-3 tracking-tight leading-[1.1]">
                    {activeJob.title}
                  </h2>
                  <div className="flex items-center gap-4 mt-5 text-gray-500 text-sm">
                    <p className="flex items-center gap-1.5"><MapPin size={16} className="text-[#DFA45B]" /> {activeJob.loc}</p>
                    <span className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                    <p className="font-mono">{activeJob.id}</p>
                  </div>
                </div>

                <div className="space-y-8 mb-12">
                  <div className="space-y-4">
                    <h4 className="font-black text-xs uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-3">Key Requirements</h4>
                    <ul className="space-y-4">
                      {activeJob.specs.map((s, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700 text-sm md:text-base leading-relaxed">
                          <div className="mt-2 w-1.5 h-1.5 bg-[#DFA45B] rounded-full flex-shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-black text-xs uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-3">Benefits</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {['Global Projects', 'Health Plan', 'Yearly Bonus', 'Flex Work'].map((b) => (
                        <div key={b} className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-xl">
                          <Star size={12} className="text-[#2A6F72]"/> {b}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 md:p-8 rounded-2xl md:rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-6 sticky bottom-0">
                  <div className="text-center sm:text-left">
                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Remuneration</p>
                    <p className="text-xl md:text-2xl font-bold text-[#0F1F2A]">{activeJob.salary}</p>
                  </div>
                  <button className="w-full sm:w-auto px-10 py-4 bg-[#0F1F2A] text-white rounded-xl font-bold hover:bg-[#DFA45B] transition-all uppercase tracking-widest text-[10px] shadow-lg active:scale-95">
                    Submit Application
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #dfa45b;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default Careers;