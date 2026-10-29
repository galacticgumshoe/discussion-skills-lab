# Authoring and maintenance

**Checkpoint:** the owner-approved shared shell/home/print cutovers are implemented
locally; see [removal outcomes and remaining conditions](legacy-removal-inventory.md).
`content/home.md` and `content/catalog.json` now own homepage wording/cards. Remaining
migration-harness retirement and owner browser verification are pending. No commit
or publication is authorized. Do not publish a new lesson in this milestone.

## Editing existing instruction

1. Serve locally (`python3 -m http.server 8000`); never test with real student
   records. Existing v1 keys must not change. Work on a non-`main` branch.
2. Find the section in `content/<id>/lesson.json`. Edit its referenced `sections/`
   Markdown for prose/examples; preserve meaningful emphasis and explicit hard
   breaks. Layout changes and instructional revisions are separate review units.
3. Questions/choices/keys/feedback live in `activities/*.json`. Keep stable IDs,
   question/option order and `correctOptionId` associations. Feedback is either the
   exact question-wide explanation or each option's exact feedback, not guessed HTML.
4. Models use writing activity `data.model.blocks` (plain `text` or a referenced
   Markdown `source`). Criteria/checklists use ordered `data.items` with stable IDs.
   Builder templates and profiles control punctuation/modes: do not change them
   while adjusting CSS. Opening/Final outputs editable; Middle output readonly.
5. References use `reference/reference.json` + Markdown. Preserve group order,
   headings/accents/number labels, every list item, examples and hard breaks. Opening
   has four groups; Middle/Final have their own compositions. Print is not a
   content-reduction tool.
6. Run `npm run validate:content`, affected exact-content/policy units and targeted
   browser specs at `/` **and** `/discussion-skills-lab/`. Both mounts use the same
   origin storage, so isolate contexts. For Firefox use the checklist's fresh
   `CFFIXED_USER_HOME`. Check every changed feedback/model/reveal, not just page one.
7. Compare readable layout at 1440px, near breakpoints, 390/320px and actual 200%
   browser zoom; keyboard, reduced motion, focus/live feedback and print from an
   ordinary page as well as the reference. Record real browser/device/AT checks
   honestly. Minor spacing/reflow is allowed; lost content or changed gates is not.

Content revisions need explicit instructional review; do not update frozen banks,
maps or captures to make a regression disappear. Existing IDs are storage API:
renaming/reordering sections does not automatically migrate numeric legacy maps.

## Add a future lesson, worksheet or reference

Use the executable **test-only** examples in `tests/fixtures/new-module/`. They
contain non-instructional MIT test labels, not invented coaching material.

1. Choose a fresh lowercase hyphenated module ID, section IDs and activity/question/
   option/field/check IDs. Never reuse an old ID for a different meaning. Avoid
   `constructor`, `prototype`, `__proto__`. Retain IDs across wording/layout edits.
2. Supply `lessons/<id>/config.json` and `content/<id>/lesson.json`. Config uses an
   explicit section list ending in exactly one reference; even a reference-only
   module has that section. Sources resolve relative to their declaring JSON.
   Keep `presentation: "legacy-shell"` (the existing supported structural profile
   name, not permission to use the classic engine).
3. Import the common `mountLesson` and `createIdProgressAdapter` in a thin static
   entry. Supply normalized defaults for the mounted activities/fields, and small
   pure gate functions only if the module needs completion. Use the standard
   registry; never duplicate controller/storage implementations. For a worksheet,
   choose writing profile `draft` and optional checklist; do not invent a quiz.
4. A brand-new module uses `dsl:<id>:v1` and normalized record schema version 1;
   **never apply that adapter to Opening/Middle/Final**. For a read-only reference,
   use `storageKey: null`, adapter `persistent: false`, and `{}` completion policy.
   No rollback to the original engine is promised for instruction that did not
   exist in that engine. Missing/corrupt/unknown-version records follow the same
   guarded store policy; unsafe bytes are not overwritten.
5. Add the small root entry HTML with document title, viewport, favicon, unchanged
   font/Tailwind references, the stylesheet order described below, empty
   `<div class="app-shell"></div>` and the thin module. This mechanical distinct
   public URL is expected without a build/routing system. Include a no-JS notice
   explaining lessons need JavaScript, not fake interactive controls.
