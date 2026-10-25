# Milestone 3 verification — 2026-10-25

Starting HEAD: `3bee6023adc7d0fa395ae8c7e79262f8c06b04f9`.
Branch: `refactor/shared-components`; clean at entry. No commits/publication.
Implementation and automated verification are finished. **Milestone remains
incomplete pending the required interactive Chrome/Firefox/Safari print previews**;
the agent performed file-based visual/PDF review, not those previews.

## Commands and outcomes

Agent shells initialized Node with:

```sh
eval "$(fnm env --shell zsh)"
fnm use 22
```

Node v22.23.4, Playwright 1.61.1; macOS host with fresh command-scoped Firefox
application-data isolation. No sudo/security changes, personal profile or live
Pages origin. All student text in tests is synthetic.

| Command / stage | Result |
| --- | --- |
| `npm run test:unit`, before edits | Passed 7/7 |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser`, before edits | Passed 196/196 across Chromium, Firefox, WebKit, mobile Chromium |
| `npm install --save-dev --save-exact ajv@8.20.0` | Passed; five development packages added, zero audit vulnerabilities; existing Playwright pins unchanged |
| `npm run validate:content` | Passed: reference schema, unique IDs, safe paths, existing Markdown and symlink containment |
| `npm run test:unit`, final implementation | Passed 47/47, zero failures/skips; includes all original sealed-fixture/replay assertions |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/content-security.spec.mjs tests/browser/reference-loading.spec.mjs tests/browser/baseline.spec.mjs tests/browser/print.spec.mjs --project=chromium --max-failures=2` | Focused run passed 29/29 before the final extra offline/print assertions |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser`, final implementation | Passed **236/236**, 59 per configured project; zero failed/skipped/flaky, no runner errors; 358.939456 seconds |
| `git diff --check` | Passed for tracked edits; original vendor licenses/distributions copied byte-for-byte |

Final ordinary browser report: `test-results/results.json` (ignored).
Start: `2026-10-25T13:02:34.078Z`; SHA-256:
`15fdbdc94e880f68755978dd9601fbebbaf955b348b3ebd5557902034b8e1ccd`.
Root `/`, repository `/discussion-skills-lab/`, and both original replay mounts
were exercised. The full suite includes all baseline activities/gates, every
answer/feedback, restoration, Opening extraction, all three references and print.

Initial development harness runs caught two bounded-source assertions expecting
no final HTML newline, plus a new test referring to nonexistent `partial.json`.
The helper now explicitly permits the added final LF; the test uses sealed
`partial-first.json`. The first browser attempt collected no tests because of that
missing fixture. No sealed evidence, instructional assertion, runtime engine or
snapshot was rewritten/relaxed to hide these mistakes. Final runs above passed.

## Content preservation / scope

Before removing inline content, a Chromium off-DOM render of the extracted data
was compared against the still-present inline `#ref-content`: all five
headings/numbers/accents, 11 paragraphs, normalized text, punctuation and inline
emphasis tokens matched. This pre-removal probe passed. The permanent browser test
repeats the same semantic comparison against the pinned `final.html`, independently
of screenshots, on both mounts in all four projects.

Current inventory: [milestone-3/reference-semantics.json](milestone-3/reference-semantics.json).
Source → content mappings: [content inventory](../content-inventory.md).
Only nonsemantic whitespace outside inline text is normalized. Baseline content,
answer keys/feedback, fixtures and their seal remain unchanged. A bounded Final
HTML transformation test preserves all activity/shell markup except the reference
payload, disabled Print/loading/retry UI, pilot module dependency and final LF.
`assets/js/final.js`, classic core, CSS, Middle and mechanically extracted Opening
remain pinned; no completion policy, storage format or activity behavior changed.

## Loading, validation and security

- Runtime exports: checked URL resolution, status-checked JSON/Markdown fetches,
  schema-aligned reference boundary validation, Markdown-to-safe-fragment wrapper,
  and atomic reference item renderer. The layout registry has only the actual
  `stacked-reference` implementation. `loadedBodies` is a Map from item ID to
  `{ source, url }`; all fetching is orchestrated outside the component.
- Full draft-07 JSON Schema plus semantic checks validate the only introduced
  content type. 34 shared invalid fixture cases are rejected by development and
  browser runtime checks: unknown/missing properties, invalid versions/types,
  empty values, duplicate IDs, enums, unsafe/foreign/encoded/traversing/non-Markdown
  sources. Development tests additionally exercise invalid JSON, all-error
  reporting, missing files, escaping symlinks, and no content rewriting.
- Includes are unencoded local relative paths, root-contained after URL
  normalization. Queries/fragments, schemes, protocol-relative paths, backslashes,
  whitespace and all percent encoding are rejected. Root includes resolve using
  `document.baseURI`; Markdown resolves from its declaring JSON. Fetches reject
  redirects and foreign origins, pass abort signals, use no persistent cache, and
  report file/failure type without echoing response data. Failures are retryable.
- Markdown HTML/linkify/typographer are off, no plugins; paragraph/hard-break
  behavior is explicit. DOMPurify uses the allowlist documented in
  `THIRD_PARTY_NOTICES.md`. Malicious HTML, SVG/MathML, forms, embeds, events,
  malformed nesting, unsafe/entity/encoded/control-character Markdown links and
  script-like labels remain nonexecuting. Prose, emphasis, code, list, quotation,
  legitimate source-relative links and an intentional hard break survive tests.
