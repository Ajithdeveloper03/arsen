"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Plus, ArrowRight, Minus, 
  MapPin, Send, MousePointer2 
} from "lucide-react";

const EliteDesignMasterpiece = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.35]);
  const heroFade = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div ref={containerRef} className="bg-[#08090A] text-[#FCFCFA] selection:bg-[#FDBA74] selection:text-black">

      {/* HERO */}
      <section className="relative h-[110vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ scale: heroScale, opacity: heroFade }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000" 
            className="w-full h-full object-cover brightness-50 grayscale"
            alt="Main Hero"
          />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, letterSpacing: "2em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 2 }}
            className="text-[#FDBA74] text-[10px] font-black uppercase"
          >
            Signature Residential
          </motion.div>

          <h1 className="text-[14vw] md:text-[11vw] font-black leading-none tracking-tighter uppercase italic">
            Arsen
            <span className="text-transparent font-outline" style={{ WebkitTextStroke: '2px #FDBA74' }}>Elite</span>
          </h1>

          <div className="flex justify-center gap-6 items-center mt-4 text-xs uppercase tracking-[0.3em]">
            <div className="h-[1px] w-12 bg-white/20" />
            Crafting Legacies
            <div className="h-[1px] w-12 bg-white/20" />
          </div>
        </div>

        <motion.div 
          animate={{ y: [0, 15, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 opacity-40"
        >
          <MousePointer2 size={24} />
        </motion.div>
      </section>

      {/* CATEGORIES */}
      <HorizontalCategories />

      {/* PROJECTS */}
      <section className="py-28 px-6 md:px-20 bg-[#FCFCFA] text-black rounded-[3rem] md:rounded-[5rem]">
        <div className="mb-20 flex flex-col md:flex-row justify-between gap-6 border-b border-black/10 pb-10">
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
            Premium <br /> 
            <span className="text-[#FDBA74]">Editions.</span>
          </h2>
          <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">
            01 — Selected Projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <ProjectCard 
            title="The Obsidian Villa" 
            loc="Mumbai" 
            img="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200" 
            desc="A monolithic approach to luxury living with a private infinity garden."
          />

          <ProjectCard 
            title="Ivory Penthouse" 
            loc="Chennai" 
            img="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200" 
            desc="Seamless integration of marble and smart-glass technology."
            stagger
          />
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-28 px-6 md:px-20">
        <h2 className="text-center text-5xl md:text-7xl font-black italic uppercase mb-16 tracking-tighter">
          The <span className="text-[#FDBA74]">Genesis</span> Path.
        </h2>

        <div className="max-w-5xl mx-auto space-y-8">
          <ProcessItem num="01" title="Visual Concept" desc="We build a 3D digital twin of your home before a single brick is moved." />
          <ProcessItem num="02" title="Material Curation" desc="Sourcing exotic stones and premium timbers from our global network." />
          <ProcessItem num="03" title="Technical Precision" desc="Engineers execute with exacting standards." />
          <ProcessItem num="04" title="The Unveiling" desc="Final walkthrough with our 146-point quality check." />
        </div>
      </section>

      {/* FAQ + FORM */}
      <section className="py-28 bg-white text-black rounded-t-[3rem] md:rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">

          {/* FAQ */}
          <FAQSection />

          {/* FORM */}
          <ConsultationForm />

        </div>
      </section>
    </div>
  );
};


/* --------------------- SUB COMPONENTS --------------------- */

const HorizontalCategories = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section ref={ref} className="relative h-[250vh] bg-[#08090A]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 md:gap-10 px-8 md:px-20 items-center">
          
          <h2 className="text-[16vw] md:text-[9vw] font-black italic uppercase leading-none pr-12">
            Our<br/>
            <span className="text-[#FDBA74]">Focus</span>
          </h2>

          <CategoryCard title="Living Spaces" img="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800" />
          <CategoryCard title="Culinary Studios" img="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800" />
          <CategoryCard title="Master Retreats" img="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800" />
          <CategoryCard title="Luxury Baths" img="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800" />

        </motion.div>
      </div>
    </section>
  );
};

