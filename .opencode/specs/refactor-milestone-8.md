# Milestone 8 — Consolidate shell, homepage, styles, and authoring documentation

## Assignment and prerequisites

Read `AGENTS.md` and `.opencode/specs/refactor-contracts.md`. Implement only milestone 8. Require milestones 1–7: all three lessons run on the shared runtime, their content is external, all old progress codecs and standards repairs pass, and reference layouts have baseline evidence. Check handoffs and run full validation/unit/browser suites before editing.

**Outcome:** a coherent, documented static architecture with shared shell/style/print implementations and a content-driven homepage. This is the final implementation milestone before a **separate** approval/release task. Do not merge to main, deploy, tag, push, change Pages configuration, or declare publication approved.

## Files

Create or finalize:

```text
assets/js/app/lesson-shell.js
assets/js/home.js
assets/css/{tokens,shared,components,reference,print,home}.css
content/home.md
content/catalog.json
schemas/catalog.schema.json
.opencode/docs/{architecture,authoring,progress-compatibility,
  regression-checklist,legacy-removal-inventory,refactor-status}.md
tests/fixtures/new-module/…
tests/browser/{shell,home,new-module,print-isolation}.spec.mjs
```

Modify root HTML entry pages, thin entry scripts/app orchestration, relevant remaining lesson styles, README, schemas/validation/tests/inventory/known issues. `assets/js/lesson-core.js` (legacy classic global implementation), remaining temporary pilot files, and obsolete lesson helpers/styles are **removal candidates, not preapproved deletions**. Prove their consumer/content status, then obtain explicit user approval through the checkpoint below before removing them. A baseline harness may intentionally depend on original engine fixtures: preserve the fixture/provenance rather than deleting rollback tests.

Do not remove meaningful instructional archives. Do not implement a frontend build, generic plugin system, new instructional module for publication, database, routing overhaul, or automatic grading.

## Mandatory legacy-removal approval checkpoint

**Before any milestone 8 cleanup deletion, create a final proposed-removal inventory in `.opencode/docs/legacy-removal-inventory.md`, present it to the user, and stop for explicit approval.** This gate covers whole files and selectors, functions, globals, inline handlers, or other legacy implementation blocks inside retained files. Do not bypass it by pruning code while reformatting, overwriting a mixed file, or calling removal an incidental consolidation. Already completed, scoped source moves/cutovers from earlier milestones are not retroactively part of this gate; any remaining milestone 8 cleanup is.

### Inventory contents

Give each candidate a stable review ID. Record the inventory version/date and source commit plus relevant working-tree file hashes or equivalent evidence identifying the exact reviewed versions. List exact paths and, for partial-file removals, the selector/function/symbol and source range or identifying excerpt. No broad wildcard deletion proposals or labels such as "all old CSS."

For every candidate, include:

- **Scope and replacement:** what would be removed (entire file or precise block), what it does, the shared replacement if any, and why it appears obsolete. A replacement existing is not by itself proof that the old implementation is unused.
- **Consumer evidence:** production imports/script links/inline handlers, dynamic selectors/generated markup, configuration, development tools, tests/fixtures, and original-engine replay consumers. Cite searches and relevant test evidence, including responsive, revealed/hidden activity, and print states. "No grep matches" or one uncovered browser session is insufficient alone.
- **Classification and disposition:** use the categories below, separating mixed-file portions where necessary. Do not classify a whole mixed file as obsolete just because its code is redundant.
- **Instructional-content audit:** list any prose, examples, questions/keys, feedback, models, templates, or other meaningful variants in the candidate. Link each to its canonical content/inventory entry or retained non-published archive with provenance/license. State explicitly if none exists; similar wording elsewhere does not prove equivalence.
- **Retention/replay plan:** identify exact retained fixture/archive paths and pinned replay source dependencies, or explicitly state none. Show that required artifacts remain available and tests still exercise the original engine; Git history alone is not an undocumented substitute for an instructional-variant archive.
- **Verification and risk:** checks already run, pending checks, potential impact, and tests to rerun after removal. Identify unresolved assumptions rather than marking them safe.
- **Approval state:** `proposed`, `approved`, `retain`, or `defer`, with the user decision reference for approved removals. The agent cannot approve its own proposal.

Classify all candidates into these review groups:

