# Remaining milestone-8 dispositions — proposal v3

2026-10-29. **Proposed, not approved or implemented.** This supplements inventory
v2's completed outcomes; it does not widen its historical removal approval.
Exact reviewed source/replacement hashes are in `remaining-sources-v3.json`.

## Decision requested

1. Approve **T02-v3** and **T08-v3**, including their explicitly listed obsolete
   test containers and the two bounded CLI edits, after the verification below.
2. Approve **T09-GUARDS-v3** below: replace two obsolete pre-cutover HTML assertions
   with current public-entry assertions, retaining all component/formatter/isolation
   checks. The expanded targeted unit run exposed these inherited stale guards.
3. Confirm **retain for this milestone** for **T09-v3** and **T10-v3** as the
   specific ongoing regression fixtures/assertions described below. This is an
   explicit proposed disposition, **not a claim their original consolidation plans
   were implemented**. If further consolidation/retirement is desired instead,
   these remain incomplete work; do not delete their unique assertions by analogy.

Keeping harmless test infrastructure with a reviewed disposition is permitted by
milestone 8's resumption rules. No production lesson imports any retained fixture;
all lesson behavior is already owned by shared production modules. Retention does
not make a frozen test fixture the authoring source or promise permanent retention
of every implementation line. No speedup is claimed for this proposal.

## T02-v3 — obsolete partial Middle sites and their superseded question spec

**Classification:** obsolete temporary integration containers, not replay source.
**Exact whole-file deletion proposal:**

- `tests/fixtures/harness/middle-questions.html`
- `tests/fixtures/harness/middle-questions.mjs`
- `tests/fixtures/harness/middle-reference.html`
- `tests/fixtures/harness/middle-reference.mjs`
- `tests/browser/middle-migration.spec.mjs`

The original question spec is retained unchanged until approval. The reference
spec was already ported to the public page in the approved v2 implementation.

| Original obligation | Concrete surviving destination |
| --- | --- |
| Production JSON requests relative to each mount; zero-credit/write-free fresh load and reload; no classic global | `middle-questions.spec.mjs`: production-requests test validates the **whole real manifest's** request set, not the partial site's seven files |
| Repeated per-controller hydrate/remount, no callbacks during update, one callback per keyboard action | `controller-lifecycle.spec.mjs`: direct shared question/checklist APIs with MIT noninstructional labels; no store or partial lesson; `app-lifecycle.spec.mjs` separately counts actual registry callbacks and writer reservation |
| Four sequences, every prompt/option/feedback, latest selected color, correct-ever history, wrap, immediate cursor/last-choice reload | `middle-questions.spec.mjs`: public-sequences test at both mounts; completed sections permit inspection but supply **no earned answers** |
| Quiz direct jump, numeric-zero option, score, review-first, wrong-after-credit and immediate cursor reload | Same file: public-quiz test |
| Every safe v1 fixture's current question/selection and reordered checklist presentation | Same file: safe-v1 test checks all five sequences and both checklists without saving; `middle-lesson.spec.mjs` additionally checks fields/models/cards/panels |
| Fixed source-date index **4**, never **7**; unknown selection/data.dslUi preservation; original reader | Same file: reordered-checklist test, with real public Evidence controls and both pinned original mounts |
| Missing exploration/writing prerequisites cannot be bypassed by question credit | `middle-lesson.spec.mjs`: real full fresh journey/every one-missing gate; `middle-migration.test.mjs`: independent pinned-policy comparison; not replaced with precompleted navigation seeds |
| Five reference groups, 18 list items, token emphasis/order, URL requests, no writes, failure/retry, ordinary/reference print and corrected Print presentation | Existing public `middle-reference.spec.mjs`, independent `middleReferenceInventory` oracle retained |

**Content audit:** the four fixture containers load existing production JSON or
reference documents; none owns a unique question/key/feedback/model/reference bank.
The old spec contains expected feedback/UI strings already asserted against the
same canonical activities. Keep `content/middle/`, `content/middle/legacy-variants.json`,
sealed original HTML/JS/banks/maps/progress and both original replay mounts. There
is no unique instructional variant to archive from these five containers.

