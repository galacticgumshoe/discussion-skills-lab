# Legacy progress baseline

Refactor documentation lives in `.opencode/docs/`; repository paths below are root-relative.

Pinned engine: `0b5d2297e7cbc19bd59cde750492dd28e3983ca0`.
No storage or production changes are introduced in milestone 1.

| Lesson | Exact key | Counted pages / reference index | Owned data |
| --- | --- | --- | --- |
| Opening | `dsl:opening-stage:v1` | 7 / 7 | Direct `data` fields |
| Middle | `dsl:middle:v1` | 8 / 8 | `data.middleState` |
| Final | `dsl:final:v1` | 9 / 9 | `data.finalState` |

Outer shape is `{"completed":[0,1],"data":{}}`. `completed` is permanent union
credit, not a derived score. First page, reference, any completed page, and a page
whose **immediate predecessor** is completed are accessible. Synthetic `[0,3]`
permits pages 0,1,3,4 and reference, but not 2. Reload starts at page 0. Reference
does not earn credit and hides bottom buttons. Root/prefix/replay mounts share a
test server origin, so tests use isolated contexts and explicit per-lesson seeding;
these mounts are not separate localStorage namespaces.

## Frozen maps / initialized evidence

`tests/fixtures/legacy-maps/` contains authored IDs plus initialized DOM evidence.
IDs are scoped to lesson/activity. Keep section numbers as well as contractual IDs.
Never recalculate the map from future markup, prompt wording or reordered arrays.

- Opening: five current classification strings/null plus seen indexes; timeline
  `stage-1`…`stage-6`; `sequenceCorrect`; analysis category strings; three numeric
  practice selections; three string drafts and self-check; five quiz numeric/null
  answers plus earned indexes. **No flashcards**. Without `quizEarned`, currently
  correct quiz answers supply fallback credit. Checkpoint has no last-selection key.
- Middle: all seven owned properties and all seven set groups are mapped. Global
  card indexes are welcome 0–2, s1 3–4, models 5–6, speaking 7–8. Initialization
  verified fields 0 source, 1 finding, 2 why, 3 assembled, 4–7 research checks,
  8 application draft, 9–13 application checks. Correct question indexes are
  correct-ever; application solved entries are **`a`,`b`**, not integers.
  `positions`/`quizIndex` and per-question selection keys are separate. Preserve
  otherwise unused transient `*-options` keys; do not treat zero as absent.
- Final: all 14 owned properties mapped. Flips and panel exploration are page-local;
  `panelsOpen` indexes are global 0–12. Answers are correct-ever indexes per page;
  selections use `page:index`. Five text fields serialize by ID. Eleven checks
  and three goals have no IDs; checklist credit is `checks[2]`/`checks[7]`, not field
  serialization. Six notes store correct flags; goals store three numeric indexes.

## Exact completion policy

These are baseline rules, not proposed improvements. Each full UI journey checks
the Next gate while at least one prerequisite is absent on **each** counted page.

| Lesson/page | Required before first completion |
| --- | --- |
| Opening 0 | All five seen and **all current** classification answers correct |
| Opening 1 | Six unique timeline stages and sequence checkpoint correct-ever |
| Opening 2 | Five analysis categories and WHAT/HOW option 0 correct (completion is permanent once earned) |
| Opening 3 | Clarification option 1 correct |
| Opening 4 | Editable draft trimmed length **≥35**, self-check checked; model optional |
| Opening 5 | Research option 2 correct |
| Opening 6 | Five answered selections and five correct-ever quiz indexes |
| Middle 0 | Three welcome cards explored |
| Middle 1 | Two s1 cards explored; all five classification questions correct-ever |
| Middle 2 | Four evidence details; two model cards; research correct-ever; assembled; four checks |
| Middle 3 | Four collaboration details; three decisions correct-ever |
| Middle 4 | Three communication details; four questions correct-ever |
| Middle 5 | Four strategies; two speaking cards; three episodes correct-ever |
| Middle 6 | Both applications correct-ever; nonempty trimmed draft; five checks |
| Middle 7 | Five correct-ever quiz questions |
| Final 0 | Three welcome cards |
| Final 1 | Two cards; five correct-ever questions |
| Final 2 | Four panels; question correct-ever; three nonempty trimmed builder fields; assembled; model viewed; five checks |
| Final 3 | Two panels; six correctly categorized notes; question correct-ever |
| Final 4 | Three cards; three correct-ever questions |
| Final 5 | Three panels; three correct-ever questions |
| Final 6 | Four panels; three correct-ever questions |
| Final 7 | Four correct-ever questions; nonempty trimmed closing; model viewed; six checks |
| Final 8 | Five correct-ever questions |

Opening classification uses a separate explicit Next/review button (selection
itself does not increment its cursor). Middle sequence/quiz Next wraps; Final
question navigation does not. Opening shows all quiz questions together.

Opening builder trims `[.?!]+` at the ends; Middle trims trailing periods/spaces
from finding/connection, not source; Final strips terminal `. ! ?` from first two
fields and lowercases initial characters of relationship/recommendation. Exact
assembly assertions are in `tests/helpers/legacy-journeys.mjs`. Writing is ungraded;
Middle output is readonly, Opening/Final output editable. Models are optional in
Opening/Middle and required where explicitly listed in Final.

## Fixture provenance

