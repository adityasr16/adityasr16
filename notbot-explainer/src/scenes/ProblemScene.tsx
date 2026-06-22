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
  { value: "51%", label: "Web traffic is bots.\nHumans are the minority.", color: COLORS.accentRed },
  { value: "$50", label: "Cost to run a bot farm\nwith 1,000 fake accounts.", color: COLORS.accentOrange },
  { value: "38M+", label: "People already seeking\nproof-of-personhood.", color: COLORS.accentPurple },
  { value: "0", label: "CAPTCHAs that still work.\nAI beats them all.", color: COLORS.accentCyan },
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
          marginBottom: 50,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.white,
            fontFamily,
          }}
        >
          The internet's trust layer is{" "}
          <span style={{ color: COLORS.accentRed }}>broken</span>.
        </div>
      </div>

      {/* Stats grid - 2x2 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 32,
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        {stats.map((stat, i) => {
          const delay = 25 + i * 18;
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
                padding: "40px 50px",
                textAlign: "center",
                width: 380,
              }}
            >
              <div
                style={{
                  fontSize: 72,
                  fontWeight: 800,
                  color: stat.color,
                  fontFamily,
                  lineHeight: 1,
                  marginBottom: 12,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 20,
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
    </AbsoluteFill>
  );
};
