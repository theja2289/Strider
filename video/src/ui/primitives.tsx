import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "@shared/brand";
import { C, body, display, mono } from "./theme";

/** Page background: ink + faint engineering grid, matching the site. */
export const Backdrop: React.FC<{ children?: React.ReactNode; vignette?: boolean }> = ({ children, vignette = true }) => (
  <AbsoluteFill style={{ background: C.ink, overflow: "hidden" }}>
    <AbsoluteFill style={{
      backgroundImage: `linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)`,
      backgroundSize: "96px 96px",
      maskImage: "radial-gradient(ellipse at 50% 30%, #000 20%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, #000 20%, transparent 80%)",
    }} />
    {vignette && <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,.55) 100%)" }} />}
    {children}
  </AbsoluteFill>
);

export const Logo: React.FC<{ height?: number; style?: React.CSSProperties; tone?: "white" | "black" }> = ({ height = 56, style, tone = "white" }) => (
  <Img src={staticFile((tone === "white" ? brand.logo.horizontalWhite : brand.logo.horizontalBlack).replace(/^\//, ""))} style={{ height, width: height * brand.logo.ratio, ...style }} />
);
export const LogoMark: React.FC<{ height?: number; style?: React.CSSProperties }> = ({ height = 56, style }) => (
  <Img src={staticFile(brand.logo.markWhite.replace(/^\//, ""))} style={{ height, width: height * brand.logo.markRatio, ...style }} />
);

/** Spring-in from below with fade. `delay` in frames. */
export const Rise: React.FC<{ delay?: number; children: React.ReactNode; style?: React.CSSProperties; distance?: number; out?: number }> = ({ delay = 0, children, style, distance = 40, out }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200, stiffness: 120, mass: 0.9 } });
  const fadeOut = out !== undefined ? interpolate(frame, [out, out + 12], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
  return <div style={{ opacity: p * fadeOut, transform: `translateY(${(1 - p) * distance}px)`, ...style }}>{children}</div>;
};

export const Eyebrow: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = C.signal }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, ...mono(18, color) }}>
    <span style={{ width: 36, height: 3, background: color, display: "inline-block" }} />{children}
  </div>
);

/** Animated number counting up. */
export const Counter: React.FC<{ to: number; from?: number; delay?: number; duration?: number; decimals?: number; prefix?: string; suffix?: string; style?: React.CSSProperties }> = ({ to, from = 0, delay = 0, duration = 36, decimals = 0, prefix = "", suffix = "", style }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [delay, delay + duration], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const v = from + (to - from) * t;
  return <span style={style}>{prefix}{v.toFixed(decimals)}{suffix}</span>;
};

export const StatTile: React.FC<{ value: React.ReactNode; label: string; note?: string; delay?: number; width?: number }> = ({ value, label, note, delay = 0, width = 360 }) => (
  <Rise delay={delay} style={{ width, padding: "28px 30px", border: "1px solid rgba(255,255,255,.1)", borderRadius: 18, background: "rgba(255,255,255,.03)", display: "grid", gap: 8 }}>
    <div style={{ ...display(72, 700), letterSpacing: -2.5 }}>{value}</div>
    <div style={mono(15, C.fog)}>{label}</div>
    {note && <div style={body(18)}>{note}</div>}
  </Rise>
);

export const Lower: React.FC<{ title: string; sub?: string; delay?: number; out?: number }> = ({ title, sub, delay = 0, out }) => (
  <div style={{ position: "absolute", left: 96, bottom: 96, display: "grid", gap: 10 }}>
    <Rise delay={delay} out={out}><div style={{ ...display(54, 600) }}>{title}</div></Rise>
    {sub && <Rise delay={delay + 6} out={out}><div style={body(26)}>{sub}</div></Rise>}
  </div>
);

export const Corner: React.FC<{ text?: string }> = ({ text = "strider-robotics.in" }) => (
  <>
    <div style={{ position: "absolute", top: 56, left: 96 }}><Logo height={44} /></div>
    <div style={{ position: "absolute", top: 68, right: 96, ...mono(16, C.fog) }}>{text}</div>
  </>
);

export const Fade: React.FC<{ children: React.ReactNode; inFrames?: number; outFrames?: number; style?: React.CSSProperties }> = ({ children, inFrames = 12, outFrames = 12, style }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const o = Math.min(
    interpolate(frame, [0, inFrames], [0, 1], { extrapolateRight: "clamp" }),
    interpolate(frame, [durationInFrames - outFrames, durationInFrames], [1, 0], { extrapolateLeft: "clamp" }),
  );
  return <AbsoluteFill style={{ opacity: o, ...style }}>{children}</AbsoluteFill>;
};
