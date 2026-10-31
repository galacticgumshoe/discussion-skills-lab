# Changing controls and learning flow

[Handbook](maintenance.md) · [Content](editing-content.md) ·
[New modules](adding-modules.md) · [Checks](checking-changes.md)

This guide is for deliberate behavior changes. Routine content edits should not
touch the shared runtime. Decide whether a change is **lesson-specific** or should
affect **every consumer** before editing shared code.

## Four independent concepts

| Concept | Owned by | Meaning |
| --- | --- | --- |
| Completion | `lessons/<id>/completion.js` and shared completion/store | What earns a section's permanent credit |
| Reveal | Optional `revealPolicy` in the same lesson policy module | Which in-section groups are currently visible |
| Navigation | `assets/js/app/completion.js`, `lesson-core.js` | Whether a section can be visited, and focus/scroll/UI |
| Persistence | Store plus lesson adapter | Which credit, drafts and UI facts survive reload |

`gateActivityIds` lists declared, mounted activities relevant to a section's gate.
It is validated metadata, **not an executable rule or automatic “all done” check**.
`requirement` is explanatory text. Changing either alone does not change completion.
A group's `revealId` must match a key returned by its statically imported reveal
function; a missing/false key leaves it hidden. A reveal does not itself earn credit.

## Where controls live

| Change | File(s) to inspect |
| --- | --- |
| Shared header, rail, mobile selector, skip link, Back/Next markup and labels | `assets/js/app/lesson-shell.js` |
| Rail links, mobile selection, collapse, progress display, heading focus, scroll and Next/Back states | `assets/js/app/lesson-core.js` |
| First/reference/previous-section access rule; permanent completion union | `assets/js/app/completion.js` |
| Loading, retry, one writer, saving after changes/readiness checks | `assets/js/app/lesson-app.js` |
| Content groups, reference Print control, retry controls, static activity bindings | `assets/js/app/section-renderer.js` |
| Flashcard flip and explored cue | `assets/js/components/flashcards.js` |
| Open/close panels or timeline | `assets/js/components/expandables.js` |
| Choices, correctness/highlighting/feedback | `assets/js/components/multiple-choice.js` |
| Question Next/Previous/retry/jump/compare/score | `assets/js/components/question-sequence.js` |
| Writing assembly, model/edit/copy controls | `assets/js/components/writing-activity.js`; clipboard fallback in `assets/js/utilities/clipboard.js` |
| Checkboxes and derived caption | `assets/js/components/checklist.js` |
| Note categories or task-analysis tabs | `assets/js/activities/note-classification.js`, `task-analysis.js` |
| Reference fetching/retry/print readiness | `assets/js/app/reference-loader.js`, `assets/js/components/quick-reference.js` |
| Lesson-specific decoration or legacy flag bridge | `lessons/opening/runtime.js`, `lessons/middle/runtime.js` |
| Homepage rendering/fallback and catalog validation | `assets/js/home.js`, `assets/js/app/catalog-validation.js` |
| Size/color/spacing/focus/responsive rules | `assets/css/` (ownership below) |

Some button labels are activity content (`copyLabel`, model labels, `retryLabel`,
reference block `printLabel`); others are software defaults. Search the exact
visible label in `assets/js/` before inventing a new content field. Do not change
hook IDs/data attributes just to change a label; they are used by controllers,
accessibility relationships, CSS and tests. The active core is
**`assets/js/app/lesson-core.js`**; the old classic global core is retired.

## Current policies to preserve unless explicitly revising them

- A section is visitable if it is first, is the reference, is already completed,
  **or its immediate predecessor is completed**. It does not require every earlier
  section, so non-contiguous saved completion must continue to work.
- Refresh starts at the first section. Current question cursors/drafts can restore;
  there is no current-section URL/history restoration.
- Reference is always accessible with zero credit, excluded from progress totals,
  and hides bottom Back/Next controls. Totals are Opening 7, Middle 8, Final 9,
  Before the Round 6.
- Completion is permanent: wrong-after-right, cleared drafts, closed panels and
  unchecked boxes cannot revoke an already completed section.
- Exploration differs from current presentation: flip-back/closed state must not
  lose explored credit. Hydration must not invent exploration or save defaults.
- Most questions use correct-ever evidence. Opening classification instead needs
  all **current** answers correct before first completion. Opening also uses some
  current-answer single-question gates; read its actual `completion.js`.
- Opening's draft threshold is 35 trimmed characters plus its self-check.
  Middle requires historical evidence assembly plus checks; Final's synthesis
  gate also requires nonempty current inputs, assembly, required model and checks.
- Opening/Middle model viewing is optional in their current gates; specified
  Final models are required. Writing is never automatically graded.
- Before the Round requires all five planning checks, both task-access answers,
  both arrival answers, all five expandable icebreakers plus the inclusive-start answer,
  both observation answers, and all five readiness answers in its six sections.
  Questions use correct-ever credit; unchecked plans and closed examples never
  revoke earned section credit. It uses `dsl:before-round:v1` and the ID adapter.
  All five examples reveal the icebreaker question; previously completed `connect`
  sections keep access without fabricated exploration credit for the new activity.

