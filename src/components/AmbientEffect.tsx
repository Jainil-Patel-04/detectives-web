'use client';
import { useEffect, useRef } from 'react';
import type { AmbientType } from '@/lib/themes';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  life: number;
  maxLife: number;
  rotation: number;
  rotationSpeed: number;
  sway: number;
  twinklePhase: number;
}

export default function AmbientEffect({ type, color = '#ffffff' }: { type: AmbientType; color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    let animationId: number;
    let particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resize);

    const config: Record<AmbientType, { count: number; size: [number, number]; speed: [number, number] }> = {
      snow: { count: 80, size: [1, 3], speed: [0.3, 1] },
      fog: { count: 6, size: [200, 400], speed: [0.05, 0.15] },
      sparkle: { count: 60, size: [1, 2], speed: [0, 0.3] },
      bubbles: { count: 30, size: [2, 6], speed: [0.5, 1.5] },
      embers: { count: 40, size: [1, 3], speed: [0.3, 0.8] },
      dust: { count: 50, size: [1, 2], speed: [0.1, 0.3] },
      leaves: { count: 25, size: [6, 12], speed: [0.4, 1.0] },
      stars: { count: 90, size: [1, 2.5], speed: [0, 0] },
      noise: { count: 0, size: [0, 0], speed: [0, 0] },
      scanlines: { count: 0, size: [0, 0], speed: [0, 0] },
    };

    const cfg = config[type];

    function makeParticle(initial = false): Particle {
      const [minS, maxS] = cfg.size;
      const [minSp, maxSp] = cfg.speed;
      return {
        x: Math.random() * width,
        y: type === 'bubbles' ? height + 20 : type === 'stars' ? Math.random() * height : initial ? Math.random() * height : -20,
        size: minS + Math.random() * (maxS - minS),
        speedX: (Math.random() - 0.5) * (type === 'snow' ? 0.5 : 0.2),
        speedY:
          type === 'bubbles' || type === 'embers'
            ? -(minSp + Math.random() * (maxSp - minSp))
            : minSp + Math.random() * (maxSp - minSp),
        opacity: 0.2 + Math.random() * 0.6,
        life: 0,
        maxLife: 200 + Math.random() * 300,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        sway: Math.random() * Math.PI * 2,
        twinklePhase: Math.random() * Math.PI * 2,
      };
    }

    if (cfg.count > 0) {
      particles = Array.from({ length: cfg.count }, () => makeParticle(true));
    }

    function drawNoise() {
      if (!ctx) return;
      const imageData = ctx.createImageData(width, height);
      const buffer = new Uint32Array(imageData.data.buffer);
      for (let i = 0; i < buffer.length; i++) {
        if (Math.random() < 0.02) {
          const shade = Math.random() * 40;
          buffer[i] = (20 << 24) | (shade << 16) | (shade << 8) | shade;
        }
      }
      ctx.putImageData(imageData, 0, 0);
    }

    function drawScanlines(offset: number) {
      if (!ctx) return;
      ctx.strokeStyle = `${color}22`;
      ctx.lineWidth = 1;
      for (let y = offset % 4; y < height; y += 4) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    function drawLeaf(p: Particle) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(-p.size, 0);
      ctx.lineTo(p.size, 0);
      ctx.stroke();
      ctx.restore();
      ctx.globalAlpha = 1;
    }

    let scanOffset = 0;
    let t = 0;

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      t += 1;

      if (type === 'noise') {
        drawNoise();
      } else if (type === 'scanlines') {
        scanOffset += 0.3;
        drawScanlines(scanOffset);
      } else if (type === 'stars') {
        particles.forEach((p) => {
          const twinkle = 0.3 + 0.5 * Math.abs(Math.sin(t * 0.02 + p.twinklePhase));
          ctx.beginPath();
          ctx.globalAlpha = twinkle;
          ctx.fillStyle = color;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        });
      } else if (type === 'leaves') {
        particles.forEach((p) => {
          p.y += p.speedY;
          p.x += Math.sin(t * 0.02 + p.sway) * 0.6;
          p.rotation += p.rotationSpeed;
          p.life++;
          if (p.y > height + p.size) {
            Object.assign(p, makeParticle(false));
          }
          drawLeaf(p);
        });
      } else {
        particles.forEach((p) => {
          p.x += p.speedX;
          p.y += p.speedY;
          p.life++;

          if (type === 'fog') {
            if (p.x > width + p.size) p.x = -p.size;
            if (p.x < -p.size) p.x = width + p.size;
          } else if (p.y < -p.size || p.y > height + p.size || p.life > p.maxLife) {
            Object.assign(p, makeParticle(false));
          }

          ctx.beginPath();
          if (type === 'fog') {
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
            gradient.addColorStop(0, `${color}15`);
            gradient.addColorStop(1, `${color}00`);
            ctx.fillStyle = gradient;
          } else {
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = color;
          }
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        });
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [type, color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: type === 'noise' || type === 'scanlines' ? 'overlay' : 'screen' }}
    />
  );
}