// MIT. Actual Opening URL vs immutable source; content/policy checks are separate.
import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { ready, navigate } from '../helpers/legacy-journeys.mjs';
const completed = JSON.parse(readFileSync(new URL('../fixtures/progress/opening/completed.json', import.meta.url))).raw;
const settle = page => page.evaluate(async () => { await document.fonts.ready; await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))); });
const paint = async locator => locator.evaluateAll(nodes => nodes.map(n => {
  const s = getComputedStyle(n); return Object.fromEntries(['display', 'backgroundColor', 'borderTopWidth', 'borderTopColor', 'borderRadius', 'paddingTop', 'paddingLeft', 'fontFamily', 'fontSize', 'fontWeight'].map(p => [p, s[p]]));
}));
const compareNumbers = (actual, expected) => {
  for (const p of Object.keys(expected)) if (['paddingTop', 'paddingLeft', 'fontSize', 'borderRadius', 'borderTopWidth'].includes(p)) expect(parseFloat(actual[p]), p).toBeCloseTo(parseFloat(expected[p]), 4); else expect(actual[p], p).toBe(expected[p]);
};
for (const mount of ['/', '/discussion-skills-lab/']) for (const width of [1440, 780, 390]) {
  test(`${mount} Opening every section/state original-current presentation at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 1000 }); await page.goto('/');
    const originals = [];
    for (const prefix of ['/__original', '']) {
      await page.evaluate(raw => localStorage.setItem('dsl:opening-stage:v1', raw), completed);
      await page.goto(`${prefix}${mount}opening.html`); await ready(page); await settle(page);
      const observations = [];
      for (let i = 0; i < 8; i++) {
        await navigate(page, i); await settle(page);
        const view = page.locator(`#view-${i}`);
        const surfaces = view.locator(prefix ? '.card' : '.dsl-tone-activity,.dsl-tone-soft,.dsl-sequence-opening-knowledge-check .dsl-question,.dsl-quiz-summary,.card');
        const initial = await paint(surfaces);
        if (prefix) observations.push(initial);
        else {
          expect(initial, `section ${i} all original card surfaces`).toHaveLength(originals[i].length);
          initial.forEach((style, n) => {
            // Font family/size in composite containers are inherited, all preserved.
            compareNumbers(style, originals[i][n]);
          });
          if (i < 7) {
            const style = await view.locator(':scope > h2').evaluate(n => { const s = getComputedStyle(n); return { size: parseFloat(s.fontSize), weight: s.fontWeight, family: s.fontFamily, leading: parseFloat(s.lineHeight), tracking: parseFloat(s.letterSpacing) }; });
            expect(style.size).toBeCloseTo(Math.max(29.6, Math.min(width * .034, 41.6)), 3); expect(style.weight).toBe('700'); expect(style.family).toContain('Fraunces');
            expect(style.leading / style.size).toBeCloseTo(1.17, 3); expect(style.tracking / style.size).toBeCloseTo(-.035, 3);
          }
        }
        await info.attach(`${prefix ? 'original' : 'current'}-${width}-section-${i}-initial`, { body: await view.screenshot(), contentType: 'image/png' });
        if (i === 0) {
          const choices = view.locator(prefix ? '.classify-answer' : '.dsl-choice');
          await choices.nth(1).click();
          if (!prefix) await expect(choices.nth(1)).toHaveClass(/dsl-selected-incorrect/);
          await choices.first().click(); if (!prefix) await expect(choices.first()).toHaveClass(/dsl-selected-correct/);
          await view.locator('#classify-next').click(); await expect(view.locator('#classify-counter')).toHaveText('STATEMENT 2 OF 5');
        }
        if (i === 1) {
          if (prefix) observations[1].timelineClosed = await paint(view.locator('.timeline-toggle'));
          else (await paint(view.locator('.timeline-toggle'))).forEach((style, n) => compareNumbers(style, originals[1].timelineClosed[n]));
          for (let n = 1; n <= 6; n++) { const control = view.locator(`[aria-controls="stage-${n}"]`); await control.click(); await expect(control).toHaveAttribute('aria-expanded', 'true'); await expect(view.locator(`#stage-${n}`)).toBeVisible(); }
          if (prefix) observations[1].timelineOpen = await paint(view.locator('.timeline-toggle'));
          else (await paint(view.locator('.timeline-toggle'))).forEach((style, n) => compareNumbers(style, originals[1].timelineOpen[n]));
          const checkpoint = view.locator('.sequence-choices button');
          for (const n of [0, 1, 2]) await checkpoint.nth(n).click();
          if (!prefix) { await expect(checkpoint.nth(2)).toHaveClass(/dsl-selected-incorrect/); await expect(view.locator('.dsl-panel-explored')).toHaveCount(6); }
          await info.attach(`${prefix ? 'original' : 'current'}-${width}-timeline-expanded`, { body: await view.screenshot(), contentType: 'image/png' });
        }
        if (i === 2) {
          if (prefix) observations[2].tabs = await paint(view.locator('.analysis-tab'));
          else (await paint(view.locator('.analysis-tab'))).forEach((style, n) => compareNumbers(style, originals[2].tabs[n]));
          for (const kind of ['who', 'what', 'how', 'where', 'terms']) {
            const tab = view.locator(`.analysis-tab[data-kind="${kind}"]`); await tab.click(); await expect(tab).toHaveAttribute('aria-selected', 'true');
            expect(await tab.evaluate(n => getComputedStyle(n).backgroundColor)).toBe('rgb(20, 43, 73)');
            expect(await view.locator('.task-mark.on').evaluateAll(nodes => nodes.map(n => n.dataset.kind))).toEqual({ who: ['who'], what: ['what'], how: ['how', 'how'], where: ['where', 'where'], terms: ['who', 'what'] }[kind]);
            await info.attach(`${prefix ? 'original' : 'current'}-${width}-analysis-${kind}`, { body: await view.screenshot(), contentType: 'image/png' });
          }
        }
        if ([2, 3, 5].includes(i)) {
          const holder = view.locator(`#${{ 2: 'what-how', 3: 'clarification', 5: 'research' }[i]}-options button`);
          for (const n of [0, i === 2 ? 0 : i === 3 ? 1 : 2, i === 2 ? 1 : 0]) await holder.nth(n).click();
          await info.attach(`${prefix ? 'original' : 'current'}-${width}-decision-${i}-wrong-after-credit`, { body: await view.screenshot(), contentType: 'image/png' });
        }
        if (i === 4) {
          await view.locator('#show-model').click(); await expect(view.locator('#model-answer')).toBeVisible();
          await info.attach(`${prefix ? 'original' : 'current'}-${width}-builder-model`, { body: await view.screenshot(), contentType: 'image/png' });
          await view.locator('#show-model').click(); await expect(view.locator('#model-answer')).toBeHidden();
        }
        if (i === 6) {
          await view.locator('#quiz-list article').first().locator('button').first().click();
          await expect(view.locator('#quiz-score')).toHaveText('Knowledge check: 5 of 5 correct.');
          await info.attach(`${prefix ? 'original' : 'current'}-${width}-quiz-wrong-after-credit`, { body: await view.screenshot(), contentType: 'image/png' });
        }
        const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
        expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client + 1);
      }
      if (prefix) originals.push(...observations);
    }
  });
}

