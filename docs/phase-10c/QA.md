# Phase 10C — Administrator Course & Learning Content Management

Date: 17 November 2026

## Mandatory source review

Both management documents were read from `C:\Users\Admin\Downloads`:

- `RSL WEBSITE DEVELOPMENT.docx` — confirms administrator management of courses and lessons, sign-language videos, learning materials, quizzes and assessments, course information and learning objectives, free and paid options, student progress tracking and certificates. No course publication approval workflow is defined.
- `DESIGN AND UI WWW.docx` — confirms the administrator dashboard design deliverable and the requirement to prioritise Deaf users through visual communication, sign-language video, captions and mobile-friendly navigation.

No publication states were treated as confirmed business policy. The UI uses "Unconfirmed" / "preview" wording only.

## Phase 10B dependency status

**Phase 10B is absent.** There is no Users module, no `/admin/users` route, and `Users` remains in the planned-modules list in the sidebar. The admin foundation safely supports an independent Courses module, so work continued without fabricating Phase 10B completion. No Users navigation or route was added.

## Files

New in this phase (admin Courses feature):

```
src/app/admin/courses/page.tsx
src/app/admin/courses/[courseId]/page.tsx
src/app/admin/courses/[courseId]/not-found.tsx
src/features/admin/Courses/CoursesPage/CoursesPage.tsx
src/features/admin/Courses/CoursesPage/CoursesPage.module.css
src/features/admin/Courses/CourseTable/CourseTable.tsx
src/features/admin/Courses/CourseTable/CourseTable.module.css
src/features/admin/Courses/CourseEditor/CourseEditor.tsx
src/features/admin/Courses/CourseEditor/CourseEditor.module.css
src/features/admin/Courses/LessonManager/LessonManager.tsx
src/features/admin/Courses/LessonManager/LessonManager.module.css
src/features/admin/Courses/MaterialsManager/MaterialsManager.tsx
src/features/admin/Courses/MaterialsManager/MaterialsManager.module.css
src/features/admin/Courses/AssessmentManager/AssessmentManager.tsx
src/features/admin/Courses/AssessmentManager/AssessmentManager.module.css
src/features/admin/Courses/data/mockAdminCourses.ts
src/features/admin/Courses/types/adminCourse.ts
src/features/admin/Courses/usePreviewForm.ts
src/features/admin/Courses/PreviewForm.module.css
```

Existing admin files touched only for Courses integration (already present in the working tree at the start of this request): `src/features/admin/Sidebar/Sidebar.tsx`, `Sidebar.module.css`, `src/features/admin/data/adminOverviewData.ts`.

Files refined during this request: the six manager/data files above for readiness wording, form validation and metadata; `src/app/admin/courses/[courseId]/page.tsx`.

No public course, public layout, authentication, dictionary, interpreting, resources, community, blog, contact, brand asset or animation file was modified.

## Final admin directory tree

```
src/app/admin/
├── layout.tsx
├── page.tsx
└── courses/
    ├── page.tsx
    └── [courseId]/
        ├── page.tsx
        └── not-found.tsx

src/features/admin/
├── AdminLayout/        AdminLayout.tsx, AdminLayout.module.css, AdminNavigation.tsx
├── Sidebar/            Sidebar.tsx, Sidebar.module.css
├── Topbar/             Topbar.tsx, Topbar.module.css
├── Overview/           Overview.tsx, Overview.module.css
├── data/               adminOverviewData.ts
├── types/              admin.ts
└── Courses/
    ├── CoursesPage/    CoursesPage.tsx, CoursesPage.module.css
    ├── CourseTable/    CourseTable.tsx, CourseTable.module.css
    ├── CourseEditor/   CourseEditor.tsx, CourseEditor.module.css
    ├── LessonManager/  LessonManager.tsx, LessonManager.module.css
    ├── MaterialsManager/ MaterialsManager.tsx, MaterialsManager.module.css
    ├── AssessmentManager/ AssessmentManager.tsx, AssessmentManager.module.css
    ├── data/           mockAdminCourses.ts
    ├── types/          adminCourse.ts
    ├── usePreviewForm.ts
    └── PreviewForm.module.css
```

## Implementation notes

- Course data reuses the existing public `courses` array as the single source of truth for the six required categories, IDs, levels and objectives. Public course content was not changed.
- The directory table has exactly six rows with Course title, Level or audience, Content readiness and Edit preview action. Readiness is explicitly "Course details only · media pending", with an explanatory sentence stating that no lesson, video, material or assessment mock content exists.
- The detail route offers four anchored section links and four matching sections: Course Details, Lessons, Materials, Assessments. Anchors move focus to the target section.
- All four forms are local-only, uncontrolled React forms with `noValidate`, custom required-field checks, `reportValidity()` and a `role="status"` feedback message. No storage, upload, API or backend call exists; there are zero `input[type="file"]` controls.
- Assessment question is a neutral platform-usage question with editable options and a correct-answer selector. No RSL linguistic content or certification is asserted.
- Mobile sidebar behaviour from Phase 10A remains intact.

## Commands and actual results

| Check | Command | Result |
| --- | --- | --- |
| Strict TypeScript | `npx --no-install tsc --noEmit` | Pass, no output (before and after final edits) |
| ESLint | `npm run lint` | Pass, no output |
| Production build | `npm run build` | Pass — 42 pages generated, six admin course detail pages prerendered |
| Production server | `npx next start -p 3216` | Ready, no server errors |
| Browser harness | Headless Chrome 157 via DevTools Protocol | Checks below executed |

