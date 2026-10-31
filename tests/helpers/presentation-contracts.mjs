// MIT. One original/current traversal, semantic roles rather than migration captures.
// Original instruction © Rhys Jones, CC BY 4.0; independent original engine is pinned.
import {expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {publicVisit, settle} from './browser-probe.mjs';
export const manifest = id => JSON.parse(readFileSync(new URL(`../../content/${id}/lesson.json`, import.meta.url)));
const activity = (id, name) => JSON.parse(readFileSync(new URL(`../../content/${id}/activities/${name}.json`, import.meta.url)));
const middleFixture = JSON.parse(JSON.parse(readFileSync(new URL('../fixtures/progress/middle/completed.json', import.meta.url))).raw).data.middleState;
export function presentationRecord(id) {
  const raw = JSON.parse(JSON.parse(readFileSync(new URL(`../fixtures/progress/${id}/completed.json`, import.meta.url))).raw);
  if (id === 'final') {raw.data.finalState.quizIndex = Object.fromEntries([...Array(9).keys()].map(i => [i, 0])); raw.data.finalState.selections = {}; raw.data.finalState.answers = {}; raw.data.finalState.panelsOpen = {};}
  if (id === 'middle') raw.data.middleState.selections = {};
  return JSON.stringify(raw);
}
const keys = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'color', 'backgroundColor', 'borderTopWidth', 'borderLeftWidth', 'borderRadius', 'padding', 'boxShadow', 'letterSpacing', 'textTransform'];
const openingPaint = ['display', 'backgroundColor', 'borderTopWidth', 'borderRadius', 'paddingTop', 'paddingLeft', 'fontFamily', 'fontSize', 'fontWeight'];
export const paint = (locator, properties = keys, omitTitleOnly = false) => locator.evaluateAll((nodes, {properties, omitTitleOnly}) => nodes.filter(n => !omitTitleOnly || !(n.children.length === 1 && n.firstElementChild.matches('strong,h3,.dsl-prose-h3') && n.textContent.trim() === n.firstElementChild.textContent.trim())).map(n => {
  const s = getComputedStyle(n), result = Object.fromEntries(properties.map(key => [key, s[key]]));
  for (const side of ['Top', 'Left']) if (properties.includes(`border${side}Width`) && parseFloat(s[`border${side}Width`])) result[`border${side}Color`] = s[`border${side}Color`];
  return result;
}), {properties, omitTitleOnly});
const activate = async locator => {await locator.focus(); await locator.press('Enter');};
const own = (page, name) => page.locator(`[data-activity-id="${name}"]`);
export async function presentationReady(page, timeout = 30_000) {
  // The CDN script can finish navigation before its generated stylesheet exists.
  // Fail explicitly on an unavailable dependency, never compare an unstyled oracle.
  await expect.poll(() => page.evaluate(() => [...document.styleSheets].filter(sheet => !sheet.href).some(sheet => [...sheet.cssRules].some(rule => rule.cssText.includes('--tw-border-spacing-x')))), {message: 'Tailwind stylesheet is ready', timeout}).toBe(true);
  await settle(page);
}

