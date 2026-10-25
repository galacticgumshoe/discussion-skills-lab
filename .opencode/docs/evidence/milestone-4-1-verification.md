# Milestone 4 checkpoint 4.1 verification — 2026-10-25

Starting HEAD: `da38eaea3e476e6c05bda5520a1b1f89bf72e121`.
Branch: `refactor/shared-components`. Only the preceding prerequisite-blocked
handoff edit was inherited from this conversation; no unrelated user changes.
No commits or publication. Node v22.23.4 through process-local setup:

```sh
eval "$(fnm env --shell zsh)"
fnm use 22
```

## Owner-confirmed prerequisite resolution

The owner corrected the prior handoff's interpretation: they had already reported
full milestone-3 browser verification and explicitly confirmed proceeding with
milestone 4 despite the log's incomplete status. This direct instruction resolves
the earlier prerequisite pause for implementation. No browser versions or
individual named print-preview actions are invented; detailed print/device/AT
records remain unspecified, not a newly performed agent check or release approval.
Historical milestone-3 handoffs/evidence are preserved rather than rewritten.

Before coding codecs, read the complete current baseline activity engines
`assets/js/{opening,middle,final,lesson-core}.js`, frozen three lesson maps, current
contracts/milestone specification, compatibility document and relevant handoffs.
The unit boundary check confirms extracted Opening/current Middle/Final/core stay
byte-pinned within the authorized extraction/pilot boundaries.

## Commands and outcomes

| Exact command | Outcome |
| --- | --- |
| `npm run test:unit` (before implementation) | Passed 47/47, zero failures/skips |
| `npm run validate:content` (before implementation) | Passed existing reference validation |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser` (pre-change production suite) | **Failed**: 235 passed, 1 Firefox failure; no skipped/flaky tests, duration 594.349612 seconds |
| `npm run test:unit` (initial checkpoint implementation) | Passed 64/64, zero failures/skips |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/baseline.spec.mjs --project=firefox --workers=1 --max-failures=1 --grep 'discussion-skills-lab/middle complete' --reporter=line --output=test-results/production-firefox-diagnostic` | Passed 1/1 unchanged Firefox diagnostic test, 55.8 seconds |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/storage-boundaries.spec.mjs --reporter=line --output=test-results/storage-boundaries-4-1` | Passed 60/60, 15 each Chromium/Firefox/WebKit/mobile Chromium, 1.4 minutes; before the later opaque-UI partial-save enhancement |
| `npm run test:unit` (after exhaustive remaining mappings/container/opaque-UI enhancements) | Passed 66/66, zero failures/skips |
| `npm run validate:content` (same stage) | Passed existing reference schema/IDs/paths/Markdown validation |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser` (cumulative checkpoint run) | **Passed 296/296**, 74 each Chromium/Firefox/WebKit/mobile Chromium, zero failed/skipped/flaky, 637.707551 seconds; includes 236 existing production/pilot/security/replay checks plus 60 new storage checks |
| `npm run test:unit` / `npm run validate:content` (final checkpoint documentation/test-strengthening stage) | Passed again: 66/66 unit tests and existing reference content validation |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/storage-boundaries.spec.mjs --reporter=line --output=test-results/storage-boundaries-4-1-final` | Passed 60/60 across all four projects, 1.2 minutes, with the strengthened all-lesson existing-extension replay check |
| `env CFFIXED_USER_HOME="$(mktemp -d)" npm run test:browser -- tests/browser/storage-boundaries.spec.mjs --reporter=line --output=test-results/storage-boundaries-4-1-boundary-final` | Passed 60/60 across all four projects, 1.2 minutes, after final fixed-length Opening array boundary hardening |
| `npm run test:unit` / `npm run validate:content` (after final array boundary hardening) | Passed again: 66/66, zero failures/skips, and existing reference content validation |
| `git diff --check` | Passed for tracked changes at this stage |

Cumulative passing report start `2026-10-25T15:04:48.205Z`, SHA-256
`4e899f8ab9f1744b2b3977bed66c94dc6edb0d424fcdd3f79f41a6e5fa1e8fe0`.
This run used the default three workers and all configured projects. Production,
reference pilot and original replay exercised `/`, `/discussion-skills-lab/`,
`/__original/` and `/__original/discussion-skills-lab/` as appropriate; the new
storage harness used the isolated root fixture route. No canonical evidence was
rewritten. After this full pass, the replay test was further strengthened to seed
an existing `dslUi` v1 object with an unknown property for **all three** lessons
(including Final, which introduces no new UI facts), rather than only creating
new supported Opening/Middle facts. This is a test-only strengthening, not a
runtime/API or baseline assertion change; its passing targeted rerun is recorded
above. Final review also made short/overlong Opening answer arrays explicitly
read-only (salvaging individual valid values without rewriting the unsafe legacy
array). The cumulative unit suite and all 60 affected browser tests were rerun
after that change. No production entry imports this codec; production/pilot bytes
remain pinned by the final unit boundary check, with the full passing production
suite above. No downstream checkpoint exists yet to rerun.

The pre-change production failure was
`tests/browser/baseline.spec.mjs:72:5`, Firefox,
`/discussion-skills-lab/middle complete real activities, per-page gates, every answer and feedback`.
`#application-a-feedback` stayed empty/hidden after the first option pointer click
(`tests/helpers/legacy-journeys.mjs:67`). The failure screenshot/error context
showed the normal integrated-practice page, 6/8 completion and no selected
application answer. The same unchanged test passed in the isolated diagnostic
above. Root cause is **not established**; no arbitrary waits, forced clicks,
retries, assertions, snapshots, production files or Playwright configuration were
changed to obtain that pass. The new modules are not imported by production HTML.

