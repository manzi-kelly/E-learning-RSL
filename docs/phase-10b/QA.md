# Phase 10B — Administrator Users & Permissions Management

Date: 18 November 2026
Project: Rwanda Sign Language E-Learning Platform (RSL-ELP)
Scope: frontend-only `/admin/users` preview. Strictly additive; no backend, storage, real account operations, Student Dashboard or Instructor Dashboard.

## 1. Source-of-truth review

The two named `.docx` files are **not present in the repository** (verified recursively). Their converted text copies in the approved temporary workspace were reviewed:

- `RSL WEBSITE DEVELOPMENT.txt` — section 7 defines exactly three roles (Students, Instructors, Administrators) and their responsibilities; section 15 lists user accounts as administrator-managed content; section 10 requires WCAG 2.2 AA, keyboard and screen-reader support; section 11 specifies navy `#12304A`, teal `#199696`, white and light grey.
- `DESIGN AND UI WWW.txt` — confirms the Administrator Dashboard design deliverable and Deaf-first visual communication, captions and mobile-friendly navigation.

The permission lists implemented are exactly those supplied in the Phase 10B request and consistent with the development specification. No additional role, hierarchy, approval workflow, account capability or status rule is presented as approved. Account status is explicitly labelled illustrative; the local-only `Preview` marker is a demonstration value, not a platform state or policy.

## 2. Mandatory initial audit

Actual architecture found:

- Next.js 16.4.6 App Router with `src/app/(public)` route group and nested `src/app/admin/layout.tsx`.
- `AdminLayout` → `AdminNavigation` (client shell) → one `Topbar`, one `Sidebar`, one `<main id="admin-overview">`; skip link, mobile menu with Escape/focus restore and desktop match-media handling.
- Shared `PreviewTable` (labelled scroll region, `scope="col"`/`scope="row"`) and `ManagementPreview.module.css` for admin preview pages.
- Existing admin modules: Overview, Courses, Dictionary, Interpreting, Payments, Certificates, Content, Reports — all independent feature folders with TSX + CSS Modules and typed mock data.
- Duplicate public Header/Footer rendering **is corrected**: `src/app/(public)/layout.tsx` is the only place that renders `<Header />` and `<Footer />`; no page renders them again. Browser audit confirmed exactly one site-level `header`/`footer` on all twelve public routes and one Topbar/Sidebar on all nine admin routes. Some completed pages use a semantic `<header>` for an in-page section heading inside `<main>`; these are not duplicate site navigation.

No second Sidebar, Topbar, Header or Footer was introduced.

## 3. Implementation state

At the start of this request the `/admin/users` route and the complete `src/features/admin/Users/` tree were already present in the working tree (untracked files created earlier on 18 November 2026). Rather than overwrite working code, the module was audited line-by-line against every Phase 10B requirement and verified in a browser. Only two targeted refinements were made in this request, both in `UserEditor.tsx`:

1. The form now states explicitly: “This local preview does not create an account on the platform or change security permissions.”
2. The validation error region changed from `role="status"` to `role="alert"` for correct accessible error announcement.

The existing Admin Sidebar already contained the active `Users` link; no navigation change was needed. `src/features/admin/Sidebar/Sidebar.tsx` and `src/features/admin/data/adminOverviewData.ts` remain as they were at the start of this request.

## 4. Files

New to the repository (present at audit, verified and retained):

```
src/app/admin/users/page.tsx
src/features/admin/Users/UsersPage/UsersPage.tsx
src/features/admin/Users/UsersPage/UsersPage.module.css
src/features/admin/Users/UserTable/UserTable.tsx
src/features/admin/Users/UserTable/UserTable.module.css
src/features/admin/Users/UserFilters/UserFilters.tsx
src/features/admin/Users/UserFilters/UserFilters.module.css
src/features/admin/Users/UserDetails/UserDetails.tsx
src/features/admin/Users/UserDetails/UserDetails.module.css
src/features/admin/Users/UserEditor/UserEditor.tsx
src/features/admin/Users/UserEditor/UserEditor.module.css
src/features/admin/Users/PermissionOverview/PermissionOverview.tsx
src/features/admin/Users/PermissionOverview/PermissionOverview.module.css
src/features/admin/Users/data/mockUsers.ts
src/features/admin/Users/types/user.ts
```

Refined in this request: `src/features/admin/Users/UserEditor/UserEditor.tsx` only.

Reports/artifacts added:

```
docs/phase-10b/QA.md
docs/phase-10b/qa-results.json
docs/phase-10b/admin/*.png (7 screenshots)
```

### Final Users directory tree

