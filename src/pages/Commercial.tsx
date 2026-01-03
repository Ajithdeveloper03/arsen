import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
    ArrowUpRight, Layout, Zap, Layers,
    Maximize, Globe, MoveRight, ChevronRight,
    Sparkles, Palette, Construction, Check
} from "lucide-react";

const ArsenCommercial = () => {
    const containerRef = useRef(null);
    const horizontalRef = useRef(null);

    const { scrollYProgress } = useScroll({ target: containerRef });
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // Horizontal Scroll for Specialized Areas
    const { scrollYProgress: horizScroll } = useScroll({
        target: horizontalRef,
        offset: ["start end", "end start"]
    });
    const xTransform = useTransform(horizScroll, [0.2, 0.8], ["0%", "-70%"]);

    return (
        <div ref={containerRef} className="bg-[#010B0A] text-[#F4F7F6] font-sans overflow-x-hidden selection:bg-[#0F5B54]">

            {/* 1. KINETIC HERO */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ scale: useTransform(smoothProgress, [0, 0.2], [1.1, 1.3]), opacity: 0.3 }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover"
                        alt="Commercial Lobby"
                    />
                </motion.div>

                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, letterSpacing: "0.5em" }}
                        animate={{ opacity: 1, letterSpacing: "1.2em" }}
                        transition={{ duration: 1.5 }}
                        className="text-[#0F5B54] text-[10px] font-black mb-6 uppercase"
                    >
                        Arsen Commercial
                    </motion.div>

                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-[14vw] md:text-[11vw] font-black uppercase italic leading-none tracking-tighter"
                    >
                        Power <span className="text-transparent" style={{ WebkitTextStroke: '2px #F4F7F6' }}>Spaces</span>
                    </motion.h1>

                    <motion.button
                        whileHover={{ scale: 1.1, letterSpacing: "0.4em" }}
                        className="mt-12 px-8 py-4 bg-[#0F5B54] text-white text-[10px] font-bold uppercase tracking-widest rounded-full transition-all"
                    >
                        View Portfolio
                    </motion.button>
                </div>
            </section>

            {/* 2. COMMERCIAL EXPLANATION: SPLIT REVEAL */}
            <section className="py-24 md:py-48 px-6 md:px-24">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-24 items-center">
                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-7xl font-black uppercase italic leading-none">
                            Identity <br /> <span className="text-[#0F5B54]">In Glass & Steel.</span>
                        </h2>
                        <p className="text-white/40 text-sm md:text-base max-w-sm leading-relaxed">
                            We translate brand DNA into spatial geometry. Our designs optimize workflow while maintaining high-                            luxury aesthetics.
                        </p>
                    </div>
                    <motion.div
                        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                        transition={{ duration: 1 }}
                        className="aspect-video rounded-3xl overflow-hidden bg-gray-900"
                    >
                        <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1000" className="w-full h-full object-cover" alt="Modern Office" />
                    </motion.div>
                </div>
            </section>

            {/* 3. SPECIALIZED AREAS: HORIZONTAL GALLERY */}
            <section ref={horizontalRef} className="h-[250vh] bg-white text-[#010B0A] relative">
                <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                    <div className="px-6 md:px-24 mb-10 flex justify-between items-end">
                        <h3 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">Specialized <br /> <span className="text-[#0F5B54]">Areas.</span></h3>
                    </div>

                    <motion.div style={{ x: xTransform }} className="flex gap-6 md:gap-12 px-6 md:px-24">
                        <SectorCard title="Corporate HQs" img="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800" />
                        <SectorCard title="Luxury Retail" img="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800" />
                        <SectorCard title="Tech Hubs" img="https://images.unsplash.com/photo-1550966842-2849a22027e4?w=800" />
                        <SectorCard title="Boutique Clinics" img="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800" />
                    </motion.div>
                </div>
            </section>

            {/* 4. WHY CHOOSE ARSEN: MASKED GRID */}
            <section className="py-24 md:py-48 px-6 md:px-24 bg-[#010B0A]">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-center text-4xl md:text-8xl font-black uppercase italic tracking-tighter mb-20 md:mb-40">
                        The Arsen <span className="text-transparent" style={{ WebkitTextStroke: '1px #0F5B54' }}>Edge.</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
                        <WhyItem icon={<Palette />} title="Branded Interiors" desc="Interiors that speak your corporate language." />
                        <WhyItem icon={<Zap />} title="Rapid Execution" desc="Minimal downtime for functioning businesses." />
                        <WhyItem icon={<Maximize />} title="Space Audit" desc="Optimizing every sqft for peak productivity." />
                    </div>
                </div>
            </section>

            {/* 5. PROCESS: THE BLUEPRINT FLOW */}
            <section className="py-24 md:py-48 px-6 md:px-24 bg-white text-[#010B0A]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl md:text-7xl font-black uppercase italic mb-20 md:mb-32">Design
                        <span className="text-[#0F5B54]">Protocol.</span>
                    </h2>
                    <div className="space-y-12 md:space-y-24">
                        <Step num="01" title="Strategic Audit" desc="We analyze site constraints and workflow requirements." />
                        <Step num="02" title="Concept Design" desc="Visualizing brand elements into spatial architectural forms." />
                        <Step num="03" title="Turnkey Build" desc="Execution with surgical precision and premium materials." />
                    </div>
                </div>
            </section>

            {/* 6. CALL TO ACTION: FULLSCREEN */}
            <section className="relative h-screen flex items-center justify-center bg-[#010B0A] px-6 text-center">
                <div className="space-y-8 relative z-10">
                    <h2 className="text-6xl md:text-[12vw] font-black uppercase italic tracking-tighter leading-none">
                        Build <br /> <span className="text-[#0F5B54]">Exceptional.</span>
                    </h2>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-12 py-6 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-full"
                    >
                        Get a Quote
                    </motion.button>
                </div>
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1000" className="w-full h-full object-cover" alt="texture" />
                </div>
            </section>

        </div>
    );
};

// --- SUB-COMPONENTS ---

const SectorCard = ({ title, img }) => (
    <div className="min-w-[300px] md:min-w-[600px] h-[400px] md:h-[600px] relative rounded-[2rem] overflow-hidden group">
        <img src={img} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={title} />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all" />
        <div className="absolute bottom-10 left-10">
            <h4 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">{title}</h4>
        </div>
    </div>
);

const WhyItem = ({ icon, title, desc }) => (
    <div className="p-10 md:p-16 bg-[#010B0A] hover:bg-[#0F5B54]/10 transition-colors">
        <div className="text-[#0F5B54] mb-6">{icon}</div>
        <h4 className="text-xl md:text-2xl font-black uppercase italic mb-4">{title}</h4>
        <p className="text-white/30 text-xs md:text-sm font-medium">{desc}</p>
    </div>
);

const Step = ({ num, title, desc }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="flex items-start gap-6 md:gap-12 border-b border-black/10 pb-12"
    >
        <span className="text-3xl md:text-5xl font-black text-[#0F5B54] italic">{num}</span>
        <div>
            <h4 className="text-2xl md:text-4xl font-black uppercase italic mb-4 tracking-tight">{title}</h4>
            <p className="text-black/40 text-sm md:text-lg max-w-xl font-medium">{desc}</p>
        </div>
    </motion.div>
);

export default ArsenCommercial;