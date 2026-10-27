import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const raw = JSON.parse(readFileSync(new URL('../fixtures/progress/middle/completed.json', import.meta.url))).raw;
const settle = page => page.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {})));
});
const activate = async node => { await node.focus(); await node.press('Enter'); };
const style = node => node.evaluate(node => {
  const s = getComputedStyle(node);
  return Object.fromEntries(['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'textTransform', 'color', 'backgroundColor', 'borderTopWidth', 'borderTopColor', 'borderLeftWidth', 'borderLeftColor', 'borderRadius', 'padding', 'boxShadow'].map(key => [key, s[key]]));
});
const visit = async (page, original) => {
  if (await page.locator('#section-select').isVisible()) await page.locator('#section-select').selectOption(original ? '1' : 'structure-substance');
  else await activate(page.locator(`[data-go="${original ? '1' : 'structure-substance'}"]`));
  await settle(page);
};

for (const mount of ['/', '/discussion-skills-lab/']) for (const width of [760, 1440, 390]) {
  test(`${mount} Structure badges and classification match main at ${width}px; retain larger heading and two-face explored cue`, async ({ page }, info) => {
    await page.setViewportSize({ width, height:1000 });
    await page.goto(mount); await page.evaluate(raw => localStorage.setItem('dsl:middle:v1', raw), raw);
    await page.goto(`/__original${mount}middle.html`); await expect(page.locator('#view-0')).toBeVisible(); await visit(page, true);
    const oldCards = page.locator('#view-1 .flip-card');
    for (const card of await oldCards.all()) if (await card.getAttribute('aria-pressed') === 'true') await activate(card);
    await activate(page.locator('#classify-options button').first()); await page.mouse.move(0, 0); await settle(page);
    const original = {
      headingSize: await page.locator('#s1-title').evaluate(node => parseFloat(getComputedStyle(node).fontSize)),
      badge: await style(page.locator('#view-1 .flip-front .pill').first()),
      description: await style(page.locator('#view-1 .flip-front > p').first()),
      panel: await style(page.locator('#s1-activity')),
      title: await style(page.locator('#s1-activity > h3')),
      prompt: await style(page.locator('#classify-question')),
      promptText: await page.locator('#classify-question').textContent(),
      selected: await style(page.locator('#classify-options button').first()),
      neutral: await style(page.locator('#classify-options button').last()),
      feedback: await style(page.locator('#classify-feedback')),
      next: await style(page.locator('#classify-next')),
      score: await style(page.locator('#classify-count'))
    };
    await page.locator('#view-1').screenshot({ path:info.outputPath('original-structure.png') });
    // Record the original wrong-after-credit palette too; earned history remains.
    await activate(page.locator('#classify-options button').last()); await page.mouse.move(0, 0);
    original.incorrect = await style(page.locator('#classify-options button').last());
    original.errorFeedback = await style(page.locator('#classify-feedback'));

    await page.goto(`${mount}middle.html`); await expect(page.locator('#lesson-status')).toBeHidden(); await visit(page, false);
    const cards = page.locator('[data-activity-id="structure-cards"] .dsl-card');
    for (const card of await cards.all()) {
      await expect(card.locator('.dsl-card-front .dsl-card-title')).toBeVisible();
      await expect(card.locator('.dsl-card-front .dsl-card-title')).toHaveText((await card.getAttribute('data-card-id')).toUpperCase());
      expect(await style(card.locator('.dsl-card-front .dsl-card-title'))).toEqual(original.badge);
      expect(await style(card.locator('.dsl-card-front .dsl-prose-p'))).toEqual(original.description);
      const rows = await card.evaluate(node => ({ title:node.querySelector('.dsl-card-title').getBoundingClientRect().bottom, copy:node.querySelector('.dsl-card-copy').getBoundingClientRect().top }));
      // Firefox's separately transformed rectangles can differ by floating-point
      // noise at a shared edge. Allow less than one 1/64px layout unit.
      expect(rows.title - rows.copy).toBeLessThan(1 / 64);
      await expect(card.locator('.dsl-card-front > .dsl-card-explored')).toBeVisible();
      await activate(card); await settle(page);
      await expect(card.locator('.dsl-card-back .dsl-card-explored')).toBeVisible();
      await activate(card); await settle(page);
      await expect(card.locator('.dsl-card-front > .dsl-card-explored')).toBeVisible();
    }
    const headingSize = await page.locator('#s1-title').evaluate(node => parseFloat(getComputedStyle(node).fontSize));
    expect(headingSize).toBeCloseTo(Math.max(29.6, Math.min(width * .034, 41.6)), 1);
    expect(headingSize).toBeGreaterThan(original.headingSize);
    const activity = page.locator('[data-activity-id="classification"]');
    await activate(activity.locator('.dsl-choice').first()); await page.mouse.move(0, 0); await settle(page);
    expect(await style(page.locator('[data-reveal-id="classification"]'))).toEqual(original.panel);
    expect(await style(page.locator('[data-reveal-id="classification"] h3').first())).toEqual(original.title);
    expect(await style(activity.locator('.dsl-question-prompt'))).toEqual(original.prompt);
    await expect(activity.locator('.dsl-question-prompt')).toHaveText(original.promptText);
    expect(await style(activity.locator('.dsl-choice').first())).toEqual(original.selected);
    expect(await style(activity.locator('.dsl-choice').last())).toEqual(original.neutral);
    expect(await style(activity.locator('.dsl-feedback'))).toEqual(original.feedback);
    expect(await style(activity.locator('.dsl-question-next'))).toEqual(original.next);
    expect(await style(activity.locator('.dsl-question-score'))).toEqual(original.score);
    const columns = await activity.locator('.dsl-choice').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().top));
    expect(columns[0] === columns[1]).toBe(width > 600);
    await expect(activity.locator('.dsl-question-counter')).toBeHidden();
    await page.locator('#view-1').screenshot({ path:info.outputPath('restored-structure.png') });
    await activate(activity.locator('.dsl-choice').last()); await page.mouse.move(0, 0);
    expect(await style(activity.locator('.dsl-choice').last())).toEqual(original.incorrect);
    expect(await style(activity.locator('.dsl-feedback'))).toEqual(original.errorFeedback);
    await expect(page.locator('#next-section')).toBeEnabled();
    await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden(); await visit(page, false);
    await expect(activity.locator('.dsl-choice').last()).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#next-section')).toBeEnabled();
  });
}
