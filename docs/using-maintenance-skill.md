# Using the maintenance skill

[Maintenance handbook](maintenance.md)

The `dsl-maintenance` skill gives an OpenCode agent a repeatable workflow for
maintaining Discussion Skills Lab. You describe the desired result; the agent
reads the relevant human guide, inspects the actual code, makes only authorized
changes and reports verification. It is not a visual editor or an automatic
publishing system, and it does not replace your instructional review.

## Quick start

1. Open this repository in OpenCode. Use a non-`main` working branch for edits.
2. Start your prompt with `@dsl-maintenance`, or use a shortcut below.
3. Describe the target, desired change and limits. Say **plan only** if you want
   to review the approach before any changes.
4. Answer questions about missing instructional or behavior decisions. Review the
   resulting diff, test results and any remaining manual checks.
5. Commit or publish only as a separate, explicit decision.

For example:

```text
@dsl-maintenance Plan only: review the Middle Stage evidence section and suggest
how to add one more worked example. Preserve activities, completion rules and
the current design. Do not edit files or run tests yet.
```

You can also ask directly for a small, exact edit:

```text
@dsl-maintenance In content/catalog.json, change only the Opening card title
to "Opening Stage Practice". Leave its URL, description and position unchanged.
Validate the change and do not commit or publish.
```

These are example requests, not changes already made to the site.

## Optional slash commands

All five shortcuts load the **same** skill. Commands are convenient prompt
wrappers, not separate implementations or extra skills. They remain in your
current session without selecting another agent/model or starting a subagent.

| Command | Use for | Default behavior |
| --- | --- | --- |
| `/dsl-maintain <request>` | General maintenance, bugs, presentation, mixed tasks | Agent selects the relevant workflow(s) |
| `/dsl-content <request>` | Wording, questions, feedback, models, checklists, references, homepage | Content workflow |
| `/dsl-flow <request>` | Buttons, navigation, reveals, completion rules | Control/flow workflow |
| `/dsl-module <request>` | Lessons, writing worksheets or standalone references | Module workflow; clarify missing instructional decisions |
| `/dsl-check [target or limits]` | Review/validation/testing of existing changes | Check only; current working changes if no target is supplied |

Type these in OpenCode's prompt box, **not a Terminal shell**. You do not have to
wrap the entire request in quotes. Normal text, punctuation and quoted replacement
wording are passed to the agent. For a long request, attach your content file in
the composer or provide its repository-relative path and ask the agent to read it.
The shortcuts contain no shell substitutions and do not execute your arguments
as shell commands.

Command names are routing hints, not detailed requirements: `/dsl-content` still
needs to know what wording to change. `plan only` prevents implementation even
when using a content/flow/module command. `/dsl-check` intentionally does not fix
failures; follow up with an explicit fix request using another shortcut or the
skill directly. A review-only request can also prohibit running tests.

## What to include in your request

### Content changes

Give the lesson/section or file, existing phrase, replacement wording and whether
related feedback/models/reference text should change. Explicitly identify any
answer-key revision. If you do not have final wording, ask for a proposal first.

```text
/dsl-content Plan only: propose revised feedback for the question I identify in
content/middle/activities/knowledge-check.json. Keep its answer key and options.
Ask which question I mean before changing anything.
```

Once the exact revision is agreed, tell the agent to apply it. Stable IDs, gates
and saved progress are preserved unless the task explicitly requires a reviewed
compatibility change. See [editing content](editing-content.md) for manual recipes.

### Controls and flow

Describe what should happen **before completion**, **after completion**, and
**after reload**. Say whether the change applies to one module or all modules.
Include keyboard/mobile behavior when relevant. A label or color change is
different from changing what unlocks a section.

```text
/dsl-flow Plan only: I want a different question-navigation pattern for a future
module. Explain the supported profiles, keyboard behavior and saved-position
implications before recommending one. Leave existing lessons unchanged.
```

Changing requirement text does not implement a new completion rule. The agent
must inspect the actual policy, component and persistence bindings; it should
ask before making unspecified instructional or storage decisions. See
[controls and flow](controls-and-flow.md).

### Adding a module

Supply the title/ID if known, audience/objective, approved instructional material,
ordered sections, activities, completion requirements and reference/print needs.
Say whether drafts should persist. If some decisions are undecided, request an
outline and questions first rather than asking for immediate implementation.

