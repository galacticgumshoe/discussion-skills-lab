# Remaining containers — v4 review draft

2026-10-30. Source HEAD `61ff6898a6675d000d76e76e225d1852e56d9fb9`, branch
`refactor/shared-components`. **Ready for owner review, not deletion approval.** The
owner rejected the old retention option; meaningful assertions must survive
consolidation. T09 has passing combined four-project coverage (448 distinct cases,
including 24 explicit public model-mode/restore cases). T10's complete role matrix
passed **24/24 in one clean invocation**; narrow/spacing/final-source passed
**32/32**. No item here is silently treated as approved by the earlier T02/T08
decision.

This replaces v3's **proposed retention**, not its historical evidence. It does
not widen any production/CSS cleanup, archive, dependency or release permission.
The exact source/replacement snapshot is recorded in
[`consolidation-sources-v4.json`](consolidation-sources-v4.json) and must be
checked again immediately before removal.

## T09-CONSOLIDATED-v4 — whole files

Proposed exact scope, **18 whole files**:

1. `tests/fixtures/harness/components.html`
2. `tests/fixtures/harness/components.mjs`
3. `tests/fixtures/harness/navigation.html`
4. `tests/fixtures/harness/navigation.mjs`
5. `tests/fixtures/harness/storage.html`
6. `tests/fixtures/harness/storage.mjs`
7. `tests/fixtures/harness/writing-reference.html`
8. `tests/fixtures/harness/writing-reference.mjs`
9. `tests/fixtures/harness/writing-reference.css`
10. `tests/fixtures/harness/component-data.mjs`
11. `tests/fixtures/harness/writing-data.mjs`
12. `tests/fixtures/harness/README.md`
13. `tests/browser/components.spec.mjs`
14. `tests/browser/navigation.spec.mjs`
15. `tests/browser/storage-boundaries.spec.mjs`
16. `tests/browser/writing-reference.spec.mjs`
17. `tests/unit/components.test.mjs`
18. `tests/unit/formatters.test.mjs`

**Classification:** obsolete test containers with mixed source-backed excerpts;
the independent reader functions are a baseline-oracle dependency and therefore
move unchanged to `tests/helpers/baseline-activities.mjs`, not into a new copied
fixture application. Two obsolete pre-cutover static guards are replaced by
current entry checks; no assertion that the current site must remain unmigrated
survives as a false requirement.

**Replacements/content/consumers:** the assertion-level map in
[`consolidation-coverage.md`](consolidation-coverage.md) names the direct API,
public page, policy/codec and independent pinned handler destinations. All three
reader function bodies/templates match the old modules exactly. Navigation's 15
passages/eight labels are checked on the real Opening page/manifest against
pinned original. Other questions/feedback/models/placeholders/checklists/templates
remain in canonical content plus sealed original/maps/banks and exact-content
tests. No unique unpublished instruction belongs to these containers. Their
synthetic test labels/gates are not production instruction or policy.

The only remaining executable harness-path consumers are the four browser specs,
two fixture modules and the bounded completion-unit block below, all explicitly
in this scope. Fixture HTML/CSS/modules have no production imports/entry links.
The real test server exposes fixture paths generically; removing these files
must produce ordinary 404s, not a fallback or replay redirect. Historical agent
records retain provenance links; the current human guide now names verified
replacement tests. No broad directory deletion is proposed.

**Risk/checks:** preserve fixed legacy mapping, unchanged-save/draft/credit/opaque
record safety, original-engine replay, native toggle hydration, clipboard timing,
focus/live-region/controller cleanup and CSS decoy isolation. All 424 distinct
core replacement cases plus 24 dedicated model-mode cases have passing coverage
across four projects/both mounts through explicitly documented combined runs;
the final generic writing enlargement extension additionally passes eight cases.
Units/validation pass. The refreshed snapshot confirms every whole-file candidate
matches its reviewed hash; the only HEAD differences are the two reviewed stale
guard corrections. **Approval state: approved by the owner on 2026-10-30 and all
18 files removed.** Post-removal units/validation and the 24 removed-fixture 404
checks pass; the five remaining replacement specs passed 368/368 across all four
projects.

## T09-COMPLETION-v4 — bounded retained-file removal

`tests/unit/completion.test.mjs` only:

- Remove the final test named
  `navigation harness excerpts and ordered labels match pinned Opening content independently of screenshots`
  (currently lines 160–176).
- Remove only its now-unused `import { readFileSync } from 'node:fs';`
  (currently line 4).
- Retain the other completion/pinned-core/store tests and their `vm`/`original`
  imports unchanged.

