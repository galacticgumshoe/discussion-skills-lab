# Refactor contracts and implementation context

## How to use these specifications

This document is required reading alongside any `refactor-milestone-N.md`. The specs are implementation instructions for future sessions, not a record that implementation has occurred. No prior conversation is required. There is no project skill to load: this task-specific contract and the selected milestone contain the necessary context.

Implement milestones in order, 1 through 8, in separate reviewable tasks. The initial audited production revision is `0b5d229` (initial version); use the baseline captured in milestone 1 as the authoritative preservation source. Verify current files rather than relying on old line numbers. If prerequisite artifacts are missing, stop and report the missing prerequisite instead of implementing several milestones at once. If implementation contradicts a spec, report the conflict before changing instructional or storage behavior.

In a fresh session, read this contract, the requested milestone specification, and the latest relevant entry in `.opencode/docs/refactor-status.md` before editing. Read both the immediately preceding milestone's handoff and any partial/checkpoint handoff for the current milestone; follow evidence links when needed. Milestone 1 introduces the log, so its initial absence is expected only before that milestone starts. A handoff does not override the spec or prove tests still pass: verify the actual branch/files/prerequisites and rerun the required checks. Stop and report missing or contradictory prerequisite evidence rather than reconstructing it from an unavailable earlier conversation.

Keep agent/refactor documentation and execution evidence under `.opencode/docs/`, with `AGENTS.md` at the repository root and specifications under `.opencode/specs/`. Test code/fixtures and development configuration keep their specified locations. The owner approved relocating the former root `docs/` tree on 2026-10-25; historical handoffs and sealed fixtures retain old `docs/<path>` literals, which map to `.opencode/docs/<path>`. Do not rewrite historical evidence or reseal fixtures for this documentation move.

The project is Discussion Skills Lab: working instructional lessons for Minnesota high school MSHSL Discussion students. The lessons are coaching resources, not official tournament rules. The objective is content/code separation and shared implementations, not instructional revision or visual redesign.

## Non-negotiable boundaries

1. Preserve static GitHub Pages branch hosting. Keep public root URLs and `.nojekyll`. No frontend framework, production build, backend, database, accounts, LMS, service worker, or automatic grading.
2. HTML is structural implementation; CSS and JS are MIT. Original explanations, examples, prompts, answer choices, answer keys, feedback, models, checklists, references, and homepage educational copy are CC BY 4.0. Copyright Rhys Jones. Root `LICENSE` and `CONTENT_LICENSE.md` remain authoritative; mixed fixtures retain content licensing.
3. Preserve all meaningful content, including wording in JS, placeholders, builder sentence templates, and apparently unused variants. Do not merge similar passages with different wording. Archive unused variants with provenance rather than silently deleting or publishing them.
4. Preserve existing gate requirements, section counts/order, question/answer order, builder punctuation rules, and reference content grouping/reading order. Keep recognizable reference compositions while allowing minor presentation differences under the testing hierarchy below. Only the explicitly listed standards repairs below may change interaction behavior without a further decision.
5. Keep `main` untouched. Use an existing suitable non-main branch or create a branch if needed; inspect status first. Do not merge, commit, tag, push, deploy, or change GitHub settings unless explicitly instructed. Specs' commit lists are suggested review boundaries.
6. Preserve unrelated changes. Test using temporary browser contexts and synthetic student text, never real students' data or a personal/live browser profile.
7. Milestone 8 legacy cleanup requires an itemized removal inventory and explicit user approval of the identified removal set before deleting files, selectors, or implementation blocks. Passing tests or general approval to implement the milestone is not removal approval. Preserve baseline/replay dependencies and instructional variants; unresolved items stay. Follow milestone 8's approval checkpoint and record the decision in its handoff.

## Current source map

```text
index.html                         homepage, inline CSS and educational copy
opening.html                       lesson, inline CSS and activity script
middle.html                        explanations, cards, models, reference, shell
final.html                         explanations, cards, models, reference, shell
assets/js/lesson-core.js            window.DSL.createLesson, navigation and v1 storage
assets/js/middle.js                 Middle data, activities, persistence
assets/js/final.js                  Final data, activities, persistence
assets/css/shared.css              shell, selections, expandables, Opening print rules
assets/css/middle.css               Middle styling and print overrides
assets/css/final.css                Final styling and print overrides
assets/favicon.svg
README.md, LICENSE, CONTENT_LICENSE.md, .nojekyll
```

