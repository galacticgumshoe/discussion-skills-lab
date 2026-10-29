---
name: dsl-maintenance
description: Maintain Discussion Skills Lab. Use for editing lesson or homepage content, changing controls, navigation or completion rules, adding lessons, worksheets or references, checking changes, and scoped bug fixes or visual maintenance. Follow the human maintenance guides and protect saved progress.
---

# Discussion Skills Lab maintenance

Use one workflow or combine the relevant workflows below. A slash command's
workflow hint is a starting point, not permission to expand the user's request.
This is an ongoing maintenance skill, not a refactor-milestone or release workflow.

## Start here

1. Locate the repository root and read its `AGENTS.md` and the
   [maintenance handbook](../../../docs/maintenance.md). Inspect Git status/branch
   and the actual relevant files; preserve inherited changes and untracked work.
   Work on a non-`main` branch before editing. Read-only review/planning may inspect
   `main`; do not switch branches over existing work without checking safety.
2. Identify the mode: **implement**, **plan only**, or **check only**. Honor explicit
   user limits regardless of the entry command. Plan-only means inspect, propose
   scope/risks/checks, then stop without edits or test execution unless requested.
   Check-only follows workflow D, not an automatic fix-and-retest loop.
3. Identify the target module/section and requested change. For ambiguous content,
   behavior, completion requirements or new instruction, ask only the questions
   needed to make the change safely. Do not invent coaching, answer keys, models,
   requirements or intended browser behavior and present them as approved.
4. Read the appropriate guide(s) below and [checking changes](../../../docs/checking-changes.md).
   Read referenced source/schema/test files as needed, not every guide or historical
   capture by default. Resolve all Markdown links here from this skill directory;
   it is three directories below the repository root. Paths inside the human
   guides are repository-relative unless those guides say otherwise.
5. Give a short scope and verification plan for nontrivial edits. An exact, safe
   wording replacement does not need another approval round. Pause for missing
   instructional decisions, ambiguous behavior or a storage/migration design that
   the request has not authorized. If a guide and the code disagree, report the
   discrepancy rather than silently improvising a new architecture.

## Workflow A — Edit content

Read [editing content](../../../docs/editing-content.md).

- Find authoritative prose/metadata under `content/` using the visible phrase and
  manifest references. Do not edit test copies or archives as live content.
- Make only the requested instructional revision. Keep IDs and educational meaning
  aligned; wording changes do not authorize changing profiles, order, gates or
  readonly/editable modes. A genuinely different task needs a compatibility decision.
- Review connected answer keys, every option's feedback, models, placeholders,
  requirement messages, homepage labels and reference wording as applicable.
  These are not automatically synchronized. Do not revise them beyond the request
  merely to make all wording identical.
- For intentional approved differences from preservation baselines, retain frozen
  evidence and update/version only appropriate current-site assertions. Do not
  reseal original fixtures or suppress unrelated exact-content failures.
- Validate affected data, then test changed rendered/revealed/alternative states
  and saved-progress behavior according to impact.

## Workflow B — Change controls or flow

Read [controls and flow](../../../docs/controls-and-flow.md).

- Establish intended behavior before completion, after completion and after reload;
  establish whether it applies to one module or all shared consumers. Distinguish
  a label/style change from an interaction or completion-policy change.
- Trace the control through its component, section composition, pure completion/
  reveal policy, state binding and adapter. `gateActivityIds`/requirement wording
  are not executable completion rules. CSS visibility is not gate evidence.
- Prefer existing supported profiles/options. A new profile/property/block requires
  coordinated schema, runtime-boundary, rendering and invalid/parity tests. Do not
  add arbitrary HTML, executable expressions, content-selected imports or a second
  controller/storage engine.
- For existing section/activity/item order changes, inspect fixed legacy mappings
  first; do not regenerate indexes from the new manifest or DOM.
- Test one-missing requirements, wrong→right→wrong, permanent credit, old restores,
  focus/keyboard/live feedback and affected responsive/print states. Shared changes
  require affected consumers' checks, not just the module named in the request.

## Workflow C — Add a module

Read [adding modules](../../../docs/adding-modules.md) and relevant content recipes.

- Confirm resource type, outline, supplied/reviewed instruction, activities,
  completion rules, reference and persistence before implementing educational
  decisions. If the user asks for a proposed lesson, present the draft for review
  before integrating it as approved instruction.
