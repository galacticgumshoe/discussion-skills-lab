import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { original } from '../helpers/baseline-source.mjs';
import { referenceInventory } from '../helpers/final-reference.mjs';

const keys = { opening: 'dsl:opening-stage:v1', middle: 'dsl:middle:v1', final: 'dsl:final:v1' };
const state = page => page.evaluate(() => window.writingHarness.store.state);
const counts = page => page.evaluate(() => ({ writes: window.writingCalls.writes, events: window.writingHarness.events }));
const activity = (page, id) => page.locator(`[data-activity-id="${id}"]`);
const field = (page, id) => page.locator(`[data-field-id="${id}"]`);
const raw = page => page.evaluate(() => localStorage.getItem(window.writingHarness.adapter.key));
async function load(page, lesson = 'final', { record = null, clipboard = 'denied', prefix = false, reorder = false, waitActivities = true } = {}) {
  await page.goto('/');
  await page.evaluate(({ key, record }) => { if (record === null) localStorage.removeItem(key); else localStorage.setItem(key, record); }, { key: keys[lesson], record });
  await page.addInitScript(mode => {
    window.writingCalls = { writes: 0, copies: [] };
    const set = Storage.prototype.setItem;
    Storage.prototype.setItem = function(...args) { window.writingCalls.writes++; return set.apply(this, args); };
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: mode === 'unavailable' ? undefined : {
      writeText: async text => { window.writingCalls.copies.push(text); if (mode === 'denied') throw new Error('Denied'); }
    } });
  }, clipboard);
  await page.goto(`/__fixtures/harness/writing-reference.html?lesson=${lesson}${prefix ? '&prefix' : ''}${reorder ? '&reorder' : ''}`);
  await expect(page.locator('html')).toHaveAttribute('data-ready', 'true');
  if (waitActivities) await expect(page.locator('#writing-reference-harness')).toHaveAttribute('data-activities-ready', 'true');
}
async function fillAssembly(page, id) {
  const fields = await page.evaluate(id => window.writingHarness.activities.find(item => item.id === id).data.fields, id);
  for (const [index, item] of fields.entries()) await field(page, item.id).fill(['Māya & Jordan!', 'Connected perspectives?!', 'We recommend a pilot!'][index]);
  await activity(page, id).locator('.dsl-assemble').click();
}
async function checkAll(page, id) { for (const input of await activity(page, id).getByRole('checkbox').all()) await input.check(); }
const errors = new WeakMap();
test.beforeEach(({ page }) => { const messages = []; errors.set(page, messages); page.on('pageerror', error => messages.push(error.message)); });
test.afterEach(({ page }) => expect(errors.get(page)).toEqual([]));

