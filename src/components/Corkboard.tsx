'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import type { Theme } from '@/lib/themes';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

// --- deterministic pseudo-random helpers ---
function hashStr(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededTilt(id: string): number {
  const h = hashStr(id) % 100;
  return ((h / 100) * 30 - 15) * (Math.PI / 180); // -15deg to +15deg
}

function nodeOpacity(node: any): number {
  if (!node.__addedAt) return 1;
  const elapsed = Date.now() - node.__addedAt;
  return Math.max(0, Math.min(1, elapsed / 400));
}

// --- portrait image cache, shared across renders ---
const portraitCache = new Map<string, HTMLImageElement>();

function getPortrait(seed: string, onLoad: () => void): HTMLImageElement | null {
  const cached = portraitCache.get(seed);
  if (cached && cached.complete) return cached;
  if (cached) return null; // still loading

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = `https://api.dicebear.com/9.x/personas/png?seed=${encodeURIComponent(seed)}&size=80&backgroundType=solid&backgroundColor=e8dcc0`;
  img.onload = onLoad;
  portraitCache.set(seed, img);
  return null;
}

function drawPersonNode(ctx: CanvasRenderingContext2D, node: any, theme: Theme, scale: number, onImgLoad: () => void) {
  const w = 46, h = 56;
  const tilt = seededTilt(node.id);
  const alpha = nodeOpacity(node);

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(node.x, node.y);
  ctx.rotate(tilt);

  ctx.shadowColor = 'rgba(0,0,0,0.55)';
  ctx.shadowBlur = 7;
  ctx.shadowOffsetY = 2;

  ctx.fillStyle = '#f4ede0';
  ctx.beginPath();
  ctx.roundRect(-w / 2, -h / 2, w, h, 3);
  ctx.fill();
  ctx.shadowColor = 'transparent';

  const photoSize = 30;
  const cx = 0, cy = -h / 2 + 8 + photoSize / 2;

  const img = getPortrait(node.label || node.name || node.id, onImgLoad);
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, photoSize / 2, 0, Math.PI * 2);
  ctx.clip();
  if (img) {
    ctx.drawImage(img, cx - photoSize / 2, cy - photoSize / 2, photoSize, photoSize);
  } else {
    ctx.fillStyle = theme.nodeColor;
    ctx.fillRect(cx - photoSize / 2, cy - photoSize / 2, photoSize, photoSize);
  }
  ctx.restore();

  ctx.fillStyle = theme.accent;
  ctx.beginPath();
  ctx.arc(0, -h / 2 - 2, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = `${10 / scale}px monospace`;
  ctx.fillStyle = theme.bgSecondary;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(node.label || node.name || '', node.x, node.y + h / 2 + 4);
  ctx.restore();
}

// --- evidence type icons ---
function drawFingerprint(ctx: CanvasRenderingContext2D, size: number) {
  ctx.strokeStyle = '#3a2f22';
  ctx.lineWidth = 1;
  for (let r = 3; r <= size; r += 3) {
    ctx.beginPath();
    ctx.arc(0, 1, r, Math.PI * 0.15, Math.PI * 1.15);
    ctx.stroke();
  }
}

function drawDNA(ctx: CanvasRenderingContext2D, size: number) {
  ctx.strokeStyle = '#3a2f22';
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  for (let y = -size; y <= size; y += 2) {
    const x1 = Math.sin(y * 0.5) * size * 0.4;
    ctx.lineTo(x1, y);
  }
  ctx.stroke();
  ctx.beginPath();
  for (let y = -size; y <= size; y += 2) {
    const x2 = -Math.sin(y * 0.5) * size * 0.4;
    ctx.lineTo(x2, y);
  }
  ctx.stroke();
  for (let y = -size + 2; y <= size - 2; y += 5) {
    const x1 = Math.sin(y * 0.5) * size * 0.4;
    const x2 = -Math.sin(y * 0.5) * size * 0.4;
    ctx.beginPath();
    ctx.moveTo(x1, y);
    ctx.lineTo(x2, y);
    ctx.stroke();
  }
}

function drawCamera(ctx: CanvasRenderingContext2D, size: number) {
  ctx.fillStyle = '#3a2f22';
  ctx.beginPath();
  ctx.roundRect(-size, -size * 0.6, size * 2, size * 1.2, 2);
  ctx.fill();
  ctx.fillStyle = '#d8c8a0';
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#3a2f22';
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2);
  ctx.fill();
}

function drawEvidenceNode(ctx: CanvasRenderingContext2D, node: any, theme: Theme, scale: number) {
  const w = 42, h = 34;
  const tilt = seededTilt(node.id + 'e');
  const alpha = nodeOpacity(node);

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(node.x, node.y);
  ctx.rotate(tilt);

  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 6;
  ctx.shadowOffsetY = 2;

  ctx.fillStyle = '#d8c8a0';
  ctx.beginPath();
  ctx.moveTo(-w / 2, -h / 2);
  ctx.lineTo(w / 2 - 8, -h / 2);
  ctx.lineTo(w / 2, -h / 2 + 8);
  ctx.lineTo(w / 2, h / 2);
  ctx.lineTo(-w / 2, h / 2);
  ctx.closePath();
  ctx.fill();
  ctx.shadowColor = 'transparent';

  ctx.fillStyle = '#c2b088';
  ctx.beginPath();
  ctx.moveTo(w / 2 - 8, -h / 2);
  ctx.lineTo(w / 2, -h / 2 + 8);
  ctx.lineTo(w / 2 - 8, -h / 2 + 8);
  ctx.closePath();
  ctx.fill();

  ctx.save();
  ctx.translate(0, 2);
  const evType = (node.type || '').toLowerCase();
  if (evType.includes('dna')) drawDNA(ctx, 8);
  else if (evType.includes('digital')) drawCamera(ctx, 8);
  else drawFingerprint(ctx, 9);
  ctx.restore();

  ctx.restore();

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = `${10 / scale}px monospace`;
  ctx.fillStyle = theme.bgSecondary;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(node.label || node.name || '', node.x, node.y + h / 2 + 4);
  ctx.restore();
}

