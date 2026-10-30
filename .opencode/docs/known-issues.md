# Original-engine issues (not repaired in milestone 1)

## Milestone 8 — consolidation follow-up (2026-10-30, T09/T10 removal implemented)

- Owner approved T02/T08 removal and rejected T09/T10 retention; both removal
  scopes are now implemented. The exact 25 T02/T08 files are removed, and the
  separately approved v4 scope (18 T09 whole files, nine T10 whole files and one
  bounded completion test/unused import) is also removed. Post-removal checks for
  both scopes find no executable consumers, ordinary 404s for retired fixture
  paths and 200s for all four public entries at both mounts. The five remaining
  replacement specs passed **368/368** in one clean all-project browser invocation
  (37.3 minutes, zero skips/failures). See
  `evidence/milestone-8/consolidation-coverage.md` for the assertion map and
  `consolidation-v4-post-removal-audit.json` for the v4 results.
- Replacement coverage now passes: T09 has 448 distinct cases with combined
  passing coverage; T10's complete role selection passed 24/24 in one clean
  invocation (15.3 minutes, all four projects/both mounts, zero skips/failures),
  and narrow/spacing/final source passed 32/32. Earlier failures remain recorded.
- Early replacement diagnostics over-applied exact style comparisons (Opening
  paragraph roles, Final container inheritance, Middle active quiz jump) and
  assumed Final's Welcome minimum also applied to Middle's 2.35rem mobile
  override. Those are test-oracle/setup issues, not authorization to alter the
  approved CSS. Tailwind readiness fails explicitly if its external stylesheet is
  unavailable rather than comparing an unstyled original. After real
  `net::ERR_TIMED_OUT` requests, `visitWithStylesheet()` retries the same public
  page up to three times; every attempt still requires the generated stylesheet,
  and a persistent outage fails explicitly. No fake stylesheet or skipped check.
- A new generic card stress probe initially used invented long text and enlarged
  it before shrinking the viewport. WebKit overflowed in that setup; the old
  source-length/narrow-then-enlarged test passes. The replacement now uses the
  actual pinned source's longest face and the old enlargement order; both WebKit
  mounts pass. This is not a general claim that arbitrary content/resizing works.
- Additional exploratory **whole-root** 200% checks exposed a Middle long title
  extending into visible section padding (303px content in a 288px box, no page
  overflow) and a Final inline-text overflow (328px page at 320px viewport) in
  Connect Viewpoints. These exceed the retired tests' enlargement scopes; no
  production CSS fix is bundled into cleanup. Preserve the existing exact
  heading/card/control tests and triage any broader zoom/layout work separately.
- The two inherited pre-cutover unit guards below were removed with the approved
  v4 scope. Equivalent current-entry, formatter, source-bank and isolation
  assertions remain in `tests/unit/component-contracts.test.mjs`; the affected
  126-test unit selection and content validation pass. No stale guard remains.

## Milestone 8 — v3 current checkpoint (2026-10-29)

- **Two inherited stale unit guards:** `tests/unit/components.test.mjs:62–66`
  and `tests/unit/formatters.test.mjs:63–66` still prohibit the approved shared
  component stylesheet on Opening/Final. An expanded targeted unit run exposes
  both failures (126/128 pass); this is an obsolete intermediate-state oracle,
  not a product regression. Exact replacements preserving the meaningful
  isolation/formatter/bank/VM assertions are proposed as **T09-GUARDS-v3** in
  `evidence/milestone-8/remaining-dispositions-v3.md`. No test is disabled or
  silently relaxed while awaiting approval.
- New public/boundary/controller contracts pass 120/120 across all four projects
  and both mounts, plus 14/14 Chromium dependency checks. Earlier new-test
  assumptions about hidden activities, accessibility-tree names and sparse
  navigation were corrected without changing production. Exact failures/results:
  `evidence/milestone-8/remaining-verification-v3.md`.
- T02/T08 removal replacements are prepared; exact cleanup and T09/T10 retention
  **proposals** await an explicit decision. Retention would preserve the documented
  direct-API and real-public-page assertions, not pretend that every former
  consolidation plan was implemented. If declined, their ports remain work.
  Existing owner acceptance resolves the prior Middle Print presentation review;
  no new device/AT/zoom/GUI-print evidence is inferred. Runtime, content, progress
  and all candidates remain unchanged in this test-only session.

## Milestone 8 — incomplete approved implementation checkpoint

- **Owner-reported Middle reference Print appearance regression:** the generic
  reference branch emitted an unclassed button after the title, losing the original
  prominent control/header. Restored the Middle button-above-title composition
  and explicit semantic button paint/1rem font/touch-target size. New public
  desktop/mobile appearance/order/keyboard/no-save/print-hiding assertions supplement
  the earlier functional checks. Evidence and actual verification outcomes:
  `evidence/milestone-8/middle-print-button-fix.md`. No instructional/progress change.

