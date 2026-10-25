# Milestone 4 checkpoint 4.3 verification — 2026-10-25

Starting HEAD: `da38eaea3e476e6c05bda5520a1b1f89bf72e121`.
Branch: `refactor/shared-components`. Checkpoints 4.1–4.2 and their documentation
were inherited uncommitted and preserved. No production entry, legacy engine,
classic core, shared legacy CSS, adapter/store/completion/navigation API, schema,
dependency, runner configuration or sealed baseline was changed. No commit,
merge, push, publication, tag or Pages setting change.

Read contracts/specification/latest checkpoint evidence and actual prior modules,
all three activity engines, frozen maps/banks and reference-pipeline prerequisites.
The prior owner-confirmed milestone-3 prerequisite resolution remains accepted;
no new named-preview evidence is invented. Fresh prerequisite tests passed before
component implementation. Only checkpoint 4.3 is requested; do not implement 4.4.

All npm commands use Node v22.23.4 with process-local setup:

```sh
eval "$(fnm env --shell zsh)"
fnm use 22
```

## Commands and outcomes

| Exact command | Outcome |
| --- | --- |
| `npm run test:unit` (prerequisite revalidation) | Passed 78/78, zero failures/skips |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/navigation.spec.mjs tests/browser/storage-boundaries.spec.mjs --output=test-results/4-3-prerequisite` | Passed 108/108, 27 each Chromium/Firefox/WebKit/mobile Chromium, 1.6 minutes |
| `npm run test:unit` (initial implementation) | Passed 83/83, zero failures/skips |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/components.spec.mjs --output=test-results/components-4-3-initial` | Failed: 56 passed/4 responsive-motion failures, 1.4 minutes; details below |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/components.spec.mjs --output=test-results/components-4-3-final` | Passed 60/60, 15 each established project, 1.4 minutes |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/components.spec.mjs --workers=1 --reporter=list --output=test-results/components-4-3-reviewed` | Passed 60/60, all four projects, 4.3 minutes; includes final title/numbering/complete face-description assertions; subsequent image review exposed WebKit painting defect below |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/components.spec.mjs --reporter=list --output=test-results/components-4-3-visibility` | Passed 60/60, all four projects, 3.7 minutes; final explicit inactive-face visibility fix and assertions, followed by image review |
| `npm run test:unit` (after responsive fixes and final source-title/numbering review) | Passed repeatedly 83/83, zero failures/skips |
| `npm run validate:content` | Passed repeatedly: existing reference schema, IDs, paths and Markdown |
| `git diff --check` | Passed tracked changes; new-file whitespace audit recorded with final review |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser` (initial cumulative regression) | **Failed** 403 passed/1 failed, no skips/flaky tests, 985.224205 seconds; unchanged Firefox root Middle journey had empty/hidden application-A feedback. Full details below. |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/baseline.spec.mjs --project=firefox --workers=1 --max-failures=1 --grep '^/middle complete' --reporter=list --output=test-results/4-3-firefox-middle-diagnostic` | **Invalid diagnostic invocation**: no tests found (anchored grep does not match the full Playwright title); not passing test evidence |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/baseline.spec.mjs --project=firefox --workers=1 --max-failures=1 --grep '/middle complete' --reporter=list --output=test-results/4-3-firefox-middle-diagnostic-valid` | Passed 2/2 unchanged root/repository-prefix Firefox Middle journeys, 32.7 seconds |

A second full cumulative `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser`
is running against the final unchanged component code, with no overlapping browser
command. Its outcome will be appended after notification; **no full-suite pass or
checkpoint-verification claim yet**. Earlier full run overlapped focused review
commands and final accessibility/visibility refinements; it is not a single frozen
final-source verification run. The final focused suite passed after those changes.

### Initial failures and fixes

All click/keyboard/credit/profile/hydration/focus/persistence checks passed in the
initial run. Only the last responsive/motion test failed:

