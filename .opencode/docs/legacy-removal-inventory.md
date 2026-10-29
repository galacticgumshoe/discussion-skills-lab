# Milestone 8 — reviewed-removal inventory v2 and implementation outcomes

**Date:** 2026-10-28. **Source commit:**
`fc51bac0e8a790ccf40f83720059feed7c9eb501`.
**Branch:** `refactor/shared-components`. **Approval:** owner message
“Approved of the proposed plan. Go ahead and implement those changes.” (2026-10-28),
referring to this v2 proposal. Deletion-ready S01–S03/H01–H02/P01–P04/R01 and
T01/T03–T07 are approved within their exact reviewed scopes and dependency
conditions. T11's public-cutover/consumer-retarget condition is now satisfied;
the exact three reviewed helpers are retired after report preservation.
Deferred T02/T08–T10 remain conditional on assertion ports/evidence;
no deletion by analogy or material scope expansion is authorized. No commit,
merge, push, publication or manual-browser sign-off is granted. Milestone incomplete.

**Subsequent owner decision (2026-10-29):** “Changes look good. Please commit but
do not push.” Authorizes a local commit of the current reviewed work, including
the Middle Print correction; no push, merge, publication or expanded cleanup.
Remaining T02/T08–T10 work keeps milestone 8 incomplete. No unreported device,
assistive-technology or print-preview coverage is inferred from this acceptance.

**Revision reason:** owner clarified that all Opening/Middle/Final migration
support must be assessed for retirement, not kept permanently because temporary
tests reference it. Version 1 was too conservative about executable harnesses and
incorrectly grouped cutover helpers with indispensable baseline artifacts.
An active *temporary* consumer is a dependency to retire/retarget, not a permanent
retention justification. This correction grants no deletion approval.

The owner decision above authorizes only the reviewed deletion-ready scopes. Existing
S/H/P/R source/replacement hashes and excerpts remain recorded in
[`evidence/milestone-8/reviewed-sources-v1.json`](evidence/milestone-8/reviewed-sources-v1.json).
The expanded audit's exact file identities, hashes, references, classifications
and six reference-copy comparisons are in
[`evidence/milestone-8/migration-support-v2.json`](evidence/milestone-8/migration-support-v2.json).
Its [human-readable per-file index](evidence/milestone-8/migration-support-v2.md)
individually enumerates **27 helpers, 30 browser specs, 14 unit files and all 35
unsealed harness files**, with 586 source/fixture/content records and 877 historical
evidence records overall. Stable `MS-…` file IDs supplement the bundle IDs below.
All tests/helpers/fixtures were considered, including files whose names do not say
"migration". V1's hash evidence and historical handoff remain unchanged.
Ranges below are 1-based in those hashed files. Minified single-line sources are
identified by delimiters/excerpts, **not permission to replace the whole line**.
The outcome ledger below records the actual local cutover/removals. Candidate
descriptions retain their preapproval source ranges and rationale as review
provenance; their old future tense describes the proposal, not current file state.
The approved implementation uses real files, not staged response transformations.

## Reviewed decision and remaining conditions

Owner approved the following reviewed IDs (2026-10-28):

- **S01, S02, S03:** replace duplicated Opening/Middle/Final shell markup.
- **H01, H02:** externalize homepage CSS and educational/card/disclaimer blocks.
- **P01, P02, P03, P04:** retire exact old print blocks after semantic replacement.
- **R01:** remove only the redundant production classic-core copy, preserving
  pinned replay/source and adjusting its historical current-copy test guard.
- **T01, T03–T07:** remove the specifically enumerated temporary route/entry,
  superseded cutover helpers, one-off extractors/archive/capture tools, stale pilot
  transform and retired production-audit command/blocks, subject to the dependencies
  below. Each bundle lists exact files/blocks; individual MS IDs can be retained.

**T02, T08–T10** are also removal/consolidation candidates, but **deferred pending
assertion ports or deduplication evidence within milestone 8**. They are not a
permanent-retention decision or automatically safe to delete now. Existing valuable
tests must move to real public pages or suitable non-migration fixtures first.
All other entries below are **retain** or **defer**, not deletion-ready. An
approval grants no commit, merge, push, tag, deployment or publication permission.
Materially changed source/replacement/consumer evidence needs renewed approval.

## Implementation outcome ledger (2026-10-28)

| IDs | Actual outcome and evidence |
| --- | --- |
| S01–S03 | Approved/implemented: three public entries retain metadata/vendor links and thin entries, with one empty `.app-shell`, no-JS notice and tokens/reference/print links. All 31 direct-public Chromium home/shell/print checks pass at both mounts, including three fresh journeys/completed-v1 replay. |
| H01–H02 | Approved/implemented: homepage loads external CSS, exact Markdown/catalog copy and preserves footer licenses/fallback links. Direct-public homepage tests compare against sealed original, including error/retry/no-JS. |
| P01–P04 | Approved/implemented: exactly nine reviewed blocks removed. Reinserted excerpts reconstruct each of the four reviewed stylesheet SHA-256 values exactly; no other reviewed CSS bytes were pruned. Semantic renumber/reorder/ordinary/reference print checks pass without staging. |
| R01 | Approved/implemented: production classic core removed; active app core, pinned original reader/allowlist, independent sealed original core and VM/replay tests retained. |
| T01 | Approved/implemented: only preview route/import and `middle-lesson.mjs` removed. Baseline server unit asserts 404 at both mounts and continues serving real/pinned pages. |
| T03 | Approved/implemented: four exact helpers removed; only obsolete intermediate cutover/extraction assertions replaced with current-entry structure/bytes. Original banks, seals, VM and pin assertions remain. |
| T04 | Approved/implemented: three extractors and only `finalReferencePilot()` removed; `referenceInventory()` and all canonical instruction/meaningful variants retained. |
| T05 | Approved/implemented: two old archive tools removed; historical reports/artifacts/provenance unchanged. |
| T06 | Approved/implemented: six enumerated capture/freeze/seal generators removed. No fixture regenerated or resealed; 110-file seal/pinned-original checks pass. |
| T07 | Approved/implemented: obsolete audit CLI/npm command/function and unused imports removed; pinned reader/hash/allowlist retained. No active executable test consumer of any T03–T07 retired symbol/path remains. |
| T02 | Deferred/partial port: `middle-reference.spec.mjs` now targets actual `middle.html`, preserving five groups/18 list items/token-emphasis/failure-retry/print assertions. Question/remount/reordered-checklist port remains pending; all four containers retained. |
| T08 | Deferred/partial port: generic duplicate mount/writer, repeated destroy/remount/old-node, cancellation, registry, independent pending-reference and Markdown-readiness checks added to `app-lifecycle.spec.mjs` using new-module test labels. Existing partial Final suite/data remain until full assertion and content reconciliation. |
| T09–T10 | Deferred: no container/spec deleted or disabled; assertion-level ports/consolidation remain pending. |
| T11 | Approved/implemented after conditional prerequisite satisfied: shell/home/print specs use actual public files; 106 direct-file checks pass. All three exact reviewed helpers removed after unchanged-hash/closed-consumer checks and exclusive final report preservation. No generated historical report/snapshot is removed. |
| B01/V01/D03 | Retained: sealed original/replay artifacts, meaningful Middle/Final variant archives, vendors/notices and genuine palette variants. |
| D01–D02 | Deferred: no selector pruning performed; no blanket dead-CSS claim. |

