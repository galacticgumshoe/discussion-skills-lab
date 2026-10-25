# Discussion Skills Lab content

Original reference metadata (`*.json`) and instructional prose (`*.md`) are
© 2026 Rhys Jones, licensed under [CC BY 4.0](../CONTENT_LICENSE.md).
Attribution: *Discussion Skills Lab*, Rhys Jones. The Final reference was moved
without instructional changes from `final.html` at baseline
`0b5d2297e7cbc19bd59cde750492dd28e3983ca0`.

Schemas, loaders, renderers and other software remain [MIT](../LICENSE).
These grants do not include third-party libraries, fonts, marks or other
third-party materials; see [third-party notices](../THIRD_PARTY_NOTICES.md).
The existing root license grants remain authoritative.

## Authoring / validation

Node **22+** is needed only for development: `npm ci`, then
`npm run validate:content`. Static hosting needs no install or build.
Only reference documents exist in this milestone. All JSON under this directory
is validated as `schemas/reference.schema.json`, plus unique document/item IDs,
safe root-contained paths, and existing regular Markdown files (including realpath
symlink containment). Unknown properties/types/layouts/accents are rejected.

Sources resolve from the declaring JSON, not the HTML. Use unencoded relative
paths with ASCII letters, digits, `_`, `-`, `.`, and `/`; no absolute paths,
queries, fragments, backslashes or percent encoding. Parent segments are allowed
only when the resolved file remains inside `content/`. Prose links are separate:
ordinary relative, HTTPS/HTTP and mailto links are allowed, not executable URLs.
Raw HTML is displayed as text. Blank lines create paragraphs; soft newlines are
not hard breaks. Preserve emphasis with `**…**` / `*…*` and intentional hard breaks
with Markdown hard-break syntax. No student text enters this renderer.
