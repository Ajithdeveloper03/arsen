"use client";

import { useState, useMemo, useEffect } from "react";
import { BASE_URL } from '../services/api';
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Plus, ArrowUpRight, Search, MapPin, Grid } from "lucide-react";
import { FEATURED_PROJECTS, RAW_COMPLETED_PROJECTS_LIST } from "../data/completedProjects";
import { mergeProjectsWithApi } from "../utils/projectMerge";

import completed1 from '../assets/completed/completed1.jpg';
import completed2 from '../assets/completed/completed2.jpg';
import completed3 from '../assets/completed/completed3.jpg';
import completed4 from '../assets/completed/completed4.jpg';
import completed5 from '../assets/completed/completed5.jpg';
import completed6 from '../assets/completed/completed6.jpg';
import completed7 from '../assets/completed/completed7.jpg';
import completed8 from '../assets/completed/completed8.jpg';
import completed9 from '../assets/completed/completed9.png';
import completed10 from '../assets/completed/completed10.jpg';
import completed11 from '../assets/completed/completed11.jpg';
import completed12 from '../assets/completed/completed12.jpg';
import completed13 from '../assets/completed/completed13.jpg';
import completed14 from '../assets/completed/completed14.jpg';
import completed15 from '../assets/completed/completed15.jpg';

const heroImages = [
    completed1, completed2, completed3, completed4, completed5,
    completed6, completed7, completed8, completed9, completed10,
    completed11, completed12, completed13, completed14, completed15,
];

// Helper to deduce category from title for the raw list
// (Ideally this should be shared too, but we will keep it here for now)
const getCategory = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes("residencial") || lower.includes("residence") || lower.includes("house") || lower.includes("villa")) return "Residential";
    if (lower.includes("green trends") || lower.includes("hotel") || lower.includes("restaurant") || lower.includes("cafe") || lower.includes("limelite")) return "Hospitality";
    if (lower.includes("dr agarwal") || lower.includes("hospital") || lower.includes("clinic") || lower.includes("lab")) return "Luxe Detail";
    return "Commercial";
};

const getLocation = (title: string) => {
    if (title.includes("(")) {
        const parts = title.split("(");
        return parts[parts.length - 1].replace(")", "").trim();
    }
    return "India";
}