- Chromium, Firefox and WebKit: component/face/choice scroll geometry already
  passed, but the **whole fixture** overflowed at 320px/enlarged text. It reuses
  the legacy shell without Tailwind's border-box reset; width plus shell padding
  exceeded the viewport. The new fixture now applies border-box and wrapping only
  inside its own root. No production/shared shell CSS was changed.
- Mobile Chromium reached reduced-motion and found computed `1e-05s` instead of
  `0s`: existing `shared.css` applies global `.01ms!important`, overriding the
  component's normal `transition:none`. The new component's own reduced-motion
  selector now uses `transition:none!important`, affecting only its card inner.
- The original overflow/zero-transition assertions remain unchanged. No retries,
  skips, forced clicks, content changes, snapshot rewrites or runner changes were
  used. The next focused run passed all 60. Final review then preserved Middle
  source titles as semantic `strong`, Opening all-at-once question numbering, and
  added active-face description/longest-back capture assertions; final cumulative
  suite exercises those refinements.

### File-based WebKit review caught a real defect

The passing `components-4-3-reviewed` tests' WebKit first-front PNG visibly painted
mirrored back text after a reduced-motion return to front. This is a functional
readability failure, not a permitted pixel/spacing difference. `backface-visibility`
alone was insufficient on these grid faces. Component-only CSS now explicitly
hides an inactive face at the midpoint of the normal horizontal flip, immediately
under reduced motion, while both faces still contribute intrinsic layout height.
The test also asserts final inactive/active CSS visibility; no screenshot comparison
was relaxed. All 60 final focused checks passed. Reviewed final WebKit front and
WebKit/Chromium longest-back PNGs are readable/unmirrored and contain the entire
example/explored cue. A future final-result capture archive is described in
`milestone-4-3/README.md`; prior ignored captures were cleaned by the next default
Playwright run before an attempted exclusive archival copy. No sealed fixture was
modified or recreated.

Final face descriptions include semantic source titles as well as bodies; this
was verified using Middle's stronger-example accessible description. This prevents
the visible `WHY IT IS STRONGER` title being omitted from the active description.

### Recurring unchanged Firefox production observation

Initial cumulative report: start `2026-10-25T16:22:52.465Z`, 403 expected/1 unexpected,
zero skipped/flaky/runner errors; SHA-256
`25560cdbd971006b0f77f7ff888a7cca3ee00eb5010c2caa6aedc8ac8a1aef9e`.
Failure: `tests/browser/baseline.spec.mjs:72`, root `/middle` real journey;
`legacy-journeys.mjs:67` expected `#application-a-feedback` visible after a pointer
click, but it remained empty/hidden. Screenshot and error context show section 6
active, six completed pages, unselected Task-A options and empty feedback. This
matches the prior checkpoint-4.1 observation, now on the root mount; no root cause
is established. No production page imports the new components/styles. Both root
and prefix unchanged journeys passed the isolated one-worker diagnostic (2/2).
The failure is retained, not reclassified as a pass or repaired by changing legacy
code/assertions/waits. Required cumulative rerun remains pending at this write.
The initial trace was in ignored default output and was cleaned by that rerun;
the full error/output/hash and inspected screenshot/context findings are recorded
here. An attempted later read of the cleaned trace was unsuccessful, not new trace
analysis evidence. No assertion change or automatic retry was added.

## API, content and exit-criteria evidence

Actual APIs/data/state/callback convention: `../progress-compatibility.md`,
checkpoint 4.3. Inventory/provenance and permitted fixture layout differences:
`../content-inventory.md`, checkpoint 4.3. No full lesson app, general renderer,
writing tools, checklists or reference integration introduced ahead of scope.

- All four mount functions use copied own-activity state and `onChange(nextState)`;
  the caller alone merges → applies pure completion → saves through the verified
  codec/store → updates navigation/components. Components do not fetch/read storage,
  scan the document, infer indexes from DOM position, or grant section completion.
- Three component families work independently and together: native-button cards,
  native details plus controlled Opening timeline, standalone question controller
  and all five sequence profiles. Small test policies, not full lesson policies.
