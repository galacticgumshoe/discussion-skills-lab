# Milestone 3 — Safe content loading and Final Quick Reference pilot

## Assignment and prerequisites

Read `AGENTS.md` and `.opencode/specs/refactor-contracts.md`. Implement only milestone 3. Require milestones 1–2: immutable content/progress/visual baseline, working test tooling, and mechanically externalized Opening. Verify `.opencode/docs/refactor-status.md` and run the existing suite before editing.

**Outcome:** one real reference loads from licensed JSON/Markdown through a safe, reusable pipeline, with no activity engine or storage migration. Pilot **Final's Quick Reference** because it is independent of completion and has a clear five-item composition.

## Files and ownership

Create:

```text
assets/js/app/content-loader.js
assets/js/app/content-validation.js
assets/js/app/markdown.js
assets/js/components/quick-reference.js
assets/js/final-reference.js                 temporary pilot entry
assets/vendor/markdown-it/…
assets/vendor/dompurify/…
content/README.md
content/final/reference/reference.json
content/final/reference/{summary-synthesis,synthesis-framework,
  effective-summaries,consensus-task,after-round}.md
schemas/reference.schema.json
scripts/validate-content.mjs
THIRD_PARTY_NOTICES.md
tests/unit/{content-validation,content-urls}.test.mjs
tests/browser/{content-security,reference-loading}.spec.mjs
tests/fixtures/security/…
```

Modify `final.html` only for the reference payload/pilot dependencies/loading UI. Existing `assets/js/final.js`, legacy core, activity markup, and progress formats stay unchanged. Add development-only schema validation tooling/scripts to the milestone 1 package files; update tests/inventory/handoff. Do not create every future schema or migrate the full lesson manifest yet.

## Data format

Use this reference-document shape and implement its full schema:

```json
{
  "schemaVersion": 1,
  "id": "quick-reference",
  "title": "Final Stage Quick Reference",
  "layout": "stacked-reference",
  "items": [
    {
      "id": "summary-synthesis",
      "number": "01",
      "title": "Summary vs. synthesis",
      "accent": "teal",
      "source": "summary-synthesis.md"
    }
  ]
}
```

The one-item example illustrates shape only; production must include **all five** existing items, exact headings, numbers, accents, paragraphs, emphasis, example phrases, and punctuation from `final.html`'s `#ref-content`. Do not infer missing content from this example. Reference document metadata and prose are CC BY 4.0. Schema/renderer/loader are MIT. Document Rhys Jones attribution and third-party exclusions in `content/README.md`; do not replace existing root license grants.

Require unique nonempty IDs, exact supported schema version/type values, supported layout/accent enums, nonempty titles, at least one item, and local Markdown sources. Reject unknown properties unless deliberately documented. Runtime checks and development schema tests must agree on invalid cases. Development checks also verify referenced files and safe resolved paths.

## Loader and renderer contracts

Implement small exported functions, with naming kept stable for later milestones:

- `resolveContentUrl(relativePath, declaringUrl, allowedRootUrl)`: returns a checked URL. Reject foreign origins, unsafe schemes, query/fragment-based include tricks, and normalized/encoded traversal outside the content root. Root HTML's pilot reference URL resolves using `document.baseURI`.
- `loadJson(url, {validate, signal})`: check response status, parse JSON, validate before returning. Errors identify file/path and failure type without echoing student data. No storage access.
- `loadMarkdown(url, {signal})`: fetch prose with status checks. No execution/HTML mounting here.
- `renderMarkdown(source, {baseUrl})`: parse/sanitize and return a DocumentFragment or equivalent safe DOM result. Resolve legitimate relative prose links relative to their source document; include URLs are separately constrained.
- `renderReferenceItems(container, documentData, loadedBodies)`: create only the five reference item wrappers/body DOM for this pilot, using safe text assignment for JSON labels. Support a future layout registry without implementing unused layouts.

Cache only in-memory successful requests if useful; failed requests must be retryable. No service worker, persistent fetch cache, backend, or runtime dependency download. Do not scatter fetch calls into each reference item component.

## Dependency selection and security

Vendor official browser-ready distributions of **markdown-it** and **DOMPurify**, selecting currently maintained stable releases during implementation. Do not invent version numbers or copy unreviewed minified code from an unrelated CDN. Record upstream repository/release URL, exact version, original license files, selected DOMPurify license option, SHA-256 checksum, and update/test procedure in `THIRD_PARTY_NOTICES.md`.

