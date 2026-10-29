# Adding lessons, worksheets and references

[Handbook](maintenance.md) · [Content](editing-content.md) ·
[Controls/flow](controls-and-flow.md) · [Checks](checking-changes.md)

A module is another small static entry page using the **same app and components**.
There is no page generator/build step. A new public URL requires a root HTML file,
content/config, and a thin JavaScript entry. Do not clone an existing lesson's
controllers, legacy progress maps or theme wholesale.

## Choose the shape first

| Resource | Starting point | Completion/storage |
| --- | --- | --- |
| Interactive lesson | Existing supported activities + section policies | Fresh ID-based key; defaults for every bound activity/field |
| Writing worksheet | `writing` profile `draft`, optional checklist | Drafts persist; completion only if you choose a requirement |
| Read-only handout | One reference section | `storageKey: null`, nonpersistent adapter, `{}` policy |
| Several freely browsable ordinary sections | Not currently a configuration option | Requires a scoped navigation/lifecycle extension; do not fake it with empty gates |

Every current module has **exactly one reference section, last**. A worksheet
needs no pretend final quiz. Even a reference-only module needs its one reference
section. A draft worksheet with multiple sections still needs an activity-driven
policy for each counted section you expect students to complete; an empty policy
does not unlock later ordinary sections. Use the single-reference form for a
fully ungated read-only resource.

## Before creating files

1. Approve the instructional outline, section sequence, activity types, models,
   completion rules and handout. New instructional writing is separate from the
   mechanical test labels below.
2. Choose a unique lowercase hyphenated ID, e.g. `sample-worksheet`. IDs must begin
   with a letter and use only `a-z`, `0-9`, `-`. Do not use `opening`, `middle`,
   `final`, `opening-stage`, `constructor`, `prototype`, `__proto__` for a new module.
3. Choose unique section/activity/item/question/option/field/check/reveal IDs in
   their respective scopes. Field IDs must be unique across the module's fields.
   Never recycle an ID for a different educational meaning after publication.
4. Choose persistence: `dsl:<id>:v1` for a new learning module; `null` for a
   nonpersistent reference. This does **not** migrate the existing three lessons.

The executable fixtures in `tests/fixtures/new-module/` demonstrate these shapes.
Their relative imports rely on test-server fixture routing. **Do not copy their
HTML/import paths or `fixtureApp`/`fixtureRuntime`/`fixtureChanges` globals into
production.** Use the root-page recipe below instead.

## Complete starter: a worksheet with saved draft and checks

All labels/requirements in this starter are noninstructional test content (MIT).
The five-character threshold and two checks demonstrate mechanics, not suggested
learning standards. Create these files on a non-`main` development branch, replace
the test material with reviewed instruction, and do not publish an unreviewed card.
The examples include every file needed for this module, excluding the existing
shared assets/dependencies already in the repository.

### `sample-worksheet.html`

```html
<!DOCTYPE html>
<!-- Implementation and noninstructional starter labels: MIT. -->
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sample worksheet</title>
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&amp;family=Fraunces:wght@600;700&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/tokens.css">
  <link rel="stylesheet" href="assets/css/shared.css">
  <link rel="stylesheet" href="assets/css/components.css">
  <link rel="stylesheet" href="assets/css/reference.css">
  <link rel="stylesheet" href="assets/css/print.css">
  <script src="https://cdn.tailwindcss.com/3.4.17"></script>
</head>
<body class="w-full dsl-sample-worksheet">
  <noscript><p>Lessons require JavaScript. <a href="index.html">Return to the homepage</a>.</p></noscript>
  <div class="app-shell"></div>
  <script type="module" src="assets/js/sample-worksheet.js"></script>
</body>
</html>
```

The mount stays empty. The shared shell creates navigation/progress/loading
controls. Do not copy the full shell into HTML. This starter uses generic shared
styles, not the lesson-specific Opening/Middle/Final theme. If required, add
`assets/css/sample-worksheet.css` with rules scoped to `.dsl-sample-worksheet`
before `reference.css`/`print.css`; verify all responsive states.

