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

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Shield icon scale animation
  const shieldScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Title fade and slide
  const titleOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [20, 40], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle fade
  const subtitleOpacity = interpolate(frame, [45, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [45, 65], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing glow on shield
  const glowOpacity = interpolate(
    frame % 60,
    [0, 30, 60],
    [0.3, 0.8, 0.3],
  );

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2;
    const radius = 250 + Math.sin(frame * 0.02 + i) * 50;
    const x = Math.cos(angle + frame * 0.005) * radius;
    const y = Math.sin(angle + frame * 0.005) * radius;
    const particleOpacity = interpolate(frame, [0, 30], [0, 0.6], {
      extrapolateRight: "clamp",
    });
    return { x, y, opacity: particleOpacity, size: 3 + (i % 3) * 2 };
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
      {/* Radial gradient background */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle at 50% 50%, ${COLORS.primaryBlue}15 0%, transparent 60%)`,
        }}
      />

      {/* Floating particles */}
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
            backgroundColor: COLORS.accentCyan,
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Shield icon */}
      <div
        style={{
          transform: `scale(${shieldScale})`,
          marginBottom: 40,
          position: "relative",
        }}
      >
        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            top: -20,
            left: -20,
            right: -20,
            bottom: -20,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.primaryBlue}${Math.round(glowOpacity * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
          }}
        />
        <svg width="140" height="160" viewBox="0 0 140 160">
          <defs>
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={COLORS.primaryBlue} />
              <stop offset="100%" stopColor={COLORS.accentCyan} />
            </linearGradient>
          </defs>
          <path
            d="M70 10 L130 40 L130 90 C130 120 100 150 70 155 C40 150 10 120 10 90 L10 40 Z"
            fill="url(#shieldGrad)"
            opacity={0.9}
          />
          <path
            d="M55 80 L65 95 L90 60"
            stroke={COLORS.white}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontSize: 90,
          fontWeight: 800,
          color: COLORS.white,
          fontFamily,
          letterSpacing: "-2px",
        }}
      >
        Not
        <span style={{ color: COLORS.primaryBlue }}>Bot</span>
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          fontSize: 32,
          color: COLORS.midGray,
          fontFamily,
          marginTop: 16,
          fontWeight: 400,
        }}
      >
        Cryptographic Proof You Are Human
      </div>
    </AbsoluteFill>
  );
};
