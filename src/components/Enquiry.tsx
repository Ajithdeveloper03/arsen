import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Send, User, Mail, MessageSquare, Phone } from "lucide-react";

export default function UltimateInteractiveFooter() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    const CONFIG = {
      gridSpacing: 19,
      particleSize: 34,
      mouseRadius: 30,
      mouseForce: 1.5,
      springStiffness: 0.05,
      damping: 0.85,
      gravity: 15.0,
      bgColor: "#010B0A", // Pure Obsidian
      emerald: new THREE.Color("#0F5B54"),
      waveSpeed: 0.0006,
      waveAmplitude: 6.0,
      initialDropHeight: 150,
      dropDuration: 1.4,
    };

    // --- THREE.JS SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(CONFIG.bgColor);

    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 280;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // --- ICON ATLAS (Sofa, Bed, Lamp, Plant) ---
    const createIconAtlas = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 512; canvas.height = 512;
      const ctx = canvas.getContext("2d");
      if (!ctx) return new THREE.Texture();

      const draw = (x: number, y: number, type: number) => {
        ctx.save();
        ctx.translate(x + 128, y + 128);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.scale(5, 5);
        ctx.beginPath();
        if (type === 0) { // Sofa
          ctx.strokeRect(-10, 0, 20, 8); ctx.strokeRect(-8, -4, 16, 4);
        } else if (type === 1) { // Lamp
          ctx.moveTo(0, 8); ctx.lineTo(0, -6); ctx.strokeRect(-4, -10, 8, 4);
        } else if (type === 2) { // Bed
          ctx.strokeRect(-12, 0, 24, 6); ctx.strokeRect(-10, -3, 6, 3);
        } else { // Plant
          ctx.strokeRect(-4, 4, 8, 6); ctx.moveTo(0, 4); ctx.lineTo(0, -4); ctx.arc(0, -6, 4, 0, Math.PI);
        }
        ctx.stroke();
        ctx.restore();
      };
      draw(0, 0, 0); draw(256, 0, 1); draw(0, 256, 2); draw(256, 256, 3);
      return new THREE.CanvasTexture(canvas);
    };

    const iconTexture = createIconAtlas();

    // --- GEOMETRY DATA ---
    const cols = Math.floor(container.clientWidth / CONFIG.gridSpacing) + 4;
    const rows = Math.floor((container.clientHeight * 0.8) / CONFIG.gridSpacing);
    const count = cols * rows;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const targets = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 2);
    const shapeIndices = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const x = (i % cols) * CONFIG.gridSpacing - (cols * CONFIG.gridSpacing) / 2;
      const y = Math.floor(i / cols) * CONFIG.gridSpacing - (rows * CONFIG.gridSpacing) / 2;

      targets[i * 3] = x;
      targets[i * 3 + 1] = y;
      targets[i * 3 + 2] = (Math.random() - 0.5) * 20;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y + CONFIG.initialDropHeight; // Gravity Drop start
      positions[i * 3 + 2] = targets[i * 3 + 2];

      shapeIndices[i] = i % 4;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aTarget", new THREE.BufferAttribute(targets, 3));
    geometry.setAttribute("aShapeIndex", new THREE.BufferAttribute(shapeIndices, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: iconTexture },
        uColor: { value: CONFIG.emerald },
        uTime: { value: 0 }
      },
      vertexShader: `
        attribute float aShapeIndex;
        attribute vec3 aTarget;
        varying vec2 vUvOffset;
        varying float vSpeed;
        void main() {
          float col = mod(aShapeIndex, 2.0) * 0.5;
          float row = floor(aShapeIndex / 2.0) * 0.5;
          vUvOffset = vec2(col, row);
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = ${CONFIG.particleSize.toFixed(1)} * (280.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform vec3 uColor;
        varying vec2 vUvOffset;
        void main() {
          vec2 uv = gl_PointCoord * 0.5 + vUvOffset;
          vec4 tex = texture2D(uTexture, uv);
          if (tex.a < 0.1) discard;
          gl_FragColor = vec4(uColor, tex.a);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // --- ANIMATION LOGIC ---
    let mouse = new THREE.Vector2(10000, 10000);
    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      mouse.set(pos.x, pos.y);
    };
    container.addEventListener("pointermove", onMove);

    let startTime = Date.now();
    let dropElapsed = 0;

    const animate = () => {
      const now = Date.now();
      const dt = Math.min((now - startTime) * 0.001, 0.1);
      startTime = now;
      material.uniforms.uTime.value += dt;

      if (dropElapsed < CONFIG.dropDuration) dropElapsed += dt;

      const posAttr = geometry.attributes.position.array as Float32Array;
      const targetAttr = geometry.attributes.aTarget.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const i2 = i * 2;

        let x = posAttr[i3];
        let y = posAttr[i3 + 1];

        const tx = targetAttr[i3];
        const ty = targetAttr[i3 + 1];

        // 1. WAVE REST POSITION
        const waveY = ty + Math.sin(tx * 0.1 + material.uniforms.uTime.value * 2.0) * CONFIG.waveAmplitude;

        // 2. MOUSE INTERACTION (DYNAMIC PUSH)
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.mouseRadius) {
          const force = (1.0 - dist / CONFIG.mouseRadius) * CONFIG.mouseForce;
          velocities[i2] += dx * force * 0.5;
          velocities[i2 + 1] += dy * force * 0.5;
        }

        // 3. SPRING & DAMPING
        velocities[i2] += (tx - x) * CONFIG.springStiffness;
        velocities[i2 + 1] += (waveY - y) * CONFIG.springStiffness;

        velocities[i2] *= CONFIG.damping;
        velocities[i2 + 1] *= CONFIG.damping;

        // 4. APPLY VELOCITY
        posAttr[i3] += velocities[i2];
        posAttr[i3 + 1] += velocities[i2 + 1];
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();
    return () => renderer.dispose();
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-[#010B0A] flex flex-col items-center justify-center p-6 lg:p-12 overflow-hidden">
      {/* 75% Background Animation Area */}
      <div ref={mountRef} className="absolute top-0 left-0 w-full h-[100%] z-0" />

      {/* Glassmorphic Inquiry Container */}
      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Side: Branding */}
        <div className="text-center lg:text-left space-y-6">
          <div className="inline-block px-4 py-1 border border-[#0F5B54] rounded-full">
            <span className="text-[#0F5B54] text-xs font-bold tracking-[0.4em] uppercase">Connect with Arsen</span>
          </div>
          <h2 className="text-white text-5xl md:text-8xl font-black italic uppercase leading-[0.8] tracking-tighter">
            Let's Shape <br />
            <span className="text-transparent" style={{ WebkitTextStroke: "2px #25bbacff" }}>Your Space.</span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto lg:mx-0 text-sm md:text-base leading-relaxed">
            From architectural concepts to bespoke interiors, our team brings nationwide expertise to your doorstep. Start your journey with a consultation today.
          </p>
        </div>

        {/* Right Side: High-End Form */}
        <div className="bg-white/[0.08] backdrop-blur-3xl border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group">
          {/* Subtle Form Decoration */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#0F5B54]/40 blur-[80px] group-hover:bg-[#0F5B54]/40 transition-all duration-700" />

          <form className="space-y-5 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative">
                <User className="absolute left-4 top-4 text-[#0F5B54]" size={18} />
                <input type="text" placeholder="Full Name" className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl text-white focus:border-[#0F5B54] outline-none transition-all placeholder:text-gray-600" />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-4 text-[#0F5B54]" size={18} />
                <input type="text" placeholder="Contact No." className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl text-white focus:border-[#0F5B54] outline-none transition-all placeholder:text-gray-600" />
              </div>
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-4 text-[#0F5B54]" size={18} />
              <input type="email" placeholder="Email Address" className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl text-white focus:border-[#0F5B54] outline-none transition-all placeholder:text-gray-600" />
            </div>

            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 text-[#0F5B54]" size={18} />
              <textarea placeholder="Tell us about your project..." rows={4} className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl text-white focus:border-[#0F5B54] outline-none transition-all placeholder:text-gray-600 resize-none" />
            </div>

            <button className="w-full bg-[#0F5B54] hover:bg-[#147a70] text-white font-black uppercase tracking-widest py-5 rounded-2xl transition-all flex items-center justify-center gap-3 group/btn">
              Send Inquiry
              <Send size={18} className="group-hover/btn:translate-x-2 group-hover/btn:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>

    
    </section>
  );
}