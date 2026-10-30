# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: middle-questions.spec.mjs >> /discussion-skills-lab/ Middle public sequences preserve every option/feedback, earned history, wraparound and immediate cursors
- Location: tests/browser/middle-questions.spec.mjs:59:3

# Error details

```
Error: expect(locator).toBeFocused() failed

Locator:  locator('[data-activity-id="classification"]').locator('[data-option-id="procedural"]')
Expected: focused
Received: inactive
Timeout:  10000ms

Call log:
  - Expect "toBeFocused" with timeout 10000ms
  - waiting for locator('[data-activity-id="classification"]').locator('[data-option-id="procedural"]')
    24 × locator resolved to <button type="button" class="dsl-choice" aria-pressed="false" data-option-id="procedural">Procedural</button>
       - unexpected value "inactive"

```

```yaml
- link "Skip to main content":
  - /url: "#lesson-main"
- banner: DISCUSSION SKILLS LAB · MSHSL SPEECH Making an Impact · The Middle Stage SELF-PACED · 20–25 MINUTES
- navigation "Lesson sections":
  - button "Collapse navigation" [expanded]: ⇤
  - text: YOUR PROGRESS 8 of 8 pages completed
  - progressbar "Completed lesson pages"
  - paragraph: Finish each activity to unlock the next page. Quick reference is always available.
  - button "Welcome"
  - button "01 · Structure to substance"
  - button "02 · Make contributions count"
  - button "03 · Support the group"
  - button "04 · Communicate professionally"
  - button "05 · Navigate the conversation"
  - button "06 · Put it together"
  - button "07 · Knowledge check"
  - button "↗ · Quick reference"
- main:
  - status: Section complete. You can continue.
  - region "Two Ways to Help a Discussion":
    - paragraph: 01 / 07 · About 3 minutes
    - heading "Two Ways to Help a Discussion" [level=2]
    - paragraph: Procedural contributions support the discussion. Substantive contributions move the solution forward. The middle stage calls for both, especially relevant research and insight.
    - 'button "PROCEDURAL: Organize, structure, or focus the group''s work without directly developing the solution. — Flip card"':
      - strong: PROCEDURAL
      - text: Organize, structure, or focus the group's work without directly developing the solution.
    - 'button "SUBSTANTIVE: Introduce ideas, evidence, analysis, or insights that help solve the task. — Flip card"':
      - strong: SUBSTANTIVE
      - text: Introduce ideas, evidence, analysis, or insights that help solve the task.
    - paragraph: Flip both cards to reveal the activity.
  - button "← Back"
  - button "Next section →"
```

# Test source

