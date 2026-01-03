import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 1500));
    setSent(true);
    setIsSubmitting(false);
    setTimeout(() => setSent(false), 4000);
  };

  const infoItems = [
    { icon: Phone, label: "Call Us", val: "+91 98765 43210" },
    { icon: Mail, label: "Email Us", val: "hello@arseninterior.com" },
    { icon: MapPin, label: "Visit Studio", val: "High Street, Design District, India" },
  ];

  return (
    <main className="bg-[#010807] text-white selection:bg-[#FDBA74] selection:text-black">
      
      {/* CINEMATIC HERO */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#010807] z-10" />
          <motion.img 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000" 
            className="w-full h-full object-cover opacity-30 grayscale"
            alt="Arsen Studio"
          />
        </div>

        <div className="relative z-20 text-center px-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#FDBA74] uppercase tracking-[0.5em] text-xs font-bold mb-4 block"
          >
            Connect with Excellence
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none"
          >
            Let's <span className="text-transparent font-outline" style={{ WebkitTextStroke: '1px white' }}>Talk</span>
          </motion.h1>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* LEFT: BRAND INFO */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="text-4xl font-bold mb-6 italic">Where Vision <br/> Meets Reality.</h2>
              <p className="text-gray-400 max-w-sm leading-relaxed">
                Whether you're looking to redefine your home or seeking elite project management, our team is ready to assist.
              </p>
            </div>

            <div className="space-y-8">
              {infoItems.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-start group"
                >
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FDBA74] group-hover:bg-[#FDBA74] group-hover:text-black transition-all duration-500">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{item.label}</p>
                    <p className="text-lg font-medium">{item.val}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-10 border-t border-white/10">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-6">Follow our journey</p>
              <div className="flex gap-4">
                {[Instagram, Linkedin, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <Icon size={16} />
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
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl"
            >
              {sent ? (
                <div className="h-[500px] flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-full bg-[#FDBA74] flex items-center justify-center text-black mb-6">
                    <Send size={32} />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 italic">Message Received</h3>
                  <p className="text-gray-400">Our design consultant will reach out shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <FloatingInput label="Your Name" name="name" required />
                    <FloatingInput label="Email Address" name="email" type="email" required />
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <FloatingInput label="Phone Number" name="phone" />
                    <FloatingInput label="Subject" name="subject" required />
                  </div>
                  <div className="relative">
                    <textarea 
                      required
                      className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-[#FDBA74] transition-colors resize-none h-32"
                      placeholder="Tell us about your space..."
                    />
                  </div>
                  
                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-white text-black py-6 rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#FDBA74] transition-all flex items-center justify-center gap-3 group"
                  >
                    {isSubmitting ? "Processing..." : "Submit Inquiry"}
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>

        </div>
      </section>

      {/* MINIMAL MAP */}
      <section className="h-[50vh] grayscale invert opacity-[100] hover:opacity-80 transition-opacity">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153167!3d-37.81732767975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sau!4v1494541738749"
          width="100%" height="100%" loading="lazy" style={{ border: 0 }}
        />
      </section>

    </main>
  );
};

// Helper Component for the elegant input style
const FloatingInput = ({ label, ...props }) => (
  <div className="relative group">
    <input 
      {...props}
      className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-[#FDBA74] transition-colors peer placeholder-transparent"
      placeholder={label}
    />
    <label className="absolute left-0 top-0 text-[10px] uppercase tracking-widest text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-[#FDBA74]">
      {label}
    </label>
  </div>
);

export default ArsenContact;