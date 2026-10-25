import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { maps, ready } from '../helpers/legacy-journeys.mjs';
const fixture = (id, name) => JSON.parse(readFileSync(new URL(`../fixtures/progress/${id}/${name}.json`, import.meta.url)));
const harness = id => `/__fixtures/harness/storage.html?lesson=${id}`;
async function seed(page, id, raw) {
  await page.goto('/');
  await page.evaluate(({ key, raw }) => { if (raw === null) localStorage.removeItem(key); else localStorage.setItem(key, raw); }, { key: maps[id].storageKey, raw });
}
async function loaded(page, id) {
  await page.goto(harness(id));
  await expect(page.locator('html')).toHaveAttribute('data-ready', 'true');
}
async function instrument(page, failure) {
  await page.addInitScript(mode => {
    window.storageCalls = { reads: 0, writes: 0 };
    const get = Storage.prototype.getItem, set = Storage.prototype.setItem;
    Storage.prototype.getItem = function(key) {
      window.storageCalls.reads++;
      if (mode === 'read-denied' && location.pathname.includes('harness/')) throw new DOMException('Synthetic denial', 'SecurityError');
      return get.call(this, key);
    };
    Storage.prototype.setItem = function(key, value) {
      window.storageCalls.writes++;
      if (mode === 'quota' && location.pathname.includes('harness/')) throw new DOMException('Synthetic quota', 'QuotaExceededError');
      return set.call(this, key, value);
    };
  }, failure);
}
for (const id of ['opening', 'middle', 'final']) {
  test(`${id} real localStorage: hydration is read-once/write-free; draft/credit save immediately and survive reload/reorder`, async ({ page }) => {
    const errors = []; page.on('pageerror', error => errors.push(error.message));
    await seed(page, id, fixture(id, 'completed').raw);
    await instrument(page);
    await loaded(page, id);
    expect(await page.evaluate(() => window.storageCalls)).toEqual({ reads: 1, writes: 0 });
    expect(await page.evaluate(() => typeof window.DSL)).toBe('undefined');
    await page.locator('#save-unchanged').click();
    expect(await page.evaluate(() => window.storageCalls.writes)).toBe(0);
    const original = await page.evaluate(() => window.progressHarness.store.originalRaw);
    expect(original).toBe(fixture(id, 'completed').raw);
    // Reorder controls and add a decoy field. Mapping never scans this DOM.
    await page.evaluate(() => {
      const decoy = document.createElement('textarea'); decoy.value = 'must never be serialized';
      document.querySelector('main').prepend(decoy);
      document.querySelector('main').append(document.querySelector('#draft').parentElement);
    });
    const text = 'Synthetic draft — “quotes”, café & <not markup>.\nSecond line ✓';
    await page.locator('#draft').fill(text);
    expect(await page.evaluate(() => window.storageCalls.writes)).toBe(1);
    await page.locator('#save-unchanged').click();
    expect(await page.evaluate(() => window.storageCalls.writes)).toBe(1);
    const saved = await page.evaluate(key => localStorage.getItem(key), maps[id].storageKey);
    expect(saved).not.toContain('must never be serialized');
    expect(JSON.parse(saved).completed).toEqual(JSON.parse(original).completed);
    await page.reload(); await expect(page.locator('html')).toHaveAttribute('data-ready', 'true');
    await expect(page.locator('#draft')).toHaveValue(text);
    expect(await page.evaluate(() => window.storageCalls)).toEqual({ reads: 1, writes: 0 });
    expect(errors).toEqual([]);
  });
  test(`${id} all malformed fixtures remain untouched; valid independent state remains usable in memory`, async ({ page }) => {
    const errors = []; page.on('pageerror', error => errors.push(error.message));
    await instrument(page);
    for (const name of ['malformed-json', 'invalid-outer', 'invalid-data', 'malformed-nested', 'out-of-range']) {
      const raw = fixture(id, name).raw;
      await seed(page, id, raw); await loaded(page, id);
      await expect(page.locator('#storage-warning')).not.toBeEmpty();
      expect(await page.evaluate(() => window.storageCalls.writes)).toBe(0);
      await page.locator('#draft').fill('Synthetic usable session-only draft\n✓');
      await page.locator('#credit').click();
      expect(await page.evaluate(() => window.progressHarness.store.state.completedSections)).toContain(maps[id].sections[0]);
      expect(await page.evaluate(() => window.progressHarness.store.state.fields[window.progressHarness.field])).toBe('Synthetic usable session-only draft\n✓');
      expect(await page.evaluate(() => window.storageCalls.writes)).toBe(0);
      expect(await page.evaluate(key => localStorage.getItem(key), maps[id].storageKey)).toBe(raw);
    }
    expect(errors).toEqual([]);
  });
  test(`${id} unavailable/quota storage warns accessibly and retains memory without destructive fallback writes`, async ({ page }) => {
    for (const failure of ['read-denied', 'quota']) {
      // A fresh page removes previous instrumentation, while preserving this isolated origin.
      const contextPage = await page.context().newPage();
      await instrument(contextPage, failure);
      await seed(contextPage, id, null); await loaded(contextPage, id);
      await contextPage.locator('#draft').fill('Synthetic unsaved text');
      await contextPage.locator('#credit').click();
      await expect(contextPage.locator('#storage-warning')).not.toBeEmpty();
      await expect(contextPage.locator('#storage-warning')).toHaveAttribute('role', 'status');
      expect(await contextPage.evaluate(() => window.progressHarness.store.state.fields[window.progressHarness.field])).toBe('Synthetic unsaved text');
      expect(await contextPage.evaluate(() => window.progressHarness.store.state.completedSections)).toContain(maps[id].sections[0]);
      expect(await contextPage.evaluate(() => window.storageCalls.writes)).toBe(failure === 'quota' ? 2 : 0);
      expect(await contextPage.evaluate(() => window.progressHarness.store.originalRaw)).toBe(null);
      await contextPage.close();
    }
  });
  for (const mount of ['/__original/', '/__original/discussion-skills-lab/']) {
    test(`${id} adapter-written extended v1 payload remains readable by pinned original engine at ${mount}`, async ({ page }) => {
      const baseline = JSON.parse(fixture(id, 'completed').raw);
      baseline.data.dslUi = { schemaVersion: 1, models: {}, selections: {}, future: { keep: [0, '✓'] } };
      await seed(page, id, JSON.stringify(baseline)); await loaded(page, id);
      const text = 'Synthetic adapter → original draft\n☃';
      await page.locator('#draft').fill(text);
      await page.evaluate(() => {
        const { store } = window.progressHarness, state = store.state;
        // Only supported UI facts; Final has no additional UI facts in this milestone.
        if (window.progressHarness.adapter.id === 'opening') state.activities['sequence-checkpoint'].selections['next-step'] = 'propose-solutions';
        if (window.progressHarness.adapter.id === 'middle') state.flags['research-model-visible'] = true;
        store.save(state);
      });
      const errors = []; page.on('pageerror', error => errors.push(error.message));
      await page.goto(`${mount}${id}.html`); await ready(page);
      await expect(page.locator(id === 'opening' ? '#draft-input' : id === 'middle' ? '#application-draft' : '#closing-text')).toHaveValue(text);
      const raw = JSON.parse(await page.evaluate(key => localStorage.getItem(key), maps[id].storageKey));
      expect(raw.completed.length).toBe(maps[id].countedPages);
      expect(raw.data.dslUi.schemaVersion).toBe(1);
      expect(raw.data.dslUi.future).toEqual({ keep: [0, '✓'] });
      if (id === 'opening') expect(raw.data.sequenceCorrect).toBe(true);
      if (id === 'middle') expect(raw.data.middleState.sets.solved.application).toEqual(['a', 'b']);
      expect(errors).toEqual([]);
    });
  }
}
