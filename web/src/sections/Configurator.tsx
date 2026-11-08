import { useMemo, useState } from "react";
import { payloadCatalog, useCases } from "@shared/content";
import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";

const RATED = 20, TESTED = 40, MAXBAR = 48;

export default function Configurator() {
  const [industry, setIndustry] = useState(useCases[0].id);
  const recommended = useMemo(() => payloadCatalog.filter((p) => p.tags.includes(industry)).map((p) => p.id), [industry]);
  const [picked, setPicked] = useState<string[]>(() => payloadCatalog.filter((p) => p.tags.includes(useCases[0].id) && p.id !== "arm" && p.id !== "cargo").map((p) => p.id));
  const [cargo, setCargo] = useState(0);

  const choose = (id: string) => {
    setIndustry(id);
    setPicked(payloadCatalog.filter((p) => p.tags.includes(id) && p.id !== "arm" && p.id !== "cargo").map((p) => p.id));
    setCargo(id === "defence" || id === "mining" ? 2 : 0);
  };
  const toggle = (id: string) => setPicked((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const items = payloadCatalog.filter((p) => p.id !== "cargo" && picked.includes(p.id));
  const kg = items.reduce((a, p) => a + p.kg, 0) + cargo * 10;
  const watts = items.reduce((a, p) => a + p.power, 0);
  const state = kg <= RATED ? "ok" : kg <= TESTED ? "ext" : "over";
  const verdict = state === "ok"
    ? `Within the 20 kg rated payload with ${(RATED - kg).toFixed(1)} kg to spare. Ready for a standard-configuration pilot.`
    : state === "ext"
      ? `Above the 20 kg rated payload, within the 40 kg tested envelope. We've carried this up stairs; talk to us about an extended-payload pilot.`
      : `Above the 40 kg tested envelope. Split the mission across two robots or drop a payload.`;

  return (
    <section className="section" id="configurator">
      <div className="container">
        <div className="section-head">
          <Reveal><span className="eyebrow">Mission configurator</span></Reveal>
          <Reveal delay={0.05}><h2 className="h-section">Load it up. See if it fits.</h2></Reveal>
          <Reveal delay={0.1}><p className="lede">Pick your industry, tick the sensors your rounds need, and check the weight budget against what the M3 is rated for and what it has already carried. Sensor weights are typical for each class.</p></Reveal>
        </div>
        <Reveal>
          <div className="cfg">
            <div>
              <div className="cfg-tabs" role="tablist">
                {useCases.map((u) => <button key={u.id} role="tab" aria-selected={industry === u.id} className={industry === u.id ? "on" : ""} onClick={() => choose(u.id)}>{u.title}</button>)}
              </div>
              <div className="cfg-list">
                {payloadCatalog.filter((p) => p.id !== "cargo").map((p) => (
                  <label key={p.id} className={`cfg-item ${picked.includes(p.id) ? "on" : ""}`}>
                    <input type="checkbox" checked={picked.includes(p.id)} onChange={() => toggle(p.id)} />
                    <span>{p.name}{recommended.includes(p.id) && <span className="rec">recommended</span>}</span>
                    <span className="w">{p.kg.toFixed(1)} kg · {p.power} W</span>
                  </label>
                ))}
                <div className={`cfg-item ${cargo > 0 ? "on" : ""}`} style={{ cursor: "default" }}>
                  <span />
                  <span>Cargo / spares <span className="rec">10 kg per crate</span></span>
                  <span className="w" style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <button className="btn btn-ghost btn-sm" style={{ padding: "4px 10px" }} onClick={() => setCargo(Math.max(0, cargo - 1))} aria-label="Remove crate">−</button>
                    {cargo} × 10 kg
                    <button className="btn btn-ghost btn-sm" style={{ padding: "4px 10px" }} onClick={() => setCargo(Math.min(4, cargo + 1))} aria-label="Add crate">+</button>
                  </span>
                </div>
              </div>
            </div>
            <div className="budget card">
              <div>
                <div className="eyebrow" style={{ marginBottom: 28 }}>Weight budget</div>
                <div className="budget-bar">
                  <div className={`budget-fill ${state}`} style={{ width: `${Math.min(100, (kg / MAXBAR) * 100)}%` }} />
                  <div className="budget-mark" style={{ left: `${(RATED / MAXBAR) * 100}%` }}><span>20 kg rated</span></div>
                  <div className="budget-mark" style={{ left: `${(TESTED / MAXBAR) * 100}%` }}><span>40 kg tested</span></div>
                </div>
              </div>
              <div className="budget-kpis">
                <div className="budget-kpi"><b>{kg.toFixed(1)}<span style={{ fontSize: 14, marginLeft: 3, color: "var(--signal)" }}>kg</span></b><span>Payload</span></div>
                <div className="budget-kpi"><b>{watts}<span style={{ fontSize: 14, marginLeft: 3, color: "var(--signal)" }}>W</span></b><span>Payload draw</span></div>
                <div className="budget-kpi"><b>{items.length + (cargo > 0 ? 1 : 0)}</b><span>Modules</span></div>
              </div>
              <div className={`budget-verdict ${state}`}>{verdict}</div>
              <Link to="/#pilot" className="btn btn-primary" style={{ justifySelf: "start" }}>Pilot this configuration</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
