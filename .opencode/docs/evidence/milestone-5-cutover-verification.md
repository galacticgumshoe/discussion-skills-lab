# Milestone 5 remaining migration and atomic cutover

Starting HEAD: `b93d74548c39ec1dc7d14d484b8033ea0411379b`, branch
`refactor/shared-components`. Inherited question/checklist/policy/archive/reference
work and its documentation were retained. No baseline was resealed.

## Implementation and preservation

- `tests/helpers/extract-middle.mjs` mechanically extracts the pinned
  `0b5d2297e7cbc19bd59cde750492dd28e3983ca0` HTML into Markdown and JSON,
  exclusively creating files rather than overwriting reviewed content. It is a
  development tool, not a production build or alternate content source.
- `content/middle/lesson.json` declares the original nine ordered sections and
  heading IDs, nineteen shared activities, and seven separately identified
  reveals. `lessons/middle/config.json` declares the unchanged v1 key.
- Four card collections (nine globally indexed cards), four expandable collections
  (fifteen panels), research selection, separate visible application A/B questions,
  and both writing/model activities now have content files. Existing five banks,
  two checklists, archive and displayed reference remain their original extraction.
- Markdown bodies are explicit source properties, never guessed HTML. The same
  checked loader/Markdown/sanitizer prepares them before mounting components.
  Native card buttons receive phrasing spans with preserved list/listitem roles;
  source emphasis remains semantic `strong`. No interactive Markdown is allowed.
- The small static `middleRegistry` bridges only research's existing correct-ever
  flag. The shared multiple-choice/sequence controllers implement every question,
  including all-at-once application A/B and a comparison affordance that retains
  last choice, feedback and earned credit without a save.
- The shared renderer takes a statically imported reveal policy; content supplies
  stable reveal identities, not executable conditions. Original `view-N` and
  heading hooks are generated explicitly. No gate reads rendered copy or counts.
- Optional Middle models use the already verified adapter's model flags and
  `data.dslUi.models` v1 bindings. All fields retain fixed initialized mappings;
  research output remains readonly and application writing remains editable.

## Verification log

- Prerequisites: `npm run test:unit` **150/150 passed**;
  `npm run validate:content` passed;
  `caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/middle-migration.spec.mjs tests/browser/middle-reference.spec.mjs tests/browser/lesson-harness.spec.mjs`
  **176/176 passed**, all four projects.
- First extraction validation stopped on strict Ajv's `strictRequired`: nested
  alternatives needed local property declarations. Added them without disabling
  strictness. Validation then passed. Initial cumulative units had two failures
  from the intentionally changed Middle CSS byte boundary; retained its exact
  original prefix and added the separately scoped migrated-Middle suffix boundary.
- Initial Chromium whole-lesson harness: **8/8 passed**, root/prefix,
  every alternative question/feedback, fresh journey, original prose, fixtures,
  immediate inputs/models/cursors and wrong-after-credit.
- Expanded units: **152/152 passed**. Expanded focused browser run stopped at
  **99 passed / 3 failed / 2 interrupted / 128 not run**: the new emphasis oracle
  included the original empty generated `strong#quiz-score` placeholder. Filtering
  empty placeholders preserves every nonempty emphasis assertion; no content,
  source fixture, timeout, security setting, retry or substantive assertion changed.
  This failed run is not counted as acceptance.

Final pre-cutover and post-cutover results, capture review and limitations will be
recorded below as they are actually performed; this document is not a completion
claim while those results are pending.

- Corrected complete pre-cutover harness command:
  `caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/middle-lesson.spec.mjs --max-failures=1`
  **60/60 passed**, 15 each Chromium/Firefox/WebKit/mobile Chromium, root/prefix,
  2.1 minutes. All sections passed before replacing either live Middle file.
- Cutover: `middle.html` keeps its exact surrounding shell with a dedicated view
  container/loading/warning hooks and one module script; `assets/js/middle.js` is
  a thin static import/bootstrap entry. The old writer is not loaded. Source-boundary
  tests retain original Opening/Final/license bytes, the entire original Middle CSS
  prefix, the immutable seals and the explicitly transformed Middle shell.
- Cutover unit rerun initially caught only a terminal-LF difference in that shell
  transformation; explicitly adding the LF resolved both byte-boundary failures.
  Repeated final-source units **152/152 passed** and content validation passed.
