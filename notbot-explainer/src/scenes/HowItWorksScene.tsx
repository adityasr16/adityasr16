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

const signals = [
  {
    number: "01",
    title: "Link Accounts",
    description: "Connect LinkedIn, Twitter, GitHub.\nA real digital footprint is hard to fake.",
    color: COLORS.primaryBlue,
    iconType: "link",
  },
  {
    number: "02",
    title: "Phone Verification",
    description: "One phone, one account.\nRaises cost from $0 to $1-5 each.",
    color: COLORS.accentCyan,
    iconType: "phone",
  },
  {
    number: "03",
    title: "Liveness Check",
    description: "Quick video check confirms\na real face in real time.",
    color: COLORS.accentGreen,
    iconType: "camera",
  },
  {
    number: "04",
    title: "Social Vouching",
    description: "Real humans vouch for each other.\nNetwork gets stronger with every user.",
    color: COLORS.accentPurple,
    iconType: "people",
  },
  {
    number: "05",
    title: "Behavioral Signals",
    description: "Ongoing proof a real person\nis behind the account.",
    color: COLORS.accentOrange,
    iconType: "chart",
  },
];

export const HowItWorksScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Connection line progress
  const lineProgress = interpolate(frame, [40, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
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
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `
            linear-gradient(${COLORS.primaryBlue}06 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.primaryBlue}06 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          opacity: titleOpacity,
          fontSize: 52,
          fontWeight: 700,
          color: COLORS.white,
          fontFamily,
        }}
      >
        Five <span style={{ color: COLORS.accentCyan }}>Signals</span>
      </div>

      {/* Signals row */}
      <div
        style={{
          display: "flex",
          gap: 24,
          alignItems: "flex-start",
          marginTop: 60,
          position: "relative",
        }}
      >
        {/* Connection line behind cards */}
        <svg
          width="1600"
          height="10"
          style={{
            position: "absolute",
            top: 85,
            left: 50,
            zIndex: 0,
          }}
        >
          <line
            x1="0"
            y1="5"
            x2={1600 * lineProgress}
            y2="5"
            stroke={COLORS.accentCyan}
            strokeWidth="2"
            strokeDasharray="8 4"
            opacity={0.4}
          />
        </svg>

        {signals.map((signal, i) => {
          const delay = 20 + i * 25;
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

          const iconBounce = spring({
            frame: frame - delay - 10,
            fps,
            config: { damping: 8, stiffness: 100 },
          });

          return (
            <div
              key={i}
              style={{
                opacity: cardOpacity,
                transform: `scale(${cardSpring})`,
                backgroundColor: COLORS.cardBg,
                border: `2px solid ${signal.color}30`,
                borderRadius: 20,
                padding: "30px 28px",
                width: 280,
                textAlign: "center",
                zIndex: 1,
              }}
            >
              {/* Signal number */}
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: signal.color,
                  fontFamily,
                  marginBottom: 12,
                  letterSpacing: "3px",
                }}
              >
                SIGNAL {signal.number}
              </div>

              {/* Icon circle */}
              <div
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  backgroundColor: `${signal.color}20`,
                  border: `2px solid ${signal.color}50`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 auto 16px",
                  transform: `scale(${iconBounce})`,
                }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32">
                  {signal.iconType === "link" && (
                    <g>
                      <path d="M13 19l-2 2a4 4 0 01-5.66-5.66l4-4a4 4 0 015.66 0" fill="none" stroke={signal.color} strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M19 13l2-2a4 4 0 015.66 5.66l-4 4a4 4 0 01-5.66 0" fill="none" stroke={signal.color} strokeWidth="2.5" strokeLinecap="round" />
                    </g>
                  )}
                  {signal.iconType === "phone" && (
                    <g>
                      <rect x="9" y="4" width="14" height="24" rx="3" fill="none" stroke={signal.color} strokeWidth="2.5" />
                      <circle cx="16" cy="24" r="1.5" fill={signal.color} />
                      <line x1="13" y1="7" x2="19" y2="7" stroke={signal.color} strokeWidth="1.5" />
                    </g>
                  )}
                  {signal.iconType === "camera" && (
                    <g>
                      <circle cx="16" cy="16" r="10" fill="none" stroke={signal.color} strokeWidth="2.5" />
                      <circle cx="16" cy="16" r="4" fill="none" stroke={signal.color} strokeWidth="2" />
                      <circle cx="16" cy="16" r="1.5" fill={signal.color} />
                    </g>
                  )}
                  {signal.iconType === "people" && (
                    <g>
                      <circle cx="12" cy="10" r="4" fill="none" stroke={signal.color} strokeWidth="2" />
                      <path d="M4 26c0-4 4-7 8-7s8 3 8 7" fill="none" stroke={signal.color} strokeWidth="2" />
                      <circle cx="22" cy="10" r="3" fill="none" stroke={signal.color} strokeWidth="1.5" />
                      <path d="M22 17c3 0 6 2 6 5" fill="none" stroke={signal.color} strokeWidth="1.5" />
                    </g>
                  )}
                  {signal.iconType === "chart" && (
                    <g>
                      <rect x="4" y="20" width="5" height="8" rx="1" fill={signal.color} opacity={0.6} />
                      <rect x="13.5" y="14" width="5" height="14" rx="1" fill={signal.color} opacity={0.8} />
                      <rect x="23" y="8" width="5" height="20" rx="1" fill={signal.color} />
                    </g>
                  )}
                </svg>
              </div>

              {/* Title */}
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: COLORS.white,
                  fontFamily,
                  marginBottom: 8,
                }}
              >
                {signal.title}
              </div>

              {/* Description */}
              <div
                style={{
                  fontSize: 15,
                  color: COLORS.midGray,
                  fontFamily,
                  lineHeight: 1.5,
                  whiteSpace: "pre-line",
                }}
              >
                {signal.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          opacity: interpolate(frame, [180, 210], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          fontSize: 24,
          color: COLORS.accentCyan,
          fontFamily,
          fontWeight: 600,
        }}
      >
        Under 2 minutes for a real person. Economically unviable to fake at
        scale.
      </div>
    </AbsoluteFill>
  );
};
