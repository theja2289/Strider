import { Link } from "react-router-dom";
import { films, type Film } from "../films";
import Reveal from "../components/Reveal";
import { Icon } from "../components/Icons";

export function FilmCard({ f, autoplay = false }: { f: Film; autoplay?: boolean }) {
  return (
    <article className={`film ${f.portrait ? "portrait" : ""} ${f.wide ? "wide" : ""}`}>
      <video src={f.src} poster={f.poster} controls preload="metadata" playsInline muted={autoplay} autoPlay={autoplay} loop={autoplay} />
      <div className="film-meta">
        <div className="row"><h3>{f.title}</h3><span className="chip">{f.duration}</span></div>
        <p>{f.blurb}</p>
        <div className="row"><span className="chip">{f.use}</span><a href={f.src} download>Download MP4</a></div>
      </div>
    </article>
  );
}

export default function Films({ limit = 3 }: { limit?: number }) {
  const list = films.filter((f) => !f.portrait).slice(0, limit);
  return (
    <section className="section" id="films">
      <div className="container">
        <div className="section-head">
          <Reveal><span className="eyebrow">Films</span></Reveal>
          <Reveal delay={0.05}><h2 className="h-section">Show, don't tell.</h2></Reveal>
          <Reveal delay={0.1}><p className="lede">Short, rendered-from-code films for the hero screen, the sales deck and the socials. Every one is generated from the same 3D model and brand tokens as this site, so when the robot changes, the films change.</p></Reveal>
        </div>
        <div className="films">
          {list.map((f, i) => <Reveal key={f.id} delay={i * 0.06} className={f.wide ? "wide" : undefined}><FilmCard f={f} /></Reveal>)}
        </div>
        <div style={{ marginTop: 28 }}><Link to="/films" className="btn btn-ghost">All {films.length} films <Icon.arrow /></Link></div>
      </div>
    </section>
  );
}
