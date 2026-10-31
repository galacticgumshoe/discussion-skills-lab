// MIT. Opening-only new interaction exceptions and failure boundaries.
import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { ready, navigate, rawProgress } from '../helpers/legacy-journeys.mjs';
const key = 'dsl:opening-stage:v1';
const completed = JSON.parse(JSON.parse(readFileSync(new URL('../fixtures/progress/opening/completed.json', import.meta.url))).raw);
const load = async (page, raw, mount) => {
  await page.goto('/'); await page.evaluate(({ key, raw }) => localStorage.setItem(key, JSON.stringify(raw)), { key, raw });
  await page.goto(`${mount}opening.html`); await ready(page);
};
for (const mount of ['/', '/discussion-skills-lab/']) {
  test(`${mount} Opening task current-choice action order, tab ARIA/keyboard, TERMS spans and silent reload`, async ({ page }) => {
    await load(page, { completed: [0, 1], data: {} }, mount); await navigate(page, 2);
    await expect(page.locator('.analysis-tab[tabindex="0"]')).toHaveCount(1); await expect(page.locator('.analysis-tab[aria-selected="true"]')).toHaveCount(0);
    for (const tab of await page.locator('.analysis-tab').all()) { expect(await tab.getAttribute('aria-controls')).toBe('analysis-result'); expect(await tab.getAttribute('id')).toBeTruthy(); }
    await page.locator('#what-how-options button').first().click();
    await page.locator('#what-how-options button').nth(1).click();
    const first = page.locator('.analysis-tab').first(); await first.focus(); await first.press('Home');
    for (let i = 0; i < 4; i++) await page.locator('.analysis-tab[aria-selected="true"]').press('ArrowRight');
    await expect(page.locator('.analysis-tab[data-kind="terms"]')).toBeFocused();
    await expect(page.locator('#analysis-result')).toHaveAttribute('aria-labelledby', 'analysis-tab-terms');
    expect(await page.locator('.task-mark.on').evaluateAll(nodes => nodes.map(n => n.dataset.kind))).toEqual(['who', 'what']);
    await expect(page.locator('#terms-note')).toBeVisible(); await expect(page.locator('#next-section')).toBeDisabled();
    await page.reload(); await ready(page); await navigate(page, 2);
    await expect(page.locator('.analysis-tab[aria-selected="true"]')).toHaveCount(0); await expect(page.locator('.task-mark.on')).toHaveCount(0);
    expect(JSON.parse(await rawProgress(page, 'opening')).data.analysisSeen).toEqual(['who', 'what', 'how', 'where', 'terms']);
    await expect(page.locator('#next-section')).toBeDisabled();
    await page.locator('#what-how-options button').first().click(); await expect(page.locator('#next-section')).toBeEnabled();
    await page.locator('#what-how-options button').nth(1).click(); await expect(page.locator('#next-section')).toBeEnabled();
    await first.focus(); await first.press('End'); await page.locator('.analysis-tab[data-kind="terms"]').press('ArrowRight'); await expect(first).toBeFocused();
    await first.press('ArrowLeft'); await expect(page.locator('.analysis-tab[data-kind="terms"]')).toBeFocused();
  });
  test(`${mount} Opening six unique timeline stages and wrong-right-wrong checkpoint reload/replay`, async ({ page }) => {
    await load(page, { completed: [0], data: { future: ['keep'], dslUi: { schemaVersion: 1, future: true } } }, mount); await navigate(page, 1);
    const stage = page.locator('[aria-controls="stage-1"]');
    await expect(stage).toHaveAttribute('aria-label', '1. Receive the Task');
    for (let i = 0; i < 5; i++) await stage.click();
    expect(JSON.parse(await rawProgress(page, 'opening')).data.timelineSeen).toEqual(['stage-1']);
    for (const option of [0, 1, 2]) await page.locator('#sequence-options button').nth(option).click();
    await expect(page.locator('#sequence-options .dsl-selected-incorrect')).toHaveText('Vote on a discussion leader');
    await expect(page.locator('#next-section')).toBeDisabled();
    for (let i = 2; i <= 6; i++) { await page.locator(`[aria-controls="stage-${i}"]`).press('Enter'); await expect(page.locator(`#stage-${i}`)).toBeVisible(); }
    await expect(page.locator('#next-section')).toBeEnabled();
    const saved = JSON.parse(await rawProgress(page, 'opening')); expect(saved.data.sequenceCorrect).toBe(true); expect(saved.data.future).toEqual(['keep']); expect(saved.data.dslUi.future).toBe(true);
    expect(saved.data.dslUi.selections['sequence-checkpoint']['next-step']).toBe('vote-leader');
    await page.reload(); await ready(page); await navigate(page, 1);
    await expect(page.locator('#sequence-options .dsl-selected-incorrect')).toHaveText('Vote on a discussion leader');
    await expect(page.locator('.timeline-toggle[aria-expanded="true"]')).toHaveCount(0); await expect(page.locator('#next-section')).toBeEnabled();
    await page.goto(`/__original${mount}opening.html`); await ready(page); await navigate(page, 1);
    await expect(page.locator('#next-section')).toBeEnabled(); expect(JSON.parse(await rawProgress(page, 'opening')).data.dslUi.selections['sequence-checkpoint']['next-step']).toBe('vote-leader');
  });
  test(`${mount} Opening editable builder required fields/model toggle/clipboard failure and 34-35 boundary`, async ({ page }) => {
    await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw Error('Synthetic denial'); } } }));
    await load(page, { completed: [0, 1, 2, 3], data: {} }, mount); await navigate(page, 4);
    await expect(page.locator('#problem-input')).toHaveJSProperty('required', true); await expect(page.locator('#accomplishment-input')).toHaveJSProperty('required', true);
    await page.locator('#problem-input').fill('?!'); await page.locator('#accomplishment-input').fill('plan'); await page.locator('#question-builder button[type=submit]').click(); await expect(page.locator('#draft-input')).toHaveValue('');
    await page.locator('#problem-input').fill(' stigma?! '); await page.locator('#accomplishment-input').fill(' crafted a plan. '); await page.locator('#question-builder button[type=submit]').click();
    await expect(page.locator('#draft-input')).toHaveValue('By the end of this discussion, will the group agree that we have crafted a plan to address stigma?');
    await expect(page.locator('#draft-input')).toBeFocused(); await expect(page.locator('#next-section')).toBeDisabled();
    await page.locator('#show-model').click(); await expect(page.locator('#model-answer')).toBeVisible(); await expect(page.locator('#show-model')).toHaveText('Hide model example');
    await page.locator('#show-model').click(); await expect(page.locator('#model-answer')).toBeHidden();
    await page.locator('#draft-input').fill('x'.repeat(34)); await page.locator('#question-selfcheck').check(); await expect(page.locator('#next-section')).toBeDisabled();
    await page.locator('#draft-input').fill(` ${'x'.repeat(35)} `); await expect(page.locator('#next-section')).toBeEnabled();
    const before = await rawProgress(page, 'opening'); await page.locator('#copy-question').click();
    await expect(page.locator('#copy-question-status')).toContainText(/copy/i); expect(await rawProgress(page, 'opening')).toBe(before);
    await expect(page.locator('#draft-input')).toHaveJSProperty('selectionStart', 0);
    await page.reload(); await ready(page); await navigate(page, 4); await expect(page.locator('#draft-input')).toHaveValue(` ${'x'.repeat(35)} `);
    await page.locator('#draft-input').fill(''); await page.locator('#question-selfcheck').uncheck(); await expect(page.locator('#next-section')).toBeEnabled();
  });
  test(`${mount} Opening all-at-once quiz earned score, zero restoration, retry first unearned only and retained credit`, async ({ page }) => {
    const raw = structuredClone(completed); raw.completed = [0, 1, 2, 3, 4, 5]; raw.data.quizAnswers = [0, 0, 0, 0, 1]; raw.data.quizEarned = [1];
    await load(page, raw, mount); await navigate(page, 6); await expect(page.locator('#quiz-list > article')).toHaveCount(5);
    for (const q of await page.locator('#quiz-list > article').all()) await expect(q).toBeVisible();
    await expect(page.locator('#quiz-score')).toHaveText('Knowledge check: 1 of 5 correct.');
    await expect(page.locator('#quiz-list article').nth(1).locator('button').first()).toHaveAttribute('aria-pressed', 'true');
    await page.locator('#retry-missed').click(); const saved = JSON.parse(await rawProgress(page, 'opening'));
    expect(saved.data.quizAnswers).toEqual([null, 0, 0, 0, 1]); expect(saved.data.quizEarned).toEqual([1]);
    await expect(page.locator('#quiz-list article').first().locator('button').first()).toBeFocused(); await expect(page.locator('#quiz-summary')).toBeHidden();
    for (const [i, correct] of [1, 0, 1, 2, 0].entries()) await page.locator('#quiz-list article').nth(i).locator('button').nth(correct).click();
    await expect(page.locator('#quiz-score')).toHaveText('Knowledge check: 5 of 5 correct.'); await expect(page.locator('#next-section')).toBeEnabled();
    await page.locator('#quiz-list article').first().locator('button').first().click(); await expect(page.locator('#quiz-list .dsl-selected-incorrect').first()).toBeVisible();
    await expect(page.locator('#quiz-score')).toHaveText('Knowledge check: 5 of 5 correct.');
    await page.reload(); await ready(page); await navigate(page, 6); await expect(page.locator('#next-section')).toBeEnabled();
  });
  test(`${mount} Opening content failure keeps independent reference/retry and reference-only print statuses`, async ({ page }) => {
    await page.route('**/content/opening/activities/task-analysis.json', route => route.abort());
    const raw = { completed: [0, 1], data: {} };
    await load(page, raw, mount); await navigate(page, 7); await expect(page.locator('[data-reference-print]')).toBeEnabled();
    await navigate(page, 2); await expect(page.locator('[data-content-retry]:visible')).toHaveCount(1); await expect(page.locator('#next-section')).toBeDisabled();
    await page.unroute('**/content/opening/activities/task-analysis.json'); await page.locator('[data-content-retry]:visible').click();
    await expect(page.locator('.analysis-tab')).toHaveCount(5); await expect(page.locator('.analysis-tab[aria-selected="true"]')).toHaveCount(0);
    expect(await rawProgress(page, 'opening')).toBe(JSON.stringify(raw));
    await page.route('**/content/opening/reference/group-1.md', route => route.abort()); await page.reload(); await ready(page);
    await expect(page.locator('[data-reference-status]')).toContainText('could not load');
    await page.emulateMedia({ media: 'print' }); await expect(page.locator('[data-reference-status]')).toBeVisible(); await expect(page.locator('#view-0')).toBeHidden();
    await page.emulateMedia({ media: 'screen' }); await page.unroute('**/content/opening/reference/group-1.md'); await navigate(page, 7);
    await page.locator('[data-reference-retry]').click(); await expect(page.locator('[data-reference-print]')).toBeEnabled();
    expect(await rawProgress(page, 'opening')).toBe(JSON.stringify(raw));
  });
  test(`${mount} Opening delayed subordinate heading keeps stable original IDs without a render race`, async ({ page }) => {
    let release;
    const held = new Promise(resolve => { release = resolve; });
    await page.route('**/content/opening/sections/fragment-10.md', async route => { await held; await route.continue(); });
    try {
      await page.goto(`${mount}opening.html`);
      await expect(page.locator('.classify-answer').first()).toBeVisible();
      await expect(page.locator('#classify-statement')).toContainText('Could we agree');
      await expect(page.locator('#classify-title')).toHaveCount(0);
      await expect(page.locator('[data-reference-print]')).toBeEnabled();
      expect(await rawProgress(page, 'opening')).toBeNull();
      release(); await ready(page);
      await expect(page.locator('#classify-title')).toHaveText('Classify the Contribution');
      await expect(page.locator('#classify-statement')).toContainText('Could we agree');
      await expect(page.locator('[aria-labelledby="classify-title"]')).toHaveCount(1);
      expect(await rawProgress(page, 'opening')).toBeNull();
    } finally { release(); await page.unroute('**/content/opening/sections/fragment-10.md'); }
  });
  test(`${mount} Opening invalid/denied/quota storage remains usable and never overwrites unsafe records`, async ({ page }) => {
    await page.goto('/'); await page.evaluate(key => localStorage.setItem(key, '{broken'), key);
    await page.goto(`${mount}opening.html`); await ready(page); await expect(page.locator('#storage-warning')).toBeVisible();
    await page.locator('.classify-answer').first().click(); expect(await rawProgress(page, 'opening')).toBe('{broken');
    await page.addInitScript(() => { Storage.prototype.getItem = () => { throw Error('Denied'); }; Storage.prototype.setItem = () => { throw Error('Quota'); }; });
    await page.reload(); await ready(page); await page.locator('.classify-answer').first().click(); await expect(page.locator('#classify-feedback')).toContainText('Correct.'); await expect(page.locator('#storage-warning')).toBeVisible();
    await navigate(page, 7); await expect(page.locator('[data-reference-print]')).toBeEnabled();
  });
}
