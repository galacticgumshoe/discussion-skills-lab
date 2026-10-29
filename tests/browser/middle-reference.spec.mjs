import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { middleReferenceInventory } from '../helpers/middle-reference.mjs';
import { navigate } from '../helpers/legacy-journeys.mjs';

const source = readFileSync(new URL('../fixtures/content/source/middle.html', import.meta.url), 'utf8');
for (const prefix of ['', '/discussion-skills-lab']) {
  const url = `${prefix}/middle.html`;
  test(`${prefix || 'root'}: Middle Print is a prominent button above the reference title on desktop and mobile`, async ({ page }, info) => {
    await page.addInitScript(() => { window.referencePrintCalls = 0; window.print = () => window.referencePrintCalls++; });
    await page.goto(url);
    const print = page.locator('[data-reference-print]');
    await expect(print).toBeEnabled(); await expect(page.locator('#lesson-status')).toBeHidden();
    await navigate(page, 8);
    await expect(print).toHaveRole('button'); await expect(print).toHaveAccessibleName('Print quick reference');
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await expect(print).toHaveCSS('background-color', 'rgb(234, 245, 251)');
      await expect(print).toHaveCSS('border-top-style', 'solid');
      await expect(print).toHaveCSS('border-top-width', '1px');
      await expect(print).toHaveCSS('border-radius', '12px');
      await expect(print).toHaveCSS('font-weight', '700');
      expect(await print.evaluate(node => parseFloat(getComputedStyle(node).fontSize))).toBeGreaterThanOrEqual(16);
      const button = await print.boundingBox(), title = await page.locator('#reference-title').boundingBox();
      expect(button.height).toBeGreaterThanOrEqual(44);
      expect(button.y + button.height).toBeLessThanOrEqual(title.y);
      expect(Math.abs(button.x - title.x)).toBeLessThanOrEqual(1);
      expect(button.x).toBeGreaterThanOrEqual(0); expect(button.x + button.width).toBeLessThanOrEqual(width);
      await print.focus(); await print.press('Enter'); await expect(print).toBeFocused();
      if (info.project.name === 'chromium') await info.attach(`Middle reference button ${width}px`, { body: await page.locator('[data-view-role="reference"]').screenshot(), contentType: 'image/png' });
    }
    expect(await page.evaluate(() => window.referencePrintCalls)).toBe(2);
    expect(await page.evaluate(() => localStorage.getItem('dsl:middle:v1'))).toBeNull();
    await page.emulateMedia({ media: 'print' }); await expect(print).toBeHidden();
    await expect(page.locator('#reference-title')).toBeVisible();
  });
  test(`${prefix || 'root'}: extracted Middle reference preserves every source item/list/emphasis/class and preloads without progress`, async ({ page }) => {
    const errors = [], requests = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => { if (request.url().includes('/content/middle/reference/')) requests.push(new URL(request.url()).pathname); });
    await page.addInitScript(() => {
      window.middleReferenceWrites = 0;
      const set = Storage.prototype.setItem;
      Storage.prototype.setItem = function(...args) { window.middleReferenceWrites++; return set.apply(this, args); };
    });
    await page.goto(url);
    await expect(page.locator('[data-reference-print]')).toBeEnabled();
    await expect(page.locator('#lesson-status')).toBeHidden();
    await expect(page.locator('[data-reference-print]')).toHaveCount(1);
    expect(requests).toHaveLength(6);
    expect(requests.every(path => path.startsWith(`${prefix}/content/middle/reference/`))).toBe(true);
    const expected = await page.evaluate(({ source, inventory }) => {
      const doc = new DOMParser().parseFromString(source, 'text/html');
      return (0, eval)(`(${inventory})`)(doc.querySelector('#reference-content'));
    }, { source, inventory: middleReferenceInventory.toString() });
    const actual = await page.locator('[data-reference-content]').evaluate(middleReferenceInventory);
    expect(actual).toEqual(expected);
    expect(actual).toHaveLength(5);
    expect(actual.flatMap(item => item.lists.flat())).toHaveLength(18);
    await expect(page.locator('#view-0')).toBeVisible();
    expect(await page.evaluate(() => ({ writes: window.middleReferenceWrites, raw: localStorage.getItem('dsl:middle:v1'), engine: typeof window.DSL }))).toEqual({ writes: 0, raw: null, engine: 'undefined' });
    await navigate(page, 8);
    await expect(page.locator('[data-reference-print]')).toBeEnabled();
    expect(errors).toEqual([]);
  });

  test(`${prefix || 'root'}: Middle reference failure/retry stays independent and never writes progress`, async ({ page }) => {
    let fail = true;
    await page.route('**/content/middle/reference/support-group.md', route => fail ? route.fulfill({ status: 503, body: 'Test failure' }) : route.continue());
    await page.goto(url);
    await expect(page.locator('#lesson-status')).toBeHidden();
    await navigate(page, 8);
    await expect(page.locator('[data-reference-status]')).toContainText('Quick Reference could not load');
    await expect(page.locator('[data-reference-print]')).toBeDisabled();
    await expect(page.locator('.middle-reference-item')).toHaveCount(0);
    expect(await page.evaluate(() => localStorage.getItem('dsl:middle:v1'))).toBeNull();
    fail = false;
    await page.locator('[data-reference-retry]').click();
    await expect(page.locator('[data-reference-status]')).toBeHidden();
    await expect(page.locator('.middle-reference-item')).toHaveCount(5);
    await expect(page.locator('[data-reference-print]')).toBeEnabled();
    expect(await page.evaluate(() => localStorage.getItem('dsl:middle:v1'))).toBeNull();
  });

  test(`${prefix || 'root'}: Middle reference alone prints from ordinary/fresh and reference views`, async ({ page, browserName }, info) => {
    await page.goto(url);
    await expect(page.locator('[data-reference-print]')).toBeEnabled();
    await expect(page.locator('#lesson-status')).toBeHidden();
    for (const view of ['ordinary', 'reference']) {
      if (view === 'reference') await navigate(page, 8);
      await page.emulateMedia({ media: 'print' });
      await expect(page.locator('#view-8')).toBeVisible();
      await expect(page.locator('#view-0')).toBeHidden();
      await expect(page.locator('[data-reference-print]')).toBeHidden();
      await expect(page.locator('.middle-reference-item')).toHaveCount(5);
      if (browserName === 'chromium') {
        const path = info.outputPath(`middle-${view}-reference.pdf`);
        await page.pdf({ path, format: 'Letter', printBackground: true, preferCSSPageSize: true });
        await info.attach(`Middle ${view} reference PDF`, { path, contentType: 'application/pdf' });
      }
      await page.emulateMedia({ media: 'screen' });
    }
  });
}
