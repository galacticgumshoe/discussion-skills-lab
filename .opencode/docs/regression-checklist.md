# Preservation regression checklist

## Development requirements and commands

Node **22 or newer**, npm and Git with pinned objects for
`0b5d2297e7cbc19bd59cde750492dd28e3983ca0` are required for tests only. No package
installation or build is needed to publish/serve the site. Existing production
README and deployment configuration are unchanged.

```sh
npm ci
npx playwright install chromium firefox webkit
npm run test:unit
npm run test:browser
npm run audit:production
```

On Linux, browser OS dependencies may require `npx playwright install --with-deps`;
obtain appropriate system-install permission first. The original capture session used an official,
SHA-256-verified Node v22.23.4 darwin-arm64 archive in OpenCode's approved temporary
directory because Node was absent from PATH. No global Node/npm upgrade was made.
Session commands prefixed `env PATH="<approved temp>/node-v22.23.4-darwin-arm64/bin:$PATH"`.
Playwright is development-only and pinned by `package-lock.json`.

### Normal local Node setup

The owner subsequently installed Node v22.23.4 through fnm. npm/npx are bundled
with Node; do not install them separately. For zsh, initialize fnm in `~/.zshrc`
with `eval "$(fnm env --use-on-cd --shell zsh)"`. An agent shell without Node on
PATH can initialize its own process without modifying a shell profile:

```sh
eval "$(fnm env --shell zsh)"
fnm use 22
node --version
```

### macOS 27 Firefox application-data isolation

On this macOS 27.0.1 Apple Silicon host, the pinned Firefox 151.0 launches and all
47 Firefox tests pass when given an isolated application-data home. Without it,
headless startup times out and headed startup shows a misleading **Profile Missing**
dialog. See [diagnosis and results](evidence/firefox-blocker.md).

Use a **fresh temporary directory per invocation**, scoped to the command and its
children (including Firefox); do not reuse the diagnostic directory or permanently
export this variable in a shell profile:

```sh
env CFFIXED_USER_HOME="$(mktemp -d)" \
  npm run test:browser -- --project=firefox --workers=1 --max-failures=1
```

For a full default-suite run on this host, use the same isolation:

```sh
env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser
```

The Firefox-only command passed in the owner's Terminal; the isolated full default
command is documented for future runs, not claimed executed. The override changes
Firefox's application-data home, not student storage keys, policies or assertions.
No sudo, Full Disk Access, security disabling, personal browser profile, browser
patching or dependency upgrade is required. It is a host workaround, not a universal
requirement on other operating systems. `playwright.config.mjs` is unchanged.

`npm run test:serve` prints a random `http://127.0.0.1:<port>` URL. The browser
runner also chooses a random local port and starts/stops its own server. It serves:

- `/` and `/discussion-skills-lab/`: same checkout, no copies/redirects;
- `/__original/` and `/__original/discussion-skills-lab/`: fixed allowlisted Git bytes;
- `/__fixtures/`: isolated fixture files, not production routes.

Traversal, encoded traversal, backslashes, NULs, double-encoding, non-allowlisted
production paths and non-GET/HEAD methods are rejected. Never run test restoration
against the published site or a personal browser profile: localStorage is
**origin-scoped**, not path-scoped. `python3 -m http.server 8000` remains sufficient
for normal production-file serving, but does not implement test replay routes.

## Automated coverage

- Unit: frozen source hashes, exhaustive archived lines and data banks/answers;
  authored map/initialized field and card ordering; actual original core policy;
  fixture provenance; every file on both current/replay mounts; MIME/traversal and
  server lifecycle.
- Browser projects: Chromium, Firefox, WebKit desktop 1440×1000, plus mobile
  Chromium 390×844. Isolated contexts; root and repository-prefix mounts.
- Fresh navigation: first/reference only, mobile selector disabled options,
  collapsed rail, bottom controls, reference with zero completion.
- Each lesson: full real UI completion, one missing prerequisite per counted page,
  all question-bank options/feedback, keyboard/click card flip-back, repeated detail
  exploration, exact assembly punctuation, readonly/editable output, 34/35-character
  Opening boundary, optional/required models/checks, durable correct-ever credit.
- Restores: observed partial/mid/completed/changed answers, empty/zero/Unicode,
  non-contiguous completed pages, Opening absent-earned fallback, both original
  replay mounts. Unsafe records and known losses are characterized separately.
- Clipboard rejection and current persistence gaps are tested explicitly.
- Print: reference-only computed visibility even from page 0 in all engines;
  Chromium PDFs generated under ignored `test-results/`. Canonical PDFs retained
  under `tests/fixtures/visual/`.

