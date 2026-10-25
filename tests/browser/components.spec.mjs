import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const keys = { opening: 'dsl:opening-stage:v1', middle: 'dsl:middle:v1', final: 'dsl:final:v1' };
const errors = new WeakMap();
test.beforeEach(({ page }) => { const messages = []; errors.set(page, messages); page.on('pageerror', error => messages.push(error.message)); });
test.afterEach(({ page }) => expect(errors.get(page)).toEqual([]));
const activity = (page, id) => page.locator(`[data-activity-id="${id}"]`);
const state = page => page.evaluate(() => window.componentsHarness.store.state);
const counts = page => page.evaluate(() => ({ ...window.componentCalls, events: window.componentsHarness.events }));
async function load(page, lesson = 'final', { raw = null, reorder = false } = {}) {
  await page.goto('/');
  await page.evaluate(({ key, raw }) => { if (raw === null) localStorage.removeItem(key); else localStorage.setItem(key, raw); }, { key: keys[lesson], raw });
  await page.addInitScript(() => {
    window.componentCalls = { writes: 0 };
    const set = Storage.prototype.setItem;
    Storage.prototype.setItem = function(...args) { window.componentCalls.writes++; return set.apply(this, args); };
  });
  await page.goto(`/__fixtures/harness/components.html?lesson=${lesson}${reorder ? '&reorder' : ''}`);
  await expect(page.locator('html')).toHaveAttribute('data-ready', 'true');
}
async function data(page, id) { return page.evaluate(id => window.componentsHarness.activities.find(item => item.id === id).data, id); }
async function pick(page, id, option) { await activity(page, id).locator(`[data-option-id="${option}"]`).click(); }
async function next(page, id) { await activity(page, id).locator('.dsl-question-next').click(); }
async function settleCards(page) { await page.locator('.dsl-card-inner').evaluateAll(nodes => Promise.all(nodes.flatMap(node => node.getAnimations().map(animation => animation.finished)))); }

for (const lesson of ['opening', 'middle', 'final']) test(`${lesson}: all directly mounted data hydrates/updates without events, earned history, duplicate nodes or storage writes`, async ({ page }) => {
  const raw = JSON.parse(readFileSync(new URL(`../fixtures/progress/${lesson}/completed.json`, import.meta.url))).raw;
  await load(page, lesson, { raw, reorder: true });
  await page.evaluate(() => { window.componentsHarness.hydrate(); window.componentsHarness.hydrate(); });
  // Native details hydration queues toggle; observe subsequent event-loop turns.
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  expect(await counts(page)).toEqual({ writes: 0, events: 0 });
  expect(await page.evaluate(() => window.componentsHarness.store.originalRaw)).toBe(raw);
  expect(await page.evaluate(() => typeof window.DSL)).toBe('undefined');
  for (const id of await page.evaluate(() => window.componentsHarness.activities.map(item => item.id))) {
    await expect(activity(page, id)).toHaveCount(1);
  }
  const before = await state(page);
  await page.evaluate(() => { window.componentsHarness.remount(); window.componentsHarness.remount(); });
  expect(await state(page)).toEqual(before);
  expect(await counts(page)).toEqual({ writes: 0, events: 0 });
});

