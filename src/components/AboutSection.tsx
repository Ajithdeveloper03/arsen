"use client";

import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
    useAnimation,
} from "framer-motion";
import CountUp from "react-countup";
import { useRef, useState, useEffect } from "react";
import {
    Building2,
    MapPin,
    Clock,
    Award,
    Users,
    HeadphonesIcon,
    Zap,
    Layers,
    Feather,
    Box,
    Hexagon,
    Triangle,
    Anchor,
    Cpu,
    Globe,
    ChevronRight,
    Sparkles,
    Target,
    Shield,
    Lightbulb,
    TrendingUp,
    Palette,
    CheckCircle,
} from "lucide-react";

// --- DATA ---
const partnersRow1 = [
    { name: "NEXUS", icon: Box },
    { name: "VERTEX", icon: Triangle },
    { name: "STRATA", icon: Layers },
    { name: "LUMINA", icon: Zap },
];
const partnersRow2 = [
    { name: "AERIS", icon: Feather },
    { name: "POLYGON", icon: Hexagon },
    { name: "ORBIT", icon: Globe },
    { name: "CORE", icon: Cpu },
];

const row1 = [...partnersRow1, ...partnersRow1, ...partnersRow1];
const row2 = [...partnersRow2, ...partnersRow2, ...partnersRow2];

export default function AboutSection() {
    const features = [
        {
            icon: Award,
            title: "25 Years Expert",
            description: "Deep execution expertise ensuring seamless delivery.",
        },
        {
            icon: Building2,
            title: "800+ Projects",
            description: "Designed and executed premium interior projects.",
        },
        {
            icon: Users,
            title: "500+ Clients",
            description: "A proven record of quality delivery and satisfaction.",
        },
        {
            icon: HeadphonesIcon,
            title: "24/7 Support",
            description: "We are available round the clock to assist you.",
        },
        {
            icon: Clock,
            title: "On-Time",
            description: "We guarantee on-time delivery with systematic execution.",
        },
        {
            icon: Building2,
            title: "Lifetime Support",
            description: "After-sales support to ensure interiors remain perfect.",
        },
    ];

    const stats = [
        { number: 1100, label: "Projects", icon: Building2, suffix: "+" },
        { number: 230, label: "Cities", icon: MapPin, suffix: "+" },
        { number: 25, label: "Faster TAT", icon: Clock, suffix: "%" },
    ];

    const aboutRef = useRef(null);
    const { scrollYProgress: aboutScrollY } = useScroll({
        target: aboutRef,
        offset: ["start end", "end start"],
    });
    const yParallax = useTransform(aboutScrollY, [0, 1], [100, -100]);

    return (
        <div className="w-full bg-white overflow-hidden">
            {/* === SECTION 1: ABOUT US === */}
            <section
                ref={aboutRef}
                className="relative w-full py-24 bg-gradient-to-b from-white via-[#e5f1ff] to-white"
            >
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr_1.2fr] gap-12 items-start relative z-10">
                    {/* LEFT — STATS */}
                    <div className="space-y-6 w-full max-w-[280px] sticky top-20">
                        {stats.map((stat, index) => {
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/50"
                                >
                                    <stat.icon className="w-10 h-10 text-[#FFA62B] mb-3" />
                                    <h3 className="text-4xl font-black text-[#16697A] mb-1">
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
                            );
                        })}
                    </div>

                    {/* MIDDLE — IMAGE (Parallax) */}
                    <motion.div
                        style={{ y: yParallax }}
                        className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/20"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                        <img
                            src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1920"
                            alt="Work Process"
                            className="object-cover w-full h-[600px]"
                        />
                        <div className="absolute bottom-8 left-8 z-20 text-white">
                            <p className="font-bold text-lg">Premium Quality</p>
                            <p className="text-sm opacity-80">Crafted with precision</p>
                        </div>
                    </motion.div>

                    {/* RIGHT — TEXT CONTENT */}
                    <div className="pt-4">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-6xl font-black text-[#16697A] leading-[0.9] mb-6"
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-500 text-4xl md:text-5xl block mb-2">
                                About
                            </span>
                            Arsen Interior
                        </motion.h2>

                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            What makes us{" "}
                            <span className="px-3 py-1 bg-[#FFA62B] text-white rounded-lg -rotate-2 transform inline-block shadow-lg">
                                Different?
                            </span>
                        </h3>

                        <p className="text-gray-600 text-lg leading-relaxed mb-8 font-medium text-justify">
                            We have digitally integrated the interior execution supply chain
                            across factories, OEMs, labour contractors, and architects. We
                            follow a full-stack model, do not subcontract, upskill manpower,
                            and source materials directly from OEMs — ensuring superior
                            quality and complete control.
                        </p>

                        <div className="flex items-center gap-12 border-t border-gray-200 pt-8">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Building2 className="w-5 h-5 text-[#16697A]" />
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        Started In
                                    </p>
                                </div>
                                <p className="text-3xl font-black text-[#16697A]">2019</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Users className="w-5 h-5 text-[#16697A]" />
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        Happy Clients
                                    </p>
                                </div>
                                <p className="text-3xl font-black text-[#16697A]">100+</p>
                            </div>
                        </div>

                        <button className="mt-10 bg-[#16697A] hover:bg-[#125663] text-white font-bold px-10 py-4 rounded-full transition-colors duration-300 hover:shadow-lg hover:shadow-teal-700/30 flex items-center gap-2 group">
                            Know More
                            <span className="inline-block transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            {/* === SECTION 2: WHY CHOOSE US (LUSION STYLE) === */}
            <LusionCardSection features={features} />

            {/* === NEW: 3D INTERACTIVE COMMERCIAL EXPERTISE SECTION === */}
            <CommercialExpertiseSection />

            {/* === SECTION 3: MODERN LOGO TICKER === */}
            <LogoTickerSection />
        </div>
    );
}



