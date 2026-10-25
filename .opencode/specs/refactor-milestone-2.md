# Milestone 2 — Mechanically externalize Opening's script and styles

## Assignment and prerequisites

Read `AGENTS.md` and `.opencode/specs/refactor-contracts.md`. Implement only milestone 2. Milestone 1 must have captured the production baseline, Opening progress fixtures/maps, and runnable regression tests. Inspect `.opencode/docs/refactor-status.md` and run the existing baseline before editing; stop if preservation evidence is missing.

**Outcome:** Opening's inline activity script and stylesheet are external files with behavior/content/storage unchanged. This is not content separation yet: the extracted JS intentionally still contains instructional data.

## Files

- Modify `opening.html` only to replace its main inline stylesheet and activity script with local references.
- Create `assets/css/opening.css` and `assets/js/opening.js` by verbatim extraction.
- Update focused tests and `.opencode/docs/refactor-status.md`/content inventory source-location references as necessary.
- Do not modify Middle, Final, shared core/CSS, licenses, deployment, Tailwind/fonts, or public URLs.

## Source-specific instructions

1. Read all of `opening.html`, not just its script. The main `<style>` is in the head; `assets/css/shared.css` currently follows it. Keep extracted `opening.css` **before** shared.css, preserving cascade order.
2. Keep the Tailwind CDN script in its existing relative order. Do not move styles across it for convenience.
3. The final activity script follows `assets/js/lesson-core.js`. Replace it with a classic external script immediately after that core reference. Do not add `async`, `defer`, module type, wrappers, or new global names in this milestone.
4. Preserve the script contents exactly, including `DSL.createLesson({id:'opening-stage',total:7,reference:7,…})`, initialization order, data arrays, gate rules, and final navigation call.
5. Keep the Quick Reference's inline `onclick="window.print()"` for now; removing event attributes is unrelated to this extraction.
6. Do not reformat the entire HTML or cleanup unused classes/Canva metadata. Keep the diff narrow enough to inspect mechanically.
7. Track the extracted source relationship in the content inventory so later migrations find the original JS strings at their new path. Never update the canonical baseline content to match an accidental edit.

## No behavior repairs here

Do not repair sequence-checkpoint persistence/highlighting, classification colors, tab relationships, clipboard behavior, or storage validation. Those changes belong to later component adoption and must not contaminate the extraction comparison.

No new JSON/Markdown production content, ES-module conversion, content loader, or v1 extension is allowed here.

## Risks and regression tests

- **Cascade order:** compare representative desktop/mobile screenshots and card/choice/timeline styles.
- **Classic script scope/order:** confirm `DSL` is available and no duplicate declarations/init/listeners occur.
- **Paths:** load `opening.html` under both `/` and `/discussion-skills-lab/`; assert local script/CSS return successfully.
- **State:** reload fresh/partial/completed Opening fixtures; inspect selected answers, drafts, completion, reference access, and the unchanged serialized shape.
- **Behavior:** complete all seven pages, test each missing prerequisite, all-at-once quiz/retries, task-analysis keyboard controls, and consensus assembly output.
- **Print:** run reference-only print-media checks and compare Chromium PDF/record manual preview status.
- **Cross-lesson:** run smoke/persistence tests for Middle and Final because all lessons share the core/CSS, even though these files must remain unmodified.

Add a test or audit check that the two extracted payloads match the baseline inline payloads modulo only surrounding script/style tags and an explicitly documented final newline. Verify there is no other instructional change in `opening.html`.

Apply the contracts' testing hierarchy: exact extracted-source/content and execution/cascade preservation are mandatory; pixel-identical screenshots are not. This milestone does not authorize intentional layout changes. Investigate genuine layout regressions caused by extraction/order, but do not alter the extracted CSS to reproduce incidental browser/font rasterization differences.

## Acceptance

- [ ] Root Opening URL remains unchanged; CSS/script load under both mounts.
- [ ] Extracted payloads are mechanically identical to original source.
- [ ] Original cascade and script execution order remain intact.
- [ ] Valid legacy fixtures retain identical user-facing behavior and compatible serialization.
- [ ] Opening interaction/visual/print tests pass with no baseline rewriting.
- [ ] Middle/Final smoke tests remain green.
- [ ] No existing defect was silently fixed; no content was rewritten or removed.
- [ ] Handoff records changed paths, commands, results, manual gaps, and readiness for milestone 3.

Stop after this milestone. Suggested review/commit units: (1) stylesheet extraction; (2) script extraction plus source-location/test/handoff updates. Do not commit unless asked.
