// MIT. Exercise the actual public entries, never intercepted replacement HTML/CSS.
import {test, expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {runLesson} from '../helpers/legacy-journeys.mjs';
const counts = {opening: 7, middle: 8, final: 9};
for (const mount of ['/', '/discussion-skills-lab/']) for (const id of Object.keys(counts)) {
  test(`${mount}${id} shared shell: skip, counts, responsive navigation, focus, single mount and silent hydration`, async ({page}) => {
    await page.addInitScript(() => { window.fixtureWrites = []; const save = Storage.prototype.setItem; Storage.prototype.setItem = function(key, value) { window.fixtureWrites.push(key); return save.call(this, key, value); }; });
    await page.goto(`${mount}${id}.html`);
    await expect(page.locator('[data-reference-print]')).toBeEnabled();
    await expect(page.locator('#lesson-status')).toBeHidden();
    await expect(page.locator('#progress-text')).toHaveText(`0 of ${counts[id]} pages completed`);
    await expect(page.locator('#rail-links button')).toHaveCount(counts[id] + 1);
    await expect(page.locator('#views>.lesson-view:not([hidden])')).toHaveCount(1);
    expect(await page.evaluate(() => window.fixtureWrites)).toEqual([]);
    expect(await page.evaluate(async () => { const {mountLesson}=await import(new URL('assets/js/app/lesson-app.js',location.href)); try{mountLesson(document.querySelector('.app-shell'),{});return false;}catch(error){return /already mounted/.test(error.message);} })).toBe(true);
    await expect(page.locator('header.topbar')).toHaveCount(1);
    await page.locator('.dsl-skip').focus(); await page.keyboard.press('Enter'); await expect(page.locator('#lesson-main')).toBeFocused();
    expect(new URL(page.url()).hash).toBe('');
    await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden();
    expect(await page.evaluate(() => window.fixtureWrites)).toEqual([]);
    await page.setViewportSize({width: 1100, height: 900});
    await page.locator('#rail-toggle').click(); await expect(page.locator('#rail-toggle')).toHaveAttribute('aria-expanded', 'false'); await expect(page.locator('#rail-links')).toBeHidden();
    await page.locator('#rail-toggle').click();
    const reference = page.locator('[data-view-role="reference"]');
    await page.locator('#rail-links button').last().click(); await expect(reference.locator('h1,h2').first()).toBeFocused(); await expect(page.locator('#next-section')).toBeHidden();
    await page.setViewportSize({width: 850, height: 900}); await expect(page.locator('.rail')).toBeHidden(); await expect(page.locator('#section-select')).toBeVisible();
    const firstId = await page.locator('#section-select option').first().getAttribute('value'); await page.selectOption('#section-select', firstId);
    await expect(page.locator('[data-view-role="lesson"]').first().locator('h1,h2').first()).toBeFocused(); await expect(page.locator('#next-section')).toBeDisabled();
    await page.setViewportSize({width: 320, height: 844});
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    expect(await page.evaluate(() => window.fixtureWrites)).toEqual([]);
  });
  test(`${mount}${id} public journey and completed v1 fixture replay`, async ({page}) => {
    await page.goto(`${mount}${id}.html`);
    await runLesson(page,id);
    await expect(page.locator('#progress-text')).toHaveText(`${counts[id]} of ${counts[id]} pages completed`);
    const key=id==='opening'?'dsl:opening-stage:v1':`dsl:${id}:v1`;
    const raw=await page.evaluate(key=>localStorage.getItem(key),key);
    await page.goto(`/__original${mount}${id}.html`);
    await expect(page.locator('#progress-text')).toHaveText(`${counts[id]} of ${counts[id]} pages completed`);
    expect(await page.evaluate(key=>localStorage.getItem(key),key)).not.toBeNull();
    const fixture=JSON.parse(readFileSync(new URL(`../fixtures/progress/${id}/completed.json`,import.meta.url),'utf8'));
    await page.evaluate(({key,raw})=>localStorage.setItem(key,raw),{key,raw:fixture.raw});
    await page.goto(`${mount}${id}.html`); await expect(page.locator('#lesson-status')).toBeHidden();
    expect(await page.evaluate(key=>localStorage.getItem(key),key)).toBe(fixture.raw);
    await expect(page.locator('#rail-links button:disabled')).toHaveCount(0);
    expect(JSON.parse(raw).completed.length).toBe(counts[id]);
  });
}
test('shared shell manifest failure has retry, no fabricated lesson and no writes', async ({page}) => {
  await page.route('**/content/opening/lesson.json', route => route.abort());
  await page.goto('/opening.html'); await expect(page.locator('#lesson-retry')).toBeVisible();
  await expect(page.locator('#views section')).toHaveCount(0); await expect(page.locator('.rail')).toBeHidden();
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
  await page.unroute('**/content/opening/lesson.json'); await page.locator('#lesson-retry').click();
  await expect(page.locator('[data-reference-print]')).toBeEnabled(); await expect(page.locator('#lesson-status')).toBeHidden();
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
});
