# Milestone 8 — pre-removal approval checkpoint evidence

Date: 2026-10-28. Starting commit:
`fc51bac0e8a790ccf40f83720059feed7c9eb501`.
Clean branch at entry: `refactor/shared-components`; no inherited user changes.
Milestones 1–7 checked in the actual checkout; latest milestone-7 handoff records
owner browser acceptance/closeout. Shared runtime/content/configs, frozen three
adapters, source/progress/policy/reference evidence are present.

## Scope and authorization

Owner explicitly asks **targeted tests only** because a whole-site suite can exceed
40 minutes. This supersedes the spec's before/after full-suite commands for this
session. No full unit/browser suite ran or is claimed. Shared changes select all
affected consumers; no hundreds-of-view historical presentation matrix is rerun.
No commit, merge, push, tag, publication, Pages settings or legacy cleanup deletion.
Root HTML remains byte-identical to starting HEAD. The approval gate covers its
repeated shell/home blocks as well as whole legacy files/selectors.

## Prepared implementation

- Common shell with guarded mount/loading/retry, skip/main, original title/duration/
  help/back-label profiles, explicit navigation hooks; thin entries remain intact.
- Semantic view/sheet/layout/accent hooks; separate token/reference/print/home CSS.
  Existing lesson CSS variants, legacy style probes and all old print blocks stay.
- Exact homepage Markdown/catalog, one safe Markdown wrapper/text renderer, strict
  catalog schema/runtime shape/URL/identity/destination checks and useful fallback.
- Test-only gated/worksheet and read-only reference modules use the actual app and
  registry, simple ID adapter/store and isolated identities. Existing lessons remain
  on their original v1 codecs. Reference-only navigation handles zero counted pages.
- Architecture/authoring/compatibility/regression/inventory/license documentation.

`tests/helpers/milestone-8-candidates.mjs` stages HTTP responses only: root bodies
use the proposed empty mount, homepage uses proposed hosts/fallback, and styles
omit only the exact P01–P04 line ranges. No production candidate is removed/moved
to a hidden container. Candidate URLs in browser tests are isolated local origins,
never production/personal progress. Old-engine replay requests bypass staging.

## Executed prerequisite checks

All Node commands used Node v22.23.4 via:
`eval "$(fnm env --shell zsh)"` then `fnm use 22`.

- Before implementation:
  `node --test tests/unit/opening-migration.test.mjs tests/unit/final-migration.test.mjs tests/unit/middle-migration.test.mjs`
  — **27/27 passed**, exact content/gates/maps/archives/configs.
- Before implementation:
  `npm run test:browser -- tests/browser/baseline.spec.mjs --grep 'fresh' --project=chromium --workers=1 --max-failures=1 --output=test-results/m8-prerequisites`
  — **6/6 passed**, three real entries at root/repository mounts, 55.5s.

## Targeted units/content

Final command:

```bash
node --test --test-reporter=dot tests/unit/milestone-8.test.mjs tests/unit/progress-adapters.test.mjs tests/unit/baseline.test.mjs tests/unit/lesson-validation.test.mjs tests/unit/completion.test.mjs tests/unit/opening-migration.test.mjs tests/unit/middle-migration.test.mjs tests/unit/final-migration.test.mjs
npm run validate:content
git diff --check
```

**117/117 selected unit tests passed**; content validation and whitespace check
passed. Covers exact original banks/feedback/keys, every individually missing
legacy gate, all completion subsets against pinned VM, legacy keys/unknown data/
opaque extensions/corruption, source seals/server/replay, new schema/runtime parity,
ID-record no-write bootstrap/unknown versions/unknown properties and completion IDs,
reference-only no-storage, catalog real destinations and fixture graphs.

An earlier selected 90-test run had **89 passes/one failure**: an inherited
navigation-harness assertion parsed labels from the now-thin Opening entry. It now
compares the harness to pinned original labels **and** current manifest labels;
the original assertion is preserved, not skipped. Subsequent selected 117 tests
passed before and after the final adapter/validator follow-up. No frozen source,
policy/answer fixture or vendor baseline was rewritten.

## Browser chronology (development failures retained honestly)

All commands below use `npm run test:browser --` plus the listed files/options.
Independent runs are not one whole-suite invocation.

1. Four new spec files, Chromium, workers 2, fail-fast 1,
   `--output=test-results/m8-candidates-first`: 9 passed, one failed, one interrupted,
   14 not run. The reference-mode fixture's query made its declaring content URL
   unsafe. Kept the URL boundary; split mechanical fixture entry HTML instead.
