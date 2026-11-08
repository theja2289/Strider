import { useState } from "react";
import { company, product, heroStats, press, specSheet } from "@shared/content";
import Reveal from "../components/Reveal";
import Logo from "../components/Logo";
import { brand } from "@shared/brand";
import { asset } from "../asset";

function Copy({ text, label = "Copy" }: { text: string; label?: string }) {
  const [ok, setOk] = useState(false);
  return <button className="btn btn-ghost btn-sm copybtn" onClick={() => { navigator.clipboard?.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500); }}>{ok ? "Copied ✓" : label}</button>;
}

export default function PressKit() {
  const facts = [
    ...heroStats.map((s) => ({ b: `${s.value}${s.unit ?? ""}`, s: s.label })),
    { b: String(company.founded), s: "Incorporated, Bengaluru" },
    { b: "IISc", s: "StochLab spin-off" },
    { b: "ARTPARK", s: "Incubator" },
    { b: "2", s: "Industrial pilots (oil & gas, automotive)" },
  ];
  const factText = [`${company.name} · fact sheet`, ...facts.map((f) => `• ${f.s}: ${f.b}`), "", ...specSheet.filter((s) => s.verified).map((s) => `• ${s.label}: ${s.value}${s.unit ? " " + s.unit : ""}`)].join("\n");
  return (
    <main className="page">
      <div className="container" style={{ display: "grid", gap: 56, paddingBottom: 80 }}>
        <div className="section-head">
          <Reveal><span className="eyebrow">Press kit</span></Reveal>
          <Reveal delay={0.05}><h1 className="h-section">Everything a journalist or partner needs, on one page.</h1></Reveal>
          <Reveal delay={0.1}><p className="lede">Boilerplate, verified facts, logo and coverage. Copy freely; please attribute to {company.name}.</p></Reveal>
        </div>

        <Reveal>
          <div className="press-grid">
            <div className="card" style={{ display: "grid", gap: 14, alignContent: "start" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h3>Boilerplate</h3><Copy text={company.boilerplate} /></div>
              <p style={{ color: "var(--fog)" }}>{company.boilerplate}</p>
              <div className="hr" />
              <h3 style={{ fontSize: 16 }}>Founders</h3>
              <ul style={{ margin: 0, paddingLeft: 18, color: "var(--fog)" }}>{company.founders.map((f) => <li key={f.name}><b style={{ color: "var(--paper)" }}>{f.name}</b> · {f.role}</li>)}</ul>
              <div className="hr" />
              <h3 style={{ fontSize: 16 }}>Product in one line</h3>
              <p style={{ color: "var(--fog)" }}>{product.fullName}: {product.oneLiner}</p>
            </div>
            <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
              <div className="card" style={{ display: "grid", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}><h3>Logo</h3><div style={{ display: "flex", gap: 8 }}><a className="btn btn-ghost btn-sm" href={asset(brand.logo.horizontalWhite)} download="strider-robotics-logo-white.png">White PNG</a><a className="btn btn-ghost btn-sm" href={asset(brand.logo.horizontalBlack)} download="strider-robotics-logo-black.png">Black PNG</a></div></div>
                <div className="grid grid-2">
                  <div className="logo-tile" style={{ background: "#000" }}><Logo tone="white" size="lg" /></div>
                  <div className="logo-tile" style={{ background: "#fff" }}><Logo tone="black" size="lg" /></div>
                </div>
                <p style={{ fontSize: 13, color: "var(--fog)" }}>Official logo files, unmodified. Keep clear space of one mark-height around the logo; do not recolour or distort. UI accent on this site: #7FB2EA (from the M3 render), status green #43E08A, ink #0B0E12.</p>
              </div>
              <div className="card" style={{ display: "grid", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h3>Fact sheet</h3><Copy text={factText} label="Copy all" /></div>
                <div className="fact-grid">{facts.map((f) => <div className="fact" key={f.s}><b>{f.b}</b><span>{f.s}</span></div>)}</div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ display: "grid", gap: 16 }}>
            <h2 className="h-section" style={{ fontSize: 30 }}>Coverage</h2>
            <div className="press-list">
              {press.map((p) => (
                <a className="press-item" key={p.url} href={p.url} target="_blank" rel="noreferrer">
                  <div><b>{p.title}</b><span>{p.outlet} · {p.date}</span></div>
                  <span className="mono" style={{ fontSize: 12, color: "var(--pulse)" }}>Open ↗</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="card" style={{ display: "grid", gap: 8 }}>
            <h3>Media contact</h3>
            <p style={{ color: "var(--fog)" }}><a href={`mailto:${company.email}`} style={{ color: "var(--pulse)" }}>{company.email}</a> · {company.address} · <a href={company.website} target="_blank" rel="noreferrer" style={{ color: "var(--pulse)" }}>strider-robotics.in</a></p>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