Each `tests/fixtures/progress/<lesson>/*.json` is an envelope whose `raw` is the
**exact localStorage string**, or null for missing. Do not seed the envelope itself.

- `UI-observed`: actual control interactions in an isolated Chromium context.
  Records include full revision, origin/random port, `/` mount, browser version,
  ordered actions and observed question feedback. `fresh`, `partial-first`,
  `mid-lesson`, `completed`, `correct-ever-then-incorrect` exist for all lessons.
  Opening additionally captures 34/35-character boundaries. Completed records
  were **not** manufactured from completion arrays.
- `synthetic`, safe: missing key, empty/unanswered/zero, Unicode/multiline drafts,
  non-contiguous completion, future unknown properties and length boundaries.
  Opening also has absent-`quizEarned` fallback. Safe means legacy-loadable, **not**
  that the old writer preserves all unknown properties.
- `synthetic`, unsafe: malformed JSON, invalid envelope, malformed nested values,
  invalid activity indexes. Baseline crashes are explicitly characterized under
  KI-07. These are future adapter boundary tests, not valid legacy restoration
  expectations. Do not infer new credit from malformed values or rewrite them.

Action logs use the semantic protocol in `tests/helpers/legacy-journeys.mjs`:
`activate <card selector> index 0` means focus → Enter → Space (flip back) → click;
other card indexes mean click. `open <details selector> index 0` means open → close
→ open; other detail indexes mean open once. `answer <identity> option N` is a real
option click (all incorrect alternatives, then correct). `fill`, `check`,
`categorize` and explicit `click` entries name their actual controls/values.
Readiness/expectation waits do not change application state. Each fixture's own
origin/browser/action metadata is authoritative; a resumed capture can have a
different random port from an earlier retained checkpoint on the same pinned source.

Original code catches parse failures, silently overwrites some unsafe records,
drops outer unknown properties on save, and replaces owned nested state objects.
This is **not** permission for future adapters to do so. Future adapters must retain
unknown outer/data/nested properties, drafts and authoritative completion, and
must fail safely on invalid storage. See KI-07/KI-08.

## Original-engine replay

`tests/helpers/static-server.mjs` reads the fixed production allowlist from the
full Git revision at startup, via argument-safe `execFileSync('git', ['show',
'<fixed revision>:<allowlisted path>'])`. `/__original/` and
`/__original/discussion-skills-lab/` serve those bytes, including original relative
assets. No branch lookup, history fetch, live site, checkout/reset or user-supplied
Git argument is used. Missing objects fail server startup; do not fall back to
the current engine. Keep the Git objects or obtain an explicitly versioned,
provenance-checked archive decision if history is unavailable.

Unit tests compare every replay response with pinned bytes. Browser persistence
tests load observed fixtures and synthetic non-contiguous state on current and
original mounts. Keep replay tests after later engines replace production scripts;
do not rewrite original-defect assertions to describe new-engine behavior.

## Milestone 4 checkpoint 4.1 APIs and ownership

The new codecs/store run **only in isolated fixture harnesses**. No production entry
imports them, and the classic `assets/js/lesson-core.js` is unchanged. Never mount
this store on a page running the same lesson's legacy writer. Storage remains
origin-scoped, with the exact three keys and outer shapes listed above. The store
reads once; independent tabs use last-writer-wins snapshots, not synchronization
or a cross-tab merge system.

### Normalized state

`{completedSections, activities, fields, flags, ui}` is JSON-serializable. Stable
IDs come from the frozen maps; section indexes exist only in codecs. Fields are
strings with no trimming/normalization, including empty/Unicode/multiline drafts.
Question activities have `selections` (question ID → option ID),
`earnedQuestionIds`, and `currentQuestionId`. Opening classification additionally
has persisted `attemptedQuestionIds`; absent history is never fabricated from
section credit. Card/panel activities have monotonic `exploredIds` and separate
`backIds`/`openIds`. Checklist activities have reversible `checkedIds`. Final's
future specialized note renderer has codec-only `earnedNoteIds` support.

Activity names used by the codec (instructional labels remain separate):

- Opening: frozen activity IDs `classification`, `timeline`, `task-analysis`,
  `sequence-checkpoint`, `what-how`, `clarification`, `research`, `knowledge-check`;
  `question-selfcheck`. Checkpoint question ID is `next-step`.
- Middle: `welcome-cards`, `structure-cards`, `research-model-cards`,
  `speaking-cards`; `evidence-panels`, `communication-panels`, `strategy-panels`,
  `collaboration-panels`; `classification`, `group-decisions`,
  `communication-diagnosis`, `speaking-simulator`, `application`, `research`,
  `knowledge-check`; `research-checklist`, `application-checklist`.
- Final: `<section-id>-cards` / `<section-id>-panels` for the frozen card/panel
  groups; `<section-id>-questions` for pages 1–7, `knowledge-check` for page 8;
  `synthesis-checklist`, `closing-checklist`, `practice-goals`, `note-classification`.

Middle/Opening card/panel presentation and unrepresented cursors are session-only,
not a new persistent format. Final current panel openness uses the separate global
`panelsOpen` table, without inferring ever-explored credit. No current lesson
section, routing, collapse state, answers, or arbitrary UI payload is added to storage.

### Codec API

Static imports export `openingAdapter`, `middleAdapter`, `finalAdapter` from
`lessons/<lesson>/progress-adapter.js`. Each exposes immutable `id`, `key`,
`sections`, and these pure functions:

