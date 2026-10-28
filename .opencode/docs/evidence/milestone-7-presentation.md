# Opening migration presentation and acceptance

Starting commit: `a6b3153b42602e0a356a66e787e0872078058825`, branch
`refactor/shared-components`, clean at entry. Preservation source is immutable
`0b5d2297e7cbc19bd59cde750492dd28e3983ca0` and sealed Opening maps/banks/HTML.
Read the three required Middle correction records and Final's exact heading/cue
follow-up before extraction.

## Owner decisions and prerequisites

- Owner confirms milestone 6 fully tested in Safari and Chrome: navigation,
  style, accessibility and printing. Versions/devices/individual AT actions not
  specified; no additional coverage inferred. This clears its owner acceptance
  prerequisite, without rewriting the historical pending handoff.
- Owner explicitly requires the actual `opening.html`, **no alternate preview
  HTML**; this supersedes the separate preview/cutover checkpoint approach. Local
  entry integration is authorized; acceptance of the resulting presentation is
  not presumed. No publication/commit authorized.
- Numbered headings, including Knowledge Check: bold Fraunces,
  `clamp(1.85rem,3.4vw,2.6rem)`, 1.17 leading, `-.035em` tracking. No invented
  Welcome page. Reference/activity/model headings keep their own hierarchy.
- Opening has **zero flashcards**. Shared front/back explored cues already exist
  and are left untouched. Keep Opening's own selected/explored distinctions;
  hydration must not select WHO or fabricate exploration.
- Only Opening and new/additive Opening-profile checks run. No whole-site suite,
  Middle/Final suite or production lesson changes. Shared additions must be
  isolated to new types/profiles, with no changes to existing consumers' behavior.

## All-section source → metadata/profile/scoped-style inventory (before extraction)

| Section | Complete original composition/states | Content/profile/scoped mapping |
| --- | --- | --- |
| 0 contributions | eyebrow/title/muted lead; two static cards with distinct pills/headings/prose/4 bullets; classification white panel, instructions/counter/statement, 2 pill answers, feedback and next/review | Markdown bounded two-column/plain + soft cards; shared `opening-classification`; Opening pill/green-red repair, original feedback corner/accent |
| 1 opening-sequence | title/lead; white panel heading, 6 connected numbered rows, plus/minus, collapsed/expanded explanations; emphasized reminder; always-available checkpoint panel with 3 answers/two feedback messages | Markdown + shared `timeline` profile, Opening connected-line CSS and stable stage IDs; shared question controller; checkpoint last selection independent of correct-ever |
| 2 task-analysis | title/lead; 5 color-accent definition cards; WHAT/HOW reminder; white analysis panel/instruction, exact annotated mental-health task, 5 navy-selected category tabs, initial unselected explanation, TERMS note; separate WHAT/HOW panel/2 choices | ordered task-segment JSON + new root-scoped task-analysis controller; native roving tabs/ARIA; TERMS highlights WHO+WHAT only; shared decision; scoped color/grid/card CSS |
| 3 clarifications | title/lead; pale essentials panel/4 checks in 2 columns; constructive-participation paragraph; decision panel with quoted context, bold prompt, 3 choices/explanations | bounded Markdown callout/two-column groups, shared decision, Opening feedback/panel theme |
| 4 give-direction | title/lead; roadmap/destination cards with symbols, headings, paragraph roles, 5 ordered agenda steps and quoted example; builder panel/title/instructions, 2 required inputs, submit, editable output, copy/status/model toggle; separate self-check panel/title/prose/check | Markdown, shared `opening-consensus` writing/formatter/clipboard and checklist; legacy field IDs retained; optional toggle model, exact template and 35-character gate |
| 5 research-transition | title/lead; 3 white cards/headings/body; white decision panel/title, pale scenario, bold prompt, 3 choices/explanations | Markdown bounded flow, shared decision, Opening three-column/responsive scoped styles |
| 6 knowledge-check | eyebrow/title/lead; all 5 numbered questions visible, 15 choices, immediate feedback; summary only after all selected, earned score, remaining hint/retry | shared `opening-knowledge-check` (not sequential); content summary labels; separate white question/summary panels; retained credit/retry first unearned/focus |
| 7 reference | eyebrow/title, one Print, 60-minute badge; 4 numbered bounded groups: six-step sequence + caution; colored WHO/WHAT/HOW/WHERE cells + TERMS note; 2 contribution cells; 4 direction/terminology cells | common reference loader/renderer with explicit Opening layout, Markdown bounded lists; scoped 6/3/1 sequence and 4/2/1 terminology grids, compact reference-only print |

