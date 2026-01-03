"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Compass, Layout, Award,
    Sparkles, PencilLine, Box
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
    { icon: Compass, title: "Spatial Vision", desc: "Harmonizing volume and light" },
    { icon: Layout, title: "ROI Centric", desc: "Design as a business asset" },
    { icon: Award, title: "Elite Quality", desc: "Uncompromising artisanal standards" },
    { icon: Sparkles, title: "Innovation", desc: "Integration of smart aesthetics" },
    { icon: PencilLine, title: "Bespoke Design", desc: "Signature custom interiors" },
    { icon: Box, title: "Full Turnkey", desc: "Seamless project management" },
];

export default function LuxuryInteriorExpertise() {
    const triggerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const cards = cardsRef.current;
        const mm = gsap.matchMedia();

        // Initial setup
        gsap.set(cards, {
            xPercent: -50,
            left: "50%",
            position: "absolute",
            bottom: "15%",
            opacity: 0,
            scale: 0.8,
            rotation: 0
        });

        mm.add({
            // Desktop
            isDesktop: "(min-width: 1024px)",
            // Tablet/Mobile
            isMobile: "(max-width: 1023px)"
        }, (context) => {
            const { isDesktop } = context.conditions;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: isDesktop ? "+=3000" : "+=2000", // Faster scroll on mobile
                    scrub: 2, // Lower scrub for better touch responsiveness
                    pin: true,
                }
            });

            tl.to(cards, {
                opacity: 1,
                scale: 1,
                stagger: 0.1,
                duration: 1
            })
            .to(cards, {
                xPercent: (i) => {
                    // Responsive Spread
                    const spread = isDesktop ? 120 : 45; 
                    return (i - (cards.length - 1) / 2) * spread - 50;
                },
                rotation: (i) => {
                    // More subtle rotation on mobile
                    const rot = isDesktop ? 8 : 4;
                    return (i - (cards.length - 1) / 2) * rot;
                },
                y: (i) => {
                    // Responsive Arc Depth
                    const depth = isDesktop ? 12 : 6;
                    return Math.pow(Math.abs(i - (cards.length - 1) / 2), 2) * depth;
                },
                duration: 2,
                ease: "power2.out",
            });
        });

        return () => mm.revert();
    }, []);

    return (
        <div ref={triggerRef} className="bg-[#020d0f] overflow-hidden">
            <section className="relative w-full h-screen flex flex-col items-center justify-start py-12 md:py-20">

                {/* Background Decor */}
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[70%] md:w-[50%] h-[50%] bg-[#10b981]/10 rounded-full blur-[80px] md:blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[70%] md:w-[50%] h-[50%] bg-teal-900/20 rounded-full blur-[80px] md:blur-[120px]" />
                </div>

                {/* Responsive Header */}
                <div className="text-center z-10 px-4">
                    <div className="relative">
                        <h2 className="text-teal-900/25 text-5xl md:text-8xl lg:text-[11rem] absolute -top-8 md:-top-14 left-1/2 -translate-x-1/2 whitespace-nowrap select-none italic font-serif">
                            ARSEN INTERIOR
                        </h2>
                        <h2 className="relative text-white text-3xl md:text-5xl lg:text-7xl font-medium tracking-tighter">
                            Commercial 
                            <span className="font-serif italic text-teal-400 block md:inline md:pl-5">EXPERTISE</span>
                        </h2>
                    </div>
                </div>

                {/* Card Gallery Container */}
                <div className="absolute inset-0 flex items-center justify-center z-[15] pointer-events-none">
                    <div className="relative w-full max-w-[95vw] md:max-w-[85vw] h-[300px] md:h-[400px] mt-20 md:mt-36">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                ref={(el) => (cardsRef.current[i] = el)}
                                className="group w-[160px] h-[240px] md:w-[240px] md:h-[340px] pointer-events-auto"
                            >
                                <div className="relative w-full h-full transition-all duration-500 ease-out group-hover:-translate-y-12 md:group-hover:-translate-y-20 group-hover:scale-105">

                                    {/* Card Body */}
                                    <div className="w-full h-full bg-gradient-to-br from-teal-900/70 to-[#020d0f] backdrop-blur-xl border border-teal-500/20 rounded-2xl md:rounded-[2rem] p-4 md:p-8 flex flex-col justify-between shadow-2xl overflow-hidden relative">
                                        
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start md:items-center mb-4 md:mb-10">
                                                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-teal-500/30 flex items-center justify-center bg-teal-500/5">
                                                    <f.icon className="w-4 h-4 md:w-5 md:h-5 text-teal-400" strokeWidth={1.5} />
                                                </div>
                                                <span className="text-[#d4af37]/30 italic text-lg md:text-2xl">0{i + 1}</span>
                                            </div>

                                            <h3 className="text-sm md:text-xl font-light text-white tracking-tight leading-tight">
                                                {f.title}
                                            </h3>
                                        </div>

                                        <div className="relative z-10">
                                            <p className="text-teal-100/40 text-[8px] md:text-[10px] leading-relaxed mb-3 md:mb-6 uppercase tracking-widest font-medium">
                                                {f.desc}
                                            </p>
                                            <div className="h-[1px] w-full bg-white/5 relative">
                                                <div className="h-full w-0 bg-teal-500 group-hover:w-full transition-all duration-700" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@1,400;1,700&display=swap');
                .font-serif { font-family: 'Bodoni Moda', serif; }
            `}</style>
        </div>
    );
}