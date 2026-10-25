# Milestone 1 — Freeze content, behavior, and legacy progress

## Assignment and prerequisites

Implement only milestone 1. Read `AGENTS.md` and `.opencode/specs/refactor-contracts.md` in full. No earlier implementation is required. The starting production source is revision `0b5d229`; confirm the actual checkout and any user changes before proceeding.

Before generating preservation fixtures, verify the pinned baseline revision, record its full commit hash, and compare its production-file hashes with the intended starting version. If the revision is missing or differs unexpectedly, stop and request a baseline decision. Never substitute the current working tree silently.

**Outcome:** a repeatable preservation baseline and test harness, with no changes to shipped HTML/CSS/JS, licenses, `.nojekyll`, or deployment. This milestone does not fix existing defects, extract content into production files, or create application components.

## Read first

- All four root HTML pages and all files under `assets/css/` and `assets/js/`.
- `README.md`, `LICENSE`, `CONTENT_LICENSE.md`.
- The gate functions in Opening's inline script, Middle's `updateCompletion`, Final's `complete`/`refresh`, and `DSL.createLesson`.

## Files to create

```text
package.json                         private, development-only tooling
package-lock.json
.gitignore                           only narrow tooling/artifact ignores
playwright.config.mjs
tests/helpers/static-server.mjs      root and repository-prefix mounts
tests/helpers/legacy-journeys.mjs     semantic interaction helpers
tests/browser/baseline.spec.mjs
tests/browser/persistence.spec.mjs
tests/browser/print.spec.mjs
tests/unit/baseline.test.mjs
tests/fixtures/progress/{opening,middle,final}/…
tests/fixtures/legacy-maps/{opening,middle,final}.json
tests/fixtures/content/…
tests/fixtures/visual/…              representative approved captures
.opencode/docs/content-inventory.md
.opencode/docs/progress-compatibility.md
.opencode/docs/regression-checklist.md
.opencode/docs/known-issues.md
.opencode/docs/refactor-status.md
```

Paths can be subdivided for readability; retain their responsibilities. Do not add a CI deployment workflow. A Node test server is development-only, not a production backend. Do not write a generic testing framework. Use Playwright plus Node's built-in test runner; avoid additional dependencies unless a specific need is demonstrated.

## Implementation sequence

1. Record the starting revision and production-file hashes. Keep synthetic data only. Establish scripts `test:unit` and `test:browser`; document Node/browser installation requirements in the regression checklist without modifying the existing production README in this milestone.
2. Serve the same checkout at `/` and `/discussion-skills-lab/`, including correct MIME types and no redirects that conceal bad relative paths. Reject directory traversal in the test server. Test server must bind locally, start/stop reliably, and not create duplicate copies of the site. Also provide an isolated **original-engine replay** mount for later compatibility tests: serve an allowlisted set of baseline production files read from the pinned Git revision (for example, through argument-safe `git show <revision>:<path>`), never a moving branch. Record the full revision/hash and path allowlist. Do not fetch history, checkout/reset files, execute user-supplied Git arguments, or use a live published site. If pinned Git objects are unavailable, report the blocker; an explicitly versioned source fixture archive with provenance is an acceptable alternative. This replay mount must continue serving original relative assets after production scripts are replaced in milestones 5–8.
3. Inventory content by stable source identity: file, selector or JS variable/item index, content type, exact text/value, answer associations, meaningful markup, visible/unused status, intended future destination. Cover hidden/model/alternative feedback and builder templates, not only initially visible text. Retain source attribution/license metadata.
4. Assign stable activity/question/option/card/panel/field/check IDs in the legacy-map JSON files. Use the contractual section IDs. Freeze old index/key → new ID maps before later markup changes. IDs are authored identifiers, not generated from a mutable prompt or current DOM order.
5. Capture actual initialized DOM ordering, including generated controls. Exercise real UI to capture representative progress records; supplement with explicitly labeled synthetic malformed/edge fixtures. Do not manufacture a completed record and call it UI-observed.
6. Automate known working behavior and annotate known defects below. Capture representative desktop/mobile views and print PDFs; if browser installation or external fonts/CDN are blocked, report the blocker and incomplete evidence rather than substituting mocks as a visual baseline.
7. Write a manual browser/print/accessibility checklist and handoff with the exact commands and evidence paths. Store small canonical baselines; ignore ordinary generated test reports, traces, and temporary PDFs. Do not commit a huge browser profile or node_modules.