Reconciled source: 5 classification statements (10 feedback alternatives), 6
timeline stages, 5 analysis categories/6 annotated spans, 1 sequence checkpoint
(3 options), 3 independent decisions (2/3/3 options), 1 builder + optional model,
1 self-check, 5 all-at-once quiz questions (15 options), 4 reference groups.
Static cards are **not** flashcards. No original content, captures or seals changed.

## Baseline verification before edits

`caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/opening-extraction.spec.mjs tests/browser/baseline.spec.mjs tests/browser/policy.spec.mjs --grep 'Opening extracted|opening complete real|Opening exact' --workers=1 --max-failures=1 --output=test-results/m7-before`

**16/16 passed**, 4 per Chromium/Firefox/WebKit/mobile Chromium, both mounts,
1.2 minutes. Covers unchanged Opening fresh journey, all options/feedback/gates,
five restored fixtures, exact extracted source/cascade comparison and print.
No other lesson ran. New scoped tests/results/comparison decisions will be appended.

## Review limits

New Opening presentation acceptance pending owner review of actual `opening.html`.
No interactive browser/AT/actual zoom/device/print-preview result by agent is
claimed. Automated screenshots/enlarged text/PDFs are not those manual checks.

## Implemented graph and profile boundaries

79 exclusively extracted files, 66 source/prose/reference mappings:
`milestone-7-source-map.json`. Ten activities, 62 section Markdown files, four
reference Markdown files, reference JSON/manifest/mechanical config. Original
content © Rhys Jones / CC BY 4.0; implementation MIT; notices/sealed sources intact.

The new task-analysis controller is the only new interaction implementation.
Timeline, classification, questions, all-at-once quiz, builder, checklist, copy and
reference loading delegate existing shared controllers. Opening registry only
binds original IDs/presentation/required inputs. No parallel storage/navigation
engine. Opening's frozen adapter did not need changes: existing extension mapping
already supports the separately saved sequence last choice.

Additive closed metadata: task segments/categories; `soft` group tone;
decorative `symbol` paragraph role (aria-hidden); original subordinate Markdown
`headingId` (exactly one h3 required); Opening-only quiz summary labels; four-group
Opening reference layout/badge. Existing Middle/Final consumers use none of these
additions; shared behavior changes are guarded by new/Opening-only profiles.
No shared CSS, flashcard controller, Middle/Final content/entry/style/codec change.

Opening CSS retains its original prefix and adds a narrowly scoped theme. Card
surfaces, palettes/padding/radii, connected timeline, navy tabs, exact highlight
colors, feedback accents/corners, builder/model and reference grids remain.
Explicit permitted differences: approved larger counted headings; shared explored
timeline cues; native control/live-region/focus geometry; modest wrapper spacing
and intrinsic wrapping. At 320px/enlarged text, footer controls and long prose may
wrap rather than overflow. No source content or policy traded for geometry.

## Preflight outcomes and corrections (not relabeled as green)

1. First Opening unit run: **7 passed/1 failed**, only the new bounded-shell oracle
   omitted a final newline. Corrected that explicit shell transformation; subsequent
   Opening units **8/8 passed**. No instructional/source baseline changed.
