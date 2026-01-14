"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Plus, ArrowRight, Minus, 
  MapPin, Send, MousePointer2 
} from "lucide-react";

// Asset Imports
import residential1 from '../assets/residential1.jpg';
import kitchen from '../assets/modular-kitchen.png';
import urbanise from '../assets/urbanise.jpg';
import saff from '../assets/residential-saff.jpg';
import tharun from '../assets/residential-tharun.jpeg';
import sunil from '../assets/residential-sunil.jpeg';
import bangalore from '../assets/residential-bangalore.jpeg';

/* --------------------- PROJECT DATA --------------------- */
const PROJECTS = [
  {
    id: 1,
    title: "Windsor Garden",
    loc: "Bangalore",
    img: bangalore,
    desc: "Classic architectural lines with modern sustainable tech.",
  },
  {
    id: 2,
    title: "Sunil Reddy Residence",
    loc: "Hyderabad",
    img: sunil,
    desc: "Bespoke woodwork and floor-to-ceiling glass transitions.",
  },
  {
    id: 3,
    title: "MR.tharun Residential",
    loc: "Hyderabad",
    img: tharun,
    desc: "Maximizing light in compact luxury through smart-glass.",
  },
  {
    id: 4,
    title: "Saf Games Village",
    loc: "Chennai",
    img: saff,
    desc: "Monolithic luxury with private infinity gardens.",
  },
  {
    id: 5,
    title: "Jagger Residential",
    loc: "Bangalore",
    img: urbanise,
    desc: "An avant-garde industrial masterpiece utilizing raw materials with a premium finish.",
    featured: true
  }
];

