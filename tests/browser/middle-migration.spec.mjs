// MIT tests. Original instructional content © Rhys Jones, CC BY 4.0.
import { test, expect } from '@playwright/test';
import { readFileSync, readdirSync } from 'node:fs';
import { middleAdapter } from '../../lessons/middle/progress-adapter.js';

const key = 'dsl:middle:v1';
const ids = ['classification', 'group-decisions', 'communication-diagnosis', 'speaking-simulator', 'knowledge-check'];
const data = Object.fromEntries(ids.map(id => [id, JSON.parse(readFileSync(new URL(`../../content/middle/activities/${id}.json`, import.meta.url))).data]));
const activity = (page, id) => page.locator(`[data-activity-id="${id}"]`);
const state = page => page.evaluate(() => window.middleQuestions.store.state);
const counts = page => page.evaluate(() => ({ writes: window.middleWrites, events: window.middleQuestions.events }));
const fixtures = readdirSync(new URL('../fixtures/progress/middle/', import.meta.url)).map(file => ({ file,
  ...JSON.parse(readFileSync(new URL(`../fixtures/progress/middle/${file}`, import.meta.url))) })).filter(record => record.safety !== 'unsafe');

for (const prefix of ['', '/discussion-skills-lab']) {
  async function load(page, raw = null, reorder = false) {
    await page.goto(`${prefix}/`);
    await page.evaluate(({ key, raw }) => raw === null ? localStorage.removeItem(key) : localStorage.setItem(key, raw), { key, raw });
    await page.goto(`${prefix}/__fixtures/harness/middle-questions.html${reorder ? '?reorder' : ''}`);
    await expect(page.locator('html')).toHaveAttribute('data-ready', 'true');
    await expect(page.locator('#loading-status')).toBeHidden();
  }
  test.describe(`${prefix || 'root'}: Middle extracted questions`, () => {
    const errors = new WeakMap();
    test.beforeEach(async ({ page }) => {
      const messages = []; errors.set(page, messages); page.on('pageerror', error => messages.push(error.message));
      await page.addInitScript(() => {
        window.middleWrites = 0;
        const original = Storage.prototype.setItem;
        Storage.prototype.setItem = function(...args) { window.middleWrites++; return original.apply(this, args); };
      });
    });
    test.afterEach(({ page }) => expect(errors.get(page)).toEqual([]));

    test('validated production data mounts without credit or saves; repeated hydration/remount has one controller per activity', async ({ page }) => {
      const requested = [];
      page.on('request', request => { if (request.url().includes('/content/middle/activities/')) requested.push(new URL(request.url()).pathname); });
      await load(page);
      expect(requested).toHaveLength(7);
      expect(requested.every(path => path.startsWith(`${prefix}/content/middle/activities/`))).toBe(true);
      expect(await counts(page)).toEqual({ writes: 0, events: 0 });
      await page.evaluate(() => { window.middleQuestions.hydrate(); window.middleQuestions.remount(); window.middleQuestions.remount(); });
      expect(await counts(page)).toEqual({ writes: 0, events: 0 });
      expect((await state(page)).completedSections).toEqual([]);
      expect(await page.evaluate(() => typeof window.DSL)).toBe('undefined');
      for (const id of ids) {
        await expect(activity(page, id)).toHaveClass(/dsl-question-sequence/);
        await expect(activity(page, id).locator('.dsl-question-prompt')).toHaveCount(1);
      }
      const first = activity(page, 'classification').locator('[data-option-id="procedural"]');
      await first.focus(); await first.press('Enter');
      await expect(first).toBeFocused();
      expect(await counts(page)).toEqual({ writes: 1, events: 1 });
      await page.reload(); await expect(page.locator('html')).toHaveAttribute('data-ready', 'true');
      await expect(first).toHaveAttribute('aria-pressed', 'true');
      expect(await counts(page)).toEqual({ writes: 0, events: 0 });
    });

    test('all four sequences preserve every option/feedback, earned history, immediate cursors and wraparound', async ({ page }) => {
      await load(page, null, true);
      for (const id of ids.slice(0, -1)) {
        const host = activity(page, id), questions = data[id].questions;
        for (const question of questions) {
          await expect(host.locator('.dsl-question-prompt')).toHaveText(question.prompt);
          await expect(host.locator('.dsl-question-next')).toBeDisabled();
          for (const option of question.options) {
            const button = host.locator(`[data-option-id="${option.id}"]`);
            await button.focus(); await button.press('Enter');
            await expect(button).toBeFocused();
            await expect(host.locator('.dsl-feedback')).toHaveText(option.feedback || `${option.id === question.correctOptionId ? 'Good choice.' : 'Not quite.'} ${question.explanation}`);
            await expect(host.locator('[aria-pressed="true"]')).toHaveCount(1);
            await expect(button).toHaveClass(new RegExp(option.id === question.correctOptionId ? 'dsl-selected-correct' : 'dsl-selected-incorrect'));
          }
          await expect(host.locator('.dsl-question-next')).toBeEnabled();
          await host.locator('.dsl-question-next').click();
        }
        await expect(host.locator('.dsl-question-prompt')).toHaveText(questions[0].prompt);
        const next = host.locator('.dsl-question-next'); await next.click();
        // Reload directly after navigation: no unrelated click to persist it.
        await page.reload(); await expect(page.locator('html')).toHaveAttribute('data-ready', 'true');
        expect((await state(page)).activities[id].currentQuestionId).toBe(questions[1].id);
        const last = questions[1].options.at(-1);
        await expect(host.locator(`[data-option-id="${last.id}"]`)).toHaveAttribute('aria-pressed', 'true');
        expect((await state(page)).activities[id].earnedQuestionIds).toEqual(questions.map(question => question.id));
      }
      // Missing prerequisite cards/panels cannot be bypassed by question credit.
      expect((await state(page)).completedSections).toEqual([]);
    });

    test('quiz direct jumps save immediately, zero option survives wrong-after-credit, score and review-first persist', async ({ page }) => {
      await load(page);
      const host = activity(page, 'knowledge-check'), questions = data['knowledge-check'].questions;
      for (const question of questions) {
        await host.locator(`[data-question-jump="${question.id}"]`).click();
        await host.locator(`[data-option-id="${question.correctOptionId}"]`).click();
      }
      await expect(host.locator('.dsl-question-score')).toHaveText('Score: 5/5 · 100%');
      await host.locator('.dsl-question-next').click();
      await expect(host.locator('.dsl-question-prompt')).toHaveText(questions[0].prompt);
      await host.locator(`[data-option-id="${questions[0].options[0].id}"]`).click();
      await expect(host.locator('.dsl-feedback')).toHaveText(`Previously completed correctly. ${questions[0].explanation} You may explore other answers without losing credit.`);
      await host.locator(`[data-question-jump="${questions[3].id}"]`).click();
      await page.reload(); await expect(page.locator('html')).toHaveAttribute('data-ready', 'true');
      expect((await state(page)).activities['knowledge-check'].currentQuestionId).toBe(questions[3].id);
      await host.locator(`[data-question-jump="${questions[0].id}"]`).click();
      await expect(host.locator(`[data-option-id="${questions[0].options[0].id}"]`)).toHaveClass(/dsl-selected-incorrect/);
      await expect(host.locator('.dsl-feedback')).toHaveText(`Previously completed correctly. ${questions[0].explanation} You may explore other answers without losing credit.`);
      await expect(host.locator('.dsl-question-score')).toHaveText('Score: 5/5 · 100%');
      expect((await state(page)).completedSections).toEqual(['knowledge-check']);
    });

    test('every valid old fixture silently restores current answers/checks/credit without deriving positional fields from reordered DOM', async ({ page }) => {
      for (const record of fixtures) {
        await load(page, record.raw, true);
        const raw = record.raw === null ? { completed: [], data: {} } : JSON.parse(record.raw);
        const expected = middleAdapter.decode(raw);
        expect(await state(page), record.file).toEqual(expected);
        expect(await counts(page), record.file).toEqual({ writes: 0, events: 0 });
        for (const id of ids) {
          const own = expected.activities[id], current = data[id].questions.find(question => question.id === own.currentQuestionId);
          await expect(activity(page, id).locator('.dsl-question-prompt')).toHaveText(current.prompt);
          const selected = own.selections[current.id];
          await expect(activity(page, id).locator('[aria-pressed="true"]')).toHaveCount(selected ? 1 : 0);
          if (selected) await expect(activity(page, id).locator(`[data-option-id="${selected}"]`)).toHaveAttribute('aria-pressed', 'true');
        }
      }
    });

    test('keyboard checklist writes original fixed index; extended new payload remains readable in the original engine', async ({ page }) => {
      const raw = JSON.stringify({ completed: [3], data: { marker: 'keep', middleState: { selections: { 'classify-options': 0, future: 'keep' } }, dslUi: { schemaVersion: 1, models: { 'research-model': true }, future: 'keep' } } });
      await load(page, raw, true);
      const check = activity(page, 'research-checklist').locator('input[data-check-id="source-date"]');
      // Locate by stable identity even when item/host order has been reversed.
      await check.focus(); await check.press('Space'); await expect(check).toBeChecked();
      expect(await counts(page)).toEqual({ writes: 1, events: 1 });
      const saved = JSON.parse(await page.evaluate(key => localStorage.getItem(key), key));
      expect(saved.data.middleState.fields['4']).toBe(true);
      expect(saved.data.middleState.fields['7']).toBeUndefined();
      expect(saved.data.middleState.selections).toEqual({ 'classify-options': 0, future: 'keep' });
      expect(saved.data.dslUi).toEqual(JSON.parse(raw).data.dslUi);
      expect(saved.completed).toEqual([3]);
      await page.goto(`/__original${prefix}/middle.html`);
      await expect(page.locator('#research-check-0')).toBeChecked();
      await expect(page.locator('#research-check-3')).not.toBeChecked();
      expect(await page.evaluate(() => JSON.parse(localStorage.getItem('dsl:middle:v1')).completed)).toContain(3);
    });
  });
}
