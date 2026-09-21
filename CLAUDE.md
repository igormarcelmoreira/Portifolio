# Portfolio Project — Claude Context

## Project Overview
Personal portfolio website. Purpose: showcase projects, skills, and experience.

## Repository
- **GitHub**: https://github.com/igormarcelmoreira/Portifolio
- **Branch strategy**: main

## Project Structure
_To be updated as the project grows._

## Tech Stack
- Pure HTML / CSS / Vanilla JS (no build tools — static site)
- Google Fonts: Archivo (variable width, headings) + Instrument Sans (body) + JetBrains Mono (ASCII portrait only)
- One runtime dependency: Three.js r170, loaded from jsDelivr through an import map in `index.html` (only used by `js/apps3d.js`; the panel hides itself if WebGL/CDN is unavailable)

## File Structure
```
index.html        — single-page portfolio
css/style.css     — all styles (dark theme, responsive)
js/main.js        — scroll effects, typewriter, tilt, mobile nav
js/i18n.js        — EN/PT-BR translation dictionary + language switching
js/apps3d.js      — interactive 3D app-icon showcase (Three.js ES module)
assets/           — crosshair.svg (hero registration marks)
icons/            — TRUE app icons used by the 3D showcase and the project card
ascii-art.txt     — portrait fetched into the hero
favicon.svg, CNAME
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
- Hero portrait = red ink on a black print panel; the ASCII art must stay light-on-dark (dense glyph = bright).
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

### 2026-09-20 — v2.0 Red/black redesign + 3D showcase
- Full visual rewrite of `css/style.css`: red field with black detail, Archivo/Instrument Sans type, hard offset shadows instead of glows.
- Hero portrait moved onto a black print panel (red ink) with a one-time "print" reveal; crosshair registration marks in the hero corners (`assets/crosshair.svg`, hidden ≤900px).
- Removed `01.–06.` section numbering and the scroll-reveal slide-up look.
- New `js/apps3d.js`: Three.js scene of the six TRUE app icons as rounded 3D tiles (OrbitControls drag, hover label, idle float; pauses off-screen; hides itself without WebGL).
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
