import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Set VITE_BASE=/<repo>/ for GitHub Pages project sites (the deploy workflow does this).
const base = process.env.VITE_BASE ?? "/";

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: { "@shared": path.resolve(__dirname, "../shared") },
  },
  server: { fs: { allow: [path.resolve(__dirname, "..")] } },
  build: {
    target: "es2022",
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules/three/")) return "three";
          if (id.includes("@react-three") || id.includes("three-stdlib") || id.includes("troika") || id.includes("maath")) return "r3f";
          if (id.includes("framer-motion") || id.includes("motion-dom") || id.includes("motion-utils")) return "motion";
        },
      },
    },
  },
});
