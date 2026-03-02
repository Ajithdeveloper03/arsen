"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote, ChevronLeft, ChevronRight,
  ShieldCheck, Clock, Settings, Headphones, Star, MapPin, Factory, Calendar, Trophy,
  Cpu, Layers
} from "lucide-react";

// Assets
import varun from '../assets/varun.png';
import loga from '../assets/pachamuthu.png';
import pradeep from '../assets/pradeep.png';
import vidya from '../assets/vidya.png';
import ravi from '../assets/ravi.png';
import aaryan from '../assets/aaryan.png';
import floating1 from '../assets/floating1.png';
import floating2 from '../assets/floating2.png';
import floating3 from '../assets/floating3.png';
import floating4 from '../assets/floating4.png';
import floating5 from '../assets/floating5.png';
import aboutbg from '../assets/about-bg.jpg';
import factory1 from '../assets/standard1.png';
import factory2 from '../assets/standard2.png';
import factory3 from '../assets/standard3.png';
import factory4 from '../assets/standard4.png';
import factory5 from '../assets/standard5.png';
import about1 from '../assets/about1.jpg';
import about2 from '../assets/about2.jpg';
import about3 from '../assets/residential1.jpg';
import about4 from '../assets/home-slider-residential2.jpg';


import factoryVideo from '../assets/factory.mp4';

