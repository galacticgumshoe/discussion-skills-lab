# Milestone 8 — approved local cutover and cleanup

Date: 2026-10-28. HEAD: `fc51bac0e8a790ccf40f83720059feed7c9eb501`.
Branch: `refactor/shared-components`. All changes remain uncommitted.

## Authority and boundary

Owner: “Approved of the proposed plan. Go ahead and implement those changes.”
Inventory v2 identifies S01–S03/H01–H02/P01–P04/R01 and T01/T03–T07 exact
deletion-ready scopes; T02/T08–T11 are conditional on ports/evidence, not blanket
deletion permission. No commit, merge, push, tag, publication or Pages change.
Inherited uncommitted milestone-8 replacements/evidence were preserved.

## Actual changes and preservation

- All four real public entries now load the reviewed shared shell/home/print
  implementations. Shell/home/print specs no longer stage replacement responses.
- Eighteen approved tracked whole-file removals: classic production core; Middle
  preview entry; four cutover/extraction transforms; three content extractors;
  two old milestone archive tools; six capture/freeze/seal generators; obsolete
  audit CLI. The inventory enumerates the exact paths. Only approved route/import,
  pilot/audit function/import/npm command and intermediate static guards changed
  in mixed files; independent original bank/seal/VM/replay assertions remain.
- Reinserted each of the nine reviewed print excerpts into the four current
  stylesheet line arrays. All four reconstructed SHA-256 values equal v1's reviewed
  source hashes exactly, including the additive shared-shell CSS already present
  when approved. No other reviewed screen/alias rule was removed. D01/D02 remain.
- `git diff --name-only --diff-filter=D` matched exactly the 18 approved tracked
  paths. No sealed fixture, original source, variant archive or historical evidence
  was deleted/resealed. Current/pinned server guards assert preview 404s at both
  mounts and serve all retained original paths explicitly through the pinned reader.
- Executable test-source search for all retired T03–T07 paths/symbols found no
  active consumer. Historical evidence references remain intentionally unchanged.
  Package dependencies/lockfile, vendors/notices/licenses and three v1 codecs/keys
  are unchanged. No student/personal browser storage was accessed.

## Targeted automated verification

Node v22.23.4 via `eval "$(fnm env --shell zsh)"` / `fnm use 22`.
Only file/project-scoped tests were run; no full-suite claim.

### Units/content

Before approved removals: selected baseline/adapters/milestone-8 units **31/31**.
After removals: those plus Opening migration **39/39** and content validation pass.
Expanded affected legacy content/gate/parity selection **70/70**:

```sh
node --test --test-reporter=dot tests/unit/baseline.test.mjs tests/unit/progress-adapters.test.mjs tests/unit/milestone-8.test.mjs tests/unit/opening-migration.test.mjs tests/unit/middle-migration.test.mjs tests/unit/final-migration.test.mjs tests/unit/completion.test.mjs
npm run validate:content
```

Validation includes all public graphs, catalogs, variants, new-module fixtures and
the still-retained partial Final graph. Baseline verifies the immutable 110-file
seal, pinned archive equality, original-core VM and root/prefix server boundaries.
`node --check tests/browser/app-lifecycle.spec.mjs` and `git diff --check` pass.

### Actual public entries

```sh
npm run test:browser -- tests/browser/home.spec.mjs tests/browser/shell.spec.mjs tests/browser/print-isolation.spec.mjs --project=chromium --workers=2 --max-failures=1 --output=test-results/m8-approved-public-chromium
```

**31/31 passed**, both mounts, approximately 2.4 minutes. Includes fresh complete
Opening/Middle/Final journeys, completed-v1 restores and pinned original replay;
home exact wording/order/license links/error/retry/no-JS; shell/focus/skip/counts/
zero-save hydration; semantic print renumbering/reordering/readiness from ordinary
and reference screens. Compact report and 12 PDFs:
`milestone-8/approved-public-chromium/results.json`.

```sh
env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/home.spec.mjs tests/browser/shell.spec.mjs tests/browser/print-isolation.spec.mjs --grep-invert 'public journey' --project=firefox --project=webkit --project=mobile-chromium --workers=2 --max-failures=1 --output=test-results/m8-approved-public-other-engines
```

**75/75 passed** (25/project), both mounts, approximately 5.8 minutes. Same public
home/shell/semantic-print checks; complete journeys were deliberately excluded
from this follow-up, not claimed newly verified in those engines. Firefox used a
fresh command-scoped application-data home. Compact report and 12 PDFs:
`milestone-8/approved-public-other-engines/results.json`.

### Assertion ports — partial, no coverage deletion

`middle-reference.spec.mjs` now loads real `middle.html`. It retains the independent
sealed-source inventory comparison of **five groups, 18 list items**, exact token
emphasis/list order/classes, six reference requests inside each mount, silent
preload, failure/retry and ordinary/reference print checks. No generic journey is
substituted for those exact assertions. The old question/reordered-checklist suite
and its temporary entry remain pending a separate port.

`app-lifecycle.spec.mjs` uses existing noninstructional `new-module/` data, the same
app/registry/identity adapter and a fixture-only remount control. Public entries
export no new lifecycle globals/APIs. Ports cover:

| Earlier partial Final assertions | Generic destination |
| --- | --- |
| duplicate root/key reservation, repeated destroy/remount, old nodes inert, single writer/Print | duplicate mounts/writers test |
| destroy while fetch pending, cancellation, reservation release, single callbacks | pending-fetch test |
| invalid static registry and unavailable renderer isolation | bounded-registry test |
| reference independent of pending activity, no progress read before preparation | pending-activity/reference test |
| ordinary Markdown failure blocks initial credit; retry cannot synthesize completion | failed-Markdown test |

The original partial Final assertions are still present. Invalid-boundary cases,
real Final content/legacy scenarios and graph/security fixtures still need explicit
ports; these five destinations do not certify the entire T08 suite redundant.
T09 lifecycle/clipboard/navigation/storage/writing and T10 presentation assertion
consolidation are not completed. No deferred suite was disabled/deleted.

Initial scoped Chromium port run: **4 passed, 1 failed, 1 interrupted, 16 not run**.
Failure was a new test's unscoped `[data-content-retry]` matching one visible plus
three intentionally hidden retry buttons. Corrected only the locator to the visible
retry; no production or expected-content/gate change. Failed report and two captured
artifacts: `milestone-8/assertion-ports-chromium-initial/results.json`.
Second scoped run: **12 passed, 1 failed, 1 interrupted, 8 not run**. All ten
generic lifecycle cases passed. The newly ported Middle inventory test still
queried the partial harness's old `#reference-content`; the actual page uses
`[data-reference-content]`. Corrected that selector without changing the independent
expected inventory. Report/artifacts:
`milestone-8/assertion-ports-chromium-selector/results.json`.

Corrected Chromium selection **22/22 passed**, both mounts, 40.7 seconds, including
all ten generic lifecycle contracts, six public Middle reference checks and six
existing new-module checks. Report and four PDFs:
`milestone-8/assertion-ports-chromium-verified/results.json`.

After this run, the fixture was strengthened to count actual `registry.write`
callbacks independently of deduplicated storage writes. Its wrapper delegates to
the same static registry; no component implementation or production API was copied.
Remount/old-node/pending-fetch tests now assert both callback and write counts.
Final affected cross-engine verification **72/72 passed** (18/project in Chromium,
Firefox, WebKit, mobile Chromium; both mounts; approximately 3.6 minutes), including
the new callback counters, all public Middle reference assertions and selected
baseline content/resource checks:

```sh
env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/app-lifecycle.spec.mjs tests/browser/middle-reference.spec.mjs tests/browser/baseline.spec.mjs --grep 'duplicate mounts|destroy during|bounded registry|pending activity|failed Markdown|Middle reference|homepage, exact' --workers=2 --max-failures=1 --output=test-results/m8-final-ported-contracts
```

Compact report/eight PDFs: `milestone-8/final-ported-contracts/results.json`.
Zero failures/skips/runner errors in this final run. The two earlier new-oracle
failures remain recorded above rather than hidden by replacing their reports.

## Conditional T11 retirement and final static checks

Direct-public tests no longer consume the candidate transforms; only the old
review helper imported them. All three exact T11 helper hashes matched v2 before
removal. The owner's approved plan's actual-cutover/consumer-retarget conditions
are now met without changing the reviewed file/block scopes. Candidate/review
helpers were retired after that proof; the archive helper was retired only after
exclusively preserving the final 72-test report/PDFs. No new permanent staging or
archive helper was introduced. All generated review/source-hash/report/artifact
history remains retained. The three helpers had been created uncommitted within
this milestone, so they do not add tracked deletion entries to the 18-path audit.

After all three retirements:

```sh
node --test tests/unit/baseline.test.mjs tests/unit/milestone-8.test.mjs
npm run validate:content
git diff --check
```

**12/12 passed**, content validation passed, whitespace check passed. Executable
test-source search has no remaining T11 staging/archive/review imports/calls or
retired cutover/extraction/audit/pilot symbols. All **42 artifact hashes** across
the six new report directories above match independently retained files, including
failed-run captures. No browser process or persistent preview server remains.

## Mixed copied-content audit

A read-only Node structured-subset comparison checked all six copied activity
documents against canonical Final activities. Source-backed card/panel text was
parsed with the pinned local Markdown parser; only whitespace normalized. The
single copied `multiple-choice` is explicitly the canonical sequence's sole
question; no answer/feedback/order association inferred from similar wording.

| Copy | Scalar values verified |
| --- | ---: |
| `connect-viewpoints-panels.json` | 16 |
| `connect-viewpoints-questions.json` | 16 |
| `summary-synthesis-questions.json` | 64 |
| `synthesis-checklist.json` | 13 |
| `synthesis-writing.json` | 43 |
| `welcome-cards.json` | 12 |

**164/164 scalar values pass**, including fields/models/templates/feedback/keys,
with array lengths/order checked. Canonical extra headings/UI metadata remain.
Six reference copies were already independently byte-identical in the v2 audit.
This is content-retention evidence, not whole-container deletion approval or proof
that all runtime assertions have moved. Meaningful V01 archives stay protected.

## Limits and next work

No interactive browser, actual Chrome/Firefox/Safari print preview, physical
printing, real iOS/Android, AT, actual 200% browser zoom or new owner browser
verification was performed/inferred. New automated PDFs are archived but not yet
claimed file-reviewed. Full suites/historical viewport matrices were intentionally
not run under the owner's targeted-only instruction. Milestone 8 remains
incomplete: remaining conditional assertion ports/consolidation and final cleanup
dispositions, then owner actual-page verification and separately authorized commit.