function LusionCardSection({ features }) {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.8", "end start"],
    });

    const progress = useSpring(scrollYProgress, {
        stiffness: 50,
        damping: 15,
        mass: 0.8,
    });

    const pathLength = useTransform(progress, [0.1, 0.8], [0, 1]);
    const lineOpacity = useTransform(progress, [0, 0.2], [0, 1]);

    return (
        <section
            ref={containerRef}
            className="relative w-full py-40 bg-[#f1f5ff] overflow-hidden"
            style={{ perspective: "2000px" }}
        >
            {/* Background geometric line */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <svg
                    className="w-full h-full opacity-30"
                    viewBox="0 0 1200 800"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <motion.path
                        d="M600,0 C600,200 200,200 200,400 C200,600 1000,600 1000,400 C1000,200 600,600 600,800"
                        stroke="#16697A"
                        strokeWidth="13"
                        strokeDasharray="10 10"
                        style={{ pathLength, opacity: lineOpacity }}
                    />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-32">
                    <span className="text-[#FFA62B] font-bold tracking-[0.2em] uppercase mb-3 block text-sm">
                        Our Values
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-[#16697A]">
                        Why Choose Us
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 min-h-[800px]">
                    {features.map((feature, i) => (
                        <LusionCard
                            key={i}
                            feature={feature}
                            index={i}
                            progress={progress}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function LusionCard({ feature, index, progress }) {
    const step = 0.05;
    const duration = 0.4;
    const start = index * step;
    const end = start + duration;

    const localProgress = useTransform(progress, [start, end], [0, 1]);

    const col = index % 3;
    const row = Math.floor(index / 3);

    const initialX = col === 0 ? "100%" : col === 2 ? "-100%" : "0%";
    const initialY = row === 0 ? "50%" : "-50%";

    const x = useTransform(localProgress, [0, 1], [initialX, "0%"]);
    const y = useTransform(localProgress, [0, 1], [initialY, "0%"]);

    const rotateY = useTransform(localProgress, [0, 1], [180, 0]);
    const initialTilt = col === 0 ? -15 : col === 2 ? 15 : 0;
    const rotateZ = useTransform(localProgress, [0, 1], [initialTilt, 0]);

    const scale = useTransform(localProgress, [0, 1], [0.5, 1]);
    const opacity = useTransform(localProgress, [0, 0.5], [0, 1]);

    return (
        <div className="relative w-full h-[320px] perspective-[800px] group z-20">
            <motion.div
                style={{
                    x,
                    y,
                    rotateY,
                    rotateZ,
                    scale,
                    opacity,
                    transformStyle: "preserve-3d",
                }}
                className="w-full h-full relative"
            >
                {/* Front */}
                <div
                    className="absolute inset-0 bg-white rounded-[2rem] border border-gray-100 p-8 flex flex-col items-center justify-center text-center backface-hidden shadow-2xl"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#16697A]/5 via-transparent to-[#FFA62B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />

                    <div className="w-16 h-16 bg-[#eefcfd] rounded-2xl flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="w-8 h-8 text-[#16697A]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 relative z-10">
                        {feature.title}
                    </h3>
                    <p className="text-gray-500 font-medium relative z-10 leading-relaxed text-lg">
                        {feature.description}
                    </p>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 bg-[#16697A] rounded-[2rem] flex flex-col items-center justify-center backface-hidden shadow-2xl overflow-hidden"
                    style={{
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                    }}
                >
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border-[40px] border-white rounded-full" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-[2px] border-white rotate-45" />
                    </div>

                    <div className="absolute inset-4 border border-[#FFA62B]/50 rounded-xl z-10" />

                    <div className="relative z-20 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <Box className="w-10 h-10 text-[#16697A]" />
                    </div>
                    <p className="relative z-20 mt-4 text-white font-bold tracking-[0.3em] text-xs">
                        ARSEN
                    </p>
                </div>
            </motion.div>
        </div>
    );
}


function CommercialExpertiseSection() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Smooth spring for animations
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        mass: 0.5,
    });

    // Parallax effects
    const titleY = useTransform(smoothProgress, [0, 1], [80, -30]);
    const titleOpacity = useTransform(smoothProgress, [0, 0.3], [0, 1]);

    // Feature cards animation progress
    const card1 = useTransform(smoothProgress, [0.1, 0.3], [0, 1]);
    const card2 = useTransform(smoothProgress, [0.2, 0.4], [0, 1]);
    const card3 = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
    const card4 = useTransform(smoothProgress, [0.4, 0.6], [0, 1]);
    const card5 = useTransform(smoothProgress, [0.5, 0.7], [0, 1]);
    const card6 = useTransform(smoothProgress, [0.6, 0.8], [0, 1]);

    // 3D rotation on scroll
    const rotateX = useTransform(smoothProgress, [0, 1], [15, -5]);
    const rotateY = useTransform(smoothProgress, [0, 1], [-10, 10]);

    // Floating cubes animation
    const cube1Y = useTransform(smoothProgress, [0, 1], [0, -100]);
    const cube2Y = useTransform(smoothProgress, [0, 1], [0, 80]);
    const cube3Y = useTransform(smoothProgress, [0, 1], [0, -60]);

    // Data for features
    const features = [
        {
            icon: Target,
            title: "Strategic Design",
            description: "We align your brand identity with spatial design",
            color: "#16697A",
            accent: "#FFA62B",
            delay: 0,
        },
        {
            icon: TrendingUp,
            title: "ROI Focused",
            description: "Designs that enhance productivity and revenue",
            color: "#2A9D8F",
            accent: "#E9C46A",
            delay: 0.1,
        },
        {
            icon: Shield,
            title: "Premium Quality",
            description: "Industry-grade materials with lifetime warranty",
            color: "#264653",
            accent: "#F4A261",
            delay: 0.2,
        },
        {
            icon: Lightbulb,
            title: "Innovation",
            description: "Smart spaces with IoT integration",
            color: "#E76F51",
            accent: "#2A9D8F",
            delay: 0.3,
        },
        {
            icon: Palette,
            title: "Custom Solutions",
            description: "Tailored designs for unique business needs",
            color: "#8D99AE",
            accent: "#EF233C",
            delay: 0.4,
        },
        {
            icon: CheckCircle,
            title: "End-to-End",
            description: "From concept to completion, we handle everything",
            color: "#FFA62B",
            accent: "#16697A",
            delay: 0.5,
        },
    ];

    // Process steps
    const processSteps = [
        { step: "01", title: "Discovery", desc: "Understanding your vision" },
        { step: "02", title: "Concept", desc: "Creating design narratives" },
        { step: "03", title: "Design", desc: "3D visualization & planning" },
        { step: "04", title: "Execution", desc: "Precision implementation" },
        { step: "05", title: "Delivery", desc: "Quality assurance & handover" },
    ];

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-32 md:py-48 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
        >
            {/* Animated floating cubes */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <motion.div
                    style={{ y: cube1Y }}
                    className="absolute top-20 left-10 w-24 h-24 border-2 border-[#FFA62B]/20 rounded-xl rotate-12"
                />
                <motion.div
                    style={{ y: cube2Y }}
                    className="absolute top-40 right-20 w-32 h-32 border-2 border-[#16697A]/10 rounded-lg rotate-45"
                />
                <motion.div
                    style={{ y: cube3Y }}
                    className="absolute bottom-40 left-1/4 w-20 h-20 border border-gray-300/30 rounded rotate-12"
                />
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-gray-100/30" />
            </div>

            {/* Main content container */}
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Title section with parallax */}
                <motion.div
                    style={{ y: titleY, opacity: titleOpacity }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 1 }}
                        className="inline-block mb-4"
                    >
                        <Sparkles className="w-12 h-12 text-[#FFA62B] mx-auto" />
                    </motion.div>
                    <h2 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#16697A] via-gray-800 to-[#FFA62B] mb-4">
                        Commercial Excellence
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
                        Transforming spaces with cutting-edge design and precision
                        execution
                    </p>
                </motion.div>

                {/* 3D Feature Grid */}
                <div
                    ref={containerRef}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: feature.delay }}
                        >
                            <FeatureCard3D feature={feature} index={index} />
                        </motion.div>
                    ))}
                </div>

                {/* Interactive Process Timeline */}
                <div className="relative">
                    <h3 className="text-3xl font-bold text-center mb-16 text-gray-800">
                        Our <span className="text-[#16697A]">5-Step</span> Process
                    </h3>

                    {/* Animated connecting line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#16697A] to-transparent opacity-20 translate-y-1/2" />

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
                        {processSteps.map((step, index) => (
                            <ProcessStep3D
                                key={index}
                                step={step}
                                index={index}
                                totalSteps={processSteps.length}
                            />
                        ))}
                    </div>
                </div>

                {/* Stats counter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 p-12 rounded-3xl bg-gradient-to-br from-[#16697A] via-[#125663] to-gray-900 text-white"
                >
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-black mb-2">
                                <CountUp start={0} end={98} duration={3} suffix="%" />
                            </div>
                            <p className="text-gray-300">Client Satisfaction</p>
                        </div>
                        <div>
                            <div className="text-5xl font-black mb-2">
                                <CountUp start={0} end={150} duration={3} suffix="+" />
                            </div>
                            <p className="text-gray-300">Commercial Projects</p>
                        </div>
                        <div>
                            <div className="text-5xl font-black mb-2">
                                <CountUp start={0} end={40} duration={3} suffix="%" />
                            </div>
                            <p className="text-gray-300">Faster Turnaround</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// 3D Feature Card Component
function FeatureCard3D({ feature, index }) {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const controls = useAnimation();

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        rotateX.set((y - centerY) / 20);
        rotateY.set((centerX - x) / 20);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        controls.start({
            scale: 1.05,
            transition: { type: "spring", stiffness: 300 },
        });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        rotateX.set(0);
        rotateY.set(0);
        controls.start({
            scale: 1,
            transition: { type: "spring", stiffness: 300 },
        });
    };

    return (
        <motion.div
            ref={cardRef}
            animate={controls}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative h-[320px] cursor-pointer group"
        >
            {/* Card content */}
            <div className="absolute inset-0 bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col items-center justify-center text-center transform-gpu transition-all duration-300">
                {/* Glow effect */}
                <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(circle at center, ${feature.color}20, transparent 70%)`,
                    }}
                />

                {/* Icon with floating animation */}
                <motion.div
                    animate={{ y: isHovered ? -10 : 0 }}
                    className="relative z-10 mb-6"
                >
                    <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
                        style={{
                            background: `linear-gradient(135deg, ${feature.color}20, ${feature.accent}20)`,
                        }}
                    >
                        <feature.icon
                            className="w-10 h-10"
                            style={{ color: feature.color }}
                        />
                    </div>
                </motion.div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 relative z-10">
                    {feature.title}
                </h3>
                <p className="text-gray-600 relative z-10 leading-relaxed">
                    {feature.description}
                </p>

                {/* Animated underline */}
                <motion.div
                    animate={{ width: isHovered ? "100%" : "0%" }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
                    style={{ backgroundColor: feature.accent }}
                />

                {/* Corner accents */}
                <div
                    className="absolute top-4 right-4 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: feature.color }}
                />
                <div
                    className="absolute bottom-4 left-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: feature.accent }}
                />
            </div>

            {/* 3D depth effect */}
            <div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-900/5 to-transparent -z-10 translate-z-[-20px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ transformStyle: "preserve-3d" }}
            />
        </motion.div>
    );
}

// 3D Process Step Component
function ProcessStep3D({ step, index, totalSteps }) {
    const stepRef = useRef(null);
    const [hovered, setHovered] = useState(false);

    const { scrollYProgress } = useScroll({
        target: stepRef,
        offset: ["start 80%", "end 20%"],
    });

    // Modern reveal effects
    const rise = useTransform(scrollYProgress, [0, 1], [50, 0]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

    // Subtle 3D parallax tilt
    const tiltX = useTransform(scrollYProgress, [0, 1], [12, 0]);
    const tiltY = useTransform(scrollYProgress, [0, 1], [-12, 0]);

    return (
        <motion.div
            ref={stepRef}
            style={{
                y: rise,
                opacity,
                scale,
                rotateX: tiltX,
                rotateY: tiltY,
                transformStyle: "preserve-3d",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="relative group cursor-default"
        >
            {/* Step Number */}
            <motion.div
                animate={{
                    scale: hovered ? 1.15 : 1,
                    y: hovered ? -4 : 0,
                }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative z-20 mb-6"
            >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#16697A] to-[#FFA62B] shadow-xl flex items-center justify-center">
                    <span className="text-2xl font-black text-white drop-shadow">
                        {step.step}
                    </span>
                </div>

                {/* Soft halo light */}
                <div className="absolute inset-0 blur-2xl bg-[#16697A]/30 rounded-full -z-10 opacity-50" />
            </motion.div>

            {/* Card Container */}
            <motion.div
                animate={{
                    y: hovered ? -10 : 0,
                    boxShadow: hovered
                        ? "0 25px 60px rgba(0,0,0,0.25)"
                        : "0 10px 30px rgba(0,0,0,0.12)",
                }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
                className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/40 text-center transform-gpu overflow-hidden"
            >
                {/* Interior Glow Accent */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top,rgba(255,166,43,0.20),transparent_70%)]" />

                <h4 className="text-xl font-bold text-gray-800 relative z-20 mb-2">
                    {step.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed relative z-20">
                    {step.desc}
                </p>

                {/* Animated Connecting Line */}
                {index < totalSteps - 1 && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: "3rem", opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="hidden lg:block absolute top-1/2 right-[-2.2rem] h-[3px] bg-gradient-to-r from-[#16697A] to-[#FFA62B] rounded-full"
                    />
                )}
            </motion.div>

            {/* Hover Ambient Glow */}
            <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-3xl"
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(22,105,122,0.22), transparent 70%)",
                }}
            />
        </motion.div>
    );
}

function LogoTickerSection() {
    return (
        <section className="w-full py-24 bg-[#16697A] relative overflow-hidden flex flex-col gap-12">
            <div className="absolute inset-0 opacity-65 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

            <div className="absolute inset-0 bg-gradient-to-b from-[#16697A] via-transparent to-[#16697A] z-10 pointer-events-none" />

            <div className="text-center relative z-20 mb-4">
                <p className="text-[#FFA62B] font-bold tracking-[0.3em] text-xs uppercase">
                    Trusted by Leaders
                </p>
            </div>

            <div className="relative w-full flex overflow-hidden z-20 rotate-1">
                <motion.div
                    className="flex gap-8 whitespace-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                    style={{ width: "max-content" }}
                >
                    {row1.map((partner, i) => (
                        <LogoTag key={i} partner={partner} />
                    ))}
                </motion.div>
            </div>

            <div className="relative w-full flex overflow-hidden z-20 -rotate-1">
                <motion.div
                    className="flex gap-8 whitespace-nowrap"
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{ duration: 35, ease: "linear", repeat: Infinity }}
                    style={{ width: "max-content" }}
                >
                    {row2.map((partner, i) => (
                        <LogoTag key={i} partner={partner} dark />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function LogoTag({ partner, dark }) {
    return (
        <div
            className={`flex items-center gap-3 px-8 py-4 rounded-full border backdrop-blur-md transition-all duration-300 cursor-pointer hover:scale-105 ${dark
                ? "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                : "bg-[#FFA62B]/10 border-[#FFA62B]/20 hover:bg-[#FFA62B]/20 text-[#FFA62B]"
                }`}
        >
            <partner.icon className="w-6 h-6" />
            <span className="text-xl font-bold tracking-tight text-white">
                {partner.name}
            </span>
        </div>
    );
}