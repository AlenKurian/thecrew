# Image placeholders

The live site currently pulls placeholder photography from Unsplash
(configured in `next.config.mjs` under `images.remotePatterns`) so the
site works out of the box with zero assets.

Replace them with real Studio Wytes photography by dropping files here
and swapping the `src` values in the following components:

| Component | Used for |
|---|---|
| `components/Hero.tsx` | Hero background |
| `components/WhoItsFor.tsx` | Cursor-follow preview images (7) |
| `components/Disciplines.tsx` | Discipline preview images (7): Creative, Production, Events, Media, Marketing, Operations, Experience |
| `components/ImageBreak.tsx` | Full-width documentary image break |

The favicon (`app/icon.tsx`) and social share image (`app/opengraph-image.tsx`)
are currently generated on the fly with `next/og` so the site ships with a
working icon and preview card out of the box. Swap either file for a real
Studio Wytes-designed asset whenever ready — just replace the file (Next.js
picks up `app/icon.png` / `app/opengraph-image.png` automatically too).

Recommended aspect ratios:
- Hero: wide, ≥2400px, landscape
- Discipline previews: 4:5 portrait
- Image break: wide, ≥2400px, landscape