for (const lesson of ['opening', 'middle', 'final']) {
  test(`${lesson}: complete fixture hydration/update/remount preserves drafts/models/checks without events or writes`, async ({ page }) => {
    const record = JSON.parse(readFileSync(new URL(`../fixtures/progress/${lesson}/completed.json`, import.meta.url))).raw;
    await load(page, lesson, { record, reorder: true });
    const before = await state(page);
    await page.evaluate(() => { window.writingHarness.hydrate(); window.writingHarness.hydrate(); window.writingHarness.remount(); window.writingHarness.remount(); });
    expect(await counts(page)).toEqual({ writes: 0, events: 0 }); expect(await raw(page)).toBe(record); expect(await state(page)).toEqual(before);
    expect(await page.evaluate(() => typeof window.DSL)).toBe('undefined');
    const descriptors = await page.evaluate(() => window.writingHarness.activities);
    for (const item of descriptors) {
      for (const descriptor of [...item.data.fields, ...(item.data.output ? [item.data.output] : [])]) {
        await expect(field(page, descriptor.id)).toHaveValue(before.fields[descriptor.id]);
        await expect(field(page, descriptor.id)).toHaveAccessibleName(descriptor.label);
        expect(await field(page, descriptor.id).evaluate(node => node.maxLength)).toBe(descriptor.maxLength ?? -1);
        expect(await field(page, descriptor.id).evaluate(node => node.readOnly)).toBe(descriptor.readonly);
        if (descriptor.placeholder) await expect(field(page, descriptor.id)).toHaveAttribute('placeholder', descriptor.placeholder);
      }
      for (const check of item.checklist.data.items) await expect(activity(page, item.id).locator(`[data-check-id="${check.id}"]`)).toHaveAccessibleName(check.text);
      const model = activity(page, item.id).locator('.dsl-writing-model');
      for (const block of item.data.model.blocks) await expect(model).toContainText(block.text);
    }
  });

  test(`${lesson}: every draft/output input saves immediately; assembly is explicit and cannot overwrite edits while typing`, async ({ page }) => {
    await load(page, lesson, { reorder: true });
    const id = { opening: 'consensus-writing', middle: 'evidence-writing', final: 'synthesis-writing' }[lesson];
    const item = await page.evaluate(id => window.writingHarness.activities.find(item => item.id === id), id);
    const output = field(page, item.data.output.id);
    await activity(page, id).locator('.dsl-assemble').click();
    expect(await counts(page)).toEqual({ writes: 0, events: 0 }); await expect(output).toHaveValue('');
    const partial = item.data.fields[0].multiline ? 'Unicode 學生\npartial draft' : 'Unicode 學生 partial draft';
    await field(page, item.data.fields[0].id).fill(partial);
    expect((await state(page)).fields[item.data.fields[0].id]).toBe(partial);
    expect((await counts(page)).writes).toBe(1); await expect(output).toHaveValue('');
    await fillAssembly(page, id);
    const assembled = await output.inputValue(); expect(assembled).not.toBe('');
    if (lesson === 'middle') await expect(output).toHaveAttribute('readonly', '');
    else {
      await output.fill('Student-edited output 🧭\n<em>plain text, not HTML</em>');
      expect((await state(page)).fields[item.data.output.id]).toBe('Student-edited output 🧭\n<em>plain text, not HTML</em>');
      await expect(activity(page, id).locator('em')).toHaveCount(0);
    }
    const edited = await output.inputValue();
    await field(page, item.data.fields[0].id).fill('Changed input without assembly'); await expect(output).toHaveValue(edited);
    await output.focus(); await output.evaluate(node => node.setSelectionRange(1, 3));
    await page.evaluate(() => window.writingHarness.hydrate());
    expect(await output.evaluate(node => [node.selectionStart, node.selectionEnd])).toEqual([1, 3]);
    await page.reload(); await expect(page.locator('#writing-reference-harness')).toHaveAttribute('data-activities-ready', 'true');
    await expect(output).toHaveValue(edited); expect(await counts(page)).toEqual({ writes: 0, events: 0 });
    await activity(page, id).locator('.dsl-assemble').click(); await expect(output).not.toHaveValue(edited);
  });
}

test('Opening: exact 34/35 boundary, reversible self-check, optional toggle model and permanent completion', async ({ page }) => {
  await load(page, 'opening'); const group = activity(page, 'consensus-writing'), draft = field(page, 'consensus-draft');
  await draft.fill('x'.repeat(34)); await group.getByRole('checkbox').check(); expect((await state(page)).completedSections).not.toContain('give-direction');
  await draft.fill('x'.repeat(35)); expect((await state(page)).completedSections).toContain('give-direction');
  await expect(group.locator('.dsl-writing-model')).toBeHidden(); // model is NOT a gate input
  const beforeModel = await raw(page);
  await group.locator('.dsl-model-toggle').click(); await expect(group.locator('.dsl-model-toggle')).toHaveAttribute('aria-expanded', 'true');
  await group.locator('.dsl-model-toggle').click(); await expect(group.locator('.dsl-writing-model')).toBeHidden();
  expect(await raw(page)).toBe(beforeModel); // Opening model has no permitted persistent namespace
  await draft.fill(''); await group.getByRole('checkbox').uncheck();
  expect((await state(page)).completedSections).toContain('give-direction'); expect(JSON.parse(await raw(page)).data.questionSelfcheck).toBe(false);
  await page.reload(); await expect(page.locator('#writing-reference-harness')).toHaveAttribute('data-activities-ready', 'true');
  expect((await state(page)).completedSections).toContain('give-direction'); await expect(draft).toHaveValue('');
});

