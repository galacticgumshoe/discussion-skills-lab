# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: presentation-contracts.spec.mjs >> /opening all authored presentation roles/states survive consolidation at desktop/breakpoint/mobile
- Location: tests/browser/presentation-contracts.spec.mjs:12:3

# Error details

```
Error: Tailwind utility stylesheet is ready

Tailwind utility stylesheet is ready

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
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
        - generic [ref=e9]: Starting Strong · The Opening Stage
      - generic [ref=e10]: SELF-PACED · 15–20 MINUTES
  - generic [ref=e11]:
    - navigation "Lesson sections" [ref=e12]:
      - button "Collapse navigation" [expanded] [ref=e13] [cursor=pointer]: ⇤
      - generic [ref=e14]:
        - generic [ref=e15]: YOUR PROGRESS
        - generic [ref=e16]: 7 of 7 pages completed
        - progressbar "Completed lesson pages" [ref=e17]
        - paragraph [ref=e19]: Finish each activity to unlock the next page. Quick reference is always available.
      - generic [ref=e20]:
        - button "01 · Contributions" [ref=e21] [cursor=pointer]:
          - text: 01 · Contributions
          - generic [ref=e22]: ✓
        - button "02 · Opening sequence" [ref=e23] [cursor=pointer]:
          - text: 02 · Opening sequence
          - generic [ref=e24]: ✓
        - button "03 · Analyze the task" [ref=e25] [cursor=pointer]:
          - text: 03 · Analyze the task
          - generic [ref=e26]: ✓
        - button "04 · Clarifications" [ref=e27] [cursor=pointer]:
          - text: 04 · Clarifications
          - generic [ref=e28]: ✓
        - button "05 · Give direction" [ref=e29] [cursor=pointer]:
          - text: 05 · Give direction
          - generic [ref=e30]: ✓
        - button "06 · Research & transition" [ref=e31] [cursor=pointer]:
          - text: 06 · Research & transition
          - generic [ref=e32]: ✓
        - button "✓ · Knowledge check" [ref=e33] [cursor=pointer]:
          - text: ✓ · Knowledge check
          - generic [ref=e34]: ✓
        - button "↗ · Quick reference" [ref=e35] [cursor=pointer]
    - main [ref=e36]:
      - status [ref=e37]: Section complete. You can continue.
      - generic [ref=e38]:
        - region "How a Discussion Round Works" [ref=e39]:
          - paragraph [ref=e40]: SECTION 01 / 06
          - heading "How a Discussion Round Works" [active] [level=2] [ref=e41]
          - paragraph [ref=e44]: Every 60-minute Discussion round includes two kinds of contributions. Strong participants know when the group needs structure—and when it needs ideas and evidence.
          - generic [ref=e45]:
            - generic [ref=e46]:
              - paragraph [ref=e49]: 01 · STRUCTURE
              - heading "Procedural" [level=3] [ref=e52]
              - paragraph [ref=e55]: Provides structure, organization, and focus. It helps the group work effectively without directly developing solutions.
              - list [ref=e58]:
                - listitem [ref=e59]: Clarify the task
                - listitem [ref=e60]: Set an agenda
                - listitem [ref=e61]: Manage time and focus
                - listitem [ref=e62]: Organize the discussion
            - generic [ref=e63]:
              - paragraph [ref=e66]: 02 · CONTENT
              - heading "Substantive" [level=3] [ref=e69]
              - paragraph [ref=e72]: Develops ideas, introduces evidence, evaluates possibilities, and moves the group toward solving the task.
              - list [ref=e75]:
                - listitem [ref=e76]: Share research and evidence
                - listitem [ref=e77]: Explain causes or effects
                - listitem [ref=e78]: Evaluate solutions
                - listitem [ref=e79]: Synthesize viewpoints
          - generic "Classify the Contribution" [ref=e80]:
            - heading "Classify the Contribution" [level=3] [ref=e83]
            - paragraph [ref=e86]: Read one statement at a time. Choose the contribution type to see why it fits.
            - generic [ref=e89]:
              - paragraph [ref=e90]: STATEMENT 1 OF 5
              - article [ref=e92]:
                - heading "“Could we agree on what the task is asking us to accomplish?”" [level=3] [ref=e93]
                - group "“Could we agree on what the task is asking us to accomplish?”" [ref=e94]:
                  - button "Procedural" [pressed] [ref=e95] [cursor=pointer]
                  - button "Substantive" [ref=e96] [cursor=pointer]
                - status [ref=e97]: Correct. This clarifies the task so the group shares a starting point.
                - paragraph
              - button "Next statement →" [ref=e99] [cursor=pointer]
              - generic "Question navigation"
              - status
        - text: ＋ ＋ ＋ ＋ ＋ ＋
      - generic [ref=e100]:
        - button "← Previous" [disabled] [ref=e101]
        - button "Next section →" [ref=e102] [cursor=pointer]
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
  10  |   if (id === 'final') {raw.data.finalState.quizIndex = Object.fromEntries([...Array(9).keys()].map(i => [i, 0])); raw.data.finalState.selections = {}; raw.data.finalState.panelsOpen = {};}
  11  |   if (id === 'middle') {raw.data.middleState.positions = {classify: 0, group: 0, communication: 0, speaking: 0}; raw.data.middleState.quizIndex = 0; raw.data.middleState.selections = {};}
  12  |   return JSON.stringify(raw);
  13  | }
  14  | const keys = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'color', 'backgroundColor', 'borderTopWidth', 'borderLeftWidth', 'borderRadius', 'boxShadow', 'letterSpacing', 'textTransform'];
  15  | export const paint = (locator, properties = keys, omitTitleOnly = false) => locator.evaluateAll((nodes, {properties, omitTitleOnly}) => nodes.filter(n => !omitTitleOnly || !(n.children.length === 1 && n.firstElementChild.matches('strong,h3,.dsl-prose-h3') && n.textContent.trim() === n.firstElementChild.textContent.trim())).map(n => {
  16  |   const s = getComputedStyle(n), result = Object.fromEntries(properties.map(key => [key, s[key]]));
  17  |   for (const side of ['Top', 'Left']) if (properties.includes(`border${side}Width`) && parseFloat(s[`border${side}Width`])) result[`border${side}Color`] = s[`border${side}Color`];
  18  |   return result;
  19  | }), {properties, omitTitleOnly});
  20  | const activate = async locator => {await locator.focus(); await locator.press('Enter');};
  21  | const own = (page, name) => page.locator(`[data-activity-id="${name}"]`);
  22  | export async function presentationReady(page) {
  23  |   // The CDN script can finish navigation before its generated stylesheet exists.
  24  |   // Fail explicitly on an unavailable dependency, never compare an unstyled oracle.
> 25  |   await expect.poll(() => page.evaluate(() => [...document.styleSheets].filter(sheet => !sheet.href).some(sheet => [...sheet.cssRules].some(rule => rule.cssText.includes('.font-bold')))), {message: 'Tailwind utility stylesheet is ready', timeout: 30_000}).toBe(true);
      |                                                                                                                                                                                                                                                                 ^ Error: Tailwind utility stylesheet is ready
  26  |   await settle(page);
  27  | }
  28  | 
  29  | export async function observe(page, id, original, width) {
  30  |   const result = {}, sections = manifest(id).sections;
  31  |   const capture = async (key, source, current, properties) => {result[key] = await paint(original ? source : current, properties);};
  32  |   for (const [index, section] of sections.entries()) {
  33  |     if (original) {
  34  |       if (await page.locator('#section-select').isVisible()) await page.locator('#section-select').selectOption(String(index));
  35  |       else await page.locator(`[data-go="${index}"]`).click();
  36  |     } else await publicVisit(page, section.id);
  37  |     const view = page.locator(`#view-${index}`), key = `${section.id}/`;
  38  |     await settle(page);
  39  |     await capture(key + 'heading-brand', view.locator('h1,h2').first(), view.locator('h1,h2').first(), ['fontFamily', 'color']);
  40  |     if (!original && !section.reference) {
  41  |       const heading = await view.locator('h1,h2').first().evaluate(n => {const s = getComputedStyle(n); return {size: parseFloat(s.fontSize), weight: s.fontWeight, family: s.fontFamily, line: parseFloat(s.lineHeight), spacing: parseFloat(s.letterSpacing)};});
  42  |       const welcome = id !== 'opening' && index === 0;
  43  |       expect(heading.size).toBeCloseTo(welcome ? id === 'middle' && width <= 600 ? 37.6 : Math.max(36, Math.min(width * .05, 57.6)) : Math.max(29.6, Math.min(width * .034, 41.6)), 1);
  44  |       expect(heading.weight).toBe('700'); expect(heading.family).toContain('Fraunces'); expect(heading.line / heading.size).toBeCloseTo(1.17, 3); expect(heading.spacing / heading.size).toBeCloseTo(-.035, 3);
  45  |     }
  46  |     if (section.reference) continue; // independent semantic print/reference suites own reference layouts.
  47  | 
  48  |     // The old all-paragraph contract belongs to Middle, not Opening/Final.
  49  |     // Other lessons retain their explicitly measured roles below; introducing an
  50  |     // exact container-inheritance requirement would not be an assertion port.
  51  |     if (id === 'middle') {
  52  |       if (original) result[key + 'prose'] = await view.locator('p').evaluateAll(nodes => Object.fromEntries(nodes.map(n => {const s = getComputedStyle(n); return [n.textContent.replace(/\s+/g, ' ').trim(), [s.fontFamily, s.fontSize, s.fontWeight, s.lineHeight, s.color]];})));
  53  |       else result[key + 'prose'] = await view.locator('.dsl-prose-lead p,.dsl-prose-note p,.dsl-prose-instruction p,.dsl-prose-label p').evaluateAll(nodes => Object.fromEntries(nodes.map(n => {const s = getComputedStyle(n); return [n.textContent.replace(/\s+/g, ' ').trim(), [s.fontFamily, s.fontSize, s.fontWeight, s.lineHeight, s.color]];})));
  54  |     }
  55  | 
  56  |     if (id === 'final') {
  57  |       await capture(key + 'eyebrow', view.locator(':scope>p').first(), view.locator(':scope>p').first(), ['fontFamily', 'fontSize', 'fontWeight', 'color']);
  58  |       await capture(key + 'lead', view.locator(':scope>p.muted').first(), view.locator('.dsl-prose-lead').first(), ['fontSize', 'color']);
  59  |       const surface = ['backgroundColor', 'borderLeftWidth', 'borderRadius'];
  60  |       await capture(key + 'surfaces', view.locator('.card:not(.activity)'), view.locator('.dsl-tone-callout'), surface);
  61  |       await capture(key + 'speakers', view.locator('.speaker'), view.locator('.dsl-layout-roundtable .dsl-content-block > div > p'), surface);
  62  |       // The original quiz also generates notices, which are measured as question
  63  |       // contexts below. Only authored caution blocks belong in this role.
  64  |       await capture(key + 'cautions', view.locator('.notice').filter({hasNot: view.locator('.choice')}).filter({hasNot: page.locator('xpath=ancestor::*[starts-with(@id,"quiz-")]')}), view.locator('.dsl-tone-caution'), surface);
  65  |     }
  66  |     if (id === 'opening') await capture(key + 'surfaces', view.locator('.card'), view.locator('.dsl-tone-activity,.dsl-tone-soft,.dsl-sequence-opening-knowledge-check .dsl-question,.dsl-quiz-summary,.card'));
  67  |     if (id === 'middle' && index === 0) {
  68  |       await capture(key + 'callout', view.locator(':scope>.panel'), view.locator(':scope>.dsl-tone-callout'));
  69  |       await capture(key + 'flow', view.locator('.flow span'), view.locator('.dsl-layout-flow .dsl-content-block > div > p'));
  70  |     }
  71  | 
  72  |     const cards = await view.locator(original ? id === 'middle' ? '.flip-card' : '.flip' : '.dsl-card').all();
  73  |     for (const [n, card] of cards.entries()) {
  74  |       if (original && (await card.getAttribute('aria-pressed') === 'true' || /(?:^| )flipped(?: |$)/.test(await card.getAttribute('class')))) await activate(card);
  75  |       const front = card.locator(original ? '.flip-front' : '.dsl-card-front'), back = card.locator(original ? '.flip-back' : '.dsl-card-back');
  76  |       const faceProperties = ['fontFamily', 'fontSize', 'lineHeight', 'color', 'backgroundColor'];
  77  |       result[key + `card-${n}-front`] = await paint(front, faceProperties);
  78  |       if (id === 'middle') for (const side of ['front', 'back']) {
  79  |         if (side === 'back') await activate(card);
  80  |         await settle(page); const face = side === 'front' ? front : back;
  81  |         result[key + `card-${n}-${side}-title`] = await paint(face.locator(original ? 'h3,strong,.pill' : '.dsl-card-title,.dsl-prose-h3,strong'));
  82  |         // A Markdown paragraph containing only the title is already measured in
  83  |         // the title role above; it is not an additional body paragraph.
  84  |         if (index !== 5) result[key + `card-${n}-${side}-copy`] = await paint(face.locator(original ? ':scope>p,:scope>ul>li' : '.dsl-prose-p,[role="listitem"]'), ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'color'], true);
  85  |       } else {await activate(card); await settle(page);}
  86  |       result[key + `card-${n}-back`] = await paint(back, [...faceProperties, 'fontWeight']);
  87  |       if (!original) {
  88  |         await expect(card.locator('.dsl-card-back')).toHaveAttribute('aria-hidden', 'false');
  89  |         expect(await card.evaluate(n => n.scrollWidth <= n.clientWidth + 1 && n.scrollHeight <= n.clientHeight + 2)).toBe(true);
  90  |         if (id === 'final') await expect(front).toHaveCSS('font-weight', '400');
  91  |         await activate(card); await settle(page); await expect(card.locator('.dsl-card-front > .dsl-card-explored')).toBeVisible();
  92  |         await expect(card.locator('.dsl-card-hint')).toBeVisible();
  93  |         expect(await card.getAttribute('aria-label')).not.toContain('Explored');
  94  |         const cues = await card.evaluate(card => {const front = card.querySelector('.dsl-card-front'), a = front.querySelector('.dsl-card-explored').getBoundingClientRect(), b = front.querySelector('.dsl-card-hint').getBoundingClientRect(), face = front.getBoundingClientRect(); return {inside: a.left >= face.left && a.right <= face.right + 1 && a.bottom <= face.bottom + 1, separate: a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top};});
  95  |         expect(cues).toEqual({inside: true, separate: true});
  96  |       }
  97  |     }
  98  | 
  99  |     const panels = await view.locator(original ? 'details' : 'details.dsl-expandable').all();
  100 |     for (const [n, panel] of panels.entries()) {
  101 |       if (await panel.evaluate(n => n.open)) await activate(panel.locator('summary'));
  102 |       result[key + `panel-${n}-closed`] = await paint(panel, ['backgroundColor', 'borderLeftWidth', 'borderRadius']);
  103 |       result[key + `panel-${n}-summary`] = await paint(panel.locator('summary'));
  104 |       await activate(panel.locator('summary')); await expect(panel).toHaveJSProperty('open', true);
  105 |       if (id === 'final') result[key + `panel-${n}-body`] = await paint(panel.locator(original ? '.inner' : '.dsl-expandable-body'), ['fontFamily', 'fontSize', 'lineHeight', 'color']);
  106 |       result[key + `panel-${n}-examples`] = await paint(panel.locator(original ? '.example,.caution' : 'blockquote'));
  107 |       if (!original) {await expect(panel.locator('.dsl-panel-explored')).toBeVisible(); if (await panel.locator('.dsl-rich-prose').count()) await expect(panel.locator('.dsl-rich-prose').first()).toHaveCSS('white-space', 'normal');}
  108 |     }
  109 | 
  110 |     if (id === 'final' && index === 3) {
  111 |       for (const [n, note] of activity(id, 'note-classification').data.notes.entries()) {
  112 |         const input = view.locator(original ? `#note-${n}` : `[data-note-id="${note.id}"]`);
  113 |         result[key + `note-${n}`] = await paint(input, ['fontFamily', 'fontSize', 'color', 'backgroundColor', 'borderLeftWidth', 'borderRadius']); result[key + `note-${n}-row`] = await paint(input.locator('..'), ['backgroundColor', 'borderLeftWidth', 'borderRadius']); result[key + `note-${n}-label`] = await paint(input.locator('..').locator('label'), ['fontSize', 'fontWeight', 'color']);
  114 |         // Reset note state in the supplied record; wrong then correct/disabled is observable.
  115 |         const categories = activity(id, 'note-classification').data.categories, good = categories.findIndex(c => c.id === note.correctCategoryId), wrong = good ? 0 : 1;
  116 |         await input.selectOption(original ? String(wrong) : categories[wrong].id); await expect(input).toBeEnabled();
  117 |         result[key + `note-${n}-wrong-status`] = await input.locator('..').locator('[role=status]').textContent();
  118 |         await input.selectOption(original ? String(good) : note.correctCategoryId); await expect(input).toBeDisabled(); result[key + `note-${n}-right`] = await paint(input, ['color', 'backgroundColor']);
  119 |       }
  120 |     }
  121 | 
  122 |     const writing = id === 'middle' ? {2: ['evidence-writing', ['source', 'finding', 'why'], '#research-model'], 6: ['integrated-writing', ['application-draft'], '#application-model']}[index]
  123 |       : id === 'final' ? {2: ['synthesis-writing', ['build-1', 'build-2', 'build-3'], '#builder-model'], 7: ['closing-writing', ['closing-text'], '#closing-model']}[index] : null;
  124 |     if (writing) {
  125 |       const [name, fields, oldModel] = writing, data = activity(id, name).data, host = original ? view : own(page, name);
```