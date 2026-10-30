# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: lesson-boundaries.spec.mjs >> / public composed data/heading hooks retain independent sealed extraction and all writing profiles validate
- Location: tests/browser/lesson-boundaries.spec.mjs:148:3

# Error details

```
Error: expect(locator).toHaveAccessibleName(expected) failed

Locator:  locator('[data-field-id="synthesis-contributors"]')
Expected: "Which participants' ideas are you connecting?"
Received: ""
Timeout:  10000ms

Call log:
  - Expect "toHaveAccessibleName" with timeout 10000ms
  - waiting for locator('[data-field-id="synthesis-contributors"]')
    23 × locator resolved to <textarea rows="2" id="dsl-component-5-0" class="dsl-writing-field" data-field-id="synthesis-contributors"></textarea>
       - unexpected value ""

```

```yaml
- link "Skip to main content":
  - /url: "#lesson-main"
- banner: DISCUSSION SKILLS LAB · MSHSL SPEECH Closing with Purpose · The Final Stage SELF-PACED · ABOUT 25–30 MINUTES
- navigation "Lesson sections":
  - button "Collapse navigation" [expanded]: ⇤
  - text: YOUR PROGRESS 9 of 9 pages completed
  - progressbar "Completed lesson pages"
  - paragraph: Finish each activity to unlock the next page. Quick Reference is always available.
  - button "Welcome — Why the Final Stage Matters"
  - button "01 — Summary or Synthesis?"
  - button "02 — Connect the Viewpoints"
  - button "03 — Organize the Findings"
  - button "04 — Build Genuine Consensus"
  - button "05 — Check the Task"
  - button "06 — Finish Professionally"
  - button "07 — Practice Your Closing"
  - button "08 — Knowledge Check"
  - button "Quick Reference"
- main:
  - status: Section complete. You can continue.
  - region "Closing with Purpose":
    - paragraph: Welcome · Explore
    - heading "Closing with Purpose" [level=1]
    - paragraph: The strongest endings turn a collection of ideas into a clear, shared outcome.
    - paragraph: During a Discussion round, participants make two broad kinds of contributions. Procedural contributions organize the group's work, such as setting an agenda, monitoring time, and maintaining focus. Substantive contributions develop the group's thinking through ideas, research, analysis, and synthesis.
    - paragraph: "The final stage is primarily substantive. The group brings its ideas together, completes its final product, and checks whether it has adequately answered the task. A strong ending is not simply a recap: it connects perspectives and identifies what the group has accomplished."
    - paragraph:
      - strong: OPENING
    - paragraph: Define the problem and organize the work.
    - paragraph:
      - strong: MIDDLE
    - paragraph: Develop ideas, evidence, and possible solutions.
    - paragraph:
      - strong: FINAL
    - paragraph: Synthesize, summarize, evaluate, and conclude.
    - heading "Discover the final-stage moves" [level=2]
    - paragraph: Select each card to reveal its meaning.
    - button "Connect Ideas — Flip card": Connect Ideas ✓ Explored
    - button "Capture the Findings — Flip card": Capture the Findings ✓ Explored
    - button "Confirm the Outcome — Flip card": Confirm the Outcome ✓ Explored
    - paragraph: You're ready to practice turning discussion into a conclusion.
  - button "← Back" [disabled]
  - button "Next section →"
```

# Test source