Initially there are no tests, package manifest, or CI workflow. All lessons load Tailwind `https://cdn.tailwindcss.com/3.4.17` and Google Fonts (DM Sans/Fraunces); homepage uses only Google Fonts and its own CSS. Preserve these during milestones 1–7. Removing Tailwind or self-hosting fonts is a separate future decision, not required by milestone 8. An optional Lucide initialization in Middle has no loaded dependency; do not add Lucide.

## Stable section identities

These IDs are contractual. Keep `view-N` DOM IDs during the transition for compatibility; new runtime logic must use explicit ID mappings, not DOM position. The last entry in each list is a reference, not a counted lesson page.

| Lesson/content ID | Storage key | Ordered section IDs |
| --- | --- | --- |
| `opening` | `dsl:opening-stage:v1` | `contributions`, `opening-sequence`, `task-analysis`, `clarifications`, `give-direction`, `research-transition`, `knowledge-check`, `quick-reference` |
| `middle` | `dsl:middle:v1` | `welcome`, `structure-substance`, `evidence`, `support-group`, `communication`, `speaking-conflicts`, `integrated-practice`, `knowledge-check`, `quick-reference` |
| `final` | `dsl:final:v1` | `welcome`, `summary-synthesis`, `connect-viewpoints`, `organize-findings`, `consensus`, `task-audit`, `professionalism`, `closing-practice`, `knowledge-check`, `quick-reference` |

Counts are 7, 8, and 9. Existing navigation permits a page if it is first, is the reference, is already completed, or its immediate predecessor is completed. Do not replace this with an all-previous-pages condition. Completion is a union with stored completion; revising an answer, closing a panel, clearing a draft, or unchecking a box never relocks an already completed section. Refresh starts at the first section; do not add current-section restoration or URL routing in these milestones. Reference navigation stays available with zero progress. Existing reference view hides bottom previous/next controls.

## Interaction contract

### Flashcards

Middle has 9 cards, Final 8, Opening none. Preserve white edge-to-edge fronts without another white frame, lower-right teal `↻ Flip card`, navy backs/white explanations, horizontal 3D rotation, reduced motion, keyboard activation, and `✓ Explored`. Track explored credit independently of front/back presentation. Credit survives a flip back and reload. Use native buttons without interactive descendants, or a carefully tested equivalent if rich content requires it. Do not nest invalid block markup inside buttons. Hide the inactive face from assistive technology and maintain a meaningful accessible name/description. Text must not clip at narrow widths or 200% zoom.

### Expandables

White rounded subtle-border rows, bold navy headings/body, restrained teal accents. Prefer native details/summary; preserve Opening's timeline composition through a presentation variant. Open state and ever-explored state are distinct. Restoring an open panel must not fabricate exploration in another panel or trigger duplicate save callbacks.

### Questions

Only the latest selected answer is highlighted: green if correct, red if incorrect; include text feedback, not color alone. Preserve source feedback wording and whether feedback is shared or per-option. Alternatives remain selectable after credit. A correct-ever flag and last selected option are independent. Preserve focus and reuse a stable live-feedback node when selecting answers. Question navigation is separate from correctness logic.

Opening classification is an exception: before initial section completion it requires all **current** answers correct, and advances after any selection. Do not silently switch its gate to correct-ever. The completed section is still permanent. Opening's knowledge check displays all five questions at once; Middle uses sequential wraparound and direct question buttons; Final uses sequential previous/next without wraparound.

### Writing and references

Keep writing ungraded. Opening output editable; Middle research output readonly; Final synthesis output editable. Model viewing is optional in Opening/Middle, required in specified Final sections. Persist drafts on input before a later unrelated action is required. Clipboard failures must leave selectable text and useful status. Student text goes through `.value`/`textContent`, never HTML or Markdown rendering.

One Print button per reference; reference always accessible. Print only the reference even when Ctrl/Cmd+P is invoked from an ordinary lesson page. Preserve content grouping, recognizable reference compositions, and compact letter-portrait styling, allowing minor presentation adjustments under the testing hierarchy below. No clipping, lesson questions, navigation, controls, or blank leading page. Do not impose a one-page limit if it truncates content. Manual Safari/Firefox/Chrome preview checks remain necessary.

