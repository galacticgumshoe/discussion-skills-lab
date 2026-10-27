# Milestone 5 — displayed reference review unit

Status: **current pre-cutover checkpoint verification complete**, using combined
full-run and owner-rerun coverage as accepted by the owner below. **Milestone 5
remains incomplete**, with no public cutover. This unit follows
`milestone-5-questions-verification.md`; read it for the original session start,
inherited work, first checks and failed full-suite report.

Resumed HEAD: `b93d74548c39ec1dc7d14d484b8033ea0411379b` (owner's milestone-4
commit); branch `refactor/shared-components`. All earlier milestone-5 files were
retained. No agent commit/merge/push/publication/Pages change.

## Implementation

- `content/middle/reference/reference.json` plus five Markdown fragments preserve
  the **displayed** Middle HTML sheet, all 18 list items and goal emphasis.
  Source mappings/licensing: `../content-inventory.md`, reference review unit.
- Shared `quick-reference.js` retains one renderer, adding explicit Middle
  `section`/item/number/label classes through a `middle-reference` layout value.
  Final's existing profile and emitted markup are unchanged. Closed reference
  runtime/schema enums accept exactly these two known layouts, not arbitrary HTML.
- New standalone reference harness reuses the existing loader/renderer, original
  Middle styles/print overrides and one Print handler. No storage/engine/writer.
- New semantic/unit tests compare actual source labels/Markdown/list tokens/order/
  classes independently of pictures. Common invalid-schema cases remain rejected.
- Fixed the new question harness's alias-only repository-prefix content URL;
  explicit request assertions now exercise actual root/prefix content requests.
- No public HTML/entry, original Middle CSS, codec/store, dependency, runner
  configuration, original replay allowlist, license or sealed fixture changed.
  New reference harness layout reserves the original desktop rail column instead
  of inadvertently placing the sheet in the narrow first grid track.

## Executed checks / initial failures

All npm/Node commands use process-local `eval "$(fnm env --shell zsh)"` and
`fnm use 22` (Node v22.23.4). No personal profile/real student data/security change.

1. **Passed unchanged diagnostic:**
   `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/opening-extraction.spec.mjs tests/browser/persistence.spec.mjs --project=webkit --workers=1 --max-failures=1 --output=test-results/middle-5-webkit-opening-diagnostic`
   — **24/24**, 53.7 seconds. Includes all three earlier timeout identities plus
   current/all-lesson/original replay. No source/test/helper fix made for this run;
   not a substitute for the entire suite. Earlier full failure remains recorded.
2. **Passed:** `npm run test:unit` **148/148** and `npm run validate:content`
   after introducing the reference profile; then **failed** the new standalone
   reference unit command 1 passed/one failure because the frozen invalid fixture
   literally duplicated Final's `quick-reference` ID, not Middle's ID. Adapted
   only that operation's target to `data.id`; no baseline or validator relaxation.
3. Initial focused browser command:
   `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/middle-migration.spec.mjs tests/browser/middle-reference.spec.mjs tests/browser/reference-loading.spec.mjs --output=test-results/middle-5-reference-initial`
   — **failed 87 passed/nine failed**, 1.4 minutes. All 24 new reference tests
   passed. Eight failures were the resumed question test's incorrect descendant
   lookup for a class owned by the component root. Corrected to root class plus
   one question prompt, retaining lifecycle/count/focus/save assertions. One
   existing Firefox Final root reference-navigation assertion failed hidden view;
   no legacy helper/Final/runtime behavior changed to hide it.
4. **Passed final-source units/content:** `npm run test:unit` **150/150**,
   zero failures/skips, and `npm run validate:content` after the test corrections.
5. **Passed reviewed focused command:**
   `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/middle-migration.spec.mjs tests/browser/middle-reference.spec.mjs tests/browser/reference-loading.spec.mjs --output=test-results/middle-5-reference-reviewed`
   — **96/96**, 24 each Chromium/Firefox/WebKit/mobile Chromium, 1.3 minutes.
   Root/repository content requests, all ten valid Middle fixtures per mount,
   cursor/choice/check/lifecycle/rollback checks, all 24 new reference semantic/
   failure/print checks and all 32 existing Final pilot checks pass. The existing
   Firefox navigation failure did not recur; cause is not established and no
   legacy source/helper was changed to obtain the passing rerun.
6. Captured six paired original/extracted reference PNGs at 1440/390/320px and
   four fresh root/prefix ordinary/reference Chromium PDFs in an exclusively
   created `milestone-5-reference/` directory. Capture metadata records Chromium
   149.0.7827.55, UTC time and geometry; all six item/list overflow checks empty.
   Paired sheet dimensions agree at every width: 920×1266.421875,
   358×1695.640625 and 288×2072.796875 CSS pixels. No font/CDN mock or masking.