2. Initial 13-identity Chromium integration selection: **4 passed/1 failed/8 not
   run**, plus fail-fast runner notification. The legacy absent-quizEarned check
   expected an initialization completion save. New contract forbids hydration writes:
   now assert raw unchanged, then perform a real classification choice and assert
   the exact original fallback credit. Original replay assertion remains unchanged.
3. Expanded Chromium selection: **4 passed/1 failed/26 not run**. Independent full
   original-passage assertion caught a genuine extraction error: research prompt
   selector matched the third descriptive card's paragraph. Corrected the extractor
   and JSON to the original **“What is the best response?”**. Added independent
   pinned prompt/order assertions; did not relax the missing-passage test.
4. Corrected expanded Chromium selection: **31/31 passed**, **59.0s**, both current
   mounts and both Opening replay mounts. Fresh journeys/every option and exact
   feedback, silent restoration/all valid fixtures, seven gates, ARIA/keyboard,
   sequence extension replay, builder/model/clipboard, all-at-once quiz/retry,
   failures/storage and reference printing.
5. First Chromium presentation command: **6 passed/1 failed/1 not run**, **50.2s**.
   All eight sections at three widths/both mounts pass original/current card-surface
   comparisons and state checks. New 320px/enlarged-text check exposed real footer
   Next-button overflow (right edge 363.65625px in 320px viewport). Scoped min-width
   and wrapping fix, not hidden overflow or a relaxed assertion. Diagnostic used
   only synthetic Opening progress and an ephemeral local server.
6. Scoped enlarged-text rerun: **8/8 passed**, **26.8s**, all four projects/both
   mounts, all titles/sections/controls, reduced motion and reference-only print.
7. After adding bounded Opening reference schema conditions, development Ajv caught
   a missing explicit array type in the new conditional. Added `type: "array"`,
   retaining strict validation. Final Opening units then **8/8 passed**; selected
   bounded Opening-shell unit **1/1 passed**. No full unit/validation suite.

Commands for 31-identity Chromium preflight:

```sh
npm run test:browser -- tests/browser/opening-extraction.spec.mjs tests/browser/opening-lesson.spec.mjs tests/browser/baseline.spec.mjs tests/browser/policy.spec.mjs tests/browser/persistence.spec.mjs tests/browser/print.spec.mjs --project=chromium --grep '(?:^|/| )opening (?:fresh|complete|observed|clipboard|prints)|Opening ' --workers=1 --max-failures=1 --output=test-results/m7-integration-third
npm run test:browser -- tests/browser/opening-presentation.spec.mjs --project=chromium --workers=1 --max-failures=1 --output=test-results/m7-presentation-first
caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/opening-presentation.spec.mjs --grep '320px' --workers=1 --max-failures=1 --output=test-results/m7-enlarged
node --test tests/unit/opening-migration.test.mjs
node --test --test-name-pattern='Opening extraction' tests/unit/baseline.test.mjs
```

Node v22.23.4 via fnm. The unit directly validates only `content/opening` plus
Opening config/manifest/activity/reference/schema/formatter/codec/policy contracts.
No whole-site content validation or Middle/Final test suite was invoked.

## Final automated outcomes and impact-scoped follow-ups

```sh
caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/opening-extraction.spec.mjs tests/browser/opening-lesson.spec.mjs tests/browser/opening-presentation.spec.mjs tests/browser/baseline.spec.mjs tests/browser/policy.spec.mjs tests/browser/persistence.spec.mjs tests/browser/print.spec.mjs --grep '(?:^|/| )opening (?:fresh|complete|observed|clipboard|prints)|Opening ' --workers=1 --max-failures=1 --output=test-results/m7-opening-final
```

