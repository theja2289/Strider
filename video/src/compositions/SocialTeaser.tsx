import React from "react";
import { AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop, Eyebrow, Fade, Logo, Rise } from "../ui/primitives";
import { C, body, display, mono } from "../ui/theme";

const Big: React.FC<{ n: string; l: string; d?: number }> = ({ n, l, d = 0 }) => (
  <Rise delay={d} style={{ display: "grid", gap: 6 }}><div style={{ ...display(170, 700), letterSpacing: -7 }}>{n}</div><div style={mono(26, C.signal)}>{l}</div></Rise>
);

export const SocialTeaser: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const photoY = interpolate(frame, [0, 12 * fps], [0, -80]);
  return (
    <Backdrop>
      <Sequence from={0} durationInFrames={4 * fps}>
        <Fade>
          <Img src={staticFile("photos/m3-render.png")} style={{ position: "absolute", left: -120, top: 420 + photoY, width: 1320 }} />
          <div style={{ position: "absolute", left: 72, top: 220, display: "grid", gap: 18 }}>
            <Rise><Eyebrow>Made in Bengaluru</Eyebrow></Rise>
            <Rise delay={8}><h1 style={display(112, 600)}>Legged robots for the places wheels can't go.</h1></Rise>
          </div>
        </Fade>
      </Sequence>
      <Sequence from={4 * fps} durationInFrames={5 * fps}>
        <Fade>
          <div style={{ position: "absolute", left: 72, top: 260, display: "grid", gap: 70 }}>
            <Big n="20 kg" l="Rated payload" />
            <Big n="40 kg" l="Tested · up stairs" d={12} />
            <Big n=">80%" l="Indigenous content" d={24} />
          </div>
          <Rise delay={40} style={{ position: "absolute", left: 72, bottom: 220, ...body(34) }}>Strider M3. Now in industrial pilots.</Rise>
        </Fade>
      </Sequence>
      <Sequence from={9 * fps} durationInFrames={3 * fps}>
        <Fade>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            <div style={{ display: "grid", justifyItems: "center", gap: 34, padding: 60 }}>
              <Rise><Logo height={150} /></Rise>
              <Rise delay={8}><div style={{ ...display(60, 500), textAlign: "center" }}>Pilots open.</div></Rise>
              <Rise delay={14}><div style={mono(26, C.signal)}>strider-robotics.in</div></Rise>
            </div>
          </AbsoluteFill>
        </Fade>
      </Sequence>
    </Backdrop>
  );
};
