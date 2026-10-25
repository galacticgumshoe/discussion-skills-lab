# Milestone 4 checkpoint 4.4 verification — 2026-10-25

Starting HEAD: `da38eaea3e476e6c05bda5520a1b1f89bf72e121`.
Branch: `refactor/shared-components`. Existing uncommitted 4.1–4.3 implementation,
test-readiness helper/evidence/docs and milestone-3 owner clarification are inherited
and preserved. Only 4.4 is requested; no 4.5 renderer/bootstrap, live cutover, commit
or publication. Prior 4.3 restart evidence inspected; fresh prerequisite checks
passed before implementation. No production HTML/engine/style/pilot, earlier API,
codec/store, schema, dependency, runner or sealed fixture changed.

All npm commands use process-local Node v22.23.4 setup:

```sh
eval "$(fnm env --shell zsh)"
fnm use 22
```

## Exact commands and results

| Command | Outcome |
| --- | --- |
| `npm run test:unit` (prerequisite) | Passed 83/83, zero failures/skips |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/components.spec.mjs tests/browser/navigation.spec.mjs tests/browser/storage-boundaries.spec.mjs --output=test-results/4-4-prerequisite` | Passed 168/168, 42 each Chromium/Firefox/WebKit/mobile Chromium, 1.8 minutes |
| `npm run test:unit` (implementation) | Passed 89/89, zero failures/skips |
| `npm run validate:content` | Passed existing reference schema/IDs/paths/Markdown |
| `git diff --check` | Passed tracked changes during implementation |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/writing-reference.spec.mjs --output=test-results/writing-reference-4-4-initial` | Failed: 60 passed/8 failed, 55.8 seconds; all failures are the new single-line-input test assumption described below |

### Initial test-input correction and review refinements

The new shared input test supplied a newline to a **single-line** Opening/Middle
input and expected the driver to remove it. Playwright `.fill()` instead inserts
a space: actual saved `Unicode 學生 partial draft` versus incorrectly expected
`Unicode 學生partial draft`, consistently in all four projects. New test inputs now
explicitly use a space for single-line fields and a newline for textareas, asserting
the exact supplied value, one immediate write, unchanged output, and save/reload.
No application behavior, content/policy assertion, timeout, retry or baseline was
changed to accommodate the driver assumption.

Source review also added explicit removal of fallback key/click listeners on
dismiss/destroy, marked reference-copy status fixture-only/nonprinting, retained
Middle's original empty-copy messages, and added a late clipboard-denial teardown
test. The next focused run covers this final source rather than treating the
initial failure as passing evidence.

## API / ownership / preservation evidence

Actual public APIs, data/own-state mapping and model persistence/policy table:
`../progress-compatibility.md`, checkpoint 4.4. Source → fixture mappings and
permitted fixture-only composition/style differences: `../content-inventory.md`,
checkpoint 4.4. Test setup/limits: `../regression-checklist.md` and
`tests/fixtures/harness/README.md`.

- Writing/checklist mounts follow copied own-state `onChange`, silent updates,
  explicit known-ID mapping, caller-only gates/store/navigation and cleanup.
- Three formatter oracles execute actual pinned handler snippets rather than
  replicating expected new operations. All literal wording, punctuation, trim and
  first-character lowercasing distinctions are retained; only allowlisted named
  placeholders interpolate plain text. No grading/grammar/template rewriting.
- Existing field/flag/check IDs map through unchanged adapters; student edits save
  immediately without typing-triggered assembly, completion revocation, new keys
  or new extension facts. Opening model stays session-only; Middle's existing v1
  model namespace and Final's legacy model flags are used as documented.
- References use the existing checked loader/schema/Markdown/Quick Reference
  renderer, prepared independently at startup even when writing excerpts fail.
  Existing Final pilot entry/sole legacy Print handler remain untouched. New
  orchestration adds only direct-harness hooks/lifecycle and fixture print CSS;
  no second renderer, production extraction or global print cleanup.

## Manual checks and limits

