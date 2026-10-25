# Isolated shared-runtime harnesses

Development-only pages; no production lesson imports these modules. They must not
run a new progress writer alongside a legacy activity engine. Use isolated test
origins/contexts and synthetic drafts only.

`storage.html?lesson=opening|middle|final` directly exercises the checkpoint-4.1
store/adapters with labeled test controls, not invented instructional questions.
The test runner seeds the sealed progress envelopes' `raw` bytes, never the whole
envelope. The page imports adapters statically and never scans fields to serialize.

Harness code/test-control labels are MIT. Any baseline educational content reused
in subsequent harnesses remains © Rhys Jones, CC BY 4.0, with provenance to the
immutable `tests/fixtures/content/` baseline (pinned revision
`0b5d2297e7cbc19bd59cde750492dd28e3983ca0`). Fixtures are test evidence, not a
second writable instructional content source. Root licenses remain authoritative.

`navigation.html` (optional `?reorder`) directly mounts checkpoint-4.2 navigation
with explicit stable IDs/existing views, the verified Opening store/adapter and
small **test-only** completion gates. Its controls are not production activities
or replacement instructional questions. Fifteen Opening heading/introduction
excerpts and eight navigation labels are copied exactly from pinned `0b5d229`
`opening.html` / extracted `assets/js/opening.js`; unit tests compare that content
independently of layout. Excerpts © Rhys Jones / CC BY 4.0; code/test labels MIT.
The h1/h3 variants exercise heading focus, not a production heading rewrite.
No reference renderer/printing or general lesson bootstrap is mounted here.

The navigation module cannot write storage or grant completion. Only labeled
test-control events mutate supplied normalized state, run pure test gates, save
through the verified store, then update navigation. Mount/refresh/visits/Next never
run gates or save; current section and rail collapse are not persisted. Reordered
views/decoys cannot change serialization maps. The page must never load a legacy
engine alongside the new store. See `.opencode/docs/progress-compatibility.md` for
the documented navigation/completion APIs and ownership.

`components.html?lesson=opening|middle|final` (optional `&reorder`) directly mounts
checkpoint-4.3 flashcards, native expandable rows/Opening timeline, standalone
multiple choice and all five sequence profiles. `component-data.mjs` reads the
sealed banks/maps and inert source HTML; it does not execute legacy scripts, add
invented questions, or create a second writable content bank. All excerpts remain
© Rhys Jones / CC BY 4.0, pinned revision above. Component inputs are audited by
unit/browser content comparisons; complete content schemas/bootstrap are 4.5.

All activities deliberately share the first **test** view; other explicit section
elements exercise the already verified navigation. Small test gates (including the
Opening current-answer exception) are not complete lesson policies. Component
callbacks publish copied next-activity state; the harness alone merges it, applies
completion, saves via the real adapter/store and updates navigation/components.
No production lesson entry imports this fixture or the new stylesheet. The shell
reset/wrapping CSS is fixture-scoped; the unrelated legacy decoy verifies new styles
do not leak. No writing, checklist, reference integration or general renderer is
implemented here. Manual actual zoom/AT/animation checks remain separate from the
automated geometry/focus/ARIA evidence.

`writing-reference.html?lesson=opening|middle|final` (optional `&reorder`, `&prefix`
for repository-prefix reference includes) directly mounts 4.4 writing/checklist
components, the verified store/navigation, and the milestone-3 reference renderer
through an independent reference loader. `writing-data.mjs` extracts field labels,
placeholders/rows/modes, model paragraphs/titles and checklist labels from the sealed
HTML/banks/Middle script. Three content-supplied sentence templates are checked
against actual pinned handler snippets by unit tests. No legacy script executes.

Five writing tools share the first test view in lesson-specific subsets; small
writing-only gates intentionally omit production question/exploration requirements.
Model requirements remain external: optional Opening/Middle, required Final.
Callbacks map only known field/flag identities before completion/store updates;
fallback controls never participate. Opening model visibility stays session-only.
The real extracted Final reference is reused without migrating more content.
Independent startup/failure/retry can be exercised while activity excerpts fail;
the page preserves stored drafts and offers separate loading/storage messages.
Its scoped CSS is a harness print contract, not milestone-8 global cleanup.
Actual browser print previews/zoom/AT remain manual follow-ups, not inferred from
print-media assertions, PDFs, input selection or 320px/enlarged-text checks.

`lesson.html` is the checkpoint-4.5 end-to-end entry, using the real
`mountLesson(root,{configUrl,adapter,completionPolicy,registry})` with static
imports. The server serves it both at `/__fixtures/harness/lesson.html` and
`/discussion-skills-lab/__fixtures/harness/lesson.html`, without copying runtime
files or changing any live lesson entry. A normal Python static server can also
serve the files at their actual `tests/fixtures/harness/` path.

Its `lessons/final/config.json` -> `content/final/lesson.json` graph composes six
standard types with exact baseline Final excerpts. References are byte-identical
copies of the existing production reference, asserted by units; activity data and
all ten headings are checked against the sealed inert source/banks. They are
read-only fixtures, not a second writable application-content source. No invented
questions or whole-lesson policy claim. Test-only gates are declared in static
`lesson.mjs`, not JSON expressions/code paths. `lesson-invalid.mjs` is shared by
development/unit and actual browser-runtime validation tests.

`lesson.css` is scoped fixture shell/print support, not production print cleanup.
It uses the same permitted uniform reference styling as 4.4. Bootstrap metadata,
activity and reference errors each offer retries; persistence warnings stay
separate. Stored drafts/credit never reset. No legacy engine runs with the new
writer, and unmount/remount must remove all owned listeners and pending work.