for (const mount of ['/', '/discussion-skills-lab/']) test(`${mount} Opening 320px enlarged text/reduced motion all titles, activities and print`, async ({ page, browserName }, info) => {
  await page.setViewportSize({ width: 320, height: 900 }); await page.emulateMedia({ reducedMotion: 'reduce' }); await page.goto('/');
  await page.evaluate(raw => localStorage.setItem('dsl:opening-stage:v1', raw), completed); await page.goto(`${mount}opening.html`); await ready(page);
  await page.addStyleTag({ content: 'html { font-size:200% !important; }' });
  for (let i = 0; i < 8; i++) {
    await navigate(page, i); await settle(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
    const clipped = await page.locator(`#view-${i} button,#view-${i} input,#view-${i} textarea`).evaluateAll(nodes => nodes.filter(n => n.getClientRects().length && n.scrollWidth > n.clientWidth + 1).map(n => n.id || n.className));
    // Text inputs intentionally horizontally scroll editable student text.
    expect(clipped.filter(id => !['problem-input', 'accomplishment-input'].includes(id))).toEqual([]);
  }
  await page.addStyleTag({ content: 'html { font-size:100% !important; }' }); await navigate(page, 0); await page.emulateMedia({ media: 'print' });
  await expect(page.locator('#view-7')).toBeVisible(); await expect(page.locator('#view-0')).toBeHidden();
  for (const control of await page.locator('button,input,textarea,select').all()) await expect(control).toBeHidden();
  await expect(page.locator('.opening-reference-group')).toHaveCount(4); await expect(page.locator('.opening-reference-1 li')).toHaveCount(6);
  if (browserName === 'chromium') {
    const path = info.outputPath('opening-reference.pdf'); await page.pdf({ path, format: 'Letter', printBackground: true, preferCSSPageSize: true }); await info.attach('Opening reference PDF', { path, contentType: 'application/pdf' });
  }
});
