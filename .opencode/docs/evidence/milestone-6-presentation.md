# Final migration presentation checkpoint

Starting commit `4ddeef73e528621b25642a0de6abf67c60db67c1`, branch
`refactor/shared-components`; clean checkout at entry. Original preservation source:
`0b5d2297e7cbc19bd59cde750492dd28e3983ca0`, sealed HTML, banks and fixed Final map
in `tests/fixtures/`. Read all three required Middle correction records before
inventory/extraction. Initial checkpoints kept public Final legacy. The latest
entry below records the owner's explicit instruction to put the corrected version
in `final.html`, the resulting local cutover, and still-pending manual review.

## Pre-extraction source → presentation inventory

All sections retain Fraunces headings, DM Sans prose, original eyebrow/lead roles,
explicit `title-N` / `view-N` identities and original order. Structural loading and
stack wrappers must add no margins/gaps. Styles are scoped to `.dsl-final`, never
Middle's theme. Existing profiles/controllers own behavior; metadata owns copy.

| Section | Original roles and complete activity inventory | Bounded mapping / scoped treatment |
| --- | --- | --- |
| 0 welcome | Muted subtitle; white intro card; three pale stage descriptions; separate secondary heading/instruction; 3 white/navy cards and readiness feedback | `lead`, callout, flow, standard flashcards; Final card grid/front weight, green feedback reveal |
| 1 summary-synthesis | Muted lead; 2 comparison cards; revealed two-column SUMMARY/SYNTHESIS card; amber notice; 5 questions | standard flashcards; two-column callout/caution; `final-questions` in teal-left activity frame |
| 2 connect-viewpoints | 4 numbered panels; scenario white card with heading/prose and 4 speaker statements; 1 question; synthesis white writing card, 3 labeled source fields, assembly/status, editable output/actions, model title + 2 paragraphs; honest-reflection note and 5 checks | standard expandables; callout/roundtable; `final-questions`; `final-synthesis` writing; model/checklist reveals; narrow shared action/output visibility extension if needed |
| 3 organize-findings | 2 example panels with muted commentary; amber accuracy notice; note-activity title/instruction; 6 numbered labeled selects; summary question; coaching feedback | standard panels + annotated prose; caution; distinct note-classification activity in existing activity tone; question frame; example feedback |
| 4 consensus | 3 cards; 3 contextual questions; separate terms-distinction feedback | standard flashcards; framed `final-questions` with amber contexts; example feedback |
| 5 task-audit | 3 panels, WHAT/HOW emphasis; revealed task-audit heading; practice task/current proposal paragraphs with separate labels; 3 questions | standard expandables; callout with preserved strong text; framed `final-questions` |
| 6 professionalism | 4 panels; 3 questions | standard expandables; framed `final-questions` |
| 7 closing-practice | Fictional simulation white card; emphasized required components; 4 speaker statements; 4 questions; white writing card with heading/guidance; labeled seven-row draft; explicit show/copy/edit controls; model title + 2 paragraphs; 6 checks | callout/roundtable; framed `final-questions`; draft writing + model/checklist reveals; no sentence grading |
| 8 knowledge-check | 5 questions; revealed completion badge, heading/message, score/progress; goal heading/instruction, 3 reversible goal choices, derived caption and 2 navigation actions | framed `final-questions`, no Middle overview; bounded progress/navigation presentation and checklist caption; no new gate |
| 9 quick-reference | Original sheet/header/Print/content wrappers; 5 numbered tinted reference groups | Sole milestone-3 reference files, common loader/renderer/Print handler; preserve wrappers and numbered print overrides |

Reconciled source counts: **8 cards** (3/2/3), **13 panels** (4/2/3/4),
**25 questions** (5/1/1/3/3/3/4/5), **6 notes**, **5 + 6 checks**, **3 goals**,
**2 required models**, **8 speaker statements**, **5 reference groups**. No source
card has a distinct short title embedded in longer front copy; preserve front
wording rather than inventing a title. Noninteractive stage/comparison labels,
task labels, model titles and coaching titles remain separate from descriptions.

## State inventory and required comparison coverage