test('Middle: partial drafts/readonly output/checks/model reveals save immediately; both models remain optional', async ({ page }) => {
  await load(page, 'middle');
  await fillAssembly(page, 'evidence-writing'); await checkAll(page, 'evidence-writing');
  expect((await state(page)).completedSections).toContain('evidence');
  await expect(activity(page, 'evidence-writing').locator('.dsl-writing-model')).toBeHidden();
  await field(page, 'integrated-draft').fill('Synthetic contribution, saved before any other action.'); await checkAll(page, 'integrated-writing');
  expect((await state(page)).completedSections).toContain('integrated-practice');
  for (const id of ['evidence-writing', 'integrated-writing']) await activity(page, id).locator('.dsl-model-toggle').click();
  expect(JSON.parse(await raw(page)).data.dslUi).toEqual({ schemaVersion: 1, models: { 'research-model': true, 'application-model': true } });
  const before = await counts(page); await activity(page, 'evidence-writing').locator('.dsl-model-toggle').click(); expect(await counts(page)).toEqual(before);
  await page.reload(); await expect(page.locator('#writing-reference-harness')).toHaveAttribute('data-activities-ready', 'true');
  await expect(activity(page, 'evidence-writing').locator('.dsl-writing-model')).toBeVisible();
  await expect(activity(page, 'integrated-writing').locator('.dsl-writing-model')).toBeVisible();
  await field(page, 'integrated-draft').fill(''); await activity(page, 'evidence-writing').getByRole('checkbox').first().uncheck();
  expect((await state(page)).completedSections).toEqual(expect.arrayContaining(['evidence', 'integrated-practice']));
});

test('Final: required synthesis/closing models stay external policy inputs; each missing check blocks initial credit', async ({ page }) => {
  await load(page);
  await fillAssembly(page, 'synthesis-writing'); await field(page, 'closing-draft').fill('Synthetic closing contribution.');
  for (const [id, section] of [['synthesis-writing', 'connect-viewpoints'], ['closing-writing', 'closing-practice']]) {
    await checkAll(page, id); expect((await state(page)).completedSections).not.toContain(section);
    await activity(page, id).getByRole('checkbox').last().uncheck(); await activity(page, id).locator('.dsl-model-toggle').click();
    expect((await state(page)).completedSections).not.toContain(section);
    await activity(page, id).getByRole('checkbox').last().check(); expect((await state(page)).completedSections).toContain(section);
  }
  const saved = JSON.parse(await raw(page)).data.finalState; expect(saved.builderModel).toBe(true); expect(saved.closingModel).toBe(true);
  await page.reload(); await expect(page.locator('#writing-reference-harness')).toHaveAttribute('data-activities-ready', 'true');
  for (const id of ['synthesis-writing', 'closing-writing']) {
    await expect(activity(page, id).locator('.dsl-writing-model')).toBeVisible();
    await activity(page, id).getByRole('checkbox').first().uncheck();
  }
  await field(page, 'synthesis-output').fill(''); await field(page, 'closing-draft').fill('');
  expect((await state(page)).completedSections).toEqual(expect.arrayContaining(['connect-viewpoints', 'closing-practice']));
});

for (const clipboard of ['denied', 'unavailable', 'success']) test(`clipboard ${clipboard}: status, existing-field selection or success; no progress changes`, async ({ page }) => {
  await load(page, 'final', { clipboard }); const group = activity(page, 'closing-writing'), draft = field(page, 'closing-draft');
  await group.locator('.dsl-copy').click(); await expect(group.locator('[role="status"]')).toHaveText('Write a response before copying.');
  await draft.fill('Copy exact Unicode 🧭\nsecond line'); const before = await raw(page), beforeCounts = await counts(page);
  await group.locator('.dsl-copy').focus(); await group.locator('.dsl-copy').press('Enter');
  if (clipboard === 'success') {
    await expect(group.locator('[role="status"]')).toHaveText('Copied to clipboard.'); await expect(group.locator('.dsl-copy')).toBeFocused();
    expect(await page.evaluate(() => window.writingCalls.copies)).toEqual(['Copy exact Unicode 🧭\nsecond line']);
  } else {
    await expect(draft).toBeFocused(); expect(await draft.evaluate(node => [node.selectionStart, node.selectionEnd])).toEqual([0, (await draft.inputValue()).length]);
    await expect(group.locator('[role="status"]')).toContainText('text is selected');
  }
  expect(await raw(page)).toBe(before); expect(await counts(page)).toEqual(beforeCounts); await expect(group.locator('[data-clipboard-fallback]')).toHaveCount(0);
});

