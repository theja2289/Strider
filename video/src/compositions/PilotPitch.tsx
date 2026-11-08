import React from "react";
import { AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { pilotProgram, useCases } from "@shared/content";
import { Backdrop, Corner, Eyebrow, Fade, Logo, Rise, StatTile } from "../ui/primitives";
import { C, body, display, mono } from "../ui/theme";

const S1: React.FC = () => (
  <Fade><div style={{ position: "absolute", left: 96, top: 260, display: "grid", gap: 20, maxWidth: 1300 }}>
    <Rise><Eyebrow>Pilot programme</Eyebrow></Rise>
    <Rise delay={8}><h1 style={display(104, 600)}>Pick the round<br />that hurts.</h1></Rise>
    <Rise delay={18}><p style={{ ...body(30), maxWidth: 1000 }}>Heat. Height. Gas. Night shift. Stairs. The one your team dreads, and your reliability engineer wishes ran every hour.</p></Rise>
  </div></Fade>
);
const S2: React.FC = () => (
  <Fade>
    <Img src={staticFile("photos/m3-render.png")} style={{ position: "absolute", right: 40, top: 120, height: 820 }} />
    <div style={{ position: "absolute", left: 96, top: 300, display: "grid", gap: 20, maxWidth: 820 }}>
      <Rise><Eyebrow>Strider M3</Eyebrow></Rise>
      <Rise delay={8}><h2 style={display(84, 600)}>We bring the robot,<br />the sensors and<br />an engineer.</h2></Rise>
      <Rise delay={18}><p style={body(28)}>{pilotProgram.body}</p></Rise>
    </div>
  </Fade>
);
const S3: React.FC = () => (
  <Fade>
    <div style={{ position: "absolute", left: 96, top: 170, display: "grid", gap: 14 }}>
      <Rise><Eyebrow>90 days</Eyebrow></Rise>
      <Rise delay={6}><h2 style={display(72, 600)}>Three steps to a business case.</h2></Rise>
    </div>
    <div style={{ position: "absolute", left: 96, right: 96, top: 440, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
      {pilotProgram.steps.map((s, i) => (
        <Rise key={s.title} delay={16 + i * 10} style={{ padding: "34px 34px", border: "1px solid rgba(255,255,255,.1)", borderRadius: 22, background: "rgba(255,255,255,.03)", minHeight: 300, display: "grid", gap: 14, alignContent: "start" }}>
          <div style={{ width: 54, height: 54, borderRadius: 27, display: "grid", placeItems: "center", border: `1px solid ${C.signal}88`, background: `${C.signal}22`, ...mono(20, C.signal), letterSpacing: 0 }}>{i + 1}</div>
          <div style={display(36, 600)}>{s.title}</div>
          <div style={body(24)}>{s.body}</div>
        </Rise>
      ))}
    </div>
  </Fade>
);
const S4: React.FC = () => (
  <Fade>
    <div style={{ position: "absolute", left: 96, top: 170, display: "grid", gap: 14 }}>
      <Rise><Eyebrow>Why now</Eyebrow></Rise>
      <Rise delay={6}><h2 style={display(72, 600)}>Proven in the field, built next door.</h2></Rise>
    </div>
    <div style={{ position: "absolute", left: 96, top: 440, display: "flex", gap: 24, flexWrap: "wrap", width: 1740 }}>
      <StatTile delay={14} value="20 kg" label="Rated payload" note="All-day sensor loads" width={410} />
      <StatTile delay={22} value="40 kg" label="Tested payload" note="Up stairs, on gravel" width={410} />
      <StatTile delay={30} value=">80%" label="Indigenous" note="Actuators included" width={410} />
      <StatTile delay={38} value="2" label="Pilots running" note="Oil & gas · automotive" width={410} />
    </div>
    <Rise delay={50} style={{ position: "absolute", left: 96, bottom: 110, display: "flex", gap: 14, flexWrap: "wrap" }}>
      {useCases.map((u) => <span key={u.id} style={{ padding: "10px 18px", borderRadius: 999, border: "1px solid rgba(255,255,255,.14)", ...body(20, C.paper) }}>{u.title}</span>)}
    </Rise>
  </Fade>
);
const S5: React.FC = () => (
  <Fade>
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "grid", justifyItems: "center", gap: 30 }}>
        <Rise><Logo height={120} /></Rise>
        <Rise delay={10}><div style={display(56, 500)}>Book a 90-day pilot.</div></Rise>
        <Rise delay={18}><div style={mono(24, C.signal)}>connect@strider-robotics.in · strider-robotics.in</div></Rise>
        <Rise delay={26}><div style={body(22)}>ARTPARK, Indian Institute of Science · Bengaluru</div></Rise>
      </div>
    </AbsoluteFill>
  </Fade>
);

export const PilotPitch: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const scenes = [S1, S2, S3, S4, S5];
  const durs = [6, 7, 8, 8, 7];
  let from = 0;
  const last = durs.reduce((a, b) => a + b, 0) * fps;
  const corner = interpolate(frame, [last - 7 * fps - 10, last - 7 * fps], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Backdrop>
      <div style={{ opacity: corner }}><Corner text="Pilot with Strider" /></div>
      {scenes.map((Sc, i) => { const f = from; from += durs[i] * fps; return <Sequence key={i} from={f} durationInFrames={durs[i] * fps}><Sc /></Sequence>; })}
    </Backdrop>
  );
};
