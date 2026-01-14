import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Send, User, Mail, MessageSquare, Phone } from "lucide-react";

export default function LusionInteractiveFooter() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    const CONFIG = {
      gridSpacing: 20,
      particleSize: 18,
      mouseRadius: 450,
      mouseForce: 2.5,
      springStiffness: 0.02,
      damping: 0.78,
      bgColor: "#ffffff",
      forestGreen: new THREE.Color("#228B22"),
      blueStone: new THREE.Color("#4682B4"),
      golden: new THREE.Color("#DAA520"),
      waveAmplitude: 5.0,
      waveSpeed: 0.5,
    };

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(CONFIG.bgColor);

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const createShapeTexture = () => {
      const size = 512;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      const half = size / 2;
      const pad = 40;
      const lineWidth = 25;

      ctx.strokeStyle = "#228B22";
      ctx.fillStyle = "#4682B4";
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.arc(half / 2, half / 2, half / 2 - pad, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.rect(half + pad, pad, half - pad * 2, half - pad * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(half / 2, half + pad);
      ctx.lineTo(pad, size - pad);
      ctx.lineTo(half - pad, size - pad);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(half + pad, half + pad);
      ctx.lineTo(size - pad, size - pad);
      ctx.moveTo(size - pad, half + pad);
      ctx.lineTo(half + pad, size - pad);
      ctx.stroke();

      const tex = new THREE.CanvasTexture(canvas);
      tex.magFilter = THREE.LinearFilter;
      tex.minFilter = THREE.LinearMipMapLinearFilter;
      return tex;
    };

    const shapeTexture = createShapeTexture();

    let cols = Math.floor(container.clientWidth / CONFIG.gridSpacing) + 4;
    let rows = Math.floor(container.clientHeight / CONFIG.gridSpacing) + 2;
    let particleCount = cols * rows;

    const geometry = new THREE.BufferGeometry();
    let positions = new Float32Array(particleCount * 3);
    let targets = new Float32Array(particleCount * 3);
    let velocities = new Float32Array(particleCount * 3);
    let shapeIndices = new Float32Array(particleCount);
    let velocityMagAttrArr = new Float32Array(particleCount);

    const updateGrid = () => {
      cols = Math.floor(container.clientWidth / CONFIG.gridSpacing) + 4;
      rows = Math.floor(container.clientHeight / CONFIG.gridSpacing) + 2;
      particleCount = cols * rows;

      positions = new Float32Array(particleCount * 3);
      targets = new Float32Array(particleCount * 3);
      velocities = new Float32Array(particleCount * 3);
      shapeIndices = new Float32Array(particleCount);
      velocityMagAttrArr = new Float32Array(particleCount);

      let idx = 0;
      const startX = -(cols * CONFIG.gridSpacing) / 2;
      const startY = -(container.clientHeight / 2) + 20;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = startX + c * CONFIG.gridSpacing;
          const y = startY + r * CONFIG.gridSpacing;

          positions[idx * 3] = x;
          positions[idx * 3 + 1] = y;
          positions[idx * 3 + 2] = 0;

          targets[idx * 3] = x;
          targets[idx * 3 + 1] = y;
          targets[idx * 3 + 2] = 0;

          shapeIndices[idx] = (c + r) % 4;
          idx++;
        }
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("aTarget", new THREE.BufferAttribute(targets, 3));
      geometry.setAttribute("aShapeIndex", new THREE.BufferAttribute(shapeIndices, 1));
      geometry.setAttribute("aVelocityMag", new THREE.BufferAttribute(velocityMagAttrArr, 1));
    };

    updateGrid();

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: shapeTexture },
        uColor1: { value: CONFIG.forestGreen },
        uColor2: { value: CONFIG.blueStone },
        uGolden: { value: CONFIG.golden },
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float aShapeIndex;
        attribute float aVelocityMag;
        varying float vShapeIndex;
        varying float vVelocityMag;

        void main() {
          vShapeIndex = aShapeIndex;
          vVelocityMag = aVelocityMag;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = ${CONFIG.particleSize.toFixed(1)} * (400.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uGolden;
        varying float vShapeIndex;
        varying float vVelocityMag;

        void main() {
          vec2 uv = gl_PointCoord;
          float idx = mod(vShapeIndex, 4.0);
          float col = mod(idx, 2.0);
          float row = floor(idx / 2.0);
          uv = uv * 0.5;
          uv.x += col * 0.5;
          uv.y = 1.0 - uv.y;
          uv.y -= row * 0.5;

          vec4 texColor = texture2D(uTexture, uv);
          if (texColor.a < 0.1) discard;

          vec3 base = vec3(0.9);
          vec3 neon = mix(uColor1, uColor2, sin(vShapeIndex)*0.5 + 0.5);
          neon = mix(neon, uGolden, 0.3);

          float intensity = smoothstep(0.5, 5.0, vVelocityMag);
          vec3 finalColor = mix(base, neon, intensity);

          gl_FragColor = vec4(finalColor, texColor.a);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    let oscillator: OscillatorNode | null = null;
    let gainNode: GainNode | null = null;

    const initAudio = () => {
      if (oscillator) return;
      oscillator = audioCtx.createOscillator();
      gainNode = audioCtx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(60, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
    };

    const mouse = new THREE.Vector2(10000, 10000);
    const prevMouse = new THREE.Vector2(10000, 10000);
    let mouseSpeed = 0;
    let time = 0;

    const onPointerMove = (e: PointerEvent) => {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      if (!oscillator) initAudio();

      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const vec = new THREE.Vector3(x, y, 0);
      vec.unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      mouse.set(pos.x, pos.y);
      const dist = mouse.distanceTo(prevMouse);
      mouseSpeed = THREE.MathUtils.lerp(mouseSpeed, dist, 0.20);
      prevMouse.copy(mouse);
    };

    const onPointerLeave = () => {
      mouse.set(10000, 10000);
      mouseSpeed = 0;
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);

    let animationFrameId: number;
    const animate = () => {
      time += 0.01;
      material.uniforms.uTime.value = time;

      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const velMagAttr = geometry.attributes.aVelocityMag as THREE.BufferAttribute;

      if (gainNode && oscillator && audioEnabled) {
        const vol = Math.min(mouseSpeed * 0.02, 0.2);
        const freq = 60 + mouseSpeed * 10;
        gainNode.gain.setTargetAtTime(vol, audioCtx.currentTime, 0.1);
        oscillator.frequency.setTargetAtTime(freq, audioCtx.currentTime, 0.1);
      }

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        let x = posAttr.array[i3];
        let y = posAttr.array[i3 + 1];
        const targetX = targets[i3];
        let targetY = targets[i3 + 1];

        targetY += Math.sin(targetX * 0.1 + time * CONFIG.waveSpeed) * CONFIG.waveAmplitude;

        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.mouseRadius && dist > 0) {
          const force = (1 - dist / CONFIG.mouseRadius) * CONFIG.mouseForce;
          const angle = Math.atan2(dy, dx);
          velocities[i3] += Math.cos(angle) * force;
          velocities[i3 + 1] += Math.sin(angle) * force;
        }

        const ax = (targetX - x) * CONFIG.springStiffness;
        const ay = (targetY - y) * CONFIG.springStiffness;

        velocities[i3] += ax;
        velocities[i3 + 1] += ay;
        velocities[i3] *= CONFIG.damping;
        velocities[i3 + 1] *= CONFIG.damping;

        x += velocities[i3];
        y += velocities[i3 + 1];

        posAttr.array[i3] = x;
        posAttr.array[i3 + 1] = y;
        velMagAttr.array[i] = Math.sqrt(velocities[i3] ** 2 + velocities[i3 + 1] ** 2);
      }

      posAttr.needsUpdate = true;
      velMagAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      updateGrid();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(animationFrameId);
      if (oscillator) oscillator.stop();
      if (audioCtx) audioCtx.close();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      shapeTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [audioEnabled]);

  return (
    <section className="relative w-full min-h-screen bg-white flex flex-col items-center justify-center p-6 lg:p-12 overflow-hidden">
      <div ref={mountRef} className="absolute inset-0 z-0" />

      {/* <div className="absolute inset-0 bg-white/30 backdrop-blur-md pointer-events-none z-[5]" /> */}

      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left space-y-6">
          <div className="inline-block px-4 py-1 border border-[#16697A] rounded-full">
            <span className="text-[#16697A] font-bold tracking-[0.3em] uppercase">
              Connect with Arsen
            </span>
          </div>
          <h2 className="text-black text-5xl md:text-8xl font-black italic uppercase leading-[0.8] tracking-tighter">
            Let's Shape <br />
            <span
              className="text-[#16697A]"
              // style={{ WebkitTextStroke: "2px #16697A" }}
            >
              Your Space.
            </span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto lg:mx-0 text-sm md:text-xl">
            From architectural concepts to bespoke interiors, our team brings
            nationwide expertise to your doorstep.
          </p>
        </div>
        
        <div className="bg-white border border-[#4682B4]/10 p-8 md:p-12 rounded-[3rem] shadow-xl shadow-[#DAA520]/60 relative">
          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative">
                <User className="absolute left-4 top-4 text-[#16697A]" size={20} strokeWidth={2.2} />
                <input className="w-full bg-white border border-[#daa52085] p-4 pl-12 rounded-2xl text-black outline-none focus:border-[#228B22]" placeholder="Full Name" />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-4 text-[#16697A]" size={18} />
                <input className="w-full bg-white border border-[#daa52085] p-4 pl-12 rounded-2xl text-black outline-none focus:border-[#228B22]" placeholder="Contact No." />
              </div>
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-[#16697A]" size={18} />
              <input className="w-full bg-white border border-[#daa52085] p-4 pl-12 rounded-2xl text-black outline-none focus:border-[#228B22]" placeholder="Email Address" />
            </div>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 text-[#16697A]" size={18} />
              <textarea className="w-full bg-white border border-[#daa52085] p-4 pl-12 rounded-2xl text-black outline-none resize-none focus:border-[#228B22]" rows={4} placeholder="Tell us about your project..." />
            </div>
            <button className="w-full bg-[#16697A] hover:bg-[#DAA520] text-white font-black uppercase tracking-widest py-5 rounded-2xl flex items-center justify-center gap-3 transition-colors">
              Send Enquiry
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* <button
        onClick={() => setAudioEnabled(!audioEnabled)}
        className="absolute bottom-4 right-4 z-20 px-4 py-2 bg-[#228B22] text-white rounded-full text-sm"
      >
        {audioEnabled ? "Mute Audio" : "Enable Audio"}
      </button> */}
    </section>
  );
}