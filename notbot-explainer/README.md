# NotBot Explainer Video

An animated explainer video for [NotBot](https://notbot.id) built with [Remotion](https://remotion.dev) - a React framework for creating videos programmatically.

## What's in the video

A 38-second animated explainer covering:
1. **Intro** - NotBot brand reveal with shield animation
2. **The Problem** - Bot statistics ($186B losses, 50% web traffic is bots)
3. **The Solution** - NotBot's cryptographic human verification approach
4. **How It Works** - 3-step process (Verify, Create Sticker, Scan)
5. **Why It Matters** - Deepfake protection, privacy, trust, AI-readiness
6. **Call to Action** - Visit notbot.id

## Getting Started

```bash
# Install dependencies
npm install

# Open Remotion Studio (preview in browser)
npm run studio

# Render video (without voiceover)
npm run render

# Output: out/notbot-explainer.mp4
```

## Adding Voiceover

The video supports AI-generated voiceover using ElevenLabs TTS:

```bash
# Set your ElevenLabs API key
export ELEVENLABS_API_KEY=your_key_here

# Generate voiceover audio files
npm run generate-voiceover

# Render with voiceover
npm run render:voiceover

# Output: out/notbot-explainer-voiceover.mp4
```

## Project Structure

```
notbot-explainer/
├── src/
│   ├── index.ts              # Entry point
│   ├── Root.tsx               # Composition definitions
│   ├── NotBotExplainer.tsx    # Main video component with transitions
│   ├── constants.ts           # Colors, durations, voiceover scripts
│   ├── fonts.ts               # Google Fonts (Inter) loading
│   └── scenes/
│       ├── IntroScene.tsx      # Brand intro with shield animation
│       ├── ProblemScene.tsx    # Bot statistics & threat landscape
│       ├── SolutionScene.tsx   # NotBot's cryptographic approach
│       ├── HowItWorksScene.tsx # 3-step process walkthrough
│       ├── ImportanceScene.tsx # Why human verification matters
│       └── CTAScene.tsx        # Call to action
├── public/                    # Static assets & generated voiceovers
├── generate-voiceover.ts      # ElevenLabs TTS generation script
└── remotion.config.ts         # Remotion configuration
```

## Compositions

| ID | Description | Voiceover |
|----|------------|-----------|
| `NotBotExplainer` | Video without voiceover | No |
| `NotBotExplainerWithVoiceover` | Video with AI voiceover | Yes |

## Customization

- **Colors**: Edit `src/constants.ts` to change the color scheme
- **Durations**: Modify `SCENE_DURATIONS` in `src/constants.ts`
- **Voiceover scripts**: Update `VOICEOVER_SCRIPTS` in `src/constants.ts`
- **Voice**: Change `VOICE_ID` in `generate-voiceover.ts`