2. Same selection, `m8-candidates-confirmed`: 9 passed/one failed/one interrupted/
   14 not run. Reference-only navigation dereferenced the nonexistent last counted
   page. Fixed zero-count navigation without changing legacy gates.
3. Same selection, `m8-candidates-navigation-fixed`: 6 passed/one failed/one interrupted/
   17 not run. New test used a strict multiple-element `toBeHidden`; corrected it
   to assert zero visible controls. No production behavior changed for this oracle.
4. Same selection, `m8-chromium`: **12 homepage/new-module passes**, then one
   failed/one interrupted/11 not run. Staged empty HTML lacked the `.app-shell`
   root queried by existing thin entries. Retained a minimal empty mount and
   prevented nested duplicate app-shell wrappers in the generated shell.
5. Shell/print files only, `m8-shell-print`: 3 passed/one failed/one interrupted/
   eight not run. Middle's old ID-bearing `:not(#view-8)` print compensation beat
   the proposed semantic rule. Instead of removing code without approval or hiding
   the failure, staged the **exact reviewed** print removal ranges and tested without
   them. Actual legacy files remain intact.
6. **Passed**, shell/print files, Chromium:

   ```bash
   npm run test:browser -- tests/browser/shell.spec.mjs tests/browser/print-isolation.spec.mjs --project=chromium --workers=2 --max-failures=1 --output=test-results/m8-reviewed-print-removal
   ```

   **19/19**, 75.199288s; six full journeys/completed-v1/original-engine replays,
   shell/loading/mobile/focus/skip and six semantic print tests on both mounts.
   Durable compact report + twelve PDFs:
   `milestone-8/chromium-shell-print/results.json`, original report SHA-256
   `f90ee40bd1e7b9ddd3b43776ed43e06c6921f551dd3add420ecebc081919acd4`.
7. Four new files, other three projects:

   ```bash
   caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/shell.spec.mjs tests/browser/home.spec.mjs tests/browser/new-module.spec.mjs tests/browser/print-isolation.spec.mjs --project=firefox --project=webkit --project=mobile-chromium --workers=1 --max-failures=1 --output=test-results/m8-other-engines
   ```

   **68 passed/one failed/24 not run**, about 8 minutes. All **31 Firefox + 31
   WebKit** selected identities passed, including all three full journeys/replay
   on both mounts. Six mobile homepage checks passed; the mobile module test then
   tried to click the correctly hidden desktop rail. Fixed the new test to use
   the visible mobile selector, not a forced desktop viewport. Report/artifact
   hashes preserved at `milestone-8/other-engines-first/results.json`. A unit/browser
   follow-up added reserved-ID/unknown-completion protection and explicit duplicate
   mount/module-print assertions during this run; do not interpret all earlier
   results as a single final-source run. Final affected-file follow-up is separately
   recorded below.

Each failed fail-fast development attempt also reported a runner interruption/
teardown error; none is represented as an all-green run. Failure artifacts remain
in the separately named ignored `test-results/` directories. Compact durable
archives exclude repeated base64 reports and preserve explicit result statuses,
artifact hashes and report checksums; sealed historical evidence is untouched.

## Presentation/PDF review and gaps

Agent file-based review (not interactive browser testing): opening/middle/final
ordinary-view PDFs `001`, `003`, `005` in `milestone-8/chromium-shell-print/`. Each is
one Letter page with all four/five/five authored reference groups, full text,
readable colors/scale and no ordinary activities/drafts/nav/controls/blank leading
page. No one-page restriction hides content. Minor natural wrapping/spacing and
the Opening badge row remain permitted. Review identified an Opening duplicate
eyebrow and residual Middle heading-pill background after renumbering; replacement
semantic CSS now preserves the former print eyebrow hiding and the latter heading
reset. These are presentation corrections, not removed instructional material.
Final affected print checks/PDF artifacts are recorded in the follow-up below.

## Final affected-file follow-ups