- Direct data uses 47 original questions (46 sequence + standalone Opening checkpoint),
  ten cards (including all eight Final cards and two Middle research examples),
  ten panels (six timeline/four Final). Plain bodies and semantic source titles;
  no arbitrary HTML or invented question. Unit checks compare all sequence banks,
  order/options/answer associations/feedback independently and round-trip every
  option through the real codecs. The longest original card face is included.
- Hydration/unchanged updates produce zero callbacks/writes, including native
  queued detail toggles. Full activity history and raw strings remain unchanged.
  Current face/open state is separate from monotonic exploration; correct-ever
  history is separate from latest green/red choice. Completed sections cannot
  relock. Opening classification explicitly fails its initial gate after any wrong
  current answer even if all five correct-ever IDs were earned in-session.
- Focused browser checks cover native keyboard/click once-per-action, stable
  same-question nodes/atomic status region/focus, wrong-after-correct enabled
  alternatives, immediate represented cursor writes, retry focus/reset, wrap/no-wrap
  boundaries, score/status, reorder/reload, exact Final open-versus-explored maps,
  Middle global indexes, cleanup/duplicate-mount rejection and stylesheet isolation.
- Component CSS retains white edge-to-edge fronts, navy/white backs, teal flip/
  explored cues and horizontal 3D rotation. Both faces contribute intrinsic grid
  height, avoiding fixed-height clipping; narrow/enlarged fronts can therefore be
  taller. This permitted presentation difference is intentional, not a new design
  or content/policy change. 320px/enlarged-text geometry, no page overflow and
  reduced-motion zero-transition assertions pass in all configured projects.

## Manual checks and limits

Agent file-based review of focused Chromium and corrected WebKit front captures,
and corrected WebKit/Chromium longest-back captures at 320px/enlarged text:
white fronts/navy title/teal cues and complete navy/white back examples readable
without clipping/mirroring, with taller intrinsic two-face height noted above.
This is **not** interactive
animation, actual 200% browser zoom, assistive technology, real Safari/iOS/Android
or print-preview testing. Those manual checks remain pending separately in the
regression checklist. No 4.3 print behavior is introduced; existing Final pilot
remains in full production regression scope. Source-title/numbering refinements
and final longest-back capture review are covered by the final-result addendum.

Overall milestone 4 remains **incomplete**; the next unimplemented checkpoint is
4.4, but 4.3 is not verified until the running cumulative regression result passes.

## Second cumulative result and evidence-based test readiness corrections

The second full command **failed**, 401 passed/3 failed, zero skipped/flaky/runner
errors, 395.33385 seconds. Start `2026-10-25T16:40:48.369Z`; report SHA-256
`6f0c0fb08f75a4fb125322ff2be2d2bb41ef612a13f1ec8c5bb0240ab6355ad8`.

- Chromium/mobile Chromium native-details tests read saved `panelsOpen[1]` as true
  immediately after the native DOM `open` attribute became false. The UA queues its
  `toggle` event; the DOM assertion can finish before that callback saves. The test
  now polls the **exact persisted false value** at the real event boundary before
  reading the remaining record/reloading. No runtime/API or expected value changed,
  no arbitrary delay/retry/skip added; hydration-zero-event assertions remain.
- Firefox's repository-prefix Middle journey now failed at Task-B empty feedback.
  Its trace shows `html` scrollTop **172 before → 184 at input → 274 after input**
  despite the driver's completed scroll/stability check. Inspected call/log/scroll
  excerpts are retained in `milestone-4-3/production-scroll-observation.json`.
  Middle's existing `html{scroll-behavior:smooth}` explains why scroll readiness
  must include the post-scroll target, not just a pre-scroll element check. This
  supports a concrete timing mechanism, not a claim of a universal Firefox fix.
- `tests/helpers/legacy-journeys.mjs` now, only for Middle application choices,
  scrolls the real target into view and observes its rectangle/window scroll over
  four stable animation frames **before the real pointer click**. Motion, source,
  options/order, every feedback/selection assertion and timeouts remain unchanged.
  No force, synthetic activation, disabled animation, keyboard substitution,
  mocked content, relaxed expectation or baseline rewrite. This is a bounded
  test-readiness correction based on actual failing trace evidence.
