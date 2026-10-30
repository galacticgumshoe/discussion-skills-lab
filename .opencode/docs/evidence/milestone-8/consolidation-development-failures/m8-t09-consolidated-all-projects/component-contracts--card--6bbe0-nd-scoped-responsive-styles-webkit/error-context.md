# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: component-contracts.spec.mjs >> / card/panel APIs retain independent exploration, silent native hydration, ARIA and scoped responsive styles
- Location: tests/browser/component-contracts.spec.mjs:81:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - main [ref=e2]:
    - button "Test front — Return to front" [active] [pressed] [ref=e4] [cursor=pointer]:
      - generic [ref=e6]:
        - generic [ref=e8]: Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back Test back
        - generic [ref=e10]: ✓ Explored
    - generic [ref=e11]:
      - group [ref=e12]:
        - generic "Test A ✓ Explored" [ref=e13] [cursor=pointer]:
          - text: Test A
          - generic [ref=e14]: ✓ Explored
        - generic [ref=e15]: Test body A
      - group [ref=e16]:
        - generic "Test B ✓ Explored" [ref=e17] [cursor=pointer]:
          - text: Test B
          - generic [ref=e18]: ✓ Explored
    - generic [ref=e19]:
      - button "Test A ✓ Explored" [ref=e21] [cursor=pointer]:
        - text: Test A
        - generic [ref=e22]: ✓ Explored
      - button "Test B" [ref=e24] [cursor=pointer]
  - generic [ref=e25]:
    - button "Test unaffected button" [ref=e26]
    - group [ref=e27]:
      - generic "Test unaffected row" [ref=e28]
      - text: Test body
