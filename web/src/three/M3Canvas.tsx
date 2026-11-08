import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense, type ReactNode } from "react";
import { M3Lights } from "@shared/robot/M3Model";

/** Shared Canvas with studio lighting, local (no network) environment and soft ground shadow. */
export default function M3Canvas({
  children, camera = [2.2, 1.2, 2.6], target = [0, 0.45, 0], controls = true, autoRotate = false, shadows = true, className, dpr = [1, 1.75], onCreated,
}: {
  children: ReactNode; camera?: [number, number, number]; target?: [number, number, number]; controls?: boolean; autoRotate?: boolean; shadows?: boolean; className?: string; dpr?: [number, number]; onCreated?: () => void;
}) {
  return (
    <Canvas className={className} shadows={shadows} dpr={dpr} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} onCreated={onCreated} style={{ background: "transparent" }}>
      <PerspectiveCamera makeDefault fov={32} position={camera} near={0.1} far={50} />
      <Suspense fallback={null}>
        <M3Lights />
        <Environment resolution={128} frames={1}>
          <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[8, 8, 1]} />
          <Lightformer intensity={1.2} rotation-y={Math.PI / 2} position={[-5, 1, 0]} scale={[6, 2, 1]} color="#7fb2ea" />
          <Lightformer intensity={1.5} rotation-y={-Math.PI / 2} position={[5, 1, 0]} scale={[6, 2, 1]} color="#dfe8f2" />
        </Environment>
        {children}
        {shadows && <ContactShadows position={[0, 0.001, 0]} opacity={0.65} scale={6} blur={2.4} far={2.5} color="#000" />}
      </Suspense>
      {controls && (
        <OrbitControls target={target} enablePan={false} enableZoom={false} autoRotate={autoRotate} autoRotateSpeed={0.6} minPolarAngle={0.6} maxPolarAngle={1.45} makeDefault />
      )}
    </Canvas>
  );
}
