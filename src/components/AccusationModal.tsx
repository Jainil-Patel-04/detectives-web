// "use client";

// import { useEffect, useState } from "react";
// import type { Theme } from "@/lib/themes";

// interface Suspect {
//   id: string;
//   name: string;
//   occupation: string;
// }

// interface VerdictResult {
//   verdict: "full" | "partial" | "incorrect";
//   message: string;
//   solution: string | null;
// }

// export default function AccusationModal({
//   caseId,
//   theme,
//   onClose,
// }: {
//   caseId: string;
//   theme: Theme;
//   onClose: () => void;
// }) {
//   const [suspects, setSuspects] = useState<Suspect[]>([]);
//   const [selected, setSelected] = useState<Set<string>>(new Set());
//   const [result, setResult] = useState<VerdictResult | null>(null);
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     fetch(`/api/cases/${caseId}/suspects`)
//       .then((res) => {
//         if (!res.ok) throw new Error(`Suspects fetch failed: ${res.status}`);
//         return res.json();
//       })
//       .then((data) => setSuspects(data.suspects || []))
//       .catch((err) =>
//         console.error("Failed to load suspects for accusation:", err),
//       );
//   }, [caseId]);
//   function toggle(id: string) {
//     setSelected((prev) => {
//       const next = new Set(prev);
//       if (next.has(id)) next.delete(id);
//       else next.add(id);
//       return next;
//     });
//   }

//   async function submitAccusation() {
//     if (selected.size === 0) return;
//     setSubmitting(true);
//     try {
//       const res = await fetch(`/api/cases/${caseId}/accuse`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ suspectIds: Array.from(selected) }),
//       });
//       const data = await res.json();
//       setResult(data);
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   function tryAgain() {
//     setResult(null);
//     // deliberately keep `selected` as-is so the player can adjust rather than starting blank
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
//       <div
//         className="w-full max-w-lg rounded-lg p-6 max-h-[85vh] overflow-y-auto"
//         style={{ backgroundColor: theme.bgSecondary, color: theme.textPrimary }}
//       >
//         {!result && (
//           <>
//             <h2
//               className="text-2xl font-bold mb-1"
//               style={{ fontFamily: theme.fontDisplay }}
//             >
//               Name Your Suspect(s)
//             </h2>
//             <p className="text-sm opacity-70 mb-5">
//               Select everyone you believe was involved. You may name one person,
//               or several — choose carefully, this is your final call.
//             </p>

//             <div className="space-y-2 mb-6">
//               {suspects.map((s) => (
//                 <label
//                   key={s.id}
//                   className="flex items-start gap-3 p-3 rounded border cursor-pointer transition-colors"
//                   style={{
//                     borderColor: selected.has(s.id)
//                       ? theme.accent
//                       : `${theme.accent}30`,
//                     backgroundColor: selected.has(s.id)
//                       ? `${theme.accent}15`
//                       : "transparent",
//                   }}
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selected.has(s.id)}
//                     onChange={() => toggle(s.id)}
//                     className="mt-1"
//                   />
//                   <div>
//                     <p className="font-semibold">{s.name}</p>
//                     <p className="text-xs opacity-60">{s.occupation}</p>
//                   </div>
//                 </label>
//               ))}
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={onClose}
//                 className="flex-1 px-4 py-2 rounded border"
//                 style={{ borderColor: `${theme.accent}50` }}
//               >
//                 Keep Investigating
//               </button>
//               <button
//                 onClick={submitAccusation}
//                 disabled={selected.size === 0 || submitting}
//                 className="flex-1 px-4 py-2 rounded text-white font-semibold disabled:opacity-40"
//                 style={{ backgroundColor: theme.accent }}
//               >
//                 {submitting ? "Submitting..." : "Make Accusation"}
//               </button>
//             </div>
//           </>
//         )}

//         {result && (
//           <>
//             <h2
//               className="text-2xl font-bold mb-3"
//               style={{
//                 fontFamily: theme.fontDisplay,
//                 color:
//                   result.verdict === "full" ? theme.accent : theme.textPrimary,
//               }}
//             >
//               {result.verdict === "full"
//                 ? "Case Closed"
//                 : result.verdict === "partial"
//                   ? "You're Close"
//                   : "Not Quite"}
//             </h2>
//             <p className="mb-5 opacity-85">{result.message}</p>

//             {result.solution && (
//               <div
//                 className="p-4 rounded mb-5 italic text-sm leading-relaxed"
//                 style={{
//                   backgroundColor: `${theme.accent}10`,
//                   borderLeft: `3px solid ${theme.accent}`,
//                 }}
//               >
//                 {result.solution}
//               </div>
//             )}

//             <div className="flex gap-3">
//               {result.verdict !== "full" && (
//                 <button
//                   onClick={tryAgain}
//                   className="flex-1 px-4 py-2 rounded border"
//                   style={{ borderColor: `${theme.accent}50` }}
//                 >
//                   Reconsider
//                 </button>
//               )}
//               <button
//                 onClick={onClose}
//                 className="flex-1 px-4 py-2 rounded text-white font-semibold"
//                 style={{ backgroundColor: theme.accent }}
//               >
//                 {result.verdict === "full" ? "Close" : "Keep Investigating"}
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