- `decode(rawRecord)` → a new normalized state. Missing optional data gets safe
  defaults. Malformed known values cannot grant credit; independent valid state
  is salvaged. Opening's absent/non-array `quizEarned` fallback matches the original
  engine and only supports currently correct selections in a five-answer array.
- `encode(state, originalRawRecord)` → a copied, merged v1 record. Untouched
  unknown properties/arrays/order/transient keys survive. No DOM/content lookup.
  Changing an Opening fallback answer explicitly materializes its supported
  `quizEarned` history so that an incorrect latest choice cannot erase credit.
- `diagnose(rawRecord)` → `{code,path,message,blocking}[]`; known malformed values
  are reported individually, without echoing drafts. Unknown properties are not
  errors. Known malformed records are conservatively write-blocked by the store,
  rather than silently repaired. Codecs themselves do not perform storage writes.
- `retainCredit(next, previous)` → copied state with permanent completed sections,
  exploration, correct-ever sets/flags, and show-only viewed-model flags unioned.
  Checklists/goals/current answers/open panels remain reversible.
- `diagnoseChanges(state, originalRawRecord)` → nonblocking diagnostics for new UI
  facts that cannot be serialized into an opaque extension. Supported legacy
  changes can still save; the opaque extension is not replaced.

`assets/js/app/legacy-progress.js` is the shared static-table codec implementation,
not a renderer, executable content format or dynamically extensible registry.

### Store API and failure behavior

`openProgress({storage, key, adapter})` in `assets/js/app/progress-store.js` returns
`{state, diagnostics, canPersist, originalRaw, save(next)}`. Omit `storage` to use the
guarded browser `localStorage` getter, or inject `getItem`/`setItem` for tests. Key
and statically imported adapter must agree. State/diagnostic getters return copies;
callers cannot mutate store state by retaining a snapshot.

- Opening/hydration performs **no save**, no synthetic clicks, and no repair write.
  `originalRaw` retains the last known stored bytes (initial bytes until a
  successful save); a semantic no-op does not reformat the raw record.
- `save(next)` retains state in memory before attempting persistence, unions
  earned credit, and returns `{state, diagnostics, canPersist, persisted, changed,
  written}`. `changed` concerns normalized state; `written` concerns actual storage.
  Identical encoded records skip `setItem`. A session-only presentation change is
  not a new persistence fact.
- `canPersist=false` means corrupt JSON, invalid outer/known nested state, or
  unavailable reads blocked this session's writer. Valid independent drafts and
  completion are still restored; future edits remain in memory. There is no
  destructive fallback, reset, backup key, migration or export UI.
- A quota/permission **save** failure keeps `canPersist=true` so a subsequent save
  can retry. In-memory credit/drafts survive; `persisted=false`, `written=false`,
  and a nonblocking diagnostic is returned. A later successful retry clears that
  save-failure warning. Harness status renders messages through `textContent` in
  an accessible live region; a future app must keep this separate from load errors.
- With an unknown UI version, `persisted=false` also reports unsaved new UI facts.
  A supported legacy change may still have `written=true`; the original opaque
  extension remains exact. No storage-event listener or automatic cross-tab merge.

`schemas/progress.schema.json` validates the deliberately open outer envelope;
`#/$defs/normalized` is the explicit normalized-state definition. Additional
properties and unknown extension versions are allowed, not erased. Runtime
`progressRecordErrors` agrees with that outer schema. Lesson-specific owned-field
checks are in each adapter's fixed-table diagnostics, separately from that schema.

### Only permitted UI extension

`data.dslUi.schemaVersion=1` merges only the contracts' additive facts:

- `models["research-model"]` / `models["application-model"]` → Middle boolean
  `flags["research-model-visible"]` / `flags["application-model-visible"]`.
- `selections["sequence-checkpoint"]["next-step"]` → Opening's latest stable option
  ID; `sequenceCorrect` remains the independent authoritative correct-ever credit.

Legacy-represented facts are not duplicated here. Existing v1 extension unknown
properties survive. A non-v1 (or malformed/unversioned) namespace is opaque:
decode does not interpret its familiar-looking fields; encode leaves it untouched.
New supported UI facts stay in memory with warnings while other legacy facts save.
No Final-specific UI extension is introduced. Original-engine replay tests read
adapter-written records on both pinned replay mounts without a second writer.

## Milestone 4 checkpoint 4.2 APIs and ownership

These APIs are exercised only by `tests/fixtures/harness/navigation.{html,mjs}`.
The new native module `assets/js/app/lesson-core.js` is **not** the unchanged
classic `assets/js/lesson-core.js`. No live lesson shell/entry/policy is replaced.

### Pure completion helpers

`assets/js/app/completion.js` exports:

- `canVisitSection(sections, completedSections, sectionId)` → boolean. `sections`
  is the explicit ordered stable-ID list with a boolean `reference` role. Unknown
  IDs/numeric indexes are denied; first, reference, completed, or the immediate
  successor of a completed section are allowed. Earlier gaps do not invalidate
  later stored credit. The unit suite compares every completion subset for all
  three lessons against the actual pinned original core (896 subsets total).
- `unionCompletedSections(previous, earned)` → a new deduplicated array, retaining
  existing order/credit and appending newly earned IDs. Inputs are validated stable
  IDs; legacy index translation remains exclusively in the adapter.
