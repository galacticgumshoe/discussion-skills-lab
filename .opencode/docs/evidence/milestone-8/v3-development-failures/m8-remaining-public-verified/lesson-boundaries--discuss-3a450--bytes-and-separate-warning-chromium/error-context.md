# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: lesson-boundaries.spec.mjs >> /discussion-skills-lab/ public denied storage preserves session unlock, exact bytes and separate warning
- Location: tests/browser/lesson-boundaries.spec.mjs:191:57

# Error details

```
Error: page.evaluate: Target page, context or browser has been closed
```

```
Error: write EPIPE
```

# Test source

```ts
  1   | // MIT tests; original instructional content © Rhys Jones, CC BY 4.0.
  2   | // Real Final entry: no partial lesson, test gates, lifecycle global or copied bank.
  3   | import {test, expect} from '@playwright/test';
  4   | import {readFileSync} from 'node:fs';
  5   | import {finalAdapter} from '../../lessons/final/progress-adapter.js';
  6   | import {finalManifest as manifest, finalActivity, finalVisit as visit, solveFinal} from '../helpers/final-journey.mjs';
  7   | import {invalidLessonCases, invalidLessonCandidate} from '../fixtures/security/lesson-cases.mjs';
  8   | import {original} from '../helpers/baseline-source.mjs';
  9   | const config = JSON.parse(readFileSync(new URL('../../lessons/final/config.json', import.meta.url)));
  10  | const activities = Object.fromEntries(manifest.activities.map(item => [item.id, finalActivity(item.id)]));
  11  | const cases = invalidLessonCases(config, manifest, activities), key = finalAdapter.key;
  12  | const own = (page, id) => page.locator(`[data-activity-id="${id}"]`);
  13  | const field = (page, id) => page.locator(`[data-field-id="${id}"]`);
  14  | const calls = page => page.evaluate(() => window.boundaryCalls);
  15  | const raw = page => page.evaluate(key => window.boundaryGet.call(localStorage, key), key);
  16  | const state = async page => finalAdapter.decode(JSON.parse(await raw(page)));
  17  | const ready = async page => { await expect(page.locator('#lesson-status')).toHaveCount(1); await expect(page.locator('#lesson-status')).toBeHidden(); };
  18  | const cards = async (page, id) => { for (const card of await own(page, id).locator('.dsl-card').all()) await card.click(); };
  19  | const errors = new WeakMap();
  20  | 
  21  | test.beforeEach(async ({page}) => {
  22  |   const messages = []; errors.set(page, messages); page.on('pageerror', error => messages.push(error.message));
  23  |   await page.addInitScript(key => {
  24  |     window.boundaryCalls = {reads: 0, writes: 0, prints: 0};
  25  |     const get = Storage.prototype.getItem, set = Storage.prototype.setItem; window.boundaryGet = get;
  26  |     Storage.prototype.getItem = function(name) { if (name === key) window.boundaryCalls.reads++; return get.call(this, name); };
  27  |     Storage.prototype.setItem = function(name, value) { if (name === key) window.boundaryCalls.writes++; return set.call(this, name, value); };
  28  |     window.print = () => window.boundaryCalls.prints++;
  29  |   }, key);
  30  | });
> 31  | test.afterEach(({page}) => expect(errors.get(page)).toEqual([]));
      |                                                     ^ Error: write EPIPE
  32  | 
  33  | for (const mount of ['/', '/discussion-skills-lab/']) {
  34  |   async function seed(page, record = null) {
  35  |     await page.goto(mount);
  36  |     await page.evaluate(({key, record}) => record === null ? localStorage.removeItem(key) : localStorage.setItem(key, record), {key, record});
  37  |   }
  38  |   const load = async (page, record = null) => { await seed(page, record); await page.goto(`${mount}final.html`); await ready(page); };
  39  | 
  40  |   test(`${mount} public Final actual prerequisites/unlock, fixed fields, decoys, permanent credit and refresh`, async ({page}) => {
  41  |     await load(page, '{"completed":[],"data":{"future":{"keep":"✓"}}}');
  42  |     expect(await calls(page)).toEqual({reads: 1, writes: 0, prints: 0});
  43  |     await expect(page.locator('#progress-text')).toHaveText('0 of 9 pages completed');
  44  |     await expect(page.locator('#next-section')).toBeDisabled();
  45  |     await cards(page, 'welcome-cards'); await page.locator('#next-section').click();
  46  |     // The real lesson reveals its questions only after the two cards, unlike
  47  |     // the partial migration site's always-mounted test composition.
  48  |     await expect(own(page, 'summary-synthesis-questions')).toBeHidden();
  49  |     await cards(page, 'summary-synthesis-cards');
  50  |     await expect(page.locator('#next-section')).toBeDisabled();
  51  |     await solveFinal(page, 'summary-synthesis-questions', {alternatives: false});
  52  |     await page.locator('#next-section').click();
  53  |     for (const summary of await own(page, 'connect-viewpoints-panels').locator('summary').all()) {
  54  |       await summary.click(); await expect(summary.locator('.dsl-panel-explored')).toBeVisible();
  55  |     }
  56  |     await own(page, 'connect-viewpoints-questions').locator('[data-option-id="coordinate"]').click();
  57  |     for (const [index, descriptor] of activities['synthesis-writing'].data.fields.entries()) await field(page, descriptor.id).fill(['Māya and Jordan!', 'Their concerns connect?!', 'We recommend a pilot.'][index]);
  58  |     await own(page, 'synthesis-writing').locator('.dsl-assemble').click();
  59  |     await expect(page.locator('#next-section')).toBeDisabled();
  60  |     await own(page, 'synthesis-writing').locator('.dsl-model-toggle').click();
  61  |     for (const check of await own(page, 'synthesis-checklist').getByRole('checkbox').all()) await check.check();
  62  |     await expect(page.locator('#next-section')).toBeEnabled();
  63  |     await page.locator('#views').evaluate(container => [...container.children].reverse().forEach(node => container.append(node)));
  64  |     await own(page, 'synthesis-writing').evaluate(host => host.prepend(document.createElement('textarea')));
  65  |     const draft = 'Edited output 學生 🧭\n<em>not markup</em>';
  66  |     await field(page, 'synthesis-output').fill(draft); await own(page, 'synthesis-checklist').getByRole('checkbox').first().uncheck();
  67  |     const saved = JSON.parse(await raw(page));
  68  |     expect(saved.completed).toEqual([0, 1, 2]); expect(saved.data.future).toEqual({keep: '✓'}); expect(saved.data.finalState.fields.assembled).toBe(draft);
  69  |     await page.reload(); await ready(page); expect(await calls(page)).toEqual({reads: 1, writes: 0, prints: 0});
  70  |     await expect(page.locator('[data-section-id="welcome"]')).toBeVisible(); await visit(page, 'connect-viewpoints');
  71  |     await expect(field(page, 'synthesis-output')).toHaveValue(draft); await expect(own(page, 'synthesis-checklist').getByRole('checkbox').first()).not.toBeChecked();
  72  |     await expect(page.locator('#next-section')).toBeEnabled();
  73  |   });
  74  | 
  75  |   test(`${mount} all 43 shared invalid cases are rejected by real browser boundaries without saves`, async ({page}) => {
  76  |     await load(page);
  77  |     const rejected = await page.evaluate(async ({mount, config, manifest, activities}) => {
  78  |       const root = new URL(mount, location.origin);
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
```