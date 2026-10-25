# Firefox launch blocker

**Current status (2026-10-25): resolved with an isolated application-data home.**
The original failed attempts below are historical; see the dated resolution at the
end and the [current test instructions](../regression-checklist.md).

Playwright 1.61.1 successfully installed Firefox 151.0 (`firefox-1532`), Chromium
149.0.7827.55 and WebKit 26.5. Chromium captures and a WebKit launch smoke test ran.
Firefox cannot establish its automation connection in this macOS environment.

Executed with the session's temporary Node v22.23.4 on PATH:

```sh
node --input-type=module -e 'import {firefox} from "@playwright/test"; const b=await firefox.launch({timeout:20000}); console.log(b.version()); const p=await b.newPage(); await p.goto("data:text/html,<h1>Engine check</h1>"); console.log(await p.title()); await b.close();'
```

Result: **failed**, launch timeout at 20 seconds, before any site activity.
Diagnostic output:

```text
*** You are running in headless mode.
sandbox_extension_issue_file_to_process failed for .../plugin-container.app: 1 (Operation not permitted)
RenderCompositorSWGL failed mapping default framebuffer, no dt
```

A second 20-second launch probe with `MOZ_HEADLESS_WIDTH=1440` and
`MOZ_HEADLESS_HEIGHT=1000` produced the same failure. No sandbox/security protections
were disabled and no system settings/browser application were patched. Firefox
project remains configured, not silently skipped or mocked. Its launch timeout is
20 seconds so this environment failure is reported promptly.

The initial `npm run test:browser` also exposed a separate runner-port bug:
workers re-imported the config and independently reserved ports, causing connection
refusals. The config now shares the runner's random port via `DSL_TEST_PORT`.
That initial invalid run was interrupted: 48 failed (42 port failures and 6 Firefox
launch failures), 3 interrupted, 117 did not run, out of the then-168 tests. It is
not regression evidence. The targeted five Chromium policy tests passed after the
port fix. See the handoff for later full available-engine results.

Required follow-up: run `npm run test:browser -- --project=firefox` in an environment
where the installed Playwright Firefox can launch normally, then record results.
Do not call the entire cross-browser milestone verified while this is blocked.

After the port fix and explicit 20-second launch timeout, executed:

```sh
npm run test:browser -- --project=firefox --max-failures=1 --workers=1 --reporter=list --output=test-results/firefox-blocker
```

Result: **failed before site execution** with the same diagnostic; 1 failed,
46 not run after the explicit fail-fast limit. Trace/error context (ordinary ignored
artifacts): `test-results/firefox-blocker/`. No Firefox lesson journey, persistence,
print-media or visual assertion is claimed verified.

## Resolution — 2026-10-25

The owner reproduced the headless failure in their own Terminal after installing
Node through fnm; the failure was not exclusive to the agent execution context.
A headed run opened Playwright's expected **Nightly** application and displayed
“Your Firefox profile cannot be loaded. It may be missing or inaccessible.”
The host is macOS **27.0.1** (build **26A434**), Apple Silicon arm64.

[Playwright issue #42768](https://github.com/microsoft/playwright/issues/42768)
reports matching macOS 27 behavior when Firefox resolves its shared application-data
directory. A temporary profile alone does not isolate that directory. The issue
also explains why the sandbox-extension and framebuffer messages are not sufficient
to diagnose the failure. The results here are consistent with that diagnosis;
no local TCC audit was performed to independently prove the exact access denial.

An owner-executed launch probe set `CFFIXED_USER_HOME` only in the browser's
environment to a freshly created `dsl-firefox-home-*` directory. It succeeded:

```text
PASS: 151.0 Firefox probe
```

The owner then executed from the project directory:

```sh
env CFFIXED_USER_HOME="$(mktemp -d)" \
  npm run test:browser -- --project=firefox --workers=1 --max-failures=1
```

Result: **47 passed**, zero failed/skipped/flaky, 193.619 seconds. This includes
Firefox lesson journeys, persistence/current/original replay mounts and print-media
checks, not just a launch probe. Node **v22.23.4**, pinned Playwright **1.61.1**,
Firefox **151.0** (`firefox-1532`); no dependency/configuration change was needed.

The agent inspected the owner's `test-results/results.json`: 47 Firefox tests
with expected results, no runner errors; start `2026-10-25T11:13:35.592Z`;
SHA-256 `7cb663efd4703a2f6bddbdf3f3de58483a3a18cf2f497e6edfef3a278a1349b3`.
The report corroborates the outcome; the environment override and browser version
come from the owner's command/probe, not from fields in that JSON report.

The unisolated launch remains broken on this host. This resolution neither
disables security protections nor changes verification criteria. Do not use sudo,
grant Full Disk Access or modify/delete a personal Firefox profile to bypass it.
Create a fresh isolated home per run; future full-suite instructions are in the
regression checklist. Manual print previews, device and assistive-technology checks
remain pending separately. Canonical captures and seals were not changed.