test('flashcards: native click/Enter/Space flip once, independent explored cue and inactive-face ARIA, completion and reload', async ({ page }) => {
  await load(page);
  const group = activity(page, 'welcome-cards'), first = group.locator('[data-card-id="connect-ideas"]');
  await expect(page.locator('#next-section')).toBeDisabled();
  await first.focus(); await first.press('Enter');
  await expect(first).toBeFocused(); await expect(first).toHaveAttribute('aria-pressed', 'true');
  await expect(first.locator('.dsl-card-front')).toHaveAttribute('aria-hidden', 'true');
  await expect(first.locator('.dsl-card-back')).toHaveAttribute('aria-hidden', 'false');
  await expect(first).toHaveAccessibleDescription((await data(page, 'welcome-cards')).items[0].back);
  expect(await counts(page)).toEqual({ writes: 1, events: 1 });
  await first.press('Space');
  await expect(first).toHaveAttribute('aria-pressed', 'false');
  await expect(first.locator('.dsl-card-explored')).toBeVisible();
  await expect(first.locator('.dsl-card-front')).toHaveAttribute('aria-hidden', 'false');
  expect((await state(page)).activities['welcome-cards']).toEqual({ exploredIds: ['connect-ideas'], backIds: [] });
  expect(await counts(page)).toEqual({ writes: 1, events: 2 }); // presentation is session-only, not another persistence fact
  await group.locator('[data-card-id="capture-findings"]').click();
  await expect(page.locator('#next-section')).toBeDisabled();
  await group.locator('[data-card-id="confirm-outcome"]').click();
  await expect(page.locator('#next-section')).toBeEnabled();
  await page.reload(); await expect(page.locator('html')).toHaveAttribute('data-ready', 'true');
  await expect(first).toHaveAttribute('aria-pressed', 'false');
  await expect(first.locator('.dsl-card-explored')).toBeVisible();
  await expect(page.locator('#next-section')).toBeEnabled();
  expect(await counts(page)).toEqual({ writes: 0, events: 0 });
});

test('native details: open/close keep exploration, hydration of global Final open indexes does not invent credit', async ({ page }) => {
  const raw = JSON.stringify({ completed: [], data: { finalState: { panelsOpen: { 0: true }, panels: { 2: [1] } } } });
  await load(page, 'final', { raw, reorder: true });
  const panels = activity(page, 'connect-viewpoints-panels'), listen = panels.locator('[data-panel-id="listen"]'), connect = panels.locator('[data-panel-id="connect"]');
  await expect(listen).toHaveAttribute('open', '');
  expect((await state(page)).activities['connect-viewpoints-panels'].exploredIds).toEqual(['connect']);
  expect(await counts(page)).toEqual({ writes: 0, events: 0 });
  await listen.locator('summary').focus(); await listen.locator('summary').press('Enter');
  await expect(listen).not.toHaveAttribute('open');
  expect((await state(page)).activities['connect-viewpoints-panels'].exploredIds).toEqual(['connect']);
  await listen.locator('summary').press('Space');
  await expect(listen).toHaveAttribute('open', '');
  await expect.poll(async () => (await state(page)).activities['connect-viewpoints-panels'].exploredIds).toEqual(['connect', 'listen']);
  await connect.locator('summary').click(); await expect(connect).toHaveAttribute('open', '');
  await connect.locator('summary').click(); await expect(connect).not.toHaveAttribute('open');
  await expect(connect.locator('.dsl-panel-explored')).toBeVisible();
  // The native open attribute changes before the UA's queued toggle callback.
  // Wait for that real save boundary, not a fixed delay or a weakened value check.
  await expect.poll(async () => JSON.parse(await page.evaluate(() => window.componentsHarness.store.originalRaw)).data.finalState.panelsOpen['1']).toBe(false);
  const saved = JSON.parse(await page.evaluate(() => window.componentsHarness.store.originalRaw));
  expect(saved.data.finalState.panelsOpen['0']).toBe(true); expect(saved.data.finalState.panelsOpen['1']).toBe(false);
  expect(saved.data.finalState.panels['2']).toEqual([1, 0]);
  await page.reload(); await expect(page.locator('html')).toHaveAttribute('data-ready', 'true');
  await expect(listen).toHaveAttribute('open', ''); await expect(connect).not.toHaveAttribute('open');
  expect(await counts(page)).toEqual({ writes: 0, events: 0 });
});

