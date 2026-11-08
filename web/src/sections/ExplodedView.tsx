import { useEffect, useMemo, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Html } from "@react-three/drei";
import M3Canvas from "../three/M3Canvas";
import GroundGrid from "../three/GroundGrid";
import { M3Model } from "@shared/robot/M3Model";
import { PARTS, PART_BY_ID, WALKTHROUGH, lerp3, type PartId } from "@shared/robot/parts";

const GROUPS: Array<{ id: PartId["length"] extends never ? never : string; label: string; ids: PartId[] }> = [
  { id: "payload", label: "Payload", ids: ["payload", "rail"] },
  { id: "sensing", label: "Sensing", ids: ["lidar", "frontCam"] },
  { id: "chassis", label: "Chassis", ids: ["shell", "compute", "battery", "pdb", "frame"] },
  { id: "leg", label: "Leg (×4)", ids: ["hipModule", "thighActuator", "thigh", "kneeActuator", "shank", "foot"] },
];

function Callout({ id, explode }: { id: PartId; explode: number }) {
  const p = PART_BY_ID[id];
  const pos = lerp3(p.anchor, p.anchorExploded, explode);
  return (
    <Html position={pos} zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
      <div className="xv-callout"><div className="dot" /><div className="tag">{p.short}</div></div>
    </Html>
  );
}

export default function ExplodedView() {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const [progress, setProgress] = useState(0);
  const [manual, setManual] = useState<PartId | null>(null);
  const [override, setOverride] = useState<number | null>(null);
  useMotionValueEvent(scrollYProgress, "change", (v) => { setProgress(v); setManual(null); });

  const explodeFromScroll = Math.min(1, Math.max(0, (progress - 0.02) / 0.16));
  const explode = override ?? explodeFromScroll;
  const stepT = Math.min(0.999, Math.max(0, (progress - 0.2) / 0.78));
  const step = Math.floor(stepT * WALKTHROUGH.length);
  const scrollPart = progress < 0.18 ? null : WALKTHROUGH[step];
  const active = manual ?? scrollPart;
  const info = active ? PART_BY_ID[active] : null;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 900;
  const cam = useMemo<[number, number, number]>(() => (isMobile ? [3.4, 1.9, 4.6] : [3.0, 1.5, 3.4]), [isMobile]);

  useEffect(() => { if (override !== null) { const t = setTimeout(() => setOverride(null), 6000); return () => clearTimeout(t); } }, [override]);

  return (
    <section className="xv" id="exploded">
      <div className="xv-track" ref={track}>
        <div className="xv-sticky">
          <div className="xv-canvas">
            <M3Canvas camera={cam} target={[0, 0.65 + explode * 0.25, 0]} controls shadows={explode < 0.6}>
              <M3Model explode={explode} highlight={active} onPartClick={(id) => setManual(id)} rotation={[0, -0.5, 0]} />
              {active && explode > 0.05 && <Callout id={active} explode={explode} />}
              <GroundGrid fade={6} />
            </M3Canvas>
          </div>
          <div className="xv-panel">
            <span className="eyebrow">Inside the M3</span>
            {!info ? (
              <div className="xv-part">
                <h3>Fifteen parts. Twelve of them are motors we build ourselves.</h3>
                <p>Keep scrolling to take the M3 apart, or tap any component. More than 80% of what you see is designed and made in India, including the actuators.</p>
              </div>
            ) : (
              <div className="xv-part" key={info.id}>
                <span className="chip">{GROUPS.find((g) => g.ids.includes(info.id))?.label}</span>
                <h3>{info.name}</h3>
                <p>{info.body}</p>
              </div>
            )}
            <div className="xv-progress" aria-label="Walkthrough progress">
              {WALKTHROUGH.map((id, i) => (
                <button key={id} className={`xv-dot ${active === id ? "on" : i < step && scrollPart ? "done" : ""}`} title={PART_BY_ID[id].name} onClick={() => { setManual(id); if (explode < 0.5) setOverride(1); }} aria-label={PART_BY_ID[id].name} />
              ))}
            </div>
            <div className="xv-legend">
              {GROUPS.map((g) => (
                <button key={g.id} className={active && g.ids.includes(active) ? "on" : ""} onClick={() => { setManual(g.ids[0]); if (explode < 0.5) setOverride(1); }}>{g.label}</button>
              ))}
            </div>
            <div className="xv-controls">
              <label>Explode <input type="range" min={0} max={1} step={0.01} value={explode} onChange={(e) => setOverride(parseFloat(e.target.value))} /></label>
              <span className="mono">{Math.round(explode * 100)}%</span>
              <span style={{ opacity: .7 }}>· {PARTS.length} parts · drag to orbit</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
