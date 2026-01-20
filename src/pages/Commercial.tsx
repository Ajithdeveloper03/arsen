"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight, ShieldCheck, CheckCircle2,
  Layers, Palette, PenTool, HardHat, ClipboardCheck, Rocket, Eye,
  Layout, Monitor, Box, Coffee, Users2, Zap
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import threed1 from '../assets/3d1.jpg';
import threed2 from '../assets/3d2.jpg';
// Asset Imports
import furniture from '../assets/comercial-furniture.jpg';
import vm1 from '../assets/saf-gmaes-vilalge.webp';
import vm2 from '../assets/vm2.jpg';
import vm3 from '../assets/vm2.png';
import vm4 from '../assets/vm1.jpg';
import oecl1 from "../assets/oecl1.jpg";
import oecl2 from "../assets/oecl2.jpg";
import greens1 from "../assets/greens3.jpg";
import greens2 from "../assets/greens2.jpg";
import sundaram1 from "../assets/sundaram1.jpg";
import sundaram2 from "../assets/sundaram2.jpg";
import tafe1 from "../assets/tafe1.jpg";
import tafe2 from "../assets/tafe2.jpg";
import corporate from "../assets/commercial-corporate.jpg";
import Video from '../assets/commercial-banner-video.mp4';

gsap.registerPlugin(ScrollTrigger);

const VIDEO_PATH = Video;

