# Canonical content inventory — milestone 1

## Milestone 8 — approved local homepage/shell reconciliation

Owner approved inventory v2's S/H/P/R and T01/T03–T07 scopes on 2026-10-28.
The reviewed old containers/tools are removed locally, not their instruction.
Public `index.html` now loads exact external replacements from
`content/home.md` (eyebrow, main heading, introduction, progress notice, educational
disclaimer) and `content/catalog.json` (three titles/descriptions/order/root links).
`tests/browser/home.spec.mjs` compares rendered text/order/links/footer against
`tests/fixtures/content/source/index.html`, not a newly authored expected copy.
These original words remain © Rhys Jones / CC BY 4.0. Footer rights/license links
remain structural. Title/favicon/vendor references and generic fallback labels
are intentional small repetition exceptions, not a second prose source.

All earlier content entries resolve to: published lesson manifests/Markdown/
activities/reference (milestones 5–7 mappings below), retained nonpublished exact
Middle/Final `content/<id>/legacy-variants.json` records, or the retained original
source/initialized/generated evidence under `tests/fixtures/content/`. None has
an instructional deletion disposition. This checkpoint does not newly publish archived
variants or rely on similar wording as equivalence proof.

Header titles already equal manifest titles; exact durations are now additive
validated `duration` fields in all three `content/<id>/lesson.json` manifests.
Repeated shell titles/durations now come from validated manifests; root document
titles remain a deliberate metadata exception. The shared shell retains the help's
Final-specific `Quick Reference` capitalization and Opening `← Previous` versus
Middle/Final `← Back`. Generic runtime navigation/lock/progress statuses are
retained by `assets/js/app/lesson-core.js`. No questions/feedback/models/keys/gates
move or change here. Existing generated CSS cues are retained, including those
used by the intentional legacy-decoy component fixture; they are not silently
classified as dead code. Detailed retention/removal decisions:
`legacy-removal-inventory.md`.

### Expanded migration-container audit (inventory v2)

The executable/unsealed migration harnesses are now explicit retirement candidates,
not automatically retained with the actual meaningful variant archives. All six
Final reference copies in `tests/fixtures/harness/content/final/reference/` are
byte-identical to their canonical `content/final/reference/` counterparts; exact
paths/hashes are in `evidence/milestone-8/migration-support-v2.json`. That result
does **not** certify the entire mixed fixture tree safe to delete: activity/model/
template/feedback coverage and unique test assertions must be reconciled first.

The sealed originals/banks/source-index/maps and Middle/Final `legacy-variants.json`
remain retained with provenance/licenses. Temporary route/entry code, generator
code and copied review containers are evaluated separately. Eighteen approved
whole files and nine exact old print blocks have been removed; sealed source,
banks/maps/progress/visual evidence and both meaningful variant archives remain.
`middle-reference.spec.mjs` now compares all five groups/18 list items/emphasis on
the real `middle.html`. Generic lifecycle ports use noninstructional new-module
data. Partial mixed-container/assertion reconciliation is still incomplete; no
T02/T08/T09/T10 container is removed merely because some assertions have moved.

## Milestone 7 — Opening content-driven real entry

Owner confirms milestone-6 acceptance in Safari and Chrome (navigation, style,
accessibility and printing). Opening now migrates **only the real `opening.html`**;
no alternate preview page and no Middle/Final production edits. The historical
milestone-2 classic-extraction descriptions below are superseded for current code.

| Immutable source | Current destination / reconciliation |
| --- | --- |
| `opening.html` all eight sections, exact labels/requirements/headings/eyebrows | `content/opening/lesson.json`; 62 section Markdown fragments; 66 total prose/reference source mappings in `evidence/milestone-7-source-map.json` |
| `classification` 5 statements/string answers/why | `activities/classification.json`, shared Opening any-answer Next/wrap profile, 10 exact alternative feedback messages |
| 6 connected timeline titles/bodies and checkpoint 3 options/2 messages | `activities/timeline.json`, `sequence-checkpoint.json`; shared controlled timeline/question controllers, Opening-scoped composition/stage IDs |
| Entire task including 6 annotation spans; 5 alternative explanations | `activities/task-analysis.json`, exact ordered text segments; IDs who/what/how/where/terms with fixed frozen exploration bindings; TERMS highlights WHO+WHAT |
| WHAT/HOW, clarification and research decisions | `activities/{what-how,clarification,research}.json`, 8 ordered choices/all feedback; original mental-health scenario retained in section Markdown |
| Builder fields/placeholders/labels/template/copy messages/model/self-check | `activities/consensus-writing.json`, `question-selfcheck.json`, surrounding Markdown; required inputs, editable output, optional model, 35-character threshold |
| 5 quiz prompts/15 options/keys/explanations/summary/retry wording | `activities/knowledge-check.json`, all-at-once Opening profile and bounded summary metadata |
| Full reference, badge, six-step sequence/analysis/contribution/direction groups | `reference/reference.json` + `group-{1..4}.md`; explicit Opening reference layout, bounded list-cell grids |

79 extracted files: 10 activity JSON, 62 section Markdown, 4 reference Markdown,
reference JSON, manifest and mechanical config. Pure gates and presentation-only
bindings live in `lessons/opening/{completion,runtime}.js`. Frozen Opening adapter
is unchanged. New code/schema is MIT; original content © Rhys Jones / CC BY 4.0;
all original seals/captures/notices retained. Original classic core remains until
milestone 8. No homepage/shell/global-CSS consolidation or deployment changes.

