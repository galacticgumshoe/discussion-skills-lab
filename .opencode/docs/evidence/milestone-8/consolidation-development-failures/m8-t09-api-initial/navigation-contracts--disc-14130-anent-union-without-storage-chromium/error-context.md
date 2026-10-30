# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-contracts.spec.mjs >> /discussion-skills-lab/ navigation API honors explicit reordered elements, zero/sparse credit, locked rejection and permanent union without storage
- Location: tests/browser/navigation-contracts.spec.mjs:42:3

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: locator.click: Test timeout of 120000ms exceeded.
Call log:
  - waiting for locator('#quick-reference-link')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - link "Skip to main content" [ref=e4] [cursor=pointer]:
    - /url: "#lesson-main"
  - main [ref=e6]:
    - status [ref=e7]: Test incomplete requirement
    - status [ref=e8]: Lesson is loading.
    - generic [ref=e10]:
      - heading "Test incidental heading" [level=3] [ref=e11]
      - heading "Test step 0" [active] [level=1] [ref=e12]
      - textbox [ref=e13]
```

# Test source

```ts
  1   | // MIT. Shared shell + actual navigation API with synthetic labels; no lesson copy.
  2   | import {test, expect} from '@playwright/test';
  3   | import {apiPage} from '../helpers/browser-probe.mjs';
  4   | const errors = new WeakMap();
  5   | test.beforeEach(({page}) => {const list = []; errors.set(page, list); page.on('pageerror', e => list.push(e.message));});
  6   | test.afterEach(({page}) => expect(errors.get(page)).toEqual([]));
  7   | 
  8   | async function navigation(page, mount, completed = []) {
  9   |   await apiPage(page, mount);
  10  |   await page.evaluate(async ({mount, completed}) => {
  11  |     const rootUrl = new URL(mount, location.origin);
  12  |     const {mountLessonShell} = await import(new URL('assets/js/app/lesson-shell.js', rootUrl));
  13  |     const {mountNavigation} = await import(new URL('assets/js/app/lesson-core.js', rootUrl));
  14  |     const root = document.createElement('div'); root.id = 'nav-probe'; document.body.append(root); mountLessonShell(root);
  15  |     const container = root.querySelector('#views'); container.style.minHeight = '2400px';
  16  |     const sections = [...Array(7).keys()].map(i => ({id: `step-${i}`, label: `Test step ${i}`, requirement: 'Test incomplete requirement', reference: false}));
  17  |     sections.push({id: 'reference', label: 'Test reference', requirement: '', reference: true});
  18  |     for (const [i, s] of sections.entries()) {
  19  |       s.view = document.createElement('section'); s.view.className = 'lesson-view'; s.view.id = `probe-view-${i}`;
  20  |       s.heading = document.createElement(`h${i % 3 + 1}`); s.heading.id = `heading-${i}`; s.heading.textContent = s.label;
  21  |       if (i === 2) s.heading.setAttribute('tabindex', '0');
  22  |       const incidental = document.createElement('h3'); incidental.textContent = 'Test incidental heading';
  23  |       s.view.append(incidental, s.heading); container.prepend(s.view);
  24  |     }
  25  |     const decoy = document.createElement('section'); decoy.hidden = true; decoy.className = 'lesson-view'; decoy.id = 'decoy'; container.prepend(decoy);
  26  |     const outside = document.createElement('section'); outside.hidden = true; outside.className = 'lesson-view'; outside.id = 'outside'; document.body.append(outside);
  27  |     const input = document.createElement('input'); input.id = 'unrelated-input'; sections[0].view.append(input);
  28  |     let nav, state = {completedSections: completed}, scrolls = 0;
  29  |     const scroll = window.scrollTo; window.scrollTo = (...args) => {scrolls++; return scroll(...args);};
  30  |     let accesses = 0; const get = Storage.prototype.getItem, set = Storage.prototype.setItem;
  31  |     Storage.prototype.getItem = function(...args) {accesses++; return get.apply(this, args);};
  32  |     Storage.prototype.setItem = function(...args) {accesses++; return set.apply(this, args);};
  33  |     const mountNav = () => {nav = mountNavigation(root, {sections, state});}; mountNav();
  34  |     window.navProbe = {get nav() {return nav;}, get scrolls() {return scrolls;}, get accesses() {return accesses;}, sections,
  35  |       update(ids) {state = {completedSections: ids}; nav.update(state);},
  36  |       duplicate() {try {mountNavigation(root, {sections, state});} catch(e) {return e.message;}},
  37  |       remount() {nav.destroy(); mountNav();}};
  38  |   }, {mount, completed});
  39  | }
  40  | 
  41  | for (const mount of ['/', '/discussion-skills-lab/']) {
  42  |   test(`${mount} navigation API honors explicit reordered elements, zero/sparse credit, locked rejection and permanent union without storage`, async ({page}) => {
  43  |     await navigation(page, mount);
  44  |     await expect(page.locator('#heading-0')).toBeFocused(); await expect(page.locator('#next-section')).toBeDisabled();
  45  |     await expect(page.locator('#progress-track')).toHaveAttribute('aria-valuenow', '0');
  46  |     const reject = await page.evaluate(() => {
  47  |       const before = window.navProbe.scrolls, focus = document.activeElement.id;
  48  |       const result = ['step-2', 'unknown', 0].map(id => window.navProbe.nav.go(id));
  49  |       const select = document.querySelector('#section-select'); select.value = 'step-2'; select.dispatchEvent(new Event('change'));
  50  |       return {result, before, after: window.navProbe.scrolls, focus, afterFocus: document.activeElement.id};
  51  |     });
  52  |     expect(reject.result).toEqual([false, false, false]); expect(reject.after).toBe(reject.before); expect(reject.afterFocus).toBe(reject.focus);
  53  |     await expect(page.locator('#section-select')).toHaveValue('step-0');
> 54  |     await page.locator('#quick-reference-link').click(); await expect(page.locator('#heading-7')).toBeFocused();
      |                                                 ^ Error: locator.click: Test timeout of 120000ms exceeded.
  55  |     await expect(page.locator('#previous-section')).toBeHidden(); await expect(page.locator('#next-section')).toBeHidden();
  56  |     await expect(page.locator('#nav-status')).toHaveText('Quick reference is always available.');
  57  |     await page.evaluate(() => window.navProbe.update(['step-0', 'step-3']));
  58  |     const allowed = await page.locator('#rail-links button').evaluateAll(nodes => nodes.filter(n => !n.disabled).map(n => n.dataset.go));
  59  |     expect(allowed).toEqual(['step-0', 'step-1', 'step-3', 'step-4', 'reference']);
  60  |     expect(await page.locator('#section-select option').evaluateAll(nodes => nodes.filter(n => !n.disabled).map(n => n.value))).toEqual(allowed);
  61  |     await page.evaluate(() => window.navProbe.nav.go('step-3')); await expect(page.locator('#heading-3')).toBeFocused();
  62  |     const before = await page.evaluate(() => window.navProbe.scrolls); await page.locator('#previous-section').click();
  63  |     await expect(page.locator('#probe-view-3')).toBeVisible(); expect(await page.evaluate(() => window.navProbe.scrolls)).toBe(before);
  64  |     await page.locator('#next-section').click(); await expect(page.locator('#heading-4')).toBeFocused(); await expect(page.locator('#next-section')).toBeDisabled();
  65  |     await page.evaluate(() => {window.navProbe.update([]); document.querySelector('#views').append(window.navProbe.sections[0].view);});
  66  |     await expect(page.locator('#progress-text')).toHaveText('2 of 7 pages completed'); await expect(page.locator('#progress-track')).toHaveAttribute('aria-valuenow', '2');
  67  |     expect(await page.locator('#progress-fill').evaluate(n => parseFloat(n.style.width))).toBeCloseTo(2 / 7 * 100, 3);
  68  |     for (const id of ['decoy', 'outside']) await expect(page.locator(`#${id}`)).toBeHidden(); expect(await page.evaluate(() => window.navProbe.accesses)).toBe(0);
  69  |   });
  70  | 
  71  |   test(`${mount} navigation lifecycle restores original tabindex, focus/scroll and one handler per remount`, async ({page}) => {
  72  |     await navigation(page, mount, ['step-0', 'step-1']);
  73  |     expect(await page.evaluate(() => window.navProbe.duplicate())).toContain('already mounted');
  74  |     await page.evaluate(() => window.navProbe.nav.go('step-2')); await expect(page.locator('#heading-2')).toBeFocused();
  75  |     await page.evaluate(() => window.navProbe.nav.go('step-0'));
  76  |     const observed = await page.evaluate(() => {
  77  |       const input = document.querySelector('#unrelated-input'); input.focus({preventScroll: true}); window.scrollTo({top: 250, behavior: 'instant'});
  78  |       const before = {y: scrollY, scrolls: window.navProbe.scrolls}; window.navProbe.update(['step-0', 'step-1']);
  79  |       const after = {y: scrollY, scrolls: window.navProbe.scrolls, focus: document.activeElement.id}; window.navProbe.nav.go('step-1');
  80  |       return {before, after, final: {y: scrollY, scrolls: window.navProbe.scrolls, focus: document.activeElement.id}};
  81  |     });
  82  |     expect(observed.before.y).toBe(250); expect(observed.after).toEqual({...observed.before, focus: 'unrelated-input'});
  83  |     expect(observed.final).toEqual({y: 0, scrolls: observed.before.scrolls + 1, focus: 'heading-1'});
  84  |     await page.evaluate(() => {window.oldButton = document.querySelector('[data-go="step-1"]'); window.oldNav = window.navProbe.nav; window.oldNav.destroy(); window.oldNav.destroy();});
  85  |     await expect(page.locator('#rail-links button')).toHaveCount(0); await expect(page.locator('#section-select option')).toHaveCount(0);
  86  |     await expect(page.locator('#heading-0')).not.toHaveAttribute('tabindex'); await expect(page.locator('#heading-2')).toHaveAttribute('tabindex', '0');
  87  |     await page.evaluate(() => {window.navProbe.remount(); window.navProbe.remount();});
  88  |     await expect(page.locator('#heading-0')).toBeFocused(); await expect(page.locator('#rail-links button')).toHaveCount(8); await expect(page.locator('#section-select option')).toHaveCount(8);
  89  |     const scrolls = await page.evaluate(() => window.navProbe.scrolls);
  90  |     expect(await page.evaluate(() => {window.oldButton.click(); window.oldNav.update({completedSections: []}); return window.oldNav.go('step-1');})).toBe(false);
  91  |     expect(await page.evaluate(() => window.navProbe.scrolls)).toBe(scrolls);
  92  |     if (await page.locator('#rail-toggle').isVisible()) {await page.locator('#rail-toggle').click(); await expect(page.locator('#rail-toggle')).toHaveAttribute('aria-expanded', 'false'); await expect(page.locator('#rail-toggle')).toHaveAccessibleName('Expand navigation');}
  93  |     else await expect(page.locator('#section-select')).toBeVisible();
  94  |     expect(await page.evaluate(() => window.navProbe.accesses)).toBe(0);
  95  |   });
  96  | 
  97  |   test(`${mount} last counted page still needs credit for Next; reference and defensive totals remain independent`, async ({page}) => {
  98  |     await navigation(page, mount, ['step-5']); await page.evaluate(() => window.navProbe.nav.go('step-6'));
  99  |     await expect(page.locator('#next-section')).toHaveText('Open quick reference →'); await expect(page.locator('#next-section')).toBeDisabled();
  100 |     await page.evaluate(() => window.navProbe.update(['step-6', 'reference', 'unknown', 'step-6']));
  101 |     await expect(page.locator('#next-section')).toBeEnabled(); await expect(page.locator('#nav-status')).toHaveText('Knowledge check complete.');
  102 |     await expect(page.locator('#progress-track')).toHaveAttribute('aria-valuemax', '7'); await expect(page.locator('#progress-track')).toHaveAttribute('aria-valuenow', '2');
  103 |     await page.locator('#next-section').click(); await expect(page.locator('#heading-7')).toBeFocused(); await expect(page.locator('#previous-section')).toBeHidden();
  104 |     expect(await page.evaluate(() => window.navProbe.accesses)).toBe(0);
  105 |   });
  106 | }
  107 | 
```