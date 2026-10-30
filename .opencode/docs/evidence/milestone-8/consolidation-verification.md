# Consolidation verification — working record

2026-10-30. This supplements the historical v3 evidence; it does not rewrite it.
**Milestone 8's T09/T10 consolidation removal is implemented.** No commit, push,
merge, publication, production runtime/CSS/content/storage/dependency change is
claimed. Assertion destinations/triage are in
[consolidation-coverage.md](consolidation-coverage.md).

## Approved T02/T08 removal

The owner's 2026-10-29 message explicitly approves all T02/T08 files. Before
removal, the 25 source files, replacement files, content evidence and CLI edits
matched `remaining-sources-v3.json`; baseline/canonical units and validation passed.
Only those 25 files and the two bounded CLI graph/message edits were removed.

Post-removal Node audit imports the real `startServer()`, checks all 25 absent
paths and their `git show HEAD:<path>` SHA-256 values against the reviewed source,
scans executable HTML/CSS/JS/MJS/JSON in production/scripts/tests, and requests
every retired fixture URL at both mounts. **Passed: 25 exact removals, zero
executable consumers, 44/44 retired fixture 404s, 8/8 public-entry 200s.**
This is not a blanket deletion of `tests/fixtures/harness/`.

## Units and content validation

Node v22.23.4, initialized with `eval "$(fnm env --shell zsh)"` and `fnm use 22`.

```sh
node --test --test-reporter=spec tests/unit/component-contracts.test.mjs tests/unit/lesson-boundaries.test.mjs tests/unit/completion.test.mjs tests/unit/progress-adapters.test.mjs tests/unit/baseline.test.mjs tests/unit/milestone-8.test.mjs tests/unit/opening-migration.test.mjs tests/unit/middle-migration.test.mjs tests/unit/final-migration.test.mjs
npm run validate:content
```

**Passed: 127/127 units, zero failures/skips; content validation passed.** Includes
all completion subsets against pinned original, precise one-missing lesson gates,
all canonical invalid cases, fixed mappings/opaque extension safety, exact source
content/formatter algorithms and baseline seals/replay allowlist. The earlier
new-unit selection also passed 57/57. The two old pre-cutover guard containers are
not included in this passing selection and are not silently marked repaired.

Independent source readers/templates remain exact function/data equivalents of
the two old modules. A read-only audit also passes 14 unchanged durable surfaces
(all except the intentionally revised checking guide), 74 relative linked file/
directory destinations, skill frontmatter/five workflows/safety and all five
wrapper routing/frontmatter/no-model/no-shell properties with 25 static argument
cases. Native `dsl-maintenance` loaded. `git diff --check` passes; protected
production/content/config/schema/dependency/license/skill/command surfaces match
HEAD. No interactive slash-command/model-compliance claim.

Two ad hoc audit bugs were corrected in the audits, not the guides: directory
links were initially read as files (`EISDIR`), and a case-sensitive prose search
looked for lowercase `plan-only` rather than the actual `Plan-only` instruction.

## T09 browser checks

All commands use disposable browser contexts/local test origins and the real
exported APIs/public pages. Root and `/discussion-skills-lab/` are explicit in
each replacement spec. No personal browser profile or stored student work is used.

The initial Chromium API attempt passed 20 component cases before four navigation
setup failures. The disposable shell was not configured/unhidden and lacked its
optional reference shortcut; fixing that test setup changed no production code.
The next navigation/progress/public-writing selection passed **48/48**. Added
public source-label/fixed-index/panel-restoration checks passed **6/6**; two direct
reference cases passed after supplying the real `#views > .lesson-view` print
structure. These are development scopes, not a final all-project pass.

```sh
caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/component-contracts.spec.mjs tests/browser/navigation-contracts.spec.mjs tests/browser/progress-contracts.spec.mjs tests/browser/writing-controls.spec.mjs tests/browser/middle-questions.spec.mjs tests/browser/lesson-boundaries.spec.mjs tests/browser/controller-lifecycle.spec.mjs --workers=1 --max-failures=1 --reporter=line --output=test-results/m8-t09-consolidated-all-projects
```

**Initial all-project attempt: 219 passed, one WebKit failure, 204 not run
(424 total).** All 106 Chromium and 106 Firefox cases passed. The new generic
card probe's already-enlarged wide-to-narrow stress setup overflowed in WebKit.
The old `components.spec.mjs --grep 'all card faces/long' --project=webkit` test
was run as a diagnostic and **passed 1/1**. First replacing invented 500-character
text with the actual pinned source's longest face still failed; matching the old
narrow-then-enlarged order passed **2/2 WebKit mounts**. No assertion tolerance or
production CSS was changed. This does not certify arbitrary resize sequences.

```sh
caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/component-contracts.spec.mjs --grep 'card/panel APIs' --workers=1 --max-failures=1 --reporter=line --output=test-results/m8-t09-card-final-all-projects
```

