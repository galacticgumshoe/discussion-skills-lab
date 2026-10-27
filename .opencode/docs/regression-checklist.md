# Preservation regression checklist

## Middle milestone-5 owner acceptance (2026-10-27)

The owner reviewed all Middle pages, accepted the final corrections, and reported
accessibility and print-preview testing in **Safari and Chrome** complete. These
are owner-reported manual checks, not agent-performed tests; browser versions,
assistive technology, device and actual zoom coverage were not specified. Middle's
owner-side browser verification is accepted as complete. Historical evidence's
pending manual statements describe the earlier sessions, not this final status.
See the final milestone-5 handoff for automated evidence chronology and limits.

## Development requirements and commands

Node **22 or newer**, npm and Git with pinned objects for
`0b5d2297e7cbc19bd59cde750492dd28e3983ca0` are required for tests only. No package
installation or build is needed to publish/serve the site. Deployment configuration
is unchanged; the package manifest remains development-only.

```sh
npm ci
npx playwright install chromium firefox webkit
npm run test:unit
npm run validate:content
npm run test:browser
npm run audit:production
```

On Linux, browser OS dependencies may require `npx playwright install --with-deps`;
obtain appropriate system-install permission first. The original capture session used an official,
SHA-256-verified Node v22.23.4 darwin-arm64 archive in OpenCode's approved temporary
directory because Node was absent from PATH. No global Node/npm upgrade was made.
Session commands prefixed `env PATH="<approved temp>/node-v22.23.4-darwin-arm64/bin:$PATH"`.
Playwright is development-only and pinned by `package-lock.json`.

### Normal local Node setup

The owner subsequently installed Node v22.23.4 through fnm. npm/npx are bundled
with Node; do not install them separately. For zsh, initialize fnm in `~/.zshrc`
with `eval "$(fnm env --use-on-cd --shell zsh)"`. An agent shell without Node on
PATH can initialize its own process without modifying a shell profile:

```sh
eval "$(fnm env --shell zsh)"
fnm use 22
node --version
```

### macOS 27 Firefox application-data isolation

On this macOS 27.0.1 Apple Silicon host, the pinned Firefox 151.0 launches and all
47 Firefox tests pass when given an isolated application-data home. Without it,
headless startup times out and headed startup shows a misleading **Profile Missing**
dialog. See [diagnosis and results](evidence/firefox-blocker.md).

Use a **fresh temporary directory per invocation**, scoped to the command and its
children (including Firefox); do not reuse the diagnostic directory or permanently
export this variable in a shell profile:

```sh
env CFFIXED_USER_HOME="$(mktemp -d)" \
  npm run test:browser -- --project=firefox --workers=1 --max-failures=1
```

For a full default-suite run on this host, use the same isolation:

```sh
env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser
```

The Firefox-only command passed in the owner's Terminal; the isolated full default
command also passed during milestones 2–3 (see the append-only handoffs). The override changes
Firefox's application-data home, not student storage keys, policies or assertions.
No sudo, Full Disk Access, security disabling, personal browser profile, browser
patching or dependency upgrade is required. It is a host workaround, not a universal
requirement on other operating systems. `playwright.config.mjs` is unchanged.

`npm run test:serve` prints a random `http://127.0.0.1:<port>` URL. The browser
runner also chooses a random local port and starts/stops its own server. It serves:

- `/` and `/discussion-skills-lab/`: same checkout, no copies/redirects;
- `/__original/` and `/__original/discussion-skills-lab/`: fixed allowlisted Git bytes;
- `/__fixtures/`: isolated fixture files, not production routes.

Traversal, encoded traversal, backslashes, NULs, double-encoding, non-allowlisted
production paths and non-GET/HEAD methods are rejected. Never run test restoration
against the published site or a personal browser profile: localStorage is
**origin-scoped**, not path-scoped. `python3 -m http.server 8000` remains sufficient
for normal production-file serving, but does not implement test replay routes.

## Automated coverage