- `hasAllIds(requiredIds, actualIds=[])` → boolean over identities, not counts.
  Duplicate/unrelated entries cannot substitute for missing requirements.
- `hasCurrentCorrectAnswers(questions, selections={})` → boolean; questions supply
  `id`/`correctOptionId`. This intentionally ignores earned history. Correct-ever
  gates instead use `hasAllIds(requiredQuestionIds, activity.earnedQuestionIds)`.
  These are primitives, **not** the production Opening/Middle/Final policies.
- `applyCompletion(previousState, nextState, {sections, completionPolicy})` → a
  copied normalized state with permanent section union. `completionPolicy` is a
  trusted statically supplied record of section ID → pure `(state) => boolean`.
  Only an actual `activities`/`fields`/`flags` change evaluates gates, and only
  literal `true` earns credit. Missing gates, reference gates, UI-only changes,
  and unchanged updates cannot grant credit. Already-completed gates need not be
  ready or even retain detailed history; they are not reevaluated or revoked.

The caller must provide validated normalized states and pure gate functions. New
component state is merged into the caller's state, not treated as a whole-store
replacement. Correct-ever/exploration facts must retain their independent history;
the verified adapter/store remains the final activity-credit retention boundary.
The harness takes snapshots from that store, applies a small test-only mutation,
calls `applyCompletion(previous,next,options)`, then `store.save(result)` and
`navigation.update(store.state)`. It does **not** evaluate policies during initial
decode/hydration, refresh, render, rail/select/Next navigation, or reference access.
There is no public navigation `complete()` operation or synthetic click hydration.
Production lesson policies and component APIs remain for their scoped checkpoints.

### Explicit-element navigation

`mountNavigation(root, {sections, state})` from the new module returns
`{go(sectionId), canVisit(sectionId), update(nextState), currentSectionId, destroy()}`.

- Each ordered section supplies `{id, view, label, requirement, reference}`;
  `view` is an existing element inside `root`. An optional explicit `heading`
  selects the intended h1/h2/h3 inside that view; otherwise the first h1/h2/h3 is
  used. IDs and views must be unique; exactly one final section is the reference.
  No `.lesson-view` enumeration, `view-N` parsing, DOM-position lookup, adapter
  index, dynamic content module, or full renderer is involved.
- Root-scoped existing shell hooks: `#layout`, `#rail-links`, `#rail-toggle`,
  `#section-select`, `#previous-section`, `#next-section`, `#nav-status`,
  `#progress-text`, `#progress-track`, `#progress-fill`; optional
  `#quick-reference-link`. Rail/select containers are dedicated navigation hosts.
  Generated buttons/options carry stable IDs, including string `data-go` values.
- Mounting starts at the first section with an expanded rail. Successful `go`
  returns true, marks only that view active, sets `aria-current="step"` and mobile
  selection, focuses the intended heading with `preventScroll`, then resets window
  scroll to zero. Denied `go` returns false and restores selection without moving
  focus/scroll. `update` only unions credit and renders controls/counts: it never
  focuses, scrolls, emits callbacks, evaluates gates or saves.
- Progress counts the explicit non-reference IDs, ignoring duplicates, unknown
  IDs and the reference. Progressbar maximum is that counted total. Reference
  hides bottom controls. Last-page bottom Next requires that page's completion
  even though reference shortcuts are always available. As in the original core,
  Previous on a non-first non-reference page is enabled, but navigation to a
  locked predecessor is rejected rather than jumping across a gap.
- Current section/collapse are session-only, outside normalized/persisted state.
  `destroy()` is idempotent, removes listeners and generated rail/select nodes,
  restores heading tabindex attributes, and makes old `go`/`update` handles inert.
  Duplicate mounts on the same root throw; destroy/remount starts at first without
  duplicate handlers. Existing view elements and shell hooks remain caller-owned.

Navigation never reads/writes storage and cannot award credit. Persistence warnings
are rendered separately by the harness through the verified store diagnostics.
Corrupt/quota-limited storage still allows in-memory gates/unlocking. No new keys,
extension properties, routes, collapse persistence, automatic startup saves,
cross-tab synchronization, production shell changes or dual writers are added.

## Milestone 4 checkpoint 4.3 APIs and ownership

Native modules under `assets/js/components/` export:

```text
mountFlashcards(root, {data, state, onChange})
mountExpandables(root, {data, state, onChange, profile = 'standard'})
mountMultipleChoice(root, {data, state, onChange, profile = 'standard'})
mountQuestionSequence(root, {data, state, onChange, profile})
  → {update(nextActivityState), destroy()}
```

`mountMultipleChoice` additionally exposes `focus()` (first option, no scroll),
used for intentional question navigation/retry. Roots are dedicated component
hosts. Components append/remove only their owned nodes and root classes; duplicate
mounts throw, `destroy()` is idempotent, old handles become inert, and remounting
attaches one set of handlers. `component-dom.js` is a small shared DOM/lifecycle
helper, not a renderer, registry, event bus or content loader.

### Callback and hydration convention

**Every `onChange(nextActivityState)` receives a defensive copy of the component's
whole activity state**, not a whole lesson state, DOM event, legacy index or credit
command. The caller associates the callback with a statically known activity ID,
merges it into `next.activities[id]`, calls `applyCompletion(previous,next,...)`,
saves through the existing store/adapter, then calls component/navigation `update`.
The isolated harness demonstrates exactly this flow. No component fetches content,
reads storage, queries the document, evaluates a gate, or completes a section.

