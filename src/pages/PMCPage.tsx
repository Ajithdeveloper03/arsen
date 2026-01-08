"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";
import { 
  ArrowRight, Users, Microscope, 
  FileText, CheckCircle2, Zap, Crosshair
} from "lucide-react";

// Animation Presets
const lusionTransition = { duration: 1.2, ease: [0.22, 1, 0.36, 1] };

const PMC = () => {
  const { scrollYProgress } = useScroll();
  
  // Parallax transforms - subtle scaling for mobile performance
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);

  return (
    <div className="bg-[#021412] text-white selection:bg-[#FDBA74] overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-[100svh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ scale: imageScale }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" 
            className="w-full h-full object-cover opacity-30 grayscale"
            alt="Architecture Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#021412]/60 via-transparent to-[#021412]" />
        </motion.div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={lusionTransition}
          >
            <span className="text-[#FDBA74] tracking-[0.4em] md:tracking-[0.8em] uppercase text-[9px] md:text-[10px] font-bold mb-4 block">
              Architectural Precision
            </span>
            <h1 className="text-[15vw] md:text-[10vw] font-black leading-[0.9] mb-6 uppercase">
              Execution <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px #fff' }}>Is Art</span>
            </h1>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-12 md:h-20 bg-gradient-to-b from-[#FDBA74] to-transparent"
        />
      </section>

      {/* 2. THE BENTO CORE */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-[#021412]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Main Stat Card */}
          <motion.div 
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            className="md:col-span-2 bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] text-[#021412] flex flex-col justify-between min-h-[300px]"
          >
            <h2 className="text-2xl md:text-4xl font-bold leading-tight">We manage the chaos, <br/> you enjoy the <span className="italic">creation.</span></h2>
            <div className="flex items-center gap-4 mt-8">
               <div className="text-5xl md:text-6xl font-black italic"><CountUp end={1100} enableScrollSpy />+</div>
               <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-60">Projects <br/> Handed Over</p>
            </div>
          </motion.div>

          {/* Efficiency Card */}
          <motion.div 
             whileInView={{ opacity: 1, y: 0 }}
             initial={{ opacity: 0, y: 20 }}
             className="bg-[#FDBA74] p-8 rounded-[2rem] md:rounded-[3rem] text-[#021412]"
          >
             <Zap size={32} strokeWidth={3} className="mb-6" />
             <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-2">25% Faster</h3>
             <p className="text-xs md:text-sm font-medium opacity-80 leading-relaxed">Reduction in turnaround time through systematic WBS planning.</p>
          </motion.div>

          {/* Visual Link Card */}
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            className="relative h-[250px] md:h-auto rounded-[2rem] md:rounded-[3rem] overflow-hidden group"
          >
             <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070" className="w-full h-full object-cover grayscale md:group-hover:grayscale-0 transition-all duration-700" alt="Consultation" />
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white text-black flex items-center justify-center active:scale-90 md:hover:scale-110 transition-transform">
                    <ArrowRight size={20} />
                </button>
             </div>
          </motion.div>
        </div>
      </section>

      {/* 3. THE METHODOLOGY */}
      <section className="py-20 md:py-32 px-4 md:px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 md:gap-20">
          <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6">Our <br className="hidden lg:block" /><span className="text-[#FDBA74]">Methodology</span></h2>
            <p className="text-gray-500 mb-8 text-sm md:text-base">A scientific approach to interior execution, ensuring every sq.ft is accounted for.</p>
            <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600" className="rounded-2xl opacity-50 grayscale hidden lg:block" alt="Tech" />
          </div>
          
          <div className="lg:w-2/3 space-y-8 md:space-y-12">
            {[
              { title: "Project Audit", icon: Microscope, text: "Initial deep dive into quantities and material specs to prevent budget overruns." },
              { title: "Vendor Symphony", icon: Users, text: "Aligning contractors and specialists like a conductor for seamless site flow." },
              { title: "Precision Control", icon: Crosshair, text: "Zero-tolerance quality checks at every milestone of construction." },
              { title: "Transparent Reporting", icon: FileText, text: "Cloud-based weekly reports with live site images for 100% visibility." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col md:flex-row gap-4 md:gap-8 pb-8 md:pb-12 border-b border-white/10"
              >
                <div className="text-[#FDBA74]"><item.icon size={28} /></div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 uppercase tracking-tight">{item.title}</h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VISUAL PROOF */}
      <section className="py-12 md:py-20 bg-white">
          <div className="max-w-[95vw] md:max-w-[90vw] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              className="h-[400px] md:h-[600px] rounded-[2rem] md:rounded-[3rem] overflow-hidden relative"
            >
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070" className="w-full h-full object-cover" alt="Luxury Interior" />
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
                  <p className="text-[10px] uppercase font-bold tracking-[0.3em]">Phase 04</p>
                  <h4 className="text-xl md:text-3xl font-bold italic">Execution Excellence</h4>
                </div>
            </motion.div>
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              className="h-[400px] md:h-[600px] rounded-[2rem] md:rounded-[3rem] overflow-hidden relative md:mt-20"
            >
                <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070" className="w-full h-full object-cover" alt="Construction Site" />
                <div className="absolute top-6 right-6 md:top-10 md:right-10 text-white text-right">
                  <p className="text-[10px] uppercase font-bold tracking-[0.3em]">Site Management</p>
                  <h4 className="text-xl md:text-3xl font-bold italic">Uncompromised Safety</h4>
                </div>
            </motion.div>
          </div>
      </section>

      {/* 5. CLIENT TRUST AREA */}
      <section className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
           <h2 className="text-3xl md:text-5xl font-black mb-10 md:mb-16 leading-tight">Expertise You <br /><span className="text-[#FDBA74]">Can Trust.</span></h2>
           <div className="grid gap-3 md:gap-4 text-left">
             {[
               "Certified project managers with 15+ years experience.",
               "Real-time budget tracking, zero hidden escalation.",
               "Strict adherence to IS Codes & safety regulations.",
               "Full documentation and snag-clearance handover."
             ].map((text, i) => (
               <motion.div 
                 key={i}
                 whileInView={{ opacity: 1, x: 0 }}
                 initial={{ opacity: 0, x: -10 }}
                 className="p-4 md:p-6 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl flex items-center gap-4 md:gap-6"
               >
                 <CheckCircle2 size={20} className="text-[#FDBA74] shrink-0" />
                 <span className="text-sm md:text-lg font-medium">{text}</span>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* 6. IMMERSIVE CTA */}
      <section className="relative py-24 md:py-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600" className="w-full h-full object-cover" alt="Office" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-9xl font-black italic mb-10 tracking-tighter leading-none"
          >
            "We Manage. <br /> <span className="text-[#FDBA74]">You Relax."</span>
          </motion.h2 >
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="w-full md:w-auto bg-white text-[#021412] px-10 md:px-16 py-5 md:py-6 rounded-full font-black uppercase text-[10px] md:text-sm tracking-[0.2em] shadow-2xl"
          >
            Initiate Project Audit
          </motion.button>
        </div>
      </section>

    </div>
  );
};

export default PMC;