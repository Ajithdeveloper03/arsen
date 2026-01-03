"use client";

import { useEffect, useRef } from "react";

export default function CursorWaveEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: width / 2, y: height / 2 };
    let target = { ...mouse };

    let ripples = [];

    const ease = 0.1; // cursor smoothing

    const handleMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;

      ripples.push({
        x: target.x,
        y: target.y,
        r: 0,
        alpha: 0.28,
      });
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("resize", resize);

    const draw = () => {
      // cursor inertia
      mouse.x += (target.x - mouse.x) * ease;
      mouse.y += (target.y - mouse.y) * ease;

      ctx.clearRect(0, 0, width, height);

      // ---- BACK LAYER (deep) ----
      paintLayer(120, 0.25);

      // ---- MID LAYER ----
      paintLayer(80, 0.5);

      // ---- TOP GLOSS ----
      paintLayer(40, 1);

      requestAnimationFrame(draw);
    };

    function paintLayer(size, strength) {
      ripples.forEach((r, i) => {
        r.r += 1.2;
        r.alpha *= 0.97;

        if (r.alpha < 0.02) ripples.splice(i, 1);

        const gradient = ctx.createRadialGradient(
          r.x,
          r.y,
          0,
          r.x,
          r.y,
          r.r + size
        );

        gradient.addColorStop(
          0,
          `rgba(255,255,255,${r.alpha * strength})`
        );
        gradient.addColorStop(1, `rgba(255,255,255,0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r + size, 0, Math.PI * 2);
        ctx.fill();
      });

      // subtle depth glow around cursor
      const glow = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        140 * strength
      );

      glow.addColorStop(0, `rgba(255,255,255,0.08)`);
      glow.addColorStop(1, `rgba(255,255,255,0)`);

      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
    }

    draw();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="
        pointer-events-none
        fixed inset-0
        z-[99]
        mix-blend-overlay
        opacity-[1]
      "
    />
  );
}