- **Scope correction (inventory v2):** the first proposal over-retained executable
  migration fixtures and cutover helpers by grouping them with meaningful archives/
  baseline dependencies. The remaining Middle preview has only its own temporary
  route as a consumer; real lesson regressions already target `middle.html`. It,
  orphaned extract/archive/pilot tools and the remaining partial/shared sandboxes
  are now explicit retirement candidates. Active test consumers must be ported or
  consolidated; they are not permanent-retention exemptions. Exact-content/gate/
  progress/security assertions, sealed replay artifacts and actual instructional
  variants remain protected. Reviewed S/H/P/R and T01/T03–T07 removals are now
  implemented with the owner's 2026-10-28 approval. T02/T08/T09/T10 assertion ports
  and consolidation remain incomplete, not permanent retention decisions.

- Root HTML/homepage now load the shared shell/home/semantic-print implementations.
  Tests target actual files, not staged responses. Nothing is committed/published.
- The reference-only fixture exposed an assumption that navigation always has
  counted pages; allow one reference and guard the final counted page/percentage.
  Existing legacy counts/gates remain unchanged; targeted parity/codec tests cover
  all three existing consumers. A fixture query parameter was rejected correctly
  by the safe content resolver; separate mechanical HTML entries now select modes
  without weakening that security boundary.
- A stale navigation-unit assertion still parsed banks from the now-thin Opening
  entry. It now compares the harness against pinned original labels **and** the
  current external manifest, keeping the original-engine assertion rather than
  removing it. No frozen source or policy fixture changed.
- Middle's old `:not(#view-8)` print compensation could beat semantic rules. The
  nine approved P01–P04 blocks are now removed, and public entries load `print.css`
  last. Chromium direct-file semantic print checks pass at both mounts. Remaining
  mixed CSS aliases were not deleted or declared globally unused.
- Broader old alias/minified CSS cleanup is deferred: mixed active rules and the
  intentional legacy decoy fixture are real consumers. No whole stylesheet or
  meaningful instructional archive is certified dead. Tailwind/fonts remain external.
- New owner browser/interactive-print/device/AT/actual-zoom verification and
  remaining cleanup/port evidence are pending. Full long-running suites
  are intentionally not run per the owner. See the latest handoff and
  `evidence/milestone-8-verification.md` for actual results, not inferred completion.

Refactor documentation lives in `.opencode/docs/`; repository paths below are root-relative.

## Milestone 7 current checkpoint

**Accepted/complete, 2026-10-28:** owner confirms browser verification fully passes
after the essentials-panel correction and requests committing milestone 7 locally.
This supersedes the pending-review statements below without rewriting historical
results. No named-browser/device/AT/zoom/print details inferred; earlier manual and
external replay-loading limits remain recorded. No push or next-milestone work.

2026-10-28 owner browser review reports most checks pass, with one Clarifications
essentials-panel spacing/alignment defect. Scoped correction removes prose sibling
margins from its grid cells/paragraphs and restores the original 12px gap; no other
panel/stage/content/policy change. Eight focused real-page tests pass across all
four projects/both mounts/six widths plus enlarged text. Two attempted paired-replay
checks encountered missing external Tailwind styling in the original replay; those
failures remain documented separately from the corrected-panel pass. Evidence and
final captures: latest section of `evidence/milestone-7-presentation.md` and
`evidence/milestone-7-presentation/essentials-spacing-panel-confirmed/`. Owner recheck
of this correction remains pending; no broader manual acceptance is inferred.

Owner has now accepted milestone 6 in **Safari and Chrome**, explicitly covering
navigation, style, accessibility and printing. Versions/devices/AT/zoom details
unspecified; do not invent them. This supersedes the pending-review status below.

Opening's real entry now uses extracted content/shared interactions and its frozen
v1 adapter, not classic DSL or a separate preview. KI-01 is repaired: classification
latest choices are green/red and sequence latest selection persists separately
from permanent sequenceCorrect credit. Task tabs now have complete ARIA/roving
keyboard relationships; initial/reloaded rendering never grants exploration.
KI-02 remains deliberate, including task-analysis current-choice dependency.
Safe storage/unknown-data handling uses the already tested shared writer/codec.

Opening preflight found/corrected a research-prompt extraction selector error and
320px/enlarged-text footer overflow; no content assertion was relaxed. Exact task,
all original passages/options/feedback/models and policies remain independent of
paint comparisons. Original extraction-only browser expectations are superseded
by actual module/silent-restore/content/one-writer assertions, without rewriting
milestone-2 evidence. Source engine's initialization-save behavior remains pinned
on replay; the migrated engine intentionally performs no hydration writes.

New Opening owner acceptance/manual browser/print/AT/actual-zoom review is pending.
Only impact-scoped Opening checks run; no Middle/Final or whole-site test suite.
Results and failures remain explicit in `evidence/milestone-7-presentation.md`.
Final results: 156/156 Opening checks, 32/32 heading/latency/retry follow-ups and
16/16 affected presentation follow-ups, all four projects/both mounts. Artifact
review caught generic timeline/tab style overrides; Opening-only flex/borders/
bold-pill corrections and stronger original/current control-paint assertions pass.
Final timeline/tab captures are in `evidence/milestone-7-presentation/timeline-tabs-confirmed/`;
earlier crowded-cue captures remain historical, not approved final presentation.