**Passed 8/8**, all four projects and both mounts, final corrected card/panel
source.

```sh
caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/component-contracts.spec.mjs tests/browser/navigation-contracts.spec.mjs tests/browser/progress-contracts.spec.mjs tests/browser/writing-controls.spec.mjs tests/browser/middle-questions.spec.mjs tests/browser/lesson-boundaries.spec.mjs tests/browser/controller-lifecycle.spec.mjs --project=webkit --project=mobile-chromium --workers=2 --max-failures=1 --reporter=line --output=test-results/m8-t09-webkit-mobile-verified
```

**Passed 212/212**, WebKit/mobile Chromium, both mounts, 9.7 minutes. Combined with
the initial attempt's unchanged 106 Chromium + 106 Firefox passes and the final
eight-case corrected card rerun, **all 424 distinct selected cases have passing
coverage**. This is an explicitly combined result, **not** one clean 424-case run
and not the whole-site suite. No skips or runner error in the two final reruns.
The checking guide now names these verified replacement checks in its table.

The direct writing/checklist probe was subsequently extended with the retired
generic writing test's 320px/200% own-container fit assertions. The same command
as the eight-case card rerun, with `--grep 'writing/checklist API'` and output
`test-results/m8-t09-writing-enlargement-all-projects`, **passed 8/8**, all four
projects/both mounts. A licensing comment now explicitly attributes the pinned
longest-face excerpt; no executable code changed after that check. The combined
case identities, per-run summaries and raw-output hashes are in
`consolidation-t09-results.json`.

## T10 development diagnostics

- Initial one-lesson checks found missing `strong` selection and a title-only
  Markdown paragraph double-counted as body copy; fixed role extraction, not CSS.
  An initial anchored grep selected no tests and is not a verification result.
- `m8-t10-role-audit`: three root-mount cases failed. The new helper over-applied
  paragraph/container property comparisons and had wrong/missing source-role
  selectors. All mismatches were collected with soft assertions rather than
  stopping at the first one; original output retained as failure evidence.
- `m8-t10-corrected-roles`: three cases failed the first readiness predicate (which
  wrongly demanded generated `.font-bold` even on current structural HTML without
  that class). One trace also had a runner byte-stream/ZIP error. No pass claim.
- `m8-t10-composed-diagnostic`: two passed, four failed, eight not run. One original
  failed external Tailwind readiness; the others exposed neutral versus active
  quiz jump paint and newly over-broad whole-root text-enlargement assertions.
  Explicit dependency waiting remains. The old exact scopes and distinct Middle
  mobile Welcome rule are preserved; no production styling is changed to satisfy
  an invented assertion. See the coverage record/known issues for extra findings.

The corrected composed Chromium selection and final cross-engine presentation
checks remain pending at this working-record point. Old T10 suites remain enabled.

Further diagnostics (not passing-matrix evidence):

- `m8-t10-scoped-diagnostic`: **6 passed, four failed, four not run**. One neutral
  original application option was hovered; the enlarged Middle traversal included
  non-card sections outside the old scope; an immediate Final rem-size measurement
  ran before layout. Corrected pointer/scope/layout setup only.
- `m8-t10-narrow-final-diagnostic`: **3 passed, two failed, three not run**. One
  Final title wait timed out in `document.fonts.ready`, and one current-page check
  added a Tailwind-health prerequisite absent from the retired narrow tests. The
  narrowed public test now uses the original font wait plus layout frames for
  text-size toggles. Paired original/current paint checks still require actual
  Tailwind readiness and never accept an unstyled oracle.
- First all-project role attempt (`m8-t10-role-final-all-projects`): **2 passed,
  three failed, 19 not run**, all executed cases Chromium. The two Opening mounts
  pass. Final encountered the unchanged external Tailwind failure. Middle's faster
  reduced-motion traversal raced selected/feedback paint; the helper now explicitly
  waits for real `aria-pressed` and settled rendering before measuring each state.
  Full failing case details/stats/raw report hash are retained in
  `consolidation-t10-role-results.json`. No Firefox/WebKit/mobile role pass is
  inferred from an early-stopped run.

Follow-up Middle state-settlement and cross-project narrow/spacing checks are
running separately; their results must be recorded before a final T10 claim.
Historical/diagnostic screenshots and contexts are separately retained in
`consolidation-development-artifacts.json` (not approved visual baselines).

### Subsequent completed attempts and bounded follow-ups

- Non-Firefox role run (Chromium/WebKit/mobile, three workers): **8 passed, four
  failed, six not run**, 766.973683s. Failures were unchanged Tailwind readiness
  (Chromium Final prefix/mobile Opening) and the merged 300-second Middle budget
  (both WebKit mounts); the stopped WebKit Final-prefix case is not a pass.
  `consolidation-t10-role-nonfirefox-results.json` preserves exact identities.
