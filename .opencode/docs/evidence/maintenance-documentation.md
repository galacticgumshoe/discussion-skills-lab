# Maintenance documentation verification — 2026-10-29

## Scope

Documentation-only follow-up on `refactor/shared-components`, starting at
`c951efc566794b8cc32ae8f4799a1302f18935db`; clean working tree at entry.
User requests ongoing content/control/flow/new-module instructions and accepts
the current local look and feel. No cleanup, new public module, commit or release
is part of this task.

Created [handbook](../../../docs/maintenance.md), [content recipes](../../../docs/editing-content.md),
[controls/flow](../../../docs/controls-and-flow.md), [module starters](../../../docs/adding-modules.md),
and [checking/release guidance](../../../docs/checking-changes.md). README, content README,
authoring and architecture link to them. The dated architecture checkpoint and
previous refactor handoffs remain historical; their pending cleanup dispositions
are not silently marked complete.

Link targets above follow the owner's subsequent separation of human-facing
guides into root `docs/`. Original execution paths/results below remain a record
of the initial verification, not a claim that those paths are still current.

## Implementation cross-checks

Reviewed actual root entries, public native module entries, three completion
policies, legacy/identity adapters, Opening/Middle registry bridges, shared
shell/app/completion/renderer/Markdown/components, schemas, content validator,
catalog, test server and Playwright configuration. Instructions distinguish:

- Declared gate IDs/requirement wording from executable pure policies.
- Reveals, navigation, completion and persistence; permanent section credit.
- Existing fixed-index legacy codecs from new-module ID records/defaults.
- Runtime shell's required duration from the schema's optional legacy metadata.
- Five-block homepage renderer from ordinary Markdown authoring.
- Production static serving from the current test server's root-entry allowlist;
  new pages must not be added to the pinned original replay list.
- Valid configuration from the further state/binding/interaction tests it cannot
  replace; ordinary multi-section ungated navigation is not a config feature.

## Automated checks performed

Node v22.23.4; existing installed dependencies, no dependency changes/install.

1. `npm run validate:content` — **passed**, existing production/fixture graphs,
   catalog destinations, schemas, cross-file identities, paths and references.
2. `node --test tests/unit/lesson-validation.test.mjs tests/unit/milestone-8.test.mjs`
   — **52/52 passed**, zero failures/skips. Scoped schema/runtime parity,
   new-module/reference-only graph and store/default/unknown-record contracts.
3. Ad hoc `node --input-type=module` documentation check — **passed**:
   - Extracted all **11 worksheet starter files verbatim** from named fenced
     blocks in `adding-modules.md` into an approved temporary directory.
   - Created six additional reference-only files from that guide's three explicit
     snippets, documented HTML substitutions and two reused handout files.
   - Copied unchanged shared assets into the temporary site, not the repository;
     created a temporary two-record catalog for destination checking.
   - `validateLessonTree(tempSite)` and `validateCatalogTree(tempSite)` passed.
   - `node --check` passed for the four documented JavaScript modules. Imported
     the documented worksheet adapter/policy and checked six threshold/missing-
     check/whitespace cases. The separate content-guide question example passed
     `validateActivityDocument` (development schema and runtime boundary).
   - Verified **73 local file links** across README, content README, the five new
     guides and existing authoring/architecture (fenced/inline code excluded).
   - Temporary site:
     `/private/var/folders/fv/fb864z9n6gz9g1yvq_jxf0jr0000gn/T/opencode/maintenance-doc-examples-ZMt6lL`.
     It is not a published lesson or repository fixture. Recreate from the named
     code blocks rather than treating this disposable directory as authoritative.
4. Ad hoc `node --input-type=module` with Playwright **headless Chromium** and a
   temporary HTTP server — **4/4 temporary-site journeys passed**: worksheet and
   reference-only resource at `/` and `/discussion-skills-lab/`, isolated contexts.
   - Worksheet: initially zero writes, one missing check prevents completion,
     required draft/checks earn credit, draft/check/credit restoration, zero writes
     on reload, clearing/unchecking does not revoke credit.
   - Read-only reference: no localStorage reads or writes.
   - Both: ready reference, reference-only print-media visibility, hidden Print
     control in print; worksheet ordinary view hidden; no page JavaScript errors.
   - This used copied examples/assets and a temporary prefix-aware server, **not**
     a production test-server modification or a full public-site browser suite.
     Server, browser and contexts were closed in `finally` blocks.
5. Final link/heading audit — **passed**, 79 local links and eight heading anchors
   across ten documentation files, including this evidence summary.
6. `git diff --check` — **passed**; changed paths reviewed as documentation only.
   `git diff --exit-code -- assets lessons schemas scripts tests package.json package-lock.json index.html opening.html middle.html final.html .nojekyll`
   — **passed**, confirming no production/runtime/test/configuration diff.

## Not performed / limits

No full unit/browser suite, Firefox/WebKit/mobile matrix, original-engine replay
rerun, production lesson journey, GUI browser/print preview, physical printing,
actual zoom, device or assistive-technology test in this task. No screenshots/PDF
review claimed. Tests were intentionally impact-scoped for documentation/examples;
these omissions do not block documenting unchanged production behavior. The
temporary Chromium print-media checks do not establish human print-preview or
all-engine acceptance. Owner's local design acceptance is recorded as reported,
not extrapolated to unspecified browser/device coverage.

Runtime, instructional content, IDs, policies, progress formats, frozen evidence,
dependencies and hosting remain unchanged. Existing unfinished cleanup and manual
coverage limits retain their previous dispositions. No commit, merge, push, tag,
publication or Pages setting change performed.

## Human/agent documentation separation — 2026-10-29

Owner clarified that `.opencode/docs/` is for agentic/refactor records, which may
eventually be removed, not lasting human documentation. Moved the five new guides
to root `docs/`, fixed source/schema/README links and the assistant-request example,
and replaced their dependencies on refactor architecture/progress/checklist files
with self-contained maintenance guidance. README and content README no longer
link into `.opencode/`. `AGENTS.md` now explicitly preserves this distinction;
historical refactor `docs/` paths still map to `.opencode/docs/`, not the new guides.
Agent authoring/architecture point outward to the human guides. Navigational links
in this uncommitted report follow the move; prior execution records remain intact.

Verification for relocation only:

- Ad hoc `node --input-type=module` link/dependency audit: **passed**, 76 local links
  and nine heading anchors across README, content README, five human guides and
  three agent documents. All seven human-facing documents have **zero** link
  dependencies on `.opencode/`, so removing that documentation would not break
  their links. Existing runtime/test fixtures are outside this documentation scope.
- `git diff --check`: **passed**.
- `git diff --exit-code -- assets lessons schemas scripts tests package.json package-lock.json index.html opening.html middle.html final.html .nojekyll`:
  **passed**, no production/runtime/test/config changes.
- Unit/content/browser tests not rerun for relocation and prose/link edits. The
  earlier scoped results above remain historical, not newly executed tests.
- No refactor history deleted, no cleanup/release performed, no commit or push.