Use local classic browser distributions if necessary, loaded once before the module entry; confine any `window.markdownit`/`window.DOMPurify` access to `markdown.js`. Native module-compatible upstream distributions are also acceptable if they work without bundling or bare package imports. Keep all application callers behind the wrapper, not tied to vendor globals. No production `node_modules` imports or new build step.

markdown-it settings: `html: false`, `linkify: false`, `typographer: false`, no plugins. Preserve paragraph/line-break behavior of original content intentionally. Sanitize generated HTML with a documented allowlist: required prose tags (`p`, headings as needed, lists, emphasis, blockquote, code/pre, br, a), only necessary attributes, safe link protocols. Exclude event attributes, scripts, style, forms/inputs/buttons, iframes, remote embeds, SVG/MathML. No arbitrary `class`, style, or data attributes from Markdown. If links open new tabs, add safe rel attributes; do not force new-tab behavior unnecessarily.

Test malicious HTML, Markdown links with unsafe protocols/encoding, event attributes, malformed nesting, and script-like text in both Markdown and JSON labels. Plain script-like text must remain harmless text. Assert no event executes and no instructional output disappears due to over-broad sanitization. Student text is out of scope for this renderer and must never enter it.

## Pilot integration sequence

1. Extract Final reference prose exactly into five Markdown files; capture normalized rendered text and semantic emphasis comparisons against the milestone 1 inventory before removing inline copies.
2. Keep the existing `view-9`, `#quick-reference`, `#ref-content`, `#reference-title`, and `#ref-print` shell, composition classes, and legacy print rules. The legacy script binds `ref-print`; don't replace or duplicate that control/listener.
3. Leave reference title/control structural elements present synchronously. Mark Print disabled while loading; keep explicit visible loading/error status (hidden in successful print output). The pilot module fills only `#ref-content` and then enables Print. It must not rerun `lesson.init()` or legacy activity initialization.
4. Fetch reference content at page startup, independent of navigation/gates. Selecting Quick Reference immediately must display loading/retry state, not a locked or blank section. Preload so printing from an ordinary lesson page can include the reference once ready.
5. A content failure must expose retry, keep other lesson activities usable, and grant no credit. A print attempt before readiness must show a truthful loading/error notice rather than printing unrelated lesson content. Never claim a reference was printed successfully before content exists.
6. Legacy Final may still save state during its original initialization; do not change that engine in this milestone. The **new reference loader** must perform no storage writes. Verify its success/failure/retry does not alter progress.
7. Keep the temporary pilot entry small. Milestone 6 will fold it into the common app and remove the separate entry only after parity tests pass.

## Validation command

Introduce `npm run validate:content`, backed by `scripts/validate-content.mjs`, with a documented Node version. It validates all content types currently introduced (only reference here) and referenced Markdown existence/path safety. Ajv can be a pinned development-only dependency; runtime boundary checks must not rely on a production package loader. Report all actionable validation errors, return nonzero, and never repair or rewrite content automatically.

## Tests and acceptance

- [ ] Existing five-item reference content, order, emphasis, example phrases, and accents preserved; no duplication or omissions.
- [ ] Content equivalence is asserted independently of screenshots; any minor presentation difference satisfies the contracts' testing hierarchy and has documented evidence, not a pixel-perfect requirement.
- [ ] Vendor copies are local, pinned, licensed, and traceable; production needs no npm install/build.
- [ ] `npm run validate:content`, unit/security tests, and all baseline browser tests pass.
- [ ] Root and repository-prefix mounts work; nested sources resolve from reference JSON, not HTML location.
- [ ] Unsafe JSON shapes, foreign/traversing paths, missing files, invalid JSON, network failures, and retry are covered.
- [ ] Reference available with zero progress; Print disabled/loading honestly until ready; one control and unchanged legacy print handler.
- [ ] Print media/PDF includes only Final's reference when invoked from normal lesson and reference views. Manual preview evidence is recorded, not assumed.
- [ ] Reference loader never writes localStorage; valid Final progress restoration and Middle/Opening remain unchanged.
- [ ] `.opencode/docs/refactor-status.md` records exact dependencies, tests, evidence, pending manual checks, and next-step readiness.

Stop here: no shared activity migration or storage rewrite. Suggested review units: (1) dependency notices and safe loader/validation; (2) verbatim reference data; (3) Final pilot integration and regression evidence.
