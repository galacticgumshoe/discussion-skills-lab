# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: component-contracts.spec.mjs >> / reference API preloads/retries independently, prints semantically, remounts once and never touches storage
- Location: tests/browser/component-contracts.spec.mjs:170:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('[data-reference-status]')
Expected: visible
Received: hidden
Timeout:  10000ms

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-reference-status]')
    24 × locator resolved to <p data-reference-status="">Quick Reference could not load (/content/final/re…</p>
       - unexpected value "hidden"

```

```yaml
- text: Test ordinary draft
```

# Test source

```ts
  89  |       cards.id = 'cards'; panels.id = 'panels'; timeline.id = 'timeline'; main.append(cards, panels, timeline); document.body.append(main);
  90  |       const decoy = document.createElement('div'); decoy.id = 'decoy'; decoy.innerHTML = '<button class="flip choice">Test unaffected button</button><details class="dsl-expandable"><summary>Test unaffected row</summary>Test body</details>'; document.body.append(decoy);
  91  |       let events = 0, cardState = {exploredIds: [], backIds: []}, panelState = {exploredIds: ['b'], openIds: ['a']}, timelineState = {exploredIds: [], openIds: []};
  92  |       const cardData = {items: [{id: 'a', front: 'Test front', back: 'Test back '.repeat(50)}]};
  93  |       const panelData = {items: [{id: 'a', title: 'Test A', body: 'Test body A'}, {id: 'b', title: 'Test B', body: 'Test body B'}]};
  94  |       const a = mountFlashcards(cards, {data: cardData, state: cardState, onChange(s) {cardState = s; events++;}});
  95  |       const b = mountExpandables(panels, {data: panelData, profile: 'standard', state: panelState, onChange(s) {panelState = s; events++;}});
  96  |       const c = mountExpandables(timeline, {data: panelData, profile: 'timeline', state: timelineState, onChange(s) {timelineState = s; events++;}});
  97  |       window.faces = {get card() {return cardState;}, get panels() {return panelState;}, get timeline() {return timelineState;}, get events() {return events;}, update() {a.update(cardState); b.update(panelState); c.update(timelineState);}, duplicate() {try {mountFlashcards(cards, {data: cardData, state: cardState});} catch(e) {return e.message;}}};
  98  |       window.faces.update(); window.faces.update();
  99  |     }, mount);
  100 |     await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  101 |     expect(await page.evaluate(() => window.faces.events)).toBe(0);
  102 |     const panel = page.locator('#panels [data-panel-id="a"]'); await expect(panel).toHaveJSProperty('open', true);
  103 |     expect(await page.evaluate(() => window.faces.panels.exploredIds)).toEqual(['b']);
  104 |     await panel.locator('summary').focus(); await panel.locator('summary').press('Enter');
  105 |     await expect(panel).toHaveJSProperty('open', false);
  106 |     await expect.poll(() => page.evaluate(() => window.faces.events)).toBe(1);
  107 |     expect(await page.evaluate(() => window.faces.panels.exploredIds)).toEqual(['b']);
  108 |     await panel.locator('summary').press('Space'); await expect.poll(() => page.evaluate(() => window.faces.panels.exploredIds)).toEqual(['b', 'a']);
  109 |     const timeline = page.locator('#timeline [data-panel-id="a"] button'); await timeline.focus(); await timeline.press('Enter');
  110 |     await expect(timeline).toHaveAttribute('aria-expanded', 'true'); const target = await timeline.getAttribute('aria-controls'); await expect(page.locator(`[id="${target}"]`)).toBeVisible();
  111 |     await timeline.press('Space'); await expect(timeline).toHaveAttribute('aria-expanded', 'false'); await expect(timeline.locator('.dsl-panel-explored')).toBeVisible();
  112 |     const card = page.locator('#cards [data-card-id="a"]'); await card.focus(); await card.press('Enter'); await settle(page);
  113 |     await expect(card).toBeFocused(); await expect(card).toHaveAttribute('aria-pressed', 'true'); await expect(card.locator('.dsl-card-front')).toHaveAttribute('aria-hidden', 'true');
  114 |     await expect(card).toHaveAccessibleDescription('Test back '.repeat(50).trim());
  115 |     await page.setViewportSize({width: 320, height: 900});
  116 |     expect(await card.evaluate(n => n.scrollWidth <= n.clientWidth + 1 && n.scrollHeight <= n.clientHeight + 2)).toBe(true);
  117 |     expect(await card.locator('.dsl-card-inner').evaluate(n => getComputedStyle(n).transform)).toContain('matrix3d');
  118 |     await expect(card.locator('.dsl-card-back')).toHaveCSS('background-color', 'rgb(20, 43, 73)'); await expect(card.locator('.dsl-card-back')).toHaveCSS('color', 'rgb(255, 255, 255)');
  119 |     await card.press('Space'); await settle(page); expect(await page.evaluate(() => window.faces.card)).toEqual({exploredIds: ['a'], backIds: []});
  120 |     await expect(card.locator('.dsl-card-front > .dsl-card-explored')).toBeVisible();
  121 |     const decoy = page.locator('#decoy button,#decoy details'), paint = () => decoy.evaluateAll(nodes => nodes.map(n => {const s = getComputedStyle(n); return [s.color, s.backgroundColor, s.padding, s.border, s.display];}));
  122 |     const before = await paint(); await page.locator('link[href$="components.css"]').evaluate(n => {n.disabled = true;}); expect(await paint()).toEqual(before); await page.locator('link[href$="components.css"]').evaluate(n => {n.disabled = false;});
  123 |     await page.emulateMedia({reducedMotion: 'reduce'}); await expect(card.locator('.dsl-card-inner')).toHaveCSS('transition-duration', '0s');
  124 |     expect(await page.evaluate(() => window.faces.duplicate())).toContain('already mounted');
  125 |   });
  126 | 
  127 |   test(`${mount} writing/checklist API preserves caret, callbacks and late clipboard denial across destroy/remount`, async ({page}) => {
  128 |     await apiPage(page, mount);
  129 |     await page.evaluate(async mount => {
  130 |       const root = new URL(mount, location.origin);
  131 |       const {mountWritingActivity} = await import(new URL('assets/js/components/writing-activity.js', root));
  132 |       const {mountChecklist} = await import(new URL('assets/js/components/checklist.js', root));
  133 |       const main = document.createElement('main'), writer = document.createElement('div'), checks = document.createElement('div'); writer.id = 'writer'; checks.id = 'checks'; main.append(writer, checks); document.body.append(main);
  134 |       const data = {fields: [{id: 'draft', label: 'Test draft', multiline: true, rows: 3, readonly: false, maxLength: 1000, placeholder: 'Test placeholder'}], copyFieldId: 'draft', copyLabel: 'Test copy', model: {mode: 'show-only', showLabel: 'Test model', blocks: [{kind: 'paragraph', text: 'Test model body'}]}};
  135 |       let state = {fields: {draft: 'Test draft body'}, modelVisible: false, assembled: false}, checked = {checkedIds: []}, events = 0, a, b;
  136 |       const mountBoth = () => {a = mountWritingActivity(writer, {data, state, onChange(s) {state = s; events++;}}); b = mountChecklist(checks, {data: {items: [{id: 'a', text: 'Test check'}]}, state: checked, onChange(s) {checked = s; events++;}});};
  137 |       mountBoth();
  138 |       Object.defineProperty(navigator, 'clipboard', {configurable: true, value: {writeText: () => new Promise((_, reject) => {window.denyCopy = reject;})}});
  139 |       window.writer = {get events() {return events;}, update() {a.update(state); b.update(checked);}, remount() {a.destroy(); b.destroy(); mountBoth();}};
  140 |     }, mount);
  141 |     const input = page.getByLabel('Test draft', {exact: true}); await input.focus(); await input.evaluate(n => n.setSelectionRange(1, 3));
  142 |     await page.evaluate(() => {window.writer.update(); window.writer.update();}); await expect(input).toBeFocused(); expect(await input.evaluate(n => [n.selectionStart, n.selectionEnd])).toEqual([1, 3]);
  143 |     await expect(input).toHaveAttribute('placeholder', 'Test placeholder'); await expect(input).toHaveJSProperty('maxLength', 1000); await expect(input).toHaveJSProperty('readOnly', false);
  144 |     const oldCheck = await page.getByLabel('Test check', {exact: true}).elementHandle();
  145 |     await page.evaluate(() => {window.writer.remount(); window.writer.remount(); window.writer.update();});
  146 |     await oldCheck.evaluate(n => {n.checked = true; n.dispatchEvent(new Event('change'));}); expect(await page.evaluate(() => window.writer.events)).toBe(0);
  147 |     const check = page.getByLabel('Test check', {exact: true}); await check.focus(); await check.press('Space'); expect(await page.evaluate(() => window.writer.events)).toBe(1);
  148 |     await page.getByRole('button', {name: 'Test model', exact: true}).focus(); await page.getByRole('button', {name: 'Test model', exact: true}).press('Enter'); expect(await page.evaluate(() => window.writer.events)).toBe(2);
  149 |     await page.getByRole('button', {name: 'Test copy', exact: true}).click();
  150 |     await page.evaluate(async () => {window.writer.remount(); window.denyCopy(new Error('Synthetic late denial')); await Promise.resolve(); await Promise.resolve();});
  151 |     await expect(page.locator('#writer [role="status"]')).toBeEmpty(); await expect(page.locator('[data-clipboard-fallback]')).toHaveCount(0); expect(await page.evaluate(() => window.writer.events)).toBe(2);
  152 |   });
  153 | 
  154 |   test(`${mount} clipboard utility fallback has no storage identity, returns focus, deduplicates and cleans up`, async ({page}) => {
  155 |     await apiPage(page, mount);
  156 |     await page.evaluate(async mount => {
  157 |       const {createClipboard} = await import(new URL(`${mount}assets/js/utilities/clipboard.js`, location.origin));
  158 |       const root = document.createElement('main'), button = document.createElement('button'), status = document.createElement('p'); button.textContent = 'Test copy'; status.setAttribute('role', 'status'); root.append(button, status); document.body.append(root);
  159 |       Object.defineProperty(navigator, 'clipboard', {configurable: true, value: undefined});
  160 |       window.clipboardProbe = createClipboard(root, {getText: () => 'Test Unicode 🧭\nsecond line', status}); button.addEventListener('click', () => window.clipboardProbe.copy());
  161 |     }, mount);
  162 |     const copy = page.getByRole('button', {name: 'Test copy', exact: true}); await copy.focus(); await copy.press('Enter');
  163 |     const fallback = page.locator('[data-clipboard-fallback]'); await expect(fallback).toBeFocused(); await expect(fallback).toHaveAccessibleName('Select and copy this text');
  164 |     expect(await fallback.evaluate(n => [n.id, n.name, n.hasAttribute('data-field-id'), n.selectionStart, n.selectionEnd])).toEqual(['', '', false, 0, 'Test Unicode 🧭\nsecond line'.length]);
  165 |     await fallback.press('Escape'); await expect(fallback).toHaveCount(0); await expect(copy).toBeFocused();
  166 |     await copy.press('Enter'); await copy.press('Enter'); await expect(fallback).toHaveCount(1);
  167 |     await page.evaluate(() => window.clipboardProbe.destroy()); await expect(fallback).toHaveCount(0); await expect(copy).toBeFocused();
  168 |   });
  169 | 
  170 |   test(`${mount} reference API preloads/retries independently, prints semantically, remounts once and never touches storage`, async ({page}) => {
  171 |     await apiPage(page, mount);
  172 |     const body = `**${mount}content/final/reference/synthesis-framework.md`;
  173 |     await page.route(body, route => route.fulfill({status: 404, body: 'Synthetic missing body'}));
  174 |     await page.evaluate(async mount => {
  175 |       const root = new URL(mount, location.origin), {mountReference} = await import(new URL('assets/js/app/reference-loader.js', root));
  176 |       const ordinary = document.createElement('section'); ordinary.dataset.viewRole = 'lesson'; ordinary.textContent = 'Test ordinary draft';
  177 |       const view = document.createElement('section'); view.dataset.viewRole = 'reference'; view.hidden = true;
  178 |       const sheet = document.createElement('div'); sheet.dataset.referenceSheet = '';
  179 |       for (const [tag, attr] of [['button', 'referencePrint'], ['p', 'referenceStatus'], ['button', 'referenceRetry'], ['div', 'referenceContent']]) {const n = document.createElement(tag); n.dataset[attr] = ''; sheet.append(n);}
  180 |       view.append(sheet); document.body.append(ordinary, view);
  181 |       let storage = 0, prints = 0;
  182 |       const get = Storage.prototype.getItem, set = Storage.prototype.setItem;
  183 |       Storage.prototype.getItem = function(...args) {storage++; return get.apply(this, args);}; Storage.prototype.setItem = function(...args) {storage++; return set.apply(this, args);}; window.print = () => prints++;
  184 |       const options = {source: 'content/final/reference/reference.json', declaringUrl: root, allowedRootUrl: new URL('content/', root)};
  185 |       let ref = mountReference(sheet, options);
  186 |       window.referenceProbe = {get storage() {return storage;}, get prints() {return prints;}, async remount() {ref.destroy(); ref = mountReference(sheet, options); await ref.ready;}};
  187 |     }, mount);
  188 |     await expect(page.locator('[data-reference-status]')).toContainText('could not load'); await expect(page.locator('[data-reference-print]')).toBeDisabled();
> 189 |     await page.emulateMedia({media: 'print'}); await expect(page.locator('[data-reference-status]')).toBeVisible(); await expect(page.locator('[data-view-role="lesson"]')).toBeHidden();
      |                                                                                                      ^ Error: expect(locator).toBeVisible() failed
  190 |     await page.emulateMedia({media: 'screen'}); await page.unroute(body);
  191 |     await page.locator('[data-view-role="reference"]').evaluate(n => {n.hidden = false;}); await page.locator('[data-reference-retry]').click(); await expect(page.locator('[data-reference-print]')).toBeEnabled();
  192 |     await expect(page.locator('.final-reference-item')).toHaveCount(5); await page.locator('[data-reference-print]').click();
  193 |     await page.evaluate(() => window.referenceProbe.remount()); await page.locator('[data-reference-print]').click();
  194 |     expect(await page.evaluate(() => ({storage: window.referenceProbe.storage, prints: window.referenceProbe.prints}))).toEqual({storage: 0, prints: 2});
  195 |     await page.locator('[data-view-role="reference"]').evaluate(n => {n.hidden = true;}); await page.emulateMedia({media: 'print'}); await expect(page.locator('[data-reference-content]')).toBeVisible(); await expect(page.locator('[data-reference-print]')).toBeHidden();
  196 |   });
  197 | }
  198 | 
```