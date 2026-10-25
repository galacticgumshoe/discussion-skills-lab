# Milestone 5 — Migrate Middle's content and interactions

## Assignment and prerequisites

Read `AGENTS.md` and `.opencode/specs/refactor-contracts.md`. Implement only milestone 5. Require milestones 1–4 and their verified handoffs: frozen content/maps, safe loader, shared components/navigation/store, all three codecs, and tested harness APIs. Inspect actual APIs and tests rather than creating competing implementations.

**Outcome:** Middle is the first fully content-driven lesson, using the shared runtime while reading/writing `dsl:middle:v1`. Opening and Final keep their legacy activity engines; Final's reference pilot continues unchanged.

## Files

- Modify `middle.html` and `assets/js/middle.js` (ultimately a thin ES-module entry).
- Create `lessons/middle/config.json`, `lessons/middle/completion.js`.
- Use/extend `lessons/middle/progress-adapter.js` only against frozen maps.
- Create `content/middle/lesson.json`, `sections/*.md`, `activities/*.json`, `reference/reference.json` and reference Markdown fragments.
- Preserve unused instructional variants in `content/middle/legacy-variants.json` with original source identities and a non-published status; validate its format.
- Narrowly adjust `assets/css/middle.css` and shared components/renderer/schemas where real Middle layouts need support. Do not perform global CSS cleanup yet.
- Extend Middle unit/browser/content-comparison tests; update inventory, known issues, compatibility docs, and `.opencode/docs/refactor-status.md`.

Do not create a parallel Middle-specific question/flashcard engine. Unique formatting/gate code is acceptable; duplicate interaction controllers are not.

## Migration/cutover method

1. Extract content and build/test each section in the shared harness while the public `middle.html` still uses the legacy engine. This allows section-sized review units without a hybrid live state writer.
2. Compare all extracted text, question/option order, answer keys, feedback, models, labels, and meaningful emphasis against milestone 1. Mark old/new source locations in the inventory.
3. Implement pure completion/reveal policies and adapt normalized state back to original v1 payload. Gate logic must not depend on rendered text, DOM counts, or a click on Next.
4. Only after every section passes, switch the whole page to the new entry/store/navigation. Remove the legacy Middle engine's initialization/script inclusion at that same cutover. Keep original shell markup and `view-N`/heading hooks until milestone 8.
5. Migrate reference through the existing shared reference loader/renderer and keep its original sheet/item classes or equivalent explicit layout profile. Retain numbered print overrides until semantic consolidation in milestone 8.
6. Remove now-moved instructional strings from the shipped JS/HTML, except small structural metadata/fallback titles documented in inventory. Do not delete alternate unused wording until it is represented in the archival content file.

## Required content/activity coverage

