# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: lesson-boundaries.spec.mjs >> / public missing/invalid activities isolate failure, retain drafts/reference and hydrate silently on retry
- Location: tests/browser/lesson-boundaries.spec.mjs:110:3

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('#view-0 [data-content-status]').last()
Expected substring: "Content could not load"
Received string:    "Content is loading."
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for locator('#view-0 [data-content-status]').last()
    23 × locator resolved to <p hidden="" role="status" data-content-status="">Content is loading.</p>
       - unexpected value "Content is loading."

```

```yaml
- link "Skip to main content":
  - /url: "#lesson-main"
- banner: DISCUSSION SKILLS LAB · MSHSL SPEECH Closing with Purpose · The Final Stage SELF-PACED · ABOUT 25–30 MINUTES
- navigation "Lesson sections":
  - button "Collapse navigation" [expanded]: ⇤
  - text: YOUR PROGRESS 2 of 9 pages completed
  - progressbar "Completed lesson pages"
  - paragraph: Finish each activity to unlock the next page. Quick Reference is always available.
  - button "Welcome — Why the Final Stage Matters"
  - button "01 — Summary or Synthesis?"
  - button "02 — Connect the Viewpoints"
  - button "03 — Organize the Findings" [disabled]
  - button "04 — Build Genuine Consensus" [disabled]
  - button "05 — Check the Task" [disabled]
  - button "06 — Finish Professionally" [disabled]
  - button "07 — Practice Your Closing" [disabled]
  - button "08 — Knowledge Check" [disabled]
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
    - status: "Content could not load (/content/final/activities/welcome-cards.json: HTTP 404). Retry; saved work is preserved. Quick Reference remains available."
    - button "Retry content"
  - button "← Back" [disabled]
  - button "Next section →"