```ts
  1   | // MIT tests; original instructional content © Rhys Jones, CC BY 4.0.
  2   | // Public-entry replacement for the temporary partial Middle question site.
  3   | import {test, expect} from '@playwright/test';
  4   | import {readFileSync, readdirSync} from 'node:fs';
  5   | import {middleAdapter} from '../../lessons/middle/progress-adapter.js';
  6   | 
  7   | const key = middleAdapter.key;
  8   | const ids = ['classification', 'group-decisions', 'communication-diagnosis', 'speaking-simulator', 'knowledge-check'];
  9   | const sections = ['structure-substance', 'support-group', 'communication', 'speaking-conflicts', 'knowledge-check'];
  10  | const data = Object.fromEntries(ids.map(id => [id, JSON.parse(readFileSync(new URL(`../../content/middle/activities/${id}.json`, import.meta.url))).data]));
  11  | const manifest = JSON.parse(readFileSync(new URL('../../content/middle/lesson.json', import.meta.url)));
  12  | const activity = (page, id) => page.locator(`[data-activity-id="${id}"]`);
  13  | const raw = page => page.evaluate(key => localStorage.getItem(key), key);
  14  | const state = async page => middleAdapter.decode(JSON.parse(await raw(page)));
  15  | const writes = page => page.evaluate(() => window.middleWrites);
  16  | const ready = async page => { await expect(page.locator('#lesson-status')).toHaveCount(1); await expect(page.locator('#lesson-status')).toBeHidden(); };
  17  | const visit = async (page, id) => {
  18  |   if (await page.locator('#section-select').isVisible()) await page.locator('#section-select').selectOption(id);
  19  |   else await page.locator(`[data-go="${id}"]`).click();
  20  |   await expect(page.locator(`[data-section-id="${id}"]`)).toBeVisible();
  21  | };
  22  | async function explore(page, id) {
  23  |   for (const button of await activity(page, id).locator('.dsl-card,summary').all()) {
  24  |     await button.click();
  25  |     await expect(button.locator('.dsl-card-explored,.dsl-panel-explored').filter({visible: true}).first()).toBeVisible();
  26  |   }
  27  | }
  28  | const fixtures = readdirSync(new URL('../fixtures/progress/middle/', import.meta.url)).map(file => ({file,
  29  |   ...JSON.parse(readFileSync(new URL(`../fixtures/progress/middle/${file}`, import.meta.url)))
  30  | })).filter(record => record.safety !== 'unsafe');
  31  | const errors = new WeakMap();
  32  | 
  33  | test.beforeEach(async ({page}) => {
  34  |   const messages = []; errors.set(page, messages); page.on('pageerror', error => messages.push(error.message));
  35  |   await page.addInitScript(key => {
  36  |     window.middleWrites = 0;
  37  |     const set = Storage.prototype.setItem;
  38  |     Storage.prototype.setItem = function(name, value) { if (name === key) window.middleWrites++; return set.call(this, name, value); };
  39  |   }, key);
  40  | });
  41  | test.afterEach(({page}) => expect(errors.get(page)).toEqual([]));
  42  | 
  43  | for (const mount of ['/', '/discussion-skills-lab/']) {
  44  |   async function load(page, record = JSON.stringify({completed: [0, 1, 2, 3, 4, 5, 6, 7], data: {}})) {
  45  |     await page.goto(mount);
  46  |     await page.evaluate(({key, record}) => record === null ? localStorage.removeItem(key) : localStorage.setItem(key, record), {key, record});
  47  |     await page.goto(`${mount}middle.html`); await ready(page);
  48  |   }
  49  | 
  50  |   test(`${mount} Middle public production requests are mount-relative; fresh hydration grants no credit and never saves`, async ({page}) => {
  51  |     const requested = [];
  52  |     page.on('request', request => {
  53  |       const path = new URL(request.url()).pathname;
  54  |       if (path.includes('/content/middle/activities/') && path.endsWith('.json')) requested.push(path);
  55  |     });
  56  |     await load(page, null);
  57  |     expect(requested.sort()).toEqual(manifest.activities.map(item => `${mount}content/middle/${item.source}`).sort());
  58  |     expect(await writes(page)).toBe(0); expect(await raw(page)).toBeNull();
  59  |     await expect(page.locator('#progress-text')).toHaveText('0 of 8 pages completed');
  60  |     await expect(page.locator('#next-section')).toBeDisabled();
  61  |     expect(await page.evaluate(() => typeof window.DSL)).toBe('undefined');
  62  |     await page.reload(); await ready(page); expect(await writes(page)).toBe(0); expect(await raw(page)).toBeNull();
  63  |   });
  64  | 
  65  |   test(`${mount} Middle public sequences preserve every option/feedback, earned history, wraparound and immediate cursors`, async ({page}) => {
  66  |     // Completed-section credit permits inspection, but supplies NO answer history.
  67  |     // Real fresh prerequisite gates are independently checked in middle-lesson.
  68  |     await load(page);
  69  |     expect(await writes(page)).toBe(0);
  70  |     for (const [index, id] of ids.slice(0, -1).entries()) {
  71  |       await visit(page, sections[index]);
> 72  |       // Section credit permits navigation but does not fabricate the separate
      |                                                                                   ^ Error: expect(locator).toBeFocused() failed
  73  |       // exploration facts required by the real lesson's reveal policy.
  74  |       for (const prerequisite of [
  75  |         ['structure-cards'], ['collaboration-panels'], ['communication-panels'], ['strategy-panels', 'speaking-cards']
  76  |       ][index]) await explore(page, prerequisite);
  77  |       const host = activity(page, id), questions = data[id].questions;
  78  |       for (const question of questions) {
  79  |         await expect(host.locator('.dsl-question-prompt')).toHaveText(question.prompt);
  80  |         await expect(host.locator('.dsl-question-next')).toBeDisabled();
  81  |         for (const option of question.options) {
  82  |           const button = host.locator(`[data-option-id="${option.id}"]`);
  83  |           await button.focus(); await button.press('Enter'); await expect(button).toBeFocused();
  84  |           await expect(host.locator('.dsl-feedback')).toHaveText(option.feedback || `${option.id === question.correctOptionId ? 'Good choice.' : 'Not quite.'} ${question.explanation}`);
  85  |           await expect(host.locator('[aria-pressed="true"]')).toHaveCount(1);
  86  |           await expect(button).toHaveClass(new RegExp(option.id === question.correctOptionId ? 'dsl-selected-correct' : 'dsl-selected-incorrect'));
  87  |         }
  88  |         await expect(host.locator('.dsl-question-next')).toBeEnabled(); await host.locator('.dsl-question-next').click();
  89  |       }
  90  |       await expect(host.locator('.dsl-question-prompt')).toHaveText(questions[0].prompt);
  91  |       await host.locator('.dsl-question-next').click();
  92  |       await page.reload(); await ready(page); await visit(page, sections[index]);
  93  |       const own = (await state(page)).activities[id];
  94  |       expect(own.currentQuestionId).toBe(questions[1].id);
  95  |       expect(own.earnedQuestionIds).toEqual(questions.map(question => question.id));
  96  |       await expect(host.locator(`[data-option-id="${questions[1].options.at(-1).id}"]`)).toHaveAttribute('aria-pressed', 'true');
  97  |     }
  98  |   });
  99  | 
  100 |   test(`${mount} Middle public quiz direct jumps/zero option/score/review-first survive wrong-after-credit and reload`, async ({page}) => {
  101 |     await load(page); await visit(page, 'knowledge-check');
  102 |     const host = activity(page, 'knowledge-check'), questions = data['knowledge-check'].questions;
  103 |     for (const question of questions) {
  104 |       await host.locator(`[data-question-jump="${question.id}"]`).click();
  105 |       await host.locator(`[data-option-id="${question.correctOptionId}"]`).click();
  106 |     }
  107 |     await expect(host.locator('.dsl-question-score')).toHaveText('Score: 5/5 · 100%');
  108 |     await host.locator('.dsl-question-next').click();
  109 |     await expect(host.locator('.dsl-question-prompt')).toHaveText(questions[0].prompt);
  110 |     await host.locator(`[data-option-id="${questions[0].options[0].id}"]`).click();
  111 |     const feedback = `Previously completed correctly. ${questions[0].explanation} You may explore other answers without losing credit.`;
  112 |     await expect(host.locator('.dsl-feedback')).toHaveText(feedback);
  113 |     await host.locator(`[data-question-jump="${questions[3].id}"]`).click();
  114 |     await page.reload(); await ready(page); await visit(page, 'knowledge-check');
  115 |     expect((await state(page)).activities['knowledge-check'].currentQuestionId).toBe(questions[3].id);
  116 |     await host.locator(`[data-question-jump="${questions[0].id}"]`).click();
  117 |     await expect(host.locator(`[data-option-id="${questions[0].options[0].id}"]`)).toHaveClass(/dsl-selected-incorrect/);
  118 |     await expect(host.locator('.dsl-feedback')).toHaveText(feedback);
  119 |     await expect(host.locator('.dsl-question-score')).toHaveText('Score: 5/5 · 100%');
  120 |   });
  121 | 
  122 |   test(`${mount} Middle public safe v1 fixtures silently hydrate all current questions and reordered checklist bindings`, async ({page}) => {
  123 |     for (const record of fixtures) {
  124 |       await load(page, record.raw);
  125 |       expect(await raw(page), record.file).toBe(record.raw); expect(await writes(page), record.file).toBe(0);
  126 |       const expected = middleAdapter.decode(record.raw === null ? null : JSON.parse(record.raw));
  127 |       await page.locator('#views').evaluate(container => [...container.children].reverse().forEach(node => container.append(node)));
  128 |       for (const id of ids) {
  129 |         const own = expected.activities[id], current = data[id].questions.find(question => question.id === own.currentQuestionId);
  130 |         await expect(activity(page, id).locator('.dsl-question-prompt')).toHaveText(current.prompt);
  131 |         const selected = own.selections[current.id];
  132 |         await expect(activity(page, id).locator('[aria-pressed="true"]')).toHaveCount(selected ? 1 : 0);
  133 |         if (selected) await expect(activity(page, id).locator(`[data-option-id="${selected}"]`)).toHaveAttribute('aria-pressed', 'true');
  134 |       }
  135 |       for (const id of ['research-checklist', 'application-checklist']) {
  136 |         await activity(page, id).evaluate(host => [...host.children].reverse().forEach(node => host.append(node)));
  137 |         for (const check of await activity(page, id).locator('[data-check-id]').all()) {
  138 |           await expect(check).toHaveJSProperty('checked', expected.activities[id].checkedIds.includes(await check.getAttribute('data-check-id')));
  139 |         }
  140 |       }
  141 |     }
  142 |   });
  143 | 
  144 |   test(`${mount} Middle public reordered checklist saves fixed index 4, preserves extensions and replays in the original engine`, async ({page}) => {
  145 |     const record = JSON.stringify({completed: [3], data: {marker: 'keep', middleState: {selections: {'classify-options': 0, future: 'keep'}}, dslUi: {schemaVersion: 1, models: {'research-model': true}, future: 'keep'}}});
  146 |     await load(page, record); await visit(page, 'evidence');
  147 |     await explore(page, 'evidence-panels'); await explore(page, 'research-model-cards');
  148 |     await activity(page, 'research-checklist').evaluate(host => [...host.children].reverse().forEach(node => host.append(node)));
  149 |     const beforeWrites = await writes(page);
  150 |     const check = activity(page, 'research-checklist').locator('[data-check-id="source-date"]');
  151 |     await check.focus(); await check.press('Space'); await expect(check).toBeChecked(); expect(await writes(page)).toBe(beforeWrites + 1);
  152 |     const saved = JSON.parse(await raw(page));
  153 |     expect(saved.data.middleState.fields['4']).toBe(true); expect(saved.data.middleState.fields['7']).toBeUndefined();
  154 |     expect(saved.data.middleState.selections).toEqual({'classify-options': 0, future: 'keep'});
  155 |     expect(saved.data.dslUi).toEqual(JSON.parse(record).data.dslUi); expect(saved.completed).toEqual([3]);
  156 |     await page.goto(`/__original${mount}middle.html`);
  157 |     await expect(page.locator('#research-check-0')).toBeChecked(); await expect(page.locator('#research-check-3')).not.toBeChecked();
  158 |     expect(JSON.parse(await raw(page)).completed).toContain(3);
  159 |   });
  160 | }
  161 | 
```