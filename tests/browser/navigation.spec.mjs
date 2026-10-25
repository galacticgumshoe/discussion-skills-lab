import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const key = 'dsl:opening-stage:v1';
const ids = ['contributions', 'opening-sequence', 'task-analysis', 'clarifications', 'give-direction', 'research-transition', 'knowledge-check', 'quick-reference'];
const errors = new WeakMap();
test.beforeEach(({ page }) => { const messages = []; errors.set(page, messages); page.on('pageerror', error => messages.push(error.message)); });
test.afterEach(({ page }) => { expect(errors.get(page)).toEqual([]); });

async function load(page, { raw = null, reorder = false, failure } = {}) {
  await page.goto('/');
  await page.evaluate(({ key, raw }) => { if (raw === null) localStorage.removeItem(key); else localStorage.setItem(key, raw); }, { key, raw });
  await page.addInitScript(failure => {
    window.navigationCalls = { reads: 0, writes: 0, scrolls: 0 };
    const get = Storage.prototype.getItem, set = Storage.prototype.setItem, scroll = window.scrollTo;
    Storage.prototype.getItem = function(key) { window.navigationCalls.reads++; return get.call(this, key); };
    Storage.prototype.setItem = function(key, value) {
      window.navigationCalls.writes++;
      if (failure === 'quota') throw new DOMException('Synthetic quota', 'QuotaExceededError');
      return set.call(this, key, value);
    };
    window.scrollTo = function(...args) { window.navigationCalls.scrolls++; return scroll.apply(this, args); };
  }, failure);
  await page.goto(`/__fixtures/harness/navigation.html${reorder ? '?reorder' : ''}`);
  await expect(page.locator('html')).toHaveAttribute('data-ready', 'true');
}
const record = completed => JSON.stringify({ completed, data: {} });
const calls = page => page.evaluate(() => window.navigationCalls);
const state = page => page.evaluate(() => window.navigationHarness.store.state);
async function go(page, id) {
  if (await page.locator('#section-select').isVisible()) await page.locator('#section-select').selectOption(id);
  else await page.locator(`[data-go="${id}"]`).click();
  await expect(page.locator(`[data-go="${id}"]`)).toHaveAttribute('aria-current', 'step');
}
async function expectAccess(page, allowed) {
  for (const id of ids) {
    expect(await page.locator(`[data-go="${id}"]`).isDisabled(), id).toBe(!allowed.includes(id));
    expect(await page.locator(`#section-select option[value="${id}"]`).isDisabled(), id).toBe(!allowed.includes(id));
  }
}

test('zero progress: only first/reference accessible; navigation, denied selection, and unchanged updates never save/complete', async ({ page }) => {
  await load(page);
  expect(await calls(page)).toEqual({ reads: 1, writes: 0, scrolls: 1 });
  expect(await page.evaluate(() => typeof window.DSL)).toBe('undefined');
  await expectAccess(page, [ids[0], ids[7]]);
  await expect(page.locator('#heading-contributions')).toBeFocused();
  await expect(page.locator('#previous-section')).toBeDisabled();
  await expect(page.locator('#next-section')).toBeDisabled();
  await expect(page.locator('#progress-track')).toHaveAttribute('aria-valuemax', '7');
  await expect(page.locator('#progress-track')).toHaveAttribute('aria-valuenow', '0');
  const rejected = await page.evaluate(() => {
    const { navigation, store } = window.navigationHarness;
    const result = ['task-analysis', 'unknown', 0].map(id => navigation.go(id));
    document.querySelector('#section-select').value = 'task-analysis';
    document.querySelector('#section-select').dispatchEvent(new Event('change'));
    navigation.update(store.state);
    return result;
  });
  expect(rejected).toEqual([false, false, false]);
  await expect(page.locator('#section-select')).toHaveValue(ids[0]);
  expect((await calls(page)).scrolls).toBe(1);
  await page.locator('#quick-reference-link').click();
  await expect(page.locator('#heading-reference')).toBeFocused();
  await expect(page.locator('#previous-section')).toBeHidden();
  await expect(page.locator('#next-section')).toBeHidden();
  await expect(page.locator('#nav-status')).toHaveText('Quick reference is always available.');
  await go(page, ids[0]);
  expect((await state(page)).completedSections).toEqual([]);
  expect((await calls(page)).writes).toBe(0);
  expect(await page.evaluate(() => window.navigationHarness.store.originalRaw)).toBeNull();
});

