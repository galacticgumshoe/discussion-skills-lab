# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: presentation-contracts.spec.mjs >> /final narrow controls/card faces, enlarged title/card contracts, reduced motion and restored cues
- Location: tests/browser/presentation-contracts.spec.mjs:28:3

# Error details

```
Error: closing-practice

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - link "Skip to main content" [ref=e4]:
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
        - option "01 — Summary or Synthesis?"
        - option "02 — Connect the Viewpoints"
        - option "03 — Organize the Findings"
        - option "04 — Build Genuine Consensus"
        - option "05 — Check the Task"
        - option "06 — Finish Professionally"
        - option "07 — Practice Your Closing" [selected]
        - option "08 — Knowledge Check"
        - option "Quick Reference"
    - status [ref=e16]: Section complete. You can continue.
    - region "A Discussion in Its Final Minutes" [ref=e18]:
      - paragraph [ref=e19]: 07 · Integrated practice · 4 minutes
      - heading "A Discussion in Its Final Minutes" [active] [level=2] [ref=e20]
      - paragraph [ref=e23]: Apply synthesis, summary, consensus, and task evaluation in one fictional simulation.
      - generic [ref=e24]:
        - paragraph [ref=e27]:
          - text: A city committee has about five minutes left. Its proposal must address
          - strong [ref=e28]: access, communication, and affordability
          - text: . The group has discussed a transportation pilot, outreach, cost controls, evaluation, and a possible funding partnership.
        - generic [ref=e29]:
          - paragraph [ref=e32]:
            - strong [ref=e33]: "Maya:"
            - text: “Transportation support should be our main recommendation.”
          - paragraph [ref=e36]:
            - strong [ref=e37]: "Jordan:"
            - text: “I support that if initial costs stay limited.”
          - paragraph [ref=e40]:
            - strong [ref=e41]: "Avery:"
            - text: “Communication should be part of the proposal too.”
          - paragraph [ref=e44]:
            - strong [ref=e45]: "Sam:"
            - text: “We need a clear recommendation everyone supports.”
      - generic [ref=e49]:
        - heading "Final-minutes decision" [level=3] [ref=e50]
        - paragraph [ref=e51]: Question 1 of 4
        - article [ref=e53]:
          - paragraph [ref=e54]: Which contribution best connects the viewpoints?
          - group "Which contribution best connects the viewpoints?" [ref=e55]:
            - button "A. Maya had the best idea, so let's use that." [ref=e56] [cursor=pointer]
            - button "B. Building on Maya's transportation proposal, Jordan's cost concern, and Avery's communication idea, we could recommend a limited pilot paired with outreach and a cost review." [ref=e57] [cursor=pointer]
            - button "C. Everyone has made good points." [ref=e58] [cursor=pointer]
          - status
          - paragraph
        - button "Next question →" [disabled] [ref=e60]
        - generic "Question navigation"
        - status
    - generic [ref=e61]:
      - button "← Back" [ref=e62] [cursor=pointer]
      - button "Next section →" [ref=e63] [cursor=pointer]
```

# Test source

