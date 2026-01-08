"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";
import { useRef } from "react";
import { Building2, Users, Clock, MapPin } from "lucide-react";

export default function AboutIntro() {
  const stats = [
    { number: 1100, label: "Projects", icon: Building2, suffix: "+" },
    { number: 230, label: "Cities", icon: MapPin, suffix: "+" },
    { number: 25, label: "Faster TAT", icon: Clock, suffix: "%" },
  ];

  const aboutRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });

  // Parallax only feels good on larger screens; on mobile, we reduce the intensity
  const yParallax = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={aboutRef}
      className="relative w-full py-16 md:py-24 bg-gradient-to-b from-white via-[#e5f1ff] to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr_1.2fr] gap-12 lg:gap-8 items-start relative z-10">
        
        {/* LEFT — STATS */}
        <div className="space-y-6 w-full max-w-[280px] mx-auto lg:mx-0 lg:sticky lg:top-20 order-2 lg:order-1">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/50"
            >
              <stat.icon className="w-10 h-10 text-[#FFA62B] mb-3" />

              <h3 className="text-3xl md:text-4xl font-black text-[#16697A] mb-1">
                <CountUp
                  start={0}
                  end={stat.number}
                  duration={2.5}
                  separator=","
                  enableScrollSpy
                  scrollSpyOnce
                />
                {stat.suffix}
              </h3>

              <p className="text-gray-600 font-bold text-sm uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* MIDDLE — PARALLAX IMAGE */}
        <motion.div
          style={{ y: typeof window !== 'undefined' && window.innerWidth > 1024 ? yParallax : 0 }}
          className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/20 order-1 lg:order-2"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />

          <img
            src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Work Process"
            className="object-cover w-full h-[400px] md:h-[600px]"
          />

          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-20 text-white">
            <p className="font-bold text-base md:text-lg">Premium Quality</p>
            <p className="text-xs md:text-sm opacity-80">Crafted with precision</p>
          </div>
        </motion.div>

        {/* RIGHT — TEXT CONTENT */}
        <div className="pt-4 order-3 lg:order-3">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-[#16697A] leading-[1.1] lg:leading-[0.9] mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-500 text-3xl md:text-4xl block mb-2">
              About
            </span>
            Arsen Interior
          </motion.h2>

          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex flex-wrap items-center gap-3">
            What makes us{" "}
            <span className="px-3 py-1 bg-[#FFA62B] text-white rounded-lg -rotate-2 shadow-lg inline-block">
              Different?
            </span>
          </h3>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 font-medium text-justify">
            We have digitally integrated the interior execution supply chain
            across factories, OEMs, labour contractors, and architects. We
            follow a full-stack model, do not subcontract, upskill manpower,
            and source materials directly from OEMs — ensuring superior quality
            and complete control.
          </p>

          <div className="flex flex-wrap items-center gap-8 md:gap-12 border-t border-gray-200 pt-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="w-5 h-5 text-[#16697A]" />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Started In
                </p>
              </div>
              <p className="text-2xl md:text-3xl font-black text-[#16697A]">2019</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-5 h-5 text-[#16697A]" />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Happy Clients
                </p>
              </div>
              <p className="text-2xl md:text-3xl font-black text-[#16697A]">100+</p>
            </div>
          </div>

          <button className="mt-10 w-full md:w-auto justify-center bg-[#16697A] hover:bg-[#125663] text-white font-bold px-10 py-4 rounded-full transition-colors duration-300 hover:shadow-lg hover:shadow-teal-700/30 flex items-center gap-2 group">
            Know More
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}