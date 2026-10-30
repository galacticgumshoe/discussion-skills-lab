// MIT. Shared shell + actual navigation API with synthetic labels; no lesson copy.
import {test, expect} from '@playwright/test';
import {apiPage} from '../helpers/browser-probe.mjs';
import {original} from '../helpers/baseline-source.mjs';
import vm from 'node:vm';
const errors = new WeakMap();
test.beforeEach(({page}) => {const list = []; errors.set(page, list); page.on('pageerror', e => list.push(e.message));});
test.afterEach(({page}) => expect(errors.get(page)).toEqual([]));

async function navigation(page, mount, completed = []) {
  await apiPage(page, mount);
  await page.evaluate(async ({mount, completed}) => {
    const rootUrl = new URL(mount, location.origin);
    const {mountLessonShell} = await import(new URL('assets/js/app/lesson-shell.js', rootUrl));
    const {mountNavigation} = await import(new URL('assets/js/app/lesson-core.js', rootUrl));
    const root = document.createElement('div'); root.id = 'nav-probe'; document.body.append(root); const shell = mountLessonShell(root);
    const container = root.querySelector('#views'); container.style.minHeight = '2400px';
    const sections = [...Array(7).keys()].map(i => ({id: `step-${i}`, label: `Test step ${i}`, requirement: 'Test incomplete requirement', reference: false}));
    sections.push({id: 'reference', label: 'Test reference', requirement: '', reference: true});
    shell.configure({id: 'test', title: 'Test navigation', duration: 'Test duration', sections});
    const shortcut = document.createElement('button'); shortcut.id = 'quick-reference-link'; shortcut.textContent = 'Test reference shortcut'; root.querySelector('#lesson-main').prepend(shortcut);
    for (const [i, s] of sections.entries()) {
      s.view = document.createElement('section'); s.view.className = 'lesson-view'; s.view.id = `probe-view-${i}`;
      s.heading = document.createElement(`h${i % 3 + 1}`); s.heading.id = `heading-${i}`; s.heading.textContent = s.label;
      if (i === 2) s.heading.setAttribute('tabindex', '0');
      const incidental = document.createElement('h3'); incidental.textContent = 'Test incidental heading';
      s.view.append(incidental, s.heading); container.prepend(s.view);
    }
    const decoy = document.createElement('section'); decoy.hidden = true; decoy.className = 'lesson-view'; decoy.id = 'decoy'; container.prepend(decoy);
    const outside = document.createElement('section'); outside.hidden = true; outside.className = 'lesson-view'; outside.id = 'outside'; document.body.append(outside);
    const input = document.createElement('input'); input.id = 'unrelated-input'; sections[0].view.append(input);
    let nav, state = {completedSections: completed}, scrolls = 0;
    const scroll = window.scrollTo; window.scrollTo = (...args) => {scrolls++; return scroll(...args);};
    let accesses = 0; const get = Storage.prototype.getItem, set = Storage.prototype.setItem;
    Storage.prototype.getItem = function(...args) {accesses++; return get.apply(this, args);};
    Storage.prototype.setItem = function(...args) {accesses++; return set.apply(this, args);};
    const mountNav = () => {nav = mountNavigation(root, {sections, state});}; mountNav();
    window.navProbe = {get nav() {return nav;}, get scrolls() {return scrolls;}, get accesses() {return accesses;}, sections,
      update(ids) {state = {completedSections: ids}; nav.update(state);},
      duplicate() {try {mountNavigation(root, {sections, state});} catch(e) {return e.message;}},
      remount() {nav.destroy(); mountNav();}};
  }, {mount, completed});
}

