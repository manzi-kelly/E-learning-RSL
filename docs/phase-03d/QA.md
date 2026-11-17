# Phase 03D — Courses UI Redesign QA

Date: 16 November 2026

## Reference screenshot

The supplied screenshot was **not available inside the coding workspace** or the approved temp directories. The only image asset present was `public/logo.jpeg`. A direct visual/pixel comparison against the screenshot could not be performed, so this report verifies the written specification and measured responsive geometry instead of claiming pixel-perfect matching.

## Scope delivered

- Redesigned reusable `CourseCard` with a 16:9 dark navy/teal thumbnail, centred abstract course artwork, RSL lettering, level badge, title, description, and an Explore Course action with arrow.
- Six approved course categories remain unchanged and in the approved order:
  1. Beginner Rwanda Sign Language
  2. Intermediate Rwanda Sign Language
  3. Advanced Rwanda Sign Language
  4. RSL for Parents and Families
  5. RSL for Teachers and Educators
  6. RSL for Professionals
- Desktop (>= 1024px): 3 columns; first row shows the three core levels.
- Tablet: 2 columns at 768px.
- Mobile: 1 column at 390px and 320px.
- The same `CourseCard` component is reused in the landing Learning Pathways preview for the three core courses, with the specialised courses listed underneath.
- Lesson counts and free/paid labels were intentionally omitted because no approved data exists for them.
- No sign illustrations or hand emoji are presented as instructional signs. Thumbnail artwork is abstract and marked `aria-hidden`.

## Commands and actual results

| Check | Command | Result |
| --- | --- | --- |
| TypeScript | `npx tsc --noEmit` | Pass, no output |
| ESLint | `npm run lint` | Pass, no output |
| Production build | `npm run build` | Pass, 20/20 static pages generated |
| Production server | `npx next start -p 3211` | Ready, no server errors |

## Responsive geometry (production build)

| Viewport | Horizontal overflow | Grid columns | Card width | Action height |
| --- | --- | --- | --- | --- |
| 320px | None | 1 | 280px | 49px |
| 390px | None | 1 | 347px | 49px |
| 768px | None | 2 | 333px | 49px |
| 1024px | None | 3 | 288px | 49px |
| 1280px | None | 3 | 361px | 49px |
| 1440px | None | 3 | 408px | 49px |

All thumbnails measured `1.778` (16:9). All Explore Course links measured at least 49px high.

## Route and navigation checks

All six detail routes and all six classroom preview routes returned HTTP 200 and contained the correct course title:

- `/courses/beginner`
- `/courses/intermediate`
- `/courses/advanced`
- `/courses/parents-and-families`
- `/courses/teachers-and-educators`
- `/courses/professionals`
- Each route above plus `/learn`

Browser journey verified in a production browser session:

`/` → `/courses` → `/courses/beginner` → `/courses/beginner/learn` → browser Back ×3 → `/`

No console errors or broken links were observed in production.

## Keyboard and accessibility checks

- Tab order reaches all six Explore Course links in visual order.
- All focus stops use the shared 3px `:focus-visible` outline.
- Enter on the focused Beginner card navigates to `/courses/beginner`.
- Card links expose unique accessible names (`Explore course: <title>`).
- Heading order: catalogue `h1` → card `h2`; landing section `h2` → card `h3`.
- Thumbnail artwork is decorative and hidden from assistive technology; no information is conveyed by imagery alone.
- Touch targets: 49px-high actions and 44px minimum navigation/footer links.

## Motion checks

- Hover: card translates `translateY(-4px)` and gains a shadow; arrow and artwork move subtly.
- Entrance: existing GSAP `SectionMotion` reveal is retained.
- `prefers-reduced-motion: reduce`: card transition duration measured `0s`, transform `none`.

## Screenshots

- `docs/phase-03d/courses/desktop-1440.png`
- `docs/phase-03d/courses/desktop-1280.png`
- `docs/phase-03d/courses/desktop-1024.png`
- `docs/phase-03d/courses/tablet-768.png`
- `docs/phase-03d/courses/mobile-390.png`
- `docs/phase-03d/courses/mobile-320.png`
- Matching landing-page preview screenshots are in `docs/phase-03d/landing/`.

## Remaining differences / limitations

1. The reference screenshot was unavailable, so visual fidelity to it is unverified.
2. Lesson count, duration and free/paid metadata are omitted because they are not approved data.
3. Course Details and Classroom Preview retain their existing content and functionality; only the catalogue card system and the landing course preview were redesigned.
4. The landing Learning Pathways preview now reuses course cards. This is the course-presentation exception to the earlier no-card rule; no other landing section was changed.