**Risk/rechecks:** do not lose the current-answer/correct-ever distinction or claim
completed navigation seeds prove fresh gates. After approval run public questions,
Middle fresh journey/reference, generic lifecycle, pinned seal/server and policy/
adapter units. No response-transform, fake public route or production global is
introduced. Check source/replacement hashes again before deletion.

The old partial checklist test could show Evidence with sparse completion `[3]`;
the real public app correctly cannot. Its replacement uses sparse `[2]` (Evidence
itself), explores the actual panels/cards for the separate reveal policy, and
checks exactly **one additional** write for the keyboard checklist action. Saved
completion stays `[2]` and replays unchanged; all safe old fixtures (including
other sparse records) are independently hydrated without writes. No test-only
access exception or fabricated question/exploration fact is added to production.

## T08-v3 — obsolete partial Final site and its superseded boundary tests

**Classification:** mixed temporary code/copied content; canonical material and
independent originals remain. **Exact whole-file deletion proposal:**

- `tests/fixtures/harness/lesson.html`
- `tests/fixtures/harness/lesson.mjs`
- `tests/fixtures/harness/lesson.css`
- `tests/fixtures/harness/lesson-invalid.mjs`
- `tests/fixtures/harness/lessons/final/config.json`
- `tests/fixtures/harness/content/final/lesson.json`
- `tests/fixtures/harness/content/final/activities/welcome-cards.json`
- `tests/fixtures/harness/content/final/activities/summary-synthesis-questions.json`
- `tests/fixtures/harness/content/final/activities/connect-viewpoints-panels.json`
- `tests/fixtures/harness/content/final/activities/connect-viewpoints-questions.json`
- `tests/fixtures/harness/content/final/activities/synthesis-writing.json`
- `tests/fixtures/harness/content/final/activities/synthesis-checklist.json`
- `tests/fixtures/harness/content/final/reference/reference.json`
- `tests/fixtures/harness/content/final/reference/summary-synthesis.md`
- `tests/fixtures/harness/content/final/reference/synthesis-framework.md`
- `tests/fixtures/harness/content/final/reference/effective-summaries.md`
- `tests/fixtures/harness/content/final/reference/consensus-task.md`
- `tests/fixtures/harness/content/final/reference/after-round.md`
- `tests/browser/lesson-harness.spec.mjs`
- `tests/unit/lesson-validation.test.mjs`

**Exact partial-file proposal:** `scripts/validate-content.mjs` CLI only:

1. Remove only `...await validateLessonTree(resolve(project, 'tests/fixtures/harness')),`
   from the `const errors = [...]` expression. Retain canonical/catalog/content and
   `tests/fixtures/new-module` graph validation and all validator implementations.
2. Replace only the success-message parenthesis `(including the isolated harness)`
   with `(including the extensibility fixtures)` to describe the actual checks.

No directory-wide deletion; empty directories can simply remain untracked/nonexistent.