## Milestone 6 current checkpoint

Latest owner direction (2026-10-27): “I do not want that. I want these changes to
final.html.” Applied the already verified migrated version to the **real
`final.html` entry**; removed the separate Final harness route/entry and reference
pilot. This authorizes local cutover, not a claim of manual presentation acceptance
or permission to publish. Middle's exact separate heading profiles and normal
card fronts now load at the normal Final URL, including durable front cues.
KI-04 synthesis saves/goal captions, KI-05 stable question feedback, safe storage,
unknown-data preservation and reference-only printing now belong to that entry.

Latest targeted browser run: **56/56 passed** across all four projects/both mounts;
14/14 targeted units also passed. Additional Chromium public journeys/navigation/
restoration/policy/clipboard/print checks passed before the reference-loading check
found a print-status gap. A delayed/failed reference's status was hidden in print;
Final-only CSS now prints that notice while suppressing the general lesson loader.
The old reference test also incorrectly awaited whole-lesson readiness while
holding reference IO; it now checks early navigation independently. All eight
Chromium reference checks and delayed/failed print checks in all four projects
pass after correction. No Opening/Middle browser or full-suite reruns. Details and
immutable reports: latest public-entry section of `evidence/milestone-6-presentation.md`.
Owner review of actual `final.html` remains pending; no Opening migration/deployment.

Prerequisite full run: 839/840 passed; unchanged Opening Firefox repository builder
output was empty. The exact identity passed three unchanged reruns; cause remains
unproven. A lost background shell and interrupted/timed-out attempt are not passes.
Final preflight corrected hidden-group CSS, print ancestry, actual heading/cascade
and selected-hover color. New-test defects (changing filtered locator, hidden
status vs prose selector, WebKit pointer-focus assumption) were corrected without
changing production behavior or weakening keyboard focus/content/policy assertions.
Actual outcomes and manual/approval gaps: `evidence/milestone-6-presentation.md`.

Source: `0b5d2297e7cbc19bd59cde750492dd28e3983ca0`. These distinguish inherited
behavior from refactor regressions. They do not authorize fixes outside the
contracts' named standards repairs. No unexplained failing or skipped journeys
are intended; known-gap tests assert the observed original behavior.

| ID | Original behavior / location | Evidence / later handling |
| --- | --- | --- |
| KI-01 | Opening checkpoint stores only `sequenceCorrect`, not latest choice; no selected-answer highlight. Classification pills have selected-only styling, not green/red. `opening.html:420–445,537–543` | Source capture; scoped Opening standards repair only on migration |
| KI-02 | Opening classification requires all **current** answers correct; **not a defect** and not correct-ever. No Opening cards. Its cursor advances through explicit Next, which becomes available after any answer. | Real UI journey; preserve actual policy. Spec's “advances after any selection” must not be interpreted as automatic cursor advance. |
| KI-03 | Middle sequence Next and quiz Next update cursors without immediate save. Unfinished research input and revealed models have save/restore gaps. `assets/js/middle.js:231–248` | Save-gap browser test; scoped migration repair. Models remain optional. |
| KI-04 | Final assembled synthesis edits have no input listener; a later action may persist them. Goals restore checks but not caption. `assets/js/final.js:259,269–279` | Save-gap browser test; scoped Final repair |
| KI-05 | Middle quiz and Final questions rebuild selected controls/live feedback, potentially losing keyboard focus/announcements. Inactive card faces do not have explicit assistive-technology hiding; Middle rich `article[role=button]` needs review. | DOM/source evidence; actual screen-reader review pending. Scoped focus/card accessibility repair when migrated, not in milestone 1. |
| KI-06 | Shared print CSS forces Opening `#view-7`; Middle/Final compensate with overrides. | `print.spec.mjs`, historical PDFs and CSS source capture; semantic isolation repair later |
| KI-07 | Malformed nested collections can crash all original lessons; primitive `data` and out-of-range cursors crash Middle/Final. JSON parse failures are swallowed; initialization can overwrite invalid records. | Explicit unsafe-fixture original-replay browser test; milestone 4 must add safe decoding/write-blocking new-engine tests without removing original characterization |
| KI-08 | Legacy core save drops unknown **outer** fields. Middle/Final persist replaces owned state, dropping some unknown nested properties; unknown `data` properties survive. | `unknown-properties.json` and explicit browser characterization; future adapters must preserve unknowns |
| KI-09 | Explored card credit survives flip-back, but reload shows explored cards on their backs regardless of last face. Middle lacks an always-visible explored cue on front. | Partial-first restore tests; separate exploration/presentation in scoped component migration |
| KI-10 | Fixed-height/absolute card faces, especially Middle's `overflow:hidden`, may clip long content at narrow widths/zoom. | Initial mobile captures reviewed; exhaustive backs at 200% and assistive-technology checks pending. Do not recreate clipping for screenshot equality. |

