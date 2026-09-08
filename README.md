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
- **Nodemailer + Gmail SMTP** — application submissions are emailed to a
  Gmail inbox. No database: the API route validates the payload
  server-side and sends it on.

## Getting started

```bash
npm install
cp .env.local.example .env.local
# fill in your Gmail address + App Password
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Email setup

Submitting the application form `POST`s to `app/api/applications/route.ts`,
which validates the data with the shared Zod schema and emails it via
Gmail SMTP. There is no persistence — if the email doesn't send, the
request fails so nothing is lost silently.

1. Use a Gmail account with **2-Step Verification enabled**.
2. Create an **App Password** at
   [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   (choose "Mail" → "Other"). You get a 16-character password — use that,
   not your normal Google password.
3. Fill in `.env.local`:

```
GMAIL_USER=youraccount@gmail.com
GMAIL_APP_PASSWORD=xxxxxxxxxxxxxxxx
STUDIO_WYTES_NOTIFY_EMAIL=team@studiowytes.com   # optional; defaults to GMAIL_USER
```

Applications arrive at `STUDIO_WYTES_NOTIFY_EMAIL` (or the Gmail account
itself) with the applicant set as `Reply-To`. The applicant also gets a
short best-effort confirmation email; failure to send that never fails
the submission.

## Project structure

```
app/
  page.tsx                 → the full campaign landing page
  apply/page.tsx            → standalone deep-link application page
                              (what a reel's "Apply" button should point
                              to — carries its own compact hero context
                              so cold traffic isn't dropped straight into
                              a bare form)
  api/applications/route.ts → POST handler: validate → email via Resend
  layout.tsx / globals.css  → root layout, fonts, design tokens
  icon.tsx / opengraph-image.tsx → generated favicon + share image

components/                 → one component per section (see spec)
lib/
  validation.ts              → shared Zod schema (client + server)
  utils.ts                   → cn() helper + content data (easy to edit)
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
