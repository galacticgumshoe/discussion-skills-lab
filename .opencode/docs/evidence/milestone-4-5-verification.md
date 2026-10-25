# Milestone 4 checkpoint 4.5 verification — 2026-10-25

Starting HEAD: `da38eaea3e476e6c05bda5520a1b1f89bf72e121`.
Branch: `refactor/shared-components`. All existing uncommitted checkpoints 4.1–4.4,
bounded legacy-journey readiness correction, prior evidence/handoffs and owner
clarifications were inherited and preserved. The latest 4.4 handoff and evidence
establish verified/owner-accepted status; the Safari settings retest is resolved,
not a new prerequisite blocker. Only checkpoint 4.5 is requested. No live entry,
classic engine/style, codec/store, dependency, runner configuration, sealed fixture,
license or publication setting changes. No commit/push/merge/tag/deployment.

All npm commands use process-local Node v22.23.4:

```sh
eval "$(fnm env --shell zsh)"
fnm use 22
```

## Commands and results

| Command | Outcome |
| --- | --- |
| `npm run test:unit` (fresh prerequisite) | Passed 89/89, zero failures/skips |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/writing-reference.spec.mjs --output=test-results/4-5-prerequisite` | Passed 72/72, 18 each Chromium/Firefox/WebKit/mobile Chromium, 1.3 minutes |
| `npm run validate:content` (first new-schema run) | Failed at schema compilation: strict Ajv rejects a `required:profile` inside `not` without a local property declaration. Replaced that schema-only prohibition with the equivalent `properties:{profile:false}` (and the corresponding nonwriting binding prohibition); no Ajv strictness, acceptance check or runtime rule relaxed. |
| `npm run validate:content` (corrected implementation) | Passed production references and full isolated config/manifest/activity/reference/Markdown graph |
| `npm run test:unit` (implementation) | Passed 134/134, zero failures/skips, including 42 shared invalid cases and prior 48-fixture/map/store/content/seal tests |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/lesson-harness.spec.mjs --output=test-results/lesson-harness-4-5-initial` | Passed 96/96, 24 per project, both mounts, 1.6 minutes |

No browser test overlapped another. Initial new harness tests passed without
timeouts/retries/forced clicks/skips, relaxed assertions, changed baselines or
production-engine edits.

## Review refinement before final verification

Code review tightened lifecycle ordering: the renderer now exposes initial
validated preparation separately from hydration. All activity loads validate or
fail independently before `openProgress` reads/decodes. The existing store API and
component conventions are unchanged. Reference loading and zero-credit reference
navigation begin immediately while an activity is pending; behavior mounts only
after decoded state is available. Retries refetch/revalidate the affected source;
no retry synthesizes gate events. Added explicit assertions for this ordering,
ordinary Markdown failure/retry and bounded/missing static registry entries.
The next focused command verifies this final source, rather than treating the
initial 96 passes as evidence for the later refinement.

The reviewed command
`env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/lesson-harness.spec.mjs --output=test-results/lesson-harness-4-5-reviewed`
was **interrupted by the agent shell's 120000 ms command timeout** after 101 listed
passes of 112 tests, with no listed assertion failure. This is **not a passing
suite** and not a Playwright assertion-timeout/browser-launch blocker. The command
is rerun below with the shell timeout disabled (`timeout:0`), keeping every project,
test assertion, Playwright timeout, worker count and runtime source unchanged.

## Preservation, APIs and scope

Actual public app/renderer/registry/validation APIs and ownership are documented
in `../progress-compatibility.md`, checkpoint 4.5. Exact source -> read-only fixture
mapping/licensing and permitted fixture-only compositions are in
`../content-inventory.md`. Commands/coverage/manual limits are in
`../regression-checklist.md` and `tests/fixtures/harness/README.md`.

- The app composes the verified store/adapters/completion/navigation/components,
  not a parallel implementation. Only static JS imports choose behavior/policy.
- Closed config/manifest/activity schemas do not affect the deliberately open
  progress schema/forward-compatible unknown fields or opaque UI versions.
- Includes resolve from declaring URLs inside the site's content subtree; the
  graph validator also checks file existence and realpath containment. The two
  config/manifest `$defs` are selected explicitly, not through an empty schema root.