All-section inventory, approved numbered title profile, no-flashcard constraint,
comparisons and real manual gaps: `evidence/milestone-7-presentation.md`. Minor
intrinsic wrapping/wrapper spacing/native focus differences are permitted; exact
wording/annotations/options/feedback/template/gates are independently asserted.

## Milestone 6 — Final content-driven public entry

Owner clarification (2026-10-27): match Middle's actual separate title profiles,
superseding the earlier uniform 48px approximation. Welcome uses
`clamp(2.25rem,5vw,3.6rem)`; pages 01–08 use `clamp(1.85rem,3.4vw,2.6rem)`;
both use bold Fraunces, 1.17 leading and `-.035em` tracking. Card fronts use
Middle's normal weight and common white/navy faces. Reference/activity/model/
completion headings are unchanged. Existing shared
front/back explored cues are verified on all eight cards, including flip-back and
reload. No content/answer/gate/storage changes. See the appended heading/cue review
in `evidence/milestone-6-presentation.md` and milestone-7's carry-forward instructions.

The owner explicitly requested applying the corrected version to `final.html`,
not a separate preview. The real entry now mounts this graph through the thin
`assets/js/final.js` module, with no classic writer or reference pilot. The separate
Final harness route/entry is removed; tests exercise root/repository `final.html`.
Original instructional content © Rhys Jones / CC BY 4.0; implementation
MIT. No sealed source/evidence or third-party notice changed.

| Pinned source | New destination / reconciliation |
| --- | --- |
| `final.html` all ten sections, labels, eyebrows, prose, examples, stage/speaker/task statements | `content/final/lesson.json`, `sections/fragment-{1..57}.md`; exact per-fragment source/text map: `evidence/milestone-6-source-map.json` |
| Page-local 8 cards (3/2/3) and 13 panels (4/2/3/4) | Three `activities/*-cards.json`, four `*-panels.json`, 29 named `activities/bodies/*.md`; **86 Markdown mappings** total |
| `final.js questions` eight banks (5/1/1/3/3/3/4/5) | Seven `*-questions.json` plus `knowledge-check.json`: **25 exact questions**, all ordered options/keys/contexts/alternative feedback |
| `notes` / generated categories | `activities/note-classification.json`: six texts/feedback; original four A–D meanings/order with stable category references |
| Synthesis/closing fields, controls, template, models | `activities/{synthesis,closing}-writing.json`: all five legacy field bindings, rows/modes/labels, template/statuses, both full model titles/paragraphs |
| `checkLabels`, `goalTexts`, caption wording | Two checklists with five/six checks; `practice-goals.json` with three exact goals and caption order |
| Displayed reference | **Unchanged** milestone-3 six-file `reference/`, sole source |
| Unused `referenceText()` prefix | `legacy-variants.json`, nonpublished pinned-provenance uppercase prefix; DOM-derived body is already the displayed reference |

There are **21 activities**. Config is mechanical; pure gates/reveals live in
`lessons/final/completion.js`. All-section presentation inventory, comparisons,
permitted differences and approval/gaps: `evidence/milestone-6-presentation.md`.
The owner's explicit local-entry cutover direction and remaining manual review
gaps are recorded there; no deployment or milestone-7 implementation is implied.

Baseline: `0b5d2297e7cbc19bd59cde750492dd28e3983ca0` (also starting HEAD).
All 15 allowlisted production/document files matched the pinned Git bytes before capture.
Hashes and allowlist: [`tests/fixtures/production.json`](../../tests/fixtures/production.json).
The inventory below remains the immutable baseline; milestone-specific current
locations are mapped here without rewriting sealed fixtures.

## Milestone 3 source-location mapping

Only Final's `#ref-content` payload moves to production content. The structural
reference title and existing Print control remain in `final.html`; all activities,
`assets/js/final.js`, legacy core and CSS stay unchanged.

| Baseline `final.html` source | Current source under `content/final/reference/` | Preserved composition |
| --- | --- | --- |
| lines 270–274, item 01 | `reference.json` item `summary-synthesis`, `summary-synthesis.md` | Summary vs. synthesis; teal; three paragraphs; Summary/Synthesis/Remember emphasis |
| lines 274–277, item 02 | `reference.json` item `synthesis-framework`, `synthesis-framework.md` | The synthesis framework; green; two paragraphs; LISTEN/CONNECT/CREDIT/ADVANCE emphasis and all example phrases |
| lines 277–280, item 03 | `reference.json` item `effective-summaries`, `effective-summaries.md` | Effective summaries; orange; two paragraphs and all example phrases |
| lines 280–284, item 04 | `reference.json` item `consensus-task`, `consensus-task.md` | Consensus and task completion; purple; three paragraphs; WHAT/HOW emphasis and all example phrases |
| lines 284–286, item 05 | `reference.json` item `after-round`, `after-round.md` | After the round; blue; one paragraph |

Reference JSON metadata and Markdown remain © 2026 Rhys Jones / CC BY 4.0;
`content/README.md` documents attribution/exclusions. Software/schema are MIT;
vendor grants are recorded separately in `THIRD_PARTY_NOTICES.md`.

Before removing the inline prose, a Chromium off-DOM render compared extracted
content to the still-present inline copy: five headings/numbers/accents, 11
paragraphs, exact normalized text and inline emphasis token sequences all matched.
`tests/browser/reference-loading.spec.mjs` repeats this semantic comparison against
the sealed baseline on both mounts in every configured browser project. It does
not substitute screenshots for content assertions. Captured semantic inventory,
paired reference images and print PDFs: `evidence/milestone-3/`; interpretation and
pending preview checks: `evidence/milestone-3-verification.md`.

