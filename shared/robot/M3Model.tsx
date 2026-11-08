import React, { useMemo } from "react";
import type { ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { brand } from "../brand";
import { DIM, type PartId } from "./parts";

export type M3Props = {
  /** 0 = assembled, 1 = fully exploded */
  explode?: number;
  /** part to highlight (others dim slightly) */
  highlight?: PartId | null;
  /** 0..2π trot phase; undefined = standing */
  gaitPhase?: number;
  /** 0..1 how much the gait moves the legs */
  gaitAmplitude?: number;
  /** show the sensor payload on the rail */
  withPayload?: boolean;
  /** body lean (rad) e.g. for stair-climb pose */
  pitch?: number;
  /** overall scale */
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  /** lighter materials for software renderers */
  simple?: boolean;
  onPartClick?: (id: PartId) => void;
};

const C = brand.colors;

type MatKind = "shell" | "frame" | "actuator" | "actuatorRing" | "link" | "carbon" | "rubber" | "glass" | "accent" | "sensor" | "cell";

function useMaterials(highlight: PartId | null | undefined, simple: boolean) {
  return useMemo(() => {
    const mk = (opts: THREE.MeshStandardMaterialParameters) =>
      new THREE.MeshStandardMaterial({ ...opts });
    const base: Record<MatKind, THREE.MeshStandardMaterial> = {
      shell: mk({ color: C.body, metalness: 0.45, roughness: 0.42 }),
      frame: mk({ color: "#9a9ea3", metalness: 0.9, roughness: 0.32 }),
      actuator: mk({ color: C.aluminium, metalness: 0.92, roughness: 0.28 }),
      actuatorRing: mk({ color: C.capBlue, metalness: 0.35, roughness: 0.4, emissive: C.capBlue, emissiveIntensity: 0.12 }),
      link: mk({ color: "#b4b8bd", metalness: 0.88, roughness: 0.34 }),
      carbon: mk({ color: C.shankBlue, metalness: 0.6, roughness: 0.4 }),
      rubber: mk({ color: "#0a0c0e", metalness: 0, roughness: 0.95 }),
      glass: mk({ color: "#0c1f14", metalness: 0.2, roughness: 0.1, emissive: C.pulse, emissiveIntensity: 0.55 }),
      accent: mk({ color: C.pulse, metalness: 0.1, roughness: 0.4, emissive: C.pulse, emissiveIntensity: 0.6 }),
      sensor: mk({ color: "#2a2e33", metalness: 0.6, roughness: 0.4 }),
      cell: mk({ color: "#2b3138", metalness: 0.5, roughness: 0.45 }),
    };
    if (simple) Object.values(base).forEach((m) => { m.metalness = Math.min(m.metalness, 0.4); m.roughness = Math.max(m.roughness, 0.5); });
    return base;
  }, [simple]);
}

/** Wraps a part: positions it with explode offset, applies highlight tint. */
function Part({
  id, explode, offset, highlight, children, position = [0, 0, 0], onClick,
}: {
  id: PartId; explode: number; offset: [number, number, number]; highlight: PartId | null | undefined;
  children: React.ReactNode; position?: [number, number, number]; onClick?: (id: PartId) => void;
}) {
  const p: [number, number, number] = [
    position[0] + offset[0] * explode,
    position[1] + offset[1] * explode,
    position[2] + offset[2] * explode,
  ];
  const isHi = highlight === id;
  const dim = highlight && !isHi;
  return (
    <group
      position={p}
      onClick={onClick ? (e) => { e.stopPropagation(); onClick(id); } : undefined}
      onPointerOver={onClick ? (e) => { e.stopPropagation(); document.body.style.cursor = "pointer"; } : undefined}
      onPointerOut={onClick ? () => { document.body.style.cursor = ""; } : undefined}
    >
      <HighlightCtx.Provider value={isHi ? "hi" : dim ? "dim" : "none"}>{children}</HighlightCtx.Provider>
    </group>
  );
}

const HighlightCtx = React.createContext<"hi" | "dim" | "none">("none");

/** A mesh that picks material by kind and applies highlight state. */
function M({ kind, geometry, mats, side, ...rest }: { kind: MatKind; geometry: THREE.BufferGeometry; mats: Record<MatKind, THREE.MeshStandardMaterial>; side?: THREE.Side } & Omit<ThreeElements["mesh"], "geometry">) {
  const hl = React.useContext(HighlightCtx);
  const mat = useMemo(() => {
    const m = mats[kind].clone();
    if (side !== undefined) m.side = side;
    if (hl === "hi") {
      m.emissive = new THREE.Color(C.signal);
      m.emissiveIntensity = 0.45;
    } else if (hl === "dim") {
      m.transparent = true;
      m.opacity = 0.45;
      m.depthWrite = false;
    }
    return m;
  }, [mats, kind, hl, side]);
  return <mesh geometry={geometry} material={mat} castShadow receiveShadow {...rest} />;
}

function useGeo() {
  return useMemo(() => {
    const g = {
      shell: new RoundedBoxGeometry(DIM.bodyL, DIM.bodyH * 0.55, DIM.bodyW, 4, 0.035),
      frame: new RoundedBoxGeometry(DIM.bodyL * 0.98, DIM.bodyH * 0.45, DIM.bodyW * 0.96, 3, 0.02),
      battery: new RoundedBoxGeometry(0.26, 0.11, 0.2, 2, 0.012),
      compute: new RoundedBoxGeometry(0.2, 0.09, 0.18, 2, 0.01),
      fin: new THREE.BoxGeometry(0.18, 0.012, 0.003),
      pdb: new THREE.BoxGeometry(0.5, 0.008, 0.2),
      lidarBase: new THREE.CylinderGeometry(0.035, 0.045, 0.05, 24),
      lidarPuck: new THREE.CylinderGeometry(0.045, 0.045, 0.06, 32),
      lidarWindow: new THREE.CylinderGeometry(0.046, 0.046, 0.025, 32, 1, true),
      camBar: new RoundedBoxGeometry(0.03, 0.05, 0.2, 2, 0.008),
      camLens: new THREE.CylinderGeometry(0.012, 0.012, 0.01, 16),
      rail: new THREE.BoxGeometry(0.56, 0.015, 0.03),
      railCross: new THREE.BoxGeometry(0.03, 0.015, 0.26),
      payloadBox: new RoundedBoxGeometry(0.22, 0.1, 0.16, 2, 0.01),
      thermal: new THREE.CylinderGeometry(0.03, 0.035, 0.07, 20),
      gasStack: new THREE.CylinderGeometry(0.02, 0.02, 0.08, 16),
      hipModule: new RoundedBoxGeometry(0.13, 0.12, 0.08, 2, 0.015),
      actuator: new THREE.CylinderGeometry(0.062, 0.062, 0.075, 32),
      actuatorRing: new THREE.TorusGeometry(0.058, 0.006, 8, 40),
      actuatorCap: new THREE.CylinderGeometry(0.03, 0.03, 0.08, 20),
      thigh: new RoundedBoxGeometry(0.055, DIM.L1 + 0.04, 0.035, 2, 0.012),
      knee: new THREE.CylinderGeometry(0.045, 0.045, 0.06, 28),
      shank: new THREE.CylinderGeometry(0.016, 0.026, DIM.L2, 14),
      foot: new THREE.SphereGeometry(DIM.footR, 20, 16),
      light: new THREE.BoxGeometry(0.02, 0.012, 0.06),
    };
    return g;
  }, []);
}

type LegProps = {
  fx: 1 | -1; // front(+1)/rear(-1)
  sz: 1 | -1; // right(+1)/left(-1)
  explode: number; highlight: PartId | null | undefined; phase: number; amp: number;
  mats: ReturnType<typeof useMaterials>; geo: ReturnType<typeof useGeo>; onPartClick?: (id: PartId) => void;
};

function Leg({ fx, sz, explode, highlight, phase, amp, mats, geo, onPartClick }: LegProps) {
  // Trot: diagonal pairs share phase.
  const ph = phase + (fx * sz > 0 ? 0 : Math.PI);
  const swing = Math.sin(ph);
  const lift = Math.max(0, Math.sin(ph + Math.PI / 2)); // lift during swing half
  const thighA = 0.62 + amp * 0.35 * swing;
  const shankA = -1.24 - amp * (0.45 * lift);
  const hipAbd = sz * 0.03 * amp * Math.sin(ph * 2);
  const e = explode;
  const hipPos: [number, number, number] = [fx * DIM.hipX, DIM.bodyY, sz * (DIM.hipZ + 0.02)];
  return (
    <group position={hipPos} rotation={[hipAbd, 0, 0]}>
      <Part id="hipModule" explode={e} offset={[0, 0, sz * 0.18]} highlight={highlight} onClick={onPartClick}>
        <M kind="frame" geometry={geo.hipModule} mats={mats} position={[0, 0, sz * 0.02]} />
        <M kind="actuator" geometry={geo.actuator} mats={mats} rotation={[0, 0, Math.PI / 2]} position={[fx * -0.02, 0, sz * 0.0]} scale={[0.8, 0.9, 0.8]} />
      </Part>
      <Part id="thighActuator" explode={e} offset={[0, 0, sz * 0.36]} highlight={highlight} position={[0, 0, sz * 0.085]} onClick={onPartClick}>
        <M kind="actuator" geometry={geo.actuator} mats={mats} rotation={[Math.PI / 2, 0, 0]} />
        <M kind="actuatorRing" geometry={geo.actuatorRing} mats={mats} position={[0, 0, sz * 0.03]} />
        <M kind="actuatorRing" geometry={geo.actuatorCap} mats={mats} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, sz * 0.02]} scale={[1.6, 1, 1.6]} />
      </Part>
      {/* thigh group rotates about Z at the hip */}
      <group position={[0, 0, sz * 0.125]} rotation={[0, 0, thighA]}>
        <Part id="thigh" explode={e} offset={[0, -0.12, sz * 0.5]} highlight={highlight} onClick={onPartClick}>
          <M kind="link" geometry={geo.thigh} mats={mats} position={[0, -DIM.L1 / 2 + 0.01, 0]} />
          <M kind="accent" geometry={geo.light} mats={mats} position={[0.03, -DIM.L1 * 0.5, 0]} rotation={[0, 0, Math.PI / 2]} scale={[1, 1, 1.6]} />
        </Part>
        <group position={[0, -DIM.L1, 0]} rotation={[0, 0, shankA]}>
          <Part id="kneeActuator" explode={e} offset={[0, -0.14, sz * 0.62]} highlight={highlight} onClick={onPartClick}>
            <M kind="actuator" geometry={geo.knee} mats={mats} rotation={[Math.PI / 2, 0, 0]} />
            <M kind="actuatorRing" geometry={geo.actuatorRing} mats={mats} position={[0, 0, sz * 0.022]} scale={[0.75, 0.75, 1]} />
          </Part>
          <Part id="shank" explode={e} offset={[0, -0.26, sz * 0.74]} highlight={highlight} onClick={onPartClick}>
            <M kind="carbon" geometry={geo.shank} mats={mats} position={[0, -DIM.L2 / 2, 0]} />
          </Part>
          <Part id="foot" explode={e} offset={[0, -0.42, sz * 0.86]} highlight={highlight} position={[0, -DIM.L2, 0]} onClick={onPartClick}>
            <M kind="rubber" geometry={geo.foot} mats={mats} />
          </Part>
        </group>
      </group>
    </group>
  );
}

