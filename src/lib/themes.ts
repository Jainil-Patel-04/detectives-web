export interface Theme {
  name: string;
  bgPrimary: string;
  bgSecondary: string;
  textPrimary: string;
  accent: string;
  accentSecondary: string;
  nodeColor: string;
  ambient: AmbientType;
  fontDisplay: string;
  heroVisual: 'moon' | 'mountain' | 'lighthouse' | 'train' | 'skyline' | 'roulette' | 'submarine' | 'curtain' | 'greenhouse' | 'tunnel' | 'none';
}

export type AmbientType =
  | "noise"
  | "snow"
  | "fog"
  | "sparkle"
  | "bubbles"
  | "embers"
  | "dust"
  | "scanlines"
  | "leaves"
  | "stars";

export const themes: Record<string, Theme> = {
  case_01: {
    name: "Midnight Portrait",
    bgPrimary: "#0d0e1a",
    bgSecondary: "#f4e9d8",
    textPrimary: "#1a1410",
    accent: "#8b2020",
    accentSecondary: "#c9a86a",
    nodeColor: "#d4a373",
    ambient: "leaves",
    fontDisplay: "'Playfair Display', serif",
    heroVisual: "moon",
  },

  case_02: {
    // Poison at the Summit
    name: "Poison at the Summit",
    bgPrimary: "#0f1419",
    bgSecondary: "#e8ecef",
    textPrimary: "#0f1419",
    accent: "#b91c1c",
    accentSecondary: "#38bdf8",
    nodeColor: "#94a3b8",
    ambient: "scanlines",
    fontDisplay: "'Space Grotesk', sans-serif",
    heroVisual: "skyline",
  },
  case_03: {
    // The Lighthouse Disappearance
    name: "The Lighthouse Disappearance",
    bgPrimary: "#111d22",
    bgSecondary: "#e6ecec",
    textPrimary: "#132024",
    accent: "#7a3b2e",
    accentSecondary: "#5fa8a0",
    nodeColor: "#7fb3ab",
    ambient: "fog",
    fontDisplay: "'Playfair Display', serif",
    heroVisual: "lighthouse",
  },
  case_04: {
    // The Bullet Train Sabotage
    name: "The Bullet Train Sabotage",
    bgPrimary: "#0c0d10",
    bgSecondary: "#e5e5e5",
    textPrimary: "#111111",
    accent: "#d97706",
    accentSecondary: "#e11d48",
    nodeColor: "#a1a1aa",
    ambient: "scanlines",
    fontDisplay: "'Space Grotesk', sans-serif",
    heroVisual: "train",
  },
  case_05: {
    // The Casino Cipher
    name: "The Casino Cipher",
    bgPrimary: "#12071c",
    bgSecondary: "#f3e8ff",
    textPrimary: "#1e0a2e",
    accent: "#db2777",
    accentSecondary: "#22d3ee",
    nodeColor: "#e879f9",
    ambient: "sparkle",
    fontDisplay: "'Playfair Display', serif",
    heroVisual: "roulette",
  },
  case_06: {
    // The Submarine Silence
    name: "The Submarine Silence",
    bgPrimary: "#04141a",
    bgSecondary: "#dbe9ec",
    textPrimary: "#0a2229",
    accent: "#0e7490",
    accentSecondary: "#67e8f9",
    nodeColor: "#38bdf8",
    ambient: "bubbles",
    fontDisplay: "'Space Grotesk', sans-serif",
    heroVisual: "submarine",
  },
  case_07: {
    // The Opera Drop
    name: "The Opera Drop",
    bgPrimary: "#1a0a10",
    bgSecondary: "#f5e6d3",
    textPrimary: "#2b0f16",
    accent: "#9f1239",
    accentSecondary: "#d4af37",
    nodeColor: "#d4af37",
    ambient: "dust",
    fontDisplay: "'Playfair Display', serif",
    heroVisual: "curtain",
  },
  case_08: {
    // The Alpine Avalanche
    name: "The Alpine Avalanche",
    bgPrimary: "#0e151c",
    bgSecondary: "#f0f5f9",
    textPrimary: "#0e1c26",
    accent: "#2563eb",
    accentSecondary: "#cbd5e1",
    nodeColor: "#e2e8f0",
    ambient: "snow",
    fontDisplay: "'Space Grotesk', sans-serif",
    heroVisual: "mountain",
  },
  case_09: {
    // The Botanist's Venom
    name: "The Botanist's Venom",
    bgPrimary: "#0a1a0f",
    bgSecondary: "#eaf0e5",
    textPrimary: "#122414",
    accent: "#15803d",
    accentSecondary: "#a3e635",
    nodeColor: "#4ade80",
    ambient: "dust",
    fontDisplay: "'Playfair Display', serif",
    heroVisual: "greenhouse",
  },
  case_10: {
    // The Cipher of the Catacombs
    name: "The Cipher of the Catacombs",
    bgPrimary: "#170f0a",
    bgSecondary: "#e8dcc8",
    textPrimary: "#241a10",
    accent: "#b45309",
    accentSecondary: "#92400e",
    nodeColor: "#d97706",
    ambient: "embers",
    fontDisplay: "'Playfair Display', serif",
    heroVisual: "tunnel",
  },
};

export function getTheme(caseId: string): Theme {
  return themes[caseId] ?? themes.case_01;
}