## Milestone 2 source-location mapping

Opening's stylesheet and classic activity script are now external; this is **not**
content separation. The immutable source identities/tables below still refer to
the original baseline. Current locations are:

- `opening.html` baseline `<style>` payload (lines 11–57) →
  `assets/css/opening.css`. Every character between the tags is retained, including
  the initial LF and closing-tag indentation; exactly one final LF is appended.
  The link remains before `shared.css` and the unchanged Tailwind CDN script.
- `opening.html` baseline activity `<script>` payload (lines 394–664) →
  `assets/js/opening.js`. Every character between the tags is retained, including
  its initial/final LF; no newline is added or removed. Original source line N in
  this payload maps to JS line N − 393 (line 1 is the initial empty line).
  The classic script remains immediately after `lesson-core.js`.
- All `opening.classification`, `analysisAnswers`, `practice`, `quiz`, navigation,
  requirements, feedback, builder and status expressions listed below now live in
  `assets/js/opening.js`, with original declaration names and ordering intact.
  Static instructional HTML remains in `opening.html`; only the two tags/payloads
  are replaced. The reference's inline print handler remains unchanged.

`tests/helpers/opening-extraction.mjs` defines the exact transformation;
`tests/unit/baseline.test.mjs` checks both payloads, the entire transformed HTML,
all other production bytes and extracted banks against pinned/sealed evidence.
Canonical fixtures, line identities, content/answer keys and seals are not rewritten.

## Attribution and interpretation

*Discussion Skills Lab*, created by Rhys Jones. Original instructional text © 2026
Rhys Jones, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). These captures
are unadapted source/interaction records. Software is MIT. Mixed captures retain both
licenses; see the byte-exact `content/source/LICENSE` and
`content/source/CONTENT_LICENSE.md`. Tailwind, Google Fonts, third-party marks and
other materials retain their original terms; no third-party assets were vendored.

Fixture root below is `tests/fixtures/`. Arrays retain source order, case,
punctuation, Unicode and numeric zero. No deduplication or prose normalization.

## Source identities, values, markup and destinations

| Inventory | Stable source identity / exact value | Coverage / visibility | Intended later destination |
| --- | --- | --- | --- |
| `content/index-html.json` | `index.html` + `identity` child-node path or attribute; `value` exact; `markup` parent HTML | Homepage introduction, lesson summaries, progress/privacy note, attribution, link/accessibility labels | Homepage (retain wording); not a lesson bank |
| `content/opening-html.json` | `opening.html` + inert parsed node path | All eight sections, contribution explanations, task annotations, timeline details, examples, builder labels/placeholders/model/self-check, quiz headings, complete reference | `content/opening/lesson.json`, prose/reference fragments and owning activities |
| `content/middle-html.json` | `middle.html` + inert parsed node path | Nine sections; both faces of all nine cards, every detail/example/model, fictional task/data disclaimer, roundtable, writing instructions, reference | `content/middle/` prose, cards, expandables, writing and reference |
| `content/final-html.json` | `final.html` + inert parsed node path | Ten sections; both faces of eight cards, all panels, roundtables, notes instructions, builder/closing models and explanations, practice goals wrapper, reference | `content/final/` prose, cards, panels, writing and reference |
| `content/banks.json` → `opening.classification[index]` | `opening.html` inline `classification` item; text / answer / why | Five statements; procedural/substantive answer association | Opening classification activity |
| `content/banks.json` → `opening.analysisAnswers[key]` | Inline variable / category key | All five alternative tab explanations (including TERMS), not only initial panel | Opening analysis activity |
| `content/banks.json` → `opening.practice[key]` | Inline variable / item key / option index | WHAT/HOW, clarification, research: option order, correct indexes, common explanations | Opening question activities |
| `content/banks.json` → `opening.quiz[index]` | Inline variable / question / option index | All five prompts/options/keys/explanations | Opening knowledge check |
| `content/banks.json` → `middle.classification`, `research`, `group`, `communication`, `speaking`, `applications`, `questions` | `assets/js/middle.js` variable / item / option index | Every question bank; per-option speaking and research feedback, common explanations, classification labels in markup | Middle owning activities / knowledge check |
| `content/banks.json` → `middle.strategies` | JS variable / item / property | **Unused JS variants** of meanings, advantages, risks and examples; compare, but do not merge with HTML wording | Attributed unused-content archive; do not republish silently |
| `content/banks.json` → `middle.ids`, `names` | JS variable / index | Navigation names/order, including reference | Lesson manifest/config as appropriate (names are content) |
| `content/banks.json` → `final.questions[page][index]` | `assets/js/final.js` variable / page / question / option | All 25 questions, contexts, option order, correct keys, **every** per-option `why` | Final question activities / knowledge check |
| `content/banks.json` → `final.notes[index]` | JS note / category / explanation | Six note texts, correct categories and feedback | Final note categorization |
| `content/banks.json` → `final.checkLabels[page][index]` | JS page / check index | Five synthesis and six closing criteria | Final writing checklists |
| `content/source-index.json` | File + original **1-based line**, exact `value` | Every nonempty HTML/JS source line, including dynamic templates, prefixes, conditional alternatives, unused functions; script source is marked archive, not necessarily visible | Owning content/activity for instructional strings; implementation/status messages may stay in code; archive unused variants |
| `content/source/**` | File path, byte-exact full source; SHA-256 | Exhaustive recovery of source text, script templates, markup, comments, attribution, CSS-generated cues | Immutable preservation/replay evidence, not production serving dependency |
| `content/*-question-behavior.json` | Lesson + `identity` + numeric `option` | UI-observed option labels, correct association, immediate feedback for **every** option; independent of images | Exact regression assertions |
| `content/generated-controls.json` | Lesson + frozen CSS selector + initialized item index | Original-engine initialized quiz labels, Middle/Final generated checks, goals, note labels and category options; exact text, value and markup | Owning question/writing/note activities; IDs from authored maps, not recalculated indexes |

