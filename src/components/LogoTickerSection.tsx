"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Box, Triangle, Layers, Zap, Feather, Hexagon, Globe, Cpu } from "lucide-react";

const logos = [
  { name: "ARCHITEX", icon: Box },
  { name: "VANGUARD", icon: Triangle },
  { name: "LUSION", icon: Layers },
  { name: "PRISM", icon: Zap },
  { name: "NOVA", icon: Feather },
  { name: "ZENITH", icon: Hexagon },
  { name: "AETHER", icon: Globe },
  { name: "CORE", icon: Cpu },
];

export default function LogoTickerSection() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Use a context for clean cleanup
    const ctx = gsap.context(() => {
      const duration = 25;

      const animation = gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        ease: "none",
        duration,
      });

      const handleMouseEnter = () => animation.pause();
      const handleMouseLeave = () => animation.play();

      track.addEventListener("mouseenter", handleMouseEnter);
      track.addEventListener("mouseleave", handleMouseLeave);

      // Cleanup listeners inside context
      return () => {
        track.removeEventListener("mouseenter", handleMouseEnter);
        track.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full py-12 md:py-20 bg-[#F9FBFA] relative overflow-hidden">
      {/* Subtle Silk Texture/Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#E8F2F0_0%,_transparent_40%)] pointer-events-none" />
      
      <div className="text-center mb-8 md:mb-12 px-6 relative z-10">
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-3">
          <div className="h-[1px] w-6 md:w-8 bg-[#0F5B54]/20" />
          <p className="text-[#0F5B54] tracking-[0.15em] md:tracking-[0.2em] text-xs md:text-sm lg:text-[18px] font-black uppercase">
            Industry Collaborations
          </p>
          <div className="h-[1px] w-6 md:w-8 bg-[#0F5B54]/20" />
        </div>
        <h2 className="text-gray-400 text-base md:text-xl lg:text-2xl font-medium italic px-4">
          Partnering with the world's most innovative minds
        </h2>
      </div>

      {/* Edge Fading Masks */}
      <div className="relative w-full">
        {/* Adjusted mask widths for mobile (w-16) vs desktop (w-48) */}
        <div className="absolute left-0 top-0 w-16 md:w-48 h-full z-20 bg-gradient-to-r from-[#F9FBFA] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 w-16 md:w-48 h-full z-20 bg-gradient-to-l from-[#F9FBFA] to-transparent pointer-events-none" />

        <div
          ref={trackRef}
          className="flex gap-4 md:gap-6 whitespace-nowrap w-max py-4"
        >
          {/* Rendering double to ensure seamless loop */}
          {[...logos, ...logos].map((p, i) => (
            <div
              key={i}
              className="group px-5 py-3 md:px-8 md:py-5 rounded-xl md:rounded-2xl bg-white border border-gray-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(15,91,84,0.15)] flex items-center gap-3 md:gap-4 cursor-pointer transition-all duration-500 hover:-translate-y-1"
            >
              <div className="p-1.5 md:p-2 rounded-lg bg-[#0F5B54]/5 group-hover:bg-[#0F5B54] transition-colors duration-500">
                <p.icon className="w-4 h-4 md:w-5 md:h-5 text-[#0F5B54] group-hover:text-white transition-colors duration-500" />
              </div>
              <span className="text-[#1A1A1A] font-bold tracking-tighter text-base md:text-lg group-hover:text-[#0F5B54] transition-colors">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Border Accent */}
      <div className="max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-8 px-6" />
    </section>
  );
}