- Four PNGs (corrected component front/longest backs and Firefox failure) are now
  exclusive byte copies under `milestone-4-3/`, with hashes/provenance in its README.
  Unlike the earlier cleaned outputs, these are durable. Agent reviewed the
  corrected component files before archival; no actual zoom/AT claim is added.

After these test-only corrections:

| Exact command | Outcome |
| --- | --- |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/components.spec.mjs --reporter=list --output=test-results/components-4-3-native-event-boundary` | Passed 60/60, all four projects, 35.8 seconds |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/baseline.spec.mjs --project=firefox --workers=1 --max-failures=1 --grep '/middle complete' --repeat-each=3 --reporter=list --output=test-results/4-3-firefox-scroll-readiness` | Passed 6/6: root/prefix Middle journeys, each three independent repetitions, 1.5 minutes; not automatic retries of failed tests |
| `npm run test:unit` | Passed 83/83, zero failures/skips |
| `npm run validate:content` | Passed existing reference validation |
| `git diff --check` | Passed |

The final full default regression command must pass after these corrections before
checkpoint 4.3 is verified. No component/production behavior changed after the
already verified visibility fix; the new changes are only test event/readiness
boundaries, with all substantive assertions retained. Earlier pending-result
handoff remains historical; the final result/handoff will follow.

## Laptop crash and fresh retest — browser environment blocked

The owner reported the laptop crashed during the next full run and requested a
fresh retest. The completion notification for that run was then delivered:
`env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser` **failed**, 246 passed /
158 failed, zero skipped/flaky/runner errors, 436.984034 seconds. Report start
`2026-10-25T16:53:46.168Z`; SHA-256
`8e39c3b1e990bea442428b942d5ccc1a5975dd2c1fbb1f797820f70d5231a293`.
Inspected result breakdown:

| Project | Results |
| --- | --- |
| Chromium | 101 passed |
| Firefox | 101 passed |
| WebKit | 44 passed, 3 timed out, 54 failed |
| Mobile Chromium | 101 failed |

Of the 158 failures, 155 report browser launch closed and three report test timeout.
Chromium launch logs include `FATAL ... mach_port_rendezvous_mac.cc:159`,
`bootstrap_check_in ... unknown error code (141)` / `SIGTRAP`, plus failed system
power/DNS service registration. This run is **not** passing full regression evidence;
partial passes do not establish checkpoint completion. It did exercise the final
test-readiness corrections before the host failures, without production changes.

Fresh post-crash checks (same HEAD/branch, working changes preserved):

