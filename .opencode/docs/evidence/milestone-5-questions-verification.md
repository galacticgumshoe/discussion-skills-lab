# Milestone 5 — first extraction/policy review unit

Status: **incomplete milestone**, pre-cutover review unit. Session: 2026-10-25.
Starting HEAD: `da38eaea3e476e6c05bda5520a1b1f89bf72e121`.
Branch: `refactor/shared-components`. No commit/publication authorized/performed.

## Scope and provenance

- Read root instructions, contracts, milestone-5 specification and the final
  complete/verified milestone-4 handoff (all five checkpoints).
- Inherited uncommitted milestone-4 code/tests/schemas/evidence and documentation
  were preserved. This unit adds `lessons/middle/completion.js`, seven activity
  JSON files, an archival JSON/schema, one unit test file and the direct
  question/checklist harness/browser tests. Development validator gains only
  the archive dispatch/validation, preserving its earlier graph/API work.
- No production HTML/JS entry/CSS, codec/store/component/runtime implementation,
  dependency, runner configuration, root license or sealed fixture changed.
- Exact source → destination identities and remaining unmoved content are in
  `../content-inventory.md`, “Milestone 5 — first extraction review unit”.
- Original content © Rhys Jones, CC BY 4.0; code/schema/mechanical test material
  MIT. `legacy-variants.json` has original revision/path/symbol/index provenance
  and non-published status; no renderer loads it.

## Executed checks

Node setup for agent-run npm/Node commands:

```sh
eval "$(fnm env --shell zsh)"
fnm use 22
```

Node v22.23.4. Commands do not use real student data or personal profiles.

1. **Passed prerequisite:** `npm run test:unit` — 136/136, no failures/skips.
2. **Passed prerequisite:** `npm run validate:content` — existing pipeline/graph.
3. **Passed prerequisite:**
   `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/lesson-harness.spec.mjs tests/browser/writing-reference.spec.mjs --output=test-results/middle-5-prerequisite`
   — **184/184**, 46 each Chromium/Firefox/WebKit/mobile Chromium, 2.5 minutes;
   both root/repository fixture mounts, writing/model/checklist/reference APIs,
   failure isolation, safe store boundaries and previous bootstrap contracts.
4. Initial `node --test tests/unit/middle-migration.test.mjs` — **failed**,
   10 passed/one test-oracle failure: empty default-only encode omitted
   `middleState`; inert oracle dereferenced undefined. Corrected test stub to
   use `{}` without changing adapter/policies/content/expectations.
5. **Passed:** `npm run test:unit` — **148/148**, no failures/skips, after
   adding archive checks. Twelve new tests cover all eight real gates, each
   single missing prerequisite, independent correct-ever/latest-answer state,
   pure/monotonic completion, optional models, empty post-assembly fields,
   every valid Middle fixture, all 20 extracted question/answer/feedback records,
   nine generated check labels, exact five archival values and ten malformed
   archive cases. Follow-up adds actual pinned restore-reveal execution and
   `node --test tests/unit/middle-migration.test.mjs` passes **12/12** again.
6. **Passed:** repeated `npm run validate:content` — all new activity/archive
   schemas and existing configured graphs; archive is development-only and
   rejected by runtime activity validation. No runtime archive consumer exists.
7. **Passed:**
   `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/middle-migration.spec.mjs --output=test-results/middle-5-questions-initial`
   — **40/40**, ten each Chromium/Firefox/WebKit/mobile Chromium, 1.1 minutes;
   both root/repository-prefix fixture mounts (see the later include-path audit
   below before inferring prefixed content-request coverage), all ten valid old
   Middle fixtures per mount, immediate cursors/reload,
   every sequence option/feedback, wrong-after-credit, zero quiz option, direct
   jumps/score/review-first, native keyboard/focus, silent hydration/remount,
   fixed index 4 despite reordered checks/hosts, unknown/transient preservation,
   extended-v1 original-engine replay on both pinned replay mounts.