test('rail/mobile selection, intended h1/h2/h3 focus, bottom controls, collapse and progress share stable identities', async ({ page }) => {
  await load(page, { raw: record([0, 1]) });
  for (const [id, heading] of [[ids[1], '#heading-sequence'], [ids[2], '#heading-analysis']]) {
    await go(page, id);
    await expect(page.locator(heading)).toBeFocused();
    await expect(page.locator('#section-select')).toHaveValue(id);
    await expect(page.locator('[aria-current="step"]')).toHaveCount(1);
  }
  await page.locator('#previous-section').click();
  await expect(page.locator('#heading-sequence')).toBeFocused();
  await page.locator('#next-section').click();
  await expect(page.locator('#heading-analysis')).toBeFocused();
  await expect(page.locator('#next-section')).toBeDisabled();
  await expect(page.locator('#progress-text')).toHaveText('2 of 7 pages completed');
  await expect(page.locator('#progress-track')).toHaveAttribute('aria-valuenow', '2');
  // CSSOM serializes percentages at different precision in each engine.
  expect(await page.locator('#progress-fill').evaluate(element => parseFloat(element.style.width))).toBeCloseTo(2 / 7 * 100, 3);
  await expect(page.locator(`[data-go="${ids[0]}"] .mark`)).toHaveText('✓');
  if (await page.locator('#rail-toggle').isVisible()) {
    await page.locator('#rail-toggle').click();
    await expect(page.locator('#rail-toggle')).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#rail-toggle')).toHaveAccessibleName('Expand navigation');
    await expect(page.locator('#rail-links')).toBeHidden();
    await page.locator('#rail-toggle').click();
    await expect(page.locator('#rail-links')).toBeVisible();
    await expect(page.locator('#rail-toggle')).toHaveAccessibleName('Collapse navigation');
  } else await expect(page.locator('#section-select')).toBeVisible();
  expect((await calls(page)).writes).toBe(0);
});

test('meaningful field/exploration/checkpoint changes earn completion immediately, one-missing gates block, feedback keeps focus/scroll', async ({ page }) => {
  await load(page);
  await page.locator('#test-problem').fill('Synthetic problem ✓');
  await expect(page.locator('#next-section')).toBeDisabled();
  expect((await state(page)).completedSections).toEqual([]);
  const before = (await calls(page)).scrolls;
  await page.locator('#test-accomplishment').fill('Synthetic accomplishment');
  await expect(page.locator('#test-accomplishment')).toBeFocused();
  expect((await calls(page)).scrolls).toBe(before);
  await expect(page.locator('#next-section')).toBeEnabled();
  expect((await state(page)).completedSections).toEqual([ids[0]]);
  await page.locator('#test-problem').fill('');
  await expect(page.locator('#next-section')).toBeEnabled();
  await page.locator('#next-section').click();
  await expect(page.locator('#heading-sequence')).toBeFocused();
  // WebKit intentionally does not focus buttons on pointer click. Exercise the
  // keyboard focus-retention contract explicitly instead of assuming it does.
  await page.locator('#test-explore').focus();
  await page.locator('#test-explore').press('Enter');
  await expect(page.locator('#test-explore')).toBeFocused();
  await expect(page.locator('#next-section')).toBeDisabled();
  const feedbackScrolls = (await calls(page)).scrolls;
  await page.locator('#test-checkpoint').click();
  expect((await calls(page)).scrolls).toBe(feedbackScrolls);
  await expect(page.locator('#next-section')).toBeEnabled();
  expect((await state(page)).completedSections).toEqual([ids[0], ids[1]]);
  expect(JSON.parse(await page.evaluate(() => window.navigationHarness.store.originalRaw)).completed).toEqual([0, 1]);
  await expect(page.locator('#progress-text')).toHaveText('2 of 7 pages completed');
  // Stale state updates cannot revoke credit in the navigation presentation either.
  await page.evaluate(() => window.navigationHarness.navigation.update({ ...window.navigationHarness.store.state, completedSections: [] }));
  await expect(page.locator('#next-section')).toBeEnabled();
  await page.locator('#next-section').click();
  await expect(page.locator('#heading-analysis')).toBeFocused();
});

test('non-contiguous saved credit grants exact predecessor/completed/reference access without filling gaps or inventing answers', async ({ page }) => {
  const raw = JSON.stringify({ completed: [0, 3], data: { 'problem-input': 'Synthetic saved draft\n✓' }, future: 'retain' });
  await load(page, { raw });
  await expectAccess(page, [ids[0], ids[1], ids[3], ids[4], ids[7]]);
  await go(page, ids[3]);
  await expect(page.locator('#previous-section')).toBeEnabled();
  const before = (await calls(page)).scrolls;
  await page.locator('#previous-section').click(); // Immediate predecessor is still locked: no jump across the gap.
  expect((await calls(page)).scrolls).toBe(before);
  await expect(page.locator('#view-3')).toBeVisible();
  await expect(page.locator('#section-select')).toHaveValue(ids[3]);
  await page.locator('#next-section').click();
  await expect(page.locator('#heading-direction')).toBeFocused();
  await expect(page.locator('#next-section')).toBeDisabled();
  await go(page, ids[7]);
  await expect(page.locator('#next-section')).toBeHidden();
  await expect(page.locator('#progress-text')).toHaveText('2 of 7 pages completed');
  expect((await calls(page)).writes).toBe(0);
  expect(await page.evaluate(() => window.navigationHarness.store.originalRaw)).toBe(raw);
  expect((await state(page)).activities.classification.selections).toEqual({});
});