### `lessons/sample-worksheet/config.json`

```json
{
  "schemaVersion": 1,
  "id": "sample-worksheet",
  "storageKey": "dsl:sample-worksheet:v1",
  "content": "../../content/sample-worksheet/lesson.json",
  "sectionOrder": ["practice", "quick-reference"],
  "referenceId": "quick-reference",
  "presentation": "legacy-shell"
}
```

`legacy-shell` is the supported structural profile name, **not** the retired
classic engine. Config order, manifest order and adapter sections must match.

### `content/sample-worksheet/lesson.json`

```json
{
  "schemaVersion": 1,
  "id": "sample-worksheet",
  "title": "Sample worksheet",
  "duration": "TEST ONLY",
  "activities": [
    {"id": "sample-writing", "source": "activities/draft.json"},
    {"id": "sample-checks", "source": "activities/checks.json"}
  ],
  "sections": [
    {
      "id": "practice",
      "label": "Practice",
      "heading": "Sample practice",
      "headingLevel": 1,
      "requirement": "Enter five test characters and check both test labels.",
      "reference": false,
      "gateActivityIds": ["sample-writing", "sample-checks"],
      "blocks": [
        {"type": "markdown", "source": "sections/instructions.md"},
        {"type": "activity", "activityId": "sample-writing"},
        {"type": "activity", "activityId": "sample-checks"}
      ]
    },
    {
      "id": "quick-reference",
      "label": "Quick reference",
      "heading": "Sample reference",
      "headingLevel": 2,
      "requirement": "Always available.",
      "reference": true,
      "gateActivityIds": [],
      "blocks": [{"type": "reference", "source": "reference/reference.json"}]
    }
  ]
}
```

Each declared activity must be mounted exactly once. Gate IDs must name activities
mounted in that section. A reference section's sole block must be its reference.
All new shared-shell manifests should supply a nonempty `duration`.

### `content/sample-worksheet/sections/instructions.md`

```markdown
Enter a disposable test draft, then select both test checkboxes.
```

### `content/sample-worksheet/activities/draft.json`

```json
{
  "schemaVersion": 1,
  "id": "sample-writing",
  "type": "writing",
  "profile": "draft",
  "data": {
    "fields": [{
      "id": "sample-draft",
      "label": "Test draft",
      "multiline": true,
      "readonly": false,
      "rows": 6
    }],
    "copyLabel": "Copy test draft",
    "copyFieldId": "sample-draft"
  }
}
```

### `content/sample-worksheet/activities/checks.json`

```json
{
  "schemaVersion": 1,
  "id": "sample-checks",
  "type": "checklist",
  "data": {
    "items": [
      {"id": "check-a", "text": "Test check A"},
      {"id": "check-b", "text": "Test check B"}
    ]
  }
}
```

### `content/sample-worksheet/reference/reference.json`

```json
{
  "schemaVersion": 1,
  "id": "sample-handout",
  "title": "Sample reference",
  "layout": "stacked-reference",
  "items": [{
    "id": "sample-group",
    "number": "01",
    "title": "Test reference group",
    "accent": "teal",
    "source": "handout.md"
  }]
}
```

### `content/sample-worksheet/reference/handout.md`

```markdown
- Test handout item A.
- Test handout item B.
```

### `lessons/sample-worksheet/progress-adapter.js`

```js
// MIT. New module only; never substitute for an existing lesson's codec.
import { createIdProgressAdapter } from '../../assets/js/app/id-progress-adapter.js';

export const sampleSections = ['practice', 'quick-reference'];
export const sampleDefaults = {
  completedSections: [],
  activities: {'sample-checks': {checkedIds: []}},
  fields: {'sample-draft': ''},
  flags: {},
  ui: {}
};
export const sampleAdapter = createIdProgressAdapter({
  id: 'sample-worksheet', sections: sampleSections, defaults: sampleDefaults
});
```