export async function observe(page, id, original, width) {
  const result = {}, sections = manifest(id).sections;
  const capture = async (key, source, current, properties) => {result[key] = await paint(original ? source : current, properties);};
  for (const [index, section] of sections.entries()) {
    // 940px was the old Welcome/rail grouping case, not another full activity
    // matrix. Preserve that coverage without repeating every unrelated section.
    if (id === 'middle' && width === 940 && index !== 0) continue;
    if (original) {
      if (await page.locator('#section-select').isVisible()) await page.locator('#section-select').selectOption(String(index));
      else await page.locator(`[data-go="${index}"]`).click();
    } else await publicVisit(page, section.id);
    const view = page.locator(`#view-${index}`), key = `${section.id}/`;
    await settle(page);
    await capture(key + 'heading-brand', view.locator('h1,h2').first(), view.locator('h1,h2').first(), ['fontFamily', 'color']);
    if (!original && !section.reference) {
      const heading = await view.locator('h1,h2').first().evaluate(n => {const s = getComputedStyle(n); return {size: parseFloat(s.fontSize), weight: s.fontWeight, family: s.fontFamily, line: parseFloat(s.lineHeight), spacing: parseFloat(s.letterSpacing)};});
      const welcome = id !== 'opening' && index === 0;
      expect(heading.size).toBeCloseTo(welcome ? id === 'middle' && width <= 600 ? 37.6 : Math.max(36, Math.min(width * .05, 57.6)) : Math.max(29.6, Math.min(width * .034, 41.6)), 1);
      expect(heading.weight).toBe('700'); expect(heading.family).toContain('Fraunces'); expect(heading.line / heading.size).toBeCloseTo(1.17, 3); expect(heading.spacing / heading.size).toBeCloseTo(-.035, 3);
    }
    if (section.reference) {
      await capture(key + 'reference-heading', view.locator('h1,h2').first(), view.locator('h1,h2').first(), ['fontFamily', 'fontSize', 'lineHeight', 'color']);
      continue; // semantic print/reference suites own full reference layouts.
    }

    // The old all-paragraph contract belongs to Middle, not Opening/Final.
    // Other lessons retain their explicitly measured roles below; introducing an
    // exact container-inheritance requirement would not be an assertion port.
    if (id === 'middle') {
      if (original) result[key + 'prose'] = await view.locator('p').evaluateAll(nodes => Object.fromEntries(nodes.map(n => {const s = getComputedStyle(n); return [n.textContent.replace(/\s+/g, ' ').trim(), [s.fontFamily, s.fontSize, s.fontWeight, s.lineHeight, s.color]];})));
      else result[key + 'prose'] = await view.locator('.dsl-prose-lead p,.dsl-prose-note p,.dsl-prose-instruction p,.dsl-prose-label p').evaluateAll(nodes => Object.fromEntries(nodes.map(n => {const s = getComputedStyle(n); return [n.textContent.replace(/\s+/g, ' ').trim(), [s.fontFamily, s.fontSize, s.fontWeight, s.lineHeight, s.color]];})));
    }

    if (id === 'final') {
      await capture(key + 'eyebrow', view.locator(':scope>p').first(), view.locator(':scope>p').first(), ['fontFamily', 'fontSize', 'fontWeight', 'color']);
      await capture(key + 'lead', view.locator(':scope>p.muted').first(), view.locator('.dsl-prose-lead').first(), ['fontSize', 'color']);
      const surface = ['backgroundColor', 'borderLeftWidth', 'borderRadius'];
      await capture(key + 'surfaces', view.locator('.card:not(.activity)'), view.locator('.dsl-tone-callout'), surface);
      await capture(key + 'speakers', view.locator('.speaker'), view.locator('.dsl-layout-roundtable .dsl-content-block > div > p'), surface);
      // The original quiz also generates notices, which are measured as question
      // contexts below. Only authored caution blocks belong in this role.
      // Original contexts are generated inside #quiz-N; they are not authored
      // section cautions (the old loop intentionally measured current cautions).
      await capture(key + 'cautions', view.locator('.notice').filter({hasNot: page.locator('xpath=ancestor::*[starts-with(@id,"quiz-")]')}), view.locator('.dsl-tone-caution'), surface);
    }
    if (id === 'opening') await capture(key + 'surfaces', view.locator('.card'), view.locator('.dsl-tone-activity,.dsl-tone-soft,.dsl-sequence-opening-knowledge-check .dsl-question,.dsl-quiz-summary,.card'), openingPaint);
    if (id === 'middle' && index === 0) {
      await capture(key + 'callout', view.locator(':scope>.panel'), view.locator(':scope>.dsl-tone-callout'));
      await capture(key + 'flow', view.locator('.flow span'), view.locator('.dsl-layout-flow .dsl-content-block > div > p'));
    }

    const cards = await view.locator(original ? id === 'middle' ? '.flip-card' : '.flip' : '.dsl-card').all();
    for (const [n, card] of cards.entries()) {
      if (original && (await card.getAttribute('aria-pressed') === 'true' || /(?:^| )flipped(?: |$)/.test(await card.getAttribute('class')))) await activate(card);
      const front = card.locator(original ? '.flip-front' : '.dsl-card-front'), back = card.locator(original ? '.flip-back' : '.dsl-card-back');
      const faceProperties = ['fontFamily', 'fontSize', 'lineHeight', 'color', 'backgroundColor'];
      result[key + `card-${n}-front`] = await paint(front, faceProperties);
      if (id === 'middle') for (const side of ['front', 'back']) {
        if (side === 'back') await activate(card);
        await settle(page); const face = side === 'front' ? front : back;
        result[key + `card-${n}-${side}-title`] = await paint(face.locator(original ? 'h3,strong,.pill' : '.dsl-card-title,.dsl-prose-h3,strong'));
        // A Markdown paragraph containing only the title is already measured in
        // the title role above; it is not an additional body paragraph.
        if (index !== 5) result[key + `card-${n}-${side}-copy`] = await paint(face.locator(original ? ':scope>p,:scope>ul>li' : '.dsl-prose-p,[role="listitem"]'), index === 0 ? ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'color'] : keys, true);
      } else {await activate(card); await settle(page);}
      result[key + `card-${n}-back`] = await paint(back, [...faceProperties, 'fontWeight']);
      if (!original) {
        await expect(card.locator('.dsl-card-back')).toHaveAttribute('aria-hidden', 'false');
        expect(await card.evaluate(n => n.scrollWidth <= n.clientWidth + 1 && n.scrollHeight <= n.clientHeight + 2)).toBe(true);
        if (id === 'final') {
          await expect(front).toHaveCSS('font-weight', '400'); await expect(front).toHaveCSS('font-size', '16px');
          await expect(front).toHaveCSS('border-radius', '15px');
          const metrics = await front.evaluate(n => {const s = getComputedStyle(n); return {line: parseFloat(s.lineHeight), padding: [s.paddingTop, s.paddingRight, s.paddingBottom, s.paddingLeft].map(parseFloat)};});
          expect(metrics.line).toBeCloseTo(24.8, 4); metrics.padding.forEach((v, i) => expect(v).toBeCloseTo([65.6, 20, 65.6, 20][i], 4));
        }
        await activate(card); await settle(page); await expect(card.locator('.dsl-card-front > .dsl-card-explored')).toBeVisible();
        await expect(card.locator('.dsl-card-hint')).toBeVisible();
        expect(await card.getAttribute('aria-label')).not.toContain('Explored');
        const cues = await card.evaluate(card => {const front = card.querySelector('.dsl-card-front'), a = front.querySelector('.dsl-card-explored').getBoundingClientRect(), b = front.querySelector('.dsl-card-hint').getBoundingClientRect(), face = front.getBoundingClientRect(); return {inside: a.left >= face.left && a.right <= face.right + 1 && a.bottom <= face.bottom + 1, separate: a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top};});
        expect(cues).toEqual({inside: true, separate: true});
      }
    }

    const panels = await view.locator(original ? 'details' : 'details.dsl-expandable').all();
    for (const [n, panel] of panels.entries()) {
      if (await panel.evaluate(n => n.open)) await activate(panel.locator('summary'));
      result[key + `panel-${n}-closed`] = await paint(panel, ['backgroundColor', 'borderLeftWidth', 'borderRadius']);
      result[key + `panel-${n}-summary`] = await paint(panel.locator('summary'));
      await activate(panel.locator('summary')); await expect(panel).toHaveJSProperty('open', true);
      if (id === 'final') result[key + `panel-${n}-body`] = await paint(panel.locator(original ? '.inner' : '.dsl-expandable-body'), ['fontFamily', 'fontSize', 'lineHeight', 'color']);
      result[key + `panel-${n}-examples`] = await paint(panel.locator(original ? '.example,.caution' : 'blockquote'));
      if (!original) {await expect(panel.locator('.dsl-panel-explored')).toBeVisible(); if (await panel.locator('.dsl-rich-prose').count()) await expect(panel.locator('.dsl-rich-prose').first()).toHaveCSS('white-space', 'normal');}
    }

    if (id === 'final' && index === 3) {
      for (const [n, note] of activity(id, 'note-classification').data.notes.entries()) {
        const input = view.locator(original ? `#note-${n}` : `[data-note-id="${note.id}"]`);
        result[key + `note-${n}`] = await paint(input, ['fontFamily', 'fontSize', 'color', 'backgroundColor', 'borderLeftWidth', 'borderRadius']); result[key + `note-${n}-row`] = await paint(input.locator('..'), ['backgroundColor', 'borderLeftWidth', 'borderRadius']); result[key + `note-${n}-label`] = await paint(input.locator('..').locator('label'), ['fontSize', 'fontWeight', 'color']);
        // Reset note state in the supplied record; wrong then correct/disabled is observable.
        const categories = activity(id, 'note-classification').data.categories, good = categories.findIndex(c => c.id === note.correctCategoryId), wrong = good ? 0 : 1;
        await input.selectOption(original ? String(wrong) : categories[wrong].id); await expect(input).toBeEnabled();
        result[key + `note-${n}-wrong-status`] = await input.locator('..').locator('[role=status]').textContent();
        await input.selectOption(original ? String(good) : note.correctCategoryId); await expect(input).toBeDisabled(); result[key + `note-${n}-right`] = await paint(input, ['color', 'backgroundColor']);
      }
    }

    const writing = id === 'middle' ? {2: ['evidence-writing', ['source', 'finding', 'why'], '#research-model'], 6: ['integrated-writing', ['application-draft'], '#application-model']}[index]
      : id === 'final' ? {2: ['synthesis-writing', ['build-1', 'build-2', 'build-3'], '#builder-model'], 7: ['closing-writing', ['closing-text'], '#closing-model']}[index] : null;
    if (writing) {
      const [name, fields, oldModel] = writing, data = activity(id, name).data, host = original ? view : own(page, name);
      for (const [n, field] of fields.entries()) result[key + `writing-${n}`] = await paint(original ? view.locator(`#${field}`) : host.locator(`[data-field-id="${data.fields[n].id}"]`), id === 'final' ? ['fontFamily', 'fontSize', 'backgroundColor', 'borderLeftWidth', 'borderRadius'] : keys);
      result[key + 'model'] = await paint(original ? view.locator(oldModel) : host.locator('.dsl-writing-model'), id === 'final' ? ['backgroundColor', 'borderLeftWidth', 'borderRadius'] : keys);
      if (id === 'middle') {
        if (index === 6) {
          await capture(key + 'writing-panel', view.locator('.activity:has(#application-draft)'), view.locator('.dsl-tone-activity:has([data-activity-id="integrated-writing"])'));
          await capture(key + 'writing-title', view.locator('.activity:has(#application-draft) h3').first(), view.locator('.dsl-tone-activity:has([data-activity-id="integrated-writing"]) h3').first());
        }
        for (const [n, field] of data.fields.entries()) await capture(key + `writing-label-${n}`, view.locator(`label[for="${fields[n]}"]`), host.locator('.dsl-field-label').nth(n));
        if (index === 2) {
          for (const [n, value] of ['Synthetic source, October 2026', 'Synthetic finding', 'Synthetic connection'].entries()) await (original ? view.locator(`#${fields[n]}`) : host.locator(`[data-field-id="${data.fields[n].id}"]`)).fill(value);
          await activate(original ? view.locator('#assemble-button') : host.locator('.dsl-assemble'));
          result[key + 'assembled-value'] = await (original ? view.locator('#assembled') : host.locator(`[data-field-id="${data.output.id}"]`)).inputValue();
          result[key + 'assembly-notice'] = await (original ? view.locator('#assembly-status') : host.locator('.dsl-writing-status')).textContent();
          await capture(key + 'assembly-status', view.locator('#assembly-status'), host.locator('.dsl-writing-status'));
        }
        const oldButtons = index === 2 ? ['#assemble-button', '#assembly-copy-button', '#research-model-button'] : ['#application-model-button'];
        const newButtons = index === 2 ? ['.dsl-assemble', '.dsl-copy', '.dsl-model-toggle'] : ['.dsl-model-toggle'];
        for (let n = 0; n < oldButtons.length; n++) result[key + `writing-button-${n}`] = await paint(original ? view.locator(oldButtons[n]) : host.locator(newButtons[n]));
        result[key + 'writing-check'] = await paint(original ? view.locator(index === 2 ? '#research-checks input' : '#application-checks input') : own(page, index === 2 ? 'research-checklist' : 'application-checklist').locator('input'), ['width', 'height', 'accentColor']);
      }
    }

    if (id === 'middle') await middleQuestions(page, index, original, key, result);
    if (id === 'final' && index > 0 && index < 9) await finalQuestions(page, index, original, key, result);
    if (id === 'opening') await openingStates(page, index, original, key, result);
    if (id === 'middle' && index === 3) await capture(key + 'roundtable', view.locator('#group-activity>.panel'), view.locator('[data-reveal-id="group-activity"]>.dsl-tone-callout'));
    if (!original) await checkComposition(page, id, index, width);
    if (!original) expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${id}/${section.id}/${width}`).toBe(true);
  }
  return result;
}

async function finalQuestions(page, index, original, key, result) {
  const id = index === 8 ? 'knowledge-check' : `${manifest('final').sections[index].id}-questions`, data = activity('final', id).data;
  const host = original ? page.locator(`#quiz-${index}`) : own(page, id), panel = original ? host : host.locator('xpath=../../..');
  result[key + 'question-panel'] = await paint(panel, ['backgroundColor', 'borderLeftWidth', 'borderRadius']);
  result[key + 'question-title'] = await paint(host.locator(original ? 'h3' : '.dsl-sequence-heading'), ['fontFamily', 'fontSize', 'color']);
  for (const [n, q] of data.questions.entries()) {
    result[key + `prompt-${n}`] = await paint(host.locator(original ? 'p.font-bold' : '.dsl-question-prompt'), ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'color']);
    if (q.context) result[key + `context-${n}`] = await paint(host.locator(original ? '.notice' : '.dsl-question-context'), ['backgroundColor', 'borderLeftWidth', 'borderRadius']);
    const correct = q.options.findIndex(o => o.id === q.correctOptionId), wrong = correct ? 0 : 1;
    for (const [step, option] of [wrong, correct, wrong, correct].entries()) {
      const button = host.locator(original ? '.choice' : '.dsl-choice').nth(option); await activate(button);
      await expect(button).toHaveAttribute('aria-pressed', 'true'); await settle(page);
      result[key + `choice-${n}-${step}`] = await paint(button, ['backgroundColor', 'borderLeftWidth', 'color', 'fontWeight']);
      result[key + `feedback-${n}-${step}`] = await paint(host.locator(original ? '.feedback' : '.dsl-feedback'), ['backgroundColor', 'borderLeftWidth', 'color']);
    }
    if (n < data.questions.length - 1) await activate(host.getByRole('button', {name: 'Next question →', exact: true}));
  }
}

