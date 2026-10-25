# Canonical content inventory — milestone 1

Baseline: `0b5d2297e7cbc19bd59cde750492dd28e3983ca0` (also starting HEAD).
All 15 allowlisted production/document files matched the pinned Git bytes before capture.
Hashes and allowlist: [`tests/fixtures/production.json`](../../tests/fixtures/production.json).
Nothing has been moved into production content files.

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
