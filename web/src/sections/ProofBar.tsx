import { heroStats } from "@shared/content";
import Reveal from "../components/Reveal";
import { IndicativeMark } from "../components/Indicative";

export default function ProofBar() {
  return (
    <section className="section" id="m3" style={{ paddingTop: 0 }}>
      <div className="container">
        <Reveal>
          <div className="stats" role="list">
            {heroStats.map((s) => (
              <div className="stat" role="listitem" key={s.id}>
                <div className="stat-value">{s.value}{s.unit && <small>{s.unit}</small>}<IndicativeMark stat={s} /></div>
                <div className="stat-label">{s.label}</div>
                {s.note && <div className="stat-note">{s.note}</div>}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