## Route checks

HTTP 200 with no application-error text:

`/admin`, `/admin/courses`, and all six edit routes: `/admin/courses/beginner`, `/intermediate`, `/advanced`, `/parents-and-families`, `/teachers-and-educators`, `/professionals`.

Regression HTTP 200: `/`, `/courses`, `/courses/beginner`, `/courses/beginner/learn`, `/auth`, `/dictionary`, `/interpreting`, `/resources`, `/community`, `/blog`, `/contact`.

Unknown course: `/admin/courses/not-a-real-course` rendered the custom "Course not found" page with a return link. See Known limitations for the HTTP-status detail.

## Form and interaction results

| Scenario | Observed result |
| --- | --- |
| Course editor empty required description | Feedback `Check the highlighted field.`; validation message `Enter text other than whitespace.` |
| Course editor completed | `Course fields checked. Changes are temporary and have not been saved.` |
| Availability options | `Unconfirmed`, `Free (preview)`, `Paid (preview)` |
| Lesson empty required topic | Feedback `Check the highlighted field.` |
| Lesson completed | `Lesson outline checked. No lesson has been saved.` |
| Materials submit | `Material references checked. No files have been uploaded or published.` |
| Assessment with no correct answer | Feedback `Check the highlighted field.` |
| Assessment completed | `Sample assessment checked. No assessment has been saved.` |
| Section navigation click | Hash `#course-lessons`, focus moved to the Lessons section |
| Sidebar state | `/admin/courses` → `Courses:page`; detail route → `Courses:location`; Overview → Courses → editor → back link returned `/admin` → `/admin/courses` → `/admin/courses/beginner` → `/admin/courses` |
| Mobile sidebar (390px) | Enter opens (focus moves to Overview), Escape closes and restores focus to the toggle |

## Responsive results

| Viewport | Page overflow | Table region | Sidebar / toggle |
| --- | --- | --- | --- |
| 320px | None (305/305px) | 273px viewport, 544px scroll width, scroll hint visible | Hidden / visible |
| 390px | None (375/375px) | 336px viewport, 544px scroll width, scroll hint visible | Hidden / visible |
| 768px | None | 691px, no internal scroll | Hidden / visible |
| 1024px | None | 655px, no internal scroll | Persistent / hidden |
| 1280px | None | 885px, no internal scroll | Persistent / hidden |
| 1440px | None | 1029px, no internal scroll | Persistent / hidden |

Detail page at 390px: no horizontal overflow; assessment answer grid collapses to one column.

## Accessibility checks performed

- Directory headings: `h1 Course Management` → `h2 Course directory`; detail: `h1` course title → four `h2` section titles.
- Table uses `thead th scope="col"` and `tbody th scope="row"`; scroll region is labelled and focusable.
- All form controls have labels; fieldset/legend used for answer options; zero unlabelled controls detected.
- Four `role="status"` feedback regions; no reliance on audio or animation.
- Contrast: muted body text 7.36:1, notice 6.6:1, input border 3.07:1 (above the 3:1 UI-component threshold).
- With `prefers-reduced-motion: reduce` emulated, 0 elements reported animation or transition.

This is a targeted DOM/accessibility-tree audit, not a full axe or Lighthouse conformance report.

## Console and network

- Clean run across 19 routes: **no console errors and no HTTP 4xx/5xx responses**.
- The only network entries classified as failures were seven `net::ERR_ABORTED` media requests caused by the harness navigating rapidly away from pages containing video; they are not application errors.
- The single HTTP 404 observed in the full harness was the deliberate unknown-course navigation.

## Screenshots

- `docs/phase-10c/admin/desktop-1440-directory.png`
- `docs/phase-10c/admin/desktop-1440-detail.png`
- `docs/phase-10c/admin/mobile-390-directory.png`
- `docs/phase-10c/admin/mobile-390-detail.png`
- `docs/phase-10c/admin/mobile-320-directory.png`

Captured from the production build. Visual fidelity was checked through measured DOM geometry; this agent could not render the PNGs visually, so no subjective pixel assessment is claimed.

## Missing management decisions

1. Course publication states and any approval workflow — publication terminology is provisional only.
2. Approved lesson titles, topics, written explanations and sign-video references.
3. Caption availability and verification rules.
4. Pricing amounts, payment configuration and free/paid entitlement rules.
5. Which downloadable files are permitted and who authorises them.
6. Assessment pass criteria, attempts and certificate-eligibility rules.
7. Student progress tracking and certificate generation behaviour.

## Known limitations

- No real administrative changes are persisted. Editing is local, temporary and discarded on navigation or reload.
- No backend, database, storage, upload, payments, progress tracking or certificate generation.
- Unknown course IDs correctly render the custom not-found experience. With Cache Components enabled, the first uncached request can be streamed with HTTP 200 before `notFound()` is reached; subsequent cached requests return HTTP 404. `dynamicParams` is unavailable under Cache Components, so this is reported rather than worked around with unrelated infrastructure.
- Phase 10B (Users) is not implemented; Users remains planned.

## Confirmation

All previously implemented public features and the Phase 10A admin Overview, Sidebar and Topbar appearances remain unchanged. The only admin shell change is the already-present Courses navigation activation. No Phase 10D work was started.
