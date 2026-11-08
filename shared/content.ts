/**
 * Single source of truth for all website + film copy.
 *
 * Facts marked `verified: true` come from public press coverage of Strider Robotics
 * (July–Sept 2026: Robotics & Automation News, Startuppedia, Indian Defence News,
 * Electronics For You, Tech Times) and IISc / ARTPARK references.
 *
 * Anything with `indicative: true` is a PLACEHOLDER chosen to be plausible for the
 * robot class so the layout can be designed. Replace with datasheet values before launch.
 * The UI renders a small "indicative" marker next to these automatically.
 */

export type Stat = {
  id: string;
  label: string;
  value: string;
  unit?: string;
  note?: string;
  verified?: boolean;
  indicative?: boolean;
};

export const company = {
  name: "Strider Robotics",
  city: "Bengaluru, India",
  founded: 2024,
  researchSince: 2018,
  origin:
    "Spin-off from the Stochastic Robotics Lab (StochLab), Centre for Cyber-Physical Systems, Indian Institute of Science.",
  incubator: "ARTPARK, IISc",
  founders: [
    { name: "Aditya Varma Sagi", role: "Co-founder & CEO" },
    { name: "Prof. Shishir Kolathaya", role: "Co-founder, IISc" },
  ],
  email: "connect@strider-robotics.in",
  website: "https://www.strider-robotics.in",
  linkedin: "https://www.linkedin.com/company/strider-robotics/",
  x: "https://x.com/strider_robo",
  youtube: "https://www.youtube.com/channel/UCnsJhFvZIazozoi0R6XB5MA",
  address: "ARTgarage (ARTPARK), 177 HMT Colony, HMT Estate, Jalahalli, Bengaluru, Karnataka 560013",
  positioning: "Autonomous legged robots for industrial inspection, material handling and asset monitoring.",
  motto: ["Reimagine Safety", "Re-engineer Efficiency", "Re-prioritize Time"],
  boilerplate:
    "Strider Robotics is a Bengaluru-based deep-tech company building autonomous legged robots for industrial inspection, monitoring and logistics. A spin-off from the Indian Institute of Science's Stochastic Robotics Lab and incubated at ARTPARK, Strider designs its own actuators and a hardware-agnostic autonomy platform. Its flagship M3 quadruped has demonstrated a 40 kg payload, stair climbing under load and towing a passenger car, and is now in field pilots with Indian oil & gas and automotive operators.",
};

export const product = {
  name: "M3",
  fullName: "Strider M3",
  category: "Industrial quadruped",
  oneLiner:
    "A made-in-India quadruped that carries 20 kg all day, has been tested to 40 kg, climbs stairs under load, and runs the sensors your inspection rounds need.",
  trl: 6,
  indigenousContent: 80, // percent, ">80%"
};

export const heroStats: Stat[] = [
  { id: "payload", label: "Payload, standard", value: "20", unit: "kg", verified: true },
  { id: "payloadTested", label: "Payload, tested", value: "40", unit: "kg", verified: true, note: "Stair climbing under 40 kg load" },
  { id: "indigenous", label: "Indigenous content", value: ">80", unit: "%", verified: true, note: "Including in-house actuators" },
  { id: "trl", label: "Technology readiness", value: "TRL 6", verified: true, note: "Towed a Honda Amaze under controlled conditions" },
];

export const specSheet: Stat[] = [
  { id: "payload", label: "Rated payload", value: "20", unit: "kg", verified: true },
  { id: "payloadMax", label: "Tested payload", value: "40", unit: "kg", verified: true },
  { id: "stairs", label: "Stair climbing", value: "Yes, under 40 kg load", verified: true },
  { id: "selfRight", label: "Self-righting", value: "Recovers after a flip", verified: true },
  { id: "tow", label: "Drawbar demo", value: "Honda Amaze (~1,000 kg)", verified: true, note: "Engine off, no driver, flat ground" },
  { id: "mass", label: "Robot mass", value: "~55", unit: "kg", indicative: true },
  { id: "speed", label: "Top speed", value: "1.5", unit: "m/s", indicative: true },
  { id: "runtime", label: "Runtime", value: "90", unit: "min", indicative: true, note: "Hot-swappable pack" },
  { id: "ip", label: "Ingress protection", value: "IP54", indicative: true, note: "Target rating" },
  { id: "bus", label: "Actuator bus", value: "EtherCAT", indicative: true, note: "Strider is an EtherCAT Technology Group member" },
  { id: "payloads", label: "Payload interfaces", value: "Thermal · LiDAR · Gas · Acoustic", verified: true },
  { id: "software", label: "Autonomy stack", value: "Hardware-agnostic, runs on 3rd-party quadrupeds", verified: true },
];

