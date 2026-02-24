"use client";

import React, { useState, useEffect } from "react";
import { BASE_URL } from '../services/api';
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { MapPin, ArrowUpRight, X, Star, Globe, Upload, CheckCircle2, Users, Mail } from "lucide-react";

const vacancies = [
  {
    id: "J-101",
    title: "Senior Project Manager",
    dept: "Project Management",
    loc: "Trichy",
    salary: "Competitive",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
    specs: ["12–15 Years Experience", "Luxury Residential Background", "International Vendor Management"]
  },
  {
    id: "J-102",
    title: "Lead Interior Architect",
    dept: "Design Studio",
    loc: "Remote ",
    salary: "Industry Standard",
    img: "https://cdn.pixabay.com/photo/2015/04/20/06/46/office-730681_1280.jpg",
    specs: ["Concept to Execution", "Revit & Rhino Proficiency", "High-End FF&E Knowledge"]
  },
  {
    id: "J-103",
    title: "Visualizer (CGI)",
    dept: "Creative Team",
    loc: "Chennai",
    salary: "Based on Portfolio",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200",
    specs: ["Unreal Engine Expertise", "Photorealistic Rendering", "3ds Max & V-Ray"]
  }
];

const Careers = () => {
  const [apiJobs, setApiJobs] = useState<any[]>([]);
  const [activeJob, setActiveJob] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    portfolio: "",
    cv: null,
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    portfolio: "",
    cv: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const validateField = (name: string, value: any) => {
    let error = "";
    if (name === "cv") {
      if (!value) error = "CV is required";
    } else {
      const stringVal = String(value || "").trim();
      if (!stringVal && name !== "portfolio") {
        error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
      } else if (name === "email" && !validateEmail(stringVal)) {
        error = "Please enter a valid email address";
      } else if (name === "phone" && !validatePhone(stringVal)) {
        error = "Please enter a valid 10-digit mobile number";
      } else if (name === "name" && stringVal.length < 2) {
        error = "Name must be at least 2 characters";
      } else if (name === "portfolio" && stringVal && !stringVal.startsWith("http")) {
        error = "Portfolio must be a valid URL starting with http";
      }
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return error === "";
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/public/careers`);
      const data = await res.json();
      if (data && data.length > 0) {
        setApiJobs(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const currentJobs = apiJobs.length > 0 ? apiJobs.map(j => ({
    id: j.id.toString(),
    title: j.title,
    dept: j.department,
    loc: j.location,
    salary: j.salary || "Competitive",
    description: j.description || "",
    img: j.image_url || "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
    specs: typeof j.specifications === 'string' ? JSON.parse(j.specifications) : (j.specifications || []),
    skills: typeof j.skills === 'string' ? JSON.parse(j.skills) : (j.skills || []),
    responsibilities: typeof j.responsibilities === 'string' ? JSON.parse(j.responsibilities) : (j.responsibilities || []),
    contact_email: j.contact_email
  })) : vacancies;

  const handleInputChange = (e: any) => {
    const { name, value, files } = e.target;
    if (name === "cv") {
      const file = files ? files[0] : null;
      setFormData(prev => ({ ...prev, cv: file }));
      validateField("cv", file);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name as keyof typeof errors]) {
        validateField(name, value);
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isNameValid = validateField("name", formData.name);
    const isEmailValid = validateField("email", formData.email);
    const isPhoneValid = validateField("phone", formData.phone);
    const isCvValid = validateField("cv", formData.cv);
    const isPortfolioValid = validateField("portfolio", formData.portfolio);

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isCvValid || !isPortfolioValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("form_type", "Career Application: " + (activeJob?.title || "General"));
      data.append("name", formData.name);
      data.append("phone", formData.phone);
      data.append("email", formData.email);
      data.append("portfolio_link", formData.portfolio);
      if (formData.cv) {
        data.append("cv_file", formData.cv);
      }

      const res = await fetch(`${BASE_URL}/api/submit-form`, {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json",
        },
      });

      const result = await res.json();

      if (res.ok) {
        setFormSubmitted(true);
        setFormData({ name: "", phone: "", email: "", portfolio: "", cv: null });
        setTimeout(() => {
          setFormSubmitted(false);
          setShowForm(false);
          setActiveJob(null);
        }, 3000);
      } else {
        alert(result.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F5F5F2] font-sans text-[#0F1F2A] selection:bg-[#DFA45B] selection:text-white overflow-x-hidden">

      {/* 1. LUXURY HERO SECTION */}
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden bg-[#0F1F2A]">
        <motion.div style={{ y: y1 }} className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1618219944342-824e40a13285?w=1800"
            className="w-full h-full object-cover scale-110"
            alt="Interior Background"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F1F2A]/60 to-[#0F1F2A]" />

        <div className="relative z-10 text-center px-6 w-full max-w-5xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block border border-[#DFA45B] text-[#DFA45B] px-4 py-1.5 rounded-full text-[10px] md:text-sm tracking-[0.2em] mb-6 uppercase"
          >
            Artistry in Execution
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl sm:text-7xl md:text-9xl font-medium text-white leading-[0.9] tracking-tighter"
          >
            Join the <span className="italic font-serif text-[#DFA45B]">Arsen</span><br />Legacy.
          </motion.h1>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {[
            { icon: <Globe size={38} />, title: "Global Presence", desc: "Projects spanning Dubai, Mumbai, and London." },
            { icon: <Star size={38} />, title: "Excellence First", desc: "A meticulous approach to every joint and finish." },
            { icon: <Users size={38} />, title: "Diverse Culture", desc: "A home for architects, artists, and engineers." }
          ].map((item, idx) => (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} key={idx} className="space-y-4">
              <div className="text-[#2A6F72]">{item.icon}</div>
              <h4 className="text-2xl font-bold uppercase tracking-tight">{item.title}</h4>
              <p className="text-gray-500 leading-relaxed text-lg">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. JOB GRID */}
      <section className="px-6 md:px-12 lg:px-24 py-20 md:py-32 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-7xl font-medium mb-12">
          Current <span className="font-serif italic text-[#2A6F72]">Opportunities</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentJobs.map((job) => (
            <motion.div
              layoutId={job.id}
              key={job.id}
              onClick={() => setActiveJob(job)}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={job.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{job.title}</h3>
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                  <MapPin size={14} className="text-[#DFA45B]" /> {job.loc}
                </div>
                <span className="text-[10px] font-black text-[#DFA45B] uppercase tracking-widest">Explore Role →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. DEDICATED APPLICATION SECTION */}
      <section className="px-6 md:px-12 lg:px-24 mb-32">
        <div className="bg-[#2A6F72] rounded-[3rem] p-12 md:p-24 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to apply?</h2>
              <p className="text-white/70 text-lg">Send your portfolio and CV directly to our talent acquisition team.</p>
            </div>
            <button
              onClick={() => { setShowForm(true); setActiveJob({ title: "General Application", id: "GEN" }); }}
              className="px-12 py-6 bg-[#DFA45B] hover:bg-white hover:text-[#0F1F2A] transition-all rounded-full font-bold uppercase tracking-widest text-xs shadow-2xl"
            >
              Open Application Form
            </button>
          </div>
        </div>
      </section>

      {/* JOB DETAIL & APPLICATION MODAL */}
      <AnimatePresence>
        {(activeJob || showForm) && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0F1F2A]/90 backdrop-blur-md flex items-center justify-center p-4 md:p-12 z-[100]"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-[2.5rem] w-full max-w-5xl max-h-[90vh] overflow-hidden relative shadow-2xl flex flex-col md:flex-row"
            >
              <button onClick={() => { setActiveJob(null); setShowForm(false); }} className="absolute top-6 right-6 z-[110] p-3 bg-gray-100 rounded-full hover:bg-red-500 hover:text-white transition-all">
                <X size={20} />
              </button>

              {/* Form Side */}
              <div className="w-full md:w-2/3 p-8 md:p-12 overflow-y-auto custom-scrollbar bg-gray-50">
                {formSubmitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <CheckCircle2 size={64} className="text-[#2A6F72]" />
                    <h3 className="text-2xl font-bold">Application Sent!</h3>
                    <p className="text-gray-500">Our team will review your profile and get back to you soon.</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-8 border-b border-gray-100 pb-6">
                      <span className="text-[#DFA45B] font-black uppercase tracking-widest text-[10px]">Active Role</span>
                      <h2 className="text-3xl font-black text-[#0F1F2A] italic uppercase tracking-tighter">{activeJob?.title}</h2>
                      <p className="text-gray-400 mt-2">{activeJob?.dept} • {activeJob?.loc}</p>
                    </div>

                    {activeJob?.description && (
                      <div className="mb-8">
                        <h4 className="text-xs font-black uppercase tracking-widest mb-3 text-[#2A6F72]">Job Overview</h4>
                        <p className="text-gray-600 leading-relaxed text-sm bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">{activeJob.description}</p>
                      </div>
                    )}

                    {activeJob?.responsibilities?.length > 0 && (
                      <div className="mb-8">
                        <h4 className="text-xs font-black uppercase tracking-widest mb-4 text-[#2A6F72]">Key Responsibilities</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {activeJob.responsibilities.map((r: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#DFA45B] mt-2 shrink-0" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activeJob?.skills?.length > 0 && (
                      <div className="mb-8">
                        <h4 className="text-xs font-black uppercase tracking-widest mb-4 text-[#2A6F72]">Required Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {activeJob.skills.map((s: string, i: number) => (
                            <span key={i} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-500 shadow-sm">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeJob?.specs?.length > 0 && (
                      <div className="mb-10">
                        <h4 className="text-xs font-black uppercase tracking-widest mb-4 text-[#2A6F72]">Role Highlights</h4>
                        <div className="flex flex-wrap gap-2">
                          {activeJob.specs.map((s: string, i: number) => (
                            <span key={i} className="px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl text-xs font-bold text-[#2A6F72]">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {(activeJob as any)?.contact_email && (
                      <div className="mb-6 p-4 bg-emerald-50 rounded-xl flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-full text-emerald-700">
                          <Mail size={16} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-emerald-700">Or Email your CV directly</p>
                          <a href={`mailto:${(activeJob as any).contact_email}`} className="text-sm font-bold text-emerald-900 underline">
                            {(activeJob as any).contact_email}
                          </a>
                        </div>
                      </div>
                    )}

                    <div className="pt-8 border-t border-gray-100">
                      <h3 className="text-xl font-bold mb-6">Apply Now</h3>
                      <form onSubmit={handleFormSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className={`text-[10px] uppercase font-bold ${errors.name ? 'text-red-500' : 'text-gray-400'}`}>Full Name</label>
                            <input
                              required
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              onBlur={(e) => validateField("name", e.target.value)}
                              type="text"
                              className={`w-full bg-white border ${errors.name ? 'border-red-400' : 'border-gray-100'} p-4 rounded-xl focus:ring-2 ring-[#DFA45B] outline-none transition-all`}
                            />
                            {errors.name && <p className="text-[10px] text-red-500 font-medium">{errors.name}</p>}
                          </div>
                          <div className="space-y-2">
                            <label className={`text-[10px] uppercase font-bold ${errors.email ? 'text-red-500' : 'text-gray-400'}`}>Email Address</label>
                            <input
                              required
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              onBlur={(e) => validateField("email", e.target.value)}
                              type="email"
                              className={`w-full bg-white border ${errors.email ? 'border-red-400' : 'border-gray-100'} p-4 rounded-xl focus:ring-2 ring-[#DFA45B] outline-none transition-all`}
                            />
                            {errors.email && <p className="text-[10px] text-red-500 font-medium">{errors.email}</p>}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className={`text-[10px] uppercase font-bold ${errors.phone ? 'text-red-500' : 'text-gray-400'}`}>Phone Number</label>
                          <input
                            required
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e: any) => {
                              const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                              setFormData(prev => ({ ...prev, phone: value }));
                              if (errors.phone) validateField("phone", value);
                            }}
                            onBlur={(e) => validateField("phone", e.target.value)}
                            className={`w-full bg-white border ${errors.phone ? 'border-red-400' : 'border-gray-100'} p-4 rounded-xl focus:ring-2 ring-[#DFA45B] outline-none transition-all`}
                            placeholder="10-digit Mobile Number"
                          />
                          {errors.phone && <p className="text-[10px] text-red-500 font-medium">{errors.phone}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className={`text-[10px] uppercase font-bold ${errors.portfolio ? 'text-red-500' : 'text-gray-400'}`}>Portfolio Link (URL)</label>
                          <input
                            name="portfolio"
                            value={formData.portfolio}
                            onChange={handleInputChange}
                            onBlur={(e) => validateField("portfolio", e.target.value)}
                            type="url"
                            className={`w-full bg-white border ${errors.portfolio ? 'border-red-400' : 'border-gray-100'} p-4 rounded-xl focus:ring-2 ring-[#DFA45B] outline-none transition-all`}
                            placeholder="https://..."
                          />
                          {errors.portfolio && <p className="text-[10px] text-red-500 font-medium">{errors.portfolio}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className={`text-[10px] uppercase font-bold ${errors.cv ? 'text-red-500' : 'text-gray-400'}`}>Upload CV (PDF)</label>
                          <label className={`w-full flex flex-col items-center justify-center bg-white border-2 border-dashed ${errors.cv ? 'border-red-400 bg-red-50' : 'border-gray-100'} p-8 rounded-xl cursor-pointer hover:border-[#DFA45B] transition-all`}>
                            <Upload size={24} className={errors.cv ? "text-red-300 mb-2" : "text-gray-300 mb-2"} />
                            <span className={`text-sm font-bold ${errors.cv ? 'text-red-500' : 'text-gray-500'}`}>{formData.cv ? (formData.cv as any).name : "Drop CV here"}</span>
                            <span className="text-[10px] uppercase text-gray-400 mt-1 italic">PDF only • Max 5MB</span>
                            <input name="cv" onChange={handleInputChange} type="file" className="hidden" accept=".pdf" />
                          </label>
                          {errors.cv && <p className="text-[10px] text-red-500 font-medium">{errors.cv}</p>}
                        </div>
                        <button disabled={isSubmitting} className="w-full bg-[#0F1F2A] text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#DFA45B] hover:text-black transition-all disabled:opacity-50 shadow-xl shadow-[#0F1F2A]/20">
                          {isSubmitting ? "Submitting..." : "Send Application"} <ArrowUpRight size={18} />
                        </button>
                      </form>
                    </div>
                  </>
                )}
              </div>

              {/* Info Side (Hidden on Mobile) */}
              <div className="hidden md:block md:w-1/3 relative bg-[#0F1F2A] overflow-hidden">
                <img src={activeJob?.img} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[2s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F2A] via-transparent to-transparent" />
                <div className="relative z-10 h-full p-12 flex flex-col justify-end">
                  <h3 className="text-4xl font-black italic text-white uppercase tracking-tighter leading-tight mb-4">Elevate your <br /><span className="text-[#DFA45B]">Architecture.</span></h3>
                  <p className="text-white/60 text-sm leading-relaxed">Arsen is more than a workplace. It's a design sanctuary where boundaries are pushed and excellence is the only standard.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Careers;