No interactive browser/device/AT/actual zoom/permission-dialog/print-preview or
physical-print checks performed. Scripted clipboard exceptions are not real
permission prompts; print-media assertions/headless PDFs are not interactive
Chrome/Firefox/Safari previews. Manual follow-ups remain explicitly pending in the
checklist. Final automated results/file-based review, if performed, follow below.

Overall milestone 4 remains incomplete. Checkpoint 4.4 verification is pending its
final focused and cumulative production/pilot/replay results; 4.5 is unimplemented
and outside this request.

## Final focused result / cumulative run pending

`env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/writing-reference.spec.mjs --output=test-results/writing-reference-4-4-final`
**passed 72/72**, 18 each Chromium/Firefox/WebKit/mobile Chromium, 52.0 seconds.
Includes all final review refinements and late-denial lifecycle test. The fresh
cumulative `npm run test:unit` then **passed 89/89**, zero failures/skips.

Full unchanged default `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser`
is running (background shell `sh_1741d143a001QfNimE2DX8lTLS`). No cumulative pass or
checkpoint-verification claim is made before its completion notification. No
browser commands overlap this run. Its default output cleanup removed the prior
ignored focused PDFs before archival/read; no file-based PDF review is claimed
from those deleted outputs. The full run will emit fresh reference PDFs.

## Full regression result — checkpoint 4.4 verified

`env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser` **passed 476/476**,
119 each Chromium/Firefox/WebKit/mobile Chromium, zero failed/skipped/flaky tests
or runner errors, **563.152792 seconds**. Unchanged default three workers and all
projects; no overlapping browser command or runtime/test change during this run.
Only documentation was updated while it ran.

Report start `2026-10-25T17:30:26.459Z`; ignored `test-results/results.json` SHA-256:
`32e549921fd1576f07d5d74d7258cb0edac1e3c9e666b83bd4e6a75c1af178bd`.
Stats, all-project outcomes and empty runner-errors list inspected directly.

| Scope | Passing tests |
| --- | ---: |
| Existing production/content/security/extraction/policy/persistence/print/reference pilot | 236 |
| Checkpoint 4.1 storage boundaries | 60 |
| Checkpoint 4.2 navigation | 48 |
| Checkpoint 4.3 components | 60 |
| Checkpoint 4.4 writing/reference | 72 |

Production/root and `/discussion-skills-lab/`, both pinned original replay mounts,
all existing isolated harnesses and root/repository-prefix reference includes pass.
The live lesson engines/styles/three keys and Final reference pilot are unchanged.
Fresh final `npm run validate:content` **passed**, as did `git diff --check`.
All 12 newly created checkpoint files passed a read-only whitespace/final-newline
audit. Final runtime-source cumulative unit evidence remains **89/89 passed**.

### File-based print review (not interactive previews)

Read both fresh full-run PDFs using the PDF reader (parsed text and rendered page):

- `test-results/writing-reference-referenc-ceecc-ion-when-writing-load-fails-chromium/writing-failure-reference-root.pdf`
- `test-results/writing-reference-referenc-84028-ion-when-writing-load-fails-chromium/writing-failure-reference-prefix.pdf`

Both have one readable Letter page, all five original groups/paragraphs/emphasis,
no clipped text, questions, writing drafts, controls or leading blank page. Files
are byte-identical: SHA-256
`d7421cb8ee45016229a6dd3d68e9fef20df0f1ff86eee013c35f4463c184d623`.
These are ignored generated evidence, not rewritten sealed baseline expectations.
The fixture uses uniform light-blue/teal groups instead of production per-group
accent colors and Arial instead of the production font pairing; semantic accent
classes/content/order and stacked composition are unchanged. This fixture-only
presentation simplification is recorded, not a production reference redesign or
pixel-equivalence claim. Existing production reference semantics/styles still pass
their unchanged tests. No `pdftotext` executable is available; no independent
Poppler command or interactive print preview is claimed.

