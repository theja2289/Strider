const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
export const Icon = {
  stack: () => <svg width="22" height="22" viewBox="0 0 24 24" {...p}><path d="M12 3 2 8l10 5 10-5-10-5Z"/><path d="m2 12 10 5 10-5"/><path d="m2 16 10 5 10-5"/></svg>,
  legs: () => <svg width="22" height="22" viewBox="0 0 24 24" {...p}><path d="M5 4h14v5H5z"/><path d="M7 9l-2 6 3 5"/><path d="M17 9l2 6-3 5"/><path d="M10 9l-1 6 2 5"/><path d="M14 9l1 6-2 5"/></svg>,
  route: () => <svg width="22" height="22" viewBox="0 0 24 24" {...p}><circle cx="5" cy="19" r="2"/><circle cx="19" cy="5" r="2"/><path d="M7 18h6a4 4 0 0 0 0-8H9a3 3 0 0 1 0-6h8"/></svg>,
  eye: () => <svg width="22" height="22" viewBox="0 0 24 24" {...p}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>,
  arrow: () => <svg width="16" height="16" viewBox="0 0 24 24" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  play: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>,
  mouse: () => <svg width="16" height="24" viewBox="0 0 16 24" {...p}><rect x="1.5" y="1.5" width="13" height="21" rx="6.5"/><path d="M8 6v4"/></svg>,
};
