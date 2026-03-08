"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight, ShieldCheck, CheckCircle2,
  Layers, Palette, PenTool, HardHat, ClipboardCheck, Rocket, Eye, Box, ChevronLeft, ChevronRight, MapPin
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Asset Imports
import cFactory1 from '../assets/commercialFactory1.png';
import cFactory2 from '../assets/commercialFactory2.png';
import cFactory3 from '../assets/commercialFactory3.png';

import sundar1 from '../assets/sundar1.jpg';
import sundar2 from '../assets/sundar2.jpg';
import factoryStandard from '../assets/factory-standard.jpg';
import workspace from '../assets/workspace.jpg';
import conference from '../assets/conference.jpg';
import threed2 from '../assets/3d2.jpg';
import dining from '../assets/home-dining.jpg';
import vm1 from '../assets/saf-gmaes-vilalge.webp';
import vm2 from '../assets/vm2.jpg';
import vm3 from '../assets/vm2.png';
import vm4 from '../assets/vm1.jpg';
import oecl1 from "../assets/oecl1.jpg";
import oecl2 from "../assets/oecl2.jpg";
import greens1 from "../assets/greens3.jpg";
import greens2 from "../assets/greens2.jpg";
import sundaram1 from "../assets/sundaram1.jpg";
import hero1 from '../assets/home-slider-commercial2.jpg';
import modular from '../assets/pmc-tafe2.jpg';
import sundaram2 from "../assets/sundaram2.jpg";
import tafe1 from "../assets/commercial-tafe1.jpg";
import tafe2 from "../assets/commercial-tafe2.jpeg";
import corporate from "../assets/commercial-corporate.jpg";
import cabins from "../assets/cabins.jpg";
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
    { title: "Restaurants & Cafes", img: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/fc30b819181239.562d62402df51.png", desc: "Atmospheric culinary spaces and industrial kitchens." },
    { title: "Healthcare & Hospitals", img: "https://images.pexels.com/photos/7250788/pexels-photo-7250788.jpeg", desc: "Specialized clinical interiors and functional labs." },
    { title: "Spa & Salons", img: greens1, desc: "Premium wellness sanctuaries and luxury fit-outs." },
  ];

  const clientProjects = [
    {
      brand: "Sundaram Finance & Home",
      desc: "Comprehensive interior partner for Sundaram's corporate ecosystem. We have delivered 15 major locations including their Chennai Head Office and branch offices across Pune, Hyderabad, and Kerala, focusing on premium corporate identity and structural revamping.",
      images: [sundaram1, sundaram2],
      tags: ["Financial", "Corporate HQ"],
      hasBranches: true,
      branchCount: "15",
      locations: [
        "Head Office (Chennai)", "Sundaram Home Corporate (Chennai)", "Sundaram Infotech (Chennai)", "Branch Office (Pune)", "Branch Office (Hyderabad)",
        "Branch Office (Ernakulam)", "Branch Office (Ajmer)", "Branch Office (Indore)", "Amirpet (Telangana)", "Bhopal (MP)",
        "Belgaum (Karnataka)", "Thanjavur", "Ghatkaser (Telangana)", "Hasan (Karnataka)", "Dharmapuri"
      ]
    },
    {
      brand: "Dr Agarwal's Eye Hospital",
      desc: "Dedicated healthcare fit-out partner across 25 locations. Our work spans sterile surgical environments, diagnostic labs, and corporate offices across Chennai, Bangalore, Kolkata, and major districts in Tamil Nadu and Andhra Pradesh.",
      images: ["https://images.pexels.com/photos/7617612/pexels-photo-7617612.jpeg", "https://images.pexels.com/photos/26108454/pexels-photo-26108454.jpeg"],
      tags: ["Healthcare", "Specialized"],
      hasBranches: true,
      branchCount: "25",
      locations: [
        "Corporate Office (Chennai)", "Porur (Chennai)", "Chetpet (Chennai)", "Triplicane (Chennai)", "Adyar (Chennai)",
        "Annanagar (Chennai)", "Guindy (Chennai)", "Greams Road (Chennai)", "Tirunelveli", "Bannerghatta (Bangalore)",
        "Whitefield (Bangalore)", "Indiranagar (Bangalore)", "Koramangala (Bangalore)", "Thanjavur", "Pudukottai",
        "Kanchipuram", "Vizhuppuram", "Aavadi", "Rasipuram", "Karur", "Erode", "Hosur", "Krishnagiri", "Madurai", "Kolkata"
      ]
    },
    {
      brand: "Green Trends",
      desc: "Turnkey execution for 31 luxury salon outlets. We maintain rigid brand standards and rapid deployment across shopping malls and high-street locations in Chennai, Hyderabad, Bangalore, and Vijayawada.",
      images: [greens1, greens2],
      tags: ["Wellness", "Franchise"],
      hasBranches: true,
      branchCount: "31",
      locations: [
        "Velacherry (Chennai)", "Kotturpuram (Chennai)", "Kovilambakkam (Chennai)", "Annanagar (Chennai)", "Perungudi (Chennai)",
        "Perumbakkam (Chennai)", "Royapuram (Chennai)", "Velacherry", "Banjara Hills (Hyderabad)", "AOC (Hyderabad)",
        "Manigonda (Hyderabad)", "SINDHI COLONY (Hyderabad)", "Kukatpally (Hyderabad)", "Banashankari (Bangalore)", "HSR Layout (Bangalore)",
        "HBR Layout (Bangalore)", "Manipal County (Bangalore)", "Vijayawada", "Guntur", "Vellore", "Pondicherry", "Pollachi"
      ]
    },
    
    {
      brand: "TAFE",
      desc: "Industrial administrative interiors and corporate blocks for TAFE across 12 locations, including Corporate Offices in Nungambakkam and regional centers in Chennai and Bhopal.",
      images: [tafe1, tafe2],
      tags: ["Industrial", "Corporate"],
      hasBranches: true,
      branchCount: "12",
      locations: [
        "Corporate Office (Nungambakkam)", "Tractor & Farm Equipment (Sembiam)", "TAFE Motors & Tractors (Bhopal)", "Administrative Block (R.K. Salai)",
        "TAFE Office (Chennai)", "Regional Center (Nungambakkam)"
      ]
    },
    {
      brand: "Oecl",
      desc: "Turnkey agile workspace for global logistics operations, focusing on open-plan efficiency and smart lighting systems.",
      images: [oecl1, oecl2],
      tags: ["Corporate", "Agile Workspace"],
      hasBranches: false
    }
  ];

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
            <div className="flex flex-wrap gap-6 md:gap-10">
              <StatItem label="Material Durability" val="Grade-A" unit="" color="#008b98" />
              <StatItem label="MEP Precision" val="100" unit="%" color="#008b98" />
              <StatItem label="Branches Delivered" val="283" unit="+" color="#008b98" />
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

      {/* 3. FURNITURE SECTION */}
      <section className="py-20 md:py-40 bg-[#0A0D0C] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-tight text-white mb-6">
            Modern <br /> <span className="text-[#008b98]">Furnitures.</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl">
            We create highly functional smart office spaces with modular workstations, executive desks, and efficient storage solutions that support collaboration and focused productivity.
          </p>
        </div>

        <div className="relative px-4 md:px-16 group">
          <button className="prev-btn absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-black/50 border-2 border-white/90 text-white hover:bg-[#008b98] hover:scale-110 transition-all duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100">
            <ChevronLeft size={32} />
          </button>

          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1.2}
            loop={true}
            navigation={{
              prevEl: '.prev-btn',
              nextEl: '.next-btn',
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="rounded-3xl"
          >
            {features.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden group/card">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-8">
                    <h3 className="text-white text-3xl font-bold uppercase mb-2">{item.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="next-btn absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-black/50 border-2 border-white/90 text-white hover:bg-[#008b98] hover:scale-110 transition-all duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100">
            <ChevronRight size={32} />
          </button>
        </div>
      </section>

      {/* 4. VM SECTION */}
      <section className="py-16 md:py-20 bg-white text-black rounded-[2rem] md:rounded-[4rem] mx-2 md:mx-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
            <div className="lg:col-span-5 space-y-6 md:space-y-8">
              <span className="text-[#008b98] font-black text-sm tracking-[0.3em] uppercase block">Surface Branding</span>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">Virtual<br /> <span className="text-[#008b98]">Merchandise</span></h2>
              <div className="space-y-6 pt-4">
                <VMItem icon={<Box size={20} />} title="WALL TEXTURES & STUCCO FINISHES" desc="Premium stucco and textured painting solutions for rich, elegant surfaces." />
                <VMItem icon={<Eye size={20} />} title="WALLPAPERS & CUSTOM WALL POSTERS" desc="Designer wallpapers and customized decorative wall graphics tailored to your space." />
                <VMItem icon={<Rocket size={20} />} title="PRIVACY SUNFILMS & FROSTED FILMS" desc="Customized privacy, sun-control, and frosted films for glass partitions and windows." />
                <VMItem icon={<Box size={20} />} title="ACRYLIC LOGOS & BRANDING" desc="Precision-cut acrylic logos, name plates, and complete branding solutions." />
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="space-y-3 md:space-y-4">
                  <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-lg aspect-[4/5]"><img src={vm1} className="h-full w-full object-cover" alt="VM 1" /></div>
                  <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-lg aspect-square"><img src={vm2} className="h-full w-full object-cover" alt="VM 2" /></div>
                </div>
                <div className="space-y-3 md:space-y-4 pt-8 md:pt-12">
                  <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-lg aspect-square"><img src={vm3} className="h-full w-full object-cover" alt="VM 3" /></div>
                  <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-lg aspect-[4/5]"><img src={vm4} className="h-full w-full object-cover" alt="VM 4" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ELITE PORTFOLIO SECTION */}
      <section className="py-24 md:py-48 bg-[#0A0D0C] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#008b98] blur-[150px] rounded-full" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#008b98] blur-[150px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 md:mb-40 gap-8">
            <div className="text-left md:mb-12">
              <span className="text-[#008b98] font-black text-sm tracking-[0.5em] uppercase mb-4 block">Elite Portfolio</span>
              <h2 className="text-6xl md:text-[6vw] font-black uppercase text-white tracking-tighter leading-[0.85]">
                Benchmark <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px #008b98' }}>Excellence.</span>
              </h2>
            </div>
            <div className="hidden lg:block text-right max-w-xs pb-4">
              <p className="text-white/40 text-sm uppercase font-bold tracking-widest leading-relaxed">
                Strategic interior partners for India's leading corporate and retail powerhouses.
              </p>
            </div>
          </div>

          <div className="space-y-60 md:space-y-80">
            {clientProjects.map((project, idx) => (
              <motion.div key={idx} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} className="relative">
                <div className="absolute -top-32 md:-top-48 left-0 w-full flex justify-start pointer-events-none overflow-hidden select-none opacity-10">
                  <span className="text-[25vw] font-black text-white uppercase tracking-tighter whitespace-nowrap leading-none">0{idx + 1}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 items-start pt-20">
                  <div className={`lg:col-span-5 space-y-10 ${idx % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-3">
                        {project.tags.map(t => (
                          <span key={t} className="px-4 py-1.5 bg-[#008b98]/10 border border-[#008b98]/20 rounded-full text-[10px] font-black text-[#81d6de] tracking-widest uppercase">{t}</span>
                        ))}
                      </div>
                      <h3 className="text-5xl md:text-6xl font-black uppercase text-white tracking-tighter leading-[0.9]">{project.brand}</h3>
                    </div>

                    {project.hasBranches && (
                      <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#008b98] to-[#005f68] text-white shadow-2xl relative overflow-hidden group/branch">
                        <div className="relative z-10">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                              <Rocket size={24} className="animate-pulse" />
                            </div>
                            <span className="font-black text-xl uppercase tracking-tighter">Network Excellence</span>
                          </div>
                          <p className="text-white/90 text-sm md:text-md font-bold uppercase tracking-widest leading-snug">
                            Exclusive turnkey partner for <span className="text-white text-3xl block mt-1">{project.branchCount} Branches Delivered</span>
                          </p>
                        </div>
                        <ShieldCheck size={120} className="absolute -right-8 -bottom-8 text-white/10 rotate-12 group-hover/branch:rotate-0 transition-transform duration-700" />
                      </div>
                    )}

                    <div className="space-y-8">
                      <p className="text-white/60 text-lg md:text-lg leading-relaxed italic font-medium">"{project.desc}"</p>
                      <button onClick={openContactPopup} className="group flex items-center gap-6 text-white">
                        <div className="w-16 h-16 rounded-full border-2 border-[#008b98] flex items-center justify-center group-hover:bg-[#008b98] transition-all duration-500">
                          <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-500" />
                        </div>
                        <div className="text-left">
                          <span className="block text-[10px] uppercase font-black tracking-[0.3em] text-[#008b98]">Inquiry</span>
                          <span className="text-xl font-bold uppercase tracking-tighter">Request Project Specs</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className={`lg:col-span-7 relative ${idx % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="relative">
                      <div className="rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5] md:aspect-video relative z-10 border-4 border-white/5">
                        <img src={project.images[0]} className="w-full h-full object-cover" alt={project.brand} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      <div className={`absolute -bottom-20 md:-bottom-32 ${idx % 2 === 0 ? "-right-8 md:-right-16" : "-left-8 md:-left-16"} w-1/2 md:w-2/5 aspect-square rounded-[2rem] overflow-hidden shadow-2xl z-20 border-8 border-[#0A0D0C]`}>
                        <img src={project.images[1] || project.images[0]} className="w-full h-full object-cover" alt={project.brand} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- BRANCH LIST TABLE DESIGN --- */}
                {project.hasBranches && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-24 md:mt-40 bg-white/5 rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-12 border border-white/10"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <MapPin className="text-[#008b98]" size={28} />
                      <h4 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white">Branch Network <span className="text-[#008b98]">Map.</span></h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4">
                      {project.locations?.map((loc, i) => (
                        <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5 group hover:border-[#008b98]/50 transition-colors">
                          <span className="text-[10px] font-black text-[#008b98] opacity-50">{i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
                          <span className="text-sm md:text-base font-bold text-white/80 group-hover:text-white uppercase tracking-wider">{loc}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WORKFLOW */}
      <section className="py-20 md:py-40 bg-[#0A0D0C] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-7xl font-bold uppercase text-white tracking-tighter mb-20">6 - Step <span className="text-[#008b98]">Project Roadmap</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-left">
            <WorkflowStep num="01" title="Evaluation & Planning" icon={<Layers />} detail="We analyze brand needs and spatial flow to provide a detailed project proposal." />
            <WorkflowStep num="02" title="Technical Blueprints" icon={<PenTool />} detail="Plans for layouts, lighting, and infrastructure to ensure seamless functionality." />
            <WorkflowStep num="03" title="Material & Sourcing" icon={<Palette />} detail="Procurement of certified, high-quality materials built for durability." />
            <WorkflowStep num="04" title="Construction & Crafting" icon={<HardHat />} detail="On-site build management maintaining strict safety and environmental standards." />
            <WorkflowStep num="05" title="Quality Assurance" icon={<ClipboardCheck />} detail="A rigorous 146+ point inspection to verify every detail meets our standards." />
            <WorkflowStep num="06" title="The Grand Handover" icon={<Rocket />} detail="A turnkey space ready for your team to walk in and start working." />
          </div>
        </div>
      </section>

      {/* 7. WHY ARSEN */}
      <section className="py-20 md:py-40 relative overflow-hidden bg-[#0A0D0C]">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 min-h-[800px] md:h-[600px]">
            {/* Box 1: Factory Standards */}
            <div className="md:col-span-2 md:row-span-2 bg-white/5 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col justify-between overflow-hidden relative group min-h-[300px] border border-white/10">
              <img src={factoryStandard} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-1000" alt="Material" />
              <h4 className="text-3xl md:text-5xl font-black uppercase relative z-10 text-white">Factory <br /> Standards.</h4>
              <p className="text-white/80 relative z-10 text-base md:text-2xl font-bold italic">In-house production facility with advanced machinery and strict quality control.</p>
            </div>

            {/* Box 2: Zero Production Delays */}
            <div className="md:col-span-2 bg-[#008b98] rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-white flex items-center justify-between shadow-2xl relative overflow-hidden group">
              <img src={cFactory1} className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity" alt="Efficiency" />
              <h4 className="text-2xl md:text-5xl font-black uppercase relative z-10">Zero <br /> Production Delays.</h4>
              <ShieldCheck className="w-12 h-12 md:w-[60px] md:h-[60px] relative z-10" strokeWidth={1} />
            </div>

            {/* Box 3: 365 Days Support */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 text-white flex flex-col justify-center text-center relative overflow-hidden group">
              <img src={cFactory2} className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity" alt="Support" />
              <p className="text-4xl md:text-5xl font-black italic text-[#81d6de] relative z-10">365</p>
              <p className="text-[9px] md:text-[20px] uppercase font-bold tracking-widest mt-2 text-white/40 relative z-10">Days Service Support</p>
            </div>

            {/* Box 4: Quality Compromise */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 flex flex-col justify-center text-center text-white relative overflow-hidden group">
              <img src={cFactory3} className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity" alt="Quality" />
              <CheckCircle2 size={40} className="mx-auto text-[#008b98] relative z-10" />
              <p className="text-[12px] md:text-[18px] lg:text-[22px] uppercase font-bold tracking-widest mt-4 text-white/60 leading-tight relative z-10">No Hidden Costs & Quality Compromise</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

// --- HELPER SUB-COMPONENTS ---
const features = [
  { title: "Modular Workstations", desc: "Smart modular workstations designed for flexibility, comfort, and productivity.", img: modular },
  { title: "Workspace", desc: "Dynamic workspaces with adaptive modular systems and ergonomic precision.", img: workspace },
  { title: "Cabins", desc: "Premium, ergonomic cabin setups with smart storage and refined finishes.", img: cabins },
  { title: "Meeting Points", desc: "Discussion areas with AV setup and functional meeting tables.", img: conference },
  { title: "Breakout Area", desc: "Inviting areas with comfortable seating for relaxed collaboration.", img: hero1 },
  { title: "Office Pantry", desc: "Durable counters with functional storage for seamless breaks.", img: dining },
  { title: "Reception", desc: "Welcoming front office spaces with elegant counters.", img: sundaram2 }
];

const StatItem = ({ label, val, unit, color }: any) => (
  <div className="space-y-1">
    <p className="text-3xl md:text-4xl font-black uppercase" style={{ color }}>{val}<span className="text-sm ml-1 uppercase">{unit}</span></p>
    <p className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-black/40">{label}</p>
  </div>
);

const VMItem = ({ icon, title, desc }: any) => (
  <div className="flex gap-4 md:gap-6 items-start">
    <div className="p-3 md:p-4 bg-gray-100 rounded-xl md:rounded-2xl flex-shrink-0 text-[#008b98]">{icon}</div>
    <div>
      <h3 className="text-md md:text-lg font-bold uppercase">{title}</h3>
      <p className="text-sm md:text-lg text-black/50 font-medium leading-tight">{desc}</p>
    </div>
  </div>
);

const WorkflowStep = ({ num, title, icon, detail }: any) => (
  <div className="p-8 md:p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] md:rounded-[3rem] space-y-4 md:space-y-6 group hover:border-[#008b98]/50 transition-all">
    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#008b98]/20 text-[#008b98] flex items-center justify-center text-xl md:text-2xl group-hover:bg-[#008b98] group-hover:text-white transition-all">
      {icon}
    </div>
    <div>
      <p className="text-[#008b98] font-bold text-[12px] uppercase mb-2">Phase {num}</p>
      <h4 className="text-xl md:text-2xl font-bold uppercase text-white mb-3 md:mb-4">{title}</h4>
      <p className="text-white/40 text-md md:text-lg leading-relaxed">{detail}</p>
    </div>
  </div>
);

export default ArsenCommercial;