The HTML inventories use an **inert DOMParser**, so scripts cannot overwrite initial
copy before it is captured. `identity` is the path through `childNodes` starting at
`html`, with `@attribute` when appropriate. Source file + identity is unique and
frozen. `section` records `view-N`; `status` distinguishes hidden/alternative markup
from initially present markup. Initial markup does not imply viewport visibility:
closed details and inactive card faces also require exploration. `markup` retains
emphasis, links, task-mark attributes, lists and hard `<br>` breaks. Do not flatten
the marked task segments or note example line breaks during migration.

## Runtime copy not to overlook

The exact expressions below are retained, with original line identities, in
`content/source-index.json` and full source. They are additional to the data banks:

| Original location | Content / preservation responsibility |
| --- | --- |
| `opening.html:395–405` | Navigation labels and each per-page requirement message |
| `opening.html:420–438` | Classification counter, Correct/Not quite explanation prefixes, review/next labels |
| `opening.html:471–479` | Category result prefixes and terms highlighting rule |
| `opening.html:525–542` | Practice/checkpoint feedback and both checkpoint alternatives |
| `opening.html:546–579` | Builder punctuation, editable output sentence; model show/hide labels; empty/success/failure clipboard statuses |
| `opening.html:621–660` | Quiz feedback, score/pluralization, retry hints and review wording |
| `assets/js/middle.js:107–176` | Question counters, shared feedback prefixes, per-option speaking consequences, quiz review/correct-ever messages, status buttons |
| `assets/js/middle.js:178–192,226–227` | Generated criteria labels and checkbox IDs; copy empty/success/fallback copy |
| `assets/js/middle.js:194–206` | **Unused** `referenceText` variant, distinct from visible HTML reference; archive verbatim |
| `assets/js/middle.js:236–248` | `According to ${source}, … This matters to our task because …` template, trimming/punctuation, validation/status and Try Another Strategy message |
| `assets/js/final.js:117–203` | Dynamic headings/counters, lettered options, all feedback prefixes and correct-ever note, note category choices and statuses, generated self-assessment heading |
| `assets/js/final.js:206–219` | Copy statuses, unused `referenceText()` header/serialization function |
| `assets/js/final.js:242–277` | Synthesis `Building on … Therefore, …` template, capitalization/punctuation rules, edit/assemble statuses, all three goal texts and caption variants |
| `assets/js/lesson-core.js:14–34,48–66` | Completion count, lock/check/reference marks, Next/reference/bottom/navigation status copy, collapsed/expanded rail labels |
| `assets/css/shared.css:111–115`, `middle.css:68–69`, `final.css:48,116,121` | Generated explored/flip cues; retain alongside native markup cues |

## Gates, order and stable IDs

Stable activity/question/option/card/panel/field/check IDs and explicit old index/key
associations are authored in `legacy-maps/{opening,middle,final}.json`. Their array
positions are **frozen numeric mappings, including zero**, not instructions to derive
new IDs from future DOM order. Initialization evidence is in adjacent
`*-initialized-dom.json` files. See [progress compatibility](progress-compatibility.md)
for exact gates and hazards.

## Evidence review

Historical screenshots/PDFs are in `tests/fixtures/visual/`; see
[regression checklist](regression-checklist.md). Content/answer/gate comparisons are
mandatory independently of those captures. No production layout change is made in
milestone 1. Source capture scripts use exclusive creation; test runs do not rewrite
any canonical evidence.

## Milestone 4 checkpoint 4.1 — no instructional extraction

New `lessons/{opening,middle,final}/progress-adapter.js` tables mechanically encode
the authored stable IDs/initialized legacy indexes from
`tests/fixtures/legacy-maps/{opening,middle,final}.json`. They do not copy coaching
text, questions, feedback, models or answer keys (except Opening's exact existing
quiz-earned fallback correctness indexes). `assets/js/app/{legacy-progress,
progress-store}.js` and `schemas/progress.schema.json` contain runtime/boundary
implementation, not instructional content. Test-only labeled storage controls in
`tests/fixtures/harness/storage.{html,mjs}` use synthetic drafts and sealed progress
records. No production lesson/content is moved or switched; existing extraction
inventories and CC BY 4.0 attribution remain authoritative. These paths are MIT
code/config/test controls; sealed educational fixtures retain their notices.

## Milestone 4 checkpoint 4.2 — navigation-only baseline excerpts

`assets/js/app/{completion,lesson-core}.js` contains MIT runtime calculations and
navigation, not extracted lesson activities or production completion policies.
The classic `assets/js/lesson-core.js` and all production entries remain unchanged.

`tests/fixtures/harness/navigation.html` directly reuses these plain-text excerpts
from pinned `0b5d229` `opening.html`, each identified by `data-baseline` matching
the original `data-template-id`: `section-{1,2,3,4,5,6}-title` and matching
`section-{1,2,3,4,5,6}-intro`, `quiz-title`, `quiz-instructions`, `reference-title`.
The harness module copies the eight ordered labels from the extracted
`assets/js/opening.js` original `labels` array. `tests/unit/completion.test.mjs`
checks all 15 excerpts and eight labels exactly against the pinned source.
Excerpts retain © Rhys Jones / CC BY 4.0 attribution in the HTML and harness README.

