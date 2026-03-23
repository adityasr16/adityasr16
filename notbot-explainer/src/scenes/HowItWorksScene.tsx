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

const steps = [
  {
    number: "01",
    title: "Verify Privately",
    description: "Your identity is verified on your phone.\nPassport data never leaves your device.",
    color: COLORS.primaryBlue,
  },
  {
    number: "02",
    title: "Create Sticker",
    description: "Generate a digital autograph — your\ncryptographic proof of approval.",
    color: COLORS.accentCyan,
  },
  {
    number: "03",
    title: "Scan & Verify",
    description: "Anyone can verify your sticker\nwith the free NotBot app.",
    color: COLORS.accentGreen,
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
  const lineProgress = interpolate(frame, [60, 150], [0, 1], {
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
          top: 80,
          opacity: titleOpacity,
          fontSize: 56,
          fontWeight: 700,
          color: COLORS.white,
          fontFamily,
        }}
      >
        How It <span style={{ color: COLORS.accentCyan }}>Works</span>
      </div>

      {/* Steps */}
      <div
        style={{
          display: "flex",
          gap: 60,
          alignItems: "flex-start",
          marginTop: 40,
          position: "relative",
        }}
      >
        {/* Connection line behind cards */}
        <svg
          width="1100"
          height="10"
          style={{
            position: "absolute",
            top: 90,
            left: 100,
            zIndex: 0,
          }}
        >
          <line
            x1="0"
            y1="5"
            x2={1100 * lineProgress}
            y2="5"
            stroke={COLORS.accentCyan}
            strokeWidth="2"
            strokeDasharray="8 4"
            opacity={0.5}
          />
        </svg>

        {steps.map((step, i) => {
          const delay = 25 + i * 35;
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

          // Icon animations
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
                border: `2px solid ${step.color}30`,
                borderRadius: 24,
                padding: "40px 50px",
                width: 340,
                textAlign: "center",
                zIndex: 1,
              }}
            >
              {/* Step number */}
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: step.color,
                  fontFamily,
                  marginBottom: 16,
                  letterSpacing: "3px",
                }}
              >
                STEP {step.number}
              </div>

              {/* Icon circle */}
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  backgroundColor: `${step.color}20`,
                  border: `2px solid ${step.color}50`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 auto 24px",
                  transform: `scale(${iconBounce})`,
                }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40">
                  {i === 0 && (
                    // Phone icon
                    <g>
                      <rect
                        x="10"
                        y="4"
                        width="20"
                        height="32"
                        rx="3"
                        fill="none"
                        stroke={step.color}
                        strokeWidth="2.5"
                      />
                      <circle cx="20" cy="31" r="2" fill={step.color} />
                      <line
                        x1="15"
                        y1="8"
                        x2="25"
                        y2="8"
                        stroke={step.color}
                        strokeWidth="1.5"
                      />
                    </g>
                  )}
                  {i === 1 && (
                    // Stamp/sticker icon
                    <g>
                      <rect
                        x="6"
                        y="6"
                        width="28"
                        height="28"
                        rx="4"
                        fill="none"
                        stroke={step.color}
                        strokeWidth="2.5"
                      />
                      <path
                        d="M14 20 L18 25 L27 14"
                        stroke={step.color}
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </g>
                  )}
                  {i === 2 && (
                    // Scan icon
                    <g>
                      <path
                        d="M6 14 L6 8 L14 8"
                        stroke={step.color}
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d="M26 8 L34 8 L34 14"
                        stroke={step.color}
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d="M34 26 L34 32 L26 32"
                        stroke={step.color}
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d="M14 32 L6 32 L6 26"
                        stroke={step.color}
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <line
                        x1="10"
                        y1="20"
                        x2="30"
                        y2="20"
                        stroke={step.color}
                        strokeWidth="2"
                      />
                    </g>
                  )}
                </svg>
              </div>

              {/* Title */}
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: COLORS.white,
                  fontFamily,
                  marginBottom: 12,
                }}
              >
                {step.title}
              </div>

              {/* Description */}
              <div
                style={{
                  fontSize: 18,
                  color: COLORS.midGray,
                  fontFamily,
                  lineHeight: 1.5,
                  whiteSpace: "pre-line",
                }}
              >
                {step.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          opacity: interpolate(frame, [160, 180], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          fontSize: 26,
          color: COLORS.accentCyan,
          fontFamily,
          fontWeight: 600,
        }}
      >
        Math that AI can never fake.
      </div>
    </AbsoluteFill>
  );
};