- Every card: both faces, explored front/back, reload, keyboard, reduced motion,
  intrinsic growth at narrow/enlarged text; teal lower-right hint, navy reverse.
- Every panel: collapsed/expanded/explored/reloaded; page-local exploration versus
  all 13 global open flags; native hydration must be silent.
- Every bank: unanswered, correct, wrong, wrong-after-credit, retained-credit text,
  previous/next boundaries, focus/live region; all alternative feedback separately
  content-tested. Fraunces activity heading, DM Sans prompt, lettered options,
  neutral/green/red answers, green/red shaded feedback and amber contexts.
- All 6 categorization rows: Choose category, wrong/retry, correct + disabled,
  refresh; label association/status; wrong selections session-local.
- Synthesis: empty/partial/ready fields, pre/post assembly, edited output/reload,
  explicit reassembly, copy fallback/edit focus, model/check reveal, reversible
  checks and current-field initial gate. Closing: empty/nonempty-only, model/check
  states and copy/edit. Completed credit never revoked.
- Completion: zero/restored/multiple/unselected goals, exact caption ordering,
  score/progress and reference/review actions. Reference-only print from ordinary
  and reference views; independent failure/retry, one handler/writer.
- Compare pinned original/current across every section/activity/callout/model,
  wide desktop, narrow desktop near source breakpoints and mobile, root/repository
  mounts, Chromium/Firefox/WebKit/mobile Chromium, settled fonts/transitions.

## Prerequisite execution

- `npm run test:unit`: **158/158 passed**; `npm run validate:content`: **passed**.
- First background suite lost its managed shell (`Shell.NotFoundError`), no report.
  Foreground single-worker attempt exceeded 2,400,000ms at test 761/840; owner
  reported killing an apparently inactive shell. No completion/pass inferred.
  Only the two session-created orphan servers were terminated; pre-existing server
  retained. No source edits before required complete-suite attempt.
- `caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser`:
  **839 passed, 1 failed**, 20.1 minutes. All four projects/both current and replay
  mounts; unchanged Opening Firefox repository journey's builder output was empty.
  Failure matches a previously recorded milestone-5 observation; cause unproven.
  No test, runtime, timeout, security or assertion change to explain it away.
- Exact unchanged Firefox identity rerun with `--workers=1 --max-failures=1
  --repeat-each=3 --grep '/discussion-skills-lab/opening complete real activities'`:
  **3/3 passed**, 22.2 seconds. Initial anchored grep matched no tests and is not a
  pass. This is diagnostic evidence, not a relabeled all-green full invocation.

## Review decision and gaps

Owner presentation approval: **not requested yet / not granted**. No cutover.
Comparisons, implementation-specific permitted differences and actual manual
checks will be recorded below as performed; this inventory is not evidence that
they already passed. No interactive print preview, AT, physical device or actual
browser zoom check is claimed.

## Implemented checkpoint and reconciliation

The complete intended graph now mounts in the shared app at test-only
`/final-harness.html` and `/discussion-skills-lab/final-harness.html`. Public
`final.html`, `assets/js/final.js` and `assets/js/final-reference.js` are unchanged.
The reference pilot is absent only in the isolated harness, where the app/common
reference loader own the one reference and Print handler. No atomic public
cutover or pilot deletion has been performed.

- `lessons/final/config.json`, pure completion/reveal policy, unchanged fixed v1
  adapter; 21 content activities and the exact nine gates. Source map:
  `milestone-6-source-map.json`, 86 Markdown mappings / 109 generated graph files.
- Eight card faces pairs, 13 panels, 25 questions, 6 notes, all 11 checks, 3 goals,
  both complete models, eight speaker statements and all five reference groups
  independently match the pinned source. The otherwise unused uppercase reference
  copy prefix is nonpublished in `content/final/legacy-variants.json`.
- One new interaction controller: `mountNoteClassification`. Other activities use
  the existing shared controllers. Optional closed writing action/output-reveal,
  sequence heading/counter, checklist caption and progress/navigation layout APIs
  retain the source compositions; no content-selected code, HTML or classes.
- Final-scoped styles preserve the actual source cascade (components before Final
  overrides), Fraunces roles, separate titles, white/navy cards, teal activity
  accents, amber contexts/notices, speaker groupings, models and green/red feedback.
  Existing numbered print rules remain, with the required scoped ancestor bridge
  for the common renderer's `#views` wrapper.