## Explicit standards repairs and limits

These are narrow repairs to the original requirements, implemented only when the affected component/lesson is migrated and in separately reviewable commits/tests:

- Middle: immediately save sequence/quiz positions and partially typed research fields; restore model reveals through the UI extension below.
- Final: immediately save edits to assembled synthesis; derive restored goal caption from saved goals; preserve keyboard focus/feedback announcements through question updates.
- Opening: add correct/incorrect selection styling to classification; save/show the sequence checkpoint's last choice while retaining `sequenceCorrect` credit forever; complete tab/panel ARIA associations without changing analysis content or highlight rules.
- Shared: separate exploration from current presentation, prevent clipped card content, keep keyboard focus and live feedback reliable, show a nonblocking storage warning, and make print isolation semantic.

Do not rewrite coaching/feedback, add answers, change gates, introduce flashcards to Opening, change readonly/editable modes, or require previously optional models. Other discoveries belong in a known-issues list and need approval before unrelated fixes.

## Persistence contract

### Existing formats

The three keys above retain their outer shape:

```json
{"completed":[0,1],"data":{}}
```

Opening uses direct `data` fields; Middle `data.middleState`; Final `data.finalState`. See milestone 1's frozen mappings and the lesson-specific specs for inner fields. Unknown object properties must survive writes. A mapping is a fixed table recorded from the initialized baseline, never recalculated from reordered markup. Preserve values/order in untouched legacy arrays where practical; compare sets semantically where ordering is irrelevant. Do not compact holes or coerce unknown values into earned credit.

### Internal model and adapters

New components use stable IDs, not indexes. The internal model is JSON-serializable:

```text
completedSections: string[]
activities: record<activityId, type-specific state>
fields: record<fieldId, string>
flags: record<string, boolean>
ui: record<string, JSON-compatible UI data>
```

Type-specific question state includes `selections` (question ID → option ID), `earnedQuestionIds`, `attemptedQuestionIds` if needed, and `currentQuestionId`. Card/panel state includes `exploredIds` and current presentation separately. Checklist state contains checked stable IDs. Persist only representable/explicitly extended facts; do not invent historical correct answers from a section-complete flag.

Adapters expose `decode(rawRecord)` and `encode(normalizedState, originalRawRecord)`. They translate stable IDs to existing indexes/keys and merge owned values into a copy of the original record. They must not derive state by scanning the new DOM. UI is hydrated without replaying synthetic clicks or credit events. Decode/encode must preserve unknown data and valid drafts, and be repeatable without multiplying entries. A legacy quiz selection of numeric zero is not a missing value.

### Small, backward-compatible UI extension

No v2 key migration in milestones 1–8. Where the baseline format cannot store a required UI fact, use **only** this additive optional namespace:

```json
{
  "completed": [],
  "data": {
    "dslUi": {
      "schemaVersion": 1,
      "models": {},
      "selections": {}
    }
  }
}
```

`models` maps stable model IDs to booleans (Middle's model visibility). `selections` maps stable activity IDs to question-ID/option-ID maps (Opening's sequence checkpoint). Existing legacy fields remain authoritative for represented selections/credit; do not duplicate them here. Preserve unknown extension properties. An unknown `dslUi.schemaVersion` is opaque: preserve it and do not overwrite it; work in memory with a warning if a new UI fact cannot be saved. Test that the original lesson still reads the extended record. This is a documented additive extension, not a claim of byte-identical v1 serialization.

### Store lifecycle

One live writer per lesson. Read/validate → load/validate required activity content → decode → render/hydrate without save events → enable interactions. Completed-section records remain authoritative even if finer activity evidence is missing. Save on meaningful user changes; avoid repeated writes on unchanged refresh/render. For existing key formats, final serialization always goes through the adapter. Do not run a new store alongside a legacy engine that also writes the same key.

Missing/unavailable/corrupt storage must not crash activities. Never automatically overwrite invalid raw JSON or an invalid outer record on initialization. Salvage valid displayable completion/drafts if possible, but block writes to an unsafe record and show a warning; do not silently clear/reset/repair it. No localStorage.clear(). Failure to save must not remove in-memory credit. Do not rely solely on beforeunload/pagehide to save input. No v2 keys, destructive migrations, or student-data exports are required here.