```
src/app/admin/
├── layout.tsx
├── page.tsx
└── users/
    └── page.tsx

src/features/admin/Users/
├── UsersPage/          UsersPage.tsx, UsersPage.module.css
├── UserTable/          UserTable.tsx, UserTable.module.css
├── UserFilters/        UserFilters.tsx, UserFilters.module.css
├── UserDetails/        UserDetails.tsx, UserDetails.module.css
├── UserEditor/         UserEditor.tsx, UserEditor.module.css
├── PermissionOverview/ PermissionOverview.tsx, PermissionOverview.module.css
├── data/               mockUsers.ts
└── types/              user.ts
```

## 5. Implementation notes

- `UsersPage` is the only `"use client"` boundary; its child components are plain TSX with CSS Modules. Filters, view switching and local records live in React state only.
- Heading: `User Management`; description and preview notice are the exact requested strings.
- Directory: four synthetic `@example.test` records using `Sample Student 01/02`, `Sample Instructor 01`, `Sample Administrator 01`; columns Full name, Email address, Assigned role, Account status, Action; `View details` button per row.
- Search covers name and email; role and status selects combine with search; results count and no-results message are announced via `role="status"`; Clear filters resets all three controls.
- Details view shows name, email, role, illustrative status and the role's responsibilities; the focused `User details` heading and a return button provide a keyboard-accessible round trip.
- `PermissionOverview` lists Student (6), Instructor (4) and Administrator (8) responsibilities verbatim, with the explicit backend-implementation caveat.
- Add/Edit forms validate non-empty name (≤100 chars), syntactically valid `@example.test` email (≤254 chars), uniqueness against other preview records and an allowed role; invalid fields gain `aria-invalid`, `aria-describedby` and focus; errors use `role="alert"`.
- Apply creates/updates only in-memory state and navigates to Details with a feedback message that explicitly denies account creation or permission changes. Cancel restores the prior view. Reload resets everything.
- No `fetch`, `XMLHttpRequest`, form action, server action, password/token field, `localStorage`, `sessionStorage` or cookie write exists in the Users feature.
- Colours, thin separators, table density and buttons reuse the existing admin CSS conventions; no dialog is used, so no dialog focus trap is required.

## 6. Commands and actual results

| Check | Command | Actual result |
| --- | --- | --- |
| Strict TypeScript | `npx --no-install tsc --noEmit` | Pass — no output |
| ESLint | `npm run lint` | Pass — no output |
| Production build | `npm run build` | Pass — compiled successfully; TypeScript finished; 49 static pages generated, including `/admin/users` |
| Production server | `npx --no-install next start -p 3217` | Ready; `/admin/users` returned 200 |
| Browser harness | Headless Chrome via `playwright-core` from the approved temp workspace | 80/80 named checks passed |
| Raw evidence | `docs/phase-10b/qa-results.json` | Full check, route, responsive and axe output |

## 7. Browser QA results

### Routes and layout

- HTTP 200 and an `h1` on all nine admin routes and twelve public regression routes.
- `/admin/users` direct load: `h1` = `User Management`; exactly one site header, one sidebar and one main; no footer.
- Sidebar: `/admin/users` → `Users:page`; `/admin/courses/beginner` → `Courses:location`; all nine modules remain reachable with accurate active states.
- Public routes retain exactly one site Header and one site Footer. Admin routes retain exactly one Topbar and one Sidebar. No duplicate navigation component.

### Users interactions

| Scenario | Observed result |
| --- | --- |
| Search by name | `student 02` → 1 row (Inactive) |
| Search by email | `instructor-01@example.test` → 1 row (Instructor) |
| Combined filters | Instructor + Active → 1 row; Administrator + Inactive → 0 rows and the no-results message |
| Clear filters | 4 rows; all three controls reset |
| Results announcement | Count/no-results text has `role="status"` |
| Keyboard focus | Tab from search moves to role select; `:focus-visible` true, outline 3px |
| Details | Clicking View details moves focus to the `User details` heading; all four fields and 6 Student permissions shown; return button restores the focused `User directory` heading |
| Role permissions | Instructor detail: 4 items incl. Monitor student learning progress; Administrator detail: 8 items incl. View reports and activity; overview contains all three roles and the backend caveat |
| Add validation | Empty name → “Enter a sample full name…” with focus on the name field and `aria-invalid=true`; `tester-09@example.com` → example.test rule; duplicate address → “already in the preview directory” |
| Add success | New `Sample Tester 09` detail with status `Preview`; feedback states no account was created; directory shows 5 rows |
| Edit validation/success | Prefilled values; bad domain rejected; edited name/role/email shown in detail with “No account or security permissions were changed”; Cancel leaves details unchanged |
| State reset | After reload, added record absent (4 rows) and edited record restored to original values |
| Storage/network | 0 storage writes; 0 non-GET requests |

