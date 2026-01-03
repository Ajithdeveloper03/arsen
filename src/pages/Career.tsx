import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { MapPin, ArrowUpRight, X, Briefcase, Users, Star, Globe } from "lucide-react";

const theme = {
  gold: "#DFA45B",
  teal: "#2A6F72",
  stone: "#0F1F2A",
  softWhite: "#F5F5F2",
  accent: "#E2E8F0"
};

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
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="bg-[#F5F5F2] font-sans text-[#0F1F2A] selection:bg-[#DFA45B] selection:text-white">

      {/* 1. LUXURY HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0F1F2A]">
        <motion.div style={{ y: y1 }} className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1618219944342-824e40a13285?w=1800"
            className="w-full h-full object-cover scale-110"
            alt="Interior Background"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F1F2A]/50 to-[#0F1F2A]" />

        <div className="relative z-10 text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block border border-[#DFA45B] text-[#DFA45B] px-4 py-1 rounded-full text-sm tracking-[0.2em] mb-4 uppercase"
          >
            Artistry in Execution
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-9xl font-medium text-white leading-none tracking-tighter"
          >
            Join the <span className="italic font-serif text-[#DFA45B]">Arsen</span><br />Legacy.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-white/50 max-w-xl mx-auto text-lg font-light leading-relaxed"
          >
            We don’t just hire employees; we curate a collective of visionaries dedicated to redefining luxury living across the globe.
          </motion.p>
        </div>

        {/* Floating Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#DFA45B] to-transparent" />
        </motion.div>
      </section>

      {/* 2. STATS / VALUES SECTION */}
      {/* <section className="py-24 px-8 lg:px-24 grid md:grid-cols-3 gap-12 border-b border-gray-200">
        {[
          { icon: <Globe size={24}/>, title: "Global Presence", desc: "Projects spanning Dubai, Mumbai, and London." },
          { icon: <Star size={24}/>, title: "Excellence First", desc: "A meticulous approach to every joint and finish." },
          { icon: <Users size={24}/>, title: "Diverse Culture", desc: "A home for architects, artists, and engineers." }
        ].map((item, idx) => (
          <div key={idx} className="space-y-4">
            <div className="text-[#2A6F72]">{item.icon}</div>
            <h4 className="text-xl font-bold uppercase tracking-tight">{item.title}</h4>
            <p className="text-gray-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section> */}

      {/* 3. MODERN JOB GRID */}
      <section className="px-8 lg:px-24 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2 className="text-5xl md:text-7xl font-medium ">Current <br /><span className="font-serif italic text-[#2A6F72]">Opportunities</span></h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">Filter by Department</p>
            <div className="flex gap-4">
              {['All', 'Design', 'Management'].map(tab => (
                <button key={tab} className="text-xs font-bold hover:text-[#DFA45B] transition-colors uppercase tracking-widest">{tab}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vacancies.map((job, i) => (
            <motion.div
              whileHover={{ y: -15 }}
              key={job.id}
              onClick={() => setActiveJob(job)}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              <div className="relative h-72 overflow-hidden">
                <img src={job.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  {job.dept}
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold tracking-tight group-hover:text-[#2A6F72] transition-colors">{job.title}</h3>
                  <ArrowUpRight className="text-gray-300 group-hover:text-[#DFA45B] transition-colors" size={24} />
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {job.loc}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span>{job.id}</span>
                </div>
                <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-xs font-bold text-[#DFA45B] uppercase tracking-widest underline underline-offset-8">Explore Role</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. SPECULATIVE SECTION */}
      <section className="mx-8 lg:mx-24 mb-32 bg-[#2A6F72] rounded-[3rem] p-12 md:p-24 text-white overflow-hidden relative">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-light leading-tight mb-6">Don’t see your <br />perfect fit?</h2>
            <p className="text-white/70 text-lg">We are always looking for exceptional designers, engineers, and creative thinkers. Send us your portfolio for future openings.</p>
          </div>
          <button className="px-10 py-5 bg-[#DFA45B] hover:bg-white hover:text-[#0F1F2A] transition-all rounded-full font-bold uppercase tracking-widest text-sm whitespace-nowrap">
            General Application
          </button>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
      </section>

      {/* MODERN MODAL */}
      <AnimatePresence>
        {activeJob && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0F1F2A]/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 z-[100]"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-[2rem] max-w-6xl w-full max-h-[90vh] overflow-hidden relative shadow-2xl"
            >
              <button
                onClick={() => setActiveJob(null)}
                className="absolute top-8 right-8 z-50 p-2 bg-gray-100 rounded-full hover:bg-[#DFA45B] hover:text-white transition-all"
              >
                <X size={20} />
              </button>

              <div className="grid md:grid-cols-2 h-full overflow-y-auto">
                <div className="h-64 md:h-full sticky top-0">
                  <img src={activeJob.img} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 md:p-16 space-y-10">
                  <div>
                    <span className="text-[#2A6F72] font-bold uppercase tracking-widest text-xs">{activeJob.dept}</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-2">{activeJob.title}</h2>
                    <p className="text-gray-400 mt-4 flex items-center gap-2"><MapPin size={18} /> {activeJob.loc}</p>
                  </div>

                  <div className="space-y-6">
                    <h4 className="font-bold uppercase tracking-tighter border-b pb-2">Key Requirements</h4>
                    <ul className="space-y-4">
                      {activeJob.specs.map((s, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600">
                          <div className="mt-1.5 w-1.5 h-1.5 bg-[#DFA45B] rounded-full flex-shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold">Salary Range</p>
                      <p className="text-xl font-bold text-[#0F1F2A]">{activeJob.salary}</p>
                    </div>
                    <button className="w-full md:w-auto px-12 py-4 bg-[#0F1F2A] text-white rounded-xl font-bold hover:bg-[#DFA45B] transition-colors uppercase tracking-widest text-xs">
                      Submit Application
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Careers;