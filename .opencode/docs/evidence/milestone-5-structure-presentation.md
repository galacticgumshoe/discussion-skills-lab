# Structure to substance presentation follow-up — 2026-10-26

Owner supplied two inline comparisons of localhost (left) and main (right):
Structure-card labels and the classification activity. Scope is this section,
not a global lesson redesign or migration of another lesson. Actual starting HEAD
`b93d74548c39ec1dc7d14d484b8033ea0411379b`, branch
`refactor/shared-components`; all inherited uncommitted work is preserved.

## Explicit owner preferences retained

- Keep the migrated larger **Two Ways to Help a Discussion** heading. The existing
  `clamp(1.85rem,3.4vw,2.6rem)` rule is unchanged and protected by a new test.
- Keep permanent explored status visible on an explored front as well as its back.
  The existing single active-face marker remains unchanged; tests flip back and
  forth and verify both placements. Do not restore main's back-only visibility.

## Corrections

- The original `.pill` labels had been flattened into Markdown body text, which
  combined the label and description on one line. Both labels now use the existing
  `frontTitle` field: `PROCEDURAL` / `SUBSTANTIVE` moved from the beginning of
  `bodies/{procedural,substantive}-front.md` to
  `content/middle/activities/structure-cards.json`. No label/prose is deleted or
  duplicated. Structure-only CSS restores rounded pale-blue pills, teal bold
  labels and paragraph typography below them. No new card schema/controller.
- The classification reveal group lost the original `.activity` composition.
  A finite `activity` group tone is now accepted by the existing schema/runtime
  validator, and applied to this reveal group only in the production manifest.
  Middle CSS restores its white background, pale teal border, rounded corners,
  responsive padding and uppercase teal activity title. No arbitrary CSS field.
- Classification-only CSS restores the original prompt typography, two answer
  columns above 600px/single column below, neutral and selected correct/incorrect
  palettes, bold/inset selected cue, feedback panel/background/left accent, and
  bordered Next/Review control with a rounded score badge alongside it.
- The extra generic `Question n of 5` counter is hidden only in classification,
  where the visible original prompt already contains `n of 5`. No instructional
  wording or original counter is removed. Other sequences retain their counters.
- The exclusive extraction helper now recognizes original front `.pill` labels
  and original activity reveal wrappers so those presentation distinctions are
  not flattened again. No regeneration/overwrite of reviewed content performed.

All changes are scoped to presentation metadata/content partitioning and Middle
CSS. No component interaction/state implementation, fixed mapping/codec/key,
answer order/key, explanation, gate, reveal condition, draft or credit rule changes.
Opening/Final engines and their styles remain untouched. Cards retain intrinsic
growth; no text clipping/fixed-height cap introduced.

## Verification

- Initial `npm run test:unit` **passed 153/153** and content validation passed.
  After additional regression guards, final fresh unit/content outcomes pending.
- Initial Chromium comparison command:
  `npm run test:browser -- tests/browser/structure-presentation.spec.mjs --project=chromium --workers=1 --max-failures=1 --output=test-results/structure-presentation-first`
  **passed 6/6**, both mounts, 760/1440/390px. Direct original/current computed-style
  checks cover badges, outer activity, title/prompt, neutral/correct/incorrect
  answers, feedback/error box, Review control and score pill. It also checks
  responsive option layout, approved larger heading, both explored faces, and
  wrong-after-credit reload compatibility. Subsequent refinements additionally
  restore original description paragraph line height/margins and source hover/
  focus affordances; these are included in final verification, not inferred from
  the initial pass.
- Initial file-based review of all three viewport captures confirms pill labels,
  readable descriptions, larger heading/front explored cue, bordered activity,
  complete feedback and responsive answers. Final-source capture review pending.
- First final command:
  `caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/structure-presentation.spec.mjs tests/browser/middle-presentation.spec.mjs tests/browser/flashcard-presentation.spec.mjs tests/browser/middle-lesson.spec.mjs tests/browser/components.spec.mjs --workers=1 --max-failures=1 --output=test-results/structure-presentation-final`.
  Shell `sh_17abb8889001J1OFdXVr78mwTs`, fresh units **154/154 passed** and content
  validation **passed**. Browser result: **94 passed/one new Firefox geometry
  assertion failed, 105 not run**. Report preserved in
  `milestone-5-structure-presentation/first-affected-results.json`.
  Includes all four configured projects, both mounts, earlier presentation/card
  regressions, complete Middle content/gates/progress/rollback/print and shared
  component keyboard/ARIA/lifecycle/overflow assertions.
- The new badge/description edge assertion compared two separately transformed
  rectangles with exact floating-point inequality. Firefox returned
  `543.7000274658203` vs `543.7000122070312` (0.0000152587890625px difference).
  The new visual assertion now allows **less than one 1/64px layout unit** at
  that shared edge; it still rejects overlap beyond that numerical tolerance.
  This is a documented geometry-test correction, not a runtime layout change or
  content/ARIA/overflow/policy assertion relaxation. Runtime/content source unchanged.
- Same 200-test affected command rerunning with
  `--output=test-results/structure-presentation-confirmed`, shell
  `sh_17ac2800c0011YBUPIGt2kDayF`; **passed 200/200**, 50 each Chromium,
  Firefox, WebKit and mobile Chromium, zero failed/skipped/flaky/runner errors.
  Start `2026-10-27T00:28:50.564Z`, duration 878.214199 seconds. Archived report
  `milestone-5-structure-presentation/final/results.json`, SHA-256
  `611e16cdd16e43d5a48e8b3e30f67827572607a0ded028d10ce065206fd968dc`.
  No command remains running. Final units **154/154** and content validation pass.
  Paired final-source Chromium 760/390px captures are archived and the 760px pair
  reviewed: original activity/pill typography and palette restored, with the
  explicitly preferred larger heading and front explored cue retained.
- Final Chromium/WebKit 760px comparison captures archived under `final/`;
  WebKit restored capture reviewed as readable and complete with the original
  activity styling and approved heading/front-marker differences. Earlier
  Chromium desktop/mobile file review applies to the unchanged runtime source.

Original-engine replay remains pinned to
`0b5d2297e7cbc19bd59cde750492dd28e3983ca0`; source seals/baselines unchanged.
No content/policy assertion, timeout, retry or security setting relaxed. The new
geometry-test tolerance is explicitly recorded above. Entire repository
browser suite and interactive browser/actual zoom/AT/device/print preview/physical
print checks are not claimed for this correction. No commit, merge, push, tag,
publication or Pages setting change performed.
