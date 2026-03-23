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

export const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Central shield animation
  const shieldSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  // Rotating ring
  const ringRotation = frame * 0.8;

  // Text blocks staggered
  const features = [
    { text: "Cryptographic proof of identity", icon: "🔐" },
    { text: "No bot detection needed", icon: "✓" },
    { text: "Real humans, verified", icon: "👤" },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBg,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle at 50% 50%, ${COLORS.accentGreen}12 0%, transparent 50%)`,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 80,
          opacity: titleOpacity,
          fontSize: 56,
          fontWeight: 700,
          color: COLORS.white,
          fontFamily,
          textAlign: "center",
        }}
      >
        A <span style={{ color: COLORS.accentGreen }}>Different</span> Approach
      </div>

      {/* Central shield with rotating ring */}
      <div
        style={{
          position: "relative",
          transform: `scale(${shieldSpring})`,
        }}
      >
        {/* Rotating outer ring */}
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          style={{
            position: "absolute",
            top: -75,
            left: -75,
            transform: `rotate(${ringRotation}deg)`,
          }}
        >
          <circle
            cx="150"
            cy="150"
            r="140"
            fill="none"
            stroke={COLORS.accentGreen}
            strokeWidth="2"
            strokeDasharray="20 10"
            opacity={0.4}
          />
        </svg>

        {/* Inner shield */}
        <svg width="150" height="170" viewBox="0 0 140 160">
          <defs>
            <linearGradient id="solShield" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={COLORS.accentGreen} />
              <stop offset="100%" stopColor={COLORS.accentCyan} />
            </linearGradient>
          </defs>
          <path
            d="M70 10 L130 40 L130 90 C130 120 100 150 70 155 C40 150 10 120 10 90 L10 40 Z"
            fill="url(#solShield)"
            opacity={0.9}
          />
          <text
            x="70"
            y="100"
            textAnchor="middle"
            fill={COLORS.white}
            fontSize="50"
            fontWeight="bold"
            fontFamily="Inter, sans-serif"
          >
            NB
          </text>
        </svg>
      </div>

      {/* Feature list */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          display: "flex",
          gap: 60,
          justifyContent: "center",
        }}
      >
        {features.map((feature, i) => {
          const delay = 40 + i * 25;
          const featureOpacity = interpolate(
            frame,
            [delay, delay + 20],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          const featureY = interpolate(
            frame,
            [delay, delay + 20],
            [30, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );

          return (
            <div
              key={i}
              style={{
                opacity: featureOpacity,
                transform: `translateY(${featureY}px)`,
                display: "flex",
                alignItems: "center",
                gap: 12,
                backgroundColor: `${COLORS.cardBg}`,
                border: `1px solid ${COLORS.accentGreen}30`,
                borderRadius: 16,
                padding: "20px 32px",
              }}
            >
              <span style={{ fontSize: 28 }}>{feature.icon}</span>
              <span
                style={{
                  fontSize: 22,
                  color: COLORS.lightGray,
                  fontFamily,
                  fontWeight: 500,
                }}
              >
                {feature.text}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