- The fixture serves root and repository prefixes without duplicating runtime
  files. Its instructional data matches independent sealed-source/bank extraction;
  six reference files are byte-exact copies checked by units. No invented questions
  or second writable application-content source.
- Scoping/error/retry tests preserve saved drafts/credit, separate load errors from
  persistence warnings, block new credit for failed sections, keep references
  independent, and verify no bootstrap writes or duplicate/late handlers.
- All live production lesson entries/engines/styles and the Final reference pilot
  remain unchanged; no new key, v2 migration, synchronization, reset/export UI,
  whole-lesson policy/cutover, specialized future renderer or global print cleanup.

## Manual checks and limits

No new interactive browser/AT/actual-zoom/device/clipboard-dialog/print-preview or
physical-print checks are claimed. Earlier owner Chrome/Mac Safari 4.4 acceptance
and resolved native macOS Keyboard navigation setting remain recorded exactly.
The owner is not asked to perform manual Firefox testing; the automated four-
project suite remains required. Headless PDFs/print-media/ARIA assertions are not
manual previews or screen-reader results. Final automated results and any actual
file-based review follow below when available.

Checkpoint 4.5 and overall milestone 4 are **not yet verified/complete** until the
reviewed focused and entire cumulative browser results are recorded. No milestone
5 implementation is authorized by this evidence document.

## Ordered checkpoint / acceptance evidence index

Earlier checkpoint verification is recorded before the next checkpoint's
implementation in the append-only status log. Initial failures/interim entries
remain preserved rather than being rewritten as passes.

| Checkpoint | Verified exit evidence already inspected |
| --- | --- |
| 4.1 | `milestone-4-1-verification.md`; 66 cumulative units, safe all-lesson codecs/store, 48 frozen progress fixtures, 60 storage browser checks and passing 296-test cumulative suite; exact APIs documented |
| 4.2 | `milestone-4-2-verification.md`; 78 units, exhaustive 896-subset access parity, navigation/store integration and passing 344-test cumulative suite |
| 4.3 | `milestone-4-3-verification.md`; final post-restart 83 units/404 browser passes, all question profiles, keyboard/focus/live feedback, latest-choice/earned/explored independence, DOM reorder, no writes/listener duplication and reviewed corrected WebKit geometry/painting |
| 4.4 | `milestone-4-4-verification.md`; 89 units/476 browser passes, exact baseline formatter oracles, immediate writing/checklist/model state, clipboard fallback, independent reference integration, owner Chrome/Mac Safari acceptance and resolved settings retest |
| 4.5 | This document; final reviewed focused/full result still required below |

The final full run must cumulatively verify all listed harnesses plus unchanged
production lessons/pilot and pinned original-engine replay, not just the new
happy-path test. Required acceptance items map to the progress-adapters,
completion, components, formatters, storage-boundaries, navigation,
writing-reference, content-security/reference-loading and lesson-harness suites.
Content/source/answer/policy/seal assertions are separate from visual evidence;
scoped styles/readability repairs are not replaced by pixel-equality requirements.
Known unperformed manual checks stay explicitly nonclaimed in the checklist.

## Reviewed focused result / full cumulative run pending

With the outer shell timeout disabled, the unchanged reviewed command using
`--output=test-results/lesson-harness-4-5-final` **passed 112/112**, 28 per configured
project, both root/repository fixture mounts, 2.0 minutes. No failed/skipped/flaky
test was reported. This verifies the preparation/hydration refinement plus
Markdown-failure and static-registry tests.

Final boundary review then added explicit validation of optional `copyFieldId`
even when a separate output exists, with a shared invalid fixture, and a unit test
for the exact three-allowed/four-rejected group-depth boundary. This adds no API,
activity, content or policy change. Fresh `npm run validate:content` **passed**;
fresh `npm run test:unit` **passed 136/136**, zero failures/skips (43 shared invalid
cases). The entire run below includes the final changed validation case in the
actual browser parity test and rechecks all earlier affected checkpoint suites.

`env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser` is running as background
shell `sh_17470da3a001dD66LrZZU4q7wx`, with the shell timeout disabled and unchanged
default Playwright projects/three workers/timeouts/assertions. No other browser
command overlaps it and no runtime/test changes are made while it runs. No
cumulative pass, checkpoint verification or milestone completion is claimed until
the completion notification/report is inspected. Only documentation changes during
this run; final print/PDF review remains pending.

