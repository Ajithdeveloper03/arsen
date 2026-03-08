"use client";

import React, { useState, useEffect } from "react";
import { BASE_URL } from '../services/api';
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Twitter,
  ArrowRight,
  Send,
  Instagram,
  Linkedin,
  Facebook,
  Globe,
  Link as LinkIcon
} from "lucide-react";

const IconMap: any = {
  Phone: Phone,
  Mail: Mail,
  MapPin: MapPin,
  Globe: Globe,
  Facebook: Facebook,
  Instagram: Instagram,
  Twitter: Twitter,
  Linkedin: Linkedin,
  Link: LinkIcon
};

const ArsenContact = () => {
  const [apiDetails, setApiDetails] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [errors, setErrors] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
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
    if (!value.trim()) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    } else if (name === "email" && !validateEmail(value)) {
      error = "Please enter a valid email address";
    } else if (name === "phone" && !validatePhone(value)) {
      error = "Please enter a valid 10-digit mobile number";
    } else if (name === "name" && value.length < 2) {
      error = "Name must be at least 2 characters";
    } else if (name === "subject" && value.length < 3) {
      error = "Subject must be at least 3 characters";
    } else if (name === "message" && value.length < 10) {
      error = "Message must be at least 10 characters";
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return error === "";
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/public/contact-details`);
      const data = await res.json();
      if (data && data.length > 0) {
        setApiDetails(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    const isSubjectValid = validateField("subject", formData.subject);
    const isMessageValid = validateField("message", formData.message);

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isSubjectValid || !isMessageValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      setSent(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setSent(false), 5000);
    } catch (err: any) {
      console.error("API ERROR:", err);
      alert(err?.message || "Request failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneClick = (phoneNumber: string) => {
    const dialableNumber = phoneNumber.replace(/[^\d+]/g, "");
    // Just use one method. This is the most compatible across iOS/Android.
    window.location.assign(`tel:${dialableNumber}`);
  };

  const getDetailIcon = (d: any) => {
    if (d.icon && IconMap[d.icon]) return IconMap[d.icon];
    switch (d.type) {
      case 'phone': return Phone;
      case 'email': return Mail;
      case 'address': return MapPin;
      case 'social': return Globe;
      default: return LinkIcon;
    }
  };

  const directContacts = apiDetails.length > 0
    ? apiDetails.filter(d => d.type !== 'social' && d.type !== 'link').map(d => ({
      icon: getDetailIcon(d),
      label: d.label,
      val: d.value,
      type: d.type  // preserve type for correct rendering
    }))
    : [
      { icon: Phone, label: "Call Us", val: "+91 8098085553, 8144555522", type: 'phone' },
      { icon: Mail, label: "Email Us", val: "sales@arseninterior.in", type: 'email' },
      { icon: MapPin, label: "Arsen Interior PVT LTD", val: "#4, Noombal Road, Velappanchavadi Chennai – 600 077.", type: 'address' },
      { icon: MapPin, label: "Arsen Furnitures and Fixtures", val: "No.211/1B, Metro city phase 1, Rajankuppam, Ayanambakkam, Chennai - 600095", type: 'address' },
    ];

  const socialLinks = apiDetails.filter(d => d.type === 'social');

  return (
    <main className="bg-[#010807] text-white selection:bg-[#FDBA74] selection:text-black min-h-screen">

      {/* CINEMATIC HERO */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#010807] z-10" />
          <motion.img
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000"
            className="w-full h-full object-cover opacity-70 grayscale"
            alt="Arsen StudioBackground"
          />
        </div>

        <div className="relative z-20 text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#FDBA74] uppercase tracking-[0.5em] text-[10px] md:text-xs font-bold mb-4 block"
          >
            Connect with Excellence
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none"
          >
            Let's <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Talk</span>
          </motion.h1>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-16">

          {/* LEFT: BRAND INFO */}
          <div className="lg:col-span-5 space-y-10 md:space-y-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 italic">Where Vision Meets Reality.</h2>
              <p className="text-gray-400 max-w-md leading-relaxed text-sm md:text-base">
                Whether you're looking to redefine your home or seeking elite project management, our team is ready to assist.
              </p>
            </div>

            <div className="space-y-6 md:space-y-4">
              {directContacts.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 md:gap-6 items-start group relative z-30 pointer-events-auto"
                >
                  <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FDBA74] group-hover:bg-[#FDBA74] group-hover:text-black transition-all duration-500">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-[14px] uppercase tracking-widest text-gray-500 mb-1">{item.label}</p>
                    <div className="text-base md:text-lg font-medium pointer-events-auto">
                      {item.type === 'phone' ? (
                        <div className="space-y-2">
                          {item.val.split(',').map((phone: string, index: number) => {
                            const dialableNumber = phone.trim().replace(/[^\d+]/g, "");
                            return (
                              <div key={index} className="block">
                                <a
                                  href={`tel:${dialableNumber}`}
                                  className="text-white hover:text-[#FDBA74] transition-colors underline decoration-[#FDBA74]/30 underline-offset-4 cursor-pointer inline-block py-1"
                                  style={{ pointerEvents: 'auto', position: 'relative', zIndex: 40 }}
                                >
                                  📞 {phone.trim()}
                                </a>
                              </div>
                            );
                          })}
                        </div>
                      ) : item.type === 'email' ? (
                        <a href={`mailto:${item.val.trim()}`} className="text-white hover:text-[#FDBA74] transition-colors cursor-pointer relative z-40">
                          {item.val}
                        </a>
                      ) : (
                        <p className="text-gray-300 leading-relaxed">{item.val}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Follow our journey</p>
              <div className="flex gap-4">
                {(socialLinks.length > 0 ? socialLinks.map(s => ({
                  Icon: IconMap[s.icon] || Globe,
                  href: s.value
                })) : [
                  { Icon: Facebook, href: "https://www.facebook.com/arseninterior.in/" },
                  { Icon: Twitter, href: "https://twitter.com/ArsenSenthil" },
                  { Icon: Instagram, href: "https://www.instagram.com/arseninterio/" },
                  { Icon: Linkedin, href: "https://www.linkedin.com/company/13732875/admin/?feedType=following" }
                ]).map((social, i) => (
                  <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <social.Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: LUXURY FORM */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl"
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-[400px] md:h-[500px] flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#FDBA74] flex items-center justify-center text-black mb-6">
                    <Send size={32} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 italic">Message Received</h3>
                  <p className="text-gray-400">Our design consultant will reach out shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    <FloatingInput
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={(e: any) => validateField("name", e.target.value)}
                      error={errors.name}
                      required
                    />
                    <FloatingInput
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={(e: any) => validateField("email", e.target.value)}
                      error={errors.email}
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    <FloatingInput
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e: any) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setFormData(prev => ({ ...prev, phone: value }));
                        if (errors.phone) validateField("phone", value);
                      }}
                      onBlur={(e: any) => validateField("phone", e.target.value)}
                      error={errors.phone}
                    />
                    <FloatingInput
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      onBlur={(e: any) => validateField("subject", e.target.value)}
                      error={errors.subject}
                      required
                    />
                  </div>
                  <div className="relative pt-2">
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={(e: any) => validateField("message", e.target.value)}
                      className={`w-full bg-transparent border-b ${errors.message ? 'border-red-500/50' : 'border-white/20'} py-4 outline-none focus:border-[#FDBA74] transition-colors resize-none h-32 peer placeholder-transparent`}
                      placeholder="Tell us about your space..."
                    />
                    <label className={`absolute left-0 top-0 text-[10px] uppercase tracking-widest ${errors.message ? 'text-red-400' : 'text-gray-500'} transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-6 peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-[#FDBA74]`}>
                      Tell us about your space...
                    </label>
                    {errors.message && <p className="text-[10px] text-red-400 mt-1 font-medium">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-black py-5 md:py-6 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-[#FDBA74] transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
                  >
                    {isSubmitting ? "Processing..." : "Submit Enquiry"}
                    {!isSubmitting && <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

        </div>
      </section>

      {/* MINIMAL MAP */}
      <section className="flex flex-col md:flex-row w-full gap-4 px-4 py-8">
        <div className="flex-1 h-[40vh] md:h-[50vh] opacity-90 hover:opacity-100 transition-opacity overflow-hidden relative rounded-lg shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.581566373812!2d80.1432!3d13.0623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAzJzQ0LjMiTiA4MMKwMDgnMzUuNSJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Arsen interior Map 1"
          ></iframe>
        </div>

        <div className="flex-1 h-[40vh] md:h-[50vh] opacity-90 hover:opacity-100 transition-opacity overflow-hidden relative rounded-lg shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.35!2d80.16!3d13.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA0JzQ4LjAiTiA4MMKwMDknMzYuMCJF!5e0!3m2!1sen!2sin!4v1620000000001!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Arsen interior Map 2"
          ></iframe>
        </div>
      </section>

    </main>
  );
};

const FloatingInput = ({ label, name, error, ...props }: any) => (
  <div className="relative group pt-2">
    <input
      {...props}
      name={name}
      id={name}
      className={`w-full bg-transparent border-b ${error ? 'border-red-500/50' : 'border-white/20'} py-4 outline-none focus:border-[#FDBA74] transition-colors peer placeholder-transparent`}
      placeholder={label}
    />
    <label
      htmlFor={name}
      className={`absolute left-0 top-0 text-[10px] uppercase tracking-widest ${error ? 'text-red-400' : 'text-gray-500'} transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-6 peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-[#FDBA74]`}
    >
      {label}
    </label>
    {error && <p className="text-[10px] text-red-400 mt-1 font-medium">{error}</p>}
  </div>
);

export default ArsenContact;