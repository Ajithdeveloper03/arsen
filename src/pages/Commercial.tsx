"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, ShieldCheck, Zap, Maximize, 
  BarChart3, ChevronRight, Plus, Minus,
  PlayCircle, Building2, CheckCircle2,
  Briefcase, Activity, Landmark, Layers
} from "lucide-react";

/**
 * ARSEN COMMERCIAL: MAXIMIZED ANIMATION & VISUAL DEPTH
 * A "Cinematic Flow" layout with unique section-specific backgrounds.
 */

const ArsenCommercial = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="bg-[#0A0D0C] text-[#E8EDEA] antialiased selection:bg-[#008b98]">
      
      {/* 1. HERO: DYNAMIC PARALLAX SECTION */}
      <section className="relative h-[110vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 0.2], [0, 200]) }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070" 
            className="w-full h-full object-cover opacity-50 scale-110"
            alt="Glass Skyscraper"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0D0C] via-transparent to-[#0A0D0C]" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-12"
          >
            <h1 className="text-[13vw] md:text-[10vw] font-black leading-[0.95] tracking-tighter uppercase italic">
              Arsen <br />
              <span className="text-transparent font-outline" style={{ WebkitTextStroke: '2px #81d6de' }}>Commercial</span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <button className="group relative px-12 py-6 bg-[#008b98] rounded-full overflow-hidden transition-all">
              <span className="relative z-10 font-black uppercase tracking-widest text-xs flex items-center gap-2">
                Launch Project <ArrowUpRight size={16} />
              </span>
              <motion.div 
                whileHover={{ x: "100%" }}
                className="absolute inset-0 bg-white/20 -translate-x-full transition-transform duration-500" 
              />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. THE VISION: LIGHT MODE ARCHITECTURAL VELLUM */}
      <section className="py-40 bg-[#F5F5F0] text-[#0A0D0C] relative overflow-hidden">
        {/* Floating Background Image */}
        <motion.img 
          style={{ y: useTransform(scrollYProgress, [0.1, 0.4], [100, -100]) }}
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800"
          className="absolute right-[-5%] top-20 w-1/3 opacity-10 blur-sm pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <motion.div {...fadeInUp} className="inline-block px-4 py-1 border border-black/10 rounded-full text-[10px] font-bold uppercase tracking-[0.5em]">
              The Genesis Concept
            </motion.div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              Precision <br /> Meets <span className="text-[#008b98] italic font-serif lowercase">Poetry.</span>
            </h2>
            <p className="text-xl text-black/60 leading-relaxed max-w-lg">
              We transform raw blueprints into living corporate assets. Every junction, every conduit, and every panel is treated as a masterwork of engineering.
            </p>
            <div className="flex gap-10">
               <StatItem label="Precision Audit" val="146" unit="Points" color="#008b98" />
               <StatItem label="Speed to Market" val="25" unit="%" color="#008b98" />
            </div>
          </div>

          <div className="relative">
             <motion.div 
               style={{ rotate: useTransform(scrollYProgress, [0.1, 0.3], [0, 5]) }}
               className="rounded-[3rem] overflow-hidden shadow-2xl z-10 relative"
             >
               <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200" alt="Interior" />
             </motion.div>
             <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#008b98] rounded-[2rem] -z-10" />
          </div>
        </div>
      </section>

      {/* 3. SPECIALIZED GRID: DARK GLASS NEUMORPHISM */}
      <section className="py-40 bg-[#0A0D0C] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white">Specialized <br /> <span className="text-[#008b98]">Areas.</span></h2>
            <p className="text-white/40 max-w-xs uppercase text-[10px] tracking-[0.4em] leading-loose">Across retail, hospitality, and tech hubs.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <AreaCard index={1} title="Corporate" img="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800" />
            <AreaCard index={2} title="Hospitality" img="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800" />
            <AreaCard index={3} title="Retail HQ" img="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800" />
          </div>
        </div>
      </section>

      {/* 4. WORKFLOW: THE GRADIENT PATH */}
      <section className="py-40 bg-gradient-to-b from-[#0A0D0C] to-[#002b2e] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] opacity-20 pointer-events-none">
           <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#008b98_0%,_transparent_70%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-32">
             <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-white/10 mb-[-0.5em]">Workflow</h2>
             <h3 className="text-5xl md:text-7xl font-bold uppercase text-white">The Genesis Path</h3>
          </div>

          <div className="grid lg:grid-cols-4 gap-12">
            <WorkflowStep num="01" title="Discovery" icon={<Layers />} />
            <WorkflowStep num="02" title="Engineering" icon={<Zap />} />
            <WorkflowStep num="03" title="Execution" icon={<Maximize />} />
            <WorkflowStep num="04" title="Handover" icon={<CheckCircle2 />} />
          </div>
        </div>
      </section>

      {/* 5. WHY ARSEN: BENTO GRID ANIMATION */}
      <section className="py-40 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-[1000px] md:h-[600px]">
             <motion.div whileHover={{ scale: 0.98 }} className="md:col-span-2 md:row-span-2 bg-gray-100 rounded-[3rem] p-12 flex flex-col justify-between overflow-hidden relative group">
                <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000" />
                <h4 className="text-4xl font-black uppercase relative z-10">146-Point <br /> Audit.</h4>
                <p className="text-black/60 relative z-10">Every square inch is verified against the Arsen Master Standard.</p>
             </motion.div>
             <motion.div whileHover={{ scale: 0.98 }} className="md:col-span-2 bg-[#008b98] rounded-[3rem] p-12 text-white flex items-center justify-between">
                <h4 className="text-3xl font-black uppercase">Zero <br /> Escalation.</h4>
                <ShieldCheck size={60} strokeWidth={1} />
             </motion.div>
             <motion.div whileHover={{ scale: 0.98 }} className="bg-black rounded-[3rem] p-8 text-white flex flex-col justify-center text-center">
                <p className="text-5xl font-black italic">365</p>
                <p className="text-[10px] uppercase font-bold tracking-widest mt-2">Support Days</p>
             </motion.div>
             <motion.div whileHover={{ scale: 0.98 }} className="bg-gray-200 rounded-[3rem] p-8 flex flex-col justify-center text-center border border-black/5">
                <Activity size={40} className="mx-auto text-[#008b98]" />
                <p className="text-[10px] uppercase font-bold tracking-widest mt-4 text-black/40">Real-time Data</p>
             </motion.div>
          </div>
        </div>
      </section>

      {/* 6. FAQS: MINIMALIST DARK DESIGN */}
      <section className="py-40 bg-[#0A0D0C] px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold uppercase tracking-tighter text-white mb-20 text-center">Intelligence <span className="text-[#008b98]">Briefing.</span></h2>
          <div className="space-y-6">
            <FaqAccordion q="How is the budget frozen?" a="We utilize a proprietary pre-mobilization audit that validates every material quantity against current market indices." active={activeFaq} idx={1} setActive={setActiveFaq} />
            <FaqAccordion q="What is the Arsen Warranty?" a="Our execution comes with a 2-year structural and 1-year finish warranty, backed by our 365-day service team." active={activeFaq} idx={2} setActive={setActiveFaq} />
          </div>
        </div>
      </section>
      
    </div>
  );
};

