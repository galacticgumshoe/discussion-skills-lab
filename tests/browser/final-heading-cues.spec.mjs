// Owner-approved visual exceptions; scoped to Final, with no shared-code changes.
import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { finalVisit as visit } from '../helpers/final-journey.mjs';
const map = JSON.parse(readFileSync(new URL('../fixtures/legacy-maps/final.json', import.meta.url)));
const raw = JSON.parse(readFileSync(new URL('../fixtures/progress/final/completed.json', import.meta.url))).raw;
const settle = page => page.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {})));
});
const load = async (page, mount, record = raw) => {
  await page.goto(mount); await page.evaluate(raw => localStorage.setItem('dsl:final:v1', raw), record);
  await page.goto(`${mount}final.html`); await expect(page.locator('#lesson-status')).toBeHidden();
  await expect(page.locator('[data-content-status]').filter({ visible: true })).toHaveCount(0);
  await expect(page.locator('[data-reference-print]')).toBeEnabled();
};
const metrics = locator => locator.evaluate(node => {
  const style = getComputedStyle(node);
  return { size: parseFloat(style.fontSize), weight: style.fontWeight, family: style.fontFamily,
    line: parseFloat(style.lineHeight), spacing: parseFloat(style.letterSpacing), scrollWidth: node.scrollWidth, clientWidth: node.clientWidth,
    scrollHeight: node.scrollHeight, clientHeight: node.clientHeight, overflowY: style.overflowY, maxHeight: style.maxHeight,
    // Fraunces ink can exceed a 1.2 line box (Firefox: 40px ink / 38px box).
    // That is not clipping when height grows naturally and overflow stays visible.
    fits: node.scrollWidth <= node.clientWidth + 1 && style.overflowY === 'visible' && style.maxHeight === 'none' };
});
for (const mount of ['/', '/discussion-skills-lab/']) {
  test(`${mount} Final approved Middle heading profiles on all nine lesson pages; narrow/enlarged wrapping and reference print isolation`, async ({ page, browserName }, info) => {
    await load(page, mount);
    for (const width of [1440, 780, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      await visit(page, 'welcome'); await settle(page);
      const welcome = await metrics(page.locator('#view-0 > h1'));
      expect(welcome.size).toBeCloseTo(Math.max(36, Math.min(width * .05, 57.6)), 1);
      for (const [index, id] of map.sections.slice(0, -1).entries()) {
        await visit(page, id);
        const heading = page.locator(`#view-${index} > h1,#view-${index} > h2`), actual = await metrics(heading);
        expect(actual.size, id).toBeCloseTo(index === 0 ? welcome.size : Math.max(29.6, Math.min(width * .034, 41.6)), 1); expect(actual.weight, id).toBe('700');
        expect(actual.family, id).toBe(welcome.family); expect(actual.family).toContain('Fraunces');
        expect(actual.line / actual.size).toBeCloseTo(1.17, 3); expect(actual.spacing / actual.size).toBeCloseTo(-.035, 3);
        expect(actual.fits, `${id} at ${width}px: ${JSON.stringify(actual)}`).toBe(true);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), id).toBe(true);
      }
    }
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    for (let index = 0; index < 9; index++) {
      await visit(page, map.sections[index]);
      const heading = await metrics(page.locator(`#view-${index} > h1,#view-${index} > h2`));
      expect(heading.size).toBeCloseTo(index === 0 ? 72 : 59.2, 1); expect(heading.fits, map.sections[index]).toBe(true);
    }
    await page.evaluate(() => { document.documentElement.style.fontSize = ''; });
    await visit(page, 'summary-synthesis');
    expect((await metrics(page.locator('[data-activity-id="summary-synthesis-questions"] .dsl-sequence-heading'))).size).toBe(16);
    await visit(page, 'quick-reference');
    expect((await metrics(page.locator('#reference-title'))).size).toBe(24);
    await visit(page, 'summary-synthesis'); await settle(page);
    await page.screenshot({ path: info.outputPath('final-numbered-title-320.png'), fullPage: true });
    await info.attach('final-numbered-title-320', { path: info.outputPath('final-numbered-title-320.png'), contentType: 'image/png' });
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('#view-9')).toBeVisible();
    for (let index = 0; index < 9; index++) await expect(page.locator(`#view-${index}`)).toBeHidden();
    for (const button of await page.locator('button').all()) await expect(button).toBeHidden();
    if (browserName === 'chromium') {
      await page.pdf({ path: info.outputPath('final-heading-change-reference.pdf'), format: 'Letter', printBackground: true });
      await info.attach('final-heading-change-reference', { path: info.outputPath('final-heading-change-reference.pdf'), contentType: 'application/pdf' });
    }
  });
  test(`${mount} Final approved front-face explored cue on all eight cards; keyboard flip-back, reload and unclipped labels`, async ({ page }, info) => {
    const record = JSON.parse(raw); record.data.finalState.flips = {};
    await load(page, mount, JSON.stringify(record));
    await page.setViewportSize({ width: 320, height: 1000 });
    for (const [index, ids] of Object.entries(map.flips)) {
      await visit(page, map.sections[index]);
      for (const id of ids) {
        const card = page.locator(`#view-${index} [data-card-id="${id}"]`);
        const frontStyle = await card.locator('.dsl-card-front').evaluate(node => {
          const s = getComputedStyle(node);
          return { weight: s.fontWeight, size: s.fontSize, line: parseFloat(s.lineHeight), padding: [s.paddingTop, s.paddingRight, s.paddingBottom, s.paddingLeft].map(parseFloat), radius: s.borderRadius, background: s.backgroundColor, color: s.color };
        });
        expect(frontStyle).toMatchObject({ weight: '400', size: '16px', radius: '15px', background: 'rgb(255, 255, 255)', color: 'rgb(20, 43, 73)' });
        // WebKit serializes 24.8 as 24.799999; compare below 0.0001px,
        // retaining the measured Middle values rather than testing CSS strings.
        expect(frontStyle.line).toBeCloseTo(24.8, 4);
        frontStyle.padding.forEach((value, i) => expect(value).toBeCloseTo([65.6, 20, 65.6, 20][i], 4));
        await expect(card.locator('.dsl-card-explored')).toBeHidden();
        await card.focus(); await card.press('Enter'); await settle(page);
        await expect(card).toBeFocused(); await expect(card).toHaveAttribute('aria-pressed', 'true');
        await expect(card.locator('.dsl-card-front')).toHaveAttribute('aria-hidden', 'true');
        await expect(card.locator('.dsl-card-back .dsl-card-explored')).toHaveText('✓ Explored');
        await expect(card.locator('.dsl-card-back .dsl-card-explored')).toBeVisible();
        await card.press('Space'); await settle(page);
        await expect(card).toBeFocused(); await expect(card).toHaveAttribute('aria-pressed', 'false');
        await expect(card.locator('.dsl-card-back')).toHaveAttribute('aria-hidden', 'true');
        const cue = card.locator('.dsl-card-front > .dsl-card-explored');
        await expect(cue).toHaveText('✓ Explored'); await expect(cue).toBeVisible();
        await expect(card.locator('.dsl-card-hint')).toBeVisible();
        const fits = await card.evaluate(card => {
          const front = card.querySelector('.dsl-card-front'), cue = front.querySelector('.dsl-card-explored'), hint = front.querySelector('.dsl-card-hint');
          const a = cue.getBoundingClientRect(), b = hint.getBoundingClientRect(), face = front.getBoundingClientRect();
          return { color: getComputedStyle(cue).color, inside: a.left >= face.left && a.right <= face.right + 1 && a.bottom <= face.bottom + 1,
            separate: a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top, unclipped: card.scrollHeight <= card.clientHeight + 2 };
        });
        expect(fits).toEqual({ color: 'rgb(8, 127, 131)', inside: true, separate: true, unclipped: true });
      }
    }
    await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden();
    for (const [index, ids] of Object.entries(map.flips)) {
      await visit(page, map.sections[index]);
      for (const id of ids) {
        const card = page.locator(`#view-${index} [data-card-id="${id}"]`);
        await expect(card).toHaveAttribute('aria-pressed', 'false');
        await expect(card.locator('.dsl-card-front > .dsl-card-explored')).toBeVisible();
      }
    }
    await page.screenshot({ path: info.outputPath('final-front-explored-320.png'), fullPage: true });
    await info.attach('final-front-explored-320', { path: info.outputPath('final-front-explored-320.png'), contentType: 'image/png' });
  });
}
