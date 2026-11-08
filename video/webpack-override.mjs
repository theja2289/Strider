import path from "node:path";
import { fileURLToPath } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url));
export const webpackOverride = (cfg) => ({
  ...cfg,
  resolve: { ...cfg.resolve, alias: { ...(cfg.resolve?.alias ?? {}), "@shared": path.resolve(here, "../shared") } },
});