1. **Obsolete runtime implementation:** no remaining required production/development/test consumer; proposed for removal only after evidence and approval.
2. **Baseline/replay dependency:** still needed by original-engine replay, rollback compatibility tests, or baseline fixtures. Retain the required artifacts. If removing only a production copy is safe because replay uses an independently retained pinned source, document and prove that distinction; do not delete the test dependency itself.
3. **Instructional variant or mixed code/content:** meaningful material must remain in canonical content or a non-published archive with provenance. Separate the proposed code deletion from the content-retention decision, and verify equivalence/archival coverage before proposing removal of the old container.
4. **Unresolved or still active:** retain/defer. Do not delete on the assumption that later tests or migrations will make it safe.

### Approval and resumption rules

Prepare the replacement implementations and evidence without deleting cleanup candidates. Once the inventory is ready, append the contracts' exact handoff with milestone 8 **incomplete**, identify the proposed removal IDs/inventory version under **Decisions requiring approval**, and ask the user to approve or retain those items. Pause there; general approval of the refactor/specification/milestone, passing tests, or absence of objections does not authorize deletions.

On resumption, read the inventory, handoff, and explicit decision. Remove **only approved IDs** after checking that reviewed sources, replacements, consumers, and retention evidence still match. An added candidate or materially changed scope/evidence needs a revised proposal and renewed approval for affected items; do not extend an approval by analogy. An approval can be partial: retain/defer the rest, and do not mark the milestone complete if an unresolved item blocks required functionality or verification. Keeping a harmless legacy item with a documented disposition does not require deleting it to finish.

After approved removal, rerun relevant regressions and the final suite, reconcile inventory dispositions with actual changes, and append the standard handoff including the approval reference and retained baseline/content artifacts. Removal approval grants no permission to commit, merge, push, or publish.

## 1. Shared shell

`lesson-shell.js` creates the common header, rail, progress display, collapse button, mobile selector, status area, content host, and bottom controls from structural templates and validated lesson metadata. Keep the root HTML pages as public entry points and document metadata/favicon/dependency references. Small repeated page titles/fallback metadata are a documented practical exception to complete content removal, not permission to duplicate full instructional prose.

Use existing semantic hooks/IDs where tests or references rely on them. Preserve total counts, label wording, header duration, first-page navigation, section headings/focus, mobile breakpoint behavior, and reference availability. Add/retain a working skip-to-main link for lessons without changing progression. Navigation reads the explicit section list, not the order of generated DOM siblings.

Avoid flashes of all lesson sections while loading. Display accessible loading/retry states; do not construct a fake unlocked lesson on failure. Loading the instructional manifest must not trigger a default-state save. Reference loading remains independent of failed activities, and Print can show truthful readiness status.

The shell and app are mounted once per document. Ensure stylesheet/script load order and vendor initialization are deterministic. Native ES modules need no production build. Propose legacy globals for removal only after all consumers have migrated, including accidental inline handlers; removal requires the approval checkpoint and must not break fixtures that intentionally replay old code.

## 2. Shared CSS and semantic print isolation

Consolidate incrementally, not by rewriting all selectors at once:

1. Move palette/type/spacing variables into `tokens.css`; preserve the visual identity and intentional lesson variants. Minor spacing adjustments follow the contracts' testing hierarchy rather than an exact-pixel requirement.
2. Keep shell/responsive/focus/base rules in `shared.css` and component behavior in `components.css`.
3. Put reference sheet/common accent styles in `reference.css`; retain explicit layout profiles for Opening's grid and Middle/Final's compositions.
4. Put reference-only print behavior in `print.css`.
5. Extract homepage CSS to `home.css` without changing visual composition.

Use semantic reference hooks such as `[data-view-role="reference"]` on the section and `[data-reference-sheet]` on the sheet. Mark lesson views explicitly if needed. Print rules must hide all ordinary lesson views/nav/header/status/controls, then show the reference **despite hidden attributes**, independent of section ID, numeric index, or current screen page. Avoid specificity fights in which a broad `.lesson-view[hidden]` rule beats reference print rules. Print from Ctrl/Cmd+P on a non-reference page is required, not just clicking Print while reference is open.

Include Opening-specific shared `#view-7` print assumptions and Middle/Final compensating numbered overrides in the removal inventory. Remove them only after replacement tests pass **and the user approves those IDs**. No flashcards/quizzes/goals/hidden drafts should leak into printed output. Preserve colors with print-color-adjust where supported, letter-portrait margins, readable scale, break avoidance, no clipped long items or blank leading page. Do not force a one-page PDF by hiding instructional content.

