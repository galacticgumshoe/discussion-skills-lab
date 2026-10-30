# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: lesson-boundaries.spec.mjs >> / public Final actual prerequisites/unlock, fixed fields, decoys, permanent credit and refresh
- Location: tests/browser/lesson-boundaries.spec.mjs:36:3

# Error details

```
Error: expect(locator).toBeFocused() failed

Locator:  locator('[data-activity-id="summary-synthesis-questions"]').locator('[data-option-id="summary"]')
Expected: focused
Received: inactive
Timeout:  10000ms

Call log:
  - Expect "toBeFocused" with timeout 10000ms
  - waiting for locator('[data-activity-id="summary-synthesis-questions"]').locator('[data-option-id="summary"]')
    24 × locator resolved to <button type="button" class="dsl-choice" aria-pressed="false" data-option-id="summary">A. Summary</button>
       - unexpected value "inactive"

```

```yaml
- link "Skip to main content":
  - /url: "#lesson-main"
- banner: DISCUSSION SKILLS LAB · MSHSL SPEECH Closing with Purpose · The Final Stage SELF-PACED · ABOUT 25–30 MINUTES
- navigation "Lesson sections":
  - button "Collapse navigation" [expanded]: ⇤
  - text: YOUR PROGRESS 1 of 9 pages completed
  - progressbar "Completed lesson pages"
  - paragraph: Finish each activity to unlock the next page. Quick Reference is always available.
  - button "Welcome — Why the Final Stage Matters"
  - button "01 — Summary or Synthesis?"
  - button "02 — Connect the Viewpoints" [disabled]
  - button "03 — Organize the Findings" [disabled]
  - button "04 — Build Genuine Consensus" [disabled]
  - button "05 — Check the Task" [disabled]
  - button "06 — Finish Professionally" [disabled]
  - button "07 — Practice Your Closing" [disabled]
  - button "08 — Knowledge Check" [disabled]
  - button "Quick Reference"
- main:
  - status: Complete the activities on this page to unlock Next.
  - region "Two Ways to Bring Ideas Together":
    - paragraph: 01 · Understand and apply · 3 minutes
    - heading "Two Ways to Bring Ideas Together" [level=2]
    - paragraph: Summarizing and synthesizing are related, but they accomplish different things.
    - button "What does it mean to summarize? — Flip card": What does it mean to summarize?
    - button "What does it mean to synthesize? — Flip card": What does it mean to synthesize?
  - button "← Back"
  - button "Next section →" [disabled]
```

# Test source

