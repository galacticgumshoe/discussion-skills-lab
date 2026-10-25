# Milestone 4 checkpoint 4.2 verification — 2026-10-25

Starting HEAD: `da38eaea3e476e6c05bda5520a1b1f89bf72e121`.
Branch: `refactor/shared-components`. Checkpoint-4.1 implementation/tests/docs and
the prior owner-clarification evidence/handoffs were inherited uncommitted and
preserved. No production lesson/entry, classic core, stylesheet, sealed fixture,
adapter/store, schema, dependency, test runner configuration or baseline test was
changed. No commit/merge/push/publication/Pages change.

Read contracts, milestone-4 specification, complete latest handoff/evidence and
compatibility/checklist/inventory/issues; confirmed frozen maps, extracted Opening
and safe reference pipeline. The latest owner-confirmed prerequisite resolution is
retained, not replaced by a renewed request for the already accepted manual checks.
Fresh-session checkpoint-4.1 tests passed before implementation.

Node v22.23.4; all npm invocations use process-local setup:

```sh
eval "$(fnm env --shell zsh)"
fnm use 22
```

## Commands and outcomes

| Exact command | Outcome |
| --- | --- |
| `npm run test:unit` (prerequisite revalidation) | Passed 66/66, zero failures/skips |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/storage-boundaries.spec.mjs --output=test-results/storage-boundaries-4-2-prerequisite` | Passed 60/60, all four configured projects, 1.5 minutes |
| `npm run test:unit` (implemented checkpoint) | Passed 78/78, zero failures/skips; 12 new completion/content tests |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/navigation.spec.mjs --output=test-results/navigation-4-2` (initial new-test run) | **Failed**: 43 passed, 5 failed, 52 seconds. Four CSSOM percentage-string assumptions; one WebKit pointer-focus assumption. Details below. |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/navigation.spec.mjs tests/browser/storage-boundaries.spec.mjs --output=test-results/navigation-storage-4-2` | Passed 108/108, 27 per project, 2.0 minutes; 48 navigation + 60 storage checks |
| `npm run test:unit` (final code/documentation review) | Passed again 78/78, zero failures/skips |
| `npm run validate:content` (final review) | Passed existing reference schema, IDs, paths and Markdown files; no new content schema/type introduced in 4.2 |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser` (full cumulative regression) | **Passed 344/344**, 86 per Chromium/Firefox/WebKit/mobile Chromium; zero failed/skipped/flaky, 648.388129 seconds. Includes all 236 existing production/pilot/security/replay checks, 60 storage checks and 48 navigation checks. |
| `git diff --check` (final review) | Passed tracked changes, including preserved inherited documentation |

A Python read-only whitespace audit also passed for all seven new checkpoint-4.2
files (runtime, tests, fixture HTML/module and this evidence), checking final LF
and no trailing whitespace; untracked files are not covered by `git diff --check`.

Full-suite report start: `2026-10-25T15:50:36.558Z`; SHA-256 of ignored
`test-results/results.json`:
`1d0f69d549f69aaf7bb861238f3b2bccc44e77cd78d1a158ba5bb960a58120b5`.
The completed report was inspected: 344 expected, no runner errors, failures,
skips or flaky tests, 86 expected per configured project. Production lessons,
homepage, content security, policy, restoration and reference-only printing/pilot
checks exercise `/` and `/discussion-skills-lab/`; replay uses `/__original/` and
`/__original/discussion-skills-lab/`. Navigation uses the isolated root fixture
route. The command ran with the unchanged default three workers, fresh Firefox
application-data home and no retries/assertion changes. No code changed after the
passing focused run; only documentation was completed while this full run executed.
The interim pending-result handoff is preserved; a final verified entry follows it.

### Initial new-test failures and corrections

- `rail/mobile selection…` failed in all four projects only at string equality
  for `#progress-fill.style.width`: JS computed `28.57142857142857%`, while CSSOM
  serialized `28.5714%` (Chromium/Firefox/mobile) or `28.571429%` (WebKit). Count,
  aria maximum/value, selection, heading focus and access assertions had passed.
  The test now parses the numeric percentage and uses precision 3 (tolerance
  0.0005 percentage points). No count/policy/content assertion was relaxed, and no
  layout mask or screenshot rewrite was used.
