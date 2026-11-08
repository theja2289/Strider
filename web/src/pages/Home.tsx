import Hero from "../sections/Hero";
import ProofBar from "../sections/ProofBar";
import Photos from "../sections/Photos";
import ExplodedView from "../sections/ExplodedView";
import Software from "../sections/Software";
import UseCases from "../sections/UseCases";
import Configurator from "../sections/Configurator";
import Films from "../sections/Films";
import SpecSheet from "../sections/SpecSheet";
import Timeline from "../sections/Timeline";
import Pilot from "../sections/Pilot";
import PressStrip from "../sections/PressStrip";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProofBar />
      <Photos />
      <PressStrip />
      <ExplodedView />
      <Software />
      <UseCases />
      <Configurator />
      <Films />
      <SpecSheet />
      <Timeline />
      <Pilot />
    </main>
  );
}
