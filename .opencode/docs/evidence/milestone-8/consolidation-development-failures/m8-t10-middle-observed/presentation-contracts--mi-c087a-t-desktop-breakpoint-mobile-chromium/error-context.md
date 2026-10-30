# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: presentation-contracts.spec.mjs >> /middle all authored presentation roles/states survive consolidation at desktop/breakpoint/mobile
- Location: tests/browser/presentation-contracts.spec.mjs:12:3

# Error details

```
Error: structure-substance/card-0-back-title

expect(received).toEqual(expected) // deep equality

- Expected  - 16
+ Received  +  1

- Array [
-   Object {
-     "backgroundColor": "rgba(0, 0, 0, 0)",
-     "borderLeftWidth": "0px",
-     "borderRadius": "0px",
-     "borderTopWidth": "0px",
-     "boxShadow": "none",
-     "color": "rgb(255, 255, 255)",
-     "fontFamily": "\"DM Sans\", sans-serif",
-     "fontSize": "16px",
-     "fontWeight": "700",
-     "letterSpacing": "normal",
-     "lineHeight": "24.8px",
-     "textTransform": "none",
-   },
- ]
+ Array []
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
  - generic [ref=e11]:
    - navigation "Lesson sections" [ref=e12]:
      - button "Collapse navigation" [expanded] [ref=e13] [cursor=pointer]: ⇤
      - generic [ref=e14]:
        - generic [ref=e15]: YOUR PROGRESS
        - generic [ref=e16]: 8 of 8 pages completed
        - progressbar "Completed lesson pages" [ref=e17]
        - paragraph [ref=e19]: Finish each activity to unlock the next page. Quick reference is always available.
      - generic [ref=e20]:
        - button "Welcome" [ref=e21] [cursor=pointer]:
          - text: Welcome
          - generic [ref=e22]: ✓
        - button "01 · Structure to substance" [ref=e23] [cursor=pointer]:
          - text: 01 · Structure to substance
          - generic [ref=e24]: ✓
        - button "02 · Make contributions count" [ref=e25] [cursor=pointer]:
          - text: 02 · Make contributions count
          - generic [ref=e26]: ✓
        - button "03 · Support the group" [ref=e27] [cursor=pointer]:
          - text: 03 · Support the group
          - generic [ref=e28]: ✓
        - button "04 · Communicate professionally" [ref=e29] [cursor=pointer]:
          - text: 04 · Communicate professionally
          - generic [ref=e30]: ✓
        - button "05 · Navigate the conversation" [ref=e31] [cursor=pointer]:
          - text: 05 · Navigate the conversation
          - generic [ref=e32]: ✓
        - button "06 · Put it together" [ref=e33] [cursor=pointer]:
          - text: 06 · Put it together
          - generic [ref=e34]: ✓
        - button "07 · Knowledge check" [ref=e35] [cursor=pointer]:
          - text: 07 · Knowledge check
          - generic [ref=e36]: ✓
        - button "↗ · Quick reference" [ref=e37] [cursor=pointer]
    - main [ref=e38]:
      - status [ref=e39]: Quick reference is always available.
      - region "Middle Stage Quick Reference" [ref=e41]:
        - generic [ref=e42]:
          - generic [ref=e43]:
            - button "Print quick reference" [ref=e45] [cursor=pointer]
            - heading "Middle Stage Quick Reference" [active] [level=2] [ref=e46]
          - generic [ref=e47]:
            - generic [ref=e48]:
              - heading "01 Contribute substance" [level=3] [ref=e49]:
                - generic [ref=e50]: "01"
                - generic [ref=e51]: Contribute substance
              - list [ref=e52]:
                - listitem [ref=e53]: Share relevant research and insights frequently.
                - listitem [ref=e54]: Verbally cite publication and date; explain why evidence matters.
                - listitem [ref=e55]: Use anecdotes to illustrate, not replace, evidence.
                - listitem [ref=e56]: Avoid repetition and unrelated detours.
            - generic [ref=e57]:
              - heading "02 Support the group" [level=3] [ref=e58]:
                - generic [ref=e59]: "02"
                - generic [ref=e60]: Support the group
              - list [ref=e61]:
                - listitem [ref=e62]: Take notes on ideas, evidence, and their contributors; look up regularly.
                - listitem [ref=e63]: Help track the round and agreed agenda periods.
                - listitem [ref=e64]: Invite perspectives without repeatedly singling people out.
                - listitem [ref=e65]: Redirect respectfully toward the WHAT and HOW of the task.
            - generic [ref=e66]:
              - heading "03 Communicate professionally" [level=3] [ref=e67]:
                - generic [ref=e68]: "03"
                - generic [ref=e69]: Communicate professionally
              - list [ref=e70]:
                - listitem [ref=e71]: Listen actively; avoid visible frustration and distracting habits.
                - listitem [ref=e72]: Address fellow discussants, not the judge.
                - listitem [ref=e73]: Use concise language suited to your assigned role.
                - listitem [ref=e74]: Speak clearly and maintain volume through sentence endings.
            - generic [ref=e75]:
              - heading "04 Manage speaking conflicts" [level=3] [ref=e76]:
                - generic [ref=e77]: "04"
                - generic [ref=e78]: Manage speaking conflicts
              - list [ref=e79]:
                - listitem [ref=e80]: Continue assertively only with care; it risks dominance.
                - listitem [ref=e81]: Request first turn and honor your promise to yield.
                - listitem [ref=e82]: Yield and request the next turn when appropriate.
                - listitem [ref=e83]: Explain a timely, direct connection when requesting a turn.
                - listitem [ref=e84]: If interrupted, politely finish and give the promised speaker a turn.
            - generic [ref=e85]:
              - heading "05 Your goal" [level=3] [ref=e86]:
                - generic [ref=e87]: "05"
                - generic [ref=e88]: Your goal
              - list [ref=e89]:
                - listitem [ref=e90]:
                  - strong [ref=e91]: Contribute evidence. Build on others. Keep the group moving toward a solution.
```