- Public-page focused command:
  `caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/baseline.spec.mjs tests/browser/persistence.spec.mjs tests/browser/policy.spec.mjs tests/browser/print.spec.mjs tests/browser/middle-lesson.spec.mjs --project=chromium --workers=1 --max-failures=3`
  **64/64 passed**, 2.5 minutes. Includes Opening/Final baseline journeys,
  current/pinned replay fixtures, authorized Middle repairs and new full-page
  extended-v1 writing/model rollback on both original mounts. Subsequent final-run
  tests also strengthen per-item explored/check/selection fixture assertions and
  verify assembly credit before clearing its source inputs/checking the last boxes.
- Final full command is `caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser`;
  its first actual result **passed 720/720**, 180 each Chromium/Firefox/WebKit/mobile
  Chromium, zero skipped/flaky/unexpected tests or runner errors, 753.538991 seconds.
  Start `2026-10-26T00:01:07.210Z`, report SHA-256
  `45cdeabbd8af0ef28ef01596e8d59149d86234aca447893de16bb9c2f1f5ce57`.
  Actual stats/project outcomes and 28 exclusively archived capture hashes:
  `milestone-5-cutover/verification.json`.

### Final image-review correction

Review of the archived public captures identified an extra Communication heading
paragraph. The extraction fallback had included a heading-only source wrapper as
body text after that heading was already represented in manifest metadata.
Removed only the extra `fragment-22.md` reference/file created by this session;
the original heading/eyebrow remain unchanged. There are now **68** newly extracted
Markdown files, not 69. Every section now asserts its main heading occurs once.
This is a duplicate-publication correction, not deletion of a legacy variant.

Also cleared the session-only comparison instruction after an answer/navigation
event (matching the original lifecycle, without clearing choice/feedback/credit),
and aligned the standalone multiple-choice schema's new application profile with
its already-supported runtime boundary. Its validity now has an explicit unit
assertion. No source answers, v1 mappings, gate policies or original fixtures changed.

The same full command on the corrected source, shell
`sh_1759039d8001bHBS735ySQwZ2Y`, **failed: 718 passed / two Firefox failures**,
755.990230 seconds. Chromium/WebKit/mobile Chromium each passed 180/180; Firefox
passed 178/180. Start `2026-10-26T00:15:51.780Z`, report SHA-256
`a995efd71101c7c869e5509c26bddb2000c6581a0cced4990d4f773a1631a225`.
All 68 new whole-Middle checks passed. Failures:

- Unchanged Opening `/discussion-skills-lab/opening complete real activities...`:
  builder output stayed empty after the real pointer click, despite both synthetic
  inputs being filled. The retained partial trace excerpt records the failed click/
  output observation, **not a proven root cause**.
- Pinned original Final unsafe-state characterization: worker exited with `SIGBUS`.
  No site assertion failure/root cause is inferred from the process signal.

`reviewed/verification.json` preserves actual stats/failures and 28 separately copied
corrected-source artifacts. Final file review confirms Communication's duplicate
paragraph is gone, its original heading/prose remain, long card is unclipped, and
fresh reference PDFs from ordinary/root and reference/prefix views retain five
colored groups, all text/goal emphasis and no controls/questions/leading blank.
Two PDFs were rasterized using macOS `sips` and visually read; the two named rendered
PNGs are derived file-review evidence, not browser screenshots or manual previews.

Unchanged diagnostic command:
`caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/baseline.spec.mjs tests/browser/persistence.spec.mjs --project=firefox --workers=1 --max-failures=1 --repeat-each=3 --grep '/discussion-skills-lab/opening complete|original final unsafe' --output=test-results/middle-final-firefox-diagnostic`
**Passed 6/6**, both exact identities three times, 24.6 seconds. This does not turn
the failed entire-suite result into a pass. No runtime, test helper, assertion,
timeout, runner config or browser security setting changed for this diagnostic.
Its ordinary JSON report was cleared when the next default-output suite started;
the executed command/completion output is recorded, no unavailable report hash claimed.

