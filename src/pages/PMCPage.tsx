import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";
import { 
  ArrowRight, ClipboardCheck, Users, Shield, 
  BarChart3, Search, FileText, CheckCircle2,
  Zap, Crosshair, Microscope
} from "lucide-react";

// Animation Presets
const lusionTransition = { duration: 1.2, ease: [0.22, 1, 0.36, 1] };

const PMC = () => {
  const { scrollYProgress } = useScroll();
  
  // Parallax transforms for images
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  return (
    <div className="bg-[#021412] text-white selection:bg-[#FDBA74]">
      
      {/* 1. CINEMATIC HERO - Focus on Scale & Perspective */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ scale: imageScale }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" 
            className="w-full h-full object-cover opacity-40 grayscale"
            alt="Architecture Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#021412]/50 via-transparent to-[#021412]" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={lusionTransition}
          >
            <span className="text-[#FDBA74] tracking-[0.8em] uppercase text-[10px] font-bold mb-4 block">
              Architectural Precision
            </span>
            <h1 className="text-7xl md:text-[10vw] font-black leading-none mb-6 mix-blend-difference uppercase">
              Execution <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #fff' }}>Is Art</span>
            </h1>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-[#FDBA74] to-transparent"
        />
      </section>

      {/* 2. THE BENTO CORE - Functional Stats */}
      <section className="py-20 px-6 bg-[#021412]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-2 bg-white p-12 rounded-[3rem] text-[#021412] flex flex-col justify-between"
          >
            <h2 className="text-4xl font-bold leading-tight">We manage the chaos, <br/> you enjoy the <span className="italic">creation.</span></h2>
            <div className="flex items-center gap-4 mt-8">
               <div className="text-6xl font-black italic"><CountUp end={1100} enableScrollSpy />+</div>
               <p className="text-xs font-bold uppercase tracking-widest opacity-60">Projects <br/> Handed Over</p>
            </div>
          </motion.div>

          <div className="bg-[#FDBA74] p-8 rounded-[3rem] text-[#021412]">
             <Zap size={40} strokeWidth={3} className="mb-6" />
             <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">25% Faster</h3>
             <p className="text-sm font-medium opacity-80">Reduction in project turnaround time through systematic WBS planning.</p>
          </div>

          <div className="relative rounded-[3rem] overflow-hidden group">
             <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Consultation" />
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                   <ArrowRight />
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* 3. NEW SECTION: THE METHODOLOGY (Interactive List) */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3 sticky top-32 h-fit">
            <h2 className="text-5xl font-bold mb-6">Our <br /><span className="text-[#FDBA74]">Methodology</span></h2>
            <p className="text-gray-500 mb-8">A scientific approach to interior execution, ensuring every sq.ft is accounted for.</p>
            <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600" className="rounded-2xl opacity-50 grayscale" alt="Tech" />
          </div>
          
          <div className="lg:w-2/3 space-y-12">
            {[
              { title: "Project Audit & BOQ", icon: Microscope, text: "Initial deep dive into quantities and material specs to prevent budget overruns." },
              { title: "Vendor Symphony", icon: Users, text: "Aligning contractors and specialists like a conductor for seamless site flow." },
              { title: "Precision Control", icon: Crosshair, text: "Zero-tolerance quality checks at every milestone of construction." },
              { title: "Transparent Reporting", icon: FileText, text: "Cloud-based weekly reports with live site images for 100% visibility." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ ...lusionTransition, delay: i * 0.1 }}
                className="group flex gap-8 pb-12 border-b border-white/10 hover:border-[#FDBA74]/50 transition-colors"
              >
                <div className="text-[#FDBA74] group-hover:scale-125 transition-transform"><item.icon size={32} /></div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">{item.title}</h3>
                  <p className="text-gray-400 max-w-xl">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VISUAL PROOF - High Detail Imagery */}
      <section className="py-20 bg-white">
         <div className="max-w-[90vw] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div 
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
              initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
              transition={{ duration: 1.5 }}
              className="h-[600px] rounded-[3rem] overflow-hidden relative"
            >
               <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070" className="w-full h-full object-cover" alt="Luxury Interior" />
               <div className="absolute bottom-10 left-10 text-white">
                  <p className="text-xs uppercase font-bold tracking-[0.3em]">Phase 04</p>
                  <h4 className="text-3xl font-bold italic">Execution Excellence</h4>
               </div>
            </motion.div>
            <motion.div 
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="h-[600px] rounded-[3rem] overflow-hidden relative md:mt-20"
            >
               <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070" className="w-full h-full object-cover" alt="Construction Site" />
               <div className="absolute top-10 right-10 text-white text-right">
                  <p className="text-xs uppercase font-bold tracking-[0.3em]">Site Management</p>
                  <h4 className="text-3xl font-bold italic">Uncompromised Safety</h4>
               </div>
            </motion.div>
         </div>
      </section>

      {/* 5. NEW SECTION: CLIENT TRUST / FAQ AREA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
           <h2 className="text-5xl font-black mb-16">Expertise You <br /><span className="text-[#FDBA74]">Can Trust.</span></h2>
           <div className="grid gap-4 text-left">
              {[
                "Certified project managers with over 15+ years of site experience.",
                "Real-time budget tracking to ensure zero hidden escalation.",
                "Strict adherence to IS Codes and safety regulations.",
                "Seamless handover with full documentation and snag-clearance."
              ].map((text, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 20 }}
                  className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-6"
                >
                  <CheckCircle2 className="text-[#FDBA74]" />
                  <span className="text-lg font-medium">{text}</span>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* 6. IMMERSIVE CTA */}
      <section className="relative py-60 flex items-center justify-center overflow-hidden">
        <motion.div 
          whileInView={{ scale: 1.2 }}
          transition={{ duration: 4 }}
          className="absolute inset-0 z-0 opacity-30"
        >
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600" className="w-full h-full object-cover" alt="Office" />
        </motion.div>
        
        <div className="relative z-10 text-center px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black italic mb-10 tracking-tighter"
          >
            "We Manage. <br /> <span className="text-[#FDBA74]">You Relax."</span>
          </motion.h2 >
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="bg-white text-[#021412] px-16 py-6 rounded-full font-black uppercase text-sm tracking-widest shadow-2xl"
          >
            Initiate Project Audit
          </motion.button>
        </div>
      </section>

    </div>
  );
};

export default PMC;