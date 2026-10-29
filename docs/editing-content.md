# Editing content

[Handbook](maintenance.md) · [Controls/flow](controls-and-flow.md) ·
[New modules](adding-modules.md) · [Checks](checking-changes.md)

## Find the authoritative file

Use your editor's repository search for a distinctive visible phrase, limited to
`content/`. Search results in `tests/fixtures/` or evidence are historical/test
copies, not the live lesson. If a phrase spans Markdown emphasis or line breaks,
search a shorter part. Then trace the file through the manifest to its section.

| What appears on screen | Authoritative location |
| --- | --- |
| Homepage eyebrow, title, introduction, progress notice, disclaimer | `content/home.md` |
| Homepage card titles, descriptions, order, destinations | `content/catalog.json` |
| Lesson header title and duration | `content/<id>/lesson.json`: `title`, `duration` |
| Browser tab title | Root `<id>.html`: `<title>` (separate from visible heading) |
| Rail/mobile labels, section title, number/time line, requirement | Manifest section: `label`, `heading`, `eyebrow`, `requirement` |
| Explanations, static examples, callouts | Manifest `markdown.source` → usually `sections/*.md` |
| Cards, panels, questions, feedback, writing labels/models/checks | Manifest `activities` → `activities/*.json`, sometimes Markdown under `activities/bodies/` |
| Printable handout | Manifest reference block → `reference/reference.json` → its Markdown sources |
| Shared Next/Back/loading/error/flip labels | Software; see [controls](controls-and-flow.md#where-controls-live) |

`content/<id>/lesson.json` has two key arrays:

- `activities` declares each activity's stable ID and source file.
- `sections` lists the screens in order, their metadata and ordered `blocks`.
  Blocks place prose and activities, including those hidden until a reveal.

The numbered `fragment-*.md` names are extraction artifacts, **not page numbers**.
Do not assume `fragment-7.md` belongs to section 7. Use the manifest. A filename
can be renamed with all references updated, but doing so is unnecessary for a
wording edit; do not rename IDs along with filenames.

### Existing section IDs (in displayed order)

Each row below points to `content/<lesson>/lesson.json`; find its `sections` entry
by `id`, then follow `blocks` and activity declarations.

| Lesson | Ordered sections (last is always the reference) |
| --- | --- |
| Opening | `contributions`, `opening-sequence`, `task-analysis`, `clarifications`, `give-direction`, `research-transition`, `knowledge-check`, `quick-reference` |
| Middle | `welcome`, `structure-substance`, `evidence`, `support-group`, `communication`, `speaking-conflicts`, `integrated-practice`, `knowledge-check`, `quick-reference` |
| Final | `welcome`, `summary-synthesis`, `connect-viewpoints`, `organize-findings`, `consensus`, `task-audit`, `professionalism`, `closing-practice`, `knowledge-check`, `quick-reference` |

## Text-only revision: step by step

1. Find the phrase and confirm which public page includes it.
2. Edit only wording/formatting, not IDs, profiles, answer associations or policies.
3. If the wording also appears in the Quick Reference, a model, placeholder or
   feedback, review those separately. They are not automatically synchronized.
4. Run `npm run validate:content` (development setup: [checks](checking-changes.md)).
5. Open the changed section; expand panels, flip both card faces, reveal models,
   try every changed answer and reload. Check mobile and print if relevant.
6. Review test failures as described under [intentional revisions](#intentional-instructional-revisions-and-preservation-tests).

### Markdown and JSON rules

Supported prose includes paragraphs, headings, lists, `**bold**`, `*emphasis*`,
blockquotes, code and explicit links `[label](https://example.org/)`. A blank line
starts a paragraph. A soft newline wraps as a space; two trailing spaces or a
backslash at line end make an intentional hard break. Preserve meaningful breaks.

Raw HTML is not enabled. Images, tables, iframes, forms, inline styling and custom
classes are not supported by the prose renderer. Markdown is for instruction,
not interactive buttons. Card faces live inside buttons: do not put links or
interactive elements in them. JSON strings such as prompts/feedback/labels are
plain text; adding `**bold**` there does not make Markdown.

JSON requires double quotes, no comments and no trailing commas. Escape embedded
quotes as `\"`; use `\n` for a newline inside a string. Do not change
`schemaVersion: 1` when revising ordinary wording.

### Paths are relative to the declaring file

- `content/middle/lesson.json` → `sections/fragment-9.md`.
- `content/middle/activities/welcome-cards.json` → `bodies/welcome-evidence-front.md`
  (illustrative filename; use the actual source in the JSON).
- `content/middle/reference/reference.json` → `group-1.md`.
- `lessons/middle/config.json` → `../../content/middle/lesson.json`.

Use unencoded relative file paths; allowed characters are ASCII letters, digits,
`_`, `-`, `.`, `/`. Includes cannot use leading `/`, remote URLs, query strings,
fragments or backslashes, and must resolve inside `content/`. Markdown prose
hyperlinks are different: safe HTTP/HTTPS/mailto or relative destinations are
allowed. Relative hyperlinks resolve from the **Markdown file**, not root HTML.
For example, from `content/middle/sections/example.md`, a link to `final.html`
would be `../../../final.html`. Test it under the repository prefix too.

## Headings and composition

Change `label` for rail/mobile navigation; `heading` for the screen's main heading;
`eyebrow` for its optional section-number/time line. Changing one does not rewrite
the others. `headingLevel` is 1, 2 or 3; preserve accessible hierarchy.
`headingId` is a DOM/focus/testing hook, not a visible title. Keep it stable.
Include `duration` in any manifest used with the generated shell, even though the
manifest schema permits omitting it for older fixtures.

To add a prose paragraph, edit the existing Markdown or add a file and a
`{"type":"markdown","source":"sections/new-note.md"}` block at the intended
position. Do not create a new section just to add a paragraph. Available
`textStyle` values are `lead`, `note`, `instruction`, `label`, `symbol`; omit it
for normal prose. **`symbol` is decorative and hidden from assistive technology**,
so never use it for meaningful instruction.

A `group` contains ordered blocks, with `layout` (`stack`, `two-column`, `flow`,
`roundtable`) and `tone` (`plain`, `callout`, `caution`, `example`, `activity`,
`soft`). Nest at most three groups. These select existing treatments; they are
not arbitrary CSS fields. Some treatments depend on the lesson theme. Avoid
wrapping an already-framed quiz in a second activity panel. Adding a `revealId`
is a behavior change: without a matching policy it stays hidden.

## Activity recipes

The examples below use noninstructional test labels (MIT), not new coaching advice.
The complete schema is [activities.schema.json](../schemas/activities.schema.json);
runtime semantic validation is also required.

### Questions, choices and feedback

- A single question uses `type: "multiple-choice"`, `profile: "standard"`,
  with the question directly in `data`.
- A question set uses `type: "question-sequence"`, with ordered
  `data.questions`. Keep its existing profile unless intentionally changing flow.
- Each question has its own `id`, `prompt`, optional `context`, `correctOptionId`
  and ordered `options`. Correctness references an option **ID**, not position.
- Provide `explanation` for a question-wide explanation, or `feedback` on every
  option. Preserve the existing shared/per-option distinction during wording edits.

```json
{
  "schemaVersion": 1,
  "id": "sample-choice",
  "type": "multiple-choice",
  "profile": "standard",
  "data": {
    "id": "sample-question",
    "prompt": "Select test option B.",
    "correctOptionId": "option-b",
    "options": [
      {"id": "option-a", "text": "Test A", "feedback": "Test response A."},
      {"id": "option-b", "text": "Test B", "feedback": "Test response B."}
    ]
  }
}
```

The outer activity ID and inner question ID serve different purposes. To correct
an answer key, review **both** `correctOptionId` and explanations/feedback, plus
current-answer completion policies that may name the correct option explicitly.
Correct-ever credit already earned will not be revoked. Changing the educational
meaning of an existing question needs a compatibility decision, not just a key edit.

Adding/removing/reordering questions in existing lessons is not text-only: review
fixed progress maps, gates, question cursor defaults, summary `questionIds` and
tests. See [structural changes](controls-and-flow.md#adding-or-reordering-existing-lesson-structure).

### Flashcards and expandable rows

- Flashcards: ordered `data.items`; each has `id` and exactly one of `front` or
  `frontSource`, and exactly one of `back` or `backSource`. Optional `frontTitle`
  and `backTitle` style short headings separately; do not repeat them in the body.
  Flashcards have **no** `profile` field. Opening has no flashcards.
- Expandables: `type: "expandables"`, `profile: "standard"` or existing `timeline`;
  each item has `id`, `title`, exactly one of `body` or `bodySource`.
- For rich bodies, edit the referenced Markdown. Expandable `calloutTones`, if
  present, annotates one or two blockquotes as `caution`/`example`, in order;
  the count must match the body. Do not turn plain text into raw HTML.
- Wording can change without changing explored credit. A new required card/panel
  requires defaults, policy and persistence review; adding an item to JSON alone
  does not add it to a completion rule.

### Writing fields, assembly, models and checklists

Concrete examples: `content/opening/activities/consensus-writing.json`,
`content/middle/activities/evidence-writing.json`,
`content/final/activities/synthesis-writing.json`.

1. Field wording is in `data.fields` and optional `data.output`: `label`,
   `placeholder`, `rows`, optional `maxLength`. Keep `id`, `formatKey` and
   `readonly` unchanged for wording edits. A smaller `maxLength` can affect saved
   drafts and is not just a cosmetic change.
2. Assembly button/status text is in `data.assembly`. `template` is instructional
   content, with a **closed** set of placeholders, not JavaScript:

   | Profile | Required input `formatKey`s | Output |
   | --- | --- | --- |
   | `opening-consensus` | `problem`, `accomplishment` | Editable |
   | `middle-evidence` | `source`, `finding`, `why` | Readonly |
   | `final-synthesis` | `contributors`, `relationship`, `recommendation` | Editable |
   | `draft` | No assembly/formatter | Ordinary draft field(s) |

   Preserve brace names and review punctuation/lowercasing behavior in
   `assets/js/utilities/writing-formatters.js`. Changing a literal sentence does
   not require changing its algorithm. Arbitrary placeholders are rejected.
3. Model wording is in `data.model.blocks`: each block has `kind` (`title` or
   `paragraph`) and exactly one of plain `text` or Markdown `source`. `showLabel`
   and `hideLabel` name model controls. `mode` is `show-only` or `toggle`.
   Optional versus required model viewing is determined by the policy/binding,
   **not the existence of model text**.
4. `copyLabel`, `copyMessages`, optional `edit`, `actionOrder` and `outputReveal`
   are existing closed control options; see the [behavior guide](controls-and-flow.md).
   Do not add unsupported JSON properties for new control behavior.
5. Checklists are separate `type: "checklist"` activities with ordered
   `data.items: [{"id":"…","text":"…"}]`. Optional `caption.prefix`/`empty`
   derives a caption from selected items. Changing a sentence preserves its ID;
   adding/removing a criterion requires gate/state review.

Writing stays ungraded. Editing a model/template does not rewrite saved student
outputs: assembly happens only when the student activates it. Never overwrite
an existing draft to make it match revised instructional text.

### Specialized classification and task analysis

- Final's `note-classification` has ordered categories (`id`, `label`) and notes
  (`id`, `text`, `correctCategoryId`, `feedback`), plus choose/correct/wrong labels.
  Correct notes earn permanent note credit; wrong selections are session-local.
- Opening's `task-analysis` uses exact ordered text `segments` and five categories
  with explanations/highlight/exploration bindings. The segments concatenate to
  the displayed task. TERMS highlights WHO and WHAT. Read
  `schemas/task-analysis.schema.json` and its runtime validator before changing
  structure; use existing explanation strings for wording-only edits. It is not
  a general arbitrary-highlighter format.

## Quick References

1. Open `content/<id>/reference/reference.json`. Edit ordered item `title`, `number`,
   `accent` or its referenced Markdown. The outer section heading is separately
   in `lesson.json`; review both when renaming a reference.
2. Preserve the intended reading order and all examples/emphasis. Allowed accents:
   `teal`, `green`, `orange`, `purple`, `blue`.
3. Keep the existing layout: Opening `opening-reference` (exactly four groups and
   its badge); Middle `middle-reference`; Final `stacked-reference`.
4. A new group also needs a unique item ID and an existing Markdown source.
   Opening's four-group composition cannot accept a fifth without a reviewed
   schema/renderer change. Other layouts permit more groups but need print review.
5. Review both screen layout and reference-only print from **an ordinary screen**
   and the reference itself. Do not reduce font size or hide text merely to keep
   a larger handout on one page.

## Homepage

`content/home.md` must keep exactly five rendered blocks: eyebrow paragraph, h1,
introductory paragraph, progress paragraph, disclaimer paragraph. Keep the strong
progress label. Extra paragraphs/lists/headings require a renderer/validation/test
change, not just a Markdown edit. The normal content validator does not establish
that rendered five-block shape; preview it and run the homepage browser tests.

`content/catalog.json` contains `schemaVersion: 1` and ordered `lessons` records,
each with `id`, `url`, `title`, `description`. The URL must be exactly `<id>.html`.
Editing a card title does not rename the lesson heading or browser tab. Changing
array order changes card order only, not lesson progression. Do not remove/rename
the three existing public URLs. To add a card, first create and test its complete
[module](adding-modules.md). Generic no-JS/error fallback links live in `index.html`;
review those explicitly if another resource should be reachable on failure, without
duplicating educational descriptions.

## Intentional instructional revisions and preservation tests

The refactor tests deliberately compare current instruction to the original.
A genuine owner-requested revision can therefore pass schemas and still fail an
exact-content/policy test. This is a review signal, not permission to reseal evidence.

Record the exact approved change and why; retain original source/banks/maps/visuals
and the seal in `tests/fixtures/manifest.json`. Update **nonsealed current-site
assertions** or add a separately identified revision expectation that distinguishes
approved differences from unchanged content. Keep independent checks for answers,
all feedback, models, policies and restored progress. Never skip a whole historical
test category or rewrite frozen fixtures to make the failure disappear. Broader
course revisions may need their own scoped specification and compatibility plan.
