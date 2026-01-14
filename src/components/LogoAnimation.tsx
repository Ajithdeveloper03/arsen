"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/arsen-logo.png";

interface LogoAnimationProps {
  onAnimationComplete: () => void;
}

export default function LogoAnimation({ onAnimationComplete }: LogoAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);

  const DURATION_MS = 1900;

  useEffect(() => {
    const t = setTimeout(() => {
      setIsVisible(false);
      onAnimationComplete();
    }, DURATION_MS);

    return () => clearTimeout(t);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @keyframes ambientLight {
          0% { opacity:.45; transform:scale(1); }
          100% { opacity:.7; transform:scale(1.05); }
        }

        @keyframes ringFloat {
          from { transform:rotate(0deg); }
          to { transform:rotate(360deg); }
        }

        @keyframes exitFade {
          from { opacity:1; transform:scale(1); }
          to { opacity:0; transform:scale(1.03); }
        }

        .animate-ambient { animation:ambientLight 3.2s ease-in-out alternate infinite; }
        .animate-ring { animation:ringFloat 3.6s linear infinite; }
        .animate-exit { animation:exitFade .55s ease forwards 1.35s; }
      `}</style>

      <div className="fixed inset-0 z-[9999] bg-[#05070d] flex flex-col items-center justify-center animate-exit">

        {/* SOFT BACKGROUND GLOW — no blur */}
        <div className="absolute w-[120vmax] h-[120vmax] rounded-full bg-[radial-gradient(circle,#0A2B36_0%,transparent_70%)] opacity-50 animate-ambient" />

        {/* LOADER CORE */}
        <div className="relative flex items-center justify-center"
          style={{
            width: "clamp(110px, 22vw, 220px)",
            height: "clamp(110px, 22vw, 220px)"
          }}
        >

          {/* Thin outer ring */}
          <div className="absolute inset-0 rounded-full border border-white/15" />

          {/* Cyan accent ring */}
          <div className="absolute inset-[6%] rounded-full border-t-2 border-[#00D6F9] shadow-[0_0_12px_#00D6F955] animate-ring" />

          {/* LOGO CORE */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="bg-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,.25)]"
            style={{
              width: "70%",
              height: "70%"
            }}
          >
            <img
              src={logo}
              className="object-contain"
              style={{
                width: "clamp(48px, 9vw, 105px)"
              }}
            />
          </motion.div>
        </div>

        {/* TAGLINE */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 0.45, duration: 0.45 }}
          className="mt-10 text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-white/60"
        >
          Loading...
        </motion.div>
      </div>
    </>
  );
}
