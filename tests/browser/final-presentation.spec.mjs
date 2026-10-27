// Exact content/policy checks live independently in final-migration/final-lesson.
// Compare painted roles, not invisible border colors or exact screenshot pixels.
import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { finalActivity as activity } from '../helpers/final-journey.mjs';
const map = JSON.parse(readFileSync(new URL('../fixtures/legacy-maps/final.json', import.meta.url)));
const fixture = JSON.parse(JSON.parse(readFileSync(new URL('../fixtures/progress/final/completed.json', import.meta.url))).raw);
const norm = text => text.replace(/\s+/g, ' ').trim();
const settled = page => page.evaluate(async () => { await document.fonts.ready; await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))); });
const paint = locator => locator.evaluate(node => {
  const s = getComputedStyle(node), result = {};
  for (const key of ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'color', 'backgroundColor', 'borderTopWidth', 'borderLeftWidth', 'borderRadius']) result[key] = s[key];
  if (parseFloat(s.borderLeftWidth)) result.borderLeftColor = s.borderLeftColor;
  return result;
});
const equalPaint = async (current, baseline, keys) => {
  const [a, b] = await Promise.all([paint(current), paint(baseline)]);
  for (const key of keys) expect(a[key], `${key}: ${await current.getAttribute('class')}`).toBe(b[key]);
};
for (const mount of ['/', '/discussion-skills-lab/']) for (const width of [1440, 780, 390]) for (let index = 0; index < 10; index++) {
  test(`${mount} Final section ${index} all presentation roles/states at ${width}px`, async ({ page, context }, info) => {
    await page.setViewportSize({ width, height: 1000 }); const baseline = await context.newPage(); await baseline.setViewportSize({ width, height: 1000 });
    const record = structuredClone(fixture), state = record.data.finalState;
    state.quizIndex = Object.fromEntries(Object.keys(map.questions).map(page => [page, 0])); state.selections = {};
    state.panelsOpen = Object.fromEntries(map.panelsOpen.map((_, i) => [i, false]));
    if (index > 0 && index < 9) state.answers[index] = [];
    if (index === 3) state.notes = {};
    await page.goto(mount); await page.evaluate(raw => localStorage.setItem('dsl:final:v1', raw), JSON.stringify(record));
    await page.goto(`${mount}final.html`); await expect(page.locator('#lesson-status')).toBeHidden();
    await expect(page.locator('[data-content-status]').filter({ visible: true })).toHaveCount(0);
    await baseline.goto(`/__original${mount}final.html`);
    const visit = async (p, id, original = false) => {
      if (await p.locator('#section-select').isVisible()) await p.locator('#section-select').selectOption(String(original ? index : id));
      else await p.locator(`[data-go="${original ? index : id}"]`).click();
      await expect(p.locator(`#view-${index}`)).toBeVisible();
    };
    await visit(page, map.sections[index]); await visit(baseline, map.sections[index], true);
    await Promise.all([settled(page), settled(baseline)]);
    const current = page.locator(`#view-${index}`), old = baseline.locator(`#view-${index}`);
    const heading = current.locator('h1,h2').first(), originalHeading = old.locator('h1,h2').first();
    if (index < 9) {
      // Owner requests the actual Middle heading profiles, not original reset
      // sizes or a single approximate scale for both heading levels.
      await equalPaint(heading, originalHeading, ['fontFamily', 'color']);
      const actual = await paint(heading);
      expect(parseFloat(actual.fontSize)).toBeCloseTo(index === 0 ? Math.max(36, Math.min(width * .05, 57.6)) : Math.max(29.6, Math.min(width * .034, 41.6)), 1);
      expect(actual.fontWeight).toBe('700');
      expect(parseFloat(actual.lineHeight) / parseFloat(actual.fontSize)).toBeCloseTo(1.17, 3);
      expect(await heading.evaluate(n => parseFloat(getComputedStyle(n).letterSpacing) / parseFloat(getComputedStyle(n).fontSize))).toBeCloseTo(-.035, 3);
    } else await equalPaint(heading, originalHeading, ['fontFamily', 'fontSize', 'lineHeight', 'color']);
    if (index < 9) {
      await equalPaint(current.locator(':scope>p').first(), old.locator(':scope>p').first(), ['fontFamily', 'fontSize', 'fontWeight', 'color']);
      await equalPaint(current.locator('.dsl-prose-lead').first(), old.locator(':scope>p.muted').first(), ['fontSize', 'color']);
    }
    // Restore legacy back faces to front; new credit and current face are separate.
    for (const card of await old.locator('.flip').all()) if ((await card.getAttribute('class')).split(' ').includes('flipped')) await card.click();
    const newCards = await current.locator('.dsl-card').all(), oldCards = await old.locator('.flip').all();
    for (let n = 0; n < newCards.length; n++) {
      await equalPaint(newCards[n].locator('.dsl-card-front'), oldCards[n].locator('.flip-front'), ['fontFamily', 'fontSize', 'lineHeight', 'color', 'backgroundColor']);
      expect((await paint(newCards[n].locator('.dsl-card-front'))).fontWeight).toBe('400'); // Owner-approved Middle treatment, not legacy Final bold.
      expect(norm(await newCards[n].locator('.dsl-card-copy').first().textContent())).toBe(norm(await oldCards[n].locator('.flip-front').evaluate(n => [...n.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join(''))));
      await newCards[n].click(); await oldCards[n].click(); await Promise.all([settled(page), settled(baseline)]);
      await equalPaint(newCards[n].locator('.dsl-card-back'), oldCards[n].locator('.flip-back'), ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'color', 'backgroundColor']);
      const overflow = await newCards[n].evaluate(n => ({ scroll: n.scrollHeight, client: n.clientHeight })); expect(overflow.scroll).toBeLessThanOrEqual(overflow.client + 2);
    }
    const newPanels = await current.locator('.dsl-expandable').all(), oldPanels = await old.locator('details.panel').all();
    for (let n = 0; n < newPanels.length; n++) {
      await equalPaint(newPanels[n], oldPanels[n], ['backgroundColor', 'borderLeftWidth', 'borderLeftColor', 'borderRadius']);
      await equalPaint(newPanels[n].locator('summary'), oldPanels[n].locator('summary'), ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'color']);
      await newPanels[n].locator('summary').click(); await expect(newPanels[n]).toHaveJSProperty('open', true);
      await oldPanels[n].locator('summary').click(); await expect(oldPanels[n]).toHaveJSProperty('open', true);
      await equalPaint(newPanels[n].locator('.dsl-expandable-body'), oldPanels[n].locator('.inner'), ['fontFamily', 'fontSize', 'lineHeight', 'color']);
    }
    // Notes: blank, wrong, correct/disabled immediate statuses for all six rows.
    if (index === 3) for (const [n, note] of activity('note-classification').data.notes.entries()) {
      const select = current.locator(`[data-note-id="${note.id}"]`), original = old.locator(`#note-${n}`);
      await equalPaint(select, original, ['fontFamily', 'fontSize', 'color', 'backgroundColor', 'borderLeftWidth', 'borderLeftColor', 'borderRadius']);
      await equalPaint(select.locator('..'), original.locator('..'), ['backgroundColor', 'borderLeftWidth', 'borderLeftColor', 'borderRadius']);
      await equalPaint(select.locator('..').locator('label'), original.locator('..').locator('label'), ['fontSize', 'fontWeight', 'color']);
      const wrong = (activity('note-classification').data.categories.find(c => c.id !== note.correctCategoryId)).id;
      await select.selectOption(wrong); await original.selectOption(String(activity('note-classification').data.categories.findIndex(c => c.id === wrong)));
      await expect(select.locator('..').locator('[role=status]')).toHaveText(await original.locator('..').locator('[role=status]').textContent());
      await select.selectOption(note.correctCategoryId); await original.selectOption(String(activity('note-classification').data.categories.findIndex(c => c.id === note.correctCategoryId)));
      await expect(select).toBeDisabled(); await expect(original).toBeDisabled();
      await equalPaint(select, original, ['color', 'backgroundColor']);
    }
    const id = index > 0 && index < 9 ? index === 8 ? 'knowledge-check' : `${map.sections[index]}-questions` : null;
    if (id) {
      const questions = activity(id).data.questions, host = current.locator(`[data-activity-id="${id}"]`), legacy = old.locator(`#quiz-${index}`);
      await equalPaint(host.locator('..').locator('..').locator('..'), legacy, ['backgroundColor', 'borderLeftWidth', 'borderLeftColor', 'borderRadius']);
      await equalPaint(host.locator('.dsl-sequence-heading'), legacy.locator('h3'), ['fontFamily', 'fontSize', 'color']);
      for (const [q, question] of questions.entries()) {
        const good = question.options.findIndex(o => o.id === question.correctOptionId), wrong = good ? 0 : 1;
        await equalPaint(host.locator('.dsl-question-prompt'), legacy.locator('p.font-bold'), ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'color']);
        for (const n of [wrong, good, wrong, good]) {
          const button = host.locator(`[data-option-id="${question.options[n].id}"]`), original = legacy.locator('.choice').nth(n);
          await button.click(); await original.click();
          await equalPaint(button, original, ['backgroundColor', 'borderLeftWidth', 'borderLeftColor', 'color', 'fontWeight']);
          await equalPaint(host.locator('.dsl-feedback'), legacy.locator('.feedback'), ['backgroundColor', 'borderLeftWidth', 'borderLeftColor', 'color']);
        }
        if (question.context) await equalPaint(host.locator('.dsl-question-context'), legacy.locator('.notice'), ['backgroundColor', 'borderLeftWidth', 'borderLeftColor']);
        if (q < questions.length - 1) { await host.locator('.dsl-question-next').click(); await legacy.getByRole('button', { name: 'Next question →', exact: true }).click(); }
      }
    }
    if (index === 2 || index === 7) {
      const id = index === 2 ? 'synthesis-writing' : 'closing-writing', host = current.locator(`[data-activity-id="${id}"]`), fields = activity(id).data.fields;
      for (const field of fields) {
        const legacyId = Object.entries(map.fields).find(([, id]) => id === field.id)[0];
        await equalPaint(host.locator(`[data-field-id="${field.id}"]`), old.locator(`#${legacyId}`), ['fontFamily', 'fontSize', 'backgroundColor', 'borderLeftWidth', 'borderLeftColor', 'borderRadius']);
      }
      await equalPaint(host.locator('.dsl-writing-model'), old.locator(index === 2 ? '#builder-model' : '#closing-model'), ['backgroundColor', 'borderLeftWidth', 'borderLeftColor', 'borderRadius']);
      await expect(host.locator('.dsl-writing-model')).toBeVisible();
    }
    const newSurfaces = await current.locator('.dsl-tone-callout').all(), oldSurfaces = await old.locator('.card:not(.activity)').all();
    expect(newSurfaces).toHaveLength(oldSurfaces.length);
    for (let n = 0; n < newSurfaces.length; n++) await equalPaint(newSurfaces[n], oldSurfaces[n], ['backgroundColor', 'borderLeftWidth', 'borderLeftColor', 'borderRadius']);
    const speakers = await current.locator('.dsl-layout-roundtable .dsl-content-block > div > p').all(), originals = await old.locator('.speaker').all();
    expect(speakers).toHaveLength(originals.length);
    for (let n = 0; n < speakers.length; n++) { expect(norm(await speakers[n].textContent())).toBe(norm(await originals[n].textContent())); await equalPaint(speakers[n], originals[n], ['backgroundColor', 'borderLeftWidth', 'borderLeftColor', 'borderRadius']); }
    for (const [n, notice] of (await current.locator('.dsl-tone-caution').all()).entries()) await equalPaint(notice, old.locator('.notice').filter({ hasNot: old.locator('.choice') }).nth(n), ['backgroundColor', 'borderLeftWidth', 'borderLeftColor', 'borderRadius']);
    await Promise.all([settled(page), settled(baseline)]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await page.screenshot({ path: info.outputPath('current.png'), fullPage: true }); await baseline.screenshot({ path: info.outputPath('original.png'), fullPage: true });
    await info.attach('current', { path: info.outputPath('current.png'), contentType: 'image/png' }); await info.attach('original', { path: info.outputPath('original.png'), contentType: 'image/png' });
    await baseline.close();
  });
}
