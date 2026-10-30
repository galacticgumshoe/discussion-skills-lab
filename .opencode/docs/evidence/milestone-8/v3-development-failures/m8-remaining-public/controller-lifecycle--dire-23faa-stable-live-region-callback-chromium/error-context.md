# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: controller-lifecycle.spec.mjs >> / direct question/checklist updates and repeated remounts are silent; old nodes inert, one stable live region/callback
- Location: tests/browser/controller-lifecycle.spec.mjs:9:3

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator: locator('#question-probe [role="status"]')
Expected: "polite"
Error: strict mode violation: locator('#question-probe [role="status"]') resolved to 2 elements:
    1) <p role="status" aria-live="polite" aria-atomic="true" class="dsl-feedback">Good choice. Test explanation</p> aka getByText('Good choice. Test explanation')
    2) <p role="status" class="dsl-question-comparison"></p> aka getByRole('status').filter({ hasText: /^$/ })

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for locator('#question-probe [role="status"]')

```

# Page snapshot

```yaml
- main [ref=e2]:
  - generic [ref=e3]:
    - paragraph [ref=e4]: Question 1 of 1
    - article [ref=e6]:
      - heading "Test prompt" [level=3] [ref=e7]
      - group "Test prompt" [ref=e8]:
        - button "Test option A" [ref=e9] [cursor=pointer]
        - button "Test option B" [active] [pressed] [ref=e10] [cursor=pointer]
      - status [ref=e11]: Good choice. Test explanation
      - paragraph
    - button "Review first →" [ref=e13] [cursor=pointer]
    - paragraph [ref=e14]: 1/1 correct
    - generic "Question navigation"
    - status
  - generic [ref=e16] [cursor=pointer]:
    - checkbox "Test checklist label" [ref=e17]
    - generic [ref=e18]: Test checklist label
```

# Test source

```ts
  1  | // MIT. Direct public component APIs on noninstructional test data. No store,
  2  | // legacy-key writer, lesson simulation, copied controller or migration app.
  3  | import {test, expect} from '@playwright/test';
  4  | const errors = new WeakMap();
  5  | test.beforeEach(({page}) => { const messages = []; errors.set(page, messages); page.on('pageerror', error => messages.push(error.message)); });
  6  | test.afterEach(({page}) => expect(errors.get(page)).toEqual([]));
  7  | 
  8  | for (const mount of ['/', '/discussion-skills-lab/']) {
  9  |   test(`${mount} direct question/checklist updates and repeated remounts are silent; old nodes inert, one stable live region/callback`, async ({page}) => {
  10 |     await page.goto(`${mount}__fixtures/new-module/index.html`);
  11 |     await expect(page.locator('#lesson-status')).toBeHidden();
  12 |     await page.evaluate(async mount => {
  13 |       window.fixtureApp.destroy();
  14 |       const root = new URL(mount, location.origin);
  15 |       const {mountQuestionSequence} = await import(new URL('assets/js/components/question-sequence.js', root));
  16 |       const {mountChecklist} = await import(new URL('assets/js/components/checklist.js', root));
  17 |       const main = document.createElement('main'); document.body.replaceChildren(main);
  18 |       const question = document.createElement('div'), checklist = document.createElement('div');
  19 |       question.id = 'question-probe'; checklist.id = 'checklist-probe'; main.append(question, checklist);
  20 |       let events = 0, q, c;
  21 |       const qData = {questions: [{id: 'test-question', prompt: 'Test prompt', correctOptionId: 'b', explanation: 'Test explanation', options: [{id: 'a', text: 'Test option A'}, {id: 'b', text: 'Test option B'}]}]};
  22 |       const cData = {items: [{id: 'test-check', text: 'Test checklist label'}]};
  23 |       let qState = {selections: {}, earnedQuestionIds: [], currentQuestionId: 'test-question'}, cState = {checkedIds: []};
  24 |       const mountControllers = () => {
  25 |         q = mountQuestionSequence(question, {data: qData, profile: 'middle-scenarios', state: qState, onChange(next) { events++; qState = next; }});
  26 |         c = mountChecklist(checklist, {data: cData, state: cState, onChange(next) { events++; cState = next; }});
  27 |       };
  28 |       mountControllers();
  29 |       window.controllerProbe = {
  30 |         get events() { return events; },
  31 |         update() { q.update(qState); c.update(cState); },
  32 |         remount() { q.destroy(); c.destroy(); mountControllers(); },
  33 |         duplicate() { try { mountChecklist(checklist, {data: cData, state: cState}); } catch (error) { return error.message; } }
  34 |       };
  35 |     }, mount);
  36 |     const option = page.locator('#question-probe [data-option-id="b"]'), check = page.locator('#checklist-probe input');
  37 |     await page.evaluate(() => {
  38 |       window.feedbackNode = document.querySelector('#question-probe [role="status"]');
  39 |       window.optionNode = document.querySelector('#question-probe [data-option-id="b"]');
  40 |       for (let n = 0; n < 3; n++) window.controllerProbe.update();
  41 |     });
  42 |     expect(await page.evaluate(() => window.controllerProbe.events)).toBe(0);
  43 |     await option.focus(); await option.press('Enter'); await expect(option).toBeFocused();
  44 |     await option.press('Space'); await expect(option).toBeFocused();
> 45 |     await expect(page.locator('#question-probe [role="status"]')).toHaveAttribute('aria-live', 'polite');
     |                                                                   ^ Error: expect(locator).toHaveAttribute(expected) failed
  46 |     await expect(page.locator('#question-probe [role="status"]')).toHaveAttribute('aria-atomic', 'true');
  47 |     expect(await page.evaluate(() => window.feedbackNode === document.querySelector('#question-probe [role="status"]') && window.optionNode === document.querySelector('#question-probe [data-option-id="b"]'))).toBe(true);
  48 |     expect(await page.evaluate(() => window.controllerProbe.events)).toBe(2);
  49 |     await page.evaluate(() => {
  50 |       const old = [...document.querySelectorAll('button,input')];
  51 |       window.controllerProbe.remount(); window.controllerProbe.remount(); window.controllerProbe.update();
  52 |       for (const node of old) { node.click(); node.dispatchEvent(new Event('change')); }
  53 |     });
  54 |     expect(await page.evaluate(() => window.controllerProbe.events)).toBe(2);
  55 |     await check.focus(); await check.press('Space'); await expect(check).toBeChecked(); await expect(check).toBeFocused();
  56 |     expect(await page.evaluate(() => window.controllerProbe.events)).toBe(3);
  57 |     expect(await page.evaluate(() => window.controllerProbe.duplicate())).toContain('already mounted');
  58 |     await expect(page.locator('#question-probe [data-question-id]')).toHaveCount(1);
  59 |     await expect(page.locator('#question-probe [role="status"]')).toHaveCount(1);
  60 |   });
  61 | }
  62 | 
```