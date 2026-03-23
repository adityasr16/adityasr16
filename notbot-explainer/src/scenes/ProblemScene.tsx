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

const stats = [
  { value: "50%", label: "of web traffic\nis bots", color: COLORS.accentRed },
  { value: "$186B", label: "lost annually to\nbot attacks", color: COLORS.accentOrange },
  { value: "1/3", label: "of bots are\nmalicious", color: COLORS.accentPurple },
];

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleX = interpolate(frame, [0, 20], [-50, 0], {
    extrapolateRight: "clamp",
  });

  // Warning icon pulse
  const warningScale = interpolate(
    frame % 40,
    [0, 20, 40],
    [1, 1.1, 1],
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBg,
        padding: 80,
        overflow: "hidden",
      }}
    >
      {/* Background threat grid */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          background: `
            linear-gradient(${COLORS.accentRed}08 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.accentRed}08 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Red gradient accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          background: `radial-gradient(circle at 100% 0%, ${COLORS.accentRed}20 0%, transparent 50%)`,
        }}
      />

      {/* Title section */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateX(${titleX}px)`,
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 60,
        }}
      >
        <div style={{ transform: `scale(${warningScale})` }}>
          <svg width="60" height="60" viewBox="0 0 60 60">
            <path
              d="M30 5 L55 50 L5 50 Z"
              fill={COLORS.accentRed}
              opacity={0.9}
            />
            <text
              x="30"
              y="44"
              textAnchor="middle"
              fill={COLORS.white}
              fontSize="28"
              fontWeight="bold"
            >
              !
            </text>
          </svg>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: COLORS.white,
            fontFamily,
          }}
        >
          The Bot <span style={{ color: COLORS.accentRed }}>Problem</span>
        </div>
      </div>

      {/* Stats cards */}
      <div
        style={{
          display: "flex",
          gap: 40,
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        {stats.map((stat, i) => {
          const delay = 30 + i * 20;
          const cardScale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, stiffness: 80 },
          });
          const cardOpacity = interpolate(frame, [delay, delay + 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                opacity: cardOpacity,
                transform: `scale(${cardScale})`,
                backgroundColor: COLORS.cardBg,
                border: `2px solid ${stat.color}40`,
                borderRadius: 24,
                padding: "50px 60px",
                textAlign: "center",
                flex: 1,
                maxWidth: 400,
              }}
            >
              <div
                style={{
                  fontSize: 80,
                  fontWeight: 800,
                  color: stat.color,
                  fontFamily,
                  lineHeight: 1,
                  marginBottom: 16,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: COLORS.midGray,
                  fontFamily,
                  lineHeight: 1.4,
                  whiteSpace: "pre-line",
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom text */}
      <div
        style={{
          marginTop: 60,
          textAlign: "center",
          opacity: interpolate(frame, [120, 140], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: COLORS.midGray,
            fontFamily,
          }}
        >
          Traditional CAPTCHAs{" "}
          <span style={{ color: COLORS.accentRed, fontWeight: 600 }}>
            frustrate users
          </span>{" "}
          & bots{" "}
          <span style={{ color: COLORS.accentRed, fontWeight: 600 }}>
            easily bypass them
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
