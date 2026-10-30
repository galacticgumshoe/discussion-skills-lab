# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: presentation-contracts.spec.mjs >> /final every public section and card face remains unclipped with enlarged narrow text and reduced motion
- Location: tests/browser/presentation-contracts.spec.mjs:24:3

# Error details

```
Error: connect-viewpoints

expect(received).toBe(expected) // Object.is equality

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
        - generic [ref=e9]: Closing with Purpose · The Final Stage
      - generic [ref=e10]: SELF-PACED · ABOUT 25–30 MINUTES
  - main [ref=e12]:
    - generic [ref=e13]:
      - generic [ref=e14]: Go to a section
      - combobox "Go to a section" [ref=e15]:
        - option "Welcome — Why the Final Stage Matters"
        - option "01 — Summary or Synthesis?"
        - option "02 — Connect the Viewpoints" [selected]
        - option "03 — Organize the Findings"
        - option "04 — Build Genuine Consensus"
        - option "05 — Check the Task"
        - option "06 — Finish Professionally"
        - option "07 — Practice Your Closing"
        - option "08 — Knowledge Check"
        - option "Quick Reference"
    - status [ref=e16]: Section complete. You can continue.
    - region "From Multiple Ideas to One New Insight" [ref=e18]:
      - paragraph [ref=e19]: 02 · Explore and apply · 4 minutes
      - heading "From Multiple Ideas to One New Insight" [active] [level=2] [ref=e20]
      - paragraph [ref=e23]: Synthesis requires listening, remembering, connecting, and thinking beyond what has already been said.
      - generic [ref=e26]:
        - group [ref=e27]:
          - generic "1 · Listen✓ Explored" [ref=e28] [cursor=pointer]
        - group [ref=e29]:
          - generic "2 · Connect✓ Explored" [ref=e30] [cursor=pointer]
        - group [ref=e31]:
          - generic "3 · Credit✓ Explored" [ref=e32] [cursor=pointer]
        - group [ref=e33]:
          - generic "4 · Advance✓ Explored" [ref=e34] [cursor=pointer]
      - generic [ref=e35]:
        - generic [ref=e36]:
          - heading "The Synthesis Builder" [level=3] [ref=e39]
          - paragraph [ref=e42]: A community advisory committee must propose how to increase teen participation in after-school programs.
          - generic [ref=e43]:
            - paragraph [ref=e46]:
              - strong [ref=e47]: "Maya:"
              - text: “Transportation is a major concern. We could partner with local transit providers.”
            - paragraph [ref=e50]:
              - strong [ref=e51]: "Jordan:"
              - text: “That could be expensive. We need a way to control costs.”
            - paragraph [ref=e54]:
              - strong [ref=e55]: "Avery:"
              - text: “Students may not know which programs are available. Communication needs attention too.”
            - paragraph [ref=e58]:
              - strong [ref=e59]: "Sam:"
              - text: “We should test our recommendations before expanding them across the city.”
        - generic [ref=e63]:
          - heading "Practice activity" [level=3] [ref=e64]
          - paragraph [ref=e65]: Question 1 of 1
          - article [ref=e67]:
            - paragraph [ref=e68]: Which combination creates the clearest new direction?
            - group "Which combination creates the clearest new direction?" [ref=e69]:
              - button "A. Repeat Maya's transportation idea without addressing the others." [ref=e70] [cursor=pointer]
              - button "B. Combine transportation access, cost controls, communication, and a pilot into a coordinated recommendation." [ref=e71] [cursor=pointer]
              - button "C. Select whichever idea was mentioned most often." [ref=e72] [cursor=pointer]
            - status
            - paragraph [ref=e73]: This question was already completed correctly. You may explore the other explanations without losing credit.
          - generic "Question navigation"
          - status
        - generic [ref=e74]:
          - heading "Construct your synthesis" [level=3] [ref=e77]
          - generic [ref=e80]:
            - generic [ref=e81]:
              - generic [ref=e82]: Which participants' ideas are you connecting?
              - textbox "Which participants' ideas are you connecting?" [ref=e83]: Maya and Jordan.
              - generic [ref=e84]: What relationship do you see between their ideas?
              - textbox "What relationship do you see between their ideas?" [ref=e85]: Costs affect access!
              - generic [ref=e86]: What new recommendation follows?
              - textbox "What new recommendation follows?" [ref=e87]: We propose a pilot.
              - button "Assemble My Synthesis" [ref=e88] [cursor=pointer]
              - generic [ref=e89]:
                - generic [ref=e90]: My synthesis · editable
                - textbox "My synthesis · editable" [ref=e91]: Building on Maya and Jordan, costs affect access. Therefore, we propose a pilot.
                - generic [ref=e92]:
                  - button "Edit Response" [ref=e93] [cursor=pointer]
                  - button "Copy My Synthesis" [ref=e94] [cursor=pointer]
                  - button "Compare with Model" [expanded] [ref=e95] [cursor=pointer]
            - status
            - generic [ref=e96]:
              - strong [ref=e97]: Model synthesis
              - paragraph [ref=e98]: “Building on Maya's transportation proposal and Jordan's concern about costs, we could recommend a limited transportation pilot before committing to a larger program. Sam's suggestion to test solutions would help us evaluate the pilot, while Avery's communication idea could ensure students know the service is available.”
              - paragraph [ref=e99]: This credits contributors, connects perspectives, addresses costs, develops a coordinated recommendation, and advances the task.
          - generic [ref=e100]:
            - paragraph [ref=e103]: "Your writing is not automatically graded. Reflect honestly:"
            - heading "Self-assessment" [level=3] [ref=e106]
            - generic [ref=e109]:
              - generic [ref=e110] [cursor=pointer]:
                - checkbox "I connected at least two viewpoints." [checked] [ref=e111]
                - generic [ref=e112]: I connected at least two viewpoints.
              - generic [ref=e113] [cursor=pointer]:
                - checkbox "I credited the people whose ideas I used." [checked] [ref=e114]
                - generic [ref=e115]: I credited the people whose ideas I used.
              - generic [ref=e116] [cursor=pointer]:
                - checkbox "I added a new insight or recommendation." [checked] [ref=e117]
                - generic [ref=e118]: I added a new insight or recommendation.
              - generic [ref=e119] [cursor=pointer]:
                - checkbox "My contribution addresses the task." [checked] [ref=e120]
                - generic [ref=e121]: My contribution addresses the task.
              - generic [ref=e122] [cursor=pointer]:
                - checkbox "My language is collaborative and professional." [checked] [ref=e123]
                - generic [ref=e124]: My language is collaborative and professional.
    - generic [ref=e125]:
      - button "← Back" [ref=e126] [cursor=pointer]
      - button "Next section →" [ref=e127] [cursor=pointer]
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
> 34 |       expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), section.id).toBe(true);
     |                                                                                                             ^ Error: connect-viewpoints
  35 |       if (!section.reference) {
  36 |         const heading = view.locator('h1,h2').first(); expect(await heading.evaluate(n => {const s = getComputedStyle(n); return n.scrollWidth <= n.clientWidth + 1 && s.overflowY === 'visible' && s.maxHeight === 'none';})).toBe(true);
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