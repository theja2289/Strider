import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop, Corner, Eyebrow, LogoMark, Rise } from "../ui/primitives";
import { C, body, display, mono } from "../ui/theme";

/** Top-down plant map. Coordinates in a 1200x760 SVG space. */
const ROUTE: Array<[number, number]> = [[90, 660], [90, 470], [300, 470], [300, 250], [560, 250], [560, 420], [860, 420], [860, 180], [1090, 180], [1090, 640], [700, 640], [90, 660]];
type Ev = { at: number; label: string; detail: string; kind: "ok" | "warn" | "info"; pos: number };
const EVENTS: Ev[] = [
  { at: 2.0, label: "Mission start", detail: "Route R-07 · Compressor deck · 06:00", kind: "info", pos: 0.0 },
  { at: 5.5, label: "Gauge P-204", detail: "6.2 bar · within limits", kind: "ok", pos: 0.18 },
  { at: 9.0, label: "Stairs +1 level", detail: "12 steps · 40 kg payload", kind: "info", pos: 0.33 },
  { at: 12.5, label: "Thermal · flange F-18", detail: "78 °C · +21 °C vs baseline", kind: "warn", pos: 0.48 },
  { at: 16.0, label: "Gas · H₂S", detail: "0 ppm · LEL 0%", kind: "ok", pos: 0.62 },
  { at: 19.5, label: "Acoustic · pump 3B", detail: "Bearing signature nominal", kind: "ok", pos: 0.78 },
  { at: 23.0, label: "Return to dock", detail: "Battery 41% · 1.8 km walked", kind: "info", pos: 0.96 },
  { at: 26.0, label: "Report sent", detail: "1 anomaly flagged · PDF + CSV", kind: "warn", pos: 1.0 },
];
const segLen = (a: [number, number], b: [number, number]) => Math.hypot(b[0] - a[0], b[1] - a[1]);
const total = ROUTE.slice(1).reduce((s, p, i) => s + segLen(ROUTE[i], p), 0);
const pointAt = (f: number): [number, number] => {
  let d = Math.max(0, Math.min(1, f)) * total;
  for (let i = 1; i < ROUTE.length; i++) {
    const L = segLen(ROUTE[i - 1], ROUTE[i]);
    if (d <= L) { const k = L === 0 ? 0 : d / L; return [ROUTE[i - 1][0] + (ROUTE[i][0] - ROUTE[i - 1][0]) * k, ROUTE[i - 1][1] + (ROUTE[i][1] - ROUTE[i - 1][1]) * k]; }
    d -= L;
  }
  return ROUTE[ROUTE.length - 1];
};
const col = (k: Ev["kind"]) => (k === "ok" ? C.pulse : k === "warn" ? C.warn : C.signal);

