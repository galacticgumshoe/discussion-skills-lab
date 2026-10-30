# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: presentation-contracts.spec.mjs >> /opening all authored presentation roles/states survive consolidation at desktop/breakpoint/mobile
- Location: tests/browser/presentation-contracts.spec.mjs:13:3

# Error details

```
Error: Tailwind stylesheet is ready

Tailwind stylesheet is ready

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - generic [ref=e6]: DISCUSSION SKILLS LAB · MSHSL SPEECH
        - generic [ref=e7]: Starting Strong · The Opening Stage
      - generic [ref=e8]: SELF-PACED · 15–20 MINUTES
  - generic [ref=e9]:
    - navigation "Lesson sections" [ref=e10]:
      - button "Collapse navigation" [expanded] [ref=e11] [cursor=pointer]: ⇤
      - generic [ref=e12]:
        - generic [ref=e13]: YOUR PROGRESS
        - generic [ref=e14]: 7 of 7 pages completed
        - progressbar "Completed lesson pages" [ref=e15]
        - paragraph [ref=e17]: Finish each activity to unlock the next page. Quick reference is always available.
      - generic [ref=e18]:
        - button "01 · Contributions" [ref=e19] [cursor=pointer]:
          - text: 01 · Contributions
          - generic [ref=e20]: ✓
        - button "02 · Opening sequence" [ref=e21] [cursor=pointer]:
          - text: 02 · Opening sequence
          - generic [ref=e22]: ✓
        - button "03 · Analyze the task" [ref=e23] [cursor=pointer]:
          - text: 03 · Analyze the task
          - generic [ref=e24]: ✓
        - button "04 · Clarifications" [ref=e25] [cursor=pointer]:
          - text: 04 · Clarifications
          - generic [ref=e26]: ✓
        - button "05 · Give direction" [ref=e27] [cursor=pointer]:
          - text: 05 · Give direction
          - generic [ref=e28]: ✓
        - button "06 · Research & transition" [ref=e29] [cursor=pointer]:
          - text: 06 · Research & transition
          - generic [ref=e30]: ✓
        - button "✓ · Knowledge check" [ref=e31] [cursor=pointer]:
          - text: ✓ · Knowledge check
          - generic [ref=e32]: ✓
        - button "↗ · Quick reference" [ref=e33] [cursor=pointer]
    - main [ref=e34]:
      - status [ref=e35]: Section complete. You can continue.
      - generic [ref=e36]:
        - region "How a Discussion Round Works" [ref=e37]:
          - paragraph [ref=e38]: SECTION 01 / 06
          - heading "How a Discussion Round Works" [active] [level=2] [ref=e39]
          - paragraph [ref=e40]: Every 60-minute Discussion round includes two kinds of contributions. Strong participants know when the group needs structure—and when it needs ideas and evidence.
          - generic [ref=e41]:
            - article [ref=e42]:
              - text: 01 · STRUCTURE
              - heading "Procedural" [level=3] [ref=e43]
              - paragraph [ref=e44]: Provides structure, organization, and focus. It helps the group work effectively without directly developing solutions.
              - list [ref=e45]:
                - listitem [ref=e46]: Clarify the task
                - listitem [ref=e47]: Set an agenda
                - listitem [ref=e48]: Manage time and focus
                - listitem [ref=e49]: Organize the discussion
            - article [ref=e50]:
              - text: 02 · CONTENT
              - heading "Substantive" [level=3] [ref=e51]
              - paragraph [ref=e52]: Develops ideas, introduces evidence, evaluates possibilities, and moves the group toward solving the task.
              - list [ref=e53]:
                - listitem [ref=e54]: Share research and evidence
                - listitem [ref=e55]: Explain causes or effects
                - listitem [ref=e56]: Evaluate solutions
                - listitem [ref=e57]: Synthesize viewpoints
          - generic "Classify the Contribution" [ref=e58]:
            - heading "Classify the Contribution" [level=3] [ref=e59]
            - paragraph [ref=e60]: Read one statement at a time. Choose the contribution type to see why it fits.
            - paragraph [ref=e61]: STATEMENT 1 OF 5
            - paragraph [ref=e62]: “Could we agree on what the task is asking us to accomplish?”
            - generic [ref=e63]:
              - button "Procedural" [ref=e64] [cursor=pointer]
              - button "Substantive" [ref=e65] [cursor=pointer]
            - status [ref=e66]: Correct. This clarifies the task so the group shares a starting point.
            - button "Next statement →" [ref=e67] [cursor=pointer]
        - generic [ref=e68]:
          - button "← Previous" [disabled] [ref=e69]
          - button "Next section →" [ref=e70] [cursor=pointer]
```

# Test source