const EliteDesignMasterpiece = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.35]);
  const heroFade = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div ref={containerRef} className="bg-[#08090A] text-[#FCFCFA] selection:bg-[#FDBA74] selection:text-black">

      {/* HERO */}
      <section className="relative h-[110vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: heroScale, opacity: heroFade }} className="absolute inset-0">
          <img src={residential1} className="w-full h-full object-cover brightness-50" alt="Main Hero" />
        </motion.div>
        <div className="relative z-10 text-center px-6">
          <motion.div initial={{ opacity: 0, letterSpacing: "2em" }} animate={{ opacity: 1, letterSpacing: "0.5em" }} transition={{ duration: 2 }} className="text-[#FDBA74] text-[14px] font-black uppercase">
            Signature Residential
          </motion.div>
          <h1 className="text-[14vw] md:text-[11vw] font-black leading-none tracking-tighter uppercase italic">
            Arsen <span className="text-transparent font-outline" style={{ WebkitTextStroke: '2px #FDBA74' }}>Elite</span>
          </h1>
          <div className="flex justify-center gap-6 items-center mt-4 text-md uppercase tracking-[0.3em]">
            <div className="h-[1px] w-12 bg-white/20" /> Crafting Legacies <div className="h-[1px] w-12 bg-white/20" />
          </div>
        </div>
        <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 opacity-40">
          <MousePointer2 size={24} />
        </motion.div>
      </section>

      {/* CATEGORIES */}
      <HorizontalCategories />

      {/* REDESIGNED: PREMIUM EDITIONS SECTION */}
      <section className="py-24 px-6 md:px-20 bg-[#F4F4F2] text-black rounded-[3rem] md:rounded-[5rem]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 flex flex-col md:flex-row justify-between items-baseline border-b border-black/10 pb-10">
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
              Premium <span className="text-transparent font-outline" style={{ WebkitTextStroke: '1px black' }}>Editions</span>
            </h2>
            <p className="text-gray-500 text-[10px] uppercase tracking-[0.4em] font-bold mt-4 md:mt-0">
              Curated Residential Excellence / 2026
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {PROJECTS.filter(p => !p.featured).map((project) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={project.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" alt={project.title} />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={10} className="text-[#FDBA74]"/>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{project.loc}</span>
                  </div>
                  <h3 className="text-lg font-black uppercase leading-tight group-hover:text-[#FDBA74] transition-colors">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Featured Large Project (Jagger) */}
          {PROJECTS.filter(p => p.featured).map((project) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative rounded-[3rem] overflow-hidden bg-black text-white h-[400px] md:h-[500px] flex items-end group"
            >
              <img src={project.img} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700" alt={project.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="relative p-8 md:p-16 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-xl">
                  <span className="text-[#FDBA74] text-xs font-black uppercase tracking-[0.5em] mb-4 block">Masterpiece Selection</span>
                  <h3 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">{project.title}</h3>
                  <p className="text-white/60 text-lg leading-relaxed">{project.desc}</p>
                </div>
                <div className="flex items-center gap-4">
                   <div className="bg-white text-black p-5 rounded-full hover:bg-[#FDBA74] transition-colors cursor-pointer">
                     <ArrowRight size={24} />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
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
          <FAQSection />
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
        <motion.div style={{ x }} className="flex gap-8 md:gap-16 px-8 md:px-20 items-center">
          <div className="shrink-0 pr-12 md:pr-24">
            <h2 className="text-[16vw] md:text-[9vw] font-black italic uppercase leading-[0.85] tracking-tighter">
              Our<br/><span className="text-[#FDBA74] ">Focus</span>
            </h2>
            <p className="text-[18px] uppercase tracking-[0.4em] text-white/30 mt-6">Core Competencies & Services</p>
          </div>
          <CategoryCard title="Modular Kitchens" img={kitchen} />
          <CategoryCard title="Living & Garden Areas" img="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800" />
          <CategoryCard title="Wallpaper & Finishes" img="https://images.pexels.com/photos/35634381/pexels-photo-35634381.jpeg" />
          <CategoryCard title="Flooring & False Ceilings" img="https://images.pexels.com/photos/7031616/pexels-photo-7031616.jpeg" />
          <CategoryCard title="Electricals & Lightings" img="https://images.pexels.com/photos/6238608/pexels-photo-6238608.jpeg" />
          <CategoryCard title="Modular Furnitures" img="https://images.pexels.com/photos/2930894/pexels-photo-2930894.jpeg" />
          <CategoryCard title="Racks & Storages" img="https://images.pexels.com/photos/29454379/pexels-photo-29454379.jpeg" />
        </motion.div>
      </div>
    </section>
  );
};

const CategoryCard = ({ title, img }) => (
  <div className="min-w-[260px] md:min-w-[480px] h-[45vh] md:h-[60vh] relative group rounded-[2rem] md:rounded-[3rem] overflow-hidden">
    <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" alt={title} />
    <div className="absolute inset-0 bg-black/40 p-8 flex flex-col justify-end">
      <h4 className="text-2xl md:text-4xl font-black uppercase">{title}</h4>
    </div>
  </div>
);

const ProcessItem = ({ num, title, desc }) => (
  <motion.div whileHover={{ x: 10 }} className="group flex gap-8 p-10 border border-white/10 rounded-[2rem] hover:bg-white/5 transition">
    <span className="text-4xl md:text-5xl font-black text-white/10 group-hover:text-[#FDBA74]">{num}</span>
    <div>
      <h4 className="text-2xl md:text-3xl font-black uppercase mb-2">{title}</h4>
      <p className="text-gray-400 text-xl">{desc}</p>
    </div>
  </motion.div>
);

const FAQSection = () => (
  <div>
    <span className="text-[#FDBA74] font-black uppercase tracking-[0.4em] text-[14px] block mb-6">FAQ's</span>
    <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-10">Common<br/>Queries.</h2>
    <div className="space-y-4">
      <AccordionItem q="How long does a full villa design take?" a="Typically 4–6 months depending on the scale and complexity of customization." />
      <AccordionItem q="Do you provide warranty?" a="Yes — we offer a comprehensive 10-year structural warranty on all premium residential works." />
      <AccordionItem q="Can we integrate smart-home systems?" a="Absolutely. We specialize in fully invisible integration of lighting, climate, and security controls." />
      <AccordionItem q="Which cities do you serve?" a="Currently, we are executing elite projects in Chennai, Bangalore, and Hyderabad." />
    </div>
  </div>
);

const AccordionItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/10 py-5">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center text-left">
        <span className="text-lg font-bold uppercase italic pr-4">{q}</span>
        {open ? <Minus size={18}/> : <Plus size={18}/>}
      </button>
      <AnimatePresence>
        {open && (
          <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="text-gray-500 mt-3 text-sm leading-relaxed">
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

const ConsultationForm = () => (
  <div className="bg-[#08090A] p-10 md:p-16 rounded-[3rem] text-white">
    <h3 className="text-3xl md:text-4xl font-black italic uppercase mb-8">Initiate<br/>Consultation.</h3>
    <form className="space-y-6">
      <input type="text" placeholder="YOUR NAME" className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-[#FDBA74] transition-colors" />
      <input type="email" placeholder="YOUR EMAIL" className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-[#FDBA74] transition-colors" />
      <select className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-[#FDBA74] transition-colors cursor-pointer">
        <option className="text-black">Project Type</option>
        <option className="text-black">Villa</option>
        <option className="text-black">Apartment</option>
        <option className="text-black">Commercial</option>
      </select>
      <textarea placeholder="PROJECT DETAILS" className="w-full bg-transparent border-b border-white/20 py-4 outline-none h-28 focus:border-[#FDBA74] transition-colors" />
      <button type="submit" className="group flex items-center gap-3 text-[#FDBA74] font-black uppercase tracking-widest text-xs pt-4">
        Send Enquiry <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </button>
    </form>
  </div>
);

export default EliteDesignMasterpiece;