test('scoped clipboard fallback is selectable/dismissible, restores focus, never enters fixed legacy field maps', async ({ page }) => {
  await load(page, 'middle', { clipboard: 'unavailable' }); await expect(page.locator('[data-reference-print]')).toBeEnabled();
  const before = await raw(page), beforeCounts = await counts(page);
  await page.locator('#quick-reference-link').click(); const copy = page.getByRole('button', { name: 'Copy reference', exact: true });
  await copy.focus(); await copy.press('Enter'); const fallback = page.locator('[data-clipboard-fallback]');
  await expect(fallback).toBeFocused(); await expect(fallback).toHaveAccessibleName('Select and copy this text');
  expect(await fallback.evaluate(node => [node.id, node.name, node.hasAttribute('data-field-id')])).toEqual(['', '', false]);
  expect(await fallback.evaluate(node => node.selectionEnd)).toBe((await fallback.inputValue()).length);
  expect(await raw(page)).toBe(before); expect(await counts(page)).toEqual(beforeCounts);
  await fallback.press('Escape'); await expect(fallback).toHaveCount(0); await expect(copy).toBeFocused();
  await copy.press('Enter'); await copy.press('Enter'); await expect(fallback).toHaveCount(1);
  await page.evaluate(() => window.writingHarness.navigation.go('welcome'));
  await field(page, 'evidence-source').fill('One known field after fallback');
  const saved = JSON.parse(await raw(page)); expect(Object.keys(saved.data.middleState.fields)).toEqual(['0']);
  await page.evaluate(() => window.writingHarness.referenceClipboard.destroy()); await expect(fallback).toHaveCount(0);
});

test('writing/checklist lifecycle: silent updates, old nodes inert, one callback per keyboard action after remount', async ({ page }) => {
  await load(page); const group = activity(page, 'closing-writing');
  const retained = await group.getByRole('checkbox').first().elementHandle();
  await page.evaluate(() => { window.writingHarness.remount(); window.writingHarness.remount(); window.writingHarness.hydrate(); });
  await retained.evaluate(node => { node.checked = true; node.dispatchEvent(new Event('change')); });
  expect(await counts(page)).toEqual({ writes: 0, events: 0 });
  const check = group.getByRole('checkbox').first(); await check.focus(); await check.press('Space');
  expect(await counts(page)).toEqual({ writes: 1, events: 1 });
  await group.locator('.dsl-model-toggle').focus(); await group.locator('.dsl-model-toggle').press('Enter');
  expect(await counts(page)).toEqual({ writes: 2, events: 2 });
  await expect(group.locator('.dsl-model-toggle')).toBeFocused();
  const duplicates = await page.evaluate(() => {
    const h = window.writingHarness, a = h.activities[0];
    try { h.mountChecklist(h.hosts.get(a.id).checklist, { data: a.checklist.data, state: h.store.state.activities[a.checklist.id], onChange() {} }); return false; }
    catch { return true; }
  }); expect(duplicates).toBe(true);
});

test('late clipboard denial cannot mutate a destroyed/remounted writing component', async ({ page }) => {
  await load(page); await field(page, 'closing-draft').fill('Synthetic text while permission is pending.');
  await page.evaluate(() => { navigator.clipboard.writeText = () => new Promise((_, reject) => { window.denyCopy = reject; }); });
  await activity(page, 'closing-writing').locator('.dsl-copy').click();
  const before = await counts(page);
  await page.evaluate(async () => {
    window.writingHarness.remount(); window.denyCopy(new Error('Late denial'));
    await Promise.resolve(); await Promise.resolve();
  });
  await expect(activity(page, 'closing-writing').locator('[role="status"]')).toBeEmpty();
  await expect(page.locator('[data-clipboard-fallback]')).toHaveCount(0); expect(await counts(page)).toEqual(before);
});

