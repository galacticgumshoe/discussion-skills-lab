# Remaining milestone-8 work — verification v3

2026-10-29; starting HEAD `61ff6898a6675d000d76e76e225d1852e56d9fb9`,
branch `refactor/shared-components`, clean at entry. No production, canonical
instruction, codec/storage-policy, vendor, dependency, sealed baseline or original
replay edit. No cleanup deletion, commit, push, merge or publication.

This session prepares the next mandatory removal/disposition decision; it does
**not** mark milestone 8 complete. See `remaining-dispositions-v3.md` and the
main `../../legacy-removal-inventory.md`.

## Test scope

The existing owner instruction in the latest milestone-8 handoffs/checklist is
targeted-only, not an automatic full historical unit/browser matrix. Node
v22.23.4 was initialized using `eval "$(fnm env --shell zsh)"` / `fnm use 22`.
No installation/upgrade, security bypass or personal browser profile was used.
Only isolated local contexts and synthetic drafts are used.

## Units and content audit

Before editing, **passed 78/78**:

```sh
node --test --test-reporter=dot tests/unit/milestone-8.test.mjs tests/unit/baseline.test.mjs tests/unit/lesson-validation.test.mjs tests/unit/middle-migration.test.mjs tests/unit/final-migration.test.mjs
npm run validate:content
```

New canonical boundary units **passed 47/47**, zero failures/skips:

```sh
node --test tests/unit/lesson-boundaries.test.mjs
```

This covers the whole canonical graph/activities and existing extensibility graph,
all 43 invalid-case schema/runtime pairs, identity/order, missing/malformed/symlinked
files, exact three/four nesting boundary and all five baseline-backed question
profiles. Initial new-file run passed 46/46 before the question-profile test was
added; final 47/47 duration 258.991ms.

Expanded affected selection **failed: 126 passed, two inherited obsolete
pre-cutover guard failures; 128 total**, not a full unit suite:

```sh
node --test --test-reporter=dot tests/unit/lesson-boundaries.test.mjs tests/unit/milestone-8.test.mjs tests/unit/progress-adapters.test.mjs tests/unit/baseline.test.mjs tests/unit/completion.test.mjs tests/unit/components.test.mjs tests/unit/formatters.test.mjs tests/unit/opening-migration.test.mjs tests/unit/middle-migration.test.mjs tests/unit/final-migration.test.mjs
npm run validate:content
```

Content validation **passed** afterward. The failing tests assert that Opening/
Final are unmigrated and must **not** load `components.css`, contrary to their
already-approved actual entries. These failures reproduce on unchanged inherited
test/production files and are not hidden by skipping the tests. Proposed exact
corrections are **T09-GUARDS-v3**; meaningful pinned-VM/formatter/content/profile/
module-isolation assertions remain protected. No failure is called a full pass.

Fresh read-only copied-content audit **passed**:

- All **164/164 scalar values** in six copied activity documents match canonical
  Final, preserving array order/length. Source-backed Markdown uses the pinned
  local parser and whitespace-only normalization; the sole-question sequence
  wrapper/profile is explicit.
- All **six reference copies** are byte-identical to canonical counterparts.
- The new canonical invalid-case generator preserves **all 43 original names**.
- Method, paths, source/destination SHA-256 values and per-copy scalar counts:
  `remaining-content-audit-v3.json`. Inputs are not rewritten or resealed.

The first ad hoc audit attempt omitted the canonical sequence's profile from its
wrapper-equivalence object and threw on the missing comparison key. Corrected
the audit object, not content; the exclusive successful JSON was created only
after all assertions passed.

## Browser development runs

All commands below use `npm run test:browser --` and the named files only; the
first four development runs used Chromium, one worker and the normal test server.
Failed contexts/screenshots remain in their distinct ignored output directories.

| Output directory beneath `test-results/` | Command selection / observed result |
| --- | --- |
| `m8-remaining-initial` | `tests/browser/middle-questions.spec.mjs tests/browser/lesson-boundaries.spec.mjs --project=chromium --workers=1 --max-failures=1`; one failed/23 not run. New test attempted Final questions before the **real** cards revealed them, unlike the partial site. Corrected to exercise actual prerequisites; no production change |
| `m8-remaining-corrected` | Same two files/options; three passed/one failed/20 not run. New test selected the last hidden loading-status node rather than the activity's visible failure status. Corrected selectors to visible status/retry, retaining exact error/no-write assertions |
| `m8-remaining-public` | The two files plus `tests/browser/controller-lifecycle.spec.mjs`, same options; one failed/27 not run. New live-region query also matched the separate hidden comparison status. Scoped to the stable `.dsl-feedback[role=status]` node, not a weaker text assertion |
| `m8-remaining-public-verified` | Three files, Chromium/one worker/`--max-failures=4`; command was interrupted by its accidental **120-second shell timeout**, with at least 16 observed passes/two new-oracle failures and incomplete reporting. Hidden writing sections intentionally have no accessibility-tree name; corrected to navigate to the actual visible section before checking label associations. This is not a completed suite or complete count |
| `m8-remaining-public-final` | Three files, Chromium/one worker/`--max-failures=4`; **26 passed/four failed**, 30 identities, 7.6m. Two sequence tests lacked real reveal prerequisites; two checklist tests tried to visit Evidence with sparse credit `[3]`, which correctly does not unlock index 2. This run started before the reveal/instrumentation hardening edits finished and is diagnostic evidence, not a final-source pass |
| `m8-v3-final-contracts` | Three files/all four projects/one worker/isolated home/`--max-failures=1`; **24 passed/one failed/95 not run**, 322.626653s. Reveals now pass; the remaining checklist test still used inaccessible sparse credit `[3]`. Corrected to `[2]` (Evidence itself), preserving sparse-credit/unknown-data/fixed-index/replay assertions. Exact failed compact report: `v3-contracts-initial-results.json` |

