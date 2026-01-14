"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Twitter,
  Clock, 
  ArrowRight,
  Send, 
  Instagram, 
  Linkedin, 
  Facebook 
} from "lucide-react";

const ArsenContact = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API Call
    await new Promise((res) => setTimeout(res, 1500));
    setSent(true);
    setIsSubmitting(false);
    // Reset form after a delay
    setTimeout(() => {
      setSent(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 5000);
  };

  const infoItems = [
    { icon: Phone, label: "Call Us", val: "+91 8144555533, 8144555522" },
    { icon: Mail, label: "Email Us", val: "sales@arseninterior.in" },
    { icon: MapPin, label: "Arsen Interior PVT LTD", val: "#4, Noombal Road, Velappanchavadi Chennai – 600 077." },
    { icon: MapPin, label: "Arsen Furnitures and Fixtures", val: "No.211/1B, Metro city phase 1, Rajankuppam, Ayanambakkam, Chennai - 600095" },
  ];

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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 italic">Where Vision  Meets Reality.</h2>
              <p className="text-gray-400 max-w-md leading-relaxed text-sm md:text-base">
                Whether you're looking to redefine your home or seeking elite project management, our team is ready to assist.
              </p>
            </div>

            <div className="space-y-6 md:space-y-4">
              {infoItems.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 md:gap-6 items-start group"
                >
                  <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FDBA74] group-hover:bg-[#FDBA74] group-hover:text-black transition-all duration-500">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-[14px] uppercase tracking-widest text-gray-500 mb-1">{item.label}</p>
                    <p className="text-base md:text-lg font-medium break-words">{item.val}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Follow our journey</p>
              <div className="flex gap-4">
                {[
                  { Icon: Facebook, href: "https://www.facebook.com/arseninterior.in/" },
                  { Icon: Twitter, href: "https://twitter.com/ArsenSenthil" },
                  { Icon: Instagram, href: "https://www.instagram.com/arseninterio/" },
                  { Icon: Linkedin, href: "https://www.linkedin.com/company/13732875/admin/?feedType=following" }
                ].map((social, i) => (
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
                      required 
                    />
                    <FloatingInput 
                      label="Email Address" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    <FloatingInput 
                      label="Phone Number" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                    />
                    <FloatingInput 
                      label="Subject" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="relative pt-2">
                    <textarea 
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-[#FDBA74] transition-colors resize-none h-32 peer placeholder-transparent"
                      placeholder="Tell us about your space..."
                    />
                    <label className="absolute left-0 top-0 text-[10px] uppercase tracking-widest text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-6 peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-[#FDBA74]">
                      Tell us about your space...
                    </label>
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
  {/* First Map Container */}
  <div className="flex-1 h-[40vh] md:h-[50vh]  invert opacity-90 hover:opacity-100 transition-opacity overflow-hidden relative rounded-lg shadow-sm">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3694.314495968539!2d80.13631487484297!3d13.059761787263787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52619c21f6aaab%3A0xa0156fe70dda837c!2sARSEN%20INTERIO%20PVT%20LTD!5e1!3m2!1sen!2sin!4v1768220262362!5m2!1sen!2sin"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      title="Arsen Studio Map 1"
    ></iframe>
  </div>

  {/* Second Map Container */}
  <div className="flex-1 h-[40vh] md:h-[50vh]  invert opacity-90 hover:opacity-100 transition-opacity overflow-hidden relative rounded-lg shadow-sm">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d653.0409677832616!2d80.14353927036402!3d13.070249376427507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526100300a9deb%3A0x1c1e0b39f9e28648!2sArsen%20furniture%20and%20fixtures!5e1!3m2!1sen!2sin!4v1768220104126!5m2!1sen!2sin"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Arsen Studio Map 2"
    ></iframe>
  </div>
</section>

    </main>
  );
};

// Helper Component for the elegant input style
const FloatingInput = ({ label, name, ...props }: any) => (
  <div className="relative group pt-2">
    <input 
      {...props}
      name={name}
      id={name}
      className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-[#FDBA74] transition-colors peer placeholder-transparent"
      placeholder={label}
    />
    <label 
      htmlFor={name}
      className="absolute left-0 top-0 text-[10px] uppercase tracking-widest text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-6 peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-[#FDBA74]"
    >
      {label}
    </label>
  </div>
);

export default ArsenContact;