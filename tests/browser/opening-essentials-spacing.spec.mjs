// MIT. Opening Clarifications panel only; no full lesson or unrelated stage tests.
import { test, expect } from '@playwright/test';
import { ready, navigate } from '../helpers/legacy-journeys.mjs';
import { original } from '../helpers/baseline-source.mjs';

const raw = JSON.stringify({ completed: [0, 1, 2], data: {} });
const source = original('opening.html').toString();
const settle = page => page.evaluate(async () => {
  await document.fonts.ready;
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});

for (const mount of ['/', '/discussion-skills-lab/']) {
  test(`${mount} Opening essentials align with compact original row spacing at desktop/mobile/enlarged text`, async ({ page }, info) => {
    await page.goto('/');
    await page.evaluate(raw => localStorage.setItem('dsl:opening-stage:v1', raw), raw);
    await page.goto(`${mount}opening.html`); await ready(page); await navigate(page, 3);
    // Exact source composition/content is independent of loading Tailwind on a
    // second live replay page. No external response, font or stylesheet is mocked.
    const expected = await page.evaluate(source => {
      const doc = new DOMParser().parseFromString(source, 'text/html');
      const panel = doc.querySelector('#view-3 .card.soft'), grid = panel.querySelector('.grid');
      return { heading: panel.querySelector('h3').textContent, classes: grid.className,
        labels: [...grid.querySelectorAll('p')].map(p => p.textContent) };
    }, source);
    expect(expected.classes).toBe('grid sm:grid-cols-2 gap-3');
    const panel = page.locator('#view-3 .dsl-tone-soft');
    const grid = panel.locator(':scope > .dsl-layout-two-column');
    async function assertLayout(width, enlarged = false) {
      await page.setViewportSize({ width, height: 1000 }); await settle(page);
      await expect(panel.getByRole('heading', { name: expected.heading, exact: true })).toBeVisible();
      await expect(grid.locator('p').filter({ hasText: /^✓ / })).toHaveText(expected.labels);
      const geometry = await grid.evaluate(n => {
        const origin = n.getBoundingClientRect(), style = getComputedStyle(n);
        return { gap: parseFloat(style.rowGap), columns: style.gridTemplateColumns.split(' ').length, width: origin.width,
          margins: [...n.children].map(child => parseFloat(getComputedStyle(child).marginTop)),
          items: [...n.querySelectorAll('p')].filter(p => p.textContent.startsWith('✓ ')).map(p => {
            const rect = p.getBoundingClientRect(); return { top: rect.top - origin.top, bottom: rect.bottom - origin.top, left: rect.left - origin.left };
          }) };
      });
      // Original gap-3 is 12px at normal text size. Keep one deliberate grid gap,
      // not additional prose margins on individual cells or their paragraphs.
      expect(geometry.gap).toBe(12);
      expect(geometry.columns).toBe(width >= 640 ? 2 : 1);
      expect(geometry.margins).toEqual([0, 0, 0, 0]);
      geometry.items.forEach((item, i) => {
        const column = i % geometry.columns, row = Math.floor(i / geometry.columns);
        const above = geometry.items.slice((row - 1) * geometry.columns, row * geometry.columns);
        const top = row ? Math.max(...above.map(p => p.bottom)) + 12 : 0;
        // CSS grid tracks can round to the native 1/64px layout quantum.
        expect(Math.abs(item.top - top), `${width}px checkmark ${i + 1} row alignment/spacing`).toBeLessThanOrEqual(1 / 64);
        expect(Math.abs(item.left - (column ? (geometry.width + 12) / 2 : 0)), `${width}px checkmark ${i + 1} column alignment`).toBeLessThanOrEqual(1 / 64);
      });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
      if ([1440, 390].includes(width) || enlarged) await info.attach(`current-essentials-${width}${enlarged ? '-enlarged' : ''}`, { body: await panel.screenshot(), contentType: 'image/png' });
    }
    for (const width of [1440, 940, 780, 640, 639, 390]) await assertLayout(width);
    await page.addStyleTag({ content: 'html { font-size:200% !important; }' }); await assertLayout(320, true);
    expect(await page.evaluate(() => localStorage.getItem('dsl:opening-stage:v1'))).toBe(raw);
    await expect(page.locator('#next-section')).toBeDisabled();
  });
}
