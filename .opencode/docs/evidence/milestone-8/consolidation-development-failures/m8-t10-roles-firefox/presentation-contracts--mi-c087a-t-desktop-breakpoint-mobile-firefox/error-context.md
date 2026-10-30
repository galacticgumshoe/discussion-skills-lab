# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: presentation-contracts.spec.mjs >> /middle all authored presentation roles/states survive consolidation at desktop/breakpoint/mobile
- Location: tests/browser/presentation-contracts.spec.mjs:13:3

# Error details

```
Test timeout of 300000ms exceeded.
```

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('.activity:has(#quiz-options)').locator('.option').nth(2)
Expected: "true"
Received: ""

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for locator('.activity:has(#quiz-options)').locator('.option').nth(2)

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - generic [ref=e6]: DISCUSSION SKILLS LAB · MSHSL SPEECH
        - generic [ref=e7]: Making an Impact · The Middle Stage
      - generic [ref=e8]: SELF-PACED · 20–25 MINUTES
  - main [ref=e10]:
    - generic [ref=e11]:
      - generic [ref=e12]: Go to a section
      - combobox "Go to a section" [ref=e13]:
        - option "Welcome"
        - option "01 · Structure to substance"
        - option "02 · Make contributions count"
        - option "03 · Support the group"
        - option "04 · Communicate professionally"
        - option "05 · Navigate the conversation"
        - option "06 · Put it together"
        - option "07 · Knowledge check" [selected]
        - option "↗ · Quick reference"
    - status [ref=e14]: Knowledge check complete.
    - region "Are You Ready to Make an Impact?" [ref=e15]:
      - generic [ref=e16]:
        - text: 07 / 07 · Knowledge check
        - heading "Are You Ready to Make an Impact?" [level=2] [ref=e17]
        - paragraph [ref=e18]: Five questions, one point each. Retry missed questions. This is practice, not an official MSHSL assessment.
      - generic [ref=e19]:
        - strong [ref=e20]: "Score: 5/5 · 100%"
        - generic [ref=e21]:
          - button "✓ Correct · Q1" [ref=e22] [cursor=pointer]
          - button "✓ Correct · Q2" [ref=e23] [cursor=pointer]
          - button "✓ Correct · Q3" [ref=e24] [cursor=pointer]
          - button "✓ Correct · Q4" [ref=e25] [cursor=pointer]
          - button "✓ Correct · Q5" [ref=e26] [cursor=pointer]
      - generic [ref=e27]:
        - heading "Question 5 of 5" [level=3] [ref=e28]
        - paragraph [ref=e29]: You have spoken frequently while another student has not. You start together. What is generally strongest?
        - generic [ref=e30]:
          - button "Talk over them." [ref=e31] [cursor=pointer]
          - button "Declare your idea more important." [ref=e32] [cursor=pointer]
          - button "Yield and ask to share your point afterward." [pressed] [ref=e33] [cursor=pointer]
          - button "Stop participating entirely." [ref=e34] [cursor=pointer]
        - button "Review first →" [ref=e36] [cursor=pointer]
        - status [ref=e37]: Good choice. Yielding balances participation while keeping a future opportunity.
    - generic [ref=e38]:
      - button "← Back" [ref=e39] [cursor=pointer]
      - button "Open quick reference →" [ref=e40] [cursor=pointer]
