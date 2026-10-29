# Milestone 8 — expanded migration-support audit, inventory v2

2026-10-28; starting/current HEAD
`fc51bac0e8a790ccf40f83720059feed7c9eb501`, branch
`refactor/shared-components`. The preceding uncommitted milestone-8 implementation,
tests, source snapshot and evidence were inherited and preserved. This follow-up
changes documentation/review evidence only; no runtime, test or fixture source,
root HTML, cleanup candidate, vendor/license or deployment setting was changed.

## Owner clarification and corrected assessment

The owner says the migration previews were temporary and that anything supporting
Opening/Middle/Final migration should be a removal candidate. An active temporary
test importing another temporary fixture is a dependency to unwind, **not a reason
to retain that fixture permanently**. Inventory v1 did not make that distinction
consistently; v2 supersedes its blanket harness/cutover-helper retention.

This direction authorizes the expanded review, not an unitemized deletion. All
candidate removals remain gated; all existing v1 S/H/P/R items remain unapproved.

## Coverage/evidence

The read-only file/dependency audit covers:

- **27 helpers, 30 browser specs, 14 unit files, all 35 unsealed harness files**;
- **586** individually hashed source/content/fixture records, with stable MS IDs,
  group/disposition, sealed status, statically resolved import/URL references and
  literal/documentation references clearly distinguished;
- **877** individually enumerated/hashed historical evidence files, retained rather
  than confused with the tools that generated them;
- six exact byte comparisons of Final reference fixture copies to published
  counterparts: all equal. This is not a whole-tree content-equivalence claim.

Paths and SHA-256 identities:
`milestone-8/migration-support-v2.json`; source-file review table:
`milestone-8/migration-support-v2.md`. The index is an assessment, not whole-file
deletion authorization for mixed files. Exact block scopes and port prerequisites
are in `../legacy-removal-inventory.md`.

Source inspection includes root dependency tags, npm scripts/test discovery,
server fixture/replay dispatch, production thin entries/configs/content, controller
markup, all helper/browser/unit/harness sources, known schema/formatter imports,
and active versus historical documentation references. Searches for
`middle-harness.html`, `middleLesson`, `finalReferencePilot`, extractor function
calls, cutover helpers and fixture URLs are corroborated with the actual source
graph. A literal match is not asserted to be a required runtime consumer, nor is
"no matches" the only evidence supporting a proposal.

## Findings and proposed disposition

- **T01:** the whole-Middle preview route and its entry are a closed temporary
  chain. No browser spec navigates to the preview; `middle-lesson.spec.mjs` loads
  the actual public `middle.html`. Propose retiring route/import and entry together.
- **T03:** intermediate cutover/extraction transforms are not replay dependencies.
  Propose retiring them with final shell integration and replacing only stale
  current-format guards. Keep exact content, original VM/server/seal assertions.
- **T04:** three one-off extractors have only their own CLI callers. The unused
  Final pilot transform still emits a now-removed script URL. Propose retiring those
  tools/block, retaining the separately used semantic `referenceInventory` function.
- **T05/T06/T07:** completed milestone-specific archive tools, baseline-creation
  capture/freeze/seal tool chain and current-checkout-vs-initial audit command are
  candidates. Preserve their outputs/provenance and the original reader/allowlist;
  partial approval must not strand a remaining import.
- **T02/T08/T09:** isolated Middle questions/reference, partial Final app/site and
  shared component/navigation/storage/writing sandboxes are retirement candidates,
  **not deletion-ready**. They still own meaningful remount/cancellation/late
  clipboard/invalid-data/reordered-ID/independent-reference/exact-text assertions.
  Those assertions must move to actual pages or smaller generic fixtures first.
- **T10:** presentation comparison/capture suites are reviewed for consolidation,
  not automatically deleted or retained wholesale. Preserve unique readability,
  roles, state cues, responsive/reveal and approved profile assertions; identify
  overlap and disposable migration capture/oracle plumbing explicitly. No suite
  speedup is claimed without measurement.
- **T11:** this milestone's staging/archiving/snapshot code is also temporary.
  After approved cutover, final tests must use real public files, not intercepted
  proposed responses. Keep semantic print/reorder/home/shell assertions and evidence.
- **B01/V01 and durable contracts:** sealed original engine/maps/progress/banks/
  captures, meaningful unused variants and independent preservation assertions stay.
  Some tests named "migration" or "extraction" already exercise delivered pages and
  provide ongoing protection; assess their assertions, not just their filenames.

No assertion-port/deduplication work was silently performed in this audit. Deferred
groups are still milestone-8 cleanup work, not a permanent-retention decision or
an automatically approved later task. No instructional variant/archive is deleted.

## Executed targeted checks

Node v22.23.4 using `eval "$(fnm env --shell zsh)"` then `fnm use 22`.

```bash
node --test --test-name-pattern='server mounts' tests/unit/baseline.test.mjs
```

**Passed 1/1**, no failures/skips, 860.209458ms runner duration. This verifies current
and pinned replay mounts/bytes/MIME/allowlist/traversal/lifecycle; it is not a full
unit run or proof of removals not yet made.

Read-only Node HTTP audit using `startServer()`/`fetch`, isolated random local port:
**7/7 passed**. At `/` and `/discussion-skills-lab/`, checked temporary preview HTML,
its fixture entry and the independent real Middle page; also checked original
Middle replay. Public HTML uses `assets/js/middle.js`, not `middle-lesson.mjs`;
preview HTML still uses the temporary entry. Evidence:
`milestone-8/migration-route-audit-v2.json`. Server closed in `finally`; no persistent
review server or test process remains. These are HTTP checks, not browser execution.

Final static audit verifies all recorded source/evidence hashes, complete per-file
coverage and documentation links, unchanged HEAD, no newly deleted files and
`git diff --check`. No full browser/unit/content suite was rerun for a documentation/
dependency audit, respecting the owner's targeted-test instruction.

## Remaining gates

No cleanup deletion, test disabling, source move, commit, merge, push, tag or
publication. Seek explicit inventory-v2 item approval for deletion-ready proposals;
prepare/prove deferred assertion ports before seeking their precise removal
approval. Then perform only approved removals with scoped regressions. New actual-
page owner browser verification and separate commit authorization remain required.