### Corrections and permitted presentation differences

Early new tests caught missing hidden-group display protection and a print selector
assuming direct `.dsl-content` children; corrected, not waived. Original published
and sealed Final headings actually render at 1rem because of Tailwind's reset,
despite older unscoped size declarations. Initial oversized headings were corrected
to measured source sizes, retaining Fraunces rather than importing Middle styling.
Correct/wrong hover border precedence and component stylesheet order were corrected
against actual painted comparisons. The original source prefix/CSS remains intact.

New-test authoring corrections: empty quiz-only reveal wrapper was initially lost
by extraction and restored; initial VM fixture assumed `finalState` always existed;
server-byte boundary needed to recognize scoped appended CSS. Dynamic `.flipped`
locators changed their own indexes during iteration; hidden loader status paragraphs
were initially counted as speakers. These were test/extraction mistakes, not content
or policy relaxations. Keyboard focus tests now explicitly focus and activate via
Enter/Space: macOS WebKit pointer clicks do not normally focus buttons. No production
pointer-focus behavior was changed to satisfy that incorrect assumption.

Permitted differences (not exact-pixel parity): intrinsic card height grows for
long/enlarged text rather than clipping; explored credit is visible on fronts and
faces start front-facing after refresh, independently of durable credit; native
controls/live status nodes and modest wrapper/paragraph spacing reflow naturally.
Speaker cards retain row composition/equal-height grouping, source label hierarchy
is retained, and checks/models remain separate. A shared teal keyboard focus outline
replaces incidental source focus geometry. No instructional text/answer/gate or
reference grouping is traded for screenshot similarity.

## Executed comparison / acceptance evidence

`tests/browser/final-presentation.spec.mjs` runs **60 comparisons per project**:
every one of ten sections × 1440/780/390px × both mounts. All four projects pass
these 240 comparisons in the final cumulative run. Checks include both card faces,
collapsed/expanded panels, each note's blank/wrong/correct-disabled states, all
question banks/options and wrong/correct/wrong-after-credit painted states,
contexts, static white surfaces, notices, speaker statements, writing fields and
models, reference composition and document overflow. Fonts/transitions settle
before paired screenshots. Content and policy oracles remain separate.

Whole-lesson browser checks cover fresh nine-page gates, every alternative feedback,
all valid v1 fixture fields/open panels/exploration/checks/models/selections/notes/
goals with zero hydration writes, immediate output/cursor saves, caption restoration,
legacy replay, explicit copy/edit/model actions, clipboard rejection, keyboard
activation, all eight cards at 320px/enlarged text, storage corruption/denial/quota,
independent activity/reference failure/retry and reference-only printing. No actual
browser zoom or screen-reader result is inferred from enlarged-text/ARIA checks.

### Command outcomes (chronological)

1. Expanded units: initial **162 passed / 2 failed** (test VM empty-state and server
   boundary mistakes above); corrected **164/164**, then **165/165** with bounded
   metadata/archive/negative-case guards. `npm run validate:content` passes the full
   production/fixture graph. Last unit log:
   `/private/var/folders/fv/fb864z9n6gz9g1yvq_jxf0jr0000gn/T/opencode/milestone-6-final-units.log`.
2. Initial Chromium journey exposed hidden-group issue; later 5 passes/one print
   ancestry failure; corrected **15/15**, expanded **18/18**. Presentation preflight
   failures above corrected; narrow-root/prefix **20/20**, then all Chromium
   comparisons **60/60** (204.014641 seconds). Archived initial report/captures in
   `milestone-6-presentation/initial-chromium/` (before final cue/spacing refinements).
3. `caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/final-lesson.spec.mjs tests/browser/final-presentation.spec.mjs --max-failures=1 --output=test-results/milestone-6-focused`:
   **159 passed / 1 failed / 2 interrupted / 150 not run**. New WebKit pointer-focus
   assumption failed; no production focus fix. Report: `first-focused/results.json`.
