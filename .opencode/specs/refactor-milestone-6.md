# Milestone 6 — Migrate Final, including categorization and closing practice

## Assignment and prerequisites

Read `AGENTS.md` and `.opencode/specs/refactor-contracts.md`. Implement only milestone 6. Require milestones 1–5: Middle must already run successfully on shared components, with codecs/validation/security tests and immutable legacy evidence. Run the full current suite before editing.

**Outcome:** Final becomes content-driven with the same nine-page gates, original v1 key, and all instructional content intact. Reuse Middle's shared implementations; add only the genuinely distinct note-categorization activity.

## Files

- Modify `final.html`, `assets/js/final.js` into a thin module entry, and narrowly `assets/css/final.css`.
- Create `lessons/final/config.json`, `completion.js`; extend the existing Final adapter if needed against frozen maps.
- Create `content/final/lesson.json`, section fragments and activity JSON/Markdown; reuse milestone 3's reference files as the sole reference source.
- Add `assets/js/activities/note-classification.js` and its schema/validation/test coverage.
- Extend shared writing/question/layout components only through existing APIs, not a Final-specific copy.
- Update tests, inventory, known issues, compatibility docs, and `.opencode/docs/refactor-status.md`.
- Remove temporary `assets/js/final-reference.js` only when its responsibilities are fully owned by the common app; remove its HTML reference simultaneously. Preserve vendored dependencies/loader.

Do not migrate Opening here, remove all legacy CSS, add new instruction, or change Pages/deployment.

## Extraction and cutover sequence

Apply the contracts' **Presentation-preservation contract for content migrations**
and read its three Middle correction evidence records before extraction. Create
`.opencode/docs/evidence/milestone-6-presentation.md` with the all-section source →
metadata/profile/scoped-style inventory, comparison coverage and review decisions.
This is a prerequisite to cutover, not optional final screenshot polish.

Build/test each section in the common harness while the legacy Final entry remains active. Extract all JS question banks, `notes`, `checkLabels`, `goalTexts`, and synthesis assembly template pieces, as well as HTML prose/models/cards/task statements. Every existing question/option has its original feedback, correct association, context, and order.

All eight question banks contain 25 questions in total: page 1 has 5; pages 2 and 3 have 1 each; pages 4, 5, and 6 have 3 each; page 7 has 4; page 8 has 5. Cross-check against the source and inventory, not this count alone. There are 8 flashcards and 13 expandable panels. Preserve all six categorization notes, five synthesis checks, six closing checks, and three goal choices.

Use shared profiles for existing card grids, speaker statements, examples, notices, models, and feedback. Keep `view-N` IDs, reference wrappers/classes, and synchronous shell hooks for now. Switch the whole activity engine/store only once all sections pass; never leave the classic and module entries both initializing.

## Final presentation requirements

Preserve Final's Fraunces heading hierarchy, teal left-accent activity frames,
card-grid composition, separate card titles, speaker/context statements, example
and notice groupings, model treatments and distinct right/wrong feedback shading.
Inventory categorization rows, select labels, immediate status and disabled-correct
appearance, synthesis/closing fields, checks and goal controls in every state.
Use shared behavior with Final-scoped presentation, not generic defaults or the
Middle palette. Preserve Final's previous/next question composition; do not impose
Middle's quiz overview/scenario wrappers. Narrow Final CSS additions needed to
retain these roles are in scope; cross-lesson theme consolidation is not.

Owner-approved presentation exceptions (2026-10-27), clarified by direct Middle
comparison: **match Middle's respective heading levels**, not a single approximate
size. Welcome uses `clamp(2.25rem,5vw,3.6rem)`; numbered pages 01–08, including
Knowledge Check, use `clamp(1.85rem,3.4vw,2.6rem)`. Both use bold Fraunces, 1.17
leading and `-.035em` tracking. Flashcard fronts use Middle's normal weight, common
white/navy face treatment and intrinsic sizing, not legacy Final's bold weight.
Do not enlarge reference, activity, model or completion subheadings. After a
flashcard is explored and flipped back, its original/front face must show the
`✓ Explored` icon/label, alongside—not overlapping—the Flip card hint. Retain the
back-face cue, durable credit on reload, native keyboard/ARIA behavior and intrinsic
growth. These two intentional differences from pinned main must be asserted as
approved expectations, not reversed for screenshot parity. Reuse the existing
shared cue; do not fork its controller. Follow-up testing is impact-scoped: for
Final-only CSS/presentation changes run affected Final checks, not the entire site
or Opening/Middle suites. Broaden only if shared behavior actually changes.

## Exact completion/reveal policies

| Page / section | Required for initial completion |
| --- | --- |
| 0 `welcome` | All 3 welcome cards explored |
| 1 `summary-synthesis` | Both comparison cards explored; all 5 questions solved |
| 2 `connect-viewpoints` | All 4 panels explored; its question solved; all 3 builder inputs currently trimmed nonempty; assembled true; builder model viewed; all 5 checks checked |
| 3 `organize-findings` | Both panels explored; all 6 notes correctly categorized; summary question solved |
| 4 `consensus` | All 3 cards explored; all 3 questions solved |
| 5 `task-audit` | All 3 panels explored; all 3 questions solved |
| 6 `professionalism` | All 4 panels explored; all 3 questions solved |
| 7 `closing-practice` | All 4 questions solved; trimmed closing draft nonempty; closing model viewed; all 6 checks checked |
| 8 `knowledge-check` | All 5 questions solved |

