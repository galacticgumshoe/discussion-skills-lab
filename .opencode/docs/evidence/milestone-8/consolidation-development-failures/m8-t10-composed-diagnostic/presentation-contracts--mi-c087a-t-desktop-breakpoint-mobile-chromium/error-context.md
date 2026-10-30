# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: presentation-contracts.spec.mjs >> /middle all authored presentation roles/states survive consolidation at desktop/breakpoint/mobile
- Location: tests/browser/presentation-contracts.spec.mjs:12:3

# Error details

```
Error: knowledge-check/quiz-jumps

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -1,8 +1,8 @@
  Array [
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
Error: knowledge-check/quiz-jumps

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -1,8 +1,8 @@
  Array [
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
Error: knowledge-check/quiz-jumps

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -1,8 +1,8 @@
  Array [
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
Error: knowledge-check/quiz-jumps

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

@@ -1,8 +1,8 @@
  Array [
    Object {
-     "backgroundColor": "rgb(255, 255, 255)",
+     "backgroundColor": "rgb(228, 243, 242)",
      "borderLeftColor": "rgb(199, 217, 220)",
      "borderLeftWidth": "1px",
      "borderRadius": "10px",
      "borderTopColor": "rgb(199, 217, 220)",
      "borderTopWidth": "1px",
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
        - option "01 · Structure to substance"
        - option "02 · Make contributions count"
        - option "03 · Support the group"
        - option "04 · Communicate professionally"
        - option "05 · Navigate the conversation"
        - option "06 · Put it together"
        - option "07 · Knowledge check"
        - option "↗ · Quick reference" [selected]
    - status [ref=e16]: Quick reference is always available.
    - region "Middle Stage Quick Reference" [ref=e18]:
      - generic [ref=e19]:
        - generic [ref=e20]:
          - button "Print quick reference" [ref=e22] [cursor=pointer]
          - heading "Middle Stage Quick Reference" [active] [level=2] [ref=e23]
        - generic [ref=e24]:
          - generic [ref=e25]:
            - heading "01 Contribute substance" [level=3] [ref=e26]:
              - generic [ref=e27]: "01"
              - generic [ref=e28]: Contribute substance
            - list [ref=e29]:
              - listitem [ref=e30]: Share relevant research and insights frequently.
              - listitem [ref=e31]: Verbally cite publication and date; explain why evidence matters.
              - listitem [ref=e32]: Use anecdotes to illustrate, not replace, evidence.
              - listitem [ref=e33]: Avoid repetition and unrelated detours.
          - generic [ref=e34]:
            - heading "02 Support the group" [level=3] [ref=e35]:
              - generic [ref=e36]: "02"
              - generic [ref=e37]: Support the group
            - list [ref=e38]:
              - listitem [ref=e39]: Take notes on ideas, evidence, and their contributors; look up regularly.
              - listitem [ref=e40]: Help track the round and agreed agenda periods.
              - listitem [ref=e41]: Invite perspectives without repeatedly singling people out.
              - listitem [ref=e42]: Redirect respectfully toward the WHAT and HOW of the task.
          - generic [ref=e43]:
            - heading "03 Communicate professionally" [level=3] [ref=e44]:
              - generic [ref=e45]: "03"
              - generic [ref=e46]: Communicate professionally
            - list [ref=e47]:
              - listitem [ref=e48]: Listen actively; avoid visible frustration and distracting habits.
              - listitem [ref=e49]: Address fellow discussants, not the judge.
              - listitem [ref=e50]: Use concise language suited to your assigned role.
              - listitem [ref=e51]: Speak clearly and maintain volume through sentence endings.
          - generic [ref=e52]:
            - heading "04 Manage speaking conflicts" [level=3] [ref=e53]:
              - generic [ref=e54]: "04"
              - generic [ref=e55]: Manage speaking conflicts
            - list [ref=e56]:
              - listitem [ref=e57]: Continue assertively only with care; it risks dominance.
              - listitem [ref=e58]: Request first turn and honor your promise to yield.
              - listitem [ref=e59]: Yield and request the next turn when appropriate.
              - listitem [ref=e60]: Explain a timely, direct connection when requesting a turn.
              - listitem [ref=e61]: If interrupted, politely finish and give the promised speaker a turn.
          - generic [ref=e62]:
            - heading "05 Your goal" [level=3] [ref=e63]:
              - generic [ref=e64]: "05"
              - generic [ref=e65]: Your goal
            - list [ref=e66]:
              - listitem [ref=e67]:
                - strong [ref=e68]: Contribute evidence. Build on others. Keep the group moving toward a solution.
```

# Test source