## Evidence limitations

- Automated Playwright WebKit is not a claim of real Safari/iOS testing.
- Chromium-generated PDFs and print media are not interactive browser print preview
  or a physical printer check.
- `visual/environment.json` records a 400-weight Fraunces readiness probe. That
  weight is not the heading weight; a false result alone does not prove heading
  font failure. `font-readiness.json` records loaded font faces and computed heading
  weights: Final uses 400 (resolved to the available 600 face), other headings use
  700. Unused Unicode subsets/weights remain `unloaded`, not network failures. Do not mock fonts/CDN
  to claim a real visual baseline.
- The first supplementary `*-explored-mobile.png` captures caught restored CSS
  flip/reveal transitions in progress. They are retained as historical evidence,
  **not approved settled card views**. Compare the separately named
  `*-explored-settled-mobile.png` captures instead; capture waits on actual
  animations without disabling/mocking them. No original capture is overwritten.
- No personal browser profile or real student record was used. Browser fixtures
  contain synthetic educational practice text only.

## Milestone 4 isolated-runtime status

Checkpoint 4.1 adds tested boundary handling for KI-07/KI-08 **only in the new
isolated store/codecs**. Live lessons keep their original engines/defects until
whole-lesson cutover. Invalid outer/known nested records are conservatively
write-blocked, while valid independent progress/drafts remain usable in memory.
Unknown progress properties survive supported edits; opaque UI extensions are
preserved and unsupported new UI facts are session-only with warnings. No claim
that old engines now preserve unknowns or safely load malformed records.

During the fresh pre-change production run, Firefox's repository-prefix Middle
journey returned from a pointer click without populated application-A feedback
(235/236 passed). The unchanged test passed in a one-worker isolated rerun.
Root cause is not established; no source/assertion/snapshot change was made to
hide it. Exact commands/outcomes and subsequent regression results are recorded
in `evidence/milestone-4-1-verification.md`. This is a test-stability observation,
not evidence that the new modules were loaded by production lessons. The subsequent
full 296-test run passed in all four projects, including the same Firefox journey;
the cause remains unestablished and should be investigated if it recurs.

Checkpoint 4.2 adds isolated stable-ID navigation and pure completion, not a live
shell cutover or a repair to the above production issues. `update()` retains credit
without focus/scroll changes; only successful navigation focuses the intended
heading/reset scroll. Stored completed pages stay accessible without reconstructing
missing answers. Navigation itself cannot earn credit or write storage.

The initial new navigation test run exposed **test assumptions**, not content or
policy regressions: CSSOM rounds percentage strings differently across engines,
and WebKit does not focus a button on pointer click. The progress test now compares
the numeric percentage within CSS serialization precision; keyboard focus retention
uses explicit focus + Enter. No content/access/focus assertion was removed, no
production behavior changed, and no baseline/snapshot was updated. Exact failures,
corrections and subsequent runs are in `evidence/milestone-4-2-verification.md`.
Real-browser/AT/zoom manual checks remain separate from headless focus assertions.
The subsequent full checkpoint-4.2 regression command passed **344/344** in all
four projects, including production/pilot/replay and both checkpoint harnesses;
no regression was observed in those checks. The earlier Firefox Middle observation
did not recur in this run and remains recorded rather than declared resolved.

Checkpoint 4.3 introduces separate explored/current-face and ever-open/current-open
components, latest-choice versus correct-ever question controllers, stable keyboard
focus/live regions, and immediate represented question-cursor saves **in isolated
harnesses only**. These exercise the scoped repairs relevant to KI-01/KI-03/KI-05/
KI-09/KI-10; no live lesson engine is repaired or partially converted. Opening's
current-answer classification exception (KI-02) remains external and tested.

Initial component browser checks passed 56/60. The four responsive/motion failures
were resolved within 4.3: the fixture lacked Tailwind's border-box reset when reusing
the shell (desktop projects overflowed at 320px/enlarged text), and legacy shared
CSS's global `!important` reduced-motion duration overrode the component's local
`transition:none`. A fixture-scoped border-box/wrapping rule and narrowly scoped
reduced-motion `!important` fix retain the original no-overflow/zero-transition
assertions. No legacy CSS, runner assertions, content, policy or baseline changed.
The subsequent focused run passed 60/60 in all four projects. Exact commands and
cumulative results are recorded in `evidence/milestone-4-3-verification.md`.
Manual real animation, actual browser zoom and AT announcement checks remain
explicitly pending, not inferred from DOM geometry/ARIA assertions.

Further 4.3 file review caught WebKit painting mirrored back text after returning
to a card front despite passing DOM/interaction checks. This real readability bug
was repaired with component-scoped inactive-face visibility (normal-motion flip
midpoint, immediate under reduced motion), not a relaxed screenshot expectation.
Final focused checks passed 60/60; reviewed corrected WebKit front and longest
back images are readable. Intrinsic card height/white space remains an intentional
permitted layout difference, not this defect.