export const useCases = [
  {
    id: "oil-gas",
    title: "Oil & Gas",
    headline: "Rounds without the risk.",
    body: "Autonomous gauge reading, thermal and gas-leak scans across tank farms and process units. Currently in pilot with a major Indian operator.",
    sensors: ["Thermal camera", "Gas detector", "Acoustic (leak)"],
    verifiedPilot: true,
  },
  {
    id: "automotive",
    title: "Automotive manufacturing",
    headline: "Night-shift inspection, every night.",
    body: "Walk the plant between shifts: thermal hotspots on drives, vibration and acoustic anomalies on lines, visual checks on utilities. In pilot with an automotive manufacturer.",
    sensors: ["Thermal camera", "Acoustic", "4K PTZ"],
    verifiedPilot: true,
  },
  {
    id: "power",
    title: "Power & utilities",
    headline: "Substations and switchyards, hands off.",
    body: "Repeatable thermal surveys of transformers, breakers and bus bars; stair and gravel capable so the route doesn't need to change for the robot.",
    sensors: ["Thermal camera", "Partial-discharge acoustic"],
  },
  {
    id: "mining",
    title: "Mining",
    headline: "Go where the ground is broken.",
    body: "Legs handle rubble, slopes and stairs that stop wheeled platforms. Gas monitoring and structural visual checks in post-blast and confined areas.",
    sensors: ["Gas detector", "LiDAR mapping"],
  },
  {
    id: "shipping",
    title: "Shipping & ports",
    headline: "Decks, holds and yards on four legs.",
    body: "Hull and cargo-hold inspection, gas checks in confined spaces and asset rounds across port infrastructure where wheels and ladders slow everything down.",
    sensors: ["Gas detector", "Thermal camera", "4K PTZ"],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    headline: "Map it, then re-walk it on schedule.",
    body: "LiDAR mapping and change detection for tunnels, plants and utility corridors. Hardware-agnostic autonomy means you can mix fleets.",
    sensors: ["LiDAR", "High-res camera"],
  },
  {
    id: "defence",
    title: "Defence & public safety",
    headline: "A 40 kg mule that climbs.",
    body: "Load carriage and sensor reconnaissance on terrain where ATVs can't follow. Indigenous supply chain, >80% local content.",
    sensors: ["EO/IR", "Comms relay"],
  },
];

/** What the robot does on a round. Mirrors the Applications page on strider-robotics.in. */
export const applications = [
  { title: "Detect leakages", body: "Gas, oil, steam and water." },
  { title: "Pipeline monitoring", body: "Leakages, hotspots, insulation." },
  { title: "Hotspots", body: "Electrical switchyards and substations." },
  { title: "Asset monitoring", body: "Vibration, temperature and noise detection." },
  { title: "Partial discharge", body: "Switchgear panel monitoring." },
  { title: "Sample collection", body: "From field equipment to lab." },
  { title: "Digitise manual logs", body: "Read local gauges and alarms; advanced analytics." },
  { title: "Safety inspections", body: "Zero-compromise inspections and emergency first response." },
  { title: "Material movement", body: "Transport payload from point to point." },
];

/** Payload catalogue used by the interactive mission configurator. Weights are typical for the sensor class. */
export const payloadCatalog = [
  { id: "thermal", name: "Radiometric thermal camera", kg: 1.2, power: 8, tags: ["oil-gas", "automotive", "power"] },
  { id: "ptz", name: "4K PTZ zoom camera", kg: 2.5, power: 20, tags: ["automotive", "infrastructure", "shipping"] },
  { id: "lidar", name: "3D LiDAR (mapping)", kg: 1.0, power: 12, tags: ["infrastructure", "mining"] },
  { id: "gas", name: "Multi-gas detector (LEL / H2S / CO / O2)", kg: 0.9, power: 4, tags: ["oil-gas", "mining", "shipping"] },
  { id: "acoustic", name: "Acoustic imaging array", kg: 1.8, power: 15, tags: ["oil-gas", "automotive", "power"] },
  { id: "arm", name: "Manipulator arm (valve / door)", kg: 9.5, power: 60, tags: ["oil-gas"] },
  { id: "comms", name: "Mesh comms relay", kg: 1.4, power: 10, tags: ["defence", "mining"] },
  { id: "spot", name: "Spotlight + siren", kg: 1.1, power: 25, tags: ["defence"] },
  { id: "cargo", name: "Cargo crate (per 10 kg)", kg: 10, power: 0, tags: ["defence", "mining"] },
];