## Target file responsibilities and module conventions

Use native ES modules for new code, no bundler/transpiler. Keep legacy classic `assets/js/lesson-core.js` until its last consumer migrates. New modules live under `assets/js/app/`, `components/`, `activities/`, and `utilities/`. New bootstrap scripts may retain `assets/js/middle.js`, `final.js`, and `opening.js` names but become thin module entry points on cutover. Do not switch all script types before converting their consumers.

`lessons/<id>/config.json` is mechanical MIT configuration: `schemaVersion`, lesson `id`, exact `storageKey`, relative `content` manifest path, `sectionOrder`, `referenceId`, and supported presentation-profile values. It contains no coaching text or executable paths supplied by content. Static JS imports in each entry select its completion policy/adapter; JSON never names arbitrary code to execute.

`content/<id>/lesson.json` is CC BY content and instructional metadata: identity, titles/navigation labels, requirement messages, section headings/eyebrows, ordered bounded blocks, and activity source references. All referenced paths resolve relative to their declaring JSON file, not the root HTML or current module. A section's blocks can be:

- `markdown`: a `source` pointing to Markdown.
- `activity`: an `activityId` declared in the manifest's activity source list.
- `group`: a bounded list of blocks with an allowlisted layout/tone, used for original cards, grids, callouts, roundtables, etc.
- `reference`: a `source` to a validated reference document.

Implement only block/layout types needed by actual content, documenting each in schemas. Do not create arbitrary HTML/CSS, remote include, JS expression, or generic template-language fields. Enforce finite nesting depth. `markdown` body fragments contain prose, not interactive controls. Structured activity strings are plain text by default; rich bodies explicitly reference Markdown. Do not guess which strings contain HTML.

Activity JSON contains `schemaVersion`, `id`, `type`, and its type-specific fields. Questions have stable `id`, `prompt`, `correctOptionId`, ordered options with stable `id`/`text`, and either question-wide explanation or per-option feedback. Preserve answer order; correctness references option IDs. Other types are flashcards, expandables, writing/checklists, task analysis, and note categorization. Full schemas and cross-file semantic validation are created as each type is introduced; never accept arbitrary unknown types as HTML.

`lesson-app.js` orchestrates loading, rendering, state, completion, and navigation. Components are root-scoped, accept validated data/state and callbacks, and expose cleanup or guaranteed single initialization. They do not access localStorage or globals directly. `completion.js` supplies pure gate calculations over normalized state; `progress-adapter.js` owns legacy translation, not instructional rendering. Use simple functions and a small renderer registry, not a plugin framework or complex rules language.

## Loading, security, and dependency policy

- Use same-origin fetch. Root HTML config references resolve from `document.baseURI`; nested content references resolve from their declaring file's URL; module imports resolve from the importing module. No root-absolute paths or `<base>` workaround.
- Content/asset URL checks must reject foreign origins, protocol-relative/unsafe schemes, and traversal outside the intended content subtree. Legitimate instructional hyperlinks can be HTTPS or safe relative links; they are not executable content includes. Test URL normalization/encoded traversal.
- Vendor reviewed, pinned **markdown-it** (MIT, markdown-it project) and **DOMPurify** (Cure53/contributors, Apache-2.0 or MPL-2.0). Use upstream browser-ready distributions, not a new build pipeline. Document selected license, version, source URL, checksum, and update procedure in `THIRD_PARTY_NOTICES.md`. No runtime CDN for these libraries.
- markdown-it: raw HTML off, linkify off, typographer off, no plugins initially. Preserve existing line-break semantics explicitly. DOMPurify: allow only required prose tags/attributes and safe links; exclude scripts/forms/iframes/styles/events and unnecessary SVG/MathML. Sanitize parser output before insertion. Do not use HTML-string interpolation for student text or JSON labels.
- Full JSON Schema validation (Ajv development-only is acceptable) plus semantic checks runs locally/CI; lightweight runtime boundary validation rejects missing/invalid content before attaching behavior. No production Ajv dependency is required. Test script and browser-runtime validations against the same invalid fixtures.
- Content loading errors show actionable retry/status text and must not grant credit or damage progress. Reference loading must not depend on locked activities. Modern entry points fail closed for affected activities without preventing reference access. Prepare reference content at startup so Ctrl/Cmd+P works from another section.

## Testing and handoff conventions

