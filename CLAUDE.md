# Portfolio Project — Claude Context

## Project Overview
Personal portfolio website. Purpose: showcase projects, skills, and experience.
Also hosts `card/`: a standalone digital business card, intentionally disconnected from the
main site (no shared nav/JS), meant to be opened via QR code at networking events.
And `zine/`: a printable one-page, 8-panel zine (A4 landscape) handed out at those same events,
QR-linking to `card/`.

## Repository
- **GitHub**: https://github.com/igormarcelmoreira/Portifolio
- **Branch strategy**: main

## Tech Stack
- **Astro 7** static site (`npm run dev` / `npm run build` → `dist/`), TypeScript, no UI framework.
- **GSAP 3.15** from npm (all plugins are free now): ScrollTrigger, ScrollSmoother, SplitText.
- **Three.js** from npm, dynamically imported only for the hero portrait (separate ~720 KB chunk).
- Google Fonts: Archivo (variable width, display) + Instrument Sans (body) + JetBrains Mono 700 (portrait glyphs only).
- Deploy: `.github/workflows/deploy.yml` (withastro/action → actions/deploy-pages) on push to `main`.
  GitHub Pages must be set to **build type "GitHub Actions"** (not "deploy from branch").

## File Structure
```
astro.config.mjs        — site: https://igormarcel.is-a.dev
src/i18n/content.ts     — ALL copy, typed, `content.en` / `content.pt`. Edit text here.
src/pages/index.astro   — English (/)      ─┐ both render components/Home.astro
src/pages/pt/index.astro— Portuguese (/pt/) ─┘
src/layouts/Base.astro  — <head>, loader, fixed nav, cursor, #smooth-wrapper/#smooth-content
src/components/         — Hero, Manifesto, Services, Work, Numbers, About, Stack, Contact
src/scripts/motion.ts   — every GSAP animation + clock + language memory + GitHub latest repo
src/scripts/portrait.ts — ascii-art.txt → instanced 3D glyph relief (Three.js)
src/styles/global.css   — tokens, type helpers, pill button, motion baseline
public/                 — copied as-is to the site root:
  CNAME, favicon.svg, ascii-art.txt, assets/crosshair.svg
  icons/                — 256px webp app/project icons (6 TRUE apps + saph-web, sinos-erp,
                          lino, polymathech, cp-planta). Originals live in gitignored _raw/icons/.
  card/                 — /card/ business card (plain HTML/CSS, untouched by Astro). QR codes
                          printed on the zine point here: never move or rename this route.
zine/                   — printable zine, NOT part of the site build (see changelog). Its
                          index.html fetches ../public/ascii-art.txt when served from the repo root.
```

## Internationalization (i18n)
- Three static routes: `/` (en), `/pt/` (pt-BR), `/es/` (es) — same components, copy from
  `src/i18n/content.ts` (`content.en` / `.pt` / `.es`). Language list lives in `langs` in `Base.astro`.
- Inline script in `Base.astro`: a visit to `/` with no `localStorage['portfolio-lang']` walks
  `navigator.languages` in order; the first of en/pt/es wins (pt → `/pt/`, es → `/es/`, en stays).
  Only `/` redirects. The EN/PT/ES switch in the nav saves the choice.