4. Same two-file command with `--project=webkit --workers=1 --max-failures=1
   --output=test-results/milestone-6-webkit`: **78/78 passed**, 6.5 minutes;
   `webkit-confirmed/results.json` plus 20 paired comparison captures.
5. Full final command:
   `caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- --output=test-results/milestone-6-full`:
   **1,159 passed / 1 failed**, zero skips/flaky tests, **1841.165013 seconds**,
   start `2026-10-27T18:00:56.812Z`, **three workers**, not serial execution.
   Chromium/WebKit/mobile Chromium each **290/290**; Firefox **289/290**.
   All **320 new Final checks pass** (80/project), as do all Middle/Opening checks.
   Sole failure: unchanged public legacy Final root persistence test, Firefox browser
   closed during navigation with Juggler invalid-content-encoding/progress-listener/
   sandbox-extension logs. Cause is not proven; no security changes made.
   Full report SHA-256:
   `164bcf7ce86f56f48178f6b701bcab8babac0802a8984e2cd36213f182b7e618`.
   `full-checkpoint/results.json`, `captures.json` and 156 selected captures/PDFs
   preserve all-section multi-project/mount/width evidence and print outputs.
6. Owner explicitly requested **no repeat of the full suite; isolate Firefox**.
   Executed only:
   `caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/persistence.spec.mjs --project=firefox --workers=1 --max-failures=1 --repeat-each=3 --grep '(?:^| )/final observed restore' --output=test-results/milestone-6-firefox-isolated`:
   **3/3 passed**, **17.854298 seconds**, zero skipped/flaky/runner errors.
   Report SHA-256 `938fddee2d8551c693fd5ccc9c1fa053875e45cf37a261eeb7339e90b4ad9d92`,
   archived at `firefox-isolated/results.json`. Every identity now has passing
   coverage, but the full invocation still had one failure; it is not relabeled as
   a single green 1,160-test run. No further full run requested or performed.

Final source after those checks changes only indentation in two shared files and
documentation/evidence. No runtime behavior/content/style change followed the full
run. No baseline/seal, assertion, test timeout, retry, browser setting/dependency or
security policy was weakened. No commit, merge, push, tag, publication or Pages change.

## Actual review and remaining owner decision

Agent **file-based review only**: pinned/canonical Welcome and both initial faces,
desktop source/current synthesis scenario/builder/model/checks, mobile closing
scenario/model/checks, knowledge-check completion/goals, final WebKit notes/examples/
correct-disabled state and final mobile Chromium closing. Text/grouping remains
readable and unclipped in reviewed images. Read/rendered
`full-checkpoint/chromium-0-final-reference.pdf`: one complete Letter page, all five
groups/colors/text/meaningful emphasis, no controls/questions/blank leading page.
This is not an interactive browser or print-preview check.

**Owner approval remains unavailable: stop before public cutover.** Preview:
`npm run test:serve`, then its printed URL + `/final-harness.html` (repository
mount also supported). Review every section/activity/callout/model and states;
record actual browser/actions and approval. Real Safari/iOS/Android, interactive
Chrome/Firefox/Safari print previews, screen readers, actual zoom, hardware/device
clipboard permissions and physical printing are unperformed and unclaimed.
After approval, atomically replace the Final entry/remove the reference pilot and
its inclusion, verify public-page parity and affected cross-lesson checks. Do not
advance to Opening or global shell/CSS cleanup. No further whole-suite rerun without
a new need/owner direction; retain the explicit diagnostic evidence above.

## Owner-requested larger headings and durable front cues — 2026-10-27

Historical first interpretation: uniform-heading/bold-front claims below are
superseded by the later **Exact Middle parity and corrected preview path** entry.

### Decision and bounded changes

The owner reports that layout, styling, accessibility and printing otherwise
exactly match main, and explicitly requests the two approved Middle differences
also apply to Final and inform milestone 7. The supplied Middle comparison image
shows the intended larger title and front-face explored icon/label. This is
owner-reported browser acceptance of the preceding scope, not an agent-performed
manual check; browser/version, AT/device and actual zoom details were not supplied.
The owner explicitly asks for another verification round after this correction,
so public Final remains legacy and cutover approval is still pending.