- Firefox role run (fresh command-scoped home/one worker): **5 passed, one
  300-second Middle-root timeout**, 1021.607006s; zero skipped/flaky/runner errors.
  `consolidation-t10-role-firefox-results.json` preserves the result. The root
  case expired late in question measurement; no completed paint case is claimed
  for it. Existing external assets remain unchanged; no fake stylesheet or
  offline substitute is introduced.
- First all-project narrow/spacing run: **31 passed, one Firefox Final-root overall
  timeout**, zero skipped/flaky/runner errors, 906.392714s. Trace inspection shows
  it had reached reference-only print and was spending remote calls on each of
  194 hidden controls, not failing a hidden-control assertion. The equivalent
  batched visibility assertion removes that redundant work.
- Batched all-project narrow attempt: **17 passed, two WebKit layout failures,
  13 not run**, 227.9807s. A subsequent targeted WebKit attempt passes Middle root
  but exposes the newly repeated Final root-size toggle lifecycle (one failure,
  two not run). The Final title sweep now uses the old single-enlargement lifecycle;
  final follow-up remains pending, not marked green.
- Dedicated public model-mode destination attempt: **2 Chromium passes, one Final
  setup failure, 21 not run**. The completed legacy seed already owned earned
  model-view facts; its encoder correctly retained them. The isolated test now
  explicitly seeds the two unviewed legacy booleans before testing the first model
  reveal. This is a fixture setup correction, not a persistence repair. The
  corrected 24-case selection is pending.

The Middle role follow-up now matches the retired suites' exact fixture-cursor
scope, rather than introducing an every-question paint expansion already covered
by the independent public question tests. 940px applies only to the old Welcome
grouping check. The merged whole-lesson case has a 600-second budget without
changing assertions/tolerances. See the coverage record for each bounded decision.

Latest completed follow-ups:

- Corrected public model-mode destination: **24/24 passed**, all four projects,
  both mounts, 5.6 minutes. Exact command:
  `caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/writing-controls.spec.mjs --grep 'public model modes' --workers=1 --max-failures=1 --reporter=line --output=test-results/m8-model-mode-destinations-corrected`.
  T09 now has **448 distinct cases with combined passing coverage**, 112/project:
  424 core cases plus these 24 explicit visibility/mode/restore/draft assertions.
  This is not one clean 448-case invocation; `consolidation-t09-results.json`
  retains every successful identity and each failed/corrected phase separately.
- Exact old-scope Middle role follow-up: **2/2 Firefox mounts passed**, six minutes,
  using a fresh command-scoped home/one worker and
  `--grep 'middle all authored' --project=firefox --workers=1 --max-failures=1 --reporter=line --output=test-results/m8-t10-middle-scoped-firefox`.
  This supersedes the root timeout for that corrected role scope, not the prior
  failed attempt's result. Its three activity widths and 940px Welcome check pass.
- Separate Final single-enlargement title lifecycle: **4/4 WebKit Middle/Final
  narrow cases passed**, both mounts, 2.3 minutes, command
  `npm run test:browser -- tests/browser/presentation-contracts.spec.mjs --grep 'middle narrow|final narrow' --project=webkit --workers=1 --max-failures=1 --reporter=line --output=test-results/m8-t10-webkit-title-sweep`.
  Other earlier narrow results remain explicit; a final full-source narrow run
  has not yet been claimed.
- Remaining mobile role attempt: **zero passed, one Tailwind-readiness failure,
  two not run**, 65.414306s. Trace network inspection confirms the real versioned
  Tailwind script request failed with `net::ERR_TIMED_OUT` (no response/status),
  not a successful stylesheet with changed colors. No CDN replacement, fake
  stylesheet, security disable, skipped assertion or silent pass is introduced.
  Report: `consolidation-t10-mobile-remaining-results.json`.

- Remaining non-Firefox selection subsequently **passed 9/9**, zero skips/flaky/
  runner errors, 677.673657s, one worker:
  `caffeinate -i npm run test:browser -- tests/browser/presentation-contracts.spec.mjs --grep 'middle all authored| /discussion-skills-lab/final all authored' --project=chromium --project=webkit --project=mobile-chromium --workers=1 --max-failures=2 --reporter=json --output=test-results/m8-t10-remaining-nonfirefox`.
  Together with the corrected Firefox Middle cases and unaffected successful
  Opening/Final cases, the combined role scope is now **21/24**, six each in
  Chromium/Firefox/WebKit and three mobile cases. Exact identities and evidence
  hashes are in `consolidation-t10-role-coverage.json`.

### Clean all-project role matrix

After the bounded setup retry below, the complete role selection passed in **one
clean invocation: 24/24**, six cases in each of Chromium/Firefox/WebKit/mobile
Chromium, both mounts, zero skipped/unexpected/flaky, 15.3 minutes, one worker:

