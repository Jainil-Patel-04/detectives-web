// src/components/StoryboardModal.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { STORYBOARDS, StoryboardScene } from '@/data/storyboards';
import type { Theme } from '@/lib/themes';

interface StoryboardModalProps {
  caseId: string;
  theme: Theme;
  onClose: () => void;
}

// --- Icons as inline SVGs to avoid extra dependencies ---
function IconX() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconVolumeOn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

function IconVolumeOff() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function IconChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default function StoryboardModal({ caseId, theme, onClose }: StoryboardModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMutedRef = useRef(isMuted);

  const scenes: StoryboardScene[] = STORYBOARDS[caseId] || [];
  const currentScene = scenes[currentIndex];

  // Keep ref in sync so the speech callback always reads the latest value
  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);

  const speakNarration = useCallback((text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isMutedRef.current) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 0.85;
    utterance.rate = 0.88;
    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  // Speak when scene changes
  useEffect(() => {
    setImageLoaded(false);
    if (currentScene) speakNarration(currentScene.narration);
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
    };
  }, [currentIndex, caseId, speakNarration, currentScene]);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        cancelSpeech();
        onClose();
      } else if (e.key === 'ArrowRight' && currentIndex < scenes.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
      } else if (e.key === 'm') {
        toggleMute();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentIndex, scenes.length, onClose]);

  function cancelSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  }

  function toggleMute() {
    const nextMuted = !isMutedRef.current;
    setIsMuted(nextMuted);
    if (nextMuted) {
      cancelSpeech();
    } else if (currentScene) {
      speakNarration(currentScene.narration);
    }
  }

  function handleClose() {
    cancelSpeech();
    onClose();
  }

  function goToScene(index: number) {
    cancelSpeech();
    setCurrentIndex(index);
  }

  function handleNext() {
    if (currentIndex < scenes.length - 1) {
      cancelSpeech();
      setCurrentIndex((i) => i + 1);
    } else {
      handleClose();
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      cancelSpeech();
      setCurrentIndex((i) => i - 1);
    }
  }

  if (!currentScene) return null;

  const progressPct = ((currentIndex + 1) / scenes.length) * 100;
  const isLast = currentIndex === scenes.length - 1;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className="relative w-full max-w-2xl rounded-lg overflow-hidden shadow-2xl"
        style={{
          backgroundColor: theme.bgPrimary,
          border: `1px solid ${theme.accent}35`,
          color: theme.bgSecondary,
        }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── PROGRESS BAR (top edge, full width) ── */}
        <div className="absolute top-0 left-0 right-0 h-0.5 z-20" style={{ backgroundColor: `${theme.accent}20` }}>
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%`, backgroundColor: theme.accent }}
          />
        </div>

        {/* ── HEADER ── */}
        <div
          className="flex items-center justify-between px-5 py-3 pt-4"
          style={{ borderBottom: `1px solid ${theme.accent}20` }}
        >
          {/* Left: scene counter + recording dot */}
          <div className="flex items-center gap-2.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: theme.accent,
                boxShadow: isPlayingAudio ? `0 0 6px ${theme.accent}` : 'none',
                animation: isPlayingAudio ? 'pulse 1.2s ease-in-out infinite' : 'none',
              }}
            />
            <span
              className="text-[11px] font-mono uppercase tracking-[0.2em] opacity-70"
              style={{ color: theme.accentSecondary }}
            >
              Director's Cut — {currentIndex + 1} / {scenes.length}
            </span>
          </div>

          {/* Right: mute + close */}
          <div className="flex items-center gap-1">
            {/* Mute button */}
            <button
              onClick={toggleMute}
              title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
              className="flex items-center justify-center w-8 h-8 rounded transition-opacity hover:opacity-100"
              style={{
                opacity: isMuted ? 0.4 : 0.75,
                color: theme.bgSecondary,
              }}
            >
              {isMuted ? <IconVolumeOff /> : <IconVolumeOn />}
            </button>

            {/* Close button */}
            <button
              onClick={handleClose}
              title="Close (Esc)"
              className="flex items-center justify-center w-8 h-8 rounded transition-all hover:opacity-100"
              style={{
                opacity: 0.6,
                color: theme.bgSecondary,
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = `${theme.accent}25`;
                (e.currentTarget as HTMLButtonElement).style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.opacity = '0.6';
              }}
            >
              <IconX />
            </button>
          </div>
        </div>

        {/* ── SCENE IMAGE ── */}
        <div className="relative h-64 sm:h-72 w-full bg-black overflow-hidden">
          {/* Low-res placeholder shimmer while loading */}
          {!imageLoaded && (
            <div
              className="absolute inset-0 animate-pulse"
              style={{ backgroundColor: `${theme.bgPrimary}` }}
            >
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `repeating-linear-gradient(0deg, ${theme.accent}20 0px, transparent 1px, transparent 4px)`,
              }} />
            </div>
          )}

          <img
            key={currentScene.imagePath}
            src={currentScene.imagePath}
            alt={currentScene.title}
            onLoad={() => setImageLoaded(true)}
            className="w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />

          {/* Vignette overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.4) 100%)',
          }} />

          {/* Film-grain texture overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            backgroundSize: '200px 200px',
          }} />

          {/* Scene title overlay on image */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pointer-events-none">
            <h3
              className="text-xl font-bold leading-tight"
              style={{ fontFamily: theme.fontDisplay, color: '#fff', textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
            >
              {currentScene.title}
            </h3>
          </div>

          {/* Prev / Next arrow buttons on image */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-0"
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <IconChevronLeft />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all"
            style={{
              backgroundColor: isLast ? theme.accent : 'rgba(0,0,0,0.5)',
              color: '#fff',
              border: `1px solid ${isLast ? theme.accent : 'rgba(255,255,255,0.2)'}`,
              backdropFilter: 'blur(4px)',
            }}
          >
            <IconChevronRight />
          </button>

          {/* "Voiceover active" badge */}
          {isPlayingAudio && (
            <div
              className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider"
              style={{
                backgroundColor: 'rgba(0,0,0,0.65)',
                border: `1px solid ${theme.accent}60`,
                color: theme.accentSecondary,
                backdropFilter: 'blur(6px)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: theme.accent }} />
              Voiceover
            </div>
          )}
        </div>

        {/* ── BODY ── */}
        <div className="px-5 py-4 space-y-3">
          {/* Camera direction line */}
          <p
            className="text-[11px] font-mono opacity-50 flex items-start gap-1.5 leading-relaxed"
            style={{ color: theme.bgSecondary }}
          >
            <span className="opacity-70 shrink-0 mt-px">🎥</span>
            <span className="italic">{currentScene.cameraPrompt}</span>
          </p>

          {/* Narration */}
          <p
            className="text-base leading-relaxed italic"
            style={{ fontFamily: theme.fontDisplay, color: theme.bgSecondary, opacity: 0.95 }}
          >
            "{currentScene.narration}"
          </p>
        </div>



        {/* ── FOOTER ACTIONS ── */}
        <div
          className="flex items-center justify-between gap-2 px-5 py-3"
          style={{ borderTop: `1px solid ${theme.accent}15` }}
        >
          {/* Replay voice */}
          <button
            onClick={() => { if (!isMuted) speakNarration(currentScene.narration); }}
            disabled={isMuted}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-opacity disabled:opacity-25 hover:opacity-100"
            style={{
              opacity: isMuted ? 0.25 : 0.65,
              color: theme.bgSecondary,
              border: `1px solid ${theme.accent}30`,
            }}
          >
            <IconVolumeOn />
            Replay
          </button>

          {/* Keyboard hint */}
          <span className="hidden sm:block text-[10px] font-mono opacity-25" style={{ color: theme.bgSecondary }}>
            ← → to navigate &nbsp;·&nbsp; M to mute &nbsp;·&nbsp; Esc to close
          </span>

          {/* Next / Finish */}
          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-5 py-2 rounded text-xs font-mono font-bold tracking-wider text-white shadow-md transition-transform hover:scale-[1.03] active:scale-[0.98]"
            style={{ backgroundColor: theme.accent }}
          >
            {isLast ? 'Close File' : (
              <>Next Scene <IconChevronRight /></>
            )}
          </button>
        </div>
      </div>

      {/* pulse keyframe injected locally */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}