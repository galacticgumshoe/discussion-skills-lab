# Milestone 7 — Migrate Opening without imposing other lessons' interaction patterns

## Assignment and prerequisites

Read `AGENTS.md` and `.opencode/specs/refactor-contracts.md`. Implement only milestone 7 after milestones 1–6. Require shared runtime in production Middle/Final, all original v1 adapters/maps, reference pipeline, and Opening's externally extracted script/styles. Run current tests before editing.

**Outcome:** Opening's instruction lives in content files and interactions use shared code while preserving its distinctive timeline, task analysis, all-at-once knowledge check, gates, and `dsl:opening-stage:v1` identity. Opening has **no flashcards**; do not add any.

## Files

- Modify `opening.html`, `assets/js/opening.js` into a thin module entry, and narrowly `assets/css/opening.css`.
- Create `lessons/opening/config.json`, `completion.js`; use/extend existing adapter against frozen maps.
- Create `content/opening/lesson.json`, section Markdown, activity JSON, and reference JSON/Markdown.
- Add `assets/js/activities/task-analysis.js` and its schemas/tests.
- Extend shared timeline/choice/all-at-once/writing/reference profiles only when needed; never fork whole components.
- Update tests, inventory, known issues, compatibility docs, and status.

Leave legacy `assets/js/lesson-core.js` in place until milestone 8 confirms no remaining consumers. Do not consolidate all CSS, extract homepage, remove Tailwind, change titles/URLs for branding, or alter deployment in this milestone.

## Extraction and cutover

Apply the contracts' **Presentation-preservation contract for content migrations**
and read its three Middle correction evidence records before extraction. Create
`.opencode/docs/evidence/milestone-7-presentation.md` with the all-section source →
metadata/profile/scoped-style inventory, comparison coverage and review decisions.
This is a prerequisite to cutover, not optional final screenshot polish.

Use the common harness to migrate each section before the public page switches. Move prose/examples/models/reference, all classification data, task-analysis answers, practice/quiz options and explanations, the sequence checkpoint's two feedback messages, placeholders/self-check, and consensus assembly literal wording into content. Preserve the precise example task, all annotation spans, mental-health-stigma scenario, and source distinctions. Do not substitute Middle's procedural/substantive examples.

Keep existing root URL, `view-0`…`view-7`, relevant heading/field IDs, timeline controls, and reference composition. On complete cutover remove the classic Opening activity entry and its `DSL` use, enable the module entry/new store, and ensure only one initializer/writer. Keep shell markup until milestone 8.

## Opening presentation requirements

Preserve Opening's heading/paragraph hierarchy, card/panel surfaces, pills,
connected numbered timeline and expanded-state cues. Preserve navy selected
analysis tabs, exact annotated task highlighting, explanation panels, distinctive
feedback accents/corner shapes and builder/model composition. Cover the initial
unselected analysis state, every category (including TERMS), and timeline states
without granting exploration through rendering. Retain all-at-once quiz grouping
and the distinctive responsive reference sequence/grid. Opening has no flashcards;
do not introduce them or Middle's sequential quiz layout. Reuse controllers with
Opening-scoped styling rather than Middle's theme or generic defaults. Narrow
Opening CSS additions needed for parity are in scope; global consolidation is not.

## Exact gates and interaction exceptions

| Page / section | Required for initial completion |
| --- | --- |
| 0 `contributions` | All 5 statements attempted and all **current** classification answers correct |
| 1 `opening-sequence` | All 6 unique timeline stages explored and sequence checkpoint answered correctly at least once |
| 2 `task-analysis` | All 5 categories explored and the current saved WHAT/HOW selection correct |
| 3 `clarifications` | Clarification decision answered correctly |
| 4 `give-direction` | Self-check checked and editable draft trimmed length at least 35 |
| 5 `research-transition` | Research decision answered correctly |
| 6 `knowledge-check` | All 5 quiz questions answered correctly at least once |

Completion is permanent after earned. Pages 3/5 complete immediately on a correct decision; choosing an alternative afterward does not revoke credit. For page 2, retain source's current-choice dependency before initial completion: a correct WHAT/HOW choice changed to wrong **before** finishing category exploration must not unlock merely from correct-ever evidence. Test action order explicitly. Do not introduce correct-ever gate changes as a supposed reuse improvement.

Classification advances after any selected answer, including wrong, and wraps to review first. Its current-answer condition is deliberate. Persist its existing selection array/string values and seen indexes; do not replace procedural/substantive with numeric selections in storage. Apply green/red selected styling as the explicit standards repair, while preserving feedback wording and review labels.

The sequence checkpoint stays available as originally laid out; page completion still needs all six stages. Retain `sequenceCorrect` forever once earned. Store its **last selected option** separately in `data.dslUi.selections` v1 using stable activity/question/option IDs, so a later wrong choice can display red without removing credit. Legacy records without this extension have unknown last selection: do not pretend a particular option was last selected merely because `sequenceCorrect` is true.

## Timeline and task-analysis activity

Timeline has six numbered steps with original titles/order/explanations and plus/minus expansion semantics. Keep controls keyboard-operable with aria-expanded/aria-controls. Either use the shared controlled-expandable profile or native details with equivalent composition; do not flatten it to an unrelated card layout. Track unique explored stage IDs; repeatedly toggling one does not satisfy six stages. No requirement to persist current open state if legacy did not.

