# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: presentation-contracts.spec.mjs >> /middle all authored presentation roles/states survive consolidation at desktop/breakpoint/mobile
- Location: tests/browser/presentation-contracts.spec.mjs:12:3

# Error details

```
Error: evidence/panel-0-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: evidence/panel-1-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: evidence/panel-2-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: evidence/panel-3-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: support-group/panel-0-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: support-group/panel-1-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: support-group/panel-2-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: support-group/panel-3-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: communication/panel-0-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: communication/panel-1-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: communication/panel-2-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: speaking-conflicts/card-0-back-copy

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -2,8 +2,8 @@
    Object {
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
-     "lineHeight": "26.4px",
+     "lineHeight": "24.8px",
    },
  ]
```

```
Error: speaking-conflicts/card-1-back-copy

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

@@ -2,8 +2,15 @@
    Object {
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
-     "lineHeight": "26.4px",
+     "lineHeight": "24.8px",
+   },
+   Object {
+     "color": "rgb(255, 255, 255)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "fontWeight": "400",
+     "lineHeight": "24.8px",
    },
  ]
```

```
Error: speaking-conflicts/panel-0-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: speaking-conflicts/panel-1-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: speaking-conflicts/panel-2-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: speaking-conflicts/panel-3-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: knowledge-check/quiz-jumps

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -62,11 +62,11 @@
      "letterSpacing": "normal",
      "lineHeight": "21.6px",
      "textTransform": "none",
    },
    Object {
-     "backgroundColor": "rgb(255, 255, 255)",
+     "backgroundColor": "rgb(228, 243, 242)",
      "borderLeftColor": "rgb(199, 217, 220)",
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(199, 217, 220)",
      "borderTopWidth": "1px",
```

```
Error: evidence/panel-0-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: evidence/panel-1-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: evidence/panel-2-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: evidence/panel-3-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: support-group/panel-0-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: support-group/panel-1-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: support-group/panel-2-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: support-group/panel-3-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: communication/panel-0-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: communication/panel-1-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: communication/panel-2-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: speaking-conflicts/card-0-back-copy

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -2,8 +2,8 @@
    Object {
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
-     "lineHeight": "26.4px",
+     "lineHeight": "24.8px",
    },
  ]
```

```
Error: speaking-conflicts/card-1-back-copy

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

@@ -2,8 +2,15 @@
    Object {
      "color": "rgb(255, 255, 255)",
      "fontFamily": "\"DM Sans\", sans-serif",
      "fontSize": "16px",
      "fontWeight": "400",
-     "lineHeight": "26.4px",
+     "lineHeight": "24.8px",
+   },
+   Object {
+     "color": "rgb(255, 255, 255)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "fontWeight": "400",
+     "lineHeight": "24.8px",
    },
  ]
```

```
Error: speaking-conflicts/panel-0-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: speaking-conflicts/panel-1-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: speaking-conflicts/panel-2-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: speaking-conflicts/panel-3-body

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   Object {
+     "color": "rgb(20, 43, 73)",
+     "fontFamily": "\"DM Sans\", sans-serif",
+     "fontSize": "16px",
+     "lineHeight": "26.4px",
+   },
+ ]
```

```
Error: knowledge-check/quiz-jumps

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -62,11 +62,11 @@
      "letterSpacing": "normal",
      "lineHeight": "21.6px",
      "textTransform": "none",
    },
    Object {
-     "backgroundColor": "rgb(255, 255, 255)",
+     "backgroundColor": "rgb(228, 243, 242)",
      "borderLeftColor": "rgb(199, 217, 220)",
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(199, 217, 220)",
      "borderTopWidth": "1px",
```

