# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: presentation-contracts.spec.mjs >> /final narrow controls/card faces, enlarged title/card contracts, reduced motion and restored cues
- Location: tests/browser/presentation-contracts.spec.mjs:24:3

# Error details

```
Error: expect(received).toBeCloseTo(expected, precision)

Expected: 59.2
Received: 29.6

Expected precision:    1
Expected difference: < 0.05
Received difference:   29.6
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - link "Skip to main content" [ref=e4] [cursor=pointer]:
    - /url: "#lesson-main"
  - banner [ref=e5]:
    - generic [ref=e6]:
      - generic [ref=e7]:
        - generic [ref=e8]: DISCUSSION SKILLS LAB · MSHSL SPEECH
        - generic [ref=e9]: Closing with Purpose · The Final Stage
      - generic [ref=e10]: SELF-PACED · ABOUT 25–30 MINUTES
  - main [ref=e12]:
    - generic [ref=e13]:
      - generic [ref=e14]: Go to a section
      - combobox "Go to a section" [ref=e15]:
        - option "Welcome — Why the Final Stage Matters"
        - option "01 — Summary or Synthesis?" [selected]
        - option "02 — Connect the Viewpoints"
        - option "03 — Organize the Findings"
        - option "04 — Build Genuine Consensus"
        - option "05 — Check the Task"
        - option "06 — Finish Professionally"
        - option "07 — Practice Your Closing"
        - option "08 — Knowledge Check"
        - option "Quick Reference"
    - status [ref=e16]: Section complete. You can continue.
    - region "Two Ways to Bring Ideas Together" [ref=e18]:
      - paragraph [ref=e19]: 01 · Understand and apply · 3 minutes
      - heading "Two Ways to Bring Ideas Together" [active] [level=2] [ref=e20]
      - paragraph [ref=e23]: Summarizing and synthesizing are related, but they accomplish different things.
      - generic [ref=e26]:
        - button "What does it mean to summarize? — Flip card" [ref=e27] [cursor=pointer]:
          - generic [ref=e29]:
            - generic [ref=e32]: What does it mean to summarize?
            - generic [ref=e33]: ↻ Flip card
        - button "What does it mean to synthesize? — Flip card" [ref=e34] [cursor=pointer]:
          - generic [ref=e36]:
            - generic [ref=e39]: What does it mean to synthesize?
            - generic [ref=e40]: ↻ Flip card
    - generic [ref=e41]:
      - button "← Back" [ref=e42] [cursor=pointer]
      - button "Next section →" [ref=e43] [cursor=pointer]
```

# Test source