test('refresh starts at first, expands navigation, and preserves drafts/credit without current-section/collapse writes', async ({ page }) => {
  const raw = JSON.parse(readFileSync(new URL('../fixtures/progress/opening/completed.json', import.meta.url))).raw;
  await load(page, { raw });
  await go(page, ids[5]);
  if (await page.locator('#rail-toggle').isVisible()) await page.locator('#rail-toggle').click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#heading-contributions')).toBeFocused();
  await expect(page.locator('#section-select')).toHaveValue(ids[0]);
  await expect(page.locator('#rail-toggle')).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#layout')).not.toHaveClass(/sidebar-collapsed/);
  expect(await page.evaluate(() => window.navigationHarness.store.originalRaw)).toBe(raw);
  expect(await calls(page)).toEqual({ reads: 1, writes: 0, scrolls: 1 });
  await expect(page.locator('#progress-text')).toHaveText('7 of 7 pages completed');
});

test('last counted page bottom Next requires its credit while shortcut remains available; reference is excluded from totals', async ({ page }) => {
  await load(page, { raw: record([5]) });
  await go(page, ids[6]);
  await expect(page.locator('#next-section')).toHaveText('Open quick reference →');
  await expect(page.locator('#next-section')).toBeDisabled();
  await page.locator('#quick-reference-link').click();
  await expect(page.locator('#next-section')).toBeHidden();
  await go(page, ids[6]);
  await page.locator('#test-quiz').click();
  await expect(page.locator('#nav-status')).toHaveText('Knowledge check complete.');
  await expect(page.locator('#next-section')).toBeEnabled();
  await page.locator('#next-section').click();
  await expect(page.locator('#heading-reference')).toBeFocused();
  await expect(page.locator('#previous-section')).toBeHidden();
  expect((await state(page)).completedSections).toEqual([ids[5], ids[6]]);
  // Defensive counting ignores duplicates, unknowns, and reference IDs.
  await page.evaluate(() => window.navigationHarness.navigation.update({ completedSections: ['quick-reference', 'unknown', 'knowledge-check', 'knowledge-check'] }));
  await expect(page.locator('#progress-track')).toHaveAttribute('aria-valuemax', '7');
  await expect(page.locator('#progress-track')).toHaveAttribute('aria-valuenow', '2');
});

test('gate-ready saved drafts are not auto-completed by hydration, visits or identical input events', async ({ page }) => {
  const raw = JSON.stringify({ completed: [], data: { 'problem-input': 'Synthetic problem', 'accomplishment-input': 'Synthetic accomplishment' } });
  await load(page, { raw });
  await page.locator('#quick-reference-link').click();
  await go(page, ids[0]);
  await page.locator('#test-problem').dispatchEvent('input');
  expect((await state(page)).completedSections).toEqual([]);
  expect((await calls(page)).writes).toBe(0);
  await expect(page.locator('#next-section')).toBeDisabled();
  await page.locator('#test-problem').fill('Meaningfully changed synthetic draft');
  expect((await state(page)).completedSections).toEqual([ids[0]]);
  expect((await calls(page)).writes).toBe(1);
});

