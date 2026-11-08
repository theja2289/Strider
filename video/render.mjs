/**
 * Render every composition to ../web/public/films/<id>.mp4 and a poster JPG.
 * Usage: node render.mjs [compId ...] [--scale=1] [--scale3d=2/3] [--concurrency=2]
 * Scales must give integer pixel sizes: use fractions like 2/3 or 1/2, not 0.667.
 */
import { bundle } from "@remotion/bundler";
import { getCompositions, renderMedia, renderStill } from "@remotion/renderer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { webpackOverride } from "./webpack-override.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(here, "../web/public/films");
const args = process.argv.slice(2);
const flag = (k, d) => { const a = args.find((x) => x.startsWith(`--${k}=`)); return a ? a.split("=")[1] : d; };
const ids = args.filter((a) => !a.startsWith("--"));
const num = (v) => (v.includes("/") ? Number(v.split("/")[0]) / Number(v.split("/")[1]) : Number(v)); // "2/3" keeps 1920x1080 -> 1280x720 exact
const scale = num(flag("scale", "1"));
const concurrency = Number(flag("concurrency", "2"));
const browserExecutable = process.env.CHROME_PATH ?? "/usr/bin/google-chrome";
const chromiumOptions = { gl: "swangle", disableWebSecurity: false, headless: true };
const THREE_D = new Set(["m3-reveal", "exploded-walkthrough"]);

const t0 = Date.now();
const serveUrl = await bundle({ entryPoint: path.resolve(here, "src/index.ts"), webpackOverride, publicDir: path.resolve(here, "public") });
const comps = await getCompositions(serveUrl, { browserExecutable, chromiumOptions });
const todo = comps.filter((c) => ids.length === 0 || ids.includes(c.id));
console.log(`Bundled in ${((Date.now() - t0) / 1000).toFixed(1)}s. Rendering ${todo.map((c) => c.id).join(", ")}`);

for (const c of todo) {
  const s = THREE_D.has(c.id) ? num(flag("scale3d", String(scale))) : scale;
  const start = Date.now();
  const outputLocation = path.join(outDir, `${c.id}.mp4`);
  let lastPct = -1;
  await renderMedia({
    composition: c, serveUrl, codec: "h264", outputLocation, browserExecutable, chromiumOptions, scale: s, concurrency,
    crf: 22, imageFormat: "jpeg", jpegQuality: 90, pixelFormat: "yuv420p", muted: true, timeoutInMilliseconds: 240000,
    onProgress: ({ progress }) => { const p = Math.floor(progress * 10); if (p !== lastPct) { lastPct = p; process.stdout.write(`  ${c.id} ${p * 10}%\n`); } },
  });
  const posterFrame = c.id === "brand-sting" ? Math.round(c.durationInFrames * 0.6) : c.id === "social-teaser" ? 45 : c.id === "m3-reveal" ? Math.round(c.durationInFrames * 0.56) : Math.round(c.durationInFrames * 0.45);
  await renderStill({ composition: c, serveUrl, output: path.join(outDir, `${c.id}.jpg`), frame: posterFrame, browserExecutable, chromiumOptions, scale: s, imageFormat: "jpeg", jpegQuality: 85 });
  console.log(`✓ ${c.id} in ${((Date.now() - start) / 1000).toFixed(0)}s`);
}
console.log(`All done in ${((Date.now() - t0) / 60000).toFixed(1)} min`);
