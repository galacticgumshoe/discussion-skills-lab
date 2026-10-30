# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: presentation-contracts.spec.mjs >> /opening all authored presentation roles/states survive consolidation at desktop/breakpoint/mobile
- Location: tests/browser/presentation-contracts.spec.mjs:12:3

# Error details

```
Error: contributions/prose01 · STRUCTURE

expect(received).toEqual(expected) // deep equality

Expected: undefined
Received: ["\"DM Sans\", sans-serif", "12px", "800", "18px", "rgb(8, 126, 131)"]
```

```
Error: contributions/prose02 · CONTENT

expect(received).toEqual(expected) // deep equality

Expected: undefined
Received: ["\"DM Sans\", sans-serif", "12px", "800", "18px", "rgb(178, 98, 22)"]
```

```
Error: opening-sequence/proseOrder matters: clarify what the task requires before setting an agenda.

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
    "\"DM Sans\", sans-serif",
    "16px",
-   "700",
+   "600",
    "24px",
    "rgb(20, 43, 73)",
  ]
```

```
Error: give-direction/prose“By the end of this discussion, will the group agree that we have crafted a plan counselors could implement in K-12 schools to support students affected by mental health stigma?”

expect(received).toEqual(expected) // deep equality

Expected: undefined
Received: ["\"DM Sans\", sans-serif", "16px", "600", "24px", "rgb(20, 43, 73)"]
```

```
Error: contributions/prose01 · STRUCTURE

expect(received).toEqual(expected) // deep equality

Expected: undefined
Received: ["\"DM Sans\", sans-serif", "12px", "800", "18px", "rgb(8, 126, 131)"]
```

```
Error: contributions/prose02 · CONTENT

expect(received).toEqual(expected) // deep equality

Expected: undefined
Received: ["\"DM Sans\", sans-serif", "12px", "800", "18px", "rgb(178, 98, 22)"]
```

```
Error: opening-sequence/proseOrder matters: clarify what the task requires before setting an agenda.

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
    "\"DM Sans\", sans-serif",
    "16px",
-   "700",
+   "600",
    "24px",
    "rgb(20, 43, 73)",
  ]
```

```
Error: give-direction/prose“By the end of this discussion, will the group agree that we have crafted a plan counselors could implement in K-12 schools to support students affected by mental health stigma?”

expect(received).toEqual(expected) // deep equality

Expected: undefined
Received: ["\"DM Sans\", sans-serif", "16px", "600", "24px", "rgb(20, 43, 73)"]
```

```
Error: contributions/prose01 · STRUCTURE

expect(received).toEqual(expected) // deep equality

Expected: undefined
Received: ["\"DM Sans\", sans-serif", "12px", "800", "18px", "rgb(8, 126, 131)"]
```

```
Error: contributions/prose02 · CONTENT

expect(received).toEqual(expected) // deep equality

Expected: undefined
Received: ["\"DM Sans\", sans-serif", "12px", "800", "18px", "rgb(178, 98, 22)"]
```

```
Error: opening-sequence/proseOrder matters: clarify what the task requires before setting an agenda.

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
    "\"DM Sans\", sans-serif",
    "16px",
-   "700",
+   "600",
    "24px",
    "rgb(20, 43, 73)",
  ]
```

