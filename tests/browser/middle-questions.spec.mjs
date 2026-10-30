// MIT tests; original instructional content © Rhys Jones, CC BY 4.0.
// Public-entry replacement for the temporary partial Middle question site.
import {test, expect} from '@playwright/test';
import {readFileSync, readdirSync} from 'node:fs';
import {middleAdapter} from '../../lessons/middle/progress-adapter.js';

const key = middleAdapter.key;
const ids = ['classification', 'group-decisions', 'communication-diagnosis', 'speaking-simulator', 'knowledge-check'];
const sections = ['structure-substance', 'support-group', 'communication', 'speaking-conflicts', 'knowledge-check'];
const data = Object.fromEntries(ids.map(id => [id, JSON.parse(readFileSync(new URL(`../../content/middle/activities/${id}.json`, import.meta.url))).data]));
const manifest = JSON.parse(readFileSync(new URL('../../content/middle/lesson.json', import.meta.url)));
const activity = (page, id) => page.locator(`[data-activity-id="${id}"]`);
const raw = page => page.evaluate(key => localStorage.getItem(key), key);
const state = async page => middleAdapter.decode(JSON.parse(await raw(page)));
const writes = page => page.evaluate(() => window.middleWrites);
const ready = async page => { await expect(page.locator('#lesson-status')).toHaveCount(1); await expect(page.locator('#lesson-status')).toBeHidden(); };
const visit = async (page, id) => {
  if (await page.locator('#section-select').isVisible()) await page.locator('#section-select').selectOption(id);
  else await page.locator(`[data-go="${id}"]`).click();
  await expect(page.locator(`[data-section-id="${id}"]`)).toBeVisible();
};
async function explore(page, id) {
  for (const button of await activity(page, id).locator('.dsl-card,summary').all()) {
    await button.click();
    await expect(button.locator('.dsl-card-explored,.dsl-panel-explored').filter({visible: true}).first()).toBeVisible();
  }
}
const fixtures = readdirSync(new URL('../fixtures/progress/middle/', import.meta.url)).map(file => ({file,
  ...JSON.parse(readFileSync(new URL(`../fixtures/progress/middle/${file}`, import.meta.url)))
})).filter(record => record.safety !== 'unsafe');
const errors = new WeakMap();

test.beforeEach(async ({page}) => {
  const messages = []; errors.set(page, messages); page.on('pageerror', error => messages.push(error.message));
  await page.addInitScript(key => {
    window.middleWrites = 0;
    const set = Storage.prototype.setItem;
    Storage.prototype.setItem = function(name, value) { if (name === key) window.middleWrites++; return set.call(this, name, value); };
  }, key);
});
test.afterEach(({page}) => expect(errors.get(page)).toEqual([]));

