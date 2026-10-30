// MIT. Real browser Storage + exported store/adapters; no migration controls/page.
import {test, expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {apiPage} from '../helpers/browser-probe.mjs';
import {maps, ready} from '../helpers/legacy-journeys.mjs';
const fixture = (id, name) => JSON.parse(readFileSync(new URL(`../fixtures/progress/${id}/${name}.json`, import.meta.url)));
const errors = new WeakMap();
test.beforeEach(({page}) => {const list = []; errors.set(page, list); page.on('pageerror', e => list.push(e.message));});
test.afterEach(({page}) => expect(errors.get(page)).toEqual([]));

async function open(page, mount, id, raw, mode) {
  await apiPage(page, mount);
  await page.evaluate(async ({mount, id, raw, mode}) => {
    const {openProgress} = await import(new URL(`${mount}assets/js/app/progress-store.js`, location.origin));
    const module = await import(new URL(`${mount}lessons/${id}/progress-adapter.js`, location.origin)), adapter = module[`${id}Adapter`], key = adapter.key;
    const field = {opening: 'consensus-draft', middle: 'integrated-draft', final: 'closing-draft'}[id];
    const get = Storage.prototype.getItem, set = Storage.prototype.setItem;
    if (raw === null) localStorage.removeItem(key); else set.call(localStorage, key, raw);
    const calls = {reads: 0, writes: 0};
    Storage.prototype.getItem = function(name) {if (name === key) {calls.reads++; if (mode === 'denied') throw new DOMException('Synthetic denial', 'SecurityError');} return get.call(this, name);};
    Storage.prototype.setItem = function(name, value) {if (name === key) {calls.writes++; if (mode === 'quota') throw new DOMException('Synthetic quota', 'QuotaExceededError');} return set.call(this, name, value);};
    const store = openProgress({key, adapter});
    const decoy = document.createElement('textarea'); decoy.value = 'must never be serialized'; document.body.prepend(decoy);
    window.progressProbe = {store, field, calls, raw: () => get.call(localStorage, key),
      draft(text) {const state = store.state; state.fields[field] = text; return store.save(state);},
      credit() {const state = store.state; state.completedSections.push(adapter.sections[0]); return store.save(state);},
      extend() {const state = store.state; if (id === 'opening') state.activities['sequence-checkpoint'].selections['next-step'] = 'propose-solutions'; if (id === 'middle') state.flags['research-model-visible'] = true; store.save(state);}
    };
  }, {mount, id, raw, mode});
}
const calls = page => page.evaluate(() => window.progressProbe.calls);

for (const mount of ['/', '/discussion-skills-lab/']) for (const id of ['opening', 'middle', 'final']) {
  test(`${mount}${id} real store reads once, deduplicates unchanged saves and restores exact draft/credit independent of DOM`, async ({page}) => {
    const raw = fixture(id, 'completed').raw; await open(page, mount, id, raw);
    expect(await calls(page)).toEqual({reads: 1, writes: 0}); expect(await page.evaluate(() => window.progressProbe.store.originalRaw)).toBe(raw);
    await page.evaluate(() => {const p = window.progressProbe; p.store.save(p.store.state);}); expect((await calls(page)).writes).toBe(0);
    const text = 'Synthetic draft — “quotes”, café & <not markup>.\nSecond line ✓';
    await page.evaluate(text => window.progressProbe.draft(text), text); expect((await calls(page)).writes).toBe(1);
    await page.evaluate(() => {const p = window.progressProbe; p.store.save(p.store.state);}); expect((await calls(page)).writes).toBe(1);
    const saved = await page.evaluate(() => window.progressProbe.raw()); expect(saved).not.toContain('must never be serialized'); expect(JSON.parse(saved).completed).toEqual(JSON.parse(raw).completed);
    await open(page, mount, id, saved); expect(await calls(page)).toEqual({reads: 1, writes: 0});
    expect(await page.evaluate(() => {const p = window.progressProbe; return p.store.state.fields[p.field];})).toBe(text);
    expect(await page.evaluate(() => typeof window.DSL)).toBe('undefined');
  });

  test(`${mount}${id} every unsafe saved fixture remains byte-for-byte intact while memory fields/credit remain usable`, async ({page}) => {
    for (const name of ['malformed-json', 'invalid-outer', 'invalid-data', 'malformed-nested', 'out-of-range']) {
      const raw = fixture(id, name).raw; await open(page, mount, id, raw);
      expect(await page.evaluate(() => window.progressProbe.store.diagnostics.length), name).toBeGreaterThan(0);
      expect(await page.evaluate(() => window.progressProbe.store.canPersist), name).toBe(false);
      const state = await page.evaluate(() => {const p = window.progressProbe; p.draft('Synthetic usable session-only draft\n✓'); p.credit(); return {state: p.store.state, field: p.field, raw: p.raw()};});
      expect(state.state.completedSections, name).toContain(maps[id].sections[0]); expect(state.state.fields[state.field], name).toBe('Synthetic usable session-only draft\n✓');
      expect(state.raw, name).toBe(raw); expect((await calls(page)).writes, name).toBe(0);
    }
  });

  test(`${mount}${id} denied/quota browser storage warns and retains memory without fallback writes`, async ({page}) => {
    for (const mode of ['denied', 'quota']) {
      await open(page, mount, id, null, mode);
      const result = await page.evaluate(() => {const p = window.progressProbe; p.draft('Synthetic unsaved text'); p.credit(); return {state: p.store.state, field: p.field, diagnostics: p.store.diagnostics, raw: p.store.originalRaw};});
      expect(result.diagnostics.some(item => /session|saved/.test(item.message))).toBe(true); expect(result.state.fields[result.field]).toBe('Synthetic unsaved text'); expect(result.state.completedSections).toContain(maps[id].sections[0]);
      expect(result.raw).toBeNull(); expect((await calls(page)).writes).toBe(mode === 'quota' ? 2 : 0);
    }
  });

  test(`${mount}${id} extended adapter-written payload still runs in the independently pinned original engine`, async ({page}) => {
    const record = JSON.parse(fixture(id, 'completed').raw); record.data.dslUi = {schemaVersion: 1, models: {}, selections: {}, future: {keep: [0, '✓']}};
    await open(page, mount, id, JSON.stringify(record)); const text = 'Synthetic adapter → original draft\n☃';
    await page.evaluate(text => {window.progressProbe.draft(text); window.progressProbe.extend();}, text);
    await page.goto(`/__original${mount}${id}.html`); await ready(page);
    await expect(page.locator(id === 'opening' ? '#draft-input' : id === 'middle' ? '#application-draft' : '#closing-text')).toHaveValue(text);
    const saved = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), maps[id].storageKey);
    expect(saved.completed).toHaveLength(maps[id].countedPages); expect(saved.data.dslUi.schemaVersion).toBe(1); expect(saved.data.dslUi.future).toEqual({keep: [0, '✓']});
    if (id === 'opening') expect(saved.data.sequenceCorrect).toBe(true);
    if (id === 'middle') expect(saved.data.middleState.sets.solved.application).toEqual(['a', 'b']);
  });
}
