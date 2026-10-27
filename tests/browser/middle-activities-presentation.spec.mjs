import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const fixture = JSON.parse(JSON.parse(readFileSync(new URL('../fixtures/progress/middle/completed.json', import.meta.url))).raw);
const behavior = JSON.parse(readFileSync(new URL('../fixtures/content/middle-question-behavior.json', import.meta.url)));
const activate = async node => { await node.focus(); await node.press('Enter'); };
const settle = page => page.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {})));
});
const style = node => node.evaluate(node => {
  const s = getComputedStyle(node);
  // A zero-width border has no painted color; compare colors only for real edges.
  return Object.fromEntries(['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'textTransform', 'color', 'backgroundColor', 'borderTopWidth', 'borderTopColor', 'borderLeftWidth', 'borderLeftColor', 'borderRadius', 'padding', 'boxShadow']
    .filter(key => !['borderTopColor', 'borderLeftColor'].includes(key) || parseFloat(s[key.replace('Color', 'Width')]) > 0).map(key => [key, s[key]]));
});
const visit = async (page, section, original) => {
  if (await page.locator('#section-select').isVisible()) await page.locator('#section-select').selectOption(original ? String(section.index) : section.id);
  else await activate(page.locator(`[data-go="${original ? section.index : section.id}"]`));
  await settle(page);
};
const sections = [
  { id:'support-group', index:3, prefix:'group', activity:'group-decisions', reveal:'group-activity' },
  { id:'communication', index:4, prefix:'communication', activity:'communication-diagnosis', reveal:'communication-activity' },
  { id:'speaking-conflicts', index:5, prefix:'speaking', activity:'speaking-simulator', reveal:'speaking-activity' },
  { id:'integrated-practice', index:6 },
  { id:'knowledge-check', index:7, prefix:'quiz', activity:'knowledge-check' }
];

for (const mount of ['/', '/discussion-skills-lab/']) for (const width of [760, 1440, 390]) {
  test(`${mount} every remaining Middle activity retains original panels, response shading and controls at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height:1000 });
    const open = async original => {
      await page.goto(mount); await page.evaluate(raw => localStorage.setItem('dsl:middle:v1', raw), JSON.stringify(fixture));
      await page.goto(`${original ? '/__original' : ''}${mount}middle.html`);
      if (!original) await expect(page.locator('#lesson-status')).toBeHidden();
      await expect(page.locator('#view-0')).toBeVisible(); await settle(page);
    };
    const expected = new Map();
    for (const original of [true, false]) {
      await open(original);
      for (const section of sections) {
        await visit(page, section, original);
        if (section.index <= 5) {
          const legacy = section.index === 3 ? 'collaboration-details' : section.index === 4 ? 'communication-details' : 'strategy-details';
          const activity = section.index === 3 ? 'collaboration-panels' : section.index === 4 ? 'communication-panels' : 'strategy-panels';
          const rows = page.locator(original ? `#${legacy} details` : `[data-activity-id="${activity}"] details`);
          for (const row of await rows.all()) {
            if (!await row.evaluate(node => node.open)) await activate(row.locator('summary'));
            if (!original) await expect(row.locator('.dsl-panel-explored')).toBeVisible();
          }
          const callouts = page.locator(original ? `#${legacy} .example,#${legacy} .caution` : `[data-activity-id="${activity}"] blockquote`);
          const painted = await Promise.all((await callouts.all()).map(style));
          if (original) expected.set(`${section.id}-examples`, painted); else {
            expect(painted).toEqual(expected.get(`${section.id}-examples`));
            if (section.index === 3) await expect(callouts.first().locator('br')).toHaveCount(3);
            if (section.index === 4) {
              const lefts = await callouts.evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().left));
              expect(lefts[0] === lefts[1]).toBe(width <= 600);
            }
          }
        }
        const tasks = section.index === 6 ? ['a', 'b'] : [null];
        for (const task of tasks) {
          const key = task ? `application-${task}` : section.prefix;
          const index = task ? null : section.prefix === 'quiz' ? fixture.data.middleState.quizIndex : fixture.data.middleState.positions[section.prefix];
          const oracle = behavior.find(item => item.identity === (task ? key : `${section.prefix}-${index}`));
          const host = original ? page.locator(task ? `.activity:has(#application-${task}-options)` : section.prefix === 'quiz' ? '.activity:has(#quiz-options)' : `#${section.reveal}`)
            : task ? page.locator('[data-activity-id="application"] .dsl-question').nth(task === 'a' ? 0 : 1)
            : section.prefix === 'quiz' ? page.locator('[data-activity-id="knowledge-check"] .dsl-question-panel') : page.locator(`[data-reveal-id="${section.reveal}"]`);
          const choices = host.locator(original ? '.option' : '.dsl-choice');
          const feedback = host.locator(original ? '.feedback' : '.dsl-feedback');
          const title = host.locator(original ? ':scope > h3' : task ? '.dsl-question-prompt' : section.prefix === 'quiz' ? '.dsl-question-counter' : '.dsl-content-block h3').first();
          await activate(choices.nth(oracle.answer)); await page.mouse.move(0, 0); await settle(page);
          const snapshot = {
            panel:await style(host), title:await style(title),
            correct:await style(choices.nth(oracle.answer)), neutral:await style(choices.nth((oracle.answer + 1) % oracle.options.length)),
            feedback:await style(feedback)
          };
          if (!task) {
            snapshot.next = await style(host.locator(original ? `#${section.prefix}-next` : '.dsl-question-next'));
            if (section.prefix !== 'quiz') snapshot.score = await style(host.locator(original ? `#${section.prefix}-count` : '.dsl-question-score'));
          }
          if (original) expected.set(key, snapshot); else expect(snapshot, key).toEqual(expected.get(key));
          await activate(choices.nth((oracle.answer + 1) % oracle.options.length)); await page.mouse.move(0, 0);
          const wrong = { choice:await style(choices.nth((oracle.answer + 1) % oracle.options.length)), feedback:await style(feedback) };
          if (original) expected.set(`${key}-wrong`, wrong); else {
            expect(wrong, `${key} wrong after credit`).toEqual(expected.get(`${key}-wrong`));
            await expect(page.locator('#next-section')).toBeEnabled();
          }
        }
        if (section.index === 3) {
          const panel = await style(page.locator(original ? '#group-activity > .panel' : '[data-reveal-id="group-activity"] > .dsl-tone-callout'));
          if (original) expected.set('round-table', panel); else expect(panel).toEqual(expected.get('round-table'));
        }
        if (section.index === 6) {
          const panel = page.locator(original ? '.activity:has(#application-draft)' : '.dsl-tone-activity:has([data-activity-id="integrated-writing"])');
          const writer = page.locator('[data-activity-id="integrated-writing"]');
          const input = original ? page.locator('#application-draft') : writer.locator('[data-field-id="integrated-draft"]');
          await input.fill('Synthetic retained draft — café ✓');
          await activate(original ? page.locator('#application-model-button') : writer.locator('.dsl-model-toggle')); await page.mouse.move(0, 0); await settle(page);
          const snapshot = { panel:await style(panel), title:await style(panel.locator('h3').first()), field:await style(input),
            model:await style(page.locator(original ? '#application-model' : '[data-activity-id="integrated-writing"] .dsl-writing-model')),
            button:await style(original ? page.locator('#application-model-button') : writer.locator('.dsl-model-toggle')),
            check:await page.locator(original ? '#application-checks input' : '[data-activity-id="application-checklist"] input').first().evaluate(node => { const s = getComputedStyle(node); return [s.width, s.height, s.accentColor]; }) };
          if (original) expected.set('writing', snapshot); else expect(snapshot).toEqual(expected.get('writing'));
        }
        if (section.index === 7) {
          const snapshot = { panel:await style(page.locator(original ? '#view-7 > .panel' : '.dsl-question-overview')),
            score:await style(page.locator(original ? '#quiz-score' : '.dsl-question-overview > .dsl-question-score')),
            jump:await style(page.locator(original ? '#quiz-status button' : '.dsl-question-jump').first()) };
          if (original) expected.set('quiz-overview', snapshot); else expect(snapshot).toEqual(expected.get('quiz-overview'));
        }
        await page.locator(`#view-${section.index}`).screenshot({ path:info.outputPath(`${original ? 'original' : 'restored'}-${section.id}.png`) });
      }
      if (!original) {
        await expect(page.locator('.dsl-tone-activity,.dsl-question-panel,.dsl-sequence-middle-application .dsl-question')).toHaveCount(9);
        await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden(); await visit(page, sections[3], false);
        await expect(page.locator('[data-field-id="integrated-draft"]')).toHaveValue('Synthetic retained draft — café ✓');
        await expect(page.locator('[data-activity-id="integrated-writing"] .dsl-writing-model')).toBeVisible();
        await expect(page.locator('#next-section')).toBeEnabled();
      }
    }
  });
}