- `meaningful field/exploration/checkpoint changes…` failed only in WebKit at the
  assumption that a pointer click focuses `#test-explore`. Native WebKit buttons
  do not imply pointer focus. The test now explicitly focuses that test control
  and activates Enter, retaining the focus assertion after state/navigation update.
  Pointer click navigation and explicit intended-heading focus remain tested.
- Only the new test file changed to correct these assumptions. No runtime or
  production change was needed. Initial failure attachments remain under ignored
  `test-results/navigation-4-2/`; no retries/skips/forced clicks or new waits added.

## Scope, APIs and exit-criteria evidence

- New `assets/js/app/{completion,lesson-core}.js`; APIs and exact ownership are
  documented under checkpoint 4.2 in `../progress-compatibility.md`. Navigation
  receives explicit stable IDs/views/labels/requirements/reference roles, with
  optional intended heading. It never infers order from `.lesson-view`, parses
  `view-N`, reads storage, awards credit, calls gates or persists current section.
- Pure access tests compare all **896** subsets (128 Opening, 256 Middle, 512
  Final) with the real pinned `0b5d2297e7cbc19bd59cde750492dd28e3983ca0` classic
  core. Unknown/numeric IDs fail; first/predecessor/completed/reference semantics
  exactly match, including non-contiguous credit.
- Unit test gates distinguish current-answer from correct-ever inputs and test
  every one-missing exploration/earned-answer/draft/check requirement. Section
  completion is stable union; previously completed sections need no reconstructed
  activity history. Literal true is required; reference gates are never called.
  Unchanged/UI-only transitions cannot earn credit.
- The harness directly mounts navigation and connects meaningful test-control
  mutations → pure completion → the verified store → navigation update. Bootstrap,
  refresh, Next/Previous, rail/select/reference visits never evaluate gates/save.
  Clearing a draft/stale update cannot relock credit. Actual persisted completion
  uses adapter indexes `[0,1]` even with reordered views/decoys; all three adapters
  also have completion/store unit integration.
- Browser checks exercise desktop rail/collapse and mobile selector, disabled
  access/current-step ARIA, intended h1/h2/h3 focus, bottom controls, progress
  maximum excluding reference, zero/non-contiguous reference access, refresh-first
  and expanded rail, focus/scroll neutrality on updates, real successful-navigation
  scroll reset, no-op/ready-state hydration without saves, corrupt/quota in-memory
  unlocking, duplicate-mount guard and idempotent destroy/remount listener cleanup.
- Test-only content excerpts: 15 headings/introductions plus eight labels copied
  from pinned/extracted Opening, exact independent unit comparison, © Rhys Jones /
  CC BY 4.0 attribution. No invented questions; these are not real lesson gates.
  Only fixture composition changes (h1/h3 focus variants and root-scoped test
  controls); no production layout/content or shared styles change.

## Manual checks and remaining scope

No new interactive browser/device/AT/actual zoom/print-preview check performed.
Automated focus/scroll/live-region tests are not screen-reader or manual evidence.
No animation/component/printing implementation is part of this checkpoint. Existing
manual follow-ups remain in `../regression-checklist.md`; they are not asserted
complete. The Final reference pilot remains in the production regression scope.

Only checkpoint **4.2** is requested in this session. Checkpoints 4.3–4.5, shared
activity components, writing/reference integration, general renderer and
`mountLesson` bootstrap remain unimplemented and unverified. Overall milestone 4
is incomplete; next unverified checkpoint is **4.3**. No live lesson cutover or
milestone-5 implementation performed.

## Checkpoint gate

Checkpoint **4.2 verified**: explicit stable-identity navigation and pure completion
helpers meet their scoped exit criteria. Meaningful state changes can earn permanent
credit; visits/Next/hydration/no-op updates do not. Stored completed pages never
relock, reference access remains independent, current section/collapse are not
persisted, and no production shell/engine is replaced. Required checkpoint-4.1
revalidation, cumulative units, navigation/storage browser checks, content validation
and the complete existing production/pilot/replay regression suite pass. No blocking
verification gap remains for this checkpoint. Manual follow-ups above are honestly
pending, not a claim of screen-reader/device/print-preview verification.

Stop after the requested checkpoint 4.2; **milestone 4 remains incomplete**.
