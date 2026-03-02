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
import methodology from '../assets/methodology.png';
import banner1 from '../assets/pmc-banner1.jpg';
import standards from '../assets/standards.png';
import bhopal from '../assets/Tafe Bhopal Image.jpg';
import banner2 from '../assets/pmc-banner2.jpg';
import banner3 from '../assets/pmc-banner3.jpg';
import banner4 from '../assets/pmc-banner4.jpg';
import tafe1 from '../assets/pmcTafe.jpg';
import tafe2 from '../assets/pmc-tafe2.jpg';
import tafe3 from '../assets/3d2.jpg';
import tafe5 from '../assets/pmc-tafe1.jpg';
import arrow from '../assets/arrow.webp';
import ecosystem1 from '../assets/Flooring.jpg';
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
    }, 2000); // Changes every 5 seconds
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
              <div className="text-5xl md:text-6xl font-black italic"><CountUp end={1800} enableScrollSpy />+</div>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-60">Projects <br /> Handed Over</p>
            </div>
          </motion.div>

          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            className="bg-[#FDBA74] p-8 rounded-[2rem] md:rounded-[3rem] text-[#021412]"
          >
            <Zap size={32} strokeWidth={3} className="mb-6" />
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-2">
              99% Design Accuracy
            </h3>
            <p className="text-md md:text-md font-medium opacity-80 leading-relaxed">
              Minimizing onsite errors through hyper-detailed planning, precise technical execution, and the expertise of skilled engineers.
            </p>
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
      <section className="py-24 md:py-40 px-6 bg-[#010B0A] relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FDBA74]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

          {/* Left: Dynamic Branding & Images */}
          <div className="w-full lg:w-[45%] relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center lg:text-left relative z-30"
            >
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">
                Our <br /> <span className="text-[#FDBA74]">Methodology</span>
              </h2>
              <div className="w-20 h-1 bg-[#FDBA74] mb-8 mx-auto lg:mx-0" />
              <p className="text-gray-400 text-lg md:text-xl max-w-md mx-auto lg:mx-0 font-medium leading-relaxed">
                A scientific approach to interior execution, ensuring every sq.ft is accounted for.
              </p>
            </motion.div>

            <div className="relative w-full aspect-square md:aspect-[4/5] lg:aspect-square max-w-[500px] mx-auto lg:mx-0">
              {/* Main Site Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full h-full rounded-[3rem] overflow-hidden shadow-2xl relative group bg-white/5 border border-white/10"
              >
                <img src={tafe1} className="w-full h-full object-cover opacity-90 transition-all duration-1000 group-hover:scale-110" alt="Arsen Site" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#010B0A] via-transparent to-transparent" />
              </motion.div>

              {/* Floating Professional Visual (Headset Person) - Visible only on laptop+ */}
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
                className="hidden lg:block absolute -left-4 xl:-left-20 -bottom-10 xl:-bottom-[35%] w-[80%] z-40"
              >
                <img src={methodology} className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" alt="Methodology Expert" />
              </motion.div>
            </div>
          </div>

          {/* Right: Methodology Steps */}
          <div className="w-full lg:w-[55%] relative z-10">
            <div className="divide-y divide-white/10">
              {[
                { title: "Project Audit", icon: Microscope, text: "Initial deep dive into quantities and material specs to prevent budget overruns." },
                { title: "Vendor Symphony", icon: Users, text: "Aligning contractors and specialists like a conductor for seamless site flow." },
                { title: "Precision Control", icon: Crosshair, text: "Zero-tolerance quality checks at every milestone of construction." },
                { title: "Transparent Reporting", icon: FileText, text: "Cloud-based weekly reports with live site images for 100% visibility." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="group flex gap-8 py-10 px-4 md:px-8 hover:bg-white/[0.03] transition-all duration-500 first:pt-0 last:pb-0"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#FDBA74] group-hover:bg-[#FDBA74] group-hover:text-black transition-all duration-500 shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-3 transition-colors group-hover:text-[#FDBA74]">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed font-medium group-hover:text-gray-200 transition-colors">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 1. Interior Fit-outs */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }}
              className="relative rounded-[2.5rem] overflow-hidden group h-[400px] md:h-[450px]"
            >
              <img src={ecosystem1} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Interior Fit-outs" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <Layout className="text-[#FDBA74] mb-4" size={32} />
                <h3 className="text-3xl font-black uppercase tracking-tighter">Flooring</h3>
                <p className="text-white/60 text-sm font-medium tracking-wide">Premium flooring, ceiling & modular partitions.</p>
              </div>
            </motion.div>

            {/* 2. FAS & PA Systems */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} transition={{ delay: 0.1 }}
              className="relative rounded-[2.5rem] overflow-hidden group h-[400px] md:h-[450px]"
            >
              <img src={ecosystem2} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="FAS & PA Systems" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <Activity className="text-[#FDBA74] mb-4" size={32} />
                <h3 className="text-3xl font-black uppercase tracking-tighter">FAS & PA Systems</h3>
                <p className="text-white/60 text-sm font-medium tracking-wide">High-end corporate safety & acoustic engineering.</p>
              </div>
            </motion.div>

            {/* 3. HVAC Systems */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} transition={{ delay: 0.2 }}
              className="relative rounded-[2.5rem] overflow-hidden group h-[400px] md:h-[450px]"
            >
              <img src={ecosystem3} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="HVAC Systems" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <Wind className="text-[#FDBA74] mb-4" size={32} />
                <h3 className="text-3xl font-black uppercase tracking-tighter">HVAC Systems</h3>
                <p className="text-white/60 text-sm font-medium tracking-wide">Precision climate control & industrial air ducting.</p>
              </div>
            </motion.div>

            {/* 4. Power & MEP */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} transition={{ delay: 0.3 }}
              className="relative rounded-[2.5rem] overflow-hidden group h-[400px] md:h-[450px]"
            >
              <img src={ecosystem4} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Power & MEP" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <Zap className="text-[#FDBA74] mb-4" size={32} />
                <h3 className="text-3xl font-black uppercase tracking-tighter">Power & MEP</h3>
                <p className="text-white/60 text-sm font-medium tracking-wide">Smart grid distribution & safety compliance.</p>
              </div>
            </motion.div>
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