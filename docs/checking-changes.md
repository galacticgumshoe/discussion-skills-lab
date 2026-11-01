# Checking and releasing changes

[Handbook](maintenance.md) · [Content](editing-content.md) ·
[Controls/flow](controls-and-flow.md) · [New modules](adding-modules.md)

## Development setup

Normal preview needs only `python3 -m http.server 8000`. Automated development
checks need Node **22+**, npm and the pinned Git objects used by original replay.
From the repository root:

```sh
npm ci
npx playwright install chromium firefox webkit
npm run validate:content
```

If Node is unavailable in a shell on this host, initialize the installed fnm:

```sh
eval "$(fnm env --shell zsh)"
fnm use 22
node --version
```

Do not upgrade dependencies just to edit instruction. `npm ci` follows the lockfile;
none of these tools is required by production Pages hosting. On Linux, browser OS
dependencies may need `npx playwright install --with-deps`; obtain system-install
permission first.

`npm run test:serve` starts a local server on a random port and prints its URL. It
serves the real checkout at `/` and `/discussion-skills-lab/` without copies or
redirects, fixed allowlisted Git bytes under `/__original/`, and isolated fixture
files under `/__fixtures/`. Traversal, encoded traversal, backslashes, NULs,
double-encoding, non-allowlisted production paths and non-GET/HEAD methods are
rejected. Use it for manual checks that need the same routes as the tests; plain
`python3 -m http.server 8000` is enough for ordinary preview.

## Choose checks by impact

You usually do not need to run every test after a small edit. Start with the tests
for the part you changed, then check that part in your browser.

There are three kinds of automated check:

- **Content validation** finds problems such as invalid JSON, missing files or
  broken references between lesson files.
- **Unit tests** check individual calculations and rules, such as answer keys,
  completion requirements and saved-progress handling.
- **Browser tests** open the website and use its controls, much like a visitor.

The table below lists test files you can use with the example commands that follow.
It is a starting point; a change used by several lessons needs checks in each one.

| Change | Focused automated checks |
| --- | --- |
| Any content JSON/source path | `npm run validate:content`; `tests/unit/lesson-boundaries.test.mjs` |
| Existing lesson prose/questions/models | That lesson's `tests/unit/<id>-preservation.test.mjs` and `tests/browser/<id>-lesson.spec.mjs` |
| Middle full graph/questions/reference | Also `tests/unit/middle-lesson.test.mjs`, `middle-reference.test.mjs`; `tests/browser/middle-questions.spec.mjs`, `middle-reference.spec.mjs` |
| Pure gates or shared access rule | `tests/unit/completion.test.mjs`; `tests/browser/policy.spec.mjs`, `navigation-contracts.spec.mjs`, affected lesson journeys |
| Store/codec/default changes | `tests/unit/progress-adapters.test.mjs`; `tests/browser/persistence.spec.mjs`, `progress-contracts.spec.mjs`, affected public restores |
| Shared components/writing | `tests/unit/component-contracts.test.mjs`; `tests/browser/component-contracts.spec.mjs`, `writing-controls.spec.mjs`, affected public journeys |
| Homepage/catalog/shared shell | `tests/unit/catalog-new-module.test.mjs`; `tests/browser/home.spec.mjs`, `shell.spec.mjs` |
| Common static footer | `tests/browser/footer.spec.mjs`, `home.spec.mjs`; includes every public entry at root/prefix paths, no JavaScript, keyboard focus, narrow layouts and print hiding |
| Reference/print | `tests/unit/content-validation.test.mjs`; `tests/browser/print-isolation.spec.mjs`, `print.spec.mjs`, `reference-loading.spec.mjs`, affected lesson reference |
| Content safety/schema extension | `tests/unit/lesson-boundaries.test.mjs`, `content-validation.test.mjs`, `content-urls.test.mjs`; `tests/browser/lesson-boundaries.spec.mjs`, `content-security.spec.mjs`, `app-lifecycle.spec.mjs` |
| New public module | New dedicated policy/entry/journey/restore tests; `new-module.spec.mjs` tests the shared fixture, **not your new public page** |
| Lesson CSS only | Affected lesson presentation specs and long/revealed states; all consumers if shared CSS changed |

For example, after editing Middle's questions, run `middle-questions.spec.mjs` to
check answer choices, feedback and saved answers. If you change how lessons load
their files, use `lesson-boundaries` to check that missing or invalid content shows
a useful error and can be retried without losing saved work.

Automated checks cannot replace reading your revised lesson. Open the actual page,
try the affected activities and check their feedback, hidden models and reference
sheet as described under **Manual review** below.

Run unit files directly, for example:

```sh
node --test tests/unit/lesson-boundaries.test.mjs tests/unit/opening-preservation.test.mjs
```

Run a fast Chromium browser selection while iterating:

```sh
npm run test:browser -- tests/browser/opening-lesson.spec.mjs --project=chromium --workers=1 --max-failures=1
```

Then run the affected selection across all configured projects, including Firefox
with this host's mandatory fresh command-scoped application-data home:

```sh
env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/opening-lesson.spec.mjs --workers=1 --max-failures=1
```