Only Final's opt-in page-title CSS changes runtime presentation in this follow-up:
Welcome and numbered pages **01–08**, including Knowledge Check, share responsive
`clamp(2rem,3.5vw,3rem)` bold Fraunces / 1.2 leading. Long words wrap rather than
overflow at 320px/enlarged text. Reference, activity, model, completion and other
subheadings are outside the selector and retain their prior treatment. This
explicitly supersedes the earlier 1rem original-reset-size comparison, not the
unchanged instructional text or reference composition.

The shared flashcard component **already** moves its single `✓ Explored` cue to
the active front after flip-back, and restores earned front cues on refresh.
No shared controller/style patch or duplicate cue is needed. New targeted checks
verify all eight Final cards, keyboard Enter/Space, both faces' ARIA, focus,
durable credit, cue/hint separation and unclipped intrinsic layout. Opening has
no flashcards: milestone-7 instructions explicitly prohibit adding any, carry the
larger main-title expectation and preserve Opening's own exploration semantics.

Contracts and milestone-6/7 specs now record both approved differences and the
owner's impact-scoped rerun requirement. No content, schema, key/adapter/store,
question, writing, gate, renderer or Opening/Middle runtime behavior changed.
Inherited milestone-6 work and historical evidence remain intact. No cutover,
commit, merge, publication, dependency/security change or baseline update.

### Impact-based verification, not another whole-site run

Affected surface: Final counted-page headings, and confirmation of Final card
front cues using the unchanged controller. New
`tests/browser/final-heading-cues.spec.mjs` contains four scenarios across the two
mounts. Each runs in Chromium, Firefox, WebKit and mobile Chromium. Checks cover
all nine counted headings at 1440/780/390/320px, enlarged root text, all eight
cards' flip-back/reload/keyboard/ARIA/label fit, unchanged subordinate/reference
sizes and reference-only print isolation/PDFs. The original/current comparison
oracle now explicitly asserts the approved title size/weight rather than expecting
small original sizes; original font/color/relative leading and every unrelated
paint/content assertion remain. One representative original/current section-1
comparison at 780px per project confirms that other styles/content remain intact.

Exact final command:

```sh
caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/final-heading-cues.spec.mjs tests/browser/final-presentation.spec.mjs --grep 'Final approved|(?:^| )/ Final section 1 .* at 780px' --workers=1 --max-failures=1 --output=test-results/final-heading-cues-confirmed
```

**Passed 20/20**, five each Chromium/Firefox/WebKit/mobile Chromium, both mounts;
zero failed/skipped/flaky tests or runner errors, **148.061435 seconds**. Start
`2026-10-27T21:12:26.110Z`; report SHA-256
`ef045ab5a858d2e55c50331dfb40f5ca111dfac8e5f20b861eff213e331c2713`.
Report/capture index and 22 separately named PNG/PDF artifacts:
`milestone-6-presentation/heading-cues-approved/`. No other lesson or full-suite
test was run in this follow-up. Unit/content-validation suites were not rerun:
instructional data, schemas, JS behavior, policies and codecs are unchanged.
`git diff --check` passes for tracked edits; new test syntax/execution verified by
the targeted browser run. The archive helper only adds support for these named
PNG artifacts; it does not alter or reseal original captures.

Initial scoped attempt: **5 passed / 1 failed / 14 not run**. A one-test Firefox
diagnostic reproduced the new heading-fit oracle's false positive at 780px:
Fraunces at 32px had 40px ink extent vs a rounded 38px natural line box, with
`overflow-y:visible`, `max-height:none`, and no horizontal overflow. There was no
paint clipping. Test now checks width containment plus natural height/unclipped
overflow, rather than requiring glyph ink fit inside a 1.2 line box. It retains
size/weight/family/leading, whole-document overflow and card clipping assertions.
No production padding/font-size/line-height change was made to satisfy that test.
Diagnostic report retained under `heading-cues-diagnostic/`; the failed initial
run is not relabeled as passing.

### Review handback

Agent file review: the new Chromium 780px section-1 capture shows the larger
Fraunces title with existing cards/notices/activity composition; the new WebKit
320px consensus capture shows readable wrapping titles and all three explored
front labels separated from hints. Read/rendered the new Chromium reference PDF:
one complete Letter reference-only page, original five tinted groups and all
text/emphasis, no controls/lesson questions/leading blank page. This is file-based
review, not an agent-performed interactive print preview or actual browser zoom.

