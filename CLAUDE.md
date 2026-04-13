# Portfolio Project — Claude Context

## Project Overview
Personal portfolio website. Purpose: showcase projects, skills, and experience.

## Repository
- **GitHub**: https://github.com/w1ggor/Portifolio
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
CLAUDE.md         — this file
```

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