### Testing hierarchy: content is exact; rendering need not be pixel-perfect

**Content equivalence is mandatory; pixel-perfect rendering is not.** Evaluate preservation in this order:

1. **Instructional content and completion policies — hard requirements.** Wording, examples, question/option order, answer associations/keys, all feedback, models, criteria, builder wording, and completion/unlocking requirements must match the canonical baseline unless the user explicitly approved a specific change. Any unapproved difference is a failure, even if screenshots look identical or the replacement seems clearer. Test actual data/rendered text and policy inputs/results independently of screenshots, including hidden and alternative content. Preserve meaningful emphasis, annotations, and hard breaks; normalize only nonsemantic whitespace as described below.
2. **Functionality, progress, accessibility, and established interaction standards — hard requirements.** Maintain working controls, durable credit/drafts, keyboard access, readable/unclipped content, required card/answer colors and cues, responsive navigation, and reference-only printing. Existing known gaps may be repaired only as explicitly scoped. Visual similarity does not excuse a failure in these areas.
3. **Visual presentation — regression evidence, not an exact-pixel contract.** Preserve the site's visual identity, meaningful content grouping/hierarchy, and recognizable lesson/reference compositions. Minor spacing, padding, line wrapping, component height, alignment, or responsive reflow differences are acceptable during component migration/consolidation when they retain content, behavior, readability, and design standards. Accessibility improvements and preventing clipping take priority over reproducing incidental original geometry. Do not recreate inaccessible markup, fixed heights, or fragile overrides merely to match pixels. Broader redesign still requires approval.

For a visual difference, first establish that content and policy assertions pass; then inspect for clipping, missing/hidden content, lost hierarchy/cues, unreadable contrast, overflow, broken interaction, and print omissions. Fix those regressions. If the difference is only minor permitted presentation, record its location, rationale, comparison evidence, and relevant accessibility/viewport checks in the handoff and proceed; separate instructional-change approval is not needed for an in-scope layout adjustment. Do not spend implementation time restoring incidental spacing or line wraps solely for screenshot equality.

Keep screenshot/PDF comparisons useful but do not make zero pixel difference a checkpoint or milestone gate. A raw visual diff is a triage signal, not proof of content failure. Document any tolerances or reviewed visual expectations; never relax content/policy assertions or mask instructional regions to make a visual test pass. Preserve original captures; any justified new visual expectations must be separately versioned with the reason/evidence rather than silently replacing the historical baseline.

This hierarchy does not authorize extra work in mechanically scoped milestones: milestone 1 changes no production files, and milestone 2 still extracts source verbatim with the original cascade/execution order. Do not introduce layout adjustments in those milestones. Their screenshot checks still need not enforce exact browser/font rasterization.

### Presentation-preservation contract for content migrations

Milestones 6 and 7 must apply this contract before public cutover. Required lessons
from Middle: `.opencode/docs/evidence/milestone-5-flashcard-style.md`,
`milestone-5-middle-presentation.md`, and `milestone-5-all-activities.md` in the same
evidence directory. Reusing a shared interaction controller does not preserve its
source lesson's presentation. Most approved Middle treatments are scoped to
`.dsl-middle`; neither generic defaults nor importing Middle's theme is a substitute
for preserving Final's or Opening's own visual identity.

Owner-approved exceptions carried forward from Middle (2026-10-27): counted lesson
page titles should use the larger responsive primary/display heading treatment,
not the pinned main's small reset h2; shared flashcards retain `✓ Explored` on the
front after flip-back as well as the back. Record these intentional differences in
Final/Opening presentation evidence and test them explicitly instead of reverting
them for screenshot equality. Reference/subordinate headings retain their own
hierarchy. Opening has no flashcards; do not add any to satisfy a cue requirement.
Clarification from direct Middle comparison: match its separate heading levels,
not a uniform approximate display size. Welcome uses `clamp(2.25rem,5vw,3.6rem)`;
numbered pages use `clamp(1.85rem,3.4vw,2.6rem)`; both are bold Fraunces with 1.17
leading and `-.035em` tracking. Final card fronts retain Middle's normal weight.
These clarified profiles supersede the earlier uniform 48px interpretation.
The owner also requires impact-scoped follow-up verification: lesson-only CSS
changes need affected lesson tests, not automatic whole-site reruns. Shared
behavior changes still require the affected consumers' checks, with scope reported.

