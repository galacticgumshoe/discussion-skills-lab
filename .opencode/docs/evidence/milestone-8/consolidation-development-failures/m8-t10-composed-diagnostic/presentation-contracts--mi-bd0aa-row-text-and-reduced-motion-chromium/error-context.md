# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: presentation-contracts.spec.mjs >> /middle every public section and card face remains unclipped with enlarged narrow text and reduced motion
- Location: tests/browser/presentation-contracts.spec.mjs:24:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
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
        - generic [ref=e9]: Making an Impact · The Middle Stage
      - generic [ref=e10]: SELF-PACED · 20–25 MINUTES
  - main [ref=e12]:
    - generic [ref=e13]:
      - generic [ref=e14]: Go to a section
      - combobox "Go to a section" [ref=e15]:
        - option "Welcome"
        - option "01 · Structure to substance" [selected]
        - option "02 · Make contributions count"
        - option "03 · Support the group"
        - option "04 · Communicate professionally"
        - option "05 · Navigate the conversation"
        - option "06 · Put it together"
        - option "07 · Knowledge check"
        - option "↗ · Quick reference"
    - status [ref=e16]: Section complete. You can continue.
    - region "Two Ways to Help a Discussion" [ref=e18]:
      - paragraph [ref=e19]: 01 / 07 · About 3 minutes
      - heading "Two Ways to Help a Discussion" [active] [level=2] [ref=e20]
      - paragraph [ref=e24]: Procedural contributions support the discussion. Substantive contributions move the solution forward. The middle stage calls for both, especially relevant research and insight.
      - generic [ref=e27]:
        - 'button "PROCEDURAL: Organize, structure, or focus the group''s work without directly developing the solution. — Flip card" [ref=e28] [cursor=pointer]':
          - generic [ref=e30]:
            - generic [ref=e31]:
              - strong [ref=e32]: PROCEDURAL
              - generic [ref=e34]: Organize, structure, or focus the group's work without directly developing the solution.
            - generic [ref=e35]: ↻ Flip card
            - generic [ref=e36]: ✓ Explored
        - 'button "SUBSTANTIVE: Introduce ideas, evidence, analysis, or insights that help solve the task. — Flip card" [ref=e37] [cursor=pointer]':
          - generic [ref=e39]:
            - generic [ref=e40]:
              - strong [ref=e41]: SUBSTANTIVE
              - generic [ref=e43]: Introduce ideas, evidence, analysis, or insights that help solve the task.
            - generic [ref=e44]: ↻ Flip card
            - generic [ref=e45]: ✓ Explored
      - paragraph [ref=e49]: Flip both cards to reveal the activity.
      - generic [ref=e50]:
        - heading "Activity 1 · Classify the contribution" [level=3] [ref=e54]
        - paragraph [ref=e58]: Choose procedural or substantive. Retry until you have classified all five.
        - generic [ref=e61]:
          - article [ref=e63]:
            - heading "1 of 5 · “We have about 15 minutes left. Should we move to evaluating solutions?”" [level=3] [ref=e64]
            - group "1 of 5 · “We have about 15 minutes left. Should we move to evaluating solutions?”" [ref=e65]:
              - button "Procedural" [ref=e66] [cursor=pointer]
              - button "Substantive" [ref=e67] [cursor=pointer]
            - status
            - paragraph
          - button "Next →" [ref=e69] [cursor=pointer]
          - paragraph [ref=e70]: 5/5 correct
    - generic [ref=e71]:
      - button "← Back" [ref=e72] [cursor=pointer]
      - button "Next section →" [ref=e73] [cursor=pointer]
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
  24 |   test(`${mount}${id} every public section and card face remains unclipped with enlarged narrow text and reduced motion`, async ({page}) => {
  25 |     const record = JSON.parse(presentationRecord(id));
  26 |     if (id === 'final') record.data.finalState.flips = {};
  27 |     const completed = JSON.stringify(record);
  28 |     await page.goto(mount); await page.evaluate(({key, completed}) => localStorage.setItem(key, completed), {key: keys[id], completed});
  29 |     await page.goto(`${mount}${id}.html`); await expect(page.locator('#lesson-status')).toBeHidden(); await page.setViewportSize({width: 320, height: 1000}); await page.emulateMedia({reducedMotion: 'reduce'});
  30 |     await presentationReady(page); await page.evaluate(() => {document.documentElement.style.fontSize = '200%';});
  31 |     for (const [index, section] of manifest(id).sections.entries()) {
  32 |       await publicVisit(page, section.id); await settle(page);
  33 |       const view = page.locator(`[data-section-id="${section.id}"]`);
  34 |       expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), section.id).toBe(true);
  35 |       if (!section.reference) {
> 36 |         const heading = view.locator('h1,h2').first(); expect(await heading.evaluate(n => {const s = getComputedStyle(n); return n.scrollWidth <= n.clientWidth + 1 && s.overflowY === 'visible' && s.maxHeight === 'none';})).toBe(true);
     |                                                                                                                                                                                                                                ^ Error: expect(received).toBe(expected) // Object.is equality
  37 |         await expect(heading).toHaveCSS('font-weight', '700');
  38 |         expect(await heading.evaluate(n => parseFloat(getComputedStyle(n).fontSize))).toBeCloseTo(id !== 'opening' && index === 0 ? id === 'middle' ? 75.2 : 72 : 59.2, 1);
  39 |       }
  40 |       for (const card of await view.locator('.dsl-card').all()) {
  41 |         await expect(card).toHaveAttribute('aria-pressed', 'false');
  42 |         if (id === 'final') await expect(card.locator('.dsl-card-front>.dsl-card-explored')).toBeHidden();
  43 |         const front = card.locator('.dsl-card-front');
  44 |         if (id === 'final') {
  45 |           await expect(front).toHaveCSS('font-weight', '400'); await expect(front).toHaveCSS('border-radius', '15px');
  46 |           await expect(front).toHaveCSS('background-color', 'rgb(255, 255, 255)'); await expect(front).toHaveCSS('color', 'rgb(20, 43, 73)');
  47 |         }
  48 |         for (const side of ['front', 'back']) {
  49 |           if (side === 'back') {await card.focus(); await card.press('Space');}
  50 |           for (const node of await card.locator(`.dsl-card-${side},.dsl-card-${side} .dsl-card-copy`).all()) expect(await node.evaluate(n => n.scrollWidth <= n.clientWidth + 1 && n.scrollHeight <= n.clientHeight + 2)).toBe(true);
  51 |         }
  52 |         await expect(card).toBeFocused(); await expect(front).toHaveAttribute('aria-hidden', 'true');
  53 |         await expect(card.locator('.dsl-card-back .dsl-card-explored')).toBeVisible();
  54 |         await card.press('Space'); await expect(card).toBeFocused(); await expect(card.locator('.dsl-card-back')).toHaveAttribute('aria-hidden', 'true');
  55 |         const cue = card.locator('.dsl-card-front>.dsl-card-explored'); await expect(cue).toHaveText('✓ Explored'); await expect(cue).toBeVisible();
  56 |         expect(await card.getAttribute('aria-label')).not.toContain('Explored');
  57 |         const metrics = await card.evaluate(n => {const face = n.querySelector('.dsl-card-front').getBoundingClientRect(), copy = n.querySelector('.dsl-card-front .dsl-card-content').getBoundingClientRect(), mark = n.querySelector('.dsl-card-front>.dsl-card-explored').getBoundingClientRect(), hint = n.querySelector('.dsl-card-hint').getBoundingClientRect(); return {inside: mark.left >= face.left && mark.right <= face.right + 1 && mark.bottom <= face.bottom + 1, clear: copy.bottom <= Math.min(mark.top, hint.top) + 1 / 64, separate: mark.right <= hint.left || hint.right <= mark.left || mark.bottom <= hint.top || hint.bottom <= mark.top};});
  58 |         expect(metrics).toEqual({inside: true, clear: true, separate: true});
  59 |         await expect(card.locator('.dsl-card-inner')).toHaveCSS('transition-duration', '0s');
  60 |       }
  61 |       const clipped = await view.locator('button,textarea,select').evaluateAll(nodes => nodes.filter(n => n.getClientRects().length && n.scrollWidth > n.clientWidth + 2).map(n => n.id || n.className)); expect(clipped).toEqual([]);
  62 |     }
  63 |     // The same earned cues survive a real bootstrap; card faces remain session-only.
  64 |     await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden();
  65 |     for (const section of manifest(id).sections) {
  66 |       await publicVisit(page, section.id);
  67 |       for (const card of await page.locator(`[data-section-id="${section.id}"] .dsl-card`).all()) {await expect(card).toHaveAttribute('aria-pressed', 'false'); await expect(card.locator('.dsl-card-front>.dsl-card-explored')).toBeVisible();}
  68 |     }
  69 |     await page.emulateMedia({media: 'print'}); await expect(page.locator('[data-view-role="reference"]')).toBeVisible();
  70 |     for (const view of await page.locator('[data-view-role="lesson"]').all()) await expect(view).toBeHidden();
  71 |     for (const control of await page.locator('button,input,textarea,select').all()) await expect(control).toBeHidden();
  72 |     if (id === 'opening') {await expect(page.locator('.opening-reference-group')).toHaveCount(4); await expect(page.locator('.opening-reference-1 li')).toHaveCount(6);}
  73 |   });
  74 | }
  75 | 
  76 | for (const mount of ['/', '/discussion-skills-lab/']) test(`${mount} Opening essentials retain compact paired rows at the exact mobile breakpoint`, async ({page}) => {
  77 |   const source = original('opening.html').toString();
  78 |   await page.goto(mount); await page.evaluate(() => localStorage.setItem('dsl:opening-stage:v1', JSON.stringify({completed: [0, 1, 2], data: {}})));
  79 |   await page.goto(`${mount}opening.html`); await expect(page.locator('#lesson-status')).toBeHidden(); await publicVisit(page, 'clarifications');
  80 |   const expected = await page.evaluate(source => {const panel = new DOMParser().parseFromString(source, 'text/html').querySelector('#view-3 .card.soft'); return {heading: panel.querySelector('h3').textContent, labels: [...panel.querySelector('.grid').querySelectorAll('p')].map(n => n.textContent)};}, source);
  81 |   const panel = page.locator('#view-3 .dsl-tone-soft'), grid = panel.locator(':scope>.dsl-layout-two-column');
  82 |   for (const width of [1440, 940, 780, 640, 639, 390, 320]) {
  83 |     await page.setViewportSize({width, height: 1000}); if (width === 320) await page.evaluate(() => {document.documentElement.style.fontSize = '200%';}); await settle(page);
  84 |     await expect(panel.getByRole('heading', {name: expected.heading, exact: true})).toBeVisible(); await expect(grid.locator('p').filter({hasText: /^✓ /})).toHaveText(expected.labels);
  85 |     const result = await grid.evaluate(n => {const r = n.getBoundingClientRect(), s = getComputedStyle(n); return {gap: parseFloat(s.rowGap), columns: s.gridTemplateColumns.split(' ').length, width: r.width, margins: [...n.children].map(c => parseFloat(getComputedStyle(c).marginTop)), rows: [...n.querySelectorAll('p')].filter(p => p.textContent.startsWith('✓ ')).map(p => {const a = p.getBoundingClientRect(); return {top: a.top - r.top, bottom: a.bottom - r.top, left: a.left - r.left};})};});
  86 |     expect(result.gap).toBe(12); expect(result.columns).toBe(width >= 640 ? 2 : 1); expect(result.margins).toEqual([0, 0, 0, 0]);
  87 |     result.rows.forEach((row, i) => {const column = i % result.columns, index = Math.floor(i / result.columns), above = result.rows.slice((index - 1) * result.columns, index * result.columns); expect(Math.abs(row.top - (index ? Math.max(...above.map(n => n.bottom)) + 12 : 0))).toBeLessThanOrEqual(1 / 64); expect(Math.abs(row.left - (column ? (result.width + 12) / 2 : 0))).toBeLessThanOrEqual(1 / 64);});
  88 |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  89 |   }
  90 | });
  91 | 
```