Only **18 approved tracked whole-file deletions**, the three reviewed T11 helpers
created uncommitted during this milestone, and the exact approved mixed-file blocks
were removed. Current evidence and verification limits:
[`evidence/milestone-8-approved-cleanup.md`](evidence/milestone-8-approved-cleanup.md).
Milestone remains incomplete; no owner browser/print sign-off or commit permission.

**Owner-reported corrective follow-up:** Middle's generic reference branch lost
its styled Print/header composition. Restored only that presentation in the active
`section-renderer.js`/`reference.css`, with public desktop/mobile appearance and
order assertions. See `evidence/milestone-8/middle-print-button-fix.md`. This is the
requested bug fix, not an additional legacy deletion; earlier reviewed hashes are
historical identities, not a claim those replacement files remain unchanged after
this correction. Pending removal groups still require refreshed evidence.

## Shared evidence and retention rules

**Consumers reviewed:** root script/stylesheet tags; static ESM imports in
`assets/js/` and `lessons/`; generated classes/IDs in `section-renderer.js`,
`quick-reference.js`, navigation and components; `tests/fixtures/harness/` HTML/JS;
`tests/helpers/{baseline-source,static-server,opening-cutover,middle-cutover,final-cutover}.mjs`;
unit/browser source/content/policy/replay guards; README, notices and npm tooling.
Searches include `assets/js/lesson-core.js|global.DSL|DSL.createLesson|on(click|change|input)=`
across HTML/JS/MJS/MD/JSON, and targeted class/selector searches. Search results are
interpreted with the actual dependency/renderer graph, not taken as proof alone.

**Behavior evidence:** `tests/browser/{shell,home,new-module,print-isolation}.spec.mjs`.
Shell tests cover root/repository mounts, 7/8/9 counts, zero-write hydration,
desktop collapse, 850px selector, skip/focus, first-page gates, independent reference,
full fresh journeys, completed v1 restore and pinned original-engine replay.
Print tests renumber ordinary views to 7/8/9+, rename/reorder the reference, print
from ordinary and reference screens, assert all ordinary views/fields/controls
hidden and all reference text unchanged. Chromium produces both entry-mode PDFs.
Earlier staging removed **only P01–P04's exact ranges from served test responses**.
Current tests instead load the real public files after those approved removals.

Executed runs, corrections and remaining manual/coverage gaps are recorded in
[`evidence/milestone-8-verification.md`](evidence/milestone-8-verification.md).
This is targeted evidence, **not exhaustive dead-selector coverage** or a whole-site
suite. Responsive/revealed/hidden activity behavior uses real shared controllers
and the complete three-lesson journeys; no claim of all screenshot combinations,
actual 200% zoom, physical devices, screen readers or interactive print previews.
Those limits explain prerequisites for deferred removal; they do not exempt
migration helpers from this milestone's cleanup review.

**Original replay:** fixed full revision
`0b5d2297e7cbc19bd59cde750492dd28e3983ca0`, explicit 15-path allowlist in
`tests/helpers/baseline-source.mjs`, both `/__original/` mounts. The server constructs
its replay map with `original(path)` (pinned `git show`), not current production
files. Independently retained byte-exact source lives in
`tests/fixtures/content/source/`; `tests/fixtures/production.json` and
`tests/fixtures/manifest.json` seal it. Unit tests verify pinned/archived equality
and continue executing the original core. None of these artifacts is proposed
for deletion. Git history is not the only instructional-variant archive.

## Group 1 — runtime replacement/cutover proposals

### S01 — Opening repeated shell — `approved` / implemented

- **Exact scope:** `opening.html:19–31`, from `<div class="shell w-full app-shell">`
  through its closing wrapper immediately before the module tag on line 32.
  Retain body attributes, head, public URL and existing module entry. Replace with
  the small empty `.app-shell` mount and a truthful no-JS notice, not a copied shell.
- **Replacement:** `assets/js/app/lesson-shell.js`, `lesson-app.js` empty-root path;
  manifest title/duration and `shared.css` shell hooks. The old block is active
  today, but becomes redundant only as part of this atomic approved cutover.
- **Consumers:** the Opening entry queries `.app-shell`; navigation/rendering need
  the same IDs/classes. New template preserves them; staged full journey, focus,
  responsive and no-save tests exercise these consumers. Existing extraction/
  cutover static guards must be updated to assert the specifically approved new
  structure, without changing pinned-source assertions.
- **Content audit:** brand, header title, exact `SELF-PACED · 15–20 MINUTES`, progress
  help, selector/status/loading/retry and Previous/Next labels only. No activity,
  question/key/feedback/model/reference body. Title/duration map to
  `content/opening/lesson.json`; help/control labels retained in the shared shell.
  Original whole HTML is independently retained in the sealed source archive.
- **Risk/verification:** shell loading/failure and CSS/vendor order; rerun shell,
  Opening journey/presentation smoke and both-mount print after real cutover.
  Browser verification on the actual new root entry remains pending approval.
- **Approval reference:** owner v2 decision above; implemented (see outcome ledger).

### S02 — Middle repeated shell — `approved` / implemented

- **Exact scope:** `middle.html:4`, body-inner `.app-shell` wrapper from its opening
  through the closing `</div>` immediately before
  `<script type="module" src="assets/js/middle.js">`; **not the entire line/head**.
- **Replacement/consumer plan:** same shell/app as S01; preserve entry root and all
  navigation hooks. `← Back` and `.btn` bottom styling remain Middle-specific
  structural profiles, not silently replaced by Opening labels. Update the bounded
  Middle cutover guard only after approval. Real shared Middle registry is used.
- **Content audit:** brand/title/duration/help/control strings only; title/duration
  → `content/middle/lesson.json` (`SELF-PACED · 20–25 MINUTES`); remaining labels in
  shared shell/navigation. No instructional activity payload. Sealed
  `tests/fixtures/content/source/middle.html` retains source/provenance/CC BY scope.
- **Evidence/risk:** both mounts/full journey/restored v1/focus/mobile/print in
  staged tests; rerun same plus Middle composition smoke after actual cutover.
  No all-view dead-selector claim; external Tailwind/fonts still required.
- **Approval reference:** owner v2 decision above; implemented (see outcome ledger).

### S03 — Final repeated shell — `approved` / implemented

