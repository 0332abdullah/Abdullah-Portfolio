import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  sizeMultiplier: number;
}

export default function FlowingCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; radius: number }>({
    x: -1000,
    y: -1000,
    radius: 170,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number | undefined;
    let particles: Particle[] = [];
    let time = 0;
    let isVisible = true;
    let isPageVisible = document.visibilityState === "visible";
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    
    // Scale particle density gracefully across screen sizes
    const particleCount = isMobile
      ? 28
      : Math.max(36, Math.min(60, Math.floor(window.innerWidth / 24)));

    // Set canvas dimensions
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * pixelRatio);
      canvas.height = Math.floor(rect.height * pixelRatio);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const colors = [
        "rgba(255, 68, 0,",   // Brand Vivid Orange
        "rgba(255, 255, 255,", // Bright Stellar White
        "rgba(245, 158, 11,",   // Warm Amber Gold
        "rgba(150, 150, 150,", // Muted Slate Star
      ];

      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 2.2 + 0.8;
        const baseAlpha = Math.random() * 0.45 + 0.15;
        const colorPrefix = colors[Math.floor(Math.random() * colors.length)];

        particles.push({
          x: Math.random() * canvas.clientWidth,
          y: Math.random() * canvas.clientHeight,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius,
          color: colorPrefix,
          alpha: baseAlpha,
          baseAlpha,
          pulseSpeed: Math.random() * 0.015 + 0.005,
          pulsePhase: Math.random() * Math.PI * 2,
          sizeMultiplier: Math.random() * 0.3 + 0.85,
        });
      }
    };

    // Auto-resizing using ResizeObserver
    const observer = new ResizeObserver(() => {
      resizeCanvas();
    });
    observer.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    resizeCanvas();

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);
      time += 0.45;

      const mouse = mouseRef.current;

      // 1. Draw flowing, continuous mathematical glow ribbons in the background
      ctx.shadowBlur = 0; // Ensure shadow blur doesn't slow down waves
      
      // Beautiful warm wave 1 (Brand orange glow wireframe)
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 68, 0, 0.025)";
      ctx.lineWidth = 1.2;
      for (let x = 0; x < width; x += 15) {
        const y = height * 0.5 + 
                  Math.sin(x * 0.0025 + time * 0.005) * 70 + 
                  Math.cos(x * 0.001 - time * 0.003) * 35;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Beautiful amber wave 2 (Golden light stream)
      ctx.beginPath();
      ctx.strokeStyle = "rgba(245, 158, 11, 0.018)";
      ctx.lineWidth = 1.0;
      for (let x = 0; x < width; x += 15) {
        const y = height * 0.45 + 
                  Math.sin(x * 0.0015 - time * 0.004) * 90 + 
                  Math.cos(x * 0.003 + time * 0.002) * 45;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 2. Update and draw particles with interactive physics
      particles.forEach((p) => {
        // Continuous, beautiful slow fluid movement
        // We simulate a gentle vector wave force shifting velocities over time
        const flowAngle = (time * 0.002) + (p.y * 0.003) + (p.x * 0.001);
        const flowX = Math.cos(flowAngle) * 0.08;
        const flowY = Math.sin(flowAngle) * 0.08;

        p.x += p.vx + flowX;
        p.y += p.vy + flowY;

        // Wave phase logic for smooth breathing
        p.pulsePhase += p.pulseSpeed;
        const sizeBreathe = p.radius * (1 + Math.sin(p.pulsePhase) * 0.25 * p.sizeMultiplier);
        const alphaBreathe = p.baseAlpha * (1 + Math.sin(p.pulsePhase) * 0.2);

        // Map boundary teleport matching a continuous loop space
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Mouse attraction & repulsion physics
        p.alpha = Math.max(0.08, Math.min(0.9, alphaBreathe));
        if (mouse.x !== -1000) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            
            // Push particles out slightly, with inertia response
            const pushX = Math.cos(angle) * force * 1.5;
            const pushY = Math.sin(angle) * force * 1.5;

            p.x += pushX;
            p.y += pushY;
            p.alpha = Math.min(0.95, p.alpha + force * 0.45);
          }
        }

        // Draw double layer glowing element (highly responsive & modern visual styling)
        // Layer 1: Ambient background aura for accented nodes
        if (p.color.includes("255, 68")) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, sizeBreathe * 3.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 68, 0, ${p.alpha * 0.16})`;
          ctx.fill();
        } else if (p.color.includes("245, 158")) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, sizeBreathe * 3.0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha * 0.12})`;
          ctx.fill();
        }

        // Layer 2: Core solid/bright star element
        ctx.beginPath();
        ctx.arc(p.x, p.y, sizeBreathe, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      });

      // 3. Draw high-fidelity custom constellations (distance-based elegant net lines)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 135; // slightly wider search range for organic nets

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Beautiful transitions/gradients mapped to brand accent highlights
            if (p1.color.includes("255, 68") || p2.color.includes("255, 68")) {
              ctx.strokeStyle = `rgba(255, 68, 0, ${opacity * 0.95})`;
              ctx.lineWidth = 0.85;
            } else if (p1.color.includes("245, 158") || p2.color.includes("245, 158")) {
              ctx.strokeStyle = `rgba(245, 158, 11, ${opacity * 0.8})`;
              ctx.lineWidth = 0.7;
            } else {
              ctx.strokeStyle = `rgba(180, 180, 180, ${opacity * 0.55})`;
              ctx.lineWidth = 0.5;
            }
            ctx.stroke();
          }
        }
      }

      if (isVisible && isPageVisible) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    const handleVisibilityChange = () => {
      isPageVisible = document.visibilityState === "visible";
      if (isPageVisible && isVisible && animationFrameId === undefined) {
        draw();
      }
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && isPageVisible && animationFrameId === undefined) {
          draw();
        }
        if (!isVisible && animationFrameId !== undefined) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = undefined;
        }
      },
      { threshold: 0 }
    );
    visibilityObserver.observe(container);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    draw();

    return () => {
      if (animationFrameId !== undefined) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      id="flowing-canvas-container"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-85"
        style={{ position: "absolute", top: 0, left: 0 }}
        id="constellation-canvas"
      />
    </div>
  );
}
