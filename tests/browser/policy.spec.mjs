import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { ready, navigate, maps, rawProgress, banks } from '../helpers/legacy-journeys.mjs';
const observed = (id, name) => JSON.parse(readFileSync(new URL(`../fixtures/progress/${id}/${name}.json`, import.meta.url)));
async function load(page, id, record) {
  await page.goto('/');
  await page.evaluate(({ key, raw }) => localStorage.setItem(key, raw), { key: maps[id].storageKey, raw: record.raw });
  await page.goto(`/${id}.html`); await ready(page);
}

test('Opening classification needs current answers, not historical correctness; credit stays permanent', async ({ page }) => {
  await page.goto('/opening.html'); await ready(page);
  for (let i = 0; i < 5; i++) {
    await page.locator(`.classify-answer[data-answer="${banks.opening.classification[i].answer}"]`).click();
    if (i === 0) await page.locator('.classify-answer[data-answer="substantive"]').click();
    if (i < 4) await page.locator('#classify-next').click();
  }
  await expect(page.locator('#next-section')).toBeDisabled();
  await page.locator('#classify-next').click();
  await page.locator('.classify-answer[data-answer="procedural"]').click();
  await expect(page.locator('#next-section')).toBeEnabled();
  await page.locator('.classify-answer[data-answer="substantive"]').click();
  await expect(page.locator('#next-section')).toBeEnabled();
  await expect(page.locator('.classify-answer.selected')).not.toHaveClass(/selected-(correct|incorrect)/);
});

test('Opening checkpoint missing selection, retry button, task keyboard and immediate draft save', async ({ page }) => {
  await load(page, 'opening', observed('opening', 'completed'));
  await navigate(page, 1);
  expect(await page.locator('.sequence-choices button').allTextContents()).toEqual([
    'Begin proposing solutions immediately', 'Clarify the task and reach shared understanding', 'Vote on a discussion leader'
  ]);
  for (const index of [0, 1, 2]) {
    await page.locator('.sequence-choices button').nth(index).click();
    await expect(page.locator('#sequence-feedback')).toHaveText(index === 1
      ? 'Correct. Clarify the task before setting direction.'
      : 'Not quite. The group needs shared understanding before setting direction.');
  }
  expect(JSON.parse(await rawProgress(page, 'opening')).data.sequenceCorrect).toBe(true);
  await expect(page.locator('.sequence-choices [aria-pressed="true"]')).toHaveCount(0);
  await page.reload(); await ready(page); await navigate(page, 1);
  await expect(page.locator('#sequence-feedback')).toBeHidden();
  await navigate(page, 2);
  await page.locator('.analysis-tab[data-kind="who"]').focus();
  await page.locator('.analysis-tab[data-kind="who"]').press('End');
  await expect(page.locator('.analysis-tab[data-kind="terms"]')).toBeFocused();
  await expect(page.locator('#analysis-result')).toContainText('SEARCH TERMS:');
  await navigate(page, 4);
  await page.locator('#draft-input').fill('Immediate synthetic draft —\nUnicode ✓');
  await page.reload(); await ready(page); await navigate(page, 4);
  await expect(page.locator('#draft-input')).toHaveValue('Immediate synthetic draft —\nUnicode ✓');
  // Use observed completion evidence without earned quiz credit to exercise retry.
  const retry = observed('opening', 'completed');
  const raw = JSON.parse(retry.raw);
  raw.completed = raw.completed.filter(n => n !== 6);
  raw.data.quizAnswers = [0, 1, 0, 0, 1]; raw.data.quizEarned = [];
  await load(page, 'opening', { raw: JSON.stringify(raw) });
  await navigate(page, 6);
  await page.locator('#retry-missed').click();
  expect(JSON.parse(await rawProgress(page, 'opening')).data.quizAnswers[0]).toBeNull();
  await expect(page.locator('#quiz-list article:first-child button:first-child')).toBeFocused();
  await expect(page.locator('#next-section')).toBeDisabled();
});

test('Repeated exploration is not unique credit, including generated detail reveals', async ({ page }) => {
  await page.goto('/middle.html'); await ready(page);
  const card = page.locator('#view-0 .flip-card').first();
  for (let i = 0; i < 5; i++) await card.click();
  await expect(page.locator('#next-section')).toBeDisabled();
  expect(JSON.parse(await rawProgress(page, 'middle')).data.middleState.sets.flipped.welcome).toEqual([0]);
  // Seed only already-earned predecessor pages to isolate the evidence gate.
  await load(page, 'middle', { raw: JSON.stringify({ completed: [0, 1], data: {} }) });
  await navigate(page, 2);
  for (let i = 0; i < 5; i++) {
    await page.locator('#evidence-details summary').first().click();
    await expect(page.locator('#evidence-after')).toBeHidden();
  }
  await load(page, 'final', { raw: JSON.stringify({ completed: [0, 1], data: {} }) });
  await navigate(page, 2);
  for (let i = 0; i < 5; i++) {
    await page.locator('#view-2 summary').first().click();
    await expect(page.locator('#s2-reveal')).toBeHidden();
  }
});

test('Middle question navigation wrap/direct review and sequence cursor save gap (KI-03)', async ({ page }) => {
  await load(page, 'middle', observed('middle', 'completed'));
  await navigate(page, 1);
  const before = JSON.parse(await rawProgress(page, 'middle')).data.middleState.positions.classify;
  await page.locator('#classify-next').click();
  await expect(page.locator('#classify-question')).toContainText('1 of 5');
  await page.reload(); await ready(page); await navigate(page, 1);
  expect(JSON.parse(await rawProgress(page, 'middle')).data.middleState.positions.classify).toBe(before);
  await navigate(page, 7);
  await page.locator('#quiz-next').click();
  await expect(page.locator('#quiz-number')).toHaveText('Question 1 of 5');
  await page.locator('#quiz-status button').nth(2).click();
  await page.reload(); await ready(page); await navigate(page, 7);
  await expect(page.locator('#quiz-number')).toHaveText('Question 3 of 5');
});

test('Final previous/next does not wrap, checks/models restore, edits cannot revoke completion', async ({ page }) => {
  await load(page, 'final', observed('final', 'completed'));
  await navigate(page, 2);
  await expect(page.locator('#builder-model')).toBeVisible();
  for (const input of await page.locator('#checklist-2 input').all()) await expect(input).toBeChecked();
  await page.locator('#checklist-2 input').first().uncheck();
  await page.locator('#build-1').fill('');
  await expect(page.locator('#next-section')).toBeEnabled();
  await page.reload(); await ready(page); await navigate(page, 2);
  await expect(page.locator('#next-section')).toBeEnabled();
  await expect(page.locator('#build-1')).toHaveValue('');
  await navigate(page, 8);
  await expect(page.locator('#quiz-8 button.btn.primary')).toHaveCount(0);
  await page.getByRole('button', { name: '← Previous question', exact: true }).click();
  await expect(page.locator('#quiz-8 .eyebrow')).toContainText('Question 4 of 5');
});