During the full run, a read-only Python audit checked all **26 newly created
checkpoint files** for trailing whitespace/final newlines: **passed**. `git diff
--check` also **passed**. A scoped `git diff --name-only` over all public HTML,
`.nojekyll`, live engines/pilot/styles/content, licenses, npm manifests and
Playwright configuration returned no changes; HEAD remains the starting revision.
No file was rewritten by the audit, and only documentation is changed while the
full browser suite runs.

## Final cumulative result — checkpoint 4.5 verified; milestone 4 complete

`env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser` **passed 588/588**,
**147 each Chromium/Firefox/WebKit/mobile Chromium**, zero failed/skipped/flaky
tests or runner errors, **743.336249 seconds**. Report start
`2026-10-25T19:01:56.108Z`; ignored `test-results/results.json` SHA-256:
`5afc08a0c03edaa13b65f61b31b25fb8a7e8a311581a915164767d11964caf9b`.
Stats, every project/file outcome and empty runner-errors list were inspected
directly. No runtime/test change during the run, no overlapping browser commands,
and no assertion/configuration/security change, skip or retry to obtain the pass.

| Scope | Passing tests |
| --- | ---: |
| Existing production/content/security/extraction/policy/persistence/print/Final pilot | 236 |
| Checkpoint 4.1 storage boundaries / original-engine compatibility | 60 |
| Checkpoint 4.2 navigation | 48 |
| Checkpoint 4.3 components | 60 |
| Checkpoint 4.4 writing/reference | 72 |
| Checkpoint 4.5 actual bootstrap harness | 112 |

Production root and `/discussion-skills-lab/`, both pinned original-engine replay
mounts, earlier isolated harnesses and both root/repository-prefixed new harness
mounts pass. The final optional-field invalid fixture is included in the browser
runtime parity test. All 43 shared invalid cases, complete graph/ID/gate/path
checks, six standard types, exact content comparisons, independent references,
storage boundaries, no-bootstrap-writes and teardown/remount behavior are verified.

After the full result, fresh `npm run validate:content` **passed** and fresh
`npm run test:unit` **passed 136/136**, zero failures/skips. `git diff --check`
passed. All 26 new checkpoint files passed the read-only whitespace/newline audit.
Public entries/engines/styles/content, codec/store APIs, dependencies, runner,
sealed fixtures and starting HEAD remain unchanged.

### Final file-based print review — not interactive previews

Read both fresh full-run PDFs with the PDF reader (parsed text and rendered page):

- `test-results/lesson-harness-root-refere-e751c-dently-retry-and-never-save-chromium/lesson-reference-root.pdf`
  — SHA-256 `db3c6b2c87845a06d2ccaea6d7f63e2e87a3ce62922df4370760105869694117`.
- `test-results/lesson-harness-repository--df11c-dently-retry-and-never-save-chromium/lesson-reference-repository.pdf`
  — SHA-256 `3a5101766662d4a772599afca32d5336cdecb1eccc6ad471b17eca692d6077f2`.

Both have one readable Letter page, all five original reference groups/11
paragraphs/emphasis, no clipping, lesson questions/drafts/navigation/controls or
leading blank page. Their hashes differ; no byte-identity claim is made. The
fixture's uniform light-blue/teal/Arial styling matches the already documented
4.4 test-sheet simplification, not production accent/font styling or a redesign.
The production reference retains its unchanged semantic/style/pilot tests.
Generated PDFs remain ignored test output, not rewritten canonical expectations.

**All five checkpoints are verified in order; milestone 4 is complete.** The
acceptance index above plus the final cumulative results cover every automated
milestone item, not merely the final happy path. Actual public APIs, extension
limits, state ownership and lifecycle are documented for milestone 5 in the
compatibility document. No blocking verification gap remains.

Remaining **nonblocking manual follow-ups** for later lesson cutovers: new composed
fixture interactive previews/individual print settings, AT announcements, real
iPad/hardware keyboard/other devices, actual browser 200% zoom/animation review,
clipboard permission dialogs and physical printing. These were not performed or
inferred from headless evidence; earlier owner Chrome/Mac Safari 4.4 acceptance
remains valid. No manual Firefox testing is requested of the owner. The next
implementation is **separately requested milestone 5**, not automatic work in this
task. No commit, merge, push, publication, tag or Pages setting change performed.
