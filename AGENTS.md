# Agent Context - parkerhurst.com

## Project
- **Astro v6** static site. No UI frameworks — vanilla JS + Astro components only.
- **Single page** (`src/pages/index.astro`): a sports photography portfolio for Parker Hurst.
- **Site:** https://parkerhurst.com

## Architecture
- `src/data/portfolio.ts` — source of truth. Defines sports, their order, and photo filenames.
- Photos live in `/public/photos/{Sport}/` (e.g. `/public/photos/Football/...`).
- `src/components/PortfolioShell.astro` wires together `SidebarNav` + `PhotoViewer`.
- `src/scripts/portfolio-viewer.js` — client-side viewer logic (filtering by sport, prev/next, preloading, keyboard nav, mobile menu).
- `src/styles/global.css` — all styles. Dark editorial aesthetic (`#0b0b0b` background, warm text).

## Design System
- **Fonts:** Cormorant Garamond (display), Source Serif 4 (body). Loaded from Google Fonts.
- **Palette:** `var(--bg)` `#0b0b0b`, `var(--text)` `#f2ece3`, `var(--muted)` `#8d867d`, `var(--accent)` `#ffffff`.
- **Layout:** CSS Grid sidebar + viewer on desktop; mobile collapses to sticky header + full-width viewer.
- **Animations:** prefers-reduced-motion aware. Subtle rise-in on load, image scale/fade on load, shimmer skeleton loader.

## Key Conventions
- Photo ordering is explicit in `portfolio.ts` arrays. Reordering is done by changing array order.
- Photo `src` paths in data must match actual files in `/public/photos/{Sport}/`.
- Use `data-*` attributes for JS hooks rather than classes where possible.
- `body.menu-open` toggles mobile menu + scroll lock.

## Build & Deploy
- `npm run dev` / `npm run build` / `npm run preview`
- Deployed to Vercel with `@vercel/analytics`.
- Node >= 22.12.0
