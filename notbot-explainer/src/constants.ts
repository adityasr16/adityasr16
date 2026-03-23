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
  howItWorks: 8 * FPS,   // 8 seconds
  importance: 7 * FPS,   // 7 seconds
  cta: 5 * FPS,          // 5 seconds
};

// Voiceover scripts for each scene
export const VOICEOVER_SCRIPTS = {
  intro:
    "Introducing NotBot. Cryptographic proof that you are human. In a world increasingly dominated by AI and bots, how do you prove you're real?",
  problem:
    "Bots now account for nearly half of all internet traffic, and one third of those are malicious. Businesses lose over 186 billion dollars annually to bot attacks. Deepfakes can impersonate anyone. Traditional CAPTCHAs frustrate users and sophisticated bots can easily bypass them.",
  solution:
    "NotBot takes a fundamentally different approach. Instead of trying to detect bots, NotBot provides cryptographic proof of human identity. A digital signature that verifies a real person stands behind the content.",
  howItWorks:
    "Here's how it works. Step one: Verify your identity privately on your phone. Your passport data stays only on your device. Step two: Create a NotBot sticker, your digital autograph proving you approved the content. Step three: Anyone can verify your sticker by scanning it with the free NotBot app. It's math that AI can never fake.",
  importance:
    "Why does human verification matter? It protects against deepfakes and impersonation. It builds trust in online communication. It preserves privacy because your data never leaves your phone. And it ensures authenticity in an AI-driven world where anyone can generate anything.",
  cta: "NotBot. Human to Human, Online. Visit notbot.id to get verified today. Because in the age of AI, being provably human is your greatest asset.",
};