Mount/`update` copy supplied validated state and render without callbacks, synthetic
clicks, earned-history reconstruction, completion evaluation, or saves. Native
details' queued hydration `toggle` events are ignored when their open value matches
the supplied state. Updates for the same question reuse option/live-region nodes,
do not replace unchanged feedback text, and do not focus or scroll. Selection
events preserve keyboard focus. Intentional question navigation focuses its first
option; all-at-once retry scrolls to/focuses the first unearned question (smooth
motion only when reduced motion is not requested).

The future loader/renderer must validate instructional data before calling these
mounts. Checkpoint 4.3 supplies audited sealed data directly; full instructional
schemas/runtime validation and bootstrap remain checkpoint 4.5, not an alternative
pipeline introduced here. Student text/labels are inserted as text, never HTML.

### Data and state inputs

- Flashcard `data.items`: ordered `{id, front, back, frontTitle?, backTitle?}` with
  plain-text bodies/optional source titles. Titles use semantic `strong`; button
  descendants are phrasing elements, not invalid nested block/interactive markup.
  State `{exploredIds, backIds}`: user flips union exploration independently from
  reversible current face; both faces contribute to intrinsic grid height. Current
  face ARIA/description and the outside-the-flip `✓ Explored` cue are independent.
- Expandable `data.items`: ordered `{id,title,body}` plain text. State
  `{exploredIds,openIds}`. `standard` uses native details/summary; `timeline` uses
  native buttons with unique `aria-controls`/`aria-expanded` and controlled bodies.
  Only user opening adds exploration; closing never does. Restored open state
  alone is not evidence of exploration. Explored marks remain visible in the
  closed row's control.
- Multiple-choice `data`: `{id,prompt,context?,correctOptionId,options,explanation?}`;
  options are ordered `{id,text,feedback?}`. `feedback` is a complete content-supplied
  message; otherwise the profile combines the shared explanation with the original
  `Correct.`/`Good choice.`/`Not quite.` prefix. State contains `selections`,
  `earnedQuestionIds`, optional `attemptedQuestionIds`, and a sequence's
  `currentQuestionId`. Correct selection unions credit; later wrong selection only
  changes current feedback/highlight. Alternatives stay enabled. Exactly the latest
  selection has green/red styling and `aria-pressed=true`; feedback has one stable
  atomic polite status region per mounted question. Final's option explanations,
  retry suffix and separate retained-credit note, and Middle quiz's distinct
  retained-credit feedback wording remain distinct.
- Sequence `data`: `{questions,retryLabel?}`, with the above question objects.
  Navigation emits the same full activity state immediately, so the existing
  represented Middle/Final cursor fields save without waiting for another answer.

Profiles are statically allowlisted strings, not executable content:

| Profile | Presentation and navigation | Initial section gate owner |
| --- | --- | --- |
| `opening-classification` | Explicit Next after **any** selection; wraparound, no automatic advancement | External policy checks all current answers and attempted IDs, **not** earned history |
| `opening-knowledge-check` | Numbered all-at-once; score after all answered; retry clears only first unearned current selection and focuses its first option | External policy; correct-ever credit remains independent |
| `middle-scenarios` | Correct-ever Next, wraparound; shared or option-specific feedback | External policy |
| `middle-quiz` | Correct-ever Next/wrap, direct jumps with current/status marks, earned score/percentage | External policy |
| `final-questions` | Previous/earned-next, no wrap, optional context, lettered options and option-specific explanations | External policy |

The single-question controller also accepts `standard` for Opening's standalone
checkpoint. The harness mounts this directly as well as composing the controller
inside all five sequence profiles. These are **not** production lesson cutovers.

### Persistence facts and limits

There are **no codec/store/key/format changes in 4.3**. Components exercise the
existing `dsl:opening-stage:v1`, `dsl:middle:v1`, `dsl:final:v1` adapters. Final open
panels retain the separate global `panelsOpen` mapping; explored panels retain
page-local mappings. Middle research-card exploration writes global indexes 5/6,
not new DOM positions. Opening checkpoint latest choice uses only the already
verified `dslUi` v1 selection namespace; `sequenceCorrect` stays permanent.

Card faces, Opening/Middle open panels and unrepresented cursors remain session-only:
refresh starts their presentation at the codec defaults, without revoking credit.
No new arbitrary presentation extension is added. Extra attempted/correct-ever
facts not represented by an activity's legacy format remain in memory; no answer
is invented on reload to reconstruct them. Opening classification still gates on
current selections and its represented attempted IDs. Section completion remains
permanent even after a later wrong choice/flip-back/close. Unknown progress and
opaque extension handling remain as verified in 4.1. One writer per isolated page;
no legacy engine runs in these harnesses and no synchronization promise is added.

## Milestone 4 checkpoint 4.4 APIs and ownership

Direct test mounts only; production engines, codecs, keys and the Final pilot are
unchanged. No `lesson-app`/general renderer or new content schema is introduced.

```text
mountWritingActivity(root, {data, state, onChange, profile = 'draft'})
mountChecklist(root, {data, state, onChange})
  → {update(nextOwnState), destroy()}
```

Both follow 4.3's copied **whole own-state snapshot** callback convention, silent
hydration/updates, root-owned nodes, duplicate-mount rejection and idempotent
cleanup. Neither fetches, discovers progress fields, reads storage, grades writing
or grants section credit. The caller maps writing state to the normalized record;
it does not replace the whole lesson with a writing snapshot.

