import { expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
export const finalManifest = JSON.parse(readFileSync(new URL('../../content/final/lesson.json', import.meta.url)));
export const finalActivity = id => JSON.parse(readFileSync(new URL(`../../content/final/activities/${id}.json`, import.meta.url)));
export const finalVisit = async (page, id) => {
  if (await page.locator('#section-select').isVisible()) await page.locator('#section-select').selectOption(id);
  else await page.locator(`[data-go="${id}"]`).click();
  await expect(page.locator(`[data-section-id="${id}"]`)).toBeVisible();
};
export async function solveFinal(page, id, { alternatives = true, beforeLast = async () => {} } = {}) {
  const host = page.locator(`[data-activity-id="${id}"]`), data = finalActivity(id).data;
  const questions = [], section = finalManifest.sections.findIndex(s => s.gateActivityIds.includes(id));
  for (const [index, question] of data.questions.entries()) {
    if (index === data.questions.length - 1) await beforeLast();
    const correct = host.locator(`[data-option-id="${question.correctOptionId}"]`);
    await expect(host.locator('.dsl-question-prompt')).toHaveText(question.prompt);
    await expect(host.locator('.dsl-question-context')).toHaveText(question.context || '');
    const options = question.options.map((option, i) => `${String.fromCharCode(65 + i)}. ${option.text}`), feedback = [];
    expect(await host.locator('.dsl-choice').allTextContents()).toEqual(options);
    if (alternatives) for (const option of question.options.filter(o => o.id !== question.correctOptionId).concat(question.options.filter(o => o.id === question.correctOptionId))) {
      const button = host.locator(`[data-option-id="${option.id}"]`); await button.focus(); await button.press('Enter');
      await expect(button).toBeFocused();
      await expect(host.locator('.dsl-feedback')).toHaveText(option.feedback + (option.id === question.correctOptionId ? '' : ' Try another option.'));
      feedback.push({ option: question.options.indexOf(option), text: await host.locator('.dsl-feedback').textContent() });
    }
    await correct.focus(); await correct.press('Enter'); await expect(correct).toBeFocused();
    questions.push({ identity: `${section}:${index}`, options, answer: question.options.findIndex(o => o.id === question.correctOptionId), feedback });
    if (index < data.questions.length - 1) await host.locator('.dsl-question-next').click();
    else await expect(host.locator('.dsl-question-next')).toBeHidden();
  }
  return questions;
}
export async function finalJourney(page, checkpoint = async () => {}) {
  const questions = [], actions = [];
  const save = async name => checkpoint(name, { raw: await page.evaluate(() => localStorage.getItem('dsl:final:v1')), questions: [...questions], actions: [...actions], url: page.url() });
  const locked = () => expect(page.locator('#next-section')).toBeDisabled();
  const unlocked = async () => expect(page.locator('#next-section')).toBeEnabled();
  await save('fresh');
  for (const [index, section] of finalManifest.sections.slice(0, -1).entries()) {
    if (index) await finalVisit(page, section.id);
    await locked();
    const view = page.locator(`#view-${index}`);
    const cards = await view.locator('[data-card-id]').all();
    for (const [i, card] of cards.entries()) {
      await locked(); await card.focus(); await card.press('Enter'); actions.push(`explore card ${index}:${i}`);
      if (index === 0 && i === 0) await save('partial-first');
    }
    const panels = await view.locator('summary').all();
    for (const summary of panels) { await locked(); await summary.click(); await expect(summary.locator('.dsl-panel-explored')).toBeVisible(); }
    if (index === 3) for (const note of finalActivity('note-classification').data.notes) {
      await locked(); await view.locator(`[data-note-id="${note.id}"]`).selectOption(note.correctCategoryId);
    }
    const questionId = section.gateActivityIds.find(id => id.endsWith('-questions') || id === 'knowledge-check');
    if (questionId) questions.push(...await solveFinal(page, questionId, { beforeLast: locked }));
    if (index === 2) {
      await locked();
      for (const id of ['synthesis-contributors', 'synthesis-relationship', 'synthesis-recommendation']) await view.locator(`[data-field-id="${id}"]`).fill(`${id}.`);
      await view.locator('.dsl-assemble').click(); await locked();
      await expect(view.locator('.dsl-writing-model')).toBeHidden();
      await view.locator('.dsl-model-toggle').click(); await locked();
      const checks = await view.locator('[data-check-id]').all();
      // Even an assembled builder must currently have all source inputs before
      // initial credit. Fill the final check while one field is blank.
      await view.locator('[data-field-id="synthesis-contributors"]').fill(' ');
      for (const check of checks) await check.check();
      await locked(); await view.locator('[data-field-id="synthesis-contributors"]').fill('Restored source input');
    }
    if (index === 7) {
      await locked(); await view.locator('[data-field-id="closing-draft"]').fill('Synthetic one-sentence draft.');
      await locked(); await view.locator('.dsl-model-toggle').click();
      for (const check of await view.locator('[data-check-id]').all()) { await locked(); await check.check(); }
    }
    await unlocked();
    if (index === 2) await save('mid-lesson');
    if (index === 2) {
      await view.locator('[data-field-id="synthesis-contributors"]').fill('');
      await view.locator('[data-check-id]').first().uncheck(); await unlocked();
    }
    if (index === 7) { await view.locator('[data-field-id="closing-draft"]').fill(''); await unlocked(); }
  }
  await expect(page.locator('[data-reveal-id="completion"]')).toBeVisible();
  await expect(page.locator('.dsl-summary-score')).toHaveText('Final score: 5 / 5');
  await expect(page.locator('.dsl-progress-summary')).toContainText('9 of 9 lesson pages complete.');
  await save('completed');
  await page.locator('[data-activity-id="knowledge-check"] .dsl-choice').first().click();
  await unlocked(); await save('correct-ever-then-incorrect');
  return { questions, actions };
}