Prove unused selectors/helpers via source references and coverage across all viewports/views/reveals; a selector absent on the first page is not necessarily dead. Inventory exact aliases/old `.layout`, `.sidebar`, `.masthead`, etc. and obtain item-specific approval before deleting them. Retain small genuine lesson presentation variants; neither uniform typography nor pixel-perfect historical geometry is the goal. Prioritize exact instructional content, working interactions, accessibility, and unclipped responsive layouts. Document minor permitted presentation differences; no broader redesign, unrelated reformat churn, or aggressive minification.

**Keep Tailwind CDN and Google Fonts as-is in this milestone.** Removing runtime Tailwind/self-hosting fonts can be proposed as a separate task after parity, with network/license/size tradeoffs. Do not claim this milestone makes the site fully offline.

## 3. Homepage and catalog

Move homepage educational introduction/progress/disclaimer wording into `content/home.md` (split fragments if needed) and exact lesson card titles/descriptions/order/links into `content/catalog.json`. Use the existing safe loader/Markdown wrapper and text-safe catalog renderer, not a second Markdown implementation or new card engine.

Catalog schema should require supported version, unique lesson IDs, exact safe relative URLs, titles/descriptions, and stable ordering. Preserve current root links `opening.html`, `middle.html`, `final.html`. Validate URL destinations and cross-check lesson IDs. Do not let catalog data load arbitrary remote executable modules. Keep copyright/license links and educational disclaimer intact with documented licensing scope.

Maintain useful no-JavaScript/error navigation: a small structural fallback with links to the three existing lesson URLs and generic labels is acceptable; do not duplicate all prose/card descriptions as a second authoritative content source. Hide/remove that fallback only after successful rendering, and show a clear message if enhanced homepage content fails. Lessons already need JS; explain that limitation rather than offering fake interactive no-JS behavior.

Adding future catalog entries should not require copying card markup. Static entry files remain necessary for distinct public lesson URLs; that small mechanical step is acceptable without a build.

## 4. Demonstrate extensibility without publishing new instruction

Create a **test-only** sample module under fixtures, using clearly attributed existing content excerpts or non-instructional test labels. It must use new ID-based progress independent of all three legacy keys, the same shared runtime, and no copied interaction implementation.

Test at least: Markdown explanation, one shared activity, nontrivial completion/unlocking, writing/checklist or worksheet mode, always-accessible reference, and print isolation. A reference-only/ungated configuration must work without pretending there is a final quiz. This can be covered by separate small fixture configurations. Reuse components, do not implement a new general LMS/resource framework.

No new production lesson/card or invented coaching material. Document stable-ID rules and how a future author supplies content/config and a small completion policy only when necessary. For new modules, use a documented ID-based storage format validated by schema; **do not migrate existing lessons off their v1 codecs**. Separate fixture storage identities and state that no rollback to pre-refactor code is promised for brand-new modules that never existed then.

Keep the new-module format simple: a fresh unique `dsl:<new-module-id>:v1` key and a record containing `schemaVersion: 1` plus the normalized state fields from the contracts, handled by a small identity/default adapter through the existing store API. This is not a new storage service or migration system. Read-only references can disable persistence entirely. Cover missing/corrupt/unknown-version records consistently with the store's safety policy. Legacy lessons continue to encode their existing formats through their own adapters.

## 5. Documentation and licensing audit

`.opencode/docs/architecture.md`: actual tree, bootstrap/content/state/render flow, supported profiles/block types, safe loading, reference behavior, no-build deployment, vendor versions/update procedure, and deliberate exceptions.

`.opencode/docs/authoring.md`: concrete steps to edit prose/questions/feedback/models/criteria/reference, validate changes, preserve IDs and answer order, add a lesson/worksheet/reference, add catalog entry, test both mounts, and distinguish layout changes from instructional revisions. Include copyable minimal data examples that conform to actual schemas. Any illustrative instructional excerpt retains CC BY attribution; do not invent new coaching guidance for examples.

`.opencode/docs/progress-compatibility.md`: final old→stable mapping references, payload ownership, `data.dslUi` extension and unknown-version handling, malformed-storage behavior, original-engine compatibility, limitations (origin/device, last-writer tabs, unavailable historical UI facts), and requirements for any future separately approved v2 migration.

