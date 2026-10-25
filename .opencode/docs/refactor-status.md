# Refactor status

Entries are append-only handoffs. Specifications are not implementation evidence.

Documentation relocation (2026-10-25): current refactor documents and evidence live
under `.opencode/docs/`. In historical entries and sealed fixtures, repository-root
`docs/<path>` now maps to `.opencode/docs/<path>`. Earlier handoffs remain unchanged;
read the latest entry for current verification status and readiness.

## Milestone handoff

Milestone: 1 — Freeze content, behavior, and legacy progress — **incomplete**: implementation and canonical Chromium evidence established; required Firefox verification is blocked by the local browser environment. Session date: 2026-10-24 local.
Starting commit: `0b5d2297e7cbc19bd59cde750492dd28e3983ca0` (also the verified pinned production baseline).
Working branch: `refactor/shared-components`.

### Implementation
- Files created:
  - `package.json`, `package-lock.json`, `.gitignore`, `playwright.config.mjs` — private development tooling only; no CI/deployment changes.
  - `tests/helpers/static-server.mjs`, `baseline-source.mjs`, `audit-production.mjs`, `content-baseline.mjs`, `legacy-journeys.mjs` — serving, provenance, content comparisons and real UI journeys.
  - `tests/helpers/freeze-source.mjs`, `freeze-edge-fixtures.mjs`, `capture-browser.mjs`, `capture-supplement.mjs`, `capture-generated.mjs`, `seal-fixtures.mjs` — explicit one-time/exclusive evidence creation, not normal test scripts or snapshot updates.
  - `tests/unit/baseline.test.mjs`; `tests/browser/baseline.spec.mjs`, `persistence.spec.mjs`, `policy.spec.mjs`, `print.spec.mjs`.
  - `tests/fixtures/production.json`, `tests/fixtures/manifest.json`; exact fixture paths/hashes for the 110 sealed source/content/map/progress/visual files are listed in the latter. Includes authored `legacy-maps/{opening,middle,final}.json`, initialized DOM, observed/synthetic progress, desktop/mobile/settled-card/builder/print screenshots and three canonical Letter PDFs.
  - `docs/content-inventory.md`, `progress-compatibility.md`, `regression-checklist.md`, `known-issues.md`, `refactor-status.md`, `docs/evidence/milestone-1-verification.md`, `docs/evidence/firefox-blocker.md`.
- Files modified: None of the pre-existing tracked files. All 15 production/document files remain byte-identical, including HTML/CSS/JS, favicon, README, licenses and `.nojekyll`; no presentation differences introduced. Inherited untracked `.opencode/`, `AGENTS.md` and initially present `discussion-skills-lab-specs.zip` were not edited/deleted by this session. The ZIP was no longer present at exit (an external checkout change); no attempt was made to recreate or revert user work. No commit, merge, push, tag, release or Pages setting change.
- Interfaces introduced: Development-only `startServer(port=0)` → `{server,url,close}`; fixed `revision`/`productionPaths`, `original(path)`, `sha256(bytes)`, `auditProduction()`; `extractBanks(sources)`, `inventoryHTML(source)`, `initializedDOM()`, `generatedCopy(lesson)`; semantic `runLesson(page,id,checkpoint)`, `ready`, `navigate`, `rawProgress`; exclusive `freeze(path,value)`. npm scripts: `test:unit`, `test:browser`, `audit:production`, `test:serve`. Server mounts `/`, `/discussion-skills-lab/`, `/__original/`, `/__original/discussion-skills-lab/`, `/__fixtures/`; local random port, no redirects, traversal and symlink containment, pinned replay allowlist. Current static subtrees can grow in later milestones without changing the fixed original replay allowlist.
- Content moved: None in production. Byte-exact archival copies and indexed exact text/markup/data/answer/feedback records were created only under `tests/fixtures/`; source identities, visible/hidden/unused variants, builder expressions, future destinations and attribution are documented in `docs/content-inventory.md`. Original instructional content remains © 2026 Rhys Jones / CC BY 4.0; code MIT; third-party exclusions/notices retained.
- Storage changes: None to production keys, formats, completion policies or student data. Tests use synthetic text and isolated temporary browser origins/contexts only. All completed observed records came from actual activities; synthetic malformed/edge cases are explicitly labeled. No `dslUi` extension or adapter introduced in this milestone.