This is a development-only navigation composition, not a second writable content
source or a production lesson. The first/third headings intentionally use h1/h3
to exercise intended-heading focus; remaining headings use h2. Synthetic labeled
fields and exploration/credit test buttons exercise small **test-only** gates,
not replacement questions, activity components, production gates or a renderer.
Only excerpts are displayed; full lesson/reference content remains at its existing
production and sealed locations. No production layout/content is changed and no
canonical screenshot/content/map fixture is rewritten. The fixture loads existing
shell CSS without modifying it; its few input/test-control styles are root-scoped.

## Milestone 4 checkpoint 4.3 — directly mounted baseline activities

No production instructional content is moved. `tests/fixtures/harness/components.{html,mjs}`
and `component-data.mjs` read the immutable sealed fixtures, pinned to
`0b5d2297e7cbc19bd59cde750492dd28e3983ca0`; there is no second writable content bank.
Instructional excerpts retain © Rhys Jones / CC BY 4.0 attribution; helper,
component and test code is MIT. No invented questions are published.

| Sealed source | Direct component data in test harness |
| --- | --- |
| `content/banks.json` Opening `classification`, `quiz` | All five statements/options/answer associations/explanations; all five knowledge-check questions/options/keys/explanations |
| `content/source/opening.html` `.timeline-toggle`/controlled bodies and `#sequence-check` | Six exact timeline headings/bodies, standalone checkpoint prompt/three options; its two complete feedback messages match pinned Opening script |
| `content/banks.json` Middle `group`, `speaking`, `questions` | Three group scenarios, three speaking scenarios, five quiz questions; titles/order/shared and option-specific explanations preserved |
| `content/source/middle.html` research `models` cards | Weak/stronger example fronts/backs, with source `strong` titles preserved separately as semantic titles |
| `content/banks.json` Final `questions` | All 25 questions across eight question sets, all contexts/options/answer keys/option-specific explanations |
| `content/source/final.html` `.flip` and page-2 panels | All eight cards, four Listen/Connect/Credit/Advance headings/bodies; no instructional HTML strings supplied to components |
| `legacy-maps/{opening,middle,final}.json` | Frozen stable activity/item/question/option associations for test data, never codec maps recalculated from new DOM |

Paths in the table are relative to `tests/fixtures/`. Unit tests independently
compare all 46 sequence questions, option order, correct associations and feedback
to the sealed banks, and every option round-trips through its real adapter.
The Opening standalone checkpoint brings the directly mounted total to 47 questions.
Browser tests compare profile feedback, restoration and policy inputs/results,
independently of screenshot equality. Whitespace is normalized only for ordinary
inert prose extraction; meaningful source titles and punctuation are preserved.

New component CSS is opt-in, not imported by any production page. Permitted fixture
layout differences: cards use intrinsic two-face grid sizing instead of fixed-height
clipping (short fronts may be taller), explored marks stay visible outside the flip
or in closed summaries, native button semantics replace custom card key handlers,
and all-at-once questions keep stable controls/live regions. Harness activities
are grouped together in its first test view to exercise components independently;
that grouping and small gates are **not** a lesson composition/policy proposal.
These differences preserve content, navy/white/teal identity, horizontal flip and
readability; the 320px/enlarged-text and reduced-motion checks guard the relevant
standards without rewriting sealed visual baselines.

## Milestone 4 checkpoint 4.4 — isolated writing/checklist/reference excerpts

No production instructional content moved or changed. Five directly mounted tools
are sourced by `tests/fixtures/harness/writing-data.mjs` from immutable baseline
`0b5d2297e7cbc19bd59cde750492dd28e3983ca0`. Paths below are fixture-relative.

| Sealed source | Test-only supplied data / stable IDs |
| --- | --- |
| `content/source/opening.html` `#question-builder`, `#draft-input`, `#model-answer`, `#question-selfcheck` | Consensus field labels/placeholders/editable output, exact template, model and toggle labels, self-check label; existing `consensus-*` fields and `question-selfcheck` map |
| `content/source/middle.html` research/source/finding/why/assembled/model and integrated-practice writing/model | Both original tools, labels/placeholders/rows, readonly evidence output, model text, copy/assembly/show controls; existing `evidence-*`/`integrated-draft` identities |
| `content/source/assets/js/middle.js` `addChecks('research-checks',…)` / `addChecks('application-checks',…)` | All four research and five integrated checklist labels, unchanged order, paired to frozen map IDs |
| `content/source/final.html` synthesis builder/output/model and closing draft/model | All labels/rows, editable output, model titles and paragraphs, assembly/copy/show controls; existing `synthesis-*`/`closing-*` fields/flags |
| `content/banks.json` Final `checkLabels[2]`, `[7]` | All five synthesis and six closing labels/order, paired to frozen map IDs |
| All three original handler snippets (pinned Git bytes) | Three content-supplied templates checked against actual legacy assembly behavior using synthetic punctuation/case/Unicode/multiline/missing fields |
| Production `content/final/reference/` (milestone 3) | Reused unchanged through existing loader/schema/Markdown/`renderReferenceItems`; no second reference renderer or new production reference extraction |

