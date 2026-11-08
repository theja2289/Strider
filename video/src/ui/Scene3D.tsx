import React from "react";
import { ThreeCanvas } from "@remotion/three";
import { useVideoConfig } from "remotion";
import { Environment, Lightformer, PerspectiveCamera } from "@react-three/drei";
import { M3Lights } from "@shared/robot/M3Model";
import { C } from "./theme";

/** Remotion 3D stage: same lighting as the website, no network assets. */
export const Scene3D: React.FC<{ children: React.ReactNode; camera: [number, number, number]; lookAt?: [number, number, number]; fov?: number }> = ({ children, camera, lookAt = [0, 0.45, 0], fov = 30 }) => {
  const { width, height } = useVideoConfig();
  return (
    <ThreeCanvas width={width} height={height} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
      <PerspectiveCamera makeDefault fov={fov} position={camera} near={0.1} far={50} onUpdate={(c) => c.lookAt(lookAt[0], lookAt[1], lookAt[2])} />
      <M3Lights />
      <Environment resolution={64} frames={1}>
        <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[8, 8, 1]} />
        <Lightformer intensity={1.2} rotation-y={Math.PI / 2} position={[-5, 1, 0]} scale={[6, 2, 1]} color={C.signal} />
        <Lightformer intensity={1.5} rotation-y={-Math.PI / 2} position={[5, 1, 0]} scale={[6, 2, 1]} color="#dfe8f2" />
      </Environment>
      <gridHelper args={[12, 48, "#2a323d", "#1a2028"]} position={[0, -0.002, 0]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.003, 0]}>
        <circleGeometry args={[1.6, 48]} />
        <meshBasicMaterial color="#000" transparent opacity={0.35} />
      </mesh>
      {children}
    </ThreeCanvas>
  );
};
