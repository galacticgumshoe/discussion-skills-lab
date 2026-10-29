# Discussion Skills Lab content

Original lesson/activity/reference metadata (`*.json`) and instructional prose (`*.md`) are
© 2026 Rhys Jones, licensed under [CC BY 4.0](../CONTENT_LICENSE.md).
Attribution: *Discussion Skills Lab*, Rhys Jones. The Final reference was moved
without instructional changes from `final.html` at baseline
`0b5d2297e7cbc19bd59cde750492dd28e3983ca0`.

Schemas, loaders, renderers and other software remain [MIT](../LICENSE).
These grants do not include third-party libraries, fonts, marks or other
third-party materials; see [third-party notices](../THIRD_PARTY_NOTICES.md).
The existing root license grants remain authoritative.

The homepage loads `home.md` (educational introduction,
progress notice and disclaimer) and `catalog.json` (exact ordered lesson titles,
descriptions and root links). These are also original © Rhys Jones / CC BY 4.0
content. The owner-approved local cutover is implemented; publication remains a
separate decision. See [adding modules](../docs/adding-modules.md) for the actual
schemas, stable-ID rules and new-module/worksheet/reference examples.

## Authoring / validation

For everyday changes, start with the [maintenance handbook](../docs/maintenance.md)
and [content-editing recipes](../docs/editing-content.md). For a new
resource, use the [complete module starter](../docs/adding-modules.md);
for gates/buttons/navigation, use [controls and flow](../docs/controls-and-flow.md).

Node **22+** is needed only for development: `npm ci`, then
`npm run validate:content`. Static hosting needs no install or build.
Middle is fully content-driven: edit `middle/lesson.json` for ordered sections,
labels and bounded composition; `middle/sections/*.md` for explanations;
`middle/activities/*.json` for stable activity IDs, labels/options/answer keys,
checklists, fields and literal writing templates; and `middle/activities/bodies/`
for rich card/panel/model prose. References live in each lesson's `reference/`
directory. Keep stable IDs and answer order intact. `middle/legacy-variants.json`
is an explicitly nonpublished preservation archive, never a lesson include.

Validation selects the lesson, activity, reference or archival schema and checks
IDs, graph/order/gate references, allowed profiles, root-contained source paths
and existing regular Markdown files (including realpath symlink containment).
Mechanical configuration lives separately in `lessons/middle/config.json`;
completion/reveal policies are trusted code, not expressions in content.
Unknown properties/types/layouts/accents are rejected.

Final's milestone-6 graph (`final/lesson.json`, `sections/`, `activities/`) now
loads directly from **`final.html`**, as explicitly requested by the owner.
The separate `/final-harness.html` route is retired. Root and repository-subdirectory
URLs work on ordinary static hosting. `final/reference/` is the sole reference source;
`final/legacy-variants.json` preserves the unused reference-copy prefix without
publishing it. Do not edit sealed fixtures or run both engines together.

`note-classification` declares ordered categories (`id`/`label`), notes
(`id`/`text`/`correctCategoryId`/`feedback`), and exact placeholder/feedback
prefixes. Correctness references IDs, never category order. Wrong choices stay
session-local; correct notes restore disabled without events.

Existing writing data optionally accepts `edit: {label, message?}`, `actionOrder`
(`edit-copy-model` or `model-copy-edit`) and `outputReveal: "assembled"` for original
control/reveal composition. Explicit assembly alone regenerates output; typed
output saves immediately. Question sequences optionally declare `heading` and
`counterScoreLabel`; Final uses `final-questions`, not Middle's overview/wraparound.
Checklists may declare `caption: {prefix, empty}`, derived in declared item order
without a persistence field. Bounded `progress` blocks display a declared
question-ID score and counted completion; `navigation` blocks contain only
existing section IDs and text labels. Neither is an activity or gate. These use
the same closed boundaries, not HTML/classes, expressions or executable includes.