The initial full 4.3 run passed 403/404 and reproduced the prior Firefox Middle
application-A empty-feedback observation on `/middle` (previously prefix). Both
unchanged Middle journeys passed an isolated one-worker diagnostic, 2/2. Root
cause remains unestablished; no production source/test assertion was changed.
The final-source cumulative rerun result is recorded in the 4.3 evidence/handoff;
a diagnostic pass alone does not clear the required regression gate.

The second 4.3 full run failed 401/404: two new native-details tests sampled storage
before the UA's queued `toggle` callback; the test now awaits the exact saved false
value, preserving runtime and all assertions. The remaining Firefox prefix Middle
Task-B failure has a concrete trace observation: viewport scrollTop moved
172 → 184 → 274 across the click despite the driver's completed scroll check.
The existing Middle CSS uses smooth scrolling. A bounded test-only readiness step
now observes the actual application-choice rectangle/scroll after scrolling it into
view, then performs the same real pointer activation. Motion/content/feedback/
selection assertions remain unchanged. Six repeated root/prefix Firefox journeys
and 60 final component checks pass. This is not a claim that the browser or legacy
production code was repaired. See the durable trace excerpt/captures and final
cumulative outcome in the 4.3 evidence/handoff.

Owner reported a laptop crash during the following full run. That run ended with
246 passes/158 failures (155 browser-launch closures, three timeouts); it is not a
passing checkpoint result. A fresh post-crash Chromium preflight also fails before
site execution with Mach-port `bootstrap_check_in` error 141 / `SIGTRAP`, while
`pgrep` cannot contact `sysmond`. Fresh units (83/83) and content validation pass.
Browser verification is **environment-blocked**, not waived or worked around with
security changes. Relaunching the coding application/terminal after reboot is an
owner recovery suggestion, not a verified fix; rerun all four projects when launch
works. Exact commands/report hash and limits are in the 4.3 evidence/latest handoff.

After the owner's full restart, the unchanged final full suite **passed 404/404**
(101 each Chromium/Firefox/WebKit/mobile Chromium), with no failed/skipped/flaky
tests or runner errors. Fresh units passed 83/83 and content validation passed.
The Mach-port launch blocker and earlier application-choice observation did not
recur in this run; no universal host/browser fix is claimed. Checkpoint 4.3 is now
verified. Historical failures/readiness corrections remain documented; existing
live legacy issues and manual animation/actual-zoom/AT/device/print follow-ups
are not erased by the passing automated result. See the final section of
`evidence/milestone-4-3-verification.md` and latest handoff.

Checkpoint 4.4 introduces immediate writing/input/output saves, reversible labeled
checklists, lesson-specific external model requirements and selectable clipboard
fallbacks **only in isolated harnesses**. This exercises the scoped Middle/Final
draft/output/model-save repairs without changing live KI-03/KI-04 or production
engines. Existing three keys/codecs/extension limits and the Final reference pilot
remain unchanged; reference integration reuses the existing schema/renderer.

The initial 4.4 focused run passed 60/68: eight new test-assumption failures supplied
newlines to single-line inputs and expected Playwright to remove them, whereas
`.fill()` replaced them with spaces. The new test now supplies an explicit single
line for inputs and multiline text for textareas and retains exact-value/immediate
save/reload/output assertions. No runtime/input normalization, policy, timeout,
retry or canonical baseline changed for that assumption. Final focused checks
passed **72/72** across all four projects, including late clipboard-denial teardown.
The required cumulative production/pilot/replay result remains pending until the
latest handoff/evidence records it. Manual clipboard dialogs, screen-reader/actual
zoom/device checks and interactive print previews remain unperformed, not inferred
from scripted API stubs, field selection, print-media checks or headless PDFs.

Final unchanged-source 4.4 cumulative regression **passed 476/476**, 119 each in all
four configured projects, with zero failed/skipped/flaky tests or runner errors.
This closes the pending automated gate: **4.4 verified**, **4.5 next unverified**,
overall milestone 4 incomplete. File-based review of both fresh Chromium harness
PDFs found the same complete, unclipped one-page reference with no controls/leading
blank. The fixture's uniform blue/teal/Arial styling is a documented test-only
presentation simplification; production per-group accents/fonts/pilot remain
unchanged. No interactive preview or AT/device/actual zoom approval is inferred.
Exact command/report hash/review limits: `evidence/milestone-4-4-verification.md`.

### Owner-reported Mac Safari keyboard navigation — resolved by owner settings retest

On 2026-10-25 the owner reports Tab/Shift+Tab cannot move among controls on live
`opening.html` in Mac Safari; Chrome supports Tab/Shift+Tab/Enter and the Opening
task-analysis arrow-key workflow. Safari arrows have not been isolated with an
already keyboard-focused tab. Browser version/preferences are unspecified. The
owner's iPhone has no attached keyboard; actual iPad/hardware-keyboard behavior is
not tested. Do not label this a confirmed 4.4 component regression: its harness has
no ARIA tab group, and live Opening retains its original engine. Also do not mark
Safari keyboard acceptance as passing based on automated WebKit checks.

