# Consistent presentation across all Middle activities

Owner requested a single pass applying the Activity 1/2 bordering, callouts and
shading to every remaining Middle activity. Starting HEAD
`b93d74548c39ec1dc7d14d484b8033ea0411379b`, branch
`refactor/shared-components`; inherited uncommitted work preserved. This remains
a scoped Middle presentation correction, not milestone-6 implementation or
cross-lesson/global CSS cleanup.

## Coverage and implementation

- All **nine original white activity surfaces** are represented: classification,
  research, group/communication/speaking scenarios, application Tasks A/B/C, and
  the knowledge-check question panel. The three remaining scenario reveal groups
  and Task C now use the existing finite `activity` tone. No reveal condition,
  activity binding, content order or gate changes.
- Replaced classification/research-specific answer/feedback/control rules with
  one **Middle-scoped** theme: original panel border/background/radius/padding,
  title/prompt hierarchy, neutral/correct/incorrect selected answers, left-accent
  feedback, bordered controls and scenario score pills. Classification keeps its
  two-column responsive answers; other question banks remain one column. Speaking
  retains its original teal primary Next control; other Next/Review controls keep
  their original neutral palette. Writing fields/model examples/statuses/checks
  now use the same theme for both writing activities.
- Shared question sequences expose a finite profile class, removed on destroy.
  Application's existing two articles become distinct bordered A/B panels without
  splitting/reimplementing their controller. The existing Middle quiz profile
  groups its actual score/jump controls into a pale overview and its counter,
  prompt/answers/feedback/controls into a bordered question panel. All handlers,
  state updates, live regions, stable IDs and keyboard controls are reused.
- Remaining authored examples in collaboration/strategy/communication expandable
  bodies regain Markdown blockquote grouping. Note-example hard breaks remain
  explicit. A closed optional expandable-item `calloutTones` array (`example` /
  `caution`, one or two values, Markdown source required) preserves the contrasting
  professional-language pair. The existing renderer checks annotation/blockquote
  count and adds fixed classes; a paired example layout becomes one column below
  600px. No arbitrary HTML/CSS/class field or Markdown plugin is introduced.
- Middle expandable bodies share normal example spacing and separated explored
  markers. Keep the owner-approved header/front-face explored cues, larger section
  headings, and previous assembly action order/fact-check notice. The existing
  quiz active-question cue remains; original/current screenshots are evidence,
  not a zero-pixel-difference contract.
- Exclusive extractor retains activity-wrapper, Task-C, example/caution and
  multiline-blockquote distinctions for future extraction; no regeneration or
  overwrite of reviewed content. Body text/labels/punctuation/strong emphasis/
  original hard breaks, all options/answers/feedback/models remain preserved.

No key/codec/fixed map/one-writer/draft/earned-credit/completion/reveal change.
Opening/Final production engines/styles are untouched; the common theme is
prefixed with `.dsl-middle`. No dependency or production build changes.

## Verification history

- Initial new all-activity comparison incorrectly compared invisible colors on
  zero-width borders (original preflight color vs CSS reset currentColor). Its new
  style oracle now compares border color only when that edge is painted; all
  widths/visible colors/palette/content assertions retained. No production CSS
  added just to mimic an unpainted edge. First command failed one/five not run.
- Next preflight caught a real mistaken primary quiz Next palette. The pinned
  source uses neutral for quiz, teal for speaking; CSS corrected, assertion retained.
  Next command failed one/five not run. Corrected comparison passed 6/6.
- Expanded callout comparisons also **passed 6/6**:
  `npm run test:browser -- tests/browser/middle-activities-presentation.spec.mjs --project=chromium --workers=1 --max-failures=1 --output=test-results/all-activities-expanded`.
  Both mounts at 760/1440/390px, all seven remaining activity surfaces, all remaining
  panel examples/caution pairing, correct/incorrect-after-credit styles, shared
  controls, Task-C fields/model/checkboxes/draft reload, quiz overview, total nine
  activity surfaces and retained completion. Archived initial report SHA-256
  `c2adcf4ce5c1f5329efab91e9b911d7e78fc3897c898d80d8d51492f747c3d89`.
- Fresh final `npm run test:unit` **passed 157/157**, zero failed/skipped, Node
  v22.23.4; log `/private/var/folders/fv/fb864z9n6gz9g1yvq_jxf0jr0000gn/T/opencode/all-activities-final-units.log`.
  `npm run validate:content` **passed**. New guards cover bounded panel inventory,
  annotation schema/runtime parity and original note-example hard breaks.
- Final affected command **passed 304/304**, 76 each Chromium, Firefox, WebKit and
  mobile Chromium, zero failed/skipped/flaky/runner errors:
  `caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/middle-activities-presentation.spec.mjs tests/browser/middle-presentation.spec.mjs tests/browser/structure-presentation.spec.mjs tests/browser/evidence-presentation.spec.mjs tests/browser/middle-lesson.spec.mjs tests/browser/components.spec.mjs tests/browser/writing-reference.spec.mjs --workers=1 --max-failures=1 --output=test-results/all-activities-final`.
  Start `2026-10-27T01:56:10.503Z`, duration 1133.610561 seconds. Archived report
  `milestone-5-all-activities/final/results.json`, SHA-256
  `1d240c21306234c0fea7062f9a592eaeee95b5d54368c8615f26a37d9bee3ef2`.
  No command remains running. Includes all four projects and previous
  page comparisons, complete Middle content/gates/fixtures/rollback/print, shared
  component keyboard/ARIA/lifecycle and writing/model/clipboard regressions.
- Agent file-based review: restored desktop Tasks A/B/C, quiz overview/question
  panel and group activity; expanded communication/speaking examples and mobile
  collaboration view are readable, complete and consistently grouped/shaded.
  Selected 760/390px original/restored pairs and initial report archived under
  `milestone-5-all-activities/initial/`. Aligned caution/example cards and wrapping
  controls retain responsive growth rather than fixed heights/clipping. Final
  Chromium/WebKit communication, integrated-practice and knowledge-check pairs
  archived under `final/`; restored WebKit communication/quiz files reviewed as
  complete/readable, with original callout/panel hierarchy and retained cues.

No original baseline/seal updated, content/policy/accessibility/overflow assertion
relaxed, automatic retry, forced click, timeout/security change, commit, merge,
push, tag, publication or Pages change. Entire repository suite and interactive
browser/actual zoom/AT/real-device/print-preview/physical-print checks are not
claimed for this scoped correction. Original replay remains pinned to
`0b5d2297e7cbc19bd59cde750492dd28e3983ca0`.