test('Opening timeline uses controlled button associations, keyboard exploration and session-only open presentation', async ({ page }) => {
  await load(page, 'opening');
  const timeline = activity(page, 'timeline'), receive = timeline.locator('[data-panel-id="receive"] button');
  await receive.focus(); await receive.press('Enter');
  await expect(receive).toHaveAttribute('aria-expanded', 'true');
  const controlled = await receive.getAttribute('aria-controls');
  await expect(page.locator(`[id="${controlled}"]`)).toBeVisible();
  await receive.press('Space'); await expect(receive).toHaveAttribute('aria-expanded', 'false');
  await expect(receive.locator('.dsl-panel-explored')).toBeVisible();
  for (const id of ['read-analyze', 'clarify', 'establish-direction', 'research', 'transition']) await timeline.locator(`[data-panel-id="${id}"] button`).click();
  await pick(page, 'sequence-checkpoint', 'clarify-task'); await pick(page, 'sequence-checkpoint', 'vote-leader');
  expect((await state(page)).completedSections).toContain('opening-sequence');
  expect((await state(page)).activities['sequence-checkpoint'].earnedQuestionIds).toEqual(['next-step']);
  await page.reload(); await expect(page.locator('html')).toHaveAttribute('data-ready', 'true');
  await expect(receive).toHaveAttribute('aria-expanded', 'false');
  await expect(activity(page, 'sequence-checkpoint').locator('[data-option-id="vote-leader"]')).toHaveAttribute('aria-pressed', 'true');
  expect((await state(page)).completedSections).toContain('opening-sequence');
  expect(await counts(page)).toEqual({ writes: 0, events: 0 });
});

