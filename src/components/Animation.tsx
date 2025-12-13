import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function LusionInteractiveFooter() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    // Configuration
    const CONFIG = {
      gridSpacing: 20, // Space between shapes
      particleSize: 23, // Visual size of shapes
      mouseRadius: 450, // Area of effect
      mouseForce: 2.5, // Push strength
      springStiffness: 0.02, // How fast they return home (Elasticity)
      damping: 0.78, // Friction (Water viscosity)
      bgColor: "#1a2f4a",
      neonColor1: new THREE.Color("#00FFFF"), // Cyan
      neonColor2: new THREE.Color("#FF00FF"), // Magenta
    };

    // Scene Setup
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

    // ==================== 1. TEXTURE ATLAS GENERATION ====================
    // Draws 4 distinct shapes onto one canvas to be used as a sprite map
    const createShapeTexture = () => {
      const size = 512;
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 500;
      const ctx = canvas.getContext("2d")!;
      const half = size / 2;
      const pad = 40;
      const lineWidth = 25;

      ctx.strokeStyle = "#FFFFFF";
      ctx.fillStyle = "#FFFFFF";
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Top Left: Circle (Filled)
      ctx.beginPath();
      ctx.arc(half / 2, half / 2, half / 2 - pad, 0, Math.PI * 2);
      ctx.fill();

      // Top Right: Square (Stroked)
      ctx.beginPath();
      ctx.rect(half + pad, pad, half - pad * 2, half - pad * 2);
      ctx.stroke();

      // Bottom Left: Triangle (Stroked)
      ctx.beginPath();
      ctx.moveTo(half / 2, half + pad);
      ctx.lineTo(pad, size - pad);
      ctx.lineTo(half - pad, size - pad);
      ctx.closePath();
      ctx.stroke();

      // Bottom Right: Cross (Stroked)
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

    // ==================== 2. PARTICLE SYSTEM (GRID) ====================
    // Calculate rows and cols to fill the bottom half nicely
    const cols = Math.floor(container.clientWidth / CONFIG.gridSpacing) + 4;
    const rows = Math.floor((container.clientHeight * 0.6) / CONFIG.gridSpacing);
    const particleCount = cols * rows;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3); // Current pos
    const targets = new Float32Array(particleCount * 3); // Home pos
    const velocities = new Float32Array(particleCount * 2); // Velocity X, Y
    const shapeIndices = new Float32Array(particleCount); // Which shape (0-3)
    const colors = new Float32Array(particleCount * 3); // RGB

    let idx = 0;
    const startX = -(cols * CONFIG.gridSpacing) / 2;
    const startY = -(container.clientHeight / 2) + 20; // Bottom offset

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = startX + c * CONFIG.gridSpacing;
        const y = startY + r * CONFIG.gridSpacing;

        // Set Position
        positions[idx * 3] = x;
        positions[idx * 3 + 1] = y;
        positions[idx * 3 + 2] = 0;

        // Set Target (Home)
        targets[idx * 3] = x;
        targets[idx * 3 + 1] = y;
        targets[idx * 3 + 2] = 0;

        // Velocity
        velocities[idx * 2] = 0;
        velocities[idx * 2 + 1] = 0;

        // Shape Index (0, 1, 2, 3)
        shapeIndices[idx] = (c + r) % 4; 

        idx++;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aTarget", new THREE.BufferAttribute(targets, 3));
    geometry.setAttribute("aShapeIndex", new THREE.BufferAttribute(shapeIndices, 1));
    // We use a custom attribute for velocity magnitude visualization in shader
    const velocityMagAttr = new Float32Array(particleCount);
    geometry.setAttribute("aVelocityMag", new THREE.BufferAttribute(velocityMagAttr, 1));

    // Shader Material for Performance & Neon Effects
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: shapeTexture },
        uColor1: { value: CONFIG.neonColor1 },
        uColor2: { value: CONFIG.neonColor2 },
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
        varying float vShapeIndex;
        varying float vVelocityMag;

        void main() {
          // Calculate UVs for the 2x2 texture atlas
          vec2 uv = gl_PointCoord;
          
          // Divide atlas into 2x2
          // 0: TL, 1: TR, 2: BL, 3: BR
          float idx = mod(vShapeIndex, 4.0);
          
          float col = mod(idx, 2.0);
          float row = floor(idx / 2.0);
          
          uv = uv * 0.5; // Scale down to quadrant
          uv.x += col * 0.5; // Shift X
          uv.y = 1.0 - uv.y; // Flip Y for texture coords
          uv.y -= row * 0.5; // Shift Y (texture coords usually 0 at bottom)

          vec4 texColor = texture2D(uTexture, uv);
          if (texColor.a < 0.1) discard;

          // Neon Logic: Mix White -> Cyan/Magenta based on velocity
          vec3 white = vec3(1.0);
          vec3 neon = mix(uColor1, uColor2, sin(vShapeIndex)*0.5 + 0.5);
          
          // Visualize speed: 0 = white, 1 = neon
          float intensity = smoothstep(0.5, 5.0, vVelocityMag);
          vec3 finalColor = mix(white, neon, intensity);

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ==================== 3. AUDIO SETUP (Procedural Sci-Fi Hum) ====================
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    let oscillator: OscillatorNode | null = null;
    let gainNode: GainNode | null = null;

    const initAudio = () => {
      if (oscillator) return;
      oscillator = audioCtx.createOscillator();
      gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(100, audioCtx.currentTime); // Low drone
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime); // Start silent

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      setAudioEnabled(false);
    };

    // ==================== 4. INTERACTION LOGIC ====================
    const mouse = new THREE.Vector2(10000, 10000); // Start off screen
    const prevMouse = new THREE.Vector2(10000, 10000);
    let mouseSpeed = 40;

    const onPointerMove = (e: PointerEvent) => {
      // Init audio on first interaction if allowed
      if (audioCtx.state === 'suspended') audioCtx.resume();
      if (!oscillator) initAudio();

      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Convert normalized coords to world coords approx
      const vec = new THREE.Vector3(x, y, 0);
      vec.unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      mouse.set(pos.x, pos.y);

      // Calculate mouse speed for audio/visual intensity
      const dist = mouse.distanceTo(prevMouse);
      mouseSpeed = THREE.MathUtils.lerp(mouseSpeed, dist, 0.20); // Smooth speed
      prevMouse.copy(mouse);
    };

    const onPointerLeave = () => {
      mouse.set(10000, 10000);
      mouseSpeed = 0;
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);

    // ==================== 5. ANIMATION LOOP ====================
    const animate = () => {
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const velMagAttr = geometry.attributes.aVelocityMag as THREE.BufferAttribute;

      // Update Audio based on mouse speed
      if (gainNode && oscillator && audioEnabled) {
        const vol = Math.min(mouseSpeed * 0.02, 0.2); // Cap volume
        const freq = 80 + mouseSpeed * 15; // Pitch shift
        
        gainNode.gain.setTargetAtTime(vol, audioCtx.currentTime, 0.1);
        oscillator.frequency.setTargetAtTime(freq, audioCtx.currentTime, 0.1);
      } else {
        mouseSpeed *= 0.9; // Decay speed if no audio context
      }

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const i2 = i * 2;

        let x = posAttr.array[i3];
        let y = posAttr.array[i3 + 1];
        let targetX = targets[i3];
        let targetY = targets[i3 + 1];

        // Physics: Distance from mouse
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // 1. Repulsion Force (The "Split")
        // If closer than radius, push away harder if mouse is moving fast
        if (dist < CONFIG.mouseRadius) {
          const force = (1 - dist / CONFIG.mouseRadius) * CONFIG.mouseForce;
          const angle = Math.atan2(dy, dx);
          
          // Add impulse to velocity
          velocities[i2] += Math.cos(angle) * force;
          velocities[i2 + 1] += Math.sin(angle) * force;
        }

        // 2. Spring Force (Return to "Perfect Alignment")
        // Pull velocity towards target position
        const ax = (targetX - x) * CONFIG.springStiffness;
        const ay = (targetY - y) * CONFIG.springStiffness;
        
        velocities[i2] += ax;
        velocities[i2 + 1] += ay;

        // 3. Damping (Water resistance)
        velocities[i2] *= CONFIG.damping;
        velocities[i2 + 1] *= CONFIG.damping;

        // Apply Velocity
        x += velocities[i2];
        y += velocities[i2 + 1];

        // Update Geometry
        posAttr.array[i3] = x;
        posAttr.array[i3 + 1] = y;

        // Calculate speed for Neon Shader
        const speed = Math.sqrt(velocities[i2]**2 + velocities[i2 + 1]**2);
        velMagAttr.array[i] = speed;
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

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(animId);
      
      if (oscillator) oscillator.stop();
      if (audioCtx) audioCtx.close();
      
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      shapeTexture.dispose();
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="relative w-full h-[400px] bg-[#1a2f4a] overflow-hidden">
      {/* Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 z-0" />

      {/* Overlay Text */}
      <div className="absolute bg-[black]/10 inset-0 flex flex-col items-center justify-start pointer-events-none z-10 select-none">
        <h2 className="text-white my-10 text-6xl md:text-8xl font-bold tracking-tighter text-center leading-none drop-shadow-lg">
          Let's work
          <span className="text-white ml-5">together!</span>
        </h2>
        
      </div>

      {/* Hint for audio */}
     
    </section>
  );
}