### Milestone 4 checkpoint 4.1

`tests/unit/progress-adapters.test.mjs` exercises every sealed lesson progress
fixture, all fixed maps/options, zero, drafts, unknown properties/UI versions,
permanent completion, malformed containers, safe salvage, read denial and quota
retry. Runtime progress boundary checks agree with the deliberately open progress
schema. No content baseline or production entry is changed.

`tests/browser/storage-boundaries.spec.mjs` uses the isolated
`/__fixtures/harness/storage.html` page: actual localStorage, write-free hydration,
immediate synthetic draft/credit saves, DOM reorder/decoy fields, reload,
read-only unsafe records, denied/quota warnings and adapter → pinned original
replay on both replay mounts. It uses all four configured browser projects.

```sh
npm run test:unit
env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/storage-boundaries.spec.mjs
env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser
```

The final command includes the full existing production/pilot/replay baseline,
not just the new harness. Check the latest handoff/evidence for actual outcomes;
listed commands are not themselves passing evidence. Manual denied-storage/AT
checks remain distinct from scripted Storage exceptions/live-region assertions.

### Milestone 4 checkpoint 4.2

`tests/unit/completion.test.mjs` compares the stable-ID access rule against the
actual pinned legacy core for every completion subset in all three lessons. It
covers one-missing inputs, current-correct versus correct-ever policies, pure
monotonic union, no-op/UI-only updates, stored credit without detailed history,
and completion → store → legacy-index serialization. Harness excerpts and labels
are compared exactly against the pinned Opening source, not screenshots.

`tests/browser/navigation.spec.mjs` mounts explicit existing section elements in
`/__fixtures/harness/navigation.html`, using small test-only gates and the verified
store/Opening adapter. It covers rail/mobile selection, collapse, exact access
with zero/non-contiguous progress, h1/h2/h3 focus, successful-only scroll reset,
bottom controls/reference access, progress maximum/counts, meaningful-only
completion, no hydration/no-op writes, permanent credit, refresh-to-first,
DOM reorder/decoys, cleanup/remount, and corrupt/quota in-memory unlocking.
No production lesson policy, shared shell, component, or bootstrap is introduced.

```sh
npm run test:unit
env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/navigation.spec.mjs tests/browser/storage-boundaries.spec.mjs
npm run validate:content
env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser
```

Use all established projects, including Firefox with command-scoped application
data isolation. The full command must include the existing production/pilot/replay
baseline. Percentage width assertions allow CSSOM numeric serialization precision,
not incorrect counts or overflow. WebKit button pointer clicks do not imply focus;
keyboard focus retention is tested with explicit focus/Enter. Real AT/mobile-device
navigation and actual zoom remain pending unless separately recorded; no manual
check is inferred from automated focus/scroll/live-region assertions.

### Milestone 4 checkpoint 4.3

`tests/unit/components.test.mjs` checks all five sequence profiles, all 46 reused
sequence questions/options/keys/feedback against sealed banks, codec-compatible
identities for every option, the current-answer exception, and no live imports.
`tests/browser/components.spec.mjs` directly mounts attributed baseline excerpts
on `components.html?lesson=opening|middle|final` (optional `&reorder`). No legacy
writer or general renderer is loaded. Checks include:

- Native click/Enter/Space, one callback per activation, visible explored credit
  independent of front/back/open state, inactive-face ARIA/active description.
- Zero hydration/update writes/events, native queued detail-toggle suppression,
  old-handler teardown, duplicate-mount rejection and repeated remounts.
- Every required question profile, shared/per-option source feedback, enabled
  alternatives after credit, independent latest choice/earned score, Opening's
  current-correct gate and first-unearned retry focus/reset.
- Stable same-question option focus/live-region nodes, immediate represented
  cursor saves, adapter save/reload including reordered hosts/items/options,
  Middle global card indexes and Final global openness/local exploration.