# Test source

```ts
  111 |       if (id === 'middle') {
  112 |         const oldButtons = index === 2 ? ['#assemble-button', '#assembly-copy-button', '#research-model-button'] : ['#application-model-button'];
  113 |         const newButtons = index === 2 ? ['.dsl-assemble', '.dsl-copy', '.dsl-model-toggle'] : ['.dsl-model-toggle'];
  114 |         for (let n = 0; n < oldButtons.length; n++) result[key + `writing-button-${n}`] = await paint(original ? view.locator(oldButtons[n]) : host.locator(newButtons[n]));
  115 |         result[key + 'writing-check'] = await paint(original ? view.locator(index === 2 ? '#research-checks input' : '#application-checks input') : own(page, index === 2 ? 'research-checklist' : 'application-checklist').locator('input'), ['width', 'height', 'accentColor']);
  116 |       }
  117 |     }
  118 | 
  119 |     if (id === 'middle') await middleQuestions(page, index, original, key, result);
  120 |     if (id === 'final' && index > 0 && index < 9) await finalQuestions(page, index, original, key, result);
  121 |     if (id === 'opening') await openingStates(page, index, original, key, result);
  122 |     if (!original) expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${id}/${section.id}/${width}`).toBe(true);
  123 |   }
  124 |   return result;
  125 | }
  126 | 
  127 | async function finalQuestions(page, index, original, key, result) {
  128 |   const id = index === 8 ? 'knowledge-check' : `${manifest('final').sections[index].id}-questions`, data = activity('final', id).data;
  129 |   const host = original ? page.locator(`#quiz-${index}`) : own(page, id), panel = original ? host : host.locator('xpath=../../..');
  130 |   result[key + 'question-panel'] = await paint(panel, ['backgroundColor', 'borderLeftWidth', 'borderRadius']);
  131 |   result[key + 'question-title'] = await paint(host.locator(original ? 'h3' : '.dsl-sequence-heading'), ['fontFamily', 'fontSize', 'color']);
  132 |   for (const [n, q] of data.questions.entries()) {
  133 |     result[key + `prompt-${n}`] = await paint(host.locator(original ? 'p.font-bold' : '.dsl-question-prompt'));
  134 |     if (q.context) result[key + `context-${n}`] = await paint(host.locator(original ? '.notice' : '.dsl-question-context'), ['backgroundColor', 'borderLeftWidth', 'borderRadius']);
  135 |     const correct = q.options.findIndex(o => o.id === q.correctOptionId), wrong = correct ? 0 : 1;
  136 |     for (const [step, option] of [wrong, correct, wrong, correct].entries()) {
  137 |       const button = host.locator(original ? '.choice' : '.dsl-choice').nth(option); await activate(button);
  138 |       result[key + `choice-${n}-${step}`] = await paint(button, ['backgroundColor', 'borderLeftWidth', 'color', 'fontWeight']);
  139 |       result[key + `feedback-${n}-${step}`] = await paint(host.locator(original ? '.feedback' : '.dsl-feedback'), ['backgroundColor', 'borderLeftWidth', 'color']);
  140 |     }
  141 |     if (n < data.questions.length - 1) await activate(host.getByRole('button', {name: 'Next question →', exact: true}));
  142 |   }
  143 | }
  144 | 
  145 | async function middleQuestions(page, index, original, key, result) {
  146 |   const specs = {1: ['classification', 'classify', '#s1-activity', '[data-reveal-id="classification"]'], 2: ['research', 'research', '#research-activity', '[data-reveal-id="research-activity"]'],
  147 |     3: ['group-decisions', 'group', '#group-activity', '[data-reveal-id="group-activity"]'], 4: ['communication-diagnosis', 'communication', '#communication-activity', '[data-reveal-id="communication-activity"]'],
  148 |     5: ['speaking-simulator', 'speaking', '#speaking-activity', '[data-reveal-id="speaking-activity"]'], 7: ['knowledge-check', 'quiz', '.activity:has(#quiz-options)', '.dsl-question-panel']};
  149 |   if (index === 6) {
  150 |     const data = activity('middle', 'application').data.questions;
  151 |     for (const [n, q] of data.entries()) await middleChoice(page, original ? page.locator(`.activity:has(#application-${n ? 'b' : 'a'}-options)`) : own(page, 'application').locator(`[data-question-id="${q.id}"]`), original, key + `application-${n}/`, result, q, original ? '.option' : '.dsl-choice');
  152 |     return;
  153 |   }
  154 |   if (!specs[index]) return;
  155 |   const [name, prefix, oldPanel, newPanel] = specs[index], data = activity('middle', name).data, host = original ? page.locator(oldPanel) : own(page, name);
  156 |   result[key + 'activity-panel'] = await paint(original ? host : page.locator(newPanel));
  157 |   result[key + 'activity-title'] = await paint(original ? host.locator(':scope>h3').first() : index === 7 ? host.locator('.dsl-question-counter') : page.locator(newPanel).locator('h3').first());
  158 |   if (index === 2) result[key + 'research-caution'] = await paint(original ? host.locator(':scope>.caution') : page.locator(newPanel + '>.dsl-tone-caution'));
  159 |   for (const [n, q] of (data.questions || [data]).entries()) {
  160 |     await middleChoice(page, host, original, key + `question-${n}/`, result, q, original ? '.option' : '.dsl-choice', prefix);
  161 |     if (data.questions && n < data.questions.length - 1) await activate(original ? page.locator(`#${prefix}-next`) : host.locator('.dsl-question-next'));
  162 |   }
  163 |   if (index === 7) {
  164 |     result[key + 'overview'] = await paint(original ? page.locator('#view-7>.panel') : page.locator('.dsl-question-overview'));
  165 |     result[key + 'quiz-score'] = await paint(original ? page.locator('#quiz-score') : page.locator('.dsl-question-overview>.dsl-question-score'));
  166 |     result[key + 'quiz-jumps'] = await paint(original ? page.locator('#quiz-status button') : page.locator('.dsl-question-jump'));
  167 |   }
  168 | }
  169 | async function middleChoice(page, host, original, key, result, question, choiceSelector, prefix) {
  170 |   const choices = host.locator(choiceSelector), good = question.options.findIndex(o => o.id === question.correctOptionId), wrong = good ? 0 : 1;
  171 |   result[key + 'prompt'] = await paint(original ? host.locator(prefix ? `#${prefix}-question,p.font-bold` : ':scope>h3').first() : host.locator('.dsl-question-prompt'));
  172 |   for (const [step, n] of [good, wrong, good].entries()) {
  173 |     await activate(choices.nth(n));
  174 |     result[key + `choice-${step}`] = await paint(choices.nth(n)); result[key + `feedback-${step}`] = await paint(host.locator(original ? '.feedback' : '.dsl-feedback'));
  175 |   }
  176 |   if (prefix && prefix !== 'research') {
  177 |     result[key + 'next'] = await paint(original ? page.locator(`#${prefix}-next`) : host.locator('.dsl-question-next'));
  178 |     if (prefix !== 'quiz') result[key + 'score'] = await paint(original ? page.locator(`#${prefix}-count`) : host.locator('.dsl-question-score'));
  179 |   }
  180 | }
  181 | async function openingStates(page, index, original, key, result) {
  182 |   const view = page.locator(`#view-${index}`);
  183 |   if (index === 0) {
  184 |     const choices = view.locator(original ? '.classify-answer' : '.dsl-choice'); await activate(choices.nth(1));
  185 |     if (!original) await expect(choices.nth(1)).toHaveClass(/dsl-selected-incorrect/);
  186 |     await activate(choices.first()); if (!original) await expect(choices.first()).toHaveClass(/dsl-selected-correct/);
  187 |     await view.locator('#classify-next').click(); await expect(view.locator('#classify-counter')).toHaveText('STATEMENT 2 OF 5');
  188 |   }
  189 |   if (index === 1) {
  190 |     result[key + 'timeline-closed'] = await paint(view.locator('.timeline-toggle'));
  191 |     for (let n = 1; n <= 6; n++) {const control = view.locator(`[aria-controls="stage-${n}"]`); await activate(control); await expect(control).toHaveAttribute('aria-expanded', 'true'); await expect(view.locator(`#stage-${n}`)).toBeVisible();}
  192 |     result[key + 'timeline-open'] = await paint(view.locator('.timeline-toggle'));
  193 |     for (const n of [0, 1, 2]) await view.locator('.sequence-choices button').nth(n).click();
  194 |     if (!original) {await expect(view.locator('.sequence-choices .dsl-selected-incorrect')).toHaveCount(1); await expect(view.locator('.dsl-panel-explored')).toHaveCount(6);}
  195 |   }
  196 |   if (index === 2) {
  197 |     result[key + 'tabs'] = await paint(view.locator('.analysis-tab'));
  198 |     for (const kind of ['who', 'what', 'how', 'where', 'terms']) {const tab = view.locator(`.analysis-tab[data-kind="${kind}"]`); await activate(tab); await expect(tab).toHaveAttribute('aria-selected', 'true'); expect(await view.locator('.task-mark.on').evaluateAll(nodes => nodes.map(n => n.dataset.kind))).toEqual({who: ['who'], what: ['what'], how: ['how', 'how'], where: ['where', 'where'], terms: ['who', 'what']}[kind]);}
  199 |   }
  200 |   if ([2, 3, 5].includes(index)) {
  201 |     const choices = view.locator(`#${{2: 'what-how', 3: 'clarification', 5: 'research'}[index]}-options button`);
  202 |     for (const n of [0, index === 2 ? 0 : index === 3 ? 1 : 2, index === 2 ? 1 : 0]) await activate(choices.nth(n));
  203 |   }
  204 |   if (index === 4) {await view.locator('#show-model').click(); await expect(view.locator('#model-answer')).toBeVisible(); result[key + 'model'] = await paint(view.locator('#model-answer')); await view.locator('#show-model').click(); await expect(view.locator('#model-answer')).toBeHidden();}
  205 |   if (index === 6) {await view.locator('#quiz-list article').first().locator('button').first().click(); await expect(view.locator('#quiz-score')).toHaveText('Knowledge check: 5 of 5 correct.');}
  206 | }
  207 | 
  208 | export function compare(actual, expected) {
  209 |   for (const [key, value] of Object.entries(actual)) {
  210 |     if (key.endsWith('/prose')) {for (const [text, style] of Object.entries(value)) expect(style, `${key}${text}`).toEqual(expected[key][text]);}
> 211 |     else expect(value, key).toEqual(expected[key]);
      |                             ^ Error: structure-substance/card-0-back-title
  212 |   }
  213 |   // Current side must not silently omit a source role or an entire activity.
  214 |   expect(Object.keys(actual).sort()).toEqual(Object.keys(expected).sort());
  215 | }
  216 | 
```