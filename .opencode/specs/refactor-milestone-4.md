# Milestone 4 — Shared runtime primitives and legacy progress adapters

## Assignment and prerequisites

Read `AGENTS.md` and `.opencode/specs/refactor-contracts.md`. Implement only milestone 4 after milestones 1–3 pass. Require frozen initialized maps/progress fixtures, extracted Opening, and the safe reference pipeline. Read every baseline engine before coding adapters.

**Outcome:** shared components, normalized state, pure completion helpers, and tested v1 codecs ready for lesson cutovers. Develop them in isolated harness pages using real extracted baseline content. **Do not partially replace the live Middle/Final/Opening activity engines or run two writers against a key.** The first full lesson cutover is milestone 5. The existing Final reference pilot continues working.

## Files

Create under the established structure:

```text
assets/js/app/{lesson-app,lesson-core,progress-store,section-renderer}.js
assets/js/components/{flashcards,expandables,multiple-choice,
  question-sequence,writing-activity,checklist}.js
assets/js/utilities/clipboard.js
assets/css/components.css
lessons/{opening,middle,final}/progress-adapter.js
schemas/{lesson,activities,progress}.schema.json
tests/unit/{progress-adapters,completion,formatters}.test.mjs
tests/browser/{storage-boundaries,navigation,components,
  writing-reference,lesson-harness}.spec.mjs
tests/fixtures/harness/…
```

Extend milestone 3 loader/runtime validation/dev validation and quick-reference component only as needed. Update `.opencode/docs/progress-compatibility.md`, known issues, regression checklist, inventory, and status. Preserve original classic `assets/js/lesson-core.js`; the new module lives in `assets/js/app/lesson-core.js` so legacy lessons keep running. No production lesson entry is switched in this milestone.

Avoid empty scaffolding and frameworks. Each module must have exercised behavior. Specialized task-analysis and note-classification renderers belong to milestones 7 and 6 respectively.

## Required checkpoint sequence

Milestone 4 remains **one architectural milestone**, but implementation must proceed through checkpoints **4.1–4.5 in order**. The design requirements below are a reference, not permission to implement everything before testing. Complete and verify the current checkpoint before starting the next one's implementation.

At every checkpoint:

1. Implement only its scoped behavior and the minimal test support it needs. Earlier checkpoints may use directly mounted components, supplied validated data, and small test-only completion policies; do not prematurely build the full renderer or production lesson integrations to make a test run.
2. Run its relevant tests plus the cumulative unit suite. Use the actual commands established by earlier milestones, preserving `npm run test:unit` and `npm run test:browser`. Targeted Playwright runs can select the files listed below and must use the established browser projects, not silently limit verification to Chromium.
3. Run the existing production baseline browser suite to catch shared-code/style regressions. No checkpoint may switch a live lesson engine, alter legacy progress keys, or disturb the Final reference pilot.
4. Append the contracts' exact **Milestone handoff** template to `.opencode/docs/refactor-status.md`, filling every field with checkpoint status, changed paths/APIs, exact commands/results, evidence, and manual checks done/pending. Identify the next unverified checkpoint and overall milestone status; do not replace previous entries. A checkpoint is `verified` only when its required automated tests pass and no blocking verification gap remains. Apply the contracts' testing hierarchy: content/policy/accessibility failures block progression; a documented minor permitted layout difference does not. Do not require pixel-perfect screenshots, and never substitute a TODO, stub, skipped requirement, or unexplained snapshot rewrite for passing evidence.
5. If a required test fails or cannot run, stop at that checkpoint, report the failure/blocker, and leave a resumable handoff. Do not work around the checkpoint by implementing later layers. If context/time runs short, hand off the next unverified checkpoint without claiming milestone completion.

Passing a checkpoint permits proceeding to the next within the same task; it does not require a new user approval unless there is a blocker, scope conflict, or the user requested a pause. It also does not authorize commits. A later change to an earlier checkpoint's API/behavior requires rerunning that checkpoint's tests and affected downstream tests before proceeding. A fresh session must inspect the recorded evidence and rerun the last verified checkpoint's relevant tests before resuming.

### Checkpoint 4.1 — State model, progress store, and legacy adapters

**Scope:** define the normalized state and implement `progress-store.js` plus all three `progress-adapter.js` files. Introduce the focused progress boundary checks/schema needed here; do not defer safe storage handling until checkpoint 4.5. No navigation, shared activity UI, or complete `lesson-app.js` orchestration yet.

**Verification:** `tests/unit/progress-adapters.test.mjs` covers all three lessons' frozen maps/fixtures, round trips, unknown fields/extension versions, option zero, drafts, permanent section credit, and corrupt/unavailable/quota storage. `tests/browser/storage-boundaries.spec.mjs` verifies actual localStorage loading/saving, unchanged hydration, original-engine compatibility, and the absence of automatic destructive writes. Run the cumulative unit suite and production baseline.

