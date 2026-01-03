"use client";

import { motion, useTransform } from "framer-motion";
import { Box } from "lucide-react";

export default function LusionCard({ feature, index, progress }) {
  const step = 0.05;
  const duration = 0.4;
  const start = index * step;
  const end = start + duration;

  const localProgress = useTransform(progress, [start, end], [0, 1]);

  const col = index % 3;
  const row = Math.floor(index / 3);

  const initialX = col === 0 ? "100%" : col === 2 ? "-100%" : "0%";
  const initialY = row === 0 ? "50%" : "-50%";

  const x = useTransform(localProgress, [0, 1], [initialX, "0%"]);
  const y = useTransform(localProgress, [0, 1], [initialY, "0%"]);

  const rotateY = useTransform(localProgress, [0, 1], [180, 0]);
  const rotateZ = useTransform(localProgress, [0, 1], [0, 0]);
  const scale = useTransform(localProgress, [0, 1], [0.5, 1]);
  const opacity = useTransform(localProgress, [0, 0.5], [0, 1]);

  return (
    <div className="relative w-full h-[320px] perspective-[800px] group z-20">
      <motion.div
        style={{ x, y, rotateY, rotateZ, scale, opacity, transformStyle: "preserve-3d" }}
        className="w-full h-full relative"
      >
        <div className="absolute inset-0 bg-white rounded-[2rem] border p-8 flex flex-col items-center justify-center shadow-2xl">
          <div className="w-16 h-16 bg-[#eefcfd] rounded-2xl flex items-center justify-center mb-6">
            <feature.icon className="w-8 h-8 text-[#16697A]" />
          </div>

          <h3 className="text-xl font-bold">{feature.title}</h3>

          <p className="text-gray-500 mt-2">{feature.description}</p>
        </div>
      </motion.div>
    </div>
  );
}
