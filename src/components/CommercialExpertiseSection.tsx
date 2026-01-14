"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Building2, 
  ShoppingBag, 
  Utensils, 
  Stethoscope, 
  Flower2, 
  ArrowUpRight 
} from "lucide-react";

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

// Assets
import dinning from '../assets/home-dining.jpg';
import corporate from '../assets/home-corporate.jpg';
import greens from '../assets/greens3.jpg';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sectors = [
  { icon: Building2, title: "Corporate", subtitle: "Offices", img: corporate },
  { icon: ShoppingBag, title: "Retail", subtitle: "Showrooms", img: "https://images.pexels.com/photos/5705490/pexels-photo-5705490.jpeg" },
  { icon: Utensils, title: "Dining", subtitle: "Cafes", img: dinning },
  { icon: Stethoscope, title: "Medical", subtitle: "Healthcare", img: "https://images.pexels.com/photos/34260030/pexels-photo-34260030.jpeg" },
  { icon: Flower2, title: "Wellness", subtitle: "Spas", img: greens },
];

export default function CommercialExcellence() {
  const sectionRef = useRef(null);
  const gridBgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Background
      gsap.to(gridBgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Header Entrance
      gsap.from(".reveal-content", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#080808] py-16 md:py-32 overflow-hidden cursor-grab active:cursor-grabbing">
      
      {/* GRID BACKGROUND */}
      <div 
        ref={gridBgRef}
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#fff 1px, transparent 1px), linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px, 200px 200px, 200px 200px',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="reveal-content flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-teal-500 tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 block font-bold italic">Industry Sectors</span>
            <h2 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[900] tracking-tighter leading-[0.9] uppercase">
              Commercial <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #FDBA74' }}>Excellence.</span>
            </h2>
          </div>
          <p className="text-zinc-500 max-w-[320px] text-[10px] md:text-[14px] font-bold uppercase tracking-[0.1em] leading-relaxed border-l border-zinc-800 pl-6">
            providing turnkey interior solutions for diverse commercial environments for over 20 years.
          </p>
        </div>

        {/* SLIDER COMPONENT */}
        <div className="w-full">
          <Swiper
            modules={[Autoplay, FreeMode]}
            spaceBetween={30}
            slidesPerView={1.2}
            loop={true}
            freeMode={true}
            speed={6000} // Speed of the transition between slides
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
            }}
            className="commercial-swiper"
          >
            {sectors.map((sector, i) => (
              <SwiperSlide key={i} className="pb-10">
                <div className="group relative w-full h-[450px] md:h-[550px] rounded-[2.5rem] overflow-hidden bg-zinc-900 shadow-2xl transition-transform duration-500">
                  
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                    style={{ backgroundImage: `url(${sector.img})` }}
                  />
                  
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-20">
                    <div className="flex justify-between items-start">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-teal-500 group-hover:rotate-[15deg]">
                        <sector.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="p-3 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                        <ArrowUpRight className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-4xl md:text-5xl font-[900] text-white uppercase tracking-tighter leading-none">
                        {sector.title} <br />
                        <span className="text-zinc-500 transition-colors duration-500 group-hover:text-teal-400 group-hover:italic">{sector.subtitle}</span>
                      </h3>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* CSS Injection for Smooth Infinite Loop */}
      <style jsx global>{`
        .commercial-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
        .commercial-swiper .swiper-slide {
          pointer-events: auto;
        }
      `}</style>
    </section>
  );
}