Update README's add-a-lesson instructions and maintenance guidance to the actual architecture. Explain development-only npm tools vs production serving, external Tailwind/fonts, local HTTP requirement, licenses, no accounts/sync, and explicit tested/approved merge before main publication. Preserve truthful GitHub Pages branch deployment instructions; don't switch deployment strategy.

Verify software/content/third-party boundaries in source, archives, fixtures, and documentation. Keep original licenses. Resolve every content-inventory entry to published content, retained non-published variant, or a specifically approved disposition; no unexplained deletion. Small duplicated document-title/fallback strings must be listed as intentional exceptions.

Finalize `.opencode/docs/legacy-removal-inventory.md` with the approved/retained/deferred outcomes and evidence. It must distinguish retired runtime implementations from artifacts still needed by baseline/replay tests and retained instructional variants; do not collapse all three into a generic dead-code list.

## 6. Final regression matrix

Run `npm run validate:content`, `npm run test:unit`, and the complete Playwright suite at root and repository-prefix mounts. Add/verify:

- All three full fresh journeys and legacy partial/completed/extended fixtures.
- Desktop collapse/mobile selector/skip link/heading focus, persistent credit, correct→wrong exploration, immediate draft/cursor saving.
- Semantic print tests that reorder or renumber a test lesson's views while keeping reference role, proving no `view-7/8/9` dependency.
- Ctrl/Cmd+P-equivalent print media from ordinary/reference screens, zero-progress reference access, one Print button, PDFs/content-completeness assertions.
- Homepage success/failure/no-JS navigation, exact original copy/card order/links/license notices.
- Safe nested paths, schema failures, content retry, vendor loading, storage denial/corruption/unknown extension, no accidental storage writes on bootstrap/failure.
- Test-only new-module/worksheet/reference configurations without implementation duplication or legacy-key collisions.
- Long content, mobile widths, 200% zoom, reduced motion, keyboard and stable live feedback; no hidden duplicate headings/content exposed to assistive technology.

Record real manual Chrome/Firefox/Safari print previews, iOS/Android usability, and screen-reader checks as performed or pending. Automated WebKit is not a claim of testing physical iOS Safari. Preserve original visual captures and immutable content/policy baselines. Classify visual diffs under the contracts' hierarchy, documenting minor permitted layout changes and intentional standards repairs with evidence rather than chasing pixel equality. Unapproved instructional or gate differences remain failures; never hide them by updating fixtures or visual expectations.

## Acceptance and handoff

- [ ] Shared shell and components own duplicated behavior; entry scripts remain thin.
- [ ] Original content/answers/models/criteria/reference and precise gates preserved; inventory fully reconciled.
- [ ] Content/policy checks are hard acceptance gates; visual evidence verifies readable, accessible, recognizable layouts without requiring pixel-perfect matches, and minor differences are documented.
- [ ] Three v1 codecs still protect legacy progress and unknown data; no existing-key migration introduced.
- [ ] Print isolation is semantic, reference-only, and independent of section numbers/current view.
- [ ] Homepage content/catalog externalized, with useful fallback links and unchanged URLs.
- [ ] A fixture proves adding a module/worksheet/reference requires data/config, not copied activity code.
- [ ] Final removal inventory identifies exact files/blocks/selectors, consumer evidence, baseline/replay dependencies, instructional variants, retention destinations, risks, and decisions.
- [ ] Explicit user approval of the reviewed inventory version/item IDs was obtained **before** cleanup deletion; actual removals match that approval, with unapproved items retained/deferred.
- [ ] Removed files/selectors/helpers have verified lack of required consumers; retained baseline/replay artifacts and instructional variants remain available, and rollback/content tests still pass after removal.
- [ ] Documentation/examples/license scopes match actual implementation; Tailwind/font limitations remain accurate.
- [ ] Full automated results and manual sign-off gaps are recorded; no release claim without evidence.
- [ ] `.opencode/docs/refactor-status.md` lists remaining risks, review points, and separate approval/release next step.

Suggested review units: shared shell; tokens/component/reference consolidation and replacement tests; homepage content/catalog/fallback; extensibility fixtures/docs and final removal proposal; **mandatory user approval pause**; approved cleanup only; full regression and inventory/handoff reconciliation. Do not commit, merge, deploy, or proceed to release without permission. Stop after milestone 8.
