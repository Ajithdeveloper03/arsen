"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { MapPin, ArrowUpRight, X, Briefcase, Users, Star, Globe, Filter, Upload, Send, CheckCircle2 } from "lucide-react";

const vacancies = [
  {
    id: "J-101",
    title: "Senior Project Manager",
    dept: "Project Management",
    loc: "Trichy",
    salary: "Competitive",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
    specs: ["12–15 Years Experience", "Luxury Residential Background", "International Vendor Management"]
  },
  {
    id: "J-102",
    title: "Lead Interior Architect",
    dept: "Design Studio",
    loc: "Remote ",
    salary: "Industry Standard",
    img: "https://cdn.pixabay.com/photo/2015/04/20/06/46/office-730681_1280.jpg",
    specs: ["Concept to Execution", "Revit & Rhino Proficiency", "High-End FF&E Knowledge"]
  },
  {
    id: "J-103",
    title: "Visualizer (CGI)",
    dept: "Creative Team",
    loc: "Chennai",
    salary: "Based on Portfolio",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200",
    specs: ["Unreal Engine Expertise", "Photorealistic Rendering", "3ds Max & V-Ray"]
  }
];

const Careers = () => {
  const [activeJob, setActiveJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowForm(false);
      setActiveJob(null);
    }, 3000);
  };

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
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {[
            { icon: <Globe size={38}/>, title: "Global Presence", desc: "Projects spanning Dubai, Mumbai, and London." },
            { icon: <Star size={38}/>, title: "Excellence First", desc: "A meticulous approach to every joint and finish." },
            { icon: <Users size={38}/>, title: "Diverse Culture", desc: "A home for architects, artists, and engineers." }
          ].map((item, idx) => (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} key={idx} className="space-y-4">
              <div className="text-[#2A6F72]">{item.icon}</div>
              <h4 className="text-2xl font-bold uppercase tracking-tight">{item.title}</h4>
              <p className="text-gray-500 leading-relaxed text-lg">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. JOB GRID */}
      <section className="px-6 md:px-12 lg:px-24 py-20 md:py-32 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-7xl font-medium mb-12">
          Current <span className="font-serif italic text-[#2A6F72]">Opportunities</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vacancies.map((job) => (
            <motion.div
              layoutId={job.id}
              key={job.id}
              onClick={() => setActiveJob(job)}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={job.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{job.title}</h3>
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                  <MapPin size={14} className="text-[#DFA45B]" /> {job.loc}
                </div>
                <span className="text-[10px] font-black text-[#DFA45B] uppercase tracking-widest">Explore Role →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. DEDICATED APPLICATION SECTION */}
      <section className="px-6 md:px-12 lg:px-24 mb-32">
        <div className="bg-[#2A6F72] rounded-[3rem] p-12 md:p-24 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to apply?</h2>
              <p className="text-white/70 text-lg">Send your portfolio and CV directly to our talent acquisition team.</p>
            </div>
            <button 
              onClick={() => { setShowForm(true); setActiveJob({ title: "General Application", id: "GEN" }); }}
              className="px-12 py-6 bg-[#DFA45B] hover:bg-white hover:text-[#0F1F2A] transition-all rounded-full font-bold uppercase tracking-widest text-xs shadow-2xl"
            >
              Open Application Form
            </button>
          </div>
        </div>
      </section>

      {/* JOB DETAIL & APPLICATION MODAL */}
      <AnimatePresence>
        {(activeJob || showForm) && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0F1F2A]/90 backdrop-blur-md flex items-center justify-center p-4 md:p-12 z-[100]"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-[2.5rem] w-full max-w-5xl max-h-[90vh] overflow-hidden relative shadow-2xl flex flex-col md:flex-row"
            >
              <button onClick={() => { setActiveJob(null); setShowForm(false); }} className="absolute top-6 right-6 z-[110] p-3 bg-gray-100 rounded-full hover:bg-red-500 hover:text-white transition-all">
                <X size={20} />
              </button>

              {/* Form Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar bg-gray-50">
                {formSubmitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <CheckCircle2 size={64} className="text-[#2A6F72]" />
                    <h3 className="text-2xl font-bold">Application Sent!</h3>
                    <p className="text-gray-500">Our team will review your profile and get back to you soon.</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <span className="text-[#DFA45B] font-black uppercase tracking-widest text-[10px]">Applying for:</span>
                      <h2 className="text-2xl font-bold text-[#0F1F2A]">{activeJob?.title}</h2>
                    </div>
                    <form onSubmit={handleFormSubmit} className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold text-gray-400">Full Name</label>
                          <input required type="text" className="w-full bg-white border border-orange-400 p-4 rounded-xl focus:ring-2 ring-[#DFA45B] outline-none"  />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold text-gray-400">Email Address</label>
                          <input required type="email" className="w-full bg-white border border-orange-400 p-4 rounded-xl focus:ring-2 ring-[#DFA45B] outline-none"  />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-gray-400">Portfolio Link (URL)</label>
                        <input type="url" className="w-full bg-white border border-orange-400 p-4 rounded-xl focus:ring-2 ring-[#DFA45B] outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-gray-400">Upload CV (PDF)</label>
                        <label className="w-full flex flex-col items-center justify-center bg-white border-2 border-dashed border-orange-400 p-8 rounded-xl cursor-pointer hover:border-[#DFA45B] transition-all">
                          <Upload size={24} className="text-gray-300 mb-2" />
                          <span className="text-xs text-gray-500">Click to upload file</span>
                          <input type="file" className="hidden" accept=".pdf" />
                        </label>
                      </div>
                      <button className="w-full bg-[#0F1F2A] text-white py-5 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#DFA45B] transition-all">
                        Submit Application <Send size={16} />
                      </button>
                    </form>
                  </>
                )}
              </div>

              {/* Info Side (Hidden on Mobile) */}
              <div className="hidden md:block w-1/2 relative bg-[#0F1F2A] text-white p-12">
                <img src={activeJob?.img} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-3xl font-serif italic text-[#DFA45B] mb-6">Why Arsen?</h3>
                    <p className="text-white/70 leading-relaxed mb-8">Join an award-winning team where design meets precision. We provide a platform for your creativity to reach global scales.</p>
                    <div className="space-y-4">
                      {['Global Exposure', 'Innovative Tools', 'High-End Projects'].map(t => (
                        <div key={t} className="flex items-center gap-3 text-sm font-bold uppercase tracking-tighter">
                          <CheckCircle2 size={16} className="text-[#DFA45B]" /> {t}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-8 border-t border-white/10 text-[10px] uppercase tracking-widest text-white/40">
                    Arsen Furnitures & Fixtures © 2026
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #dfa45b; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Careers;