export function M3Model({
  explode = 0, highlight = null, gaitPhase, gaitAmplitude = 1, withPayload = true, pitch = 0,
  scale = 1, position = [0, 0, 0], rotation = [0, 0, 0], simple = false, onPartClick,
}: M3Props) {
  const mats = useMaterials(highlight, simple);
  const geo = useGeo();
  const phase = gaitPhase ?? 0;
  const amp = gaitPhase === undefined ? 0 : gaitAmplitude;
  const bob = amp * 0.012 * Math.sin(phase * 2);
  const e = explode;
  const by = DIM.bodyY + bob;
  const legs: Array<[1 | -1, 1 | -1]> = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <group rotation={[0, 0, pitch]} position={[0, bob, 0]}>
        {/* Frame (static reference) */}
        <Part id="frame" explode={e} offset={[0, -0.08, 0]} highlight={highlight} position={[0, DIM.bodyY - 0.05, 0]} onClick={onPartClick}>
          <M kind="frame" geometry={geo.frame} mats={mats} />
        </Part>
        {/* Internals */}
        <Part id="battery" explode={e} offset={[-0.15, 0.3, 0]} highlight={highlight} position={[-0.18, DIM.bodyY + 0.01, 0]} onClick={onPartClick}>
          <M kind="cell" geometry={geo.battery} mats={mats} />
          <M kind="accent" geometry={geo.light} mats={mats} position={[-0.13, 0.03, 0]} />
        </Part>
        <Part id="compute" explode={e} offset={[0.15, 0.3, 0]} highlight={highlight} position={[0.16, DIM.bodyY, 0]} onClick={onPartClick}>
          <M kind="sensor" geometry={geo.compute} mats={mats} />
          {[-0.06, -0.03, 0, 0.03, 0.06].map((z) => (
            <M key={z} kind="link" geometry={geo.fin} mats={mats} position={[0, 0.052, z]} />
          ))}
        </Part>
        <Part id="pdb" explode={e} offset={[0, 0.42, 0]} highlight={highlight} position={[0, DIM.bodyY + 0.03, 0]} onClick={onPartClick}>
          <M kind="cell" geometry={geo.pdb} mats={mats} />
        </Part>
        {/* Shell */}
        <Part id="shell" explode={e} offset={[0, 0.55, 0]} highlight={highlight} position={[0, DIM.bodyY + 0.055, 0]} onClick={onPartClick}>
          <M kind="shell" geometry={geo.shell} mats={mats} />
          {/* accent stripe */}
          <mesh position={[0, 0.0, DIM.bodyW / 2 + 0.001]}>
            <planeGeometry args={[0.5, 0.012]} />
            <meshStandardMaterial color={C.capBlue} emissive={C.capBlue} emissiveIntensity={0.35} />
          </mesh>
          <mesh position={[0, 0.0, -DIM.bodyW / 2 - 0.001]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[0.5, 0.012]} />
            <meshStandardMaterial color={C.capBlue} emissive={C.capBlue} emissiveIntensity={0.35} />
          </mesh>
        </Part>
        {/* Sensing */}
        <Part id="lidar" explode={e} offset={[0.35, 0.25, 0]} highlight={highlight} position={[0.28, DIM.bodyY + 0.11, 0]} onClick={onPartClick}>
          <M kind="frame" geometry={geo.lidarBase} mats={mats} position={[0, 0.025, 0]} />
          <M kind="sensor" geometry={geo.lidarPuck} mats={mats} position={[0, 0.08, 0]} />
          <M kind="glass" geometry={geo.lidarWindow} mats={mats} position={[0, 0.08, 0]} side={THREE.DoubleSide} />
        </Part>
        <Part id="frontCam" explode={e} offset={[0.3, 0, 0]} highlight={highlight} position={[DIM.bodyL / 2 + 0.012, DIM.bodyY + 0.02, 0]} onClick={onPartClick}>
          <M kind="sensor" geometry={geo.camBar} mats={mats} />
          <M kind="glass" geometry={geo.camLens} mats={mats} rotation={[0, 0, Math.PI / 2]} position={[0.016, 0, 0.06]} />
          <M kind="glass" geometry={geo.camLens} mats={mats} rotation={[0, 0, Math.PI / 2]} position={[0.016, 0, -0.06]} />
          <M kind="accent" geometry={geo.light} mats={mats} position={[0.014, -0.012, 0]} rotation={[0, 0, Math.PI / 2]} scale={[0.6, 1, 1.4]} />
        </Part>
        {/* Payload rail + payload */}
        <Part id="rail" explode={e} offset={[0, 0.8, 0]} highlight={highlight} position={[-0.03, DIM.bodyY + 0.12, 0]} onClick={onPartClick}>
          <M kind="frame" geometry={geo.rail} mats={mats} position={[0, 0, 0.1]} />
          <M kind="frame" geometry={geo.rail} mats={mats} position={[0, 0, -0.1]} />
          <M kind="frame" geometry={geo.railCross} mats={mats} position={[-0.2, 0, 0]} />
          <M kind="frame" geometry={geo.railCross} mats={mats} position={[0.2, 0, 0]} />
        </Part>
        {withPayload && (
          <Part id="payload" explode={e} offset={[0, 1.05, 0]} highlight={highlight} position={[-0.02, DIM.bodyY + 0.18, 0]} onClick={onPartClick}>
            <M kind="shell" geometry={geo.payloadBox} mats={mats} />
            <M kind="sensor" geometry={geo.thermal} mats={mats} rotation={[0, 0, Math.PI / 2]} position={[0.12, 0.01, -0.03]} />
            <M kind="glass" geometry={geo.camLens} mats={mats} rotation={[0, 0, Math.PI / 2]} position={[0.157, 0.01, -0.03]} scale={[1.6, 1, 1.6]} />
            <M kind="accent" geometry={geo.gasStack} mats={mats} position={[-0.06, 0.08, 0.03]} />
            <M kind="sensor" geometry={geo.gasStack} mats={mats} position={[-0.06, 0.08, -0.03]} scale={[0.8, 0.8, 0.8]} />
          </Part>
        )}
        {/* Legs */}
        {legs.map(([fx, sz]) => (
          <Leg key={`${fx}${sz}`} fx={fx} sz={sz} explode={e} highlight={highlight} phase={phase} amp={amp} mats={mats} geo={geo} onPartClick={onPartClick} />
        ))}
      </group>
    </group>
  );
}

/** Consistent studio lighting used by both site and films. */
export function M3Lights({ intensity = 1 }: { intensity?: number }) {
  return (
    <>
      <ambientLight intensity={0.35 * intensity} />
      <hemisphereLight args={["#cfd8e3", "#0b0e12", 0.6 * intensity]} />
      <directionalLight position={[3, 5, 2]} intensity={2.2 * intensity} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0004}>
        <orthographicCamera attach="shadow-camera" args={[-3, 3, 3, -3, 0.5, 12]} />
      </directionalLight>
      <directionalLight position={[-4, 2, -3]} intensity={0.9 * intensity} color={brand.colors.pulse} />
      <directionalLight position={[0, 1, -5]} intensity={1.4 * intensity} color={brand.colors.ember} />
    </>
  );
}