8. **Failed:** `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser` —
   entire cumulative suite, shell `sh_17494dd0e001rtSSgjc6jJz3Zb`; **625 passed,
   three failed**, 909.268157 seconds. Chromium/Firefox/mobile Chromium each
   157/157; WebKit 154 passed/three Opening timeouts (120-second test budget).
   All 40 new Middle tests passed again. Failure identities:
   - `opening-extraction.spec.mjs`: root and repository-prefix scope/order/replay.
   - `persistence.spec.mjs`: root current Opening observed restore.
   Report start `2026-10-25T19:41:16.133Z`, SHA-256
   `24adb693e8d7f1ec756b10e0b2bfa112c395668f1f66be436acfeffadd43978e`;
   zero skipped/flaky/runner errors. No pass inferred from partial results.
   Read-only ZIP trace inspection on resume found ~111-second `page.goto` waits
   for current Opening in both extraction failures, and a ~112-second readiness
   expectation in the persistence failure. Page snapshots contained initialized
   Opening content. This establishes where the test budget elapsed, **not** a
   root cause or proof a site defect can be ignored. Opening source/runtime and
   these tests were unchanged in this unit. No overlapping browser command,
   retries/skips, forced clicks, altered timeout/security settings or baseline
   rewrite used. Fresh unchanged focused retest pending.
9. Repeated final-source `npm run test:unit` **passed 148/148** after the reveal
   oracle refinement; `npm run validate:content` and `git diff --check` passed.
   Read-only whitespace/final-newline audit passed all 15 newly created files.

## Owner commit / resumed checkout

While waiting for a usage reset, the owner committed the inherited milestone-4
work as `b93d74548c39ec1dc7d14d484b8033ea0411379b`. Resumed `git status` confirms
only this session's milestone-5 changes remain modified/untracked; the branch is
still `refactor/shared-components`. The implementation starting revision above
remains the actual original session starting revision; it is not rewritten to
pretend this owner commit was the initial checkout. No user changes reverted or
agent commit made. All milestone-5 paths remain present.

The resumed include-path audit found that the fixture server's `__fixtures`
alias has one fewer segment than `tests/fixtures`. A three-parent relative content
URL therefore escaped the repository prefix only in the alias mount. The new
harness now explicitly distinguishes those two **test-only** entry locations;
its root/prefix tests assert all seven actual content-request path prefixes. No
production URL loader or root-absolute content path was introduced. Subsequent
reference work/results are in `milestone-5-reference-verification.md`.

## Independent preservation evidence

Gate oracle executes the actual pinned `updateCompletion` function with inert
checkbox/core hooks, not a duplicate expected policy. Reveal oracle executes the
actual pinned restore `show(...)` calls over old global-index sets. Unit tests use
frozen stable maps/ordered bank arrays and compare correct-option identities from
original numeric keys independently of prose. Archive `referenceText` is evaluated
only from its audited data-only declaration; it is exact and not the displayed
reference. No source/history fetch, original checkout substitution or resealing.

All public entries remain untouched; the ordinary source-boundary and sealed
fixture tests continue to enforce this. Shared runtime/registry/components are
reused, not replaced. The harness displays only a subset; its test-only Arial/
outlined boxes/all-activities-at-once composition is not Middle visual acceptance.

## Remaining required work / evidence

This is a resumable review unit, **not a blocked prerequisite or a request for
additional authorization**. The remaining full migration cannot safely be
claimed done from question-only evidence:

- Extract all HTML instructional composition/headings/labels/prose into Markdown
  and bounded groups, all nine cards/panels, research selection and application
  A/B/writing/models/control wording, and the real five-item reference.
- Add narrowly scoped shared rich-body/reveal/reference layout support. Preserve
  lists/emphasis/hard breaks, native keyboard semantics and unclipped card sizing;
  do not flatten rich content merely to fit current plain-text component APIs.
- Bridge research question state to the existing separate correct-ever flag and
  keep both visible application questions in their existing single activity state.
  Add shared `Try Another Strategy` without clearing last evidence/credit.
- Create the complete config/manifest, mount all sections through `mountLesson`,
  and verify every section before one atomic public cutover. Do not run both
  legacy/new live writers or create a partial production manifest pretending the
  lesson is complete.
- Run full fresh journeys/one-missing-per-page browser gates, all integration
  fixtures/rollback cases, partial research/model immediate reload, failure/retry/
  storage warnings, visual/longest-card/zoom review, reference-only PDFs and
  actual manual preview status. No new manual visual/AT/device/print check was
  performed here; existing owner acceptance is not reattributed to this unit.
- Continue milestone 5 only; do not migrate Final/consolidate all shared styles.