```
Error: expect(received).toBeCloseTo(expected, precision)

Expected: 36
Received: 37.6

Expected precision:    1
Expected difference: < 0.05
Received difference:   1.6000000000000014
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
        - option "Welcome" [selected]
        - option "01 · Structure to substance"
        - option "02 · Make contributions count"
        - option "03 · Support the group"
        - option "04 · Communicate professionally"
        - option "05 · Navigate the conversation"
        - option "06 · Put it together"
        - option "07 · Knowledge check"
        - option "↗ · Quick reference"
    - status [ref=e16]: Section complete. You can continue.
    - region "Making an Impact" [ref=e18]:
      - heading "Making an Impact" [active] [level=1] [ref=e19]
      - paragraph [ref=e23]: The middle stage is where your research, listening, and collaboration turn into solutions.
      - generic [ref=e24]:
        - paragraph [ref=e28]:
          - text: In the opening stage, your group figures out
          - strong [ref=e29]: WHAT
          - text: it needs to solve and
          - strong [ref=e30]: HOW
          - text: it will approach the task. In the middle stage, you put that plan into action. Contribute ideas that help the group make progress.
        - generic [ref=e33]:
          - paragraph [ref=e34]: OPENING
          - paragraph [ref=e35]: →
          - paragraph [ref=e36]: RESEARCH
          - paragraph [ref=e37]: →
          - paragraph [ref=e38]: MIDDLE
          - paragraph [ref=e39]: →
          - paragraph [ref=e40]: FINAL
      - paragraph [ref=e44]: Flip over each card to see what happens mid-round.
      - generic [ref=e47]:
        - button "Bring evidence — Flip card" [ref=e48] [cursor=pointer]:
          - generic [ref=e50]:
            - generic [ref=e53]: Bring evidence
            - generic [ref=e54]: ↻ Flip card
            - generic [ref=e55]: ✓ Explored
        - button "Build collaboration — Flip card" [ref=e56] [cursor=pointer]:
          - generic [ref=e58]:
            - generic [ref=e61]: Build collaboration
            - generic [ref=e62]: ↻ Flip card
            - generic [ref=e63]: ✓ Explored
        - button "Manage the floor — Flip card" [ref=e64] [cursor=pointer]:
          - generic [ref=e66]:
            - generic [ref=e69]: Manage the floor
            - generic [ref=e70]: ↻ Flip card
            - generic [ref=e71]: ✓ Explored
    - generic [ref=e72]:
      - button "← Back" [disabled] [ref=e73]
      - button "Next section →" [ref=e74] [cursor=pointer]
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
  17  |   for (const side of ['Top', 'Left']) if (parseFloat(s[`border${side}Width`])) result[`border${side}Color`] = s[`border${side}Color`];
  18  |   return result;
  19  | }), {properties, omitTitleOnly});
  20  | const activate = async locator => {await locator.focus(); await locator.press('Enter');};
  21  | const own = (page, name) => page.locator(`[data-activity-id="${name}"]`);
  22  | 
  23  | export async function observe(page, id, original, width) {
  24  |   const result = {}, sections = manifest(id).sections;
  25  |   const capture = async (key, source, current, properties) => {result[key] = await paint(original ? source : current, properties);};
  26  |   for (const [index, section] of sections.entries()) {
  27  |     if (original) {
  28  |       if (await page.locator('#section-select').isVisible()) await page.locator('#section-select').selectOption(String(index));
  29  |       else await page.locator(`[data-go="${index}"]`).click();
  30  |     } else await publicVisit(page, section.id);
  31  |     const view = page.locator(`#view-${index}`), key = `${section.id}/`;
  32  |     await settle(page);
  33  |     await capture(key + 'heading-brand', view.locator('h1,h2').first(), view.locator('h1,h2').first(), ['fontFamily', 'color']);
  34  |     if (!original && !section.reference) {
  35  |       const heading = await view.locator('h1,h2').first().evaluate(n => {const s = getComputedStyle(n); return {size: parseFloat(s.fontSize), weight: s.fontWeight, family: s.fontFamily, line: parseFloat(s.lineHeight), spacing: parseFloat(s.letterSpacing)};});
  36  |       const welcome = id !== 'opening' && index === 0;
> 37  |       expect(heading.size).toBeCloseTo(welcome ? Math.max(36, Math.min(width * .05, 57.6)) : Math.max(29.6, Math.min(width * .034, 41.6)), 1);
      |                            ^ Error: expect(received).toBeCloseTo(expected, precision)
  38  |       expect(heading.weight).toBe('700'); expect(heading.family).toContain('Fraunces'); expect(heading.line / heading.size).toBeCloseTo(1.17, 3); expect(heading.spacing / heading.size).toBeCloseTo(-.035, 3);
  39  |     }
  40  |     if (section.reference) continue; // independent semantic print/reference suites own reference layouts.
  41  | 
  42  |     // Authored prose roles matched by exact normalized text; not generated controls.
  43  |     if (original) result[key + 'prose'] = await view.locator('p').evaluateAll(nodes => Object.fromEntries(nodes.map(n => {const s = getComputedStyle(n); return [n.textContent.replace(/\s+/g, ' ').trim(), [s.fontFamily, s.fontSize, s.fontWeight, s.lineHeight, s.color]];})));
  44  |     else result[key + 'prose'] = await view.locator('.dsl-prose-lead p,.dsl-prose-note p,.dsl-prose-instruction p,.dsl-prose-label p').evaluateAll(nodes => Object.fromEntries(nodes.map(n => {const s = getComputedStyle(n); return [n.textContent.replace(/\s+/g, ' ').trim(), [s.fontFamily, s.fontSize, s.fontWeight, s.lineHeight, s.color]];})));
  45  | 
  46  |     if (id === 'final') {
  47  |       await capture(key + 'surfaces', view.locator('.card:not(.activity)'), view.locator('.dsl-tone-callout'));
  48  |       await capture(key + 'speakers', view.locator('.speaker'), view.locator('.dsl-layout-roundtable .dsl-content-block > div > p'));
  49  |       await capture(key + 'cautions', view.locator('.notice').filter({hasNot: view.locator('.choice')}), view.locator('.dsl-tone-caution'), ['backgroundColor', 'borderLeftWidth', 'borderRadius']);
  50  |     }
  51  |     if (id === 'opening') await capture(key + 'surfaces', view.locator('.card'), view.locator('.dsl-tone-activity,.dsl-tone-soft,.dsl-sequence-opening-knowledge-check .dsl-question,.dsl-quiz-summary,.card'));
  52  |     if (id === 'middle' && index === 0) {
  53  |       await capture(key + 'callout', view.locator(':scope>.panel'), view.locator(':scope>.dsl-tone-callout'));
  54  |       await capture(key + 'flow', view.locator('.flow span'), view.locator('.dsl-layout-flow .dsl-content-block > div > p'));
  55  |     }
  56  | 
  57  |     const cards = await view.locator(original ? id === 'middle' ? '.flip-card' : '.flip' : '.dsl-card').all();
  58  |     for (const [n, card] of cards.entries()) {
  59  |       if (original && (await card.getAttribute('aria-pressed') === 'true' || /(?:^| )flipped(?: |$)/.test(await card.getAttribute('class')))) await activate(card);
  60  |       const front = card.locator(original ? '.flip-front' : '.dsl-card-front'), back = card.locator(original ? '.flip-back' : '.dsl-card-back');
  61  |       const faceProperties = ['fontFamily', 'fontSize', 'lineHeight', 'color', 'backgroundColor'];
  62  |       result[key + `card-${n}-front`] = await paint(front, faceProperties);
  63  |       if (id === 'middle') for (const side of ['front', 'back']) {
  64  |         if (side === 'back') await activate(card);
  65  |         await settle(page); const face = side === 'front' ? front : back;
  66  |         result[key + `card-${n}-${side}-title`] = await paint(face.locator(original ? 'h3,strong,.pill' : '.dsl-card-title,.dsl-prose-h3,strong'));
  67  |         // A Markdown paragraph containing only the title is already measured in
  68  |         // the title role above; it is not an additional body paragraph.
  69  |         result[key + `card-${n}-${side}-copy`] = await paint(face.locator(original ? ':scope>p,:scope>ul>li' : '.dsl-prose-p,[role="listitem"]'), ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'color'], true);
  70  |       } else {await activate(card); await settle(page);}
  71  |       result[key + `card-${n}-back`] = await paint(back, [...faceProperties, 'fontWeight']);
  72  |       if (!original) {
  73  |         await expect(card.locator('.dsl-card-back')).toHaveAttribute('aria-hidden', 'false');
  74  |         expect(await card.evaluate(n => n.scrollWidth <= n.clientWidth + 1 && n.scrollHeight <= n.clientHeight + 2)).toBe(true);
  75  |         if (id === 'final') await expect(front).toHaveCSS('font-weight', '400');
  76  |         await activate(card); await settle(page); await expect(card.locator('.dsl-card-front > .dsl-card-explored')).toBeVisible();
  77  |         await expect(card.locator('.dsl-card-hint')).toBeVisible();
  78  |         expect(await card.getAttribute('aria-label')).not.toContain('Explored');
  79  |         const cues = await card.evaluate(card => {const front = card.querySelector('.dsl-card-front'), a = front.querySelector('.dsl-card-explored').getBoundingClientRect(), b = front.querySelector('.dsl-card-hint').getBoundingClientRect(), face = front.getBoundingClientRect(); return {inside: a.left >= face.left && a.right <= face.right + 1 && a.bottom <= face.bottom + 1, separate: a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top};});
  80  |         expect(cues).toEqual({inside: true, separate: true});
  81  |       }
  82  |     }
  83  | 
  84  |     const panels = await view.locator(original ? 'details' : 'details.dsl-expandable').all();
  85  |     for (const [n, panel] of panels.entries()) {
  86  |       if (await panel.evaluate(n => n.open)) await activate(panel.locator('summary'));
  87  |       result[key + `panel-${n}-closed`] = await paint(panel, ['backgroundColor', 'borderLeftWidth', 'borderRadius']);
  88  |       result[key + `panel-${n}-summary`] = await paint(panel.locator('summary'));
  89  |       await activate(panel.locator('summary')); await expect(panel).toHaveJSProperty('open', true);
  90  |       result[key + `panel-${n}-body`] = await paint(panel.locator(original ? '.inner' : '.dsl-expandable-body'), ['fontFamily', 'fontSize', 'lineHeight', 'color']);
  91  |       result[key + `panel-${n}-examples`] = await paint(panel.locator(original ? '.example,.caution' : 'blockquote'));
  92  |       if (!original) {await expect(panel.locator('.dsl-panel-explored')).toBeVisible(); if (await panel.locator('.dsl-rich-prose').count()) await expect(panel.locator('.dsl-rich-prose').first()).toHaveCSS('white-space', 'normal');}
  93  |     }
  94  | 
  95  |     if (id === 'final' && index === 3) {
  96  |       for (const [n, note] of activity(id, 'note-classification').data.notes.entries()) {
  97  |         const input = view.locator(original ? `#note-${n}` : `[data-note-id="${note.id}"]`);
  98  |         result[key + `note-${n}`] = await paint(input); result[key + `note-${n}-row`] = await paint(input.locator('..')); result[key + `note-${n}-label`] = await paint(input.locator('..').locator('label'));
  99  |         // Reset note state in the supplied record; wrong then correct/disabled is observable.
  100 |         const categories = activity(id, 'note-classification').data.categories, good = categories.findIndex(c => c.id === note.correctCategoryId), wrong = good ? 0 : 1;
  101 |         await input.selectOption(original ? String(wrong) : categories[wrong].id); await expect(input).toBeEnabled();
  102 |         result[key + `note-${n}-wrong`] = await paint(input);
  103 |         await input.selectOption(original ? String(good) : note.correctCategoryId); await expect(input).toBeDisabled(); result[key + `note-${n}-right`] = await paint(input);
  104 |       }
  105 |     }
  106 | 
  107 |     const writing = id === 'middle' ? {2: ['evidence-writing', ['source', 'finding', 'why'], '#research-model'], 6: ['integrated-writing', ['application-draft'], '#application-model']}[index]
  108 |       : id === 'final' ? {2: ['synthesis-writing', ['build-1', 'build-2', 'build-3'], '#builder-model'], 7: ['closing-writing', ['closing-text'], '#closing-model']}[index] : null;
  109 |     if (writing) {
  110 |       const [name, fields, oldModel] = writing, data = activity(id, name).data, host = original ? view : own(page, name);
  111 |       for (const [n, field] of fields.entries()) result[key + `writing-${n}`] = await paint(original ? view.locator(`#${field}`) : host.locator(`[data-field-id="${data.fields[n].id}"]`));
  112 |       result[key + 'model'] = await paint(original ? view.locator(oldModel) : host.locator('.dsl-writing-model'));
  113 |       if (id === 'middle') {
  114 |         const oldButtons = index === 2 ? ['#assemble-button', '#assembly-copy-button', '#research-model-button'] : ['#application-model-button'];
  115 |         const newButtons = index === 2 ? ['.dsl-assemble', '.dsl-copy', '.dsl-model-toggle'] : ['.dsl-model-toggle'];
  116 |         for (let n = 0; n < oldButtons.length; n++) result[key + `writing-button-${n}`] = await paint(original ? view.locator(oldButtons[n]) : host.locator(newButtons[n]));
  117 |         result[key + 'writing-check'] = await paint(original ? view.locator(index === 2 ? '#research-checks input' : '#application-checks input') : own(page, index === 2 ? 'research-checklist' : 'application-checklist').locator('input'), ['width', 'height', 'accentColor']);
  118 |       }
  119 |     }
  120 | 
  121 |     if (id === 'middle') await middleQuestions(page, index, original, key, result);
  122 |     if (id === 'final' && index > 0 && index < 9) await finalQuestions(page, index, original, key, result);
  123 |     if (id === 'opening') await openingStates(page, index, original, key, result);
  124 |     if (!original) expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${id}/${section.id}/${width}`).toBe(true);
  125 |   }
  126 |   return result;
  127 | }
  128 | 
  129 | async function finalQuestions(page, index, original, key, result) {
  130 |   const id = index === 8 ? 'knowledge-check' : `${manifest('final').sections[index].id}-questions`, data = activity('final', id).data;
  131 |   const host = original ? page.locator(`#quiz-${index}`) : own(page, id), panel = original ? host : host.locator('xpath=../../..');
  132 |   result[key + 'question-panel'] = await paint(panel, ['backgroundColor', 'borderLeftWidth', 'borderRadius']);
  133 |   result[key + 'question-title'] = await paint(host.locator(original ? 'h3' : '.dsl-sequence-heading'), ['fontFamily', 'fontSize', 'color']);
  134 |   for (const [n, q] of data.questions.entries()) {
  135 |     result[key + `prompt-${n}`] = await paint(host.locator(original ? 'p.font-bold' : '.dsl-question-prompt'));
  136 |     if (q.context) result[key + `context-${n}`] = await paint(host.locator(original ? '.notice' : '.dsl-question-context'), ['backgroundColor', 'borderLeftWidth', 'borderRadius']);
  137 |     const correct = q.options.findIndex(o => o.id === q.correctOptionId), wrong = correct ? 0 : 1;
```