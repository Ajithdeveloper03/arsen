"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";
import {
  ArrowRight, Layout, Wind, Zap, Activity,
  CheckCircle2, Microscope, Users, Crosshair, FileText, Settings
} from "lucide-react";
import { Link } from "react-router-dom";

// Assets
import banner1 from '../assets/pmc-banner1.jpg';
import banner2 from '../assets/pmc-banner2.jpg';
import banner3 from '../assets/pmc-banner3.jpg';
import banner4 from '../assets/pmc-banner4.jpg';
import tafe1 from '../assets/pmc-tafe.jpg';
import tafe2 from '../assets/pmc-tafe2.jpg';
import tafe3 from '../assets/3d2.jpg';
import tafe5 from '../assets/pmc-tafe1.jpg';
import arrow from '../assets/arrow.webp';
import ecosystem2 from '../assets/FAS and PA System.jpg';
import ecosystem3 from '../assets/Hvac.jpg';
import ecosystem4 from '../assets/Power and Mep.jpg';
import manage from '../assets/manage-relax.jpg';

const lusionTransition = { duration: 1.2, ease: [0.22, 1, 0.36, 1] };

const openContactPopup = () => {
  window.dispatchEvent(new Event("open-contact"));
};

const PMC = () => {
  const { scrollYProgress } = useScroll();
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);

  // 1. Slider Logic
  const bannerImages = [banner1, banner2, banner3, banner4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 5000); // Changes every 5 seconds
    return () => clearInterval(timer);
  }, [bannerImages.length]);

  return (
    <div className="bg-[#021412] text-white selection:bg-[#FDBA74] overflow-x-hidden">

      {/* 1. CINEMATIC HERO WITH AUTOMATIC SLIDER */}
      <section className="relative h-[100svh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: imageScale }} className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={bannerImages[currentIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="w-full h-full object-cover grayscale"
              alt="Architecture Background"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-[#021412]/60 via-transparent to-[#021412]" />
        </motion.div>

        <div className="relative z-10 text-center px-4">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={lusionTransition}>
            <span className="text-[#FDBA74] tracking-[0.4em] md:tracking-[0.8em] uppercase text-[9px] md:text-[10px] font-bold mb-4 block">
              Architectural Precision
            </span>
            <h1 className="text-[15vw] md:text-[10vw] font-black leading-[0.9] mb-6 uppercase text-white">
              Execution <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px #fff' }}>Is Art</span>
            </h1>
          </motion.div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-10 left-10 flex gap-2 z-20">
          {bannerImages.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 transition-all duration-500 ${i === currentIndex ? "w-8 bg-[#FDBA74]" : "w-2 bg-white/20"}`} 
            />
          ))}
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
          <motion.div
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            className="md:col-span-2 bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] text-[#021412] flex flex-col justify-between min-h-[300px]"
          >
            <h2 className="text-2xl md:text-4xl font-bold leading-tight">We manage the chaos, <br /> you enjoy the <span className="italic">creation.</span></h2>
            <div className="flex items-center gap-4 mt-8">
              <div className="text-5xl md:text-6xl font-black italic"><CountUp end={1100} enableScrollSpy />+</div>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-60">Projects <br /> Handed Over</p>
            </div>
          </motion.div>

          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            className="bg-[#FDBA74] p-8 rounded-[2rem] md:rounded-[3rem] text-[#021412]"
          >
            <Zap size={32} strokeWidth={3} className="mb-6" />
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-2">25% Faster</h3>
            <p className="text-md md:text-sm font-medium opacity-80 leading-relaxed">Reduction in turnaround time through systematic WBS planning.</p>
          </motion.div>

          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            className="relative h-[250px] md:h-auto rounded-[2rem] md:rounded-[3rem] overflow-hidden group"
          >
            <img src={arrow} className="w-full h-full object-cover grayscale md:group-hover:grayscale-0 transition-all duration-700" alt="Consultation" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Link to="/commercial" className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white text-black flex items-center justify-center active:scale-90 md:hover:scale-110 transition-transform">
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. THE METHODOLOGY */}
      <section className="py-20 md:py-32 px-4 md:px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 md:gap-20">
          <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6">Our <br className="hidden lg:block" /><span className="text-[#FDBA74]">Methodology</span></h2>
            <p className="text-gray-500 mb-8 text-md md:text-base">A scientific approach to interior execution, ensuring every sq.ft is accounted for.</p>
            <img src={tafe1} className="rounded-2xl opacity-80 hidden lg:block h-[420px] object-cover" alt="Tech" />
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
                  <p className="text-gray-400 text-lg md:text-xl leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE PMC ECOSYSTEM */}
      <section className="py-24 bg-white text-[#021412] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              The <span className="text-[#c9a050]">PMC</span> Ecosystem
            </h2>
            <p className="text-gray-400 font-bold text-xs tracking-[0.3em] uppercase mt-4">Full-Stack Technical Control</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[900px]">
            <motion.div
              whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }}
              className="md:col-span-7 relative rounded-[2.5rem] overflow-hidden group h-[400px] md:h-full"
            >
              <img src={ecosystem2} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Interiors" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <Layout className="text-[#FDBA74] mb-4" size={32} />
                <h3 className="text-4xl font-black uppercase tracking-tighter">FAS & PA Systems</h3>
                <p className="text-white/60 text-sm font-medium tracking-wide">High-end corporate fit-outs & acoustic engineering.</p>
              </div>
            </motion.div>

            <div className="md:col-span-5 grid grid-rows-2 gap-6 h-full">
              <motion.div
                whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 30 }}
                className="relative rounded-[2.5rem] overflow-hidden group"
              >
                <img src={ecosystem3} className="w-full h-full object-cover transition-all duration-700" alt="HVAC" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-all" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                  <Wind className="text-[#FDBA74] mb-3" size={24} />
                  <h3 className="text-2xl font-black uppercase tracking-tighter">HVAC Systems</h3>
                  <p className="text-white/70 text-md">Precision climate control & industrial air ducting.</p>
                </div>
              </motion.div>

              <motion.div
                whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 30 }} transition={{ delay: 0.1 }}
                className="relative rounded-[2.5rem] overflow-hidden group"
              >
                <img src={ecosystem4} className="w-full h-full object-cover transition-all duration-700" alt="Electrical" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-all" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                  <Zap className="text-[#FDBA74] mb-3" size={24} />
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Power & MEP</h3>
                  <p className="text-white/70 text-md">Smart grid distribution & safety compliance.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CLIENT TRUST AREA */}
      <section className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-10 md:mb-16 leading-tight text-white">Expertise You <br /><span className="text-[#FDBA74]">Can Trust.</span></h2>
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
                <span className="text-sm md:text-lg font-medium text-white">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. IMMERSIVE CTA */}
      <section className="relative py-24 md:py-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src={manage} className="w-full h-full object-cover" alt="Office" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-9xl font-black italic mb-10 tracking-tighter leading-none text-white"
          >
            "We Manage. <br /> <span className="text-[#FDBA74]">You Relax."</span>
          </motion.h2>
          <motion.button
            onClick={openContactPopup}
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