The source does not intercept Tab. Mac Keyboard navigation and Safari Advanced
“Press Tab to highlight each item on a webpage” settings are the first diagnostic;
the owner retest is pending, not a verified fix. Apple reference/details are in
4.4 evidence. No custom global Tab handling or out-of-scope legacy rewrite added.
Owner-reported Chrome/Mac Safari print/writing/checklists/persistence/clipboard/zoom
acceptance is recorded separately; no manual Firefox testing is requested of the
owner. Required automated browser projects remain intact.

**Resolution, 2026-10-25:** owner confirms Keyboard navigation was disabled in
macOS System Settings; enabling it restored Safari keyboard functionality. No
application-code change was necessary. The earlier triage above is historical,
not an outstanding defect. Owner explicitly accepts checkpoint 4.4 as fully
validated. No screen-reader or actual iPad/hardware-keyboard result is inferred.

### Checkpoint 4.5 implementation / verification observations

The new app, bounded renderer/registry and closed instructional schemas run only
in an isolated attributed harness. They do not switch live engines or change the
known legacy issues above, progress codecs/keys, Final pilot, or production styles.
Initial new end-to-end checks passed 96/96 on both mounts in all four projects;
subsequent review tightened activity-validation-before-decode/hydration ordering
while keeping reference startup/navigation independent, and added explicit
Markdown-failure/static-registry checks. Final verification status is in
`evidence/milestone-4-5-verification.md` and the latest append-only handoff.

An initial strict-Ajv schema-compilation error was corrected using an equivalent
property prohibition, not by disabling strictness. A reviewed focused browser run
was interrupted by the agent shell's 120-second command limit after 101 listed
passes of 112, with no listed test failure; that incomplete run is not a pass.
The rerun disables only the outer shell time limit, not Playwright test/assertion
timeouts or any browser/security setting. No retry/skip, baseline rewrite, forced
click or production behavior change is used to obtain passing evidence.

Final checkpoint-4.5 verification **passed 588/588**, 147 each in all four projects,
with zero failed/skipped/flaky tests or runner errors. Fresh final units passed
136/136 and content validation passed. This verifies all five checkpoints in order
and closes milestone 4, with no observed regression in the listed checks. Reviewed
root/prefix harness PDFs contain the full unclipped one-page reference and no
controls/leading blank. Scope/evidence/report and PDF hashes are in 4.5 evidence.
No live lesson was converted and no known legacy issue is silently declared fixed.
New-composition manual AT/device/actual-zoom/animation/interactive-print/dialog/
physical-print follow-ups remain explicitly unperformed and nonblocking for this
isolated-runtime milestone; no release approval or milestone-5 work is inferred.

### Milestone 5 first review unit — incomplete migration, not a live repair

Pure Middle gates/reveals, five question banks, both checklists and the non-published
strategy/reference archive are introduced without switching any public entry.
The source/bank/gate/answer tests and direct shared-component harness are a first
review unit only. Research/application writing, rich Markdown card/panel content,
staged-reveal renderer wiring, complete reference migration/printing and full-page
cutover remain outstanding; see `evidence/milestone-5-questions-verification.md`.
Do not mark KI save gaps/model visibility or live question focus as repaired yet.
The partial speaking harness has no `Try Another Strategy` affordance; it must be
added through the shared component before the complete speaking section passes.

An initial new unit oracle failed on an absent `middleState`: the verified codec
correctly omitted default-only state when encoding against an empty record, while
the test stub dereferenced it unconditionally. The test now supplies an empty
legacy object in that case. No production/codec/policy change or baseline rewrite
was needed. Final verification results belong in the evidence/new handoff, not an
inferred milestone-completion claim.

The first cumulative milestone-5 run failed 625 passed/three WebKit Opening
timeouts; unchanged targeted Opening extraction/persistence retest passed 24/24
with one worker. Traces show ~111-second navigation waits in the two extraction
tests and a long readiness wait in the persistence test, not a diagnosed cause.
Do not call the full suite green or alter Opening based on this observation.
The next full result remains required.

Reference extraction adds only an explicit Middle tag/class profile to the shared
renderer/schema, retaining Final's prior output. Its first combined targeted run
passed all 24 new Middle reference checks but failed eight new question-remount
assertions (a root class was incorrectly queried as a descendant in the resumed
test file) and one existing Firefox Final reference navigation check. The new
test now asserts the root class plus exactly one question prompt and removes an
unnecessary positional-checkbox fallback. No component behavior/assertion
timeout/legacy navigation helper was changed. A new unit negative case also
needed its frozen Final-specific duplicate-document ID applied to Middle's ID;
the frozen case itself remains unchanged. Subsequent actual results are recorded
in `evidence/milestone-5-reference-verification.md`, not inferred from diagnostics.