// --- ANIMATION COMPONENTS ---

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

const StatItem = ({ label, val, unit, color }: any) => (
  <motion.div {...fadeInUp}>
    <p className="text-4xl font-black" style={{ color }}>{val}<span className="text-sm ml-1 uppercase">{unit}</span></p>
    <p className="text-[10px] uppercase font-black tracking-widest text-black/40 mt-1">{label}</p>
  </motion.div>
);

const AreaCard = ({ index, title, img }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="group relative h-[450px] rounded-[3rem] overflow-hidden"
  >
    <img src={img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent p-10 flex flex-col justify-end">
      <h4 className="text-3xl font-black uppercase text-white">{title}</h4>
      <div className="h-0 group-hover:h-12 overflow-hidden transition-all duration-500 mt-4">
        <button className="text-[#008b98] font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
          View Case Study <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  </motion.div>
);

const WorkflowStep = ({ num, title, icon }: any) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] text-center space-y-6 group hover:border-[#008b98]/50 transition-all"
  >
    <div className="w-16 h-16 rounded-full bg-[#008b98]/20 text-[#008b98] flex items-center justify-center mx-auto text-2xl group-hover:bg-[#008b98] group-hover:text-white transition-all">
      {icon}
    </div>
    <div>
      <p className="text-[#008b98] font-bold text-xs uppercase mb-2">{num}</p>
      <h4 className="text-xl font-bold uppercase text-white">{title}</h4>
    </div>
  </motion.div>
);

const FaqAccordion = ({ q, a, idx, active, setActive }: any) => {
  const isOpen = active === idx;
  return (
    <div className="border border-white/10 rounded-[2rem] overflow-hidden transition-all hover:border-[#008b98]/50">
      <button onClick={() => setActive(isOpen ? null : idx)} className="w-full p-8 flex justify-between items-center text-left text-white">
        <span className="text-xl font-bold uppercase tracking-tight">{q}</span>
        {isOpen ? <Minus /> : <Plus />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="px-8 pb-8 text-white/50 text-sm leading-relaxed">
            {a}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArsenCommercial;