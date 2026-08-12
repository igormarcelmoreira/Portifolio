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
- Google Fonts: Inter + JetBrains Mono
- No frameworks or dependencies; fully self-contained

## File Structure
```
index.html        — single-page portfolio
css/style.css     — all styles (dark theme, responsive)
js/main.js        — scroll effects, typewriter, tilt, mobile nav
js/i18n.js        — EN/PT-BR translation dictionary + language switching
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
- Dark navy theme: `#0a0e1a` background, `#64ffda` accent (teal)
- Monospace accents via JetBrains Mono
- Reveal-on-scroll animations via IntersectionObserver
- Fully responsive (breakpoints at 900px, 768px, 480px)

## Sections
1. Hero — name, typewriter title, CTA, socials
2. About — summary, 4 stat cards
3. Experience — timeline (TRUE 2022–2025, Interanet 2020–2022)
4. Projects — 7 cards (CAIRHOS, Mobile Suite, Lino, Polymathech, CP-Planta, Moving The Cities, Sinos ERP)
5. Skills — grouped pills (Languages, Frameworks, Mobile, CI/CD, Cloud, Tools)
6. Education — 3 entries + language badges
7. Contact — email CTA + social links

## Development Conventions
- Commit messages should be clear and descriptive.
- Update this file with every major change.

## Changelog

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
