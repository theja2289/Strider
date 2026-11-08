import type { Stat } from "@shared/content";

/** Renders the small marker for placeholder figures so nobody ships them unknowingly. */
export function IndicativeMark({ stat }: { stat: Pick<Stat, "indicative"> }) {
  if (!stat.indicative) return null;
  return <sup className="indicative-mark" title="Indicative figure for layout. Replace with datasheet value before launch.">indicative</sup>;
}
