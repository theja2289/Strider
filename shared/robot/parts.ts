/** Part registry for the M3 exploded view. Anchors are in model space (metres), robot faces +X, up is +Y, +Z is the robot's right. */
export type PartId =
  | "shell" | "frame" | "battery" | "compute" | "pdb"
  | "lidar" | "frontCam" | "rail" | "payload"
  | "hipModule" | "thighActuator" | "thigh" | "kneeActuator" | "shank" | "foot";

export type PartInfo = {
  id: PartId;
  name: string;
  short: string;
  body: string;
  /** label anchor at explode = 0 */
  anchor: [number, number, number];
  /** label anchor at explode = 1 */
  anchorExploded: [number, number, number];
  group: "chassis" | "sensing" | "payload" | "leg";
};

// Shared geometry constants (metres)
export const DIM = {
  bodyL: 0.72, bodyH: 0.2, bodyW: 0.3,
  bodyY: 0.52,
  hipX: 0.27, hipZ: 0.19,
  L1: 0.3, L2: 0.3,
  footR: 0.04,
};

const s = 1; // right side sign used for anchors (right-front leg)

export const PARTS: PartInfo[] = [
  { id: "shell", group: "chassis", name: "Chassis shell", short: "Shell",
    body: "Sealed composite shell over an aluminium frame. Tool-free access to the battery bay and compute module.",
    anchor: [0, DIM.bodyY + 0.1, 0], anchorExploded: [0, DIM.bodyY + 0.1 + 0.55, 0] },
  { id: "frame", group: "chassis", name: "Load-bearing frame", short: "Frame",
    body: "Machined aluminium spine that carries hip loads to the payload rail. Rated for 40 kg static payload plus dynamic gait loads.",
    anchor: [-0.1, DIM.bodyY - 0.08, 0.16], anchorExploded: [-0.1, DIM.bodyY - 0.18, 0.16] },
  { id: "battery", group: "chassis", name: "Battery pack", short: "Battery",
    body: "Hot-swappable Li-ion pack in the rear bay. Swap in under a minute between missions.",
    anchor: [-0.18, DIM.bodyY, 0], anchorExploded: [-0.18 - 0.15, DIM.bodyY + 0.3, 0] },
  { id: "compute", group: "chassis", name: "Compute module", short: "Compute",
    body: "Onboard GPU compute runs the learned locomotion controller and the perception stack. No cloud needed to walk.",
    anchor: [0.16, DIM.bodyY, 0], anchorExploded: [0.16 + 0.15, DIM.bodyY + 0.3, 0] },
  { id: "pdb", group: "chassis", name: "Power & EtherCAT backbone", short: "Backbone",
    body: "Power distribution and the real-time EtherCAT bus that talks to all twelve actuators at kilohertz rates.",
    anchor: [0, DIM.bodyY + 0.02, 0], anchorExploded: [0, DIM.bodyY + 0.02 + 0.42, 0] },
  { id: "lidar", group: "sensing", name: "3D LiDAR", short: "LiDAR",
    body: "360° LiDAR for mapping, localisation and obstacle avoidance. Record a route once; the M3 re-walks it on schedule.",
    anchor: [0.3, DIM.bodyY + 0.2, 0], anchorExploded: [0.3 + 0.35, DIM.bodyY + 0.2 + 0.25, 0] },
  { id: "frontCam", group: "sensing", name: "Depth cameras", short: "Depth cams",
    body: "Stereo depth and RGB on the nose for terrain perception: stair edges, rubble, gaps, people.",
    anchor: [0.38, DIM.bodyY, 0], anchorExploded: [0.38 + 0.3, DIM.bodyY, 0] },
  { id: "rail", group: "payload", name: "Payload rail", short: "Rail",
    body: "Standard mounting rail with power and data. Mount thermal, gas, acoustic or LiDAR payloads without tools.",
    anchor: [0, DIM.bodyY + 0.14, 0.12], anchorExploded: [0, DIM.bodyY + 0.14 + 0.8, 0.12] },
  { id: "payload", group: "payload", name: "Inspection payload", short: "Payload",
    body: "Shown: radiometric thermal camera plus multi-gas sensor. Up to 20 kg standard, 40 kg tested.",
    anchor: [0.02, DIM.bodyY + 0.26, 0], anchorExploded: [0.02, DIM.bodyY + 0.26 + 1.05, 0] },
  { id: "hipModule", group: "leg", name: "Hip abduction actuator", short: "Hip",
    body: "In-house actuator: locally sourced motor, Strider-designed gearbox, driver and housing. One of twelve.",
    anchor: [DIM.hipX, DIM.bodyY, s * (DIM.hipZ + 0.04)], anchorExploded: [DIM.hipX, DIM.bodyY, s * (DIM.hipZ + 0.04 + 0.18)] },
  { id: "thighActuator", group: "leg", name: "Hip pitch actuator", short: "Hip pitch",
    body: "High-torque actuator that swings the thigh. Peak torque sized for stair climbing with 40 kg on the back.",
    anchor: [DIM.hipX, DIM.bodyY, s * (DIM.hipZ + 0.12)], anchorExploded: [DIM.hipX, DIM.bodyY, s * (DIM.hipZ + 0.12 + 0.36)] },
  { id: "thigh", group: "leg", name: "Thigh", short: "Thigh",
    body: "Hollow aluminium link routing power and EtherCAT to the knee. Replaceable in the field.",
    anchor: [DIM.hipX + 0.08, DIM.bodyY - 0.14, s * (DIM.hipZ + 0.12)], anchorExploded: [DIM.hipX + 0.08, DIM.bodyY - 0.26, s * (DIM.hipZ + 0.12 + 0.52)] },
  { id: "kneeActuator", group: "leg", name: "Knee actuator", short: "Knee",
    body: "Third actuator per leg, co-located at the knee for stiffness and simple maintenance.",
    anchor: [DIM.hipX + 0.17, DIM.bodyY - 0.25, s * (DIM.hipZ + 0.12)], anchorExploded: [DIM.hipX + 0.17, DIM.bodyY - 0.52, s * (DIM.hipZ + 0.12 + 0.68)] },
  { id: "shank", group: "leg", name: "Shank", short: "Shank",
    body: "Carbon-fibre lower leg with integrated foot-contact sensing.",
    anchor: [DIM.hipX + 0.1, DIM.bodyY - 0.38, s * (DIM.hipZ + 0.12)], anchorExploded: [DIM.hipX + 0.1, DIM.bodyY - 0.8, s * (DIM.hipZ + 0.12 + 0.82)] },
  { id: "foot", group: "leg", name: "Foot", short: "Foot",
    body: "Replaceable compliant rubber foot for grating, gravel, wet concrete and stairs.",
    anchor: [DIM.hipX, 0.04, s * (DIM.hipZ + 0.12)], anchorExploded: [DIM.hipX, 0.04 - 0.6, s * (DIM.hipZ + 0.12 + 0.95)] },
];

export const PART_BY_ID = Object.fromEntries(PARTS.map((p) => [p.id, p])) as Record<PartId, PartInfo>;

/** Order the exploded-view walkthrough steps through parts. */
export const WALKTHROUGH: PartId[] = ["payload", "rail", "lidar", "frontCam", "shell", "compute", "battery", "pdb", "hipModule", "thighActuator", "thigh", "kneeActuator", "shank", "foot", "frame"];

export const lerp3 = (a: [number, number, number], b: [number, number, number], t: number): [number, number, number] =>
  [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