1. **Inventory before extraction.** Create a section-by-section presentation map
   under `.opencode/docs/` against the immutable original. Identify paragraph roles,
   heading typography, separate card titles, every activity frame, speaker/context
   statement, example/caution/notice, model, feedback state, control treatment and
   responsive grouping. Map each to existing bounded metadata/component profiles
   and lesson-scoped CSS, or document a narrowly required extension. Reconcile
   counts against source; representative activities alone are insufficient.
2. **Preserve roles and composition.** Use the existing closed `textStyle`, title,
   group-tone and callout annotation fields where appropriate. Plain Markdown must
   not erase source hierarchy, emphasis, example boundaries or annotations. Preserve
   separate overview/question areas, paired examples and writing/model groups where
   present. Prevent cumulative paragraph margins/grid gaps from nested group and
   loading wrappers. Keep rich Markdown formatting whitespace collapsed while
   retaining explicit hard breaks, plain-text newlines and exact task segments.
   Do not add arbitrary HTML/CSS/classes, duplicate controllers or infer gates from
   presentation. Any new metadata remains closed, validated and tested.
3. **Retain lesson identity and state cues.** Activate the correct lesson-scoped
   theme and verify the actual stylesheet cascade. Preserve visible borders,
   backgrounds, accents, typography roles and neutral/correct/incorrect/retained-
   credit states. Middle-specific sequence wrappers are not a universal layout.
   Do not copy a theme or optional control simply because a shared API supports it.
4. **Distinguish regressions from permitted differences.** Minor documented spacing
   and natural reflow remain permitted under the hierarchy above. Missing activity
   frames/callouts/shading, lost hierarchy/emphasis, inappropriate font roles or
   premature stacking that breaks recognizable composition are regressions, not
   incidental layout differences. Keep readable responsive growth; do not recreate
   clipping, fixed heights or inaccessible markup to match pixels.
5. **Compare every section before cutover.** In the common harness, compare pinned
   original and migrated views at wide desktop, narrow desktop near source
   breakpoints, and mobile widths. Cover every activity and authored callout/model,
   both card faces where applicable, expanded/collapsed and reveal states,
   unanswered/correct/incorrect/wrong-after-earned-credit responses, and reloaded
   drafts/selections. Exercise root/repository mounts across Chromium, Firefox,
   WebKit and mobile Chromium. Wait for fonts/transitions to settle. Combine targeted
   painted-style/layout and overflow assertions with original/current screenshot
   review; exact content/answer/policy assertions remain independent. Preserve
   original captures; do not update baselines to hide regressions.
6. **Owner presentation checkpoint.** Before switching the public entry, record the
   inventory reconciliation, comparison evidence, minor permitted differences,
   automated outcomes and actual manual accessibility/print checks or their gaps.
   Obtain owner presentation review/approval; behavioral test success alone does
   not establish presentation readiness. If review is unavailable, stop at the
   pre-cutover checkpoint and record the blocker. After cutover verify the public
   page and run other lessons' regressions to catch shared-style effects. Attribute
   owner-reported checks explicitly; do not infer unreported AT/device/zoom coverage.

### Tooling and evidence

Milestone 1 establishes npm development-only tooling: Playwright browser tests and Node's built-in test runner. Later milestones add content-validation tooling. Keep `npm run test:unit`, `npm run test:browser`, and later `npm run validate:content` stable and documented. A package manifest is for development only; site serving must remain `python3 -m http.server 8000` or equivalent with no build/install step for production assets.

On the current macOS 27 host, Firefox requires a fresh command-scoped application-data home: `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- --project=firefox --workers=1 --max-failures=1`. Use the same environment prefix for the full default suite. This verified environment workaround changes no assertions or security settings; see `.opencode/docs/regression-checklist.md` and `.opencode/docs/evidence/firefox-blocker.md` for setup, evidence and limits.

Test servers must support `/` and `/discussion-skills-lab/` without duplicating production files, plus isolated fixture routes. Use a random/local test port, not live Pages. Browser contexts are isolated per test; avoid production-origin previews with the same storage keys (localStorage is origin-scoped, not path-scoped). Include Chromium, Firefox, WebKit desktop projects and mobile viewports. Chromium print PDFs and print-media assertions are automated; actual Safari/iOS/Android, assistive technology, and print preview checks are manual and recorded as pending when unavailable.