```ts
  1  | import { expect } from '@playwright/test';
  2  | import { readFileSync } from 'node:fs';
  3  | export const finalManifest = JSON.parse(readFileSync(new URL('../../content/final/lesson.json', import.meta.url)));
  4  | export const finalActivity = id => JSON.parse(readFileSync(new URL(`../../content/final/activities/${id}.json`, import.meta.url)));
  5  | export const finalVisit = async (page, id) => {
  6  |   if (await page.locator('#section-select').isVisible()) await page.locator('#section-select').selectOption(id);
  7  |   else await page.locator(`[data-go="${id}"]`).click();
  8  |   await expect(page.locator(`[data-section-id="${id}"]`)).toBeVisible();
  9  | };
  10 | export async function solveFinal(page, id, { alternatives = true, beforeLast = async () => {} } = {}) {
  11 |   const host = page.locator(`[data-activity-id="${id}"]`), data = finalActivity(id).data;
  12 |   const questions = [], section = finalManifest.sections.findIndex(s => s.gateActivityIds.includes(id));
  13 |   for (const [index, question] of data.questions.entries()) {
  14 |     if (index === data.questions.length - 1) await beforeLast();
  15 |     const correct = host.locator(`[data-option-id="${question.correctOptionId}"]`);
  16 |     await expect(host.locator('.dsl-question-prompt')).toHaveText(question.prompt);
  17 |     await expect(host.locator('.dsl-question-context')).toHaveText(question.context || '');
  18 |     const options = question.options.map((option, i) => `${String.fromCharCode(65 + i)}. ${option.text}`), feedback = [];
  19 |     expect(await host.locator('.dsl-choice').allTextContents()).toEqual(options);
  20 |     if (alternatives) for (const option of question.options.filter(o => o.id !== question.correctOptionId).concat(question.options.filter(o => o.id === question.correctOptionId))) {
  21 |       const button = host.locator(`[data-option-id="${option.id}"]`); await button.focus(); await button.press('Enter');
  22 |       await expect(button).toBeFocused();
  23 |       await expect(host.locator('.dsl-feedback')).toHaveText(option.feedback + (option.id === question.correctOptionId ? '' : ' Try another option.'));
  24 |       feedback.push({ option: question.options.indexOf(option), text: await host.locator('.dsl-feedback').textContent() });
  25 |     }
> 26 |     await correct.focus(); await correct.press('Enter'); await expect(correct).toBeFocused();
     |                                                                                ^ Error: expect(locator).toBeFocused() failed
  27 |     questions.push({ identity: `${section}:${index}`, options, answer: question.options.findIndex(o => o.id === question.correctOptionId), feedback });
  28 |     if (index < data.questions.length - 1) await host.locator('.dsl-question-next').click();
  29 |     else await expect(host.locator('.dsl-question-next')).toBeHidden();
  30 |   }
  31 |   return questions;
  32 | }
  33 | export async function finalJourney(page, checkpoint = async () => {}) {
  34 |   const questions = [], actions = [];
  35 |   const save = async name => checkpoint(name, { raw: await page.evaluate(() => localStorage.getItem('dsl:final:v1')), questions: [...questions], actions: [...actions], url: page.url() });
  36 |   const locked = () => expect(page.locator('#next-section')).toBeDisabled();
  37 |   const unlocked = async () => expect(page.locator('#next-section')).toBeEnabled();
  38 |   await save('fresh');
  39 |   for (const [index, section] of finalManifest.sections.slice(0, -1).entries()) {
  40 |     if (index) await finalVisit(page, section.id);
  41 |     await locked();
  42 |     const view = page.locator(`#view-${index}`);
  43 |     const cards = await view.locator('[data-card-id]').all();
  44 |     for (const [i, card] of cards.entries()) {
  45 |       await locked(); await card.focus(); await card.press('Enter'); actions.push(`explore card ${index}:${i}`);
  46 |       if (index === 0 && i === 0) await save('partial-first');
  47 |     }
  48 |     const panels = await view.locator('summary').all();
  49 |     for (const summary of panels) { await locked(); await summary.click(); await expect(summary.locator('.dsl-panel-explored')).toBeVisible(); }
  50 |     if (index === 3) for (const note of finalActivity('note-classification').data.notes) {
  51 |       await locked(); await view.locator(`[data-note-id="${note.id}"]`).selectOption(note.correctCategoryId);
  52 |     }
  53 |     const questionId = section.gateActivityIds.find(id => id.endsWith('-questions') || id === 'knowledge-check');
  54 |     if (questionId) questions.push(...await solveFinal(page, questionId, { beforeLast: locked }));
  55 |     if (index === 2) {
  56 |       await locked();
  57 |       for (const id of ['synthesis-contributors', 'synthesis-relationship', 'synthesis-recommendation']) await view.locator(`[data-field-id="${id}"]`).fill(`${id}.`);
  58 |       await view.locator('.dsl-assemble').click(); await locked();
  59 |       await expect(view.locator('.dsl-writing-model')).toBeHidden();
  60 |       await view.locator('.dsl-model-toggle').click(); await locked();
  61 |       const checks = await view.locator('[data-check-id]').all();
  62 |       // Even an assembled builder must currently have all source inputs before
  63 |       // initial credit. Fill the final check while one field is blank.
  64 |       await view.locator('[data-field-id="synthesis-contributors"]').fill(' ');
  65 |       for (const check of checks) await check.check();
  66 |       await locked(); await view.locator('[data-field-id="synthesis-contributors"]').fill('Restored source input');
  67 |     }
  68 |     if (index === 7) {
  69 |       await locked(); await view.locator('[data-field-id="closing-draft"]').fill('Synthetic one-sentence draft.');
  70 |       await locked(); await view.locator('.dsl-model-toggle').click();
  71 |       for (const check of await view.locator('[data-check-id]').all()) { await locked(); await check.check(); }
  72 |     }
  73 |     await unlocked();
  74 |     if (index === 2) await save('mid-lesson');
  75 |     if (index === 2) {
  76 |       await view.locator('[data-field-id="synthesis-contributors"]').fill('');
  77 |       await view.locator('[data-check-id]').first().uncheck(); await unlocked();
  78 |     }
  79 |     if (index === 7) { await view.locator('[data-field-id="closing-draft"]').fill(''); await unlocked(); }
  80 |   }
  81 |   await expect(page.locator('[data-reveal-id="completion"]')).toBeVisible();
  82 |   await expect(page.locator('.dsl-summary-score')).toHaveText('Final score: 5 / 5');
  83 |   await expect(page.locator('.dsl-progress-summary')).toContainText('9 of 9 lesson pages complete.');
  84 |   await save('completed');
  85 |   await page.locator('[data-activity-id="knowledge-check"] .dsl-choice').first().click();
  86 |   await unlocked(); await save('correct-ever-then-incorrect');
  87 |   return { questions, actions };
  88 | }
  89 | 
```