```ts
  1   | // MIT. Consolidated public presentation checks; original content CC BY 4.0.
  2   | import {test, expect} from '@playwright/test';
  3   | import {readFileSync} from 'node:fs';
  4   | import {original} from '../helpers/baseline-source.mjs';
  5   | import {observe, compare, manifest, presentationRecord, presentationReady} from '../helpers/presentation-contracts.mjs';
  6   | import {publicVisit, settle} from '../helpers/browser-probe.mjs';
  7   | const keys = {opening: 'dsl:opening-stage:v1', middle: 'dsl:middle:v1', final: 'dsl:final:v1'};
  8   | const errors = new WeakMap();
  9   | const layoutReady = page => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  10  | test.beforeEach(({page}) => {const list = []; errors.set(page, list); page.on('pageerror', e => list.push(e.message));});
  11  | test.afterEach(({page}) => expect(errors.get(page)).toEqual([]));
  12  | for (const mount of ['/', '/discussion-skills-lab/']) for (const id of ['opening', 'middle', 'final']) {
  13  |   test(`${mount}${id} all authored presentation roles/states survive consolidation at desktop/breakpoint/mobile`, async ({page}) => {
  14  |     test.setTimeout(300_000);
  15  |     // Paint roles do not need to replay every half-second transition. The direct
  16  |     // component contracts separately exercise normal 3D motion and reduced motion.
  17  |     await page.emulateMedia({reducedMotion: 'reduce'});
  18  |     for (const width of id === 'middle' ? [1440, 940, 760, 390] : [1440, 780, 390]) {
  19  |       await page.setViewportSize({width, height: 1000});
  20  |       const record = JSON.parse(presentationRecord(id)); if (id === 'final') record.data.finalState.notes = {};
  21  |       await page.goto(mount); await page.evaluate(({key, record}) => localStorage.setItem(key, record), {key: keys[id], record: JSON.stringify(record)});
  22  |       await page.goto(`/__original${mount}${id}.html`); await expect(page.locator('#view-0')).toBeVisible(); await presentationReady(page); const expected = await observe(page, id, true, width);
  23  |       await page.evaluate(({key, record}) => localStorage.setItem(key, record), {key: keys[id], record: JSON.stringify(record)});
  24  |       await page.goto(`${mount}${id}.html`); await expect(page.locator('#lesson-status')).toBeHidden(); await expect(page.locator('[data-content-status]').filter({visible: true})).toHaveCount(0);
  25  |       await presentationReady(page); compare(await observe(page, id, false, width), expected);
  26  |     }
  27  |   });
  28  |   test(`${mount}${id} narrow controls/card faces, enlarged title/card contracts, reduced motion and restored cues`, async ({page}) => {
  29  |     const record = JSON.parse(presentationRecord(id));
  30  |     if (id === 'final') record.data.finalState.flips = {};
  31  |     const completed = JSON.stringify(record);
  32  |     await page.goto(mount); await page.evaluate(({key, completed}) => localStorage.setItem(key, completed), {key: keys[id], completed});
  33  |     await page.goto(`${mount}${id}.html`); await expect(page.locator('#lesson-status')).toBeHidden(); await page.setViewportSize({width: 320, height: 1000}); await page.emulateMedia({reducedMotion: 'reduce'});
  34  |     await settle(page);
  35  |     // Preserve the original scopes: Opening enlarges the root, Middle's card
  36  |     // check enlarges #views, Final enlarges titles separately from its controls.
  37  |     await page.evaluate(id => {if (id === 'opening') document.documentElement.style.fontSize = '200%';}, id);
  38  |     for (const [index, section] of manifest(id).sections.entries()) {
  39  |       if (id === 'middle') await page.evaluate(index => {document.querySelector('#views').style.fontSize = [0, 1, 2, 5].includes(index) ? '200%' : '';}, index);
  40  |       await publicVisit(page, section.id); await settle(page);
  41  |       const view = page.locator(`[data-section-id="${section.id}"]`);
> 42  |       expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), section.id).toBe(true);
      |                                                                                                             ^ Error: closing-practice
  43  |       if (!section.reference) {
  44  |         if (id === 'final') {await page.evaluate(() => {document.documentElement.style.fontSize = '200%';}); await layoutReady(page);}
  45  |         const heading = view.locator('h1,h2').first(); expect(await heading.evaluate((n, id) => {const s = getComputedStyle(n); return (id === 'middle' || n.scrollWidth <= n.clientWidth + 1) && s.overflowY === 'visible' && s.maxHeight === 'none';}, id)).toBe(true);
  46  |         await expect(heading).toHaveCSS('font-weight', '700');
  47  |         expect(await heading.evaluate(n => parseFloat(getComputedStyle(n).fontSize))).toBeCloseTo(id === 'middle' ? index === 0 ? 37.6 : 29.6 : id === 'final' && index === 0 ? 72 : 59.2, 1);
  48  |         if (id === 'final') {await page.evaluate(() => {document.documentElement.style.fontSize = '';}); await layoutReady(page);}
  49  |       }
  50  |       for (const card of await view.locator('.dsl-card').all()) {
  51  |         await expect(card).toHaveAttribute('aria-pressed', 'false');
  52  |         if (id === 'final') await expect(card.locator('.dsl-card-front>.dsl-card-explored')).toBeHidden();
  53  |         const front = card.locator('.dsl-card-front');
  54  |         if (id === 'final') {
  55  |           await expect(front).toHaveCSS('font-weight', '400'); await expect(front).toHaveCSS('border-radius', '15px');
  56  |           await expect(front).toHaveCSS('background-color', 'rgb(255, 255, 255)'); await expect(front).toHaveCSS('color', 'rgb(20, 43, 73)');
  57  |         }
  58  |         for (const side of ['front', 'back']) {
  59  |           if (side === 'back') {await card.focus(); await card.press('Space');}
  60  |           for (const node of await card.locator(`.dsl-card-${side},.dsl-card-${side} .dsl-card-copy`).all()) expect(await node.evaluate(n => n.scrollWidth <= n.clientWidth + 1 && n.scrollHeight <= n.clientHeight + 2)).toBe(true);
  61  |         }
  62  |         await expect(card).toBeFocused(); await expect(front).toHaveAttribute('aria-hidden', 'true');
  63  |         await expect(card.locator('.dsl-card-back .dsl-card-explored')).toBeVisible();
  64  |         await card.press('Space'); await expect(card).toBeFocused(); await expect(card.locator('.dsl-card-back')).toHaveAttribute('aria-hidden', 'true');
  65  |         const cue = card.locator('.dsl-card-front>.dsl-card-explored'); await expect(cue).toHaveText('✓ Explored'); await expect(cue).toBeVisible();
  66  |         expect(await card.getAttribute('aria-label')).not.toContain('Explored');
  67  |         const metrics = await card.evaluate(n => {const face = n.querySelector('.dsl-card-front').getBoundingClientRect(), copy = n.querySelector('.dsl-card-front .dsl-card-content').getBoundingClientRect(), mark = n.querySelector('.dsl-card-front>.dsl-card-explored').getBoundingClientRect(), hint = n.querySelector('.dsl-card-hint').getBoundingClientRect(); return {inside: mark.left >= face.left && mark.right <= face.right + 1 && mark.bottom <= face.bottom + 1, clear: copy.bottom <= Math.min(mark.top, hint.top) + 1 / 64, separate: mark.right <= hint.left || hint.right <= mark.left || mark.bottom <= hint.top || hint.bottom <= mark.top};});
  68  |         expect(metrics).toEqual({inside: true, clear: true, separate: true});
  69  |         await expect(card.locator('.dsl-card-inner')).toHaveCSS('transition-duration', '0s');
  70  |       }
  71  |       const clipped = await view.locator('button,textarea,select').evaluateAll(nodes => nodes.filter(n => n.getClientRects().length && n.scrollWidth > n.clientWidth + 2).map(n => n.id || n.className)); expect(clipped).toEqual([]);
  72  |     }
  73  |     // The same earned cues survive a real bootstrap; card faces remain session-only.
  74  |     await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden();
  75  |     for (const section of manifest(id).sections) {
  76  |       await publicVisit(page, section.id);
  77  |       for (const card of await page.locator(`[data-section-id="${section.id}"] .dsl-card`).all()) {await expect(card).toHaveAttribute('aria-pressed', 'false'); await expect(card.locator('.dsl-card-front>.dsl-card-explored')).toBeVisible();}
  78  |     }
  79  |     await page.emulateMedia({media: 'print'}); await expect(page.locator('[data-view-role="reference"]')).toBeVisible();
  80  |     for (const view of await page.locator('[data-view-role="lesson"]').all()) await expect(view).toBeHidden();
  81  |     await expect(page.locator('button,input,textarea,select').filter({visible: true})).toHaveCount(0);
  82  |     if (id === 'opening') {await expect(page.locator('.opening-reference-group')).toHaveCount(4); await expect(page.locator('.opening-reference-1 li')).toHaveCount(6);}
  83  |   });
  84  | }
  85  | 
  86  | for (const mount of ['/', '/discussion-skills-lab/']) test(`${mount} Opening essentials retain compact paired rows at the exact mobile breakpoint`, async ({page}) => {
  87  |   const source = original('opening.html').toString();
  88  |   await page.goto(mount); await page.evaluate(() => localStorage.setItem('dsl:opening-stage:v1', JSON.stringify({completed: [0, 1, 2], data: {}})));
  89  |   await page.goto(`${mount}opening.html`); await expect(page.locator('#lesson-status')).toBeHidden(); await publicVisit(page, 'clarifications');
  90  |   const expected = await page.evaluate(source => {const panel = new DOMParser().parseFromString(source, 'text/html').querySelector('#view-3 .card.soft'); return {heading: panel.querySelector('h3').textContent, labels: [...panel.querySelector('.grid').querySelectorAll('p')].map(n => n.textContent)};}, source);
  91  |   const panel = page.locator('#view-3 .dsl-tone-soft'), grid = panel.locator(':scope>.dsl-layout-two-column');
  92  |   for (const width of [1440, 940, 780, 640, 639, 390, 320]) {
  93  |     await page.setViewportSize({width, height: 1000}); if (width === 320) await page.evaluate(() => {document.documentElement.style.fontSize = '200%';}); await settle(page);
  94  |     await expect(panel.getByRole('heading', {name: expected.heading, exact: true})).toBeVisible(); await expect(grid.locator('p').filter({hasText: /^✓ /})).toHaveText(expected.labels);
  95  |     const result = await grid.evaluate(n => {const r = n.getBoundingClientRect(), s = getComputedStyle(n); return {gap: parseFloat(s.rowGap), columns: s.gridTemplateColumns.split(' ').length, width: r.width, margins: [...n.children].map(c => parseFloat(getComputedStyle(c).marginTop)), rows: [...n.querySelectorAll('p')].filter(p => p.textContent.startsWith('✓ ')).map(p => {const a = p.getBoundingClientRect(); return {top: a.top - r.top, bottom: a.bottom - r.top, left: a.left - r.left};})};});
  96  |     expect(result.gap).toBe(12); expect(result.columns).toBe(width >= 640 ? 2 : 1); expect(result.margins).toEqual([0, 0, 0, 0]);
  97  |     result.rows.forEach((row, i) => {const column = i % result.columns, index = Math.floor(i / result.columns), above = result.rows.slice((index - 1) * result.columns, index * result.columns); expect(Math.abs(row.top - (index ? Math.max(...above.map(n => n.bottom)) + 12 : 0))).toBeLessThanOrEqual(1 / 64); expect(Math.abs(row.left - (column ? (result.width + 12) / 2 : 0))).toBeLessThanOrEqual(1 / 64);});
  98  |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  99  |   }
  100 | });
  101 | 
```