### Responsive geometry

| Width | Page scrollWidth / innerWidth | Table region (client / scroll) | Sidebar / toggle | Controls outside page viewport |
| --- | --- | --- | --- | --- |
| 320px | 320 / 320 | 288 / 576 | hidden / visible | 0 |
| 390px | 390 / 390 | 351 / 576 | hidden / visible | 0 |
| 768px | 768 / 768 | 691 / 691 | hidden / visible | 0 |
| 1024px | 1024 / 1024 | 670 / 670 | persistent / hidden | 0 |
| 1280px | 1280 / 1280 | 900 / 900 | persistent / hidden | 0 |
| 1440px | 1440 / 1440 | 1044 / 1044 | persistent / hidden | 0 |

The table scrolls only inside its labelled region; there is no page-level horizontal overflow. At 390px, the mobile menu opens with focus on Overview, Escape closes it and restores focus to the toggle.

### Accessibility scans

- axe-core WCAG 2.0/2.1/2.2 A+AA tags: **0 violations** on directory (29 passes), details (26 passes) and add form (27 passes); 0 incomplete results.
- Heading order `h1 User Management` → `h2 User directory` → `h2 Role & permission overview` → role `h3`s; details and editor use focused `h2`s.
- All directory form controls have associated labels; table headers use `scope`; the table region is labelled and focusable.
- Error text uses `role="alert"`; status messages use `role="status"`; global `:focus-visible` outline is 3px.
- With `prefers-reduced-motion: reduce` emulated: 0 animated/transitioned elements and `scroll-behavior: auto`.

### Console and network

- 0 console errors, 0 page exceptions, 0 HTTP 4xx/5xx responses across the 21-route sweep and all interactions.
- 0 unexpected request failures. 74 `net::ERR_ABORTED` entries were cancelled RSC prefetches, CSS/JS requests and sample media caused by the harness navigating rapidly between routes; no application error or failed user action occurred.
- 0 non-GET requests and 0 browser storage writes, confirming no backend write or persistence path.

## 8. Screenshots

Captured from the production build:

```
docs/phase-10b/admin/desktop-1440-directory.png
docs/phase-10b/admin/desktop-1440-details.png
docs/phase-10b/admin/desktop-1440-add.png
docs/phase-10b/admin/mobile-390-directory.png
docs/phase-10b/admin/mobile-390-details.png
docs/phase-10b/admin/mobile-390-add.png
docs/phase-10b/admin/mobile-320-directory.png
```

All files were produced and are non-empty. This agent cannot visually render PNGs, so no subjective pixel judgement is claimed; layout was verified with measured DOM geometry and axe scans.

## 9. Preservation confirmation

A SHA-256 snapshot of all 211 source files was taken before refinement and compared afterwards. **Only `src/features/admin/Users/UserEditor/UserEditor.tsx` changed.** No file belonging to Phase 10A (Overview/Sidebar/Topbar/AdminLayout), Phase 10C (Courses), Phase 10D or Phase 10E (other admin modules), or any public page/layout was modified in this request. No Student or Instructor Dashboard was started.

## 10. Current frontend limitations

- All records and changes are in-memory only; reload discards them.
- No authentication, session, server-side authorisation or real RBAC; the preview does not prove access control.
- No account creation, invitation, credential generation, role change, suspension or deletion occurs.
- `Active`, `Inactive` and `Preview` are illustrative labels; management has not defined an account-status policy or approval workflow.
- No database, API, file upload, email delivery, audit trail or persistence of any kind.
- Details are reached through client view state, not a shareable per-user URL.
- Directory is unpaginated (four sample records).
- The named management `.docx` originals are not in this repository; this phase relied on their converted text and the supplied Phase 10B requirements.

## 11. Backend requirements for real user and permission management

These are implementation requirements, not claims of approved policy:

1. Authenticated administrator endpoints with server-enforced authorisation for every user/role operation.
2. Persistent user records with a unique, normalised email address and a server-validated role limited to the three management-defined roles.
3. Server-side validation and authorisation for privileged role changes; the client preview must never be treated as authoritative.
4. A management-approved definition of account status and any transition rules before activation/suspension features are built.
5. Separate, approved flows (with confirmation and audit logging) for account creation, invitations and credential handling; no credentials or invitations are generated by the frontend.
6. Audit records of who changed which user/role and when, plus rate limiting and protection against cross-site request forgery.
7. Privacy controls and secure handling of personal data, consistent with the development specification's security and privacy section.
8. A real permission model enforced on every protected resource and route; the permission lists shown here are informational only.

STOP — Phase 10B complete; no further phase was started.