Its 15-excerpt assertion now checks the actual public page in
`navigation-contracts.spec.mjs`, and its eight-label/pinned-literal/manifest
assertions live in `component-contracts.test.mjs` and the public navigation check.
It is the last consumer of the old navigation fixture; retaining the copied
markup to satisfy this test would contradict the requested consolidation.
No instructional content is uniquely owned here. **Approval state: approved by
the owner on 2026-10-30; the test and unused import are removed.** The resulting
file matches the reviewed expected SHA-256
`fbf7f46b1cf3418aec80a7ec5fd792c687c95057a8c3926ea5c490228fb3448e` (157 lines),
and the affected unit selection passes 126/126.

## T10-CONSOLIDATED-v4 — whole files

Proposed exact scope, **nine whole files**:

1. `tests/browser/flashcard-presentation.spec.mjs`
2. `tests/browser/evidence-presentation.spec.mjs`
3. `tests/browser/structure-presentation.spec.mjs`
4. `tests/browser/middle-presentation.spec.mjs`
5. `tests/browser/middle-activities-presentation.spec.mjs`
6. `tests/browser/final-presentation.spec.mjs`
7. `tests/browser/final-heading-cues.spec.mjs`
8. `tests/browser/opening-presentation.spec.mjs`
9. `tests/browser/opening-essentials-spacing.spec.mjs`

**Classification:** obsolete duplicated test traversal/capture containers, not
obsolete public behavior. Their unique paint/role/grouping/state/accessibility/
restore/spacing assertions move into `presentation-contracts.spec.mjs` and one
`helpers/presentation-contracts.mjs` traversal, with genuine policy/content/print
obligations remaining in their independent existing suites. See the full mapping
and explicit geometry/capture deduplication decisions in the coverage record.

**Content/retention/replay:** no instructional archive/source/map/bank/progress/
capture/seal is in this removal set. Test-only synthetic drafts are not unique
instruction; expected original text still comes from the same pinned Git reader
or sealed fixtures. Historical original/current screenshots, PDFs, attribution
and third-party notices remain. The 15-path replay allowlist/pin is unchanged;
Git history is not substituted for the retained sealed artifacts/variants.

**Consumer evidence:** Playwright discovers these files by filename; no production
entry imports them. Current human guide's generic presentation advice need not
depend on their obsolete filenames. The new traversal still visits every authored
section and matches original/current source roles at the original widths plus
Middle's 940px grouping width; exact essentials geometry remains a dedicated case.
Paint-role traversal uses reduced motion to avoid repeatedly waiting half a second
for every card; separate API contracts verify actual normal 3D transformation and
the reduced-motion rule. No style/policy is altered to make the port pass.

**Risk/checks:** new selectors/state setup must not silently omit roles or replace
independent checks with self-comparison. Final original question credit is reset
before exercising first-wrong/correct/wrong-after-credit paint. Hover is moved off
neutral controls before capture; explicit authored source/card counts remain.
The complete role matrix passed **24/24 in one clean invocation** (six per
project/both mounts, zero skips/failures), and narrow/spacing/final source passed
**32/32**. The bounded Tailwind setup retry still requires the real generated
stylesheet on every attempt; a persistent CDN outage fails explicitly. **Approval
state: approved by the owner on 2026-10-30 and all nine files removed.** The
replacement specs' post-removal browser closure passed 368/368 across all four
projects and the 24 removed-fixture 404 checks also pass.

## Boundaries and outcome

The owner approved the exact **27 whole files + one test block/unused import**
scope on 2026-10-30, and that scope has been removed. The JSON snapshot records a
whole-file set digest
(`0f4fc0c4dd20f222165c539bd014bc8f0565ab0fe3ce392e2c4cdbc57b723e7d`), the bounded
completion block/import and resulting file hash, the consumer closure (four former
candidate browser specs plus the retained completion block, zero other executable
consumers) and post-removal expectations.

Immediately before deletion, every candidate hash and the completion block matched
the reviewed snapshot, all 12 fixture paths returned 200 at both mounts and the
four public entries returned 200. Post-removal, all 27 files are absent, all 24
fixture URL checks return ordinary 404s at both mounts, the eight public-entry
checks return 200, the completion file matches its expected hash and the affected
unit/content checks pass. The five remaining replacement specs then passed
**368/368** in one clean all-project browser invocation (37.3 minutes, zero
skipped/unexpected/flaky). The owner's earlier T02/T08 25-file/two-CLI-edit
approval remains a separate scope. No commit, merge, push, tag, publication or
Pages change.
