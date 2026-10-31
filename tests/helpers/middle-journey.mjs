import { expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
const behavior = JSON.parse(readFileSync(new URL('../fixtures/content/middle-question-behavior.json', import.meta.url)));
const json = id => JSON.parse(readFileSync(new URL(`../../content/middle/activities/${id}.json`, import.meta.url)));

export async function middleJourney(page, checkpoint = async () => {}) {
  const actions = [], questions = [];
  const root = id => page.locator(`[data-activity-id="${id}"]`);
  const activate = async locator => { await locator.focus(); await locator.press('Enter'); };
  const locked = () => expect(page.locator('#next-section')).toBeDisabled();
  const save = async name => checkpoint(name, { raw: await page.evaluate(() => localStorage.getItem('dsl:middle:v1')), actions, questions, url: page.url() });
  const next = async () => { await expect(page.locator('#next-section')).toBeEnabled(); await activate(page.locator('#next-section')); };
  const cards = async id => {
    const controls = root(id).locator('[data-card-id]');
    for (let i = 0; i < await controls.count(); i++) { await locked(); await activate(controls.nth(i)); actions.push(`card ${id} ${i}`); if (id === 'welcome-cards' && i === 0) await save('partial-first'); }
  };
  const panels = async id => {
    for (const summary of await root(id).locator('summary').all()) {
      await activate(summary);
      await expect(summary.locator('..')).toHaveAttribute('open', '');
      await expect(summary.locator('.dsl-panel-explored')).toBeVisible();
    }
  };
  const question = async (host, identity) => {
    const oracle = behavior.find(item => item.identity === identity), choices = host.locator('.dsl-choice');
    expect(await choices.allTextContents()).toEqual(oracle.options);
    const feedback = [];
    for (const expected of oracle.feedback) {
      const button = choices.nth(expected.option);
      await activate(button);
      await expect(button).toBeFocused();
      await expect(button).toHaveAttribute('aria-pressed', 'true');
      await expect(host.locator('.dsl-feedback')).toHaveText(expected.text);
      feedback.push({ option: expected.option, text: await host.locator('.dsl-feedback').textContent() });
    }
    questions.push({ identity, options: oracle.options, answer: oracle.answer, feedback });
  };
  const sequence = async (id, prefix) => {
    const activity = json(id);
    for (let i = 0; i < activity.data.questions.length; i++) {
      if (i === activity.data.questions.length - 1) await locked();
      await expect(root(id).locator('.dsl-question-prompt')).toHaveText(activity.data.questions[i].prompt);
      await question(root(id), `${prefix}-${i}`);
      if (i < activity.data.questions.length - 1) await activate(root(id).locator('.dsl-question-next'));
    }
  };
  const checks = async id => {
    const controls = root(id).locator('input');
    for (let i = 0; i < await controls.count(); i++) { await locked(); await controls.nth(i).check(); }
  };
  await expect(page.locator('#lesson-status')).toBeHidden(); await locked(); await save('fresh');
  await cards('welcome-cards'); await next();
  await cards('structure-cards'); await sequence('classification', 'classify'); await next();
  await panels('evidence-panels'); await cards('research-model-cards');
  await question(root('research'), 'research');
  for (const [id, value] of [['evidence-source', 'fictional Survey, May 2025'], ['evidence-finding', 'A finding...'], ['evidence-connection', 'access..']]) await page.locator(`[data-field-id="${id}"]`).fill(value);
  await activate(root('evidence-writing').locator('.dsl-assemble'));
  await expect(page.locator('[data-field-id="evidence-output"]')).toHaveValue('According to fictional Survey, May 2025, A finding. This matters to our task because access.');
  await expect(page.locator('[data-field-id="evidence-output"]')).toHaveAttribute('readonly');
  // The original gate remembers assembly; it does not require inputs to remain
  // nonempty afterward. Keep this independent from monotonic completed credit.
  for (const id of ['evidence-source', 'evidence-finding', 'evidence-connection']) await page.locator(`[data-field-id="${id}"]`).fill('');
  await checks('research-checklist'); await save('mid-lesson'); await next();
  await panels('collaboration-panels'); await sequence('group-decisions', 'group'); await next();
  await panels('communication-panels'); await sequence('communication-diagnosis', 'communication'); await next();
  await panels('strategy-panels'); await cards('speaking-cards'); await sequence('speaking-simulator', 'speaking'); await next();
  for (const [i, suffix] of ['a', 'b'].entries()) await question(root('application').locator('.dsl-question').nth(i), `application-${suffix}`);
  await page.locator('[data-field-id="integrated-draft"]').fill('Synthetic practice — “cost & access.”\nConnect Maya’s idea; café ✓');
  await checks('application-checklist'); await next();
  await sequence('knowledge-check', 'quiz'); await save('completed');
  await activate(root('knowledge-check').locator('.dsl-choice').first());
  await expect(page.locator('#next-section')).toBeEnabled(); await save('correct-ever-then-incorrect'); await next();
  expect(questions).toEqual(behavior);
  return { actions, questions };
}