Original instructional text remains © Rhys Jones / CC BY 4.0; code/styles/tests MIT.
Source model `strong` titles/paragraphs stay semantic. Ordinary whitespace wrapping
is normalized only during inert source extraction; punctuation/case/wording/order
and sentence-template operations are independently asserted. Student text is never
inserted as HTML or treated as instructional Markdown. No invented questions,
grading, grammar repair or writable alternate content source.

Permitted fixture-only presentation differences: all writing tools share a first
test view, fields use opt-in fluid component styles rather than per-lesson wrappers,
models keep their original semantic titles/paragraphs, and checklist labels use
native labeled controls. Reference grouping/number identities/semantic accent classes
and Markdown renderer remain the existing implementation; a scoped fixture sheet/Letter print style replaces no
production CSS. These are harness compositions, not lesson cutover designs or full
policies. Actual zoom/AT/interactive print checks remain separate manual follow-ups.

File-based full-run PDF review confirms the harness's five stacked groups/text/
emphasis fit one readable Letter page without controls/clipping/leading blank.
Its test-only sheet uses uniform light-blue/teal groups and Arial rather than
production per-group accent colors/font pairing. This documented fixture-only
simplification retains semantic accent classes and original composition/content;
production reference styling/pilot is unchanged. Evidence and limits:
`evidence/milestone-4-4-verification.md` (final result/review section).

## Milestone 4 checkpoint 4.5 — read-only bootstrap fixtures

No production instructional content or entry moves. The isolated
`tests/fixtures/harness/content/final/` graph is an attributed test copy of:

| Fixture | Canonical source / preservation assertion |
| --- | --- |
| `activities/welcome-cards.json` | All three pinned Final page-0 cards; independent inert-HTML extraction compares every face/ID |
| `activities/connect-viewpoints-panels.json` | All four pinned Final page-2 panels; full titles/body text/order and frozen IDs |
| `activities/summary-synthesis-questions.json` | All five pinned page-1 questions, every option/key/feedback; exact bank comparison |
| `activities/connect-viewpoints-questions.json` | Pinned page-2 standalone question, all alternatives/explanations/key |
| `activities/synthesis-writing.json` | Pinned Final synthesis fields/rows/modes, exact template, control messages and model title/paragraphs; extraction/formatter-oracle comparisons |
| `activities/synthesis-checklist.json` | All five pinned page-2 check labels/order and stable map IDs |
| `reference/` (six files) | Byte-exact copies of the existing milestone-3 Final reference JSON/Markdown; unit comparison prevents independent drift |
| `lesson.json` section headings | All ten headings match pinned Final inert HTML; original `view-N`/heading semantics retained |

`lessons/final/config.json` under that **fixture** directory is mechanical MIT
configuration, not a new production config. `lesson.json` uses explicitly labeled
test-only requirements/gates and a partial set of activities. Navigation labels
are fixture metadata, not a claimed whole-lesson extraction. Other sections reuse
the attributed reference excerpts rather than inventing questions. Code/schemas/
fixture shell and test-only controls are MIT; instructional material remains
© Rhys Jones / CC BY 4.0. Source revision is the immutable
`0b5d2297e7cbc19bd59cde750492dd28e3983ca0` baseline.

Permitted fixture-only presentation: a stack/two-column callout composition tests
the bounded layouts; shared intrinsically sized components retain prior repairs.
The scoped fixture reference sheet retains 4.4's uniform blue/teal/Arial print
presentation rather than production accents/fonts. These are not designs for a
Final cutover, screenshot-pixel equivalence, altered coaching or changed production
completion policies. All production CSS/engines/entries and sealed baselines stay
unchanged. Tests run the exact same bootstrap API intended for later entries.

Final 4.5 full-run root/prefix PDF file-based review confirms complete, unclipped
five-group reference-only Letter sheets with no questions/drafts/controls/leading
blank. The uniform fixture palette/font differences above are permitted and
unchanged; production semantics/styles pass their existing independent checks.
Results/hashes and manual-check limits: `evidence/milestone-4-5-verification.md`.

## Milestone 5 — first extraction review unit (not a cutover)

Production Middle remains byte-identical to the pinned legacy lesson. The new
`content/middle/` files are the intended editable content source for this migration,
but are mounted **only** in `tests/fixtures/harness/middle-questions.html` so far.
Do not remove the original banks until the entire lesson has passed and can switch
atomically. This is intentionally not a hybrid live state writer.

All source identities below refer to `0b5d2297e7cbc19bd59cde750492dd28e3983ca0`.
Original instructional content remains © Rhys Jones, CC BY 4.0; policy, schema,
validation and test implementation are MIT. Frozen baselines/seals are unchanged.

| Original source | New content / coverage |
| --- | --- |
| `assets/js/middle.js:5–11`, `classification`; original `renderSequence:113–129` | `content/middle/activities/classification.json`: five prompts, original generated ordinal prefix, ordered Procedural/Substantive labels, exact keys and shared feedback |
| `assets/js/middle.js:18–22`, `group` | `activities/group-decisions.json`: three titles/scenarios, generated ordinal/title prefix, every option, key and shared feedback |
| `assets/js/middle.js:23–28`, `communication` | `activities/communication-diagnosis.json`: all four prompts/options/keys/shared feedback, including original generated ordinal prefix |
| `assets/js/middle.js:35–39`, `speaking` | `activities/speaking-simulator.json`: three titles/scenarios, all nine option-specific feedback messages including exact original Good choice./Not quite. prefixes |
| `assets/js/middle.js:44–50`, `questions`; `renderQuiz:153–176` | `activities/knowledge-check.json`: all five question/option orders, keys and explanations; existing shared `middle-quiz` profile retains distinct incorrect/previous-credit feedback |
| `assets/js/middle.js:226–227`, generated checks | `activities/{research,application}-checklist.json`: all four/five exact labels in original order; IDs from frozen initialized map |
| `assets/js/middle.js:29–34`, unused `strategies` values | `content/middle/legacy-variants.json`, four separately identified non-published records with every original title/meaning/advantage/risk/example preserved; source array indexes retained |
| `assets/js/middle.js:194–206`, unused `referenceText` | Same archive, `unused-reference-text` record; exact multiline string, not the published sheet and never an additional rendered reference |

