// MIT. Direct public component APIs on noninstructional test data. No store,
// legacy-key writer, lesson simulation, copied controller or migration app.
import {test, expect} from '@playwright/test';
const errors = new WeakMap();
test.beforeEach(({page}) => { const messages = []; errors.set(page, messages); page.on('pageerror', error => messages.push(error.message)); });
test.afterEach(({page}) => expect(errors.get(page)).toEqual([]));

for (const mount of ['/', '/discussion-skills-lab/']) {
  test(`${mount} direct question/checklist updates and repeated remounts are silent; old nodes inert, one stable live region/callback`, async ({page}) => {
    await page.goto(`${mount}__fixtures/new-module/index.html`);
    await expect(page.locator('#lesson-status')).toBeHidden();
    await page.evaluate(async mount => {
      window.fixtureApp.destroy();
      const root = new URL(mount, location.origin);
      const {mountQuestionSequence} = await import(new URL('assets/js/components/question-sequence.js', root));
      const {mountChecklist} = await import(new URL('assets/js/components/checklist.js', root));
      const main = document.createElement('main'); document.body.replaceChildren(main);
      const question = document.createElement('div'), checklist = document.createElement('div');
      question.id = 'question-probe'; checklist.id = 'checklist-probe'; main.append(question, checklist);
      let events = 0, q, c;
      const qData = {questions: [{id: 'test-question', prompt: 'Test prompt', correctOptionId: 'b', explanation: 'Test explanation', options: [{id: 'a', text: 'Test option A'}, {id: 'b', text: 'Test option B'}]}]};
      const cData = {items: [{id: 'test-check', text: 'Test checklist label'}]};
      let qState = {selections: {}, earnedQuestionIds: [], currentQuestionId: 'test-question'}, cState = {checkedIds: []};
      const mountControllers = () => {
        q = mountQuestionSequence(question, {data: qData, profile: 'middle-scenarios', state: qState, onChange(next) { events++; qState = next; }});
        c = mountChecklist(checklist, {data: cData, state: cState, onChange(next) { events++; cState = next; }});
      };
      mountControllers();
      window.controllerProbe = {
        get events() { return events; },
        update() { q.update(qState); c.update(cState); },
        remount() { q.destroy(); c.destroy(); mountControllers(); },
        duplicate() { try { mountChecklist(checklist, {data: cData, state: cState}); } catch (error) { return error.message; } }
      };
    }, mount);
    const option = page.locator('#question-probe [data-option-id="b"]'), check = page.locator('#checklist-probe input');
    await page.evaluate(() => {
      window.feedbackNode = document.querySelector('#question-probe .dsl-feedback');
      window.optionNode = document.querySelector('#question-probe [data-option-id="b"]');
      for (let n = 0; n < 3; n++) window.controllerProbe.update();
    });
    expect(await page.evaluate(() => window.controllerProbe.events)).toBe(0);
    await option.focus(); await option.press('Enter'); await expect(option).toBeFocused();
    await option.press('Space'); await expect(option).toBeFocused();
    await expect(page.locator('#question-probe .dsl-feedback')).toHaveAttribute('aria-live', 'polite');
    await expect(page.locator('#question-probe .dsl-feedback')).toHaveAttribute('aria-atomic', 'true');
    expect(await page.evaluate(() => window.feedbackNode === document.querySelector('#question-probe .dsl-feedback') && window.optionNode === document.querySelector('#question-probe [data-option-id="b"]'))).toBe(true);
    expect(await page.evaluate(() => window.controllerProbe.events)).toBe(2);
    await page.evaluate(() => {
      const old = [...document.querySelectorAll('button,input')];
      window.controllerProbe.remount(); window.controllerProbe.remount(); window.controllerProbe.update();
      for (const node of old) { node.click(); node.dispatchEvent(new Event('change')); }
    });
    expect(await page.evaluate(() => window.controllerProbe.events)).toBe(2);
    await check.focus(); await check.press('Space'); await expect(check).toBeChecked(); await expect(check).toBeFocused();
    expect(await page.evaluate(() => window.controllerProbe.events)).toBe(3);
    expect(await page.evaluate(() => window.controllerProbe.duplicate())).toContain('already mounted');
    await expect(page.locator('#question-probe [data-question-id]')).toHaveCount(1);
    await expect(page.locator('#question-probe .dsl-feedback[role="status"]')).toHaveCount(1);
  });
}
