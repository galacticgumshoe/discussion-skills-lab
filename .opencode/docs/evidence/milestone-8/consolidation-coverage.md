# T09/T10 consolidation — assertion-port working record

2026-10-30. Source HEAD `61ff6898a6675d000d76e76e225d1852e56d9fb9`, branch
`refactor/shared-components`. **The owner approved the exact v4 removal scope and
the T09/T10 old containers are removed.** T02/T08's approved removals are also
implemented. Post-removal units/validation and 404/200 checks pass; browser
closure for the five remaining replacement specs is recorded in this checkpoint.
No production runtime/content/style change.

## T09 destinations

| Old obligation | Replacement / continuing independent check |
| --- | --- |
| `components.spec.mjs`: five source sequence profiles plus all-at-once application, latest/earned answer independence, explicit wrap/no-wrap navigation, previous/next boundaries, retry-first-unearned/focus | `component-contracts.spec.mjs`: six actual sequence APIs on disposable noninstructional DOM; `middle-questions.spec.mjs`: every real source option/feedback/cursor/wrap/quiz direct jump and reload; `opening-lesson.spec.mjs`, `final-lesson.spec.mjs` and their independent policy/journey checks |
| Silent component `update`, stable live feedback/option nodes, focus, double destroy/remount, old listeners inert, one callback, duplicate mount rejection | `controller-lifecycle.spec.mjs`; direct question/card/panel/writing/checklist probes in `component-contracts.spec.mjs`; app-level lifecycle stays in `app-lifecycle.spec.mjs` |
| Native card keyboard/pressed/inactive-face ARIA, exploration versus face, no second persistent write for transient face, real one-missing gate/credit/reload | Direct card probe; public `lesson-boundaries.spec.mjs` and existing lesson journeys/restore tests; `presentation-contracts.spec.mjs` all actual cards and restored front cues |
| Native panel open versus explored, queued silent hydration, fixed Final global open indexes | Direct panel probe plus public `lesson-boundaries.spec.mjs` panel-restoration case, including exact `[1,0]` explored indexes and independent `panelsOpen` indexes |
| Opening timeline controlled association, session-only open state, checkpoint wrong-after-credit | Direct timeline probe; public `opening-lesson.spec.mjs`, `presentation-contracts.spec.mjs`; current-only classification/optional models/precise boundary and permanent credit remain independent policy/journey tests |
| Stable Middle reordered model/option binding to global card 6 and quiz option/cursor indexes | Public `middle-questions.spec.mjs` reordered model/options case; codec units independently exhaust fixed mappings |
| Generic component long actual source face/long options, navy reverse, 3D/reduced motion, CSS decoy isolation | Direct card probe uses the longest face extracted from pinned Middle/Final, not invented stress prose; public narrow/all-card traversal; scoped CSS on/off decoy comparison remains |
| `navigation.spec.mjs`: explicit view/heading identity despite pre/post-mount order/decoys, sparse/zero credit, locked rejection without focus/scroll/save, immediate-predecessor access and permanent union | `navigation-contracts.spec.mjs` real shell/navigation API with caller-supplied h1/h2/h3/incidental headings and synthetic labels; `completion.test.mjs` all completion subsets and store connection; public shell/policy/journeys retain real gate integration |
| Focus/scroll separation, original tabindex, double destroy/remount, old controller/buttons inert, collapse/mobile selection, reference exclusion and last-page Next | Direct navigation contracts; `shell.spec.mjs` public entries/responsive/focus/reference/refresh integration; no copied test gate retained as a lesson policy |
| Navigation's 15 original Opening passages/eight labels | `navigation-contracts.spec.mjs` reads pinned source then checks actual public content/labels; `component-contracts.test.mjs` independently compares manifest labels with pinned script literals |
| `storage-boundaries.spec.mjs`: read once/no bootstrap write, unchanged-save dedupe, exact Unicode draft/credit restore/decoy exclusion | `progress-contracts.spec.mjs`: real browser Storage plus actual exported store/adapters; no HTML probe application or control implementation |
| All five unsafe records, warning/blocked writes and usable memory; denied/quota stores; extended payload original-reader replay | Direct progress contracts for all three keys and both mounts; public `lesson-boundaries.spec.mjs` verifies nonblocking accessible warning and actual in-memory unlocking; adapter units preserve exhaustive salvage/opaque extension rules |
| `writing-reference.spec.mjs`: every original field label/placeholder/maxlength/readonly/model/checklist; silent hydration/exact raw bytes | `writing-controls.spec.mjs` actual public lessons compared with independent pinned readers; generic writing/checklist silent update and cleanup in direct API contracts |
| Every input saves immediately, explicit assembly, edited output survives input/reload, plain text not HTML; caret survives silent update | Public writing tests plus direct caret/update probe; all three exact formatter algorithms still compared with real pinned handlers in VM units |
| Opening 34/35/self-check/optional model/permanent credit; Middle optional models and readonly assembly; Final required models/each missing check/permanent credit | Existing independent `opening-migration`, `middle-migration`, `final-migration` policy units, `policy.spec.mjs` and complete public journeys; `lesson-boundaries.spec.mjs` real Final synthesis prerequisites. Test-only partial gates are not preserved as production requirements |
| Clipboard success/denied/unavailable, exact text/select/focus/status/no writes, fallback has no fixed field identity, Escape/destroy cleanup/deduplication | Public writing clipboard tests and direct clipboard utility fallback; direct late denial after destroyed/remounted writer; codec fields are explicit maps and public decoy-exclusion checks remain |
| Independent pending/failed reference despite failed writing, retry/print/exact five groups/no storage, reference remount has one Print handler | Public `lesson-boundaries.spec.mjs`, `app-lifecycle.spec.mjs`, `print-isolation.spec.mjs`, reference inventories and direct reference API retry/remount/semantic print/storage isolation |
| `components.test.mjs`, `formatters.test.mjs`: source-backed IDs/options/feedback/codec, five profiles, history/current distinction, exact VM punctuation/Unicode/empty/template safety, import isolation | `component-contracts.test.mjs`; only obsolete pre-cutover prohibitions on the now-required shared stylesheet are replaced with current three-entry checks |

