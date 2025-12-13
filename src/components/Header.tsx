"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/arsen-logo.png";

interface HeaderProps {
  isLogoAnimating: boolean;
}

export default function Header({ isLogoAnimating }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track which submenu is open
  const [openSub, setOpenSub] = useState<string | null>(null);

  const toggleSub = (key: string) => {
    setOpenSub((prev) => (prev === key ? null : key));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  const menuItems = [
    { label: "HOME", href: "#home" },

    {
      label: "PROJECTS",
      submenu: [
        { label: "Completed Projects", href: "#completed-projects" },
        { label: "Ongoing Projects", href: "#ongoing-projects" },
        // { label: "Upcoming Projects", href: "#upcoming-projects" },
      ],
    },

    {
      label: "SERVICES",
      submenu: [
        { label: "PMC", href: "#pmc" },
        { label: "Commercial", href: "#commercial" },
        { label: "Residential", href: "#residential" },
      ],
    },

    { label: "CAREERS", href: "#careers" },
    { label: "CONTACT", href: "#contact" },
    { label: "ABOUT", href: "#about" },
  ];

  return (
    <>
      {/* ---------------- HEADER ---------------- */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 
        ${isScrolled ? "bg-[#16697A]/30 backdrop-blur-lg shadow-lg" : "bg-transparent"}
        ${isLogoAnimating ? "opacity-0" : "opacity-100"}
      `}
      >
        <div className="max-w-8xl mx-auto px-4 md:px-6 py-1 flex items-center justify-between">
          {/* LEFT: LOGO */}
          {/* LEFT: LOGO */}
<div
  className={`w-24 md:w-28 ${!isLogoAnimating ? "animate-logoFloat" : ""}`}
  style={{
    animation: isLogoAnimating ? "logoDrop 0.2s ease-out forwards" : undefined,
  }}
>
  <img
    src={logo}
    className="w-full h-auto"
    alt="Arsen Logo"
  />
</div>


          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8">
            <a
              href="#pmc"
              className="text-white font-bold text-md tracking-wide hover:text-[#FFA62B] transition-colors duration-300"
            >
              PMC
            </a>

            <a
              href="#pmc"
              className="text-white font-bold text-md tracking-wide hover:text-[#FFA62B] transition-colors duration-300"
            >
              Commercial
            </a>

            <a
              href="#residential"
              className="text-[#FFA62B] py-2 px-5 rounded-full font-black text-sm tracking-wide bg-[#1a2f4a]"
            >
              RESIDENTIAL
            </a>

            {/* DESKTOP MENU BUTTON */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 text-white hover:text-[#FFA62B] bg-[#1a2f4a] py-2 px-8 rounded-full transition-colors duration-300"
              aria-label="Open menu"
            >
              <span>Menu</span>
            </button>
          </nav>

          {/* MOBILE ICON */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="lg:hidden text-white p-2 rounded-md"
            aria-label="Open menu"
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </header>

      {/* ---------------- DROPDOWN MENU ---------------- */}
      <div
        className={`
          fixed right-4 top-20 z-50 
          w-64 sm:w-72
          rounded-3xl border border-white/10
          bg-[#0b1b2e]/95 backdrop-blur-xl
          shadow-[0_20px_60px_rgba(0,0,0,0.6)]
          px-4 py-4
          transform origin-top-right
          transition-all duration-300
          ${isMenuOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
        `}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs tracking-[0.2em] text-white/60 uppercase">
            Navigation
          </span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-white/70 hover:text-[#FFA62B] transition-colors duration-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item, index) => (
            <div key={index}>
              {/* ---------------- MAIN MENU ITEM ---------------- */}
              <button
                onClick={() => {
                  if (item.submenu) toggleSub(item.label);
                  else setIsMenuOpen(false);
                }}
                className={`
                  group w-full text-left relative
                  rounded-2xl px-4 py-2.5
                  text-sm sm:text-base font-semibold tracking-wide
                  text-white/80
                  transition-all duration-300
                  hover:text-[#FFA62B] 
                  bg-white/0 hover:bg-white/5
                  flex items-center justify-between
                `}
                style={{
                  animation: isMenuOpen
                    ? `slideIn 0.4s ease-out ${index * 0.05}s both`
                    : "none",
                }}
              >
                {item.label}

                {item.submenu && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${openSub === item.label ? "rotate-180" : ""}`}
                  />
                )}
              </button>

              {/* ---------------- SUBMENU ---------------- */}
              {item.submenu && (
                <div
                  className={`
                    overflow-hidden transition-all duration-300 ml-4
                    ${openSub === item.label ? "max-h-60" : "max-h-0"}
                  `}
                >
                  {item.submenu.map((sub, i) => (
                    <a
                      key={i}
                      href={sub.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="
                        block px-4 py-2
                        text-white/60 text-sm
                        hover:text-[#FFA62B]
                        transition-colors
                      "
                    >
                      • {sub.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
