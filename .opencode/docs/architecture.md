# Static architecture

## Current checkpoint (milestone 8, 2026-10-28)

All three public lessons use the common app, generated shell, external content
and semantic print stylesheet. The homepage loads its Markdown and catalog through
the shared safe loader. The owner approved inventory v2's reviewed S/H/P/R and
T01/T03–T07 scopes on 2026-10-28; those cutovers/removals are implemented locally.
Public-entry tests no longer intercept replacement HTML/CSS; the three temporary
staging/review/archive helpers are retired. Remaining temporary harnesses have
conditional assertion-port/consolidation work; see the
[removal inventory](legacy-removal-inventory.md). Milestone 8 is incomplete pending
that work and owner browser verification. Nothing is committed, published or
approved for release.

Owner scope clarification: inventory **v2** reviews all migration scaffolding,
including the remaining whole-Middle preview route, partial lesson harnesses,
intermediate cutover helpers, one-off extraction/capture tools and this milestone's
own staging helpers. A dependency from temporary tests is not a reason to keep a
temporary application permanently. Preserve unique regression assertions by
retargeting them to public pages or suitable generic fixtures before deleting their
old containers. Sealed original-engine/content/progress evidence remains distinct
from disposable migration code; see the inventory's per-file audit and port plans.

## Tree and ownership

```text
index.html, opening.html, middle.html, final.html   stable public entry URLs
.nojekyll                                         branch-hosted static Pages
assets/js/{opening,middle,final}.js                thin static imports/mount
assets/js/app/lesson-app.js                       one bootstrap/writer per root/key
assets/js/app/lesson-shell.js                     generated structural shell
assets/js/app/lesson-core.js                      explicit-ID navigation, no storage
assets/js/app/{content-loader,markdown}.js         checked fetch + sanitized Markdown
assets/js/app/{section-renderer,reference-loader}.js bounded composition/independent reference
assets/js/app/{progress-store,legacy-progress,id-progress-adapter}.js state/codecs
assets/js/components/, activities/, utilities/   shared controllers/formatters
assets/js/home.js                                safe homepage renderer
assets/css/tokens.css                            shared identity
assets/css/shared.css, components.css            shell/base and interaction presentation
assets/css/reference.css, print.css, home.css     semantic layouts/print/home
assets/css/{opening,middle,final}.css              retained genuine lesson profiles + reviewed legacy
assets/vendor/                                   pinned browser modules and licenses
lessons/<id>/{config.json,completion.js,progress-adapter.js,runtime.js} mechanical configuration/policies/bindings
content/<id>/lesson.json, sections/, activities/, reference/  CC BY instructional sources
content/home.md, catalog.json                    authoritative homepage copy/order
content/{middle,final}/legacy-variants.json        retained nonpublished exact variants
schemas/, scripts/, tests/                        development validation/evidence only
.opencode/docs/                                  architecture, inventories, handoffs/evidence
```

`runtime.js` is needed only for a lesson's static presentation/legacy bindings;
Final uses the standard registry. New modules must not copy activity controllers.
The retired classic **`assets/js/lesson-core.js`** is distinct from the active module
under `app/`. Its production copy is removed; independent sealed original source
and pinned replay consumers remain. No fallback reads a missing production file.

## Bootstrap → state → render

1. The thin native module selects a config, codec, pure gates and optional registry
   with static imports. JSON never selects executable code.
2. `mountLesson` reserves a single mount/key. Existing roots supply hooks; empty
   roots use `mountLessonShell`. Its accessible loading/retry area appears first,
   without an unlocked rail or a flash of every section.
   The skip link focuses/scrolls to main without adding fragment/routing state;
   reload therefore still uses the same checked document URL.
3. Load/validate config and manifest; verify identities and explicit section order.
   The generated shell uses validated title/duration metadata. Each view starts
   hidden. Navigation receives the ordered section records, not sibling order.
4. Prepare activities and independently start the reference loader. Read/decode
   storage through the selected codec, hydrate components without change events,
   and update navigation. Neither bootstrap nor retries save defaults.
5. On meaningful changes, bind own component state → normalized state → pure
   readiness-guarded completion policy → permanent completed-section union → codec
   serialization. Input saves are immediate. UI render does not steal focus.
