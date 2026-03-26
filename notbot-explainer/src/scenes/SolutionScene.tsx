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

  // NotBot logo animation
  const logoSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  // Subtitle
  const subOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(frame, [30, 50], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Features
  const features = [
    { text: "No government ID", icon: "shield" },
    { text: "No special hardware", icon: "device" },
    { text: "Under 2 minutes", icon: "clock" },
  ];

  // Rotating ring
  const ringRotation = frame * 0.6;

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
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: COLORS.white,
            fontFamily,
          }}
        >
          Five signals.{" "}
          <span style={{ color: COLORS.accentGreen }}>One score.</span>
        </div>
      </div>

      {/* Central NotBot logo with ring */}
      <div
        style={{
          position: "relative",
          transform: `scale(${logoSpring})`,
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
          {/* 5 dots for 5 signals */}
          {Array.from({ length: 5 }, (_, i) => {
            const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
            const cx = 150 + Math.cos(angle) * 140;
            const cy = 150 + Math.sin(angle) * 140;
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="6"
                fill={COLORS.accentGreen}
                opacity={0.8}
              />
            );
          })}
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

      {/* Subtitle */}
      <div
        style={{
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
          fontSize: 26,
          color: COLORS.midGray,
          fontFamily,
          textAlign: "center",
          maxWidth: 800,
          lineHeight: 1.5,
          marginTop: 30,
        }}
      >
        No single check proves you're human. NotBot stacks five lightweight
        signals that together are{" "}
        <span style={{ color: COLORS.accentGreen, fontWeight: 600 }}>
          economically unviable to fake
        </span>{" "}
        at scale.
      </div>

      {/* Feature pills */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          display: "flex",
          gap: 40,
          justifyContent: "center",
        }}
      >
        {features.map((feature, i) => {
          const delay = 50 + i * 20;
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
                backgroundColor: COLORS.cardBg,
                border: `1px solid ${COLORS.accentGreen}30`,
                borderRadius: 16,
                padding: "20px 32px",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                {feature.icon === "shield" && (
                  <path
                    d="M12 2 L20 6 L20 12 C20 17 16 21 12 22 C8 21 4 17 4 12 L4 6 Z"
                    fill="none"
                    stroke={COLORS.accentGreen}
                    strokeWidth="2"
                  />
                )}
                {feature.icon === "device" && (
                  <g>
                    <rect x="5" y="2" width="14" height="20" rx="2" fill="none" stroke={COLORS.accentGreen} strokeWidth="2" />
                    <line x1="5" y1="18" x2="19" y2="18" stroke={COLORS.accentGreen} strokeWidth="1.5" />
                    <circle cx="12" cy="20" r="1" fill={COLORS.accentGreen} />
                  </g>
                )}
                {feature.icon === "clock" && (
                  <g>
                    <circle cx="12" cy="12" r="10" fill="none" stroke={COLORS.accentGreen} strokeWidth="2" />
                    <line x1="12" y1="6" x2="12" y2="12" stroke={COLORS.accentGreen} strokeWidth="2" strokeLinecap="round" />
                    <line x1="12" y1="12" x2="16" y2="14" stroke={COLORS.accentGreen} strokeWidth="2" strokeLinecap="round" />
                  </g>
                )}
              </svg>
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
