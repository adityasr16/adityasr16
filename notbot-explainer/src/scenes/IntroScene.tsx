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

  // "51%" big number animation
  const percentScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // Headline fade in
  const headlineOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headlineY = interpolate(frame, [25, 45], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle fade
  const subtitleOpacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [55, 75], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing glow
  const glowOpacity = interpolate(
    frame % 60,
    [0, 30, 60],
    [0.2, 0.5, 0.2],
  );

  // Floating particles
  const particles = Array.from({ length: 25 }, (_, i) => {
    const angle = (i / 25) * Math.PI * 2;
    const radius = 300 + Math.sin(frame * 0.02 + i) * 60;
    const x = Math.cos(angle + frame * 0.004) * radius;
    const y = Math.sin(angle + frame * 0.004) * radius;
    const particleOpacity = interpolate(frame, [0, 30], [0, 0.5], {
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
          background: `radial-gradient(circle at 50% 40%, ${COLORS.accentRed}12 0%, transparent 50%)`,
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
            backgroundColor: i % 2 === 0 ? COLORS.accentRed : COLORS.accentOrange,
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Glow behind number */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accentRed}${Math.round(glowOpacity * 255).toString(16).padStart(2, "0")} 0%, transparent 60%)`,
        }}
      />

      {/* 51% big stat */}
      <div
        style={{
          transform: `scale(${percentScale})`,
          fontSize: 180,
          fontWeight: 800,
          color: COLORS.white,
          fontFamily,
          lineHeight: 1,
          letterSpacing: "-6px",
        }}
      >
        51<span style={{ color: COLORS.accentRed }}>%</span>
      </div>

      {/* Headline */}
      <div
        style={{
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
          fontSize: 52,
          fontWeight: 700,
          color: COLORS.white,
          fontFamily,
          marginTop: 20,
          textAlign: "center",
        }}
      >
        OF THE WEB IS ALREADY{" "}
        <span style={{ color: COLORS.accentRed }}>NOT YOU</span>
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          fontSize: 28,
          color: COLORS.midGray,
          fontFamily,
          marginTop: 24,
          textAlign: "center",
          maxWidth: 900,
          lineHeight: 1.4,
        }}
      >
        Bots now outnumber humans online for the first time in history.
      </div>
    </AbsoluteFill>
  );
};
