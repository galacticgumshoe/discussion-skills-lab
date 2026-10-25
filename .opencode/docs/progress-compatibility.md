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