```

# Test source

```ts
  23  |     Storage.prototype.getItem = function(name) { if (name === key) window.boundaryCalls.reads++; return get.call(this, name); };
  24  |     Storage.prototype.setItem = function(name, value) { if (name === key) window.boundaryCalls.writes++; return set.call(this, name, value); };
  25  |     window.print = () => window.boundaryCalls.prints++;
  26  |   }, key);
  27  | });
  28  | 
  29  | for (const mount of ['/', '/discussion-skills-lab/']) {
  30  |   async function seed(page, record = null) {
  31  |     await page.goto(mount);
  32  |     await page.evaluate(({key, record}) => record === null ? localStorage.removeItem(key) : localStorage.setItem(key, record), {key, record});
  33  |   }
  34  |   const load = async (page, record = null) => { await seed(page, record); await page.goto(`${mount}final.html`); await ready(page); };
  35  | 
  36  |   test(`${mount} public Final actual prerequisites/unlock, fixed fields, decoys, permanent credit and refresh`, async ({page}) => {
  37  |     await load(page, '{"completed":[],"data":{"future":{"keep":"✓"}}}');
  38  |     expect(await calls(page)).toEqual({reads: 1, writes: 0, prints: 0});
  39  |     await expect(page.locator('#progress-text')).toHaveText('0 of 9 pages completed');
  40  |     await expect(page.locator('#next-section')).toBeDisabled();
  41  |     await cards(page, 'welcome-cards'); await page.locator('#next-section').click();
  42  |     // The real lesson reveals its questions only after the two cards, unlike
  43  |     // the partial migration site's always-mounted test composition.
  44  |     await expect(own(page, 'summary-synthesis-questions')).toBeHidden();
  45  |     await cards(page, 'summary-synthesis-cards');
  46  |     await expect(page.locator('#next-section')).toBeDisabled();
  47  |     await solveFinal(page, 'summary-synthesis-questions', {alternatives: false});
  48  |     await page.locator('#next-section').click();
  49  |     for (const summary of await own(page, 'connect-viewpoints-panels').locator('summary').all()) {
  50  |       await summary.click(); await expect(summary.locator('.dsl-panel-explored')).toBeVisible();
  51  |     }
  52  |     await own(page, 'connect-viewpoints-questions').locator('[data-option-id="coordinate"]').click();
  53  |     for (const [index, descriptor] of activities['synthesis-writing'].data.fields.entries()) await field(page, descriptor.id).fill(['Māya and Jordan!', 'Their concerns connect?!', 'We recommend a pilot.'][index]);
  54  |     await own(page, 'synthesis-writing').locator('.dsl-assemble').click();
  55  |     await expect(page.locator('#next-section')).toBeDisabled();
  56  |     await own(page, 'synthesis-writing').locator('.dsl-model-toggle').click();
  57  |     for (const check of await own(page, 'synthesis-checklist').getByRole('checkbox').all()) await check.check();
  58  |     await expect(page.locator('#next-section')).toBeEnabled();
  59  |     await page.locator('#views').evaluate(container => [...container.children].reverse().forEach(node => container.append(node)));
  60  |     await own(page, 'synthesis-writing').evaluate(host => host.prepend(document.createElement('textarea')));
  61  |     const draft = 'Edited output 學生 🧭\n<em>not markup</em>';
  62  |     await field(page, 'synthesis-output').fill(draft); await own(page, 'synthesis-checklist').getByRole('checkbox').first().uncheck();
  63  |     const saved = JSON.parse(await raw(page));
  64  |     expect(saved.completed).toEqual([0, 1, 2]); expect(saved.data.future).toEqual({keep: '✓'}); expect(saved.data.finalState.fields.assembled).toBe(draft);
  65  |     await page.reload(); await ready(page); expect(await calls(page)).toEqual({reads: 1, writes: 0, prints: 0});
  66  |     await expect(page.locator('[data-section-id="welcome"]')).toBeVisible(); await visit(page, 'connect-viewpoints');
  67  |     await expect(field(page, 'synthesis-output')).toHaveValue(draft); await expect(own(page, 'synthesis-checklist').getByRole('checkbox').first()).not.toBeChecked();
  68  |     await expect(page.locator('#next-section')).toBeEnabled();
  69  |   });
  70  | 
  71  |   test(`${mount} all 43 shared invalid cases are rejected by real browser boundaries without saves`, async ({page}) => {
  72  |     await load(page);
  73  |     const rejected = await page.evaluate(async ({mount, config, manifest, activities}) => {
  74  |       const root = new URL(mount, location.origin);
  75  |       const {invalidLessonCases, invalidLessonCandidate} = await import(new URL('__fixtures/security/lesson-cases.mjs', root));
  76  |       const validation = await import(new URL('assets/js/app/lesson-validation.js', root));
  77  |       const validators = {config: validation.validateLessonConfig, manifest: validation.validateLessonManifest, activity: validation.validateActivity};
  78  |       return invalidLessonCases(config, manifest, activities).map(fixture => {
  79  |         const data = invalidLessonCandidate(fixture.kind === 'activity' ? activities[fixture.activityId] : {config, manifest}[fixture.kind], fixture);
  80  |         const context = fixture.kind === 'activity' ? {activityId: fixture.activityId} : {
  81  |           declaringUrl: new URL(fixture.kind === 'config' ? 'lessons/final/config.json' : 'content/final/lesson.json', root), allowedRootUrl: new URL('content/', root)
  82  |         };
  83  |         try { validators[fixture.kind](data, context); return null; } catch { return fixture.name; }
  84  |       });
  85  |     }, {mount, config, manifest, activities});
  86  |     expect(rejected).toEqual(cases.map(fixture => fixture.name)); expect(rejected).toHaveLength(43);
  87  |     expect((await calls(page)).writes).toBe(0);
  88  |   });
  89  | 
  90  |   test(`${mount} public metadata/IDs/paths/missing/broken responses fail before storage reads; retry recovers`, async ({page}) => {
  91  |     const record = '{"completed":[0],"data":{"future":"saved"}}'; await seed(page, record);
  92  |     const invalids = ['config key mismatch', 'config escapes content', 'manifest invalid gate', 'manifest duplicate activity'].map(name => cases.find(item => item.name === name));
  93  |     invalids.push({kind: 'manifest', missing: true}, {kind: 'manifest', broken: true}, {kind: 'manifest', links: true});
  94  |     for (const invalid of invalids) {
  95  |       const path = invalid.kind === 'config' ? 'lessons/final/config.json' : 'content/final/lesson.json', pattern = `**${mount}${path}`;
  96  |       await page.route(pattern, route => {
  97  |         const original = invalid.kind === 'config' ? config : manifest;
  98  |         const data = invalid.links ? {...manifest, id: 'middle'} : invalid.missing || invalid.broken ? null : invalidLessonCandidate(original, invalid);
  99  |         return route.fulfill({status: invalid.missing ? 404 : 200, contentType: 'application/json', body: invalid.broken ? '{' : JSON.stringify(data)});
  100 |       });
  101 |       await page.goto(`${mount}final.html`); await expect(page.locator('#lesson-status')).toContainText('Lesson could not load');
  102 |       await expect(page.locator('#lesson-retry')).toBeVisible(); expect(await calls(page)).toEqual({reads: 0, writes: 0, prints: 0}); expect(await raw(page)).toBe(record);
  103 |       await expect(page.locator('.dsl-card')).toHaveCount(0); await page.unroute(pattern);
  104 |     }
  105 |     await page.locator('#lesson-retry').click(); await ready(page);
  106 |     await expect(own(page, 'welcome-cards').locator('.dsl-card')).toHaveCount(3); await expect(page.locator('[data-reference-print]')).toBeEnabled();
  107 |     expect((await calls(page)).writes).toBe(0);
  108 |   });
  109 | 
  110 |   test(`${mount} public missing/invalid activities isolate failure, retain drafts/reference and hydrate silently on retry`, async ({page}) => {
  111 |     const record = '{"completed":[0,1],"data":{"finalState":{"assembled":true,"fields":{"assembled":"Saved draft ✓"}}}}';
  112 |     await seed(page, record);
  113 |     for (const kind of ['missing', 'wrong-id', 'unknown-type', 'duplicate-items']) {
  114 |       const pattern = `**${mount}content/final/activities/welcome-cards.json`;
  115 |       await page.route(pattern, route => {
  116 |         const data = structuredClone(activities['welcome-cards']);
  117 |         if (kind === 'wrong-id') data.id = 'wrong';
  118 |         if (kind === 'unknown-type') data.type = 'note-classification';
  119 |         if (kind === 'duplicate-items') data.data.items[1].id = data.data.items[0].id;
  120 |         return route.fulfill({status: kind === 'missing' ? 404 : 200, json: data});
  121 |       });
  122 |       await page.goto(`${mount}final.html`); await ready(page);
> 123 |       await expect(page.locator('#view-0 [data-content-status]').last()).toContainText('Content could not load');
      |                                                                          ^ Error: expect(locator).toContainText(expected) failed
  124 |       await expect(own(page, 'welcome-cards')).toHaveCount(0); expect(await raw(page)).toBe(record); expect((await calls(page)).writes).toBe(0);
  125 |       await visit(page, 'quick-reference'); await expect(page.locator('[data-reference-print]')).toBeEnabled(); await expect(page.locator('.final-reference-item')).toHaveCount(5);
  126 |       await visit(page, 'connect-viewpoints'); await expect(field(page, 'synthesis-output')).toHaveValue('Saved draft ✓');
  127 |       await page.unroute(pattern); await visit(page, 'welcome'); await page.locator('#view-0 [data-content-retry]').last().click();
  128 |       await expect(own(page, 'welcome-cards').locator('.dsl-card')).toHaveCount(3); expect((await calls(page)).writes).toBe(0);
  129 |     }
  130 |     await own(page, 'welcome-cards').locator('.dsl-card').first().click(); expect((await calls(page)).writes).toBe(1);
  131 |   });
  132 | 
  133 |   test(`${mount} failed reference body does not disable ordinary credit; retry and Print never save`, async ({page}) => {
  134 |     const pattern = `**${mount}content/final/reference/synthesis-framework.md`;
  135 |     await page.route(pattern, route => route.fulfill({status: 503, body: ''})); await load(page);
  136 |     await expect(page.locator('[data-reference-status]')).toContainText('could not load');
  137 |     await cards(page, 'welcome-cards'); expect((await state(page)).completedSections).toEqual(['welcome']); const before = await raw(page);
  138 |     await visit(page, 'quick-reference'); await expect(page.locator('[data-reference-print]')).toBeDisabled();
  139 |     await page.unroute(pattern); await page.locator('[data-reference-retry]').click();
  140 |     await expect(page.locator('[data-reference-print]')).toBeEnabled(); await page.locator('[data-reference-print]').click();
  141 |     expect((await calls(page)).prints).toBe(1); expect(await raw(page)).toBe(before);
  142 |   });
  143 | 
  144 |   for (const failure of ['corrupt', 'denied', 'quota']) test(`${mount} public ${failure} storage preserves session unlock, exact bytes and separate warning`, async ({page}) => {
  145 |     const record = failure === 'corrupt' ? '{invalid JSON' : null;
  146 |     await seed(page, record);
  147 |     await page.addInitScript(({key, failure}) => {
  148 |       const get = Storage.prototype.getItem, set = Storage.prototype.setItem;
  149 |       Storage.prototype.getItem = function(name) { if (name === key && failure === 'denied') throw new DOMException('Synthetic denial', 'SecurityError'); return get.call(this, name); };
  150 |       Storage.prototype.setItem = function(name, value) {
  151 |         if (name === key && failure === 'quota') { window.boundaryCalls.writes++; throw new DOMException('Synthetic quota', 'QuotaExceededError'); }
  152 |         return set.call(this, name, value);
  153 |       };
  154 |     }, {key, failure});
  155 |     await page.goto(`${mount}final.html`); await ready(page); expect((await calls(page)).writes).toBe(0);
  156 |     await cards(page, 'welcome-cards'); await expect(page.locator('#next-section')).toBeEnabled();
  157 |     await expect(page.locator('#storage-warning')).toContainText(/session|saved/); await expect(page.locator('#storage-warning')).toHaveAttribute('role', 'status');
  158 |     await expect(page.locator('#lesson-status')).toBeHidden(); expect(await raw(page)).toBe(record);
  159 |     expect((await calls(page)).writes).toBe(failure === 'quota' ? 3 : 0);
  160 |     await visit(page, 'quick-reference'); await expect(page.locator('[data-reference-print]')).toBeEnabled();
  161 |   });
  162 | }
  163 | 
```