export const timeline = [
  { year: "2018", title: "Stoch 1", body: "Research and prototyping begins at StochLab, Indian Institute of Science, Bengaluru.", verified: true },
  { year: "2019", title: "Stoch 2", body: "Second-generation research quadruped; learning-based gaits.", verified: true },
  { year: "2021", title: "Stoch 3", body: "Higher-torque actuation and outdoor terrain work.", verified: true },
  { year: "2022", title: "Stoch 4 · ARTPARK pre-venture", body: "Fourth platform; the team enters the ARTPARK pre-venture programme (2022–2024).", verified: true },
  { year: "2024", title: "Strider incorporated", body: "Strider Robotics incorporated and incubated at ARTPARK, IISc, under Startup @ ARTPARK.", verified: true },
  { year: "2025", title: "MULE framework", body: "IISc publishes the adaptive reinforcement-learning framework underpinning Strider's locomotion.", verified: true },
  { year: "Jul 2026", title: "40 kg demonstrated", body: "M3 carries 40 kg across terrain and up stairs. First commercial pilots start.", verified: true },
  { year: "Sep 2026", title: "TRL 6 milestone", body: "M3 tows a Honda Amaze in Bengaluru under controlled conditions.", verified: true },
  { year: "Dec 2026", title: "First customer batch", body: "First batch of M3s scheduled for delivery to pilot clients.", verified: true },
  { year: "2027", title: "Scale", body: "Fleet software across third-party quadrupeds; ATEX / hazardous-area variant.", indicative: true },
];

export const softwarePillars = [
  { title: "Hardware-agnostic autonomy", body: "One stack for Strider M3 and compatible third-party quadrupeds. Mix fleets without mixing software." , icon: "stack" },
  { title: "Learned locomotion", body: "Reinforcement-learning controller born in IISc's StochLab. Rubble, stairs, slopes, and recovery from a flip.", icon: "legs" },
  { title: "Mission autonomy", body: "Record a route once, replay it on schedule. Waypoints, gauge reads, thermal snapshots, gas sampling.", icon: "route" },
  { title: "Inspection intelligence", body: "Anomaly flags on thermal, acoustic and gas data. Reports that your reliability team can act on.", icon: "eye" },
];

export const pilotProgram = {
  title: "Run a 90-day pilot at your site.",
  body: "We bring the M3, the sensors and an engineer. You bring one round that hurts. Together we prove it in your plant, on your stairs, in your heat.",
  steps: [
    { title: "Week 1–2 · Site survey", body: "Walk the route, map it, pick the gauges and hotspots." },
    { title: "Week 3–8 · Autonomous rounds", body: "Scheduled missions, daily reports, tuning on your terrain." },
    { title: "Week 9–12 · Business case", body: "Coverage, catch rate, hours returned. Decide on fleet." },
  ],
};

/** Third-party video of the robot. */
export const videos = [
  { id: "LOBOMjjjusU", title: "This Made-In-India Robot Is Unstoppable", credit: "runtimebrt on YouTube", poster: "/photos/yt-runtimebrt.jpg" },
];

export const press = [
  { outlet: "Robotics & Automation News", title: "Strider Robotics demonstrates 40 kg payload quadruped robot as commercial pilots begin", date: "Jul 2026", url: "https://roboticsandautomationnews.com/2026/07/18/strider-robotics-demonstrates-40-kg-payload-quadruped-robot-as-commercial-pilots-begin/103453/" },
  { outlet: "Tech Times", title: "Strider Robotics takes IISc quadruped into commercial pilots at oil and gas sites", date: "Jul 2026", url: "https://www.techtimes.com/articles/320984/20260719/strider-robotics-takes-iisc-quadruped-commercial-pilots-oil-gas-sites.htm" },
  { outlet: "Electronics For You", title: "Indigenous quadruped robot targets industrial inspection", date: "2026", url: "https://www.electronicsforu.com/news/indigenous-quadruped-robot-targets-industrial-inspection" },
  { outlet: "Startuppedia", title: "Strider Robotics shows its M3 quadruped's ability to pull a Honda Amaze", date: "Sep 2026", url: "https://startuppedia.in/trending/startup-news/strider-robotics-shows-its-m3-quadrupeds-ability-to-pull-a-honda-amaze-12577525" },
  { outlet: "Indian Defence News", title: "Strider Robotics advances indigenous quadruped UGV into industrial pilots", date: "Aug 2026", url: "https://www.indiandefensenews.in/2026/08/strider-robotics-advances-indigenous.html" },
];
