"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
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

  const toggleSub = (key: string) =>
    setOpenSub((prev) => (prev === key ? null : key));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  const menuItems = [
    { label: "HOME", to: "/" },
    {
      label: "PROJECTS",
      submenu: [
        { label: "Completed Projects", to: "/#completed-projects" },
        { label: "Ongoing Projects", to: "/#ongoing-projects" },
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
  /* Smooth luxury floating motion */
  @keyframes premiumFloat {
    0%   { transform: translateY(0px) scale(1) rotate(0deg); }
    25%  { transform: translateY(-4px) scale(1.01) rotate(-0.3deg); }
    50%  { transform: translateY(0px) scale(1.02) rotate(0.2deg); }
    75%  { transform: translateY(-3px) scale(1.01) rotate(-0.2deg); }
    100% { transform: translateY(0px) scale(1) rotate(0deg); }
  }

  /* Wide soft white glow — premium aura */
  @keyframes whiteAuraGlow {
    0% {
      filter: drop-shadow(0 0 12px rgba(255,255,255,0.45))
              drop-shadow(0 0 28px rgba(255,255,255,0.28));
    }
    50% {
      filter: drop-shadow(0 0 20px rgba(255,255,255,0.75))
              drop-shadow(0 0 45px rgba(255,255,255,0.45));
    }
    100% {
      filter: drop-shadow(0 0 12px rgba(255,255,255,0.45))
              drop-shadow(0 0 28px rgba(255,255,255,0.28));
    }
  }

  .logo-animated {
    animation: 
      premiumFloat 6.5s ease-in-out infinite,
      whiteAuraGlow 4.5s ease-in-out infinite;
    transition: transform .4s ease;
  }

  /* Small responsive hover lift */
  .logo-animated:hover {
    transform: scale(1.05) translateY(-2px);
  }
`}</style>


      <header
        className={`absolute top-0 left-0 right-0 z-40 transition-all duration-500 
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

            <Link
              to="/pmc"
              className={`font-bold transition-colors text-md duration-300 
              ${isActive("/pmc") ? "text-[#FFA62B]" : "text-white hover:text-[#FFA62B]"}`}
            >
              PMC
            </Link>

            <Link
              to="/commercial"
              className={`font-bold transition-colors text-md duration-300 
              ${isActive("/commercial") ? "text-[#FFA62B]" : "text-white hover:text-[#FFA62B]"}`}
            >
              Commercial
            </Link>

            <Link
              to="/residential"
              className={`font-bold  text-md transition-colors duration-300 
              ${isActive("/residential") ? "text-[#FFA62B]" : "text-white hover:text-[#FFA62B]"}`}
            >
              Residential
            </Link>
            <button
              onClick={() => setIsMenuOpen((p) => !p)}
              className="flex items-center gap-2 text-white hover:text-[black] bg-[#FFA62B]/80 backdrop-blur-2xl py-2 px-8 rounded-full"
            >
              <span>Get in touch</span>
            </button>
            <button
              onClick={() => setIsMenuOpen((p) => !p)}
              className="flex items-center gap-2 text-white hover:text-[#FFA62B] bg-[#1a2f4a] py-2 px-8 rounded-full"
            >
              <span>Menu</span>
            </button>
          </nav>

          {/* Mobile Button */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="lg:hidden text-white p-2"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Dropdown */}
      <div
        className={`fixed right-4 top-24 z-[99] w-64 sm:w-72 rounded-3xl 
        border border-white/10 bg-[#0b1b2e]/95 backdrop-blur-xl 
        shadow-[0_20px_60px_rgba(0,0,0,0.6)] px-4 py-4 
        transform origin-top-right transition-all duration-300
        ${isMenuOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }`}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs tracking-[0.2em] text-white/60 uppercase">
            Navigation
          </span>
          <button onClick={() => setIsMenuOpen(false)} className="text-white/70">
            <X size={16} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item, index) => (
            <div key={index}>
              {!item.submenu ? (
                <Link
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="group w-full block rounded-2xl px-4 py-2.5
                  text-sm font-semibold tracking-wide text-white/80 
                  hover:text-[#FFA62B] hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => toggleSub(item.label)}
                    className="group w-full text-left rounded-2xl px-4 py-2.5
                      text-sm font-semibold tracking-wide text-white/80 
                      hover:text-[#FFA62B] hover:bg-white/5
                      flex items-center justify-between"
                  >
                    <span>{item.label}</span>

                    <ChevronDown
                      className={`w-4 h-4 transition-transform 
                      ${openSub === item.label ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div
                    className={`transition-all duration-300 ml-4 overflow-hidden
                    ${openSub === item.label ? "max-h-60" : "max-h-0"}`}
                  >
                    {item.submenu.map((sub, i) => (
                      <Link
                        key={i}
                        to={sub.to}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-2 text-white/60 text-sm hover:text-[#FFA62B]"
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
      </div>
    </>
  );
}