```
Error: give-direction/prose“By the end of this discussion, will the group agree that we have crafted a plan counselors could implement in K-12 schools to support students affected by mental health stigma?”

expect(received).toEqual(expected) // deep equality

Expected: undefined
Received: ["\"DM Sans\", sans-serif", "16px", "600", "24px", "rgb(20, 43, 73)"]
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
  - main [ref=e12]:
    - generic [ref=e13]:
      - generic [ref=e14]: Go to a section
      - combobox "Go to a section" [ref=e15]:
        - option "01 · Contributions"
        - option "02 · Opening sequence"
        - option "03 · Analyze the task"
        - option "04 · Clarifications"
        - option "05 · Give direction"
        - option "06 · Research & transition"
        - option "✓ · Knowledge check"
        - option "↗ · Quick reference" [selected]
    - status [ref=e16]: Quick reference is always available.
    - generic [ref=e17]:
      - text: − − − − − −
      - region "Opening Stage Quick Reference" [ref=e18]:
        - paragraph [ref=e19]: QUICK REFERENCE
        - generic [ref=e20]:
          - button "Print quick reference" [ref=e21] [cursor=pointer]
          - heading "Opening Stage Quick Reference" [active] [level=2] [ref=e22]
          - generic [ref=e23]:
            - paragraph [ref=e24]: 60-MINUTE ROUND
            - region "01 Opening sequence" [ref=e25]:
              - heading "01 Opening sequence" [level=4] [ref=e26]:
                - generic [ref=e27]: "01"
                - generic [ref=e28]: Opening sequence
              - list [ref=e29]:
                - listitem [ref=e30]: Receive
                - listitem [ref=e31]: Read and Analyze
                - listitem [ref=e32]: Clarify
                - listitem [ref=e33]: Set direction
                - listitem [ref=e34]: Research
                - listitem [ref=e35]: Transition
              - paragraph [ref=e36]: "IMPORTANT: Read, analyze, and clarify the task before setting an agenda!"
            - region "02 Task analysis" [ref=e37]:
              - heading "02 Task analysis" [level=4] [ref=e38]:
                - generic [ref=e39]: "02"
                - generic [ref=e40]: Task analysis
              - list [ref=e41]:
                - listitem [ref=e42]:
                  - strong [ref=e43]: WHO
                  - text: role + authority
                - listitem [ref=e44]:
                  - strong [ref=e45]: WHAT
                  - text: central problem
                - listitem [ref=e46]:
                  - strong [ref=e47]: HOW
                  - text: action + deliverable
                - listitem [ref=e48]:
                  - strong [ref=e49]: WHERE
                  - text: setting + implementation
              - paragraph [ref=e50]:
                - strong [ref=e51]: TERMS
                - text: are the keywords that guide research.
            - region "03 Types of contributions" [ref=e52]:
              - heading "03 Types of contributions" [level=4] [ref=e53]:
                - generic [ref=e54]: "03"
                - generic [ref=e55]: Types of contributions
              - list [ref=e56]:
                - listitem [ref=e57]:
                  - strong [ref=e58]: Procedural
                  - text: structure, organization, focus
                - listitem [ref=e59]:
                  - strong [ref=e60]: Substantive
                  - text: ideas, evidence, evaluation, synthesis
            - region "04 Direction and terminology" [ref=e61]:
              - heading "04 Direction and terminology" [level=4] [ref=e62]:
                - generic [ref=e63]: "04"
                - generic [ref=e64]: Direction and terminology
              - list [ref=e65]:
                - listitem [ref=e66]:
                  - strong [ref=e67]: Agenda
                  - text: Flexible roadmap
                - listitem [ref=e68]:
                  - strong [ref=e69]: Consensus question
                  - text: Destination combining WHAT + HOW
                - listitem [ref=e70]:
                  - strong [ref=e71]: Clarification
                  - text: Shared understanding
                - listitem [ref=e72]:
                  - strong [ref=e73]: Verbal citation
                  - text: Publisher, date, author or title
```

# Test source