```

# Test source

```ts
  128 |         result[key + `note-${n}-wrong-status`] = await input.locator('..').locator('[role=status]').textContent();
  129 |         await input.selectOption(original ? String(good) : note.correctCategoryId); await expect(input).toBeDisabled(); result[key + `note-${n}-right`] = await paint(input, ['color', 'backgroundColor']);
  130 |       }
  131 |     }
  132 | 
  133 |     const writing = id === 'middle' ? {2: ['evidence-writing', ['source', 'finding', 'why'], '#research-model'], 6: ['integrated-writing', ['application-draft'], '#application-model']}[index]
  134 |       : id === 'final' ? {2: ['synthesis-writing', ['build-1', 'build-2', 'build-3'], '#builder-model'], 7: ['closing-writing', ['closing-text'], '#closing-model']}[index] : null;
  135 |     if (writing) {
  136 |       const [name, fields, oldModel] = writing, data = activity(id, name).data, host = original ? view : own(page, name);
  137 |       for (const [n, field] of fields.entries()) result[key + `writing-${n}`] = await paint(original ? view.locator(`#${field}`) : host.locator(`[data-field-id="${data.fields[n].id}"]`), id === 'final' ? ['fontFamily', 'fontSize', 'backgroundColor', 'borderLeftWidth', 'borderRadius'] : keys);
  138 |       result[key + 'model'] = await paint(original ? view.locator(oldModel) : host.locator('.dsl-writing-model'), id === 'final' ? ['backgroundColor', 'borderLeftWidth', 'borderRadius'] : keys);
  139 |       if (id === 'middle') {
  140 |         if (index === 6) {
  141 |           await capture(key + 'writing-panel', view.locator('.activity:has(#application-draft)'), view.locator('.dsl-tone-activity:has([data-activity-id="integrated-writing"])'));
  142 |           await capture(key + 'writing-title', view.locator('.activity:has(#application-draft) h3').first(), view.locator('.dsl-tone-activity:has([data-activity-id="integrated-writing"]) h3').first());
  143 |         }
  144 |         for (const [n, field] of data.fields.entries()) await capture(key + `writing-label-${n}`, view.locator(`label[for="${fields[n]}"]`), host.locator('.dsl-field-label').nth(n));
  145 |         if (index === 2) {
  146 |           for (const [n, value] of ['Synthetic source, October 2026', 'Synthetic finding', 'Synthetic connection'].entries()) await (original ? view.locator(`#${fields[n]}`) : host.locator(`[data-field-id="${data.fields[n].id}"]`)).fill(value);
  147 |           await activate(original ? view.locator('#assemble-button') : host.locator('.dsl-assemble'));
  148 |           result[key + 'assembled-value'] = await (original ? view.locator('#assembled') : host.locator(`[data-field-id="${data.output.id}"]`)).inputValue();
  149 |           result[key + 'assembly-notice'] = await (original ? view.locator('#assembly-status') : host.locator('.dsl-writing-status')).textContent();
  150 |           await capture(key + 'assembly-status', view.locator('#assembly-status'), host.locator('.dsl-writing-status'));
  151 |         }
  152 |         const oldButtons = index === 2 ? ['#assemble-button', '#assembly-copy-button', '#research-model-button'] : ['#application-model-button'];
  153 |         const newButtons = index === 2 ? ['.dsl-assemble', '.dsl-copy', '.dsl-model-toggle'] : ['.dsl-model-toggle'];
  154 |         for (let n = 0; n < oldButtons.length; n++) result[key + `writing-button-${n}`] = await paint(original ? view.locator(oldButtons[n]) : host.locator(newButtons[n]));
  155 |         result[key + 'writing-check'] = await paint(original ? view.locator(index === 2 ? '#research-checks input' : '#application-checks input') : own(page, index === 2 ? 'research-checklist' : 'application-checklist').locator('input'), ['width', 'height', 'accentColor']);
  156 |       }
  157 |     }
  158 | 
  159 |     if (id === 'middle') await middleQuestions(page, index, original, key, result);
  160 |     if (id === 'final' && index > 0 && index < 9) await finalQuestions(page, index, original, key, result);
  161 |     if (id === 'opening') await openingStates(page, index, original, key, result);
  162 |     if (id === 'middle' && index === 3) await capture(key + 'roundtable', view.locator('#group-activity>.panel'), view.locator('[data-reveal-id="group-activity"]>.dsl-tone-callout'));
  163 |     if (!original) await checkComposition(page, id, index, width);
  164 |     if (!original) expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${id}/${section.id}/${width}`).toBe(true);
  165 |   }
  166 |   return result;
  167 | }
  168 | 
  169 | async function finalQuestions(page, index, original, key, result) {
  170 |   const id = index === 8 ? 'knowledge-check' : `${manifest('final').sections[index].id}-questions`, data = activity('final', id).data;
  171 |   const host = original ? page.locator(`#quiz-${index}`) : own(page, id), panel = original ? host : host.locator('xpath=../../..');
  172 |   result[key + 'question-panel'] = await paint(panel, ['backgroundColor', 'borderLeftWidth', 'borderRadius']);
  173 |   result[key + 'question-title'] = await paint(host.locator(original ? 'h3' : '.dsl-sequence-heading'), ['fontFamily', 'fontSize', 'color']);
  174 |   for (const [n, q] of data.questions.entries()) {
  175 |     result[key + `prompt-${n}`] = await paint(host.locator(original ? 'p.font-bold' : '.dsl-question-prompt'), ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'color']);
  176 |     if (q.context) result[key + `context-${n}`] = await paint(host.locator(original ? '.notice' : '.dsl-question-context'), ['backgroundColor', 'borderLeftWidth', 'borderRadius']);
  177 |     const correct = q.options.findIndex(o => o.id === q.correctOptionId), wrong = correct ? 0 : 1;
  178 |     for (const [step, option] of [wrong, correct, wrong, correct].entries()) {
  179 |       const button = host.locator(original ? '.choice' : '.dsl-choice').nth(option); await activate(button);
  180 |       await expect(button).toHaveAttribute('aria-pressed', 'true'); await settle(page);
  181 |       result[key + `choice-${n}-${step}`] = await paint(button, ['backgroundColor', 'borderLeftWidth', 'color', 'fontWeight']);
  182 |       result[key + `feedback-${n}-${step}`] = await paint(host.locator(original ? '.feedback' : '.dsl-feedback'), ['backgroundColor', 'borderLeftWidth', 'color']);
  183 |     }
  184 |     if (n < data.questions.length - 1) await activate(host.getByRole('button', {name: 'Next question →', exact: true}));
  185 |   }
  186 | }
  187 | 
  188 | async function middleQuestions(page, index, original, key, result) {
  189 |   const specs = {1: ['classification', 'classify', '#s1-activity', '[data-reveal-id="classification"]'], 2: ['research', 'research', '#research-activity', '[data-reveal-id="research-activity"]'],
  190 |     3: ['group-decisions', 'group', '#group-activity', '[data-reveal-id="group-activity"]'], 4: ['communication-diagnosis', 'communication', '#communication-activity', '[data-reveal-id="communication-activity"]'],
  191 |     5: ['speaking-simulator', 'speaking', '#speaking-activity', '[data-reveal-id="speaking-activity"]'], 7: ['knowledge-check', 'quiz', '.activity:has(#quiz-options)', '.dsl-question-panel']};
  192 |   if (index === 6) {
  193 |     const data = activity('middle', 'application').data.questions;
  194 |     for (const [n, q] of data.entries()) {
  195 |       const host = original ? page.locator(`.activity:has(#application-${n ? 'b' : 'a'}-options)`) : own(page, 'application').locator(`[data-question-id="${q.id}"]`);
  196 |       result[key + `application-${n}/panel`] = await paint(host);
  197 |       await middleChoice(page, host, original, key + `application-${n}/`, result, q, original ? '.option' : '.dsl-choice');
  198 |     }
  199 |     return;
  200 |   }
  201 |   if (!specs[index]) return;
  202 |   const [name, prefix, oldPanel, newPanel] = specs[index], data = activity('middle', name).data, host = original ? page.locator(oldPanel) : own(page, name);
  203 |   result[key + 'activity-panel'] = await paint(original ? host : page.locator(newPanel));
  204 |   result[key + 'activity-title'] = await paint(original ? host.locator(':scope>h3').first() : index === 7 ? host.locator('.dsl-question-counter') : page.locator(newPanel).locator('h3').first());
  205 |   if (index === 2) result[key + 'research-caution'] = await paint(original ? host.locator(':scope>.caution') : page.locator(newPanel + '>.dsl-tone-caution'));
  206 |   for (const [n, q] of (data.questions || [data]).entries()) {
  207 |     await middleChoice(page, host, original, key + `question-${n}/`, result, q, original ? '.option' : '.dsl-choice', prefix);
  208 |     if (data.questions && n < data.questions.length - 1) await activate(original ? page.locator(`#${prefix}-next`) : host.locator('.dsl-question-next'));
  209 |   }
  210 |   if (index === 7) {
  211 |     result[key + 'overview'] = await paint(original ? page.locator('#view-7>.panel') : page.locator('.dsl-question-overview'));
  212 |     result[key + 'quiz-score'] = await paint(original ? page.locator('#quiz-score') : page.locator('.dsl-question-overview>.dsl-question-score'));
  213 |     // The old contract measured the first, noncurrent jump. The shared API also
  214 |     // supplies an active-question cue (covered by navigation/ARIA assertions),
  215 |     // which the source did not paint; it is not part of that neutral-role oracle.
  216 |     if (original) await activate(page.locator('#quiz-status button').last()); else await activate(page.locator('.dsl-question-jump').last());
  217 |     await page.mouse.move(0, 0);
  218 |     result[key + 'quiz-jumps'] = await paint(original ? page.locator('#quiz-status button').first() : page.locator('.dsl-question-jump').first());
  219 |   }
  220 | }
  221 | async function middleChoice(page, host, original, key, result, question, choiceSelector, prefix) {
  222 |   const choices = host.locator(choiceSelector), good = question.options.findIndex(o => o.id === question.correctOptionId), wrong = good ? 0 : 1;
  223 |   await page.mouse.move(0, 0);
  224 |   result[key + 'prompt'] = await paint(original ? host.locator(prefix ? `#${prefix}-question,p.font-bold` : ':scope>h3').first() : host.locator('.dsl-question-prompt'));
  225 |   result[key + 'neutral'] = await paint(choices.nth(wrong));
  226 |   for (const [step, n] of [good, wrong, good].entries()) {
  227 |     await activate(choices.nth(n));
> 228 |     await expect(choices.nth(n)).toHaveAttribute('aria-pressed', 'true'); await settle(page);
      |                                  ^ Error: expect(locator).toHaveAttribute(expected) failed
  229 |     result[key + `choice-${step}`] = await paint(choices.nth(n)); result[key + `feedback-${step}`] = await paint(host.locator(original ? '.feedback' : '.dsl-feedback'));
  230 |   }
  231 |   if (prefix && prefix !== 'research') {
  232 |     result[key + 'next'] = await paint(original ? page.locator(`#${prefix}-next`) : host.locator('.dsl-question-next'));
  233 |     if (prefix !== 'quiz') result[key + 'score'] = await paint(original ? page.locator(`#${prefix}-count`) : host.locator('.dsl-question-score'));
  234 |   }
  235 | }
  236 | async function openingStates(page, index, original, key, result) {
  237 |   const view = page.locator(`#view-${index}`);
  238 |   if (index === 0) {
  239 |     const choices = view.locator(original ? '.classify-answer' : '.dsl-choice'); await activate(choices.nth(1));
  240 |     if (!original) await expect(choices.nth(1)).toHaveClass(/dsl-selected-incorrect/);
  241 |     await activate(choices.first()); if (!original) await expect(choices.first()).toHaveClass(/dsl-selected-correct/);
  242 |     await view.locator('#classify-next').click(); await expect(view.locator('#classify-counter')).toHaveText('STATEMENT 2 OF 5');
  243 |   }
  244 |   if (index === 1) {
  245 |     result[key + 'timeline-closed'] = await paint(view.locator('.timeline-toggle'), openingPaint);
  246 |     for (let n = 1; n <= 6; n++) {const control = view.locator(`[aria-controls="stage-${n}"]`); await activate(control); await expect(control).toHaveAttribute('aria-expanded', 'true'); await expect(view.locator(`#stage-${n}`)).toBeVisible();}
  247 |     result[key + 'timeline-open'] = await paint(view.locator('.timeline-toggle'), openingPaint);
  248 |     for (const n of [0, 1, 2]) await view.locator('.sequence-choices button').nth(n).click();
  249 |     if (!original) {await expect(view.locator('.sequence-choices .dsl-selected-incorrect')).toHaveCount(1); await expect(view.locator('.dsl-panel-explored')).toHaveCount(6);}
  250 |   }
  251 |   if (index === 2) {
  252 |     result[key + 'tabs'] = await paint(view.locator('.analysis-tab'), openingPaint);
  253 |     for (const kind of ['who', 'what', 'how', 'where', 'terms']) {const tab = view.locator(`.analysis-tab[data-kind="${kind}"]`); await activate(tab); await expect(tab).toHaveAttribute('aria-selected', 'true'); await expect(tab).toHaveCSS('background-color', 'rgb(20, 43, 73)'); expect(await view.locator('.task-mark.on').evaluateAll(nodes => nodes.map(n => n.dataset.kind))).toEqual({who: ['who'], what: ['what'], how: ['how', 'how'], where: ['where', 'where'], terms: ['who', 'what']}[kind]);}
  254 |   }
  255 |   if ([2, 3, 5].includes(index)) {
  256 |     const choices = view.locator(`#${{2: 'what-how', 3: 'clarification', 5: 'research'}[index]}-options button`);
  257 |     for (const n of [0, index === 2 ? 0 : index === 3 ? 1 : 2, index === 2 ? 1 : 0]) await activate(choices.nth(n));
  258 |   }
  259 |   if (index === 4) {await view.locator('#show-model').click(); await expect(view.locator('#model-answer')).toBeVisible(); result[key + 'model'] = await paint(view.locator('#model-answer')); await view.locator('#show-model').click(); await expect(view.locator('#model-answer')).toBeHidden();}
  260 |   if (index === 6) {await view.locator('#quiz-list article').first().locator('button').first().click(); await expect(view.locator('#quiz-score')).toHaveText('Knowledge check: 5 of 5 correct.');}
  261 | }
  262 | 
  263 | async function checkComposition(page, id, index, width) {
  264 |   const view = page.locator(`#view-${index}`);
  265 |   if (id !== 'middle') return;
  266 |   if (index === 0) {
  267 |     const tops = await view.locator('.dsl-card').evaluateAll(nodes => nodes.map(n => n.getBoundingClientRect().top));
  268 |     expect(new Set(tops).size).toBe(width > 850 ? 1 : 3);
  269 |     for (const card of await view.locator('.dsl-card').all()) {
  270 |       expect(await card.evaluate(card => {const face = card.querySelector('.dsl-card-front').getBoundingClientRect(), title = card.querySelector('.dsl-card-front .dsl-prose-h3').getBoundingClientRect(); return Math.abs(title.top + title.height / 2 - face.top - face.height / 2);})).toBeLessThan(2);
  271 |       const gaps = await card.locator('.dsl-card-back [role="listitem"]').evaluateAll(nodes => nodes.slice(1).map((n, i) => n.getBoundingClientRect().top - nodes[i].getBoundingClientRect().bottom));
  272 |       expect(gaps.every(gap => Math.abs(gap) < 1)).toBe(true);
  273 |     }
  274 |   }
  275 |   for (const card of await view.locator('.dsl-card').all()) for (const side of ['front', 'back']) {
  276 |     const face = card.locator(`.dsl-card-${side}`);
  277 |     if (await face.locator(':scope>.dsl-card-content>.dsl-card-title').count()) expect(await face.evaluate(n => n.querySelector('.dsl-card-title').getBoundingClientRect().bottom - n.querySelector('.dsl-card-copy').getBoundingClientRect().top)).toBeLessThan(1 / 64);
  278 |   }
  279 |   if (index === 1) {
  280 |     const group = own(page, 'classification'), tops = await group.locator('.dsl-choice').evaluateAll(nodes => nodes.map(n => n.getBoundingClientRect().top));
  281 |     expect(tops[0] === tops[1]).toBe(width > 600); await expect(group.locator('.dsl-question-counter')).toBeHidden();
  282 |   }
  283 |   if (index === 2) {
  284 |     const writer = own(page, 'evidence-writing');
  285 |     expect(await writer.evaluate(n => {const output = n.querySelector('[data-field-id="evidence-output"]'); return [...n.querySelectorAll('.dsl-writing-actions button')].every(button => !!(button.compareDocumentPosition(output) & Node.DOCUMENT_POSITION_FOLLOWING));})).toBe(true);
  286 |     await expect(writer.locator('[data-field-id="evidence-output"]')).toHaveAttribute('readonly', '');
  287 |   }
  288 |   if (index === 3) await expect(own(page, 'collaboration-panels').locator('blockquote').first().locator('br')).toHaveCount(3);
  289 |   if (index === 4) {
  290 |     const lefts = await own(page, 'communication-panels').locator('blockquote').evaluateAll(nodes => nodes.map(n => n.getBoundingClientRect().left));
  291 |     expect(lefts[0] === lefts[1]).toBe(width <= 600);
  292 |   }
  293 |   if (index === 7) await expect(page.locator('.dsl-tone-activity,.dsl-question-panel,.dsl-sequence-middle-application .dsl-question')).toHaveCount(9);
  294 | }
  295 | 
  296 | export function compare(actual, expected) {
  297 |   for (const [key, value] of Object.entries(actual)) {
  298 |     if (key.endsWith('/prose')) {for (const [text, style] of Object.entries(value)) expect.soft(style, `${key}${text}`).toEqual(expected[key][text]);}
  299 |     else expect.soft(value, key).toEqual(expected[key]);
  300 |   }
  301 |   // Current side must not silently omit a source role or an entire activity.
  302 |   expect.soft(Object.keys(actual).sort()).toEqual(Object.keys(expected).sort());
  303 | }
  304 | 
```