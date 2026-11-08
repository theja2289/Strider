import { timeline } from "@shared/content";
import Reveal from "../components/Reveal";

export default function Timeline() {
  return (
    <section className="section" id="journey">
      <div className="container">
        <div className="section-head">
          <Reveal><span className="eyebrow">Journey</span></Reveal>
          <Reveal delay={0.05}><h2 className="h-section">A decade of legs, now walking into plants.</h2></Reveal>
          <Reveal delay={0.1}><p className="lede">Strider is the commercial arm of one of India's longest-running legged-robotics research programmes. The M3 is what ten years of Stoch quadrupeds learned.</p></Reveal>
        </div>
        <Reveal>
          <ol className="tl" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {timeline.map((t) => (
              <li className={`tl-item ${t.indicative ? "future" : ""}`} key={t.year + t.title}>
                <div className="tl-dot" />
                <div>
                  <div className="tl-year">{t.year}</div>
                  <h3>{t.title}</h3>
                  <p>{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