- Tech/tool names stay untranslated. `about.langs` lists the languages Igor speaks (not the site's).

## Design System
- Darker red + black (v3, 2026-09-28). Tokens in `src/styles/global.css`:
  `--blood #8b0e0e` page, `--blood-deep #5e0907` bands, `--ink #000`, `--bone #f1ece6` text,
  `--flare #ff3b2f` tiny accents on black only.
- Type: Archivo condensed (`font-stretch: 62%`, 800, uppercase) for display; Instrument Sans body.
  No numbered section eyebrows; project rows are numbered because they are an ordered list.
- Section rhythm: hero red → manifesto black → services red → work black → numbers deep red →
  about red → stack marquee black → contact black.

## Motion (src/scripts/motion.ts)
- ScrollSmoother wraps the page (`smoothTouch: 0.1`). Anything `position: fixed` must live OUTSIDE
  `#smooth-content` (it is transformed): nav, cursor, loader are in Base; the work preview is
  moved to `<body>` at runtime.
- Loader counter + curtain only on the first visit per session (`sessionStorage['intro-seen']`).
- SplitText: hero name chars, `[data-split-lines]` headings, `[data-split-chars]` contact title,
  `[data-scrub-words]` manifesto (scrubbed opacity), project names in the work rows.
- Work rows: desktop = hover fill + floating tilted preview (project `icon`/`icons` + name) +
  cursor "Open". Touch/narrow = the row crossing 58% of the screen (picked from LIVE rects, not
  precomputed triggers, because rows change height) gets `.is-active` (red fill); a row that
  becomes active also gets `.is-open` (description unfolds, icons pop) and stays open, so rows
  above never collapse under the thumb. `ScrollTrigger.refresh()` runs on scrollEnd after a row opens.
- Project icons: `icon` (single file in public/icons) or `icons: true` (the 6-app suite) in content.ts.
- Portrait is built ~1.8s after boot (first visit) in chunks, downsampled 2× under 900px wide.
- Visibility: `[data-reveal]` etc. are hidden only under `html.js:not(.reduce)`. A 6s safety
  timer in `<head>` adds `.reduce` if motion never boots; reduced-motion users get a static page.

## Sections
1. Hero — giant name, 3D ASCII portrait, one-line pitch, availability, CTA
2. Manifesto — scrubbed paragraph
3. Services — web platforms, mobile apps, AI & automation, technical leadership
4. Selected work — 6 project rows with links (SAPH Web — formerly listed as CAIRHOS —, mobile suite, Sinos ERP, Lino, Polymathech, CP-Planta)
5. Numbers — 4 counters
6. About — bio, jobs (TRUE, Interanet), education, languages
7. Stack — velocity-reactive marquee
8. Contact — title, email pill (magnetic), links, footer with local clock

## Development Conventions
- Commit messages should be clear and descriptive.
- Update this file with every major change.

## Changelog

### 2026-09-28 — v3.0 Astro + GSAP rebuild (branch `redesign-astro`)
- Rebuilt the site in Astro with GSAP (ScrollSmoother, ScrollTrigger, SplitText), aimed at selling
  engineering work: new Services section before the projects, projects as hover-preview rows
  (reference: haoqi.design), counters, marquee, contact with magnetic email.
- Darker red (`#8b0e0e`). Kept only the 3D ASCII portrait; the 3D app-icon tiles were dropped
  (the icons now appear in the work preview / active mobile row).
- Old `index.html`, `css/`, `js/` removed; static assets moved to `public/` (card/ keeps its URL).
- Deploy switched from "Pages from branch root" to the GitHub Actions workflow.
- Project icons added (SAPH Web, Sinos ERP, Lino, Polymathech, CP-Planta); CAIRHOS renamed to SAPH Web on the site.

### 2026-09-22 — Printable networking zine (`zine/`)
- One-page, 8-panel zine (A4 landscape, 297×210mm) following the classic single-sheet
  fold-and-cut zine layout, adapted by the user (2026-09-24): one CSS grid, DOM order = grid order.
  Top row upright: page 3, 4, 5, 6. Bottom row rotated 180° (`.flip`): page 2, page 1, front cover,
  back cover. Rotation belongs to the slot, not the page; pages sit where their mirror partner was
  (cover↔back, 1↔6, 2↔5, 3↔4). Don't "fix" this to the textbook template — it's intentional.
- Black-on-white only (this is meant to be photocopier/home-printer friendly); reuses the
  site's Archivo/Instrument Sans type and the hero's `ascii-art.txt` portrait (rendered small,
  monospace, on the back cover) to keep the print piece visually tied to the site and card.
- Front cover carries the headline + `qrcode.png`, which points to `card/`.
- Not a served page — it's a build artifact. Regenerate the PDF after editing `zine/index.html`
  via Playwright (`page.pdf({ width: '297mm', height: '210mm', printBackground: true })`) since
  it needs the print CSS (`@page`, mm units) rendered exactly, which plain screenshots don't give.

### 2026-09-22 — Digital business card (`/card/`)
- New standalone route for networking events, meant to be opened from a QR code on a phone.
  Deliberately not part of the main site: own `card.css` (a small copy of the brand tokens),
  no `js/i18n.js`/`js/main.js`/nav — page loads fast and stands alone.
- Portuguese-first content, mobile-first layout (max-width 420px, centers on desktop).
- Quick-action circles (WhatsApp, Ligar, Email) styled after the iOS Contacts card the brief
  referenced, black circles on the red field. "Salvar Contato" downloads `igor-marcel.vcf`
  directly (triggers the native add-contact sheet on iOS/Android when opened on-device).
- `igor-marcel.vcf` is a hand-built vCard 3.0 (not the raw Apple export) — standard `TEL`
  instead of Apple's `X-APPLE` IMPP-WhatsApp encoding, plus an embedded 320×320 JPEG photo
  folded to spec. Source files (`Igor ProfPic.png`, the original Apple .vcf export) are
  gitignored; only the processed `card/` assets are committed.

### 2026-09-20 — v2.0 Red/black redesign + 3D showcase
- Full visual rewrite of `css/style.css`: red field with black detail, Archivo/Instrument Sans type, hard offset shadows instead of glows.
- Hero portrait printed in black ink straight on the red field (no card) with a one-time "print" reveal; crosshair registration marks in the hero corners (`assets/crosshair.svg`, hidden ≤900px).
- Removed `01.–06.` section numbering and the scroll-reveal slide-up look.
- New `js/apps3d.js`: Three.js scene of the six TRUE app icons as rounded 3D tiles (OrbitControls drag, hover label, idle float; pauses off-screen; hides itself without WebGL).
- New `js/ascii3d.js`: the hero ASCII portrait is now a real 3D relief that follows the cursor (flat `<pre>` kept as fallback).
- Favicon recoloured to red/black. Mobbin MCP was requested for references but returned "requires a paid plan", so the design was done from the brief alone.

### 2026-08-12 — Post-exchange updates
- Removed "currently on academic exchange" framing from the hero description (now just the 6+ years summary).
- Updated About section to reflect the HUFS exchange as completed in 2026, not ongoing.
- Updated contact phone number to +55 51 99581 6448 (Brazil), replacing the old +82 (South Korea) number.

### 2026-08-12 — v1.1 English/Portuguese i18n
- Added EN/PT-BR language support via `js/i18n.js`, with a navbar toggle and auto-detection from browser locale (`localStorage` override on manual switch).
- Tagged all translatable copy in `index.html` with `data-i18n` keys; hero typewriter titles now switch language too.
- Updated GitHub links/URLs to reflect username change to `igormarcelmoreira`.
- Verified with Playwright: correct auto-detect, full-page translation on toggle, no console errors, persistence across reload.

### 2026-04-13 — v1.0 Initial Portfolio
- Built full single-page portfolio from CV data.
- Dark navy design with teal accent, Inter + JetBrains Mono fonts.
- Typewriter hero animation cycling through 4 role titles.
- Scroll-reveal animations on all content blocks.
- 3D tilt effect on project cards.
- Active nav highlight via IntersectionObserver.
- Mobile-responsive with hamburger nav.

### 2026-04-13 — Setup
- Initial repository setup. Empty project scaffolded.
