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

const regulations = [
  {
    flag: "IN",
    region: "India",
    status: "LIVE NOW",
    statusColor: COLORS.accentGreen,
    detail: "Mandatory AI labelling & 3hr deepfake takedowns",
    color: COLORS.accentOrange,
  },
  {
    flag: "EU",
    region: "EU AI Act",
    status: "AUG 2026",
    statusColor: COLORS.accentCyan,
    detail: "Full enforcement. Bot disclosure & deepfake labelling",
    color: COLORS.primaryBlue,
  },
  {
    flag: "UN",
    region: "CoE Treaty",
    status: "RATIFYING",
    statusColor: COLORS.accentPurple,
    detail: "US, UK, EU, Israel + 5 nations. Binding AI rules",
    color: COLORS.accentPurple,
  },
  {
    flag: "72",
    region: "Countries",
    status: "ACCELERATING",
    statusColor: COLORS.accentOrange,
    detail: "Active AI policies. 21.3% rise in AI legislation",
    color: COLORS.accentRed,
  },
];

export const ImportanceScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Bottom summary text
  const summaryOpacity = interpolate(frame, [140, 170], [0, 1], {
    extrapolateLeft: "clamp",
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
          marginTop: 70,
          fontSize: 52,
          fontWeight: 700,
          color: COLORS.white,
          fontFamily,
        }}
      >
        The law is forcing this.{" "}
        <span style={{ color: COLORS.accentPurple }}>Globally.</span>
      </div>

      {/* Regulation cards */}
      <div
        style={{
          display: "flex",
          gap: 32,
          justifyContent: "center",
          padding: "50px 80px",
          marginTop: 20,
        }}
      >
        {regulations.map((reg, i) => {
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
                border: `1px solid ${reg.color}30`,
                borderRadius: 20,
                padding: "36px 32px",
                width: 360,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {/* Flag/region icon */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  backgroundColor: `${reg.color}20`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 24,
                  fontWeight: 800,
                  color: reg.color,
                  fontFamily,
                }}
              >
                {reg.flag}
              </div>

              {/* Region name */}
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: COLORS.white,
                  fontFamily,
                }}
              >
                {reg.region}
              </div>

              {/* Status badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  backgroundColor: `${reg.statusColor}20`,
                  border: `1px solid ${reg.statusColor}50`,
                  borderRadius: 8,
                  padding: "6px 14px",
                  fontSize: 14,
                  fontWeight: 700,
                  color: reg.statusColor,
                  fontFamily,
                  letterSpacing: "1px",
                }}
              >
                {reg.status}
              </div>

              {/* Detail */}
              <div
                style={{
                  fontSize: 17,
                  color: COLORS.midGray,
                  fontFamily,
                  lineHeight: 1.4,
                }}
              >
                {reg.detail}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom summary */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: summaryOpacity,
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: COLORS.midGray,
            fontFamily,
            maxWidth: 1000,
            margin: "0 auto",
            lineHeight: 1.5,
          }}
        >
          Every one of these laws requires platforms to{" "}
          <span style={{ color: COLORS.accentPurple, fontWeight: 600 }}>
            distinguish real humans from AI
          </span>
          . The infrastructure doesn't exist yet.
        </div>
      </div>
    </AbsoluteFill>
  );
};