### Verification
- Unit tests: **Passed**, `npm run test:unit` — 6 tests, zero failures/skips. Verifies 110-file immutable seal, pinned source/data/answers, initialized maps (including Middle fields/global cards and Final page-local/global indexes), actual original core access/union policy, fixture provenance and root/prefix/current/replay server bytes/MIME/traversal/lifecycle. `npm ci` passed with zero audit vulnerabilities. Exact temporary Node PATH prefix and executed capture/install commands: `docs/evidence/milestone-1-verification.md`.
- Browser tests: **Passed for available engines**, `npm run test:browser -- --project=chromium --project=webkit --project=mobile-chromium` — 141/141 passed (47 per project), zero flaky/skipped, 325.651 seconds; Chromium 149.0.7827.55, WebKit 26.5, 1440×1000 desktops and 390×844 mobile Chromium. Homepage/all lessons on `/` and `/discussion-skills-lab/`; progress fixtures on both current and both original replay mounts; complete UI journeys, per-counted-page missing-prerequisite gates, every bank's options/feedback, keyboard/cards/details, builders/models/checks, persistence and print isolation. Chromium PDFs generated. Final ordinary JSON: `test-results/results.json`; durable outcome/report hash: `docs/evidence/milestone-1-verification.md`. **Failed before site execution**, `npm run test:browser -- --project=firefox --max-failures=1 --workers=1 --reporter=list --output=test-results/firefox-blocker` — one launch failure, 46 not run; installed Firefox 151.0 cannot launch normally due macOS sandbox-extension/framebuffer errors. Initial invalid/failed harness runs and their corrections are documented, not hidden or treated as passes.
- Content validation: Baseline exact source/bank/answer/feedback/generated-control/HTML-inventory comparisons **passed** in the unit/browser commands above, independent of screenshots. `npm run audit:production` **passed**, all 15 checkout hashes match `tests/fixtures/production.json`. `git diff --check` passed and tracked diff is empty. A separate `validate:content` schema command is **not applicable** in milestone 1; later milestones introduce production content/schema tooling.
- Manual tests: File-based visual review performed for homepage/all lesson initial desktop/mobile captures, settled Middle/Final mobile card backs and builders, Middle print-media image, and three reference PDFs (text plus available rendered pages). References retain grouping/prose; each PDF is one Letter page with no leading blank page or printed lesson controls/questions. No interactive browser print preview, physical printer, real device or assistive technology test is claimed. Evidence and review limits: `docs/regression-checklist.md`, `tests/fixtures/visual/`.
- Tests not performed: All 47 Firefox site assertions are unverified because launch fails (one blocked attempt; remaining 46 stopped by explicit fail-fast limit); this **blocks milestone completion/next-milestone readiness**. Real Safari/iOS, Android Chrome, VoiceOver/TalkBack/other screen-reader checks, exhaustive 200% zoom/card clipping review, denied-storage manual checks and interactive Chrome/Firefox/Safari print previews remain pending due unavailable manual/device environment. They are explicitly listed in `docs/regression-checklist.md`, not substituted with mocks. Essential Chromium desktop/mobile/print captures did run; no font/CDN mock or instructional-region mask was used.

### Compatibility
- Legacy progress verified: `dsl:opening-stage:v1`, `dsl:middle:v1`, `dsl:final:v1`, counted totals 7/8/9. Observed fresh/partial/mid/completed/correct-ever-then-incorrect fixtures, missing/empty/zero/Unicode, Opening 34/35 boundary and absent-earned fallback, non-contiguous completed sections, drafts and card credit reloads passed in listed engines/mounts. Authored field/card/panel/question/option/check mappings match initialized evidence. Unsafe records and unknown-property loss are original-engine characterizations, **not** claims that malformed state restores safely or unknown nested values already survive.
- Original-engine replay verified: Fixed full revision `0b5d2297e7cbc19bd59cde750492dd28e3983ca0`, 15-path allowlist in `tests/helpers/baseline-source.mjs` / `tests/fixtures/production.json`; argument-safe `git show`, no history fetch/checkout/live-site dependency. Unit tests verify every file on both replay mounts. Chromium/WebKit/mobile Chromium progress tests pass on `/__original/` and `/__original/discussion-skills-lab/`; original unsafe-state/unknown-loss/save-gap assertions remain pinned to replay for later new-engine comparisons. Firefox replay remains unverified for the same launch blocker.
- Known regressions: None introduced/observed in the verified checks; production is unchanged. Original KI-01…KI-10 remain documented in `docs/known-issues.md` (checkpoint styling/selection, classification-current policy, cursor/draft/model save gaps, goal caption, focus/inactive faces, print overrides, malformed-state/unknown-property losses, card face restoration/clipping risk). Initial supplementary images caught animations; originals are retained and not approved settled views, with separately named settled captures reviewed. No canonical content/answer/policy baseline was rewritten to hide failures.

### Next milestone
- Prerequisites satisfied: Pinned source/hash provenance, content/answer/policy inventory, authored initialized maps, representative observed and synthetic fixtures, original replay server, available-engine automated checks and Chromium visual/print evidence exist and are verified. **Next task is resuming milestone 1 verification**, not starting milestone 2. Once Firefox works normally, run `npm run test:browser -- --project=firefox` (or the full default suite), record results in a new appended handoff, and reassess readiness. Keep canonical captures sealed; later extraction must replace only milestone-specific current-source boundary assertions while retaining original/replay evidence.
- Outstanding blockers: Installed Playwright Firefox cannot establish its automation connection on this host; diagnostics and exact probes in `docs/evidence/firefox-blocker.md`. Required Firefox functional/persistence/print-media coverage remains missing. Manual/device/AT/interactive-preview follow-ups remain pending as listed above.
- Decisions requiring approval: None for source baseline, content, policies or current tooling. Do not disable system/browser security protections or change instructional behavior to bypass verification; use a functioning test environment. No permission to commit, deploy or continue later milestones has been inferred.

## Milestone handoff

Milestone: 1 — Freeze content, behavior, and legacy progress — **complete** preservation baseline, with manual/device/AT/interactive-print follow-ups explicitly pending. Documentation relocation and Firefox verification follow-up: 2026-10-25. The previously blocking Firefox automated coverage now passes with application-data isolation; no acceptance criteria changed.
Starting commit: `0b5d2297e7cbc19bd59cde750492dd28e3983ca0` (actual HEAD at the start of this documentation task; also the pinned baseline).
Working branch: `refactor/shared-components`.

