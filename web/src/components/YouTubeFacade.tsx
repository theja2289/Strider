import { useState } from "react";
import { asset } from "../asset";
import { Icon } from "./Icons";

/**
 * Click-to-play YouTube embed. Shows a local poster until clicked (no YouTube cookies on page load),
 * then swaps in the iframe. Always offers an "Open on YouTube" link for contexts that block iframes.
 */
export default function YouTubeFacade({ id, title, poster, credit }: { id: string; title: string; poster: string; credit?: string }) {
  const [play, setPlay] = useState(false);
  const url = `https://www.youtube.com/watch?v=${id}`;
  return (
    <figure className="yt" style={{ margin: 0 }}>
      <div className="yt-frame">
        {play ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button className="yt-poster" onClick={() => setPlay(true)} aria-label={`Play: ${title}`}>
            <img src={asset(poster)} alt="" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = "hidden"; }} />
            <span className="yt-play"><Icon.play /></span>
          </button>
        )}
      </div>
      <figcaption>
        <div><b>{title}</b>{credit && <span> · {credit}</span>}</div>
        <a href={url} target="_blank" rel="noreferrer">Open on YouTube ↗</a>
      </figcaption>
    </figure>
  );
}