`lessons/middle/completion.js` translates the original `updateCompletion:62–75`
and restore reveal conditions at `93–96` using frozen stable identities. It
contains no instructional bank or formatter literal. Unit oracles execute the
actual pinned gate/reveal code and compare all valid frozen fixtures and each
single missing prerequisite. Answers are compared to frozen numeric/index data,
not inferred from the learner-facing wording or a screenshot.

### Still unmoved / unverified for milestone 5

All `middle.html` prose/headings/labels/cards/panels/flows/roundtable/models and
the five-item **displayed** Quick Reference remain in the original HTML. Research
selection, application A/B choices and writing/template/control wording remain
in the legacy sources. Complete HTML-versus-JS strategy comparison remains part
of the speaking-section extraction; retaining the entire JS array separately
ensures no nonidentical variant is lost meanwhile.

No Markdown/lesson manifest/config, rich-body renderer extension, reveal wiring,
whole-page migration or new reference profile is claimed in this first unit.
The direct question/checklist harness uses plain Arial, outlined activity hosts
and all extracted activities on one review page; this is a test-only composition,
not an approved Middle redesign or visual regression result. No production layout
or CSS changed. Speaking's `Try Another Strategy` affordance still needs scoped
shared-component support before cutover; its absence from this partial harness
is not a passed complete speaking-section review.

## Milestone 5 — displayed reference extraction review unit

Added after the preceding first unit; the public Middle entry still has not
switched. `middle.html:428–472` at pinned `0b5d229` remains the authoritative
**displayed** source, not the archived unused `referenceText`.

| Original reference group | New `content/middle/reference/` source |
| --- | --- |
| `middle.html:429–437`, 01 Contribute substance | `contribute-substance.md`, four list items |
| `middle.html:438–446`, 02 Support the group | `support-group.md`, four list items |
| `middle.html:447–455`, 03 Communicate professionally | `communicate-professionally.md`, four list items |
| `middle.html:456–465`, 04 Manage speaking conflicts | `speaking-conflicts.md`, five list items |
| `middle.html:466–471`, 05 Your goal | `goal.md`, one strong-emphasized list item |

`reference.json` preserves title, five labels/numbers/order and original palette
identities. A bounded `middle-reference` profile in the **same** shared reference
renderer keeps the original `section.reference-box.middle-reference-item` tags,
numbered item classes, heading/number/label classes and lists. It does not add
another renderer, embedded HTML, content-selected CSS or global style cleanup.
Final's original `stacked-reference` output is unchanged. Original Middle CSS and
all numbered print overrides are retained untouched.

The standalone `tests/fixtures/harness/middle-reference.{html,mjs}` uses the shared
startup loader/renderer and original sheet/item classes, no store/legacy engine.
Its ordinary probe page is test-only; its duplicate fallback heading/Print label
is structural harness metadata, not a second editable lesson source. Browser
semantic inventories compare all 18 list items, emphasis, headings, tag/class
composition and order independently of screenshots; unit checks independently
compare Markdown/labels to the pinned HTML. Schema/runtime tests apply the common
invalid-reference corpus, adapting only its Final-specific literal duplicate ID
to the actual Middle document ID without modifying the frozen fixture.

Reference unit verification and manual-preview limits:
`evidence/milestone-5-reference-verification.md`. The remaining whole-lesson
extraction/cutover list above still applies, except that the reference now has a
non-live content-driven review path rather than only its original HTML source.
# Milestone 5 remaining extraction and whole-page cutover

The preservation source remains pinned `0b5d2297e7cbc19bd59cde750492dd28e3983ca0`;
the original engine and HTML are retained in sealed fixtures/replay, not shipped as
a second Middle writer. `tests/helpers/extract-middle.mjs` records the mechanical
extraction and `tests/browser/middle-lesson.spec.mjs` independently compares every
original nonempty prose/list/heading/label/speaker passage and semantic emphasis.