**156/156 passed**, 39 per Chromium/Firefox/WebKit/mobile Chromium, zero skipped,
failed, flaky or runner errors; **549.465072s (9.2 minutes)**. Both current mounts
and both Opening pinned-replay mounts. Includes full fresh journeys/every answer
and feedback, all valid v1 fixtures, all seven gates, one writer/Print handler,
storage/loading failures, clipboard fallback, quiz retry, and reference-only print.
The presentation portion compares every section at **1440/780/390px**, both mounts,
all four projects: **192 original/current section comparisons**, including all five
analysis categories, six expanded timeline stages, every authored activity/model
and selected/incorrect/retained-credit states. Additional 320px/enlarged-text and
reduced-motion checks cover every section. Fonts settle before screenshots.

Archived results and 160 selected PNG/PDF artifacts: `milestone-7-presentation/opening-confirmed/`.
Original reporter-byte SHA-256:
`58a476d825588e05cea1005cd6225e82c30545eb61c59622941560eabaacd7a2`.
Report JSON preserves test results, attachment metadata/hashes and runner stats;
selected binary captures are separate. Redundant oversized gzip copies of inline
base64 image bodies were removed from this session's new archive (not baselines).
No sealed source/capture or test outcome was removed or rewritten.

### Heading loading race and additional retry coverage

Code review found a possible original-ID binding race: a controller could mount
before its static Markdown heading. Moved `classify-title` to closed Markdown
`headingId` metadata, assigned by the common renderer only after validating exactly
one h3; no DOM-content guessing. Timeline accessible names now exclude decorative
CSS plus/minus. Added held-Markdown and actual activity-failure/retry checks, proving
independent reference readiness, stable IDs, no fabricated exploration/writes and
unchanged text. This additive metadata is unused by Middle/Final.

```sh
caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/opening-extraction.spec.mjs tests/browser/opening-lesson.spec.mjs --grep 'Opening actual entry|Opening six unique|Opening content failure|Opening delayed subordinate' --workers=1 --max-failures=1 --output=test-results/m7-heading-retry-confirmed
```

**32/32 passed**, eight per project, both mounts, **48.785097s**, zero
failed/skipped/flaky/runner errors. Report: `heading-retry-confirmed/`; original
reporter-byte SHA-256 `2c77d712b37fe7ecc2553ae62b37f35dedbf589cec3749e77b7f4fcad6de716c`.
Final scoped units again **8/8 passed**, plus the selected bounded shell unit
**1/1 passed**; same commands above. No full unit/content/browser suite.

### File review caught timeline/tab cascade regressions; corrected and rechecked

Review of the first passing-run artifacts caught presentation defects not covered
by its card-surface oracle: the generic timeline profile overrode Opening's flex
row/border, crowding the explored and minus cues against the title, and the shared
button reset made analysis pills normal weight. Restored those **Opening-only**
styles. Added direct original/current closed/open timeline-button and tab paint
assertions (display/border/padding/radius/typography), retaining all prior assertions.
Original/premature captures remain unchanged and are **not** approved final views.

```sh
caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/opening-presentation.spec.mjs --grep 'every section/state.*780px|320px' --workers=1 --max-failures=1 --output=test-results/m7-timeline-tabs-confirmed
```

**16/16 passed**, four per project, both mounts, **91.037465s**, zero
failed/skipped/flaky/runner errors. Affected Opening presentation only: all sections
and interaction states at 780px, plus every section/control at 320px/enlarged text,
reduced motion and print. Other widths' earlier evidence remains historical, not
relabeled as a fresh full matrix. Final report/80 selected PNG/PDF artifacts:
`timeline-tabs-confirmed/`; reporter-byte SHA-256
`ad182441937330b5f3847ff4858fcc445351a72fd409e71ecef8bf2d635cda6d`.

The 156-, 32- and 16-test runs are separate passing invocations, **not** a single
204-test run. No full-suite or unrelated lesson tests ran. No command remains
running from this implementation. `git diff --check` passes; explicit path audit
shows no Middle/Final entry/style/content/policy/adapter change, no Opening adapter
change and no sealed-fixture change.

## Actual artifact review, permitted differences and owner handback

