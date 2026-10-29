// MIT. Generic shared-runtime contracts, using only noninstructional fixture data.
import {test, expect} from '@playwright/test';
const key = 'dsl:sample-module:v1';
const counts = page => page.evaluate(() => window.appCalls);
const state = page => page.evaluate(() => window.fixtureApp.state);
const errors = new WeakMap();
test.beforeEach(async ({page}) => {
  const list = []; errors.set(page, list); page.on('pageerror', error => list.push(error.message));
  await page.addInitScript(key => {
    window.appCalls = {reads: 0, writes: 0, prints: 0};
    const get = Storage.prototype.getItem, set = Storage.prototype.setItem;
    Storage.prototype.getItem = function(name) { if (name === key) window.appCalls.reads++; return get.call(this, name); };
    Storage.prototype.setItem = function(name, value) { if (name === key) window.appCalls.writes++; return set.call(this, name, value); };
    window.print = () => window.appCalls.prints++;
  }, key);
});
test.afterEach(({page}) => expect(errors.get(page)).toEqual([]));

for (const mount of ['/', '/discussion-skills-lab/']) {
  const base = `${mount}__fixtures/new-module/`, url = `${base}index.html`;
  const ready = async page => { await expect(page.locator('#lesson-status')).toHaveCount(1); await expect(page.locator('#lesson-status')).toBeHidden(); };
  test(`${mount} duplicate mounts/writers fail; repeated destroy/remount leaves old nodes inert and one callback/Print`, async ({page}) => {
    await page.goto(url); await ready(page);
    await page.getByRole('button', {name: 'Test option B', exact: true}).click();
    await page.locator('#next-section').click();
    await page.getByLabel('Test draft', {exact: true}).fill('synthetic lifecycle draft');
    for (const check of await page.getByRole('checkbox').all()) await check.check();
    const before = await state(page), writes = (await counts(page)).writes, changes = await page.evaluate(() => window.fixtureChanges);
    const rejected = await page.evaluate(async () => {
      const h = window.fixtureRuntime, messages = [];
      for (const root of [h.root, document.createElement('div')]) {
        try { h.mountLesson(root, h.options); } catch (error) { messages.push(error.message); }
      }
      const old = [...document.querySelectorAll('button,input,textarea')];
      await h.remount(); await h.remount();
      for (const node of old) { node.click(); node.dispatchEvent(new Event('input')); node.dispatchEvent(new Event('change')); }
      return messages;
    });
    expect(rejected[0]).toContain('already mounted'); expect(rejected[1]).toContain('writer');
    expect(await state(page)).toEqual(before);
    expect(await counts(page)).toEqual({reads: 3, writes, prints: 0});
    expect(await page.evaluate(() => window.fixtureChanges)).toBe(changes);
    await expect(page.locator('#rail-links button')).toHaveCount(3);
    await expect(page.locator('[data-reference-print]')).toHaveCount(1);
    await page.evaluate(() => window.fixtureApp.navigation.go('test-reference'));
    await expect(page.locator('[data-reference-print]')).toBeEnabled(); await page.locator('[data-reference-print]').click();
    expect((await counts(page)).prints).toBe(1);
    await page.evaluate(() => window.fixtureApp.navigation.go('test-worksheet'));
    const check = page.getByLabel('Test check A', {exact: true}); await check.focus(); await check.press('Space');
    expect((await counts(page)).writes).toBe(writes + 1); await expect(check).toBeFocused();
    expect(await page.evaluate(() => window.fixtureChanges)).toBe(changes + 1);
  });

  test(`${mount} destroy during pending fetch cancels late work and frees the single writer`, async ({page}) => {
    let release, first = true; const pending = new Promise(resolve => { release = resolve; });
    const pattern = `**${base}content/sample-module/question.json`;
    await page.route(pattern, async route => { if (!first) return route.continue(); first = false; await pending; await route.continue(); });
    await page.goto(url, {waitUntil: 'domcontentloaded'});
    await expect(page.locator('[data-reference-print]')).toBeEnabled();
    expect(await counts(page)).toEqual({reads: 0, writes: 0, prints: 0});
    await page.evaluate(() => window.fixtureRuntime.remount()); release(); await ready(page);
    await expect(page.locator('#rail-links button')).toHaveCount(3);
    await expect(page.locator('[data-option-id]')).toHaveCount(2);
    const option = page.getByRole('button', {name: 'Test option B', exact: true}); await option.focus(); await option.press('Enter');
    expect(await counts(page)).toEqual({reads: 1, writes: 1, prints: 0}); await expect(option).toBeFocused();
    expect(await page.evaluate(() => window.fixtureChanges)).toBe(1);
  });

  test(`${mount} bounded registry rejects executable content; missing renderer isolates its activity`, async ({page}) => {
    await page.goto(url); await ready(page); const before = await state(page);
    const messages = await page.evaluate(async () => {
      const h = window.fixtureRuntime, messages = [];
      for (const registry of [{html: {mount() {}, read() {}, write() {}}}, {writing: 'module-from-content.js'}]) {
        try { h.mountLesson(document.createElement('div'), {...h.options, registry}); } catch (error) { messages.push(error.message); }
      }
      const {standardActivityRegistry} = await import(new URL('../../assets/js/app/section-renderer.js', document.baseURI));
      const registry = {...standardActivityRegistry}; delete registry.writing;
      await h.remount({registry}); return messages;
    });
    expect(messages).toHaveLength(2); expect(messages.every(message => message.includes('Registry'))).toBe(true);
    await expect(page.locator('[data-activity-id="test-writing"]')).toHaveCount(0);
    await expect(page.locator('[data-content-status]').filter({hasText: 'unavailable in the static registry'})).toHaveCount(1);
    expect(await state(page)).toEqual(before); expect((await counts(page)).writes).toBe(0);
    await page.evaluate(() => window.fixtureApp.navigation.go('test-reference')); await expect(page.locator('[data-reference-print]')).toBeEnabled();
  });

  test(`${mount} pending activity cannot block reference or read/save progress before preparation`, async ({page}) => {
    let release; const pending = new Promise(resolve => { release = resolve; });
    await page.route(`**${base}content/sample-module/question.json`, async route => { await pending; await route.fulfill({status: 404, body: ''}); });
    await page.goto(url, {waitUntil: 'domcontentloaded'}); await expect(page.locator('[data-reference-print]')).toBeEnabled();
    expect(await counts(page)).toEqual({reads: 0, writes: 0, prints: 0});
    await expect(page.locator('[data-activity-id="test-writing"]')).toHaveCount(0);
    await page.evaluate(() => window.fixtureApp.navigation.go('test-reference'));
    await expect(page.locator('#previous-section')).toBeHidden(); await expect(page.locator('#next-section')).toBeHidden();
    await page.locator('[data-reference-print]').click(); expect((await counts(page)).prints).toBe(1);
    release(); await ready(page);
    expect(await counts(page)).toEqual({reads: 1, writes: 0, prints: 1}); expect((await state(page)).completedSections).toEqual([]);
  });

  test(`${mount} failed Markdown blocks initial credit; retry is silent until the next real interaction`, async ({page}) => {
    const pattern = `**${base}content/sample-module/explanation.md`;
    await page.route(pattern, route => route.fulfill({status: 404, body: ''})); await page.goto(url); await ready(page);
    await page.getByRole('button', {name: 'Test option B', exact: true}).click();
    expect((await state(page)).completedSections).toEqual([]);
    await page.evaluate(() => window.fixtureApp.navigation.go('test-reference')); await expect(page.locator('[data-reference-print]')).toBeEnabled();
    await page.evaluate(() => window.fixtureApp.navigation.go('test-explanation'));
    const writes = (await counts(page)).writes; await page.unroute(pattern); await page.locator('[data-content-retry]:visible').click();
    await expect(page.locator('strong').filter({hasText: 'Test Markdown label'})).toBeVisible();
    expect((await state(page)).completedSections).toEqual([]); expect((await counts(page)).writes).toBe(writes);
    await page.getByRole('button', {name: 'Test option A', exact: true}).click();
    expect((await state(page)).completedSections).toEqual(['test-explanation']);
  });
}