- White fronts/navy backs/teal cues, intrinsic long-card geometry at 320px with
  enlarged text, longest existing baseline face, horizontal 3D transform,
  reduced-motion zero transition and stylesheet-on/off legacy-decoy comparison.

```sh
npm run test:unit
env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/components.spec.mjs
npm run validate:content
env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser
```

Use all four projects, not Chromium alone. The full command includes existing
navigation/storage/production/pilot/replay tests. The component screenshots and
geometry checks are automated evidence, **not actual 200% browser zoom**, real
animation/AT or physical mobile testing. Manually check normal and reduced-motion
flips, all long faces at actual 200% zoom, native details/Opening timeline expanded
states, screen-reader face descriptions and stable feedback announcements on each
target browser/device; record browser/version/actions separately. Those checks
remain pending unless explicitly recorded in the latest handoff/evidence.

Native details change their DOM `open` attribute before dispatching the queued
`toggle` event; persistence assertions await the exact store value, not only the
attribute. For baseline Middle application choices, the real pointer helper also
observes actual post-scroll target/viewport stability before clicking. This bounded
readiness check follows trace evidence of smooth scrolling continuing across a
Firefox input; it does not disable motion, force activation, add automatic retries,
or relax content/feedback assertions. Evidence: `evidence/milestone-4-3/production-scroll-observation.json`.

### Milestone 4 checkpoint 4.4

`tests/unit/formatters.test.mjs` compares all three algorithms/templates against
actual pinned handler snippets. Synthetic cases include terminal punctuation,
first-character-only lowercasing, zero, Unicode/multiline drafts, missing inputs,
plain-text HTML/expression-looking values and disallowed template names/expressions.
It also asserts no live imports/storage/field discovery/grading/evaluation.

`tests/browser/writing-reference.spec.mjs` uses only direct mounts on
`/__fixtures/harness/writing-reference.html?lesson=opening|middle|final`:

- All three completed fixtures hydrate/update/remount with zero events/writes;
  labels/placeholders/rows/modes, fields, checks and model contents retain identities.
- Immediate drafts, editable Opening/Final output, readonly Middle output;
  explicit-only assembly, edited-output/caret preservation, reload/reordered hosts.
- Opening 34/35/self-check boundary and optional session-only toggle model;
  optional Middle show-only models use only the existing v1 extension; Final's
  required show-only model flags remain external gate inputs. Clearing/unchecking
  never revokes section credit.
- Secure clipboard success, scripted denial/unavailability, exact existing-field
  selection, one scoped no-ID/name fallback, Escape/focus restoration, no fallback
  progress fields, lifecycle cleanup and late-response suppression. Scripted API
  stubs are not manual permission-dialog evidence.
- Independent reference startup while writing content fails; zero-credit access,
  loading/error/retry, unchanged raw saved draft, one Print handler after remount,
  exact reference semantic equivalence and native-print media isolation. Includes
  root and repository-prefix content URLs; Chromium emits Letter PDFs from an
  ordinary failed-activity view. Uses the existing renderer/schema, not a second
  reference implementation or a production print cleanup.
- 320px/enlarged-text no-overflow checks; these are not actual browser zoom/AT.

```sh
npm run test:unit
env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/writing-reference.spec.mjs
npm run validate:content
env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser
```

Use every configured project. The full suite rechecks affected earlier components,
navigation/storage and the unchanged production/pilot/replay baseline. Manually
check field editing/selection/clipboard permission dialogs, model/checklist keyboard
and screen-reader behavior, actual zoom, and Chrome/Firefox/Safari Print-button and
Cmd/Ctrl+P previews from ordinary/reference views (Letter/backgrounds/scaling/no
clipping/controls/leading blank). Record only actions actually performed; these
remain pending unless the handoff/evidence supplies dated results.

### Milestone 4 checkpoint 4.5