### Implementation
- Files created: Seven destination files under `.opencode/docs/` by moving the former root documentation tree: `content-inventory.md`, `progress-compatibility.md`, `known-issues.md`, `regression-checklist.md`, `refactor-status.md`, `evidence/firefox-blocker.md`, `evidence/milestone-1-verification.md`. No new test, runtime or production files.
- Files modified: `AGENTS.md`, `.opencode/specs/refactor-contracts.md`, and `.opencode/specs/refactor-milestone-{1,2,3,4,5,6,8}.md` now point active instructions and future documentation destinations at `.opencode/docs/`; milestone 7 had no old documentation paths to replace. Relocated inventory's relative fixture link was corrected; checklist documents fnm initialization and command-scoped Firefox isolation; evidence documents append the owner's successful run and diagnosis; this handoff is appended without rewriting the original entry. All current refactor documentation/evidence stays under `.opencode/`, except root `AGENTS.md`. Inherited untracked `.opencode/`, `AGENTS.md`, `docs/`, tests, npm/config/ignore files were already present; only the approved documentation/instruction paths were edited/moved. Production, tests/tooling, dependencies, sealed fixtures and unrelated files were not edited. No commit, merge, push, tag, publication or Pages changes.
- Interfaces introduced: None in code. Operational command for this macOS 27 host: `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- --project=firefox --workers=1 --max-failures=1`; use the same command-scoped prefix for a future full default suite. Create a fresh temporary home per invocation, not a permanent shell export or personal profile. No sudo/security changes. `playwright.config.mjs` remains unchanged.
- Content moved: Agent/refactor documentation only, root `docs/<path>` → `.opencode/docs/<path>`, preserving subdirectories and previous handoffs. Old literals in historical entries and sealed `tests/fixtures/content/README.md` intentionally remain historical; use this mapping to find current documents. No instructional source/content, answer, policy or visual fixture moved or changed; licenses/attribution retained. No layout differences introduced.
- Storage changes: None. `dsl:opening-stage:v1`, `dsl:middle:v1`, `dsl:final:v1` and completion/draft formats unchanged. `CFFIXED_USER_HOME` isolates Firefox application data; it is not a student-data migration or a change to test origins/assertions.

### Verification
- Unit tests: **Passed**, `npm run test:unit` — 6/6, zero failed/skipped, agent-executed before and after documentation changes with Node v22.23.4 via `eval "$(fnm env --shell zsh)"` / `fnm use 22`. Includes the 110-file canonical seal, exact source/answer/maps, original policy and root/prefix/current/replay server checks. The owner also reported a passing unit run; no separate owner count is inferred.
- Browser tests: **Passed, owner-executed**, `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- --project=firefox --workers=1 --max-failures=1` — 47/47 Firefox checks, zero failed/skipped/flaky, 193.619 seconds. Agent inspected the existing report: 47 expected Firefox tests, no runner errors, start `2026-10-25T11:13:35.592Z`, SHA-256 `7cb663efd4703a2f6bddbdf3f3de58483a3a18cf2f497e6edfef3a278a1349b3`. Node v22.23.4, Playwright 1.61.1, Firefox 151.0, macOS 27.0.1 arm64; agent confirmed OS build 26A434. Root and `/discussion-skills-lab/`, both original replay mounts, full journeys/gates/content/persistence/print media covered. Earlier separately recorded Chromium/WebKit/mobile Chromium run passed 141/141; together all four configured projects have passing evidence, **not** a newly executed 188-test run. Agent did not rerun browser tests during this documentation-only task. Durable evidence: `.opencode/docs/evidence/firefox-blocker.md` and `milestone-1-verification.md` in that evidence directory.
- Content validation: **Passed**, `npm run audit:production` — 15/15 production/document hashes match pinned source, before and after documentation changes. Unit content/answer/fixture-seal checks passed; `git diff --check` passed. One-off Node documentation audit passed: seven moved documents present, local Markdown links resolve, no stale active root documentation paths; historical/sealed references are explicitly accounted for. Separate `validate:content` remains not applicable until later milestones introduce schema tooling.
- Manual tests: None newly performed. Owner observed the headed **Profile Missing** dialog and successful isolated-home launch probe (`PASS: 151.0 Firefox probe`); these are environment diagnostics, not interactive lesson/print/AT checks. Prior Chromium visual/PDF review remains recorded in the original handoff and evidence. The matching upstream issue is linked in the Firefox evidence; local TCC access denial was not independently audited.
- Tests not performed: No browser suite rerun by the agent and no single isolated full-default-suite run during this documentation task; unchanged tests/production plus the owner's inspected 47-pass report and earlier 141-pass evidence satisfy the preservation baseline. Real Safari/iOS, Android Chrome, VoiceOver/TalkBack/other AT, exhaustive 200% zoom/320px clipping review, denied-storage manual checks, interactive Chrome/Firefox/Safari print previews and physical printing remain pending as listed in `.opencode/docs/regression-checklist.md`. These manual follow-ups are recorded as permitted by the contracts; they are not falsely claimed verified and do not reinstate the resolved Firefox automated blocker. Later milestones must perform their required checks and reassess outstanding manual risks.

### Compatibility
- Legacy progress verified: Original three storage keys, 7/8/9 counted pages, observed/synthetic fixtures and current/original replay tests now have passing Firefox coverage in addition to the previously recorded Chromium/WebKit/mobile evidence. No adapter or storage behavior changed here; unsafe-state/unknown-property-loss cases remain original-engine characterizations, not repaired behavior.
- Original-engine replay verified: Pinned revision `0b5d2297e7cbc19bd59cde750492dd28e3983ca0`, unchanged 15-path allowlist in `tests/helpers/baseline-source.mjs`; post-move unit server checks pass on both original mounts. Owner's inspected Firefox report includes replay persistence checks. No fetch/history/checkout/live-site substitution or fixture resealing.
- Known regressions: None observed in the listed checks; production is unchanged. KI-01…KI-10 remain in `.opencode/docs/known-issues.md`. Unisolated Firefox startup remains broken on this macOS host; the verified workaround avoids the problem without weakening tests or security. Historical path literals are intentional preservation exceptions, not active instructions to recreate root documentation.