```ts
  189 |       const host = original ? page.locator(`.activity:has(#application-${n ? 'b' : 'a'}-options)`) : own(page, 'application').locator(`[data-question-id="${q.id}"]`);
  190 |       result[key + `application-${n}/panel`] = await paint(host);
  191 |       await middleChoice(page, host, original, key + `application-${n}/`, result, q, original ? '.option' : '.dsl-choice');
  192 |     }
  193 |     return;
  194 |   }
  195 |   if (!specs[index]) return;
  196 |   const [name, prefix, oldPanel, newPanel] = specs[index], data = activity('middle', name).data, host = original ? page.locator(oldPanel) : own(page, name);
  197 |   result[key + 'activity-panel'] = await paint(original ? host : page.locator(newPanel));
  198 |   result[key + 'activity-title'] = await paint(original ? host.locator(':scope>h3').first() : index === 7 ? host.locator('.dsl-question-counter') : page.locator(newPanel).locator('h3').first());
  199 |   if (index === 2) result[key + 'research-caution'] = await paint(original ? host.locator(':scope>.caution') : page.locator(newPanel + '>.dsl-tone-caution'));
  200 |   for (const [n, q] of (data.questions || [data]).entries()) {
  201 |     await middleChoice(page, host, original, key + `question-${n}/`, result, q, original ? '.option' : '.dsl-choice', prefix);
  202 |     if (data.questions && n < data.questions.length - 1) await activate(original ? page.locator(`#${prefix}-next`) : host.locator('.dsl-question-next'));
  203 |   }
  204 |   if (index === 7) {
  205 |     result[key + 'overview'] = await paint(original ? page.locator('#view-7>.panel') : page.locator('.dsl-question-overview'));
  206 |     result[key + 'quiz-score'] = await paint(original ? page.locator('#quiz-score') : page.locator('.dsl-question-overview>.dsl-question-score'));
  207 |     // Match the same current question, not the incidental final navigation step.
  208 |     if (original) await activate(page.locator('#quiz-status button').first()); else await activate(page.locator('.dsl-question-jump').first());
  209 |     await page.mouse.move(0, 0);
  210 |     result[key + 'quiz-jumps'] = await paint(original ? page.locator('#quiz-status button') : page.locator('.dsl-question-jump'));
  211 |   }
  212 | }
  213 | async function middleChoice(page, host, original, key, result, question, choiceSelector, prefix) {
  214 |   const choices = host.locator(choiceSelector), good = question.options.findIndex(o => o.id === question.correctOptionId), wrong = good ? 0 : 1;
  215 |   result[key + 'prompt'] = await paint(original ? host.locator(prefix ? `#${prefix}-question,p.font-bold` : ':scope>h3').first() : host.locator('.dsl-question-prompt'));
  216 |   result[key + 'neutral'] = await paint(choices.nth(wrong));
  217 |   for (const [step, n] of [good, wrong, good].entries()) {
  218 |     await activate(choices.nth(n));
  219 |     result[key + `choice-${step}`] = await paint(choices.nth(n)); result[key + `feedback-${step}`] = await paint(host.locator(original ? '.feedback' : '.dsl-feedback'));
  220 |   }
  221 |   if (prefix && prefix !== 'research') {
  222 |     result[key + 'next'] = await paint(original ? page.locator(`#${prefix}-next`) : host.locator('.dsl-question-next'));
  223 |     if (prefix !== 'quiz') result[key + 'score'] = await paint(original ? page.locator(`#${prefix}-count`) : host.locator('.dsl-question-score'));
  224 |   }
  225 | }
  226 | async function openingStates(page, index, original, key, result) {
  227 |   const view = page.locator(`#view-${index}`);
  228 |   if (index === 0) {
  229 |     const choices = view.locator(original ? '.classify-answer' : '.dsl-choice'); await activate(choices.nth(1));
  230 |     if (!original) await expect(choices.nth(1)).toHaveClass(/dsl-selected-incorrect/);
  231 |     await activate(choices.first()); if (!original) await expect(choices.first()).toHaveClass(/dsl-selected-correct/);
  232 |     await view.locator('#classify-next').click(); await expect(view.locator('#classify-counter')).toHaveText('STATEMENT 2 OF 5');
  233 |   }
  234 |   if (index === 1) {
  235 |     result[key + 'timeline-closed'] = await paint(view.locator('.timeline-toggle'), openingPaint);
  236 |     for (let n = 1; n <= 6; n++) {const control = view.locator(`[aria-controls="stage-${n}"]`); await activate(control); await expect(control).toHaveAttribute('aria-expanded', 'true'); await expect(view.locator(`#stage-${n}`)).toBeVisible();}
  237 |     result[key + 'timeline-open'] = await paint(view.locator('.timeline-toggle'), openingPaint);
  238 |     for (const n of [0, 1, 2]) await view.locator('.sequence-choices button').nth(n).click();
  239 |     if (!original) {await expect(view.locator('.sequence-choices .dsl-selected-incorrect')).toHaveCount(1); await expect(view.locator('.dsl-panel-explored')).toHaveCount(6);}
  240 |   }
  241 |   if (index === 2) {
  242 |     result[key + 'tabs'] = await paint(view.locator('.analysis-tab'), openingPaint);
  243 |     for (const kind of ['who', 'what', 'how', 'where', 'terms']) {const tab = view.locator(`.analysis-tab[data-kind="${kind}"]`); await activate(tab); await expect(tab).toHaveAttribute('aria-selected', 'true'); await expect(tab).toHaveCSS('background-color', 'rgb(20, 43, 73)'); expect(await view.locator('.task-mark.on').evaluateAll(nodes => nodes.map(n => n.dataset.kind))).toEqual({who: ['who'], what: ['what'], how: ['how', 'how'], where: ['where', 'where'], terms: ['who', 'what']}[kind]);}
  244 |   }
  245 |   if ([2, 3, 5].includes(index)) {
  246 |     const choices = view.locator(`#${{2: 'what-how', 3: 'clarification', 5: 'research'}[index]}-options button`);
  247 |     for (const n of [0, index === 2 ? 0 : index === 3 ? 1 : 2, index === 2 ? 1 : 0]) await activate(choices.nth(n));
  248 |   }
  249 |   if (index === 4) {await view.locator('#show-model').click(); await expect(view.locator('#model-answer')).toBeVisible(); result[key + 'model'] = await paint(view.locator('#model-answer')); await view.locator('#show-model').click(); await expect(view.locator('#model-answer')).toBeHidden();}
  250 |   if (index === 6) {await view.locator('#quiz-list article').first().locator('button').first().click(); await expect(view.locator('#quiz-score')).toHaveText('Knowledge check: 5 of 5 correct.');}
  251 | }
  252 | 
  253 | async function checkComposition(page, id, index, width) {
  254 |   const view = page.locator(`#view-${index}`);
  255 |   if (id !== 'middle') return;
  256 |   if (index === 0) {
  257 |     const tops = await view.locator('.dsl-card').evaluateAll(nodes => nodes.map(n => n.getBoundingClientRect().top));
  258 |     expect(new Set(tops).size).toBe(width > 850 ? 1 : 3);
  259 |     for (const card of await view.locator('.dsl-card').all()) {
  260 |       expect(await card.evaluate(card => {const face = card.querySelector('.dsl-card-front').getBoundingClientRect(), title = card.querySelector('.dsl-card-front .dsl-prose-h3').getBoundingClientRect(); return Math.abs(title.top + title.height / 2 - face.top - face.height / 2);})).toBeLessThan(2);
  261 |       const gaps = await card.locator('.dsl-card-back [role="listitem"]').evaluateAll(nodes => nodes.slice(1).map((n, i) => n.getBoundingClientRect().top - nodes[i].getBoundingClientRect().bottom));
  262 |       expect(gaps.every(gap => Math.abs(gap) < 1)).toBe(true);
  263 |     }
  264 |   }
  265 |   for (const card of await view.locator('.dsl-card').all()) for (const side of ['front', 'back']) {
  266 |     const face = card.locator(`.dsl-card-${side}`);
  267 |     if (await face.locator(':scope>.dsl-card-content>.dsl-card-title').count()) expect(await face.evaluate(n => n.querySelector('.dsl-card-title').getBoundingClientRect().bottom - n.querySelector('.dsl-card-copy').getBoundingClientRect().top)).toBeLessThan(1 / 64);
  268 |   }
  269 |   if (index === 1) {
  270 |     const group = own(page, 'classification'), tops = await group.locator('.dsl-choice').evaluateAll(nodes => nodes.map(n => n.getBoundingClientRect().top));
  271 |     expect(tops[0] === tops[1]).toBe(width > 600); await expect(group.locator('.dsl-question-counter')).toBeHidden();
  272 |   }
  273 |   if (index === 2) {
  274 |     const writer = own(page, 'evidence-writing');
  275 |     expect(await writer.evaluate(n => {const output = n.querySelector('[data-field-id="evidence-output"]'); return [...n.querySelectorAll('.dsl-writing-actions button')].every(button => !!(button.compareDocumentPosition(output) & Node.DOCUMENT_POSITION_FOLLOWING));})).toBe(true);
  276 |     await expect(writer.locator('[data-field-id="evidence-output"]')).toHaveAttribute('readonly', '');
  277 |   }
  278 |   if (index === 3) await expect(own(page, 'collaboration-panels').locator('blockquote').first().locator('br')).toHaveCount(3);
  279 |   if (index === 4) {
  280 |     const lefts = await own(page, 'communication-panels').locator('blockquote').evaluateAll(nodes => nodes.map(n => n.getBoundingClientRect().left));
  281 |     expect(lefts[0] === lefts[1]).toBe(width <= 600);
  282 |   }
  283 |   if (index === 7) await expect(page.locator('.dsl-tone-activity,.dsl-question-panel,.dsl-sequence-middle-application .dsl-question')).toHaveCount(9);
  284 | }
  285 | 
  286 | export function compare(actual, expected) {
  287 |   for (const [key, value] of Object.entries(actual)) {
  288 |     if (key.endsWith('/prose')) {for (const [text, style] of Object.entries(value)) expect.soft(style, `${key}${text}`).toEqual(expected[key][text]);}
> 289 |     else expect.soft(value, key).toEqual(expected[key]);
      |                                  ^ Error: knowledge-check/quiz-jumps
  290 |   }
  291 |   // Current side must not silently omit a source role or an entire activity.
  292 |   expect.soft(Object.keys(actual).sort()).toEqual(Object.keys(expected).sort());
  293 | }
  294 | 
```