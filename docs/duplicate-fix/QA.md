# Global Duplicate Components Fix — QA

Date: 17 November 2026

## Summary

The duplicate public Header and Footer were **not present in the application source**. They were served by a long-running `next dev` process on port 3000 whose Turbopack compilation cache contained an older `RootLayout` that still rendered `<Header />`, `<main>` and `<Footer />`. The current source already gives the public route group sole ownership of those components, so the stale dev module produced a second, nested copy of the entire public shell.

The fix was to remove the stale dev compilation (` .next/dev `) and restart the dev server. No application source, styling, content or behavior was changed. Production was already correct and remains correct after a clean rebuild.

## Exact root cause

### Header

`src/app/layout.tsx` currently renders only `<html><body>{children}</body></html>`. The compiled dev module in `.next/dev/server/chunks/ssr/[root-of-the-server]__0ahvn_9zmwz0_._.js` still imported `src/features/landing/Header/Header.tsx` and `src/features/landing/Footer/Footer.tsx` and rendered `<Header /><main>{children}</main><Footer />` inside `RootLayout`. Because `src/app/(public)/layout.tsx` also renders exactly one Header/main/Footer, the dev DOM contained:

```
header (stale root layout)
main   (stale root layout)
  header (public layout)
  main   (public layout) — page content
footer (public layout)
footer (stale root layout)
```

This produced two visible Headers, two `<main>` landmarks and two Footers on every public route. Admin pages inherited the stale public shell as well (one public Header/Footer around the independent Admin shell).

### Footer

Same single cause: the stale root-layout compilation rendered a second Footer below the public layout's Footer. No footer component renders itself twice and no page renders a Footer directly.

### Why production was clean

A fresh production build compiled the current source, where `RootLayout` has no Header/Footer. Built HTML and the production DOM contained exactly one site Header and one Footer on every public route, and zero on Admin routes.

### Why the stale module survived

Next.js 16 enables Turbopack filesystem caching for development by default (`experimental.turbopackFileSystemCacheForDev`, default `true`). The dev server had been running for many hours and had written/restored its filesystem cache; it continued serving the old `RootLayout` compilation instead of recompiling the changed source.

### Other duplication found

- On client-side navigation with `cacheComponents: true`, Next.js keeps the previous route in the DOM with `style="display: none !important;"` (React `<Activity>`). This is expected framework behavior, is hidden, and is not a visual duplicate.
- Page-level `<header class="...intro">` elements on `/courses`, `/auth`, etc. are semantic introductions containing the page title and lead text. They are intentional page content, not instances of the site Header. They are retained.
- Admin pages legitimately contain a Topbar `<header>` and an Overview intro `<header>`. They contain one Sidebar, one Topbar and no public Header/Footer.

## Fix applied

1. Stopped the stale `next dev` server (PID 17576, port 3000).
2. Deleted the stale dev cache directory `.next/dev` (dev artifacts only; no source touched).
3. Restarted `next dev -p 3000`, forcing a fresh compilation from current source.
4. Rebuilt production (`npm run build`) and restarted `next start -p 3217`.

No source file required modification; the correct single-owner architecture was already in place:

- `src/app/layout.tsx` — document structure, metadata, global styles only.
- `src/app/(public)/layout.tsx` — exactly one Header, one `<main id="main-content">`, one Footer.
- `src/app/admin/layout.tsx` — independent Admin shell; no public Header/Footer.

No CSS hiding, `nth-child`, viewport tricks, redesigns or new dependencies were used.

## Files modified

Application source: **none**.

Evidence generated (untracked QA artifacts):

- `docs/duplicate-fix/QA.md`
- `docs/duplicate-fix/before/` — DOM report and 1440px / 390px screenshots from the stale dev server.
- `docs/duplicate-fix/after/` — DOM report and screenshots after cache clear + dev restart.
- `docs/duplicate-fix/production/` — clean-build DOM report, screenshots, route checks and interaction results.
- `docs/duplicate-fix/spa-report.json` — client-side navigation and back/forward report.

## Commands and results

| Check | Command | Result |
| --- | --- | --- |
| Strict TypeScript | `npx --no-install tsc --noEmit` | Pass, no output |
| ESLint | `npm run lint` | Pass, no output |
| Production build | `npm run build` | Pass — 42 pages generated |
| Production server | `npx next start -p 3217` | Ready, no server errors |
| Dev server | `npx next dev -p 3000` | Ready after clean cache |
| DOM sweep | Headless Chrome 157 via CDP, 15 routes × 6 widths | Pass — one site Header/Footer/main per public page, none on Admin |
| Direct route checks | HTTP 200 on 18 routes | Pass |
| SPA navigation/back-forward | CDP click + history back/forward | Pass; no layout duplication, no console errors |
| Keyboard/mobile | Tab, menu open/close, Escape focus restoration, outside click | Pass |
| Admin shell | Sidebar open/close, focus restoration | Pass |

## Before and after (DOM)

| Measurement | Before (stale dev, 1440px `/`) | After (clean dev, 1440px `/`) | Production (1440px `/`) |
| --- | --- | --- | --- |
| `<header>` elements | 2 | 1 | 1 |
| `<footer>` elements | 2 | 1 | 1 |
| `<main>` elements | 2 | 1 | 1 |
| `nav[aria-label="Primary"]` | 2 | 1 | 1 |
| Menu toggles | 2 | 1 | 1 |

Before screenshots: `docs/duplicate-fix/before/home-1440.png`, `home-390.png`, `courses-1440.png`, `courses-390.png`, `admin-1440.png`, `admin-390.png`.

After screenshots: matching files in `docs/duplicate-fix/after/`.

Production screenshots: matching files in `docs/duplicate-fix/production/`.

The PNGs were captured from real browser sessions. This agent could not visually render them, so the claims above are based on measured DOM structure and geometry, not subjective pixel assessment.

## Responsive verification

Tested at 320, 390, 768, 1024, 1280 and 1440px across home, courses (list/detail/classroom), auth, dictionary, interpreting, resources, community, blog, contact and three Admin routes. Result: one site Header/Footer/main throughout, no horizontal overflow, mobile menu present and functional at narrow widths, Admin sidebar/toggle present exactly once with unchanged behavior.

## Console and network

Production: no console exceptions and no HTTP 4xx/5xx responses across all checked routes. Dev: the only errors reported by the harness were HMR WebSocket handshake failures for `127.0.0.1`, caused by Next.js dev-origin protection and the headless harness origin; they are not application errors and do not occur in production.

## Confirmation

- Every public page has exactly one site Header (logo, navigation, Get Started, skip link) and one Footer (branding, description, navigation, Planned pages).
- Admin pages retain their independent shell: one Sidebar, one Topbar, no public Header or Footer.
- Phase 01–10C features, content, styling and business behavior were preserved unchanged.