```ts
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
  138 |     for (const [step, option] of [wrong, correct, wrong, correct].entries()) {
  139 |       const button = host.locator(original ? '.choice' : '.dsl-choice').nth(option); await activate(button);
  140 |       result[key + `choice-${n}-${step}`] = await paint(button, ['backgroundColor', 'borderLeftWidth', 'color', 'fontWeight']);
  141 |       result[key + `feedback-${n}-${step}`] = await paint(host.locator(original ? '.feedback' : '.dsl-feedback'), ['backgroundColor', 'borderLeftWidth', 'color']);
  142 |     }
  143 |     if (n < data.questions.length - 1) await activate(host.getByRole('button', {name: 'Next question →', exact: true}));
  144 |   }
  145 | }
  146 | 
  147 | async function middleQuestions(page, index, original, key, result) {
  148 |   const specs = {1: ['classification', 'classify', '#s1-activity', '[data-reveal-id="classification"]'], 2: ['research', 'research', '#research-activity', '[data-reveal-id="research-activity"]'],
  149 |     3: ['group-decisions', 'group', '#group-activity', '[data-reveal-id="group-activity"]'], 4: ['communication-diagnosis', 'communication', '#communication-activity', '[data-reveal-id="communication-activity"]'],
  150 |     5: ['speaking-simulator', 'speaking', '#speaking-activity', '[data-reveal-id="speaking-activity"]'], 7: ['knowledge-check', 'quiz', '.activity:has(#quiz-options)', '.dsl-question-panel']};
  151 |   if (index === 6) {
  152 |     const data = activity('middle', 'application').data.questions;
  153 |     for (const [n, q] of data.entries()) await middleChoice(page, original ? page.locator(`.activity:has(#application-${n ? 'b' : 'a'}-options)`) : own(page, 'application').locator(`[data-question-id="${q.id}"]`), original, key + `application-${n}/`, result, q, original ? '.option' : '.dsl-choice');
  154 |     return;
  155 |   }
  156 |   if (!specs[index]) return;
  157 |   const [name, prefix, oldPanel, newPanel] = specs[index], data = activity('middle', name).data, host = original ? page.locator(oldPanel) : own(page, name);
  158 |   result[key + 'activity-panel'] = await paint(original ? host : page.locator(newPanel));
  159 |   result[key + 'activity-title'] = await paint(original ? host.locator(':scope>h3').first() : index === 7 ? host.locator('.dsl-question-counter') : page.locator(newPanel).locator('h3').first());
  160 |   if (index === 2) result[key + 'research-caution'] = await paint(original ? host.locator(':scope>.caution') : page.locator(newPanel + '>.dsl-tone-caution'));
  161 |   for (const [n, q] of (data.questions || [data]).entries()) {
  162 |     await middleChoice(page, host, original, key + `question-${n}/`, result, q, original ? '.option' : '.dsl-choice', prefix);
  163 |     if (data.questions && n < data.questions.length - 1) await activate(original ? page.locator(`#${prefix}-next`) : host.locator('.dsl-question-next'));
  164 |   }
  165 |   if (index === 7) {
  166 |     result[key + 'overview'] = await paint(original ? page.locator('#view-7>.panel') : page.locator('.dsl-question-overview'));
  167 |     result[key + 'quiz-score'] = await paint(original ? page.locator('#quiz-score') : page.locator('.dsl-question-overview>.dsl-question-score'));
  168 |     result[key + 'quiz-jumps'] = await paint(original ? page.locator('#quiz-status button') : page.locator('.dsl-question-jump'));
  169 |   }
  170 | }
  171 | async function middleChoice(page, host, original, key, result, question, choiceSelector, prefix) {
  172 |   const choices = host.locator(choiceSelector), good = question.options.findIndex(o => o.id === question.correctOptionId), wrong = good ? 0 : 1;
  173 |   result[key + 'prompt'] = await paint(original ? host.locator(prefix ? `#${prefix}-question,p.font-bold` : ':scope>h3').first() : host.locator('.dsl-question-prompt'));
  174 |   for (const [step, n] of [good, wrong, good].entries()) {
  175 |     await activate(choices.nth(n));
  176 |     result[key + `choice-${step}`] = await paint(choices.nth(n)); result[key + `feedback-${step}`] = await paint(host.locator(original ? '.feedback' : '.dsl-feedback'));
  177 |   }
  178 |   if (prefix && prefix !== 'research') {
  179 |     result[key + 'next'] = await paint(original ? page.locator(`#${prefix}-next`) : host.locator('.dsl-question-next'));
  180 |     if (prefix !== 'quiz') result[key + 'score'] = await paint(original ? page.locator(`#${prefix}-count`) : host.locator('.dsl-question-score'));
  181 |   }
  182 | }
  183 | async function openingStates(page, index, original, key, result) {
  184 |   const view = page.locator(`#view-${index}`);
  185 |   if (index === 0) {
  186 |     const choices = view.locator(original ? '.classify-answer' : '.dsl-choice'); await activate(choices.nth(1));
  187 |     if (!original) await expect(choices.nth(1)).toHaveClass(/dsl-selected-incorrect/);
  188 |     await activate(choices.first()); if (!original) await expect(choices.first()).toHaveClass(/dsl-selected-correct/);
  189 |     await view.locator('#classify-next').click(); await expect(view.locator('#classify-counter')).toHaveText('STATEMENT 2 OF 5');
  190 |   }
  191 |   if (index === 1) {
  192 |     result[key + 'timeline-closed'] = await paint(view.locator('.timeline-toggle'));
  193 |     for (let n = 1; n <= 6; n++) {const control = view.locator(`[aria-controls="stage-${n}"]`); await activate(control); await expect(control).toHaveAttribute('aria-expanded', 'true'); await expect(view.locator(`#stage-${n}`)).toBeVisible();}
  194 |     result[key + 'timeline-open'] = await paint(view.locator('.timeline-toggle'));
  195 |     for (const n of [0, 1, 2]) await view.locator('.sequence-choices button').nth(n).click();
  196 |     if (!original) {await expect(view.locator('.sequence-choices .dsl-selected-incorrect')).toHaveCount(1); await expect(view.locator('.dsl-panel-explored')).toHaveCount(6);}
  197 |   }
  198 |   if (index === 2) {
  199 |     result[key + 'tabs'] = await paint(view.locator('.analysis-tab'));
  200 |     for (const kind of ['who', 'what', 'how', 'where', 'terms']) {const tab = view.locator(`.analysis-tab[data-kind="${kind}"]`); await activate(tab); await expect(tab).toHaveAttribute('aria-selected', 'true'); expect(await view.locator('.task-mark.on').evaluateAll(nodes => nodes.map(n => n.dataset.kind))).toEqual({who: ['who'], what: ['what'], how: ['how', 'how'], where: ['where', 'where'], terms: ['who', 'what']}[kind]);}
  201 |   }
  202 |   if ([2, 3, 5].includes(index)) {
  203 |     const choices = view.locator(`#${{2: 'what-how', 3: 'clarification', 5: 'research'}[index]}-options button`);
  204 |     for (const n of [0, index === 2 ? 0 : index === 3 ? 1 : 2, index === 2 ? 1 : 0]) await activate(choices.nth(n));
  205 |   }
  206 |   if (index === 4) {await view.locator('#show-model').click(); await expect(view.locator('#model-answer')).toBeVisible(); result[key + 'model'] = await paint(view.locator('#model-answer')); await view.locator('#show-model').click(); await expect(view.locator('#model-answer')).toBeHidden();}
  207 |   if (index === 6) {await view.locator('#quiz-list article').first().locator('button').first().click(); await expect(view.locator('#quiz-score')).toHaveText('Knowledge check: 5 of 5 correct.');}
  208 | }
  209 | 
  210 | export function compare(actual, expected) {
  211 |   for (const [key, value] of Object.entries(actual)) {
> 212 |     if (key.endsWith('/prose')) {for (const [text, style] of Object.entries(value)) expect.soft(style, `${key}${text}`).toEqual(expected[key][text]);}
      |                                                                                                                         ^ Error: give-direction/prose“By the end of this discussion, will the group agree that we have crafted a plan counselors could implement in K-12 schools to support students affected by mental health stigma?”
  213 |     else expect.soft(value, key).toEqual(expected[key]);
  214 |   }
  215 |   // Current side must not silently omit a source role or an entire activity.
  216 |   expect.soft(Object.keys(actual).sort()).toEqual(Object.keys(expected).sort());
  217 | }
  218 | 
```