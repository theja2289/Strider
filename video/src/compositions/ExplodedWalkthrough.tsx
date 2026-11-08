import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { M3Model } from "@shared/robot/M3Model";
import { PART_BY_ID, WALKTHROUGH, type PartId } from "@shared/robot/parts";
import { Scene3D } from "../ui/Scene3D";
import { Backdrop, Corner, Eyebrow, Rise } from "../ui/primitives";
import { C, body, display, mono } from "../ui/theme";

const STEPS: PartId[] = WALKTHROUGH.filter((p) => p !== "frame");

export const ExplodedWalkthrough: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / fps;
  const open = interpolate(t, [1.2, 4.2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const close = interpolate(t, [26.5, 29.2], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const explode = Math.min(open, close);
  const stepLen = (26 - 4.5) / STEPS.length;
  const stepIdx = t >= 4.5 && t < 26 ? Math.min(STEPS.length - 1, Math.floor((t - 4.5) / stepLen)) : -1;
  const active = stepIdx >= 0 ? STEPS[stepIdx] : null;
  const info = active ? PART_BY_ID[active] : null;
  const yaw = -0.55 + t * 0.05;
  const cam: [number, number, number] = [2.75, 1.35 + explode * 0.4, 2.95];
  const fadeOut = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  return (
    <Backdrop>
      <AbsoluteFill style={{ opacity: fadeOut }}>
        <Scene3D camera={cam} lookAt={[0, 0.62 + explode * 0.28, 0]} fov={32}>
          <M3Model rotation={[0, yaw, 0]} explode={explode} highlight={active} position={[0.25, 0, 0]} />
        </Scene3D>
      </AbsoluteFill>
      <div style={{ opacity: fadeOut }}>
        <Corner text="Inside the M3" />
        {/* side panel */}
        <div style={{ position: "absolute", right: 96, top: 230, width: 560, display: "grid", gap: 16 }}>
          {!info ? (
            <>
              <Rise delay={10}><Eyebrow>Exploded view</Eyebrow></Rise>
              <Rise delay={16}><h2 style={display(60, 600)}>{t < 26.5 ? "Fifteen parts. Twelve are motors we build." : "Assembled. Ready for your round."}</h2></Rise>
              <Rise delay={24}><p style={body(24)}>{t < 26.5 ? "More than 80% of the M3 is designed and made in India, including every actuator." : "Pilots open. connect@strider-robotics.in"}</p></Rise>
            </>
          ) : (
            <div key={info.id}>
              <Rise delay={Math.round((4.5 + stepIdx * stepLen) * fps)}>
                <div style={{ ...mono(15, C.signal), marginBottom: 14 }}>{String(stepIdx + 1).padStart(2, "0")} / {STEPS.length} · {info.group}</div>
                <h2 style={{ ...display(56, 600), marginBottom: 14 }}>{info.name}</h2>
                <p style={body(24)}>{info.body}</p>
              </Rise>
            </div>
          )}
        </div>
        {/* progress */}
        <div style={{ position: "absolute", left: 96, right: 96, bottom: 72, display: "flex", gap: 6 }}>
          {STEPS.map((id, i) => (
            <div key={id} style={{ flex: 1, height: 4, borderRadius: 2, background: i < stepIdx ? `${C.signal}66` : i === stepIdx ? C.signal : "rgba(255,255,255,.12)" }} />
          ))}
        </div>
        <div style={{ position: "absolute", left: 96, bottom: 92, ...mono(14, C.fog) }}>Explode {Math.round(explode * 100)}%</div>
      </div>
    </Backdrop>
  );
};
