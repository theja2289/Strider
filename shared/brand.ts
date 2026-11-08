/**
 * Strider Robotics brand tokens — shared by the website and the Remotion films.
 * Change once here, both pick it up.
 */
export const brand = {
  name: "Strider Robotics",
  legalName: "Strider Robotic India Pvt. Ltd.",
  tagline: "Legged robots for the places wheels can't go.",
  motto: ["Reimagine Safety", "Re-engineer Efficiency", "Re-prioritize Time"],
  domain: "strider-robotics.in",
  /** Official logo files (from strider-robotics.in). Do not restyle. */
  logo: {
    horizontalWhite: "/brand/strider-logo-white.png",
    horizontalBlack: "/brand/strider-logo-black.png",
    markWhite: "/brand/strider-mark-white.png",
    markBlack: "/brand/strider-mark-black.png",
    og: "/brand/strider-og.png",
    /** horizontal logo aspect ratio (w/h) */
    ratio: 3228 / 959,
    markRatio: 1113 / 718,
  },
  colors: {
    // Base
    ink: "#0b0e12",        // page background
    graphite: "#151a21",   // panels
    steel: "#232a33",      // borders / raised surfaces
    fog: "#8b95a3",        // secondary text
    paper: "#f3f5f7",      // primary text on dark
    // Accent
    signal: "#7fb2ea",     // Strider blue — sampled from the M3 render actuator caps (#6090c0), lifted for dark UI
    signalDeep: "#4a7fb5",
    ember: "#bfdcf7",      // light tint of the accent
    // Secondary accent (software / data)
    pulse: "#43e08a",      // status green — the M3 prototype's actuator LEDs
    pulseDeep: "#1fa865",
    // Hardware tones from the render
    body: "#202020",
    aluminium: "#c9ccd0",
    capBlue: "#6090c0",
    shankBlue: "#385878",
    // Status
    ok: "#5be08a",
    warn: "#ffd166",
    danger: "#ff5c5c",
  },
  fonts: {
    display: "'Space Grotesk Variable', 'Space Grotesk', 'Inter Variable', system-ui, sans-serif",
    body: "'Inter Variable', Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  },
} as const;

export type Brand = typeof brand;