### Next milestone
- Prerequisites satisfied: Milestone 1's pinned baseline, exact content/answer/policy inventory, initialized stable maps, observed/synthetic progress fixtures, original replay, Chromium desktop/mobile/print evidence and all four browser projects' passing automated results are established. **Next separately requested implementation task is milestone 2**, beginning with its prerequisite inspection and required regression runs; no milestone 2 implementation was performed or authorized by this documentation task.
- Outstanding blockers: None for milestone 1's required automated baseline. This host must retain the documented command-scoped Firefox isolation until an independently verified tooling fix replaces it. Manual/device/AT/interactive-preview follow-ups remain pending in the checklist; no claim of release approval or full manual cross-browser verification.
- Decisions requiring approval: None for this task: owner explicitly approved the documentation relocation, active-reference changes, preserved historical/sealed exceptions and Firefox findings. No approval to upgrade dependencies, rewrite baselines, implement later milestones, commit or publish has been inferred.

## Milestone handoff

Milestone: 1 — Freeze content, behavior, and legacy progress — **complete**; authorized initial commit packaging, 2026-10-25. Implementation/verification status remains as in the preceding handoff; no later milestone implemented.
Starting commit: `0b5d2297e7cbc19bd59cde750492dd28e3983ca0` (HEAD before this commit-packaging task).
Working branch: `refactor/shared-components`.

### Implementation
- Files created: None newly authored. The owner requested two commits of the existing untracked planning and milestone-1 work; all 148 candidate files were already present. The first commit, `de61e26a60c55eedf2fb7a1d2d90ad7965ed950f` (`docs: record refactor contracts and eight-milestone plan`), adds root `AGENTS.md`, the shared contracts and all eight milestone specifications (10 files).
- Files modified: Only this append-only handoff during packaging. The second commit packages `.gitignore`, `package.json`, `package-lock.json`, `playwright.config.mjs`, `tests/` and `.opencode/docs/` (138 files), including this entry. Explicit paths are staged; node_modules, ordinary reports/traces, temporary browser profiles and PDFs remain excluded. Production files and inherited evidence are not rewritten. No merge, push, publication, tag or Pages setting changes.
- Interfaces introduced: None beyond the previously documented development tooling. Commit messages distinguish the agreed plan from completed milestone-1 implementation.
- Content moved: None during packaging. Current documentation remains under `.opencode/docs/`; canonical content/maps/progress/visual captures and license notices remain unchanged in `tests/fixtures/`.
- Storage changes: None; all three legacy keys, formats, drafts and completion policies remain unchanged.

### Verification
- Unit tests: **Passed**, `npm run test:unit` — 6/6, zero failures/skips, Node v22.23.4 initialized with `eval "$(fnm env --shell zsh)"` and `fnm use 22`. Includes the 110-file immutable fixture seal, source/answer/mapping/policy assertions and root/prefix/current/original replay server checks.
- Browser tests: Not rerun for this commit-only task; no application/test implementation changed. Existing recorded evidence remains 141 Chromium/WebKit/mobile Chromium passes plus the owner's separately verified 47 Firefox passes using command-scoped `CFFIXED_USER_HOME`. Exact commands and report hashes: `.opencode/docs/evidence/milestone-1-verification.md` and `.opencode/docs/evidence/firefox-blocker.md`.
- Content validation: **Passed**, `npm run audit:production` — all 15 production/document hashes match pinned revision `0b5d2297e7cbc19bd59cde750492dd28e3983ca0`. `git diff --cached --check` passed for the planning commit; for milestone 1 it **reported five inherited trailing-whitespace lines** in byte-exact archived source (`CONTENT_LICENSE.md:5`, `assets/css/final.css:62,64`, `assets/css/middle.css:5`, `opening.html:56`, all under `tests/fixtures/content/source/`). These are intentionally preserved, not corrected or resealed. `git diff --cached --check -- . ':(exclude)tests/fixtures/content/source/**'` passed for newly authored files. Reviewed explicit candidate/staged path lists, sizes (about 6 MB total; no large profiles), and scanned `.opencode/` and `tests/` for common credential/private-key patterns (no matches; not a comprehensive secret audit). Separate `validate:content` remains not applicable until later schema tooling exists.
- Manual tests: None newly performed; packaging commits does not add browser/device/AT/print-preview verification.
- Tests not performed: New browser runs and real-device/AT/interactive print-preview checks were not performed in this commit-only task. Existing manual follow-ups remain pending in `.opencode/docs/regression-checklist.md`; no new blocking evidence gap introduced by staging/committing unchanged implementation.

### Compatibility
- Legacy progress verified: Existing observed/synthetic fixture coverage for `dsl:opening-stage:v1`, `dsl:middle:v1`, `dsl:final:v1` remains as recorded in the preceding handoff; unit fixture-seal and policy checks passed again. No storage/runtime changes.
- Original-engine replay verified: Unit server bytes/policy checks passed again against pinned revision `0b5d2297e7cbc19bd59cde750492dd28e3983ca0`, both original replay mounts and unchanged allowlist. Prior browser replay results remain recorded; no history fetch or baseline substitution.
- Known regressions: None observed in the listed checks. Original KI-01…KI-10 and pending manual checks remain unchanged; this host still requires the documented Firefox application-data isolation.

### Next milestone
- Prerequisites satisfied: Planning instructions/specs are committed separately from milestone-1 implementation/evidence. The preservation baseline remains complete per the preceding handoff; the next separately requested task is milestone 2, beginning with its prerequisite checks and required regression runs. Stop after the two authorized commits.
- Outstanding blockers: None for committing this work. Manual/device/AT/interactive-preview follow-ups remain pending; no release/publication approval is implied.
- Decisions requiring approval: None for the two local commits explicitly requested by the owner. Further milestone implementation, merging, pushing or publication requires separate authorization.

## Milestone handoff