8. **Passed**, only the three affected new specs (excluding already-covered full
   journeys), all four projects:

   ```bash
   caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/new-module.spec.mjs tests/browser/print-isolation.spec.mjs tests/browser/shell.spec.mjs --grep-invert 'candidate journey' --workers=1 --max-failures=1 --output=test-results/m8-final-affected
   ```

   **100/100**, 25/project, root/repository mounts, 506.088815s, zero skips,
   failures/flakiness/runner errors. This includes corrected mobile fixture
   navigation, ID progress/corruption/no-storage, duplicate mounts, all shell
   controls, semantic renumber/reorder printing, and reference failure/readiness
   independent of failed activities. Preserved at
   `milestone-8/final-affected/results.json`, with 24 Chromium/mobile Chromium
   ordinary/reference PDFs. Original report SHA-256:
   `a4f7c667e08497fd14382b707a2aef0c1d1943444cf86cc3439c78f30ece30ad`.
   Agent read final ordinary-view opening/middle/final PDFs `001`, `003`, `005`:
   all remain complete one-page Letter references without clipping/controls/blank
   leading page; the extra eyebrow/heading-pill artifacts are corrected.
9. **Passed**, only the previously unrun mobile full-journey identities:

   ```bash
   npm run test:browser -- tests/browser/shell.spec.mjs --grep 'candidate journey' --project=mobile-chromium --workers=1 --max-failures=1 --output=test-results/m8-mobile-journeys
   ```

   **6/6**, 37.274152s, both mounts/all lessons/fresh completion/completed-fixture
   silent restore/pinned original replay. Archive `milestone-8/mobile-journeys/`,
   report SHA-256 `e38bd9f9c28cdda767ae7272a76b330ba92db52b50d4bd95b1106598213c355f`.
10. **Passed**, focused skip-link follow-up on one representative lesson/both
    mounts/all projects:

    ```bash
    caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/shell.spec.mjs --grep '/opening shared shell' --workers=1 --max-failures=1 --output=test-results/m8-skip-reload
    ```

    **8/8**, 16.471965s. Code review found a default anchor fragment could make a
    later reload fail the intentionally strict declaring-URL boundary. The shared
    skip handler now focuses/scrolls to main **without changing the URL**; it does
    not weaken include validation or introduce routing. Tests explicitly check
    focus, unchanged URL, successful reload/zero writes and duplicate-mount guard.
    Other lesson journeys/print were not unnecessarily rerun for this handler.
    Archive `milestone-8/skip-reload/`, report SHA-256
    `9783bd30fe4e283b704117685b3a32944516b9b56aa67b96376a21bb1e5f5168`.
11. **Passed**, final Chromium homepage-only evidence (other projects' unchanged
    homepage checks already passed in run 7):

    ```bash
    npm run test:browser -- tests/browser/home.spec.mjs --project=chromium --workers=1 --max-failures=1 --output=test-results/m8-home-final
    ```

    **6/6**, 3.195857s, exact copy/order/links/footer/fallback/retry/no-JS on both
    mounts. Archive `milestone-8/home-final/`, report SHA-256
    `46c8087691a5e8aea19a87b2ed2689dca783420f08d2eacfcbddb952963ea56d`.

All four projects now have passing coverage for every selected new spec identity
across these separate runs; this is **not** one fresh full-suite/combined run.
Commands have completed; no browser tests or new preview server are left running.

Final audit: `review-milestone-8.mjs` exclusively records **58 exact source/
replacement SHA-256 identities and nine precise print blocks** in
`milestone-8/reviewed-sources-v1.json`. Independent Python verification of all 58
hashes and new documentation links passed; `git diff --check` passed. All four
root entries, production classic core and three lesson styles remain byte-identical
to starting HEAD; shared CSS retains its entire original prefix plus additive shell
hooks. No sealed fixture, third-party file, existing codec, Pages configuration or
license changed. No cleanup deletion or commit occurred.

Not performed: agent Chrome/Firefox/Safari interactive Print-button/Cmd/Ctrl+P
previews/settings/backgrounds, actual 200% zoom, screen readers, physical iOS/
Android/printing, exhaustive every-view/reveal visual/coverage matrix, whole unit/
browser suite, post-approved-removal/public-cutover checks and owner milestone-8
browser acceptance. The full suites are intentionally excluded by the owner's
instruction; public cutover/cleanup and review are blocked on explicit inventory
approval. Headless WebKit/mobile viewports are not physical Safari/iOS/Android.

## Approval boundary

See inventory **v1**, exact source/replacement snapshot and proposed IDs
**S01, S02, S03, H01, H02, P01, P02, P03, P04, R01**. Baseline/replay dependencies,
instructional variants and unresolved/mixed CSS are explicitly retained/deferred.
No approval has been inferred from implementation authorization or test passes.