Suggested activity files/IDs (use milestone 1's IDs if already frozen; preserve their mapping):

- Welcome cards (3).
- Structure cards (2) and classification (5 questions).
- Evidence parts (4 expandables), practice-model cards (2), research selection, research writing/checklist/model.
- Collaboration parts (4) and group scenarios (3).
- Communication parts (3) and communication scenarios (4).
- Speaking strategies (4), speaking cards (2), speaking scenarios (3).
- Application A and B choices; application writing/model/checklist.
- Knowledge check (5 questions).
- Quick Reference's five sections.

Include fictional-data cautions, research-source/date guidance, all speaker lines, examples, risk/advantage descriptions, disclaimers, writing prompts/placeholders, assembled-response notices, and the precise model responses. The JS `strategies` array duplicates/overlaps HTML; compare values and preserve any nonidentical variants as separate records. The unused JS `referenceText` is not the same as the displayed reference: archive it, don't substitute it for the full sheet or display an additional reference.

Structured labels/options are text; longer bodies/models use Markdown. Recreate existing grid/flow/roundtable/callout composition with bounded renderer groups/profiles. Do not use a whole HTML document embedded inside JSON to bypass content separation.

## Exact gate and reveal policies

Section IDs and numeric order are contractual. All correct-question sets are correct-ever, not last-answer-correct. Completed section credit is monotonic.

| Page / section | Required for initial completion |
| --- | --- |
| 0 `welcome` | All 3 welcome cards explored |
| 1 `structure-substance` | Both structure cards explored; all 5 classification questions solved |
| 2 `evidence` | All 4 evidence parts explored; both model cards explored; research choice solved; assembled flag true; all 4 research checks checked |
| 3 `support-group` | All 4 collaboration parts explored; all 3 group questions solved |
| 4 `communication` | All 3 communication parts explored; all 4 questions solved |
| 5 `speaking-conflicts` | All 4 strategies explored; both speaking cards explored; all 3 episodes solved |
| 6 `integrated-practice` | Application A and B solved; trimmed draft nonempty; all 5 application checks checked |
| 7 `knowledge-check` | All 5 questions solved |

Preserve staged reveals: both structure cards → classification; all evidence parts → research/anecdote explanation and cards; both model cards → research activity; all collaboration parts → group simulator; all communication parts → communication activity; all speaking strategies → speaking cards; both speaking cards → simulator.

Research model comparison and application model reveal are optional, not gate inputs. Original evidence completion does **not** require source/finding/why still nonempty after assembly; don't add that gate. Checklist unchecking can change current readiness but never revoke a completed page.

## Question presentation and writing

Use sequential wraparound for classify/group/communication/speaking: next after a correct-ever answer; counter and current feedback restored. Research selection is a single question. Application A/B remain separate visible activities. Knowledge check has direct Q1–Q5 status buttons, earned score/percentage, immediate feedback, next/review-first behavior, and no Submit requirement. Keep original feedback distinctions and `Try Another Strategy` behavior without clearing last-choice evidence/credit.

Research assembly must remain exactly:

```text
According to {source}, {finding-with-trailing-dots/spaces-removed}. This matters to our task because {why-with-trailing-dots/spaces-removed}.
```

Trim input fields as originally done. Do not change capitalization, claims, punctuation, or fact-checking notices. Store instructional literal template pieces in content, not formatter code. Research output stays readonly; application draft stays editable/nonempty-only for completion. Shared clipboard and checklist components must be used.

## Persistence traps and authorized repairs

- Cards serialize original **global** indexes 0–8 inside their named sets, not group-local indexes. Field positions include generated checks; use the fixed initialized map, not current DOM order.
- Preserve `sets.solved.application` suffixes `a`,`b`, all `selections` key profiles, `positions`, `researchCorrect`, `assembled`, and `quizIndex`. Unknown/transient selection properties survive.
- Save question position changes immediately through existing cursor fields. Save source/finding/why and application input immediately. These are explicit standards repairs with dedicated tests/review units.
- Save optional model visibility in `data.dslUi.models` v1 (stable model IDs), without changing gate requirements. Preserve unknown extension versions/properties as specified.
- Hydration must show prerequisite-revealed activities from stored evidence even when the current question selection is wrong after credit. Do not click buttons to restore.
- Don't persist clipboard fallback textarea or newly rendered controls into legacy positional fields.

## Required regression tests

1. Full fresh journey, with exactly one prerequisite missing per page; prove visiting/scrolling/Next alone doesn't complete it.
2. All old valid fixtures restore the same completed pages, draft/check values, explored items, selected answers, and earned credit. Non-contiguous complete pages remain accessible.
3. Correct → wrong exploration → navigate/reload preserves wrong highlight/feedback and earned credit. Exercise option zero and direct quiz jumps.
4. Reload immediately after typing a partial research field or advancing an activity/quiz, with no intervening click. New model visibility survives refresh but stays optional.
5. Synthetic reordered fields/cards in harness still serialize old indexes correctly. Read the new valid payload in an original-engine harness to check rollback compatibility.
6. Keyboard cards/expandables/answers/model/copy/checklist; no focus loss on selecting answers; no duplicate event/save calls.
7. Original source-to-content coverage, including all alternative feedback and unused variants; answer-key comparisons independent of learner-facing text.
8. Desktop/mobile visual regression review under the contracts' hierarchy, longest card text/zoom, root/subdirectory loading, content failure/retry, storage failure warnings. Minor documented spacing/reflow/height differences are acceptable; clipping, missing content, lost design cues, and inaccessible controls are not. Do not require pixel-perfect parity.
9. One Print button; only Middle reference prints from any section, including fresh zero progress. Check PDFs plus record actual manual preview status.
10. All Opening/Final baseline tests remain green, including Final pilot; shared style additions do not leak into legacy pages.

## Acceptance and review boundaries

- [ ] Middle's content is editable in Markdown/JSON; shipped entry JS has no remaining instructional banks/templates.
- [ ] All eight gates/reveals and reference access match the original policy.
- [ ] Shared components implement activities; no replacement lesson-specific duplicate engines.
- [ ] One active writer; existing v1 fixtures and original-engine compatibility pass.
- [ ] Only listed standards repairs changed behavior; no source content/answer/order changes.
- [ ] Exact content/answer/gate assertions pass independently of visuals; permitted minor layout differences are documented rather than treated as instructional failures.
- [ ] Full validation/unit/browser commands pass; manual gaps and evidence recorded in handoff.

Suggested units: per-section content extraction/harness tests; pure policies and serialization integration; full-page cutover; narrowly identified standards repairs; reference verification and handoff. Do not commit automatically. Stop before migrating Final or consolidating all shared styles.