The subsequent full run **failed 646 passed/six mobile-Chromium timeouts**, while
all three desktop projects passed 163/163 and all new Middle checks passed.
Timeouts occurred in existing bootstrap/replay/writing harnesses; elapsed times
clustered near 528 and 888–892 seconds despite 120-second test budgets. No cause
(including host sleep/resource contention) is established. An unchanged single-
worker mobile diagnostic passed all 61 tests in those files, including all six
failed cases, in 40.5 seconds. This is **not** a green full-suite result; complete
regression acceptance remains outstanding. No runtime/test/timeout change made
to hide the observations. Full details/report hash: milestone-5 reference evidence.

Separately named settled PDFs now have computed opacity 1 and passed file-based
text/image review without animation bleaching. Earlier raw PDFs remain preserved;
interactive preview/actual printing and full lesson cutover remain unverified.

**Checkpoint verification resolution, 2026-10-25:** the owner reports the laptop
slept during the long run, reran exactly the six mobile timeout identities with
`caffeinate -i`/one worker and reports **six/six passed in 6.1 seconds**, then
explicitly requests verification closure. Agent inspected the matching local
report (six expected, zero failures/skips/flaky/runner errors; SHA-256
`22eb6cacb0b9217e3f38a48ef38596bd1c4fc7a264e8bb77f0831756c479e7fb`).
Current checkpoint automated verification is **complete on owner-accepted combined
coverage**: prior 646 passes plus the six exact rerun passes, not a new single
652/652 passing command. The preceding outstanding-verification statements are
historical and no longer block this pre-cutover checkpoint. Earlier failed
reports remain recorded; sleep is reported context, not an independently proven
cause. Milestone 5's remaining implementation/cutover and its future full checks
are still outstanding. No code, assertion, timeout, baseline or permission change.
# Milestone 5 cutover verification notes

Middle's remaining migration now uses the shared runtime. Its immediate partial
research/cursor saves and optional model persistence are the authorized KI-03/KI-04
repairs, not changes to the original replay characterizations. Front-face refresh
with durable explored cues is intentional; original v1 never stored current face.
Opening/Final live issues are not declared repaired by this Middle migration.

The first expanded full-lesson harness run failed because a new emphasis oracle
included the original empty generated quiz-score `strong` placeholder. Only empty
placeholders were filtered; every nonempty emphasis/content assertion remains.
A separate initial schema compile error was fixed with explicit branch property
declarations, keeping strict Ajv enabled. Cutover shell byte checks then caught a
single trailing LF mismatch in the test transformation; the transformation now
explicitly documents/adds that LF. These are retained verification history, not
reasons to weaken source/answer/policy seals. Detailed results and actual manual
limits: `evidence/milestone-5-cutover-verification.md`.
# Milestone 5 final full-run follow-up

First whole cutover suite passed 720/720. Final file review then caught/fixed one
duplicate Communication heading fragment and added an explicit no-duplicates
assertion; speaking comparison messaging now clears on the next real selection/
question navigation without clearing any last-choice/credit state. The subsequent
corrected-source full run had 718 passes/two Firefox failures: unchanged Opening
prefix builder output stayed empty after a pointer click, and original Final's
unsafe-state characterization worker exited with SIGBUS. Neither is established
as a new runtime defect or a resolved environmental cause. Both exact identities
passed unchanged three times (six tests) with one Firefox worker. The failed full
run remains recorded; another full result is required, not waived by diagnostics.
See `evidence/milestone-5-cutover-verification.md` and its archived reviewed report.
# Milestone 5 third full-run observation

The third unchanged full run passed 719/720; the earlier Opening/Final replay
failures did not recur, but Firefox's unchanged Final reference-pilot prefix test
failed during context teardown with Juggler invalid-content-encoding, sandbox-
extension and progress-listener errors. No Middle check failed. A final all-project
single-worker run is being used without changing assertions/timeouts/security or
the runner configuration; its outcome must be recorded, not assumed. This is an
empirical test-run adjustment, not a claimed root-cause fix. Details/report hash:
`evidence/milestone-5-cutover-verification.md`.
# Milestone 5 automated verification closure

The final corrected-source full suite passed **720/720**, all 180 tests in each
of Chromium/Firefox/WebKit/mobile Chromium, using `--workers=1` with a fresh
command-scoped Firefox home. No required assertion/project/viewport/timeout or
security setting changed. Unit tests (152/152), content validation and diff checks
also passed afterward. This closes the cumulative verification blocker, **not**
the root-cause investigation of the earlier nonreproducing Firefox pointer,
SIGBUS and protocol/teardown observations. Retain that history and reassess if it
recurs; single-worker success is not a universal fix. Manual owner Chrome/Safari,
actual zoom/device/AT/printing follow-ups remain explicitly unperformed.
### Middle flashcard presentation follow-up (2026-10-26)