`tests/unit/lesson-validation.test.mjs` adds full draft-07 config/manifest/activity
schemas plus lightweight runtime/semantic parity over shared invalid fixtures:
versions, unknown keys/types/profiles, IDs/duplicates/options/feedback, sources,
layout/tone/depth, gates, writing templates/fields/modes/bindings. Development graph
validation checks missing files, declared/file-ID equality, order/adapter identity
and realpath/symlink containment. Byte-exact reference copies and all reused
question keys/options/feedback remain independent content assertions.

`tests/browser/lesson-harness.spec.mjs` runs the real `mountLesson` bootstrap,
not a test-only alternate orchestrator, on both
`/__fixtures/harness/lesson.html` and
`/discussion-skills-lab/__fixtures/harness/lesson.html` in every configured project:

- Validated config -> manifest -> activities, then one progress read/decode,
  silent component hydration, real interaction/unlocking, fixed-adapter saves,
  refresh-to-first and unchanged hydration. No legacy engine/second writer.
- All six standard types, bounded groups and sanitized Markdown; independent
  sealed extraction compares faces/panels/questions/options/keys/feedback/writing/
  checklist data and all ten headings, not screenshot pixels.
- Every shared invalid fixture in actual browser runtime; invalid metadata fails
  before storage read and offers retry. Missing/invalid activity retries preserve
  drafts/credit and do not block reference access or print preparation.
- Ordinary Markdown failure prevents new section credit. Loading/retry cannot
  fabricate completion; the next meaningful activity change evaluates readiness.
- References preload even while activity validation is pending, using the existing
  renderer/loader. Body failure/retry is independent from activity gates. One Print
  handler and reference-only native print-media/PDF output from an ordinary view.
- Separate corrupt/denied/quota persistence warnings with session-only credit;
  no destructive fallback writes, including bootstrap/reload/remount.
- Destroy during pending load, late-response suppression, repeated remount,
  old-node cleanup, one callback/Print handler and a single writer reservation.
- Bounded static registry rejects arbitrary types/module strings; an intentionally
  unavailable standard renderer fails only its block. DOM reorder/decoy fields
  do not affect the fixed legacy serialization map.

```sh
npm run validate:content
npm run test:unit
env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/lesson-harness.spec.mjs
env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser
```

The **entire** final suite is required, including all earlier checkpoint harnesses,
production lesson journeys/security/pilot and original-engine replay. Do not
substitute the final happy path or a Chromium-only run. Check actual results in
`evidence/milestone-4-5-verification.md`/the latest handoff; commands listed here are
not evidence of execution. New bootstrap/shell fixture manual print previews,
screen readers, actual zoom and device checks remain distinct follow-ups; prior
owner 4.4 acceptance is retained without inventing new 4.5 manual results.

### Milestone 5 pre-cutover review units

Current non-live question/checklist and displayed-reference review commands:

```sh
npm run test:unit
npm run validate:content
env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/middle-migration.spec.mjs tests/browser/middle-reference.spec.mjs tests/browser/reference-loading.spec.mjs
env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser
```

The first two Middle harnesses use production content files but do **not** convert
public Middle or establish a full-lesson acceptance result. Exact source/gate/
answer/checklist/archive/reference assertions are independent of screenshots.
Actual root/prefix content-request paths are asserted, not only harness URLs.
Keep earlier failed full/focused results and their diagnostics in milestone-5
evidence; a diagnostic pass cannot replace final cumulative coverage.

The first reference PDF capture caught the inherited reveal animation in a
reference-view image; retain it and create separately named settled captures
after waiting for real `getAnimations().finished` promises, not an arbitrary
delay, pixel mask or CSS rewrite. Screen images do not establish print contrast,
actual 200% zoom, AT or interactive preview success. Complete the entire lesson
graph/extraction and all required gates/fixtures/keyboard/failure/visual/print
checks before the atomic public cutover. See latest handoff and
`evidence/milestone-5-{questions,reference}-verification.md` for actual results.

### Existing baseline and reference pipeline

