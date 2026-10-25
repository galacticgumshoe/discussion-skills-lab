import { expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
export const lessons = ['opening', 'middle', 'final'];
export const maps = Object.fromEntries(lessons.map(id => [id, JSON.parse(readFileSync(new URL(`../fixtures/legacy-maps/${id}.json`, import.meta.url)))]));
export const banks = JSON.parse(readFileSync(new URL('../fixtures/content/banks.json', import.meta.url)));
export const draft = 'Synthetic practice — “cost & access.”\nConnect Maya’s idea; café ✓';

export async function ready(page) {
  await expect(page.locator('#rail-links [data-go="0"]')).toBeEnabled();
  await expect(page.locator('#view-0')).toBeVisible();
}
export async function navigate(page, index) {
  if (await page.locator('#section-select').isVisible()) await page.locator('#section-select').selectOption(String(index));
  else await page.locator(`[data-go="${index}"]`).click();
  await expect(page.locator(`#view-${index}`)).toBeVisible();
}
export async function rawProgress(page, id) {
  return page.evaluate(key => localStorage.getItem(key), maps[id].storageKey);
}

// All earned state is produced by actual controls. No lesson.complete, injected state,
// hidden-control clicks, or script patching. Checkpoint callbacks only read storage.
export async function runLesson(page, id, checkpoint = async () => {}) {
  const actions = [], questions = [];
  const click = async selector => { actions.push(`click ${selector}`); await page.locator(selector).click(); };
  const fill = async (selector, value) => { actions.push(`fill ${selector} ${JSON.stringify(value)}`); await page.locator(selector).fill(value); };
  const check = async selector => { actions.push(`check ${selector}`); await page.locator(selector).check(); };
  const save = async name => checkpoint(name, { raw: await rawProgress(page, id), actions: [...actions], questions: [...questions], url: page.url() });
  const locked = async () => expect(page.locator('#next-section')).toBeDisabled();
  const next = async () => { await expect(page.locator('#next-section')).toBeEnabled(); await click('#next-section'); };
  const cards = async selector => {
    const count = await page.locator(selector).count();
    for (let i = 0; i < count; i++) {
      const card = page.locator(selector).nth(i);
      await expect(card).toBeVisible();
      actions.push(`activate ${selector} index ${i}`);
      if (i === 0) {
        await card.focus(); await card.press('Enter');
        await expect(card).toHaveAttribute('aria-pressed', 'true');
        await card.press(' ');
        await expect(card).toHaveAttribute('aria-pressed', 'false');
        await card.click();
      } else await card.click();
      if (i === 0 && selector.includes('view-0')) await save('partial-first');
      if (i < count - 1 && selector.includes('view-0')) await locked();
    }
  };
  const details = async selector => {
    for (let i = 0; i < await page.locator(selector).count(); i++) {
      const summary = page.locator(selector).nth(i).locator('summary');
      actions.push(`open ${selector} index ${i}`);
      await summary.click();
      await expect(page.locator(selector).nth(i)).toHaveAttribute('open', '');
      if (i === 0) { await summary.click(); await summary.click(); }
    }
  };
  const question = async (selector, options, answer, identity, feedbackSelector) => {
    const buttons = page.locator(selector);
    const expected = id === 'final' ? options.map((s, i) => `${String.fromCharCode(65 + i)}. ${s}`) : options;
    expect(await buttons.allTextContents()).toEqual(expected);
    const feedback = [];
    // Explore every alternative; correct-ever and latest selection are independent.
    for (const option of [...options.keys()].filter(n => n !== answer).concat(answer)) {
      actions.push(`answer ${identity} option ${option}`);
      await page.locator(selector).nth(option).click();
      if (feedbackSelector) {
        await expect(page.locator(feedbackSelector)).toBeVisible();
        feedback.push({ option, text: await page.locator(feedbackSelector).textContent() });
      }
      if (!identity.startsWith('classification')) {
        await expect(page.locator(selector).nth(option)).toHaveAttribute('aria-pressed', 'true');
        await expect(page.locator(selector).locator('..').first().locator('[aria-pressed="true"]')).toHaveCount(1);
      }
    }
    questions.push({ identity, options: expected, answer, feedback });
  };

  await ready(page); await locked(); await save('fresh');
  if (id === 'opening') {
    for (let i = 0; i < banks.opening.classification.length; i++) {
      const item = banks.opening.classification[i];
      await expect(page.locator('#classify-statement')).toHaveText(item.text);
      await question('.classify-answer', ['Procedural', 'Substantive'], item.answer === 'procedural' ? 0 : 1, `classification-${i}`, '#classify-feedback');
      if (i === 0) await save('partial-first');
      if (i < 4) { await locked(); await click('#classify-next'); }
    }
    await next();
    await click('.sequence-choices button[data-correct="true"]');
    for (let i = 0; i < 6; i++) {
      if (i === 5) await locked();
      await click(`[aria-controls="stage-${i + 1}"]`);
      if (i === 0) { await click('[aria-controls="stage-1"]'); await click('[aria-controls="stage-1"]'); }
    }
    await next();
    for (const kind of ['who', 'what', 'how', 'where', 'terms']) await click(`.analysis-tab[data-kind="${kind}"]`);
    await locked();
    for (const [key, item] of Object.entries(banks.opening.practice)) {
      if (key === 'research') continue;
      await question(`#${item.container} button`, item.options, item.correct, key, `#${item.feedback}`);
      await next();
    }
    await fill('#problem-input', 'mental health stigma?!');
    await fill('#accomplishment-input', 'crafted a counselor plan.');
    await click('#question-builder button[type="submit"]');
    await expect(page.locator('#draft-input')).toHaveValue('By the end of this discussion, will the group agree that we have crafted a counselor plan to address mental health stigma?');
    await expect(page.locator('#draft-input')).not.toHaveAttribute('readonly');
    await fill('#draft-input', 'x'.repeat(34)); await check('#question-selfcheck'); await locked();
    await save('boundary-below');
    await fill('#draft-input', 'x'.repeat(35)); await save('boundary-at');
    await fill('#draft-input', draft); await save('mid-lesson');
    await next();
    const item = banks.opening.practice.research;
    await locked(); await question('#research-options button', item.options, item.correct, 'research', '#research-feedback');
    await next();
    for (let i = 0; i < banks.opening.quiz.length; i++) {
      if (i === 4) await locked();
      const q = banks.opening.quiz[i];
      await question(`#quiz-list article:nth-child(${i + 1}) button`, q.options, q.correct, `quiz-${i}`, `#quiz-list article:nth-child(${i + 1}) [role=status]`);
    }
    await save('completed');
    await click('#quiz-list article:first-child button:first-child');
  }
  if (id === 'middle') {
    await cards('#view-0 .flip-card'); await next();
    await cards('#view-1 .flip-card');
    const sequence = async (key, data) => {
      for (let i = 0; i < data.length; i++) {
        const q = data[i];
        if (i === data.length - 1) await locked();
        await expect(page.locator(`#${key}-question`)).toContainText(q.q);
        await question(`#${key}-options button`, q.options || ['Procedural', 'Substantive'], q.answer, `${key}-${i}`, `#${key}-feedback`);
        if (i < data.length - 1) await click(`#${key}-next`);
      }
    };
    await sequence('classify', banks.middle.classification); await next();
    await details('#evidence-details details'); await cards('#view-2 .flip-card');
    await question('#research-options button', banks.middle.research.map(q => q.text), 1, 'research', '#research-feedback');
    await fill('#source', 'fictional Survey, May 2025'); await fill('#finding', 'A finding...'); await fill('#why', 'access..');
    await click('#assemble-button');
    await expect(page.locator('#assembled')).toHaveValue('According to fictional Survey, May 2025, A finding. This matters to our task because access.');
    await expect(page.locator('#assembled')).toHaveAttribute('readonly', '');
    for (let i = 0; i < 4; i++) { if (i === 3) await locked(); await check(`#research-check-${i}`); }
    await save('mid-lesson'); await next();
    await details('#collaboration-details details'); await sequence('group', banks.middle.group); await next();
    await details('#communication-details details'); await sequence('communication', banks.middle.communication); await next();
    await details('#strategy-details details'); await cards('#view-5 .flip-card'); await sequence('speaking', banks.middle.speaking); await next();
    for (const [n, suffix] of ['a', 'b'].entries()) {
      const q = banks.middle.applications[n];
      await question(`#application-${suffix}-options button`, q.options, q.answer, `application-${suffix}`, `#application-${suffix}-feedback`);
    }
    await fill('#application-draft', draft);
    for (let i = 0; i < 5; i++) { if (i === 4) await locked(); await check(`#application-check-${i}`); }
    await next();
    for (let i = 0; i < banks.middle.questions.length; i++) {
      if (i === 4) await locked();
      const q = banks.middle.questions[i];
      await expect(page.locator('#quiz-question')).toHaveText(q.q);
      await question('#quiz-options button', q.options, q.answer, `quiz-${i}`, '#quiz-feedback');
      if (i < 4) await click('#quiz-next');
    }
    await save('completed'); await click('#quiz-options button:first-child');
  }
  if (id === 'final') {
    await cards('#view-0 .flip'); await next();
    const quiz = async p => {
      for (let i = 0; i < banks.final.questions[p].length; i++) {
        const q = banks.final.questions[p][i];
        if (i === banks.final.questions[p].length - 1) await locked();
        await expect(page.locator(`#quiz-${p} .font-bold`)).toHaveText(q.q);
        await question(`#quiz-${p} .choice`, q.a, q.correct, `${p}:${i}`, `#quiz-${p} [role=status]`);
        if (i < banks.final.questions[p].length - 1) await click(`#quiz-${p} button.btn.primary`);
      }
    };
    await cards('#view-1 .flip'); await locked(); await quiz(1); await next();
    await details('#view-2 details'); await quiz(2);
    await fill('#build-1', 'Maya and Jordan.'); await fill('#build-2', 'Costs affect access!'); await fill('#build-3', 'We propose a pilot.');
    await click('#assemble');
    await expect(page.locator('#assembled')).toHaveValue('Building on Maya and Jordan, costs affect access. Therefore, we propose a pilot.');
    await expect(page.locator('#assembled')).not.toHaveAttribute('readonly');
    await locked(); await click('#model-builder-button');
    for (let i = 0; i < 5; i++) { if (i === 4) await locked(); await page.locator('#checklist-2 input').nth(i).check(); actions.push(`check synthesis ${i}`); }
    await save('mid-lesson'); await next();
    await details('#view-3 details');
    for (let i = 0; i < banks.final.notes.length; i++) {
      actions.push(`categorize note ${i} as ${banks.final.notes[i][1]}`);
      await page.locator(`#note-${i}`).selectOption(String(banks.final.notes[i][1]));
      await expect(page.locator(`#note-${i}`)).toBeDisabled();
    }
    await locked(); await quiz(3); await next();
    await cards('#view-4 .flip'); await locked(); await quiz(4); await next();
    await details('#view-5 details'); await locked(); await quiz(5); await next();
    await details('#view-6 details'); await locked(); await quiz(6); await next();
    await quiz(7); await fill('#closing-text', draft); await locked(); await click('#show-closing');
    for (let i = 0; i < 6; i++) { if (i === 5) await locked(); await page.locator('#checklist-7 input').nth(i).check(); actions.push(`check closing ${i}`); }
    await next(); await locked(); await quiz(8); await save('completed');
    await click('#quiz-8 .choice:first-child');
  }
  await expect(page.locator('#next-section')).toBeEnabled();
  await save('correct-ever-then-incorrect');
  await next();
  await expect(page.locator('#previous-section')).toBeHidden();
  await expect(page.locator('#next-section')).toBeHidden();
  expect(JSON.parse(await rawProgress(page, id)).completed).toHaveLength(maps[id].countedPages);
  return { actions, questions };
}