function drawLocationNode(ctx: CanvasRenderingContext2D, node: any, theme: Theme, scale: number) {
  const size = 14;
  const alpha = nodeOpacity(node);

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(node.x, node.y);

  ctx.shadowColor = 'rgba(0,0,0,0.4)';
  ctx.shadowBlur = 4;

  ctx.fillStyle = theme.accentSecondary;
  ctx.beginPath();
  ctx.arc(0, -size, size * 0.6, 0, Math.PI * 2);
  ctx.moveTo(-size * 0.5, -size + 3);
  ctx.quadraticCurveTo(0, size, size * 0.5, -size + 3);
  ctx.fill();

  ctx.fillStyle = '#1a1410';
  ctx.beginPath();
  ctx.arc(0, -size, size * 0.25, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = `${10 / scale}px monospace`;
  ctx.fillStyle = theme.bgSecondary;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(node.label || node.name || '', node.x, node.y + 6);
  ctx.restore();
}

// approx "radius" per node type, used to keep strings clear of card art
function nodeRadius(node: any): number {
  const group = (node.group || '').toLowerCase();
  if (group === 'person') return 32;
  if (group === 'evidence') return 26;
  if (group === 'location') return 16;
  return 10;
}

export default function Corkboard({ graphData, theme }: { graphData: any; theme: Theme }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [, forceRerender] = useState(0);

  useEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    }
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // give nodes more breathing room so strings have somewhere to be visible
  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force('charge')?.strength(-260);
      fgRef.current.d3Force('link')?.distance(150);
      fgRef.current.d3ReheatSimulation?.();
    }
  }, [graphData.nodes.length]);

  return (
      <ForceGraph2D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        backgroundColor="rgba(0,0,0,0)"
        cooldownTime={6000}
        nodeCanvasObject={(node: any, ctx, scale) => {
          const group = (node.group || '').toLowerCase();
          if (group === 'person') drawPersonNode(ctx, node, theme, scale, () => forceRerender((t) => t + 1));
          else if (group === 'evidence') drawEvidenceNode(ctx, node, theme, scale);
          else if (group === 'location') drawLocationNode(ctx, node, theme, scale);
          else {
            const alpha = nodeOpacity(node);
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle = theme.nodeColor;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.font = `${10 / scale}px monospace`;
            ctx.fillStyle = theme.bgSecondary;
            ctx.textAlign = 'center';
            ctx.fillText(node.label || node.name || '', node.x, node.y + 14);
            ctx.restore();
          }
        }}
        nodePointerAreaPaint={(node: any, color, ctx) => {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 24, 0, Math.PI * 2);
          ctx.fill();
        }}
        linkCanvasObject={(link: any, ctx) => {
          const start = link.source;
          const end = link.target;
          if (typeof start !== 'object' || typeof end !== 'object') return;

          const dx = end.x - start.x, dy = end.y - start.y;
          const dist = Math.hypot(dx, dy) || 1;
          const ux = dx / dist, uy = dy / dist;
          const px = -uy, py = ux; // perpendicular unit vector

          const r1 = nodeRadius(start), r2 = nodeRadius(end);
          const sx = start.x + ux * r1, sy = start.y + uy * r1;
          const ex = end.x - ux * r2, ey = end.y - uy * r2;

          const bow = Math.max(15, dist * 0.12);
          const midX = (sx + ex) / 2 + px * bow;
          const midY = (sy + ey) / 2 + py * bow;

          // "epiphany" glow: recently-added links pulse bright, then settle
          const age = link.__addedAt ? Date.now() - link.__addedAt : Infinity;
          const glowWindow = 4500;
          const isRecent = age < glowWindow;
          const glowStrength = isRecent ? 1 - age / glowWindow : 0;

          ctx.save();
          if (isRecent) {
            ctx.strokeStyle = theme.accentSecondary;
            ctx.lineWidth = 1.6 + glowStrength * 2.5;
            ctx.shadowColor = theme.accentSecondary;
            ctx.shadowBlur = 4 + glowStrength * 14;
          } else {
            ctx.strokeStyle = `${theme.accent}b0`;
            ctx.lineWidth = 1.6;
            ctx.shadowColor = 'rgba(0,0,0,0.35)';
            ctx.shadowBlur = 2;
          }
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.quadraticCurveTo(midX, midY, ex, ey);
          ctx.stroke();

          ctx.shadowColor = 'transparent';
          ctx.fillStyle = isRecent ? theme.accentSecondary : theme.accent;
          ctx.beginPath();
          ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }}
        linkColor={() => 'rgba(0,0,0,0)'}
        onNodeClick={(node: any) => console.log('clicked node:', node)}
      />
  );
}