Questions are correct-ever. Completion unions with legacy completed pages, so clearing a builder input or unchecking a check never revokes a completed page. Unlike Middle's builder, Final's page 2 checks all three inputs' current nonempty state before initial completion. Keep that distinction.

Reveals: welcome readiness after all cards; page 1 practice after both cards; page 2 scenario after all panels, builder after its question solved; page 3 notes after panels, summary after all notes; pages 4/5/6 practice after required exploration; page 7 writing after four questions; page 8 completion/score/goals after correct-ever knowledge check. Preserve assembled area, model, and checklist reveal state. Model viewing remains required only in pages 2 and 7.

## Note-classification activity

JSON contains stable note IDs, exact note text, category IDs/labels, correct category, and feedback. Categories preserve the original A–D meanings and order: problem/barriers, proposed approach, group agreement, unresolved issue. Keep an initial Choose category option, labeled selects, and immediate status feedback.

On a wrong selection, allow another try. On a correct selection, record correct-ever categorization and disable that select, as in the baseline. Do not turn it into an unrestricted multiple-choice activity or add a new grading criterion. Wrong unearned choices were not persisted by legacy notes; keep them session-local unless a later approved change introduces a format for them. Correct notes restore to their original category/feedback and disabled state without dispatching a change event.

Legacy `notes` uses numeric indexes → true; use the fixed map. Correct categories must not be inferred from label order after edits; validate ID references. All six notes are required before summary reveal.

## Writing/quiz/goal behavior

Use Final's sequential previous/next profile, no wraparound. The next question becomes available after correct-ever credit; previous navigation remains available. Preserve optional context paragraphs, lettered options, per-option feedback, score labels, and retained-credit messages. Same-question selection must keep focus and announce feedback without replacing the whole active subtree.

Synthesis assembly algorithm stays exactly as source: trim three inputs; remove trailing `. ! ?` from the first field; lowercase only the initial character of the second and third fields; remove trailing `. ! ?` from the second; interpolate original `Building on …, …. Therefore, …` wording. Do not improve grammar or normalize arbitrary Unicode beyond the source operations. Literal wording is content data. Output stays editable; typing output must save immediately and must not be overwritten by editing source inputs until explicit reassembly.

Closing writing remains ungraded/nonempty-only; preserve 3–5 sentence guidance without enforcing a new sentence counter. Model comparison and self-assessment remain explicit actions. Clipboard fallback selects the appropriate existing field.

Goal choices do not affect completion. Persist the original numeric goal IDs through the adapter, restore checked state, and derive the goal caption from restored selections using the exact original wording/order. Do not invent a goal or automatically select one.

## Persistence and reference integration

- Card mappings are page-local, not Middle's global indexing.
- Panel explored sets are page-local; `panelsOpen` is a different, global-index map (2: four; 3: two; 5: three; 6: four). Preserve open states even when a panel is outside the current view.
- Restore `answers`, `checks`, `selections` (`page:index`), `quizIndex`, `notes`, `goals`, model flags, assembled flag, and ID-keyed fields. Unknown data survives.
- Native hydration must not generate note answers, panel credit, or storage writes. Never require redoing a completed section just because its detailed flags are absent.
- The reference now loads through the app from the milestone 3 files. No second reference fetch/DOM renderer or second Print listener. If unrelated activity content fails, reference still loads and remains accessible.
- Keep original Final reference composition and existing numbered print overrides until milestone 8. Remove the pilot-only entry after integrated reference parity passes, not before.

## Required tests and acceptance

- [ ] Full nine-page fresh journey; each gate fails with one required item missing; model views required exactly where specified.
- [ ] Presentation contract fulfilled: all-section inventory reconciled; original/current harness comparisons cover all activities/callouts/models and relevant states at wide/narrow desktop/mobile, both mounts/all four projects; owner presentation review approved before public cutover, then public-page parity and cross-lesson regression checks pass. Record actual manual checks/gaps and permitted differences in `milestone-6-presentation.md`.
- [ ] All 25 questions, 6 notes, cards/panels, checks/goals, model text, and reference match canonical inventory including alternative feedback.
- [ ] Content/answer/gate equivalence is mandatory and tested independently of screenshots; minor documented layout differences follow the contracts' hierarchy, with accessibility and unclipped content ahead of pixel matching.
- [ ] All valid v1 fixtures restore completion, selections, draft text, open panels, correct notes, checks/models/goals. Numeric-zero options are preserved.
- [ ] Correct → incorrect alternative → refresh retains incorrect highlight and earned credit; no focus loss on answer selection.
- [ ] Reload directly after editing assembled synthesis preserves the edit; goal caption derives correctly on refresh.
- [ ] Pure gate tests distinguish Final's current builder-field requirement from Middle's assembled-only requirement; no section relocks after completion.
- [ ] Category wrong→right feedback, disable-on-correct, and refresh behavior match original.
- [ ] One writer and one reference/print handler; original-engine harness can consume serialized valid payloads.
- [ ] Root/subdirectory, loading failure/retry, storage denial/corruption, mobile/zoom/keyboard, and reference-only printing pass.
- [ ] Full Middle and Opening regression suite stays green; no unapproved shared-style effects.
- [ ] Validation/unit/browser command results, manual preview/accessibility checks, and remaining gaps recorded in handoff.

Suggested review units: section-sized content/harness migrations; categorization component; completion/adapter integration; full Final cutover/reference-pilot removal; isolated standards repairs/tests; final evidence. Stop before Opening migration or shell/CSS cleanup. Do not commit without authorization.