Milestone: 2 — Mechanically externalize Opening's script and styles — **complete**, 2026-10-25; manual/device/AT/interactive-print follow-ups remain explicitly pending.
Starting commit: `5fb48363d73562b2341768d38f10087528c964d0` (actual HEAD before this session's edits).
Working branch: `refactor/shared-components` (clean at entry; no inherited changes).

### Implementation
- Files created: `assets/css/opening.css`, `assets/js/opening.js`; development-only `tests/helpers/opening-extraction.mjs`, `tests/browser/opening-extraction.spec.mjs`; `.opencode/docs/evidence/milestone-2-verification.md`.
- Files modified: `opening.html` only replaces its main style/activity script with relative local references, preserving cascade/execution order and inline print handler. `tests/unit/baseline.test.mjs` adds exact extraction/unchanged-other-production assertions and adjusts current-mount server expectations without changing replay; `tests/helpers/content-baseline.mjs` accepts the extracted JS path while retaining original inline support; `tests/browser/baseline.spec.mjs` accounts for changed inert head-node indexes while independently checking exact content against sealed evidence. `.opencode/docs/content-inventory.md` records new locations/line mapping; this handoff appended. No Middle/Final/shared files, licenses, public URLs, dependencies, deployment, Tailwind/fonts or canonical fixtures changed. No layout adjustments, scoped standards repairs, commits or publication.
- Interfaces introduced: Development-only `openingExtraction(source)` → `{html,css,js}` defines the exact allowed transformation; browser-only presentation/init observation has no shipped interface. No new production globals, wrappers, module API or loader.
- Content moved: Baseline `opening.html` main style → `assets/css/opening.css`, preserving every payload character and adding exactly one final LF after original closing-tag indentation; final inline activity script → `assets/js/opening.js` with every payload character, initial/final LF, data array, feedback, template, gate and final navigation call unchanged. Original JS line N maps to new JS line N − 393. Full source relationships: `.opencode/docs/content-inventory.md`, milestone-2 mapping. No instructional content separation, rewriting, removals or canonical baseline updates.
- Storage changes: None; `dsl:opening-stage:v1`, `dsl:middle:v1`, `dsl:final:v1`, outer/inner shapes, drafts, credit and known original defects unchanged. No v1 extension/adapter/new writer.

### Verification
- Unit tests: **Passed** before edits, `npm run test:unit` — 6/6; after extraction — 7/7, repeated, no failures/skips. Exact transformed HTML/payloads, all other 14 production paths, all 110 sealed fixtures, banks/answers, maps/policy and both current/original server mounts verified. Node v22.23.4 via `eval "$(fnm env --shell zsh)"` / `fnm use 22`.
- Browser tests: **Passed** before edits, `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser` — 188/188. Focused `npm run test:browser -- tests/browser/opening-extraction.spec.mjs --project=chromium --project=mobile-chromium --max-failures=1` — 4/4. Final isolated full command — **196/196**, 49 each Chromium/Firefox/WebKit/mobile Chromium, zero failed/skipped/flaky, 280.800216 seconds. Root/repository mounts, both pinned replay mounts, exact restores, all lesson journeys/gates/answers, keyboard/builder, persistence and reference print checks pass. Report SHA-256 and durable scope/results: `.opencode/docs/evidence/milestone-2-verification.md`.
- Content validation: **Passed** exact source/content/bank/answer/inert-HTML assertions above. Before edits `npm run audit:production` passed 15/15; retained as the historical milestone-1 boundary command, not relaxed after authorized extraction. New unit assertions are the milestone-2 boundary check. `git diff --check` passed for tracked edits; separate new-CSS check reports original whitespace on lines 46–47/blank EOF, intentionally preserved rather than reformatted. Separate `validate:content` not applicable until later schema tooling.
- Manual tests: Agent file-based review of desktop/mobile card/choice/timeline captures and original/extracted/canonical Chromium reference PDF text/rendered page: recognizable grouping, readable/unclipped reviewed content, one Letter reference page with no controls/questions/leading blank. All 20 live replay/extracted PNG pairs byte-identical; computed styles match all projects. This is file-based visual review, not interactive lesson/device/print-preview verification. Evidence: `.opencode/docs/evidence/milestone-2-verification.md`.
- Tests not performed: Interactive Chrome/Firefox/Safari print previews/physical printing, real Safari/iOS/Android, AT, exhaustive 200% zoom/320px and denied-storage manual checks — no corresponding interactive/device/AT environment used. Remain explicit follow-ups in `.opencode/docs/regression-checklist.md`; do not block this mechanically exact extraction with passing source, execution/cascade, behavior, screenshot and automated print evidence. No automated suite skipped. No schema validator yet.

### Compatibility
- Legacy progress verified: Opening fresh/partial/mid/completed/changed-answer fixtures match pinned engine raw serialization, displayed selections/fields/progress exactly in four projects on both mounts; broader observed/synthetic fixture, reload, draft, earned fallback, non-contiguous credit and always-available reference checks pass. Middle/Final smoke/full journeys/persistence remain green with their source untouched; all three keys and counted totals 7/8/9 retained.
- Original-engine replay verified: Fixed `0b5d2297e7cbc19bd59cde750492dd28e3983ca0`, unchanged allowlist and sealed evidence; unit/server and all four browser projects pass both original mounts. New direct comparison uses the same pinned engine on both mounts; no live origin/history fetch/baseline rewriting.
- Known regressions: None observed in listed checks; no layout changes. KI-01…KI-10 remain in `.opencode/docs/known-issues.md` without silent repairs. This macOS host still needs fresh command-scoped Firefox application-data isolation. Pending manual checks are not claimed verified.

### Next milestone
- Prerequisites satisfied: Milestones 1 and 2 preservation/extraction evidence established; extracted CSS/JS, source-location mapping and focused comparisons are ready for separately requested milestone 3. Read its specification/contracts and verify actual prerequisites before implementation. Stop here; no milestone 3 work performed.
- Outstanding blockers: None for milestone 2 automated acceptance/readiness. Manual/device/AT/interactive-print follow-ups remain pending; release/publication not approved.
- Decisions requiring approval: None for this milestone. Later milestone work, commits, merging/pushing or publication require separate authorization.

## Milestone handoff

Milestone: 2 — **complete**; owner Safari testing and requested developer-documentation follow-up, 2026-10-25. No later milestone implemented.
Starting commit: `5fb48363d73562b2341768d38f10087528c964d0`.
Working branch: `refactor/shared-components`.

### Implementation
- Files created: None in this follow-up.
- Files modified: `README.md` adds targeted local test-progress reset instructions, data-loss/origin/cache cautions and optional-icon/health-poll 404 guidance. `tests/unit/baseline.test.mjs` permits this explicitly requested current README documentation change while preserving original replay and all runtime/license assertions. `.opencode/docs/evidence/milestone-2-verification.md` records owner-reported Mac Safari Opening success and limitations; this log appended. All preceding milestone-2 uncommitted edits were inherited and retained; no runtime changes in this follow-up.
- Interfaces introduced: None.
- Content moved: None; no instructional content or sealed evidence rewritten.
- Storage changes: None. README recommends removing only the selected lesson's key, not clearing the entire origin; no reset code executed against user/student storage.

### Verification
- Unit tests: **Passed**, `npm run test:unit` — 7/7, no failures/skips, Node v22.23.4 via fnm; includes exact extraction, fixture seals and current/original server checks.
- Browser tests: Not rerun for documentation-only follow-up; preceding 196-pass automated run remains recorded above. Owner reports Mac Safari functional testing of `opening.html`: everything appeared to work; browser version and specific actions unspecified.
- Content validation: `git diff --check` **passed**; unit source/content assertions passed. Repository search found no `/health`, Apple touch-icon or `sessionStorage` usage. Schema validation not applicable yet.
- Manual tests: Owner-reported Mac Safari Opening functional success only, recorded in evidence. Owner's storage clear and subsequent icon-request disappearance do not establish storage as the cause of those requests.
- Tests not performed: No new automated browser run, Middle/Final manual checks, interactive print-preview, real-device or AT checks. No runtime changes warrant a new full browser run here; prior manual gaps remain pending.

### Compatibility
- Legacy progress verified: Unit fixture/seal/policy checks passed; no new runtime or storage changes. Prior four-project preservation evidence remains applicable.
- Original-engine replay verified: Unit server checks pass against pinned `0b5d2297e7cbc19bd59cde750492dd28e3983ca0`, including canonical README bytes on both replay mounts. Current README is the separately authorized documentation exception only.
- Known regressions: None introduced in this follow-up. `/health` polling caller remains unidentified; static site has no such endpoint. Optional Safari icon 404s are not lesson-progress failures.

### Next milestone
- Prerequisites satisfied: Milestone 3 readiness remains as above, with additional limited owner Safari evidence and documented fresh-progress testing. Stop after this follow-up.
- Outstanding blockers: None for this documentation update; manual/device/AT/interactive-print follow-ups remain pending.
- Decisions requiring approval: None for requested README guidance. No commits, later implementation or publication authorized.

## Milestone handoff

Milestone: 2 — **complete**; owner-authorized local commit packaging, 2026-10-25.
Starting commit: `5fb48363d73562b2341768d38f10087528c964d0`.
Working branch: `refactor/shared-components`.

### Implementation
- Files created: None newly authored during packaging; existing milestone-2 new files included in the commit.
- Files modified: Only this appended handoff during packaging. Commit includes the preceding extraction, focused tests, content inventory/evidence/handoffs and owner-requested README guidance. All candidate changes were inspected; no unrelated files included.
- Interfaces introduced: None beyond preceding milestone-2 entries.
- Content moved: No additional moves; verbatim Opening CSS/JS extraction remains as recorded above.
- Storage changes: None.

### Verification
- Unit tests: **Passed**, `npm run test:unit` — 7/7, no failures/skips, Node v22.23.4 via fnm, rerun during packaging.
- Browser tests: Not rerun for commit packaging; prior 196/196 automated passes and owner Safari Opening result remain recorded above.
- Content validation: Exact extraction/sealed-fixture assertions included in the unit run. Staged whitespace review retains only the documented verbatim CSS whitespace exception.
- Manual tests: None newly performed during packaging.
- Tests not performed: New browser/device/AT/interactive-print checks not performed for packaging; prior documented manual follow-ups remain pending.

### Compatibility
- Legacy progress verified: No additional runtime changes; prior three-key/four-project preservation evidence remains applicable.
- Original-engine replay verified: Pinned baseline and sealed fixtures unchanged; unit server/replay checks rerun before commit.
- Known regressions: None newly observed; existing known defects and manual gaps unchanged.

### Next milestone
- Prerequisites satisfied: Milestone 2 ready for review as a local commit; milestone 3 remains a separate task.
- Outstanding blockers: None for local commit packaging.
- Decisions requiring approval: Local commit explicitly authorized by owner. No push, merge, publication or later milestone work authorized.

## Milestone handoff

Milestone: 3 — Safe content loading and Final Quick Reference pilot — **incomplete**: implementation and all automated checks pass; required interactive Chrome/Firefox/Safari print previews remain unperformed. Session date: 2026-10-25. No later milestone implemented.
Starting commit: `3bee6023adc7d0fa395ae8c7e79262f8c06b04f9`.
Working branch: `refactor/shared-components` (clean at entry; no inherited changes).

### Implementation
- Files created:
  - `assets/js/app/{content-loader,content-validation,markdown}.js`, `assets/js/components/quick-reference.js`, temporary `assets/js/final-reference.js`.
  - `assets/vendor/markdown-it/` and `assets/vendor/dompurify/`: official local native-browser distributions/maps and original licenses, including bundled MIT dependency/helper licenses; exact versions/pins/URLs/update procedure in `THIRD_PARTY_NOTICES.md`.
  - `content/README.md`, `content/final/reference/reference.json`, five `content/final/reference/{summary-synthesis,synthesis-framework,effective-summaries,consensus-task,after-round}.md` files; `schemas/reference.schema.json`, `scripts/validate-content.mjs`.
  - `tests/unit/{content-validation,content-urls}.test.mjs`, `tests/browser/{content-security,reference-loading}.spec.mjs`, `tests/fixtures/security/{reference-cases.json,reference-candidate.mjs,malicious.md}`, `tests/helpers/final-reference.mjs`.
  - `.opencode/docs/evidence/milestone-3-verification.md`, `.opencode/docs/evidence/milestone-3/` (paired responsive reference PNGs, capture/semantic JSON, ordinary/reference-view PDFs, extracted text/rendered pages).
- Files modified: `final.html` only replaces reference payload, adds disabled/loading/retry UI and a module entry; synchronous title/one Print button, shell IDs/classes and unchanged legacy handler/CSS retained. `package.json`/`package-lock.json` add development-only Ajv 8.20.0 and `validate:content`; Playwright unchanged. `tests/unit/baseline.test.mjs` bounds the exact authorized HTML changes and retains other runtime/license/replay/seal assertions; `tests/browser/baseline.spec.mjs` preserves exact non-reference static assertions while the new test compares extracted reference semantics; `tests/browser/print.spec.mjs` waits for readiness and adds Final reference-view PDFs. `.opencode/docs/{content-inventory,regression-checklist,refactor-status}.md` updated. No activity code, legacy core, CSS, Middle/Opening runtime, root licenses, sealed fixtures or deployment changes. No intentional layout changes; dimensions match paired replay captures at 1440/390/320px, narrow PNGs byte-identical, visually equivalent desktop byte differences documented in evidence. No commit, merge, push, publication, tag or Pages changes.
- Interfaces introduced: `resolveContentUrl(relativePath, declaringUrl, allowedRootUrl)` → checked URL; `loadJson(url, {validate, signal})`, `loadMarkdown(url, {signal})`; `validateReferenceDocument(data, context)`, `referenceSemanticErrors(data, context)`; `renderMarkdown(source, {baseUrl})` → sanitized DocumentFragment; `renderReferenceItems(container, documentData, loadedBodies)` with Map item ID → `{source,url}` and one supported layout. Development `validateReference(data, context)` / `validateContent(directory)` and `npm run validate:content`. Dependencies: markdown-it **15.0.3** (MIT, upstream tagged official npm browser archive), DOMPurify **3.4.17** (Apache-2.0 selected, official tagged distribution), Ajv **8.20.0** (development only); twelve vendor files SHA-256-tested. Native ESM imports, no globals/bundler/production node_modules or new runtime CDN.
- Content moved: Baseline `final.html:270–286` `#ref-content` → `content/final/reference/` JSON labels/numbers/accents/order and five Markdown bodies. Pre-removal Chromium off-DOM comparison passed; permanent sealed-source semantic comparisons preserve all five items, 11 paragraphs, punctuation/example phrases, emphasis token sequence and breaks independently of images. Detailed source mapping in `.opencode/docs/content-inventory.md`, inventory/evidence in `.opencode/docs/evidence/milestone-3/`. Metadata/prose © 2026 Rhys Jones / CC BY 4.0; schema/loader/renderer MIT; third-party exclusions preserved. No instructional rewriting or completion-policy change.
- Storage changes: None. All three v1 keys/formats/counts retained, no migration/adapter/new writer. Pilot performs no storage access. Instrumented raw Final record/write count remains unchanged during delayed load, body failure and successful retry after original engine initialization; original Final initialization still has its existing saves.

### Verification
- Unit tests: **Passed** before editing, `npm run test:unit` — 7/7. Final implementation **passed**, same command — 47/47, zero failures/skips; source boundaries, 110-file immutable seal, banks/maps/policy/server/replay, URLs/fetch failures/abort, full schema/runtime parity for 34 invalid fixtures, Markdown existence/realpath safety/no rewrite and vendor pins. Node v22.23.4 via fnm. Earlier new-harness newline/missing-fixture mistakes and corrections documented in `.opencode/docs/evidence/milestone-3-verification.md`.
- Browser tests: **Passed** before editing, `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser` — 196/196. Focused Chromium run — 29/29 (exact command in evidence). Final full isolated command — **236/236**, 59 each Chromium/Firefox/WebKit/mobile Chromium, zero failed/skipped/flaky, 358.939456 seconds. Root and repository-prefix mounts, both original replay mounts, baseline activities/gates/answers/restoration/print, exact reference semantics, security, delay/error/retry/no-credit/no-storage-write checks, local-only dependency loading and both Final PDF entry views pass. Final report SHA-256 `15fdbdc94e880f68755978dd9601fbebbaf955b348b3ebd5557902034b8e1ccd`; durable summary: `.opencode/docs/evidence/milestone-3-verification.md`.
- Content validation: **Passed**, `npm run validate:content`; draft-07 schema, unique document/item IDs, enums/unknown properties, root-contained local unencoded Markdown paths, referenced regular-file existence/symlink containment. Runtime and development reject shared invalid cases. Exact reference text/emphasis and all unaffected content/answer/policy/seal assertions pass; `git diff --check` passed. `npm install --save-dev --save-exact ajv@8.20.0` passed with zero vulnerabilities. Historical `audit:production` not used as a permanent ban on authorized milestone edits; bounded current-source tests replace that boundary without weakening original replay.
- Manual tests: Agent file-based review only: paired desktop and 320px reference PNGs, both rendered one-page Letter PDFs and sealed Final PDF. Five groups/prose/emphasis/accents readable, no clipping/lesson controls/questions/blank leading page in reviewed files. PDFs from normal/reference views byte-identical, SHA-256 `80c10e6296774fc312bcf7d7b4cc184e6692d55d00106111943ae0ed648280c0`. No interactive browser/print-preview/device/AT check claimed.
- Tests not performed: Required interactive Chrome/Firefox/Safari Print-button and Cmd/Ctrl+P previews from ordinary/reference views, backgrounds on/off/scaling — no interactive environment used; **blocks milestone-3 completion**. Physical printing, real Safari/iOS/Android, AT, actual 200% browser zoom/exhaustive clipping and denied-storage manual checks remain pending in the regression checklist; 320px captures are only automated reference evidence. No automated project skipped; headless PDFs are not manual preview evidence.

### Compatibility
- Legacy progress verified: `dsl:opening-stage:v1`, `dsl:middle:v1`, `dsl:final:v1`, totals 7/8/9; full observed/synthetic restore, drafts, earned credit/reload, non-contiguous access and current/original fixtures pass in all four projects/both mounts. Reference remains available with zero credit. Instrumented Final initialization followed by success/failure/retry does not add loader writes or change stored progress; other activities remain usable after reference failure.
- Original-engine replay verified: Pinned `0b5d2297e7cbc19bd59cde750492dd28e3983ca0`, unchanged allowlist and seals; unit/server checks and all four projects pass both replay mounts. Reference semantic comparison/paired screen captures use this source, not inferred prose or rewritten baselines.
- Known regressions: None observed in listed automated/file-based checks; no intentional presentation or policy changes. KI-01…KI-10 remain unchanged in `.opencode/docs/known-issues.md`, including original-engine storage/save/focus defects, not silently repaired. Interactive print behavior remains unverified; Firefox still needs fresh command-scoped application-data isolation on this host. Source/PDF text-extraction glyph ordering is documented separately from exact DOM content assertions.

### Next milestone
- Prerequisites satisfied: Milestones 1–2 and milestone-3 implementation/automated security/content/progress/print coverage verified. **Next task is finishing milestone 3's interactive print previews**, not starting milestone 4. Once those checks pass and are recorded, a separately requested milestone 4 checkpoint 4.1 can use the pinned safe pipeline; no shared activity/store migration or later scaffolding implemented here.
- Outstanding blockers: Missing required interactive Chrome/Firefox/Safari print-preview evidence from both ordinary/reference views, with both printing entry methods/background settings. Other manual/device/AT follow-ups remain as recorded; no release readiness inferred.
- Decisions requiring approval: None for the in-scope code/content extraction. Owner/manual tester must provide actual preview results to resolve the verification blocker; no content/policy change, dependency auto-update, commit, merge, push or publication authorized.

## Milestone handoff

Milestone: 3 — owner browser acceptance and authorized local commit packaging, 2026-10-25. Implementation/automated checks verified; **incomplete** only with respect to the previously required named-browser print-preview evidence, whose individual actions/browser versions remain unspecified. No later milestone implemented.
Starting commit: `3bee6023adc7d0fa395ae8c7e79262f8c06b04f9`.
Working branch: `refactor/shared-components`.

### Implementation
- Files created: None newly authored for packaging; existing milestone-3 files and evidence from the preceding handoff are included in the authorized commit.
- Files modified: Only this appended handoff and `.opencode/docs/evidence/milestone-3-verification.md` owner-confirmation section during packaging. All implementation changes were inherited from this session's preceding milestone-3 work, inspected and retained. No unrelated changes found. No runtime/test changes, push, merge, tag, publication or Pages setting changes.
- Interfaces introduced: None beyond the preceding milestone-3 handoff.
- Content moved: No additional moves; Final reference extraction and all sealed baseline evidence remain unchanged.
- Storage changes: None; all three legacy keys/formats remain unchanged.

### Verification
- Unit tests: **Passed**, `npm run test:unit` — 47/47, zero failures/skips; rerun for packaging with Node v22.23.4 via fnm.
- Browser tests: Not rerun for commit packaging; unchanged application/tests retain the preceding 236/236 passing Chromium/Firefox/WebKit/mobile Chromium evidence on root/prefix/replay mounts.
- Content validation: **Passed**, `npm run validate:content`, rerun for packaging; vendor pins, exact content/source boundaries and sealed evidence also verified by the unit suite. Staged whitespace review performed before committing, retaining original upstream/license text and the intentional Markdown hard break.
- Manual tests: Owner reports fully confirming milestone-3 changes in their browser on the Final lesson and requests committing locally. Browser/version and specific printing actions were not supplied; no agent-performed interactive preview is claimed. Confirmation recorded in `.opencode/docs/evidence/milestone-3-verification.md`.
- Tests not performed: New automated browser run unnecessary for packaging-only documentation changes; previously required Chrome/Firefox/Safari print-preview matrix and device/AT/actual zoom/physical-print checks remain individually unverified. The broad owner confirmation is recorded without fabricating those details.

### Compatibility
- Legacy progress verified: No new runtime/storage changes; three-key restoration/draft/credit/no-loader-write evidence remains as in the preceding handoff, with sealed/source unit assertions rerun.
- Original-engine replay verified: Pinned `0b5d2297e7cbc19bd59cde750492dd28e3983ca0`; unit/server replay checks passed again. No baseline rewrite.
- Known regressions: None newly observed; prior known issues and explicitly unverified manual checks remain recorded.

### Next milestone
- Prerequisites satisfied: Milestone-3 implementation and automated evidence are packaged for review, now with owner-reported Final browser acceptance. No milestone-4 implementation authorized by this commit request; resolve/record the remaining named-preview evidence before claiming the prior verification blocker cleared.
- Outstanding blockers: None to the explicitly authorized local commit. Detailed named-browser print-preview evidence remains outstanding for the prior milestone-completion claim; no release readiness inferred.
- Decisions requiring approval: Local commit explicitly authorized by the owner. **Do not push.** No merge, publication or later milestone work authorized.