const EliteAboutPage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "Very well experienced staff they are aware of latest and upcoming materials in the market. in house manufacturing is an added advantage for the projects so they can flexible with the alterations and quality manufacturing,excellent knowledge on designing work .Senthil hope will work again on other projects highly recommendable",
      author: "varun V",
      // company: "Private Residence, Mumbai",
      img: varun
    },
    {
      quote: "I had a great experience with arsen interiors for my boutique...initially I was skeptical but final outcome of the project was amazing and completely satisfied with the quality of materials and innovations.",
      author: "Loga Palanimuthu",
      // company: "Skyline Apartments",
      img: loga
    },
    {
      quote: "Job well done with good finish of interiors. Excellent customer service, flexible giving good insight suggestions according to meet client actual needs.",
      author: "Pradheep Balakrishnan",
      // company: "Villa Owner",
      img: pradeep
    },
    {
      quote: "Found them through a friend and I'm glad I did. They respected our budget without compromising on the premium aesthetic we wanted for our master suite.",
      author: "vidya Ravi",
      // company: "The Grand Residency",
      img: vidya
    },
    {
      quote: "Very nice and affordable partner.... Received fast services and made us to feel comfortable.. Reliable team...",
      author: "Ravi ramanathan",
      // company: "Penthouse Project",
      img: ravi
    },
    {
      quote: "The custom wardrobe solutions they provided saved us so much space. The finish quality of the laminates and hardware is clearly superior to local vendors.",
      author: "Aaryan Aarush",
      // company: "Urban Meadows",
      img: aaryan
    }
  ];

  const milestones = [
    { year: "2009", title: "The Inception", desc: "Company Started", icon: <Calendar size={20} /> },
    { year: "2012", title: "50+ Milestones", desc: "Residential & Commercial Achievements", icon: <Trophy size={20} /> },
    { year: "2016", title: "Industrial Growth", desc: "Factory Setup - Arsen Furniture (6000+ Sqft)", icon: <Factory size={20} /> },
    { year: "2017", title: "300+ Projects", desc: "Both Residential And commercial ", icon: <Star size={20} /> },
    { year: "2018", title: "Private Limited", desc: "Arsen Interio Pvt Ltd", icon: <ShieldCheck size={20} /> },
    { year: "2020", title: "1000+ Smiles", desc: "Happy customers reached", icon: <Quote size={20} /> },
    { year: "2024", title: "Area Transformed", desc: "2.1M+ Sq.ft Evolved", icon: <MapPin size={20} /> },
  ];

  return (
    <div className="bg-[#FCFCFA] text-[#010B0A] overflow-x-hidden selection:bg-[#FDBA74] selection:text-black">

      {/* ================= HERO ================= */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#010B0A]">
        <img
          src={aboutbg}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          alt="Hero"
        />
        <div className="relative z-10 text-center px-6">
          <span className="text-[#FDBA74] tracking-[0.2em] text-md font-black mb-4 block uppercase">Beyond Architecture</span>
          <h1 className="text-[12vw] md:text-[10vw] font-black leading-none tracking-tighter text-white uppercase italic">
            Arsen <span className="text-transparent" style={{ WebkitTextStroke: '1.8px rgba(255, 255, 255, 0.8)' }}>Interio</span>
          </h1>
          <p className="text-white/40 text-md tracking-[0.5em] mt-4 uppercase font-bold">Turnkey Fit-Out Specialists</p>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="py-24 md:py-40 px-6 md:px-24 bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-5 space-y-8">
            <span className="text-[#032d29] font-black text-md tracking-widest uppercase">Who We Are</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              Full <br /> <span className="text-[#FDBA74]">Scope</span> <br /> Execution.
            </h2>
            <p className="text-gray-600 text-xl leading-relaxed font-normal">Arsen Interio specializes in the full scope of commercial & residential turnkey fit-outs. We bring in-house engineering and artisan craftsmanship to corporate offices, luxury hospitals, and premium residential spaces.</p>
            <div className="flex flex-wrap gap-4 pt-4">
              {["Corporate", "Retail", "Hospitality", "Residential"].map(tag => (
                <span key={tag} className="px-4 py-2 border border-black/10 rounded-full text-[12px] font-bold uppercase tracking-widest">{tag}</span>
              ))}
            </div>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="space-y-4">
              <img src={about1} className="rounded-2xl h-[250px] w-full object-cover shadow-lg" alt="Execution 1" />
              <img src={about2} className="rounded-2xl h-[180px] w-full object-cover shadow-lg" alt="Execution 2" />
            </div>
            <div className="space-y-4 pt-8">
              <img src={about3} className="rounded-2xl h-[180px] w-full object-cover shadow-lg" alt="Execution 3" />
              <img src={about4} className="rounded-2xl h-[250px] w-full object-cover shadow-lg" alt="Execution 4" />
            </div>
            <div className="space-y-4 pt-4 hidden sm:block">
              <img src="https://images.pexels.com/photos/7250788/pexels-photo-7250788.jpeg" className="rounded-2xl h-[220px] w-full object-cover shadow-lg" alt="Execution 5" />
              <img src="https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg" className="rounded-2xl h-[210px] w-full object-cover shadow-lg" alt="Execution 6" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= MILESTONES (CHRONICLES) ================= */}
      <section className="py-32 bg-[#010B0A] relative overflow-hidden">
        {/* Background Marquee */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.05] select-none">
          <motion.h2
            animate={{ x: [0, -1000] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="text-[25vw] font-black uppercase whitespace-nowrap leading-none text-white"
          >
            THE JOURNEY THE LEGACY THE EVOLUTION
          </motion.h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-32">
            <span className="text-[#FDBA74] tracking-[1em] text-xs font-bold uppercase mb-4 block">Timeline</span>
            <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter">
              Our <span className="text-transparent font-outline" style={{ WebkitTextStroke: '1.5px white' }}>Legacy</span>
            </h2>
          </div>

          <div className="relative">
            <svg
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[110%] opacity-40 pointer-events-none z-0"
              viewBox="0 0 400 2000"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FDBA74" stopOpacity="0" />
                  <stop offset="15%" stopColor="#FDBA74" stopOpacity="1" />
                  <stop offset="85%" stopColor="#FDBA74" stopOpacity="1" />
                  <stop offset="100%" stopColor="#FDBA74" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 4, ease: [0.22, 1, 0.36, 1], opacity: { duration: 1.5 } }}
                d="M200 0 C 350 300, 50 600, 200 900 C 350 1200, 50 1500, 200 1700 C 300 1850, 100 1950, 200 2000"
                stroke="url(#lineGradient)"
                strokeWidth="6"
                fill="none"
                filter="url(#glow)"
              />
            </svg>

            <div className="space-y-32 md:space-y-28 relative z-20">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`flex flex-col md:flex-row items-center justify-center ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  <div className={`w-full md:w-[45%] p-8 md:p-12 rounded-[3rem] bg-white/[0.03] border border-[#FDBA74]/20 backdrop-blur-sm group hover:bg-white/[0.06] transition-all relative z-30 ${i % 2 === 0 ? "text-center md:text-right" : "text-center md:text-left"}`}>
                    <div className={`inline-flex items-center justify-center p-4 rounded-2xl bg-[#FDBA74] text-black mb-6 ${i % 2 === 0 ? "md:ml-auto" : ""}`}>
                      {m.icon}
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase mb-2 group-hover:text-[#FDBA74] transition-colors">{m.title}</h3>
                    <p className="text-white/50 text-lg font-medium leading-relaxed">{m.desc}</p>
                  </div>

                  <div className="w-full md:w-[10%] flex flex-col items-center py-12 md:py-0 relative z-30">
                    <div className="relative">
                      <motion.span
                        whileInView={{ scale: [0.8, 1.1, 1] }}
                        className="text-7xl md:text-7xl font-black text-white relative z-10 tracking-tighter block"
                        style={{ textShadow: "0 0 30px rgba(253,186,116,0.2)" }}
                      >
                        {m.year}
                      </motion.span>
                      <div className="absolute inset-0 bg-[#FDBA74] blur-[60px] opacity-10 rounded-full" />
                    </div>
                  </div>

                  <div className="hidden md:block w-[45%]" />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-40 p-12 rounded-[4rem] bg-gradient-to-b from-[#FDBA74] to-[#f79d3d] text-center"
          >
            <p className="text-2xl md:text-3xl font-black text-[#010B0A] uppercase leading-snug max-w-4xl mx-auto">
              "We are a trusted, responsible brand—an esteemed partner and a part of every client’s home."
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= FOUNDERS ================= */}
      <section className="py-24 md:py-48 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              className="bg-[#F8F9F8] p-12 md:p-20 rounded-[3rem] relative group"
            >
              <div className="text-[120px] font-black text-[#FDBA74]/10 absolute top-10 left-10 pointer-events-none uppercase">Trust</div>
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-medium mb-12 relative z-10 italic">
                "At Arsen Interior Pvt. Ltd., our strength lies in our people, our workplace culture, and our well-organized systems. We are supported by a highly skilled and experienced team that brings technical expertise to every project."
              </p>
              <div className="relative z-10">
                <h4 className="text-3xl font-black uppercase tracking-tighter">S. Lavanyaa</h4>
                <p className="text-[#032d29] font-black text-[13px] uppercase tracking-[0.2em] mt-2">Executive Director • Arsen Interio Pvt. Ltd.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              className="bg-[#032d29] p-12 md:p-20 rounded-[3rem] text-white relative"
            >
              <div className="text-[120px] font-black text-white/5 absolute bottom-10 right-10 pointer-events-none font-outline uppercase">Vision</div>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed font-medium mb-12 relative z-10 italic">
                "Our journey has been guided by a strong commitment to quality and innovation. We take pride in delivering comprehensive design solutions that combine creativity with technical expertise, ensuring every project meets professional standards."
              </p>
              <div className="relative z-10">
                <h4 className="text-3xl font-black uppercase tracking-tighter text-[#FDBA74]">R. Senthil Kumar</h4>
                <p className="text-white/50 font-black text-[13px] uppercase tracking-[0.2em] mt-2">Founder & MD • Arsen Interio Pvt. Ltd.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= WARRANTY ================= */}
      <section className="py-32 bg-[#FCFCFA] px-6 border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 flex flex-col justify-center">
              <span className="text-[#FDBA74] font-black text-xs tracking-widest uppercase mb-4">Post-Execution</span>
              <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] mb-8">Arsen <br /> Service <br /> <span className="text-[#032d29]">Legacy.</span></h2>
              <p className="text-gray-500 text-xl">Every space we craft is backed by rigorous technical warranties and 365-day dedicated engineering support.</p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-black/5 border border-black/5 rounded-[4rem] overflow-hidden shadow-2xl">
              {[
                { icon: <ShieldCheck size={30} />, title: "10-Year Product", desc: "Full coverage on manufactured woodwork & furniture under normal domestic use conditions.", years: "Product" },
                { icon: <Clock size={30} />, title: "1-3 Year Install", desc: "Countertops, false ceilings, painting, and shower enclosures warranty based on item specs.", years: "Installation" },
                { icon: <Headphones size={30} />, title: "24/7 Support", desc: "Ongoing dedicated maintenance support available even beyond primary warranty guidelines.", years: "Support" },
                { icon: <Settings size={30} />, title: "Global Brand", desc: "Accessories and hardware are protected as per the original manufacturer’s global warranty.", years: "Hardware" }
              ].map((item, i) => (
                <div key={i} className="bg-white p-12 hover:bg-[#032d29] hover:text-white transition-all duration-500 group">
                  <div className="text-[#FDBA74] mb-8 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h4 className="text-2xl font-bold uppercase tracking-tight mb-4">{item.title}</h4>
                  <p className="text-lg opacity-60 leading-relaxed mb-4">{item.desc}</p>
                  <span className="text-[13px] font-black uppercase tracking-[0.2em] text-[#FDBA74] group-hover:text-white">{item.years}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FACTORY INFRASTRUCTURE ================= */}
      <section className="relative py-24 md:py-32 bg-[#FCFCFA] px-4 md:px-8 overflow-hidden">
        {/* Main Wrapper to contain floating elements and content together */}
        <div className="max-w-[1600px] mx-auto relative">

          {/* Floating Left Elements (Machines) - Visible on lg+ */}
          <div className="hidden lg:flex absolute left-0 top-[10%] flex-col gap-24 xl:gap-32 z-10 w-[150px] xl:w-[200px]">
            {/* Custom Styles for Floating Animation */}
            <style dangerouslySetInnerHTML={{
              __html: `
               @keyframes smoothFloat {
                 0%, 100% { transform: translateY(0); }
                 50% { transform: translateY(-20px); }
               }
               .floating-machine {
                 animation: smoothFloat 4s ease-in-out infinite;
               }
             ` }} />

            <div className="floating-machine rotate-[-10deg] hover:rotate-0 transition-transform duration-500">
              <img src={floating1} className="w-full h-auto aspect-video object-contain rounded-xl mb-2" alt="spencial-design-machine" />
              <p className="text-[10px] font-black uppercase text-center tracking-widest text-[#032d29]/40">Spencial-Design-Machine</p>
            </div>
            <div className="floating-machine rotate-[5deg] hover:rotate-0 transition-transform duration-500" style={{ animationDelay: '1s' }}>
              <img src={floating2} className="w-full h-auto aspect-video object-contain rounded-xl mb-2" alt="coldpress machine" />
              <p className="text-[10px] font-black uppercase text-center tracking-widest text-[#032d29]/40">Cold-Press</p>
            </div>
          </div>

          {/* Floating Right Elements (Machines) - Visible on lg+ */}
          <div className="hidden lg:flex absolute right-0 top-[5%] flex-col gap-16 xl:gap-24 z-10 w-[150px] xl:w-[220px]">
            <div className="floating-machine rotate-[8deg] hover:rotate-0 transition-transform duration-500" style={{ animationDelay: '0.5s' }}>
              <img src={floating3} className="w-full h-auto aspect-video object-contain rounded-xl mb-2" alt="Edge Binding" />
              <p className="text-[10px] font-black uppercase pl-2 text-center tracking-widest text-[#032d29]/40">Edge Binding Machine</p>
            </div>
            <div className="floating-machine rotate-[-5deg] hover:rotate-0 transition-transform duration-500" style={{ animationDelay: '1.5s' }}>
              <img src={floating4} className="w-full h-auto aspect-video object-contain rounded-xl mb-2" alt="multi-boring-machine" />
              <p className="text-[10px] font-black uppercase pl-2 text-center tracking-widest text-[#032d29]/40">Multi-Boring-Machine</p>
            </div>
            <div className="floating-machine rotate-[12deg] hover:rotate-0 transition-transform duration-500" style={{ animationDelay: '2s' }}>
              <img src={floating5} className="w-full h-auto aspect-video object-cover rounded-xl mb-2" alt="panel-saws-j-3200-in-pro-plus-1" />
              <p className="text-[10px] font-black uppercase text-center pl-2 tracking-widest text-[#032d29]/40">Panel-Saws-j-3200-in-pro-plus-1</p>
            </div>
          </div>

          {/* Main Content Container */}
          <div className="max-w-7xl mx-auto px-4 lg:px-12 xl:px-24 relative z-0">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="w-full lg:w-[45%] space-y-8 md:space-y-10">
                <div className="space-y-4 text-center lg:text-left">
                  <span className="text-[#032d29] font-black text-xs tracking-[0.3em] uppercase block">Established in 2013</span>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85]">
                    Our <span className="text-[#FDBA74]">Factory</span> <br /> Setup
                  </h2>
                </div>
                <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl text-center lg:text-left mx-auto lg:mx-0">
                  Spanning over <span className="text-black font-bold">25,000+ Sq.ft</span>, Arsen Furnitures & Fixtures is equipped with the latest European machinery. This in-house facility allows us to maintain surgical precision and absolute quality control.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 py-2">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[#032d29] justify-center lg:justify-start">
                      <Cpu size={24} />
                      <span className="font-bold uppercase text-sm md:text-md tracking-widest">Hi-Tech Machinery</span>
                    </div>
                    <p className="text-sm md:text-md text-gray-500 leading-relaxed text-center lg:text-left">Precision Panel Saw cutting, Triple-Head Multi-Boring, and Automatic Edge-Banding.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[#032d29] justify-center lg:justify-start">
                      <Layers size={24} />
                      <span className="font-bold uppercase text-sm md:text-md tracking-widest">Material Grade</span>
                    </div>
                    <p className="text-sm md:text-md text-gray-500 text-center lg:text-left">Certified HDMR, BWP Plywood, and premium veneers only.</p>
                  </div>
                </div>

                <div className="bg-[#032d29] p-6 rounded-[2rem] text-white flex flex-row justify-between items-center max-w-sm mx-auto lg:mx-0 shadow-xl">
                  <div className="flex items-center gap-4">
                    <Factory size={32} className="text-[#FDBA74]" />
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black">25,000+</h3>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Square Feet Capacity</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Multimedia Content */}
              <div className="w-full lg:w-[55%] mt-12 lg:mt-0">
                <div className="flex flex-col gap-4">
                  {/* Vertical Video - Filling the space */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                    className="w-full relative group overflow-hidden rounded-[2.5rem] shadow-2xl h-[350px] sm:h-[450px] md:h-[650px] bg-black"
                  >
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                      <source src={factoryVideo} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 text-white">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FDBA74]">Live Workshop</span>
                      <p className="text-lg md:text-xl font-bold uppercase tracking-tight">Automated Precision</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Bottom Factory Gallery (min 5 pics) */}
            <div className="mt-16 md:mt-24">
              <h3 className="text-black font-black uppercase text-[10px] tracking-[0.4em] mb-8 text-center opacity-30">Inside Our Facility</h3>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
                {[factory1, factory2, factory3, factory4, factory5].map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="rounded-[2rem] md:rounded-[2.5rem] overflow-hidden h-[180px] md:h-[250px] shadow-xl group border-[3px] md:border-4 border-white"
                  >
                    <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Factory Floor" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20 bg-[#032d29] rounded-[4rem] mx-4 md:mx-10 mb-20">
        <div className="max-w-4xl mx-auto px-6 space-y-10">
          <div className="text-center mb-2 space-y-5">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#FDBA74" stroke="none" />)}
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
              Verified <span className="text-[#FDBA74]">Google</span> Reviews
            </h2>
            {/* <p className="text-white/40 font-bold uppercase tracking-widest text-xs mt-4">Transparent Feedback from our esteemed clients</p> */}
          </div>

          <div className="relative h-[300px] mb-5 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center w-full"
              >
                <h2 className="text-2xl md:text-4xl font-bold text-white italic mb-5">
                  "{testimonials[activeTestimonial].quote}"
                </h2>
                <div className="flex justify-center items-center gap-3">
                  <img src={testimonials[activeTestimonial].img} className="w-14 h-14 rounded-full border border-[#FDBA74]" />
                  <div>
                    <p className="text-[#FDBA74] font-black uppercase text-xs">{testimonials[activeTestimonial].author}</p>
                    {/* <p className="text-white/50 uppercase text-[10px] font-bold">{testimonials[activeTestimonial].company}</p> */}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-3 mt-6">
            <button onClick={() => setActiveTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)} className="p-4 rounded-full border border-white/10 text-white hover:bg-white/10"><ChevronLeft /></button>
            <button onClick={() => setActiveTestimonial(prev => prev === testimonials.length - 1 ? 0 : prev + 1)} className="p-4 rounded-full border border-white/10 text-white hover:bg-white/10"><ChevronRight /></button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default EliteAboutPage;