## Required legacy maps

### Common

Three exact storage keys and 7/8/9 counted pages are in the contracts. Capture non-contiguous completion as a synthetic fixture to prove completed pages remain accessible. Preserve section numbers in addition to stable IDs. Map option indexes explicitly, including zero.

### Opening

Map direct `data` properties:

- `classificationAnswers` (five procedural/substantive strings or null), `classificationSeen` (indexes).
- `timelineSeen` (`stage-1`…`stage-6`), `sequenceCorrect` boolean.
- `analysisSeen` (`who`, `what`, `how`, `where`, `terms`).
- `what-how-options`, `clarification-options`, `research-options` (numeric selections).
- `problem-input`, `accomplishment-input`, `draft-input`, `questionSelfcheck`.
- `quizAnswers` (five numeric/null selections), `quizEarned` (indexes); include a record without `quizEarned` to characterize correct-answer fallback.

### Middle

Map `data.middleState` and all owned properties: `sets`, `fields`, `positions`, `researchCorrect`, `assembled`, `quizIndex`, `selections`.

- Global card indexes: welcome `0,1,2`; s1 `3,4`; models `5,6`; speaking `7,8`. Do not remap each group to zero-based indexes accidentally.
- `sets`: `flipped`, `evidenceOpened`, `communicationOpened`, `strategyOpened`, `openedDetails`, `solved`, `correctQuiz`.
- `solved` groups: classify, group, communication, speaking use question indexes; application uses suffixes `a`,`b`.
- Initialized field positions expected: `0 source`, `1 finding`, `2 why`, `3 assembled`, `4–7 research-check-0…3`, `8 application-draft`, `9–13 application-check-0…4`. Verify by running the original initialization and freeze the observed result; report disagreement rather than guessing.
- `positions` groups classify/group/communication/speaking; selections include `classify-options-N` etc., reusable `*-options` transient keys, `research-options`, `application-a-options`, `application-b-options`, `quiz-N`. Preserve otherwise unused keys too.

### Final

Map `data.finalState`: `flips`, `panels`, `answers`, `checks`, `notes`, `goals`, `selections`, `quizIndex`, `assembled`, `builderModel`, `closingModel`, `fields`, `panelsOpen`.

- Card indexes are page-local: page 0 has 3, page 1 has 2, page 4 has 3.
- Panel exploration is page-local, but `panelsOpen` is global: indexes `0–3` page 2; `4–5` page 3; `6–8` page 5; `9–12` page 6.
- Question selections are keys `page:index`; answers contain correct-ever indexes per page.
- Text fields use IDs (`build-1`, `build-2`, `build-3`, `assembled`, `closing-text`). Checklist controls have no IDs in the baseline; credit comes from `checks[2]` and `checks[7]`, not serialized field order.
- Notes map indexes to correct flags; goals use three numeric indexes.

## Minimum progress fixtures per lesson

- Fresh/missing key; partial first-page exploration; mid-lesson mixed activities and drafts; completed lesson.
- Correct-ever question subsequently changed to an incorrect option, when representable.
- Empty/unanswered selections, numeric zero, and boundary-length text where applicable.
- Synthetic non-contiguous completed sections; unknown properties at outer/data/nested levels.
- Malformed JSON, invalid outer data, malformed nested values, out-of-range indexes (label these unsafe fixtures, not expected successful legacy restoration).

Record the action sequence and origin/mount used for observed fixtures. Include punctuation, line breaks, and Unicode in synthetic drafts. New tests should distinguish preservation expectations from baseline crashes on malformed state; milestone 4 repairs that boundary.

