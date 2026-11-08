import { specSheet } from "@shared/content";
import Reveal from "../components/Reveal";
import { IndicativeMark } from "../components/Indicative";
import M3Canvas from "../three/M3Canvas";
import { M3Model } from "@shared/robot/M3Model";

export default function SpecSheet() {
  return (
    <section className="section" id="specs">
      <div className="container">
        <div className="grid grid-2" style={{ alignItems: "center", gap: 40 }}>
          <Reveal>
            <div style={{ height: 460, position: "relative" }}>
              <M3Canvas camera={[2.6, 1.0, 2.4]} target={[0, 0.5, 0]} controls autoRotate dpr={[1, 1.5]}>
                <M3Model pitch={-0.18} position={[0, 0.07, 0]} rotation={[0, 0.3, 0]} />
              </M3Canvas>
              <div style={{ position: "absolute", left: 16, bottom: 12, fontFamily: "var(--mono)", fontSize: 11, color: "var(--fog)", letterSpacing: ".1em" }}>M3 · STAIR-CLIMB POSE · DRAG TO ORBIT</div>
            </div>
          </Reveal>
          <div>
            <Reveal><span className="eyebrow">Specifications</span></Reveal>
            <Reveal delay={0.05}><h2 className="h-section" style={{ margin: "16px 0 24px" }}>The numbers.</h2></Reveal>
            <Reveal delay={0.1}>
              <dl className="spec">
                {specSheet.map((s) => (
                  <div className="spec-row" key={s.id}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}{s.unit && <span style={{ color: "var(--signal)", marginLeft: 4, fontSize: ".85em" }}>{s.unit}</span>}<IndicativeMark stat={s} />{s.note && <small>{s.note}</small>}</dd>
                  </div>
                ))}
              </dl>
              <p style={{ marginTop: 16, fontSize: 13, color: "var(--fog)" }}>Figures marked <span className="indicative-mark" style={{ verticalAlign: "baseline" }}>indicative</span> are placeholders pending the datasheet. Everything else is from public demonstrations and press coverage.</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
