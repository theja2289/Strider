import { Grid } from "@react-three/drei";
export default function GroundGrid({ fade = 8 }: { fade?: number }) {
  return (
    <Grid position={[0, -0.001, 0]} args={[20, 20]} cellSize={0.25} cellThickness={0.6} cellColor="#2a323d" sectionSize={1} sectionThickness={1} sectionColor="#3b4654" fadeDistance={fade} fadeStrength={1.5} infiniteGrid />
  );
}