A third entire run of the same full command, shell
`sh_1759de1b6001NEFmDCN9cKvqna`, **failed: 719 passed / one Firefox failure**,
580.046190 seconds, zero skipped/flaky/runner errors. Chromium/WebKit/mobile
Chromium each passed 180/180; Firefox 179/180. Previous two failing identities
passed. The remaining failure was the unchanged Final reference-pilot prefix
content/preload test, reported as `browserContext.close: Test ended` with Firefox
Juggler `NS_ERROR_INVALID_CONTENT_ENCODING`, sandbox-extension and progress-listener
errors. No failed Middle assertion or proven application root cause is claimed.
Actual stats/error: `reviewed/third-full-results.json`; report SHA-256
`bb4838fbd90d3d4674881c37f62ef235eef0b76d82ea74f11ab4b0182938ef97`, start
`2026-10-26T00:30:44.137Z`.

One final full command now uses a **single worker** to avoid concurrent contexts,
without changing any project, viewport, assertion, timeout, security setting or
runner configuration file:
`caffeinate -i env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- --workers=1`.
Shell `sh_175a7534f001AI5WDnX0TxbSmh` **passed 720/720**, 180 each Chromium,
Firefox, WebKit and mobile Chromium, zero failed/skipped/flaky tests or runner
errors, **1233.707938 seconds**. Start `2026-10-26T00:41:03.169Z`; report SHA-256
`bc3d76524d8630068a028328117da4e4bfe6e7046a98ef23905d48517a76fb64`.
Actual inspected stats/project outcomes are retained in
`milestone-5-cutover/final-full-results.json`. This is a single complete passing
invocation on corrected source, not combined partial coverage. No runtime/test
source changed during it. The earlier failures remain recorded; single-worker
success is not a proven general Firefox/root-cause fix.

## Final acceptance

- **Milestone 5 implementation, atomic cutover and required automated acceptance
  complete**, with manual follow-ups below explicitly pending and unclaimed.
- After the final browser result, `npm run test:unit` **152/152 passed** again;
  `npm run validate:content` and `git diff --check` passed. HEAD remains
  `b93d74548c39ec1dc7d14d484b8033ea0411379b` on `refactor/shared-components`.
- All four projects pass current root/prefix, both pinned replay mounts, unchanged
  Opening/Final/pilot/security checks, shared primitives and the complete Middle
  migration. All 68 new whole-Middle checks are included. No required project/test
  omitted, no config/security/timeout/assertion change, no canonical baseline update.
- Corrected-source captures under `reviewed/` were produced by the same unchanged
  runtime as the final passing run and remain the file-reviewed visual/PDF evidence.
  The original discovery captures (including duplicate heading) remain separately
  preserved, not relabeled as approved final views.
- No interactive Chrome/Mac Safari preview, real browser zoom, screen reader,
  physical device, clipboard permission dialog or physical-print test claimed.
  These remain recorded owner follow-ups, not fabricated passes or release approval.
- No commit, merge, push, tag, publication, Pages change, Final migration or global
  CSS consolidation performed. Stop at milestone 5.

Pre-cutover file review inspected desktop application A/B/writing composition,
mobile Welcome, and the long speaking-card back at 320px/enlarged text. No clipping
or missing source text was seen. Review identified small heading/speaker hierarchy
details; scoped heading sizes, separate blockquotes and flow badges were tightened
before public cutover. The fresh ordinary-view PDF parsed as one complete Letter
page with five groups, no questions/controls/leading blank. Final public captures
will be reviewed separately; this is not interactive print-preview evidence.

## Permitted presentation differences

Cards size intrinsically to both faces, with a persistent explored cue and a
front-face initial presentation after refresh (the legacy format stores exploration,
not current face). Expanded prose preserves paragraphs, emphasis and hard breaks.
Shared native controls have bounded responsive spacing and can be taller than the
legacy controls. Source roundtable speakers retain separate blockquote groups;
callouts, caution panels, source examples and flow composition remain bounded
renderer profiles. Reference item colors/classes/numbered print overrides remain.
No content or answer/policy change is justified as layout drift.

## Manual evidence limits

No interactive Chrome/Safari print preview, actual 200% browser zoom, screen reader,
physical device or physical printing has been performed by this agent. Enlarged
text geometry, headless PDFs and file-based image/PDF reviews are separate kinds
of evidence. Prior owner acceptance is not reattributed to this new cutover.
