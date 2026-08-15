"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AmbientEffect from "@/components/AmbientEffect";
import HeroVisual from "@/components/Herovisual";
import BackButton from "@/components/BackButton";
import { getTheme } from "@/lib/themes";
import { getCaseIntro } from "@/lib/caseIntros";
import { getCaseBrief } from "@/lib/caseBriefs";

interface Suspect {
  id: string;
  name: string;
  occupation: string;
  teaser?: string; // used here as "motive"
}

interface EvidenceItem {
  id: string;
  name: string;
}

export default function CaseIntroPage() {
  const params = useParams();
  const router = useRouter();
  const caseId = params.caseId as string;
  const theme = getTheme(caseId);
  const intro = getCaseIntro(caseId);
  const brief = getCaseBrief(caseId);

  const [suspects, setSuspects] = useState<Suspect[]>([]);
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/cases/${caseId}/suspects`).then((r) => r.json()),
      fetch(`/api/cases/${caseId}/evidence`).then((r) => r.json()),
    ])
      .then(([s, e]) => {
        setSuspects(s.suspects || []);
        setEvidence(e.evidence || []);
      })
      .finally(() => setLoading(false));
  }, [caseId]);

  useEffect(() => {
    if (!intro || !brief) router.push(`/case/${caseId}`);
  }, [intro, brief, caseId, router]);

  if (!intro || !brief) return null;

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: theme.bgPrimary }}
    >
      <BackButton theme={theme} />
      <AmbientEffect type="stars" color="#ffffff" />
      <AmbientEffect type={theme.ambient} color={theme.accentSecondary} />
      <div className="opacity-40">
        <HeroVisual type={theme.heroVisual} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        {/* header eyebrow row */}
        <div
          className="flex items-center justify-between text-[11px] tracking-[0.25em] uppercase mb-6 opacity-60"
          style={{ color: theme.accentSecondary }}
        >
          <span>{brief.locationYear}</span>
          <span>CASE NO. {brief.caseNumber}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* LEFT: case file card */}
          <div
            className="lg:col-span-2 rounded-sm p-6 relative shadow-2xl"
            style={{
              backgroundColor: theme.bgSecondary,
              color: theme.textPrimary,
            }}
          >
            <div
              className="absolute top-4 right-4 text-[10px] font-bold tracking-widest px-2 py-1 border-2 rotate-6"
              style={{ borderColor: theme.accent, color: theme.accent }}
            >
              CONFIDENTIAL
            </div>

            <p className="text-[10px] tracking-widest uppercase opacity-50 mb-1">
              {brief.locationYear}
            </p>
            <h1
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {intro.titleLine1} {intro.titleLine2}
            </h1>

            <div
              className="grid grid-cols-2 gap-4 text-sm mb-4 pb-4 border-b"
              style={{ borderColor: `${theme.textPrimary}20` }}
            >
              <div>
                <p className="text-[10px] uppercase tracking-wide opacity-50 mb-0.5">
                  Victim
                </p>
                <p className="font-semibold">{brief.victimName}</p>
                <p className="text-xs opacity-60">{brief.victimDetail}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wide opacity-50 mb-0.5">
                  Conditions
                </p>
                <p className="text-sm">{brief.conditions}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wide opacity-50 mb-0.5">
                  Suspects
                </p>
                <p className="text-sm">
                  {loading ? "\u2026" : `${suspects.length} named`}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wide opacity-50 mb-0.5">
                  Evidence
                </p>
                <p className="text-sm">
                  {loading ? "\u2026" : `${evidence.length} exhibits`}
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed opacity-85 mb-4">
              {intro.atmosphericText}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {brief.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] tracking-wide uppercase px-2 py-0.5 rounded-full border opacity-70"
                  style={{ borderColor: `${theme.textPrimary}40` }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <p
              className="italic text-sm border-l-2 pl-3 opacity-80"
              style={{ borderColor: theme.accent }}
            >
              {brief.hookQuestion}
            </p>
          </div>

          {/* RIGHT: the wall of suspects */}
          <div className="lg:col-span-3">
            <p
              className="text-[11px] tracking-[0.25em] uppercase mb-3 opacity-60"
              style={{ color: theme.accentSecondary }}
            >
              The Wall
            </p>
            {loading ? (
              <p
                className="text-sm italic opacity-50"
                style={{ color: theme.bgSecondary }}
              >
                Pulling the guest list...
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suspects.map((s) => (
                  <div
                    key={s.id}
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    }}
                  >
                    <h3
                      className="font-semibold"
                      style={{ color: theme.bgSecondary }}
                    >
                      {s.name}
                    </h3>
                    <p
                      className="text-[10px] tracking-wide uppercase mb-2"
                      style={{ color: theme.accent }}
                    >
                      {s.occupation}
                    </p>
                    <p
                      className="text-xs opacity-75 mb-1"
                      style={{ color: theme.bgSecondary }}
                    >
                      <span className="opacity-60">Alibi:</span>{" "}
                      {brief.alibis[s.id] || "None offered."}
                    </p>
                    <p
                      className="text-xs opacity-75"
                      style={{ color: theme.bgSecondary }}
                    >
                      <span className="opacity-60">Motive:</span>{" "}
                      {s.teaser || "Unclear."}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* timeline */}
        <p
          className="text-[11px] tracking-[0.25em] uppercase mt-12 mb-3 opacity-60"
          style={{ color: theme.accentSecondary }}
        >
          That Night, In Order
        </p>
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-8 border-b"
          style={{ borderColor: `${theme.accentSecondary}20` }}
        >
          {/* {brief.timeline.map((step, i) => (
            <div key={i} className="p-4 rounded" style={{ backgroundColor: `${theme.bgPrimary}60` }}> */}
          {brief.timeline.map((step, i) => (
            <div
              key={i}
              className="p-4 rounded-lg"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              <p
                className="text-2xl font-bold opacity-30 mb-1"
                style={{ color: theme.bgSecondary }}
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <p
                className="text-xs tracking-wide mb-1"
                style={{ color: theme.accent }}
              >
                {step.time}
              </p>
              <p
                className="text-sm opacity-80"
                style={{ color: theme.bgSecondary }}
              >
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* bagged and tagged */}
        <p
          className="text-[11px] tracking-[0.25em] uppercase mt-8 mb-3 opacity-60"
          style={{ color: theme.accentSecondary }}
        >
          Bagged &amp; Tagged
        </p>
        <div className="flex flex-wrap gap-2 mb-12">
          {evidence.map((ev) => (
            <span
              key={ev.id}
              className="text-xs px-3 py-1.5 rounded border"
              style={{
                borderColor: `${theme.accentSecondary}40`,
                color: theme.bgSecondary,
              }}
            >
              {ev.name}
            </span>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => router.push(`/case/${caseId}`)}
            className="px-8 py-3 rounded font-semibold tracking-wide uppercase text-sm transition-transform hover:scale-105"
            style={{ backgroundColor: theme.accent, color: "#fff" }}
          >
            Begin Investigation
          </button>
        </div>
      </div>
    </div>
  );
}
