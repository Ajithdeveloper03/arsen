"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Maximize, MoveRight, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const EliteAboutPage = () => {

  // const horizontalRef = useRef<HTMLDivElement | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // const { scrollYProgress } = useScroll({
  //   target: horizontalRef,
  //   offset: ["start start", "end end"],
  // });

  // const xTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  const testimonials = [
    {
      quote: "Arsen Interio delivered our corporate HQ 20 days ahead of schedule. Their dedicated 365-day service team is a game changer for maintenance.",
      author: "Rajesh Varma",
      company: "Indus Tech Hub",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    },
    {
      quote: "The precision in their modular kitchen execution is unmatched. They handled the plumbing, electrical, and fit-out as a single seamless turnkey unit.",
      author: "Ananya Iyer",
      company: "Studio AI",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
    }
  ];

  return (
    <div className="bg-[#FCFCFA] text-[#010B0A] overflow-x-hidden">

      {/* ================= HERO ================= */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#010B0A]">
        <img
          src="https://images.unsplash.com/photo-1505843513577-22bb7d21e455"
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-50"
        />

        <div className="relative z-10 text-center px-6">
          <span className="text-[#FDBA74] tracking-[1em] text-xs font-black mb-8 block uppercase">
            Beyond Architecture
          </span>

          <h1 className="text-[12vw] md:text-[10vw] font-black leading-none tracking-tighter text-white uppercase italic">
            Arsen
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.8)' }}>
              Interio
            </span>
          </h1>

          <p className="text-white/40 text-xs tracking-[0.5em] mt-8 uppercase font-bold">
            Turnkey Fit-Out Specialists
          </p>
        </div>
      </section>


      {/* ================= STORY ================= */}
      <section className="py-24 md:py-40 px-6 md:px-24 bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-center">

          <div className="md:col-span-5 space-y-8">
            <span className="text-[#032d29] font-black text-xs tracking-widest uppercase">
              Who We Are
            </span>

            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              Full <br /> <span className="text-[#FDBA74]">Scope</span> <br /> Execution.
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              Arsen Interio specializes in the full scope of commercial & residential turnkey fit-outs. We bring in-house engineering and artisan craftsmanship to corporate offices, luxury hospitals, and premium residential spaces.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              {["Corporate", "Retail", "Hospitality", "Residential"].map(tag => (
                <span key={tag} className="px-4 py-2 border border-black/10 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
          </div>


          <div className="md:col-span-7 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800" className="rounded-3xl h-[300px] md:h-[400px] w-full object-cover" />
              <img src="https://www.architectandinteriorsindia.com/cloud/2024/11/06/1rvw0Wmz-1.-EXTERIOR-1-1200x800.jpg" className="rounded-3xl h-[200px] md:h-[300px] w-full object-cover" />
            </div>

            <div className="space-y-4 pt-12">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800" className="rounded-3xl h-[200px] md:h-[300px] w-full object-cover" />
              <img src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800" className="rounded-3xl h-[300px] md:h-[400px] w-full object-cover" />
            </div>
          </div>
        </div>
      </section>


      {/* ================= TEAM ================= */}
      <section className="py-32 md:py-48 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <h2 className="text-6xl md:text-8xl font-black uppercase leading-none">
              The <br /> <span className="text-[#032d29]">Team.</span>
            </h2>

            <p className="max-w-md text-gray-400 italic text-lg">
              "In-house engineers and skilled field staff available 365 days to ensure every vision is realized."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "S. Arul", role: "Sr. Project Engineer", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600" },
              { name: "Meera K.", role: "Lead Designer", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600" },
              { name: "John Doe", role: "Field Coordinator", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600" },
              { name: "Artisan Staff", role: "Fit-out Experts", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600" },
            ].map((m, i) => (
              <div key={i} className="group relative h-[450px] rounded-3xl overflow-hidden">
                <img src={m.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black p-6 flex flex-col justify-end">
                  <h5 className="text-white font-black uppercase">{m.name}</h5>
                  <p className="text-[#FDBA74] text-[10px] font-bold uppercase tracking-widest">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ================= STATS ================= */}
      <section className="py-24 px-6 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

          <div className="grid grid-cols-2 gap-6">
            <div className="h-64 bg-black text-white rounded-[3.5rem] p-10 flex flex-col justify-between">
              <span className="font-black">PMC Expert</span>
              <p className="text-6xl font-black italic">365</p>
              <p className="text-[10px] uppercase opacity-60">Day Support Team</p>
            </div>

            <div className="h-64 bg-[#FDBA74] rounded-[3.5rem] p-10 flex flex-col justify-between">
              <Maximize size={22} />
              <p className="text-6xl font-black italic">100%</p>
              <p className="text-[10px] uppercase">Turnkey Execution</p>
            </div>
          </div>


          <div className="space-y-6 flex flex-col justify-center">
            <h2 className="text-5xl md:text-7xl font-black uppercase">
              Build your <br /> <span className="text-[#032d29]">Legacy with us.</span>
            </h2>

            <button className="bg-black text-white px-10 py-6 rounded-full w-80 flex justify-between">
              <span className="text-xs font-black uppercase tracking-widest">Start Project</span>
              <MoveRight />
            </button>
          </div>

        </div>
      </section>


      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20 bg-[#032d29] rounded-[4rem] mx-4 md:mx-10 mb-20">
        <div className="max-w-4xl mx-auto px-6">

          <Quote size={60} className="text-[#FDBA74] mx-auto mb-10 opacity-30" />

          <div className="relative h-[300px] flex items-center">
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

                <div className="flex justify-center gap-3">
                  <img src={testimonials[activeTestimonial].img} className="w-14 h-14 rounded-full border border-[#FDBA74]" />
                  <div>
                    <p className="text-[#FDBA74] font-black uppercase text-xs">
                      {testimonials[activeTestimonial].author}
                    </p>
                    <p className="text-white/50 uppercase text-[10px] font-bold">
                      {testimonials[activeTestimonial].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => setActiveTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
              className="p-4 rounded-full border border-white/10 text-white"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={() => setActiveTestimonial(prev => prev === testimonials.length - 1 ? 0 : prev + 1)}
              className="p-4 rounded-full border border-white/10 text-white"
            >
              <ChevronRight />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default EliteAboutPage;
