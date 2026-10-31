# Multi-session handoff template

Use this when work will continue in another session, or when a session stops
interrupted, blocked or at an agreed checkpoint. Record the handoff wherever the
work is tracked — the session record, issue or pull-request description. Do not
commit a permanent handoff log unless the task explicitly asks for one.

Keep entries in chronological order with the latest last. Do not replace earlier
entries with a rolling summary. A handoff is not proof that the code or tests still
match it: the next session verifies the actual branch, files and prerequisites
before editing.

```markdown
## Handoff

Task:
Starting commit:
Working branch:

### Implementation
- Files created:
- Files modified:
- Interfaces introduced:
- Content moved:
- Storage changes:

### Verification
- Unit tests:
- Browser tests:
- Content validation:
- Manual tests:
- Tests not performed:

### Compatibility
- Saved progress verified:
- Sealed fixtures/replay verified:
- Known regressions:

### Next step
- Prerequisites satisfied:
- Outstanding blockers:
- Decisions requiring approval:
```

Fill every field. Use `None`, `Not applicable — <reason>` or
`Not performed — <reason>` instead of leaving a blank, an unexplained checkmark or
an omitted section.

- **Task:** what was asked, and explicit status (`complete`, `incomplete` or
  `blocked`). An interrupted session stays incomplete or blocked.
- **Starting commit:** the full HEAD hash before this session's edits, not an older
  baseline unless they coincide. **Working branch:** the actual branch. Explain
  inherited uncommitted changes separately from this session's work; no commit is
  required to hand off safely.
- **Implementation:** concrete paths, exported interface names/signatures or links
  to their definitions, source → destination mappings, and storage keys/format/
  adapter changes (or explicitly none). Record approved decisions and any permitted
  layout differences with rationale.
- **Verification:** for each category give the exact command, outcome (`passed`,
  `failed`, `not performed`), counts/scope, and evidence path. Name the engines,
  projects and root/subdirectory mounts exercised. List every check not run under
  **Tests not performed** with the reason and whether it blocks completion. Never
  present a planned command as an executed test.
- **Compatibility:** name the progress keys and sealed fixtures/replay sets
  exercised, and the result. Say explicitly when none were checked. Describe
  observed regressions and open issues. "None observed in the listed checks" is not
  a claim that untested compatibility passed.
- **Next step:** name the actual next task, cite evidence of readiness, and separate
  satisfied prerequisites from pending ones. For partial work the next task is
  resuming it, not starting something new. List blockers and decisions needing
  approval; write `None` when there are none.