## Required baseline tests

1. Each fresh lesson: only first page and reference accessible; valid desktop/mobile navigation; reference with no progress; collapsed rail; bottom controls.
2. Complete each lesson through actual activities at least once; test one missing prerequisite per counted page to prove the gate isn't merely a Next click.
3. Flashcards: keyboard/click, back/front, exploration retained after flip-back/navigation/reload. Details/timeline: all unique items needed, no extra credit for repeating one.
4. Every question bank: options and correct associations unchanged, immediate feedback, retry/review, correct-ever credit where implemented, selection restoration where implemented.
5. Writing: assembly output, current save triggers, model/checklist requirements, readonly/editable behavior, clipboard failure characterization.
6. Root and repository-prefix mounts for all lessons and homepage. Validate local referenced assets/links; no hidden 404s.
7. Print-media visibility and Chromium PDFs: only reference prose, one screen Print button, no printed controls/knowledge checks. Record manual preview status separately.
8. Production files remain byte-identical throughout milestone 1. Test harness must not patch app code to make it easier to drive.

The milestone 1 hash audit is a boundary check, not a permanent test asserting that production can never change. Later milestones keep the frozen source/content captures intact while replacing extraction-only assertions with their approved migration assertions. Keep original-engine replay checks alongside new-engine checks; changing a known-defect assertion requires a named standards repair and its replacement regression test, not a baseline rewrite.

Content/answer/policy baselines are mandatory exact-preservation checks, independent of screenshots. Visual captures document identity, grouping, readability, clipping, and responsive/print behavior; they do not impose pixel-perfect rendering on later migrations. Follow the contracts' testing hierarchy when designing assertions: a text/key/gate change fails without explicit approval, while an inspected minor layout difference can be documented as acceptable. Milestone 1 itself still makes no production changes.

External fonts/CDN can affect screenshots. Record browser versions and load readiness, wait for fonts, and mask only nondeterministic non-instructional effects. Do not mock away the actual layout while claiming visual regression coverage or require identical font rasterization across browsers. Preserve captures as historical evidence; do not configure later agents to chase incidental spacing or wrapping.

## Known defects to record, not fix here

- Opening checkpoint doesn't save/highlight its last option; classification pills aren't green/red. No flashcards exist in Opening.
- Opening classification needs all current answers correct; do not label this an incorrect-ever-credit bug and change its gate.
- Middle next actions don't immediately persist some cursors; unfinished research fields and model visibility have save/restore gaps.
- Final assembled synthesis edits lack immediate saving; restored goals may not update their caption.
- Rebuilt question DOM can lose focus/live announcements; inactive card faces need screen-reader review.
- Shared print CSS forces Opening's `view-7`, with compensating Middle/Final overrides.

Keep the automated suite actionable: assertions for known gaps can document observed behavior or be explicitly expected failures with issue IDs. Do not leave arbitrary red tests or skip whole lesson journeys.

## Acceptance and verification

- [ ] Production files unchanged; only development tests/docs/config added.
- [ ] All content types and meaningful variants inventoried, with question/answer/feedback associations.
- [ ] Initialized maps and representative valid/invalid fixtures exist for all three lessons.
- [ ] `npm run test:unit` and `npm run test:browser` have documented results; both mounts are covered.
- [ ] Desktop/mobile evidence, print artifacts, and manual checks are captured or explicitly marked blocking/pending.
- [ ] Known defects are distinguishable from future regressions.
- [ ] Content/answer/policy assertions are independent of visual comparisons; pixel equality is not a milestone gate.
- [ ] `.opencode/docs/refactor-status.md` records revision, evidence, limits, and next-milestone readiness.

Do not declare the preservation baseline complete if essential browser captures could not run. Finish with a concise report and stop.

## Suggested review/commit boundaries

1. Development test runner/server and ignores.
2. Content inventory and frozen maps/progress fixtures.
3. Browser journeys, visual/print baseline, known issues, and verification handoff.
