/**
 * Voiceover Generation Script for NotBot Explainer Video
 *
 * This script generates AI voiceover audio files using ElevenLabs TTS API.
 *
 * Prerequisites:
 *   1. Set ELEVENLABS_API_KEY environment variable
 *   2. Run: npx ts-node generate-voiceover.ts
 *
 * The script will create MP3 files in the public/ directory:
 *   - voiceover-intro.mp3
 *   - voiceover-problem.mp3
 *   - voiceover-solution.mp3
 *   - voiceover-howitworks.mp3
 *   - voiceover-importance.mp3
 *   - voiceover-cta.mp3
 */

import * as fs from "fs";
import * as path from "path";

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

if (!ELEVENLABS_API_KEY) {
  console.error("Error: ELEVENLABS_API_KEY environment variable is not set.");
  console.error("Get your API key at https://elevenlabs.io and set it:");
  console.error("  export ELEVENLABS_API_KEY=your_key_here");
  process.exit(1);
}

// Use a professional, clear male voice — "Adam" is a good default
// You can browse voices at https://elevenlabs.io/voice-library
const VOICE_ID = "pNInz6obpgDQGcFmaJgB"; // Adam voice

const scripts: Record<string, string> = {
  intro:
    "Introducing NotBot. Cryptographic proof that you are human. In a world increasingly dominated by AI and bots, how do you prove you're real?",
  problem:
    "Bots now account for nearly half of all internet traffic, and one third of those are malicious. Businesses lose over 186 billion dollars annually to bot attacks. Deepfakes can impersonate anyone. Traditional CAPTCHAs frustrate users and sophisticated bots can easily bypass them.",
  solution:
    "NotBot takes a fundamentally different approach. Instead of trying to detect bots, NotBot provides cryptographic proof of human identity. A digital signature that verifies a real person stands behind the content.",
  howitworks:
    "Here's how it works. Step one: Verify your identity privately on your phone. Your passport data stays only on your device. Step two: Create a NotBot sticker, your digital autograph proving you approved the content. Step three: Anyone can verify your sticker by scanning it with the free NotBot app. It's math that AI can never fake.",
  importance:
    "Why does human verification matter? It protects against deepfakes and impersonation. It builds trust in online communication. It preserves privacy because your data never leaves your phone. And it ensures authenticity in an AI-driven world where anyone can generate anything.",
  cta: "NotBot. Human to Human, Online. Visit notbot.id to get verified today. Because in the age of AI, being provably human is your greatest asset.",
};

async function generateVoiceover(
  sceneName: string,
  text: string,
): Promise<void> {
  const outputPath = path.join(__dirname, "public", `voiceover-${sceneName}.mp3`);

  console.log(`Generating voiceover for: ${sceneName}...`);

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY!,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.6,
          similarity_boost: 0.8,
          style: 0.2,
          use_speaker_boost: true,
        },
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `ElevenLabs API error for ${sceneName}: ${response.status} - ${errorText}`,
    );
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(outputPath, buffer);
  console.log(`  Saved: ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

async function main() {
  // Ensure public directory exists
  const publicDir = path.join(__dirname, "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log("Starting voiceover generation...\n");

  for (const [sceneName, text] of Object.entries(scripts)) {
    await generateVoiceover(sceneName, text);
  }

  console.log("\nAll voiceovers generated successfully!");
  console.log(
    'You can now render with voiceover using composition ID: "NotBotExplainerWithVoiceover"',
  );
}

main().catch(console.error);