The complete precise rules are in `lessons/<id>/completion.js`,
not inferred from this summary or requirement wording.

## Recipe: revise a completion requirement

1. Write the desired rule in plain language, including one-missing cases. Say what
   happens for already-completed records and records missing detailed activity history.
2. Locate the section's predicate in `lessons/<id>/completion.js` and the actual
   state keys it reads. Check the activity JSON and adapter defaults/mappings.
3. Update that predicate only; keep it pure (state in, boolean out). No DOM, storage,
   fetch, timers or side effects. Return boolean `true`, not a truthy count/string.
4. If dependencies changed, update `gateActivityIds` and requirement/instruction
   wording, plus defaults for any newly introduced state. Review reveal rules too.
5. Keep the shared app/store's permanent-credit union. Harder future requirements
   do not retrospectively revoke credit. If students need to take a substantially
   different activity, design a separate identity/version decision; do not reset
   the legacy key. See [saved-progress compatibility](#saved-progress-compatibility).
6. Add focused policy tests: all met, each prerequisite missing, wrong→right→wrong,
   non-contiguous old completion, cleared/unset values, reload with old payload.
   Add browser tests for actual unlocking and accessibility, not just predicates.

The app evaluates gates after meaningful activity/field/flag changes and only
when that section's content is ready. It does **not** award credit on navigation,
hydration or a successful content retry. A predicate `() => true` is therefore
not a supported way to make a multi-screen module freely browsable on first load.
Changing that lifecycle is a shared-runtime task. For currently supported simple
ungated content, use a single reference section (see [new modules](adding-modules.md#reference-only-resource)).

## Recipe: reveal a group after another activity

Put `revealId: "example-ready"` on the relevant manifest **group**, then return
that exact key from the lesson's reveal function. For a new module whose question
activity is `sample-choice` and question ID is `sample-question`:

```js
export function sampleReveals(state) {
  return {
    'example-ready': state.activities['sample-choice'].earnedQuestionIds
      .includes('sample-question')
  };
}
```

Import it in the entry module and supply `revealPolicy: sampleReveals` to
`mountLesson`. Do not copy the fixture's debug globals. Ensure defaults define
the array; consider older records when adding state. Avoid a deadlock: never
hide the only activity capable of satisfying the reveal's own prerequisite.
Test initial hidden state, exact prerequisite, reload and keyboard reading order.
Reveals can change as state changes; permanent **section** credit is separate.

## Question and writing control options

Question-sequence profiles are intentionally finite:

| Profile | Existing behavior |
| --- | --- |
| `opening-classification` | One statement; advance after any selection; wrap; current-answer section gate is external |
| `opening-knowledge-check` | All questions; summary/retry; optional closed `summary` labels |
| `middle-scenarios` | Sequential; earned-correct enables Next; wraps |
| `middle-quiz` | Sequential wrap with score and direct question buttons |
| `middle-application` | All questions in separate panels, no common score/retry panel |
| `final-questions` | Sequential, previous/next, no wraparound |

Switching profile changes navigation/presentation, not the lesson's completion
predicate. Do not use Opening's summary wording for an unrelated activity.
Single multiple-choice questions normally use `standard`.

Writing's supported options include model `mode` (`toggle`/`show-only`),
`edit` labels/messages, `actionOrder` (`edit-copy-model`/`model-copy-edit`, requiring
both controls), and `outputReveal: "assembled"` (requires assembly/output).
`binding.assembledFlag`/`modelFlag` connect to normalized flags;
`modelUi` instead connects optional model visibility to UI state. Only one model
owner is allowed. JSON does not grant credit by itself. Check output editable/
readonly requirements for each formatter. Do not regenerate output on input or
render: that would overwrite a student's edits. New builder algorithms require
an explicitly supported formatter/profile with tests, not expressions in JSON.

## Adding or reordering existing lesson structure

**This is a compatibility task, not just array editing.** Existing codecs map
stable IDs to frozen legacy numeric positions. Their maps must not be regenerated
from new manifest order or DOM order. Config, manifest and adapter section lists
must match exactly; currently the legacy adapters enforce the historical lists.

Before changing sections/questions/options/cards/checks/fields:

1. Inventory IDs, saved representations, policies, reveals, requirement text,
   navigation actions, progress summary IDs, DOM/CSS hooks and tests.
2. Decide which IDs retain meaning, which are genuinely new and how old payloads
   retain drafts/credit. Existing codecs cannot automatically persist arbitrary
   new fields/items. Prefer a new module/key for a substantially different lesson.
3. Plan a narrowly scoped, reviewed adapter extension or separate migration task
   if needed. Do not replace any legacy codec with the new-module identity adapter,
   change a legacy key, or reuse an old option's numeric slot for a different answer.
4. For a **new ID-based module**, update config `sectionOrder`, manifest sections,
   adapter `sections`, defaults, policies and all cross-references together.
   Its sole reference stays last. Retain old completion/drafts and unknown data.
5. Test old/partial/completed/non-contiguous records, unknown fields/versions,
   original replay where applicable, every one-missing gate and root/prefix URLs.

Inserting a prose block into an existing section is much simpler and usually
needs no progress changes. Moving a homepage card does not reorder sections.

## Saved-progress compatibility

The current runtime uses one shared store (`assets/js/app/progress-store.js`)
and a statically imported adapter for each module. Existing lessons keep these
exact keys and legacy record shapes:

| Lesson | Key | Owned instructional state within `{"completed":[],"data":{}}` |
| --- | --- | --- |
| Opening | `dsl:opening-stage:v1` | Direct `data` fields |
| Middle | `dsl:middle:v1` | `data.middleState` |
| Final | `dsl:final:v1` | `data.finalState` |

The authoritative fixed mappings are in `lessons/<id>/progress-adapter.js`, with
independent original mapping fixtures in `tests/fixtures/legacy-maps/`. Normalized
state uses `completedSections`, `activities`, `fields`, `flags`, `ui`; the adapters
translate to the existing numeric/indexed formats without deriving mappings from
rendered markup. Preserve numeric zero selections, unknown properties and valid
drafts. Stored completed sections remain authoritative even when detailed history
is absent; never invent past answers or model views from completion alone.

The additive `data.dslUi` extension has `schemaVersion: 1`: `models` records Middle
model visibility, and `selections` records Opening's sequence-checkpoint last
choice. Do not duplicate facts already represented by legacy fields. Unknown
extension versions are opaque: retain them, warn if new UI facts cannot be saved,
and keep the session usable instead of overwriting them.

Only brand-new modules use `createIdProgressAdapter`, a fresh `dsl:<id>:v1` key
and the [ID-record schema](../schemas/id-progress.schema.json). Define defaults
for all bound state as shown in [adding modules](adding-modules.md). A reference
can disable storage entirely. Never substitute this adapter for an existing
lesson's codec merely to simplify a content revision.

Hydration, rendering, navigation and content retries must not save defaults or
fabricate credit. Missing/unavailable/corrupt/unknown-version storage must not
crash the resource or overwrite unsafe bytes. Keep readable drafts/credit where
possible, show a nonblocking warning and allow in-memory work if saving fails.
Never automatically clear or repair student records to resolve a load error.

Progress is local to a browser/device/origin, not an account. There is no sync or
cross-tab merge; concurrent tabs are last-writer-wins. A future format migration
needs an explicit compatibility/backup/unknown-version/rollback design and tests
with old partial/completed/malformed records. The original-engine replay tests
apply to the three existing lessons, not resources that never existed there.

## Shared control or schema extension

For a truly new behavior, first check whether a current profile satisfies it.
If not, scope the smallest supported extension. Keep components root-scoped with
`mount`/`update`/`destroy`, silent hydration, one callback per actual change and
stable feedback/focus nodes. Components never write `localStorage` themselves;
the app is the single writer. Do not add content-selected imports, arbitrary
HTML, inline handlers or a second engine.

A new JSON property/profile/block needs **both** its development schema and
lightweight runtime boundary updated (`schemas/activities.schema.json` or
`lesson.schema.json`, `assets/js/app/lesson-validation.js`; reference has its own
schema and `content-validation.js`). Update renderer/controller, invalid fixtures
and parity tests. The registry accepts only allowlisted types; adding a genuinely
new activity type requires an explicit code extension, not just a JSON `type`.

## Styles and print

- `tokens.css`: shared palette/type/spacing tokens.
- `shared.css`: shell/layout/base/responsive/focus; `components.css`: interactions.
- `opening.css`, `middle.css`, `final.css`: deliberate lesson treatments. Scope
  lesson-only changes; do not import another lesson's theme as a shortcut.
- `before-round.css`: scoped typography and controls for the fourth lesson;
  interactions and reference printing still use the shared components/styles.
- `reference.css`: screen reference layouts; `print.css`: reference-only print;
  `home.css`: homepage. **Print loads last.**

Retain navy/teal/light blue/white, DM Sans/Fraunces and the approved responsive
heading hierarchy. Cards must grow for long text; no clipping at 320px/200% zoom.
Keep focus, correct/incorrect/explored cues, contrast and reduced motion.

Print uses `data-view-role="reference"` and `data-reference-sheet`, not `view-7/8/9`.
Do not reintroduce numeric print selectors or depend on which screen is visible.
Keep truthful loading/error notices and one Print handler. Test browser Print
and Cmd/Ctrl+P from ordinary/reference screens; actual previews remain distinct
from automated PDF tests. Before removing old or mixed selectors, review their
consumers across ordinary, revealed, responsive and print states. A selector
missing from the first screen is not proof that it is unused.
