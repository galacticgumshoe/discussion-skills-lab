# Discussion Skills Lab

A series of interactive, self-paced lessons for high school students preparing for the MSHSL Discussion category. The lessons teach skills for the opening, middle, and final stages of a Discussion round. They are educational coaching resources, not official MSHSL rules or judging standards.

## Start here

- **Homepage:** `index.html`
- **Opening Stage:** `opening.html`
- **Middle Stage:** `middle.html`
- **Final Stage:** `final.html`

Each lesson has gated activities, navigation and a Quick Reference. All three lessons share the Discussion Skills Lab visual identity. No build step or Canva account is required to host them.

## Publish with GitHub Pages

1. Create a GitHub repository named `discussion-skills-lab` (public if you want free public Pages hosting and to share the source).
2. Upload **the contents of this folder**, not the ZIP archive. `index.html` must be in the repository root.
3. In **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, `main`, and `/(root)`, then save.
4. Once published, visit `https://YOUR-USERNAME.github.io/discussion-skills-lab/`.
5. Test each lesson, the Quick Reference print view, quiz interactions, and progress restoration on your students' target browsers.

The `.nojekyll` file ensures GitHub Pages serves the static files without Jekyll processing.

## Run locally

From this directory:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/`. HTTP serving is required for native modules and same-origin content loading; do not open the HTML directly using `file://`. Production needs no npm install or build.

### Test with fresh progress

Progress and drafts survive reloads in `localStorage`. To test a first-time visit, use a fresh private browsing session, or reset only the lesson you are testing. **Resetting deletes that lesson's saved progress and drafts**; do this only with disposable local test data, not student work.

On the locally served lesson page, open the browser's developer console (Safari: **Web Inspector → Console**) and run:

```js
localStorage.removeItem('dsl:opening-stage:v1');
location.reload();
```

For Middle or Final, use `dsl:middle:v1` or `dsl:final:v1` instead. To reset all three local lessons, remove each of those three keys before reloading. Avoid `localStorage.clear()`: it also deletes unrelated data on the same origin. The lessons do not use `sessionStorage`, so clearing it is unnecessary.

Storage belongs to the origin (scheme, hostname and port), not the page path. Run the reset on the same origin you are testing; `localhost` and `127.0.0.1`, or different ports, have separate storage. Test both fresh progress and saved-progress restoration—do not reset between the save and reload steps of a persistence test. Clearing progress is separate from clearing the browser's HTTP cache.

### Local server 404s

Safari may automatically request `/apple-touch-icon.png` and `/apple-touch-icon-precomposed.png`. These optional home-screen icons are not supplied; their 404s do not indicate a lesson or saved-progress failure.

There is no `/health` endpoint or health polling in this static site. A plain `python3 -m http.server` returns 404 for that path. Repeated requests likely come from a separate monitoring tool, browser extension or development environment; inspect the browser's Network initiator or the requesting tool to identify them. Clearing lesson storage will not fix that polling. Requests for actual lesson HTML, CSS or JavaScript should succeed and warrant investigation if they return 404.

## Maintain and extend the site

Start with the **[Website maintenance handbook](docs/maintenance.md)**:

- [Edit content](docs/editing-content.md): prose, headings, questions,
  answer keys/feedback, writing models, checklists, Quick References and homepage.
- [Change controls and flow](docs/controls-and-flow.md): buttons,
  navigation, reveals, completion rules, styles and saved-progress implications.
- [Add modules](docs/adding-modules.md): complete copyable worksheet
  starter, interactive lesson extensions, reference-only resources and catalog links.
- [Check changes](docs/checking-changes.md): scoped tests, manual review,
  troubleshooting and separately approved publication.
- [Use the maintenance skill](docs/using-maintenance-skill.md): guided agent prompts
  with `@dsl-maintenance` and optional `/dsl-*` shortcuts.

These guides describe the current code. Most wording changes are Markdown/JSON
edits; behavior changes need JavaScript and compatibility tests. No CMS or build
step is required. Lasting human-facing documentation lives in `docs/`; agent
instructions and refactor history/evidence live separately under `.opencode/`.

