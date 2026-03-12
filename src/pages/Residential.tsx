"use client";

import React, { useRef, useState } from "react";
import { BASE_URL } from '../services/api';
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight, MousePointer2, MapPin, Plus, Send } from "lucide-react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import jagger from '../assets/jagger.jpeg';
import sunil2 from '../assets/sunil2.jpeg';
import sunil3 from '../assets/sunil3.jpeg';
import sunil4 from '../assets/sunil4.jpeg';
import sunil5 from '../assets/sunil5.jpeg';
// Asset Imports
import banner from '../assets/residential-banner.jpg';
import kitchen from '../assets/modular-kitchen.png';
import furniture from '../assets/modular-furniture.jpg';
import saff from '../assets/residential-saff.jpg';
import tharun from '../assets/residential-tharun.jpeg';
import sunil from '../assets/residential-sunil.jpg';
import ceiling from '../assets/ceiling.jpg';
import wallpaper from '../assets/wallpaper.jpg';
import lighting from '../assets/lighting.jpg';
import living from '../assets/living.jpeg';
import constructing from '../assets/constructing.jpeg';
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
    title: "Golden Treasure - Jeevan's Residential",
    loc: "Chennai",
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
    title: "Sunil Reddy Residential",
    loc: "Hyderabad",
    img: jagger,
    desc: "An avant-garde industrial masterpiece utilizing raw materials with a premium finish.",
    featured: true,
    images: [jagger, sunil2, sunil3, sunil4, sunil5]
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
          <img src={banner} className="w-full h-full object-cover brightness-50" alt="Main Hero" />
        </motion.div>
        <div className="relative z-10 text-center px-6">
          <motion.div initial={{ opacity: 0, letterSpacing: "2em" }} animate={{ opacity: 1, letterSpacing: "0.5em" }} transition={{ duration: 2 }} className="text-[#FDBA74] text-[14px] font-black uppercase">
            Signature Residential
          </motion.div>
          <h1 className="text-[14vw] md:text-[11vw] font-black leading-none tracking-tighter uppercase italic">
            Arsen <span className="text-transparent font-outline" style={{ WebkitTextStroke: '2px #FDBA74' }}>Elite</span>
          </h1>
          <div className="flex justify-center mt-4">
            <span className="border-b-4 border-red-600 pb-1 text-md uppercase tracking-[0.3em]">
              As you expected
            </span>
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
                    <MapPin size={10} className="text-[#FDBA74]" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{project.loc}</span>
                  </div>
                  <h3 className="text-lg font-black uppercase leading-tight group-hover:text-[#FDBA74] transition-colors">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Featured Large Project (Sunil Reddy with Slider) */}
          {PROJECTS.filter(p => p.featured).map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[3rem] overflow-hidden bg-black text-white h-[400px] md:h-[600px] group shadow-2xl mb-12"
            >
              {/* Swiper Background */}
              <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                navigation={{
                  prevEl: '.sunil-prev-btn',
                  nextEl: '.sunil-next-btn',
                }}
                pagination={{
                  el: '.sunil-pagination',
                  clickable: true,
                  renderBullet: (index, className) => {
                    return `<span class="${className}"></span>`;
                  },
                }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop={true}
                className="h-full w-full"
              >
                {project.images?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative h-full w-full">
                      <img
                        src={image}
                        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-90 transition-opacity duration-700"
                        alt={`${project.title} - Image ${index + 1}`}
                      />
                      {/* Darker Overlay to ensure text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Content Overlay - Added z-10 to bring to front */}
              <div className="absolute inset-0 flex items-end z-10 pointer-events-none">
                <div className="relative p-8 md:p-16 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-auto">
                  <div className="max-w-xl">
                    <div className="bg-black/40 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white/10">
                      <span className="text-[#FDBA74] text-xs font-black uppercase path tracking-[0.5em] mb-4 block">
                        Masterpiece Selection
                      </span>
                      <h3 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 text-white">
                        {project.title}
                      </h3>
                      <p className="text-gray-200 text-lg leading-relaxed">
                        {project.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Controls - Added z-20 */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-20 flex justify-between px-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button className="sunil-prev-btn p-3 md:p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-[#FDBA74] hover:text-black transition-all transform hover:scale-110">
                  <ChevronLeft size={24} />
                </button>
                <button className="sunil-next-btn p-3 md:p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-[#FDBA74] hover:text-black transition-all transform hover:scale-110">
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Pagination Dots - Added z-20 */}
              <div className="sunil-pagination absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3" />

              {/* Custom CSS for Pagination (Add this to your CSS file or use a Style tag) */}
              <style jsx global>{`
      .sunil-pagination .swiper-pagination-bullet {
        background: white !important;
        opacity: 0.5;
        width: 8px;
        height: 8px;
        transition: all 0.3s ease;
        border-radius: 4px;
      }
      .sunil-pagination .swiper-pagination-bullet-active {
        background: #FDBA74 !important;
        opacity: 1;
        width: 32px !important;
      }
    `}</style>
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
          <ProcessItem num="01" title="DISCOVERY & DISCUSSION" desc="We understand your lifestyle, preferences, and spatial needs to define a clear project vision and execution roadmap and proposal Estimation." />
          <ProcessItem num="02" title="DETAILED DESIGN & DRAWINGS" desc="Our Designers and Engineers prepare precise technical schematics for lighting, electricals, and cabinetry, ensuring seamless performance behind the walls." />
          <ProcessItem num="03" title="DISCERNED MATERIAL SELECTION" desc="We source certified, high-quality materials from trusted Branded partners to deliver durability and a refined aesthetic." />
          <ProcessItem num="04" title="DEDICATED DEVELOPMENT" desc="Our expert on-site teams execute the build while adhering to strict safety, quality, and environmental standards." />
          <ProcessItem num="05" title="DILIGENT QUALITY DIAGNOSTICS" desc="A comprehensive 60+ point inspection is carried out to ensure every detail meets our uncompromising quality benchmarks." />
          <ProcessItem num="06" title="DELIGHTFUL DELIVERY & HANDOVER" desc="After a professional deep clean, we hand over a fully finished, move-in-ready home crafted to perfection as you Expected." />
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
              Our<br /><span className="text-[#FDBA74] ">Focus</span>
            </h2>
            <p className="text-[18px] font-bold uppercase tracking-[0.4em] text-white/30 mt-6">Core Competencies & Services</p>
          </div>
          <CategoryCard title="Modular Kitchens" img={kitchen} />
          <CategoryCard title="Electrical and Lighting's " img={lighting} />
          <CategoryCard title="Living & Dining Spaces" img={living} />
          <CategoryCard title="Bedroom & Wardrobes" img={wallpaper} />
          <CategoryCard title="Flooring & False Ceilings" img={ceiling} />

          <CategoryCard title="Modular Furnitures" img={furniture} />
          <CategoryCard title="Constructing & Crafting" img={constructing} />
        </motion.div>
      </div>
    </section>
  );
};

const CategoryCard = ({ title, img }: { title: string; img: string }) => (
  <div className="min-w-[260px] md:min-w-[480px] h-[45vh] md:h-[60vh] relative group rounded-[2rem] md:rounded-[3rem] overflow-hidden">
    <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" alt={title} />
    <div className="absolute inset-0 bg-black/40 p-8 flex flex-col justify-end">
      <h4 className="text-2xl md:text-4xl font-black uppercase">{title}</h4>
    </div>
  </div>
);

const ProcessItem = ({ num, title, desc }: { num: string; title: string; desc: string }) => (
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
    <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-10">Common<br />Queries.</h2>
    <div className="space-y-4">
      <AccordionItem q="How long does a full villa design take?" a="Typically 30–90 days, depending on the scale and complexity of the project, your vision, and specific requirements." />
      <AccordionItem q="Do you provide warranty?" a="Yes We offer a comprehensive 10-year warranty on all residential works(Terms and conditions apply)" />
      <AccordionItem q="How can I be sure my home interior project will be completed with high quality and on time?" a="With experienced designers & Engineers a structured process, and clear communication, we ensure your home interior project is completed smoothly, on time, and to your expectations." />
      <AccordionItem q="Which cities do you serve?" a="Currently, we execute elite interior projects across India, serving clients in all major cities and regions." />
    </div>
  </div>
);

const AccordionItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/10 py-5">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center text-left">
        <span className="text-lg font-bold uppercase italic pr-4">{q}</span>
        {open ? <Minus size={18} /> : <Plus size={18} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="text-gray-500 mt-3 text-lg leading-relaxed">
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "Project Type",
    details: ""
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    details: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePhone = (phone: string) => {
    return /^[6-9]\d{9}$/.test(phone);
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    if (!value.trim() || value === "Project Type") {
      error = `${name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
    } else if (name === "email" && !validateEmail(value)) {
      error = "Please enter a valid email address";
    } else if (name === "phone" && !validatePhone(value)) {
      error = "Please enter a valid 10-digit mobile number";
    } else if (name === "name" && value.length < 2) {
      error = "Name must be at least 2 characters";
    } else if (name === "details" && value.length < 10) {
      error = "Message must be at least 10 characters";
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return error === "";
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isNameValid = validateField("name", formData.name);
    const isEmailValid = validateField("email", formData.email);
    const isPhoneValid = validateField("phone", formData.phone);
    const isProjectTypeValid = validateField("projectType", formData.projectType);
    const isDetailsValid = validateField("details", formData.details);

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isProjectTypeValid || !isDetailsValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${BASE_URL}/api/submit-form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          form_type: "Residential Consultation",
          ...formData
        }),
      });

      if (res.ok) {
        setSent(true);
        setFormData({ name: "", phone: "", email: "", projectType: "Project Type", details: "" });
        setTimeout(() => setSent(false), 5000);
      } else {
        const data = await res.json();
        alert(data.message || "Failed to send consultation request");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#08090A] p-10 md:p-16 rounded-[3rem] text-white">
      {sent ? (
        <div className="text-center py-12">
          <h3 className="text-3xl font-bold text-[#FDBA74] mb-4">Message Sent!</h3>
          <p className="text-gray-400">Our elite design team will reach out to you shortly.</p>
        </div>
      ) : (
        <>
          <h3 className="text-2xl md:text-2xl font-black italic uppercase mb-8">Initiate<br />Consultation.</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input name="name" value={formData.name} onChange={handleInputChange} onBlur={(e) => validateField("name", e.target.value)} required type="text" placeholder="YOUR NAME" className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500/50' : 'border-white/20'} py-4 outline-none focus:border-[#FDBA74] transition-colors`} />
              {errors.name && <p className="text-[10px] text-red-400 mt-1 font-medium">{errors.name}</p>}
            </div>
            <div className="relative">
              <input name="phone" value={formData.phone} onChange={(e: any) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                setFormData(prev => ({ ...prev, phone: value }));
                if (errors.phone) validateField("phone", value);
              }} onBlur={(e) => validateField("phone", e.target.value)} required type="tel" placeholder="YOUR PHONE" className={`w-full bg-transparent border-b ${errors.phone ? 'border-red-500/50' : 'border-white/20'} py-4 outline-none focus:border-[#FDBA74] transition-colors`} />
              {errors.phone && <p className="text-[10px] text-red-400 mt-1 font-medium">{errors.phone}</p>}
            </div>
            <div className="relative">
              <input name="email" value={formData.email} onChange={handleInputChange} onBlur={(e) => validateField("email", e.target.value)} required type="email" placeholder="YOUR EMAIL" className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500/50' : 'border-white/20'} py-4 outline-none focus:border-[#FDBA74] transition-colors`} />
              {errors.email && <p className="text-[10px] text-red-400 mt-1 font-medium">{errors.email}</p>}
            </div>
            <div className="relative">
              <select name="projectType" value={formData.projectType} onChange={handleInputChange} onBlur={(e) => validateField("projectType", e.target.value)} className={`w-full bg-transparent border-b ${errors.projectType ? 'border-red-500/50' : 'border-white/20'} py-4 outline-none focus:border-[#FDBA74] transition-colors cursor-pointer`}>
                <option className="text-black">Project Type</option>
                <option className="text-black">Villa</option>
                <option className="text-black">Apartment</option>
                <option className="text-black">Commercial</option>
              </select>
              {errors.projectType && <p className="text-[10px] text-red-400 mt-1 font-medium">{errors.projectType}</p>}
            </div>
            <div className="relative">
              <textarea name="details" value={formData.details} onChange={handleInputChange} onBlur={(e) => validateField("details", e.target.value)} required placeholder="PROJECT DETAILS" className={`w-full bg-transparent border-b ${errors.details ? 'border-red-500/50' : 'border-white/20'} py-4 outline-none h-28 focus:border-[#FDBA74] transition-colors`} />
              {errors.details && <p className="text-[10px] text-red-400 mt-1 font-medium">{errors.details}</p>}
            </div>
            <button disabled={isSubmitting} type="submit" className="group flex items-center gap-3 text-[#FDBA74] font-black uppercase tracking-widest text-xs pt-4 disabled:opacity-50">
              {isSubmitting ? "Sending..." : "Send Enquiry"} <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>

        </>
      )}
    </div>
  );
};

export default EliteDesignMasterpiece;