- Writing own state: `{fields: record<stableFieldId,string>, assembled: boolean,
  modelVisible: boolean}`. The parent maps `fields` to normalized `fields` and the
  represented assembly/model booleans to the existing normalized flags below.
- `data.fields` are ordered `{id,label,multiline,formatKey?,rows?,maxLength?,
  placeholder?,readonly?}` descriptors. `data.output` is a separate descriptor;
  draft-only tools instead supply `copyFieldId` naming one input. Missing legacy
  maximum lengths remain unlimited; no new draft length cap. Labels and values
  are text/`.value`, never HTML/Markdown.
- Optional `data.assembly` supplies `{label,template,missingMessage,successMessage,
  focusOutput?}`. Only explicit submit assembles. Every editable input/output event
  publishes immediately; typing inputs never reassembles or replaces edited output.
  Unchanged updates preserve the caret/selection. Output `readonly` is independent
  from persisted draft text/assembly history.
- Optional `data.model` supplies `{mode:'show-only'|'toggle',showLabel,hideLabel?,
  blocks:[{kind:'title'|'paragraph',text}]}`. Semantic titles/paragraphs preserve
  the original plain-text models. Visibility emits an own-state change; **required
  versus optional model policy is entirely external**. A repeat show-only click
  is a no-op. Checklist state is the existing reversible `{checkedIds}` with
  `data.items:[{id,text}]`; each native checkbox has a label.
- `data.copyLabel`/optional `copyMessages` supply copy control/status wording.
  These are not student fields or completion requirements.

`formatWriting(profile, fields, template)` in `utilities/writing-formatters.js`
returns plain text or `null` for missing required input. Statically allowlisted
profiles/names: `opening-consensus` (`problem`, `accomplishment`), `middle-evidence`
(`source`, `finding`, `why`), `final-synthesis` (`contributors`, `relationship`,
`recommendation`). `draft` never invokes a formatter. Templates use only `{name}`;
unknown names/expressions/braces fail, inserted student values are not recursively
interpolated. Exact legacy trim, punctuation and first-character lowercasing rules
remain deliberately different. No grammar improvement, evaluation or grading.
Unit oracles execute the actual pinned legacy handler snippets with synthetic
fields, independently of the new algorithms and fixture templates.

### Represented writing/model/checklist facts

| Lesson | Normalized mapping | Model policy/persistence |
| --- | --- | --- |
| Opening | `consensus-problem`, `consensus-accomplishment`, `consensus-draft`; `question-selfcheck.checkedIds` | Optional toggle; visibility session-only in caller `ui`, never a new extension. Gate retains trimmed 35-character/self-check boundary. No assembly flag needed. |
| Middle research | `evidence-source/finding/connection/output`, `evidence-assembled`; `research-checklist` | Optional show-only; `research-model-visible` uses existing `dslUi.models['research-model']` v1 binding. Output readonly. |
| Middle integrated | `integrated-draft`; `application-checklist` | Optional show-only; existing `application-model-visible`/`dslUi.models['application-model']` binding. |
| Final synthesis | `synthesis-contributors/relationship/recommendation/output`, `synthesis-assembled`; `synthesis-checklist` | Required show-only `synthesis-model-viewed` remains legacy `builderModel`. Output editable. |
| Final closing | `closing-draft`; `closing-checklist` | Required show-only `closing-model-viewed` remains legacy `closingModel`. |

Immediate draft/output/model saves exercise the scoped Middle/Final save repairs
only in the harness. Completion stays the verified monotonic union after clearing
drafts/unchecking. Small writing-only fixture gates omit earlier quiz/exploration
requirements and are **not complete production policies**. Final show-only flags
retain the codec's existing monotonic behavior. Opaque extension versions and
storage failures retain 4.1's warning/in-memory semantics; no codec changes.

### Clipboard and independent reference orchestration

`createClipboard(root,{getText,field?,status,messages?})` in `utilities/clipboard.js`
returns `{copy():Promise<void>,destroy()}`. It uses secure Clipboard API when
available. Failure selects/focuses the supplied existing field; absent a field it
creates one root-scoped readonly textarea without `id`, `name` or `data-field-id`.
Escape/return button dismisses that fallback and restores the initiating control's
focus when still connected. Repeated attempts reuse one fallback; destroy removes
nodes/listeners, and a late clipboard response cannot mutate an unmounted UI.
No `execCommand`, synthetic input, field scan or progress callback is used.

`mountReference(root,{source,declaringUrl,allowedRootUrl})` in
`app/reference-loader.js` returns `{ready:Promise<void>,reload(),destroy()}`.
Dedicated root-scoped hooks: `[data-reference-content]`, `[data-reference-status]`,
`[data-reference-retry]`, `[data-reference-print]`. It prepares immediately, using
the existing checked content loader, reference schema/runtime validator, Markdown
pipeline and **same `renderReferenceItems` implementation** from milestone 3.
One guarded Print listener; loading/failure has printable status and disabled
Print, retry is independent of activities/gates/storage, teardown aborts loading
and removes listeners. The caller supplies semantic reference-only print CSS;
4.4 supplies fixture-only rules, not global production print cleanup. The live
Final pilot retains its original entry and sole legacy Print handler unchanged.

