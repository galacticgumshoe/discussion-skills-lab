import {test, expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
const original = readFileSync(new URL('../fixtures/content/source/index.html', import.meta.url), 'utf8');
// Approved additive Lesson 4; retain independent original copy/order checks for 1–3.
const newCard = {title:'Before the Round',description:'Prepare equipment, access tasks, get settled, and connect respectfully before a Discussion round.',url:'before-round.html'};
for (const mount of ['/', '/discussion-skills-lab/']) {
  test(`${mount} homepage exact copy, card order, links and licenses`, async ({page}) => {
    await page.goto(`${mount}index.html`); await expect(page.locator('[data-home-status]')).toBeHidden();
    const expected = await page.evaluate(source => { const doc = new DOMParser().parseFromString(source, 'text/html'); return {intro: [...doc.querySelector('main').children].slice(0, 3).map(n => n.textContent), cards: [...doc.querySelectorAll('.lesson')].map(n => ({title:n.querySelector('h2').textContent, description:n.querySelector('p').textContent, url:n.querySelector('a').getAttribute('href')})), note:doc.querySelector('.note').textContent, footer:doc.querySelector('footer').textContent}; }, original);
    // Owner-approved revision: the series now has more than three lessons.
    expected.intro[2] = expected.intro[2].replace('Three interactive lessons', 'These interactive lessons');
    expect(await page.locator('[data-home-intro]>*').allTextContents()).toEqual(expected.intro);
    expect(await page.locator('.lesson').evaluateAll(nodes => nodes.map(n => ({title:n.querySelector('h2').textContent, description:n.querySelector('p').textContent, url:n.querySelector('a').getAttribute('href')})))).toEqual([...expected.cards,newCard]);
    await expect(page.locator('.lesson').nth(3).locator('.number')).toHaveText('04');
    await expect(page.locator('.note')).toHaveText(expected.note);
    // Approved common-footer replacement; preserve the original educational disclaimer.
    await expect(page.locator('[data-home-disclaimer]')).toHaveText(expected.footer.slice(expected.footer.indexOf('Educational coaching')));
    await expect(page.locator('.site-footer-copyright')).toHaveText('© Rhys Jones. Instructional content and activities: CC BY 4.0. Code: MIT License.');
    await expect(page.locator('[data-home-fallback]')).toBeHidden(); await expect(page.locator('footer a')).toHaveCount(4);
    await page.setViewportSize({width:320,height:844}); expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  });
  test(`${mount} homepage failure retains useful links and can retry safely`, async ({page}) => {
    await page.route('**/content/catalog.json', route => route.fulfill({json:{schemaVersion:1,lessons:[{id:'opening',url:'https://evil.invalid/x',title:'X',description:'X'}]}}));
    await page.goto(`${mount}index.html`); await expect(page.locator('[data-home-retry]')).toBeVisible(); await expect(page.locator('[data-home-fallback] a')).toHaveCount(4); await expect(page.locator('.lesson')).toHaveCount(0);
    await expect(page.locator('[data-home-status]')).toContainText('Lessons require JavaScript');
    await page.unroute('**/content/catalog.json'); await page.locator('[data-home-retry]').click(); await expect(page.locator('.lesson')).toHaveCount(4); await expect(page.locator('[data-home-fallback]')).toBeHidden();
  });
  test(`${mount} homepage no-JavaScript lesson navigation`, async ({browser}) => {
    const context = await browser.newContext({javaScriptEnabled:false});
    // Absolute URL from the runner fixture avoids relying on project config merging.
    const page = await context.newPage();
    const base = `http://127.0.0.1:${process.env.DSL_TEST_PORT}`;
    await page.goto(`${base}${mount}index.html`); await expect(page.locator('[data-home-fallback]')).toBeVisible();
    expect(await page.locator('[data-home-fallback] a').evaluateAll(nodes => nodes.map(n => n.getAttribute('href')))).toEqual(['opening.html','middle.html','final.html','before-round.html']);
    await expect(page.locator('[data-home-status]')).toContainText('Lessons require JavaScript'); await context.close();
  });
}