async function middleQuestions(page, index, original, key, result) {
  const specs = {1: ['classification', 'classify', '#s1-activity', '[data-reveal-id="classification"]'], 2: ['research', 'research', '#research-activity', '[data-reveal-id="research-activity"]'],
    3: ['group-decisions', 'group', '#group-activity', '[data-reveal-id="group-activity"]'], 4: ['communication-diagnosis', 'communication', '#communication-activity', '[data-reveal-id="communication-activity"]'],
    5: ['speaking-simulator', 'speaking', '#speaking-activity', '[data-reveal-id="speaking-activity"]'], 7: ['knowledge-check', 'quiz', '.activity:has(#quiz-options)', '.dsl-question-panel']};
  if (index === 6) {
    const data = activity('middle', 'application').data.questions;
    for (const [n, q] of data.entries()) {
      const host = original ? page.locator(`.activity:has(#application-${n ? 'b' : 'a'}-options)`) : own(page, 'application').locator(`[data-question-id="${q.id}"]`);
      result[key + `application-${n}/panel`] = await paint(host);
      await middleChoice(page, host, original, key + `application-${n}/`, result, q, original ? '.option' : '.dsl-choice');
    }
    return;
  }
  if (!specs[index]) return;
  const [name, prefix, oldPanel, newPanel] = specs[index], data = activity('middle', name).data, host = original ? page.locator(oldPanel) : own(page, name);
  result[key + 'activity-panel'] = await paint(original ? host : page.locator(newPanel));
  result[key + 'activity-title'] = await paint(original ? host.locator(':scope>h3').first() : index === 7 ? host.locator('.dsl-question-counter') : page.locator(newPanel).locator('h3').first());
  if (index === 2) result[key + 'research-caution'] = await paint(original ? host.locator(':scope>.caution') : page.locator(newPanel + '>.dsl-tone-caution'));
  // The old Middle paint suites used the completed fixture's current question
  // per profile. Exact feedback/options/cursors for EVERY question remain in the
  // independent public question suite; repeating them here adds no old paint role.
  const questions = data.questions ? [data.questions[index === 7 ? middleFixture.quizIndex : middleFixture.positions[prefix]]] : [data];
  for (const [n, q] of questions.entries()) {
    await middleChoice(page, host, original, key + `question-${n}/`, result, q, original ? '.option' : '.dsl-choice', prefix);
  }
  if (index === 7) {
    result[key + 'overview'] = await paint(original ? page.locator('#view-7>.panel') : page.locator('.dsl-question-overview'));
    result[key + 'quiz-score'] = await paint(original ? page.locator('#quiz-score') : page.locator('.dsl-question-overview>.dsl-question-score'));
    // The old contract measured the first, noncurrent jump. The shared API also
    // supplies an active-question cue (covered by navigation/ARIA assertions),
    // which the source did not paint; it is not part of that neutral-role oracle.
    if (original) await activate(page.locator('#quiz-status button').last()); else await activate(page.locator('.dsl-question-jump').last());
    await page.mouse.move(0, 0);
    result[key + 'quiz-jumps'] = await paint(original ? page.locator('#quiz-status button').first() : page.locator('.dsl-question-jump').first());
  }
}
async function middleChoice(page, host, original, key, result, question, choiceSelector, prefix) {
  const choices = host.locator(choiceSelector), good = question.options.findIndex(o => o.id === question.correctOptionId), wrong = good ? 0 : 1;
  await page.mouse.move(0, 0);
  result[key + 'prompt'] = await paint(original ? host.locator(prefix ? `#${prefix}-question,p.font-bold` : ':scope>h3').first() : host.locator('.dsl-question-prompt'));
  result[key + 'neutral'] = await paint(choices.nth(wrong));
  for (const [step, n] of [good, wrong, good].entries()) {
    await activate(choices.nth(n));
    await expect(choices.nth(n)).toHaveAttribute('aria-pressed', 'true'); await settle(page);
    result[key + `choice-${step}`] = await paint(choices.nth(n)); result[key + `feedback-${step}`] = await paint(host.locator(original ? '.feedback' : '.dsl-feedback'));
  }
  if (prefix && prefix !== 'research') {
    result[key + 'next'] = await paint(original ? page.locator(`#${prefix}-next`) : host.locator('.dsl-question-next'));
    if (prefix !== 'quiz') result[key + 'score'] = await paint(original ? page.locator(`#${prefix}-count`) : host.locator('.dsl-question-score'));
  }
}
async function openingStates(page, index, original, key, result) {
  const view = page.locator(`#view-${index}`);
  if (index === 0) {
    const choices = view.locator(original ? '.classify-answer' : '.dsl-choice'); await activate(choices.nth(1));
    if (!original) await expect(choices.nth(1)).toHaveClass(/dsl-selected-incorrect/);
    await activate(choices.first()); if (!original) await expect(choices.first()).toHaveClass(/dsl-selected-correct/);
    await view.locator('#classify-next').click(); await expect(view.locator('#classify-counter')).toHaveText('STATEMENT 2 OF 5');
  }
  if (index === 1) {
    result[key + 'timeline-closed'] = await paint(view.locator('.timeline-toggle'), openingPaint);
    for (let n = 1; n <= 6; n++) {const control = view.locator(`[aria-controls="stage-${n}"]`); await activate(control); await expect(control).toHaveAttribute('aria-expanded', 'true'); await expect(view.locator(`#stage-${n}`)).toBeVisible();}
    result[key + 'timeline-open'] = await paint(view.locator('.timeline-toggle'), openingPaint);
    for (const n of [0, 1, 2]) await view.locator('.sequence-choices button').nth(n).click();
    if (!original) {await expect(view.locator('.sequence-choices .dsl-selected-incorrect')).toHaveCount(1); await expect(view.locator('.dsl-panel-explored')).toHaveCount(6);}
  }
  if (index === 2) {
    result[key + 'tabs'] = await paint(view.locator('.analysis-tab'), openingPaint);
    for (const kind of ['who', 'what', 'how', 'where', 'terms']) {const tab = view.locator(`.analysis-tab[data-kind="${kind}"]`); await activate(tab); await expect(tab).toHaveAttribute('aria-selected', 'true'); await expect(tab).toHaveCSS('background-color', 'rgb(20, 43, 73)'); expect(await view.locator('.task-mark.on').evaluateAll(nodes => nodes.map(n => n.dataset.kind))).toEqual({who: ['who'], what: ['what'], how: ['how', 'how'], where: ['where', 'where'], terms: ['who', 'what']}[kind]);}
  }
  if ([2, 3, 5].includes(index)) {
    const choices = view.locator(`#${{2: 'what-how', 3: 'clarification', 5: 'research'}[index]}-options button`);
    for (const n of [0, index === 2 ? 0 : index === 3 ? 1 : 2, index === 2 ? 1 : 0]) await activate(choices.nth(n));
  }
  if (index === 4) {await view.locator('#show-model').click(); await expect(view.locator('#model-answer')).toBeVisible(); result[key + 'model'] = await paint(view.locator('#model-answer')); await view.locator('#show-model').click(); await expect(view.locator('#model-answer')).toBeHidden();}
  if (index === 6) {await view.locator('#quiz-list article').first().locator('button').first().click(); await expect(view.locator('#quiz-score')).toHaveText('Knowledge check: 5 of 5 correct.');}
}