Milestone 3 adds `validate:content` (Ajv 8.20.0, development-only) plus runtime/schema
parity for shared invalid reference fixtures, realpath/existence checks, checked
root/prefix include URLs, vendor SHA-256 pins, sanitized Markdown/security fixtures,
exact reference text/emphasis/order/accent comparison, startup preload, slow/error
print notices, retry, unchanged progress/write counts and local-only dependencies.
Final's success readiness is awaited before existing print assertions; failure
paths are asserted separately, never hidden by a generic readiness wait. Both
ordinary/reference-view Chromium PDFs are captured. Interactive browser previews
are still separate manual checks; see `evidence/milestone-3-verification.md`.

- Unit: frozen source hashes, exhaustive archived lines and data banks/answers;
  authored map/initialized field and card ordering; actual original core policy;
  fixture provenance; every file on both current/replay mounts; MIME/traversal and
  server lifecycle.
- Browser projects: Chromium, Firefox, WebKit desktop 1440×1000, plus mobile
  Chromium 390×844. Isolated contexts; root and repository-prefix mounts.
- Fresh navigation: first/reference only, mobile selector disabled options,
  collapsed rail, bottom controls, reference with zero completion.
- Each lesson: full real UI completion, one missing prerequisite per counted page,
  all question-bank options/feedback, keyboard/click card flip-back, repeated detail
  exploration, exact assembly punctuation, readonly/editable output, 34/35-character
  Opening boundary, optional/required models/checks, durable correct-ever credit.
- Restores: observed partial/mid/completed/changed answers, empty/zero/Unicode,
  non-contiguous completed pages, Opening absent-earned fallback, both original
  replay mounts. Unsafe records and known losses are characterized separately.
- Clipboard rejection and current persistence gaps are tested explicitly.
- Print: reference-only computed visibility even from page 0 in all engines;
  Chromium PDFs generated under ignored `test-results/`. Canonical PDFs retained
  under `tests/fixtures/visual/`.

Canonical snapshots are **read-only evidence**, not auto-updating expectations.
`tests/fixtures/manifest.json` seals all canonical source, content, maps, progress
and visual files with SHA-256; unit tests verify it. The seal itself is created
once by `seal-fixtures.mjs` using exclusive creation, never automatically updated.
`freeze-source.mjs`, `freeze-edge-fixtures.mjs`, `capture-browser.mjs` are one-time
capture tools, deliberately absent from ordinary npm test scripts. Exclusive
creation rejects existing files. Browser capture `--resume` retains existing files
without updating them and creates only missing artifacts after an interrupted
capture. Do not remove canonical files to bypass that protection. Later migrations
must introduce their own reviewed content assertions, keeping original/replay
evidence intact. `audit:production` is specifically a milestone-1 boundary check,
not a permanent ban on production edits in later milestones.

## Historical evidence and visual review

`tests/fixtures/visual/` contains homepage and all lessons at desktop/mobile,
reference screen captures, print-media captures and three Chromium Letter PDFs.
`environment.json` records browser/Node/platform, viewport, font probes and external
request failures. No instructional regions are masked; no CDN or font mock is used.
Capture waits for `document.fonts.ready`; browser/font rasterization is not a
zero-pixel gate. Captures are historical comparison evidence, not instructions to
reproduce incidental wrapping or spacing.

The original baseline session inspected homepage/all lesson desktop and mobile initial captures,
settled Middle/Final mobile card backs and builder captures, Middle print-media
image, and the three reference PDFs (text extraction; rendered page inspection where
available). They retain readable grouping and reference content; the PDFs have
one page each and no leading blank page or lesson controls. **This does not replace
interactive print-preview checks.** No production presentation differences were
introduced.

The first supplementary explored captures caught live transitions; originals are
retained and explicitly not approved as settled-card references. Separately named
`*-settled-mobile.png` captures wait for actual CSS animations to finish. This is
capture-readiness correction, not a production layout change or baseline overwrite.
`font-readiness*.json` records actual font faces/weights in addition to the initial
400-weight probes; loaded subsets and used heading weights were inspected.

