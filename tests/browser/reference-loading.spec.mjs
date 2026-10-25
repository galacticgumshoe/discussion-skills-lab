import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { original } from '../helpers/baseline-source.mjs';
import { referenceInventory } from '../helpers/final-reference.mjs';
import { navigate, ready } from '../helpers/legacy-journeys.mjs';
const fixture = JSON.parse(readFileSync(new URL('../fixtures/progress/final/partial-first.json', import.meta.url)));

for (const mount of ['/', '/discussion-skills-lab/']) {
  test(`${mount} reference data equals sealed inline text/emphasis and preloads with zero credit`, async ({ page }, info) => {
    const requests = [];
    page.on('request', request => { if (request.url().includes('/content/')) requests.push(new URL(request.url()).pathname); });
    await page.goto(`${mount}final.html`);
    await expect(page.locator('#ref-print')).toBeEnabled();
    const comparison = await page.evaluate(({ source, inventory }) => {
      const baseline = new DOMParser().parseFromString(source, 'text/html');
      const describe = (0, eval)(`(${inventory})`);
      return { original: describe(baseline), current: describe(document) };
    }, { source: original('final.html').toString(), inventory: referenceInventory.toString() });
    expect(comparison.current).toEqual(comparison.original);
    expect(comparison.current).toHaveLength(5);
    expect(requests.sort()).toEqual(['reference.json', 'summary-synthesis.md', 'synthesis-framework.md', 'effective-summaries.md', 'consensus-task.md', 'after-round.md'].map(file => `${mount}content/final/reference/${file}`).sort());
    expect(await page.locator('#view-0').isVisible()).toBe(true);
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('dsl:final:v1')).completed)).toEqual([]);
    await navigate(page, 9);
    await expect(page.locator('#reference-status')).toBeHidden();
    await expect(page.locator('#reference-title')).toHaveText('Final Stage Quick Reference');
    await expect(page.locator('#ref-print')).toHaveCount(1);
    expect(await page.locator('#ref-print').evaluate(node => node.onclick.toString())).toContain('window.print()');
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: info.outputPath('final-reference.png'), fullPage: true });
    await info.attach('semantic equivalence', { body: JSON.stringify(comparison, null, 2), contentType: 'application/json' });
  });

  test(`${mount} immediate navigation, failed body, retry, print notice and no loader storage writes`, async ({ page }) => {
    await page.addInitScript(raw => {
      localStorage.setItem('dsl:final:v1', raw);
      const originalSet = Storage.prototype.setItem;
      window.storageWrites = [];
      Storage.prototype.setItem = function (...args) { window.storageWrites.push(args); return originalSet.apply(this, args); };
    }, fixture.raw);
    let release;
    const gate = new Promise(resolve => { release = resolve; });
    let fail = true;
    await page.route('**/content/final/reference/reference.json', async route => { await gate; await route.continue(); });
    await page.route('**/summary-synthesis.md', route => fail ? route.fulfill({ status: 404, body: 'missing' }) : route.continue());
    await page.goto(`${mount}final.html`, { waitUntil: 'domcontentloaded' }); await ready(page);
    const before = await page.evaluate(() => ({ raw: localStorage.getItem('dsl:final:v1'), writes: window.storageWrites.length }));
    await navigate(page, 9);
    await expect(page.locator('#ref-print')).toBeDisabled();
    await expect(page.locator('#reference-status')).toContainText('loading');
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('#reference-status')).toBeVisible();
    await expect(page.locator('#view-0')).toBeHidden();
    await page.emulateMedia({ media: 'screen' });
    release();
    await expect(page.locator('#reference-status')).toContainText('HTTP 404');
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('#reference-status')).toBeVisible();
    await expect(page.locator('#view-0')).toBeHidden();
    await page.emulateMedia({ media: 'screen' });
    await expect(page.locator('#reference-retry')).toBeVisible();
    await navigate(page, 0);
    await expect(page.locator('#view-0 .flip').first()).toBeEnabled();
    await navigate(page, 9);
    fail = false;
    await page.locator('#reference-retry').click();
    await expect(page.locator('#ref-print')).toBeEnabled();
    expect(await page.evaluate(() => ({ raw: localStorage.getItem('dsl:final:v1'), writes: window.storageWrites.length }))).toEqual(before);
    await page.evaluate(() => { window.printCalls = 0; window.print = () => window.printCalls++; });
    await page.locator('#ref-print').click();
    expect(await page.evaluate(() => window.printCalls)).toBe(1);
  });
}

test('new reference dependencies need no external network, npm or runtime CDN', async ({ page }) => {
  await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
  await page.goto('/discussion-skills-lab/final.html');
  await expect(page.locator('#ref-print')).toBeEnabled();
  await expect(page.locator('#ref-content article')).toHaveCount(5);
});

for (const failure of ['invalid-json', 'invalid-shape', 'network']) {
  test(`reference ${failure} fails closed and is retryable`, async ({ page }) => {
    let fail = true;
    await page.route('**/content/final/reference/reference.json', route => {
      if (!fail) return route.continue();
      if (failure === 'network') return route.abort();
      return route.fulfill({ contentType: 'application/json', body: failure === 'invalid-json' ? '{ student-secret' : '{"schemaVersion":99}' });
    });
    await page.goto('/final.html');
    await navigate(page, 9);
    await expect(page.locator('#reference-status')).toContainText('could not load');
    await expect(page.locator('#reference-status')).not.toContainText('student-secret');
    await expect(page.locator('#ref-print')).toBeDisabled();
    await expect(page.locator('#ref-content article')).toHaveCount(0);
    fail = false;
    await page.locator('#reference-retry').click();
    await expect(page.locator('#ref-print')).toBeEnabled();
  });
}