const ArsenCommercial = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!horizontalSectionRef.current || !triggerRef.current) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.to(horizontalSectionRef.current, {
          x: () => -(horizontalSectionRef.current!.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: () => `+=${horizontalSectionRef.current!.scrollWidth}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const openContactPopup = () => {
    window.dispatchEvent(new Event("open-contact"));
  };

  const specializedAreas = [
    { title: "Corporate Offices", img: corporate, desc: "High-performance ergonomic workspace environments." },
    { title: "Retail & Malls", img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200", desc: "Conversion-optimized outlets and showrooms." },
    { title: "Restaurants & Cafes", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200", desc: "Atmospheric culinary spaces and industrial kitchens." },
    { title: "Healthcare & Hospitals", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200", desc: "Specialized clinical interiors and functional labs." },
    { title: "Spa & Salons", img: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1200", desc: "Premium wellness sanctuaries and luxury fit-outs." },
  ];

  const clientProjects = [
  {
    brand: "Chennai Sundaram Finance DB Plaza ",
    desc: "Premium corporate headquarters featuring acoustically treated conference wings and executive lounge areas with custom veneer finishes.",
    images: [sundaram1, sundaram2],
    tags: ["Financial", "Luxury Interior"],
    hasBranches: true // Added to trigger the highlight
  },
  {
    brand: "Dr Aggarwal's Eye Hospital",
    desc: "Specialized medical interior fit-out focusing on sterile patient-flow optimization and high-tech diagnostic room ergonomics.",
    images: ["https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800", "https://images.pexels.com/photos/26108454/pexels-photo-26108454.jpeg"],
    tags: ["Healthcare", "Specialized"],
    hasBranches: true
  },
  {
    brand: "Tafe",
    desc: "Industrial-themed administrative blocks and collaborative cafes with bespoke metal furniture and exposed HVAC ceiling architecture.",
    images: [tafe1, tafe2],
    tags: ["Industrial", "Hospitality"],
    hasBranches: true
  },
  {
    brand: "Sundaram Home's",
    desc: "Modern customer-centric retail banking environment designed for transparency, security, and premium client engagement.",
    images: ["https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg", "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"],
    tags: ["Banking", "Customer Experience"],
    hasBranches: true
  },
  {
    brand: "Oecl",
    desc: "A massive 45,000 sq.ft agile workspace focusing on open-plan collaboration and smart lighting systems for global logistics operations.",
    images: [oecl1, oecl2],
    tags: ["Corporate", "45k Sq.Ft"],
    hasBranches: false // Excluded per your request
  },
  {
    brand: "Green Trends",
    desc: "Rapid-deployment turnkey fit-outs for salon chains, ensuring brand consistency across high-traffic shopping mall locations.",
    images: [greens1, greens2],
    tags: ["Wellness", "Franchise Rollout"],
    hasBranches: true
  }
];

// ... Inside your component return
  return (
    <div ref={containerRef} className="bg-[#0A0D0C] text-[#E8EDEA] antialiased selection:bg-[#008b98] overflow-x-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50 md:opacity-50 scale-105">
            <source src={VIDEO_PATH} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0D0C] via-transparent to-[#0A0D0C]" />
        </div>
        <div className="relative z-10 text-center w-full">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-[13vw] sm:text-[13vw] md:text-[9vw] font-black leading-[0.85] tracking-tighter uppercase italic break-words"
          >
            Arsen <br />
            <span className="text-transparent font-outline px-2" style={{ WebkitTextStroke: '2.8px #81d6de' }}>Commercial</span>
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={openContactPopup}
            className="mt-8 md:mt-12 px-6 py-4 md:px-10 md:py-5 bg-[#008b98] rounded-full font-black uppercase text-[10px] md:text-xs tracking-widest flex items-center gap-3 mx-auto shadow-2xl shadow-[#008b98]/20"
          >
            Launch Project <ArrowUpRight size={18} />
          </motion.button>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="py-20 md:py-40 bg-[#F5F5F0] text-[#0A0D0C]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-tight md:leading-none">
              Business <br /> In <span className="text-[#008b98] italic font-serif">Motion.</span>
            </h2>
            <p className="text-lg md:text-xl text-black/60 leading-relaxed italic">"Commercial design is no longer about desks; it's about engineering human interaction and brand equity."</p>
            <div className="flex gap-6 md:gap-10">
              <StatItem label="Material Durability" val="Grade-A" unit="" color="#008b98" />
              <StatItem label="MEP Precision" val="100" unit="%" color="#008b98" />
            </div>
          </div>
          <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200" alt="Commercial Workspace" className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* 2. SPECIALIZED AREAS */}
      <div ref={triggerRef} className="bg-black">
        <section className="lg:h-screen flex items-center overflow-hidden">
          <div ref={horizontalSectionRef} className="flex flex-col lg:flex-row w-full lg:w-[500vw]">
            {specializedAreas.map((area, idx) => (
              <div key={idx} className="w-full lg:w-screen h-[70vh] lg:h-screen flex-shrink-0 relative group border-b border-white/5 lg:border-none">
                <img src={area.img} className="absolute inset-0 w-full h-full object-cover opacity-50 lg:opacity-70 lg:grayscale lg:group-hover:grayscale-0 transition-all duration-1000" alt={area.title} />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 md:p-10 bg-black/40">
                  <span className="text-[#008b98] font-black text-xl md:text-2xl mb-2 md:mb-4 tracking-widest">0{idx + 1}</span>
                  <h2 className="text-4xl md:text-[5vw] font-black uppercase text-white tracking-tighter leading-tight mb-4">{area.title}</h2>
                  <p className="text-white/70 text-sm md:text-xl max-w-2xl uppercase tracking-[0.1em] md:tracking-[0.2em] font-medium">{area.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 3. WORKSTATION & INTERIOR DESIGN SECTION - Expanded Content */}
     <section className="py-20 md:py-40 bg-[#0A0D0C] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-tight text-white mb-6">
          Modern <br /> <span className="text-[#008b98]">Workstations.</span>
        </h2>
        <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl">
          We build office spaces that work for you. From open desks for teamwork to quiet spots for deep focus.
        </p>
      </div>

      {/* Scrolling Marquee Container */}
      <div className="flex overflow-hidden group">
        <motion.div 
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: [0, -1500] }} // Adjust distance based on content width
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
        >
          {/* Duplicate features to ensure seamless loop */}
          {[...features, ...features].map((item, index) => (
            <div 
              key={index} 
              className="w-[300px] md:w-[450px] inline-block shrink-0"
            >
              <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-6">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover hover:grayscale-0 transition-all duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-white text-3xl font-bold uppercase mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm whitespace-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

      {/* 4. VM - VIRTUAL MERCHANDISING */}
      <section className="py-16 md:py-20 bg-white text-black rounded-[2rem] md:rounded-[4rem] mx-2 md:mx-10 overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
      
      {/* TEXT CONTENT */}
      <div className="lg:col-span-5 space-y-6 md:space-y-8">
        <span className="text-[#008b98] font-black text-sm tracking-[0.3em] uppercase block">
          Visual Merchandise
        </span>
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
          VM & <br /> <span className="text-[#008b98]">Adhesives.</span>
        </h2>
        
        <div className="space-y-6 pt-4">
          <VMItem icon={<Box size={20} />} title="Self-Adhesive Wallpapers" desc="Custom-printed high-tack vinyls and textured fabrics." />
          <VMItem icon={<Eye size={20} />} title="PVC Decor Films" desc="Architecture-grade PVC wraps for furniture refurbishing." />
          <VMItem icon={<Rocket size={20} />} title="Backlit Banners" desc="Fabric and vinyl banner systems with LED matrix." />
        </div>
      </div>

      {/* COMPACT 4-IMAGE GRID */}
      <div className="lg:col-span-7">
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          
          {/* Left Column */}
          <div className="space-y-3 md:space-y-4">
            <motion.div 
              whileHover={{ y: -5 }}
              className="rounded-2xl md:rounded-3xl overflow-hidden shadow-lg aspect-[4/5]"
            >
              <img src={vm1} className="h-full w-full object-cover" alt="VM 1" />
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="rounded-2xl md:rounded-3xl overflow-hidden shadow-lg aspect-square"
            >
              <img src={vm2} className="h-full w-full object-cover" alt="VM 2" />
            </motion.div>
          </div>

          {/* Right Column (Staggered/Offset) */}
          <div className="space-y-3 md:space-y-4 pt-8 md:pt-12">
            <motion.div 
              whileHover={{ y: -5 }}
              className="rounded-2xl md:rounded-3xl overflow-hidden shadow-lg aspect-square"
            >
              <img src={vm3} className="h-full w-full object-cover" alt="VM 3" />
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="rounded-2xl md:rounded-3xl overflow-hidden shadow-lg aspect-[4/5]"
            >
              <img src={vm4} className="h-full w-full object-cover" alt="VM 4" />
            </motion.div>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>

      {/* 5. BENCHMARK CLIENTS - Expanded with New Projects */}
     

<section className="py-20 md:py-40 bg-[#0A0D0C]">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-4xl md:text-7xl font-bold uppercase text-white mb-16 md:mb-32 text-center tracking-tighter">
      Benchmark <br /> <span className="text-[#008b98]">Excellence.</span>
    </h2>

    <div className="space-y-24 md:space-y-56">
      {clientProjects.map((project, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center"
        >
          {/* CONTENT COLUMN */}
          <div className={`lg:col-span-5 ${idx % 2 === 0 ? "lg:order-1" : "lg:order-2 lg:text-right"}`}>
            
            {/* Conditional "50+ Branches" Highlight */}
            {project.hasBranches && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={`flex items-center gap-2 mb-4 ${idx % 2 === 0 ? "justify-start" : "justify-start lg:justify-end"}`}
              >
                <span className="h-[2px] w-8 bg-[#008b98]"></span>
                <span className="text-[#008b98] font-black text-[12px] tracking-[0.2em] uppercase">
                  50+ Branches Executed
                </span>
              </motion.div>
            )}

            <div className={`flex flex-wrap gap-2 mb-4 md:mb-6 ${idx % 2 === 0 ? "justify-start" : "justify-start lg:justify-end"}`}>
              {project.tags.map(t => (
                <span key={t} className="px-3 py-1 border border-[#008b98]/40 rounded-full text-[11px] uppercase font-black text-[#008b98] bg-[#008b98]/5">
                  {t}
                </span>
              ))}
            </div>

            <h3 className="text-4xl md:text-6xl font-black uppercase text-white mb-6 md:mb-8 tracking-tighter leading-none">
              {project.brand}
            </h3>
            
            <p className="text-white/50 text-base md:text-xl leading-relaxed mb-8 md:mb-10 font-medium italic">
              "{project.desc}"
            </p>

            <button onClick={openContactPopup} className="group inline-flex items-center gap-3 text-white font-bold uppercase text-[10px] tracking-widest border-b-2 border-[#008b98] pb-2 hover:text-[#008b98] transition-colors">
              Now your turn <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          {/* IMAGES COLUMN */}
          <div className={`lg:col-span-7 grid grid-cols-2 gap-3 md:gap-6 ${idx % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}>
            {project.images.map((img, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl md:rounded-[2.5rem] shadow-2xl group">
                <img 
                  src={img} 
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${i === 1 ? "mt-6 md:mt-12 h-48 md:h-[400px]" : "h-64 md:h-[500px]"}`} 
                  alt={project.brand} 
                />
                <div className="absolute inset-0 bg-[#008b98]/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* 6. WORKFLOW */}
      <section className="py-20 md:py-40 bg-[#0A0D0C] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-7xl font-bold uppercase text-white tracking-tighter mb-20">Execution <span className="text-[#008b98]">Protocol.</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-left">
            <WorkflowStep num="01" title="Concept Audit" icon={<Layers />} detail="Analyzing brand identity, traffic flow, and existing site feasibility studies." />
            <WorkflowStep num="02" title="Tech Design" icon={<PenTool />} detail="Drafting GFC drawings including HVAC, fire safety, and smart lighting grids." />
            <WorkflowStep num="03" title="Sourcing" icon={<Palette />} detail="Procuring ISO-certified materials and factory-finished modular furniture." />
            <WorkflowStep num="04" title="Civil Works" icon={<HardHat />} detail="Managed on-site execution under strict EHS (Environment, Health, Safety) norms." />
            <WorkflowStep num="05" title="QC Testing" icon={<ClipboardCheck />} detail="Final 146-point verification of finishes, electrical loads, and acoustic levels." />
            <WorkflowStep num="06" title="The Launch" icon={<Rocket />} detail="Deep cleaning and final handover of a business-ready commercial asset." />
          </div>
        </div>
      </section>

      {/* 7. WHY ARSEN */}
      <section className="py-20 md:py-40 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 min-h-[800px] md:h-[600px]">
            <div className="md:col-span-2 md:row-span-2 bg-gray-100 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col justify-between overflow-hidden relative group min-h-[300px]">
              <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800" className="absolute inset-0 w-full h-full object-cover opacity-60 md:opacity-80 group-hover:scale-110 transition-transform duration-1000" alt="Material" />
              <h4 className="text-3xl md:text-5xl font-black uppercase relative z-10">Material <br /> Compliance.</h4>
              <p className="text-black relative z-10 text-base md:text-2xl font-bold italic">Fire-rated fabrics and Grade-A commercial plywood used in all modular setups.</p>
            </div>
            
            <div className="md:col-span-2 bg-[#008b98] rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-white flex items-center justify-between">
              <h4 className="text-2xl md:text-5xl font-black uppercase">Zero <br /> Escalation.</h4>
              <ShieldCheck className="w-12 h-12 md:w-[60px] md:h-[60px]" strokeWidth={1} />
            </div>

            <div className="bg-black rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 text-white flex flex-col justify-center text-center">
              <p className="text-4xl md:text-5xl font-black italic">365</p>
              <p className="text-[9px] md:text-[20px] uppercase font-bold tracking-widest mt-2 text-white/40">Maintenance Support</p>
            </div>
            
            <div className="bg-gray-200 rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 flex flex-col justify-center text-center border border-black/5">
              <CheckCircle2 size={40} className="mx-auto text-[#008b98]" />
              <p className="text-[9px] md:text-[20px] uppercase font-bold tracking-widest mt-4 text-black/40">ISO 9001 Certified</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

// --- HELPER SUB-COMPONENTS ---
const features = [
    { title: "Flexible Desks", desc: "Comfortable desks that easily fit your team's needs, whether sitting or standing.", img: furniture },
    { title: "Quiet Areas", desc: "Special walls and screens to keep noise down so you can focus on work.", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600" },
    { title: "Power & Light", desc: "Smart lighting and plenty of plug points right where you need them.", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400" },
    { title: "Meeting Spots", desc: "Quick hangout areas with TVs and plants for fast team chats.", img: threed2 },
    { title: "Office Kitchen", desc: "Strong, easy-to-clean counters and equipment for your coffee breaks.", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600" },
    { title: "Front Office", desc: "A beautiful entrance that makes a great first impression on guests.", img: threed1 }
  ];
const StatItem = ({ label, val, unit, color }: any) => (
  <div className="space-y-1">
    <p className="text-3xl md:text-4xl font-black uppercase" style={{ color }}>{val}<span className="text-sm ml-1 uppercase">{unit}</span></p>
    <p className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-black/40">{label}</p>
  </div>
);

const FeatureCard = ({ icon, title, desc, img, bgColor, isPrimary }: any) => (
  <motion.div whileHover={{ y: -10 }} className={`${bgColor} p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] ${!isPrimary ? 'border border-white/10' : 'text-white'} flex flex-col justify-between h-[500px] md:h-[550px]`}>
    <div className="space-y-4 md:space-y-6">
      <div className={isPrimary ? "text-white" : "text-[#008b98]"}>{icon}</div>
      <h4 className="text-2xl md:text-3xl font-black uppercase leading-tight tracking-tighter">{title}</h4>
      <p className={`${isPrimary ? 'text-white/80' : 'text-white/50'} text-md md:text-lg leading-snug`}>{desc}</p>
    </div>
    <div className="overflow-hidden rounded-2xl h-32 md:h-44 mt-4 relative group">
        <img src={img} className={`w-full h-full object-cover grayscale ${isPrimary ? 'brightness-75' : 'hover:grayscale-0'} transition-all duration-700`} alt="Interior" />
    </div>
  </motion.div>
);

const VMItem = ({ icon, title, desc }: any) => (
  <div className="flex gap-4 md:gap-6 items-start">
    <div className="p-3 md:p-4 bg-gray-100 rounded-xl md:rounded-2xl flex-shrink-0 text-[#008b98]">{icon}</div>
    <div>
      <h3 className="text-md md:text-xl font-black uppercase">{title}</h3>
      <p className="text-sm md:text-lg text-black/50 font-medium leading-tight">{desc}</p>
    </div>
  </div>
);

const WorkflowStep = ({ num, title, icon, detail }: any) => (
  <motion.div whileHover={{ y: -10 }} className="p-8 md:p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] md:rounded-[3rem] space-y-4 md:space-y-6 group hover:border-[#008b98]/50 transition-all">
    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#008b98]/20 text-[#008b98] flex items-center justify-center text-xl md:text-2xl group-hover:bg-[#008b98] group-hover:text-white transition-all">
      {icon}
    </div>
    <div>
      <p className="text-[#008b98] font-bold text-[12px] uppercase mb-2">Phase {num}</p>
      <h4 className="text-xl md:text-2xl font-bold uppercase text-white mb-3 md:mb-4">{title}</h4>
      <p className="text-white/40 text-md md:text-lg leading-relaxed">{detail}</p>
    </div>
  </motion.div>
);

export default ArsenCommercial;