Ready for the owner's next browser verification. Run `npm run test:serve`, then
visit the printed localhost URL + `/final-harness.html` (repository mount also
available). Review the new headings and flip-back/reloaded cues; `final.html`
intentionally still runs the unchanged legacy engine until final approval. No
further tests, public cutover or later milestone implementation is started here.

## Exact Middle parity and corrected preview path — 2026-10-27

### Findings and correction

The owner confirmed reviewing **`final.html`**, which remains the unchanged legacy
entry. This explains why the migrated changes were invisible; this is not evidence
of a personal-browser cache defect. Previous owner-reported acceptance therefore
does not establish acceptance of the migrated preview. No cache/progress was cleared.
Read-only fresh Chromium inspection at 1440×1000 compared Middle, public Final and
the harness using synthetic fixtures; measured results are in
`milestone-6-presentation/middle-parity/entry-audit.json`. This was the requested
style comparison, not a Middle regression suite.

The earlier uniform `clamp(2rem,3.5vw,3rem)` approximation also did not match
Middle: Middle Welcome was 57.6px, numbered headings 41.6px, card fronts weight
400; the previous harness had 48px headings and weight-700 fronts. Public Final
still had 16px reset titles and no front explored cue. Corrected only Final's
opt-in CSS: Welcome `clamp(2.25rem,5vw,3.6rem)`; all numbered pages 01–08
`clamp(1.85rem,3.4vw,2.6rem)`; bold Fraunces, 1.17 leading, `-.035em` tracking.
Removed the Final bold-front override so Middle's common normal-weight white/navy
faces, padding, rounded corners, intrinsic sizing and front/back explored cues
apply unchanged. Preserve separate authored card titles and Final activity styles.
Reference/activity/model/completion headings, content, gates and storage are unchanged.
Natural wrapping/height differences from different card text remain permitted.

The specs/contracts and current inventory/issues/checklist now state these exact
profiles, superseding the uniform-size interpretation. Milestone 7 carries the
numbered profile into Opening without inventing a Welcome page or flashcards.
Shared controller/styles and Opening/Middle runtime files were not edited.

### Targeted verification and preserved evidence

First command:

```sh
caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/final-heading-cues.spec.mjs tests/browser/final-presentation.spec.mjs --grep 'Final approved|(?:^| )/ Final section 1 .* at 780px' --workers=1 --max-failures=1 --output=test-results/final-middle-parity
```

Result: **11 passed, 1 failed, 8 not run**, 99.904871 seconds. All five Chromium
and five Firefox identities passed, plus WebKit's root heading check. The new
WebKit card-style assertion compared serialized strings (`24.799999px` vs
`24.8px`, `65.599998px` vs `65.6px`). Corrected only the test to compare numeric
leading/padding to measured Middle values with `toBeCloseTo(..., 4)`; other style,
cue, ARIA, focus, persistence and fit assertions remain. No runtime CSS changed
to satisfy this failure. Archived report and 16 attachments in `middle-parity-first/`;
report SHA-256 `28d47893e357fe21bfd6faba4e4282e159ae8d4d95459cb4a70ef05c41ecde13`.

Reran only the affected/unfinished projects, not Chromium/Firefox:

```sh
caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/final-heading-cues.spec.mjs tests/browser/final-presentation.spec.mjs --project=webkit --project=mobile-chromium --grep 'Final approved|(?:^| )/ Final section 1 .* at 780px' --workers=1 --max-failures=1 --output=test-results/final-middle-parity-confirmed
```

Result: **10/10 passed**, zero skipped/failed/flaky, 85.991259 seconds. Report
and 10 captures preserved in `middle-parity-confirmed/`; report SHA-256
`4d25c2a73e1a785c47895c9cf2d86816e9549b93a4335fbd96f4bfc98676b81b`.
Together these runs cover **all 20 selected identities**, five per project, both
mounts for heading/card scenarios, all nine lesson titles at four widths/enlarged
root text, all eight cards' keyboard/flip-back/reload/cue fit, reference-only print,
and one root original/current section-1 comparison per project at 780px. This is
not a fresh single 20/20 run. No full-suite, Opening/Middle regression, unit or
content-validation rerun: only Final CSS/tests/docs changed in this correction.
`git diff --check` passed. Original captures/sealed fixtures were not updated.

