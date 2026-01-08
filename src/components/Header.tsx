"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Send, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/arsen-logo.png";

interface HeaderProps {
  isLogoAnimating: boolean;
}

export default function Header({ isLogoAnimating }: HeaderProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  const [showContactModal, setShowContactModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);

  const toggleSub = (key: string) =>
    setOpenSub((prev) => (prev === key ? null : key));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const jobTimer = setTimeout(() => setShowJobModal(true), 3000);

    // ⏱ SHOW CONTACT POPUP AFTER 2 MINUTES
    const contactTimer = setTimeout(() => setShowContactModal(true), 120000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(jobTimer);
      clearTimeout(contactTimer);
    };
  }, []);

  // Reset submenu when menu closes
  useEffect(() => {
    if (!isMenuOpen) setOpenSub(null);
  }, [isMenuOpen]);

  const menuItems = [
    { label: "HOME", to: "/" },
    {
      label: "PROJECTS",
      submenu: [
        { label: "Completed Projects", to: "/completed" },
        { label: "Ongoing Projects", to: "/ongoing" },
      ],
    },
    {
      label: "SERVICES",
      submenu: [
        { label: "PMC", to: "/pmc" },
        { label: "Commercial", to: "/commercial" },
        { label: "Residential", to: "/residential" },
      ],
    },
    { label: "CAREERS", to: "/career" },
    { label: "CONTACT", to: "/contact" },
    { label: "ABOUT", to: "/about" },
  ];

  return (
    <>
      <style>{`
        @keyframes premiumFloat {
          0%   { transform: translateY(0px) scale(1) rotate(0deg); }
          25%  { transform: translateY(-4px) scale(1.01) rotate(-0.3deg); }
          50%  { transform: translateY(0px) scale(1.02) rotate(0.2deg); }
          75%  { transform: translateY(-3px) scale(1.01) rotate(-0.2deg); }
          100% { transform: translateY(0px) scale(1) rotate(0deg); }
        }

        @keyframes whiteAuraGlow {
          0% { filter: drop-shadow(0 0 62px rgba(255,255,255,0.55)) drop-shadow(0 0 68px rgba(255,255,255,0.58)); }
          50% { filter: drop-shadow(0 0 60px rgba(255,255,255,0.55)) drop-shadow(0 0 65px rgba(255,255,255,0.55)); }
          100% { filter: drop-shadow(0 0 62px rgba(255,255,255,0.55)) drop-shadow(0 0 68px rgba(255,255,255,0.58)); }
        }

        .logo-animated {
          animation: premiumFloat 6.5s ease-in-out infinite, whiteAuraGlow 4.5s ease-in-out infinite;
          transition: transform .4s ease;
        }
        .logo-animated:hover { transform: scale(1.05) translateY(-2px); }
      `}</style>

      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 
          ${isScrolled ? "bg-[#0c1d2b]/40 backdrop-blur-2xl shadow-xl" : "bg-transparent"}
          ${isLogoAnimating ? "opacity-0" : "opacity-100"}
      `}
      >
        <div className="max-w-8xl mx-auto px-4 md:px-14 py-2 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className={`w-24 sm:w-28 md:w-32 ${!isLogoAnimating ? "logo-animated" : ""}`}>
              <img src={logo} className="w-full h-auto" alt="Arsen Logo" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link to="/pmc" className={`font-bold transition-colors text-md duration-300 ${isActive("/pmc") ? "text-[#FFA62B]" : "text-white hover:text-[#FFA62B]"}`}>PMC</Link>
            <Link to="/commercial" className={`font-bold transition-colors text-md duration-300 ${isActive("/commercial") ? "text-[#FFA62B]" : "text-white hover:text-[#FFA62B]"}`}>Commercial</Link>
            <Link to="/residential" className={`font-bold transition-colors text-md duration-300 ${isActive("/residential") ? "text-[#FFA62B]" : "text-white hover:text-[#FFA62B]"}`}>Residential</Link>

            <button
              onClick={() => setShowContactModal(true)}
              className="flex items-center gap-2 text-white hover:text-[black] bg-[#FFA62B]/80 backdrop-blur-2xl py-2 px-8 rounded-full transition-all"
            >
              <span className="text-md font-bold">Get in touch</span>
            </button>

            <button
              onClick={() => setIsMenuOpen((p) => !p)}
              className="flex items-center gap-2 text-white hover:text-[#FFA62B] bg-[#1a2f4a] py-2 px-8 rounded-full transition-all"
            >
              <span className="text-md font-bold">{isMenuOpen ? "Close" : "Menu"}</span>
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white p-2">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {/* DROPDOWN MENU */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed right-4 top-20 md:top-24 z-[99] w-[calc(100vw-32px)] sm:w-72 rounded-3xl border border-white/10 bg-[#0b1b2e]/95 backdrop-blur-xl shadow-2xl px-4 py-4"
          >
            <div className="flex items-center justify-between mb-3 text-white/60 text-xs uppercase tracking-widest px-4">
              <span>Navigation</span>
              <button onClick={() => setIsMenuOpen(false)} className="lg:hidden p-1 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {menuItems.map((item, index) => (
                <div key={index}>
                  {!item.submenu ? (
                    <Link
                      to={item.to!}
                      onClick={() => setIsMenuOpen(false)}
                      className="group w-full block rounded-2xl px-4 py-2.5 text-sm font-semibold text-white/80 hover:text-[#FFA62B] hover:bg-white/5 transition-all"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSub(item.label);
                        }}
                        className="group w-full text-left rounded-2xl px-4 py-2.5 text-sm font-semibold text-white/80 hover:text-[#FFA62B] hover:bg-white/5 flex items-center justify-between"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            openSub === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <div
                        className={`transition-all duration-300 ml-4 overflow-hidden ${
                          openSub === item.label ? "max-h-60" : "max-h-0"
                        }`}
                      >
                        {item.submenu.map((sub, i) => (
                          <Link
                            key={i}
                            to={sub.to}
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-4 py-2 text-white/60 text-sm hover:text-[#FFA62B] transition-all"
                          >
                            • {sub.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}

        {/* JOB MODAL — unchanged */}
        {showJobModal && (
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            className="fixed bottom-6 right-6 z-[110] w-[300px] md:w-[340px] bg-[#0b1b2e] border border-[#FFA62B]/30 rounded-[28px] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
          >
            <button onClick={() => setShowJobModal(false)} className="absolute top-6 right-6 text-white/20 hover:text-[#FFA62B]">
              <X size={16} />
            </button>

            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2 w-2 rounded-full bg-[#FFA62B] animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.2em] text-[#FFA62B] uppercase">
                  Latest Job Vacancy
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mb-2">
                Senior Project <br /> Engineer
              </h3>

              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-6">
                Commercial • 08 Openings • HQ
              </p>

              <Link
                to="/career"
                onClick={() => setShowJobModal(false)}
                className="flex items-center justify-between pt-4 border-t border-white/5"
              >
                <span className="text-sm font-bold text-white hover:text-[#FFA62B]">
                  Apply Details
                </span>

                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-[#FFA62B] text-black">
                  <ArrowRight size={18} />
                </div>
              </Link>
            </div>
          </motion.div>
        )}

        {/* CONTACT POPUP */}
        {showContactModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContactModal(false)}
              className="absolute inset-0 bg-[#050b13]/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-[460px] bg-[#0b1b2e] border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl"
            >
              <button
                onClick={() => setShowContactModal(false)}
                className="absolute top-8 right-8 text-white/20 hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="mb-10 text-center md:text-left">
                <span className="text-[10px] tracking-[0.3em] text-[#FFA62B] font-black uppercase mb-3 block">
                  Inquiry Office
                </span>

                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Initiate <span className="italic font-light">Vision.</span>
                </h2>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Your Name" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-[#FFA62B]/40 text-sm" />
                <input type="email" placeholder="Email Address" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-[#FFA62B]/40 text-sm" />
                <textarea rows={3} placeholder="Project Description" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-[#FFA62B]/40 text-sm resize-none" />
                <button className="w-full bg-[#FFA62B] text-black font-black py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-[#ffb54d] transition-all tracking-[0.2em] text-[10px] mt-4 uppercase">
                  Transmit Request <Send size={14} fill="black" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
