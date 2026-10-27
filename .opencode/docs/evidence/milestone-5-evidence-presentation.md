# Make contributions count presentation follow-up

Owner supplied four inline main/local comparisons for Middle section 02. Scope:
example callouts, both research-model card faces, Activity 2/research/writing
composition and checkbox styling. Starting HEAD
`b93d74548c39ec1dc7d14d484b8033ea0411379b`, branch
`refactor/shared-components`; inherited uncommitted work retained.

## Preserved preferences and content

Keep the explored cue in expandable row headers and on explored card fronts as
well as backs. Keep the larger migrated section headings. Prior Welcome and
Structure corrections remain intact.

The owner noticed the assembly fact-check notice in local but not main's capture.
The pinned original `assets/js/middle.js` explicitly sets that exact notice on
assembly; the original HTML has `#assembly-status.smallnote`. It clears on reload,
unlike the durable assembled output. The notice is therefore **retained**, not
removed as a migration addition. Its original small-note typography is restored.
New browser comparisons assemble in both engines and verify identical notice and
output. No warning, answer, feedback, model or instructional wording is discarded.

## Changes

- Four `activities/bodies/*-panel.md` evidence examples now use Markdown blockquotes
  instead of flattened ordinary paragraphs. Middle evidence-only rules give them
  the original pale callout background, teal left border, padding/radius and line
  height. Rich body top padding no longer duplicates the native summary's existing
  gap. The retained explored cue has separation from its row title.
- Both research-model cards move original bold short headers to existing
  `frontTitle`/`backTitle` fields in `research-model-cards.json`; the four Markdown
  bodies retain only the unchanged descriptions. Native-button content wrappers
  render these headings on their own row, preserving semantic `strong` emphasis.
  Original front eyebrow typography and ordinary bold back titles are restored;
  descriptions use the original paragraph line height. No new card schema/API.
- The research reveal group uses the existing bounded `activity` tone. An existing
  nested stack groups the original writing subsection, retaining the three-group
  depth cap. Scoped Middle CSS restores the activity panel/title, caution shading/
  gold accent, research prompt/neutral/selected/error palettes, feedback boxes,
  writing divider, fields, primary/secondary controls, model example and teal
  20px checkboxes. Research answers remain one column; no completion policy changes.
- `mountWritingActivity` groups the real assemble/copy/model controls before the
  output label **only for the existing `middle-evidence` profile**. DOM/keyboard
  order matches visual order, not CSS reordering. Copy/model remain `type=button`,
  assembly remains the form submit, and clipboard/save/lifecycle implementations
  are unchanged. No extra field/control is added to fixed legacy mappings.
- The exclusive extractor preserves these original example/card-title/writing
  group distinctions; it was not run in overwrite/regeneration mode.

Original source remains pinned to `0b5d2297e7cbc19bd59cde750492dd28e3983ca0`.
No codec/storage key/gate/reveal/draft/credit semantics, lesson engine, dependency,
production build, source seal or original baseline changed.

## Verification

- Initial unit/content checks passed 154/154 and validation. New final guards for
  example structure, title partition, writing group and fact-check notice raised
  the unit suite: final `npm run test:unit` **passed 155/155**, zero failed/skipped,
  Node v22.23.4. `npm run validate:content` **passed**.
- First new Chromium comparison caught an incorrect teal assumption for original
  front title color. Main uses navy; CSS corrected to the measured original color,
  without changing the assertion. First command failed one/five not run.
- Corrected `npm run test:browser -- tests/browser/evidence-presentation.spec.mjs --project=chromium --workers=1 --max-failures=1 --output=test-results/evidence-presentation-reviewed`
  **passed 6/6**, root/repository at 760/1440/390px. Exact style checks cover all
  callouts, front/back headings and descriptions, activity/caution/research states,
  fields/labels/buttons/status/model/checkboxes. Reading order, readonly output,
  identical assembly notice/value, optional model reload and retained credit pass.
- Prior-page regression command:
  `npm run test:browser -- tests/browser/middle-presentation.spec.mjs tests/browser/structure-presentation.spec.mjs --project=chromium --workers=1 --max-failures=1 --output=test-results/evidence-prior-pages`
  **passed 14/14**; archived `milestone-5-evidence-presentation/prior-pages-results.json`,
  SHA-256 `52a5a23bd04efe82193792a207d90fd8e75abe9c7f1742e5698a29f95f365521`.
- Final four-project affected command **passed 224/224**, 56 each Chromium,
  Firefox, WebKit and mobile Chromium, zero failed/skipped/flaky/runner errors:
  `caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/evidence-presentation.spec.mjs tests/browser/middle-lesson.spec.mjs tests/browser/components.spec.mjs tests/browser/writing-reference.spec.mjs --workers=1 --max-failures=1 --output=test-results/evidence-presentation-final`.
  Start `2026-10-27T01:15:29.034Z`, duration 779.848483 seconds. Archived report
  `milestone-5-evidence-presentation/final/results.json`, SHA-256
  `e3c38b2c59262c790869bcd552ddecd9449211ba826d6a71957fc69c480c63f6`.
  No command remains running.
- Agent file-based review of corrected 760px section capture confirms readable
  example callouts, separate card titles, original activity/feedback/caution/model
  grouping, action buttons above output and enlarged teal checkboxes. Paired
  760/390px original/restored captures archived separately. Final Chromium/WebKit
  760px pairs archived in `final/`; restored WebKit file reviewed as complete,
  readable and consistent with the same corrections and retained cues. No
  interactive browser/AT/device/actual zoom/print-preview
  or physical-print check claimed; entire repository suite not rerun for this scope.

No content/policy/accessibility/overflow assertion relaxed, automatic retry/forced
click/timeout/security change, commit, merge, push, tag, publication or Pages change.