Task analysis JSON should encode the full task as ordered text segments with optional category IDs, plus five categories/labels/answer explanations. Concatenated text must match the original task exactly (including meaningful punctuation/spacing). Do not locate spans by replacing repeated text at runtime, generate the example with HTML strings, or move annotated task text into application code.

Preserve category IDs/order: `who`, `what`, `how`, `where`, `terms`. Selecting a category highlights matching segments. **TERMS highlights WHO and WHAT spans**, as source does; it is not a new continuous substring. Keep the search-terms note and existing explanation wording.

Complete accessible tab relationships: IDs, aria-controls, tabpanel labeling, one roving tab stop, left/right/Home/End navigation with selected-tab focus. Preserve an initial unselected instruction state without automatically granting WHO exploration on load. Hydration of saved seen categories must not replay selection events or add credit for an unvisited category. Keyboard selections count as exploration just like clicks.

## Decisions, consensus builder, and quiz

WHAT/HOW, clarification, and research remain separate decision activities with original options, numbering text, explanations, and selection restoration. Use shared question controller but explicit external gate rules.

Consensus builder:

- Existing required problem/accomplishment inputs and form-submit behavior stay.
- Trim both and remove trailing `.?!` as source does; if empty, do not assemble.
- Output text remains exactly `By the end of this discussion, will the group agree that we have {accomplishment} to address {problem}?`, with literal instructional template in content.
- Editable output saves immediately; inputs/self-check retain legacy field keys. Keep 35-character threshold, not word/sentence grading.
- Model reveal is optional and toggleable; preserve show/hide labels and aria-expanded. Do not require a model view or a generated output if a sufficiently long student-written draft/self-check meets the original gate.
- Shared copy utility must leave usable text on clipboard failure without changing draft data.

Knowledge check stays **all five questions visible at once**. Keep question/options/order, immediate explanations, earned score, summary after all questions have selections, and retained credit. Retry missed targets the first unearned question, clears its last selection to null, scrolls/focuses it, and retains other answers/credit. Preserve source fallback deriving `quizEarned` from correct selections only when the stored set is absent. No Submit button, sequential pagination, or forced reset of previously earned questions.

## Reference and persistence

Extract the full Opening sheet, including six-step sequence, WHO/WHAT/HOW/WHERE/TERMS definitions, contribution types, and direction/terminology grid. Use structured bounded groups for the distinctive six-column sequence/reference composition; do not turn it into Final's five-item stack. Shared reference component can support a tested layout variant. Keep one Print button; move inline onclick to the shared binding only during complete cutover, without duplicate handlers.

Exact key is `dsl:opening-stage:v1`, not `dsl:opening:v1`. Preserve all direct `data` fields listed in milestone 1; no `openingState` wrapper. Unknown fields and extension properties survive. Restore choices without synthetic clicks or extra completion writes. Existing completed sections stay accessible even with insufficient detailed data; do not manufacture historical answers to fill gaps.

## Tests and acceptance

- [ ] Seven exact gate predicates unit-tested, including action-order tests for classification and task-analysis current answers, 34/35-character boundary, and checked/nonchecked self-check.
- [ ] Presentation contract fulfilled: all-section inventory reconciled; original/current harness comparisons cover timeline/tabs/annotations, every activity/callout/model and relevant states at wide/narrow desktop/mobile, both mounts/all four projects; owner presentation review approved before public cutover, then public-page parity and cross-lesson regressions pass. Record actual manual checks/gaps and permitted differences in `milestone-7-presentation.md`.
- [ ] Full fresh journey, partial/completed/legacy-without-quizEarned fixture restoration; no relocking after earned section completion.
- [ ] All source wording/options/answer keys/feedback/models/template/annotated segments/reference retained in content with provenance.
- [ ] Exact content/annotation/gate assertions are independent of visual comparisons; minor documented presentation differences are acceptable under the contracts' hierarchy, not changes to task text or completion requirements.
- [ ] Timeline all six unique steps; tab keyboard/ARIA relationships; TERMS highlighting precisely matches source; no automatic exploration on hydration.
- [ ] Sequence last selection survives wrong→right→wrong→refresh while `sequenceCorrect` stays true. Original engine can still read extended valid record; absent last-choice history remains absent.
- [ ] Classification latest choice colors correct/incorrect; any-selection next/wraparound and current-correct gate unchanged.
- [ ] All-at-once quiz summary/score/retry focus and correct-ever credit work, including numeric zero and changed alternatives after completion.
- [ ] Builder output/trim rules, freely editable draft, optional model, exact legacy fields, and clipboard fallback pass.
- [ ] Desktop/mobile/zoom/reduced-motion, both deployment mounts, loading/storage failure, and reference-only print tests pass.
- [ ] All Middle/Final regression tests remain green; no duplicate initializer, storage writer, or Print handler.
- [ ] Handoff records validation/unit/browser results, explicit standards repairs, manual gaps, and readiness for milestone 8.

Suggested review units: per-section extraction/harness tests; task-analysis component; exact policies/codec integration; full cutover; isolated checkpoint/color/ARIA repairs; reference and final evidence. Do not commit automatically. Stop before homepage/shell/style consolidation.