for (const prefix of [false, true]) test(`reference ${prefix ? 'repository' : 'root'}: independent startup/loading/retry/print isolation when writing load fails`, async ({ page }, info) => {
  let release; const gate = new Promise(resolve => { release = resolve; }); let failReference = true, failActivity = true;
  await page.route('**/content/final/reference/reference.json', async route => { await gate; await route.continue(); });
  await page.route('**/summary-synthesis.md', route => failReference ? route.fulfill({ status: 404, body: 'missing' }) : route.continue());
  await page.route('**/__fixtures/content/source/final.html', route => failActivity ? route.fulfill({ status: 404, body: 'missing' }) : route.continue());
  const record = JSON.stringify({ completed: [], data: { finalState: { fields: { 'closing-text': 'Preserved before failed activity' } } }, future: { keep: true } });
  await load(page, 'final', { prefix, record, waitActivities: false });
  await expect(page.locator('[data-activity-status]')).toContainText('could not load');
  await page.locator('#quick-reference-link').click(); await expect(page.locator('[data-reference-print]')).toBeDisabled();
  await expect(page.locator('[data-reference-status]')).toContainText('loading');
  await page.emulateMedia({ media: 'print' }); await expect(page.locator('[data-reference-status]')).toBeVisible(); await expect(page.locator('#view-0')).toBeHidden();
  await page.emulateMedia({ media: 'screen' }); release(); await expect(page.locator('[data-reference-status]')).toContainText('HTTP 404');
  failReference = false; await page.locator('[data-reference-retry]').click(); await expect(page.locator('[data-reference-print]')).toBeEnabled();
  const comparison = await page.evaluate(({ source, inventory }) => {
    const describe = (0, eval)(`(${inventory})`);
    return { baseline: describe(new DOMParser().parseFromString(source, 'text/html')), actual: describe(document) };
  }, { source: original('final.html').toString(), inventory: referenceInventory.toString() });
  expect(comparison.actual).toEqual(comparison.baseline); expect(comparison.actual).toHaveLength(5);
  await page.evaluate(() => { window.printCalls = 0; window.print = () => window.printCalls++; });
  await page.locator('[data-reference-print]').click(); expect(await page.evaluate(() => window.printCalls)).toBe(1);
  await page.evaluate(() => window.writingHarness.remountReference()); await expect(page.locator('[data-reference-print]')).toBeEnabled();
  await page.locator('[data-reference-print]').click(); expect(await page.evaluate(() => window.printCalls)).toBe(2); // no second handler after remount
  expect(await raw(page)).toBe(record); expect(await counts(page)).toEqual({ writes: 0, events: 0 });
  await page.evaluate(() => window.writingHarness.navigation.go('welcome'));
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('[data-reference-view]')).toBeVisible(); await expect(page.locator('[data-reference-content] article')).toHaveCount(5);
  await expect(page.locator('#view-0')).toBeHidden(); await expect(page.locator('.rail')).toBeHidden(); await expect(page.locator('[data-reference-print]')).toBeHidden();
  if (info.project.name === 'chromium') await page.pdf({ path: info.outputPath(`writing-failure-reference-${prefix ? 'prefix' : 'root'}.pdf`), format: 'Letter', printBackground: true });
  await page.emulateMedia({ media: 'screen' }); failActivity = false;
  await page.locator('[data-activity-retry]').click(); await expect(page.locator('#writing-reference-harness')).toHaveAttribute('data-activities-ready', 'true');
  await expect(field(page, 'closing-draft')).toHaveValue('Preserved before failed activity'); expect(await raw(page)).toBe(record);
});

test('writing fields/models/checklists remain readable at 320px with enlarged text', async ({ page }) => {
  await load(page); await page.setViewportSize({ width: 320, height: 844 });
  await page.locator('#writing-reference-harness').evaluate(node => { node.style.fontSize = '200%'; });
  await activity(page, 'closing-writing').locator('.dsl-model-toggle').click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(await page.locator('.dsl-writing-field').evaluateAll(nodes => nodes.every(node => node.getBoundingClientRect().width <= 320))).toBe(true);
});
