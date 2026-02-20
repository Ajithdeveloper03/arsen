"use client";

import React, { useState, useEffect } from "react";
import { BASE_URL } from '../services/api';
import { Facebook, Instagram, Twitter, Linkedin, Mail, MapPin, Phone, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/arsen-logo.png";

const IconMap: any = {
  Phone: Phone,
  Mail: Mail,
  MapPin: MapPin,
  Globe: Globe,
  Facebook: Facebook,
  Instagram: Instagram,
  Twitter: Twitter,
  Linkedin: Linkedin
};

export default function InteriorFooter() {
  const currentYear = new Date().getFullYear();
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/public/contact-details`)
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(err => console.error("Footer fetch error:", err));
  }, []);

  // Filter specific types
  const officeAddresses = contacts.filter(c => c.type === "address").sort((a, b) => a.order_index - b.order_index);
  const socialLinks = contacts.filter(c => c.type === "social" || c.type === "link");
  const phones = contacts.filter(c => c.type === "phone");
  const emails = contacts.filter(c => c.type === "email");

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
                Arsen Interio Pvt Ltd specializes in full scope of commercial & residential Turnkey fit-outs including furnishing for commercial Offices, Retail Showrooms, Malls and residential Modular Kitchens, Wardrobe, TV Units and interiors.
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
              {phones.map((phone, i) => (
                <li key={`ph-${i}`} className="flex items-center gap-4 group border-t border-white/10 pt-4">
                  <Phone className="w-5 h-5 text-[#FFA62B] shrink-0" />
                  <a href={`tel:${phone.value.split(',')[0].trim()}`} className="text-white text-sm font-bold group-hover:text-[#FFA62B] transition-colors">
                    {phone.value}
                  </a>
                </li>
              ))}
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
                { name: "Commercial", path: "/commercial" },
                { name: "Residential", path: "/residential" },
                { name: "Completed Projects", path: "/completed" },
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
              {emails.map((email, i) => (
                <li key={`em-${i}`} className="flex items-center gap-4 group border-t border-white/10 pt-4">
                  <Mail className="w-5 h-5 text-[#FFA62B] shrink-0" />
                  <a href={`mailto:${email.value}`} className="text-slate-200 text-base group-hover:text-white transition-colors">
                    {email.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFO (Dynamic) */}
          <div className="space-y-8">
            <h3 className="text-sm font-black text-[#FFA62B] tracking-[0.2em] uppercase">
              Get In Touch
            </h3>
            <ul className="space-y-3">
              {officeAddresses.length > 0 ? officeAddresses.map((addr, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <MapPin className="w-6 h-6 text-[#FFA62B] shrink-0 mt-1" />
                  <span className="text-slate-200 text-sm md:text-base leading-relaxed group-hover:text-white transition-colors">
                    <strong className="text-[#FFA62B] block text-xs tracking-widest uppercase mb-1">{addr.label}</strong>
                    <span className="whitespace-pre-line">{addr.value}</span>
                  </span>
                </li>
              )) : (
                <li className="text-slate-400 italic">Locations loading...</li>
              )}

              <div className="flex items-center justify-start gap-2 pt-2">
                {socialLinks.map((social, i) => {
                  const IconComp = IconMap[social.icon] || Globe;
                  return (
                    <a
                      key={i}
                      href={social.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full border border-white/20 hover:border-[#FFA62B] hover:bg-[#FFA62B]/10 transition-all duration-300"
                    >
                      <IconComp className="w-3 h-3 text-slate-300 hover:text-[#FFA62B]" />
                    </a>
                  );
                })}
              </div>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 md:mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs tracking-[0.2em] uppercase text-center md:text-left">
            © {currentYear} Arsen Interio Pvt Ltd — All Rights Reserved | Designed by <a href="https://inymartlabs.com" target="_blank" rel="noopener noreferrer" className="text-[#FFA62B] hover:underline">Inymart Labs</a>
          </p>
          <p className="text-white font-bold text-[10px] tracking-[0.1em] uppercase">
            Architectural Excellence & Interior Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}