- Use the complete starter as a mechanical reference, not publishable test content.
  Choose fresh stable IDs; create the root HTML, thin native entry, config, content,
  normalized defaults/adapter and pure policies as needed. Reuse shared controllers.
- New modules alone use a fresh `dsl:<id>:v1` identity record. Read-only references
  use disabled storage; worksheets need no fake quiz. Verify supported navigation
  rather than promising that an empty policy unlocks multiple ordinary sections.
- Keep exactly one reference section last; match config/manifest/adapter identity
  and order. Supply shell metadata, including duration, and all bound defaults.
- Add the catalog entry only within the reviewed scope. If testing a new public
  root URL, extend the development server's current-site entry handling narrowly;
  never add a new module to the pinned original-engine replay allowlist.
- Add dedicated public-entry/policy/restore tests. Passing shared sample-fixture
  tests does not verify this new resource. Exercise root and repository-prefix
  paths, fresh/restored progress, content failures and independent reference print.

## Workflow D — Check changes

Read [checking changes](../../../docs/checking-changes.md).

- Inspect the specified target/diff, including relevant staged and untracked files.
  With no target, use the current working changes; ask if no meaningful target is
  present. Identify inherited versus newly introduced changes where possible.
- Map changed content/software to affected consumers and choose impact-scoped
  schema/unit/browser checks. Respect an explicit test budget/project/file limit;
  list missing coverage instead of silently launching a full historical suite.
- Keep check-only work nonmutating: do not edit source, documentation, tests,
  snapshots, dependencies, saved records or Git state; do not run autofix/update
  commands. Normal ignored test artifacts and disposable local server/browser data
  are allowed. Follow any higher-priority repository bookkeeping requirement.
- Check tooling first. If dependencies/browser binaries or external assets are
  unavailable, report the blocker and ask before installations or upgrades outside
  the user's authorization. Distinguish environment failures from product failures.
- Report findings with file locations, severity, evidence and next actions. Failed
  checks are findings to explain, not authority to repair. If the user also asks
  for fixes, scope them explicitly using A, B or E, then rerun affected checks.

## Workflow E — Other maintenance

Use [controls and flow](../../../docs/controls-and-flow.md) for code/style ownership
and [checking changes](../../../docs/checking-changes.md) for diagnosis/verification.

- Reproduce/inspect the reported bug or layout issue, locate its smallest owner,
  and separate a regression from an intentional design or policy choice.
- Keep fixes local where possible; preserve the approved visual identity, accessible
  focus/contrast/reduced motion and content-complete reference printing. Document
  permitted reflow rather than chasing incidental pixel equality.
- For dependency/security/hosting/storage changes or unsupported new behavior,
  present impact, compatibility risks and a proposed scope before implementing
  decisions not already authorized. Never expand a bug fix into broad cleanup.

## Boundaries for every workflow

- Keep static GitHub Pages hosting, current root URLs, `.nojekyll`, relative
  repository-prefix paths and no production build/backend/database.
- Keep existing `dsl:opening-stage:v1`, `dsl:middle:v1`, `dsl:final:v1` keys/codecs,
  unknown saved data, permanent section credit and drafts. Never clear student
  work, infer unrecorded history, migrate existing lessons to the new ID adapter,
  or add another writer to the same module.
- Use disposable local browser contexts and synthetic drafts, never live/student
  records or personal profiles. On this macOS host, use the fresh command-scoped
  Firefox home documented in checking changes; do not disable security.
- Preserve original instruction attribution, MIT/CC BY boundaries and third-party
  notices. No unrelated rewrites, dependency upgrades, historical-fixture changes,
  refactor cleanup, commits, merges, pushes, tags, publication or Pages changes
  without explicit authorization. A command invocation grants none of those rights.
- Keep human guidance in root `docs/`; this skill and command wrappers are durable
  agent tooling. Do not require refactor handoffs/evidence/specifications for routine
  maintenance or recreate deleted refactor records. Follow current repository
  instructions if they separately require a handoff for the actual task.
- Skills are instructions, not a permission sandbox or a guarantee of correctness.
  Preserve the active agent/model/permission choices; do not delegate automatically.

## Finish

Review the actual diff and scope. For implementation, update human guidance only
when the approved change makes it inaccurate. End with a concise summary of changed
files/behavior, checks actually run (exact commands, scope and outcomes), any
unperformed manual/device/print/AT checks and blockers/decisions. A headless PDF,
WebKit viewport or text enlargement is not proof of GUI printing, real Safari/iOS,
physical devices or actual browser zoom. Stop at the requested task boundary.
