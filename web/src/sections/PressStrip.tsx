import { press } from "@shared/content";
import Reveal from "../components/Reveal";

export default function PressStrip() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <Reveal>
          <div className="hr" style={{ marginBottom: 36 }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px 36px", alignItems: "center", justifyContent: "space-between" }}>
            <span className="eyebrow" style={{ color: "var(--fog)" }}>As covered by</span>
            {press.map((p) => (
              <a key={p.url} href={p.url} target="_blank" rel="noreferrer" style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 16, color: "var(--fog)" }} title={p.title}>{p.outlet}</a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