- **Exact scope:** `final.html:4`, body-inner `.app-shell` wrapper up to (excluding)
  `<script type="module" src="assets/js/final.js">`; retain head/body/module.
- **Replacement/consumers:** shared shell/app; existing Final config/adapter/gates.
  Preserve `← Back`, `.btn.outline`, `.btn.primary`, 9 counted pages and exact header
  duration. Migrate only the explicit current-shell guard, not replay expectations.
- **Content audit:** title/duration → `content/final/lesson.json` with exact
  `SELF-PACED · ABOUT 25–30 MINUTES`; help preserves `Quick Reference` capitalization.
  No lesson prose/questions/models/reference body here. Retained whole source:
  `tests/fixtures/content/source/final.html` (mixed MIT/CC BY).
- **Evidence/risk:** same staged matrix, completed v1 and original replay; rerun
  Final shell/journey, reference readiness/loading and semantic print after cutover.
  Actual-page owner browser/print review remains pending.
- **Approval reference:** owner v2 decision above; implemented (see outcome ledger).

### H01 — inline homepage stylesheet — `approved` / implemented

- **Scope:** `index.html:13–37`, the one `<style>` block. Replace its tag with
  `assets/css/home.css` link; leave Google Fonts/preconnect/favicon unchanged.
- **Replacement/consumers:** `home.css` retains original declarations/composition
  plus `[hidden]` behavior for enhanced/fallback UI. Home classes are rendered by
  `home.js`; no second card engine. Tests assert original text/links and 320px fit.
- **Content audit:** no instructional text, CSS generated prose or keys. Exact
  original stylesheet remains inside sealed `content/source/index.html`.
- **Risk/tests:** stylesheet order, no-JS/error fallback and responsive card layout;
  rerun homepage spec/paired layout smoke after actual H01/H02 cutover.
- **Approval reference:** owner v2 decision above; implemented (see outcome ledger).

### H02 — authoritative homepage educational/card/disclaimer blocks — `approved` / implemented

- **Classification:** mixed code/content (also Group 3); not permission to discard
  any wording. **Scope:** `index.html:43–51` inner-main educational content/cards/
  progress notice, plus **only** the final educational-disclaimer sentence on line
  53 after the retained copyright/license-link prefix. Header/skip/main/footer
  landmarks, copyright and license links remain.
- **Replacement:** `content/home.md` five prose blocks, `content/catalog.json`
  three exact records and order, `assets/js/home.js`, `schemas/catalog.schema.json`.
  Test-only `candidateHome()` defines the precise structural hosts/generic fallback.
- **Consumers:** current static homepage is active until this approved cutover;
  existing baseline homepage tests will need to wait for successful enhanced render
  before original-copy comparison. No-JS/error states retain the three unchanged
  root URLs. Catalog runtime is text-safe and cannot import executable modules;
  development validation cross-checks real destinations/config/manifest identities.
- **Content audit/retention:** exact eyebrow, h1, introduction, progress label/body,
  three card titles/descriptions and disclaimer are externally retained; original
  sealed `tests/fixtures/content/source/index.html` provides independent provenance.
  All original words © Rhys Jones / CC BY 4.0, software MIT; no unused variant or
  answer key exists in this block. Footer rights/license wording remains published.
- **Evidence/risk:** home tests compare exact original DOM text/cards/order/links/
  footer, failure/retry, no JS, narrow widths on both mounts. Pending real-page
  integration/owner layout review. No production new card/module is authorized.
- **Approval reference:** owner v2 decision above; implemented (see outcome ledger).

### P01 — shared Opening-numbered print block — `approved` / implemented

- **Scope:** `assets/css/shared.css:22–48`, comment, `@page` and the entire following
  print block, including `#view-7`, `#quick-reference` descendants, reference-content
  grid and utility-class overrides. The exact served-test removal range is encoded
  in `printRemovalRanges['shared.css']`. Do not remove the later shortcut rule.
- **Replacement:** semantic `assets/css/print.css`, loaded last; `reference.css`
  handles bounded profiles. Ordinary/reference views and sheets are explicitly
  marked by the renderer/loader, not inferred from sibling order or numeric ID.
- **Consumers/status:** currently active public CSS and original replay styling;
  only the current copy's block is proposed for replacement. Test decoy and lesson
  styles are not claimed globally unused. Reference/ordinary print tests simulate
  its absence and generate complete content-preserving PDFs.
- **Content audit:** no instructional strings/models/questions/feedback. Grouping
  and colors are presentation; all reference text stays in existing content files.
  Original CSS preserved at `tests/fixtures/content/source/assets/css/shared.css`
  and pinned replay; neither retained artifact is removed.
- **Risk/rechecks:** native print from ordinary page, hidden specificity, grid
  grouping/readability and letter margins; rerun print-isolation plus actual Chrome/
  Firefox/Safari previews after cutover. No one-page content-hiding constraint.
- **Approval reference:** owner v2 decision above; implemented (see outcome ledger).

### P02 — Middle compensating print blocks — `approved` / implemented

- **Scope:** `assets/css/middle.css` exact ranges **9**, **11**, **33–44**,
  **46–60**, **169–174**. Includes `.view#print-view`, `#view-7[hidden]`,
  `#view-8[hidden]`, `.dsl-content > .lesson-view:not(#view-8)` and
  `.dsl-middle #views>.lesson-view:not(#view-8)` compensations/reference formatting.
  **Exclude** every screen rule and the inline print block embedded in line 4.
- **Replacement/consumers:** semantic print/reference CSS; current public copy still
  active until approval. The exact ranges are removed only from staged responses
  for reference-role/renumber/reorder and full journey tests. Middle profile retains
  all five groups, original colors/badges and reading order.
- **Content audit/retention:** no instructional strings; all five reference groups
  remain under `content/middle/reference/`. Entire original CSS stays in sealed
  `tests/fixtures/content/source/assets/css/middle.css` and pinned replay.
- **Risk/tests:** heading resets/list spacing, correct status visibility when
  reference IO fails, no printed knowledge check; repeat semantic print and manual
  preview after real removal. The minified line-4 alias block is deferred, not
  silently deleted by reformatting.
- **Approval reference:** owner v2 decision above; implemented (see outcome ledger).

### P03 — Final numbered/current-view print blocks — `approved` / implemented

- **Scope:** `assets/css/final.css:79–91` and **199–205**, including
  `:not(#view-9)`, `#view-7,#view-8`, hidden-reference rescue and compensating
  `.dsl-final #views > [data-reference-view]` rules. Screen rules **65–78** stay.
- **Replacement/consumers:** semantic print/reference CSS and data hooks. Full
  staged Final journey/reference renumber/print tests run without these ranges.
- **Content audit/retention:** no instructional strings. Five full reference groups
  stay under `content/final/reference/`; original CSS retained in
  `tests/fixtures/content/source/assets/css/final.css` and pinned replay.
