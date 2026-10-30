# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: writing-controls.spec.mjs >> /final public model modes restore independently without changing retained drafts
- Location: tests/browser/writing-controls.spec.mjs:92:5

# Error details

```
Error: expect(locator).toBeHidden() failed

Locator:  locator('[data-activity-id="synthesis-writing"]').locator('.dsl-writing-model')
Expected: hidden
Received: visible
Timeout:  10000ms

Call log:
  - Expect "toBeHidden" with timeout 10000ms
  - waiting for locator('[data-activity-id="synthesis-writing"]').locator('.dsl-writing-model')
    24 × locator resolved to <div class="dsl-writing-model" id="dsl-component-5-model">…</div>
       - unexpected value "visible"

```

```yaml
- strong: Model synthesis
- paragraph: “Building on Maya's transportation proposal and Jordan's concern about costs, we could recommend a limited transportation pilot before committing to a larger program. Sam's suggestion to test solutions would help us evaluate the pilot, while Avery's communication idea could ensure students know the service is available.”
- paragraph: This credits contributors, connects perspectives, addresses costs, develops a coordinated recommendation, and advances the task.
```

# Test source

```ts
  1   | // MIT tests; original instruction © Rhys Jones, CC BY 4.0. Actual public pages.
  2   | import {test, expect} from '@playwright/test';
  3   | import {readFileSync} from 'node:fs';
  4   | import {openingAdapter} from '../../lessons/opening/progress-adapter.js';
  5   | import {middleAdapter} from '../../lessons/middle/progress-adapter.js';
  6   | import {finalAdapter} from '../../lessons/final/progress-adapter.js';
  7   | import {original} from '../helpers/baseline-source.mjs';
  8   | import {baselineReadersSource} from '../helpers/baseline-activities.mjs';
  9   | import {publicVisit} from '../helpers/browser-probe.mjs';
  10  | const json = path => JSON.parse(readFileSync(new URL(`../../${path}`, import.meta.url)));
  11  | const adapters = {opening: openingAdapter, middle: middleAdapter, final: finalAdapter};
  12  | const tools = {opening: [['consensus-writing', 'give-direction']], middle: [['evidence-writing', 'evidence'], ['integrated-writing', 'integrated-practice']], final: [['synthesis-writing', 'connect-viewpoints'], ['closing-writing', 'closing-practice']]};
  13  | const fixture = id => json(`tests/fixtures/progress/${id}/completed.json`).raw;
  14  | const raw = (page, id) => page.evaluate(key => localStorage.getItem(key), adapters[id].key);
  15  | const own = (page, id) => page.locator(`[data-activity-id="${id}"]`);
  16  | const field = (page, id) => page.locator(`[data-field-id="${id}"]`);
  17  | const errors = new WeakMap();
  18  | test.beforeEach(({page}) => {const list = []; errors.set(page, list); page.on('pageerror', e => list.push(e.message));});
  19  | test.afterEach(({page}) => expect(errors.get(page)).toEqual([]));
  20  | async function load(page, mount, id, record) {
  21  |   await page.goto(mount); await page.evaluate(({key, record}) => localStorage.setItem(key, record), {key: adapters[id].key, record});
  22  |   await page.goto(`${mount}${id}.html`); await expect(page.locator('#lesson-status')).toHaveCount(1); await expect(page.locator('#lesson-status')).toBeHidden();
  23  | }
  24  | function emptyWriting(id) {
  25  |   const adapter = adapters[id], before = JSON.parse(fixture(id)), state = adapter.decode(before);
  26  |   for (const field of Object.keys(state.fields)) state.fields[field] = '';
  27  |   for (const flag of Object.keys(state.flags).filter(key => /assembled|model/.test(key))) state.flags[flag] = false;
  28  |   state.ui['consensus-model-visible'] = false;
  29  |   return JSON.stringify(adapter.encode(state, before));
  30  | }
  31  | 
  32  | for (const mount of ['/', '/discussion-skills-lab/']) {
  33  |   for (const id of ['opening', 'middle', 'final']) {
  34  |     test(`${mount}${id} public writing fields/models/checklists preserve independent original labels/modes and silent saved hydration`, async ({page}) => {
  35  |       const record = fixture(id); await load(page, mount, id, record);
  36  |       const expected = await page.evaluate(({source, banks, map, id, middleSource, readers}) => {
  37  |         const {writingActivities} = (0, eval)(readers);
  38  |         return writingActivities(new DOMParser().parseFromString(source, 'text/html'), banks, map, id, middleSource);
  39  |       }, {source: original(`${id}.html`).toString(), banks: json('tests/fixtures/content/banks.json'), map: json(`tests/fixtures/legacy-maps/${id}.json`), id,
  40  |         middleSource: id === 'middle' ? original('assets/js/middle.js').toString() : '', readers: baselineReadersSource});
  41  |       const restored = adapters[id].decode(JSON.parse(record));
  42  |       for (const item of expected) {
  43  |         await publicVisit(page, item.section);
  44  |         const host = own(page, item.id);
  45  |         for (const descriptor of [...item.data.fields, ...(item.data.output ? [item.data.output] : [])]) {
  46  |           const input = field(page, descriptor.id); await expect(input).toHaveValue(restored.fields[descriptor.id]);
  47  |           await expect(input).toHaveAccessibleName(descriptor.label); await expect(input).toHaveJSProperty('readOnly', descriptor.readonly);
  48  |           await expect(input).toHaveJSProperty('maxLength', descriptor.maxLength ?? -1);
  49  |           if (descriptor.rows) await expect(input).toHaveAttribute('rows', String(descriptor.rows));
  50  |           if (descriptor.placeholder) await expect(input).toHaveAttribute('placeholder', descriptor.placeholder);
  51  |         }
  52  |         for (const block of item.data.model.blocks) await expect(host.locator('.dsl-writing-model')).toContainText(block.text);
  53  |         for (const check of item.checklist.data.items) await expect(page.locator(`[data-activity-id="${item.checklist.id}"] [data-check-id="${check.id}"]`)).toHaveAccessibleName(check.text);
  54  |       }
  55  |       expect(await raw(page, id)).toBe(record);
  56  |     });
  57  | 
  58  |     test(`${mount}${id} public writing saves every input immediately, excludes decoys and never overwrites edited output without assembly`, async ({page}) => {
  59  |       await load(page, mount, id, emptyWriting(id));
  60  |       for (const [activityId, section] of tools[id]) {
  61  |         await publicVisit(page, section);
  62  |         const item = json(`content/${id}/activities/${activityId}.json`), host = own(page, activityId);
  63  |         await host.evaluate(n => n.prepend(Object.assign(document.createElement('textarea'), {value: 'must never be serialized'})));
  64  |         if (item.data.assembly) {
  65  |           const before = await raw(page, id); await host.locator('.dsl-assemble').click(); expect(await raw(page, id)).toBe(before);
  66  |           await expect(field(page, item.data.output.id)).toHaveValue('');
  67  |         }
  68  |         for (const [index, descriptor] of item.data.fields.entries()) {
  69  |           const value = descriptor.multiline ? `Synthetic 學生 ${index}\npartial draft` : `Synthetic 學生 ${index} partial draft`;
  70  |           await field(page, descriptor.id).fill(value);
  71  |           expect(adapters[id].decode(JSON.parse(await raw(page, id))).fields[descriptor.id]).toBe(value);
  72  |           if (item.data.output) await expect(field(page, item.data.output.id)).toHaveValue('');
  73  |         }
  74  |         if (item.data.assembly) {
  75  |           await host.locator('.dsl-assemble').click(); const output = field(page, item.data.output.id);
  76  |           await expect(output).not.toHaveValue('');
  77  |           if (id !== 'middle') {
  78  |             await output.fill('Student-edited output 🧭\n<em>plain text, not HTML</em>');
  79  |             expect(adapters[id].decode(JSON.parse(await raw(page, id))).fields[item.data.output.id]).toBe('Student-edited output 🧭\n<em>plain text, not HTML</em>');
  80  |             await expect(host.locator('em')).toHaveCount(0);
  81  |           } else await expect(output).toHaveAttribute('readonly', '');
  82  |           const value = await output.inputValue(); await field(page, item.data.fields[0].id).fill('Changed input without assembly'); await expect(output).toHaveValue(value);
  83  |           await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden(); await publicVisit(page, section); await expect(output).toHaveValue(value);
  84  |           await host.locator('.dsl-assemble').click(); await expect(output).not.toHaveValue(value);
  85  |         } else {
  86  |           const value = await field(page, item.data.fields[0].id).inputValue(); await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden(); await publicVisit(page, section); await expect(field(page, item.data.fields[0].id)).toHaveValue(value);
  87  |         }
  88  |         expect(await raw(page, id)).not.toContain('must never be serialized');
  89  |       }
  90  |     });
  91  | 
  92  |     test(`${mount}${id} public model modes restore independently without changing retained drafts`, async ({page}) => {
  93  |       await load(page, mount, id, emptyWriting(id));
  94  |       for (const [activityId, section] of tools[id]) {
  95  |         await publicVisit(page, section);
  96  |         const item = json(`content/${id}/activities/${activityId}.json`), host = own(page, activityId);
  97  |         const input = field(page, item.data.fields[0].id), draft = `Synthetic retained model draft ${activityId} ✓`;
  98  |         await input.fill(draft); const before = await raw(page, id);
  99  |         const toggle = host.locator('.dsl-model-toggle'), model = host.locator('.dsl-writing-model');
> 100 |         await expect(model).toBeHidden(); await toggle.focus(); await toggle.press('Enter');
      |                             ^ Error: expect(locator).toBeHidden() failed
  101 |         await expect(toggle).toBeFocused(); await expect(toggle).toHaveAttribute('aria-expanded', 'true'); await expect(model).toBeVisible();
  102 |         if (id === 'opening') {
  103 |           expect(await raw(page, id)).toBe(before);
  104 |           await toggle.press('Enter'); await expect(model).toBeHidden(); expect(await raw(page, id)).toBe(before);
  105 |         } else {
  106 |           const shown = await raw(page, id); expect(shown).not.toBe(before);
  107 |           // Show-only models neither fold away nor emit another persistence fact.
  108 |           await toggle.press('Enter'); await expect(model).toBeVisible(); expect(await raw(page, id)).toBe(shown);
  109 |         }
  110 |         const saved = await raw(page, id); await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden(); await publicVisit(page, section);
  111 |         await expect(input).toHaveValue(draft); expect(await raw(page, id)).toBe(saved);
  112 |         if (id === 'opening') await expect(model).toBeHidden(); else await expect(model).toBeVisible();
  113 |       }
  114 |     });
  115 |   }
  116 | 
  117 |   for (const mode of ['success', 'denied', 'unavailable']) test(`${mount} public clipboard ${mode} copies/selects exact text without progress changes`, async ({page}) => {
  118 |     await page.addInitScript(mode => {
  119 |       window.copyCalls = [];
  120 |       Object.defineProperty(navigator, 'clipboard', {configurable: true, value: mode === 'unavailable' ? undefined : {writeText: async text => {window.copyCalls.push(text); if (mode === 'denied') throw Error('Synthetic denial');}}});
  121 |     }, mode);
  122 |     await load(page, mount, 'final', emptyWriting('final')); await publicVisit(page, 'closing-practice');
  123 |     const host = own(page, 'closing-writing'), input = field(page, 'closing-draft');
  124 |     await host.locator('.dsl-copy').click(); await expect(host.locator('.dsl-writing-status')).toHaveText('Write a response before copying.');
  125 |     const text = 'Copy exact Unicode 🧭\nsecond line'; await input.fill(text); const before = await raw(page, 'final');
  126 |     const copy = host.locator('.dsl-copy'); await copy.focus(); await copy.press('Enter');
  127 |     if (mode === 'success') {
  128 |       await expect(host.locator('.dsl-writing-status')).toHaveText('Copied to clipboard.'); await expect(copy).toBeFocused(); expect(await page.evaluate(() => window.copyCalls)).toEqual([text]);
  129 |     } else {
  130 |       await expect(host.locator('.dsl-writing-status')).toContainText('text is selected'); await expect(input).toBeFocused(); expect(await input.evaluate(n => [n.selectionStart, n.selectionEnd])).toEqual([0, text.length]);
  131 |     }
  132 |     expect(await raw(page, 'final')).toBe(before); await expect(page.locator('[data-clipboard-fallback]')).toHaveCount(0);
  133 |   });
  134 | }
  135 | 
```