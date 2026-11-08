import React, { useEffect, useState } from "react";
import { Composition, Folder, continueRender, delayRender } from "remotion";
import { ensureFonts } from "./ui/theme";
import { BrandSting } from "./compositions/BrandSting";
import { M3Reveal } from "./compositions/M3Reveal";
import { ExplodedWalkthrough } from "./compositions/ExplodedWalkthrough";
import { MissionWalkthrough } from "./compositions/MissionWalkthrough";
import { PayloadStory } from "./compositions/PayloadStory";
import { PilotPitch } from "./compositions/PilotPitch";
import { SocialTeaser } from "./compositions/SocialTeaser";

const FPS = 30;
const HD = { width: 1920, height: 1080 };

const withFonts = <P extends object>(Comp: React.FC<P>): React.FC<P> => (props) => {
  const [h] = useState(() => delayRender("fonts"));
  const [ok, setOk] = useState(false);
  useEffect(() => { ensureFonts().then(() => { setOk(true); continueRender(h); }); }, [h]);
  return ok ? <Comp {...props} /> : null;
};

export const RemotionRoot: React.FC = () => (
  <>
    <Folder name="Brand">
      <Composition id="brand-sting" component={withFonts(BrandSting)} durationInFrames={3 * FPS} fps={FPS} {...HD} defaultProps={{ tagline: "Autonomous legged robots" }} />
      <Composition id="social-teaser" component={withFonts(SocialTeaser)} durationInFrames={12 * FPS} fps={FPS} width={1080} height={1920} />
    </Folder>
    <Folder name="Product">
      <Composition id="m3-reveal" component={withFonts(M3Reveal)} durationInFrames={20 * FPS} fps={FPS} {...HD} />
      <Composition id="exploded-walkthrough" component={withFonts(ExplodedWalkthrough)} durationInFrames={30 * FPS} fps={FPS} {...HD} />
      <Composition id="payload-story" component={withFonts(PayloadStory)} durationInFrames={15 * FPS} fps={FPS} {...HD} />
    </Folder>
    <Folder name="Sales">
      <Composition id="mission-walkthrough" component={withFonts(MissionWalkthrough)} durationInFrames={30 * FPS} fps={FPS} {...HD} />
      <Composition id="pilot-pitch" component={withFonts(PilotPitch)} durationInFrames={36 * FPS} fps={FPS} {...HD} />
    </Folder>
  </>
);