| Original source identity | Published destination |
| --- | --- |
| `middle.html #view-0`, `.flow`, welcome card group, global cards 0–2 | `content/middle/lesson.json` welcome blocks; `sections/fragment-{1,2,3,4}.md`; `activities/welcome-cards.json` and named `activities/bodies/*-{front,back}.md` |
| `#view-1`, `s1` group, global cards 3–4; classification introduction | structure section manifest/Markdown; `activities/structure-cards.json`; `bodies/{procedural,substantive}-{front,back}.md`; existing `classification.json` |
| `#evidence-details details` in initialized order | `activities/evidence-panels.json`; `bodies/{relevance,evidence,explanation,connection}-panel.md` |
| `#evidence-after`, `models` group, global cards 5–6 | evidence reveal blocks/section Markdown; `activities/research-model-cards.json`; `bodies/{weak-example,stronger-example}-{front,back}.md` |
| `middle.js research`, `#research-activity` fictional-data caution/prompt | `activities/research.json`, evidence section Markdown; all four options and full alternative feedback retained |
| `#source`, `#finding`, `#why`, `#assembled`, assembly handler, `#research-model` | `activities/evidence-writing.json`, `bodies/evidence-writing-model.md`; content literal template and statuses; existing research checklist |
| `#collaboration-details`, `#group-activity` round-table agenda | `activities/collaboration-panels.json`; four named `*-panel.md` bodies; section Markdown; existing group questions |
| `#communication-details`, examples and disclaimer | `activities/communication-panels.json`; three named `*-panel.md` bodies; existing communication questions |
| `#strategy-details`, all meanings/advantages/risks/examples | `activities/strategy-panels.json`; `bodies/{continue,request-first,yield-next,direct-connection}-panel.md`; archived unused JS strategy records remain separate |
| `speaking` cards, global indexes 7–8, `#speaking-activity` disclaimer | `activities/speaking-cards.json`; named front/back Markdown; existing speaking questions now include comparison label/message |
| `#view-6` fictional task and four speaker lines | section Markdown, including `sections/fragment-31.md` separate speaker blockquotes |
| `middle.js applications[0,1]`, original Task A/B headings | `activities/application.json`, one shared all-at-once sequence with separate visible question articles, fixed application `a`/`b` bindings |
| `#application-draft`, prompt, `#application-model`, copy/model labels | `activities/integrated-writing.json`; `bodies/integrated-writing-model.md`; existing application checklist |
| Section/navigation labels, eyebrows, original heading IDs/requirements | `content/middle/lesson.json`; `lessons/middle/config.json` holds only mechanical configuration |

Existing knowledge-check/reference/archive mappings remain authoritative. Original
unused `referenceText` is still nonpublished and is never loaded as the sheet.
All content Markdown/JSON remains © Rhys Jones / CC BY 4.0; runtime/config/schema
code MIT; third-party notices and root licenses unchanged.

`middle.html` retains shell brand/title/duration/progress/navigation/loading text
as structural metadata/fallbacks. `assets/js/middle.js` contains only imports and
bootstrap configuration: no instructional banks, bodies, answers or templates.
Generic shared control labels/statuses remain shared implementation metadata.
`view-0`…`view-8` and original heading IDs are generated explicitly from the manifest.
Minor responsive spacing/intrinsic card heights, native control composition and
front-face-on-refresh presentation are documented in the cutover evidence; content,
answer order, independent reveals and all eight completion policies are unchanged.

Owner-reported flashcard presentation regressions were subsequently corrected:
compact list spacing, normal front weight, centered front copy, internal explored
cue and original ordinary Welcome height. Intrinsic growth remains for long or
enlarged text; see `evidence/milestone-5-flashcard-style.md` for comparison evidence
and exact verification limits. Extra list whitespace/bold fronts are not accepted
migration layout differences.

The subsequent page-wide presentation follow-up restores paragraph role metadata
(`textStyle` on Markdown blocks), neutralizes nested structural-wrapper spacing,
restores Middle's pale-blue panels and rounded-square flow badges, and preserves
three wrapping Welcome cards above the original 850px breakpoint. Rich panel/model
formatting whitespace no longer becomes extra visual line spacing. These changes
do not alter instructional Markdown or completion/progress policy; comparison and
verification limits: `evidence/milestone-5-middle-presentation.md`.

Structure-section follow-up: original front `.pill` text (`PROCEDURAL`,
`SUBSTANTIVE`) is partitioned into existing `frontTitle` fields in
`activities/structure-cards.json`, with unchanged descriptions in the corresponding
Markdown bodies. The classification reveal group now uses bounded `activity` tone
to restore its original panel and question/feedback/control hierarchy. Owner
explicitly approves retaining the larger section heading and explored cue on both
card faces; these must not be reverted for main-style parity. Evidence:
`evidence/milestone-5-structure-presentation.md`.

Evidence-section follow-up: the four original `.example` callouts are Markdown
blockquotes in evidence panel bodies, styled only in that activity. Original
research-model `strong` titles move into existing `frontTitle`/`backTitle`, with
unchanged descriptions in the four Markdown bodies. Research uses existing
`activity` tone and a bounded writing stack; the `middle-evidence` writer places
all original actions before output in DOM order. Original fact-check notice is
retained with small-note styling, not deleted because absent in a reloaded main
capture. Owner-approved explored cues/larger headings remain. Evidence:
`evidence/milestone-5-evidence-presentation.md`.

Remaining-activities follow-up: all nine original Middle activity surfaces now use
one scoped palette/composition, with original scenario reveal wrappers/Task C
marked `activity`, distinct application A/B articles and a separate quiz overview/
question panel. Original collaboration/strategy example grouping and contrasting
professional-language caution/example callouts are preserved in Markdown, with
closed `calloutTones` annotations for the pair and explicit note hard breaks.
No instructional wording, bindings, keys, gates or progress policy changes.
Larger headings/explored cues remain approved differences. Evidence and actual
verification limits: `evidence/milestone-5-all-activities.md`.

Owner-approved Activity 5 exception (2026-10-27): remove the optional
`Try Another Strategy` control and `Choose another strategy to compare its
consequence.` callout from the published speaking simulator. Its `compareLabel`
and `compareMessage` metadata are removed; all three questions/options/feedback,
navigation and earned-credit rules remain unchanged. This explicit owner request
supersedes the earlier milestone-5 preservation requirement for that affordance
only. Frozen original records and historical handoffs remain unchanged.