const CategoryCard = ({ title, img }) => (
  <div className="min-w-[260px] md:min-w-[480px] h-[45vh] md:h-[60vh] relative group rounded-[2rem] md:rounded-[3rem] overflow-hidden">
    <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
    <div className="absolute inset-0 bg-black/40 p-8 flex flex-col justify-end">
      <h4 className="text-2xl md:text-4xl font-black uppercase">{title}</h4>
    </div>
  </div>
);

const ProjectCard = ({ title, loc, img, desc, stagger }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`space-y-6 ${stagger ? "md:mt-24" : ""}`}
  >
    <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative group shadow-xl">
      <img src={img} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
      <div className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
        <ArrowRight className="text-black" />
      </div>
    </div>

    <div className="px-3">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-2xl font-black uppercase">{title}</h3>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#FDBA74] flex items-center gap-2">
          <MapPin size={10}/> {loc}
        </span>
      </div>
      <p className="text-gray-500 text-sm">{desc}</p>
    </div>
  </motion.div>
);

const ProcessItem = ({ num, title, desc }) => (
  <motion.div 
    whileHover={{ x: 10 }}
    className="group flex gap-8 p-10 border border-white/10 rounded-[2rem] hover:bg-white/5 transition"
  >
    <span className="text-4xl md:text-5xl font-black text-white/10 group-hover:text-[#FDBA74]">{num}</span>
    <div>
      <h4 className="text-xl md:text-2xl font-black uppercase mb-2">{title}</h4>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  </motion.div>
);

const FAQSection = () => (
  <div>
    <span className="text-[#FDBA74] font-black uppercase tracking-[0.4em] text-[10px] block mb-6">
      Intelligence
    </span>

    <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-10">
      Common<br/>Queries.
    </h2>

    <div className="space-y-4">
      <AccordionItem q="How long does a full villa design take?" a="Typically 4–6 months depending on scale." />
      <AccordionItem q="Do you provide warranty?" a="Yes — 10 years structural warranty." />
      <AccordionItem q="Can we integrate smart-home systems?" a="Absolutely. We specialise in fully invisible integration." />
      <AccordionItem q="How long does a full villa design take?" a="Typically 4–6 months depending on scale." />
      <AccordionItem q="Do you provide warranty?" a="Yes — 10 years structural warranty." />
    </div>
  </div>
);

const AccordionItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-black/10 py-5">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center">
        <span className="text-lg font-bold uppercase italic">{q}</span>
        {open ? <Minus size={18}/> : <Plus size={18}/>}
      </button>

      <AnimatePresence>
        {open && (
          <motion.p 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="text-gray-500 mt-3 text-sm"
          >
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

const ConsultationForm = () => (
  <div className="bg-[#08090A] p-10 md:p-16 rounded-[3rem] text-white">
    <h3 className="text-3xl md:text-4xl font-black italic uppercase mb-8">
      Initiate<br/>Consultation.
    </h3>

    <form className="space-y-6">
      <input type="text" placeholder="YOUR NAME" className="w-full bg-transparent border-b border-white/20 py-4 outline-none" />
      <input type="email" placeholder="YOUR EMAIL" className="w-full bg-transparent border-b border-white/20 py-4 outline-none" />

      <select className="w-full bg-transparent border-b border-white/20 py-4 outline-none">
        <option className="text-black">Project Type</option>
        <option className="text-black">Villa</option>
        <option className="text-black">Apartment</option>
        <option className="text-black">Commercial</option>
      </select>

      <textarea placeholder="PROJECT DETAILS" className="w-full bg-transparent border-b border-white/20 py-4 outline-none h-28" />

      <button className="flex items-center gap-3 text-[#FDBA74] font-black uppercase tracking-widest text-xs pt-4">
        Send Enquiry
        <Send size={14}/>
      </button>
    </form>
  </div>
);

export default EliteDesignMasterpiece;
