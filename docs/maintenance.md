# Website maintenance handbook

Start here to maintain and extend the website. These guides describe the current
static website, not a proposal to redesign it. No build, backend or CMS is needed.

## Choose the task

| I want to… | Read |
| --- | --- |
| Change explanations, examples, headings or homepage cards | [Editing content](editing-content.md) |
| Change questions, answers, feedback, models, checklists or the printable handout | [Editing content](editing-content.md#activity-recipes) |
| Change buttons, reveals, completion requirements or navigation | [Controls and flow](controls-and-flow.md) |
| Add another lesson, a writing worksheet or a standalone reference | [Adding modules](adding-modules.md) |
| Choose tests, diagnose errors or prepare a release | [Checking changes](checking-changes.md) |

For implementation responsibilities and saved-state details, see
[controls and flow](controls-and-flow.md), including
[saved-progress compatibility](controls-and-flow.md#saved-progress-compatibility),
and the closed [schemas](../schemas/).

`docs/` contains the lasting, human-facing maintenance guides. The agent workflow
lives in `.opencode/skills/dsl-maintenance/SKILL.md`, with optional `/dsl-*`
shortcuts in `.opencode/commands/`; agent-facing reference (architecture, known
issues, handoff template) is in `.opencode/docs/`, and multi-session task
specifications are in `.opencode/specs/`. These guides do not depend on
that reference. See [using the maintenance skill](using-maintenance-skill.md) for
guided prompts and slash-command shortcuts.

Keep `docs/` focused on durable maintenance guidance. Task-specific change histories,
test-run logs and temporary handoffs belong in session, issue or pull-request
records, not in these guides.

## How the site fits together

```text
index.html → assets/js/home.js
              ├─ content/home.md             introduction and notices
              └─ content/catalog.json        ordered lesson cards

<id>.html → assets/js/<id>.js                 small static entry module
              ├─ lessons/<id>/config.json    identity, order, storage key
              ├─ completion.js               completion/reveal rules, if needed
              ├─ progress-adapter.js         saved-progress translation/defaults
              └─ shared lesson app
                   └─ content/<id>/lesson.json
                        ├─ sections/*.md
                        ├─ activities/*.json → optional Markdown bodies
                        └─ reference/reference.json → reference Markdown
```

The lesson IDs, in curriculum order, are `opening`, `middle`, `final`, and
`before-round`. Before the Round is a fourth-session refinement lesson, not an
enforced prerequisite or cross-module gate. A **module** is a public
learning resource; a **section** is one screen inside it; an **activity** is a card
set, question set, writing exercise, etc. Root HTML contains metadata and the mount,
not the editable lesson prose. There is no visual administration interface:
editing Markdown/JSON is the normal content workflow; changing behavior requires
JavaScript and tests.

## Routine workflow

1. Check `git status --short --branch`. Use a non-`main` branch; preserve other work.
2. Define the requested change: wording, behavior, layout, or a new resource. Keep
   these separate where possible so a content edit cannot silently change a gate.
3. Run `python3 -m http.server 8000` from the repository root, then open
   `http://localhost:8000/`. Keep that Terminal running; Ctrl+C stops it. Do not use
   `file://`. Ordinary preview needs no npm install.
4. Make the smallest relevant edit using the appropriate guide. Do not edit
   `tests/fixtures/` as if it were live content.
5. Validate and review **all changed states**, not just the first screen. Test with
   disposable local progress, then saved drafts/credit. Follow [checking changes](checking-changes.md).
6. Review the diff and record test results/limitations. Commit, merge and push only
   when explicitly authorized. A push to the configured Pages branch republishes
   the site; local preview does not.

## Five safety rules

- **Keep IDs stable for the same meaning.** Labels are editable; IDs connect
  content to state and policy. Substantially different tasks need new identities
  and a compatibility decision, not recycled credit.
- **Protect existing progress.** Keep `dsl:opening-stage:v1`, `dsl:middle:v1`,
  `dsl:final:v1` and their codecs. Never clear student drafts to make a revision
  work. Progress is per browser/origin; it is not an account or cross-device sync.
- **Content is not behavior.** A requirement sentence or `gateActivityIds` list
  does not implement a completion rule. JavaScript policies do.
- **Print has its own review.** Quick Reference is always accessible and is the
  only thing printed, even from an activity screen. Longer text may need more
  pages; never hide instruction to force a one-page handout.
- **Preserve evidence and licenses.** Historical source/banks/maps/captures/seals
  are not updateable content baselines. Original instruction is © Rhys Jones,
  CC BY 4.0; implementation is MIT; third-party notices remain separate.

## Asking a coding assistant for a change

In OpenCode, use `@dsl-maintenance` or a `/dsl-*` shortcut as described in the
[skill usage guide](using-maintenance-skill.md). Without skill support, the manual
prompt below still works.

Provide the page/section, current wording or control, exact requested replacement,
and acceptance criteria. For example:

> Read AGENTS.md and docs/maintenance.md. Change only [specified text]
> in [lesson/section]. Preserve IDs, activity order, completion rules, storage and
> the approved design. Update relevant current-content assertions without altering
> sealed historical evidence. Run impact-scoped checks; report untested items.
> Do not commit, push, publish or perform unrelated cleanup.

For a behavior request, also specify what should happen **before completion,
after completion, and after reload**, whether it affects one module or all modules,
and what previously saved progress should mean. Ask for a plan first if those
decisions are unsettled.
