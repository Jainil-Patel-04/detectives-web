'use client';

import { useRef } from 'react';
import AmbientEffect from './AmbientEffect';

export default function SpotlightHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden flex flex-col items-center justify-center text-center px-6"
      style={{ minHeight: '90vh' }}
    >
      <style>{`
        @keyframes heroKenBurns {
          0%   { transform: scale(1.08) translate(0, 0); }
          50%  { transform: scale(1.16) translate(-2%, -1%); }
          100% { transform: scale(1.08) translate(0, 0); }
        }
        @keyframes dashRun {
          to { stroke-dashoffset: -200; }
        }
        @keyframes nodePulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* real photo background, slowly panning/zooming */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/case-desk.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'heroKenBurns 22s ease-in-out infinite',
        }}
      />

      {/* dark gradient overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(8,6,4,0.92) 0%, rgba(8,6,4,0.75) 40%, rgba(8,6,4,0.35) 70%, rgba(8,6,4,0.15) 100%), linear-gradient(0deg, rgba(8,6,4,0.5) 0%, transparent 30%)',
        }}
      />

      {/* animated dashed red connection lines + pulsing nodes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.55 }}>
        <line x1="8%" y1="10%" x2="55%" y2="45%" stroke="#8b2020" strokeWidth="1" strokeDasharray="5 6" style={{ animation: 'dashRun 6s linear infinite' }} />
        <line x1="55%" y1="45%" x2="85%" y2="20%" stroke="#8b2020" strokeWidth="1" strokeDasharray="5 6" style={{ animation: 'dashRun 7s linear infinite' }} />
        <line x1="20%" y1="70%" x2="55%" y2="45%" stroke="#8b2020" strokeWidth="1" strokeDasharray="5 6" style={{ animation: 'dashRun 5.5s linear infinite' }} />
        <line x1="70%" y1="65%" x2="55%" y2="45%" stroke="#8b2020" strokeWidth="1" strokeDasharray="5 6" style={{ animation: 'dashRun 8s linear infinite' }} />
        {[
          { cx: '8%', cy: '10%' }, { cx: '55%', cy: '45%' }, { cx: '85%', cy: '20%' },
          { cx: '20%', cy: '70%' }, { cx: '70%', cy: '65%' },
        ].map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r="3" fill="#c0392b" style={{ animation: `nodePulse ${2 + i * 0.4}s ease-in-out infinite` }} />
        ))}
      </svg>

      {/* ambient drifting embers */}
      <div className="absolute inset-0 opacity-50">
        <AmbientEffect type="embers" color="#e08a2b" />
      </div>

      {/* cursor-follow spotlight */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(320px circle at var(--mx, 50%) var(--my, 40%), rgba(255,214,150,0.16), transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl md:mr-auto md:ml-0 md:text-left md:pl-8">
        <p className="text-xs tracking-[0.3em] uppercase text-red-500/80 mb-4">
          BUREAU OF UNSOLVED AFFAIRS &nbsp;&middot;&nbsp; EST. 1927 &middot; FILE ROOM OPEN
        </p>
        <p className="text-xs tracking-[0.2em] uppercase text-[#c9b896]/60 mb-6">
          NINE CASES &middot; ZERO CONFESSIONS
        </p>
        <h1
          className="text-6xl md:text-7xl font-bold leading-[1.05] mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="text-[#f4ede0]">THE DETECTIVE&apos;S</span>
          <br />
          <span className="italic" style={{ color: '#c0392b' }}>WEB</span>
        </h1>
        <p className="text-[#c9b896] text-base md:text-lg opacity-90 leading-relaxed mb-10 max-w-xl">
          Every case begins with a body and a lie. Ask the copilot anything alibis, autopsies, the
          thing nobody wrote down and watch the investigation graph wire itself together, thread by
          thread, until the truth has nowhere left to hide.
        </p>
        <a
          href="#case-room"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-sm border-2 text-sm font-semibold tracking-widest uppercase transition-colors hover:bg-red-900/20"
          style={{ borderColor: '#8b2020', color: '#f4ede0' }}
        >
          Enter the Case Room
          <span>&darr;</span>
        </a>
      </div>
    </div>
  );
}