6. Retry individual failed content without inventing activity credit; reference
   failure/readiness status remains truthful, including native printing.

Existing records keep their three v1 keys/codecs. New IDs may use the small
identity adapter and `schemas/id-progress.schema.json`; read-only references
disable storage, without a final quiz or completion policy. See
[progress compatibility](progress-compatibility.md).

## Supported composition

Bounded manifest blocks: Markdown (`lead`, `note`, `instruction`, `label`, decorative
`symbol`), activity, group, reference, progress summary and navigation actions.
Groups nest at most three levels; layouts are `stack`, `two-column`, `flow`,
`roundtable`; tones are `plain`, `callout`, `caution`, `example`, `activity`, `soft`.
Reveals are keyed by stable IDs and static pure policies, not CSS/DOM gate tests.

Activities: flashcards, controlled expandables/timeline, multiple-choice,
question-sequence, writing/checklists, note-classification and task-analysis.
Sequence profiles preserve Opening current-answer/all-at-once exceptions,
Middle scenario/quiz/application composition and Final non-wraparound questions.
Writing profiles: `draft`, `opening-consensus`, `middle-evidence`, `final-synthesis`.
See actual closed schemas and validators before adding metadata; no arbitrary HTML,
styles, expressions, plugins or content-supplied executable paths are supported.

References use `opening-reference` (four grid groups), `middle-reference` and
`stacked-reference` (Final). Semantic hooks are `data-view-role="reference"`,
`data-reference-sheet`, `data-reference-layout`, `data-reference-accent` and the
reference status/content/retry/print hooks. `print.css` hides ordinary
views and UI and shows the reference even with `[hidden]`, independent of view IDs
or screen position. It is loaded **last**, after lesson profiles. Exactly nine
reviewed old print blocks are removed. Mixed legacy screen aliases and Middle's
embedded old print rule remain deferred, not certified unused. Direct public-page
tests prove semantic isolation with renamed/reordered/renumbered views; publication
and interactive browser/print-preview sign-off remain separate.

## Loading/security/dependencies

Config resolves from the document's base URI; includes resolve from their declaring
JSON/Markdown URL inside the allowed content subtree. Same-origin fetch rejects
redirects, absolute includes, unsafe schemes, encoded/traversal escapes and missing
files. Runtime closed validators mirror full development Ajv schemas; semantic
checks add cross-file IDs, unique activities, answer references and catalog
destination/config/manifest identities. HTTP serving is required, not `file://`.

One Markdown wrapper imports local **markdown-it 15.0.3** and **DOMPurify 3.4.17**.
Raw HTML/linkify/typographer/plugins are off; sanitize to prose-only elements and
safe links before insertion. Catalog labels use `textContent`; student text uses
`.value`/text nodes and never the Markdown/HTML pipeline. Shell HTML is a constant
software template without interpolated instructional data.

Keep Tailwind **CDN 3.4.17** and Google Fonts DM Sans/Fraunces unchanged. The site
is not fully offline. For reviewed vendor updates, follow
`THIRD_PARTY_NOTICES.md`: verify official versions/archive integrity, inspect
notices/maps, retain licenses, update checksums intentionally and rerun security,
content and affected interaction/print tests. No automatic vendor update/build.

## Deployment, exceptions and licenses

Production needs static HTTP files, no npm, framework, database or build. Pages
continues **Deploy from a branch → main → /(root)**; a tested, explicitly approved
merge/push is a separate task, never part of milestone implementation.

Root HTML retains viewport/title/favicon/vendor links, small document-title and
fallback labels. The homepage keeps three generic fallback links until
successful atomic rendering, and says lessons require JavaScript. Footer copyright
and license links remain structural; educational introduction/progress/disclaimer
and exact cards are canonical external content. Homepage Markdown has five bounded
blocks (eyebrow paragraph, h1, introduction paragraph, progress paragraph,
disclaimer paragraph), not a new card/Markdown engine.

Code/config/test labels: MIT. Original instruction, homepage copy, extracted
fixtures and archived variants: © Rhys Jones, CC BY 4.0. Vendor grants/notices
remain separate. Frozen source/captures/maps and historical handoffs remain
immutable; old root `docs/` evidence paths map to `.opencode/docs/`.
