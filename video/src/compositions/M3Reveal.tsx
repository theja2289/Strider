import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { M3Model } from "@shared/robot/M3Model";
import { Scene3D } from "../ui/Scene3D";
import { Backdrop, Corner, Counter, Eyebrow, Logo, Rise } from "../ui/primitives";
import { C, body, display, mono } from "../ui/theme";

const beats = [
  { at: 4.5, value: <Counter to={20} suffix=" kg" delay={4.5 * 30} />, label: "Rated payload", note: "All-day inspection loads" },
  { at: 8.5, value: <Counter to={40} suffix=" kg" delay={8.5 * 30} />, label: "Tested payload", note: "Stairs climbed under full load" },
  { at: 12.5, value: <><Counter to={80} prefix=">" suffix="%" delay={12.5 * 30} /></>, label: "Indigenous content", note: "Including in-house actuators" },
];

export const M3Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / fps;
  const yaw = -0.6 + t * 0.22;
  const reveal = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const camDist = 3.4 - reveal * 0.6;
  const cam: [number, number, number] = [camDist * 0.78, 1.05, camDist * 0.72];
  const gait = t > 1 ? t * 3.2 : undefined;
  const endcard = interpolate(frame, [16.5 * fps, 17.2 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  return (
    <Backdrop>
      <AbsoluteFill style={{ opacity: reveal * fadeOut * (1 - endcard * 0.85) }}>
        <Scene3D camera={cam} lookAt={[0.05, 0.45, 0]}>
          <M3Model rotation={[0, yaw, 0]} gaitPhase={gait} gaitAmplitude={0.5} position={[0.5, 0, -0.55]} />
        </Scene3D>
      </AbsoluteFill>
      <div style={{ opacity: fadeOut }}>
        <Corner />
        <div style={{ position: "absolute", left: 96, top: 230, display: "grid", gap: 18, opacity: 1 - endcard, width: 980 }}>
          <Rise delay={20}><Eyebrow>Strider M3 · Industrial quadruped</Eyebrow></Rise>
          <Rise delay={28}><h1 style={display(76, 600)}>Legged robots for the<br />places wheels can't go.</h1></Rise>
        </div>
        <div style={{ position: "absolute", right: 96, bottom: 110, display: "grid", gap: 16, opacity: 1 - endcard }}>
          {beats.map((b) => {
            const start = b.at * fps;
            if (frame < start) return null;
            return (
              <Rise key={b.label} delay={start} style={{ width: 420, padding: "22px 26px", border: "1px solid rgba(255,255,255,.1)", borderRadius: 16, background: "rgba(11,14,18,.72)", backdropFilter: "blur(6px)" }}>
                <div style={{ ...display(64, 700), letterSpacing: -2 }}>{b.value}</div>
                <div style={mono(14, C.signal)}>{b.label}</div>
                <div style={body(18)}>{b.note}</div>
              </Rise>
            );
          })}
        </div>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: endcard, pointerEvents: "none" }}>
          <div style={{ display: "grid", justifyItems: "center", gap: 26 }}>
            <Logo height={110} />
            <div style={display(44, 500)}>Pilots open · Bengaluru first</div>
            <div style={mono(20, C.fog)}>connect@strider-robotics.in</div>
          </div>
        </AbsoluteFill>
      </div>
    </Backdrop>
  );
};
