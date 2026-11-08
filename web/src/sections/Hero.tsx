import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import M3Canvas from "../three/M3Canvas";
import GroundGrid from "../three/GroundGrid";
import { M3Model } from "@shared/robot/M3Model";
import { product, company } from "@shared/content";
import { Icon } from "../components/Icons";

function WalkingM3() {
  const [phase, setPhase] = useState(0);
  const last = useRef(0);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (t - last.current > 1 / 30) { last.current = t; setPhase(t * 3.6); }
  });
  return <M3Model gaitPhase={phase} gaitAmplitude={0.55} rotation={[0, -0.35, 0]} />;
}

export default function Hero() {
  const [ready, setReady] = useState(false);
  return (
    <section className="hero" id="top">
      <div className="hero-canvas" aria-hidden>
        <M3Canvas camera={[2.4, 1.1, 2.6]} target={[0.1, 0.45, 0]} autoRotate onCreated={() => setReady(true)}>
          <WalkingM3 />
          <GroundGrid />
        </M3Canvas>
      </div>
      <div className="container">
        <motion.div className="hero-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <span className="eyebrow">Strider M3 · {product.category}</span>
          <h1 className="h-display">Legged robots for the places wheels can't go.</h1>
          <p className="lede">{product.oneLiner}</p>
          <div className="hero-actions">
            <Link to="/#pilot" className="btn btn-primary">Book a 90-day pilot <Icon.arrow /></Link>
            <Link to="/films" className="btn btn-ghost"><Icon.play /> Watch the films</Link>
          </div>
          <div className="hero-meta">
            <span><b>{company.city}</b></span>
            <span>Spin-off · <b>IISc StochLab</b></span>
            <span>Incubated · <b>ARTPARK</b></span>
            <span>In pilots · <b>Oil & gas, automotive</b></span>
          </div>
        </motion.div>
      </div>
      <div className="hero-hint" style={{ opacity: ready ? 1 : 0, transition: "opacity .6s" }}><Icon.mouse /> Drag to orbit · scroll to open it up</div>
    </section>
  );
}