7. **Failed entire suite:**
   `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser`, shell
   `sh_1752b68870016nSHxQIKz7MjWd` — **646 passed/six failed**, 1943.780971
   seconds. Chromium/Firefox/WebKit each **163/163**; mobile Chromium **157
   passed/six timeouts**. All 64 new Middle checks passed. No skipped/flaky tests
   or runner errors. Report start `2026-10-25T22:25:42.267Z`, SHA-256
   `dece35c79b18b80c5610e1946adce3d51347bf887c6a4b68d575c4ed007c9545`.
   Failed mobile cases:
   - `lesson-harness.spec.mjs`: root destroy/remount; root sealed-content hooks;
     repository bootstrap/unlock/refresh.
   - `storage-boundaries.spec.mjs`: Final extended-v1 replay on both original mounts.
   - `writing-reference.spec.mjs`: Opening hydration, timing out in beforeEach;
     afterEach then reports undefined error collection because setup never ran.
   Reported individual elapsed times cluster around 528 seconds and 888–892
   seconds despite 120-second test budgets. These are timing observations, not a
   verified explanation (no host sleep/resource diagnosis inferred). Runtime/
   content/tests were not edited during this run. No test/timeout/security changes
   made in response; do not call the entire suite green.
8. **Passed unchanged mobile diagnostic:**
   `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/lesson-harness.spec.mjs tests/browser/storage-boundaries.spec.mjs tests/browser/writing-reference.spec.mjs --project=mobile-chromium --workers=1 --max-failures=1 --output=test-results/middle-5-mobile-diagnostic`
   — **61/61**, 40.5 seconds, including all six failed identities, root/repository
   harnesses and both original replay mounts. No code/test/helper changes to make
   them pass. This diagnostic does **not** turn the preceding full run into a pass.
9. Created separate `milestone-5-reference/settled/` directory exclusively, retaining
   every earlier file. Four fresh root/prefix ordinary/reference PDFs explicitly
   wait for real `animation.finished` promises after print-media emulation, with
   opacity `1`, display `block`, five groups asserted before capture. No fixed
   delay or CSS mutation. All four parsed/reviewed as one complete Letter page;
   root/prefix reference PDFs additionally rendered with macOS `sips` and visually
   reviewed: normal navy text/colored groups/goal emphasis, no clipping, questions,
   controls or leading blank. SHA-256/provenance in capture README. This closes
   settled **file-based** print review, not interactive browser-preview coverage.

## File-based review so far

Agent reviewed paired 320px PNGs and extracted desktop PNG: all text readable,
five original palette/number/title groups retained, no clipping/overflow. Original
navigation focuses the reference heading, showing a blue focus outline; standalone
extraction harness has no equivalent navigation focus. This is a **harness-only
focus-state difference**, not a change to the production navigation contract.
No pixel equality is required or claimed.

Read `root-ordinary.pdf` and `prefix-reference.pdf`: parsed text includes all 18
list items/five headings and each is one page, without lesson content/controls or
a leading blank. The prefix reference-view PDF image caught the inherited
`.view.active` reveal animation and is pale. These original capture files are
retained and **not accepted settled print-contrast evidence**. The separately
named, animation-settled follow-up described in check 9 subsequently completed
file-based print review without overwriting these originals or changing CSS.
Interactive preview/actual print behavior remains unperformed. See capture README
for exact hashes/provenance and settled review results.

## Owner rerun and checkpoint verification closure — 2026-10-25

The owner reports the laptop went to sleep during the long full run and supplied
the successful targeted rerun below, then explicitly requested marking verification
complete. Host sleep is user-reported context, not an independently proven cause.

```sh
caffeinate -i npm run test:browser -- \
  tests/browser/lesson-harness.spec.mjs \
  tests/browser/storage-boundaries.spec.mjs \
  tests/browser/writing-reference.spec.mjs \
  --project=mobile-chromium --workers=1 \
  --grep 'root: (destroy during load|all composed content)|repository: actual bootstrap|final adapter-written extended v1 payload|opening: complete fixture hydration'
```

**Passed, owner-executed: six/six**, 6.140833 seconds, one worker, zero failed,
skipped, flaky tests or runner errors. Agent inspected the local JSON report:
start `2026-10-25T23:33:56.680Z`, SHA-256
`22eb6cacb0b9217e3f38a48ef38596bd1c4fc7a264e8bb77f0831756c479e7fb`.
All six exact previously timed-out mobile identities match, including both Final
original replay mounts, root/repository bootstrap cases and Opening hydration.
No implementation/test/assertion/timeout change was made for this rerun.

**Current checkpoint verification is complete on combined evidence:** 646 passes
from the recorded 652-test full run plus these six matching owner-rerun passes
cover every configured test. The earlier 61/61 diagnostic and 96/96 focused run
provide additional passing evidence. This is **not a new single 652/652 passing
run**; the original failed command and report hash above remain unchanged. The
owner accepts this coverage to close the checkpoint verification pause. Existing
150/150 unit, content-validation and settled file-based PDF checks also pass.
No new automated test or manual browser check was agent-executed for this
documentation-only closure.

## Still required

- No outstanding automated verification blocker for the currently implemented
  pre-cutover checkpoint; owner-accepted combined coverage is recorded above.
  Run the required full cumulative checks again after the remaining migration
  changes, preferably preventing idle sleep. Do not erase earlier failed runs or
  describe this closure as a newly passing single full-suite invocation.
- Record actual manual-preview status on eventual lesson cutover. No interactive
  preview/AT/device/actual zoom result has been performed or inferred from
  headless print assertions, settled PDFs or narrow screen images.
- Retain the failed cumulative result alongside the owner's exact six-test pass;
  distinguish accepted combined coverage from a single all-green command.
- Complete the rest of milestone 5 per the first unit's remaining-work list:
  rich section/card/panel content, research/application/writing, pure reveal
  integration, full graph and all-section checks, then atomic public cutover.
  Do not migrate Final or consolidate global styles.
