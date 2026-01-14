"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  Mail, 
  Instagram, 
  Calculator, 
  ChevronLeft, 
  X 
} from "lucide-react";

const FloatingActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle Contact Popup (matching your previous components)
  const openContactPopup = () => {
    window.dispatchEvent(new Event("open-contact"));
  };

  const actions = [
    {
      icon: <MessageCircle size={22} />,
      label: "WhatsApp",
      href: "https://wa.me/8144555533",
      color: "bg-[#25D366]",
    },
    {
      icon: <Instagram size={22} />,
      label: "Instagram",
      href: "https://www.instagram.com/arseninterio/",
      color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    },
    {
      icon: <Mail size={22} />,
      label: "Send Mail",
      href: "mailto:sales@arseninterior.in",
      color: "bg-[#EA4335]",
    },
  ];

  return (
    <div className="fixed right-6 bottom-10 z-[9999] flex flex-col items-end gap-4">
      
      {/* 1. Expandable Social Stack */}
      <div className="flex flex-col items-end gap-3">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="flex flex-col gap-3"
            >
              {actions.map((action, idx) => (
                <motion.a
                  key={idx}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: -8 }}
                  className="group flex items-center gap-3"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg backdrop-blur-md">
                    {action.label}
                  </span>
                  <div className={`${action.color} text-white p-3 rounded-2xl shadow-xl transition-transform active:scale-90`}>
                    {action.icon}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white text-black p-4 rounded-[2rem] shadow-2xl border border-zinc-100 flex items-center justify-center transition-all hover:bg-zinc-50 active:scale-95"
        >
          {isOpen ? <X size={24} /> : <ChevronLeft size={24} className={!isOpen ? "animate-pulse" : ""} />}
        </button>
      </div>

      {/* 2. Free Estimate Button (Standalone & Cinematic) */}
      <motion.button
        onClick={openContactPopup}
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-3 bg-[#032d29] text-[#FDBA74] pl-6 pr-4 py-4 rounded-full shadow-[0_20px_50px_rgba(3,45,41,0.3)] overflow-hidden"
      >
        {/* Shine Effect */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine" />
        
        <span className="text-[11px] font-black uppercase tracking-[0.2em]">
          Free Estimate
        </span>
        <div className="bg-[#FDBA74] text-[#032d29] p-2 rounded-full">
          <Calculator size={18} strokeWidth={3} />
        </div>
      </motion.button>

      <style jsx global>{`
        @keyframes shine {
          100% { transform: translateX(100%); }
        }
        .animate-shine {
          animation: shine 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default FloatingActions;