| Exact command | Outcome |
| --- | --- |
| `git status --short --branch`, `git rev-parse HEAD` | Non-main `refactor/shared-components`, HEAD unchanged at `da38eaea3e476e6c05bda5520a1b1f89bf72e121`; all implementation/inherited changes remain present |
| `pgrep -fl 'playwright test\|tests/helpers/static-server.mjs'` | Process inspection **failed**: `sysmond service not found`, `Cannot get process list`; no processes killed and absence of leftovers is not claimed. The previous runner's completion notification independently confirms it exited. |
| `npm run test:unit` | **Passed 83/83**, zero failures/skips, Node v22.23.4 via process-local fnm |
| `npm run validate:content` | **Passed**, existing reference schema/IDs/paths/Markdown |
| `git diff --check` | **Passed** |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/components.spec.mjs --project=chromium --workers=1 --max-failures=1 --grep 'flashcards: native' --reporter=list --output=test-results/post-crash-browser-preflight` | **Failed 1/1 before site execution**, Chromium launch closed / Mach-port bootstrap error 141 / `SIGTRAP`; no lesson assertions ran. This is an explicitly limited environment preflight, not substitute Chromium-only checkpoint verification. |

The fresh preflight confirms the browser-launch environment is still unhealthy.
Do not run hundreds more known-blocked launches or disable security/change browser
flags/profiles to manufacture a pass. No further code, browser configuration,
dependencies, security settings or production files changed during this retest.
The full fresh four-project suite is **not performed after the failed preflight**;
it remains required once the host/application launch environment is restored.

Checkpoint **4.3 remains blocked / not verified**; overall milestone 4 is incomplete.
The next task is restoring a healthy macOS application session (owner can fully
quit/reopen the coding app/terminal after reboot), then rerunning the fresh preflight
and full `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser` with all four
configured projects. Relaunch is a recovery suggestion, not a verified fix. No
4.4 implementation, commit, publication, destructive cleanup or host repair was
performed. Manual animation/actual browser zoom/AT/device/print checks remain
separate pending follow-ups.

## Full restart verification — checkpoint 4.3 verified

The owner completed a full restart and explicitly requested the full suite again.
No runtime/test/configuration changes were made for this rerun. Same non-main
branch and HEAD; all inherited and checkpoint changes remain uncommitted/preserved.
Process-local Node/fnm setup remains as above, with a fresh command-scoped Firefox
application-data home and the unchanged default three workers/all four projects.

| Exact command | Outcome |
| --- | --- |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser` | **Passed 404/404**, 101 each Chromium/Firefox/WebKit/mobile Chromium, zero failed/skipped/flaky/runner errors, **425.95659 seconds** |
| `npm run test:unit` | **Passed 83/83**, zero failures/skips, freshly rerun after restart |
| `npm run validate:content` | **Passed**, freshly rerun existing reference schema/IDs/paths/Markdown |
| `git diff --check` | **Passed** at source review; documentation-only final review recorded in the handoff |

Full report start: `2026-10-25T17:07:15.845Z`. SHA-256 of ignored
`test-results/results.json`:
`3882a7903c539fcbcc31b051e633218493aea5c59ae5dfd90319f826200b7c2c`.
Agent inspected stats, all-project outcomes and empty runner-errors list.

| Scope | Passing tests |
| --- | ---: |
| Existing production/content/security/extraction/policy/persistence/print/reference pilot | 236 |
| Checkpoint 4.1 storage boundaries | 60 |
| Checkpoint 4.2 navigation | 48 |
| Checkpoint 4.3 components | 60 |

Production lessons/homepage/pilot run on `/` and `/discussion-skills-lab/`; pinned
replay uses `/__original/` and `/__original/discussion-skills-lab/`. Direct component,
navigation and storage harnesses use isolated fixture routes and contexts. Every
configured engine now passes the final native-toggle persistence boundary, actual
pointer/scroll-readiness test helper and all original content/feedback/policy
assertions. No assertions, timeouts, retries or browser security settings changed
after the restart to achieve this result.

Agent also re-read the final-run WebKit 320px/enlarged-text front and longest-back
PNGs: no mirrored face or clipped example, expected white/navy/teal cues and
independent explored indication. The intentionally taller short front remains an
intrinsic-height layout difference, not reproduced clipping. This is file-based
review only. Actual browser 200% zoom, real animation/AT/device/interactive-print
checks remain separately pending; no new manual browser checks are claimed.

The earlier Mach-port/environment blocker is **not observed after restart** in
this complete passing run. Earlier failures and diagnostic evidence remain above;
the result is not a claim of a universal macOS/Firefox root-cause repair.

**Checkpoint 4.3 verified.** All three component families/five sequence profiles
work independently and through the verified store/adapters/completion/navigation,
without hydration writes, lost credit, clipping or legacy style leakage in the
listed checks. Opening's current-answer gate exception is preserved. Required
cumulative unit/component/navigation/storage/production/pilot/replay coverage now
passes with no blocking verification gap for this checkpoint.

Overall **milestone 4 remains incomplete**. **Next unverified checkpoint: 4.4**.
Stop at the requested 4.3 boundary: no writing/checklist/reference integration,
general renderer, live cutover, commit or publication is authorized by this result.