Initial report start `2026-10-25T14:51:18.835Z`, SHA-256
`242f66a11f33ff4ce1bb8f9321e20b8f89c76799155e6435baa0c491f4ab01c2`.
Ordinary ignored failure attachments/report were inspected before subsequent
default-suite output replaced them; this document preserves the failure details.
An attempted later ZIP inspection found the replaced trace unavailable and adds
no further diagnosis.

## Boundary evidence and API decisions

- No production entry switched; classic core preserved. Harness page imports only
  the new store and static adapters; tests assert no `window.DSL` engine exists.
- Every sealed fixture is decoded; unsafe ones remain byte-for-byte untouched
  after synthetic user edits. Malformed state can salvage valid independent
  drafts/completion without fabricating answers or credit. Read denial and quota
  failures keep usable in-memory state and accessible nonblocking warning text.
- Unit tests exhaustively compare mapping tables with the sealed maps, including
  Middle global cards, fixed fields/checks and `a`/`b`, Final local exploration
  versus global open state, every question option, zero, Unicode/multiline drafts,
  notes/goals and Opening's exact absent-earned fallback. Answer changes after
  fallback materialize supported quiz credit instead of losing it on reload.
- Unknown values survive merged supported edits, including nested fields,
  transient selections, opaque extension versions and prototype-like JSON keys.
  New unsupported UI choices stay in memory but cannot prevent later supported
  draft saves; diagnostics identify that partial-persistence boundary.
- `schemas/progress.schema.json` selects the outer envelope by default, explicitly
  uses `#/$defs/normalized` for normalized state, and allows unknown properties.
  Per-owned-field diagnostics remain separate, with conservative write-blocking
  for malformed known state. No new instructional schema/renderer introduced.
- Real-browser localStorage tests cover read-once/no hydration writes, unchanged
  saves, immediate draft edits/reload and DOM reorder/decoy controls. Original
  replay reads adapter-written records on both pinned mounts without two writers.
- Public store/codec APIs, ownership, session-only presentation, extension names
  and last-writer/no-sync behavior are documented in `../progress-compatibility.md`.

## Manual checks

No new interactive browser/device/AT/print/zoom checks performed. Scripted storage
failures/live-region assertions are not manual permission-dialog or screen-reader
evidence. No styles or rendering changes in checkpoint 4.1. Owner prerequisite
acceptance above is not a claim of newly collected named-preview evidence.

## Checkpoint gate

Checkpoint 4.1 is **verified**: all 48 frozen progress fixtures and fixed maps are
covered, supported records round-trip without DOM-order dependence or draft/credit
loss, unsafe records are never silently overwritten, failures retain in-memory
state, and state/store/codec ownership/APIs are documented. Required unit, affected
browser and full production/pilot regression checks pass, with the earlier
nonreproducing Firefox failure retained in this record rather than hidden.

Milestone 4 remains **incomplete**. This session stops at the verified checkpoint
boundary because the remaining implementation/verification budget is insufficient
to safely complete the next checkpoint. **Next unverified checkpoint: 4.2**
(navigation and pure completion). No navigation/components/writing/renderer/app
scaffolding or production cutover was implemented. There is no remaining
checkpoint-4.1 technical blocker and no further approval required to resume the
already requested milestone. A fresh session must inspect this evidence and rerun
the verified checkpoint's relevant tests before implementing 4.2.
