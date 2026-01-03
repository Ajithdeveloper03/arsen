import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/arsen-logo.png";

interface LogoAnimationProps {
  onAnimationComplete: () => void;
}

export default function LogoAnimation({ onAnimationComplete }: LogoAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);

  const DURATION_MS = 1900; // fast + premium

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
        /* soft spotlight */
        @keyframes ambientLight {
          from { opacity:.45; transform:scale(1); }
          to { opacity:.65; transform:scale(1.08); }
        }

        /* very subtle rotation */
        @keyframes ringFloat {
          from { transform:rotate(0deg); }
          to { transform:rotate(360deg); }
        }

        /* premium fade exit */
        @keyframes exitFade {
          from { opacity:1; filter:blur(0px); transform:scale(1); }
          to { opacity:0; filter:blur(14px); transform:scale(1.04); }
        }

        .animate-ambient { animation:ambientLight 2.8s ease-in-out alternate infinite; }
        .animate-ring { animation:ringFloat 3s linear infinite; }
        .animate-exit { animation:exitFade .55s ease forwards 1.3s; }
      `}</style>

      <div className="fixed inset-0 z-[9999] bg-[#05070d] flex items-center justify-center animate-exit">

        {/* ARCHITECTURAL LIGHT — like ceiling spotlight */}
        <div className="absolute w-[90vmax] h-[90vmax] rounded-full bg-[radial-gradient(circle,#0A2B36_0%,transparent_65%)] opacity-50 blur-[110px] animate-ambient" />

        {/* FLOOR REFLECTION — interior design touch */}
        <div className="absolute bottom-[28%] w-[28rem] h-[5rem] bg-[radial-gradient(ellipse,#00E0FF22_0%,transparent_70%)] blur-2xl opacity-40" />

        {/* LOADER */}
        <div className="relative w-48 h-48 flex items-center justify-center">

          {/* SOFT GLASS RING */}
          <div className="absolute inset-[-8px] rounded-full border border-white/10 backdrop-blur-[2px]" />

          {/* PREMIUM CYAN ACCENT RING */}
          <div className="absolute inset-[-6px] rounded-full border-t-2 border-[#00D6F9] shadow-[0_0_18px_#00D6F955] animate-ring" />

          {/* LOGO CORE – calm reveal */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="bg-white rounded-full w-[72%] h-[72%] shadow-[0_20px_60px_rgba(0,0,0,.25)] flex items-center justify-center"
          >
            <img src={logo} className="w-24 object-contain" />
          </motion.div>
        </div>

        {/* TAGLINE FEELING – NOT LOUD */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.55, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          className="absolute bottom-16 text-[11px] tracking-[0.35em] uppercase text-white/50"
        >
          Loading...
        </motion.div>
      </div>
    </>
  );
}
