# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: middle-questions.spec.mjs >> /discussion-skills-lab/ Middle public reordered checklist saves fixed index 4, preserves extensions and replays in the original engine
- Location: tests/browser/middle-questions.spec.mjs:133:3

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: locator.click: Test timeout of 120000ms exceeded.
Call log:
  - waiting for locator('[data-go="evidence"]')
    - locator resolved to <button disabled type="button" class="rail-link" data-go="evidence">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 100ms
    227 × waiting for element to be visible, enabled and stable
        - element is not enabled
      - retrying click action
        - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - link "Skip to main content" [ref=e4] [cursor=pointer]:
    - /url: "#lesson-main"
  - banner [ref=e5]:
    - generic [ref=e6]:
      - generic [ref=e7]:
        - generic [ref=e8]: DISCUSSION SKILLS LAB · MSHSL SPEECH
        - generic [ref=e9]: Making an Impact · The Middle Stage
      - generic [ref=e10]: SELF-PACED · 20–25 MINUTES
  - generic [ref=e11]:
    - navigation "Lesson sections" [ref=e12]:
      - button "Collapse navigation" [expanded] [ref=e13] [cursor=pointer]: ⇤
      - generic [ref=e14]:
        - generic [ref=e15]: YOUR PROGRESS
        - generic [ref=e16]: 1 of 8 pages completed
        - progressbar "Completed lesson pages" [ref=e17]
        - paragraph [ref=e19]: Finish each activity to unlock the next page. Quick reference is always available.
      - generic [ref=e20]:
        - button "Welcome" [ref=e21] [cursor=pointer]
        - button "01 · Structure to substance" [disabled] [ref=e22]:
          - text: 01 · Structure to substance
          - generic [ref=e23]: 🔒
        - button "02 · Make contributions count" [disabled] [ref=e24]:
          - text: 02 · Make contributions count
          - generic [ref=e25]: 🔒
        - button "03 · Support the group" [ref=e26] [cursor=pointer]:
          - text: 03 · Support the group
          - generic [ref=e27]: ✓
        - button "04 · Communicate professionally" [ref=e28] [cursor=pointer]
        - button "05 · Navigate the conversation" [disabled] [ref=e29]:
          - text: 05 · Navigate the conversation
          - generic [ref=e30]: 🔒
        - button "06 · Put it together" [disabled] [ref=e31]:
          - text: 06 · Put it together
          - generic [ref=e32]: 🔒
        - button "07 · Knowledge check" [disabled] [ref=e33]:
          - text: 07 · Knowledge check
          - generic [ref=e34]: 🔒
        - button "↗ · Quick reference" [ref=e35] [cursor=pointer]
    - main [ref=e36]:
      - status [ref=e37]: Complete the activities on this page to unlock Next.
      - region "Making an Impact" [ref=e39]:
        - heading "Making an Impact" [active] [level=1] [ref=e40]
        - paragraph [ref=e44]: The middle stage is where your research, listening, and collaboration turn into solutions.
        - generic [ref=e45]:
          - paragraph [ref=e49]:
            - text: In the opening stage, your group figures out
            - strong [ref=e50]: WHAT
            - text: it needs to solve and
            - strong [ref=e51]: HOW
            - text: it will approach the task. In the middle stage, you put that plan into action. Contribute ideas that help the group make progress.
          - generic [ref=e54]:
            - paragraph [ref=e55]: OPENING
            - paragraph [ref=e56]: →
            - paragraph [ref=e57]: RESEARCH
            - paragraph [ref=e58]: →
            - paragraph [ref=e59]: MIDDLE
            - paragraph [ref=e60]: →
            - paragraph [ref=e61]: FINAL
        - paragraph [ref=e65]: Flip over each card to see what happens mid-round.
        - generic [ref=e68]:
          - button "Bring evidence — Flip card" [ref=e69] [cursor=pointer]:
            - generic [ref=e71]:
              - generic [ref=e74]: Bring evidence
              - generic [ref=e75]: ↻ Flip card
          - button "Build collaboration — Flip card" [ref=e76] [cursor=pointer]:
            - generic [ref=e78]:
              - generic [ref=e81]: Build collaboration
              - generic [ref=e82]: ↻ Flip card
          - button "Manage the floor — Flip card" [ref=e83] [cursor=pointer]:
            - generic [ref=e85]:
              - generic [ref=e88]: Manage the floor
              - generic [ref=e89]: ↻ Flip card
      - generic [ref=e90]:
        - button "← Back" [disabled] [ref=e91]
        - button "Next section →" [disabled] [ref=e92]
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
> 19  |   else await page.locator(`[data-go="${id}"]`).click();
      |                                                ^ Error: locator.click: Test timeout of 120000ms exceeded.
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
  72  |       // Section credit permits navigation but does not fabricate the separate
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
```