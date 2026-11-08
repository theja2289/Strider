import { softwarePillars } from "@shared/content";
import Reveal from "../components/Reveal";
import { Icon } from "../components/Icons";

function StackDiagram() {
  const row = (y: number, label: string, items: string[], color: string) => (
    <g key={label}>
      <text x="8" y={y + 22} fill="#8b95a3" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="1.5">{label.toUpperCase()}</text>
      {items.map((it, i) => {
        const w = (720 - 160) / items.length - 8;
        const x = 160 + i * (w + 8);
        return (
          <g key={it}>
            <rect x={x} y={y} width={w} height={34} rx="8" fill={`${color}14`} stroke={`${color}66`} />
            <text x={x + w / 2} y={y + 21} textAnchor="middle" fill="#f3f5f7" fontFamily="Inter, system-ui, sans-serif" fontSize="12.5">{it}</text>
          </g>
        );
      })}
    </g>
  );
  return (
    <svg viewBox="0 0 720 300" role="img" aria-label="Strider software stack: applications, mission autonomy, perception, learned locomotion, hardware abstraction, robots">
      {row(10, "Reports", ["Inspection reports", "Anomaly alerts", "Fleet dashboard"], "#2ee6c5")}
      {row(58, "Mission", ["Route recording", "Scheduling", "Gauge / thermal / gas tasks"], "#2ee6c5")}
      {row(106, "Perception", ["LiDAR SLAM", "Terrain & stairs", "People & obstacles"], "#2ee6c5")}
      {row(154, "Locomotion", ["Learned RL controller (IISc MULE)", "Recovery & self-righting"], "#ff6a1a")}
      {row(202, "Abstraction", ["Hardware-agnostic robot interface · EtherCAT / vendor SDKs"], "#ff6a1a")}
      {row(250, "Robots", ["Strider M3", "Third-party quadruped A", "Third-party quadruped B"], "#8b95a3")}
      <path d="M150 27 V267" stroke="rgba(255,255,255,.12)" strokeDasharray="3 4" />
    </svg>
  );
}

export default function Software() {
  return (
    <section className="section" id="software">
      <div className="container">
        <div className="section-head">
          <Reveal><span className="eyebrow pulse">Autonomy platform</span></Reveal>
          <Reveal delay={0.05}><h2 className="h-section">One brain. Any legs.</h2></Reveal>
          <Reveal delay={0.1}><p className="lede">Strider's software was built to be hardware-agnostic from day one. It runs the M3, and it runs compatible third-party quadrupeds, so a plant can standardise on one autonomy stack and one reporting format whatever walks the route.</p></Reveal>
        </div>
        <div className="grid grid-2" style={{ alignItems: "start", gap: 32 }}>
          <Reveal><div className="diagram"><StackDiagram /></div></Reveal>
          <div className="pillars">
            {softwarePillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="pillar">
                  <div className="pillar-icon">{(Icon as any)[p.icon]()}</div>
                  <div><h3>{p.title}</h3><p>{p.body}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
