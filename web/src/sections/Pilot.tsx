import { useState, type FormEvent } from "react";
import { pilotProgram, company, useCases } from "@shared/content";
import Reveal from "../components/Reveal";

/** Set VITE_FORM_ENDPOINT (e.g. a Formspree URL) to post the form; otherwise it opens a pre-filled email. */
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

export default function Pilot() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    if (!ENDPOINT) {
      const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n");
      window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(`Pilot request · ${data.company || ""}`)}&body=${encodeURIComponent(body)}`;
      return;
    }
    setStatus("sending");
    try {
      const r = await fetch(ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: fd });
      setStatus(r.ok ? "sent" : "error");
    } catch { setStatus("error"); }
  };
  return (
    <section className="section" id="pilot">
      <div className="container">
        <Reveal>
          <div className="pilot">
            <div style={{ display: "grid", gap: 22, alignContent: "start" }}>
              <span className="eyebrow">Pilot programme</span>
              <h2 className="h-section">{pilotProgram.title}</h2>
              <p className="lede">{pilotProgram.body}</p>
              <div className="steps">
                {pilotProgram.steps.map((s, i) => (
                  <div className="step" key={s.title}><i>{i + 1}</i><div><h4>{s.title}</h4><p>{s.body}</p></div></div>
                ))}
              </div>
            </div>
            <form className="form card" onSubmit={onSubmit}>
              <div className="form-row">
                <label>Name<input name="name" required autoComplete="name" /></label>
                <label>Work email<input name="email" type="email" required autoComplete="email" /></label>
              </div>
              <div className="form-row">
                <label>Company<input name="company" required autoComplete="organization" /></label>
                <label>Industry
                  <select name="industry" defaultValue="oil-gas">{useCases.map((u) => <option key={u.id} value={u.id}>{u.title}</option>)}</select>
                </label>
              </div>
              <label>The round that hurts<textarea name="round" rows={4} placeholder="e.g. Night thermal round on the compressor deck, 40 gauges, 2 flights of stairs, 45°C in May." /></label>
              <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : status === "sent" ? "Request received ✓" : "Request a pilot"}
              </button>
              {status === "error" && <p style={{ color: "var(--danger)", fontSize: 13 }}>Could not send. Email us at {company.email}.</p>}
              <p style={{ fontSize: 12, color: "var(--fog)" }}>We reply within two working days. Bengaluru first, India-wide pilots from Q1 2027.</p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
