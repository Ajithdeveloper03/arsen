"use client";

import React from "react";
import { Facebook, Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/arsen-logo.png";

export default function InteriorFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#010B0A] text-white pt-16 md:pt-20 pb-8 md:pb-8 overflow-hidden">
      <style>{`
        @keyframes footerLogoFloat {
          0%   { transform: translateY(0px) scale(1); }
          50%  { transform: translateY(0px) scale(1); }
          100% { transform: translateY(0px) scale(1); }
        }

        @keyframes footerAura {
        0% { filter: drop-shadow(0 0 52px rgba(255,255,255,0.55)) drop-shadow(0 0 58px rgba(255,255,255,0.98)); }
          50% { filter: drop-shadow(0 0 50px rgba(255,255,255,0.55)) drop-shadow(0 0 55px rgba(255,255,255,0.95)); }
          100% { filter: drop-shadow(0 0 52px rgba(255,255,255,0.55)) drop-shadow(0 0 58px rgba(255,255,255,0.98)); }
        }

        .footer-logo-animated {
          animation: footerLogoFloat 6s ease-in-out infinite, footerAura 4s ease-in-out infinite;
        }
      `}</style>

      {/* Soft emerald gradient glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-[#0F5B54]/20 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* BRAND COLUMN */}
          <div className="space-y-3">
            <Link to="/" className="inline-block">
              <img
                src={logo}
                className="w-32 h-auto footer-logo-animated"
                alt="Arsen Logo"
              />
            </Link>
            <div className="space-y-2">
               
               <p className="text-slate-200 leading-relaxed text-base">
                Arsen Interio Pvt Ltd specializes in full scope of commercial & residential Turnkey fit-outs including furnishing for-in commercial  Offices, Retail Showrooms, Malls and in residential Modular Kitchens, Wardrobe,TV Units and interiors. 
              </p>
              
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-sm font-black mb-8 text-[#FFA62B] tracking-[0.2em] uppercase">
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
                    className="text-slate-300 hover:text-[#FFA62B] hover:translate-x-2 transition-all duration-300 inline-block text-base font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="flex items-center gap-4 group border-t border-white/10 pt-4">
                <Phone className="w-5 h-5 text-[#FFA62B] shrink-0" />
                <a href="tel:+8144555533" className="text-white text-sm font-bold group-hover:text-[#FFA62B] transition-colors">
                  +91 8144555533 ,8144555522
                </a>
              </li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-sm font-black mb-8 text-[#FFA62B] tracking-[0.2em] uppercase">
              Expertise
            </h3>
            <ul className="space-y-4">
              {[
                { name: "PMC Services", path: "/pmc" },
                { name: "Commercial Design", path: "/commercial" },
                { name: "Residential Design", path: "/residential" },
                { name: "Interior Execution", path: "/completed" },
                { name: "Ongoing Projects", path: "/ongoing" }
              ].map((service, i) => (
                <li key={i}>
                  <Link
                    to={service.path}
                    className="text-slate-300 hover:text-[#FFA62B] hover:translate-x-2 transition-all duration-300 inline-block text-base font-medium"
                  >
                    {service.name}
                  </Link>
                </li>
                
              ))}
              <li className="flex items-center gap-4 group  border-t border-white/10 pt-4">
                <Mail className="w-5 h-5 text-[#FFA62B] shrink-0" />
                <a href="mailto:sales@arseninterior.in" className="text-slate-200 text-base group-hover:text-white transition-colors">
                  sales@arseninterior.in
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT INFO (Both Addresses Included) */}
          <div className="space-y-8">
            <h3 className="text-sm font-black text-[#FFA62B] tracking-[0.2em] uppercase">
              Get In Touch
            </h3>
            <ul className="space-y-3">
              {/* Address 1: Office */}
              <li className="flex items-start gap-4 group">
                <MapPin className="w-6 h-6 text-[#FFA62B] shrink-0 mt-1" />
                <span className="text-slate-200 text-sm md:text-base leading-relaxed group-hover:text-white transition-colors">
                  <strong className="text-[#FFA62B] block text-xs tracking-widest uppercase mb-1">Arsen interio Pvt Ltd</strong>
                  #4, Noombal Road, Velappanchavadi<br />
                  Chennai – 600 077.
                </span>
              </li>

              {/* Address 2: Factory */}
              <li className="flex items-start gap-4 group">
                <MapPin className="w-6 h-6 text-[#FFA62B] shrink-0 mt-1" />
                <span className="text-slate-200 text-sm md:text-base leading-relaxed group-hover:text-white transition-colors">
                  <strong className="text-[#FFA62B] block text-xs tracking-widest uppercase mb-1">Arsen Furnitures & Fixtures </strong>
                  No.211/1B, Metro city phase 1,<br /> 
                  Rajankuppam, Ayanambakkam,<br />
                  Chennai - 600095
                </span>
              </li>

              {/* <li className="flex items-center gap-4 group border-t border-white/10 pt-4">
                <Phone className="w-5 h-5 text-[#FFA62B] shrink-0" />
                <a href="tel:+918095015533" className="text-white text-base font-bold group-hover:text-[#FFA62B] transition-colors">
                  +91 8144555522
                </a>
              </li> */}
              <div className="flex items-center justify-start gap-2 pt-2">
              {[
                { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=100025176500300" },
                { Icon: Twitter, href: "https://twitter.com/ArsenSenthil" },
                { Icon: Instagram, href: "https://www.instagram.com/arseninterio/" },
                { Icon: Linkedin, href: "https://www.linkedin.com/company/13732875/" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-white/20 hover:border-[#FFA62B] hover:bg-[#FFA62B]/10 transition-all duration-300"
                >
                  <social.Icon className="w-3 h-3 text-slate-300 hover:text-[#FFA62B]" />
                </a>
              ))}
            </div>
            </ul>
            
            
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 md:mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs tracking-[0.2em] uppercase text-center md:text-left">
            © {currentYear} Arsen Interio Pvt Ltd — All Rights Reserved.
          </p>
          <p className="text-[#0F5B54] font-bold text-[10px] tracking-[0.1em] uppercase">
            Architectural Excellence & Interior Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}