Agent **file-based review only**: desktop timeline/TERMS/builder/model/reference;
mobile TERMS/all-five-question quiz/builder/model; final Chromium 780px
classification/timeline and WebKit 780px TERMS. Final timeline rows now retain
separate right-aligned explored/minus cues and teal expanded borders; analysis pills
retain original bold/navy selected treatment and exact WHO+WHAT TERMS highlighting.
Reviewed instructional content is complete/readable/unclipped. Larger numbered
headings and natural wrapping remain the owner's explicitly approved differences.
Reference badge occupies its own right-aligned row; modest wrapper spacing/native
focus geometry and intrinsic reflow remain permitted, not exact-pixel parity claims.

Read/rendered Chromium reference PDFs, including final
`timeline-tabs-confirmed/chromium-repository-38-Opening-reference-PDF.pdf`:
**one complete Letter page**, all four groups, six-step sequence, colored definitions,
contributions and terminology; no lesson questions/controls or blank leading page.
No interactive print preview, physical printer, screen reader/device, clipboard
permission dialog or actual browser zoom was performed by the agent. Enlarged-root
text is not actual browser zoom; Playwright WebKit is not real Safari.

**Implementation/local entry integration and scoped automated verification are
complete; new Opening owner presentation acceptance remains pending.** Review the
real `opening.html` via the existing server/home-page link or ordinary static
hosting, not another HTML page. Owner's explicit direct-entry instruction supersedes
the separate pre-cutover-preview requirement; it does not fabricate acceptance of
the new Opening version. Milestone 6's Safari/Chrome acceptance is recorded above,
not misattributed to Opening. Stop before milestone 8; no commit/push/deployment.

Final static audit after documentation completion: `git diff --check` passed;
explicit Middle/Final/Opening-adapter/sealed-fixture path diff was empty. A scoped
Node `crypto` SHA-256 audit verified **240/240 archived capture hashes** against
their indexes and all three reports' zero failed/skipped/flaky stats. No browser
or unit suite was rerun during final handoff completion.

## Owner-reported Clarifications essentials spacing — 2026-10-28

Owner reports that most browser verification passes; the one reported defect is
the four checkmarks under **Clarify four essentials** on page 04. Their screenshot
shows the top-right item below the top-left and excessive row spacing. Browser/
version/device details for this review were not specified. This is not blanket
manual acceptance of the corrected version.

Cause: `.dsl-block-group .dsl-content-block + .dsl-content-block` applied a 12px
prose margin to grid cells 2–4 but not cell 1, in addition to the grid's 16px gap.
Only this Opening Clarifications pale-panel grid now resets cell/paragraph margins
and uses the original 12px grid gap. Its 640px two-column breakpoint and mobile
one-column reading order remain unchanged. No content, headings, gates, interactions,
storage, shared CSS/controller, Middle/Final or preview HTML changes.

New focused regression: `tests/browser/opening-essentials-spacing.spec.mjs` checks
the exact four original labels/heading and source grid classes independently of
visual rendering, then actual row/column positions, 12px spacing, zero cell margins,
responsive columns, no overflow, unchanged progress and still-locked decision gate.
Widths: 1440/940/780/640/639/390px and 320px with enlarged root text. Position
arithmetic allows only the native 1/64px CSS grid layout quantum, not a spacing
tolerance. It uses the real `opening.html` on both mounts.

Chronological outcomes (no unsuccessful result relabeled):

- Before CSS edit: focused Chromium original/current comparison **0 passed/1 failed/
  1 not run**, reproducing 16px instead of original 12px gap. Archived
  `essentials-spacing-before/` (four captures/report).
- First corrected original/current comparison: **2 Chromium passed/1 Firefox failed/
  5 not run**. Archived `essentials-spacing-first/` (14 captures/report).
  Firefox's *original replay*, not the corrected panel, rendered as a single column
  at 1440px with browser-default paragraph margins; its screenshot confirms missing
  Tailwind utility styling. The two Chromium comparisons pass all six widths/both
  mounts and enlarged-text checks.
