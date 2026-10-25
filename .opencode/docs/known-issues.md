# Original-engine issues (not repaired in milestone 1)

Refactor documentation lives in `.opencode/docs/`; repository paths below are root-relative.

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