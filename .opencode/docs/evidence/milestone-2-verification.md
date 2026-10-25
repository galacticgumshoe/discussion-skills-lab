# Milestone 2 verification — 2026-10-25

Starting HEAD: `5fb48363d73562b2341768d38f10087528c964d0`.
Branch: `refactor/shared-components`; clean at entry. No commits or publication.
Node v22.23.4 / pinned Playwright 1.61.1; existing four browser projects unchanged.

## Commands and results

Each npm invocation used this process-local setup (no profile/config changes):

```sh
eval "$(fnm env --shell zsh)"
fnm use 22
```

Before any edits:

- `npm run test:unit`: **6 passed**, no failures/skips.
- `npm run audit:production`: **15/15 pinned hashes match**.
- `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser`:
  **188 passed**, no failures/skips/flaky tests, approximately 7.7 minutes.
  This freshly verifies the actual milestone-1 prerequisite, including Firefox.

After extraction/test updates:

- `npm run test:unit`: **7 passed**, no failures/skips (repeated successfully).
- `npm run test:browser -- tests/browser/opening-extraction.spec.mjs --project=chromium --project=mobile-chromium --max-failures=1`:
  **4 passed**, 7.9 seconds; initial focused scope/order/state/presentation check.
- `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser`:
  **196 passed**, 49 per project (Chromium, Firefox, WebKit, mobile Chromium),
  zero failures/skips/flaky tests/runner errors, 280.800216 seconds.
  Report start: `2026-10-25T12:04:22.460Z`.
  Ignored ordinary report: `test-results/results.json`, SHA-256
  `41103c60f7348905173c6ccdd55a21e77682942e194d31b8952d572134724397`.
- `git diff --check`: **passed** for tracked edits. Separate
  `git diff --no-index --check /dev/null assets/css/opening.css` reports preserved
  whitespace on lines 46–47 / blank EOF (exit 3). These are the original inline
  blank line and closing-tag indentation, intentionally retained plus the documented
  final LF; not cleaned up because extraction is exact.

`audit:production` intentionally remains the historical milestone-1 hash-boundary
command; it is not rerun/relaxed after the authorized HTML extraction. The new unit
test is the milestone-2 boundary check: all other 14 paths remain byte-identical,
and the complete Opening HTML must equal only the two prescribed replacements.
All 110 sealed fixtures remain unchanged. No schema `validate:content` command is
applicable yet; exact content/bank/answer/inert-HTML tests run instead.

## Exact source and runtime evidence

`tests/helpers/opening-extraction.mjs` defines the entire permitted transformation.
CSS retains every character between the original tags and appends exactly one LF;
JS retains every character between its tags without any newline adjustment.

| Current file | SHA-256 |
| --- | --- |
| `opening.html` | `38d9e19096e4d666530be63c5a2b95cf9d59e186ababb640c1838796977efbe0` |
| `assets/css/opening.css` | `57d8944b37cfbf32fc87d853b7b441bc87451ca15f80c888e812a17a8b085de8` |
| `assets/js/opening.js` | `0c4a72009e052e6cdcad354523b30703e88b8ce6e764d2be892b5425d161e6a0` |

The unit/server checks verify exact served HTML/CSS/JS bytes and MIME types on `/`
and `/discussion-skills-lab/`, preserving both original replay mounts. Browser
reference checks also request local assets successfully under both current mounts.
The full transformed HTML comparison independently forbids any other HTML edit,
including instructional changes, handler removal, cascade order or async/defer/type
changes. New browser observations see one real `createLesson('opening-stage',7,7)`
and one `init()` per page, no page errors, unchanged initialized identities and
generated controls. Core remains before the classic activity script; Opening CSS
remains before shared CSS and Tailwind. No new production globals or wrappers.

The focused comparison restores fresh, partial-first, mid-lesson, completed and
correct-ever-then-incorrect fixtures into original and current engines on both
mounts; raw serialized strings after initialization, fields, selected answers and
progress match exactly in all four projects. Existing persistence/policy tests also
cover missing/empty/zero, non-contiguous progress, earned fallback, reloads, drafts,
unconditional reference access, all seven gates, every question/feedback option,
all-at-once quiz/retry, keyboard analysis and exact consensus assembly. Middle and
Final full journeys/smoke/persistence/print tests pass unchanged. Original unsafe
storage/unknown-loss/save-gap characterizations remain pinned to replay, not repaired.

## Visual and print review

New tests compare actual card/choice/timeline computed styles against pinned
`0b5d2297e7cbc19bd59cde750492dd28e3983ca0` replay in every project, both mounts.
All match. Chromium desktop (1440×1000) and mobile (390×844) capture paired full-page
images for sections 0, 1 (first timeline expanded), 6 (selected quiz feedback), 7,
and reference-only print from page 0. **All 20 PNG pairs are byte-identical** in both
the focused and full runs. Equality is diagnostic evidence, not a new pixel gate.
Screenshots/PDFs and comparison JSON are attachments in the ignored ordinary report;
no historical screenshot/content baseline was updated or masked.

Agent file-based visual review of section-0/section-1 desktop/mobile captures found
the same readable cards, choices, timeline, grouping and cues, without visible
clipping. Original and extracted root desktop Chromium Letter PDFs were opened
alongside sealed `tests/fixtures/visual/opening-reference.pdf`: identical extracted
text and recognizable composition, one page, all four reference groups, no controls,
questions, clipping or blank leading page. Reference-only computed print visibility
passes from ordinary lesson pages in all four projects, both mounts. Additional
paired PDFs are generated for desktop/mobile Chromium on both mounts.

No intentional layout differences. No production fixes for existing defects.
Interactive Chrome/Firefox/Safari print previews, physical printing, real Safari/iOS,
Android devices, AT, exhaustive zoom/320px and denied-storage manual checks were
**not performed** (no corresponding interactive/device/AT environment used). These
remain explicit manual follow-ups in the regression checklist, not claims of manual
approval and not blockers to this mechanical extraction's verified preservation.

## Owner Safari follow-up — 2026-10-25

Owner reports functional testing of `opening.html` in Mac Safari: everything
appeared to work. Safari version and individual actions were not specified; Middle,
Final and interactive print preview were not reported tested. This is additional
owner-reported functional evidence, not blanket manual/device/print approval.

Owner observed repeated `/health` 404s and two optional Apple touch-icon 404s.
Repository search found no `/health`, Apple touch-icon or `sessionStorage` usage.
The polling caller is unidentified; no endpoint or icon was added. At the owner's
request, current `README.md` now documents targeted local test-progress resets and
these 404 distinctions. Current README bytes are therefore an explicitly authorized
post-extraction documentation exception to the boundary test; all runtime/license
bytes and canonical README/replay fixtures remain protected and unchanged.