**Exit criteria:** adapters restore and encode legacy payloads without DOM-order dependence or data loss; unsafe storage never crashes or gets silently overwritten; save failures retain in-memory progress. Document state/store/codec APIs and ownership before continuing.

### Checkpoint 4.2 — Navigation and section completion

**Scope:** implement the new module `lesson-core.js`, pure completion/monotonic-union helpers, and their connection to the verified store in an isolated navigation harness. Supply explicit section elements and small test-only gate functions; real lesson cutovers/policies remain milestones 5–7. Do not require the final content renderer to test navigation.

**Verification:** `tests/unit/completion.test.mjs` tests the exact first/predecessor/completed/reference access rule, one-missing-requirement cases, current-answer versus correct-ever policy inputs, and permanent completion. `tests/browser/navigation.spec.mjs` tests rail/mobile selection, collapse, progress counts, heading focus, bottom controls, refresh-to-first, and reference access with zero/non-contiguous progress. Rerun checkpoint 4.1 tests, the cumulative unit suite, and production baseline.

**Exit criteria:** navigation uses explicit stable identities rather than DOM position; section completion responds to meaningful state changes, never merely Next/visit; completed pages cannot relock. No live shell replacement or new current-section persistence.

### Checkpoint 4.3 — Flashcards, expandable rows, and multiple-choice components

**Scope:** implement flashcards, expandables/timeline variant, multiple-choice controller, question-sequence profiles, and scoped component styling. Mount directly with attributed baseline data in isolated harnesses and connect component events to checkpoints 4.1–4.2. No writing tools or general renderer yet.

**Verification:** `tests/browser/components.spec.mjs` covers click/keyboard behavior, explored-versus-current presentation, hydration without events/writes, every required question profile, last-choice/correct-ever independence, retained credit, stable focus/live-region semantics, no duplicate handlers, long card content, mobile widths, and reduced motion. Verify relevant interaction state survives save/reload through the adapters, including DOM reorder. Run affected unit tests, the cumulative unit suite, and production baseline; record manual animation/zoom/assistive-technology checks separately.

**Exit criteria:** all three component families and question profiles work independently and with state/navigation, without clipped content, lost credit, or style leakage into legacy pages. Preserve Opening's current-answer gate exception.

### Checkpoint 4.4 — Writing, checklists, and reference integration

**Scope:** implement writing/checklist components, exact legacy formatter operations with content-supplied templates, clipboard utility, and integration of milestone 3's existing Quick Reference loader/component into the isolated harness. Reuse that reference implementation; do not create a second renderer, migrate more production reference content, or perform milestone 8's global print cleanup. Direct mounting and the existing reference schema are sufficient until checkpoint 4.5.

**Verification:** `tests/unit/formatters.test.mjs` compares all three assembly algorithms with baseline templates. `tests/browser/writing-reference.spec.mjs` covers immediate draft/output/checklist/model saves, required versus optional model policy inputs, readonly/editable modes, clipboard denial/fallback, reload, one Print handler, and reference access/loading/retry/print isolation when another activity fails. Confirm fallback controls never enter legacy field maps. Rerun affected earlier checkpoint tests, the cumulative unit suite, and production baseline; record manual print checks honestly.

**Exit criteria:** writing changes do not overwrite edited output or revoke completion; model requirements remain lesson-specific; references are independent of gates/failed activities and preserve the existing pilot. No grading or instructional/template rewriting.

### Checkpoint 4.5 — Renderer, schema validation, and end-to-end harness

**Scope:** finish `section-renderer.js`, `lesson-app.js`/`mountLesson`, the bounded registry, complete config/manifest/activity schemas for introduced types, runtime/development validation, and cross-file checks. Compose already verified modules rather than replacing their APIs with an untested parallel implementation. Extend existing focused validation only as needed.

**Verification:** `tests/browser/lesson-harness.spec.mjs` drives the actual bootstrap pipeline on both `/` and `/discussion-skills-lab/`: load/validate → decode → render/hydrate → interact/unlock → persist → refresh. Include invalid schemas/IDs/paths, missing content/retry, reference independence, storage failures, no bootstrap writes, and unmount/remount without duplicate handlers. Run `npm run validate:content`, `npm run test:unit`, and the **entire** `npm run test:browser` suite, including all checkpoint harnesses, original-engine compatibility, and unchanged production lessons/pilot.

**Exit criteria:** all five checkpoints are verified and every milestone acceptance item below is satisfied. Record the actual public APIs and any remaining nonblocking manual checks for milestone 5. Do not declare milestone 4 complete based solely on the final happy-path harness.

## 1. State ownership and APIs