test('Opening classification: any answer enables explicit wraparound Next; only all CURRENT answers earn initial credit', async ({ page }) => {
  await load(page, 'opening'); const id = 'classification', questions = (await data(page, id)).questions;
  await expect(activity(page, id).locator('.dsl-question-next')).toBeDisabled();
  await pick(page, id, 'substantive'); // incorrect first; no automatic advance
  await expect(activity(page, id).locator('[data-question-id]')).toHaveAttribute('data-question-id', questions[0].id);
  await expect(activity(page, id).locator('.dsl-question-next')).toBeEnabled();
  await pick(page, id, questions[0].correctOptionId); await pick(page, id, 'substantive');
  for (const question of questions.slice(1)) { await next(page, id); await pick(page, id, question.correctOptionId); }
  expect((await state(page)).activities.classification.earnedQuestionIds).toHaveLength(5);
  await expect(page.locator('#next-section')).toBeDisabled();
  await next(page, id);
  await pick(page, id, questions[0].correctOptionId);
  await expect(page.locator('#next-section')).toBeEnabled();
  await pick(page, id, 'substantive');
  await expect(page.locator('#next-section')).toBeEnabled();
  await expect(activity(page, id).locator('.dsl-selected-incorrect')).toHaveCount(1);
  await page.reload(); await expect(page.locator('html')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#next-section')).toBeEnabled();
  await expect(activity(page, id).locator('[data-option-id="substantive"]')).toHaveAttribute('aria-pressed', 'true');
});

test('Opening knowledge check: all-at-once answers, earned score, first-unearned retry resets only that choice and focuses first option', async ({ page }) => {
  await load(page, 'opening'); const id = 'knowledge-check', group = activity(page, id), questions = (await data(page, id)).questions;
  await expect(group.locator('[data-question-id]')).toHaveCount(5);
  await expect(group.locator('.dsl-question-prompt').first()).toHaveText(`1. ${questions[0].prompt}`);
  for (const [index, question] of questions.entries()) {
    const option = index === 1 || index === 3 ? question.options.find(option => option.id !== question.correctOptionId).id : question.correctOptionId;
    await group.locator(`[data-question-id="${question.id}"] [data-option-id="${option}"]`).click();
  }
  await expect(group.locator('.dsl-question-score')).toHaveText('Knowledge check: 3 of 5 correct.');
  const before = (await state(page)).activities[id].selections;
  await group.locator('.dsl-question-retry').click();
  await expect(group.locator(`[data-question-id="${questions[1].id}"] button`).first()).toBeFocused();
  const after = (await state(page)).activities[id].selections;
  const expected = { ...before }; delete expected[questions[1].id]; expect(after).toEqual(expected);
  await expect(group.locator('.dsl-question-retry')).toBeHidden();
  for (const index of [1, 3]) await group.locator(`[data-question-id="${questions[index].id}"] [data-option-id="${questions[index].correctOptionId}"]`).click();
  await expect(group.locator('.dsl-question-score')).toHaveText('Knowledge check: 5 of 5 correct.');
  await group.locator(`[data-question-id="${questions[0].id}"] button`).first().click();
  await expect(group.locator('.dsl-question-score')).toHaveText('Knowledge check: 5 of 5 correct.');
  await expect(group.locator('.dsl-question-retry')).toBeHidden();
  await page.reload(); await expect(page.locator('html')).toHaveAttribute('data-ready', 'true');
  await expect(group.locator('.dsl-question-score')).toHaveText('Knowledge check: 5 of 5 correct.');
});

for (const id of ['group-decisions', 'speaking-simulator']) test(`Middle ${id}: correct-ever Next/wrap, exact shared/per-option feedback and immediate adapter cursor saves`, async ({ page }) => {
  await load(page, 'middle'); const questions = (await data(page, id)).questions, group = activity(page, id);
  for (const [index, question] of questions.entries()) {
    const wrong = question.options.find(option => option.id !== question.correctOptionId);
    await pick(page, id, wrong.id); await expect(group.locator('.dsl-question-next')).toBeDisabled();
    for (const option of question.options) {
      await pick(page, id, option.id);
      await expect(group.locator('.dsl-feedback')).toHaveText(option.feedback || `${option.id === question.correctOptionId ? 'Good choice.' : 'Not quite.'} ${question.explanation}`);
    }
    await pick(page, id, question.correctOptionId); await pick(page, id, wrong.id);
    await expect(group.locator('.dsl-question-next')).toBeEnabled();
    await next(page, id);
    const expectedId = questions[(index + 1) % questions.length].id;
    expect((await state(page)).activities[id].currentQuestionId).toBe(expectedId);
    const saved = await page.evaluate(() => window.componentsHarness.adapter.decode(JSON.parse(window.componentsHarness.store.originalRaw)));
    expect(saved.activities[id].currentQuestionId).toBe(expectedId);
  }
  expect((await state(page)).activities[id].earnedQuestionIds).toHaveLength(questions.length);
  await page.reload(); await expect(page.locator('html')).toHaveAttribute('data-ready', 'true');
  await expect(group.locator('.dsl-selected-incorrect')).toHaveCount(1);
  await expect(group.locator('.dsl-question-next')).toBeEnabled();
});

test('Middle quiz: direct jump status, wraparound, earned score/latest choice independence and source retained-credit feedback', async ({ page }) => {
  await load(page, 'middle'); const id = 'knowledge-check', group = activity(page, id), questions = (await data(page, id)).questions;
  await group.locator(`[data-question-jump="${questions[4].id}"]`).click();
  await expect(group.locator('.dsl-choice').first()).toBeFocused();
  expect((await state(page)).activities[id].currentQuestionId).toBe(questions[4].id);
  await expect(group.locator('.dsl-question-next')).toBeDisabled();
  await pick(page, id, questions[4].correctOptionId); await next(page, id);
  await expect(group.locator('[data-question-id]')).toHaveAttribute('data-question-id', questions[0].id);
  await pick(page, id, questions[0].correctOptionId);
  await pick(page, id, questions[0].options[0].id);
  await expect(group.locator('.dsl-feedback')).toHaveText(`Previously completed correctly. ${questions[0].explanation} You may explore other answers without losing credit.`);
  await expect(group.locator('.dsl-question-score')).toHaveText('Score: 2/5 · 40%');
  await expect(group.locator(`[data-question-jump="${questions[0].id}"]`)).toHaveText('✓ Correct · Q1');
  await expect(group.locator('.dsl-selected-correct')).toHaveCount(0); await expect(group.locator('.dsl-selected-incorrect')).toHaveCount(1);
  await page.reload(); await expect(page.locator('html')).toHaveAttribute('data-ready', 'true');
  await expect(group.locator('.dsl-question-score')).toHaveText('Score: 2/5 · 40%');
  await expect(group.locator('.dsl-selected-incorrect')).toHaveCount(1);
});

test('Final: optional context, exact option-specific explanations, previous/earned-next boundaries without wrap', async ({ page }) => {
  await load(page); const id = 'consensus-questions', group = activity(page, id), questions = (await data(page, id)).questions;
  for (const question of questions) {
    await expect(group.locator('.dsl-question-context')).toHaveText(question.context);
    for (const option of question.options) {
      await pick(page, id, option.id);
      await expect(group.locator('.dsl-feedback')).toHaveText(`${option.feedback}${option.id === question.correctOptionId ? '' : ' Try another option.'}`);
    }
    await pick(page, id, question.correctOptionId);
    await pick(page, id, question.options.find(option => option.id !== question.correctOptionId).id);
    await expect(group.locator('.dsl-credit-note')).toHaveText('This question was already completed correctly. You may explore the other explanations without losing credit.');
    if (question !== questions.at(-1)) { await expect(group.locator('.dsl-question-next')).toBeEnabled(); await next(page, id); }
  }
  await expect(group.locator('.dsl-question-next')).toBeHidden();
  await group.locator('.dsl-question-previous').click(); await group.locator('.dsl-question-previous').click();
  await expect(group.locator('.dsl-question-previous')).toBeHidden();
  await expect(group.locator('[data-question-id]')).toHaveAttribute('data-question-id', questions[0].id);
  await expect(activity(page, 'summary-synthesis-questions').locator('.dsl-question-context')).toBeHidden();
});

test('same-question selections preserve option focus/nodes, one stable atomic live region, no duplicate handlers after remount/destroy', async ({ page }) => {
  await load(page); const group = activity(page, 'summary-synthesis-questions');
  await page.evaluate(() => {
    const host = window.componentsHarness.hosts.get('summary-synthesis-questions');
    window.originalFeedback = host.querySelector('[role="status"]'); window.originalOption = host.querySelector('button[data-option-id]');
  });
  const choice = group.locator('[data-option-id="summary"]'); await choice.focus(); await choice.press('Enter');
  await expect(choice).toBeFocused(); await expect(group.locator('.dsl-feedback')).toHaveAttribute('aria-live', 'polite');
  await expect(group.locator('.dsl-feedback')).toHaveAttribute('aria-atomic', 'true');
  await choice.press('Space');
  expect(await page.evaluate(() => {
    const host = window.componentsHarness.hosts.get('summary-synthesis-questions');
    return host.querySelector('[role="status"]') === window.originalFeedback && host.querySelector('button[data-option-id]') === window.originalOption;
  })).toBe(true);
  expect(await counts(page)).toEqual({ writes: 1, events: 2 });
  await page.evaluate(() => {
    const harness = window.componentsHarness;
    window.oldChoices = [...harness.hosts.values()].flatMap(host => [...host.querySelectorAll('button')]);
    harness.remount(); harness.remount(); window.oldChoices.forEach(button => button.click());
  });
  expect(await counts(page)).toEqual({ writes: 1, events: 2 });
  await choice.focus(); await choice.press('Enter');
  expect((await counts(page)).events).toBe(3);
  const duplicate = await page.evaluate(() => {
    const harness = window.componentsHarness;
    try { harness.mountFlashcards(harness.hosts.get('welcome-cards'), { data: {}, state: {} }); } catch (error) { return error.message; }
  });
  expect(duplicate).toContain('already mounted');
});

test('stable activity/item/question IDs survive reordered hosts/items and save/reload using fixed Middle global indexes', async ({ page }) => {
  await load(page, 'middle', { reorder: true });
  const group = activity(page, 'research-model-cards');
  await page.evaluate(() => {
    const host = window.componentsHarness.hosts.get('research-model-cards'); host.prepend(host.lastElementChild);
    const question = document.querySelector('[data-activity-id="knowledge-check"] .dsl-choices'); question.prepend(question.lastElementChild);
  });
  await group.locator('[data-card-id="stronger-example"]').click();
  await expect(group.locator('[data-card-id="stronger-example"] .dsl-card-back strong')).toHaveText('WHY IT IS STRONGER');
  const stronger = (await data(page, 'research-model-cards')).items.find(card => card.id === 'stronger-example');
  await expect(group.locator('[data-card-id="stronger-example"]')).toHaveAccessibleDescription(`${stronger.backTitle} ${stronger.back}`);
  await pick(page, 'knowledge-check', 'combine-proposals');
  await next(page, 'knowledge-check');
  const raw = JSON.parse(await page.evaluate(() => window.componentsHarness.store.originalRaw));
  expect(raw.data.middleState.sets.flipped.models).toEqual([6]);
  expect(raw.data.middleState.selections['quiz-0']).toBe(2); expect(raw.data.middleState.quizIndex).toBe(1);
  await page.reload(); await expect(page.locator('html')).toHaveAttribute('data-ready', 'true');
  await expect(group.locator('[data-card-id="stronger-example"] .dsl-card-explored')).toBeVisible();
  await expect(group.locator('[data-card-id="weak-example"] .dsl-card-explored')).toBeHidden();
  expect((await state(page)).activities['knowledge-check'].currentQuestionId).toBe('useful-research');
  expect(await counts(page)).toEqual({ writes: 0, events: 0 });
});

test('all card faces/long options fit 320px and enlarged text; 3D horizontal flip/reduced motion and legacy style isolation', async ({ page }, testInfo) => {
  await load(page);
  // Compare the scoped sheet on/off against unrelated legacy class names.
  const styles = () => page.locator('#legacy-decoy button,#legacy-decoy details').evaluateAll(nodes => nodes.map(node => {
    const style = getComputedStyle(node); return ['color', 'backgroundColor', 'padding', 'border', 'display'].map(key => style[key]);
  }));
  const before = await styles(); await page.locator('#component-styles').evaluate(node => { node.disabled = true; });
  expect(await styles()).toEqual(before); await page.locator('#component-styles').evaluate(node => { node.disabled = false; });
  await page.setViewportSize({ width: 320, height: 844 });
  await page.locator('#components-harness').evaluate(node => { node.style.fontSize = '200%'; });
  for (const card of await page.locator('.dsl-card').all()) await card.click();
  await settleCards(page);
  const overflow = await page.locator('.dsl-card,.dsl-card-copy,.dsl-choice').evaluateAll(nodes => nodes.filter(node => node.scrollWidth > node.clientWidth + 1 || node.scrollHeight > node.clientHeight + 1).map(node => node.textContent));
  expect(overflow).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const first = page.locator('.dsl-card').first();
  expect(await first.locator('.dsl-card-inner').evaluate(node => getComputedStyle(node).transform)).toContain('matrix3d');
  await expect(first.locator('.dsl-card-back')).toHaveCSS('background-color', 'rgb(20, 43, 73)');
  await expect(first.locator('.dsl-card-back')).toHaveCSS('color', 'rgb(255, 255, 255)');
  // Inspect the actual baseline's longest face, not invented stress prose.
  const lengths = await page.evaluate(async () => {
    const lengths = [];
    for (const lesson of ['middle', 'final']) {
      const html = await fetch(`/__fixtures/content/source/${lesson}.html`).then(response => response.text());
      const doc = new DOMParser().parseFromString(html, 'text/html');
      for (const face of doc.querySelectorAll('.flip-front,.flip-back')) {
        face.querySelectorAll('.dsl-flip-hint,.dsl-flip-explored,.visited').forEach(node => node.remove()); lengths.push(face.textContent.replace(/\s+/g, ' ').trim().length);
      }
    }
    return { baseline: Math.max(...lengths), mounted: Math.max(...window.componentsHarness.activities.filter(item => item.type === 'cards').flatMap(item => item.data.items.flatMap(card => [card.front.length, card.back.length]))) };
  });
  expect(lengths.mounted).toBeGreaterThanOrEqual(lengths.baseline);
  const longest = await page.evaluate(() => window.componentsHarness.activities.filter(item => item.type === 'cards')
    .flatMap(item => item.data.items).sort((a, b) => b.back.length - a.back.length)[0].id);
  await page.locator(`[data-card-id="${longest}"]`).screenshot({ path: testInfo.outputPath('longest-back-320-enlarged.png') });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(first.locator('.dsl-card-inner')).toHaveCSS('transition-duration', '0s');
  await first.click(); await expect(first).toHaveAttribute('aria-pressed', 'false');
  await expect(first.locator('.dsl-card-back')).toHaveCSS('visibility', 'hidden');
  await expect(first.locator('.dsl-card-front')).toHaveCSS('visibility', 'visible');
  await expect(first.locator('.dsl-card-explored')).toBeVisible();
  await first.screenshot({ path: testInfo.outputPath('card-320-enlarged.png') });
});
