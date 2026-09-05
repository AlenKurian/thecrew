# STUDIO WYTES™ — THE CREW

> **GET IN THE ROOM.**

A production-quality landing page + application flow for **THE CREW**, a
7-day immersive experience run by Studio Wytes in Calicut, Kerala.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** — design system (near-black `#0a0a0a` / warm off-white
  `#f3ede4` / Studio Wytes orange `#FF571F`)
- **Fonts**: Anton (display), Inter (body), JetBrains Mono (metadata /
  eyebrow labels / numbered rows — gives the campaign a technical,
  production-sheet feel)
- **GSAP + ScrollTrigger** — scroll-based reveals, marquee, hover previews
- **Lenis** — smooth scrolling, wired into GSAP's ticker
- **React Hook Form + Zod** — client-side validated application form
- **Supabase (Postgres)** — application storage, accessed only from the
  server via Route Handlers
- Email hook stubbed for **Resend** (optional, see `app/api/applications/route.ts`)

## Getting started

```bash
npm install
cp .env.local.example .env.local
# fill in your Supabase project URL + keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase setup

1. Create a Supabase project.
2. Run [`supabase/schema.sql`](supabase/schema.sql) in the SQL editor —
   this creates the `applications` table with Row Level Security enabled
   and **no public policies**, so only the server (using the service role
   key) can read or write.
3. Copy your project URL, anon key, and service role key into `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...   # server-only, never sent to the browser
```

The service role key is only ever imported in `lib/supabase.ts`, which is
only used inside `app/api/applications/route.ts` — a server-only Route
Handler. It is never bundled into client JavaScript.

## Email (optional)

`app/api/applications/route.ts` has a commented-out Resend integration.
Add `RESEND_API_KEY` (and optionally `RESEND_FROM_EMAIL` /
`STUDIO_WYTES_NOTIFY_EMAIL`) to `.env.local`, install `resend`, and
uncomment the block to send a confirmation email to applicants and a
notification email to the Studio Wytes team.

## Project structure

```
app/
  page.tsx                 → the full campaign landing page
  apply/page.tsx            → standalone deep-link application page
                              (what a reel's "Apply" button should point
                              to — carries its own compact hero context
                              so cold traffic isn't dropped straight into
                              a bare form)
  api/applications/route.ts → POST handler: validate → dedupe → insert
  layout.tsx / globals.css  → root layout, fonts, design tokens
  icon.tsx / opengraph-image.tsx → generated favicon + share image

components/                 → one component per section (see spec)
lib/
  supabase.ts               → server-only Supabase admin client
  validation.ts              → shared Zod schema (client + server)
  utils.ts                   → cn() helper + content data (easy to edit)

supabase/schema.sql          → applications table + RLS setup
```

## Content

Copy that appears in the brief verbatim lives directly in the section
components. Structured/repeated content (the audience list, disciplines,
what's included) is centralized in [`lib/utils.ts`](lib/utils.ts) so it's
easy to update without touching component markup.

## Placeholders & things to configure before launch

- **Photography** — see [`public/images/README.md`](public/images/README.md).
  The site currently uses Unsplash placeholder imagery via
  `next.config.mjs` `images.remotePatterns`.
- **Social links** — none are included, since none were provided. Add
  them to `components/Footer.tsx` when available.
- **Event dates / number of positions / pricing** — intentionally not
  stated anywhere, per brief. Do not fabricate these; add them once
  confirmed.

## Accessibility & motion

- Semantic landmarks, labeled form fields, visible focus states,
  sufficient color contrast against both the black and off-white
  backgrounds.
- All animation respects `prefers-reduced-motion`: Lenis smooth-scroll is
  skipped entirely, and CSS-level reduced-motion rules shorten/disable
  transitions and the marquee speed (see `app/globals.css`).