Canonical snapshots are **read-only evidence**, not auto-updating expectations.
`tests/fixtures/manifest.json` seals all canonical source, content, maps, progress
and visual files with SHA-256; unit tests verify it. The seal itself is created
once by `seal-fixtures.mjs` using exclusive creation, never automatically updated.
`freeze-source.mjs`, `freeze-edge-fixtures.mjs`, `capture-browser.mjs` are one-time
capture tools, deliberately absent from ordinary npm test scripts. Exclusive
creation rejects existing files. Browser capture `--resume` retains existing files
without updating them and creates only missing artifacts after an interrupted
capture. Do not remove canonical files to bypass that protection. Later migrations
must introduce their own reviewed content assertions, keeping original/replay
evidence intact. `audit:production` is specifically a milestone-1 boundary check,
not a permanent ban on production edits in later milestones.

## Historical evidence and visual review

`tests/fixtures/visual/` contains homepage and all lessons at desktop/mobile,
reference screen captures, print-media captures and three Chromium Letter PDFs.
`environment.json` records browser/Node/platform, viewport, font probes and external
request failures. No instructional regions are masked; no CDN or font mock is used.
Capture waits for `document.fonts.ready`; browser/font rasterization is not a
zero-pixel gate. Captures are historical comparison evidence, not instructions to
reproduce incidental wrapping or spacing.

The original baseline session inspected homepage/all lesson desktop and mobile initial captures,
settled Middle/Final mobile card backs and builder captures, Middle print-media
image, and the three reference PDFs (text extraction; rendered page inspection where
available). They retain readable grouping and reference content; the PDFs have
one page each and no leading blank page or lesson controls. **This does not replace
interactive print-preview checks.** No production presentation differences were
introduced.

The first supplementary explored captures caught live transitions; originals are
retained and explicitly not approved as settled-card references. Separately named
`*-settled-mobile.png` captures wait for actual CSS animations to finish. This is
capture-readiness correction, not a production layout change or baseline overwrite.
`font-readiness*.json` records actual font faces/weights in addition to the initial
400-weight probes; loaded subsets and used heading weights were inspected.

The original Firefox launch blocker is **resolved with the environment workaround
above**: all 47 Firefox checks passed in the owner's Terminal. Initial failures
remain recorded in [`evidence/firefox-blocker.md`](evidence/firefox-blocker.md).
The sandbox-extension/framebuffer messages alone did not establish the root cause.
Firefox remains configured and no tests were skipped or mocked to obtain the pass.

Ordinary reports, traces, failure screenshots, temporary PDFs and node_modules are
narrowly ignored. Do not commit browser profiles, traces or whole test reports.
Small durable execution summaries belong in `.opencode/docs/evidence/`.

## Manual browser / accessibility / print checklist

Status is **pending unless an explicit dated result below or in the handoff says
otherwise**. Use synthetic drafts and a fresh profile.

| Check | Chrome | Firefox | Safari / iOS | Android Chrome |
| --- | --- | --- | --- | --- |
| Tab/Shift+Tab through navigation, options, cards, tabs, details and writing; Enter/Space; visible focus after updates | Pending | Pending | Pending | Pending |
| 200% zoom and 320px width: every front/back, long feedback and draft controls unclipped; no horizontal overflow | Pending | Pending | Pending | Pending |
| Screen reader: inactive faces, meaningful card names, correct expanded states, task tab/panel associations, stable feedback announcements | Pending (AT) | Pending (AT) | Pending (VoiceOver) | Pending (TalkBack) |
| Complete/reload/review, flip back then reload, clear draft/uncheck after credit without relocking | Automated subset; manual pending | Automated subset; manual pending | Pending | Pending |
| Denied storage/clipboard; no real data loss or unusable copied text | Clipboard automated; storage manual pending | Clipboard automated; storage manual pending | Pending | Pending |
| Print button and Cmd/Ctrl+P from activity AND reference; Letter portrait preview with backgrounds on/off, page scale; no controls/questions/leading blanks/clipping | PDF automated; preview pending | Print media automated; preview pending | Preview pending | Device print pending |
| Homepage/lesson links under real repository subdirectory; external font readiness | Local automated; published site not used | Local automated | Pending | Pending |

Real devices, assistive technology and interactive preview remain pending because
no corresponding manual/device checks have been reported. They are explicit follow-up
checks, not fabricated approvals. Essential automated browser captures are required
before calling milestone 1 complete. Follow `.opencode/docs/refactor-status.md` for executed
commands/counts, remaining blockers and whether the next milestone is ready.
