import { brand } from "@shared/brand";
import { asset } from "../asset";

/** Official Strider Robotics logo. Files come from strider-robotics.in and are used unmodified. */
export function LogoMark({ size = 30, tone = "white" }: { size?: number; tone?: "white" | "black" }) {
  const src = asset(tone === "white" ? brand.logo.markWhite : brand.logo.markBlack);
  return <img src={src} alt="" width={Math.round(size * brand.logo.markRatio)} height={size} style={{ height: size, width: "auto", display: "block" }} />;
}
export default function Logo({ tone = "white", size = "md" }: { tone?: "white" | "black"; size?: "md" | "lg" }) {
  const src = asset(tone === "white" ? brand.logo.horizontalWhite : brand.logo.horizontalBlack);
  return (
    <span className={`logo ${size === "lg" ? "lg" : ""}`}>
      <img src={src} alt="Strider Robotics" width={3228} height={959} />
    </span>
  );
}