Use the normalized model in the contracts. Components receive validated data, their own state, and callbacks; they do not fetch content, query the whole document, read storage, or grant section completion themselves. Prefer small mount functions:

```text
mountX(root, {data, state, onChange, profile})
  → {update(nextState), destroy()}
```

`onChange` sends the component's next state or a small typed event to the app. Pick one consistent convention and document it. `update`/hydration must not emit user events or mutate earned credit. Use root-scoped selectors and stable data IDs. Destroy/unmount removes listeners and does not leak duplicate callbacks. A direct DOM implementation is sufficient; no virtual DOM, event bus, dependency injection framework, or custom elements requirement.

`lesson-app.js` orchestrates validated loading, state decoding, section rendering, gate evaluation, monotonic completion, persistence, and navigation. Expose a single `mountLesson(root, {configUrl, adapter, completionPolicy, registry})` entry. `adapter`/policy/registry come from static JS imports, never content-executable module paths. The first harness invokes the same API that production entries will use.

References load independently of activity success and are prepared at startup for printing. Activity content is validated before behavior is attached; if part fails, show error/retry and preserve saved data. No default empty-state save during bootstrap. Keep loading errors distinct from persistence warnings.

## 2. Navigation module

New module navigation accepts an explicit ordered section list containing stable ID, existing view element, label, requirement, and reference role. Maintain the old first/predecessor/completed/reference access rule; map section IDs to legacy indexes only in the adapter. It must not infer order by enumerating `.lesson-view`.

Support existing rail collapse/mobile selector/bottom controls/progress count and current-section aria-current. Focus the section's intended heading (`h1`, `h2`, or `h3`) and reset scroll after successful navigation, without scrolling on selection feedback. Reference hides bottom controls. Fresh refresh returns to first section; do not add URL routing or remember sidebar collapse. Keep progressbar maximum equal to counted pages, excluding reference.

Do not replace shared shell markup yet; the harness supplies the same DOM hooks as existing pages. Milestone 8 will consolidate shell creation. Do not change styles for legacy consumers via broad selectors.

## 3. Progress store and codecs

Store API must make state boundaries explicit, for example:

```text
openProgress({storage, key, adapter})
  → {state, diagnostics, save(nextState), canPersist}
```

Accept injected storage for unit tests. Read once, validate outer structure, decode through adapter, retain original raw record, and serialize owned values through adapter on actual changes. Skip identical writes. A save failure preserves in-memory state and returns diagnostics for an accessible nonblocking warning. Do not use storage events as a cross-tab merge system in this scope; document last-writer behavior and do not silently promise synchronization.

Adapters for all three lessons must be implemented and tested against milestone 1 maps even though production use is later. Requirements:

- Exact existing keys and root shape; known legacy fields remain authoritative.
- Fixed mappings for global/page-local cards, panels, question indexes, option indexes, fields/checks/notes/goals.
- Preserve unknown data and unknown extension schema versions; merge, not replace all `data`.
- Preserve section credit independently of current gate readiness. Missing detailed history is not evidence to revoke credit or invent answers.
- Safe defaults for missing optional activity state. Preserve numeric zero and Unicode/multiline drafts exactly.
- Invalid raw JSON/outer shape is never overwritten automatically. Surface warning/read-only persistence; keep usable activity state in memory. Malformed nested fixtures must not crash, erase valid independent values, or masquerade as earned credit.
- Support only `data.dslUi` v1's documented additive model/checkpoint selections for new UI facts. Test original engines can still read an extended valid record. No new storage key, v2 migration, backup/export UI, or `localStorage.clear()`.

For Opening without `quizEarned`, derive only the same correct selections supported by the original fallback. For Middle `solved.application`, preserve `a`/`b`, not 0/1. For Final panel-open indexes, use global mapping distinct from explored page-local indexes. Codec round trips cannot obtain maps from new DOM.

## 4. Component requirements

### Flashcards and expandables

Implement the full visual/keyboard/exploration contract. Prefer reusable semantic markup with shared scoped classes. Preserve 3D flip and current front/back accessible state; explored state is monotonic while presentation may toggle. Render explored indication independently from currently showing the back. Card faces must accommodate the longest existing text, 320px-wide viewport, 200% zoom, and reduced motion. Test a restored explored card flipped back without losing credit.

Use native details for standard expandables and a controlled button variant for Opening timeline if needed. Restore current open state only when represented by legacy state or the chosen session behavior; do not require a new persistent presentation format. Ever-opened identity is the gate input, not `details[open]` count. Toggle events from hydration must not generate saves/credit.

### Multiple choice and question sequences

Controller stores last choice independently from correct-ever credit. Options remain enabled after correct/section complete. Apply only latest green/red selection and aria-pressed; feedback announces correctness/explanation. Reuse nodes on same-question selection so keyboard focus remains on the chosen option and live region remains stable.