The fail-fast attempts also reported an outside-test early-stop runner error;
none is represented as a clean suite. Development failure contexts/screenshots
were exclusively preserved under `v3-development-failures/`; their 21 hashes are
in `v3-development-artifacts.json`. The accidental-timeout run has no completed
JSON report and is explicitly counted only by the observed log, not reconstructed
as a pass. No further code edits occurred during the final passing command below.

Further test hardening makes denial/quota behavior independent of Playwright's
unspecified `addInitScript` callback order: one wrapper reads a separate mode at
interaction time. Public Middle now explores the actual reveal prerequisites;
completed-section navigation seeds must not fabricate historical exploration.
Tests/fixtures/production baselines, content, gates and focus rules are not relaxed.

## Final selected browser results

**Passed 120/120**, 30 per Chromium/Firefox/WebKit/mobile Chromium, zero
failed/skipped/flaky/outside-test errors, **953.479698s**, root and
`/discussion-skills-lab/` in each project:

```sh
caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/middle-questions.spec.mjs tests/browser/lesson-boundaries.spec.mjs tests/browser/controller-lifecycle.spec.mjs --workers=1 --max-failures=1 --output=test-results/m8-v3-final-contracts-verified
```

Exact compact report with all identities/durations and original JSON SHA-256:
`v3-contracts-verified-results.json`. Covers all new public/boundary/controller
contracts, Middle safe v1 question/checklist hydration and both pinned original
Middle mounts. It is a **three-file selection, not the whole Playwright suite**.
The checklist correction first passed a separate Chromium 2/2 selection:

```sh
npm run test:browser -- tests/browser/middle-questions.spec.mjs --grep 'reordered checklist saves' --project=chromium --workers=1 --max-failures=1 --output=test-results/m8-v3-checklist-correction
```

**Passed 14/14 dependency assertions**, Chromium only, both mounts, zero failures/
skips/flakiness/runner errors, **102.395118s**:

```sh
caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/app-lifecycle.spec.mjs tests/browser/middle-lesson.spec.mjs tests/browser/final-lesson.spec.mjs --grep 'duplicate mounts|destroy during|bounded registry|pending activity|failed Markdown|Middle full content-driven journey|Final all valid v1 fixtures' --project=chromium --workers=1 --max-failures=1 --output=test-results/m8-v3-port-dependencies
```

`v3-port-dependency-results.json` retains all identities/results and report hash.
This freshly verifies the generic app ports (ten identities), every safe Final
v1 fixture's full UI hydration (two) and real Middle fresh journeys/every alternative/
one-missing gates (two). These are separate scoped runs, **not** an exhaustive
fresh journey/legacy/presentation/print matrix across every engine. Existing public
Middle reference/semantic print evidence remains at its previously recorded scope;
no reference implementation changed in this session.

## Exact reviewed sources and final integrity

`remaining-sources-v3.json` records HEAD/branch, all **25 proposed whole-file**
identities, bounded CLI/README/unit-guard excerpts, 12 proposed retained fixture
files, 13 retained browser specs, 14 replacement/oracle sources and the fresh
copied-content audit hash. Source hashes must be checked again after the user
decision, not assumed stable indefinitely. All code candidates remain intact.

No runtime/canonical/schema/script/sealed-input edit occurred. The human check
guide now points to canonical boundary/public question checks. Final whitespace,
snapshot, documentation-link and scope checks are recorded in the appended handoff.

Final integrity audit **passed**: 69 source/replacement identities, 21 preserved
development-artifact hashes, both passing report scopes, 13 local links across
the current proposal/check guide, authored-code whitespace, unchanged HEAD and
documentation-only tracked diff. `git diff --check` passed.

The latest documentation/skill guardrail was also checked against starting HEAD:
**14 durable files unchanged**, with only the scoped `docs/checking-changes.md`
reference/example update. Across all 14 guide/skill/command/README files,
**76 local links/nine heading anchors** pass, with no human-guide dependency on
refactor records. Skill frontmatter/five workflows/safety and all five wrappers'
routing/no-shell/no-model-override/subagent-false/one-placeholder structure pass
**25 static argument-preservation cases**. Native `dsl-maintenance` skill loading
succeeded at session entry; its exact source remains unchanged. These static
checks do not claim interactive slash-command/model compliance. The first
dependency-audit attempt incorrectly rejected a harmless explanatory **mention**
of `.opencode/docs/` in the unchanged usage guide; corrected the audit to inspect
actual link dependencies, not the guide. No durable surface was rewritten to pass.

The updated guide's exact example also **passed 55/55**, zero failures/skips:

```sh
node --test --test-reporter=dot tests/unit/lesson-boundaries.test.mjs tests/unit/opening-migration.test.mjs
```

## Manual and release limits

No new interactive Chrome/Firefox/Safari preview, actual browser zoom, physical
iOS/Android, screen reader, physical print or owner recheck was performed or
inferred. No new screenshot/PDF file review is claimed for this test-only work.
The prior owner acceptance of production appearance remains historical evidence,
not an invented device/AT matrix. Full suites and exhaustive presentation replay
matrices were not run under the targeted-only instruction. Post-removal checks
cannot run until the v3 decision authorizes the exact cleanup. No release claim.