### File review and usable preview

Agent reviewed the new Chromium 780px section-1 screenshot (numbered title and
existing Final composition), WebKit 320px consensus screenshot (normal card text,
explored front cues separate from hints, readable wrapping) and rendered Chromium
reference PDF (one complete Letter page, all five original tinted groups/text,
no lesson controls or leading blank page). This is artifact review, not interactive
browser/print-preview, actual browser zoom, screen-reader or physical-device testing.

Started a fresh local preview server on an OS-assigned unused port, background
shell `sh_17f4c90f1001oiZYnlsGhkrnyC`:
**http://127.0.0.1:55159/final-harness.html**.
HTTP smoke check returned 200/no-store for the harness and current Final CSS,
confirmed `body.dsl-final` and the corrected Welcome profile. No browser state was
seeded/cleared on this review origin; progress is origin-local. Use the harness URL
directly, not the home page's legacy Final link. This session leaves the preview
server running for owner review; it is not a browser test or public deployment.
Overall milestone 6 remains blocked pending owner review of the correct migrated
preview and subsequent public cutover. No cutover, commit or milestone-7 migration.

## Owner-directed real `final.html` entry — 2026-10-27

### Authorization and bounded integration

After confirming the separate harness was still available, the owner explicitly
instructed: **“I do not want that. I want these changes to final.html.”** This
supersedes the harness-only checkpoint plan and authorizes local entry integration;
it is not a claim that the owner reviewed/accepted the migrated presentation and
does not authorize commit, push, publication, deployment or Opening migration.

`final.html` now contains the bounded shared-app shell, `body.dsl-final`, component
and Final stylesheets and exactly one production module entry `assets/js/final.js`.
That thin entry imports the existing Final adapter/completion/reveals and mounts
the already tested config/content graph. No fixture URLs, duplicate legacy writer,
inline activity banks or second reference renderer/listener. Removed the temporary
`assets/js/final-reference.js` pilot and the Final harness fixture/server route.
`/final-harness.html` now returns 404; root/repository `final.html` are the actual
content-driven lesson. Ordinary static hosting needs no generated route/build.

`tests/helpers/final-cutover.mjs` now exports `finalCutover(source)` as an exact
bounded shell oracle against pinned source, following Middle's existing pattern.
Updated Final presentation/lesson checks to use the real URL, added explicit
production-entry/one-writer/one-Print assertions, and adapted older Final baseline,
restoration, reference and policy checks to shared stable IDs. Original source,
sealed fixtures/answer behavior and replay remain immutable. The development
journey helper now records actual option/feedback behavior for the existing sealed
Final behavior assertion; no assertions were replaced with invented expected data.
Shared production runtime/components, Opening/Middle runtime/content and storage
adapters were not changed in this integration. All inherited migration work remains.

### Checks, failure diagnosis and Final-only print repair

Targeted units:

```sh
node --test tests/unit/final-migration.test.mjs tests/unit/baseline.test.mjs
```

**14/14 passed** (1.677369 seconds), including exact content/gates/reveals and
bounded actual shell/module/pinned evidence. After adding explicit retired-route
404 assertions, reran only `node --test tests/unit/baseline.test.mjs`: **7/7 passed**
(1.631247 seconds). These are small static/unit preservation checks, not an
Opening/Middle browser regression run or full unit suite. `git diff --check` passes.

Initial Chromium integration selection:

```sh
caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/baseline.spec.mjs tests/browser/persistence.spec.mjs tests/browser/reference-loading.spec.mjs tests/browser/policy.spec.mjs tests/browser/print.spec.mjs --project=chromium --grep '/(?:discussion-skills-lab/)?final |Final previous/next|reference data equals|immediate navigation, failed|new reference dependencies|reference (?:invalid-json|invalid-shape|network)|final clipboard' --workers=1 --max-failures=1 --output=test-results/final-public-integration
```