- **Risk/tests:** incomplete-reference notice, duplicate heading/control hiding,
  long example text, page breaks; rerun readiness and print checks/manual preview.
- **Approval reference:** owner v2 decision above; implemented (see outcome ledger).

### P04 — Opening migrated numbered print override — `approved` / implemented

- **Scope:** `assets/css/opening.css:185–199`, including `#view-7[hidden]`, eyebrow
  hiding, readiness-status display and compact four-group/list-grid rules.
- **Replacement/consumers:** semantic print/reference CSS with Opening profile;
  staged response strips exactly these lines while testing arbitrary reference ID.
- **Content audit/retention:** no instructional strings; all four groups/badge/
  sequence cells stay in `content/opening/reference/`. Original Opening inline CSS
  is retained in sealed `tests/fixtures/content/source/opening.html`; migrated
  override's reviewed hash/range is recorded separately, not confused with baseline.
- **Risk/tests:** six-/four-cell grouping, eyebrow duplication, hidden status and
  long items; repeat semantic print/owner preview after real removal.
- **Approval reference:** owner v2 decision above; implemented (see outcome ledger).

## Group 2 — baseline/replay dependencies

### R01 — production classic global core copy only — `approved` / implemented

- **Scope:** entire **`assets/js/lesson-core.js:1–73`**, exposing
  `window.DSL.createLesson` and original index-based storage/navigation.
  **Not** `assets/js/app/lesson-core.js`, the active shared navigation module.
- **Replacement:** current production uses app navigation/store/legacy adapters
  through thin ESM entries; no root script tag or accidental inline handler loads
  this global. Shared shell/journeys/one-writer tests exercise all three entries.
- **Consumer distinction:** unit baseline's historical *current-production-copy*
  byte guard and source-map construction still read this file. On approved removal,
  explicitly change only that boundary to use pinned `original(path)` for this
  retired path; do not add a silent missing-file fallback or remove replay tests.
  `baseline-source.mjs` allowlist and original VM tests still require the **pinned**
  source; replay server reads pinned Git, independently hash-checked against the
  retained sealed file. All other current-source guards remain meaningful.
- **Content audit:** generic progress/lock/status/collapse/Next control copy only,
  retained by active app navigation/shell. No lesson prose, question, feedback bank,
  model, builder template or meaningful instructional variant. The exact old UI
  copy/implementation remains sealed; see content-inventory runtime-copy row.
- **Retention/replay plan:** retain
  `tests/fixtures/content/source/assets/js/lesson-core.js`,
  `tests/fixtures/production.json`, `tests/fixtures/manifest.json`, original
  `opening.html`, `middle.html`, `final.html` and original Middle/Final scripts under
  that same source tree. Preserve pinned revision/15-path replay allowlist and VM/
  browser replay tests, including both original mounts.
- **Risk/tests:** accidental test dependence on production copy; after approval,
  rerun baseline seal/server/VM, completion parity, adapters and three lesson replay
  tests. Deleting the sealed dependency or removing rollback tests is **not** within
  this ID. Pending guard adaptation is explicit, not a claim it is already absent.
- **Approval reference:** owner v2 decision above; implemented (see outcome ledger).

### B01 — sealed source/maps/fixtures and replay helpers — `retain`

- **Scope:** exact `tests/fixtures/content/source/{index,opening,middle,final}.html`,
  `tests/fixtures/content/source/assets/js/{lesson-core,middle,final}.js`, original
  CSS under that source tree; `tests/fixtures/{production,manifest}.json`; pinned
  read/hash/allowlist interfaces in `tests/helpers/baseline-source.mjs` and general
  serving/replay machinery in `tests/helpers/static-server.mjs`. **Exclude** the
  temporary route/import (T01), current-checkout audit function/imports (T07), and
  cutover/extraction helpers (T03). The source manifest enumerates retained seals.
- **Consumers:** baseline seals/VM/bank/provenance/server and browser replay,
  extraction/cutover guards, all baseline comparison helpers. Original inline
  handlers/globals are intentional replay data, not accidental production consumers.
- **Classification/content:** required baseline/replay + mixed instructional source.
  Original prose/keys/feedback/models/templates and unused variants are CC BY with
  code MIT. Retain full provenance, licenses, maps and captures; source edits/reseals
  are forbidden. Current tests verify original source and policy after shared changes.
- **Risk/tests:** removing the sealed artifacts or pinned replay machinery breaks
  audit/rollback. Retiring temporary generators/transforms does not, provided useful
  assertions are preserved. Continue running relevant seal/replay checks.
- **Approval:** retain; not awaiting deletion approval.

## Group 3 — instructional variants / mixed containers

### V01 — meaningful nonpublished variants — `retain`

- **Scope:** `content/middle/legacy-variants.json` (four exact `strategies` records
  and distinct `referenceText` variant), `content/final/legacy-variants.json`
  (`unused-reference-copy-prefix`). **These two meaningful content archives stay.**
  Unsealed executable harnesses/copied data formerly bundled here are now T01/T02/
  T08/T09 removal candidates, with their own content-retention prerequisites.
- **Consumers:** Middle/Final exact archive preservation units and variant schema/
  development validation. The whole-Middle preview entry has only its own temporary
  server route as a live consumer; that closed dependency chain justifies retiring
  both, not keeping the preview permanently.
- **Content audit:** full variant wording/provenance is retained with source
  revision/path/symbol/index and CC BY attribution. Fixtures include actual excerpts
  and meaningful metadata; their software remains MIT. H02 separately preserves
  all homepage material before proposing removal of its old mixed container.
- **Risk/verification:** no variant publication, merger by similarity or deletion.
  Migration units validate exact archived values and content graph. Broader fixture
  deletion would need a new itemized proposal and independent coverage audit.
- **Approval:** retain; no user content-disposition decision requested.

## Group 4 — still active or insufficiently proven

### D01 — legacy expandable/choice cue rules — `defer`

- **Scope:** `assets/css/shared.css:54–120`: `.choice/.option.selected-answer`,
  `.selected-correct/.selected-incorrect`, focus rules and
  `.dsl-content details.dsl-expandable` summary/inner/example/visited/responsive rules.
- **Consumers:** `tests/fixtures/harness/components.html:37` deliberately renders
  `.flip.choice` and `details.dsl-expandable` legacy decoys. Component isolation
  regressions test the coexistence boundary. New components have separate
  `.dsl-*` classes in `components.css`; existence of replacement is not absence
  of the original fixture consumer. That deliberately constructed decoy is itself
  a T09 cleanup candidate: it cannot justify permanent production CSS.
- **Content audit:** generated `✓ Explored` cue is meaningful UI retained here and
  in modern component markup; no other instructional wording. Original source is
  sealed/pinned. Modern components retain their own cues. Before removing these
  selectors, port any still-needed isolation test to the intended final cascade.
