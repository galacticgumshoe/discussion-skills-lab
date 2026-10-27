import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const settle = page => page.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {})));
});

for (const mount of ['/', '/discussion-skills-lab/']) test(`${mount} all Middle front/back faces and internal cues fit narrow enlarged text without overlap`, async ({ page }, info) => {
  const fixture = JSON.parse(readFileSync(new URL('../fixtures/progress/middle/completed.json', import.meta.url)));
  await page.goto(mount);
  await page.evaluate(raw => localStorage.setItem('dsl:middle:v1', raw), fixture.raw);
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto(`${mount}middle.html`); await expect(page.locator('#lesson-status')).toBeHidden();
  await page.locator('#views').evaluate(node => { node.style.fontSize = '200%'; });
  for (const id of ['welcome', 'structure-substance', 'evidence', 'speaking-conflicts']) {
    await page.locator('#section-select').selectOption(id); await settle(page);
    const cards = page.locator('.lesson-view:not([hidden]) .dsl-card');
    for (const card of await cards.all()) {
      const metrics = await card.evaluate(card => {
        const copy = card.querySelector('.dsl-card-front .dsl-card-content').getBoundingClientRect();
        const hint = card.querySelector('.dsl-card-hint').getBoundingClientRect();
        const mark = card.querySelector('.dsl-card-explored').getBoundingClientRect();
        return { contentBottom: copy.bottom, footerTop: Math.min(hint.top, mark.top), cueRight: mark.right, hintLeft: hint.left };
      });
      expect(metrics.contentBottom).toBeLessThanOrEqual(metrics.footerTop);
      expect(metrics.cueRight).toBeLessThanOrEqual(metrics.hintLeft);
      await activate(card); await settle(page);
      const overflow = await card.locator('.dsl-card-face,.dsl-card-copy').evaluateAll(nodes => nodes.filter(node => node.scrollWidth > node.clientWidth + 1 || node.scrollHeight > node.clientHeight + 1).map(node => node.textContent));
      expect(overflow).toEqual([]);
    }
    await page.locator('.lesson-view:not([hidden]) .dsl-flashcards').screenshot({ path: info.outputPath(`${id}-backs-320-enlarged.png`) });
  }
});
const activate = async locator => { await locator.focus(); await locator.press('Enter'); };

for (const mount of ['/', '/discussion-skills-lab/']) test(`${mount} Middle cards retain original typography, compact lists, centered fronts and internal explored cues`, async ({ page }, info) => {
  await page.goto(`/__original${mount}middle.html`);
  await expect(page.locator('#rail-links [data-go="0"]')).toBeEnabled(); await settle(page);
  const original = await page.locator('#view-0 .flip-card').evaluateAll(cards => cards.map(card => {
    const front = card.querySelector('.flip-front h3'), item = card.querySelector('.flip-back li');
    const read = node => { const style = getComputedStyle(node); return { family: style.fontFamily, size: style.fontSize, weight: style.fontWeight, lineHeight: style.lineHeight }; };
    return { front: read(front), item: read(item), height: card.getBoundingClientRect().height };
  }));
  await activate(page.locator('#view-0 .flip-card').first());
  await activate(page.locator('#view-0 .flip-card').nth(2)); await settle(page);
  await page.locator('#view-0 .grid3').screenshot({ path: info.outputPath('original-welcome-cards.png') });

  await page.goto(`${mount}middle.html`);
  await expect(page.locator('#lesson-status')).toBeHidden(); await settle(page);
  const cards = page.locator('[data-activity-id="welcome-cards"] .dsl-card');
  const current = await cards.evaluateAll(cards => cards.map(card => {
    const front = card.querySelector('.dsl-card-front .dsl-prose-h3'), item = card.querySelector('.dsl-card-back [role="listitem"]');
    const read = node => { const style = getComputedStyle(node); return { family: style.fontFamily, size: style.fontSize, weight: style.fontWeight, lineHeight: style.lineHeight }; };
    const face = card.querySelector('.dsl-card-front').getBoundingClientRect(), copy = front.getBoundingClientRect();
    return { front: read(front), item: read(item), height: card.getBoundingClientRect().height,
      centerDifference: Math.abs(copy.top + copy.height / 2 - face.top - face.height / 2) };
  }));
  for (const [index, value] of current.entries()) {
    expect(value.front).toEqual(original[index].front);
    expect(value.item).toEqual(original[index].item);
    expect(value.height).toBeCloseTo(original[index].height, 0);
    expect(value.centerDifference).toBeLessThan(2);
  }
  await activate(cards.first()); await activate(cards.nth(2)); await settle(page);
  const metrics = await cards.nth(2).evaluate(card => {
    const items = [...card.querySelectorAll('[role="listitem"]')].map(node => node.getBoundingClientRect());
    const mark = card.querySelector('.dsl-card-explored').getBoundingClientRect(), face = card.querySelector('.dsl-card-back').getBoundingClientRect();
    return { rowGaps: items.slice(1).map((rect, i) => rect.top - items[i].bottom),
      markInside: mark.left >= face.left && mark.right <= face.right && mark.top >= face.top && mark.bottom <= face.bottom,
      markGap: mark.top - items.at(-1).bottom };
  });
  expect(metrics.rowGaps.every(gap => Math.abs(gap) < 1)).toBe(true);
  expect(metrics.markInside).toBe(true);
  expect(metrics.markGap).toBeGreaterThanOrEqual(11);
  expect(metrics.markGap).toBeLessThanOrEqual(14);
  await page.locator('[data-activity-id="welcome-cards"]').screenshot({ path: info.outputPath('restored-welcome-cards.png') });
  const label = await cards.first().getAttribute('aria-label');
  await activate(cards.first()); await settle(page);
  await expect(cards.first().locator('.dsl-card-explored')).toBeVisible();
  await expect(cards.first().locator('.dsl-card-front > .dsl-card-explored')).toHaveCount(1);
  expect(await cards.first().getAttribute('aria-label')).not.toContain('Explored');
  expect(label).not.toContain('Explored');
  await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden();
  await expect(cards.first().locator('.dsl-card-explored')).toBeVisible();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('dsl:middle:v1')).data.middleState.sets.flipped.welcome)).toContain(0);
});