Keep original baseline captures immutable: no auto-updating snapshots or rewriting content/policy fixtures just to make tests pass. Compare extracted instructional data separately from visual evidence, including inactive feedback/answers and meaningful emphasis/hard breaks. Whitespace-only wrapping can be normalized outside preformatted/task-segment contexts; punctuation, case, source order, wording, and answer associations cannot. Apply the hierarchy above when classifying visual diffs. Known source defects are explicit test annotations/known issues, not unexplained failing suites or silently skipped assertions.

### Required fresh-session handoff

Milestone 1 creates `.opencode/docs/refactor-status.md`. Thereafter, append a handoff using the **exact headings and field labels below**, in this order, at every milestone exit, Milestone 4 checkpoint exit, Milestone 8 legacy-removal approval pause, and interrupted/blocked implementation session. Keep entries in chronological order with the latest at the bottom; do not replace previous handoffs with a rolling summary. Keep the final chat summary concise and point to the new entry. This is an implementation-session requirement; authoring these specifications does not itself complete a milestone or require creating a fictional implementation handoff.

```markdown
## Milestone handoff

Milestone:
Starting commit:
Working branch:

### Implementation
- Files created:
- Files modified:
- Interfaces introduced:
- Content moved:
- Storage changes:

### Verification
- Unit tests:
- Browser tests:
- Content validation:
- Manual tests:
- Tests not performed:

### Compatibility
- Legacy progress verified:
- Original-engine replay verified:
- Known regressions:

### Next milestone
- Prerequisites satisfied:
- Outstanding blockers:
- Decisions requiring approval:
```

Fill every field; no blank values, unexplained checkmarks, or omitted sections. Use `None`, `Not applicable — <reason>`, or `Not performed — <reason>` where accurate. Nested bullets are allowed for evidence; keep the required labels unchanged. Include enough detail for the next agent to continue without prior chat:

- **Milestone:** number/title and explicit overall status (`complete`, `incomplete`, or `blocked`). For milestone 4 include the current checkpoint, whether it is verified, and the next unverified checkpoint. A verified checkpoint is not a completed milestone. An interrupted session retains `incomplete`/`blocked` status.
- **Starting commit:** the full HEAD hash recorded before this session's implementation edits, not the historical baseline hash unless they actually coincide. **Working branch:** the actual branch name. Explain inherited uncommitted changes under the implementation fields, distinguishing them from this session's work; no commit is required to hand off safely.
- **Implementation:** list concrete paths, exported interface names/signatures or links to their definitions, source → destination content mappings/inventory links, and storage keys/format/adapter changes (or explicitly none). Identify scoped standards repairs and approved decisions here. Record minor permitted layout differences with rationale/evidence under the relevant modified paths; do not conceal content or gate changes as presentation differences.
- **Verification:** for each automated category give the exact command, outcome (`passed`, `failed`, or `not performed`), relevant counts/scope, and evidence path if available. Browser results name engines and root/subdirectory mounts exercised. Manual results name browser/device or assistive technology and actions actually checked. List every required check not run, skipped, or unavailable under **Tests not performed**, with reason and whether it blocks completion. Do not present a planned command as an executed test. Content validation can be not applicable before its tooling is introduced, with that reason stated.
- **Compatibility:** identify the lesson keys/fixture sets tested and results; record original-engine replay's pinned source revision, scope, and evidence, or explicitly say not performed. Describe observed regressions and unresolved known issues with paths/issue references. `None observed in the listed checks` is not a claim that untested compatibility has been verified.
- **Next milestone:** name the actual next task/checkpoint under **Prerequisites satisfied**, cite evidence of readiness, and distinguish satisfied prerequisites from pending ones. For a partial milestone, the next task is resuming it, not advancing to the next milestone. Enumerate blockers and decisions requiring user approval; write `None` when there are none. At milestone 8's cleanup pause, link the reviewed inventory version and proposed item IDs under **Decisions requiring approval**; after approval, record which IDs were approved or retained and the user's decision reference. After milestone 8, the next task is separate review/release approval, not automatic publication.

Do not mark a milestone complete with missing blocking evidence. Stop after the requested milestone. Milestone 8 prepares a reviewable result; deployment approval/release is a separate task.