## Milestone 4 checkpoint 4.5 composition and validation APIs

Native ES module `assets/js/app/lesson-app.js` exposes:

```text
mountLesson(root, {configUrl, adapter, completionPolicy,
                   registry = standardActivityRegistry})
  → {ready: Promise<void>, state, diagnostics, navigation, destroy()}
```

`state`/`diagnostics` are defensive store snapshots, available after activity
preparation; `navigation` is the existing 4.2 navigation handle. `ready`
settles after the initial loading attempt, including handled failures; it is not
a success boolean. Inspect the accessible lesson/block/reference status and retry
controls for failures. Retries do not replay events or save defaults. `destroy`
aborts pending loads, removes owned views/listeners, and releases the root/writer
reservation; repeated destruction is harmless. Duplicate roots and a second new
app writer for the same lesson key are rejected. Do not run a legacy engine in
the same page as this app: that engine cannot participate in the new reservation.

The caller supplies the existing shell, not a new shell factory: `#views`,
`#lesson-status`, `#lesson-retry`, `#storage-warning`, and the 4.2 navigation hooks.
Loading errors and persistence warnings have separate status regions. Metadata
failures fail closed before storage access and offer a whole-lesson retry. Once
metadata is trusted, independent activity/Markdown failures offer scoped retries;
reference loading/printing remains independent. Initial decoding/hydration never
evaluates gates or calls `save`. Activity preparation/validation settles before
the store reads/decodes; failures stay scoped to their blocks. Components then
hydrate from that decoded state. Reference loads and zero-credit reference
navigation start immediately while activities prepare; navigation receives the
stored completion union once progress has been decoded.

`configUrl` is a safe relative include resolved from `document.baseURI`. Configs
occupy `lessons/<id>/config.json` relative to that page's site directory; their
manifest source resolves from the config URL, within that site's `content/`
subtree. Every subsequent include resolves from its declaring JSON URL in the
same subtree. Existing URL restrictions (same-origin, no absolute/encoded/unsafe
paths, query, fragment or content-root escapes) remain unchanged. This works with
ordinary static hosting at both root and repository prefixes, without `<base>`.

`renderSections(root,{manifest,manifestUrl,allowedRootUrl,registry,getState,onChange})`
in `section-renderer.js` composes validated manifests into explicit ordered section
objects and returns `{sections,prepared,hydrate(),ready,isSectionReady(id),
update(state),destroy()}`. `prepared` settles validated activity data/failures
without behavior; the app opens/decodes progress, then calls silent `hydrate()`
to permit component mounting. Retries refetch/revalidate the affected source.
It retains `view-N` IDs, stable `data-section-id`, intended h1/h2/h3 and section
heading associations. Block types are Markdown (existing sanitized pipeline),
activity, group (maximum three nested groups), and the existing reference loader.
Only `stack`/`two-column` and `plain`/`callout` group values exist. A reference is
the sole block of the final, ungated reference section; no arbitrary HTML/CSS,
remote includes, expressions or generic page builder is accepted.

The frozen `standardActivityRegistry` has exactly six introduced types:
`flashcards`, `expandables`, `multiple-choice`, `question-sequence`, `writing`,
`checklist`. Each statically imported entry supplies `{mount,read,write}`;
`validateRegistry` rejects other type names/nonfunction entries. Components retain
their verified copied **whole own-state** callbacks and silent update/destroy
APIs. The renderer's callback is `onChange(activity,entry,nextOwnState)` to its
own app caller; no new component event convention was introduced. Nonwriting
entries read/write only `activities[activity.id]`. Writing uses known field IDs
plus optional closed `binding:{assembledFlag?,modelFlag?,modelUi?}`; the two model
owners are mutually exclusive. Bindings cannot select code, create a new key or
expand the adapters' persistence capabilities. Opening session-only model UI can
remain in memory; Middle and Final use the existing documented owners.

Only the app merges a callback into a copied normalized state, applies trusted
static completion functions, saves via `openProgress`/the adapter, and updates
components/navigation/warnings. A section with failed/unloaded blocks cannot
newly earn credit. Stored completed credit remains authoritative. Manifest
`gateActivityIds` must refer to declared activities mounted in that section;
this is cross-file identity metadata, **not** an executable/rules-language policy.
No current-section/collapse persistence or new completion-policy implementation
for a production lesson is supplied here.

### Schema selection and cross-file checks

- `schemas/lesson.schema.json` deliberately has two explicit definitions:
  development validation selects `#/$defs/config` or `#/$defs/manifest`; it never
  treats the schema file's empty root as a validator.
- `schemas/activities.schema.json` selects one of six closed type-specific data
  shapes/profiles. Question IDs/options, labels, feedback and model/template data
  remain plain text; rich prose uses Markdown blocks, never HTML-valued JSON.
- `validateLessonConfig`, `validateLessonManifest`, `validateActivity` and
  `validateLessonLinks` are lightweight runtime boundaries. Development
  `validateConfig`, `validateManifest`, `validateActivityDocument` add full Ajv
  draft-07 validation and share the semantic checks. Unique/mounted identities,
  group depth, correct-option membership/feedback, exact formatter fields/output
  modes, config/manifest/adapter order and gate references are checked explicitly.
- `validateLessonTree(directory)` checks the entire static site's configured
  graph, including declared/file activity-ID equality, regular files, realpath
  containment and Markdown/reference bodies. Adapter-only lesson directories are
  intentionally unconfigured until their later whole-lesson cutover.