export const MissionWalkthrough: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / fps;
  const prog = interpolate(t, [2, 24.5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  const [rx, ry] = pointAt(prog);
  const dash = total * (1 - prog);
  const fadeOut = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  const seen = EVENTS.filter((e) => t >= e.at);
  return (
    <Backdrop>
      <div style={{ opacity: fadeOut }}>
        <Corner text="A round at the plant" />
        <div style={{ position: "absolute", left: 96, top: 150, display: "grid", gap: 10 }}>
          <Rise><Eyebrow>Mission autonomy</Eyebrow></Rise>
          <Rise delay={6}><h2 style={display(48, 600)}>Record the route once. The M3 walks it every shift.</h2></Rise>
        </div>
        {/* map */}
        <div style={{ position: "absolute", left: 96, top: 300, width: 1150, height: 700 }}>
          <svg viewBox="0 0 1200 760" width="100%" height="100%">
            <defs><filter id="g"><feGaussianBlur stdDeviation="6" /></filter></defs>
            {/* tanks */}
            {[[420, 120], [720, 110], [980, 420], [420, 560]].map(([x, y], i) => (
              <g key={i}><circle cx={x} cy={y} r={70} fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.18)" strokeWidth={2} /><circle cx={x} cy={y} r={48} fill="none" stroke="rgba(255,255,255,.08)" /><text x={x} y={y + 5} textAnchor="middle" fill={C.fog} fontFamily="ui-monospace, monospace" fontSize="16">T-{101 + i}</text></g>
            ))}
            {/* pipe racks */}
            <rect x={180} y={330} width={620} height={24} rx={4} fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.12)" />
            <rect x={620} y={480} width={24} height={200} rx={4} fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.12)" />
            {/* compressor building */}
            <rect x={640} y={520} width={300} height={170} rx={8} fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.18)" strokeWidth={2} />
            <text x={790} y={612} textAnchor="middle" fill={C.fog} fontFamily="ui-monospace, monospace" fontSize="16">COMPRESSOR DECK</text>
            {/* stairs */}
            {[0, 1, 2, 3, 4].map((i) => <line key={i} x1={300} y1={300 + i * 12} x2={340} y2={300 + i * 12} stroke="rgba(255,255,255,.3)" strokeWidth={2} />)}
            {/* dock */}
            <rect x={60} y={640} width={60} height={40} rx={6} fill="rgba(127,178,234,.12)" stroke={C.signal} />
            <text x={90} y={705} textAnchor="middle" fill={C.fog} fontFamily="ui-monospace, monospace" fontSize="14">DOCK</text>
            {/* route */}
            <polyline points={ROUTE.map((p) => p.join(",")).join(" ")} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth={3} strokeDasharray="8 10" />
            <polyline points={ROUTE.map((p) => p.join(",")).join(" ")} fill="none" stroke={C.signal} strokeWidth={4} strokeDasharray={total} strokeDashoffset={dash} strokeLinecap="round" strokeLinejoin="round" />
            {/* event pins */}
            {EVENTS.filter((e) => e.pos > 0 && e.pos < 1).map((e) => {
              const [x, y] = pointAt(e.pos); const on = t >= e.at;
              return <g key={e.label} opacity={on ? 1 : 0.25}><circle cx={x} cy={y} r={on ? 10 : 6} fill={on ? col(e.kind) : "rgba(255,255,255,.3)"} />{on && <circle cx={x} cy={y} r={22} fill="none" stroke={col(e.kind)} strokeOpacity={0.5} />}</g>;
            })}
            {/* robot */}
            <g transform={`translate(${rx},${ry})`}>
              <circle r={34} fill={C.signal} opacity={0.25} filter="url(#g)" />
              <circle r={16} fill={C.ink} stroke={C.signal} strokeWidth={3} />
              <circle r={5} fill={C.paper} />
            </g>
          </svg>
          <div style={{ position: "absolute", left: 0, top: 0, transform: `translate(${(rx / 1200) * 1150 - 22}px, ${(ry / 760) * 700 - 60}px)` }}><LogoMark height={28} /></div>
        </div>
        {/* telemetry */}
        <div style={{ position: "absolute", right: 96, top: 300, width: 520, display: "grid", gap: 10, alignContent: "start" }}>
          <div style={{ display: "flex", justifyContent: "space-between", ...mono(14, C.fog) }}><span>Live telemetry</span><span style={{ color: C.pulse }}>● LIVE</span></div>
          {seen.slice(-6).map((e) => (
            <Rise key={e.label} delay={e.at * fps} distance={16} style={{ display: "grid", gridTemplateColumns: "12px 1fr auto", gap: 14, alignItems: "center", padding: "14px 16px", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, background: "rgba(255,255,255,.03)" }}>
              <span style={{ width: 12, height: 12, borderRadius: 6, background: col(e.kind), boxShadow: `0 0 12px ${col(e.kind)}` }} />
              <div><div style={{ ...body(20, C.paper), fontWeight: 600 }}>{e.label}</div><div style={body(16)}>{e.detail}</div></div>
              <span style={mono(12, C.fog)}>{String(Math.floor(e.at)).padStart(2, "0")}:{String(Math.round((e.at % 1) * 60)).padStart(2, "0")}</span>
            </Rise>
          ))}
          {t >= 26 && (
            <Rise delay={26 * fps} style={{ marginTop: 8, padding: "18px 20px", borderRadius: 14, border: `1px solid ${C.warn}66`, background: `${C.warn}14` }}>
              <div style={{ ...body(20, C.paper), fontWeight: 600 }}>Anomaly report · Flange F-18</div>
              <div style={body(16)}>Thermal +21 °C vs baseline. Work order suggested. In your inbox at 06:32.</div>
            </Rise>
          )}
        </div>
      </div>
    </Backdrop>
  );
};