```text
/dsl-module Plan only: design the file/config outline for a new writing worksheet.
I will supply the instruction and model later. It needs one editable draft,
a checklist, saved progress and an always-accessible printable reference. Ask me
to approve the completion requirements; do not invent coaching or create files.
```

After approval, ask the agent to implement the agreed outline using your supplied
content. The agent should reuse the shared runtime, not clone an old lesson's
controllers or save to its storage key. See [adding modules](adding-modules.md).

### Checking existing changes

Identify a module, file set or the current working diff and the desired coverage.
You can limit the test budget or request review without executing tests:

```text
/dsl-check Review the current uncommitted changes, including new files. Select
impact-scoped validation/unit/browser checks and run only those. Report findings
and any manual checks still needed. Do not fix files or update baselines.
```

```text
/dsl-check Review only the proposed content changes. Do not edit files or run
tests. List answer/feedback/reference consistency risks and suggest checks.
```

Without arguments, `/dsl-check` targets the current working changes; if there
are no meaningful changes, the agent should ask what to check. Check-only mode
does not change source/tests/dependencies/Git state; normal ignored test artifacts
and disposable browser/server data may be created when running authorized tests.
Any bookkeeping explicitly required by repository instructions remains separate.
See [checking changes](checking-changes.md) for commands and coverage limits.

### Bugs and visual maintenance

Provide reproduction steps, expected versus actual behavior, page/section,
browser/device, whether progress was fresh/restored, and screenshots if useful.

```text
/dsl-maintain Investigate a layout problem on the Final reference at 390px.
I will attach a screenshot and browser details. Propose the smallest scoped fix
before editing; preserve all reference text and completion behavior.
```

## Safety and review

The skill instructs the agent to protect drafts/permanent credit, stable IDs,
existing URLs, the approved design, attribution and frozen original evidence.
It asks for clarification rather than inventing educational decisions, and it
does not authorize cleanup outside the request, dependency upgrades or publication.

Skills are **instructions, not enforcement or a sandbox**. OpenCode permissions
and the active agent's capabilities still apply; read the diff and results.
A selected read-only/planning agent may not be able to implement changes until
you choose an agent with appropriate permissions. These shortcuts do not override
that choice. An invocation is not permission to commit, merge, push, tag, change
Pages settings or release the site.

Expect the final report to distinguish checks actually run from planned checks,
failures from environment blockers, and automation from manual verification.
Headless WebKit/PDF/viewport tests do not establish physical iOS, interactive
print-preview, screen-reader or actual browser-zoom results.

## Where this lives

| File(s) | Purpose |
| --- | --- |
| `.opencode/skills/dsl-maintenance/SKILL.md` | The one durable agent workflow |
| `.opencode/commands/dsl-*.md` | Optional prompt shortcuts that load that skill |
| `docs/*.md` | Authoritative human guidance the skill reads selectively |
| `.opencode/docs/` | Agent-facing reference: architecture, known issues, handoff template |
| `AGENTS.md` | Repository-wide instructions that also apply to this workflow |

The skill and commands are the durable maintenance tooling. The human guides in
`docs/` are the authoritative instructions they read selectively, and neither
depends on the agent-facing reference under `.opencode/docs/`, which can change
independently.

For future edits, keep the skill focused on workflow and the human guides focused
on implementation recipes. Keep shortcut wrappers thin so they cannot drift into
five different maintenance policies. Do not duplicate all the guide contents in
the skill or turn a shortcut into an automatic shell/Git/publishing action.

## If the skill or commands are missing

In OpenCode V2, project skills and commands are discovered from their respective
`.opencode/skills/` and `.opencode/commands/` directories without additional project
configuration. Saved changes reload automatically; try `/reload` if discovery is
stale, rather than restarting or changing the website.

Check that you opened the correct repository, the skill ID is exactly
`dsl-maintenance`, skill permissions allow it, and no later configuration/source
overrides that ID or a command name. If discovery still fails, ask the agent to
read `.opencode/skills/dsl-maintenance/SKILL.md` and follow it directly. This works
as an instruction fallback but does not establish that native skill loading works.

OpenCode references: [skills](https://opencode.ai/v2/docs/skills) and
[commands](https://opencode.ai/v2/docs/commands).