```ts
  79  |       const {invalidLessonCases, invalidLessonCandidate} = await import(new URL('__fixtures/security/lesson-cases.mjs', root));
  80  |       const validation = await import(new URL('assets/js/app/lesson-validation.js', root));
  81  |       const validators = {config: validation.validateLessonConfig, manifest: validation.validateLessonManifest, activity: validation.validateActivity};
  82  |       return invalidLessonCases(config, manifest, activities).map(fixture => {
  83  |         const data = invalidLessonCandidate(fixture.kind === 'activity' ? activities[fixture.activityId] : {config, manifest}[fixture.kind], fixture);
  84  |         const context = fixture.kind === 'activity' ? {activityId: fixture.activityId} : {
  85  |           declaringUrl: new URL(fixture.kind === 'config' ? 'lessons/final/config.json' : 'content/final/lesson.json', root), allowedRootUrl: new URL('content/', root)
  86  |         };
  87  |         try { validators[fixture.kind](data, context); return null; } catch { return fixture.name; }
  88  |       });
  89  |     }, {mount, config, manifest, activities});
  90  |     expect(rejected).toEqual(cases.map(fixture => fixture.name)); expect(rejected).toHaveLength(43);
  91  |     expect((await calls(page)).writes).toBe(0);
  92  |   });
  93  | 
  94  |   test(`${mount} public metadata/IDs/paths/missing/broken responses fail before storage reads; retry recovers`, async ({page}) => {
  95  |     const record = '{"completed":[0],"data":{"future":"saved"}}'; await seed(page, record);
  96  |     const invalids = ['config key mismatch', 'config escapes content', 'manifest invalid gate', 'manifest duplicate activity'].map(name => cases.find(item => item.name === name));
  97  |     invalids.push({kind: 'manifest', missing: true}, {kind: 'manifest', broken: true}, {kind: 'manifest', links: true});
  98  |     for (const invalid of invalids) {
  99  |       const path = invalid.kind === 'config' ? 'lessons/final/config.json' : 'content/final/lesson.json', pattern = `**${mount}${path}`;
  100 |       await page.route(pattern, route => {
  101 |         const original = invalid.kind === 'config' ? config : manifest;
  102 |         const data = invalid.links ? {...manifest, id: 'middle'} : invalid.missing || invalid.broken ? null : invalidLessonCandidate(original, invalid);
  103 |         return route.fulfill({status: invalid.missing ? 404 : 200, contentType: 'application/json', body: invalid.broken ? '{' : JSON.stringify(data)});
  104 |       });
  105 |       await page.goto(`${mount}final.html`); await expect(page.locator('#lesson-status')).toContainText('Lesson could not load');
  106 |       await expect(page.locator('#lesson-retry')).toBeVisible(); expect(await calls(page)).toEqual({reads: 0, writes: 0, prints: 0}); expect(await raw(page)).toBe(record);
  107 |       await expect(page.locator('.dsl-card')).toHaveCount(0); await page.unroute(pattern);
  108 |     }
  109 |     await page.locator('#lesson-retry').click(); await ready(page);
  110 |     await expect(own(page, 'welcome-cards').locator('.dsl-card')).toHaveCount(3); await expect(page.locator('[data-reference-print]')).toBeEnabled();
  111 |     expect((await calls(page)).writes).toBe(0);
  112 |   });
  113 | 
  114 |   test(`${mount} public missing/invalid activities isolate failure, retain drafts/reference and hydrate silently on retry`, async ({page}) => {
  115 |     const record = '{"completed":[0,1],"data":{"finalState":{"assembled":true,"fields":{"assembled":"Saved draft ✓"}}}}';
  116 |     await seed(page, record);
  117 |     for (const kind of ['missing', 'wrong-id', 'unknown-type', 'duplicate-items']) {
  118 |       const pattern = `**${mount}content/final/activities/welcome-cards.json`;
  119 |       await page.route(pattern, route => {
  120 |         const data = structuredClone(activities['welcome-cards']);
  121 |         if (kind === 'wrong-id') data.id = 'wrong';
  122 |         if (kind === 'unknown-type') data.type = 'note-classification';
  123 |         if (kind === 'duplicate-items') data.data.items[1].id = data.data.items[0].id;
  124 |         return route.fulfill({status: kind === 'missing' ? 404 : 200, json: data});
  125 |       });
  126 |       await page.goto(`${mount}final.html`); await ready(page);
  127 |       await expect(page.locator('#view-0 [data-content-status]').filter({visible: true})).toContainText('Content could not load');
  128 |       await expect(own(page, 'welcome-cards')).toHaveCount(0); expect(await raw(page)).toBe(record); expect((await calls(page)).writes).toBe(0);
  129 |       await visit(page, 'quick-reference'); await expect(page.locator('[data-reference-print]')).toBeEnabled(); await expect(page.locator('.final-reference-item')).toHaveCount(5);
  130 |       await visit(page, 'connect-viewpoints'); await expect(field(page, 'synthesis-output')).toHaveValue('Saved draft ✓');
  131 |       await page.unroute(pattern); await visit(page, 'welcome'); await page.locator('#view-0 [data-content-retry]').filter({visible: true}).click();
  132 |       await expect(own(page, 'welcome-cards').locator('.dsl-card')).toHaveCount(3); expect((await calls(page)).writes).toBe(0);
  133 |     }
  134 |     await own(page, 'welcome-cards').locator('.dsl-card').first().click(); expect((await calls(page)).writes).toBe(1);
  135 |   });
  136 | 
  137 |   test(`${mount} failed reference body does not disable ordinary credit; retry and Print never save`, async ({page}) => {
  138 |     const pattern = `**${mount}content/final/reference/synthesis-framework.md`;
  139 |     await page.route(pattern, route => route.fulfill({status: 503, body: ''})); await load(page);
  140 |     await expect(page.locator('[data-reference-status]')).toContainText('could not load');
  141 |     await cards(page, 'welcome-cards'); expect((await state(page)).completedSections).toEqual(['welcome']); const before = await raw(page);
  142 |     await visit(page, 'quick-reference'); await expect(page.locator('[data-reference-print]')).toBeDisabled();
  143 |     await page.unroute(pattern); await page.locator('[data-reference-retry]').click();
  144 |     await expect(page.locator('[data-reference-print]')).toBeEnabled(); await page.locator('[data-reference-print]').click();
  145 |     expect((await calls(page)).prints).toBe(1); expect(await raw(page)).toBe(before);
  146 |   });
  147 | 
  148 |   test(`${mount} public composed data/heading hooks retain independent sealed extraction and all writing profiles validate`, async ({page}) => {
  149 |     const completed = JSON.parse(readFileSync(new URL('../fixtures/progress/final/completed.json', import.meta.url))).raw;
  150 |     await load(page, completed);
  151 |     const expected = await page.evaluate(async ({mount, source}) => {
  152 |       const root = new URL(mount, location.origin);
  153 |       const {explorationActivities, questionActivities} = await import(new URL('__fixtures/harness/component-data.mjs', root));
  154 |       const {writingActivities} = await import(new URL('__fixtures/harness/writing-data.mjs', root));
  155 |       const {validateActivity} = await import(new URL('assets/js/app/lesson-validation.js', root));
  156 |       const read = async path => (await fetch(new URL(path, root))).text();
  157 |       const banks = JSON.parse(await read('__fixtures/content/banks.json')), map = JSON.parse(await read('__fixtures/legacy-maps/final.json'));
  158 |       const doc = new DOMParser().parseFromString(source, 'text/html');
  159 |       for (const lesson of ['opening', 'middle', 'final']) {
  160 |         const html = await read(`__fixtures/content/source/${lesson}.html`), mapping = JSON.parse(await read(`__fixtures/legacy-maps/${lesson}.json`));
  161 |         const middleSource = lesson === 'middle' ? await read('__fixtures/content/source/assets/js/middle.js') : '';
  162 |         for (const item of writingActivities(new DOMParser().parseFromString(html, 'text/html'), banks, mapping, lesson, middleSource)) validateActivity({schemaVersion: 1, id: item.id, type: 'writing', profile: item.profile, data: item.data});
  163 |       }
  164 |       return {exploration: explorationActivities({final: doc}, {final: map}, 'final'), questions: questionActivities(banks, {final: map}, 'final'),
  165 |         writing: writingActivities(doc, banks, map, 'final')[0], headings: [...doc.querySelectorAll('.lesson-view')].map(view => view.querySelector('h1,h2,h3').textContent.trim())};
  166 |     }, {mount, source: original('final.html').toString()});
  167 |     const norm = text => text.replace(/\s+/g, ' ').trim();
  168 |     for (const item of expected.exploration) for (const entry of item.data.items) {
  169 |       const host = own(page, item.id).locator(`[data-card-id="${entry.id}"],[data-panel-id="${entry.id}"]`);
  170 |       if (entry.front) { expect(norm(await host.locator('.dsl-card-front').textContent())).toContain(entry.front); expect(norm(await host.locator('.dsl-card-back').textContent())).toContain(entry.back); }
  171 |       else { expect(norm(await host.locator('summary').textContent())).toContain(entry.title); expect(norm(await host.locator('.dsl-expandable-body').textContent())).toBe(entry.body); }
  172 |     }
  173 |     for (const item of expected.questions) {
  174 |       const actual = activities[item.id].data.questions;
  175 |       expect(actual).toEqual(item.data.questions);
  176 |     }
  177 |     const writing = expected.writing;
  178 |     for (const descriptor of [...writing.data.fields, writing.data.output]) {
> 179 |       await expect(field(page, descriptor.id)).toHaveAccessibleName(descriptor.label);
      |                                                ^ Error: expect(locator).toHaveAccessibleName(expected) failed
  180 |       await expect(field(page, descriptor.id)).toHaveJSProperty('readOnly', descriptor.readonly);
  181 |       if (descriptor.placeholder) await expect(field(page, descriptor.id)).toHaveAttribute('placeholder', descriptor.placeholder);
  182 |     }
  183 |     for (const block of writing.data.model.blocks) await expect(own(page, writing.id).locator('.dsl-writing-model')).toContainText(block.text);
  184 |     expect(activities[writing.id].data.assembly.template).toBe(writing.data.assembly.template);
  185 |     expect(activities['synthesis-checklist'].data).toEqual(writing.checklist.data);
  186 |     expect(await page.locator('#views > .lesson-view').evaluateAll(views => views.map(view => view.querySelector('h1,h2,h3').textContent))).toEqual(expected.headings);
  187 |     await expect(page.locator('#view-0')).toHaveAttribute('aria-labelledby', manifest.sections[0].headingId);
  188 |     expect((await calls(page)).writes).toBe(0);
  189 |   });
  190 | 
  191 |   for (const failure of ['corrupt', 'denied', 'quota']) test(`${mount} public ${failure} storage preserves session unlock, exact bytes and separate warning`, async ({page}) => {
  192 |     const record = failure === 'corrupt' ? '{invalid JSON' : null;
  193 |     await seed(page, record);
  194 |     await page.addInitScript(({key, failure}) => {
  195 |       const get = Storage.prototype.getItem, set = Storage.prototype.setItem;
  196 |       Storage.prototype.getItem = function(name) { if (name === key && failure === 'denied') throw new DOMException('Synthetic denial', 'SecurityError'); return get.call(this, name); };
  197 |       Storage.prototype.setItem = function(name, value) {
  198 |         if (name === key && failure === 'quota') { window.boundaryCalls.writes++; throw new DOMException('Synthetic quota', 'QuotaExceededError'); }
  199 |         return set.call(this, name, value);
  200 |       };
  201 |     }, {key, failure});
  202 |     await page.goto(`${mount}final.html`); await ready(page); expect((await calls(page)).writes).toBe(0);
  203 |     await cards(page, 'welcome-cards'); await expect(page.locator('#next-section')).toBeEnabled();
  204 |     await expect(page.locator('#storage-warning')).toContainText(/session|saved/); await expect(page.locator('#storage-warning')).toHaveAttribute('role', 'status');
  205 |     await expect(page.locator('#lesson-status')).toBeHidden(); expect(await raw(page)).toBe(record);
  206 |     expect((await calls(page)).writes).toBe(failure === 'quota' ? 3 : 0);
  207 |     await visit(page, 'quick-reference'); await expect(page.locator('[data-reference-print]')).toBeEnabled();
  208 |   });
  209 | }
  210 | 
```