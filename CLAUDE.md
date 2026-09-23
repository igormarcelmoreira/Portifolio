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

## Project Structure
_To be updated as the project grows._

## Tech Stack
- Pure HTML / CSS / Vanilla JS (no build tools — static site)
- Google Fonts: Archivo (variable width, headings) + Instrument Sans (body) + JetBrains Mono (ASCII portrait only)
- One runtime dependency: Three.js r170, loaded from jsDelivr through an import map in `index.html` (used by `js/apps3d.js` and `js/ascii3d.js`; both fall back gracefully if WebGL/CDN is unavailable)

## File Structure
```
index.html        — single-page portfolio
css/style.css     — all styles (dark theme, responsive)
js/main.js        — scroll effects, typewriter, tilt, mobile nav
js/i18n.js        — EN/PT-BR translation dictionary + language switching
js/apps3d.js      — interactive 3D app-icon showcase (Three.js ES module)
js/ascii3d.js     — turns ascii-art.txt into a 3D relief portrait (Three.js ES module)
assets/           — crosshair.svg (hero registration marks)
icons/            — TRUE app icons used by the 3D showcase and the project card
ascii-art.txt     — portrait fetched into the hero
favicon.svg, CNAME
card/             — standalone digital business card (own HTML/CSS, no shared nav/JS)
  index.html      — /card/ route: photo, name, quick actions, Save Contact, link list, bio
  card.css        — its own compact copy of the brand tokens (red/ink/panel)
  igor.jpg        — profile photo, resized for the page avatar
  igor-marcel.vcf — vCard 3.0 (incl. embedded photo) served for "Salvar Contato"
zine/             — printable one-page zine, generated (not a served route)
  index.html      — 8-panel A4-landscape layout; fetches ../ascii-art.txt for the back-cover art
  qrcode.png      — QR to card/, printed on the front cover
  igor-marcel-zine.pdf — the print-ready output (regenerate via Playwright's page.pdf(), see below)
CLAUDE.md         — this file
```

## Internationalization (i18n)
- Two languages: English (default) and Brazilian Portuguese.
- `js/i18n.js` holds a flat `translations` key → `{en, pt}` dictionary; translatable elements are marked `data-i18n="key"` in `index.html`.
- Language resolution: `localStorage['portfolio-lang']` override, else `navigator.language` (starts with `pt` → Portuguese, else English).
- Manual override: EN/PT toggle button in the navbar (`#lang-toggle`), persists choice to `localStorage` and updates `<html lang>`.
- Hero typewriter titles live in `heroTitles` (same file) and restart on a `langchange` custom event, consumed by `js/main.js`.
- Tech/tool names (React, Angular, C#, etc.) are intentionally left untranslated in both languages.

## Design System
- Red field, black detail (redesign 2026-09). Tokens live in `:root` of `css/style.css`.
- `--red #D8231A` page, `--red-deep #A8150E` alternate bands (Experience, Skills) and offset shadows, `--ink #000` nav/buttons/contact, `--panel #0B0B0B` cards, `--hot #FF4438` red text on black only.
- White text on red (5:1). Black on red is only for large headings (4.2:1). Never use `--hot` on the red field.
- Type: Archivo at `font-stretch: 62–75%`, weight 700–800 for headings/name; Instrument Sans body. No numbered section labels, no uppercase eyebrows.
- Cards: black, 6px radius; hover = translate(-4px,-4px) + hard white offset shadow (no glows or blurs).
- Motion: one entrance only (the ASCII portrait "prints" in via clip-path). Scroll-reveal classes (`.reveal`) are still in the markup/JS but have no CSS effect. `prefers-reduced-motion` is respected.
- Hero portrait = black ink straight on the red field (no card). `ascii-art.txt` must be dark-subject-on-space: spaces are the background, dense glyphs (`@`) are the subject. `js/ascii3d.js` renders it as instanced 3D glyphs (depth = blurred character density, tilts toward the pointer, idle sway after 3s); the flat `<pre id="hero-ascii">` is the no-WebGL fallback and is hidden via `.is-3d`. Any glyph ramp in `RAMP` works if `ascii-art.txt` changes.
- Fully responsive (breakpoints at 900px, 768px, 480px)

## Sections
1. Hero — name, typewriter title, CTA, socials
2. About — summary, 4 stat cards
3. Experience — timeline (TRUE 2022–2025, Interanet 2020–2022)
4. Projects — interactive 3D showcase of the 6 TRUE app icons (drag to orbit, hover for name) + 7 cards (CAIRHOS, Mobile Suite, Lino, Polymathech, CP-Planta, Moving The Cities, Sinos ERP)
5. Skills — grouped pills (Languages, Frameworks, Mobile, CI/CD, Cloud, Tools)
6. Education — 3 entries + language badges
7. Contact — email CTA + social links

## Development Conventions
- Commit messages should be clear and descriptive.
- Update this file with every major change.

## Changelog

### 2026-09-22 — Printable networking zine (`zine/`)
- One-page, 8-panel zine (A4 landscape, 297×210mm) following the classic single-sheet
  fold-and-cut zine layout: printed in one CSS grid, top row (pages 4-3-2-1) rotated 180°,
  bottom row (page 5, page 6, back cover, front cover) upright — matches the standard template
  a physical print of this needs to be cut/folded into.
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
