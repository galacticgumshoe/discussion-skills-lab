# Milestone 1 execution evidence — 2026-10-24

Historical execution record; dated follow-ups are appended below. Current
documentation root is `.opencode/docs/`; see the latest milestone handoff.

Starting HEAD and pinned production source:
`0b5d2297e7cbc19bd59cde750492dd28e3983ca0`.
Branch: `refactor/shared-components`. No commit/push/deployment performed.

## Environment and installation

Node was initially absent from PATH. Downloaded the official
`https://nodejs.org/dist/v22.23.4/node-v22.23.4-darwin-arm64.tar.gz`, verified SHA-256
`c9e1dbc748b33ed2d14f42445191ecaf14c56259c7a9a26d0042c49ec2b66428`, and extracted
only into the pre-approved OpenCode temporary directory. No global/system Node
installation or security-setting change.

All Node/npm/npx commands below were executed with the exact prefix:

```sh
env PATH="/private/var/folders/fv/fb864z9n6gz9g1yvq_jxf0jr0000gn/T/opencode/node-v22.23.4-darwin-arm64/bin:$PATH"
```

- `npm install`: passed; generated private development-only lockfile.
- `npx playwright install chromium firefox webkit`: downloads passed. Chromium
  149.0.7827.55, Firefox 151.0 build 1532, WebKit 26.5 build 2311.
- `npm ci`: passed after tooling changes; 0 audit vulnerabilities.
- Chromium and WebKit launch probes passed; Firefox probes failed before site
  execution. See [diagnostics](firefox-blocker.md).

## Baseline capture commands actually executed

- `node tests/helpers/freeze-source.mjs`: passed after confirming all 15 pinned
  production/document file hashes against checkout; immutable full source and
  2,069 nonempty indexed source lines, exact data banks.
- `node tests/helpers/capture-browser.mjs`: Opening completed; interrupted by an
  interaction-readiness assertion before Middle cards became visible after native
  detail `toggle`. Added a visibility wait (no production change).
- `node tests/helpers/capture-browser.mjs --resume`: passed all three real UI
  journeys; retained earlier artifacts without overwriting; created missing
  canonical evidence. Completed checkpoint logs contain 64/126/150 semantic
  actions for Opening/Middle/Final. All completion arrays came from actual UI.
- `node tests/helpers/freeze-edge-fixtures.mjs`: passed; synthetic safe/unsafe
  records clearly labeled. Primitive-data cases were additionally authored.
- `node tests/helpers/capture-supplement.mjs`: passed; first explored images caught
  real transitions. Retained, but not approved settled views.
- `node tests/helpers/capture-supplement.mjs --settled`: passed; new, separately
  named images wait on actual animation completion; originals untouched.
- `node tests/helpers/capture-generated.mjs`: passed against `/__original/`;
  captures initialized generated check/goal/note labels, option values and markup.
- `node tests/helpers/seal-fixtures.mjs`: passed; 110 immutable evidence files
  sealed in `tests/fixtures/manifest.json` (plus the seal itself).
- `npm run audit:production`: passed; all 15 files byte-identical to pinned source.

## Test development history

The initial default browser run was invalid due to worker-local random ports and
was interrupted after Firefox could not launch. Fixed runner port propagation;
five targeted Chromium policy tests passed. No canonical answer/content fixture
was rewritten to accommodate a test failure.

First available-engine full run:

```sh
npm run test:browser -- --project=chromium --project=webkit --project=mobile-chromium
```

Result: 134 passed / 7 failed. Six failures were a harness misuse of APIResponse
(`response.request()` does not exist); fixed by disabling redirect following and
asserting 200. One WebKit pointer click missed a moving clipboard target during
smooth scroll/reveal; switched that check to native focus/Enter activation, without
force-click, animation disabling or application patches.

Targeted follow-up actually executed:

```sh
npx playwright test --project=chromium --project=webkit --project=mobile-chromium --grep 'homepage|clipboard' --reporter=list --output=test-results/harness-fixes
```

