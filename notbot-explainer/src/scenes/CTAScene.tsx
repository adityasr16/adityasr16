import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COLORS } from "../constants";
import { fontFamily } from "../fonts";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Founding 100" entrance
  const foundingSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // Tagline
  const taglineOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [25, 45], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Perks
  const perks = [
    { icon: "star", text: "Founding Badge", sub: "Original member status" },
    { icon: "node", text: "Root Node", sub: "Your vouches carry more weight" },
    { icon: "free", text: "Lifetime Free", sub: "Free forever for founders" },
  ];

  // URL
  const urlOpacity = interpolate(frame, [80, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const urlScale = spring({
    frame: frame - 80,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // Bottom text
  const bottomOpacity = interpolate(frame, [100, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Animated ring
  const ringRotation = frame * 0.5;
  const ringOpacity = interpolate(frame, [0, 30], [0, 0.3], {
    extrapolateRight: "clamp",
  });

  // Particles
  const particles = Array.from({ length: 30 }, (_, i) => {
    const angle = (i / 30) * Math.PI * 2;
    const radius = 350 + Math.sin(frame * 0.03 + i * 0.5) * 80;
    const x = Math.cos(angle + frame * 0.008) * radius;
    const y = Math.sin(angle + frame * 0.008) * radius;
    return { x, y, size: 2 + (i % 4) };
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBg,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background gradients */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(circle at 30% 40%, ${COLORS.primaryBlue}15 0%, transparent 40%),
            radial-gradient(circle at 70% 60%, ${COLORS.accentCyan}15 0%, transparent 40%)
          `,
        }}
      />

      {/* Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `calc(50% + ${p.x}px)`,
            top: `calc(50% + ${p.y}px)`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor:
              i % 2 === 0 ? COLORS.primaryBlue : COLORS.accentCyan,
            opacity: interpolate(frame, [0, 30], [0, 0.4], {
              extrapolateRight: "clamp",
            }),
          }}
        />
      ))}

      {/* Rotating ring */}
      <svg
        width="500"
        height="500"
        viewBox="0 0 500 500"
        style={{
          position: "absolute",
          transform: `rotate(${ringRotation}deg)`,
          opacity: ringOpacity,
        }}
      >
        <circle
          cx="250"
          cy="250"
          r="230"
          fill="none"
          stroke={COLORS.primaryBlue}
          strokeWidth="1"
          strokeDasharray="15 10 5 10"
        />
      </svg>

      {/* Founding 100 headline */}
      <div
        style={{
          transform: `scale(${foundingSpring})`,
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: COLORS.accentCyan,
            fontFamily,
            letterSpacing: "4px",
            marginBottom: 12,
          }}
        >
          BE ONE OF THE
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: COLORS.white,
            fontFamily,
            letterSpacing: "-2px",
          }}
        >
          Founding{" "}
          <span style={{ color: COLORS.primaryBlue }}>100</span>
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          fontSize: 24,
          color: COLORS.midGray,
          fontFamily,
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        The internet needs a human layer. You're early.
      </div>

      {/* Perks row */}
      <div
        style={{
          display: "flex",
          gap: 32,
          marginBottom: 40,
        }}
      >
        {perks.map((perk, i) => {
          const delay = 40 + i * 15;
          const perkOpacity = interpolate(
            frame,
            [delay, delay + 15],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          const perkScale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, stiffness: 90 },
          });

          return (
            <div
              key={i}
              style={{
                opacity: perkOpacity,
                transform: `scale(${perkScale})`,
                backgroundColor: COLORS.cardBg,
                border: `1px solid ${COLORS.primaryBlue}30`,
                borderRadius: 16,
                padding: "24px 36px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: COLORS.white,
                  fontFamily,
                  marginBottom: 6,
                }}
              >
                {perk.text}
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: COLORS.midGray,
                  fontFamily,
                }}
              >
                {perk.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* URL */}
      <div
        style={{
          opacity: urlOpacity,
          transform: `scale(${urlScale})`,
        }}
      >
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: COLORS.accentCyan,
            fontFamily,
            backgroundColor: `${COLORS.accentCyan}15`,
            border: `2px solid ${COLORS.accentCyan}40`,
            borderRadius: 16,
            padding: "16px 56px",
          }}
        >
          notbot.id
        </div>
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          opacity: bottomOpacity,
          fontSize: 22,
          color: COLORS.midGray,
          fontFamily,
          textAlign: "center",
        }}
      >
        In the age of AI, being provably human is your greatest asset.
      </div>
    </AbsoluteFill>
  );
};
