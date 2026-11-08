import { films } from "../films";
import { FilmCard } from "../sections/Films";
import Reveal from "../components/Reveal";

export default function FilmsPage() {
  return (
    <main className="page">
      <div className="container">
        <div className="section-head">
          <Reveal><span className="eyebrow">Films</span></Reveal>
          <Reveal delay={0.05}><h1 className="h-section">Every film, every format.</h1></Reveal>
          <Reveal delay={0.1}><p className="lede">Rendered with Remotion from the same 3D model and content file as the website. Download the MP4s for decks, trade-show screens and social. To change a number or a colour, edit <code className="mono">shared/content.ts</code> and re-render.</p></Reveal>
        </div>
        <div className="films" style={{ marginBottom: 80 }}>
          {films.map((f, i) => <Reveal key={f.id} delay={(i % 3) * 0.05} className={f.wide ? "wide" : undefined}><FilmCard f={f} /></Reveal>)}
        </div>
      </div>
    </main>
  );
}