test('explicit elements survive DOM reorder before/after mounting, decoys, and adapter serialization', async ({ page }) => {
  await load(page, { reorder: true });
  await expect(page.locator('#view-0')).toBeVisible();
  expect(await page.locator('#views > section').first().getAttribute('id')).toBe('view-7');
  await page.evaluate(() => {
    const views = document.querySelector('#views');
    const decoy = document.createElement('section'); decoy.className = 'lesson-view'; decoy.hidden = true; decoy.id = 'inside-decoy';
    views.prepend(decoy);
    views.append(document.querySelector('#view-1'));
    views.prepend(document.querySelector('#view-2'));
  });
  await page.locator('#test-problem').fill('Synthetic problem');
  await page.locator('#test-accomplishment').fill('Synthetic accomplishment');
  await page.locator('#next-section').click();
  await expect(page.locator('#heading-sequence')).toBeFocused();
  await page.locator('#test-checkpoint').click();
  await expect(page.locator('#next-section')).toBeDisabled();
  await page.locator('#test-explore').click();
  await page.locator('#next-section').click();
  await expect(page.locator('#heading-analysis')).toBeFocused();
  await expect(page.locator('#inside-decoy')).toBeHidden();
  await expect(page.locator('#outside-view')).toBeHidden();
  const raw = JSON.parse(await page.evaluate(() => window.navigationHarness.store.originalRaw));
  expect(raw.completed).toEqual([0, 1]);
  expect(raw.data.timelineSeen).toEqual(['stage-1', 'stage-2']);
  await page.reload(); await expect(page.locator('html')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#view-0')).toBeVisible();
  expect((await state(page)).completedSections).toEqual([ids[0], ids[1]]);
  expect((await calls(page)).writes).toBe(0);
});

test('successful navigation focuses without heading scroll and resets window scroll; state updates leave both alone', async ({ page }) => {
  await load(page, { raw: record([0, 1]) });
  const observed = await page.evaluate(() => {
    const { navigation, store } = window.navigationHarness;
    document.querySelector('#views').style.minHeight = '2200px';
    const input = document.querySelector('#test-problem'); input.focus({ preventScroll: true });
    window.scrollTo({ top: 250, behavior: 'instant' });
    const before = { y: window.scrollY, calls: window.navigationCalls.scrolls };
    navigation.update(store.state);
    const after = { y: window.scrollY, calls: window.navigationCalls.scrolls, focus: document.activeElement.id };
    navigation.go('opening-sequence');
    return { before, after, final: { y: window.scrollY, calls: window.navigationCalls.scrolls, focus: document.activeElement.id } };
  });
  expect(observed.before.y).toBe(250);
  expect(observed.after).toEqual({ ...observed.before, focus: 'test-problem' });
  expect(observed.final).toEqual({ y: 0, calls: observed.before.calls + 1, focus: 'heading-sequence' });
});

test('destroy/remount removes listeners and owned controls, restores heading tabindex, and rejects duplicate mounts', async ({ page }) => {
  await load(page, { raw: record([0, 1]) });
  expect(await page.evaluate(() => {
    const { mountNavigation, sections, store } = window.navigationHarness;
    try { mountNavigation(document.querySelector('#navigation-harness'), { sections, state: store.state }); } catch (error) { return error.message; }
  })).toContain('already mounted');
  await page.evaluate(() => {
    window.oldButton = document.querySelector('[data-go="opening-sequence"]');
    window.oldNavigation = window.navigationHarness.navigation;
    window.oldNavigation.destroy(); window.oldNavigation.destroy();
  });
  await expect(page.locator('#rail-links button')).toHaveCount(0);
  await expect(page.locator('#section-select option')).toHaveCount(0);
  await expect(page.locator('#heading-contributions')).not.toHaveAttribute('tabindex');
  await page.evaluate(() => {
    const { sections } = window.navigationHarness;
    // Explicit intended heading beats an earlier incidental heading.
    const incidental = document.createElement('h3'); incidental.textContent = 'Incidental test heading';
    sections[0].view.prepend(incidental);
    sections[0].heading = document.querySelector('#heading-contributions');
    window.navigationHarness.remount(); window.navigationHarness.remount();
  });
  await expect(page.locator('#heading-contributions')).toBeFocused();
  await expect(page.locator('#rail-links button')).toHaveCount(8);
  await expect(page.locator('#section-select option')).toHaveCount(8);
  const before = (await calls(page)).scrolls;
  expect(await page.evaluate(() => { window.oldButton.click(); window.oldNavigation.update({ completedSections: [] }); return window.oldNavigation.go('opening-sequence'); })).toBe(false);
  expect((await calls(page)).scrolls).toBe(before);
  await go(page, ids[1]);
  expect((await calls(page)).scrolls).toBe(before + 1);
  if (await page.locator('#rail-toggle').isVisible()) {
    await page.locator('#rail-toggle').click();
    await expect(page.locator('#rail-toggle')).toHaveAttribute('aria-expanded', 'false');
  }
  expect((await calls(page)).writes).toBe(0);
});

for (const failure of ['corrupt', 'quota']) {
  test(`${failure} storage retains in-memory completion/unlocking with a nonblocking warning and unchanged stored bytes`, async ({ page }) => {
    const raw = failure === 'corrupt' ? '{invalid JSON' : null;
    await load(page, { raw, failure });
    await page.locator('#test-problem').fill('Synthetic session-only problem');
    await page.locator('#test-accomplishment').fill('Synthetic session-only accomplishment');
    await expect(page.locator('#storage-warning')).not.toBeEmpty();
    await expect(page.locator('#storage-warning')).toHaveAttribute('role', 'status');
    await expect(page.locator('#next-section')).toBeEnabled();
    await page.locator('#next-section').click();
    await expect(page.locator('#heading-sequence')).toBeFocused();
    expect((await state(page)).completedSections).toEqual([ids[0]]);
    expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
    expect((await calls(page)).writes).toBe(failure === 'corrupt' ? 0 : 2);
  });
}