- Adding explicit original CSS-readiness assertions exposed the same issue in
  Chromium repository replay: **1 passed/1 failed/6 not run**, expected grid but
  computed block after the normal 10-second assertion wait. Archived
  `essentials-spacing-replay-loading/` (six captures/report). The resource-loading
  failure's underlying cause is unproven; no CDN/font mocking, altered browser
  security, timeout increase or test retries were introduced.
- The final product regression separates exact *inert pinned-source* assertions
  from actual corrected-panel geometry, instead of requiring a second live replay
  page's external runtime to validate four grid cells. Both row equality and exact
  row-gap/column positions are still asserted, not replaced by a loose screenshot
  check. The earlier successful Chromium paired comparison remains evidence;
  failed replay-resource checks remain recorded, not claimed resolved.

Final command (Node v22.23.4 via fnm):

```sh
caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/opening-essentials-spacing.spec.mjs --workers=1 --max-failures=1 --output=test-results/m7-essentials-panel-confirmed
```

**8/8 passed**, two each Chromium/Firefox/WebKit/mobile Chromium, both mounts,
**68.732820s**, zero failed/skipped/flaky/runner errors. Archive:
`essentials-spacing-panel-confirmed/`, 24 PNGs plus results/hash index; original
reporter SHA-256 `b35785692d935b7f996f597beb28ddb668c0f052ac8da38e69e4accf5e0e2c7d`.
The archive helper only gained support for this named panel test's captures; no
original expectations/captures/seals were overwritten.

Agent file review of final Chromium/WebKit 1440px and Chromium 320px/enlarged-text
captures: both desktop rows align, spacing is compact and even; narrow/enlarged
text remains fully readable with no clipping. This is artifact review, not an
interactive browser/AT/actual-zoom check. `git diff --check` passes; Middle/Final
and sealed-fixture path diffs remain empty. No full unit/content/browser suite,
other Opening pages, unrelated stage checks or print rerun for this panel-only CSS
correction. Owner recheck of this small correction remains pending; stop here.

## Owner acceptance and authorized local commit — 2026-10-28

Owner confirms: **“Browser verification fully passes. Commit these changes but do
not push or start on the next milestone.”** This accepts the migrated real Opening
page including the essentials-panel correction, resolves the preceding owner-review
checkpoint and authorizes one local milestone-7 commit. Browser versions/devices/
individual AT/zoom/print actions were not supplied with this confirmation; no
additional manual coverage is invented. Earlier manual limitations and external
replay-Tailwind failures remain historical evidence, not erased or called fixed.

Milestone 7 is **complete under the owner's approved impact-scoped verification**.
No further browser/full-suite run for commit packaging. Reran only the relevant
`node --test tests/unit/opening-migration.test.mjs` (**8/8 passed**) and
`node --test --test-name-pattern='Opening extraction' tests/unit/baseline.test.mjs`
(**1/1 passed**), Node v22.23.4 via fnm. The first directly validates only Opening's
content graph and exact policies/compatibility. No runtime/content/style change
during packaging; only this acceptance record/current docs/handoff updated.

Reviewed tracked changes and all 395 untracked milestone-7 candidate files: all are
Opening migration/content/schema/test/evidence paths, about 43 MB total, largest
file under 0.5 MB. No unrelated candidate path, development report/profile directory,
new dependency or sealed-fixture change is included. No Middle/Final production
edits. No push, merge, release, tag, Pages change or milestone-8 work authorized or
performed. Stop after the requested local commit.

Staged whitespace review: `git diff --cached --check` reports 14 existing extraction
formatting lines in `content/opening/reference/group-{1..4}.md`: six deliberate
Markdown hard-break endings and eight incidental trailing-space/blank lines. They
are retained with the browser-reviewed content rather than changing that content
during commit packaging. `git diff --cached --check -- . ':(exclude)content/opening/reference/group-*.md'`
passes for every other staged file. This exception is explicit, not a claim of a
clean unrestricted staged whitespace check.
