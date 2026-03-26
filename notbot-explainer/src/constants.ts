export const COLORS = {
  darkBg: "#0a0a1a",
  primaryBlue: "#3b82f6",
  accentCyan: "#06b6d4",
  accentGreen: "#10b981",
  accentPurple: "#8b5cf6",
  accentRed: "#ef4444",
  accentOrange: "#f97316",
  white: "#ffffff",
  lightGray: "#e2e8f0",
  midGray: "#94a3b8",
  darkGray: "#1e293b",
  cardBg: "#111827",
};

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const TRANSITION_DURATION = 15; // frames

// Scene durations in frames (at 30fps)
export const SCENE_DURATIONS = {
  intro: 5 * FPS,        // 5 seconds
  problem: 7 * FPS,      // 7 seconds
  solution: 6 * FPS,     // 6 seconds
  howItWorks: 10 * FPS,  // 10 seconds (5 signals need more time)
  importance: 8 * FPS,   // 8 seconds
  cta: 5 * FPS,          // 5 seconds
};

// Voiceover scripts for each scene
export const VOICEOVER_SCRIPTS = {
  intro:
    "51 percent of the web is already not you. Bots now outnumber humans online for the first time in history.",
  problem:
    "The internet's trust layer is broken. Bot farms cost just 50 dollars for a thousand fake accounts. Over 38 million people are already seeking proof-of-personhood verification. And zero CAPTCHAs still work — AI solves them faster than humans.",
  solution:
    "NotBot takes a different approach. Five lightweight signals that together are economically unviable to fake at scale. No government ID. No special hardware. Under 2 minutes for a real person.",
  howItWorks:
    "Link your existing accounts to verify a real digital footprint. One phone number, one account — raising the cost of fakes. A quick liveness check confirms a real face. Social vouching creates scarcity and accountability. And behavioral consistency catches compromised accounts over time.",
  importance:
    "The law is forcing this globally. India's IT Rules are already live with mandatory AI labelling. The EU AI Act hits full enforcement in August 2026. And 72 countries now have active AI policies. Every one of these laws requires platforms to distinguish real humans from AI.",
  cta: "Be one of the Founding 100. The first verified humans get permanent founding member status, root node weight, and lifetime free access. The internet needs a human layer. Visit notbot.id.",
};