| Old lesson-harness/lesson-validation obligation | Concrete surviving destination |
| --- | --- |
| First three sections' interaction/unlock/unknown fields/fixed indexes/decoys/editable output/permanent credit/refresh | Public `lesson-boundaries.spec.mjs`: actual-prerequisites test. Uses real cards **before** revealed questions and actual input/model/check prerequisites, never the partial site's simplified gates |
| Completed legacy hydration | `final-lesson.spec.mjs`: every valid v1 fixture, all fields/checks/models/notes/panels/selections/goals, exact untouched raw bytes and no writes |
| Duplicate root/key, repeated destroy/remount, old nodes inert, exactly one callback/Print | `app-lifecycle.spec.mjs`: already ported shared app lifecycle with real registry callbacks and sample-ID storage; direct component update is independently in `controller-lifecycle.spec.mjs` |
| Every shared invalid case in Node schema/runtime and actual browser runtime | `security/lesson-cases.mjs` preserves **all 43 named cases**, now generates mutations against canonical Final; `lesson-boundaries.test.mjs` and `lesson-boundaries.spec.mjs`. The one-question wrapper and manifest block paths are resolved explicitly, not silently skipped |
| Invalid config/manifest ID/path/gate/duplicate/missing/broken responses before storage access; retry | Public metadata-boundary test: seven cases, zero reads/writes, original raw record unchanged, recovery |
| Individual missing/wrong-ID/unknown-type/duplicate-item activity, drafts/reference intact, silent retry hydration | Public activity-isolation test: four cases, real synthesis draft and complete five-group reference |
| Pending activity vs independent reference/no premature reads; ordinary/reference print | `app-lifecycle.spec.mjs` pending-activity test; public `print-isolation.spec.mjs` semantic renumber/reorder/readiness and PDFs |
| Reference body error cannot block ordinary credit; retry/Print never saves | Public reference-body failure test explicitly earns Welcome while reference fails, then compares raw bytes after recovery/Print |
| Ordinary Markdown failure, no initial credit, retry alone cannot earn credit | Already ported `app-lifecycle.spec.mjs`: failed-Markdown test on noninstructional fixture |
| Bounded/absent renderer; cancellation during pending load frees writer | Already ported `app-lifecycle.spec.mjs`: registry and destroy-during-fetch tests |
| Corrupt/denied/quota storage preserves session unlock, truthful separate warning and exact stored bytes | Public storage tests, both mounts, including exact quota attempt count; adapter/store units independently inspect normalized state |
| Independent composed content/heading/ARIA oracle; all earlier writing profiles validate | Public composed-data test still reads **sealed inert original**, `component-data.mjs`/`writing-data.mjs` independent extraction functions, then checks canonical questions, rendered faces/panels, writing labels/mode/model/template/checklist and all ten headings; no copied partial manifest acts as oracle |
| Config/manifest/all activity schemas, identity/order, graph file/symlink containment, all five question profiles, exact depth three/four | `lesson-boundaries.test.mjs`: canonical graph + tiny existing `new-module` graph for destructive test mutations; independent baseline question-profile data is retained |
| Copied reference equivalence | Copies are removed, not promoted to a new baseline. Existing public Final reference inventories compare **canonical rendering directly with sealed original**; original captures/pin remain |

**Content audit/retention:** six reference copies are byte-identical to canonical
`content/final/reference/` (v2 snapshot). All 164 activity scalar values had a
structured subset match against canonical documents/source-backed Markdown in the
v2 implementation audit. This session independently reran both comparisons and
all 43 invalid-case identities: **164/164 scalars and six/six byte comparisons
pass**, with exact paths/hashes in `remaining-content-audit-v3.json`.
The new public composed-data test adds a continuing
independent sealed-source oracle rather than merely trusting that historical audit.
No prose/key/feedback/model/template is uniquely owned by the partial site. Its
headings repeat original headings; test-only gates/labels are not coaching variants.
Keep canonical Final, `content/final/legacy-variants.json`, sealed source/banks/maps/
progress, original runtime reader and all historical screenshots/PDFs/reports/licenses.

**Consumer closure:** deleting the listed old browser/unit consumers is conditional
on the replacement tests passing. Retained `component-data.mjs`/`writing-data.mjs`
are independent source readers, not partial applications or production writers.
No remaining executable import/URL may point at the retired containers after cleanup.
Rerun canonical-boundary, app-lifecycle, public legacy restore, baseline/adapter/
policy and content validation after approved removal.

## T09-v3 — proposed retained direct API contracts (explicit review decision)

This is a proposed **retain**, not a deletion proposal and not a claim of completed
public-page ports. These specific fixtures run the **actual exported components,
navigation and store** with synthetic control events and explicit supplied state.
Unlike T02/T08, they do not duplicate a lesson manifest/content tree or promise to
simulate a public lesson. Retention is justified by the controlled API boundary
each assertion observes, not just by an import from an old test:

| Exact retained paths | Continuing boundary and why public journeys alone cannot replace it |
| --- | --- |
| `tests/fixtures/harness/components.html`, `components.mjs`; `tests/browser/components.spec.mjs` | Silent repeated `update()`, old-node listener disposal, direct duplicate mount rejection, five sequence API profiles, standalone multiple choice, global-index reorder, inactive-face ARIA, stable feedback DOM/focus, 3D/reduced motion/enlarged text and CSS decoy isolation. Public entries intentionally expose no component controller; triggering synthetic user actions would not test silent hydration |
| `tests/fixtures/harness/navigation.html`, `navigation.mjs`; `tests/browser/navigation.spec.mjs` | Explicit caller-supplied heading/view elements after pre/post-mount reorder, non-contiguous completion, rejected transitions without focus/scroll/save, stale updates, original tabindex restoration and destroyed controller inertness. Generated public shell cannot supply h1/h2/h3/incidental-heading or decoy arrangements before mounting; test-only gates keep navigation tests independent of activity policy |
| `tests/fixtures/harness/storage.html`, `storage.mjs`; `tests/browser/storage-boundaries.spec.mjs` | Minimal 24-line real-store probe: read-once, unchanged-save dedupe, every unsafe record's memory state/blocked writes, independent quota/denial, decoy fields and extended payload read by original engine. This is a deliberate store/adapter contract, no activity implementation. Public controls cannot invoke an unchanged store save or inspect safely salvaged unsaved memory |
| `tests/fixtures/harness/writing-reference.html`, `writing-reference.mjs`, `writing-reference.css`; `tests/browser/writing-reference.spec.mjs` | Every own-state writing/checklist mode, cursor range through silent update, late asynchronous clipboard denial after destroy/remount, existing-field vs separate selectable fallback focus/dismissal/destroy and fixed legacy field exclusion, independent reference remount. Reference Copy is deliberately a generic utility probe, **not a new production feature**. Real writing/model completion policies remain independently checked on public pages and against pinned source |
| `tests/fixtures/harness/component-data.mjs`, `writing-data.mjs` | Independent **read-only sealed-source oracles**, not a writable bank or executable old lesson. Used by canonical question/writing/formatter/schema/policy preservation assertions, including the newly ported public composed-data test. Templates match actual pinned handlers through VM tests. Retain MIT/CC BY/provenance; do not replace the oracle with imports of the content it must independently verify |
| `tests/fixtures/harness/README.md` | Retained until approval of the bounded documentation update described below; no useful source is deleted with an empty directory purge |

**Content:** navigation's 15 Opening excerpts and eight labels, component/writing
questions/models/feedback/placeholder/templates are source-backed, canonical or
independently sealed. They are read-only test inputs with attribution, not unique
unpublished coaching. No original-source fixture/variant/license is proposed for
removal. D01's legacy CSS decoy remains an intentionally exercised coexistence
contract; no production selector pruning is implied.

**Proposed bounded documentation cleanup T09-DOC-v3:** replace the **whole current
`tests/fixtures/harness/README.md`** with a current direct-API fixture guide covering
only the retained four probes and two independent oracles, their test-only gates,
canonical/public counterparts, attribution and limitations. Retire the obsolete
checkpoint/partial-Middle/partial-Final/removed-preview claims (old lines 1–137,
exact hash in the snapshot); preserve their historical evidence/hand-offs. No
instructional prose or test code is removed by this documentation change.

**Proposed bounded test correction T09-GUARDS-v3:** the current targeted unit run
fails two inherited pre-cutover assertions because Opening/Final now correctly link
`components.css`. This is a stale intermediate-state test, not a product regression:

- `tests/unit/components.test.mjs:62–66`: update the test title and **only** the
  first `for (const lesson of ['opening', 'final'])` HTML-check loop. Replace its
  assertion that both pages have no shared stylesheet with assertions that all
  three public pages have the shared component stylesheet and their own thin
  native-module entry, and do not load the classic global core. Retain the following
  four-component isolation loop unchanged (`67–70`), and all bank/codec/profile/
  correct-current tests (`1–60`). Current-entry/dependency boundaries are also
  independently exercised in `milestone-8.test.mjs` and public shell tests.
- `tests/unit/formatters.test.mjs:63–66`: replace **only** the first HTML-check
  loop's obsolete prohibition on `components.css`. Check all three public entries
  for the real shared stylesheet/thin module and absence of direct component or
  classic-core scripts. Retain module isolation (`59–62`), reference-loader
  import/no-storage assertions (`67–69`), **all VM/punctuation/template tests**
  (`1–57`) and independently pinned source unaltered.