`tests/helpers/baseline-activities.mjs` consolidates the two **independent read-only
source readers**, not a copied application. All three exported reader function
bodies and `writingTemplates` were checked for exact equivalence to the original
modules before retargeting. They still read sealed source/maps/banks, never the
canonical content under test. `baselineReadersSource` serializes trusted test
functions into a disposable browser context; it adds no public route/runtime eval.
Content remains © Rhys Jones, CC BY 4.0; code MIT. Seals/replay/variants unchanged.

## T10 destinations

All nine old suites already used public pages; the consolidation removes their
duplicated opening/visiting/settling/source-current/capture loops, **not** the
lesson-specific paint and grouping contracts. One `observe()` traversal compares
the original and current roles, and a second public traversal checks narrow text,
card cues, reload and semantic print. Exact content/policy oracles remain separate.

| Old spec | Destination in `presentation-contracts.spec.mjs` / `helpers/presentation-contracts.mjs` |
| --- | --- |
| `flashcard-presentation` | Every Middle front/back/title/body, centered Welcome fronts, compact list rows, cue separation/containment, no cue in name, front cue after flip-back/reload; 320px/enlarged card text. Longest generic source face is also measured by the direct component API check |
| `structure-presentation` | Both source-backed badges/descriptions, classification activity/title/prompt/neutral/correct/wrong-after-credit/feedback/next/score, 600px choice stacking, hidden counter, title-before-copy and two-face cues; actual heading profile |
| `evidence-presentation` | Every panel example, card title/copy/badge role, research frame/title/caution/prompt/options/feedback, field/label/buttons/checkbox metrics, actions before output, exact readonly assembled output/status paint, model paint; public writing/restore tests independently cover saving/model restoration |
| `middle-presentation` | Every Middle paragraph role and collapsed rich-panel whitespace; Welcome callout/flow badge roles and three-versus-one card grouping, including 940px near-rail width |
| `middle-activities-presentation` | Every remaining scenario/application/quiz frame, title/prompt/neutral/correct/retained-credit wrong/feedback/next/score, all examples/cautions, paired columns and explicit hard breaks, roundtable, integrated writing frame/title/field/label/model/button/check metrics, nine activity surfaces and quiz overview/neutral jump treatment; real draft/model reload is covered by public writing tests |
| `final-presentation` | All ten sections at 1440/780/390, exact original role-specific painted properties for card faces/panels/notes/status/question contexts/alternatives/models/fields/callouts/speakers/cautions, no horizontal overflow, independent source reader and normalized note wrong/correct status |
| `final-heading-cues` | Distinct owner-approved Welcome/numbered heading scales/weight/family/leading/tracking, narrow/enlarged title fit, independent reference heading, every card's keyboard/two-face cue/inactive-face/normal front/containment/name/restore, semantic print; existing `print-isolation` retains full PDFs |
| `opening-presentation` | Every section's actual card surface including display/padding/borders/type, source/current timeline closed/open, all analysis variants/navy selection/exact highlight identities, classification/sequence/practice/quiz states, optional model, 320px root text/reduced-motion/controls and semantic reference-only print |
| `opening-essentials-spacing` | Dedicated exact 12px row gap, zero wrapper margins, all paired item positions, 640/639 breakpoint, 320px enlarged text/overflow, original heading/labels; unchanged strict regression contract |