export default function ArsenArchive() {
    const [searchTerm, setSearchTerm] = useState("");
    const [visibleCount, setVisibleCount] = useState(50);
    const [apiProjects, setApiProjects] = useState<any[]>([]);

    // Slider Logic
    const [currentIndex, setCurrentIndex] = useState(0);
    const { scrollYProgress } = useScroll();
    const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroImages.length);
        }, 2500);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/public/projects`);
            const data = await res.json();
            if (data && data.length > 0) {
                setApiProjects(data); // Store all, filtering happens via merge
            }
        } catch (err) {
            console.error(err);
        }
    };

    // 1. Dynamic Featured (First 3-6 projects from API)
    const FINAL_FEATURED = useMemo(() => {
        // You can customize this filter logic (e.g. only "Luxe Detail" or explicit "featured" flag)
        // For now, we take the most recent 6 active projects
        return apiProjects.filter(p => p.status === 'completed').slice(0, 6);
    }, [apiProjects]);

    // 2. Remaining Projects (Rest of the completed projects)
    const REMAINING_PROJECTS = useMemo(() => {
        return apiProjects.filter(p => p.status === 'completed').slice(6);
    }, [apiProjects]);

    const filteredRemaining = REMAINING_PROJECTS.filter((p: any) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.category || p.type || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayedRemaining = filteredRemaining.slice(0, visibleCount);

    return (
        <div className="bg-[#050707] min-h-screen text-white font-sans selection:bg-[#F28C28] overflow-x-hidden">

            {/* HERO SECTION */}
            <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center overflow-hidden border-b border-white/5">
                <motion.div style={{ scale: imageScale }} className="absolute inset-0 z-0">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentIndex}
                            src={heroImages[currentIndex]}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-full h-full object-cover"
                            alt={`Archive Hero ${currentIndex + 1}`}
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050707] via-[#050707]/40 to-transparent" />
                </motion.div>

                <div className="relative z-10 text-center w-full max-w-5xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="text-[10px] md:text-[12px] font-black tracking-[0.4em] text-[#F28C28] uppercase block mb-4">
                            Project Heritage Archive
                        </span>
                        <h1 className="text-[11vw] md:text-[9vw] font-black leading-[0.9] tracking-tighter uppercase text-white">
                            Completed <br />
                            <span className="text-transparent italic" style={{ WebkitTextStroke: '1px #fff' }}>
                                Masterpieces
                            </span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* FEATURED PROJECTS (IMAGE GRID) */}
            <section className="max-w-[1600px] mx-auto px-4 md:px-10 py-20">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <span className="text-[#F28C28] font-black tracking-widest uppercase text-xs mb-2 block">Showcase Gallery</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">Featured Works</h2>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
                        <Grid size={16} /> Grid View
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FINAL_FEATURED.map((project: any, idx: number) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative"
                        >
                            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white/5 border border-white/10 mb-6 relative">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                {/* Priority: Active Image URL -> Fallback Image Import */}
                                <img
                                    src={project.image_url || project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute bottom-4 right-4 z-20 bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                    <ArrowUpRight size={20} />
                                </div>
                            </div>
                            <div>
                                <span className="text-[#F28C28] text-[10px] font-black uppercase tracking-widest">{project.category || project.type}</span>
                                <h3 className="text-2xl font-bold uppercase mt-1 mb-2 group-hover:text-[#F28C28] transition-colors">{project.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed line-clamp-2">{project.description}</p>
                                <div className="flex items-center gap-2 mt-4 text-white/60 text-xs font-bold uppercase tracking-wider">
                                    <MapPin size={12} className="text-[#F28C28]" /> {project.location}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* REMAINING PROJECTS (TABLE LIST) */}
            <section className="bg-[#0F1111] border-t border-white/5 py-20">
                <div className="max-w-[1600px] mx-auto px-4 md:px-10">
                    <div className="flex flex-col md:flex-row items-end md:items-center justify-between mb-12 gap-6">
                        <div>
                            <span className="text-[#F28C28] font-black tracking-widest uppercase text-xs mb-2 block">Comprehensive Archive</span>
                            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Project List</h2>
                        </div>

                        {/* Search */}
                        <div className="w-full md:w-96 relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4 group-focus-within:text-[#F28C28] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search archive..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-black border border-white/10 rounded-full py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-[#F28C28]/50 transition-colors uppercase tracking-wider placeholder:text-white/20"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="border border-white/10 rounded-3xl overflow-hidden bg-[#050707]">
                        <div className="grid grid-cols-12 gap-4 p-6 bg-white/5 text-[#F28C28] text-[10px] items-center font-black uppercase tracking-[0.2em] border-b border-white/10">
                            <div className="col-span-1">No.</div>
                            <div className="col-span-6 md:col-span-5">Project Name</div>
                            <div className="hidden md:block col-span-3">Sector</div>
                            <div className="col-span-5 md:col-span-3">Location</div>
                        </div>

                        <div className="divide-y divide-white/5">
                            {displayedRemaining.map((project: any, idx: number) => {
                                const cat = project.category || project.type || "Commercial";
                                return (
                                    <div
                                        key={project.id}
                                        className="grid grid-cols-12 gap-4 p-5 items-center hover:bg-white/5 transition-colors group cursor-default"
                                    >
                                        <div className="col-span-1 text-white/20 font-mono text-xs">
                                            {(idx + 1).toString().padStart(2, '0')}
                                        </div>
                                        <div className="col-span-6 md:col-span-5 font-bold uppercase text-sm text-white/80 group-hover:text-white transition-colors">
                                            {project.title}
                                        </div>
                                        <div className="hidden md:block col-span-3">
                                            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${cat === 'Residential' ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' :
                                                cat === 'Hospitality' ? 'border-purple-500/20 text-purple-400 bg-purple-500/5' :
                                                    cat === 'Luxe Detail' ? 'border-yellow-500/20 text-yellow-400 bg-yellow-500/5' :
                                                        'border-blue-500/20 text-blue-400 bg-blue-500/5'
                                                }`}>
                                                {cat}
                                            </span>
                                        </div>
                                        <div className="col-span-5 md:col-span-3 text-xs text-white/40 flex items-center gap-2 group-hover:text-white/60 transition-colors">
                                            <MapPin size={12} className="shrink-0" /> {project.location}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {displayedRemaining.length === 0 && (
                            <div className="p-20 text-center text-white/30">
                                Archive entry not found.
                            </div>
                        )}
                    </div>

                    {/* Load More */}
                    {visibleCount < filteredRemaining.length && (
                        <div className="mt-12 flex justify-center">
                            <button
                                onClick={() => setVisibleCount(prev => prev + 50)}
                                className="group flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 hover:border-[#F28C28] bg-transparent hover:bg-[#F28C28] text-white hover:text-black font-black uppercase text-xs tracking-[0.2em] transition-all"
                            >
                                Load More Projects
                                <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <style jsx>{`
        .text-outline { -webkit-text-stroke: 1px rgba(255,255,255,0.3); }
      `}</style>
        </div>
    );
}