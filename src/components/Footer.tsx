"use client";

import React from "react";
import { Facebook, Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom"; // Assumes you are using react-router-dom
import logo from "../assets/arsen-logo.png";

export default function InteriorFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#010B0A] text-white pt-16 md:pt-20 pb-8 md:pb-8 overflow-hidden">
      <style>{`
        @keyframes footerLogoFloat {
          0%   { transform: translateY(0px) scale(1); }
          50%  { transform: translateY(-5px) scale(1.02); }
          100% { transform: translateY(0px) scale(1); }
        }

        @keyframes footerAura {
          0% { filter: drop-shadow(0 0 40px rgba(255,255,255,0.5)); }
          50% { filter: drop-shadow(0 0 45px rgba(255,255,255,0.5)); }
          100% { filter: drop-shadow(0 0 40px rgba(255,255,255,0.5)); }
        }

        .footer-logo-animated {
          animation: footerLogoFloat 6s ease-in-out infinite, footerAura 4s ease-in-out infinite;
        }
      `}</style>

      {/* Soft emerald gradient glow - matched to Arsen brand */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-[#0F5B54]/20 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* BRAND COLUMN */}
          <div className="space-y-3">
            <Link to="/" className="inline-block">
              <img 
                src={logo} 
                className="w-28 h-auto footer-logo-animated" 
                alt="Arsen Logo" 
              />
            </Link>
            <p className="text-white/60 leading-relaxed text-sm max-w-[280px]">
              Arsen Interio Pvt Ltd specializes in full scope of commercial & residential Turnkey fit-outs including furnishing for - in commercial Corporate Offices ,  and Residential interiors.
            </p>
            
          </div>

          {/* QUICK LINKS - Matched to Header */}
          <div>
            <h3 className="text-xs font-black mb-6 text-[#FFA62B] tracking-[0.2em] uppercase">
              Navigation
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Our Projects", path: "/completed" },
                { name: "Careers", path: "/career" },
                { name: "Contact", path: "/contact" }
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    to={link.path} 
                    className="text-white/50 hover:text-white hover:translate-x-1 transition-all inline-block text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES - Matched to Website Content */}
          <div>
            <h3 className="text-xs font-black mb-6 text-[#FFA62B] tracking-[0.2em] uppercase">
              Expertise
            </h3>
            <ul className="space-y-4">
              {[
                { name: "PMC Services", path: "/pmc" },
                { name: "Commercial Design", path: "/commercial" },
                { name: "Residential Design", path: "/residential" },
                { name: "Interior Execution", path: "/services" },
                { name: "Ongoing Projects", path: "/ongoing" }
              ].map((service, i) => (
                <li key={i}>
                  <Link 
                    to={service.path} 
                    className="text-white/50 hover:text-white hover:translate-x-1 transition-all inline-block text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="text-xs font-black mb-6 text-[#FFA62B] tracking-[0.2em] uppercase">
              Get In Touch
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 group">
                <MapPin className="w-5 h-5 text-[#FFA62B] shrink-0" />
                <span className="text-white/50 text-sm group-hover:text-white transition-colors">
                  #4, Noombal Road, Velappanchavadi<br />
Chennai – 600 077.
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <Phone className="w-5 h-5 text-[#FFA62B] shrink-0" />
                <a href="tel:+918095015533" className="text-white/50 text-sm group-hover:text-white transition-colors">
                  +91 8095015533
                </a>
              </li>
              <li className="flex items-center gap-4 group">
                <Mail className="w-5 h-5 text-[#FFA62B] shrink-0" />
                <a href="mailto:sales@arseninterior.in" className="text-white/50 text-sm group-hover:text-white transition-colors">
                  sales@arseninterior.in
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-5">
              {[
                { Icon: Facebook, href: "https://www.facebook.com/arseninterior.in/" },
                { Icon: Twitter, href: "https://twitter.com/ArsenSenthil" },
                { Icon: Instagram, href: "https://www.instagram.com/arseninterio/" },
                { Icon: Linkedin, href: "https://www.linkedin.com/company/13732875/admin/?feedType=following" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  className="p-2.5 rounded-full border border-white/10 hover:border-[#FFA62B]/50 hover:bg-white/5 transition-all duration-300"
                >
                  <social.Icon className="w-4 h-4 text-white/70 hover:text-[#FFA62B]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 md:mt-20 pt-4 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-white/30 text-[10px] md:text-xs tracking-widest uppercase text-center md:text-left">
            © {currentYear} Arsen Interio — Architectural Excellence.
          </p>
          {/* <div className="flex gap-6 text-[10px] tracking-widest uppercase text-white/30">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}