// src/components/AccusationModal.tsx
"use client";

import { useEffect, useState } from "react";
import type { Theme } from "@/lib/themes";
import StoryboardModal from "@/components/StoryboardModal"; // <-- 1. Import the modal

interface Suspect {
  id: string;
  name: string;
  occupation: string;
}

interface VerdictResult {
  verdict: "full" | "partial" | "incorrect";
  message: string;
  solution: string | null;
}

export default function AccusationModal({
  caseId,
  theme,
  onClose,
}: {
  caseId: string;
  theme: Theme;
  onClose: () => void;
}) {
  const [suspects, setSuspects] = useState<Suspect[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [result, setResult] = useState<VerdictResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showStoryboard, setShowStoryboard] = useState(false); // <-- 2. Add state

  useEffect(() => {
    fetch(`/api/cases/${caseId}/suspects`)
      .then((res) => {
        if (!res.ok) throw new Error(`Suspects fetch failed: ${res.status}`);
        return res.json();
      })
      .then((data) => setSuspects(data.suspects || []))
      .catch((err) =>
        console.error("Failed to load suspects for accusation:", err),
      );
  }, [caseId]);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function submitAccusation() {
    if (selected.size === 0) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/cases/${caseId}/accuse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ suspectIds: Array.from(selected) }),
      });
      const data = await res.json();
      setResult(data);
    } finally {
      setSubmitting(false);
    }
  }

  function tryAgain() {
    setResult(null);
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
        <div
          className="w-full max-w-lg rounded-lg p-6 max-h-[85vh] overflow-y-auto"
          style={{ backgroundColor: theme.bgSecondary, color: theme.textPrimary }}
        >
          {!result && (
            <>
              <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: theme.fontDisplay }}>
                Name Your Suspect(s)
              </h2>
              <p className="text-sm opacity-70 mb-5">
                Select everyone you believe was involved. You may name one person,
                or several — choose carefully, this is your final call.
              </p>

              <div className="space-y-2 mb-6">
                {suspects.map((s) => (
                  <label
                    key={s.id}
                    className="flex items-start gap-3 p-3 rounded border cursor-pointer transition-colors"
                    style={{
                      borderColor: selected.has(s.id) ? theme.accent : `${theme.accent}30`,
                      backgroundColor: selected.has(s.id) ? `${theme.accent}15` : "transparent",
                    }}
                  >
                    <input type="checkbox" checked={selected.has(s.id)} onChange={() => toggle(s.id)} className="mt-1" />
                    <div>
                      <p className="font-semibold">{s.name}</p>
                      <p className="text-xs opacity-60">{s.occupation}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={onClose} className="flex-1 px-4 py-2 rounded border" style={{ borderColor: `${theme.accent}50` }}>
                  Keep Investigating
                </button>
                <button
                  onClick={submitAccusation}
                  disabled={selected.size === 0 || submitting}
                  className="flex-1 px-4 py-2 rounded text-white font-semibold disabled:opacity-40"
                  style={{ backgroundColor: theme.accent }}
                >
                  {submitting ? "Submitting..." : "Make Accusation"}
                </button>
              </div>
            </>
          )}

          {result && (
            <>
              <h2
                className="text-2xl font-bold mb-3"
                style={{ fontFamily: theme.fontDisplay, color: result.verdict === "full" ? theme.accent : theme.textPrimary }}
              >
                {result.verdict === "full" ? "Case Closed" : result.verdict === "partial" ? "You're Close" : "Not Quite"}
              </h2>
              <p className="mb-5 opacity-85">{result.message}</p>

              {result.solution && (
                <div
                  className="p-4 rounded mb-5 italic text-sm leading-relaxed"
                  style={{ backgroundColor: `${theme.accent}10`, borderLeft: `3px solid ${theme.accent}` }}
                >
                  {result.solution}
                </div>
              )}

              {/* 3. The New Storyboard Button */}
              <button
                onClick={() => setShowStoryboard(true)}
                className="w-full mb-4 py-3 rounded text-white font-semibold text-sm tracking-wider uppercase shadow-lg transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: theme.accentSecondary, color: "#111" }}
              >
              Watch Director's Cut
              </button>

              <div className="flex gap-3">
                {result.verdict !== "full" && (
                  <button onClick={tryAgain} className="flex-1 px-4 py-2 rounded border" style={{ borderColor: `${theme.accent}50` }}>
                    Reconsider
                  </button>
                )}
                <button onClick={onClose} className="flex-1 px-4 py-2 rounded text-white font-semibold" style={{ backgroundColor: theme.accent }}>
                  {result.verdict === "full" ? "Close" : "Keep Investigating"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 4. Render the modal conditionally */}
      {showStoryboard && (
        <StoryboardModal caseId={caseId} theme={theme} onClose={() => setShowStoryboard(false)} />
      )}
    </>
  );
}