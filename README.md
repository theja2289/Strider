# Strider Robotics · website, 3D exploded view and films

Go-to-market site for [Strider Robotics](https://www.strider-robotics.in) (Bengaluru; IISc StochLab spin-off, incubated at ARTPARK) and its **M3** industrial quadruped.

One repo, three parts that share a single content file and a single 3D model:

| Folder | What | Stack |
|---|---|---|
| `web/` | The website: interactive 3D hero, scroll-driven exploded view, mission configurator, films, spec sheet, pilot form, press kit | Vite · React 19 · TypeScript · react-three-fiber · drei · framer-motion |
| `video/` | Seven films rendered from code (brand sting, M3 reveal, exploded walkthrough, mission walkthrough, payload story, pilot pitch, 9:16 social teaser) | Remotion 4 · @remotion/three |
| `shared/` | `brand.ts` (tokens + official logo paths), `content.ts` (all copy and figures), `robot/` (parametric M3 model with named, explodable parts) | TypeScript · three |

Change a number or a sentence in `shared/content.ts` and both the site and the films pick it up.

## Run it

```bash
npm install
npm run dev          # website on http://localhost:5173
npm run studio       # Remotion Studio for the films
npm run render       # renders every film to web/public/films/*.mp4 (+ poster JPGs)
npm run build        # production build to web/dist
```

Rendering uses the system Chrome. Set `CHROME_PATH` if it is not at `/usr/bin/google-chrome`. Render a subset or lower the 3D resolution:

```bash
node video/render.mjs m3-reveal exploded-walkthrough --scale3d=0.6667 --concurrency=2
```

## Deploy (GitHub Pages)

`.github/workflows/deploy-pages.yml` builds `web/` on every push to `main` and publishes it to GitHub Pages at `https://<user>.github.io/<repo>/`.

One-time setup in the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**. GitHub Pages on a *private* repository requires GitHub Pro/Team; on a free account make the repository public (the content is a public marketing site anyway).

For a custom domain (e.g. `strider-robotics.in`), add a `CNAME` file to `web/public/`, point DNS at GitHub Pages, and set `VITE_BASE=/` in the workflow.

Any static host works too (Vercel, Netlify, Cloudflare Pages): build command `npm run build -w web`, output `web/dist`.

## Pilot form

The form on the home page opens a pre-filled email to `connect@strider-robotics.in` by default. To post to a form backend instead (Formspree, Basin, your own endpoint), set `VITE_FORM_ENDPOINT` at build time.

## Content: verified vs. placeholder

Everything in `shared/content.ts` is tagged.

* `verified: true` — from public coverage of Strider (July–Sept 2026: Robotics & Automation News, Tech Times, Startuppedia, Indian Defence News, Electronics For You), IISc/ARTPARK references, and strider-robotics.in itself: 20 kg rated / 40 kg tested payload, stair climbing under 40 kg, self-righting, Honda Amaze tow (TRL 6), >80 % indigenous content incl. in-house actuators, pilots with an oil & gas operator and an automotive manufacturer, hardware-agnostic software, Stoch 1–4 timeline, contact details.
* `indicative: true` — **placeholders** chosen to be plausible for the robot class so the layout could be designed. The UI renders a small "indicative" marker next to each. Replace before launch:
  * robot mass, top speed, runtime, IP rating, EtherCAT as actuator bus, the 2027 roadmap line
  * sensor weights in the configurator are typical for each sensor class
  * the part descriptions in the exploded view (`shared/robot/parts.ts`) are written from the outside; have an engineer correct them
* The 3D model is a stylised parametric M3 built from the public photos/render, not CAD. If Strider can share a GLB/STEP export, it can replace `shared/robot/M3Model.tsx` and the exploded view keeps working through the part registry in `parts.ts`.

## Brand

The logo files in `web/public/brand/` are Strider's official assets, used unmodified. The site's UI accent (`#7FB2EA`) is sampled from the actuator caps in Strider's own M3 render; status green (`#43E08A`) matches the prototype's actuator LEDs. Both live in `shared/brand.ts`.
