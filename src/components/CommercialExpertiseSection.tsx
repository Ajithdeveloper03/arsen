"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass, Layout, Award, Sparkles, PencilLine, Box, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  { icon: Compass, title: "Spatial", subtitle: "Vision", img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200" },
  { icon: Layout, title: "ROI", subtitle: "Centric", img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200" },
  { icon: Award, title: "Elite", subtitle: "Quality", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" },
  { icon: Sparkles, title: "Smart", subtitle: "Logic", img: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=1200" },
  { icon: PencilLine, title: "Bespoke", subtitle: "Art", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" },
  { icon: Box, title: "Full", subtitle: "Turnkey", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200" },
];

export default function CommercialExcellence() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const gridBgRef = useRef(null);

  // Helper for Spotlight effect
  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Background Grid Parallax
      gsap.to(gridBgRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // 2. Title Mask Animation
      gsap.from(".reveal-text-inner", {
        yPercent: 100,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // 3. Card Entrance
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card, 
          { 
            clipPath: "inset(100% 0% 0% 0%)",
            y: 50,
            opacity: 0 
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#080808] py-16 md:py-32 px-6 overflow-hidden">
      
      {/* MODERN GRID BACKGROUND */}
      <div 
        ref={gridBgRef}
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#fff 1px, transparent 1px), linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px, 200px 200px, 200px 200px',
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-12 md:mb-20 gap-8">
          <div className="overflow-hidden">
            <div className="reveal-text-inner">
                <span className="text-teal-500 tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 block font-bold">Arsen Intelligence</span>
                <h2 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[900] tracking-tighter leading-[0.9] uppercase">
                  Commercial <br />
                  <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #FDBA74' }}>Excellence.</span>
                </h2>
            </div>
          </div>
          <p className="text-zinc-500 max-w-[320px] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-relaxed border-l border-zinc-800 pl-6">
            Blending industrial strength with avant-garde aesthetics to redefine commercial spaces.
          </p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              onMouseMove={(e) => handleMouseMove(e, i)}
              className="group relative h-[400px] md:h-[450px] lg:h-[500px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-zinc-900 shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Content */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-110"
                style={{ backgroundImage: `url(${f.img})` }}
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />
              <div className="absolute inset-0 bg-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Interaction Content */}
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-20">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-teal-500 group-hover:border-teal-400 group-hover:rotate-[15deg]">
                    <f.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="p-2 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-teal-500 font-mono text-[9px] md:text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 block">
                    Module_{i + 1}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-[900] text-white uppercase tracking-tighter leading-none">
                    {f.title} <br />
                    <span className="text-zinc-600 transition-colors duration-500 group-hover:text-white group-hover:italic">{f.subtitle}</span>
                  </h3>
                </div>
              </div>

              {/* Spotlight Effect */}
              <div 
                className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(600px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(20, 184, 166, 0.15), transparent 80%)`
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}