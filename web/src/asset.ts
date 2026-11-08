/** Prefix a root-relative public path with the Vite base (needed for GitHub Pages project sites). */
export const asset = (p: string) => import.meta.env.BASE_URL.replace(/\/$/, "") + p;
