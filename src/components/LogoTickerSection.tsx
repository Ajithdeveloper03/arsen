import React, { useEffect, useRef } from "react";
import gsap from "gsap";

// Assuming these are the paths in your project structure
import logo1 from '../assets/clients/logo2.webp';
import logo2 from '../assets/clients/logo3.webp';
import logo3 from '../assets/clients/logo5.webp';
import logo4 from '../assets/clients/logo14.svg';
import logo5 from '../assets/clients/logo7.webp';
import logo6 from '../assets/clients/logo8.webp';
import logo7 from '../assets/clients/logo11.webp';
import logo8 from '../assets/clients/logo12.webp';
import logo9 from '../assets/clients/logo13.webp';
import logo10 from '../assets/clients/w1.webp';
import logo11 from '../assets/clients/w2.webp';
import logo12 from '../assets/clients/logo15.jpg';
import logo13 from '../assets/clients/logo16.webp';
import logo14 from '../assets/clients/logo17.png';
import logo15 from '../assets/clients/logo18.png';
import logo16 from '../assets/clients/logo19.png';
import logo17 from '../assets/clients/logo20.png';
import logo18 from '../assets/clients/logo21.png';
import logo19 from '../assets/clients/logo22.svg';
import logo20 from '../assets/clients/logo23.svg';
import logo21 from '../assets/clients/logo24.png';
import logo22 from '../assets/clients/logo31.webp';
import logo23 from '../assets/clients/logo25.png';
import logo24 from '../assets/clients/logo26.webp';
import logo25 from '../assets/clients/logo27.png';
import logo26 from '../assets/clients/logo28.svg';
import logo27 from '../assets/clients/logo29.png';
import logo28 from '../assets/clients/logo30.png';
interface PartnerLogo {
  name: string;
  img: string;
}

const partnerLogos: PartnerLogo[] = [
  { name: "Partner 01", img: logo1 },
  { name: "Partner 02", img: logo2 },
  { name: "Partner 03", img: logo3 },
  { name: "Partner 04", img: logo4 },
  { name: "Partner 05", img: logo5 },
  { name: "Partner 06", img: logo6 },
  { name: "Partner 07", img: logo7 },
  { name: "Partner 08", img: logo8 },
  { name: "Partner 09", img: logo9 },
  { name: "Partner 10", img: logo10 },
  { name: "Partner 11", img: logo11 },
  { name: "Partner 12", img: logo12 },
  { name: "Partner 13", img: logo13 },
  { name: "Partner 14", img: logo14 },
  { name: "Partner 15", img: logo15 },
  { name: "Partner 16", img: logo16 },
  { name: "Partner 17", img: logo17 },
  { name: "Partner 18", img: logo18 },
  { name: "Partner 19", img: logo19 },
  { name: "Partner 20", img: logo20 },
  { name: "Partner 21", img: logo21 },
  { name: "Partner 22", img: logo22 },
  { name: "Partner 23", img: logo23 },
  { name: "Partner 24", img: logo24 },
  { name: "Partner 25", img: logo25 },
  { name: "Partner 26", img: logo26 },
  { name: "Partner 27", img: logo27 },
  { name: "Partner 28", img: logo28 },
  // { name: "Partner 29", img: logo29 },
  // { name: "Partner 30", img: logo30 },

];

const LogoTickerSection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // GSAP context ensures all animations are scoped and cleaned up
    const ctx = gsap.context(() => {
      const duration = 40; // Increased for a more elegant, smooth drift

      const animation = gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        ease: "none",
        duration: duration,
      });

      // Interactive Pausing
      const handleMouseEnter = () => animation.pause();
      const handleMouseLeave = () => animation.play();

      track.addEventListener("mouseenter", handleMouseEnter);
      track.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        track.removeEventListener("mouseenter", handleMouseEnter);
        track.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full py-16 md:py-14 bg-[#F9FBFA] relative overflow-hidden border-y border-gray-100">
      {/* Background Gradient Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#F0F7F6_0%,_transparent_40%)] pointer-events-none" />

      {/* Header Section */}
      <div className="text-center mb-12 md:mb-16 px-6 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-[1px] w-8 md:w-12 bg-[#0F5B54]/20" />
          <p className="text-[#0F5B54] tracking-[0.25em] text-[10px] md:text-xs font-black uppercase">
            Strategic Alliances
          </p>
          <div className="h-[1px] w-8 md:w-12 bg-[#0F5B54]/20" />
        </div>
        <h2 className="text-gray-900 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-2xl mx-auto leading-tight">
          Collaborating with <span className="text-[#0F5B54] italic font-serif">visionary</span> brands
        </h2>
      </div>

      {/* Infinite Ticker Wrapper */}
      <div className="relative w-full">
        {/* Soft Edge Blending */}
        <div className="absolute left-0 top-0 w-24 md:w-72 h-full z-20 bg-gradient-to-r from-[#F9FBFA] via-[#F9FBFA]/80 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 w-24 md:w-72 h-full z-20 bg-gradient-to-l from-[#F9FBFA] via-[#F9FBFA]/80 to-transparent pointer-events-none" />

        <div
          ref={trackRef}
          className="flex gap-6 md:gap-10 whitespace-nowrap w-max py-3"
        >
          {/* Mapping twice for seamless looping */}
          {[...partnerLogos, ...partnerLogos].map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="group relative px-8 py-5 md:px-12 md:py-8 rounded-3xl bg-white/50 backdrop-blur-sm border border-white shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_60px_rgba(15,91,84,0.1)] flex items-center justify-center transition-all duration-500 ease-out hover:-translate-y-2"
            >
              <div className="relative w-32 h-14 md:w-46 md:h-24 flex items-center justify-center">
                <img
                  src={logo.img}
                  alt={logo.name}
                  className="w-full h-full object-contain filter  opacity-100 group-hover: group-hover:opacity-100 transition-all duration-1000 ease-in-out"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive Footer Info */}
      {/* <div className="mt-12 text-center px-6">
        <p className="text-gray-400 text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium">
          Excellence in every partnership
        </p>
      </div> */}
    </section>
  );
};

export default LogoTickerSection;