- **Risk/tests:** dropping it could invalidate legacy-style isolation checks.
  A legacy decoy is not proof that every selected/expanded selector is live; those
  individual unexercised states are retained rather than declared obsolete.
  Complete that fixture/cascade audit within milestone 8; no all-state coverage or
  completed assertion port is claimed yet.
- **Approval:** defer; no deletion approved.

### D02 — old layout/navigation aliases in lesson CSS — `defer`

- **Scope:** Final `final.css:10–28,43–45,59–61,65–78`: `.masthead`,
  `.masthead-inner`, `.series`, `.header-sub`, `.duration`, `.layout`, `.sidebar`,
  `.side-card`, `.collapse`, `.side-progress`, `.progress-title`, `.progress-count`,
  `.track`, `.fill`, `.side-help`, `.nav-link`/`.reference-link`/`.collapsed`, `.work`,
  `.content`, `.nav-bottom`, `.footer-btn`, `.page-number`, `.page`, `.reference-view`,
  `.hidden`, `.mobile-tools`, `.small`, numbered reference screen selectors and
  their listed media variants. Middle `middle.css:4` mixed `.layout`/`.content`/
  `.view`/rail/progress/mobile/print rules and `:root`/component rules share one
  minified line. Opening `opening.css:1–57` extracted style block and reference
  presentation `144–184` are also retained (the latter includes unrelated live
  task/timeline responsive branches).
- **Consumers/classification:** some aliases are not used by current generated
  markup; others (topbar/rail/view/card/reference/typography) remain active, including
  generated/revealed states. Tests/harnesses and old replay intentionally preserve
  old classes. No full selector coverage across every viewport/view/reveal/print
  state was collected. These mixed portions are **not certified dead code**.
- **Content audit:** CSS includes explored cues and presentation of instructional
  groupings; do not remove whole mixed lines/files. Original whole source is
  retained/sealed; genuine lesson presentation variants remain shipped.
- **Retention/risk:** retain all listed portions for now, including Middle's inline
  line-4 print block. Semantic tests show it does not block the replacement; it is
  not an unresolved functionality blocker. This remains a milestone-8 cleanup
  candidate: exact selector ranges/coverage and approval are needed, not an exemption
  because migration harnesses or old screenshot probes still use a selector.
- **Approval:** defer; excluded from this removal request.

### D03 — palette aliases, vendors, temporary-file status — `retain`

- **Scope:** `shared.css:2` `:root --dsl-*`; lesson `:root` aliases in
  `opening.css:2`, `middle.css:2`, `final.css:2`; `tokens.css`; external Tailwind
  3.4.17/Google Fonts; local vendor files/licenses/maps.
- **Consumers:** active lesson CSS uses intentionally different `--ink/--navy`,
  muted/border/accent values; tokens are additive pending root link cutover.
  Existing declarations stay to avoid implying every lesson variant is redundant.
  Vendor modules import through the safe Markdown wrapper. Tailwind/fonts remain
  required external presentation dependencies; no offline claim/removal proposal.
- **Content audit:** palette/type/spacing declarations have no instructional prose;
  retain third-party notices/licenses. No license-boundary change.
- **Pilot audit:** `assets/js/final-reference.js` and the Final harness entry/route
  were removed in approved earlier-milestone cutovers and are already absent at
  starting HEAD; no new deletion to approve. Remaining Middle preview is T01,
  isolated migration fixtures T02/T08/T09. All migration support is reviewed file by
  file below; no blanket retention of unlisted migration helpers applies.
- **Risk/tests/approval:** retain; no production variable pruning or vendor changes.

## Expanded migration-support review — T01–T11

Every group below is a candidate assessment, including retained assertions and
deferred containers. No migration-related file was excluded because it already
had tests. Exact per-file MS IDs, SHA-256 values and reference excerpts are in the
v2 JSON/index. A bundle approval covers only its enumerated scope, not entire mixed
files that happen to be referenced by it. T01/T03–T07 have the explicit owner decision
above; T11's unchanged reviewed scope now meets its conditional prerequisites;
T02/T08–T10 remain deferred. Deferred ports remain work in milestone 8, not an automatic later
milestone or permanent fixture-retention policy.

### T01 — whole-Middle preview route and entry — `approved` / implemented

- **Scope:** `tests/helpers/static-server.mjs:6` import of `middleCutover` and
  **27–32** comment/`if (!isReplay && path === '/middle-harness.html')` block;
  entire `tests/fixtures/harness/middle-lesson.mjs:1–12`. There is no physical
  root `middle-harness.html` file to delete: this is a virtual route on both mounts.
- **Classification/replacement:** obsolete pre-cutover runtime. Real `middle.html`
  already uses the same app/adapter/policies/registry through `assets/js/middle.js`.
  No new production implementation is needed.
- **Consumers/evidence:** the route is the only live caller of the preview entry;
  no browser spec navigates to it or uses `window.middleLesson`. The fixture README
  explicitly says whole-lesson regressions now target `middle.html`. Source graph,
  entry imports and actual public lesson tests corroborate the search results.
  The `middleCutover(..., true)` preview arm disappears with T03; if T03 is not
  approved, its unused arm is retained rather than silently extending T01.
- **Content/retention:** no instructional prose/questions/keys/models in the route
  or entry; the generated preview uses already-retained pinned HTML and published
  content. No unique content archive is needed. All source/captures/provenance stay.
- **Verification/risk:** v1 recorded all-project real Middle journeys/replay and
  responsive/reference checks. After removal verify the preview returns 404 on both
  mounts, the real page/fixtures/replay still serve, and run affected server/Middle
  smoke tests. **Outcome:** approved route/entry removed; both-mount 404/current/
  pinned server guards pass. See implementation ledger/evidence above.
- **Approval reference:** owner v2 decision above; implemented (see outcome ledger).

### T02 — partial Middle question/reference review harnesses — `defer`

- **Exact candidate containers:**
  `tests/fixtures/harness/middle-questions.html`,
  `tests/fixtures/harness/middle-questions.mjs`,
  `tests/fixtures/harness/middle-reference.html`,
  `tests/fixtures/harness/middle-reference.mjs`.
  Review/retarget the harness-dependent plumbing in
  `tests/browser/middle-migration.spec.mjs` and
  `tests/browser/middle-reference.spec.mjs`; do not discard their assertions.
- **Classification/replacement:** active temporary test consumers, intended for
  retirement. Use actual `middle.html` for lesson/question/reference behavior;
  genuine generic remount/component checks should use a suitable shared fixture,
  not perpetuate a partial fake Middle application.
- **Consumers:** the two specs explicitly navigate to these fixture HTML pages.
  `middle-migration.spec.mjs` reads `window.middleQuestions` and counts events,
  reverses hosts/checklists and exercises every alternative, cursor, earned credit
  and extended-v1 replay. The reference spec independently compares five groups,
  **18 list items**, emphasis/token order, root/prefix requests, failure/retry,
  silent loading and ordinary/reference print states.