```ts
  1  | // MIT. Consolidated public presentation checks; original content CC BY 4.0.
  2  | import {test, expect} from '@playwright/test';
  3  | import {readFileSync} from 'node:fs';
  4  | import {original} from '../helpers/baseline-source.mjs';
  5  | import {observe, compare, manifest, presentationRecord, presentationReady} from '../helpers/presentation-contracts.mjs';
  6  | import {publicVisit, settle} from '../helpers/browser-probe.mjs';
  7  | const keys = {opening: 'dsl:opening-stage:v1', middle: 'dsl:middle:v1', final: 'dsl:final:v1'};
  8  | const errors = new WeakMap();
  9  | test.beforeEach(({page}) => {const list = []; errors.set(page, list); page.on('pageerror', e => list.push(e.message));});
  10 | test.afterEach(({page}) => expect(errors.get(page)).toEqual([]));
  11 | for (const mount of ['/', '/discussion-skills-lab/']) for (const id of ['opening', 'middle', 'final']) {
  12 |   test(`${mount}${id} all authored presentation roles/states survive consolidation at desktop/breakpoint/mobile`, async ({page}) => {
  13 |     test.setTimeout(300_000);
  14 |     for (const width of id === 'middle' ? [1440, 940, 760, 390] : [1440, 780, 390]) {
  15 |       await page.setViewportSize({width, height: 1000});
  16 |       const record = JSON.parse(presentationRecord(id)); if (id === 'final') record.data.finalState.notes = {};
  17 |       await page.goto(mount); await page.evaluate(({key, record}) => localStorage.setItem(key, record), {key: keys[id], record: JSON.stringify(record)});
  18 |       await page.goto(`/__original${mount}${id}.html`); await expect(page.locator('#view-0')).toBeVisible(); await presentationReady(page); const expected = await observe(page, id, true, width);
  19 |       await page.evaluate(({key, record}) => localStorage.setItem(key, record), {key: keys[id], record: JSON.stringify(record)});
  20 |       await page.goto(`${mount}${id}.html`); await expect(page.locator('#lesson-status')).toBeHidden(); await expect(page.locator('[data-content-status]').filter({visible: true})).toHaveCount(0);
  21 |       await presentationReady(page); compare(await observe(page, id, false, width), expected);
  22 |     }
  23 |   });
  24 |   test(`${mount}${id} narrow controls/card faces, enlarged title/card contracts, reduced motion and restored cues`, async ({page}) => {
  25 |     const record = JSON.parse(presentationRecord(id));
  26 |     if (id === 'final') record.data.finalState.flips = {};
  27 |     const completed = JSON.stringify(record);
  28 |     await page.goto(mount); await page.evaluate(({key, completed}) => localStorage.setItem(key, completed), {key: keys[id], completed});
  29 |     await page.goto(`${mount}${id}.html`); await expect(page.locator('#lesson-status')).toBeHidden(); await page.setViewportSize({width: 320, height: 1000}); await page.emulateMedia({reducedMotion: 'reduce'});
  30 |     await presentationReady(page);
  31 |     // Preserve the original scopes: Opening enlarges the root, Middle's card
  32 |     // check enlarges #views, Final enlarges titles separately from its controls.
  33 |     await page.evaluate(id => {if (id === 'opening') document.documentElement.style.fontSize = '200%'; else document.querySelector('#views').style.fontSize = '200%';}, id);
  34 |     for (const [index, section] of manifest(id).sections.entries()) {
  35 |       await publicVisit(page, section.id); await settle(page);
  36 |       const view = page.locator(`[data-section-id="${section.id}"]`);
  37 |       expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), section.id).toBe(true);
  38 |       if (!section.reference) {
  39 |         if (id === 'final') await page.evaluate(() => {document.documentElement.style.fontSize = '200%';});
  40 |         const heading = view.locator('h1,h2').first(); expect(await heading.evaluate((n, id) => {const s = getComputedStyle(n); return (id === 'middle' || n.scrollWidth <= n.clientWidth + 1) && s.overflowY === 'visible' && s.maxHeight === 'none';}, id)).toBe(true);
  41 |         await expect(heading).toHaveCSS('font-weight', '700');
> 42 |         expect(await heading.evaluate(n => parseFloat(getComputedStyle(n).fontSize))).toBeCloseTo(id === 'middle' ? index === 0 ? 37.6 : 29.6 : id === 'final' && index === 0 ? 72 : 59.2, 1);
     |                                                                                       ^ Error: expect(received).toBeCloseTo(expected, precision)
  43 |         if (id === 'final') await page.evaluate(() => {document.documentElement.style.fontSize = '';});
  44 |       }
  45 |       for (const card of await view.locator('.dsl-card').all()) {
  46 |         await expect(card).toHaveAttribute('aria-pressed', 'false');
  47 |         if (id === 'final') await expect(card.locator('.dsl-card-front>.dsl-card-explored')).toBeHidden();
  48 |         const front = card.locator('.dsl-card-front');
  49 |         if (id === 'final') {
  50 |           await expect(front).toHaveCSS('font-weight', '400'); await expect(front).toHaveCSS('border-radius', '15px');
  51 |           await expect(front).toHaveCSS('background-color', 'rgb(255, 255, 255)'); await expect(front).toHaveCSS('color', 'rgb(20, 43, 73)');
  52 |         }
  53 |         for (const side of ['front', 'back']) {
  54 |           if (side === 'back') {await card.focus(); await card.press('Space');}
  55 |           for (const node of await card.locator(`.dsl-card-${side},.dsl-card-${side} .dsl-card-copy`).all()) expect(await node.evaluate(n => n.scrollWidth <= n.clientWidth + 1 && n.scrollHeight <= n.clientHeight + 2)).toBe(true);
  56 |         }
  57 |         await expect(card).toBeFocused(); await expect(front).toHaveAttribute('aria-hidden', 'true');
  58 |         await expect(card.locator('.dsl-card-back .dsl-card-explored')).toBeVisible();
  59 |         await card.press('Space'); await expect(card).toBeFocused(); await expect(card.locator('.dsl-card-back')).toHaveAttribute('aria-hidden', 'true');
  60 |         const cue = card.locator('.dsl-card-front>.dsl-card-explored'); await expect(cue).toHaveText('✓ Explored'); await expect(cue).toBeVisible();
  61 |         expect(await card.getAttribute('aria-label')).not.toContain('Explored');
  62 |         const metrics = await card.evaluate(n => {const face = n.querySelector('.dsl-card-front').getBoundingClientRect(), copy = n.querySelector('.dsl-card-front .dsl-card-content').getBoundingClientRect(), mark = n.querySelector('.dsl-card-front>.dsl-card-explored').getBoundingClientRect(), hint = n.querySelector('.dsl-card-hint').getBoundingClientRect(); return {inside: mark.left >= face.left && mark.right <= face.right + 1 && mark.bottom <= face.bottom + 1, clear: copy.bottom <= Math.min(mark.top, hint.top) + 1 / 64, separate: mark.right <= hint.left || hint.right <= mark.left || mark.bottom <= hint.top || hint.bottom <= mark.top};});
  63 |         expect(metrics).toEqual({inside: true, clear: true, separate: true});
  64 |         await expect(card.locator('.dsl-card-inner')).toHaveCSS('transition-duration', '0s');
  65 |       }
  66 |       const clipped = await view.locator('button,textarea,select').evaluateAll(nodes => nodes.filter(n => n.getClientRects().length && n.scrollWidth > n.clientWidth + 2).map(n => n.id || n.className)); expect(clipped).toEqual([]);
  67 |     }
  68 |     // The same earned cues survive a real bootstrap; card faces remain session-only.
  69 |     await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden();
  70 |     for (const section of manifest(id).sections) {
  71 |       await publicVisit(page, section.id);
  72 |       for (const card of await page.locator(`[data-section-id="${section.id}"] .dsl-card`).all()) {await expect(card).toHaveAttribute('aria-pressed', 'false'); await expect(card.locator('.dsl-card-front>.dsl-card-explored')).toBeVisible();}
  73 |     }
  74 |     await page.emulateMedia({media: 'print'}); await expect(page.locator('[data-view-role="reference"]')).toBeVisible();
  75 |     for (const view of await page.locator('[data-view-role="lesson"]').all()) await expect(view).toBeHidden();
  76 |     for (const control of await page.locator('button,input,textarea,select').all()) await expect(control).toBeHidden();
  77 |     if (id === 'opening') {await expect(page.locator('.opening-reference-group')).toHaveCount(4); await expect(page.locator('.opening-reference-1 li')).toHaveCount(6);}
  78 |   });
  79 | }
  80 | 
  81 | for (const mount of ['/', '/discussion-skills-lab/']) test(`${mount} Opening essentials retain compact paired rows at the exact mobile breakpoint`, async ({page}) => {
  82 |   const source = original('opening.html').toString();
  83 |   await page.goto(mount); await page.evaluate(() => localStorage.setItem('dsl:opening-stage:v1', JSON.stringify({completed: [0, 1, 2], data: {}})));
  84 |   await page.goto(`${mount}opening.html`); await expect(page.locator('#lesson-status')).toBeHidden(); await publicVisit(page, 'clarifications');
  85 |   const expected = await page.evaluate(source => {const panel = new DOMParser().parseFromString(source, 'text/html').querySelector('#view-3 .card.soft'); return {heading: panel.querySelector('h3').textContent, labels: [...panel.querySelector('.grid').querySelectorAll('p')].map(n => n.textContent)};}, source);
  86 |   const panel = page.locator('#view-3 .dsl-tone-soft'), grid = panel.locator(':scope>.dsl-layout-two-column');
  87 |   for (const width of [1440, 940, 780, 640, 639, 390, 320]) {
  88 |     await page.setViewportSize({width, height: 1000}); if (width === 320) await page.evaluate(() => {document.documentElement.style.fontSize = '200%';}); await settle(page);
  89 |     await expect(panel.getByRole('heading', {name: expected.heading, exact: true})).toBeVisible(); await expect(grid.locator('p').filter({hasText: /^✓ /})).toHaveText(expected.labels);
  90 |     const result = await grid.evaluate(n => {const r = n.getBoundingClientRect(), s = getComputedStyle(n); return {gap: parseFloat(s.rowGap), columns: s.gridTemplateColumns.split(' ').length, width: r.width, margins: [...n.children].map(c => parseFloat(getComputedStyle(c).marginTop)), rows: [...n.querySelectorAll('p')].filter(p => p.textContent.startsWith('✓ ')).map(p => {const a = p.getBoundingClientRect(); return {top: a.top - r.top, bottom: a.bottom - r.top, left: a.left - r.left};})};});
  91 |     expect(result.gap).toBe(12); expect(result.columns).toBe(width >= 640 ? 2 : 1); expect(result.margins).toEqual([0, 0, 0, 0]);
  92 |     result.rows.forEach((row, i) => {const column = i % result.columns, index = Math.floor(i / result.columns), above = result.rows.slice((index - 1) * result.columns, index * result.columns); expect(Math.abs(row.top - (index ? Math.max(...above.map(n => n.bottom)) + 12 : 0))).toBeLessThanOrEqual(1 / 64); expect(Math.abs(row.left - (column ? (result.width + 12) / 2 : 0))).toBeLessThanOrEqual(1 / 64);});
  93 |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  94 |   }
  95 | });
  96 | 
```