```

# Test source

```ts
  16  |           ...(profile === 'final-questions' && index === 0 ? {context: 'Test context'} : {}),
  17  |           options: [{id: 'a', text: 'Test A', feedback: 'Test wrong feedback'}, {id: 'b', text: 'Test B', feedback: 'Test correct feedback'}]}));
  18  |         let state = {selections: {}, earnedQuestionIds: [], attemptedQuestionIds: [], currentQuestionId: 'one'}, events = 0;
  19  |         const controller = mountQuestionSequence(root, {data: {questions}, profile, state, onChange(next) {state = next; events++;}});
  20  |         window.probe = {get state() {return state;}, get events() {return events;}, update() {controller.update(state);}};
  21  |       }, {mount, profile});
  22  |       const all = ['opening-knowledge-check', 'middle-application'].includes(profile);
  23  |       const host = id => all ? page.locator(`[data-question-id="${id}"]`) : page.locator('.dsl-question');
  24  |       const state = () => page.evaluate(() => window.probe.state);
  25  |       for (const id of ['one', 'two', 'three']) {
  26  |         const current = host(id), wrong = current.locator('[data-option-id="a"]'), right = current.locator('[data-option-id="b"]');
  27  |         await expect(current).toHaveAttribute('data-question-id', id);
  28  |         if (!all) await expect(page.locator('.dsl-question-next')).toBeDisabled();
  29  |         if (profile === 'final-questions') {
  30  |           if (id === 'one') await expect(current.locator('.dsl-question-context')).toHaveText('Test context');
  31  |           else await expect(current.locator('.dsl-question-context')).toBeHidden();
  32  |         }
  33  |         await wrong.focus(); await wrong.press('Enter'); await expect(wrong).toBeFocused();
  34  |         await expect(wrong).toHaveClass(/dsl-selected-incorrect/); await expect(current.locator('[aria-pressed="true"]')).toHaveCount(1);
  35  |         if (!all && profile !== 'opening-classification') await expect(page.locator('.dsl-question-next')).toBeDisabled();
  36  |         if (profile === 'opening-classification') await expect(page.locator('.dsl-question-next')).toBeEnabled();
  37  |         await right.click(); await wrong.focus(); await wrong.press('Space'); await expect(wrong).toBeFocused();
  38  |         expect((await state()).earnedQuestionIds).toContain(id); expect((await state()).selections[id]).toBe('a');
  39  |         await expect(wrong).toHaveClass(/dsl-selected-incorrect/); await expect(right).not.toHaveClass(/dsl-selected-correct/);
  40  |         await expect(current.locator('.dsl-feedback')).not.toBeEmpty();
  41  |         const before = await page.evaluate(() => window.probe.events);
  42  |         await page.evaluate(() => {window.probe.update(); window.probe.update();});
  43  |         expect(await page.evaluate(() => window.probe.events)).toBe(before); await expect(wrong).toBeFocused();
  44  |         if (!all && (id !== 'three' || profile !== 'final-questions')) {
  45  |           await expect(page.locator('.dsl-question-next')).toBeEnabled(); await page.locator('.dsl-question-next').click();
  46  |         }
  47  |       }
  48  |       expect((await state()).earnedQuestionIds).toEqual(['one', 'two', 'three']);
  49  |       if (!all) {
  50  |         if (profile === 'final-questions') {
  51  |           await expect(page.locator('.dsl-question-next')).toBeHidden();
  52  |           await page.locator('.dsl-question-previous').click(); await page.locator('.dsl-question-previous').click();
  53  |           await expect(page.locator('.dsl-question-previous')).toBeHidden();
  54  |         }
  55  |         await expect(page.locator('.dsl-question')).toHaveAttribute('data-question-id', 'one');
  56  |       }
  57  |       if (profile === 'middle-quiz') {
  58  |         await page.locator('[data-question-jump="three"]').click(); await expect(page.locator('.dsl-choice').first()).toBeFocused();
  59  |         await expect(page.locator('.dsl-question-score')).toHaveText('Score: 3/3 · 100%');
  60  |         await expect(page.locator('[data-question-jump="one"]')).toHaveText('✓ Correct · Q1');
  61  |       }
  62  |     });
  63  |   }
  64  | 
  65  |   test(`${mount} all-at-once retry clears only first unearned choice and focuses its first option`, async ({page}) => {
  66  |     await apiPage(page, mount);
  67  |     await page.evaluate(async mount => {
  68  |       const {mountQuestionSequence} = await import(new URL(`${mount}assets/js/components/question-sequence.js`, location.origin));
  69  |       const root = document.createElement('main'); document.body.append(root);
  70  |       const data = {questions: ['one', 'two', 'three'].map(id => ({id, prompt: `Test ${id}`, correctOptionId: 'b', explanation: 'Test feedback', options: [{id: 'a', text: 'Test A'}, {id: 'b', text: 'Test B'}]}))};
  71  |       window.retryState = {selections: {one: 'b', two: 'a', three: 'a'}, earnedQuestionIds: ['one'], currentQuestionId: 'one'};
  72  |       mountQuestionSequence(root, {data, profile: 'opening-knowledge-check', state: window.retryState, onChange(next) {window.retryState = next;}});
  73  |     }, mount);
  74  |     await expect(page.locator('.dsl-question-score')).toHaveText('Knowledge check: 1 of 3 correct.');
  75  |     await page.locator('.dsl-question-retry').click();
  76  |     expect(await page.evaluate(() => window.retryState.selections)).toEqual({one: 'b', three: 'a'});
  77  |     await expect(page.locator('[data-question-id="two"] button').first()).toBeFocused();
  78  |     await expect(page.locator('.dsl-question-retry')).toBeHidden();
  79  |   });
  80  | 
  81  |   test(`${mount} card/panel APIs retain independent exploration, silent native hydration, ARIA and scoped responsive styles`, async ({page}) => {
  82  |     await apiPage(page, mount);
  83  |     await page.evaluate(async mount => {
  84  |       const root = new URL(mount, location.origin);
  85  |       const {mountFlashcards} = await import(new URL('assets/js/components/flashcards.js', root));
  86  |       const {mountExpandables} = await import(new URL('assets/js/components/expandables.js', root));
  87  |       const main = document.createElement('main'); main.style.cssText = 'max-width:100%;font-size:200%;overflow-wrap:anywhere';
  88  |       const cards = document.createElement('div'), panels = document.createElement('div'), timeline = document.createElement('div');
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
> 116 |     expect(await card.evaluate(n => n.scrollWidth <= n.clientWidth + 1 && n.scrollHeight <= n.clientHeight + 2)).toBe(true);
      |                                                                                                                  ^ Error: expect(received).toBe(expected) // Object.is equality
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
  176 |       const container = document.createElement('div'); container.id = 'views'; document.body.append(container);
  177 |       const ordinary = document.createElement('section'); ordinary.className = 'lesson-view'; ordinary.dataset.viewRole = 'lesson'; ordinary.textContent = 'Test ordinary draft';
  178 |       const view = document.createElement('section'); view.className = 'lesson-view'; view.dataset.viewRole = 'reference'; view.hidden = true;
  179 |       const sheet = document.createElement('div'); sheet.dataset.referenceSheet = '';
  180 |       for (const [tag, attr] of [['button', 'referencePrint'], ['p', 'referenceStatus'], ['button', 'referenceRetry'], ['div', 'referenceContent']]) {const n = document.createElement(tag); n.dataset[attr] = ''; sheet.append(n);}
  181 |       view.append(sheet); container.append(ordinary, view);
  182 |       let storage = 0, prints = 0;
  183 |       const get = Storage.prototype.getItem, set = Storage.prototype.setItem;
  184 |       Storage.prototype.getItem = function(...args) {storage++; return get.apply(this, args);}; Storage.prototype.setItem = function(...args) {storage++; return set.apply(this, args);}; window.print = () => prints++;
  185 |       const options = {source: 'content/final/reference/reference.json', declaringUrl: root, allowedRootUrl: new URL('content/', root)};
  186 |       let ref = mountReference(sheet, options);
  187 |       window.referenceProbe = {get storage() {return storage;}, get prints() {return prints;}, async remount() {ref.destroy(); ref = mountReference(sheet, options); await ref.ready;}};
  188 |     }, mount);
  189 |     await expect(page.locator('[data-reference-status]')).toContainText('could not load'); await expect(page.locator('[data-reference-print]')).toBeDisabled();
  190 |     await page.emulateMedia({media: 'print'}); await expect(page.locator('[data-reference-status]')).toBeVisible(); await expect(page.locator('[data-view-role="lesson"]')).toBeHidden();
  191 |     await page.emulateMedia({media: 'screen'}); await page.unroute(body);
  192 |     await page.locator('[data-view-role="reference"]').evaluate(n => {n.hidden = false;}); await page.locator('[data-reference-retry]').click(); await expect(page.locator('[data-reference-print]')).toBeEnabled();
  193 |     await expect(page.locator('.final-reference-item')).toHaveCount(5); await page.locator('[data-reference-print]').click();
  194 |     await page.evaluate(() => window.referenceProbe.remount()); await page.locator('[data-reference-print]').click();
  195 |     expect(await page.evaluate(() => ({storage: window.referenceProbe.storage, prints: window.referenceProbe.prints}))).toEqual({storage: 0, prints: 2});
  196 |     await page.locator('[data-view-role="reference"]').evaluate(n => {n.hidden = true;}); await page.emulateMedia({media: 'print'}); await expect(page.locator('[data-reference-content]')).toBeVisible(); await expect(page.locator('[data-reference-print]')).toBeHidden();
  197 |   });
  198 | }
  199 | 
```