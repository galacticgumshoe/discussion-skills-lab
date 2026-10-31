import { test, expect } from '@playwright/test';
import { readFileSync, readdirSync } from 'node:fs';
import { original } from '../helpers/baseline-source.mjs';
import { finalJourney, finalVisit as visit, finalActivity as activity } from '../helpers/final-journey.mjs';
import { finalAdapter } from '../../lessons/final/progress-adapter.js';
const fixture = name => JSON.parse(readFileSync(new URL(`../fixtures/progress/final/${name}.json`, import.meta.url)));
const open = async (page, mount = '/', raw = null) => {
  await page.goto(mount); await page.evaluate(raw => raw === null ? localStorage.removeItem('dsl:final:v1') : localStorage.setItem('dsl:final:v1', raw), raw);
  await page.goto(`${mount}final.html`); await expect(page.locator('#lesson-status')).toBeHidden();
  await expect(page.locator('[data-content-status]').filter({ visible: true })).toHaveCount(0);
};
test('Final note runtime rejects the exact shared development-invalid fixtures before attaching controls', async ({ page }) => {
  await open(page);
  const results = await page.evaluate(async valid => {
    const { invalidNoteCases } = await import(new URL('__fixtures/security/note-cases.mjs', document.baseURI));
    const { validateActivity } = await import(new URL('assets/js/app/lesson-validation.js', document.baseURI));
    return invalidNoteCases(valid).map(({ label, data }) => { try { validateActivity(data); return { label, rejected: false }; } catch { return { label, rejected: true }; } });
  }, activity('note-classification'));
  expect(results).toHaveLength(9); for (const result of results) expect(result.rejected, result.label).toBe(true);
});
for (const mount of ['/', '/discussion-skills-lab/']) {
  test(`${mount} Final public entry uses production assets, one writer and one Print handler`, async ({ page }) => {
    await page.addInitScript(() => {
      window.writes = 0;
      const set = Storage.prototype.setItem;
      Storage.prototype.setItem = function(...args) { window.writes++; return set.apply(this, args); };
    });
    const record = JSON.parse(fixture('completed').raw); record.data.finalState.flips = {};
    await open(page, mount, JSON.stringify(record));
    await expect(page.locator('body')).toHaveClass('dsl-final');
    await expect(page.locator('script[type="module"][src="assets/js/final.js"]')).toHaveCount(1);
    await expect(page.locator('script[src*="__fixtures"],script[src$="lesson-core.js"],script[src$="final-reference.js"]')).toHaveCount(0);
    await expect(page.locator('[data-card-id]')).toHaveCount(8);
    expect(await page.evaluate(() => typeof window.DSL)).toBe('undefined');
    expect(await page.evaluate(() => window.writes)).toBe(0);
    const card = page.locator('#view-0 [data-card-id]').first();
    await card.focus(); await card.press('Enter');
    expect(await page.evaluate(() => window.writes)).toBe(1);
    await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden();
    expect(await page.evaluate(() => window.writes)).toBe(0);
    await expect(card.locator('.dsl-card-front > .dsl-card-explored')).toBeVisible();
    await visit(page, 'quick-reference');
    await expect(page.locator('[data-reference-print]')).toBeEnabled();
    await page.evaluate(() => { window.prints = 0; window.print = () => window.prints++; });
    await page.locator('[data-reference-print]').click();
    expect(await page.evaluate(() => window.prints)).toBe(1);
  });
  test(`${mount} Final public nine-page fresh journey, all alternatives and per-section missing gates`, async ({ page }) => {
    await open(page, mount); await finalJourney(page);
    await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden();
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('dsl:final:v1')).completed)).toHaveLength(9);
  });
  test(`${mount} Final exact original prose/emphasis/card/panel/model/labels and single reference source`, async ({ page }) => {
    await open(page, mount, fixture('completed').raw);
    const expected = await page.evaluate(source => {
      const doc = new DOMParser().parseFromString(source, 'text/html'), norm = text => text.replace(/\s+/g, ' ').trim();
      const nodes = [...doc.querySelectorAll('.lesson-view p,.lesson-view h1,.lesson-view h2,.lesson-view h3,.lesson-view label,.lesson-view strong,.lesson-view summary')];
      const passages = nodes.map(n => norm(n.textContent));
      for (const n of doc.querySelectorAll('.flip-face,.inner,.notice')) {
        const clone = n.cloneNode(true); clone.querySelectorAll('.dsl-flip-hint,.visited').forEach(c => c.remove()); passages.push(norm(clone.textContent));
      }
      return { passages: passages.filter(Boolean), emphasis: [...doc.querySelectorAll('.lesson-view strong')].map(n => norm(n.textContent)) };
    }, original('final.html').toString());
    const norm = text => text.replace(/\s+/g, ' ').trim(), actual = norm(await page.locator('#views').textContent());
    for (const passage of expected.passages) expect(actual, passage).toContain(passage);
    const strong = (await page.locator('#views strong').allTextContents()).map(norm);
    for (const text of expected.emphasis) expect(strong).toContain(text);
    await expect(page.locator('[data-card-id]')).toHaveCount(8); await expect(page.locator('[data-panel-id]')).toHaveCount(13);
    await expect(page.locator('button p,button h3,button ul,button li')).toHaveCount(0);
    await expect(page.locator('.final-reference-item')).toHaveCount(5); await expect(page.locator('[data-reference-print]')).toHaveCount(1);
  });
  test(`${mount} Final all valid v1 fixtures silently hydrate fields/checks/models/notes/panels/selections/goals`, async ({ page }) => {
    await page.addInitScript(() => { window.writes = 0; const set = Storage.prototype.setItem; Storage.prototype.setItem = function(...args) { window.writes++; return set.apply(this, args); }; });
    for (const name of readdirSync(new URL('../fixtures/progress/final/', import.meta.url))) {
      const record = fixture(name.slice(0, -5)); if (record.safety === 'unsafe') continue;
      await open(page, mount, record.raw); const expected = finalAdapter.decode(record.raw === null ? null : JSON.parse(record.raw));
      expect(await page.evaluate(() => window.writes)).toBe(0); expect(await page.evaluate(() => localStorage.getItem('dsl:final:v1'))).toBe(record.raw);
      for (const [id, value] of Object.entries(expected.fields)) await expect(page.locator(`[data-field-id="${id}"]`)).toHaveValue(value);
      for (const [id, own] of Object.entries(expected.activities)) {
        const host = page.locator(`[data-activity-id="${id}"]`);
        if (own.openIds) for (const panel of await host.locator('[data-panel-id]').all()) await expect(panel).toHaveJSProperty('open', own.openIds.includes(await panel.getAttribute('data-panel-id')));
        if (own.exploredIds) for (const item of await host.locator('[data-card-id],[data-panel-id]').all()) {
          const id = await item.getAttribute('data-card-id') || await item.getAttribute('data-panel-id'); await expect(item.locator('.dsl-card-explored,.dsl-panel-explored')).toHaveJSProperty('hidden', !own.exploredIds.includes(id));
        }
        if (own.checkedIds) for (const input of await host.locator('[data-check-id]').all()) await expect(input).toHaveJSProperty('checked', own.checkedIds.includes(await input.getAttribute('data-check-id')));
        if (own.earnedNoteIds) for (const note of activity(id).data.notes) {
          const select = host.locator(`[data-note-id="${note.id}"]`), earned = own.earnedNoteIds.includes(note.id); await expect(select).toHaveJSProperty('disabled', earned); await expect(select).toHaveValue(earned ? note.correctCategoryId : '');
        }
        if (own.selections) for (const question of await host.locator('[data-question-id]').all()) for (const option of await question.locator('[data-option-id]').all()) await expect(option).toHaveAttribute('aria-pressed', String(own.selections[await question.getAttribute('data-question-id')] === await option.getAttribute('data-option-id')));
      }
      for (const [id, flag] of [['synthesis-writing', 'synthesis-model-viewed'], ['closing-writing', 'closing-model-viewed']]) await expect(page.locator(`[data-activity-id="${id}"] .dsl-writing-model`)).toHaveJSProperty('hidden', !expected.flags[flag]);
      const selected = activity('practice-goals').data.items.filter(item => expected.activities['practice-goals'].checkedIds.includes(item.id));
      await expect(page.locator('.dsl-checklist-caption')).toHaveText(selected.length ? 'My practice goals: ' + selected.map(item => item.text).join(' ') : 'Select a goal above to make your practice plan.');
    }
  });
  test(`${mount} Final note wrong/right/disabled/reload, session-only retries and no hydration credit`, async ({ page }) => {
    const record = JSON.parse(fixture('completed').raw); record.data.finalState.notes = {};
    await open(page, mount, JSON.stringify(record)); await visit(page, 'organize-findings');
    const note = activity('note-classification').data.notes[0], select = page.locator(`[data-note-id="${note.id}"]`);
    const before = await page.evaluate(() => localStorage.getItem('dsl:final:v1'));
    await select.selectOption('unresolved-issue'); await expect(select).toBeEnabled(); await expect(select.locator('..').locator('[role=status]')).toHaveText('Try again. ' + note.feedback);
    expect(await page.evaluate(() => localStorage.getItem('dsl:final:v1'))).toBe(before);
    await page.locator('#view-3 summary').first().click();
    await expect(select).toHaveValue('unresolved-issue');
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('dsl:final:v1')).data.finalState.notes)).toEqual({});
    await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden(); await visit(page, 'organize-findings'); await expect(select).toHaveValue('');
    await select.selectOption(note.correctCategoryId); await expect(select).toBeDisabled(); await expect(select.locator('..').locator('[role=status]')).toHaveText('✓ Correct. ' + note.feedback);
    await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden(); await visit(page, 'organize-findings'); await expect(select).toBeDisabled(); await expect(select).toHaveValue(note.correctCategoryId);
  });
  test(`${mount} Final explicit writing/model/edit/copy actions and enlarged narrow cards remain accessible`, async ({ page }, info) => {
    await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw Error('Synthetic clipboard denial'); } } }));
    const record = JSON.parse(fixture('completed').raw); record.data.finalState.assembled = false; record.data.finalState.builderModel = false; record.data.finalState.closingModel = false;
    await open(page, mount, JSON.stringify(record)); await visit(page, 'connect-viewpoints');
    const builder = page.locator('[data-activity-id="synthesis-writing"]');
    await expect(builder.locator('.dsl-writing-output')).toBeHidden(); await expect(builder.locator('.dsl-writing-model')).toBeHidden();
    await expect(page.locator('[data-reveal-id="synthesis-checks"]')).toBeHidden();
    await builder.locator('.dsl-assemble').focus(); await builder.locator('.dsl-assemble').press('Enter');
    await expect(builder.locator('.dsl-writing-output')).toBeVisible();
    await builder.locator('.dsl-model-toggle').click(); await expect(page.locator('[data-reveal-id="synthesis-checks"]')).toBeVisible();
    await builder.locator('.dsl-copy').click(); await expect(builder.locator('.dsl-writing-status')).toHaveText("Clipboard unavailable. The text is selected; use your device's Copy command.");
    expect(await builder.locator('[data-field-id="synthesis-output"]').evaluate(n => n.selectionEnd - n.selectionStart)).toBeGreaterThan(0);
    await builder.locator('.dsl-edit').click(); await expect(builder.locator('[data-field-id="synthesis-contributors"]')).toBeFocused();
    await expect(builder.locator('.dsl-writing-status')).toHaveText('Edit your fields, then assemble again when ready.');
    await visit(page, 'closing-practice'); const closing = page.locator('[data-activity-id="closing-writing"]');
    await expect(closing.locator('.dsl-writing-model')).toBeHidden(); await closing.locator('.dsl-model-toggle').focus(); await closing.locator('.dsl-model-toggle').press('Enter');
    await expect(page.locator('[data-reveal-id="closing-checks"]')).toBeVisible();
    await closing.locator('.dsl-copy').click(); await expect(closing.locator('.dsl-writing-status')).toContainText('The text is selected');
    expect(await closing.locator('[data-field-id="closing-draft"]').evaluate(n => n.selectionEnd - n.selectionStart)).toBeGreaterThan(0);
    await closing.locator('.dsl-edit').click(); await expect(closing.locator('[data-field-id="closing-draft"]')).toBeFocused();
    await visit(page, 'knowledge-check'); await page.locator('[data-section-target="quick-reference"]').click(); await expect(page.locator('#view-9')).toBeVisible();
    await visit(page, 'knowledge-check'); await page.locator('[data-section-target="welcome"]').click(); await expect(page.locator('#view-0')).toBeVisible();
    await page.setViewportSize({ width: 320, height: 900 }); await page.locator('#views').evaluate(n => { n.style.fontSize = '200%'; });
    for (const section of ['welcome', 'summary-synthesis', 'consensus']) {
      await visit(page, section);
      for (const card of await page.locator(`[data-section-id="${section}"] .dsl-card`).all()) {
        await card.focus(); await card.press('Space');
        await page.evaluate(() => Promise.all(document.getAnimations().map(a => a.finished.catch(() => {}))));
        expect(await card.evaluate(n => n.scrollHeight <= n.clientHeight + 2)).toBe(true);
        const overflow = await card.locator('.dsl-card-back').evaluate(n => n.scrollWidth <= n.clientWidth + 1); expect(overflow).toBe(true);
      }
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await page.screenshot({ path: info.outputPath('final-320-enlarged.png'), fullPage: true });
  });
  test(`${mount} Final edited synthesis, goal caption, wrong-after-credit and cursors save immediately; new payload replays`, async ({ page }) => {
    const record = JSON.parse(fixture('completed').raw); record.future = { keep: 0 }; record.data.finalState.future = { keep: true };
    await open(page, mount, JSON.stringify(record)); await visit(page, 'connect-viewpoints');
    const output = page.locator('[data-field-id="synthesis-output"]'); await output.fill('Synthetic edited synthesis — café ✓');
    await page.locator('[data-field-id="synthesis-contributors"]').fill('Changed source, not reassembly'); await expect(output).toHaveValue('Synthetic edited synthesis — café ✓');
    await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden(); await visit(page, 'connect-viewpoints'); await expect(output).toHaveValue('Synthetic edited synthesis — café ✓');
    await visit(page, 'summary-synthesis'); const host = page.locator('[data-activity-id="summary-synthesis-questions"]');
    // Fixture cursor may be at the last question: explicitly review to the start.
    while (await host.locator('.dsl-question-previous').isVisible()) await host.locator('.dsl-question-previous').click();
    await host.locator('[data-option-id="synthesis"]').focus(); await host.locator('[data-option-id="synthesis"]').press('Enter'); await expect(host.locator('[data-option-id="synthesis"]')).toBeFocused();
    await expect(host.locator('.dsl-question-next')).toBeEnabled(); await expect(host.locator('.dsl-credit-note')).not.toBeEmpty();
    await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden(); await visit(page, 'summary-synthesis');
    await expect(host.locator('[data-option-id="synthesis"]')).toHaveClass(/dsl-selected-incorrect/); await expect(host.locator('.dsl-question-next')).toBeEnabled();
    await host.locator('.dsl-question-next').click(); const prompt = await host.locator('.dsl-question-prompt').textContent();
    await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden(); await visit(page, 'summary-synthesis'); await expect(host.locator('.dsl-question-prompt')).toHaveText(prompt);
    await visit(page, 'knowledge-check'); for (const check of await page.locator('[data-activity-id="practice-goals"] input').all()) await check.uncheck();
    await page.locator('[data-check-id="task-review"]').check(); await page.locator('[data-check-id="credit-connect"]').check();
    await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden();
    await expect(page.locator('.dsl-checklist-caption')).toHaveText('My practice goals: ' + [activity('practice-goals').data.items[0].text, activity('practice-goals').data.items[2].text].join(' '));
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('dsl:final:v1'))); expect(saved.future).toEqual({ keep: 0 }); expect(saved.data.finalState.future).toEqual({ keep: true }); expect(saved.data.finalState.goals).toEqual([2, 0]);
    await page.goto(`/__original${mount}final.html`); await expect(page.locator('#assembled')).toHaveValue('Synthetic edited synthesis — café ✓'); await expect(page.locator('#progress-text')).toHaveText('9 of 9 pages completed');
  });
  test(`${mount} Final content failure/retry and independent reference; reference-only print and single Print handler`, async ({ page, browserName }, info) => {
    let fail = true; await page.route('**/content/final/activities/bodies/connect-ideas-back.md', route => fail ? route.fulfill({ status: 503, body: 'Synthetic failure' }) : route.continue());
    await page.goto(`${mount}final.html`); await expect(page.locator('#lesson-status')).toBeHidden();
    await expect(page.locator('#view-0 [data-content-retry]').filter({ visible: true })).toBeVisible(); await visit(page, 'quick-reference'); await expect(page.locator('[data-reference-print]')).toBeEnabled();
    await page.evaluate(() => { window.prints = 0; window.print = () => window.prints++; }); await page.locator('[data-reference-print]').click(); expect(await page.evaluate(() => window.prints)).toBe(1);
    fail = false; await visit(page, 'welcome'); await page.locator('#view-0 [data-content-retry]').filter({ visible: true }).click(); await expect(page.locator('[data-card-id]')).toHaveCount(8);
    expect(await page.evaluate(() => localStorage.getItem('dsl:final:v1'))).toBeNull();
    await page.emulateMedia({ media: 'print' }); await expect(page.locator('#view-9')).toBeVisible();
    for (let i = 0; i < 9; i++) await expect(page.locator(`#view-${i}`)).toBeHidden();
    for (const control of await page.locator('button,input,textarea,select,.topbar,.rail,.mobile-nav,.bottom-controls').all()) await expect(control).toBeHidden();
    if (browserName === 'chromium') {
      await page.evaluate(() => document.fonts.ready);
      await page.pdf({ path: info.outputPath('final-reference.pdf'), format: 'Letter', printBackground: true });
      await info.attach('final-reference', { path: info.outputPath('final-reference.pdf'), contentType: 'application/pdf' });
    }
  });
  test(`${mount} Final common reference failure retries independently without writes or extra Print handlers`, async ({ page }) => {
    let fail = true;
    await page.route('**/content/final/reference/consensus-task.md', route => fail ? route.fulfill({ status: 503, body: 'Synthetic reference failure' }) : route.continue());
    await open(page, mount); await visit(page, 'quick-reference');
    await expect(page.locator('#reference-status')).toContainText('could not load'); await expect(page.locator('#reference-retry')).toBeVisible(); await expect(page.locator('#ref-print')).toBeDisabled();
    expect(await page.evaluate(() => localStorage.getItem('dsl:final:v1'))).toBeNull();
    fail = false; await page.locator('#reference-retry').click(); await expect(page.locator('#ref-print')).toBeEnabled(); await expect(page.locator('.final-reference-item')).toHaveCount(5);
    await page.evaluate(() => { window.prints = 0; window.print = () => window.prints++; }); await page.locator('#ref-print').click(); expect(await page.evaluate(() => window.prints)).toBe(1);
    await visit(page, 'welcome'); await expect(page.locator('#next-section')).toBeDisabled();
    expect(await page.evaluate(() => localStorage.getItem('dsl:final:v1'))).toBeNull();
  });
}
for (const failure of ['corrupt', 'denied', 'quota']) test(`Final public ${failure} storage preserves progress in memory and warns nondestructively`, async ({ page }) => {
  await page.addInitScript(failure => { if (failure === 'denied') Object.defineProperty(window, 'localStorage', { get() { throw Error('Synthetic denial'); } }); if (failure === 'quota') Storage.prototype.setItem = () => { throw Error('Synthetic quota'); }; }, failure);
  if (failure === 'corrupt') await open(page, '/', '{malformed'); else { await page.goto('/final.html'); await expect(page.locator('#lesson-status')).toBeHidden(); }
  for (const card of await page.locator('#view-0 [data-card-id]').all()) { await card.focus(); await card.press('Enter'); }
  await expect(page.locator('#next-section')).toBeEnabled(); await expect(page.locator('#storage-warning')).toBeVisible();
  if (failure === 'corrupt') expect(await page.evaluate(() => localStorage.getItem('dsl:final:v1'))).toBe('{malformed');
});
