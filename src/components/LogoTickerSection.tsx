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
    const duration = 25; // Slightly faster for a more dynamic feel

    const animation = gsap.to(track, {
      xPercent: -50,
      repeat: -1,
      ease: "none", // Smoother linear flow
      duration,
    });

    // Pause on hover for better user interaction
    track.addEventListener("mouseenter", () => animation.pause());
    track.addEventListener("mouseleave", () => animation.play());

    return () => animation.kill();
  }, []);

  return (
    <section className="w-full py-12 bg-[#F9FBFA] relative overflow-hidden">
      {/* Subtle Silk Texture/Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#E8F2F0_0%,_transparent_40%)]" />
      
      <div className="text-center mb-12 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-[1px] w-8 bg-[#0F5B54]/20" />
          <p className="text-[#0F5B54] tracking-[0.2em] text-[18px] uppercase font-black">
            Industry Collaborations
          </p>
          <div className="h-[1px] w-8 bg-[#0F5B54]/20" />
        </div>
        <h2 className="text-gray-400 text-2xl font-medium italic">Partnering with the world's most innovative minds</h2>
      </div>

      {/* Edge Fading Masks (The "Lusion" look) */}
      <div className="relative">
        {/* Left Mask */}
        <div className="absolute left-0 top-0 w-32 h-full z-20 bg-gradient-to-r from-[#F9FBFA] to-transparent" />
        {/* Right Mask */}
        <div className="absolute right-0 top-0 w-32 h-full z-20 bg-gradient-to-l from-[#F9FBFA] to-transparent" />

        <div
          ref={trackRef}
          className="flex gap-6 whitespace-nowrap w-max py-2"
        >
          {[...logos, ...logos, ...logos].map((p, i) => (
            <div
              key={i}
              className="group px-8 py-5 rounded-2xl bg-white border border-gray-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(15,91,84,0.15)] flex items-center gap-4 cursor-pointer transition-all duration-500 hover:-translate-y-1"
            >
              <div className="p-2 rounded-lg bg-[#0F5B54]/5 group-hover:bg-[#0F5B54] transition-colors duration-500">
                <p.icon className="w-5 h-5 text-[#0F5B54] group-hover:text-white transition-colors duration-500" />
              </div>
              <span className="text-[#1A1A1A] font-bold tracking-tighter text-lg group-hover:text-[#0F5B54] transition-colors">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Border Accent */}
      <div className="max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-6" />
    </section>
  );
}