The original Firefox launch blocker is **resolved with the environment workaround
above**: all 47 Firefox checks passed in the owner's Terminal. Initial failures
remain recorded in [`evidence/firefox-blocker.md`](evidence/firefox-blocker.md).
The sandbox-extension/framebuffer messages alone did not establish the root cause.
Firefox remains configured and no tests were skipped or mocked to obtain the pass.

Ordinary reports, traces, failure screenshots, temporary PDFs and node_modules are
narrowly ignored. Do not commit browser profiles, traces or whole test reports.
Small durable execution summaries belong in `.opencode/docs/evidence/`.

## Manual browser / accessibility / print checklist

Status is **pending unless an explicit dated result below or in the handoff says
otherwise**. Use synthetic drafts and a fresh profile.

| Check | Chrome | Firefox | Safari / iOS | Android Chrome |
| --- | --- | --- | --- | --- |
| Tab/Shift+Tab through navigation, options, cards, tabs, details and writing; Enter/Space; visible focus after updates | Pending | Pending | Pending | Pending |
| 200% zoom and 320px width: every front/back, long feedback and draft controls unclipped; no horizontal overflow | Pending | Pending | Pending | Pending |
| Screen reader: inactive faces, meaningful card names, correct expanded states, task tab/panel associations, stable feedback announcements | Pending (AT) | Pending (AT) | Pending (VoiceOver) | Pending (TalkBack) |
| Complete/reload/review, flip back then reload, clear draft/uncheck after credit without relocking | Automated subset; manual pending | Automated subset; manual pending | Pending | Pending |
| Denied storage/clipboard; no real data loss or unusable copied text | Clipboard automated; storage manual pending | Clipboard automated; storage manual pending | Pending | Pending |
| Print button and Cmd/Ctrl+P from activity AND reference; Letter portrait preview with backgrounds on/off, page scale; no controls/questions/leading blanks/clipping | PDF automated; preview pending | Print media automated; preview pending | Preview pending | Device print pending |
| Homepage/lesson links under real repository subdirectory; external font readiness | Local automated; published site not used | Local automated | Pending | Pending |

Real devices, assistive technology and interactive preview remain pending because
no corresponding manual/device checks have been reported. They are explicit follow-up
checks, not fabricated approvals. Essential automated browser captures are required
before calling milestone 1 complete. Follow `.opencode/docs/refactor-status.md` for executed
commands/counts, remaining blockers and whether the next milestone is ready.

### Owner manual report — 2026-10-25, checkpoint 4.4 follow-up

- **Owner-reported pass, Chrome and Mac Safari:** print, writing, checklists,
  persistence, clipboard and zooming. Versions and individual print-preview
  permutations unspecified; this is not a fabricated exhaustive matrix.
- **Owner-reported pass, Chrome:** Tab/Shift+Tab across lesson controls, Enter
  activation, and left/right arrows within Opening's task-analysis tabs after focus.
- **Unresolved, Mac Safari:** Tab/Shift+Tab do not traverse live `opening.html`
  controls. Check System Settings → Keyboard → Keyboard navigation and Safari →
  Settings → Advanced → “Press Tab to highlight each item on a webpage”, then
  retest. See the official Apple link and source triage in 4.4 evidence. Neither
  an application defect nor a preferences-based fix is established yet.
- **Not tested:** screen readers, actual iPad/hardware-keyboard use; owner's iPhone
  has no keyboard. Mobile Safari is primarily touch-driven for this owner, and
  Safari/iPads are the priority for student interaction testing.
- **Manual Firefox:** owner explicitly declines functional testing; do not request
  it as a prerequisite. Keep the required automated four-project suite unchanged.

This dated report qualifies the general pending table above; it does not claim
unspecified browser versions/actions, assistive-technology success or mobile-device
coverage. Record the Safari settings retest outcome before calling its keyboard
workflow manually accepted. Do not bypass native navigation with a global Tab trap.

### Owner retest and acceptance — 2026-10-25