- **Content/retention:** harnesses fetch production activity/reference documents;
  they do not own a unique question/reference bank. Keep published Middle content,
  sealed original source/maps/progress, and V01's actual unused variants.
  Keep `tests/helpers/middle-reference.mjs`'s independent semantic inventory when
  retargeting the assertions; it is not an executable lesson placeholder.
- **Prerequisite/risk/tests:** exact list/emphasis and reordered-checklist/remount
  assertions are not all demonstrably replaced by the new smoke journeys. Port or
  prove equivalence before retiring containers, then run only affected Middle,
  reference, shared lifecycle and rollback checks on both mounts. The reference
  portion now targets the public entry; the question/checklist/remount portion
  remains unported. This is a removal dependency, not permanent retention.
- **Approval reference:** none; revised deletion scope/evidence required after port.

### T03 — superseded shell-cutover/extraction transforms — `approved` / implemented

- **Exact whole files:** `tests/helpers/opening-cutover.mjs`,
  `tests/helpers/middle-cutover.mjs`, `tests/helpers/final-cutover.mjs`,
  `tests/helpers/opening-extraction.mjs`.
- **Mixed-file consumer adjustment only:** imports/calls to `openingExtraction`,
  `openingCutover`, `middleCutover`, `finalCutover` and their `extracted.css/js`
  payload expectations in `tests/unit/baseline.test.mjs`; the final current-shell
  equality in `tests/unit/opening-migration.test.mjs` beginning
  `assert.equal(read('opening.html'), openingCutover(...))` and its helper import.
  Replace superseded mechanical-format oracles, **not whole unit files** or their
  exact banks/keys/policies/fixture seals/original VM assertions.
- **Classification/replacement:** these encode intermediate milestone-2/5/6/7
  source transformations, not original-engine execution dependencies. Approve with
  S01–S03/T01's final cutovers; final shell structural/dependency/one-writer tests
  replace the old intermediate-HTML equality. Server byte checks should compare
  current files to current served bytes, with content preserved independently.
- **Consumer/content evidence:** current unit callers and the temporary server
  route are explicit in the audit. `openingExtraction` supplies original inline JS
  to the bank assertion; retain that assertion using pinned inline source, which
  `extractBanks` already supports. These helpers contain structural strings/UI,
  not unique instruction; original whole source remains sealed and replayable.
- **Retention/risk/tests:** retain `baseline-source.mjs`'s pin/allowlist/original
  reader, source banks/maps/manifests and sealed fixtures. Pending guard rewrite is
  explicit. Check baseline seals/server, exact Opening content/gates, final shell
  dependency hooks and replay after approved removal. Approval of T03 alone does
  not authorize breaking pre-cutover guards before S01–S03 are integrated.
- **Approval reference:** owner v2 decision above; implemented (see outcome ledger).

### T04 — one-off content extractors and stale Final pilot transform — `approved` / implemented

- **Scope:** entire `tests/helpers/extract-opening.mjs`,
  `tests/helpers/extract-middle.mjs`, `tests/helpers/extract-final.mjs`; **only
  lines 1–7** of `tests/helpers/final-reference.mjs` (comment and
  `finalReferencePilot(source)`). Retain the independent `referenceInventory(root)`
  function at lines 9–23 and its imports in ongoing reference tests.
- **Classification/replacement:** obsolete migration generators/pilot. Published
  content is already extracted/reviewed; authoring edits validated canonical files,
  not a historical extractor. The Final pilot function even inserts a script URL
  for the already-removed `assets/js/final-reference.js`.
- **Consumers/evidence:** extractor calls are their own explicit CLI branches only;
  normal npm validation/tests do not import or run them. The pilot transform has
  no remaining caller; reference tests import only `referenceInventory`. Audit also
  checks actual thin entry/config/manifest graph, not just symbol search.
- **Content audit/retention:** extractors combine pinned source, banks/maps, writing
  formatter templates and profile/UI strings. Their meaningful instructional
  output remains canonical in `content/opening`, `content/middle`, `content/final`;
  full source and unused variants remain in sealed source/V01 archives, with exact
  Final/Opening maps `evidence/milestone-6-source-map.json` and
  `evidence/milestone-7-source-map.json` and the Middle source→destination table in
  `content-inventory.md` under "Milestone 5 remaining extraction and whole-page
  cutover". No unique extracted output
  may disappear merely because its generator is retired. Pilot strings are loading/
  retry UI only, already in the current reference loader; no coaching variant.
- **Risk/tests:** retain writing-data dependencies until T09's consumers are ported;
  T04 grants no deletion of that shared mixed file. After removal check imports,
  exact content/gates/variants/formatter/reference tests and validation, not another
  one-off extraction or reseal. No runtime or rollback engine requires these tools.
- **Approval reference:** owner v2 decision above; implemented (see outcome ledger).

### T05 — milestone-specific screenshot/report archive tools — `approved` / implemented

- **Scope:** entire `tests/helpers/archive-final-evidence.mjs` and
  `tests/helpers/archive-opening-evidence.mjs`.
- **Classification/replacement/consumers:** completed-review CLI tools selecting
  named milestone-6/7 test titles and output directories. No normal suite imports
  them; no production code calls them. Current milestone-8 evidence already uses
  its own checkpoint tool, also separately a T11 retirement candidate.
- **Content/retention:** no instructional prose/answer/model bank; filenames/test
  title matching only. **Retain all already-created evidence**, including failed
  attempts, source comparisons, report/artifact hashes and actual captured content.
  No evidence-directory deletion or rewriting is proposed.
- **Risk/tests:** historical commands remain historical provenance, not live
  authoring instructions. Static consumer audit suffices before approval; after
  deletion verify no active command/import references. No browser rerun needed for
  removing unimported archive scripts alone.
- **Approval reference:** owner v2 decision above; implemented (see outcome ledger).

### T06 — one-time baseline capture/freeze/seal generators — `approved` / implemented

- **Exact whole files:** `tests/helpers/capture-browser.mjs`,
  `tests/helpers/capture-supplement.mjs`, `tests/helpers/capture-generated.mjs`,
  `tests/helpers/freeze-source.mjs`, `tests/helpers/freeze-edge-fixtures.mjs`,
  `tests/helpers/seal-fixtures.mjs`.
- **Classification/consumers:** one-time migration setup, not replay. The capture/
  freeze scripts import each other; this is a closed creation-tool chain, not an
  ongoing regression requirement. Normal tests read resulting sealed files and
  execute pinned source. No npm test/validation script invokes these generators.
- **Content/retention:** generated source, bank, source-index, progress, visual/PDF
  and provenance records remain explicitly sealed/retained under `tests/fixtures/`.
  Generators reference original instruction or synthetic test data; their output
  and source provenance stay independently available. Do not regenerate/reseal
  immutable fixtures as part of this deletion; retain licenses and historical
  capture-method records. No instructional variant is retained solely by a generator.