Result: **15 passed**, including all clipboard rejection paths. Final full-suite
results and unit counts are recorded in the milestone handoff; ordinary full JSON
reports/traces/PDFs live under ignored `test-results/` rather than this directory.

Final available-engine rerun of the full command above: **141 passed**, zero
failures, flaky tests or skips; 47 each in Chromium, WebKit and mobile Chromium,
325.651 seconds. JSON report start: `2026-10-25T00:32:03.910Z` (October 24 locally).
`test-results/results.json` SHA-256 at verification:
`ee2d52d361f981f11aca0dac4faf5914470453564dbd13886d74f0d7d1fe66bc`.
Includes both current mounts, both original replay mounts, complete real UI
journeys, exact content/answer/feedback assertions, original unsafe-state/gap
characterization and print checks. Final `npm run test:unit`: **6 passed**, zero
failures/skips, including the 110-file canonical seal. `git diff --check` passed;
tracked production diff is empty.

## Reviewed artifacts / limitations

Canonical paths: `tests/fixtures/content/`, `legacy-maps/`, `progress/`, `visual/`.
Inspected homepage/all initial desktop/mobile views, settled Middle/Final card backs
and builder mobile views, Middle print image, and three reference PDFs (text and
available rendered pages). No production layout/content changes; PDFs contain the
reference only, one Letter page each, no leading blank page/controls.

External requests were not mocked. Initial capture records no request failures;
font readiness awaited and actual used font faces/weights inspected separately.
Pixel equality is not a gate. Real-device/AT and interactive Chrome/Firefox/Safari
print-preview checks are pending, not claimed performed. Firefox's required
automated project is blocked; no next-milestone readiness is implied by Chromium
or WebKit success alone.

## Follow-up — 2026-10-25: Firefox verification and documentation relocation

The owner installed Node v22.23.4 through fnm and reported passing unit tests.
On macOS 27.0.1, unisolated Firefox still timed out; headed Firefox showed
**Profile Missing**. An isolated `CFFIXED_USER_HOME` launch probe succeeded with
Firefox 151.0. The owner then ran in their own Terminal:

```sh
env CFFIXED_USER_HOME="$(mktemp -d)" \
  npm run test:browser -- --project=firefox --workers=1 --max-failures=1
```

**Passed: 47/47**, zero failed/skipped/flaky. Agent inspection of the existing
`test-results/results.json` corroborated 47 expected Firefox tests, no runner errors,
start `2026-10-25T11:13:35.592Z`, duration 193618.798 ms, SHA-256
`7cb663efd4703a2f6bddbdf3f3de58483a3a18cf2f497e6edfef3a278a1349b3`.
The report's argv identifies Node v22.23.4 managed by fnm. The command/environment
and Firefox version are supported by the owner's report/probe; the JSON does not
record the environment override or browser version. This was **owner-executed**,
not an agent-executed browser run. Together with the separately recorded 141
Chromium/WebKit/mobile passes, all four projects now have passing results; this is
**not** a newly executed single 188-test run.

The agent confirmed `sw_vers`: macOS 27.0.1, build 26A434, and reran unit tests
(6 passed) and the production audit (15/15 hashes matched) before documentation
edits. The latest handoff records post-edit checks and remaining manual limits.
The browser suite was not rerun by the agent during this documentation-only task.
See [Firefox diagnosis/resolution](firefox-blocker.md) for the upstream issue and
[regression checklist](../regression-checklist.md) for repeatable commands.

With owner approval, seven refactor documentation/evidence files moved from the
repository-root `docs/` tree to `.opencode/docs/`, keeping their relative structure.
Active instructions/spec destinations and the inventory's fixture link were
updated. Historical handoffs and sealed `tests/fixtures/content/README.md` retain
their original path literals: `docs/<path>` maps to `.opencode/docs/<path>`.
No production files, runtime tooling, fixtures or seals changed; no acceptance
criteria were relaxed. Manual device/AT/interactive-preview checks remain pending.
