import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { 
  Plus, ArrowRight, Minus, 
  MapPin, Check, Send, 
  Play, MousePointer2, ChevronRight
} from "lucide-react";

const EliteDesignMasterpiece = () => {
  const containerRef = useRef(null);
  
  return (
    <div ref={containerRef} className="bg-[#08090A] text-[#FCFCFA] selection:bg-[#FDBA74] selection:text-black">
      
      {/* 1. KINETIC HERO: THE "REVEALER" */}
      <section className="relative h-[120vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ 
            scale: useTransform(useScroll().scrollY, [0, 1000], [1, 1.5]),
            opacity: useTransform(useScroll().scrollY, [0, 500], [1, 0])
          }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000" 
            className="w-full h-full object-cover brightness-50 grayscale"
            alt="Main Hero"
          />
        </motion.div>

        <div className="relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, letterSpacing: "2em" }}
            animate={{ opacity: 1, letterSpacing: "1.2em" }}
            transition={{ duration: 2 }}
            className="text-[#FDBA74] text-[10px] font-black uppercase"
          >
            Signature Residential
          </motion.div>
          <h1 className="text-[15vw] md:text-[12vw] font-black leading-none tracking-tighter uppercase italic">
            Arsen<span className="text-transparent font-outline" style={{ WebkitTextStroke: '1px #FDBA74' }}>Elite</span>
          </h1>
          <div className="flex justify-center gap-10 items-center">
            <div className="h-[1px] w-20 bg-white/20" />
            <span className="text-xs tracking-[0.4em] uppercase font-light">Crafting Legacies</span>
            <div className="h-[1px] w-20 bg-white/20" />
          </div>
        </div>
        
        <motion.div 
           animate={{ y: [0, 20, 0] }} 
           transition={{ repeat: Infinity, duration: 2 }}
           className="absolute bottom-20 left-1/2 -translate-x-1/2 opacity-30"
        >
          <MousePointer2 size={30} />
        </motion.div>
      </section>

      {/* 2. CATEGORIES: THE HORIZONTAL SLIDER (Screen Locked) */}
      <HorizontalCategories />

      {/* 3. PREMIUM PROJECTS: MASONRY REVEAL */}
      <section className="py-40 px-6 md:px-24 bg-[#FCFCFA] text-black rounded-[5rem]">
        <div className="mb-24 flex justify-between items-end border-b border-black/10 pb-12">
           <h2 className="text-8xl font-black italic uppercase tracking-tighter">Premium <br /> <span className="text-[#FDBA74]">Editions.</span></h2>
           <p className="text-gray-400 text-sm max-w-xs uppercase tracking-widest font-bold">01 — Selected Projects</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
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

      {/* 4. THE PROCESS: INTERACTIVE TIMELINE */}
      <section className="py-40 px-6 md:px-24">
        <h2 className="text-center text-7xl font-black italic uppercase mb-32 tracking-tighter">The <span className="text-[#FDBA74]">Genesis</span> Path.</h2>
        <div className="max-w-5xl mx-auto space-y-10">
          <ProcessItem num="01" title="Visual Concept" desc="We build a 3D digital twin of your home before a single brick is moved." />
          <ProcessItem num="02" title="Material Curation" desc="Sourcing exotic stones and premium timbers from our global network." />
          <ProcessItem num="03" title="Technical Precision" desc="Master carpenters and engineers execute with 100% plan adherence." />
          <ProcessItem num="04" title="The Unveiling" desc="Final walkthrough with our 146-point 'Arsen Standard' check." />
        </div>
      </section>

      {/* 5. FAQ & FORM: THE CONVERSATION BLOCK */}
      <section className="py-40 bg-white text-black rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-32">
          {/* FAQ Column */}
          <div>
            <span className="text-[#FDBA74] font-black uppercase tracking-[0.5em] text-[10px] mb-10 block">Intelligence</span>
            <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-12">Common <br /> Queries.</h2>
            <div className="space-y-4">
              <AccordionItem q="How long does a full villa design take?" a="Typically 4-6 months from concept to handover, depending on scale." />
              <AccordionItem q="Do you provide a warranty on execution?" a="Yes, we provide a 10-year comprehensive warranty on all structural work." />
              <AccordionItem q="Can we integrate smart-home systems?" a="Absolutely. We specialize in invisible technology integration." />
            </div>
          </div>

          {/* Form Column */}
          <div className="bg-[#08090A] p-16 rounded-[4rem] text-white">
            <h3 className="text-4xl font-black italic uppercase mb-8">Initiate <br /> Consultation.</h3>
            <form className="space-y-8">
              <input type="text" placeholder="YOUR NAME" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-[#FDBA74] outline-none transition-colors" />
              <input type="email" placeholder="YOUR EMAIL" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-[#FDBA74] outline-none transition-colors" />
              <textarea placeholder="PROJECT DETAILS" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-[#FDBA74] outline-none transition-colors h-32" />
              <button className="group flex items-center gap-4 text-[#FDBA74] font-black uppercase tracking-widest text-xs pt-6">
                Send Enquiry <Send size={14} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- ELITE SUB-COMPONENTS ---

const HorizontalCategories = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#08090A]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-10 px-24 items-center">
          <div className="min-w-[400px]">
            <h2 className="text-[10vw] font-black italic uppercase leading-none">Our<br/><span className="text-[#FDBA74]">Focus.</span></h2>
          </div>
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
  <div className="min-w-[500px] h-[60vh] relative group rounded-[3rem] overflow-hidden">
    <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
    <div className="absolute inset-0 bg-black/40 p-12 flex flex-col justify-end">
      <h4 className="text-4xl font-black italic uppercase text-white">{title}</h4>
    </div>
  </div>
);

const ProjectCard = ({ title, loc, img, desc, stagger }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    className={`space-y-8 ${stagger ? "md:mt-40" : ""}`}
  >
    <div className="aspect-[4/5] rounded-[4rem] overflow-hidden relative group shadow-2xl">
      <img src={img} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" />
      <div className="absolute top-10 right-10 w-16 h-16 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
         <ArrowRight className="text-black" />
      </div>
    </div>
    <div className="px-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-3xl font-black italic uppercase">{title}</h3>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#FDBA74] flex items-center gap-2"><MapPin size={10}/> {loc}</span>
      </div>
      <p className="text-gray-500 leading-relaxed max-w-sm">{desc}</p>
    </div>
  </motion.div>
);

const ProcessItem = ({ num, title, desc }) => (
  <motion.div 
    whileHover={{ x: 20 }}
    className="group flex gap-12 p-12 border border-white/5 rounded-[3rem] hover:bg-white/5 transition-all"
  >
    <span className="text-5xl font-black italic text-white/10 group-hover:text-[#FDBA74] transition-colors">{num}</span>
    <div>
      <h4 className="text-2xl font-black italic uppercase mb-2">{title}</h4>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  </motion.div>
);

const AccordionItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="border-b border-black/5 py-6">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left">
        <span className="text-lg font-bold uppercase italic tracking-tight">{q}</span>
        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.p 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="text-gray-500 mt-4 text-sm leading-relaxed"
          >
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EliteDesignMasterpiece;