Markdown blocks may use the closed `textStyle` values `lead`, `note`,
`instruction`, `label`, or `symbol` to retain the original paragraph hierarchy without
embedding styling in prose. Omit it for ordinary text. These are presentation
roles, not arbitrary CSS classes; runtime and development validation reject
unknown values. Group/loading wrappers must not add a paragraph gap per nesting
level. Rich Markdown panel/model bodies collapse formatting whitespace while
retaining explicit hard breaks; plain-text bodies retain their line breaks.
The bounded group tone `activity` marks an original activity-panel composition
(currently Middle classification). Flashcard `frontTitle` keeps a short label
separate from its description; do not repeat the same label in `frontSource`.
Likewise use `backTitle` for an independently styled short back heading. Preserve
authored example/citation callouts with Markdown blockquotes rather than ordinary
paragraphs when the activity presentation supplies callout styling. Keep original
fact-check notices: their temporary absence after reload is not permission to
remove them from assembly feedback.

Use `tone: "activity"` for an original activity-panel group rather than leaving
it plain; Middle's shared theme supplies the border, shading and title hierarchy.
Existing application/quiz sequence profiles supply their own distinct panels, so
do not add an extra outer activity frame to those hosts. Expandable Markdown may
annotate one or two blockquotes with closed `calloutTones: ["caution", "example"]`
when contrasting examples require different original treatments. Annotation count
must match blockquotes; arbitrary classes/styles are rejected. Keep hard breaks
inside quoted note examples, and preserve the original caution/example order.

Sources resolve from the declaring JSON, not the HTML. Use unencoded relative
paths with ASCII letters, digits, `_`, `-`, `.`, and `/`; no absolute paths,
queries, fragments, backslashes or percent encoding. Parent segments are allowed
only when the resolved file remains inside `content/`. Prose links are separate:
ordinary relative, HTTPS/HTTP and mailto links are allowed, not executable URLs.
Raw HTML is displayed as text. Blank lines create paragraphs; soft newlines are
not hard breaks. Preserve emphasis with `**…**` / `*…*` and intentional hard breaks
with Markdown hard-break syntax. No student text enters this renderer.

Card faces are prose inside native buttons: do not add links or interactive content
to them. Other prose may use the safe links described above. Current-face/open
presentation is separate from permanent explored credit; do not infer indexes from
file order or markup. The frozen adapter owns all legacy progress mappings.

## Opening (milestone 7)

The real `opening.html` loads `opening/lesson.json`, `sections/`, `activities/`
and `reference/` using the common app. There is no alternate preview HTML or build
step. All ten activities retain their frozen IDs, direct v1 fields and source
wording. **Opening has no flashcards.** Static comparison/definition cards remain
prose, not exploration requirements.

`task-analysis` contains ordered `segments: [{text, categoryId?}]` and five ordered
categories (`who`, `what`, `how`, `where`, `terms`), each with a fixed exploration
binding, label/answerLabel/explanation and explicit highlight IDs. Concatenation
is the exact task. TERMS highlights WHO + WHAT spans, never a string replacement.
Initial rendering/reload is unselected and silent. `schemas/task-analysis.schema.json`
and the runtime validator reject arbitrary markup, extra fields and wrong mappings.

Opening alone uses `tone: "soft"` for pale original panels and `textStyle: "symbol"`
for decorative roadmap/destination symbols (hidden from assistive technology).
Markdown `headingId` preserves a source subordinate heading ID; its fragment must
contain exactly one h3. It is not arbitrary HTML or a selector supplied by content.
The `opening-knowledge-check` profile optionally declares closed `summary` labels:
title, scorePrefix/scoreSeparator/scoreSuffix, completeMessage, remainingTemplate,
singular/plural. It shows all five questions together. `opening-reference` has four
bounded Markdown groups, a text badge, and scoped six-step/definition/contribution/
terminology grids. No new generic template language or arbitrary CSS/HTML fields.

Opening-scoped styles preserve original panels/pills/timeline/tab colors/feedback,
with the approved larger numbered headings. Keep 35-character/self-check and
current-answer gates; do not substitute Middle/Final gates or themes. Models and
timeline open state stay session-only; exploration and earned credit persist.