Presentation profiles must support:

- Opening classification: any selection enables next, wraparound, current-answer-based gate remains external.
- Opening knowledge check: all-at-once and first-unearned retry focus/reset behavior.
- Middle scenarios: correct-ever enables next, wraparound.
- Middle quiz: wraparound plus direct jump buttons/status and earned score.
- Final questions: previous/next, correct-ever next, no wraparound, option-specific explanations and optional context.

Do not normalize all feedback prefixes to one wording; data/profile can preserve existing differences (`Good choice.`, `Correct.`, `Not quite.`, credit-retained notes). Preserve source where those messages contain instruction. Question navigation emits state change so existing legacy cursor fields save immediately when adopted.

### Checklists, writing, clipboard

Checklist values can be unchecked; section credit cannot be removed. Every checkbox has a label. Writing stores each input/output change immediately; assembly happens only on explicit submit/click and does not overwrite student-edited output while typing inputs. Support readonly/editable output, model show-only/toggle modes, required/optional model policy externally, and existing field lengths.

Sentence templates and model text are content data. Formatter functions may perform the exact legacy trimming/lowercasing/punctuation steps and interpolate allowlisted named fields into plain text. No eval, Function constructor, arbitrary expressions, HTML templates, grammar improvement, or automatic grading. Unit-test all three legacy assembly algorithms using synthetic inputs and the baseline templates before full extraction.

Clipboard utility uses secure Clipboard API when available; on denial/unavailability focuses/selects an existing field or offers a scoped fallback textarea without being included in progress-field maps. Preserve/restore sensible focus and status. Do not persist fallback controls as student fields.

## 5. Bounded rendering and schemas

Implement lesson manifest/config and activity schemas per contracts, only for introduced standard types. Use enums/required keys/unique IDs, max nesting depth for groups, and semantic cross-file validation. The manifest's declared activity ID must match the loaded file. `correctOptionId` must reference an actual option; duplicate IDs, unknown types, invalid layout enums, missing content sources, and invalid gate references fail validation.

Progress validation is deliberately different from closed instructional-content schemas: accept/preserve unknown progress properties and unknown UI-extension versions. Do not use `additionalProperties: false` to erase/reject a whole otherwise usable progress record merely because it has forward-compatible data. Validate known owned fields safely and report malformed ones separately. Config/manifest schema definitions may share a file via explicit `$defs`, but the validator must select the correct definition and document that choice.

`section-renderer.js` handles Markdown, activities, bounded groups, and reference blocks while retaining existing section/heading hooks. Rich instructional bodies use Markdown sources, not raw HTML strings. Layout profiles produce original compositions without accepting arbitrary CSS from content. A profile may be extended in later milestones when an actual layout needs it; do not prebuild a generic page builder.

A harness can reuse extracted canonical content in test fixtures (with CC BY notice) but cannot publish invented new questions. Keep production legacy activity paths unchanged until whole-lesson cutover. Test fixtures are not a second writable application-content source.

## Tests and acceptance

- [ ] Checkpoints 4.1–4.5 were completed in order, each with recorded passing tests and explicit exit-criteria evidence before proceeding.
- [ ] Unit tests cover every legacy fixture, semantic round trips, unknown data, numeric zero, malformed state, denied/quota storage, and monotonic completion.
- [ ] Test DOM reorder in harness without changing legacy serialization mapping.
- [ ] Components pass keyboard/focus/live-region semantics and latest-choice/correct-ever tests in supported browser engines.
- [ ] Every sequence profile is exercised, including Opening's current-correct gate exception and all-at-once retry.
- [ ] Hydration generates no synthetic answers, duplicate listeners, or storage writes.
- [ ] Writing formatter, draft, readonly/editable, checklist/model, and clipboard fallback tests pass.
- [ ] Reference and ordinary activity load failures preserve progress and do not block reference access.
- [ ] Existing full production baseline (all lessons and Final reference pilot) still passes; no live activity entry converted.
- [ ] Shared styles are scoped and don't alter legacy cards/rows/choices.
- [ ] Exact content/policy preservation is tested independently; visual checks protect identity, readability, and interaction standards without requiring pixel equality or reproducing clipping.
- [ ] `npm run validate:content`, `test:unit`, and `test:browser` results and manual checks are recorded.
- [ ] Compatibility documentation specifies the UI extension and actual API conventions for milestone 5.

Stop after primitives/harness evidence. Suggested review/commit units align with checkpoints 4.1–4.5; a checkpoint may be split into smaller review units, but its verification gate cannot be skipped. Do not commit automatically. If handing off before 4.5 is verified, explicitly report milestone 4 as incomplete and name the next unverified checkpoint.