There are four projects: Chromium, Firefox, WebKit desktop, mobile Chromium. The
existing relevant specs exercise root and repository-prefix mounts; a new spec
must explicitly do the same. A filename/`--grep` subset must be reported as a subset.
The runner starts/stops its own local server. You do not need a separate Python
server for automated tests. Reports/traces/screenshots/PDFs go to ignored
`test-results/`; do not commit entire profiles or reports.

Firefox's temporary home workaround is specific to this macOS host: never reuse
a personal profile, disable security, use sudo or permanently export the override.
Use a fresh temporary directory for each invocation and scope the variable to
that command and its children. This changes Firefox's application-data home,
not the website's storage keys or assertions. It is not generally required on
other hosts.

## Manual review

Use disposable local drafts, never real student data. Start with fresh progress,
then separately test restoration **without clearing between save and reload**.
See [README reset instructions](../README.md#test-with-fresh-progress) for a
single-key local reset. Avoid `localStorage.clear()`. Storage is origin-scoped:
root and prefix paths share it; different hostname/port/scheme do not. Use separate
test contexts for independent journeys.

For each affected page:

- Read every changed paragraph and hidden/alternative response/model, in order.
- Exercise wrong, right, wrong-after-earned-credit; every one-missing requirement;
  draft/check clearing after completion; fresh and saved progress.
- Use Tab/Shift+Tab, Enter/Space, relevant arrows/Home/End; verify visible focus,
  sensible heading focus, stable feedback and useful announcements. On Mac Safari,
  enable system Keyboard navigation and Safari's full Tab navigation preference
  if necessary; don't add a site-specific global Tab trap.
- Check wide desktop, near the lesson's responsive breakpoints, 390px/320px,
  actual 200% browser zoom, long text and reduced motion. A narrow automated
  viewport or enlarged CSS text is not evidence of actual browser zoom.
- Check the target browsers/devices you have. Automated WebKit is not physical
  iOS Safari or a Safari GUI acceptance result. Record screen-reader checks and
  untested device/AT coverage honestly; the owner does not require manual Firefox
  functional testing, but its automated project remains included.
- Print with the button **and** Cmd/Ctrl+P from ordinary/reference screens: loading,
  error/retry, backgrounds on/off, Letter portrait, scaling, readable groups and no
  controls/questions/blank leading page/clipping. More than one page is acceptable
  when content requires it. PDF generation is not interactive preview/physical print.

## Troubleshooting

| Symptom | First checks |
| --- | --- |
| Edited words don't change | Confirm live `content/` file and manifest path, save file, reload/check Network/cache; don't edit fixtures/archives |
| Lesson/content load error | HTTP not `file://`; JSON syntax/schema error; declaring-file-relative paths/case; missing file or invalid ID |
| New module fails after valid JSON | Supply `duration`; config/manifest/adapter order/key must match; define all bound state/defaults |
| New page 404 in Playwright but works with Python | Current test-server root-entry allowlist; do **not** expand the pinned replay list |
| Extra homepage Markdown doesn't render | Renderer expects its five-block structure; schema validation alone doesn't check rendered shape |
| New activity never unlocks Next | Actual policy/default IDs and readiness; metadata/requirement text alone doesn't implement a gate |
| Added group never appears | `revealId` must be returned as boolean true by the imported `revealPolicy`; check circular prerequisites |
| Old completed section won't relock | Expected permanent credit; test new requirements in a fresh disposable context |
| Draft/model doesn't restore | Origin/key, field/binding defaults, codec ownership and storage warning; never clear student work as a fix |
| Old exact-content test fails after an intentional revision | Review the approved delta and version current assertions; never overwrite/reseal originals |
| Reference blank/ordinary content leaks in print | Reference network/readiness notice, semantic role/sheet hooks, `print.css` last, conflicting old numeric rules |
| Unexpected `/health` or Apple icon 404s | See README; not required site assets, unrelated to progress |

Record the exact command, error and state before making changes. Do not suppress
a useful assertion, mask instruction or refresh frozen baselines to obtain green.

Known current issues and verification gaps are tracked in
[agent known issues](../.opencode/docs/known-issues.md).

## Before publication

Publication is a separate explicitly authorized task, not the default end of an
edit. Once release scope is agreed, consider the full interfaces below in addition
to the affected checks, and resolve intended-revision expectations first:

```sh
npm run validate:content
npm run test:unit
env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- --workers=1 --max-failures=1
```

These are **planned commands, not a statement that they ran**. Prefer targeted
checks while editing; a full release run is a separate scope decision.
Retain the actual results and manual gaps, original evidence, `.nojekyll`, relative
paths, existing URLs and license/notices. Review the Git diff and all new public
destinations. Do not change branch deployment, Pages settings, vendors or hosting
strategy incidentally. Pages remains branch-hosted `main` at `/(root)` with no
production build. Only an authorized merge/push publishes; do not use the live
origin for destructive progress experiments.

After an approved publication, smoke-test actual links/assets beneath the real
repository prefix and reference print in a disposable context. Do not assert
published-site verification based on local tests alone.