- **Replacement/risk/tests:** no replacement generator needed for a completed
  baseline. Keep fixture readers, original engine, hashes/seal assertions and
  `content-baseline.mjs`. Verify unchanged 110-file seal, pinned source/server/VM and
  progress provenance after removal. A partially retained capture tool may still
  need `freeze`; approval must respect actual remaining imports, not analogies.
- **Approval reference:** owner v2 decision above; implemented (see outcome ledger).

### T07 — obsolete current-checkout-vs-original audit command — `approved` / implemented

- **Scope:** entire `tests/helpers/audit-production.mjs`; `package.json:12` only
  the `"audit:production"` npm script; `tests/helpers/baseline-source.mjs:21–27`
  `auditProduction()` plus its now-unused `readFileSync`/`resolve` imports on
  **3 and 5**, **only after T06's remaining caller is retired**.
- **Classification/consumers:** historical baseline-creation guard compares every
  current production file to the initial revision. It cannot be a valid ongoing
  post-refactor production check. Its callers are the old CLI and `freeze-source`;
  source inspection identifies the whole dependency chain. It is not the original
  source reader or rollback engine.
- **Replacement/content/retention:** normal validation/exact content/policy/legacy
  tests and the immutable seal supply the ongoing acceptance checks. No coaching
  copy in these blocks. Preserve `root`, `revision`, `productionPaths`, `sha256`,
  `original()` and all pin/allowlist/fixture checks in `baseline-source.mjs`.
  No change to the stable npm validate/unit/browser interfaces.
- **Risk/tests:** mixed helper is essential; deleting its whole file is forbidden.
  Update only active maintenance references, preserve historical records, and run
  baseline/server/seal/unit callers after the bounded change. Keep the function
  if a partially approved T06 leaves a required caller.
- **Approval reference:** owner v2 decision above; implemented (see outcome ledger).

### T08 — partial Final/bootstrap migration site and copied content — `defer`

- **Exact containers:** `tests/fixtures/harness/lesson.html`, `lesson.mjs`,
  `lesson.css`, `lesson-invalid.mjs`; `tests/fixtures/harness/lessons/final/config.json`;
  `tests/fixtures/harness/content/final/lesson.json`; its six activity files
  `activities/welcome-cards.json`, `summary-synthesis-questions.json`,
  `connect-viewpoints-panels.json`, `connect-viewpoints-questions.json`,
  `synthesis-writing.json`, `synthesis-checklist.json`; and six reference copies
  `reference/reference.json`, `summary-synthesis.md`, `synthesis-framework.md`,
  `effective-summaries.md`, `consensus-task.md`, `after-round.md` in that fixture site.
  Full exact paths/MS IDs are enumerated in the v2 index; no directory-wide deletion.
- **Mixed consumers to port, not delete wholesale:**
  `tests/browser/lesson-harness.spec.mjs`,
  `tests/unit/lesson-validation.test.mjs`, and only the isolated-harness graph call
  in `scripts/validate-content.mjs`'s CLI. `lesson-invalid.mjs` provides shared
  invalid cases to both test layers and should move to appropriate generic schema
  fixtures if those cases remain necessary.
- **Classification/replacement:** temporary partial Final app with test-only gates
  and copied content, not the public lesson and not original-engine replay. Real
  `final.html` and test-only new-module configurations now exist. Retarget public
  content/legacy checks to the actual page, and generic app lifecycle/schema cases
  to a small dedicated non-migration fixture without copying lesson implementation.
- **Consumer evidence:** the harness spec explicitly tests duplicate writer/mount,
  repeated destroy/remount/old-node inertness, late fetch cancellation, every
  invalid boundary, registry failure, no reads before metadata validation, pending
  activity versus independent reference, and readiness-guarded completion after
  Markdown retry. Units use the fixture site for graph/symlink/depth/invalid cases.
  Not all are replaced by the new-module/shell smoke tests: dropping them now would
  lose meaningful safeguards.
- **Content/retention audit:** all **six reference copies are byte-identical** to
  `content/final/reference/` (exact hashes/comparisons in v2 JSON). Activity copies
  use original banks/maps/field/model/criteria excerpts already retained in canonical
  Final content and sealed original source. The partial manifest contains test
  labels/gates, not a separate coaching module. Complete per-activity string/key/
  model/template equivalence before deleting these mixed containers; do not infer
  it merely from similar wording. **Implementation follow-up:** structured subset
  audit passed all 164 scalar values across all six activity copies, including
  source-backed card/panel text, models, feedback, labels/templates and answer keys.
  Markdown token text comparison normalizes whitespace only; the one-item
  multiple-choice → question-sequence wrapper difference is explicit. Canonical
  additions are not removed. This content evidence does not substitute for pending
  assertion ports or authorize container deletion. Preserve V01 and original-source/license records.
- **Risk/tests/state:** port unique assertions, compare their outcome set, update
  graph-validation consumer and verify canonical coverage, then propose the exact
  deletion set with fresh evidence. Existing test dependency blocks immediate
  deletion, not eventual retirement. Five generic lifecycle/readiness contracts
  now have new-module destinations; remaining schema/content/legacy assertions
  still consume this partial Final site. No container removal is claimed.
- **Approval reference:** none; not deletion-ready.

### T09 — component/navigation/storage/writing migration sandboxes — `defer`

- **Exact containers:** under `tests/fixtures/harness/`, `components.html`,
  `components.mjs`, `component-data.mjs`, `navigation.html`, `navigation.mjs`,
  `storage.html`, `storage.mjs`, `writing-reference.html`, `writing-reference.mjs`,
  `writing-reference.css`, `writing-data.mjs`, and the mixed current `README.md`.
- **Consumers to consolidate/retarget:** browser `components.spec.mjs`,
  `navigation.spec.mjs`, `storage-boundaries.spec.mjs`, `writing-reference.spec.mjs`;
  affected fixture imports/excerpt assertions in unit `components.test.mjs`,
  `completion.test.mjs`, `formatters.test.mjs`, `lesson-validation.test.mjs`.
  T04 extractors also use `writingActivities`; retire those consumers together.
- **Classification/replacement:** all are reviewed migration-support candidates,
  not permanently exempt because tests use them. Separate permanent component/
  store/navigation/clipboard contracts from old lesson-extraction plumbing. Use
  public pages for real lesson behavior and small noninstructional generic fixtures
  where direct lifecycle control is genuinely necessary; no duplicate app/controller.
- **Unique assertions/risk:** same-question DOM/live-region/focus stability;
  destroyed old nodes and late clipboard denial; real storage read-once/blocked
  writes; sparse completion; explicit-element navigation through reordered DOM;
  tab-index restoration; legacy-index decoys; every writing mode/model/gate; reduced
  motion, both card faces and enlargement. These need an assertion-by-assertion
  destination, not a blanket deletion of tests or a permanent sandbox justification.