for (const mount of ['/', '/discussion-skills-lab/']) {
  async function load(page, record = JSON.stringify({completed: [0, 1, 2, 3, 4, 5, 6, 7], data: {}})) {
    await page.goto(mount);
    await page.evaluate(({key, record}) => record === null ? localStorage.removeItem(key) : localStorage.setItem(key, record), {key, record});
    await page.goto(`${mount}middle.html`); await ready(page);
  }

  test(`${mount} Middle public production requests are mount-relative; fresh hydration grants no credit and never saves`, async ({page}) => {
    const requested = [];
    page.on('request', request => {
      const path = new URL(request.url()).pathname;
      if (path.includes('/content/middle/activities/') && path.endsWith('.json')) requested.push(path);
    });
    await load(page, null);
    expect(requested.sort()).toEqual(manifest.activities.map(item => `${mount}content/middle/${item.source}`).sort());
    expect(await writes(page)).toBe(0); expect(await raw(page)).toBeNull();
    await expect(page.locator('#progress-text')).toHaveText('0 of 8 pages completed');
    await expect(page.locator('#next-section')).toBeDisabled();
    expect(await page.evaluate(() => typeof window.DSL)).toBe('undefined');
    await page.reload(); await ready(page); expect(await writes(page)).toBe(0); expect(await raw(page)).toBeNull();
  });

  test(`${mount} Middle public sequences preserve every option/feedback, earned history, wraparound and immediate cursors`, async ({page}) => {
    // Completed-section credit permits inspection, but supplies NO answer history.
    // Real fresh prerequisite gates are independently checked in middle-lesson.
    await load(page);
    expect(await writes(page)).toBe(0);
    for (const [index, id] of ids.slice(0, -1).entries()) {
      await visit(page, sections[index]);
      // Section credit permits navigation but does not fabricate the separate
      // exploration facts required by the real lesson's reveal policy.
      for (const prerequisite of [
        ['structure-cards'], ['collaboration-panels'], ['communication-panels'], ['strategy-panels', 'speaking-cards']
      ][index]) await explore(page, prerequisite);
      const host = activity(page, id), questions = data[id].questions;
      for (const question of questions) {
        await expect(host.locator('.dsl-question-prompt')).toHaveText(question.prompt);
        await expect(host.locator('.dsl-question-next')).toBeDisabled();
        for (const option of question.options) {
          const button = host.locator(`[data-option-id="${option.id}"]`);
          await button.focus(); await button.press('Enter'); await expect(button).toBeFocused();
          await expect(host.locator('.dsl-feedback')).toHaveText(option.feedback || `${option.id === question.correctOptionId ? 'Good choice.' : 'Not quite.'} ${question.explanation}`);
          await expect(host.locator('[aria-pressed="true"]')).toHaveCount(1);
          await expect(button).toHaveClass(new RegExp(option.id === question.correctOptionId ? 'dsl-selected-correct' : 'dsl-selected-incorrect'));
        }
        await expect(host.locator('.dsl-question-next')).toBeEnabled(); await host.locator('.dsl-question-next').click();
      }
      await expect(host.locator('.dsl-question-prompt')).toHaveText(questions[0].prompt);
      await host.locator('.dsl-question-next').click();
      await page.reload(); await ready(page); await visit(page, sections[index]);
      const own = (await state(page)).activities[id];
      expect(own.currentQuestionId).toBe(questions[1].id);
      expect(own.earnedQuestionIds).toEqual(questions.map(question => question.id));
      await expect(host.locator(`[data-option-id="${questions[1].options.at(-1).id}"]`)).toHaveAttribute('aria-pressed', 'true');
    }
  });

  test(`${mount} Middle public quiz direct jumps/zero option/score/review-first survive wrong-after-credit and reload`, async ({page}) => {
    await load(page); await visit(page, 'knowledge-check');
    const host = activity(page, 'knowledge-check'), questions = data['knowledge-check'].questions;
    for (const question of questions) {
      await host.locator(`[data-question-jump="${question.id}"]`).click();
      await host.locator(`[data-option-id="${question.correctOptionId}"]`).click();
    }
    await expect(host.locator('.dsl-question-score')).toHaveText('Score: 5/5 · 100%');
    await host.locator('.dsl-question-next').click();
    await expect(host.locator('.dsl-question-prompt')).toHaveText(questions[0].prompt);
    await host.locator(`[data-option-id="${questions[0].options[0].id}"]`).click();
    const feedback = `Previously completed correctly. ${questions[0].explanation} You may explore other answers without losing credit.`;
    await expect(host.locator('.dsl-feedback')).toHaveText(feedback);
    await host.locator(`[data-question-jump="${questions[3].id}"]`).click();
    await page.reload(); await ready(page); await visit(page, 'knowledge-check');
    expect((await state(page)).activities['knowledge-check'].currentQuestionId).toBe(questions[3].id);
    await host.locator(`[data-question-jump="${questions[0].id}"]`).click();
    await expect(host.locator(`[data-option-id="${questions[0].options[0].id}"]`)).toHaveClass(/dsl-selected-incorrect/);
    await expect(host.locator('.dsl-feedback')).toHaveText(feedback);
    await expect(host.locator('.dsl-question-score')).toHaveText('Score: 5/5 · 100%');
  });

  test(`${mount} Middle public reordered model cards/options retain fixed global index 6 and quiz index zero bindings`, async ({page}) => {
    await load(page); await visit(page, 'evidence'); await explore(page, 'evidence-panels');
    const models = activity(page, 'research-model-cards');
    await models.evaluate(host => host.prepend(host.lastElementChild));
    const stronger = models.locator('[data-card-id="stronger-example"]'); await stronger.focus(); await stronger.press('Enter');
    await expect(stronger.locator('.dsl-card-back .dsl-card-title')).toHaveText('WHY IT IS STRONGER');
    const description = `${await stronger.locator('.dsl-card-back .dsl-card-title').textContent()} ${await stronger.locator('.dsl-card-back .dsl-card-copy').textContent()}`.replace(/\s+/g, ' ').trim(); await expect(stronger).toHaveAccessibleDescription(description);
    await visit(page, 'knowledge-check'); const quiz = activity(page, 'knowledge-check');
    await quiz.locator('.dsl-choices').evaluate(host => host.prepend(host.lastElementChild));
    await quiz.locator('[data-option-id="combine-proposals"]').click(); await quiz.locator('.dsl-question-next').click();
    const saved = JSON.parse(await raw(page)); expect(saved.data.middleState.sets.flipped.models).toEqual([6]);
    expect(saved.data.middleState.selections['quiz-0']).toBe(2); expect(saved.data.middleState.quizIndex).toBe(1);
    await page.reload(); await ready(page); await visit(page, 'evidence');
    await expect(stronger.locator('.dsl-card-front > .dsl-card-explored')).toBeVisible();
    await expect(models.locator('[data-card-id="weak-example"] .dsl-card-front > .dsl-card-explored')).toBeHidden();
    expect((await state(page)).activities['knowledge-check'].currentQuestionId).toBe('useful-research'); expect(await writes(page)).toBe(0);
  });

  test(`${mount} Middle public safe v1 fixtures silently hydrate all current questions and reordered checklist bindings`, async ({page}) => {
    for (const record of fixtures) {
      await load(page, record.raw);
      expect(await raw(page), record.file).toBe(record.raw); expect(await writes(page), record.file).toBe(0);
      const expected = middleAdapter.decode(record.raw === null ? null : JSON.parse(record.raw));
      await page.locator('#views').evaluate(container => [...container.children].reverse().forEach(node => container.append(node)));
      for (const id of ids) {
        const own = expected.activities[id], current = data[id].questions.find(question => question.id === own.currentQuestionId);
        await expect(activity(page, id).locator('.dsl-question-prompt')).toHaveText(current.prompt);
        const selected = own.selections[current.id];
        await expect(activity(page, id).locator('[aria-pressed="true"]')).toHaveCount(selected ? 1 : 0);
        if (selected) await expect(activity(page, id).locator(`[data-option-id="${selected}"]`)).toHaveAttribute('aria-pressed', 'true');
      }
      for (const id of ['research-checklist', 'application-checklist']) {
        await activity(page, id).evaluate(host => [...host.children].reverse().forEach(node => host.append(node)));
        for (const check of await activity(page, id).locator('[data-check-id]').all()) {
          await expect(check).toHaveJSProperty('checked', expected.activities[id].checkedIds.includes(await check.getAttribute('data-check-id')));
        }
      }
    }
  });

  test(`${mount} Middle public reordered checklist saves fixed index 4, preserves extensions and replays in the original engine`, async ({page}) => {
    // Evidence is index 2: sparse credit for that section makes the real public
    // page accessible without fabricating answers or bypassing navigation.
    const record = JSON.stringify({completed: [2], data: {marker: 'keep', middleState: {selections: {'classify-options': 0, future: 'keep'}}, dslUi: {schemaVersion: 1, models: {'research-model': true}, future: 'keep'}}});
    await load(page, record); await visit(page, 'evidence');
    await explore(page, 'evidence-panels'); await explore(page, 'research-model-cards');
    await activity(page, 'research-checklist').evaluate(host => [...host.children].reverse().forEach(node => host.append(node)));
    const beforeWrites = await writes(page);
    const check = activity(page, 'research-checklist').locator('[data-check-id="source-date"]');
    await check.focus(); await check.press('Space'); await expect(check).toBeChecked(); expect(await writes(page)).toBe(beforeWrites + 1);
    const saved = JSON.parse(await raw(page));
    expect(saved.data.middleState.fields['4']).toBe(true); expect(saved.data.middleState.fields['7']).toBeUndefined();
    expect(saved.data.middleState.selections).toEqual({'classify-options': 0, future: 'keep'});
    expect(saved.data.dslUi).toEqual(JSON.parse(record).data.dslUi); expect(saved.completed).toEqual([2]); expect(saved.data.marker).toBe('keep');
    await page.goto(`/__original${mount}middle.html`);
    await expect(page.locator('#research-check-0')).toBeChecked(); await expect(page.locator('#research-check-3')).not.toBeChecked();
    expect(JSON.parse(await raw(page)).completed).toContain(2);
  });
}
