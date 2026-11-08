import { useCases, applications } from "@shared/content";
import Reveal from "../components/Reveal";

export default function UseCases() {
  return (
    <section className="section" id="industries">
      <div className="container">
        <div className="section-head">
          <Reveal><span className="eyebrow">Industries</span></Reveal>
          <Reveal delay={0.05}><h2 className="h-section">Diagnose anomalies in the field from the control room.</h2></Reveal>
          <Reveal delay={0.1}><p className="lede">Heat, height, gas, night shifts, stairs. The M3 takes the repetitive and the risky, and sends back data your reliability team can act on.</p></Reveal>
        </div>
        <div className="apps">
          {applications.map((a) => <div className="app" key={a.title}><b>{a.title}</b><span>{a.body}</span></div>)}
        </div>
        <div className="grid grid-3">
          {useCases.map((u, i) => (
            <Reveal key={u.id} delay={(i % 3) * 0.07}>
              <article className="card usecase">
                <span className="num">0{i + 1}</span>
                <h3>{u.title}</h3>
                <div className="headline">{u.headline}</div>
                <p>{u.body}</p>
                <div className="tags">
                  {u.verifiedPilot && <span className="chip verified">● In pilot</span>}
                  {u.sensors.map((s) => <span className="chip" key={s}>{s}</span>)}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
