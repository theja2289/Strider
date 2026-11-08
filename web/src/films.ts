/** Films rendered from /video (Remotion). Paths are relative to /public. */
import { asset } from "./asset";
export type Film = { id: string; title: string; blurb: string; src: string; poster: string; portrait?: boolean; wide?: boolean; duration: string; use: string };
const raw: Film[] = [
  { id: "m3-reveal", title: "M3 reveal", blurb: "Turntable reveal with the headline numbers: 20 kg rated, 40 kg tested, >80% indigenous.", src: "/films/m3-reveal.mp4", poster: "/films/m3-reveal.jpg", wide: true, duration: "0:20", use: "Hero / trade-show loop" },
  { id: "exploded", title: "Inside the M3", blurb: "Exploded-view walkthrough of chassis, actuators, sensing and payload rail.", src: "/films/exploded-walkthrough.mp4", poster: "/films/exploded-walkthrough.jpg", duration: "0:30", use: "Technical pitch / LinkedIn" },
  { id: "mission", title: "A round at the plant", blurb: "Animated inspection mission: route, gauge reads, thermal hotspot, gas sample, report.", src: "/films/mission-walkthrough.mp4", poster: "/films/mission-walkthrough.jpg", duration: "0:30", use: "Customer demo opener" },
  { id: "payload", title: "What 40 kg means", blurb: "Payload story in one chart: rated, tested, and the car it towed.", src: "/films/payload-story.mp4", poster: "/films/payload-story.jpg", duration: "0:15", use: "Social / investor deck" },
  { id: "pilot", title: "Pilot with Strider", blurb: "The 90-day pilot pitch: survey, autonomous rounds, business case.", src: "/films/pilot-pitch.mp4", poster: "/films/pilot-pitch.jpg", duration: "0:36", use: "Sales follow-up email" },
  { id: "sting", title: "Brand sting", blurb: "3-second logo sting for the start and end of every video.", src: "/films/brand-sting.mp4", poster: "/films/brand-sting.jpg", duration: "0:03", use: "Bumper" },
  { id: "social", title: "Vertical teaser", blurb: "9:16 cut for Instagram Reels, LinkedIn mobile and WhatsApp.", src: "/films/social-teaser.mp4", poster: "/films/social-teaser.jpg", portrait: true, duration: "0:12", use: "Reels / Shorts" },
];
export const films: Film[] = raw.map((f) => ({ ...f, src: asset(f.src), poster: asset(f.poster) }));
