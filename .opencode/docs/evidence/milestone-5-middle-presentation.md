# Middle page presentation follow-up — 2026-10-26

Owner supplied an inline side-by-side screenshot, localhost on the left and
published Middle on the right. It exposed broader regressions after the prior
card-only fix. These are treated as regressions, not dismissed as acceptable
migration layout differences. Work starts at unchanged HEAD
`b93d74548c39ec1dc7d14d484b8033ea0411379b`, branch
`refactor/shared-components`; inherited uncommitted work is preserved.

## Causes and corrections

- The migration flattened `lead`, `smallnote`, `font-semibold` and `font-bold`
  paragraph roles into ordinary Markdown. The font family itself was unchanged,
  but size, color and weight were lost. Markdown blocks now accept a closed
  `textStyle` enum (`lead`, `note`, `instruction`, `label`), checked by the existing
  runtime/development validation and rendered via fixed classes. Existing source
  paragraphs are annotated without changing their wording or meaningful emphasis.
  The exclusive extraction helper now preserves these roles on future extraction.
- Every nested stack group added a grid gap, every loader added vertical margin,
  and paragraph margins compounded them. Middle-only rules now keep those
  structural wrappers neutral, restoring explicit outer spacing instead. Welcome
  heading/lead/panel/instruction/cards recover the original relative positions.
- The generic shared callout's mint background/border was not Middle's pale-blue
  panel. Middle-only overrides restore the panel palette, border, radius and
  desktop/mobile padding. Other lessons' generic callouts remain unchanged.
- The flow's converted paragraphs used pill-shaped badges with different padding,
  size, gap and line height. Middle-only rules restore the original rounded-square
  badges. Roundtable grouping likewise uses the original two-column/one-column
  pattern and speaker label palette rather than a generic left-accent blockquote.
- The 230px card-grid minimum forced two columns at the owner's narrow desktop
  width even though text could wrap. Welcome now uses three `minmax(0,1fr)` columns
  above the original 850px breakpoint, and a single column below. Two-card groups
  use two flexible columns above 600px and one below. Text remains intrinsically
  sized and can wrap; no fixed-height cap, clipping or content omission introduced.
- Rich expandable and model Markdown inherited `white-space:pre-line`, retaining
  formatting newlines as extra visual whitespace. Only rich Markdown bodies now
  use normal whitespace. Plain-text bodies/newlines and explicit Markdown hard
  breaks remain intact. State/event/storage behavior is unchanged.

Content files change only bounded presentation metadata. No wording, answer,
feedback, model, source order, gate, reveal, key, codec, fixed index or draft/earned
credit behavior changes. No new dependencies or production build step. Existing
Opening/Final lesson entries and engines are untouched.

## Verification history

- `npm run test:unit` passed **153/153** and `npm run validate:content` passed after
  adding role metadata/schema/runtime checks. Later final results pending below.
- Initial new Chromium comparison selected the loader's hidden status paragraph
  instead of a flow badge; selector corrected to the actual rendered badge.
  The next run caught a real line-height difference (paragraph 1.65 vs span 1.5),
  corrected in CSS. The next caught a welcome selector targeting a descendant
  rather than the activity host itself, corrected in CSS. Assertions retained.
- Corrected initial welcome comparison **passed 6/6**, both mounts at 940, 1440 and
  390px. Expanded comparison **passed 8/8** on Chromium, adding all-section prose
  roles and rich-panel whitespace checks. Captures from that passing source are
  under `test-results/middle-presentation-prose/`.
- File-based review of paired 940px Welcome captures confirms original typography,
  matching relative spacing/palette/flow shape, and all three wrapping cards in
  one row. The speaking-section capture retains complete text and the corrected
  lead/panel palette. Shared control styling/current-face-on-refresh and a teal
  focus outline remain documented differences, not pixel-perfect parity claims.
- First final command (**failed: 148 passed/one WebKit model-save failure,
  99 not run**):
  `caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/middle-presentation.spec.mjs tests/browser/flashcard-presentation.spec.mjs tests/browser/middle-lesson.spec.mjs tests/browser/components.spec.mjs tests/browser/writing-reference.spec.mjs --workers=1 --max-failures=1 --output=test-results/middle-presentation-final`.
  Shell `sh_179bc4f33001mWTu5qyce7Q830`; fresh units **passed 153/153**, zero
  failures/skips, and content validation **passed**.
  Includes four projects, root/repository mounts, existing card/keyboard/ARIA/state,
  writing/model/reference and whole-Middle integration/rollback/print checks.
- The failing root WebKit rollback test clicked the application model button but
  did not save its flag. No runtime/save code was changed to explain it away.
  Trace shows repeated instability/re-scroll before pointer dispatch; excerpt
  and screenshot archived in `milestone-5-middle-presentation/`. Root cause remains
  unestablished. A temporary passive pointer-event diagnostic with otherwise
  unchanged assertions passed **6/6** (both mounts, `--repeat-each=3`); event targets
  and model saves were correct each time. Diagnostic listeners/logging were then
  removed. This diagnostic does not turn the failed broad run into a pass.
- The same 248-test affected command is rerunning, unchanged runtime/test source,
  with `--output=test-results/middle-presentation-confirmed`, shell
  `sh_179c471f5001F9yNk0YFxqb5KH`. **Passed 248/248**, 62 each Chromium,
  Firefox, WebKit and mobile Chromium, zero failed/skipped/flaky/runner errors.
  Start `2026-10-26T19:51:20.290Z`, duration 638.821129 seconds. Archived report
  `milestone-5-middle-presentation/final/results.json`, SHA-256
  `2276a565492d7be5723b6e341cee354595dda67f755ae427aa6a90ac4c98a51e`.
  No automated retries, timeout changes, force clicks or weakened assertions were
  introduced. No command remains running. Earlier failure remains recorded; its
  cause is not declared fixed by the unchanged passing rerun.
- Final Chromium/WebKit 940px original/restored captures archived under `final/`
  and reviewed: normal typography/spacing/pale-blue panel/flow badges, all three
  wrapping cards in one row, complete readable text. Prior mobile/speaking review
  remains applicable to the unchanged source. Final units **153/153** and content
  validation passed. Entire repository browser suite was not rerun for this scoped
  follow-up; manual zoom/device/AT/print limitations remain as below.

No original fixture/baseline updated, assertion relaxed, retry/forced click/timeout
or security change. No interactive browser, actual browser zoom, real-device,
assistive-technology or physical-print test is claimed. No commit, merge, push,
publication, tag or Pages setting change performed.