- `npm run validate:content` validates existing production references and any
  configured lessons, plus the isolated fixture graph. Fixtures are attributed,
  read-only canonical excerpts, not a second editable content source.
- The progress schema/known-field diagnostics remain deliberately open and
  unchanged: unknown progress/opaque UI versions are **not** subjected to the
  closed instructional-content schemas.

No live entry adopts the app/renderer, no classic core is replaced, and the Final
reference pilot continues to use its existing implementation. Last-writer/no-sync,
save-failure memory retention and all three v1 codec boundaries remain unchanged.

## Milestone 5 — first extraction review unit

**No live writer, adapter, key or storage format changes.** Public Middle still
uses its original engine. The new direct question/checklist harness imports the
existing `standardActivityRegistry` entries, `openProgress`, `middleAdapter` and
`applyCompletion`. It never includes the classic engine; production data validates
before opening its one isolated writer. Only synthetic test contexts are used.

`lessons/middle/completion.js` exports:

```text
middleCompletionPolicy: frozen section-ID → pure boolean gate map (all eight)
middleReveals(normalizedState): record<stableRevealId,boolean> (seven reveals)
```

Policies require the actual frozen IDs, not counts/DOM positions/rendered text.
Questions are correct-ever. Research completion requires the historical
`research-correct-ever`/`evidence-assembled` flags and checklist, **not** currently
nonempty source/finding/why/output. Application requires a trimmed nonempty draft
and all five checks. Neither optional model is a gate input. Completion retention
still belongs to shared `applyCompletion` and the existing adapter/store, not a
second lesson-specific union. Reveals use independent original prerequisite sets;
sparse old records are not forced through synthetic clicks or a new prerequisite.

The production-data harness exercises immediate represented sequence/quiz cursor
saves and the old `positions`/`quizIndex` fields, numeric option zero, latest wrong
highlight/feedback independent of credit, fixed check indexes despite reordered
hosts/items, silent old-fixture hydration and original-engine replay. These are
**harness-only** standards-repair evidence, not claims the live Middle save gaps
are fixed. No new `dslUi` facts or opaque-version behavior are introduced.

Remaining integration traps before cutover:

- Keep card indexes global 0–8 and writing/check field positions fixed.
- Existing normalized research correct-ever is a separate flag from question
  own-state. The standard registry currently writes only own-state for questions;
  research selection needs an explicit tested bridge to that existing flag.
- Application A/B share the existing `application` own-state and legacy `a`/`b`
  suffixes. Present both simultaneously without splitting or overwriting that
  persisted state, and without adding a parallel question controller.
- Wire trusted pure reveals into bounded renderer groups; the existing renderer
  does not yet apply Middle-specific reveal policies.
- Writing/model visibility must use the already-verified fixed field/flag/model
  bindings; readonly research output, optional models, opaque UI versions and
  clipboard fallback isolation remain contractual.

`validateLegacyVariants` is development-only archival validation. Neither the
runtime activity schema nor the reference renderer accepts an archive as content.
No archive source identity is interpreted as an executable path/include.

The subsequent displayed-reference review harness uses `mountReference` directly
with the `middle-reference` presentation profile. It has **no progress store or
activity engine at all**. Reference preload/failure/retry/print therefore cannot
create a writer, require progress or clear a lesson. The production public page
still uses the original engine until the whole-lesson cutover. No codec/key/model
namespace change is part of this reference extraction.
# Milestone 5 whole-Middle runtime adoption

Middle now imports `mountLesson` once; its classic `DSL.createLesson` script
inclusion and engine initialization are removed atomically. Opening and Final
retain their original writers, and Final's reference pilot is unchanged.

`lessons/middle/runtime.js` exports `middleRegistry`, delegating all interaction to
the standard registry. Its only special binding derives research earned state from
`research-correct-ever` and sets that monotonic flag on a correct research choice.
Application A/B share the existing `application` activity state and serialize the
original `a`,`b` suffixes, while remaining separately visible shared questions.

`mountLesson`/`renderSections` accept optional statically imported `revealPolicy`;
Middle supplies `middleReveals`. Reveal groups use explicit stable `revealId`s;
hydration/update never clicks controls, saves or invents credit. Markdown-backed
card/panel/model bodies are prepared through the existing safe loader before
hydration; failure disables only affected activity and keeps reference independent.

All existing fixed global card indexes 0–8 and field indexes 0–13 remain unchanged.
The Middle adapter/store were not modified. Partially typed research/application
fields and represented question/quiz cursors save immediately; optional model flags
use only existing `data.dslUi.models` v1 bindings. Unknown transient selections,
future data and opaque UI versions retain their existing preservation rules.
Copy/print/navigation/comparison never write; no hydration/no-op writer is added.

Card exploration survives refresh independently of current face. Since legacy v1
has no current-face field, migrated cards initially show fronts with explored cues;
this is intentional separation, not discarded credit. Current panel openness is
similarly session-only where the frozen format represents exploration only.

`middle-application` is a shared all-at-once sequence profile without quiz scoring
or retry UI. Speaking's content-supplied comparison affordance retains latest
choice/highlight, original feedback and earned credit, adds the original comparison
instruction, and makes no persistence callback. No competing lesson-specific
question, card, writing, clipboard, checklist, store or navigation engine exists.