- Startup fetching is independent of navigation and zero progress. Print is
  synchronously disabled while loading; loading/error text remains printable
  from ordinary/reference views. Failed body/JSON/shape/network responses expose
  retry, no partial reference and no credit. Other activities remain enabled.
  Success hides status and enables the one original Print control; its original
  `onclick` calls `window.print()` once. No duplicate listener or `lesson.init()`.
- Instrumented Storage writes/raw progress after original Final initialization
  remain identical across delayed loading, failure and successful retry on both
  mounts/all projects. The new pipeline never accesses localStorage. Full legacy
  restore/draft/earned-credit tests for all three keys and replay mounts pass.
- A repository-prefix browser test aborts every external request and still loads
  the reference from local modules/content. Existing Tailwind/fonts are unchanged;
  the new dependencies need no runtime CDN, npm install or production build.

Dependencies: markdown-it **15.0.3**, DOMPurify **3.4.17** (Apache-2.0 selected),
Ajv **8.20.0**, development-only. Upstream release/tag/archive URLs, integrity,
original licenses (including bundled dependency/helper grants), SHA-256 pins and
update/test instructions are in [THIRD_PARTY_NOTICES.md](../../../THIRD_PARTY_NOTICES.md).
Unit tests verify all 12 retained vendor files against those pins. Reference
metadata/prose remains © 2026 Rhys Jones / CC BY 4.0; root licenses are unchanged.

## Screen and PDF evidence (file-based review, not interactive preview)

New evidence is under [milestone-3/](milestone-3/), not the sealed baseline tree.
A local Chromium 149.0.7827.55 capture compared live pinned replay and pilot at
1440, 390 and 320 CSS-pixel widths. See `capture-results.json` for exact dimensions,
hashes and paths. Every sheet/item dimension matches; no horizontal overflow.
The 390/320 image pairs are byte-identical. The 1440 images differ in bytes but
file-based review found the same visible typography/grouping/wrapping and all
content; no observed layout/clipping regression and no intentional CSS change.
No pixel-equality requirement, region masking or baseline replacement was added.

Agent visually inspected `pilot-1440.png`, `original-1440.png`, `pilot-320.png`
and both rendered PDF pages. The reference remains readable with recognizable
five-item grouping, numbered colored accents and semantic emphasis. The narrow
capture retains the original title focus outline after keyboard/select navigation.

Chromium PDFs from ordinary view 0 and reference view 9 are byte-identical:

```text
80c10e6296774fc312bcf7d7b4cc184e6692d55d00106111943ae0ed648280c0  final-from-view-0.pdf
80c10e6296774fc312bcf7d7b4cc184e6692d55d00106111943ae0ed648280c0  final-from-view-9.pdf
```

Each is **one Letter portrait page (612×792 points)**, no blank leading page,
controls, activities, loading notice or clipping; all five groups and final
paragraph present. Compared visually with sealed
`tests/fixtures/visual/final-reference.pdf`. Native macOS PDFKit was used through
`swift -` to count/render pages and retain extracted `.txt` and `*-page-1.png`.
PDFKit text extraction splits/reorders some glyph runs (e.g. CREDIT/ADVANCE);
this is not a content assertion or a claim those words disappeared. Rendered
pages and independent DOM token assertions preserve them. Both PDF render PNGs
also match (SHA-256 `99aa0ece072c2b7a9f553f4ec296f84ff5ba91c940b57db43b8f60ba689408ab`).
Full-suite Chromium desktop/mobile PDF attachments also cover both site mounts;
all four browser projects pass print-media visibility checks.

### Required remaining manual checks

**Not performed:** interactive Chrome, Firefox and Safari print preview from a
normal activity and Quick Reference, using both the Print button and Cmd/Ctrl+P;
Letter portrait, backgrounds on/off, page scale, complete unclipped prose and no
unrelated lesson/controls/leading blank. No corresponding interactive browser
environment was used. These previews are a **milestone-3 completion blocker**;
do not advance to milestone 4 based solely on automated/PDF evidence.

Physical printing, real Safari/iOS/Android, AT, actual browser 200% zoom and
denied-storage manual checks also remain unverified as in the regression checklist.
The new 320px automated capture is not an exhaustive device/zoom/AT review.
No manual approval, browser-preview success or release readiness is inferred.

## Owner browser confirmation and commit authorization — 2026-10-25

The owner reports fully confirming the milestone-3 changes in their browser on
the Final lesson (the only production lesson changed), and explicitly authorizes
a local commit with **no push**. This is owner-reported browser acceptance, not
agent-performed testing. Browser/version and individual print-preview actions
were not specified; do not infer completion of the named Chrome/Firefox/Safari
preview matrix, physical/device/AT checks or release approval from this report.

For commit packaging, `npm run validate:content` and `npm run test:unit` were
rerun successfully (47/47 unit tests, no failures/skips). The application and tests
are unchanged from the recorded 236-pass browser run; that suite was not rerun
for packaging. Only this confirmation and the append-only handoff were added.

## Owner clarification authorizing milestone 4 — 2026-10-25

After the milestone-4 prerequisite check paused on the incomplete handoff, the
owner reaffirmed that they had already performed full milestone-3 browser
verification and explicitly confirmed proceeding with milestone 4. This resolves
the earlier prerequisite pause by direct owner acceptance; the previous
interpretation of unspecified named-preview details must not continue blocking
the requested implementation. Browser versions/individual preview actions are
still not enumerated here, and no new agent-performed manual checks or release
approval are claimed. Historical results and handoffs above remain unchanged.
