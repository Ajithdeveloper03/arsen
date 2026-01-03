"use client";

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import logo from "../assets/arsen-logo.png";

export default function InteriorFooter() {
  return (
    <footer className="relative bg-[#0F172A] text-white pt-20 pb-12">
      
      {/* Soft gold gradient glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#F4D06F]/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">
            <img src={logo} className="w-24 h-24"
            />
          </h2>

          <p className="text-white/70 leading-relaxed max-w-xs text-sm">
            Designing elegant, functional spaces with precision and timeless craftsmanship.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-6">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 rounded-full border border-white/10 hover:border-[#F4D06F]/40 hover:bg-white/10 transition"
              >
                <Icon className="w-5 h-5 text-white/80" />
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-[#F4D06F] tracking-wide">
            QUICK LINKS
          </h3>

          <ul className="space-y-3 text-white/70">
            {["Home", "About Us", "Services", "Projects", "Residential", "Commercial"].map(
              (item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-[#F4D06F] transition text-sm"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-[#F4D06F] tracking-wide">
            SERVICES
          </h3>

          <ul className="space-y-3 text-white/70">
            {[
              "Interior Execution",
              "Modular Furniture",
              "Space Planning",
              "Lighting Design",
              "Renovation",
            ].map((service, i) => (
              <li key={i}>
                <a href="#" className="hover:text-[#F4D06F] transition text-sm">
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-[#F4D06F] tracking-wide">
            CONTACT
          </h3>

          <ul className="space-y-4 text-white/70 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#F4D06F]" />
              <span>
                123 Interior Studio Lane,
                <br /> Chennai, Tamil Nadu
              </span>
            </li>

            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#F4D06F]" />
              +91 98765 43210
            </li>

            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#F4D06F]" />
              hello@arseninterio.in
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="relative z-10 mt-16 border-t border-white/10 pt-6 text-center">
        <p className="text-white/50 text-xs tracking-wide">
          © {new Date().getFullYear()} Arsen Interio — Crafted With Elegance & Precision.
        </p>
      </div>
    </footer>
  );
}
