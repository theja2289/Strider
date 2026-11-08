import Reveal from "../components/Reveal";
import { company, videos } from "@shared/content";
import YouTubeFacade from "../components/YouTubeFacade";
import { asset } from "../asset";

export default function Photos() {
  return (
    <section className="section" id="metal" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head">
          <Reveal><span className="eyebrow">In the metal</span></Reveal>
          <Reveal delay={0.05}><h2 className="h-section">Built in Bengaluru. Seen in the wild.</h2></Reveal>
          <Reveal delay={0.1}><div className="motto">{company.motto.map((m, i) => <span key={m}>{i > 0 && ""}<b>{m.split(" ")[0]}</b> {m.split(" ").slice(1).join(" ")}</span>)}</div></Reveal>
        </div>
        <div style={{ marginBottom: 18 }}>
          <Reveal>
            <YouTubeFacade id={videos[0].id} title={videos[0].title} poster={videos[0].poster} credit={videos[0].credit} />
          </Reveal>
        </div>
        <div className="photos">
          <Reveal>
            <figure className="photo" style={{ margin: 0 }}>
              <img src={asset("/photos/m3-render.png")} alt="Strider M3 quadruped robot with sensor payload, product render" loading="lazy" />
              <figcaption><b>M3 · inspection configuration</b><span>Sensor mast, aluminium actuators</span></figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.08}>
            <figure className="photo" style={{ margin: 0 }}>
              <img src={asset("/photos/m3-prototype.png")} alt="Strider M3 prototype, machined aluminium with in-house actuators" loading="lazy" />
              <figcaption><b>M3 · prototype</b><span>In-house actuators</span></figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
