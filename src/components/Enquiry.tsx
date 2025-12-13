import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";


export default function LusionInteractiveFooter() {
  const mountRef = useRef(null);
  const audioContextRef = useRef(null);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    
    const CONFIG = {
      gridSpacing: 25, 
      particleSize: 30,
      mouseRadius: 400,
      mouseForce: 3.0,
      springStiffness: 0.015, 
      damping: 0.85,
      bgColor: "#1a2f4a",
      neonColor1: new THREE.Color("#8A2BE2"), 
      neonColor2: new THREE.Color("#FF4500"), 
      waveSpeed: 0.0005,
      waveAmplitude: 8.0,
      initialDropHeight: 150, 
      dropDuration: 1.5,
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

        const createIconTexture = () => {
      const size = 512;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return new THREE.Texture();

      const half = size / 2;
      const qtr = size / 4;
      const pad = 40;
      const lineWidth = 20;

      ctx.strokeStyle = "#FFFFFF";
      ctx.fillStyle = "#FFFFFF";
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // --- ICON 1: Door (Top Left) ---
      ctx.save();
      ctx.translate(qtr, qtr);
      ctx.beginPath();
      ctx.rect(-qtr + pad, -qtr + pad, qtr * 2 - pad * 2, qtr * 2 - pad * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -qtr + pad);
      ctx.lineTo(0, qtr - pad);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(qtr - pad - 20, 0, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // --- ICON 2: Sofa/Couch (Top Right) ---
      ctx.save();
      ctx.translate(half + qtr, qtr);
      const s = qtr - pad - 20;
      ctx.beginPath();
      ctx.rect(-s/2, -s/2, s, s/3);
      ctx.rect(-s/2, -s/6, s/3, s/2);
      ctx.rect(s/6, -s/6, s/3, s/2);
      ctx.fill();
      ctx.beginPath();
      ctx.rect(-s/2, s/3, 10, 10);
      ctx.rect(s/2 - 10, s/3, 10, 10);
      ctx.fill();
      ctx.restore();

      // --- ICON 3: Lamp (Bottom Left) ---
      ctx.save();
      ctx.translate(qtr, half + qtr);
      ctx.beginPath();
      ctx.moveTo(-qtr + pad + 10, -qtr + pad);
      ctx.lineTo(qtr - pad - 10, -qtr + pad);
      ctx.lineTo(qtr - pad, -qtr + pad + 20);
      ctx.lineTo(-qtr + pad, -qtr + pad + 20);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -qtr + pad + 20);
      ctx.lineTo(0, qtr - pad);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, qtr - pad - 5, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();


      
      ctx.save();
      ctx.translate(half + qtr, half + qtr);
      ctx.beginPath();
      ctx.moveTo(-s, 0);
      ctx.lineTo(0, -s);
      ctx.lineTo(s, 0);
      ctx.lineTo(s, s);
      ctx.lineTo(-s, s);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.rect(-s/2, s/2, s/3, s/3);
      ctx.stroke();
      ctx.restore();
      
      const tex = new THREE.CanvasTexture(canvas);
      tex.magFilter = THREE.LinearFilter;
      tex.minFilter = THREE.LinearMipMapLinearFilter;
      return tex;
    };

    const iconTexture = createIconTexture();

        const cols = Math.floor(container.clientWidth / CONFIG.gridSpacing) + 4;
    const rows = Math.floor((container.clientHeight * 0.7) / CONFIG.gridSpacing);
    const particleCount = cols * rows;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const targets = new Float32Array(particleCount * 3);
    const initialOffsets = new Float32Array(particleCount * 2);
    const velocities = new Float32Array(particleCount * 2);
    const shapeIndices = new Float32Array(particleCount);

    let idx = 0;
    const startX = -(cols * CONFIG.gridSpacing) / 2;
    const startY = -(container.clientHeight / 2) + CONFIG.gridSpacing * 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = startX + c * CONFIG.gridSpacing;
        const y = startY + r * CONFIG.gridSpacing;
        
        
        targets[idx * 3] = x;
        targets[idx * 3 + 1] = y;
        targets[idx * 3 + 2] = 0;
        
       
        positions[idx * 3] = x;
        positions[idx * 3 + 1] = y + CONFIG.initialDropHeight; // Start above target
        positions[idx * 3 + 2] = 0;

        
        initialOffsets[idx * 2] = CONFIG.initialDropHeight;
        initialOffsets[idx * 2 + 1] = r * 0.05 + Math.random() * 0.1; // Row-based delay for cascade

       
        velocities[idx * 2] = 0;
        velocities[idx * 2 + 1] = 0;

       
        shapeIndices[idx] = (c * 7 + r * 13) % 4;

        idx++;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aTarget", new THREE.BufferAttribute(targets, 3));
    geometry.setAttribute("aInitialOffset", new THREE.BufferAttribute(initialOffsets, 2));
    geometry.setAttribute("aShapeIndex", new THREE.BufferAttribute(shapeIndices, 1));
    const velocityMagAttr = new Float32Array(particleCount);
    geometry.setAttribute("aVelocityMag", new THREE.BufferAttribute(velocityMagAttr, 1));
    
    
    const uniforms = {
        uTexture: { value: iconTexture },
        uColor1: { value: CONFIG.neonColor1 },
        uColor2: { value: CONFIG.neonColor2 },
        uTime: { value: 0.0 }, 
        uDropTime: { value: 0.0 }, 
        uDropDuration: { value: CONFIG.dropDuration },
    };

    
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: `
        attribute float aShapeIndex;
        attribute float aVelocityMag;
        attribute vec3 aTarget;
        
        uniform float uTime;
        
        varying float vShapeIndex;
        varying float vVelocityMag;

        void main() {
          vShapeIndex = aShapeIndex;
          vVelocityMag = aVelocityMag;

          vec3 pos = position;

          // 1. Wave Motion (Subtle) - applied based on current position's relation to target
          float waveX = aTarget.x * 0.15;
          float waveY = aTarget.y * 0.1;
          
          pos.y += sin(waveX + uTime * 1000.0 * ${CONFIG.waveSpeed.toFixed(4)}) * ${CONFIG.waveAmplitude.toFixed(1)} * 0.2;
          pos.x += cos(waveY + uTime * 800.0 * ${CONFIG.waveSpeed.toFixed(4)}) * ${CONFIG.waveAmplitude.toFixed(1)} * 0.1;


          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = ${CONFIG.particleSize.toFixed(1)} * (400.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying float vShapeIndex;
        varying float vVelocityMag;

        void main() {
          vec2 uv = gl_PointCoord;
          
          // Atlas indexing
          float idx = mod(vShapeIndex, 4.0);
          float col = mod(idx, 2.0);
          float row = floor(idx / 2.0);
          
          // Normalize UV to the icon's quadrant
          uv = uv * 0.5; 
          uv.x += col * 0.5; 
          uv.y = 1.0 - uv.y; // Flip Y (canvas vs THREE coord)
          uv.y -= row * 0.5; 

          vec4 texColor = texture2D(uTexture, uv);
          if (texColor.a < 0.1) discard;

          // Neon Logic: Mix White -> Neon Color based on velocity
          vec3 white = vec3(1.0);
          
          // Color selection based on index parity
          vec3 neon;
          if (mod(vShapeIndex, 2.0) == 0.0) {
              neon = uColor1; // Purple
          } else {
              neon = uColor2; // Orange
          }
          
          // Intensity controlled by speed (vVelocityMag)
          float intensity = smoothstep(0.5, 5.0, vVelocityMag);
          vec3 finalColor = mix(white, neon, intensity);
          
          // Add subtle glow when static
          float flicker = (sin(vShapeIndex * 10.0 + vVelocityMag * 100.0) * 0.05 + 0.95);
          finalColor *= flicker;

          gl_FragColor = vec4(finalColor, texColor.a * 0.9);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

        if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const audioCtx = audioContextRef.current;
    
    let oscillator = null;
    let gainNode = null;
    let filterNode = null;

    const initAudio = () => {
        if (oscillator) return;
        
        oscillator = audioCtx.createOscillator();
        oscillator.type = 'sawtooth'; // Richer tone
        oscillator.frequency.setValueAtTime(100, audioCtx.currentTime); 

        filterNode = audioCtx.createBiquadFilter();
        filterNode.type = 'lowpass';
        filterNode.frequency.setValueAtTime(1000, audioCtx.currentTime); 

        gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime); 

        oscillator.connect(filterNode);
        filterNode.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        setAudioEnabled(true);
    };

   
    const mouse = new THREE.Vector2(10000, 10000); 
    const prevMouse = new THREE.Vector2(10000, 10000);
    let mouseSpeed = 0;

    const onPointerMove = (e) => {
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
    
    
    let startTime = Date.now();
    let lastDropTime = 0;

    const animate = () => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - startTime) * 0.001;
      startTime = currentTime;
      uniforms.uTime.value += deltaTime;

      const posAttr = geometry.attributes.position;
      const targetAttr = geometry.attributes.aTarget;
      const velMagAttr = geometry.attributes.aVelocityMag;
      const initialOffsetAttr = geometry.attributes.aInitialOffset;

      
      if (gainNode && oscillator && filterNode) {
        const vol = Math.min(mouseSpeed * 0.03, 0.3); 
        const freq = 100 + mouseSpeed * 20; 
        const filterFreq = 1000 + mouseSpeed * 300;
        
        gainNode.gain.setTargetAtTime(vol, audioCtx.currentTime, 0.1);
        oscillator.frequency.setTargetAtTime(freq, audioCtx.currentTime, 0.1);
        filterNode.frequency.setTargetAtTime(filterFreq, audioCtx.currentTime, 0.1);
      } else {
        mouseSpeed *= 0.9;
      }
      
      
      if (lastDropTime < CONFIG.dropDuration) {
          lastDropTime += deltaTime;
      }

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const i2 = i * 2;

        let x = posAttr.array[i3];
        let y = posAttr.array[i3 + 1];
        
        let targetX = targetAttr.array[i3];
        let targetY = targetAttr.array[i3 + 1];

       
        if (lastDropTime < CONFIG.dropDuration) {
             const dropFactor = Math.min(lastDropTime / CONFIG.dropDuration, 1.0);
             
             const t = 1.0 - Math.pow(1.0 - dropFactor, 3); 
             
             
             y = targetY + (1.0 - t) * initialOffsetAttr.array[i2];
             posAttr.array[i3 + 1] = y; 
        }

        
        const targetWaveY = targetY + Math.sin(targetX * 0.15 + uniforms.uTime.value * 1000.0 * CONFIG.waveSpeed) * CONFIG.waveAmplitude;

        
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        
        if (dist < CONFIG.mouseRadius) {
          const force = (1 - dist / CONFIG.mouseRadius) * CONFIG.mouseForce;
          const angle = Math.atan2(dy, dx);
          
          velocities[i2] += Math.cos(angle) * force;
          velocities[i2 + 1] += Math.sin(angle) * force;
        }

        
        const ax = (targetX - x) * CONFIG.springStiffness;
        const ay = (targetWaveY - y) * CONFIG.springStiffness; // Use wave Y as the home
        
        velocities[i2] += ax;
        velocities[i2 + 1] += ay;

                velocities[i2] *= CONFIG.damping;
        velocities[i2 + 1] *= CONFIG.damping;

        
        x += velocities[i2];
        y += velocities[i2 + 1];

        
        posAttr.array[i3] = x;
        posAttr.array[i3 + 1] = y;

        
        const speed = Math.sqrt(velocities[i2]**2 + velocities[i2 + 1]**2);
        velMagAttr.array[i] = THREE.MathUtils.lerp(velMagAttr.array[i], speed, 0.1); 
      }

      posAttr.needsUpdate = true;
      velMagAttr.needsUpdate = true;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    
    return () => {
      window.removeEventListener("resize", onResize);
      if (container) {
          container.removeEventListener("pointermove", onPointerMove);
          container.removeEventListener("pointerleave", onPointerLeave);
      }
      cancelAnimationFrame(animId);
      
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      iconTexture.dispose();
      if (mountRef.current && renderer.domElement) {
         mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []); 

    const EnquiryForm = () => (
    <div className="bg-[#1a2f4a] bg-opacity-70 backdrop-blur-sm p-6 md:p-10 rounded-xl shadow-2xl w-full max-w-md">
      <div className="flex space-x-4 mb-4">
        <input 
          type="text" 
          placeholder="Enter Your Name *" 
          className="flex-1 bg-white/10 text-white p-3 rounded-lg border border-white/20 focus:outline-none focus:border-purple-400 placeholder-white/50" 
        />
        <div className="flex w-1/3 min-w-[150px]">
          <span className="bg-white/10 text-white p-3 rounded-l-lg border-y border-l border-white/20">+91</span>
          <input 
            type="text" 
            placeholder="Mobile Number *" 
            className="flex-1 bg-white/10 text-white p-3 rounded-r-lg border border-white/20 focus:outline-none focus:border-purple-400 placeholder-white/50" 
          />
        </div>
      </div>
      <input 
        type="email" 
        placeholder="Enter Your Email Address *" 
        className="w-full bg-white/10 text-white p-3 rounded-lg mb-4 border border-white/20 focus:outline-none focus:border-purple-400 placeholder-white/50" 
      />
      <textarea 
        placeholder="Message" 
        rows={4} 
        className="w-full bg-white/10 text-white p-3 rounded-lg mb-6 border border-white/20 focus:outline-none focus:border-purple-400 resize-none placeholder-white/50"
      />
      <button className="w-full bg-white text-[#1a2f4a] font-bold py-3 rounded-full hover:bg-gray-200 transition duration-200 shadow-xl">
        Submit
      </button>
    </div>
  );

  return (
    <section className="relative w-full min-h-[600px] bg-[#1a2f4a] overflow-hidden flex items-center justify-center p-8 md:p-16">
      
      {/* 1. Canvas Container (Z-0) */}
      <div ref={mountRef} className="absolute inset-0 z-0" />

      {/* 2. Main Content Container (Z-10) */}
      <div className="relative z-10 w-full max-w-6xl bg-[#1a2f4a]/70 mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Side: Text / Enquire Now Block */}
        <div className="w-full lg:w-1/2 text-center lg:text-left p-4">
          <h1 className="text-white text-7xl md:text-8xl font-extrabold tracking-tight leading-none drop-shadow-lg [text-shadow:0_0_15px_rgba(255,69,0,0.7),0_0_30px_rgba(138,43,226,0.5)]">
            Let's Work
            <br />
            Together
          </h1>
          <p className="text-white/80 mt-6 text-lg md:text-2xl font-light max-w-lg mx-auto lg:mx-0">
           Fill out the form below to connect with our interior design experts.
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <EnquiryForm />
        </div>
      </div>

      {/* Audio Hint */}
      {/* <div className="absolute bottom-4 left-4 z-10 text-white/50 text-xs select-none">
          {audioEnabled ? "Interactive Audio ON (Move cursor over the area)" : "Interact to enable aesthetic sound."}
      </div> */}
    </section>
  );
}