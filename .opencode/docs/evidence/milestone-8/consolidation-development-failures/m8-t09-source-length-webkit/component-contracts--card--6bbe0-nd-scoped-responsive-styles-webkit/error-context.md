# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: component-contracts.spec.mjs >> / card/panel APIs retain independent exploration, silent native hydration, ARIA and scoped responsive styles
- Location: tests/browser/component-contracts.spec.mjs:82:3

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
        - generic [ref=e8]: "A summary organizes and accurately restates important ideas, evidence, decisions, and unresolved questions. Example: “We identified transportation, scheduling, and communication as three barriers. Our recommendations address each.”"
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
  23  |       const all = ['opening-knowledge-check', 'middle-application'].includes(profile);
  24  |       const host = id => all ? page.locator(`[data-question-id="${id}"]`) : page.locator('.dsl-question');
  25  |       const state = () => page.evaluate(() => window.probe.state);
  26  |       for (const id of ['one', 'two', 'three']) {
  27  |         const current = host(id), wrong = current.locator('[data-option-id="a"]'), right = current.locator('[data-option-id="b"]');
  28  |         await expect(current).toHaveAttribute('data-question-id', id);
  29  |         if (!all) await expect(page.locator('.dsl-question-next')).toBeDisabled();
  30  |         if (profile === 'final-questions') {
  31  |           if (id === 'one') await expect(current.locator('.dsl-question-context')).toHaveText('Test context');
  32  |           else await expect(current.locator('.dsl-question-context')).toBeHidden();
  33  |         }
  34  |         await wrong.focus(); await wrong.press('Enter'); await expect(wrong).toBeFocused();
  35  |         await expect(wrong).toHaveClass(/dsl-selected-incorrect/); await expect(current.locator('[aria-pressed="true"]')).toHaveCount(1);
  36  |         if (!all && profile !== 'opening-classification') await expect(page.locator('.dsl-question-next')).toBeDisabled();
  37  |         if (profile === 'opening-classification') await expect(page.locator('.dsl-question-next')).toBeEnabled();
  38  |         await right.click(); await wrong.focus(); await wrong.press('Space'); await expect(wrong).toBeFocused();
  39  |         expect((await state()).earnedQuestionIds).toContain(id); expect((await state()).selections[id]).toBe('a');
  40  |         await expect(wrong).toHaveClass(/dsl-selected-incorrect/); await expect(right).not.toHaveClass(/dsl-selected-correct/);
  41  |         await expect(current.locator('.dsl-feedback')).not.toBeEmpty();
  42  |         const before = await page.evaluate(() => window.probe.events);
  43  |         await page.evaluate(() => {window.probe.update(); window.probe.update();});
  44  |         expect(await page.evaluate(() => window.probe.events)).toBe(before); await expect(wrong).toBeFocused();
  45  |         if (!all && (id !== 'three' || profile !== 'final-questions')) {
  46  |           await expect(page.locator('.dsl-question-next')).toBeEnabled(); await page.locator('.dsl-question-next').click();
  47  |         }
  48  |       }
  49  |       expect((await state()).earnedQuestionIds).toEqual(['one', 'two', 'three']);
  50  |       if (!all) {
  51  |         if (profile === 'final-questions') {
  52  |           await expect(page.locator('.dsl-question-next')).toBeHidden();
  53  |           await page.locator('.dsl-question-previous').click(); await page.locator('.dsl-question-previous').click();
  54  |           await expect(page.locator('.dsl-question-previous')).toBeHidden();
  55  |         }
  56  |         await expect(page.locator('.dsl-question')).toHaveAttribute('data-question-id', 'one');
  57  |       }
  58  |       if (profile === 'middle-quiz') {
  59  |         await page.locator('[data-question-jump="three"]').click(); await expect(page.locator('.dsl-choice').first()).toBeFocused();
  60  |         await expect(page.locator('.dsl-question-score')).toHaveText('Score: 3/3 · 100%');
  61  |         await expect(page.locator('[data-question-jump="one"]')).toHaveText('✓ Correct · Q1');
  62  |       }
  63  |     });
  64  |   }
  65  | 
  66  |   test(`${mount} all-at-once retry clears only first unearned choice and focuses its first option`, async ({page}) => {
  67  |     await apiPage(page, mount);
  68  |     await page.evaluate(async mount => {
  69  |       const {mountQuestionSequence} = await import(new URL(`${mount}assets/js/components/question-sequence.js`, location.origin));
  70  |       const root = document.createElement('main'); document.body.append(root);
  71  |       const data = {questions: ['one', 'two', 'three'].map(id => ({id, prompt: `Test ${id}`, correctOptionId: 'b', explanation: 'Test feedback', options: [{id: 'a', text: 'Test A'}, {id: 'b', text: 'Test B'}]}))};
  72  |       window.retryState = {selections: {one: 'b', two: 'a', three: 'a'}, earnedQuestionIds: ['one'], currentQuestionId: 'one'};
  73  |       mountQuestionSequence(root, {data, profile: 'opening-knowledge-check', state: window.retryState, onChange(next) {window.retryState = next;}});
  74  |     }, mount);
  75  |     await expect(page.locator('.dsl-question-score')).toHaveText('Knowledge check: 1 of 3 correct.');
  76  |     await page.locator('.dsl-question-retry').click();
  77  |     expect(await page.evaluate(() => window.retryState.selections)).toEqual({one: 'b', three: 'a'});
  78  |     await expect(page.locator('[data-question-id="two"] button').first()).toBeFocused();
  79  |     await expect(page.locator('.dsl-question-retry')).toBeHidden();
  80  |   });
  81  | 
  82  |   test(`${mount} card/panel APIs retain independent exploration, silent native hydration, ARIA and scoped responsive styles`, async ({page}) => {
  83  |     await apiPage(page, mount);
  84  |     // Exercise the actual source's longest face, as the retired suite did, not
  85  |     // newly invented 500-character stress prose with a different acceptance scope.
  86  |     const longest = await page.evaluate(sources => sources.flatMap(source => {
  87  |       const doc = new DOMParser().parseFromString(source, 'text/html');
  88  |       return [...doc.querySelectorAll('.flip-front,.flip-back')].map(face => {face.querySelectorAll('.dsl-flip-hint,.dsl-flip-explored,.visited').forEach(n => n.remove()); return face.textContent.replace(/\s+/g, ' ').trim();});
  89  |     }).sort((a, b) => b.length - a.length)[0], ['middle', 'final'].map(id => original(`${id}.html`).toString()));
  90  |     await page.evaluate(async ({mount, longest}) => {
  91  |       const root = new URL(mount, location.origin);
  92  |       const {mountFlashcards} = await import(new URL('assets/js/components/flashcards.js', root));
  93  |       const {mountExpandables} = await import(new URL('assets/js/components/expandables.js', root));
  94  |       const main = document.createElement('main'); main.style.cssText = 'max-width:100%;font-size:200%;overflow-wrap:anywhere';
  95  |       const cards = document.createElement('div'), panels = document.createElement('div'), timeline = document.createElement('div');
  96  |       cards.id = 'cards'; panels.id = 'panels'; timeline.id = 'timeline'; main.append(cards, panels, timeline); document.body.append(main);
  97  |       const decoy = document.createElement('div'); decoy.id = 'decoy'; decoy.innerHTML = '<button class="flip choice">Test unaffected button</button><details class="dsl-expandable"><summary>Test unaffected row</summary>Test body</details>'; document.body.append(decoy);
  98  |       let events = 0, cardState = {exploredIds: [], backIds: []}, panelState = {exploredIds: ['b'], openIds: ['a']}, timelineState = {exploredIds: [], openIds: []};
  99  |       const cardData = {items: [{id: 'a', front: 'Test front', back: longest}]};
  100 |       const panelData = {items: [{id: 'a', title: 'Test A', body: 'Test body A'}, {id: 'b', title: 'Test B', body: 'Test body B'}]};
  101 |       const a = mountFlashcards(cards, {data: cardData, state: cardState, onChange(s) {cardState = s; events++;}});
  102 |       const b = mountExpandables(panels, {data: panelData, profile: 'standard', state: panelState, onChange(s) {panelState = s; events++;}});
  103 |       const c = mountExpandables(timeline, {data: panelData, profile: 'timeline', state: timelineState, onChange(s) {timelineState = s; events++;}});
  104 |       window.faces = {get card() {return cardState;}, get panels() {return panelState;}, get timeline() {return timelineState;}, get events() {return events;}, update() {a.update(cardState); b.update(panelState); c.update(timelineState);}, duplicate() {try {mountFlashcards(cards, {data: cardData, state: cardState});} catch(e) {return e.message;}}};
  105 |       window.faces.update(); window.faces.update();
  106 |     }, {mount, longest});
  107 |     await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  108 |     expect(await page.evaluate(() => window.faces.events)).toBe(0);
  109 |     const panel = page.locator('#panels [data-panel-id="a"]'); await expect(panel).toHaveJSProperty('open', true);
  110 |     expect(await page.evaluate(() => window.faces.panels.exploredIds)).toEqual(['b']);
  111 |     await panel.locator('summary').focus(); await panel.locator('summary').press('Enter');
  112 |     await expect(panel).toHaveJSProperty('open', false);
  113 |     await expect.poll(() => page.evaluate(() => window.faces.events)).toBe(1);
  114 |     expect(await page.evaluate(() => window.faces.panels.exploredIds)).toEqual(['b']);
  115 |     await panel.locator('summary').press('Space'); await expect.poll(() => page.evaluate(() => window.faces.panels.exploredIds)).toEqual(['b', 'a']);
  116 |     const timeline = page.locator('#timeline [data-panel-id="a"] button'); await timeline.focus(); await timeline.press('Enter');
  117 |     await expect(timeline).toHaveAttribute('aria-expanded', 'true'); const target = await timeline.getAttribute('aria-controls'); await expect(page.locator(`[id="${target}"]`)).toBeVisible();
  118 |     await timeline.press('Space'); await expect(timeline).toHaveAttribute('aria-expanded', 'false'); await expect(timeline.locator('.dsl-panel-explored')).toBeVisible();
  119 |     const card = page.locator('#cards [data-card-id="a"]'); await card.focus(); await card.press('Enter'); await settle(page);
  120 |     await expect(card).toBeFocused(); await expect(card).toHaveAttribute('aria-pressed', 'true'); await expect(card.locator('.dsl-card-front')).toHaveAttribute('aria-hidden', 'true');
  121 |     await expect(card).toHaveAccessibleDescription(longest);
  122 |     await page.setViewportSize({width: 320, height: 900});
> 123 |     expect(await card.evaluate(n => n.scrollWidth <= n.clientWidth + 1 && n.scrollHeight <= n.clientHeight + 2)).toBe(true);
      |                                                                                                                  ^ Error: expect(received).toBe(expected) // Object.is equality
  124 |     expect(await card.locator('.dsl-card-inner').evaluate(n => getComputedStyle(n).transform)).toContain('matrix3d');
  125 |     await expect(card.locator('.dsl-card-back')).toHaveCSS('background-color', 'rgb(20, 43, 73)'); await expect(card.locator('.dsl-card-back')).toHaveCSS('color', 'rgb(255, 255, 255)');
  126 |     await card.press('Space'); await settle(page); expect(await page.evaluate(() => window.faces.card)).toEqual({exploredIds: ['a'], backIds: []});
  127 |     await expect(card.locator('.dsl-card-front > .dsl-card-explored')).toBeVisible();
  128 |     const decoy = page.locator('#decoy button,#decoy details'), paint = () => decoy.evaluateAll(nodes => nodes.map(n => {const s = getComputedStyle(n); return [s.color, s.backgroundColor, s.padding, s.border, s.display];}));
  129 |     const before = await paint(); await page.locator('link[href$="components.css"]').evaluate(n => {n.disabled = true;}); expect(await paint()).toEqual(before); await page.locator('link[href$="components.css"]').evaluate(n => {n.disabled = false;});
  130 |     await page.emulateMedia({reducedMotion: 'reduce'}); await expect(card.locator('.dsl-card-inner')).toHaveCSS('transition-duration', '0s');
  131 |     expect(await page.evaluate(() => window.faces.duplicate())).toContain('already mounted');
  132 |   });
  133 | 
  134 |   test(`${mount} writing/checklist API preserves caret, callbacks and late clipboard denial across destroy/remount`, async ({page}) => {
  135 |     await apiPage(page, mount);
  136 |     await page.evaluate(async mount => {
  137 |       const root = new URL(mount, location.origin);
  138 |       const {mountWritingActivity} = await import(new URL('assets/js/components/writing-activity.js', root));
  139 |       const {mountChecklist} = await import(new URL('assets/js/components/checklist.js', root));
  140 |       const main = document.createElement('main'), writer = document.createElement('div'), checks = document.createElement('div'); writer.id = 'writer'; checks.id = 'checks'; main.append(writer, checks); document.body.append(main);
  141 |       const data = {fields: [{id: 'draft', label: 'Test draft', multiline: true, rows: 3, readonly: false, maxLength: 1000, placeholder: 'Test placeholder'}], copyFieldId: 'draft', copyLabel: 'Test copy', model: {mode: 'show-only', showLabel: 'Test model', blocks: [{kind: 'paragraph', text: 'Test model body'}]}};
  142 |       let state = {fields: {draft: 'Test draft body'}, modelVisible: false, assembled: false}, checked = {checkedIds: []}, events = 0, a, b;
  143 |       const mountBoth = () => {a = mountWritingActivity(writer, {data, state, onChange(s) {state = s; events++;}}); b = mountChecklist(checks, {data: {items: [{id: 'a', text: 'Test check'}]}, state: checked, onChange(s) {checked = s; events++;}});};
  144 |       mountBoth();
  145 |       Object.defineProperty(navigator, 'clipboard', {configurable: true, value: {writeText: () => new Promise((_, reject) => {window.denyCopy = reject;})}});
  146 |       window.writer = {get events() {return events;}, update() {a.update(state); b.update(checked);}, remount() {a.destroy(); b.destroy(); mountBoth();}};
  147 |     }, mount);
  148 |     const input = page.getByLabel('Test draft', {exact: true}); await input.focus(); await input.evaluate(n => n.setSelectionRange(1, 3));
  149 |     await page.evaluate(() => {window.writer.update(); window.writer.update();}); await expect(input).toBeFocused(); expect(await input.evaluate(n => [n.selectionStart, n.selectionEnd])).toEqual([1, 3]);
  150 |     await expect(input).toHaveAttribute('placeholder', 'Test placeholder'); await expect(input).toHaveJSProperty('maxLength', 1000); await expect(input).toHaveJSProperty('readOnly', false);
  151 |     const oldCheck = await page.getByLabel('Test check', {exact: true}).elementHandle();
  152 |     await page.evaluate(() => {window.writer.remount(); window.writer.remount(); window.writer.update();});
  153 |     await oldCheck.evaluate(n => {n.checked = true; n.dispatchEvent(new Event('change'));}); expect(await page.evaluate(() => window.writer.events)).toBe(0);
  154 |     const check = page.getByLabel('Test check', {exact: true}); await check.focus(); await check.press('Space'); expect(await page.evaluate(() => window.writer.events)).toBe(1);
  155 |     await page.getByRole('button', {name: 'Test model', exact: true}).focus(); await page.getByRole('button', {name: 'Test model', exact: true}).press('Enter'); expect(await page.evaluate(() => window.writer.events)).toBe(2);
  156 |     await page.getByRole('button', {name: 'Test copy', exact: true}).click();
  157 |     await page.evaluate(async () => {window.writer.remount(); window.denyCopy(new Error('Synthetic late denial')); await Promise.resolve(); await Promise.resolve();});
  158 |     await expect(page.locator('#writer [role="status"]')).toBeEmpty(); await expect(page.locator('[data-clipboard-fallback]')).toHaveCount(0); expect(await page.evaluate(() => window.writer.events)).toBe(2);
  159 |   });
  160 | 
  161 |   test(`${mount} clipboard utility fallback has no storage identity, returns focus, deduplicates and cleans up`, async ({page}) => {
  162 |     await apiPage(page, mount);
  163 |     await page.evaluate(async mount => {
  164 |       const {createClipboard} = await import(new URL(`${mount}assets/js/utilities/clipboard.js`, location.origin));
  165 |       const root = document.createElement('main'), button = document.createElement('button'), status = document.createElement('p'); button.textContent = 'Test copy'; status.setAttribute('role', 'status'); root.append(button, status); document.body.append(root);
  166 |       Object.defineProperty(navigator, 'clipboard', {configurable: true, value: undefined});
  167 |       window.clipboardProbe = createClipboard(root, {getText: () => 'Test Unicode 🧭\nsecond line', status}); button.addEventListener('click', () => window.clipboardProbe.copy());
  168 |     }, mount);
  169 |     const copy = page.getByRole('button', {name: 'Test copy', exact: true}); await copy.focus(); await copy.press('Enter');
  170 |     const fallback = page.locator('[data-clipboard-fallback]'); await expect(fallback).toBeFocused(); await expect(fallback).toHaveAccessibleName('Select and copy this text');
  171 |     expect(await fallback.evaluate(n => [n.id, n.name, n.hasAttribute('data-field-id'), n.selectionStart, n.selectionEnd])).toEqual(['', '', false, 0, 'Test Unicode 🧭\nsecond line'.length]);
  172 |     await fallback.press('Escape'); await expect(fallback).toHaveCount(0); await expect(copy).toBeFocused();
  173 |     await copy.press('Enter'); await copy.press('Enter'); await expect(fallback).toHaveCount(1);
  174 |     await page.evaluate(() => window.clipboardProbe.destroy()); await expect(fallback).toHaveCount(0); await expect(copy).toBeFocused();
  175 |   });
  176 | 
  177 |   test(`${mount} reference API preloads/retries independently, prints semantically, remounts once and never touches storage`, async ({page}) => {
  178 |     await apiPage(page, mount);
  179 |     const body = `**${mount}content/final/reference/synthesis-framework.md`;
  180 |     await page.route(body, route => route.fulfill({status: 404, body: 'Synthetic missing body'}));
  181 |     await page.evaluate(async mount => {
  182 |       const root = new URL(mount, location.origin), {mountReference} = await import(new URL('assets/js/app/reference-loader.js', root));
  183 |       const container = document.createElement('div'); container.id = 'views'; document.body.append(container);
  184 |       const ordinary = document.createElement('section'); ordinary.className = 'lesson-view'; ordinary.dataset.viewRole = 'lesson'; ordinary.textContent = 'Test ordinary draft';
  185 |       const view = document.createElement('section'); view.className = 'lesson-view'; view.dataset.viewRole = 'reference'; view.hidden = true;
  186 |       const sheet = document.createElement('div'); sheet.dataset.referenceSheet = '';
  187 |       for (const [tag, attr] of [['button', 'referencePrint'], ['p', 'referenceStatus'], ['button', 'referenceRetry'], ['div', 'referenceContent']]) {const n = document.createElement(tag); n.dataset[attr] = ''; sheet.append(n);}
  188 |       view.append(sheet); container.append(ordinary, view);
  189 |       let storage = 0, prints = 0;
  190 |       const get = Storage.prototype.getItem, set = Storage.prototype.setItem;
  191 |       Storage.prototype.getItem = function(...args) {storage++; return get.apply(this, args);}; Storage.prototype.setItem = function(...args) {storage++; return set.apply(this, args);}; window.print = () => prints++;
  192 |       const options = {source: 'content/final/reference/reference.json', declaringUrl: root, allowedRootUrl: new URL('content/', root)};
  193 |       let ref = mountReference(sheet, options);
  194 |       window.referenceProbe = {get storage() {return storage;}, get prints() {return prints;}, async remount() {ref.destroy(); ref = mountReference(sheet, options); await ref.ready;}};
  195 |     }, mount);
  196 |     await expect(page.locator('[data-reference-status]')).toContainText('could not load'); await expect(page.locator('[data-reference-print]')).toBeDisabled();
  197 |     await page.emulateMedia({media: 'print'}); await expect(page.locator('[data-reference-status]')).toBeVisible(); await expect(page.locator('[data-view-role="lesson"]')).toBeHidden();
  198 |     await page.emulateMedia({media: 'screen'}); await page.unroute(body);
  199 |     await page.locator('[data-view-role="reference"]').evaluate(n => {n.hidden = false;}); await page.locator('[data-reference-retry]').click(); await expect(page.locator('[data-reference-print]')).toBeEnabled();
  200 |     await expect(page.locator('.final-reference-item')).toHaveCount(5); await page.locator('[data-reference-print]').click();
  201 |     await page.evaluate(() => window.referenceProbe.remount()); await page.locator('[data-reference-print]').click();
  202 |     expect(await page.evaluate(() => ({storage: window.referenceProbe.storage, prints: window.referenceProbe.prints}))).toEqual({storage: 0, prints: 2});
  203 |     await page.locator('[data-view-role="reference"]').evaluate(n => {n.hidden = true;}); await page.emulateMedia({media: 'print'}); await expect(page.locator('[data-reference-content]')).toBeVisible(); await expect(page.locator('[data-reference-print]')).toBeHidden();
  204 |   });
  205 | }
  206 | 
```