Owner confirms enabling **System Settings → Keyboard → Keyboard navigation**
restored the keyboard functionality in Mac Safari. The preceding unresolved
Safari keyboard item is now **resolved / owner-reported pass**, with no site-code
change. Combined with the earlier Chrome/Safari functional results, the owner
explicitly accepts **checkpoint 4.4 as fully validated**. No outstanding manual
checkpoint blocker remains. General unperformed device/AT/physical-print checks
remain honestly unverified, not inferred from this acceptance or reinstated as
4.4 blockers. Checkpoint 4.5 remains next and has not been started.

### Checkpoint 4.5 automated closure — 2026-10-25

The final entire suite passed **588/588** (147 per configured project), including
all earlier harnesses, original-engine compatibility and unchanged production
lessons/pilot on root/repository/replay mounts. Fresh content validation and
136/136 unit tests passed. Both generated root/prefix new-harness reference PDFs
were read as rendered pages/parsed text: full five groups, one readable Letter
page, no clipping/questions/drafts/controls/leading blank. This is file-based
review, not interactive browser preview. Full commands/report/PDF hashes and
ordered checkpoint index: `evidence/milestone-4-5-verification.md`.

Checkpoint 4.5 and milestone 4 are **complete**; no blocking verification gap
remains. Actual new-composition AT/real devices/iPad hardware keyboard/200% zoom/
animation/permission dialogs/interactive print permutations/physical printing
remain nonblocking manual follow-ups for later whole-lesson cutovers. Earlier owner
Chrome/Mac Safari 4.4 acceptance is preserved, not transformed into fabricated 4.5
manual results. Milestone 5 requires a separate implementation request.
# Milestone 5 whole-page regression checks

Run `npm run validate:content`, `npm run test:unit`, and the entire browser suite
after the atomic Middle cutover. On this host use a fresh command-scoped Firefox
home; `caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser`
also inhibits idle sleep during the command without changing browser settings.

`tests/browser/middle-lesson.spec.mjs` exercises the public page on root/prefix,
all eight gates/every alternative feedback, exact original rich prose/emphasis,
all valid old fixture hydration with zero writes, drafts/check/exploration/selection
restoration, immediate fields/models/cursors, retained wrong-after-credit,
comparison without saves, rollback through both original mounts, safe rich-body
failure/retry, corrupt/denied/quota storage, one Print button and fresh reference
printing from ordinary/reference views. It captures all section views and the long
card at 320px/enlarged text; these are not actual browser-zoom/manual evidence.

For owner follow-up: test the new public Middle in Chrome/Mac Safari, including
keyboard/touch cards, expandables, answers, model/copy/checklist, actual 200% zoom,
and Print-button/Cmd+P previews from fresh ordinary and reference views. Record
actual browser/version/actions; do not reattribute older milestone-4 acceptance.
Screen reader/physical-device/physical-print checks remain unclaimed when unavailable.

Milestone 5 exit: corrected-source entire suite passed **720/720** with
`caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- --workers=1`,
all four projects and both current/replay mounts, followed by 152/152 units and
passing content validation. On this host, single-worker execution is a verified
full-suite option when concurrent Firefox contexts are unstable; it changes no
assertion or browser security setting and is not a diagnosed universal fix.
Actual evidence/history: `evidence/milestone-5-cutover-verification.md`.
### Middle presentation comparisons

`tests/browser/middle-presentation.spec.mjs` compares the immutable original and
current Middle at 940px (narrow desktop/side-by-side), 1440px and 390px on both
mounts. It checks prose typography, panel palette, flow badges, relative vertical
spacing and card widths/heights; above 850px all three Welcome cards share one
row and their text wraps without overflow. The original mobile stack remains.
All-section checks compare annotated lead/note/instruction/label typography and
confirm rich Markdown panels use normal whitespace rather than preserving source
formatting newlines. This is computed-style/layout regression evidence, not a
pixel-perfect screenshot requirement or a substitute for content/gate tests.
See `evidence/milestone-5-middle-presentation.md` for actual results/manual limits.