Writing binds to `fields` (plus flags/UI when declared), not an empty activity
object. Every input **and output** field must have a default. The adapter/store
handles immediate input saves; do not add another storage listener. New records
use `schemaVersion: 1` plus `completedSections`, `activities`, `fields`, `flags`,
`ui` ([schema](../schemas/id-progress.schema.json)). Missing/corrupt/unknown
versions use the guarded store: no destructive initialization repair or overwrite.

### `lessons/sample-worksheet/completion.js`

```js
// MIT. Test-only threshold; replace with an explicitly reviewed requirement.
export const sampleCompletionPolicy = {
  practice: state => state.fields['sample-draft'].trim().length >= 5 &&
    ['check-a', 'check-b'].every(id =>
      state.activities['sample-checks'].checkedIds.includes(id))
};
```

The reference is always accessible, not awarded completion. With another ordinary
section added before it, completing `practice` would unlock that next section.
The app permanently retains earned section credit even after a field/check changes.

### `assets/js/sample-worksheet.js`

```js
// MIT. Static imports select trusted code; JSON never selects executable paths.
import { mountLesson } from './app/lesson-app.js';
import { sampleAdapter } from '../../lessons/sample-worksheet/progress-adapter.js';
import { sampleCompletionPolicy } from '../../lessons/sample-worksheet/completion.js';

mountLesson(document.querySelector('.app-shell'), {
  configUrl: 'lessons/sample-worksheet/config.json',
  adapter: sampleAdapter,
  completionPolicy: sampleCompletionPolicy
});
```

## Extend the starter into an interactive lesson