```ts
  1   | // MIT. One original/current traversal, semantic roles rather than migration captures.
  2   | // Original instruction © Rhys Jones, CC BY 4.0; independent original engine is pinned.
  3   | import {expect} from '@playwright/test';
  4   | import {readFileSync} from 'node:fs';
  5   | import {publicVisit, settle} from './browser-probe.mjs';
  6   | export const manifest = id => JSON.parse(readFileSync(new URL(`../../content/${id}/lesson.json`, import.meta.url)));
  7   | const activity = (id, name) => JSON.parse(readFileSync(new URL(`../../content/${id}/activities/${name}.json`, import.meta.url)));
  8   | export function presentationRecord(id) {
  9   |   const raw = JSON.parse(JSON.parse(readFileSync(new URL(`../fixtures/progress/${id}/completed.json`, import.meta.url))).raw);
  10  |   if (id === 'final') {raw.data.finalState.quizIndex = Object.fromEntries([...Array(9).keys()].map(i => [i, 0])); raw.data.finalState.selections = {}; raw.data.finalState.answers = {}; raw.data.finalState.panelsOpen = {};}
  11  |   if (id === 'middle') {raw.data.middleState.positions = {classify: 0, group: 0, communication: 0, speaking: 0}; raw.data.middleState.quizIndex = 0; raw.data.middleState.selections = {};}
  12  |   return JSON.stringify(raw);
  13  | }
  14  | const keys = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'color', 'backgroundColor', 'borderTopWidth', 'borderLeftWidth', 'borderRadius', 'padding', 'boxShadow', 'letterSpacing', 'textTransform'];
  15  | const openingPaint = ['display', 'backgroundColor', 'borderTopWidth', 'borderRadius', 'paddingTop', 'paddingLeft', 'fontFamily', 'fontSize', 'fontWeight'];
  16  | export const paint = (locator, properties = keys, omitTitleOnly = false) => locator.evaluateAll((nodes, {properties, omitTitleOnly}) => nodes.filter(n => !omitTitleOnly || !(n.children.length === 1 && n.firstElementChild.matches('strong,h3,.dsl-prose-h3') && n.textContent.trim() === n.firstElementChild.textContent.trim())).map(n => {
  17  |   const s = getComputedStyle(n), result = Object.fromEntries(properties.map(key => [key, s[key]]));
  18  |   for (const side of ['Top', 'Left']) if (properties.includes(`border${side}Width`) && parseFloat(s[`border${side}Width`])) result[`border${side}Color`] = s[`border${side}Color`];
  19  |   return result;
  20  | }), {properties, omitTitleOnly});
  21  | const activate = async locator => {await locator.focus(); await locator.press('Enter');};
  22  | const own = (page, name) => page.locator(`[data-activity-id="${name}"]`);
  23  | export async function presentationReady(page) {
  24  |   // The CDN script can finish navigation before its generated stylesheet exists.
  25  |   // Fail explicitly on an unavailable dependency, never compare an unstyled oracle.
> 26  |   await expect.poll(() => page.evaluate(() => [...document.styleSheets].filter(sheet => !sheet.href).some(sheet => [...sheet.cssRules].some(rule => rule.cssText.includes('--tw-border-spacing-x')))), {message: 'Tailwind stylesheet is ready', timeout: 30_000}).toBe(true);
      |                                                                                                                                                                                                                                                                    ^ Error: Tailwind stylesheet is ready
  27  |   await settle(page);
  28  | }
  29  | 
  30  | export async function observe(page, id, original, width) {
  31  |   const result = {}, sections = manifest(id).sections;
  32  |   const capture = async (key, source, current, properties) => {result[key] = await paint(original ? source : current, properties);};
  33  |   for (const [index, section] of sections.entries()) {
  34  |     if (original) {
  35  |       if (await page.locator('#section-select').isVisible()) await page.locator('#section-select').selectOption(String(index));
  36  |       else await page.locator(`[data-go="${index}"]`).click();
  37  |     } else await publicVisit(page, section.id);
  38  |     const view = page.locator(`#view-${index}`), key = `${section.id}/`;
  39  |     await settle(page);
  40  |     await capture(key + 'heading-brand', view.locator('h1,h2').first(), view.locator('h1,h2').first(), ['fontFamily', 'color']);
  41  |     if (!original && !section.reference) {
  42  |       const heading = await view.locator('h1,h2').first().evaluate(n => {const s = getComputedStyle(n); return {size: parseFloat(s.fontSize), weight: s.fontWeight, family: s.fontFamily, line: parseFloat(s.lineHeight), spacing: parseFloat(s.letterSpacing)};});
  43  |       const welcome = id !== 'opening' && index === 0;
  44  |       expect(heading.size).toBeCloseTo(welcome ? id === 'middle' && width <= 600 ? 37.6 : Math.max(36, Math.min(width * .05, 57.6)) : Math.max(29.6, Math.min(width * .034, 41.6)), 1);
  45  |       expect(heading.weight).toBe('700'); expect(heading.family).toContain('Fraunces'); expect(heading.line / heading.size).toBeCloseTo(1.17, 3); expect(heading.spacing / heading.size).toBeCloseTo(-.035, 3);
  46  |     }
  47  |     if (section.reference) {
  48  |       await capture(key + 'reference-heading', view.locator('h1,h2').first(), view.locator('h1,h2').first(), ['fontFamily', 'fontSize', 'lineHeight', 'color']);
  49  |       continue; // semantic print/reference suites own full reference layouts.
  50  |     }
  51  | 
  52  |     // The old all-paragraph contract belongs to Middle, not Opening/Final.
  53  |     // Other lessons retain their explicitly measured roles below; introducing an
  54  |     // exact container-inheritance requirement would not be an assertion port.
  55  |     if (id === 'middle') {
  56  |       if (original) result[key + 'prose'] = await view.locator('p').evaluateAll(nodes => Object.fromEntries(nodes.map(n => {const s = getComputedStyle(n); return [n.textContent.replace(/\s+/g, ' ').trim(), [s.fontFamily, s.fontSize, s.fontWeight, s.lineHeight, s.color]];})));
  57  |       else result[key + 'prose'] = await view.locator('.dsl-prose-lead p,.dsl-prose-note p,.dsl-prose-instruction p,.dsl-prose-label p').evaluateAll(nodes => Object.fromEntries(nodes.map(n => {const s = getComputedStyle(n); return [n.textContent.replace(/\s+/g, ' ').trim(), [s.fontFamily, s.fontSize, s.fontWeight, s.lineHeight, s.color]];})));
  58  |     }
  59  | 
  60  |     if (id === 'final') {
  61  |       await capture(key + 'eyebrow', view.locator(':scope>p').first(), view.locator(':scope>p').first(), ['fontFamily', 'fontSize', 'fontWeight', 'color']);
  62  |       await capture(key + 'lead', view.locator(':scope>p.muted').first(), view.locator('.dsl-prose-lead').first(), ['fontSize', 'color']);
  63  |       const surface = ['backgroundColor', 'borderLeftWidth', 'borderRadius'];
  64  |       await capture(key + 'surfaces', view.locator('.card:not(.activity)'), view.locator('.dsl-tone-callout'), surface);
  65  |       await capture(key + 'speakers', view.locator('.speaker'), view.locator('.dsl-layout-roundtable .dsl-content-block > div > p'), surface);
  66  |       // The original quiz also generates notices, which are measured as question
  67  |       // contexts below. Only authored caution blocks belong in this role.
  68  |       // Original contexts are generated inside #quiz-N; they are not authored
  69  |       // section cautions (the old loop intentionally measured current cautions).
  70  |       await capture(key + 'cautions', view.locator('.notice').filter({hasNot: page.locator('xpath=ancestor::*[starts-with(@id,"quiz-")]')}), view.locator('.dsl-tone-caution'), surface);
  71  |     }
  72  |     if (id === 'opening') await capture(key + 'surfaces', view.locator('.card'), view.locator('.dsl-tone-activity,.dsl-tone-soft,.dsl-sequence-opening-knowledge-check .dsl-question,.dsl-quiz-summary,.card'), openingPaint);
  73  |     if (id === 'middle' && index === 0) {
  74  |       await capture(key + 'callout', view.locator(':scope>.panel'), view.locator(':scope>.dsl-tone-callout'));
  75  |       await capture(key + 'flow', view.locator('.flow span'), view.locator('.dsl-layout-flow .dsl-content-block > div > p'));
  76  |     }
  77  | 
  78  |     const cards = await view.locator(original ? id === 'middle' ? '.flip-card' : '.flip' : '.dsl-card').all();
  79  |     for (const [n, card] of cards.entries()) {
  80  |       if (original && (await card.getAttribute('aria-pressed') === 'true' || /(?:^| )flipped(?: |$)/.test(await card.getAttribute('class')))) await activate(card);
  81  |       const front = card.locator(original ? '.flip-front' : '.dsl-card-front'), back = card.locator(original ? '.flip-back' : '.dsl-card-back');
  82  |       const faceProperties = ['fontFamily', 'fontSize', 'lineHeight', 'color', 'backgroundColor'];
  83  |       result[key + `card-${n}-front`] = await paint(front, faceProperties);
  84  |       if (id === 'middle') for (const side of ['front', 'back']) {
  85  |         if (side === 'back') await activate(card);
  86  |         await settle(page); const face = side === 'front' ? front : back;
  87  |         result[key + `card-${n}-${side}-title`] = await paint(face.locator(original ? 'h3,strong,.pill' : '.dsl-card-title,.dsl-prose-h3,strong'));
  88  |         // A Markdown paragraph containing only the title is already measured in
  89  |         // the title role above; it is not an additional body paragraph.
  90  |         if (index !== 5) result[key + `card-${n}-${side}-copy`] = await paint(face.locator(original ? ':scope>p,:scope>ul>li' : '.dsl-prose-p,[role="listitem"]'), index === 0 ? ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'color'] : keys, true);
  91  |       } else {await activate(card); await settle(page);}
  92  |       result[key + `card-${n}-back`] = await paint(back, [...faceProperties, 'fontWeight']);
  93  |       if (!original) {
  94  |         await expect(card.locator('.dsl-card-back')).toHaveAttribute('aria-hidden', 'false');
  95  |         expect(await card.evaluate(n => n.scrollWidth <= n.clientWidth + 1 && n.scrollHeight <= n.clientHeight + 2)).toBe(true);
  96  |         if (id === 'final') {
  97  |           await expect(front).toHaveCSS('font-weight', '400'); await expect(front).toHaveCSS('font-size', '16px');
  98  |           await expect(front).toHaveCSS('border-radius', '15px');
  99  |           const metrics = await front.evaluate(n => {const s = getComputedStyle(n); return {line: parseFloat(s.lineHeight), padding: [s.paddingTop, s.paddingRight, s.paddingBottom, s.paddingLeft].map(parseFloat)};});
  100 |           expect(metrics.line).toBeCloseTo(24.8, 4); metrics.padding.forEach((v, i) => expect(v).toBeCloseTo([65.6, 20, 65.6, 20][i], 4));
  101 |         }
  102 |         await activate(card); await settle(page); await expect(card.locator('.dsl-card-front > .dsl-card-explored')).toBeVisible();
  103 |         await expect(card.locator('.dsl-card-hint')).toBeVisible();
  104 |         expect(await card.getAttribute('aria-label')).not.toContain('Explored');
  105 |         const cues = await card.evaluate(card => {const front = card.querySelector('.dsl-card-front'), a = front.querySelector('.dsl-card-explored').getBoundingClientRect(), b = front.querySelector('.dsl-card-hint').getBoundingClientRect(), face = front.getBoundingClientRect(); return {inside: a.left >= face.left && a.right <= face.right + 1 && a.bottom <= face.bottom + 1, separate: a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top};});
  106 |         expect(cues).toEqual({inside: true, separate: true});
  107 |       }
  108 |     }
  109 | 
  110 |     const panels = await view.locator(original ? 'details' : 'details.dsl-expandable').all();
  111 |     for (const [n, panel] of panels.entries()) {
  112 |       if (await panel.evaluate(n => n.open)) await activate(panel.locator('summary'));
  113 |       result[key + `panel-${n}-closed`] = await paint(panel, ['backgroundColor', 'borderLeftWidth', 'borderRadius']);
  114 |       result[key + `panel-${n}-summary`] = await paint(panel.locator('summary'));
  115 |       await activate(panel.locator('summary')); await expect(panel).toHaveJSProperty('open', true);
  116 |       if (id === 'final') result[key + `panel-${n}-body`] = await paint(panel.locator(original ? '.inner' : '.dsl-expandable-body'), ['fontFamily', 'fontSize', 'lineHeight', 'color']);
  117 |       result[key + `panel-${n}-examples`] = await paint(panel.locator(original ? '.example,.caution' : 'blockquote'));
  118 |       if (!original) {await expect(panel.locator('.dsl-panel-explored')).toBeVisible(); if (await panel.locator('.dsl-rich-prose').count()) await expect(panel.locator('.dsl-rich-prose').first()).toHaveCSS('white-space', 'normal');}
  119 |     }
  120 | 
  121 |     if (id === 'final' && index === 3) {
  122 |       for (const [n, note] of activity(id, 'note-classification').data.notes.entries()) {
  123 |         const input = view.locator(original ? `#note-${n}` : `[data-note-id="${note.id}"]`);
  124 |         result[key + `note-${n}`] = await paint(input, ['fontFamily', 'fontSize', 'color', 'backgroundColor', 'borderLeftWidth', 'borderRadius']); result[key + `note-${n}-row`] = await paint(input.locator('..'), ['backgroundColor', 'borderLeftWidth', 'borderRadius']); result[key + `note-${n}-label`] = await paint(input.locator('..').locator('label'), ['fontSize', 'fontWeight', 'color']);
  125 |         // Reset note state in the supplied record; wrong then correct/disabled is observable.
  126 |         const categories = activity(id, 'note-classification').data.categories, good = categories.findIndex(c => c.id === note.correctCategoryId), wrong = good ? 0 : 1;
```