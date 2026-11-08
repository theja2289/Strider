import { Config } from "@remotion/cli/config";
import path from "node:path";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setChromiumOpenGlRenderer("swangle");
Config.setBrowserExecutable(process.env.CHROME_PATH ?? "/usr/bin/google-chrome");
Config.overrideWebpackConfig((cfg) => ({
  ...cfg,
  resolve: { ...cfg.resolve, alias: { ...(cfg.resolve?.alias ?? {}), "@shared": path.resolve(__dirname, "../shared") } },
}));