For each additional ordinary section, add it before the reference in config,
manifest and adapter order. Add its activity files, declarations, blocks, state
defaults and pure completion predicate. Use [content recipes](editing-content.md#activity-recipes)
for JSON. For example, to add that guide's `sample-choice` question to `practice`:

1. Save the full question JSON as `activities/choice.json`.
2. Declare `{"id":"sample-choice","source":"activities/choice.json"}` in
   manifest `activities`, mount an activity block in `practice`, and add its ID to
   that section's `gateActivityIds` if it is required.
3. Add `'sample-choice': {selections: {}, earnedQuestionIds: []}` to defaults
   `activities`.
4. Extend the predicate with
   `state.activities['sample-choice'].earnedQuestionIds.includes('sample-question')`.
5. Update the requirement and instructions; test every option/feedback and reload.

Useful default shapes for the standard registry (all start with unearned credit):

| Type | Entry in `defaults.activities[activityId]` |
| --- | --- |
| `flashcards` | `{exploredIds: [], backIds: []}` |
| `expandables` | `{exploredIds: [], openIds: []}` |
| `multiple-choice` | `{selections: {}, earnedQuestionIds: []}` |
| `question-sequence` | `{selections: {}, earnedQuestionIds: [], currentQuestionId: '<first-question-id>'}` |
| `checklist` | `{checkedIds: []}` |
| `note-classification` | `{earnedNoteIds: []}` |
| `task-analysis` | `{exploredIds: []}` plus its specialized data contract |
| `writing` | Instead use `fields` for every declared field/output and `flags`/`ui` for bindings |

`opening-classification` additionally tracks `attemptedQuestionIds: []`; do not
select that specialized profile casually. Writing `assembledFlag`/`modelFlag`
bindings require matching `false` defaults in `flags`; optional `modelUi` belongs
in `ui`. All IDs in policies must be the actual IDs in the JSON, not visible labels.
The validator checks data graphs, but **cannot prove your statically imported
defaults or completion rules are pedagogically or operationally correct**; test
the public entry with real interactions.

## Reference-only resource

For a fresh `sample-reference` resource, create its own root HTML/entry/config and
`content/sample-reference/` reference JSON/Markdown. Use the starter HTML with its
title/body class/script changed to `sample-reference`; use the handout files above
under that resource's own `reference/` directory. No writing/checklist files needed.

`lessons/sample-reference/config.json`:

```json
{
  "schemaVersion": 1,
  "id": "sample-reference",
  "storageKey": null,
  "content": "../../content/sample-reference/lesson.json",
  "sectionOrder": ["quick-reference"],
  "referenceId": "quick-reference",
  "presentation": "legacy-shell"
}
```

`content/sample-reference/lesson.json`:

```json
{
  "schemaVersion": 1,
  "id": "sample-reference",
  "title": "Sample read-only reference",
  "duration": "TEST ONLY",
  "activities": [],
  "sections": [{
    "id": "quick-reference",
    "label": "Reference",
    "heading": "Sample reference",
    "headingLevel": 1,
    "requirement": "Always available.",
    "reference": true,
    "gateActivityIds": [],
    "blocks": [{"type": "reference", "source": "reference/reference.json"}]
  }]
}
```

`assets/js/sample-reference.js`:

```js
import { mountLesson } from './app/lesson-app.js';
import { createIdProgressAdapter } from './app/id-progress-adapter.js';

const adapter = createIdProgressAdapter({
  id: 'sample-reference', sections: ['quick-reference'], persistent: false
});
mountLesson(document.querySelector('.app-shell'), {
  configUrl: 'lessons/sample-reference/config.json',
  adapter, completionPolicy: {}
});
```

This makes no localStorage reads/writes and has zero counted pages, not a fake
quiz. No new adapter module is necessary. Replace test labels before publication.

## Connect the homepage and development server

After the complete resource is reviewed, add a record to `content/catalog.json`'s
`lessons` array (not another `schemaVersion` object):

```json
{
  "id": "sample-worksheet",
  "url": "sample-worksheet.html",
  "title": "Sample worksheet",
  "description": "Noninstructional test resource."
}
```

The record's ID must match config/manifest and its URL must be exactly `<id>.html`.
Array position determines card order. Review `index.html`'s generic no-JS/error
fallback navigation if the new resource should also be listed there; do not copy
full card/prose markup. Preserve the three existing public entry URLs.

**Important test-server limitation:** `python3 -m http.server` serves a new root
HTML immediately, but `tests/helpers/static-server.mjs` currently allows only the
historical root HTML names via `productionPaths`. It already allows new files
inside `assets/`, `content/`, `lessons/`. Adding a new root page therefore also
requires a narrowly scoped **current-site** root-entry allowlist/rule in that test
server and tests for the new root/prefix route. Do not add the new page to
`productionPaths` in `tests/helpers/baseline-source.mjs`: that is the fixed
original-engine replay list, and the new page did not exist at the pinned revision.
Do not loosen traversal, hidden-file or fixture protections. Catalog validation
checks file destinations but does not automatically configure server routes.

## Acceptance checklist for a new module

- [ ] Reviewed instruction replaces all test labels; licenses/attribution preserved.
- [ ] All identity/order/source/answer associations validate; HTML has correct
  title, viewport, no-JS message and exactly one empty mount/entry module.
- [ ] Correct defaults/bindings; no fixture globals, copied controllers or legacy keys.
- [ ] Fresh visit: correct locks, truthful requirements, accessible reference.
- [ ] Every activity works; each missing requirement prevents new completion.
- [ ] Drafts save on input, questions save selection/cursor, reload preserves credit
  without default writes; completion never relocks after later changes.
- [ ] Invalid/unavailable/unknown-version storage is non-destructive; content errors
  can retry and don't block independent reference access.
- [ ] Keyboard/focus/live feedback, 320/390px, actual zoom, reduced motion and all
  changed long/revealed states are checked; limits honestly recorded.
- [ ] Reference-only Print/Cmd+P from ordinary and reference screens; no clipping,
  questions, controls, blank leading page or discarded instruction.
- [ ] Catalog link and new public route tested at `/` and `/discussion-skills-lab/`;
  affected existing consumers checked if shared code/styles changed.
- [ ] [Checks/release](checking-changes.md) recorded; publication separately approved.

No rollback to the pre-refactor engine is promised for a module that never existed
there. Existing modules still require their original-engine compatibility checks.