for (const mount of ['/', '/discussion-skills-lab/']) {
  test(`${mount} public Opening retains all fifteen source heading/intro passages and original navigation labels`, async ({page}) => {
    const source = original('opening.html').toString();
    await page.goto(`${mount}opening.html`); await expect(page.locator('#lesson-status')).toHaveCount(1); await expect(page.locator('#lesson-status')).toBeHidden();
    const passages = await page.evaluate(source => {
      const doc = new DOMParser().parseFromString(source, 'text/html');
      const ids = [...Array(6).keys()].flatMap(i => [`section-${i + 1}-title`, `section-${i + 1}-intro`]).concat(['quiz-title', 'quiz-instructions', 'reference-title']);
      return ids.map(id => doc.querySelector(`[data-template-id="${id}"]`).textContent.replace(/\s+/g, ' ').trim());
    }, source);
    expect(passages).toHaveLength(15); const actual = (await page.locator('#views').textContent()).replace(/\s+/g, ' ').trim();
    for (const text of passages) expect(actual).toContain(text);
    const expected = Array.from(vm.runInNewContext(source.match(/labels:(\[[^\n]+\])/)[1]));
    expect(await page.locator('#section-select option').allTextContents()).toEqual(expected);
    expect(await page.evaluate(() => localStorage.getItem('dsl:opening-stage:v1'))).toBeNull();
  });
  test(`${mount} navigation API honors explicit reordered elements, zero/sparse credit, locked rejection and permanent union without storage`, async ({page}) => {
    await navigation(page, mount);
    await expect(page.locator('#heading-0')).toBeFocused(); await expect(page.locator('#next-section')).toBeDisabled();
    await expect(page.locator('#progress-track')).toHaveAttribute('aria-valuenow', '0');
    const reject = await page.evaluate(() => {
      const before = window.navProbe.scrolls, focus = document.activeElement.id;
      const result = ['step-2', 'unknown', 0].map(id => window.navProbe.nav.go(id));
      const select = document.querySelector('#section-select'); select.value = 'step-2'; select.dispatchEvent(new Event('change'));
      return {result, before, after: window.navProbe.scrolls, focus, afterFocus: document.activeElement.id};
    });
    expect(reject.result).toEqual([false, false, false]); expect(reject.after).toBe(reject.before); expect(reject.afterFocus).toBe(reject.focus);
    await expect(page.locator('#section-select')).toHaveValue('step-0');
    await page.locator('#quick-reference-link').click(); await expect(page.locator('#heading-7')).toBeFocused();
    await expect(page.locator('#previous-section')).toBeHidden(); await expect(page.locator('#next-section')).toBeHidden();
    await expect(page.locator('#nav-status')).toHaveText('Quick reference is always available.');
    await page.evaluate(() => window.navProbe.update(['step-0', 'step-3']));
    const allowed = await page.locator('#rail-links button').evaluateAll(nodes => nodes.filter(n => !n.disabled).map(n => n.dataset.go));
    expect(allowed).toEqual(['step-0', 'step-1', 'step-3', 'step-4', 'reference']);
    expect(await page.locator('#section-select option').evaluateAll(nodes => nodes.filter(n => !n.disabled).map(n => n.value))).toEqual(allowed);
    await page.evaluate(() => window.navProbe.nav.go('step-3')); await expect(page.locator('#heading-3')).toBeFocused();
    const before = await page.evaluate(() => window.navProbe.scrolls); await page.locator('#previous-section').click();
    await expect(page.locator('#probe-view-3')).toBeVisible(); expect(await page.evaluate(() => window.navProbe.scrolls)).toBe(before);
    await page.locator('#next-section').click(); await expect(page.locator('#heading-4')).toBeFocused(); await expect(page.locator('#next-section')).toBeDisabled();
    await page.evaluate(() => {window.navProbe.update([]); document.querySelector('#views').append(window.navProbe.sections[0].view);});
    await expect(page.locator('#progress-text')).toHaveText('2 of 7 pages completed'); await expect(page.locator('#progress-track')).toHaveAttribute('aria-valuenow', '2');
    expect(await page.locator('#progress-fill').evaluate(n => parseFloat(n.style.width))).toBeCloseTo(2 / 7 * 100, 3);
    for (const id of ['decoy', 'outside']) await expect(page.locator(`#${id}`)).toBeHidden(); expect(await page.evaluate(() => window.navProbe.accesses)).toBe(0);
  });

  test(`${mount} navigation lifecycle restores original tabindex, focus/scroll and one handler per remount`, async ({page}) => {
    await navigation(page, mount, ['step-0', 'step-1']);
    expect(await page.evaluate(() => window.navProbe.duplicate())).toContain('already mounted');
    await page.evaluate(() => window.navProbe.nav.go('step-2')); await expect(page.locator('#heading-2')).toBeFocused();
    await page.evaluate(() => window.navProbe.nav.go('step-0'));
    const observed = await page.evaluate(() => {
      const input = document.querySelector('#unrelated-input'); input.focus({preventScroll: true}); window.scrollTo({top: 250, behavior: 'instant'});
      const before = {y: scrollY, scrolls: window.navProbe.scrolls}; window.navProbe.update(['step-0', 'step-1']);
      const after = {y: scrollY, scrolls: window.navProbe.scrolls, focus: document.activeElement.id}; window.navProbe.nav.go('step-1');
      return {before, after, final: {y: scrollY, scrolls: window.navProbe.scrolls, focus: document.activeElement.id}};
    });
    expect(observed.before.y).toBe(250); expect(observed.after).toEqual({...observed.before, focus: 'unrelated-input'});
    expect(observed.final).toEqual({y: 0, scrolls: observed.before.scrolls + 1, focus: 'heading-1'});
    await page.evaluate(() => {window.oldButton = document.querySelector('[data-go="step-1"]'); window.oldNav = window.navProbe.nav; window.oldNav.destroy(); window.oldNav.destroy();});
    await expect(page.locator('#rail-links button')).toHaveCount(0); await expect(page.locator('#section-select option')).toHaveCount(0);
    await expect(page.locator('#heading-0')).not.toHaveAttribute('tabindex'); await expect(page.locator('#heading-2')).toHaveAttribute('tabindex', '0');
    await page.evaluate(() => {window.navProbe.remount(); window.navProbe.remount();});
    await expect(page.locator('#heading-0')).toBeFocused(); await expect(page.locator('#rail-links button')).toHaveCount(8); await expect(page.locator('#section-select option')).toHaveCount(8);
    const scrolls = await page.evaluate(() => window.navProbe.scrolls);
    expect(await page.evaluate(() => {window.oldButton.click(); window.oldNav.update({completedSections: []}); return window.oldNav.go('step-1');})).toBe(false);
    expect(await page.evaluate(() => window.navProbe.scrolls)).toBe(scrolls);
    if (await page.locator('#rail-toggle').isVisible()) {await page.locator('#rail-toggle').click(); await expect(page.locator('#rail-toggle')).toHaveAttribute('aria-expanded', 'false'); await expect(page.locator('#rail-toggle')).toHaveAccessibleName('Expand navigation');}
    else await expect(page.locator('#section-select')).toBeVisible();
    expect(await page.evaluate(() => window.navProbe.accesses)).toBe(0);
  });

  test(`${mount} last counted page still needs credit for Next; reference and defensive totals remain independent`, async ({page}) => {
    await navigation(page, mount, ['step-5']); await page.evaluate(() => window.navProbe.nav.go('step-6'));
    await expect(page.locator('#next-section')).toHaveText('Open quick reference →'); await expect(page.locator('#next-section')).toBeDisabled();
    await page.evaluate(() => window.navProbe.update(['step-6', 'reference', 'unknown', 'step-6']));
    await expect(page.locator('#next-section')).toBeEnabled(); await expect(page.locator('#nav-status')).toHaveText('Knowledge check complete.');
    await expect(page.locator('#progress-track')).toHaveAttribute('aria-valuemax', '7'); await expect(page.locator('#progress-track')).toHaveAttribute('aria-valuenow', '2');
    await page.locator('#next-section').click(); await expect(page.locator('#heading-7')).toBeFocused(); await expect(page.locator('#previous-section')).toBeHidden();
    expect(await page.evaluate(() => window.navProbe.accesses)).toBe(0);
  });
}
