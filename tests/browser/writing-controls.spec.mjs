// MIT tests; original instruction © Rhys Jones, CC BY 4.0. Actual public pages.
import {test, expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {openingAdapter} from '../../lessons/opening/progress-adapter.js';
import {middleAdapter} from '../../lessons/middle/progress-adapter.js';
import {finalAdapter} from '../../lessons/final/progress-adapter.js';
import {original} from '../helpers/baseline-source.mjs';
import {baselineReadersSource} from '../helpers/baseline-activities.mjs';
import {publicVisit} from '../helpers/browser-probe.mjs';
const json = path => JSON.parse(readFileSync(new URL(`../../${path}`, import.meta.url)));
const adapters = {opening: openingAdapter, middle: middleAdapter, final: finalAdapter};
const tools = {opening: [['consensus-writing', 'give-direction']], middle: [['evidence-writing', 'evidence'], ['integrated-writing', 'integrated-practice']], final: [['synthesis-writing', 'connect-viewpoints'], ['closing-writing', 'closing-practice']]};
const fixture = id => json(`tests/fixtures/progress/${id}/completed.json`).raw;
const raw = (page, id) => page.evaluate(key => localStorage.getItem(key), adapters[id].key);
const own = (page, id) => page.locator(`[data-activity-id="${id}"]`);
const field = (page, id) => page.locator(`[data-field-id="${id}"]`);
const errors = new WeakMap();
test.beforeEach(({page}) => {const list = []; errors.set(page, list); page.on('pageerror', e => list.push(e.message));});
test.afterEach(({page}) => expect(errors.get(page)).toEqual([]));
async function load(page, mount, id, record) {
  await page.goto(mount); await page.evaluate(({key, record}) => localStorage.setItem(key, record), {key: adapters[id].key, record});
  await page.goto(`${mount}${id}.html`); await expect(page.locator('#lesson-status')).toHaveCount(1); await expect(page.locator('#lesson-status')).toBeHidden();
}
function emptyWriting(id) {
  const adapter = adapters[id], before = JSON.parse(fixture(id)), state = adapter.decode(before);
  for (const field of Object.keys(state.fields)) state.fields[field] = '';
  for (const flag of Object.keys(state.flags).filter(key => /assembled|model/.test(key))) state.flags[flag] = false;
  state.ui['consensus-model-visible'] = false;
  return JSON.stringify(adapter.encode(state, before));
}

for (const mount of ['/', '/discussion-skills-lab/']) {
  for (const id of ['opening', 'middle', 'final']) {
    test(`${mount}${id} public writing fields/models/checklists preserve independent original labels/modes and silent saved hydration`, async ({page}) => {
      const record = fixture(id); await load(page, mount, id, record);
      const expected = await page.evaluate(({source, banks, map, id, middleSource, readers}) => {
        const {writingActivities} = (0, eval)(readers);
        return writingActivities(new DOMParser().parseFromString(source, 'text/html'), banks, map, id, middleSource);
      }, {source: original(`${id}.html`).toString(), banks: json('tests/fixtures/content/banks.json'), map: json(`tests/fixtures/legacy-maps/${id}.json`), id,
        middleSource: id === 'middle' ? original('assets/js/middle.js').toString() : '', readers: baselineReadersSource});
      const restored = adapters[id].decode(JSON.parse(record));
      for (const item of expected) {
        await publicVisit(page, item.section);
        const host = own(page, item.id);
        for (const descriptor of [...item.data.fields, ...(item.data.output ? [item.data.output] : [])]) {
          const input = field(page, descriptor.id); await expect(input).toHaveValue(restored.fields[descriptor.id]);
          await expect(input).toHaveAccessibleName(descriptor.label); await expect(input).toHaveJSProperty('readOnly', descriptor.readonly);
          await expect(input).toHaveJSProperty('maxLength', descriptor.maxLength ?? -1);
          if (descriptor.rows) await expect(input).toHaveAttribute('rows', String(descriptor.rows));
          if (descriptor.placeholder) await expect(input).toHaveAttribute('placeholder', descriptor.placeholder);
        }
        for (const block of item.data.model.blocks) await expect(host.locator('.dsl-writing-model')).toContainText(block.text);
        for (const check of item.checklist.data.items) await expect(page.locator(`[data-activity-id="${item.checklist.id}"] [data-check-id="${check.id}"]`)).toHaveAccessibleName(check.text);
      }
      expect(await raw(page, id)).toBe(record);
    });

    test(`${mount}${id} public writing saves every input immediately, excludes decoys and never overwrites edited output without assembly`, async ({page}) => {
      await load(page, mount, id, emptyWriting(id));
      for (const [activityId, section] of tools[id]) {
        await publicVisit(page, section);
        const item = json(`content/${id}/activities/${activityId}.json`), host = own(page, activityId);
        await host.evaluate(n => n.prepend(Object.assign(document.createElement('textarea'), {value: 'must never be serialized'})));
        if (item.data.assembly) {
          const before = await raw(page, id); await host.locator('.dsl-assemble').click(); expect(await raw(page, id)).toBe(before);
          await expect(field(page, item.data.output.id)).toHaveValue('');
        }
        for (const [index, descriptor] of item.data.fields.entries()) {
          const value = descriptor.multiline ? `Synthetic 學生 ${index}\npartial draft` : `Synthetic 學生 ${index} partial draft`;
          await field(page, descriptor.id).fill(value);
          expect(adapters[id].decode(JSON.parse(await raw(page, id))).fields[descriptor.id]).toBe(value);
          if (item.data.output) await expect(field(page, item.data.output.id)).toHaveValue('');
        }
        if (item.data.assembly) {
          await host.locator('.dsl-assemble').click(); const output = field(page, item.data.output.id);
          await expect(output).not.toHaveValue('');
          if (id !== 'middle') {
            await output.fill('Student-edited output 🧭\n<em>plain text, not HTML</em>');
            expect(adapters[id].decode(JSON.parse(await raw(page, id))).fields[item.data.output.id]).toBe('Student-edited output 🧭\n<em>plain text, not HTML</em>');
            await expect(host.locator('em')).toHaveCount(0);
          } else await expect(output).toHaveAttribute('readonly', '');
          const value = await output.inputValue(); await field(page, item.data.fields[0].id).fill('Changed input without assembly'); await expect(output).toHaveValue(value);
          await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden(); await publicVisit(page, section); await expect(output).toHaveValue(value);
          await host.locator('.dsl-assemble').click(); await expect(output).not.toHaveValue(value);
        } else {
          const value = await field(page, item.data.fields[0].id).inputValue(); await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden(); await publicVisit(page, section); await expect(field(page, item.data.fields[0].id)).toHaveValue(value);
        }
        expect(await raw(page, id)).not.toContain('must never be serialized');
      }
    });

    test(`${mount}${id} public model modes restore independently without changing retained drafts`, async ({page}) => {
      const record = JSON.parse(emptyWriting(id));
      // Final's encoder correctly retains already-earned model-view facts. Seed
      // the explicit unviewed legacy facts for this isolated synthetic case.
      if (id === 'final') {record.data.finalState.builderModel = false; record.data.finalState.closingModel = false;}
      await load(page, mount, id, JSON.stringify(record));
      for (const [activityId, section] of tools[id]) {
        await publicVisit(page, section);
        const item = json(`content/${id}/activities/${activityId}.json`), host = own(page, activityId);
        const input = field(page, item.data.fields[0].id), draft = `Synthetic retained model draft ${activityId} ✓`;
        await input.fill(draft); const before = await raw(page, id);
        const toggle = host.locator('.dsl-model-toggle'), model = host.locator('.dsl-writing-model');
        await expect(model).toBeHidden(); await toggle.focus(); await toggle.press('Enter');
        await expect(toggle).toBeFocused(); await expect(toggle).toHaveAttribute('aria-expanded', 'true'); await expect(model).toBeVisible();
        if (id === 'opening') {
          expect(await raw(page, id)).toBe(before);
          await toggle.press('Enter'); await expect(model).toBeHidden(); expect(await raw(page, id)).toBe(before);
        } else {
          const shown = await raw(page, id); expect(shown).not.toBe(before);
          // Show-only models neither fold away nor emit another persistence fact.
          await toggle.press('Enter'); await expect(model).toBeVisible(); expect(await raw(page, id)).toBe(shown);
        }
        const saved = await raw(page, id); await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden(); await publicVisit(page, section);
        await expect(input).toHaveValue(draft); expect(await raw(page, id)).toBe(saved);
        if (id === 'opening') await expect(model).toBeHidden(); else await expect(model).toBeVisible();
      }
    });
  }

  for (const mode of ['success', 'denied', 'unavailable']) test(`${mount} public clipboard ${mode} copies/selects exact text without progress changes`, async ({page}) => {
    await page.addInitScript(mode => {
      window.copyCalls = [];
      Object.defineProperty(navigator, 'clipboard', {configurable: true, value: mode === 'unavailable' ? undefined : {writeText: async text => {window.copyCalls.push(text); if (mode === 'denied') throw Error('Synthetic denial');}}});
    }, mode);
    await load(page, mount, 'final', emptyWriting('final')); await publicVisit(page, 'closing-practice');
    const host = own(page, 'closing-writing'), input = field(page, 'closing-draft');
    await host.locator('.dsl-copy').click(); await expect(host.locator('.dsl-writing-status')).toHaveText('Write a response before copying.');
    const text = 'Copy exact Unicode 🧭\nsecond line'; await input.fill(text); const before = await raw(page, 'final');
    const copy = host.locator('.dsl-copy'); await copy.focus(); await copy.press('Enter');
    if (mode === 'success') {
      await expect(host.locator('.dsl-writing-status')).toHaveText('Copied to clipboard.'); await expect(copy).toBeFocused(); expect(await page.evaluate(() => window.copyCalls)).toEqual([text]);
    } else {
      await expect(host.locator('.dsl-writing-status')).toContainText('text is selected'); await expect(input).toBeFocused(); expect(await input.evaluate(n => [n.selectionStart, n.selectionEnd])).toEqual([0, text.length]);
    }
    expect(await raw(page, 'final')).toBe(before); await expect(page.locator('[data-clipboard-fallback]')).toHaveCount(0);
  });
}
