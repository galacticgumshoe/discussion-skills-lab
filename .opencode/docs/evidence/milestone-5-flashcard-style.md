# Middle flashcard presentation follow-up

Owner reported regressions against the published Middle lesson and supplied two
cropped Desktop screenshots (2026-10-26 08:13:06 main / 08:12:49 local). Both were
read for comparison, not modified or copied into the repository. Work remains on
`refactor/shared-components`, starting HEAD `b93d74548c39ec1dc7d14d484b8033ea0411379b`;
all inherited uncommitted milestone-5 work is retained.

## Confirmed causes and correction

- Markdown's formatting newlines were preserved by inherited `white-space:pre-line`
  after prose/list blocks became phrasing spans for valid native buttons. Rich
  Markdown card copies now use normal whitespace; explicit Markdown hard breaks
  remain real `br` elements. Lists have compact original line spacing/margins.
  Plain-text card bodies keep their intentional newline handling.
- Shared front styling explicitly applied bold weight, and the converted heading
  also received bold styling. Front prose now uses normal weight, preserving
  explicitly authored `strong` content. No font-family change was needed.
- The flip hint's auto top margin pushed the content to the top. The hint is now
  independently anchored lower-right, leaving front content vertically centered.
- The exploration marker was a child outside the rotating faces. One marker now
  lives **inside the active face**: below the back explanation/list, pale teal on
  navy; on an already-explored front it is a small teal lower-left cue. This keeps
  durable exploration visible without external height or duplicated status nodes.
- Both faces retain intrinsic measurement and can grow at narrow widths/enlarged
  text. The ordinary Welcome cards return to the original 260px minimum. Symmetric
  front insets reserve space for footer labels without shifting the content center;
  labels can wrap independently rather than overlap at enlarged text sizes.
- Content-only wrappers retain the original accessible descriptions, separately
  from the moved status cue. Native keyboard activation, inactive-face ARIA,
  reduced-motion/3D behavior and progress callbacks remain unchanged.

Only `assets/js/components/flashcards.js`, card-specific rules in
`assets/css/components.css`, a card-only weight override in `assets/css/middle.css`
and new presentation regression tests are changed by this follow-up. No content,
answer, completion/reveal policy, storage key/codec or legacy Opening/Final engine
is changed. The new shared component is not loaded by the legacy pages.

## Checks and observations

- `npm run test:unit` passed (152/152) and `npm run validate:content` passed before
  focused browser checks; final commands/results will be recorded on completion.
- First focused command stopped with 3 passes/one accessible-description failure:
  the moved marker had become part of the face description. Added content-only
  description wrappers; preserved the original assertions, not a relaxed test.
- Subsequent focused command had 91 passes/one WebKit enlarged-card scroll-height
  failure, 44 not run. No content was visibly clipped, but the existing strict
  overflow assertion was retained. A fresh WebKit diagnostic measured the same
  849.390625px card before/after a zero native-button line height: scroll/client
  changed from 856/849 to 849/849, while its actual geometry stayed unchanged.
  Faces already own an explicit line height; removing the button's unused baseline
  strut fixes the phantom overflow without clipping or changing prose typography.
- New browser checks compare current/root and repository-prefix cards directly
  with the immutable original-engine replay: font family/size/weight/line height,
  Welcome height, front center, list row gaps, internal marker placement and credit
  after reload. Additional checks cover all nine cards at 320px/enlarged text,
  including footer/content overlap and back-face overflow.
- Final affected-browser command:
  `caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/flashcard-presentation.spec.mjs tests/browser/components.spec.mjs tests/browser/middle-lesson.spec.mjs --workers=1 --max-failures=1 --output=test-results/flashcard-style-final`.
  **Failed: 19 passed/one Chromium whole-journey timeout, 124 not run.** The
  presentation checks passed, but keyboard activation in the existing full journey
  exceeded the test budget. Several preceding tests also took unusually long;
  no root cause is established and no timeout/assertion was changed. Final unit
  checks passed **152/152**, zero skipped/failed; content validation passed.
- Unchanged affected-suite rerun `test-results/flashcard-style-confirmed`
  **failed: 97 passed/one WebKit enlarged-card overflow, 46 not run**. The
  original/current style comparisons and all-nine-card enlarged-text checks passed
  in Chromium/Firefox/WebKit, but the integrated flip-then-enlarge sequence still
  exposed native-button overflow (859 scroll vs 849 client). A repeated unchanged
  WebKit diagnostic reproduced it (one failed/five not run).
- Temporary detailed measurement confirmed every face/content/status rectangle and
  inner grid fit; only the native outer button reported extra overflow. Grid-only,
  perspective-transform relocation, layout containment and extra rendered-frame
  readiness experiments did not solve the exact failing test and were removed.
  Temporary metric logging was removed; existing assertions/timing are unchanged.
  One initial diagnostic grep matched no tests; no pass attributed to it.
- The final correction uses a block native button with `appearance:none` and a
  full-height intrinsic grid child, avoiding the flex-button layout. Both exact
  root/prefix WebKit integrated checks then **passed 2/2**, unchanged assertions,
  `npm run test:browser -- tests/browser/middle-lesson.spec.mjs --project=webkit --grep 'fresh reference-only print' --workers=1 --max-failures=1 --output=test-results/flashcard-webkit-block`.
  There is no overflow clipping, fixed-height cap, state/content change or removed
  flip perspective. Normal front/back intrinsic sizing is retained.
- Final unit checks **passed 152/152**, content validation **passed**, and the
  entire affected suite **passed 144/144**, 36 each Chromium/Firefox/WebKit/mobile
  Chromium, both root/repository mounts, zero failed/skipped/flaky/runner errors.
  Exact browser command is the affected-suite command above with
  `--output=test-results/flashcard-style-block-final`; duration 462.318637 seconds,
  start `2026-10-26T14:05:32.927Z`. Archived report `milestone-5-flashcard-style/final/results.json`,
  SHA-256 `61433458953a14bc2f005297ba29ae845470013fb93a2783a2bb73a0225fb89c`.
  Final-source Chromium/WebKit desktop and mobile Chromium comparison captures
  were archived separately in `final/`; restored cards reviewed as readable, with
  compact lists/internal cues/centered fronts and original ordinary height.
  No background command remains running. The complete repository browser suite
  was not rerun for this scoped follow-up; historical 720/720 predates the styles.
- File-based Chromium review of the paired Welcome captures confirms restored
  ordinary height, typography, centered front and compact back lists/internal cue.
  Focus outline differs (original orange/current shared teal); not modified for
  screenshot equality. The enlarged speaking backs remain readable and unclipped.
  Reviewed copies are preserved separately in `milestone-5-flashcard-style/`.

No original baseline/fixture was overwritten. No interactive browser/device/AT or
actual browser-zoom test is claimed; screenshots and enlarged text are automated
file-based evidence. No commit, merge, push or publication performed.