```sh
caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/presentation-contracts.spec.mjs --grep 'all authored' --workers=1 --max-failures=1 --reporter=line
```

The line reporter intentionally omits `results.json`; `consolidation-t10-role-clean-run.log`,
`consolidation-t10-role-clean-last-run.json` (`status: passed`, empty `failedTests`)
and the identity summary `consolidation-t10-role-clean-results.json` are the durable
evidence, with SHA-256 hashes in the summary. The raw log's final `cp` error is the
harness expecting the deliberately absent report file, not a test failure. This
supersedes the earlier combined 21/24 role patchwork as the T10 role result; the
failed attempts remain recorded, not retroactively passing.

### Tailwind readiness retry (setup resilience)

The remaining mobile and some earlier failures were traced to the real pinned
Tailwind script request failing with `net::ERR_TIMED_OUT` (no response/status), not
to a successful stylesheet with changed paint. The CDN and Google Fonts remained
reachable from `curl` and a direct Chromium probe while Playwright requests
intermittently timed out.

`visitWithStylesheet()` now reloads the same public page up to three times and
requires the actual generated Tailwind stylesheet on every attempt, with a 20-second
per-attempt readiness timeout. A persistent outage still fails explicitly as
`Tailwind CDN unavailable after 3 page loads`; no fake stylesheet, dependency
replacement, security change, skipped assertion or unstyled oracle is introduced.
This changed test setup only: no production runtime/content/CSS/storage/dependency.

### Exact v4 scope, approval and consumer closure

The refreshed `consolidation-sources-v4.json` recorded all 27 whole-file candidates
matching their reviewed hashes, the two reviewed stale-guard differences from HEAD
(no other candidate differed), the bounded completion block/import and its expected
post-removal file hash (`fbf7f46b…`). A literal closure scan found no executable
consumer outside that scope: the four candidate browser specs referenced their own
fixtures, the fixture modules loaded only from their candidate pages, and the
retained `tests/unit/completion.test.mjs` final test/import was the only
out-of-scope consumer and was itself in the bounded removal scope. No production
entry imported or linked the fixture HTML/CSS/modules.

The owner approved that exact scope on 2026-10-30. Immediately before deletion,
`consolidation-v4-closure-audit.json` confirmed every candidate hash and the
completion block still matched the snapshot, all 12 fixture paths returned 200 at
both mounts and the four public entries returned 200. The 18 T09 whole files, nine
T10 whole files and the bounded completion test/unused import were then removed.

### Post-removal audit

`consolidation-v4-post-removal-audit.json` uses the real `startServer()` and
records: **27/27 whole files absent**, **24/24 removed-fixture URL checks return
ordinary 404s** at `/__fixtures/...` and `/discussion-skills-lab/__fixtures/...`
with no fallback or replay redirect, **8/8 public entries return 200**, and the
completion file matches the reviewed expected SHA-256
`fbf7f46b1cf3418aec80a7ec5fd792c687c95057a8c3926ea5c490228fb3448e` (157 lines).
The affected unit selection passes **126/126** (one fewer than the previous 127
because the bounded completion test was removed), zero failures/skips, and
`npm run validate:content` passes.

Browser closure for the five remaining replacement specs
(`component-contracts`, `navigation-contracts`, `progress-contracts`,
`writing-controls` and `presentation-contracts`) passed **368/368 in one clean
invocation**, 37.3 minutes, one worker, 92 cases in each of Chromium/Firefox/
WebKit/mobile Chromium, zero skipped/unexpected/flaky:

```sh
caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/component-contracts.spec.mjs tests/browser/navigation-contracts.spec.mjs tests/browser/progress-contracts.spec.mjs tests/browser/writing-controls.spec.mjs tests/browser/presentation-contracts.spec.mjs --workers=1 --max-failures=1
```

`consolidation-post-removal-browser-summary.json` records the identity/counts and
SHA-256 hashes; the raw log, Playwright `results.json` (`expected: 368`, zero
skipped/unexpected/flaky) and `.last-run.json` (`status: passed`, empty
`failedTests`) are retained beside it. This is a targeted replacement-spec
closure, not the whole-site browser suite.

## Limits / remaining gates

This is targeted cleanup verification, not a whole-site browser/unit suite. T10's
role matrix and narrow/spacing selection have passing coverage, the exact T09/T10
scope was approved and removed, and post-removal units, content validation,
removed-fixture 404s and the 368-case replacement-spec browser closure pass.

No new GUI Chrome/Firefox/Safari print preview, physical print, actual browser
zoom, device/iOS/Android, assistive-technology or screenshot visual acceptance
was performed. Headless print media/CSS enlargement/WebKit are not those checks.
No content baseline/capture/seal was updated. Publication remains separately
unauthorized.
