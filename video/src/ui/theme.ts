import { brand } from "@shared/brand";
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const C = brand.colors;
export const FONT_DISPLAY = "Space Grotesk";
export const FONT_BODY = "Inter";
export const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

let loaded: Promise<unknown> | null = null;
export const ensureFonts = () => {
  if (!loaded) {
    loaded = Promise.all([
      loadFont({ family: FONT_DISPLAY, url: staticFile("fonts/space-grotesk-latin-wght-normal.woff2"), weight: "300 700" }),
      loadFont({ family: FONT_BODY, url: staticFile("fonts/inter-latin-wght-normal.woff2"), weight: "100 900" }),
    ]);
  }
  return loaded;
};

export const display = (size: number, weight = 600): React.CSSProperties => ({
  fontFamily: `${FONT_DISPLAY}, ${FONT_BODY}, system-ui, sans-serif`, fontWeight: weight, fontSize: size, letterSpacing: -0.02 * size, lineHeight: 1.02, color: C.paper, margin: 0,
});
export const body = (size: number, color: string = C.fog): React.CSSProperties => ({
  fontFamily: `${FONT_BODY}, system-ui, sans-serif`, fontWeight: 400, fontSize: size, lineHeight: 1.45, color, margin: 0,
});
export const mono = (size: number, color: string = C.signal): React.CSSProperties => ({
  fontFamily: MONO, fontSize: size, letterSpacing: 0.14 * size, textTransform: "uppercase", color, margin: 0,
});