async function checkComposition(page, id, index, width) {
  const view = page.locator(`#view-${index}`);
  if (id !== 'middle') return;
  if (index === 0) {
    const tops = await view.locator('.dsl-card').evaluateAll(nodes => nodes.map(n => n.getBoundingClientRect().top));
    expect(new Set(tops).size).toBe(width > 850 ? 1 : 3);
    for (const card of await view.locator('.dsl-card').all()) {
      expect(await card.evaluate(card => {const face = card.querySelector('.dsl-card-front').getBoundingClientRect(), title = card.querySelector('.dsl-card-front .dsl-prose-h3').getBoundingClientRect(); return Math.abs(title.top + title.height / 2 - face.top - face.height / 2);})).toBeLessThan(2);
      const gaps = await card.locator('.dsl-card-back [role="listitem"]').evaluateAll(nodes => nodes.slice(1).map((n, i) => n.getBoundingClientRect().top - nodes[i].getBoundingClientRect().bottom));
      expect(gaps.every(gap => Math.abs(gap) < 1)).toBe(true);
    }
  }
  for (const card of await view.locator('.dsl-card').all()) for (const side of ['front', 'back']) {
    const face = card.locator(`.dsl-card-${side}`);
    if (await face.locator(':scope>.dsl-card-content>.dsl-card-title').count()) expect(await face.evaluate(n => n.querySelector('.dsl-card-title').getBoundingClientRect().bottom - n.querySelector('.dsl-card-copy').getBoundingClientRect().top)).toBeLessThan(1 / 64);
  }
  if (index === 1) {
    const group = own(page, 'classification'), tops = await group.locator('.dsl-choice').evaluateAll(nodes => nodes.map(n => n.getBoundingClientRect().top));
    expect(tops[0] === tops[1]).toBe(width > 600); await expect(group.locator('.dsl-question-counter')).toBeHidden();
  }
  if (index === 2) {
    const writer = own(page, 'evidence-writing');
    expect(await writer.evaluate(n => {const output = n.querySelector('[data-field-id="evidence-output"]'); return [...n.querySelectorAll('.dsl-writing-actions button')].every(button => !!(button.compareDocumentPosition(output) & Node.DOCUMENT_POSITION_FOLLOWING));})).toBe(true);
    await expect(writer.locator('[data-field-id="evidence-output"]')).toHaveAttribute('readonly', '');
  }
  if (index === 3) await expect(own(page, 'collaboration-panels').locator('blockquote').first().locator('br')).toHaveCount(3);
  if (index === 4) {
    const lefts = await own(page, 'communication-panels').locator('blockquote').evaluateAll(nodes => nodes.map(n => n.getBoundingClientRect().left));
    expect(lefts[0] === lefts[1]).toBe(width <= 600);
  }
  if (index === 7) await expect(page.locator('.dsl-tone-activity,.dsl-question-panel,.dsl-sequence-middle-application .dsl-question')).toHaveCount(9);
}

export function compare(actual, expected) {
  for (const [key, value] of Object.entries(actual)) {
    if (key.endsWith('/prose')) {for (const [text, style] of Object.entries(value)) expect.soft(style, `${key}${text}`).toEqual(expected[key][text]);}
    else expect.soft(value, key).toEqual(expected[key]);
  }
  // Current side must not silently omit a source role or an entire activity.
  expect.soft(Object.keys(actual).sort()).toEqual(Object.keys(expected).sort());
}