6. After review, add a catalog record; no copied card markup. Validate destinations
   and IDs. New instruction/publication requires separate permission.

Copyable **config** for a new reference-only test module (MIT; save as
`lessons/sample-reference/config.json` within the fixture site):

```json
{
  "schemaVersion": 1,
  "id": "sample-reference",
  "storageKey": null,
  "content": "../../content/sample-reference/lesson.json",
  "sectionOrder": ["test-reference"],
  "referenceId": "test-reference",
  "presentation": "legacy-shell"
}
```

Copyable **manifest** (full reference document/body provided by the fixture):

```json
{
  "schemaVersion": 1,
  "id": "sample-reference",
  "title": "Test read-only reference",
  "duration": "TEST ONLY",
  "activities": [],
  "sections": [{
    "id": "test-reference", "label": "Test reference",
    "heading": "Test reference", "headingLevel": 1,
    "requirement": "Always available.", "reference": true,
    "gateActivityIds": [],
    "blocks": [{"type": "reference", "source": "../sample-module/reference.json"}]
  }]
}
```

Copyable **activity** using the actual multiple-choice schema (MIT test labels):

```json
{
  "schemaVersion": 1, "id": "test-question", "type": "multiple-choice",
  "profile": "standard",
  "data": {
    "id": "test-choice", "prompt": "Test choice label", "correctOptionId": "option-b",
    "options": [
      {"id": "option-a", "text": "Test option A", "feedback": "Test response A."},
      {"id": "option-b", "text": "Test option B", "feedback": "Test response B."}
    ]
  }
}
```

The fixture's `data.js` demonstrates defaults and two distinct gates (correct-ever
question; minimum-length test draft **and** both checklist IDs). These thresholds
are non-instructional test policy, not new Discussion guidance or automatic grading.
`entry.js` imports the real app; `index.html` and `reference.html` exercise both
configured modes with no copied interaction logic.
Its `fixtureRuntime` lifecycle controls are test-only; do not copy those globals
into a public entry. `app-lifecycle.spec.mjs` tests remount/cancellation/registry and
readiness contracts on this noninstructional module, not a partial Final lesson.

## Shell/styles/homepage

Stylesheet order: tokens → shared → lesson/components in the lesson's
existing relative order → reference → print **last**. Keep dependency URLs and
native module order deterministic. `duration` is validated manifest metadata; keep
the exact existing header duration. Shell controls/hook IDs are software, not
authored Markdown. Navigation follows config/manifest order, never DOM siblings.

Homepage `content/home.md` has five blocks: eyebrow paragraph, h1, introduction,
progress paragraph (with strong label), disclaimer. Keep that bounded structure.
`content/catalog.json` has schema version 1 and an ordered `lessons` array. Each
record requires `id`, `url` exactly `<id>.html`, title and description; existing
links stay `opening.html`, `middle.html`, `final.html`. Runtime validates safe
shape/URLs, development checks actual entry/config/manifest destinations.

Catalog record example (the exact existing CC BY Rhys Jones content):

```json
{
  "id": "opening", "url": "opening.html", "title": "Opening Stage",
  "description": "Start with a clear structure, establish the task, ask productive questions, and help the group get underway."
}
```

Root metadata/document-title/fallback/rights-link repetition is a documented small
exception. Do not duplicate full prose in fallback markup. Enhanced homepage hides
generic links only after all data renders successfully; failure/no JS retains
navigation and explains the JS limitation.

## Tools, licenses and release

`npm ci` installs development-only Playwright/Ajv; no install/build is needed for
production. Use scoped tests while editing (see regression checklist); full release
verification is a separate reviewed decision under the current targeted-test
instruction. Manual sign-offs are not replaced by headless WebKit or PDF output.

Original lesson/homepage content and meaningful archived variants: © Rhys Jones,
CC BY 4.0, including when embedded in mixed fixtures. Software/config/noninstructional
test labels: MIT. Preserve vendor exclusions, licenses and `THIRD_PARTY_NOTICES.md`.
Tailwind CDN and Google Fonts remain external; no offline guarantee/accounts/sync.
Do not delete legacy code/selectors without inventory-specific user approval, and
do not commit, merge, push, tag or publish without separate authorization.