Owner comparison identified genuine migrated-card regressions: expanded Markdown
list whitespace, bold front text, top alignment, external explored marker and tall
ordinary cards. Scoped shared-card fixes restore compact lists, normal front
weight, centered front text, internal active-face status and ordinary Welcome
height while retaining intrinsic long/enlarged-text growth and accessible
content-only descriptions. No content, gates or storage mappings changed.

Integrated WebKit flip-then-enlarge checks exposed native flex-button scroll
overflow despite fitted face rectangles. Block button layout with a full-height
grid child passes the two exact root/prefix checks without clipping. Earlier
line-height-only correction was insufficient. Final affected-suite confirmation
passed **144/144** across all four projects, both mounts; units **152/152** and
content validation also passed. See `evidence/milestone-5-flashcard-style.md` and
latest status handoff.
No actual browser-zoom/AT/device/interactive print verification is claimed.
### Middle page-wide presentation follow-up (2026-10-26)

Owner's subsequent side-by-side screenshot exposed paragraph-role loss, repeated
wrapper spacing, a generic mint callout instead of Middle's pale-blue panel,
pill-shaped flow badges and premature Welcome-card grid wrapping at narrow
desktop widths. These are corrected within Middle's presentation scope, not
classified as acceptable migration differences. Rich Markdown panels/models also
no longer retain formatting newlines as extra visual whitespace. Content, hard
breaks, plain-text line breaks, gates and progress mappings are preserved.

Initial expanded Chromium comparisons pass 8/8 (root/repository, 940/1440/390px,
all-section prose roles). Final four-project affected regression **passed 248/248**,
with units **153/153** and content validation passing. An earlier WebKit model-save
pointer observation did not recur in six diagnostic repetitions or the unchanged
final run; its cause remains unestablished, not falsely declared repaired.
See `evidence/milestone-5-middle-presentation.md` for history and manual limits.
### Structure to substance presentation (2026-10-26)

Owner explicitly prefers the migrated larger section heading and explored cue on
both card faces; retain both. Flattened front pill labels and missing classification
activity composition are corrected separately: existing `frontTitle` labels,
bounded activity-panel tone, original question/answer/feedback/control palettes
and responsive layout. Initial Chromium comparison passes 6/6. Final four-project
affected confirmation **passed 200/200**, with units **154/154** and content
validation passing. A new-test Firefox edge comparison was corrected with a
documented sub-layout-unit tolerance; no runtime or content regression was waived. See
`evidence/milestone-5-structure-presentation.md` for scope and verification limits.
### Make contributions count presentation (2026-10-26)

Evidence example callouts, research-model front/back title rows and Activity 2's
panel/caution/answer/feedback/writing/model/checkbox styling are restored within
that section. Explored row-header/front-face cues and larger headings are retained.
The original assembly notice is not a new local addition: main sets it after
assembly and clears it on reload. It remains, with original small-note styling.
The real assemble/copy/model controls now precede output in DOM/visual order for
the existing `middle-evidence` profile. No state/storage/gate change.

Corrected initial evidence comparison passes 6/6 and preceding-page comparisons
14/14 on Chromium; units 155/155/content validation pass. Final four-project
affected suite **passed 224/224**, with original/current styling, model/clipboard/
assembly/lifecycle/credit/rollback checks intact. See
`evidence/milestone-5-evidence-presentation.md` for evidence and manual limits.
### Consistent treatment of all Middle activities (2026-10-26)

The remaining scenario activities, application Tasks A/B/C and quiz now use the
same Middle-scoped panel/answer/feedback/control theme as Activities 1/2. All nine
original activity surfaces are covered, with a separate pale quiz overview and
white question panel. Remaining expandable example/caution treatments, writing
model callouts and teal checkboxes are restored too. Approved larger headings and
header/front explored cues remain. No content or completion/storage policy changes.

Expanded Chromium original/current comparisons pass 6/6 across both mounts and
760/1440/390px; fresh units 157/157 and content validation pass. The final affected
four-project suite **passed 304/304**, including previous page comparisons and
content/progress/keyboard/print regressions. See `evidence/milestone-5-all-activities.md` for
coverage, closed callout annotations, preflight corrections and manual limits.
### Activity 5 optional comparison removed by owner request (2026-10-27)

Removed speaking simulator's `compareLabel` / `compareMessage` metadata so the
`Try Another Strategy` button and its additional instruction callout no longer
appear. This is an explicit approved exception to the earlier preservation
requirement, not a baseline rewrite. Normal question feedback/Next/review and
earned credit remain intact. Units 158/158, content validation and eight focused
four-project root/repository persistence checks pass; full suite not rerun.
### Middle milestone 5 accepted and closed (2026-10-27)

Owner accepted the corrected Middle pages and reported accessibility and print
preview checked in Safari and Chrome; owner-side browser verification is complete.
Earlier pending manual-check notes are historical. No specific AT, device, browser
version or actual zoom coverage is inferred. The final closeout handoff records
the passing cutover/affected checks and their chronology. Milestone 5 is complete;
Final and Opening migration implementations have not started.