**Checkpoint 4.4 verified**: immediate writing/output/checklist/model state, exact
legacy formatting, editable/readonly modes, required/optional external model inputs,
retained completion, silent hydration, lifecycle/clipboard fallback and independent
reference loading/retry/reference-only printing pass required automated checks.
Manual browser previews/dialogs/AT/actual zoom/devices/physical printing remain
explicit follow-ups, not fabricated checks or a current automated checkpoint gap.

Overall **milestone 4 remains incomplete**. **Next unverified checkpoint: 4.5**.
Stop at requested 4.4; no renderer/bootstrap, live cutover, commit or publication.

## Owner manual results and Safari keyboard triage — 2026-10-25

Owner reports print, writing, checklists, persistence, clipboard and zooming all
work on **Chrome and Mac Safari**. Browser versions and individual print-matrix
actions/settings were not supplied; record this as owner-reported acceptance,
not an independently observed exhaustive preview matrix. Owner does not want to
perform manual Firefox functional testing. Required automated Firefox/WebKit/
Chromium/mobile projects remain unchanged; no manual Firefox acceptance is claimed.

Owner clarifies the keyboard failure is on **live `opening.html` in Mac Safari**:
Tab/Shift+Tab do not move through controls, so Enter and WHO/WHAT/HOW/WHERE/TERMS
arrow navigation cannot be exercised. Chrome supports the described Tab/Shift+Tab/
Enter/arrow workflow. No keyboard is attached to the owner's iPhone; mobile
hardware-keyboard and iPad behavior are not verified. Touch-driven Safari/iPad
use is the owner's priority, not a reason to remove keyboard support.

Source triage: new 4.4 writing/checklist mounts contain native fields/buttons/
checkboxes, not ARIA tab groups. The tab group is in the unchanged legacy Opening
engine. Its key handler handles only ArrowLeft/ArrowRight/Home/End, not Tab; no
site-wide Tab interception was found. This does **not** reproduce or resolve the
owner's Safari report and does not establish an application-code defect.

First diagnostic is Mac/Safari keyboard-navigation settings: System Settings →
Keyboard → Keyboard navigation; Safari → Settings → Advanced → “Press Tab to
highlight each item on a webpage”. Apple documents these controls and Option-Tab:
<https://support.apple.com/guide/safari/keyboard-and-other-shortcuts-cpsh003/mac>.
Retesting after checking these preferences is **pending**. No preferences changed
by the agent; no custom Tab handler/native-navigation workaround added. If normal
keyboard navigation still fails with the relevant preferences enabled, investigate
the focused element and actual Safari key behavior before changing lesson code.

Required 4.4 automated verification remains as above; **manual Mac Safari keyboard
acceptance is unresolved**, not reported as passing. No new runtime/test changes,
browser run, screen-reader test, real iPad test or later-checkpoint work performed
in this documentation/diagnostic follow-up.

## Owner Safari retest and checkpoint acceptance — 2026-10-25

Owner confirms **Keyboard navigation was disabled in macOS System Settings**.
After enabling it, keyboard functionality works in Mac Safari. This resolves the
preceding reported Safari keyboard concern without an application code change;
no Safari-specific global Tab handler or lesson workaround is needed. The owner
explicitly accepts **checkpoint 4.4 as fully validated**, together with the earlier
Chrome/Mac Safari print, writing, checklist, persistence, clipboard and zoom passes.

The agent did not change system preferences or perform the owner's retest. Browser
versions, screen-reader results, real iPad/hardware-keyboard testing and individual
print permutations are not invented; their earlier evidence limits remain recorded
and do not reopen the owner's checkpoint acceptance. Manual Firefox testing is
not required of the owner; existing automated coverage remains unchanged.

**Checkpoint 4.4: verified and owner-accepted; no outstanding checkpoint blocker.**
Overall milestone 4 remains **incomplete**; **4.5 is the next unverified checkpoint**.
This closure changes documentation only. No new unit/browser/content-validation
run is claimed, and no later-checkpoint implementation, commit or publication is
performed or authorized.
