import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop, Corner, Counter, Eyebrow, Rise } from "../ui/primitives";
import { C, body, display, mono } from "../ui/theme";

/**
 * Payload story. Chart rules (dataviz skill): one measure per axis, single hue for magnitude,
 * thin bars anchored to a baseline with 4px rounded data-ends, direct labels in text tokens,
 * recessive grid. The 1,000 kg tow is a different measure, so it gets its own scene, not a third bar.
 */
const BARS = [
  { label: "Rated payload", value: 20, note: "Standard configuration" },
  { label: "Tested payload", value: 40, note: "Stairs climbed under load" },
];
const MAX = 44;

export const PayloadStory: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / fps;
  const scene2 = interpolate(t, [8.2, 8.9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const fadeOut = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  const W = 1300, rowH = 150, left = 420;
  return (
    <Backdrop>
      <div style={{ opacity: fadeOut }}>
        <Corner text="What 40 kg means" />
        {/* Scene 1: chart */}
        <AbsoluteFill style={{ opacity: 1 - scene2, transform: `translateY(${-scene2 * 40}px)` }}>
          <div style={{ position: "absolute", left: 96, top: 170, display: "grid", gap: 12 }}>
            <Rise><Eyebrow>Payload</Eyebrow></Rise>
            <Rise delay={6}><h2 style={display(58, 600)}>Carried payload, kg</h2></Rise>
          </div>
          <div style={{ position: "absolute", left: 96, top: 380, width: W + left }}>
            {/* gridlines */}
            {[0, 10, 20, 30, 40].map((g) => (
              <div key={g} style={{ position: "absolute", left: left + (g / MAX) * W, top: -20, height: BARS.length * rowH + 20, borderLeft: `1px ${g === 0 ? "solid" : "dashed"} rgba(255,255,255,${g === 0 ? 0.3 : 0.1})` }}>
                <span style={{ position: "absolute", top: BARS.length * rowH + 26, left: -12, ...mono(14, C.fog) }}>{g}</span>
              </div>
            ))}
            {BARS.map((b, i) => {
              const start = 24 + i * 18;
              const p = interpolate(frame, [start, start + 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
              const w = (b.value / MAX) * W * p;
              return (
                <div key={b.label} style={{ position: "absolute", top: i * rowH, left: 0, width: W + left, height: rowH }}>
                  <div style={{ position: "absolute", left: 0, top: 28, width: left - 40 }}>
                    <div style={{ ...body(26, C.paper), fontWeight: 600 }}>{b.label}</div>
                    <div style={body(18)}>{b.note}</div>
                  </div>
                  <div style={{ position: "absolute", left, top: 40, height: 44, width: w, background: C.signal, borderRadius: "0 4px 4px 0", opacity: 0.95 }} />
                  <div style={{ position: "absolute", left: left + w + 18, top: 34, ...display(44, 700), color: C.paper }}>
                    <Counter to={b.value} delay={start} duration={40} /> <span style={{ ...mono(18, C.fog) }}>kg</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ position: "absolute", left: 96, bottom: 100, ...body(20) }}>Source: Strider Robotics field demonstrations, July 2026. Rated figure is the standard configuration; tested figure from separate trials.</div>
        </AbsoluteFill>
        {/* Scene 2: hero number (different measure, so not on the same axis) */}
        <AbsoluteFill style={{ opacity: scene2 }}>
          <div style={{ position: "absolute", left: 96, top: 190, display: "grid", gap: 12 }}>
            <Rise delay={8.6 * fps}><Eyebrow>Drawbar demonstration · Sept 2026</Eyebrow></Rise>
            <Rise delay={8.6 * fps + 6}><h2 style={display(58, 600)}>Then it towed a car.</h2></Rise>
          </div>
          <div style={{ position: "absolute", left: 96, top: 420 }}>
            <Rise delay={9.2 * fps}><div style={{ ...display(240, 700), letterSpacing: -10, lineHeight: 0.9 }}>~<Counter to={1000} delay={9.2 * fps} duration={45} /></div></Rise>
            <Rise delay={9.2 * fps + 8}><div style={{ ...mono(22, C.signal), marginTop: 18 }}>kg · Honda Amaze · engine off, no driver, flat ground</div></Rise>
            <Rise delay={9.2 * fps + 16}><div style={{ ...body(24), marginTop: 18, maxWidth: 820 }}>Controlled conditions, declared by Strider as a Technology Readiness Level 6 milestone. Twelve in-house actuators, one EtherCAT backbone, zero imported motors.</div></Rise>
          </div>
          <Img src={staticFile("photos/m3-prototype.png")} style={{ position: "absolute", right: 60, bottom: 40, height: 640, opacity: 0.95 * scene2 }} />
        </AbsoluteFill>
      </div>
    </Backdrop>
  );
};