### Consolidation decisions, not silent baseline changes

- Historical screenshots/PDFs remain immutable. Repeated per-state successful
  screenshots are not an assertion and are no longer an automatic matrix output;
  Playwright retains failure screenshots/traces, existing semantic print suites
  retain PDFs. No original baseline/capture is overwritten or resealed.
- Incidental Welcome card height/relative whole-page offsets are deduplicated into
  grouping, order, centering, compact-list/cue geometry and unclipped text checks.
  This follows the existing content/function/readability-first contract, rather
  than requiring a 2px match to an original inaccessible fixed height.
  The old back-cue 11–14px offset is likewise an incidental spacing sample, not a
  new fixed-height requirement: compact list rows, unclipped faces, readable cues
  and nonoverlapping content/footers remain. Final's explicit teal front cue,
  normal front weight/padding, both-face ARIA and restored credit stay assertions.
- Compare visible border colors only when the corresponding measured border has
  nonzero width. Do not add inherited typography assertions to composite Final
  containers when the old test deliberately measured only their painted surface.
- Opening never had Middle's exact all-paragraph style oracle. An early new helper
  incorrectly applied it to Opening spans/divs and a 600-versus-700 reminder; that
  was an added assumption, not a lost old assertion. Opening keeps its old concrete
  card/timeline/tab/state contracts. Final likewise keeps its explicit lead/eyebrow
  roles, not a new p-only map that cannot represent the original completion span.
- Middle's mobile Welcome is **2.35rem** at <=600px in both source/current; it is
  not Final's minimum 2.25rem. The consolidated helper now respects that real CSS.
- The original quiz did not paint the shared API's active-question jump cue. The
  old suite compared the first **noncurrent** jump. Match that neutral role and
  retain current-question ARIA/navigation checks independently, rather than
  changing production to erase its active cue.
- Tailwind is an unchanged external dependency. Paint comparisons explicitly wait
  for its generated stylesheet; a CDN failure is a dependency failure, not an
  unstyled oracle to accept. A first readiness probe incorrectly required a
  generated `.font-bold` class on current structural HTML with no such class;
  it now checks the common Tailwind preflight marker instead. Subsequent real
  `net::ERR_TIMED_OUT` requests led to a bounded three-load setup retry; every
  attempt still requires the generated stylesheet and a persistent outage fails
  explicitly. No fake stylesheet, CDN replacement, security change or skipped
  assertion is used.
- This dependency prerequisite belongs to paired original/current paint checks.
  The public narrow-text checks retain their previous native-page scope rather
  than adding an external dependency-health assertion to it. They initially wait
  for fonts/animations; root text-size toggles then wait two layout frames, not a
  fresh unbounded network/font wait on every title.