### Add a lesson

See [adding modules](docs/adding-modules.md) for the complete recipe and
[controls and flow](docs/controls-and-flow.md) for implementation responsibilities
and saved-progress compatibility.

1. Supply `lessons/<id>/config.json`, a content manifest and Markdown/activity/reference files under `content/<id>/`. Preserve stable IDs, question order and answer/feedback associations.
2. Use a thin static module importing `assets/js/app/lesson-app.js`, shared components and a small pure completion policy. Do not copy activities or use the retired classic global engine.
3. Keep all three existing lessons on their v1 codecs/keys. Brand-new modules may use the documented ID adapter and a fresh `dsl:<id>:v1` key; read-only references can disable storage. Worksheets need no pretend final quiz.
4. Retain a small root HTML entry for each distinct public URL, with an empty `.app-shell` mount, no-JS notice and the shared styles/entry module. The shared shell supplies structural controls; homepage wording comes from `content/home.md` and ordered cards from `content/catalog.json`, not copied markup.
5. Validate content and test affected journeys, saved progress, keyboard/mobile navigation and reference-only printing on both root and repository-prefix mounts. `tests/fixtures/new-module/` demonstrates extensibility without publishing new instruction.

**Design standards:** navy/teal/light blue/white; DM Sans and Fraunces; expandable rows styled like Middle Stage section 02; flashcards with an edge-to-edge white front, a visible bottom-right flip cue, a 3D transition, a navy reverse, and an Explored indicator; quiz choices visibly highlighted and explorable after completion.

## Privacy and technical limitations

- Student progress and drafts are stored in **browser `localStorage`**, not on a server. They do not synchronize between devices, browsers, or site origins. Clearing browser data can erase progress. No student accounts or instructor dashboard are included.
- The current lesson pages load **Tailwind CSS from a CDN** and **Google Fonts** over the network. The site's own HTML, JavaScript, and CSS are hosted by GitHub Pages, but the current design is not fully offline or self-hosted.
- External libraries and font files are provided under their respective licenses, not relicensed by this repository's MIT license.
- If you embed lessons in Google Sites, test on mobile and in browsers with restrictive third-party storage settings. Direct links to GitHub Pages are the simplest supported student experience.

## License and attribution (dual license)

Discussion Skills Lab uses **two licenses**, depending on the material:

- **Software code and implementation:** [MIT License](LICENSE). This covers the HTML/CSS/JavaScript implementation, layout, navigation, interactive behavior, and other original software code.
- **Original instructional content:** [Creative Commons Attribution 4.0 International (CC BY 4.0)](CONTENT_LICENSE.md). This covers original lesson text, teaching explanations, examples, activities, questions, answer feedback, Quick References, and homepage educational copy, even when embedded as text inside HTML or JavaScript.

Files containing both code and lesson text have **mixed licensing**: each license applies to its respective material. Third-party fonts, libraries, marks, and materials remain subject to their own terms and are not covered by these grants. See [`CONTENT_LICENSE.md`](CONTENT_LICENSE.md) for attribution guidance and the official CC BY 4.0 license link.

Copyright © 2026 Rhys Jones. The original instructional content was developed by Rhys Jones. For reuse of instructional content, credit *Discussion Skills Lab*, created by Rhys Jones, link to CC BY 4.0, and indicate any changes.

## Maintenance

Develop on a non-`main` branch. Only after testing, browser verification and explicit approval should changes be committed/merged/pushed to `main`; the configured GitHub Pages branch deployment then republishes automatically. Publication, tags and Pages settings are separate approval decisions, not automatic refactor steps. Retain original evidence and test progress/print styling before release.

`npm ci`, `npm run validate:content`, `npm run test:unit` and `npm run test:browser` are development tools, not a production pipeline. Prefer impact-scoped test files/projects during editing; [checking changes](docs/checking-changes.md) documents commands, Firefox's macOS workaround and manual review. Vendor versions/checksums/update procedure are in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Never rewrite baselines merely to hide a content, policy or accessibility regression.