- **Content audit/retention:** component/writing helpers construct original excerpts
  from sealed source/banks/maps and literal builder templates; navigation HTML has
  15 identified Opening excerpts. These words remain in canonical lessons and sealed
  source/banks/source-index; preserve precise model/feedback/template variants when
  rehoming. Test labels/UI and test gates need not become published instruction.
  Keep relevant attribution/provenance with surviving mixed fixtures. Exact excerpt
  and formatter tests must survive without their temporary containers.
- **Verification/state:** fixture/probe dependencies (including D01 CSS decoys) are
  mapped, but no replacement assertion matrix was implemented in this audit-only
  follow-up. Complete it within milestone 8, run only affected shared/public tests,
  then obtain approval for the precise final removals. No container removed yet.
- **Approval reference:** none; deferred for ports, not permanently retained.

### T10 — migration presentation/capture test suites — `defer`

- **Exact candidate files:** `tests/browser/flashcard-presentation.spec.mjs`,
  `evidence-presentation.spec.mjs`, `structure-presentation.spec.mjs`,
  `middle-presentation.spec.mjs`, `middle-activities-presentation.spec.mjs`,
  `final-presentation.spec.mjs`, `final-heading-cues.spec.mjs`,
  `opening-presentation.spec.mjs`, `opening-essentials-spacing.spec.mjs`.
- **Classification/consumers:** pre/post migration comparison and owner-correction
  reviews run automatically via Playwright discovery, even though most now load
  the actual public pages. They contain real font/palette/grouping/overflow/state
  assertions as well as migration-specific capture loops. For example Final's
  section × mount × width loops run against a pinned original second page.
- **Replacement plan:** review assertion overlap with permanent public lesson/
  component/semantic-print checks; consolidate unique readable/responsive/accessible
  paint assertions, and retire superseded migration-only capture/oracle plumbing
  once the lighter set is proven. This can reduce routine suite cost, but no
  timing benefit or safe assertion deletion is claimed without measurements.
- **Content/retention:** tests reference existing instruction and expected UI
  cues/profiles, not unique coaching material. Keep the original comparison images,
  PDFs, content/policy baselines and review/approval records unchanged. Preserve
  owner-approved larger heading and explored-front cues, original lesson grouping,
  mobile/enlarged-text/reveal states; do not remove content/gate checks to improve
  performance or retain pixel-tight migration geometry as a new product contract.
- **Verification/state:** file-by-file assessment complete, assertion-level
  consolidation/replacement evidence still pending within milestone 8. No test
  file removed or disabled. Rerun only affected final checks after any approved port.
- **Approval reference:** none; deferred pending concrete deduplication evidence.

### T11 — this milestone's own staging/review helpers — `approved` / prerequisite satisfied

- **Exact temporary helper candidates:** `tests/helpers/milestone-8-candidates.mjs`,
  `archive-milestone-8.mjs`, `review-milestone-8.mjs`.
- **Mixed consumers:** only `stageLesson`/`stageHome` imports/calls in browser
  `shell.spec.mjs`, `home.spec.mjs`, `print-isolation.spec.mjs`; preserve those files'
  useful public shell/home/semantic-print assertions, including renumbering/reorder.
- **Classification/replacement:** current approval-checkpoint response transforms
  and exclusive evidence/snapshot tools are also temporary. After actual approved
  root/CSS integration, target the real files and remove intermediate response
  transformations; retirement of old scaffolding must not create permanent new
  scaffolding. Do not delete them before replacing their current consumers.
- **Content/retention:** small structural UI/fallback labels only; canonical home/
  lesson material and original fixtures remain. Keep all already-created hashes,
  candidate source snapshots, reports and PDFs, including v1 and v2 decisions.
  `tests/fixtures/new-module/` is separately the explicit ongoing authoring/
  extensibility contract, not a preview of migrated Opening/Middle/Final.
- **Risk/tests/state:** final tests must prove production files—not intercepted
  proposed responses—work after removal. Direct-file retargeting is complete and
  106 public-entry checks pass across the four projects; the final port/baseline
  selection also passes 72/72 (18/project, both mounts). All reports/artifacts are
  exclusively archived before removing the last helper; generated history retained.
- **Approval reference:** owner's v2 plan approval above, conditional on public
  cutover and assertion retargeting. Both conditions are now verified with the
  unchanged exact three reviewed helper scopes/hashes; no scope expansion. The
  archive helper was retired only after the last report was preserved in
  `evidence/milestone-8/final-ported-contracts/results.json`.

## What the audit recommends retaining—and why

The remaining MS records are assessed, not grandfathered by their filenames:

- Exact-content/answer/order/formatter/completion/codec/security regression
  assertions and public lesson journeys have continuing product obligations.
  `tests/unit/{opening,middle,final}-migration.test.mjs` largely encode those
  obligations, not disposable preview apps. Keep the assertions, replacing their
  T03-only legacy format guard. `tests/browser/opening-extraction.spec.mjs` already
  targets actual `opening.html` and tests exact passages/fields/models/one writer/
  v1 restore; its historical name is not a reason to delete those checks. It may
  be renamed/consolidated when doing the explicit assertion port, without losing
  coverage. This is an assessment result, not permanent protection for every line.
- `tests/helpers/{legacy-journeys,middle-journey,final-journey}.mjs` drive ongoing
  fresh public/replay journeys. `content-baseline.mjs`, the pinned-source portion
  of `baseline-source.mjs`, the general server, semantic `middleReferenceInventory`
  and retained `referenceInventory` are readers/oracles, not partial lesson engines.
  Consolidation remains possible with equivalent independent checks, but deleting
  them just to eliminate the word "migration" would break required preservation.
- Sealed originals/maps/progress/content/visual artifacts, V01's meaningful variants
  and historical evidence/handoffs must remain. The audit enumerates them rather
  than confusing them with the temporary code that originally generated them.
- Active lesson content/config/policies/adapters/shared runtime are the delivered
  implementation, not migration placeholders. New-module fixtures demonstrate the
  requested ongoing extension contract without publishing a new lesson.

## Resume rules

Read the latest handoff and explicit user decision. Verify the v1 S/H/P/R source
and replacement hashes and v2 expanded candidate hashes still match. Apply only
approved IDs, keep retained/deferred
items, rerun their scoped regressions and update this inventory's actual outcomes.
If a source/profile/consumer changed materially, stop for revised approval for the
affected item. After actual cutover, user browser verification and scoped final
checks remain necessary. Full long-running suite runs were explicitly excluded by
the user's current instruction; record that deviation rather than claim completion
of the specification's full-suite matrix. No commit before separate authorization
after browser verification, and no release authorization is implied.