**13 passed / 1 failed / 6 not run**, 48.9s, plus a teardown runner error from the
held reference request. Passed public root/repository fresh navigation, full
nine-page journeys/every alternative/gates, restoration/non-contiguous credit,
original replay restoration, clipboard fallback, permanent credit/model/check
policy and reference-only PDFs. Failure: the old reference-pilot test waited for
whole-lesson readiness while deliberately holding reference IO. Corrected that
test to assert the integrated app's early reference navigation instead. Report
and four PDFs: `public-integration-first/`; failing attachments remain in the
separately named `test-results/final-public-integration/` output.

Next isolated Chromium reference run stopped **1 passed / 1 failed / 6 not run**,
13.2s plus held-request teardown error. It exposed a real inherited harness CSS
gap: Final's print rules hid the reference loading/error status, leaving a heading
and general lesson loader instead of explaining incomplete reference content.
Fixed **only Final CSS**: show a nonhidden `[data-reference-status]` in print;
hide the general `#lesson-status` and retry controls. Hidden completed-reference
status stays hidden. No shared runtime/theme changes. Diagnostic report retained
in `public-reference-loading-diagnostic/` and original attachments under
`test-results/final-public-reference-confirmed/`.

Corrected reference command:

```sh
caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/reference-loading.spec.mjs --project=chromium --workers=1 --max-failures=1 --output=test-results/final-public-reference-fixed
```

**8/8 passed**, 13.317292s: semantic reference text/emphasis, zero hydration writes,
early navigation, delayed/failed print notices/retry, one Print call, external
network blocked and invalid JSON/shape/network retries. Archived
`public-reference-confirmed/results.json`, SHA-256
`202db62cca8e87398e67a3f2be25cc3c02a23b2f99c9df1dd0e78b1bbe1f2033`.

Final cross-browser **Final-only** entry verification:

```sh
caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/final-heading-cues.spec.mjs tests/browser/final-lesson.spec.mjs tests/browser/reference-loading.spec.mjs --grep 'Final approved|Final public entry|Final exact original|Final all valid|Final edited synthesis|immediate navigation, failed' --workers=1 --max-failures=1 --output=test-results/final-public-confirmed
```

**56/56 passed**, 14 each Chromium/Firefox/WebKit/mobile Chromium, root/repository
mounts, zero skipped/failed/flaky/runner errors, **318.558992s**. All nine headings
at four widths/enlarged root text, all eight cards/front cues/keyboard/reload/fit,
production-only entry/one writer/Print handler, exact original prose/emphasis/
cards/panels/models/labels, every valid v1 fixture's silent restoration, immediately
saved edits/cursors/goals/wrong-after-credit/unknown properties and original-engine
payload replay; delayed/failed reference-print status/retry verified in every
project/both mounts. Archived report and 20 PNG/PDF artifacts:
`public-final-confirmed/`, report SHA-256
`5fae53100a004bed7f921dadb8949e14bdfdfcd506b25be1404aa26c1cc646b8`.
No full-suite, Opening or Middle browser rerun. Full standalone content-validation
command not rerun; the targeted Final unit validates the lesson tree. No new
full 240-view visual matrix, physical devices/AT/actual zoom/interactive print
preview/physical print checks; earlier broad evidence retained, not relabeled fresh.

### Real URL handback

Agent artifact review: latest WebKit 320px consensus screenshot confirms normal
front text and separated explored/hint labels; rendered latest Chromium reference
PDF remains one complete Letter page with all five groups/content/emphasis and no
lesson controls/leading blank page. Not claimed as interactive browser testing.

Restarted only this session's own preview server on the **same port** (preserving
origin-scoped progress): background shell `sh_17f622997001I6QYNXOiyoeBLg`,
`PORT=55159 npm run test:serve`. Verified HTTP 200 production-module shell with no
fixture or legacy-writer entry at **http://127.0.0.1:55159/final.html** and its
repository-prefixed equivalent; retired harness is 404. Did not seed, clear or
manipulate progress on the owner-review origin. No deploy/commit. Owner browser
review is now of the actual Final page; overall milestone acceptance remains
incomplete until that review/manual gaps are resolved. Stop; do not start Opening.