- Text enlargement scopes are preserved, not silently expanded: Opening root text,
  Middle's `#views` text on its four original card sections, Final titles separately
  from normal-size narrow controls/cards; direct
  generic component/writing checks also enlarge their own containers. Added
  whole-root 200% checks exposed a Middle long title extending into its visible
  padding and an 8px Final inline-text page overflow. Those were not assertions in
  the retired suites and no CSS fix is bundled into this test consolidation.
  They require separate triage, not a production rewrite to satisfy a new oracle.
- Paint traversals use reduced motion to deduplicate transition waiting; normal
  3D rotation and reduced-motion behavior remain independent API assertions. Every
  question selection now waits for its real `aria-pressed` result and settles
  before measuring paint, rather than racing an unpainted update in that faster
  traversal. Neutral controls are measured with the pointer moved away.
- The Middle paint sweep now uses the **original completed fixture's cursor**
  for each sequential profile (classification 4, group 2, communication 3,
  speaking 2, quiz 4), just as the old suites did. Repeating every question here
  was new extra work, not a port requirement: all questions/options/exact feedback,
  cursor saving and wrong-after-credit reload still run independently in the
  verified public question suite. 940px repeats Welcome/rail grouping only; the
  old activity paint widths remain 1440/760/390. This removes redundant captures
  without deleting an old unique role or a content assertion.
- The role-case budget is 600 seconds because each case consolidates a whole
  lesson across three/four widths rather than the old individual sections. This
  changes no assertion/tolerance. The earlier 300-second merged-case timeouts are
  recorded as failures, not retroactively passing runs.
- All controls must remain hidden in print. One visible-filter/count assertion
  now checks the same entire selector instead of 194 separate remote assertions;
  the latter exhausted Firefox's overall test time after reaching the print phase.
  The per-view hidden assertions and reference visibility/content counts remain.
- Final's enlarged-title pass sets the root size once, visits every counted title,
  then restores normal size once for ordinary narrow controls/cards, exactly the
  lifecycle of the retired heading suite. Repeated root-size toggles around every
  hidden view were an added rem-restyling stress test; no CSS is changed to pass it.
  Native geometry is awaited with two frames plus an auto-retrying unchanged
  `scrollWidth - innerWidth <= 1` bound, rather than accepting a transient frame.
- Public model-mode tests explicitly exercise every Opening/Middle/Final model's
  show/toggle/show-only behavior, real reload and retained draft/raw bytes. These
  supplement label/body-presence checks rather than assuming those imply restored
  visibility. Final's synthetic setup seeds `builderModel`/`closingModel` false
  explicitly: its real encoder correctly refuses to revoke already-earned model
  viewing by merely setting normalized flags false. No adapter was changed.

## Verification / next review

Detailed command outcomes and final source identities are recorded in
[consolidation-verification.md](consolidation-verification.md). Replacement
coverage for both T09 and T10 passes; the owner approved and the exact v4 scope
was removed on 2026-10-30. Post-removal audits pass: all 27 files absent, 24
removed-fixture 404s at both mounts, eight public-entry 200s, the completion file
at its expected hash, 126/126 affected units and content validation. The five
remaining replacement specs passed **368/368** in one clean all-project browser
invocation (37.3 minutes, zero skips/failures).

T09 has **448 distinct cases with combined passing coverage** (112 per project,
424 core plus 24 public model-mode cases), assembled from the recorded runs rather
than one clean invocation. T10's complete role selection passed **24/24 in one
clean invocation** after the bounded Tailwind setup retry; narrow/spacing/final
source passed **32/32**. No skips or unexplained failures remain in those final
runs. Unsuccessful diagnostics stay recorded.

The approved T02/T08 post-removal audit passed: 25 absent files still match their
reviewed HEAD source hashes, no executable consumers, 22 retired fixture paths
return 404 at both mounts (**44** checks), and all four public HTML entries return
200 at both mounts (**8** checks). The separate approved T09/T10 v4 removal also
passes its post-removal audit: 27 absent files, 24 removed-fixture 404s and eight
public-entry 200s. Historical README references are provenance, not executable
consumers.
