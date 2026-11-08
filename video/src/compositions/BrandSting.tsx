import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop, Logo } from "../ui/primitives";
import { C, mono } from "../ui/theme";

export const BrandSting: React.FC<{ tagline?: string }> = ({ tagline = "Autonomous legged robots" }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 18, stiffness: 90, mass: 1 } });
  const line = interpolate(frame, [4, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const tag = interpolate(frame, [26, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const out = interpolate(frame, [durationInFrames - 14, durationInFrames - 2], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const h = Math.round(width * 0.075);
  return (
    <Backdrop>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: out }}>
        <div style={{ display: "grid", justifyItems: "center", gap: 28 }}>
          <div style={{ transform: `scale(${0.92 + p * 0.08})`, opacity: p }}><Logo height={h} /></div>
          <div style={{ width: `${line * 100}%`, maxWidth: h * 4.2, height: 2, background: C.signal }} />
          <div style={{ ...mono(Math.round(h * 0.22), C.fog), opacity: tag, transform: `translateY(${(1 - tag) * 10}px)` }}>{tagline}</div>
        </div>
      </AbsoluteFill>
    </Backdrop>
  );
};
