// MIT tests; source excerpts © Rhys Jones, CC BY 4.0. Actual public APIs on
// disposable DOM, mostly noninstructional data; no migration page or copied app.
import {test, expect} from '@playwright/test';
import {apiPage, settle} from '../helpers/browser-probe.mjs';
import {original} from '../helpers/baseline-source.mjs';
const errors = new WeakMap();
test.beforeEach(({page}) => { const list = []; errors.set(page, list); page.on('pageerror', error => list.push(error.message)); });
test.afterEach(({page}) => expect(errors.get(page)).toEqual([]));

for (const mount of ['/', '/discussion-skills-lab/']) {
  for (const profile of ['opening-classification', 'opening-knowledge-check', 'middle-scenarios', 'middle-quiz', 'middle-application', 'final-questions']) {
    test(`${mount} question API ${profile}: latest choice, earned history, navigation, feedback/focus and silent updates`, async ({page}) => {
      await apiPage(page, mount);
      await page.evaluate(async ({mount, profile}) => {
        const {mountQuestionSequence} = await import(new URL(`${mount}assets/js/components/question-sequence.js`, location.origin));
        const root = document.createElement('main'); document.body.append(root);
        const questions = ['one', 'two', 'three'].map((id, index) => ({id, prompt: `Test prompt ${id}`, correctOptionId: 'b',
          ...(profile === 'final-questions' && index === 0 ? {context: 'Test context'} : {}),
          options: [{id: 'a', text: 'Test A', feedback: 'Test wrong feedback'}, {id: 'b', text: 'Test B', feedback: 'Test correct feedback'}]}));
        let state = {selections: {}, earnedQuestionIds: [], attemptedQuestionIds: [], currentQuestionId: 'one'}, events = 0;
        const controller = mountQuestionSequence(root, {data: {questions}, profile, state, onChange(next) {state = next; events++;}});
        window.probe = {get state() {return state;}, get events() {return events;}, update() {controller.update(state);}};
      }, {mount, profile});
      const all = ['opening-knowledge-check', 'middle-application'].includes(profile);
      const host = id => all ? page.locator(`[data-question-id="${id}"]`) : page.locator('.dsl-question');
      const state = () => page.evaluate(() => window.probe.state);
      for (const id of ['one', 'two', 'three']) {
        const current = host(id), wrong = current.locator('[data-option-id="a"]'), right = current.locator('[data-option-id="b"]');
        await expect(current).toHaveAttribute('data-question-id', id);
        if (!all) await expect(page.locator('.dsl-question-next')).toBeDisabled();
        if (profile === 'final-questions') {
          if (id === 'one') await expect(current.locator('.dsl-question-context')).toHaveText('Test context');
          else await expect(current.locator('.dsl-question-context')).toBeHidden();
        }
        await wrong.focus(); await wrong.press('Enter'); await expect(wrong).toBeFocused();
        await expect(wrong).toHaveClass(/dsl-selected-incorrect/); await expect(current.locator('[aria-pressed="true"]')).toHaveCount(1);
        if (!all && profile !== 'opening-classification') await expect(page.locator('.dsl-question-next')).toBeDisabled();
        if (profile === 'opening-classification') await expect(page.locator('.dsl-question-next')).toBeEnabled();
        await right.click(); await wrong.focus(); await wrong.press('Space'); await expect(wrong).toBeFocused();
        expect((await state()).earnedQuestionIds).toContain(id); expect((await state()).selections[id]).toBe('a');
        await expect(wrong).toHaveClass(/dsl-selected-incorrect/); await expect(right).not.toHaveClass(/dsl-selected-correct/);
        await expect(current.locator('.dsl-feedback')).not.toBeEmpty();
        const before = await page.evaluate(() => window.probe.events);
        await page.evaluate(() => {window.probe.update(); window.probe.update();});
        expect(await page.evaluate(() => window.probe.events)).toBe(before); await expect(wrong).toBeFocused();
        if (!all && (id !== 'three' || profile !== 'final-questions')) {
          await expect(page.locator('.dsl-question-next')).toBeEnabled(); await page.locator('.dsl-question-next').click();
        }
      }
      expect((await state()).earnedQuestionIds).toEqual(['one', 'two', 'three']);
      if (!all) {
        if (profile === 'final-questions') {
          await expect(page.locator('.dsl-question-next')).toBeHidden();
          await page.locator('.dsl-question-previous').click(); await page.locator('.dsl-question-previous').click();
          await expect(page.locator('.dsl-question-previous')).toBeHidden();
        }
        await expect(page.locator('.dsl-question')).toHaveAttribute('data-question-id', 'one');
      }
      if (profile === 'middle-quiz') {
        await page.locator('[data-question-jump="three"]').click(); await expect(page.locator('.dsl-choice').first()).toBeFocused();
        await expect(page.locator('.dsl-question-score')).toHaveText('Score: 3/3 · 100%');
        await expect(page.locator('[data-question-jump="one"]')).toHaveText('✓ Correct · Q1');
      }
    });
  }

  test(`${mount} all-at-once retry clears only first unearned choice and focuses its first option`, async ({page}) => {
    await apiPage(page, mount);
    await page.evaluate(async mount => {
      const {mountQuestionSequence} = await import(new URL(`${mount}assets/js/components/question-sequence.js`, location.origin));
      const root = document.createElement('main'); document.body.append(root);
      const data = {questions: ['one', 'two', 'three'].map(id => ({id, prompt: `Test ${id}`, correctOptionId: 'b', explanation: 'Test feedback', options: [{id: 'a', text: 'Test A'}, {id: 'b', text: 'Test B'}]}))};
      window.retryState = {selections: {one: 'b', two: 'a', three: 'a'}, earnedQuestionIds: ['one'], currentQuestionId: 'one'};
      mountQuestionSequence(root, {data, profile: 'opening-knowledge-check', state: window.retryState, onChange(next) {window.retryState = next;}});
    }, mount);
    await expect(page.locator('.dsl-question-score')).toHaveText('Knowledge check: 1 of 3 correct.');
    await page.locator('.dsl-question-retry').click();
    expect(await page.evaluate(() => window.retryState.selections)).toEqual({one: 'b', three: 'a'});
    await expect(page.locator('[data-question-id="two"] button').first()).toBeFocused();
    await expect(page.locator('.dsl-question-retry')).toBeHidden();
  });

  test(`${mount} card/panel APIs retain independent exploration, silent native hydration, ARIA and scoped responsive styles`, async ({page}) => {
    await apiPage(page, mount);
    // Exercise the actual source's longest face, as the retired suite did, not
    // newly invented 500-character stress prose with a different acceptance scope.
    const longest = await page.evaluate(sources => sources.flatMap(source => {
      const doc = new DOMParser().parseFromString(source, 'text/html');
      return [...doc.querySelectorAll('.flip-front,.flip-back')].map(face => {face.querySelectorAll('.dsl-flip-hint,.dsl-flip-explored,.visited').forEach(n => n.remove()); return face.textContent.replace(/\s+/g, ' ').trim();});
    }).sort((a, b) => b.length - a.length)[0], ['middle', 'final'].map(id => original(`${id}.html`).toString()));
    await page.evaluate(async ({mount, longest}) => {
      const root = new URL(mount, location.origin);
      const {mountFlashcards} = await import(new URL('assets/js/components/flashcards.js', root));
      const {mountExpandables} = await import(new URL('assets/js/components/expandables.js', root));
      const main = document.createElement('main'); main.style.cssText = 'max-width:100%;overflow-wrap:anywhere';
      const cards = document.createElement('div'), panels = document.createElement('div'), timeline = document.createElement('div');
      cards.id = 'cards'; panels.id = 'panels'; timeline.id = 'timeline'; main.append(cards, panels, timeline); document.body.append(main);
      const decoy = document.createElement('div'); decoy.id = 'decoy'; decoy.innerHTML = '<button class="flip choice">Test unaffected button</button><details class="dsl-expandable"><summary>Test unaffected row</summary>Test body</details>'; document.body.append(decoy);
      let events = 0, cardState = {exploredIds: [], backIds: []}, panelState = {exploredIds: ['b'], openIds: ['a']}, timelineState = {exploredIds: [], openIds: []};
      const cardData = {items: [{id: 'a', front: 'Test front', back: longest}]};
      const panelData = {items: [{id: 'a', title: 'Test A', body: 'Test body A'}, {id: 'b', title: 'Test B', body: 'Test body B'}]};
      const a = mountFlashcards(cards, {data: cardData, state: cardState, onChange(s) {cardState = s; events++;}});
      const b = mountExpandables(panels, {data: panelData, profile: 'standard', state: panelState, onChange(s) {panelState = s; events++;}});
      const c = mountExpandables(timeline, {data: panelData, profile: 'timeline', state: timelineState, onChange(s) {timelineState = s; events++;}});
      window.faces = {get card() {return cardState;}, get panels() {return panelState;}, get timeline() {return timelineState;}, get events() {return events;}, update() {a.update(cardState); b.update(panelState); c.update(timelineState);}, duplicate() {try {mountFlashcards(cards, {data: cardData, state: cardState});} catch(e) {return e.message;}}};
      window.faces.update(); window.faces.update();
    }, {mount, longest});
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    expect(await page.evaluate(() => window.faces.events)).toBe(0);
    const panel = page.locator('#panels [data-panel-id="a"]'); await expect(panel).toHaveJSProperty('open', true);
    expect(await page.evaluate(() => window.faces.panels.exploredIds)).toEqual(['b']);
    await panel.locator('summary').focus(); await panel.locator('summary').press('Enter');
    await expect(panel).toHaveJSProperty('open', false);
    await expect.poll(() => page.evaluate(() => window.faces.events)).toBe(1);
    expect(await page.evaluate(() => window.faces.panels.exploredIds)).toEqual(['b']);
    await panel.locator('summary').press('Space'); await expect.poll(() => page.evaluate(() => window.faces.panels.exploredIds)).toEqual(['b', 'a']);
    const timeline = page.locator('#timeline [data-panel-id="a"] button'); await timeline.focus(); await timeline.press('Enter');
    await expect(timeline).toHaveAttribute('aria-expanded', 'true'); const target = await timeline.getAttribute('aria-controls'); await expect(page.locator(`[id="${target}"]`)).toBeVisible();
    await timeline.press('Space'); await expect(timeline).toHaveAttribute('aria-expanded', 'false'); await expect(timeline.locator('.dsl-panel-explored')).toBeVisible();
    const card = page.locator('#cards [data-card-id="a"]'); await card.focus(); await card.press('Enter'); await settle(page);
    await expect(card).toBeFocused(); await expect(card).toHaveAttribute('aria-pressed', 'true'); await expect(card.locator('.dsl-card-front')).toHaveAttribute('aria-hidden', 'true');
    await expect(card).toHaveAccessibleDescription(longest);
    await page.setViewportSize({width: 320, height: 900});
    await page.locator('main').evaluate(n => {n.style.fontSize = '200%';}); await settle(page);
    expect(await card.evaluate(n => n.scrollWidth <= n.clientWidth + 1 && n.scrollHeight <= n.clientHeight + 2)).toBe(true);
    expect(await card.locator('.dsl-card-inner').evaluate(n => getComputedStyle(n).transform)).toContain('matrix3d');
    await expect(card.locator('.dsl-card-back')).toHaveCSS('background-color', 'rgb(20, 43, 73)'); await expect(card.locator('.dsl-card-back')).toHaveCSS('color', 'rgb(255, 255, 255)');
    await card.press('Space'); await settle(page); expect(await page.evaluate(() => window.faces.card)).toEqual({exploredIds: ['a'], backIds: []});
    await expect(card.locator('.dsl-card-front > .dsl-card-explored')).toBeVisible();
    const decoy = page.locator('#decoy button,#decoy details'), paint = () => decoy.evaluateAll(nodes => nodes.map(n => {const s = getComputedStyle(n); return [s.color, s.backgroundColor, s.padding, s.border, s.display];}));
    const before = await paint(); await page.locator('link[href$="components.css"]').evaluate(n => {n.disabled = true;}); expect(await paint()).toEqual(before); await page.locator('link[href$="components.css"]').evaluate(n => {n.disabled = false;});
    await page.emulateMedia({reducedMotion: 'reduce'}); await expect(card.locator('.dsl-card-inner')).toHaveCSS('transition-duration', '0s');
    expect(await page.evaluate(() => window.faces.duplicate())).toContain('already mounted');
  });

  test(`${mount} writing/checklist API preserves caret, callbacks and late clipboard denial across destroy/remount`, async ({page}) => {
    await apiPage(page, mount);
    await page.evaluate(async mount => {
      const root = new URL(mount, location.origin);
      const {mountWritingActivity} = await import(new URL('assets/js/components/writing-activity.js', root));
      const {mountChecklist} = await import(new URL('assets/js/components/checklist.js', root));
      const main = document.createElement('main'), writer = document.createElement('div'), checks = document.createElement('div'); writer.id = 'writer'; checks.id = 'checks'; main.append(writer, checks); document.body.append(main);
      const data = {fields: [{id: 'draft', label: 'Test draft', multiline: true, rows: 3, readonly: false, maxLength: 1000, placeholder: 'Test placeholder'}], copyFieldId: 'draft', copyLabel: 'Test copy', model: {mode: 'show-only', showLabel: 'Test model', blocks: [{kind: 'paragraph', text: 'Test model body'}]}};
      let state = {fields: {draft: 'Test draft body'}, modelVisible: false, assembled: false}, checked = {checkedIds: []}, events = 0, a, b;
      const mountBoth = () => {a = mountWritingActivity(writer, {data, state, onChange(s) {state = s; events++;}}); b = mountChecklist(checks, {data: {items: [{id: 'a', text: 'Test check'}]}, state: checked, onChange(s) {checked = s; events++;}});};
      mountBoth();
      Object.defineProperty(navigator, 'clipboard', {configurable: true, value: {writeText: () => new Promise((_, reject) => {window.denyCopy = reject;})}});
      window.writer = {get events() {return events;}, update() {a.update(state); b.update(checked);}, remount() {a.destroy(); b.destroy(); mountBoth();}};
    }, mount);
    const input = page.getByLabel('Test draft', {exact: true}); await input.focus(); await input.evaluate(n => n.setSelectionRange(1, 3));
    await page.evaluate(() => {window.writer.update(); window.writer.update();}); await expect(input).toBeFocused(); expect(await input.evaluate(n => [n.selectionStart, n.selectionEnd])).toEqual([1, 3]);
    await expect(input).toHaveAttribute('placeholder', 'Test placeholder'); await expect(input).toHaveJSProperty('maxLength', 1000); await expect(input).toHaveJSProperty('readOnly', false);
    const oldCheck = await page.getByLabel('Test check', {exact: true}).elementHandle();
    await page.evaluate(() => {window.writer.remount(); window.writer.remount(); window.writer.update();});
    await oldCheck.evaluate(n => {n.checked = true; n.dispatchEvent(new Event('change'));}); expect(await page.evaluate(() => window.writer.events)).toBe(0);
    const check = page.getByLabel('Test check', {exact: true}); await check.focus(); await check.press('Space'); expect(await page.evaluate(() => window.writer.events)).toBe(1);
    await page.getByRole('button', {name: 'Test model', exact: true}).focus(); await page.getByRole('button', {name: 'Test model', exact: true}).press('Enter'); expect(await page.evaluate(() => window.writer.events)).toBe(2);
    await page.getByRole('button', {name: 'Test copy', exact: true}).click();
    await page.evaluate(async () => {window.writer.remount(); window.denyCopy(new Error('Synthetic late denial')); await Promise.resolve(); await Promise.resolve();});
    await expect(page.locator('#writer [role="status"]')).toBeEmpty(); await expect(page.locator('[data-clipboard-fallback]')).toHaveCount(0); expect(await page.evaluate(() => window.writer.events)).toBe(2);
    await page.setViewportSize({width: 320, height: 900}); await page.locator('#writer,#checks').evaluateAll(nodes => nodes.forEach(n => {n.style.fontSize = '200%';}));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    expect(await input.evaluate(n => n.getBoundingClientRect().width <= 320)).toBe(true);
  });

  test(`${mount} clipboard utility fallback has no storage identity, returns focus, deduplicates and cleans up`, async ({page}) => {
    await apiPage(page, mount);
    await page.evaluate(async mount => {
      const {createClipboard} = await import(new URL(`${mount}assets/js/utilities/clipboard.js`, location.origin));
      const root = document.createElement('main'), button = document.createElement('button'), status = document.createElement('p'); button.textContent = 'Test copy'; status.setAttribute('role', 'status'); root.append(button, status); document.body.append(root);
      Object.defineProperty(navigator, 'clipboard', {configurable: true, value: undefined});
      window.clipboardProbe = createClipboard(root, {getText: () => 'Test Unicode 🧭\nsecond line', status}); button.addEventListener('click', () => window.clipboardProbe.copy());
    }, mount);
    const copy = page.getByRole('button', {name: 'Test copy', exact: true}); await copy.focus(); await copy.press('Enter');
    const fallback = page.locator('[data-clipboard-fallback]'); await expect(fallback).toBeFocused(); await expect(fallback).toHaveAccessibleName('Select and copy this text');
    expect(await fallback.evaluate(n => [n.id, n.name, n.hasAttribute('data-field-id'), n.selectionStart, n.selectionEnd])).toEqual(['', '', false, 0, 'Test Unicode 🧭\nsecond line'.length]);
    await fallback.press('Escape'); await expect(fallback).toHaveCount(0); await expect(copy).toBeFocused();
    await copy.press('Enter'); await copy.press('Enter'); await expect(fallback).toHaveCount(1);
    await page.evaluate(() => window.clipboardProbe.destroy()); await expect(fallback).toHaveCount(0); await expect(copy).toBeFocused();
  });

  test(`${mount} reference API preloads/retries independently, prints semantically, remounts once and never touches storage`, async ({page}) => {
    await apiPage(page, mount);
    const body = `**${mount}content/final/reference/synthesis-framework.md`;
    await page.route(body, route => route.fulfill({status: 404, body: 'Synthetic missing body'}));
    await page.evaluate(async mount => {
      const root = new URL(mount, location.origin), {mountReference} = await import(new URL('assets/js/app/reference-loader.js', root));
      const container = document.createElement('div'); container.id = 'views'; document.body.append(container);
      const ordinary = document.createElement('section'); ordinary.className = 'lesson-view'; ordinary.dataset.viewRole = 'lesson'; ordinary.textContent = 'Test ordinary draft';
      const view = document.createElement('section'); view.className = 'lesson-view'; view.dataset.viewRole = 'reference'; view.hidden = true;
      const sheet = document.createElement('div'); sheet.dataset.referenceSheet = '';
      for (const [tag, attr] of [['button', 'referencePrint'], ['p', 'referenceStatus'], ['button', 'referenceRetry'], ['div', 'referenceContent']]) {const n = document.createElement(tag); n.dataset[attr] = ''; sheet.append(n);}
      view.append(sheet); container.append(ordinary, view);
      let storage = 0, prints = 0;
      const get = Storage.prototype.getItem, set = Storage.prototype.setItem;
      Storage.prototype.getItem = function(...args) {storage++; return get.apply(this, args);}; Storage.prototype.setItem = function(...args) {storage++; return set.apply(this, args);}; window.print = () => prints++;
      const options = {source: 'content/final/reference/reference.json', declaringUrl: root, allowedRootUrl: new URL('content/', root)};
      let ref = mountReference(sheet, options);
      window.referenceProbe = {get storage() {return storage;}, get prints() {return prints;}, async remount() {ref.destroy(); ref = mountReference(sheet, options); await ref.ready;}};
    }, mount);
    await expect(page.locator('[data-reference-status]')).toContainText('could not load'); await expect(page.locator('[data-reference-print]')).toBeDisabled();
    await page.emulateMedia({media: 'print'}); await expect(page.locator('[data-reference-status]')).toBeVisible(); await expect(page.locator('[data-view-role="lesson"]')).toBeHidden();
    await page.emulateMedia({media: 'screen'}); await page.unroute(body);
    await page.locator('[data-view-role="reference"]').evaluate(n => {n.hidden = false;}); await page.locator('[data-reference-retry]').click(); await expect(page.locator('[data-reference-print]')).toBeEnabled();
    await expect(page.locator('.final-reference-item')).toHaveCount(5); await page.locator('[data-reference-print]').click();
    await page.evaluate(() => window.referenceProbe.remount()); await page.locator('[data-reference-print]').click();
    expect(await page.evaluate(() => ({storage: window.referenceProbe.storage, prints: window.referenceProbe.prints}))).toEqual({storage: 0, prints: 2});
    await page.locator('[data-view-role="reference"]').evaluate(n => {n.hidden = true;}); await page.emulateMedia({media: 'print'}); await expect(page.locator('[data-reference-content]')).toBeVisible(); await expect(page.locator('[data-reference-print]')).toBeHidden();
  });
}