Both exact current-file hashes are in the v3 snapshot. No test is disabled or
deleted to hide these failures; the two obsolete guards remain failing until this
explicit correction is approved. Recheck `components.test.mjs`,
`formatters.test.mjs`, `milestone-8.test.mjs`, baseline and canonical boundary units
after the correction. This approval is separate from keeping the useful T09 probes.

**Risks/limits:** these fixtures have extra test composition and do not verify
public bootstrap, real gates or semantic production print. Those obligations stay
with public entry/policy/shell/print tests. No permanent-architecture requirement to
keep their names, copied shell markup, test gates or extraction implementation is
created. Further simplification is possible but requires actual assertion ports;
the proposal explicitly seeks an owner retention disposition rather than calling
unported checks redundant.

## T10-v3 — proposed retained public presentation/replay regression assertions

All nine files already exercise the actual public lesson pages; none implements
an activity or mounts a partial application. Their source review found independent
paint/grouping/accessibility assertions not established by basic smoke journeys:

| Exact retained spec | Unique continuing coverage |
| --- | --- |
| `tests/browser/flashcard-presentation.spec.mjs` | All nine Middle fronts/backs at 320px/enlarged text; internal cue separation, compact list geometry, centered fronts, explored cue after flip-back/reload and no cue in accessible name |
| `tests/browser/evidence-presentation.spec.mjs` | Every Evidence panel/callout/card title-row/control/readonly assembly/model treatment, correct/wrong-after-credit paint, real reload; 760/1440/390px |
| `tests/browser/structure-presentation.spec.mjs` | Separate procedural/substantive badge roles and column breakpoint, original classification states, approved heading scale and explored cues on both faces |
| `tests/browser/middle-presentation.spec.mjs` | Welcome prose role/panel/badge hierarchy and near-rail-breakpoint grouping; all-section paragraph roles and rich-panel collapsed formatting whitespace |
| `tests/browser/middle-activities-presentation.spec.mjs` | Other **nine** activity surfaces, paired examples/roundtable, per-option feedback states, quiz overview/jumps, integrated draft/model restore across three widths |
| `tests/browser/final-presentation.spec.mjs` | Every Final section at 1440/780/390px, original/current card/panel/note/response/model/callout/speaker/caution roles, every alternative, no horizontal overflow; uses an independently pinned reader |
| `tests/browser/final-heading-cues.spec.mjs` | Explicit owner-approved two heading profiles on all nine pages/widths/enlargement and all eight front-face cues, keyboard/inactive-face state/flip-back/reload; independent reference hierarchy/print |
| `tests/browser/opening-presentation.spec.mjs` | Every Opening section/surface, timeline open/closed, analysis highlight variants, decision/reveal/model/knowledge-check states, enlarged text/reduced motion/print |
| `tests/browser/opening-essentials-spacing.spec.mjs` | Owner-reported regression guard: compact checkmark grid, correct 640/639 breakpoint, no cumulative wrapper margins, all item alignments and enlarged-text overflow |

**Disposition requested:** retain these exact tests/evidence in milestone 8, not
silently discard their assertions to reduce the suite. No capture-only lines or
strict geometry assertions are removed or weakened in this proposal. All historical
screenshots/PDFs remain immutable. These are diagnostic preservation tests, not new
pixel-perfect acceptance policy: the contracts' content/function/readability-first
hierarchy still controls review of future layout changes. A future change that
legitimately reflows an area must distinguish obsolete geometry from lost content/
hierarchy and version any justified current assertion, never reseal original data.

Full replay × section × width capture loops are costly and depend on external
Tailwind/fonts. No fresh exhaustive pass or cost reduction is claimed; targeted
maintenance selects affected files/tests as documented. If the owner instead
requires replacing these matrices with a lighter equivalent suite **now**, T10
remains incomplete until the unique assertions above have implemented/tested
destinations. Renaming files or treating one screenshot as parity is not a port.

## Approval boundary and verification record

No candidate above has been deleted, disabled or silently rewritten in this
session. Existing v2 approvals are unchanged; this v3 proposal needs its own owner
decision. Read `remaining-verification-v3.md` for executed commands, failures,
corrected assumptions, passing scope and manual gaps before approving. After the
decision, verify the exact snapshot hashes, apply only approved removals/documentation
edits, check closed consumers and rerun affected guards. No commit/push/release
permission is requested or implied.
