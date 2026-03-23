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

const reasons = [
  {
    icon: "shield",
    title: "Deepfake Protection",
    desc: "Proves identity when AI can clone anyone",
    color: COLORS.primaryBlue,
  },
  {
    icon: "lock",
    title: "Privacy First",
    desc: "Your data never leaves your phone",
    color: COLORS.accentGreen,
  },
  {
    icon: "trust",
    title: "Build Trust Online",
    desc: "Verified humans, authentic interactions",
    color: COLORS.accentCyan,
  },
  {
    icon: "globe",
    title: "AI-Ready Future",
    desc: "Authenticity in a world of generated content",
    color: COLORS.accentPurple,
  },
];

export const ImportanceScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBg,
        overflow: "hidden",
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(circle at 20% 30%, ${COLORS.accentPurple}10 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, ${COLORS.primaryBlue}10 0%, transparent 40%)
          `,
        }}
      />

      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          textAlign: "center",
          marginTop: 80,
          fontSize: 56,
          fontWeight: 700,
          color: COLORS.white,
          fontFamily,
        }}
      >
        Why <span style={{ color: COLORS.accentPurple }}>Human Verification</span> Matters
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 40,
          justifyContent: "center",
          padding: "60px 120px",
          marginTop: 20,
        }}
      >
        {reasons.map((reason, i) => {
          const delay = 20 + i * 20;
          const cardSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 15, stiffness: 80 },
          });
          const cardOpacity = interpolate(
            frame,
            [delay, delay + 15],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );

          return (
            <div
              key={i}
              style={{
                opacity: cardOpacity,
                transform: `scale(${cardSpring})`,
                backgroundColor: COLORS.cardBg,
                border: `1px solid ${reason.color}30`,
                borderRadius: 20,
                padding: "40px 48px",
                width: 380,
                display: "flex",
                alignItems: "flex-start",
                gap: 20,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  backgroundColor: `${reason.color}20`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28">
                  {reason.icon === "shield" && (
                    <path
                      d="M14 2 L24 7 L24 14 C24 20 19 25 14 26 C9 25 4 20 4 14 L4 7 Z"
                      fill="none"
                      stroke={reason.color}
                      strokeWidth="2"
                    />
                  )}
                  {reason.icon === "lock" && (
                    <g>
                      <rect x="6" y="12" width="16" height="12" rx="2" fill="none" stroke={reason.color} strokeWidth="2" />
                      <path d="M9 12 L9 8 C9 5 11 3 14 3 C17 3 19 5 19 8 L19 12" fill="none" stroke={reason.color} strokeWidth="2" />
                      <circle cx="14" cy="18" r="2" fill={reason.color} />
                    </g>
                  )}
                  {reason.icon === "trust" && (
                    <g>
                      <circle cx="14" cy="10" r="5" fill="none" stroke={reason.color} strokeWidth="2" />
                      <path d="M5 24 C5 19 9 16 14 16 C19 16 23 19 23 24" fill="none" stroke={reason.color} strokeWidth="2" />
                      <path d="M11 21 L13 23 L18 17" stroke={reason.color} strokeWidth="2" fill="none" strokeLinecap="round" />
                    </g>
                  )}
                  {reason.icon === "globe" && (
                    <g>
                      <circle cx="14" cy="14" r="11" fill="none" stroke={reason.color} strokeWidth="2" />
                      <ellipse cx="14" cy="14" rx="5" ry="11" fill="none" stroke={reason.color} strokeWidth="1.5" />
                      <line x1="3" y1="14" x2="25" y2="14" stroke={reason.color} strokeWidth="1.5" />
                    </g>
                  )}
                </svg>
              </div>

              <div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: COLORS.white,
                    fontFamily,
                    marginBottom: 8,
                  }}
                >
                  {reason.title}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    color: COLORS.midGray,
                    fontFamily,
                    lineHeight: 1.4,
                  }}
                >
                  {reason.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
