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

  // Logo entrance
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // Tagline
  const taglineOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [30, 50], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // URL
  const urlOpacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const urlScale = spring({
    frame: frame - 55,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // Bottom text
  const bottomOpacity = interpolate(frame, [80, 100], [0, 1], {
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
    const radius = 300 + Math.sin(frame * 0.03 + i * 0.5) * 80;
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
        <circle
          cx="250"
          cy="250"
          r="200"
          fill="none"
          stroke={COLORS.accentCyan}
          strokeWidth="1"
          strokeDasharray="8 12"
        />
      </svg>

      {/* Shield logo */}
      <div style={{ transform: `scale(${logoSpring})`, marginBottom: 30 }}>
        <svg width="120" height="140" viewBox="0 0 140 160">
          <defs>
            <linearGradient id="ctaShield" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={COLORS.primaryBlue} />
              <stop offset="100%" stopColor={COLORS.accentCyan} />
            </linearGradient>
          </defs>
          <path
            d="M70 10 L130 40 L130 90 C130 120 100 150 70 155 C40 150 10 120 10 90 L10 40 Z"
            fill="url(#ctaShield)"
          />
          <path
            d="M55 80 L65 95 L90 60"
            stroke={COLORS.white}
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.white,
          fontFamily,
          textAlign: "center",
          marginBottom: 12,
        }}
      >
        Human to Human,{" "}
        <span style={{ color: COLORS.primaryBlue }}>Online</span>
      </div>

      {/* URL */}
      <div
        style={{
          opacity: urlOpacity,
          transform: `scale(${urlScale})`,
          marginTop: 20,
        }}
      >
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: COLORS.accentCyan,
            fontFamily,
            backgroundColor: `${COLORS.accentCyan}15`,
            border: `2px solid ${COLORS.accentCyan}40`,
            borderRadius: 16,
            padding: "16px 48px",
          }}
        >
          notbot.id
        </div>
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          opacity: bottomOpacity,
          fontSize: 24,
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
