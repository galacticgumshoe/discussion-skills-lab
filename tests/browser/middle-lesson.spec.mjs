import { test, expect } from '@playwright/test';
import { readFileSync, readdirSync } from 'node:fs';
import { original } from '../helpers/baseline-source.mjs';
import { middleJourney } from '../helpers/middle-journey.mjs';
import { middleAdapter } from '../../lessons/middle/progress-adapter.js';
const fixture = name => JSON.parse(readFileSync(new URL(`../fixtures/progress/middle/${name}.json`, import.meta.url)));
const path = 'middle.html';
const open = async (page, mount = '/', raw = null) => {
  await page.goto(mount);
  await page.evaluate(raw => raw === null ? localStorage.removeItem('dsl:middle:v1') : localStorage.setItem('dsl:middle:v1', raw), raw);
  await page.goto(`${mount}${path}`);
  await expect(page.locator('#lesson-status')).toBeHidden();
};
const visit = async (page, id) => {
  if (await page.locator('#section-select').isVisible()) await page.locator('#section-select').selectOption(id);
  else await page.locator(`[data-go="${id}"]`).click();
  await expect(page.locator(`[data-section-id="${id}"]`)).toBeVisible();
};
for (const mount of ['/', '/discussion-skills-lab/']) {
  test(`${mount} Middle full content-driven journey, every alternative feedback and one missing gate per section`, async ({ page }) => {
    const errors = []; page.on('pageerror', error => errors.push(error.message));
    await open(page, mount); await middleJourney(page);
    await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden();
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('dsl:middle:v1')).completed)).toHaveLength(8);
    expect(errors).toEqual([]);
  });
  test(`${mount} Middle all original rich prose, meaningful emphasis, labels and speaker lines remain present`, async ({ page }) => {
    await open(page, mount, fixture('completed').raw);
    const source = original('middle.html').toString();
    const expected = await page.evaluate(source => {
      const doc = new DOMParser().parseFromString(source, 'text/html');
      const norm = text => text.replace(/\s+/g, ' ').trim();
      const passages = [...doc.querySelectorAll('.lesson-view p,.lesson-view li,.lesson-view h1,.lesson-view h2,.lesson-view h3,.lesson-view label,.lesson-view strong,.lesson-view blockquote')].map(node => norm(node.textContent));
      // Include direct text-node examples/cautions/speaker lines too, not just
      // paragraphs: the original contains important prose in plain divs.
      const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode, parent = node.parentElement;
        if (parent.closest('.lesson-view') && !parent.closest('button,.dsl-flip-hint,.dsl-flip-explored')) passages.push(norm(node.textContent));
      }
      return passages.filter(Boolean);
    }, source);
    const actual = await page.locator('#views').textContent();
    const norm = text => text.replace(/\s+/g, ' ').trim();
    for (const text of expected) expect(norm(actual), text).toContain(text);
    const emphasis = await page.evaluate(source => [...new DOMParser().parseFromString(source, 'text/html').querySelectorAll('.lesson-view strong')].map(node => node.textContent.replace(/\s+/g, ' ').trim()).filter(Boolean), source);
    const actualEmphasis = (await page.locator('#views strong').allTextContents()).map(norm);
    for (const text of emphasis) expect(actualEmphasis).toContain(text);
    // Each original section header is published once, not also extracted as a
    // body fragment when its original wrapper contained only heading/eyebrow.
    for (const section of await page.locator('#views>.lesson-view').all()) {
      const heading = await section.locator(':scope>h1,:scope>h2').textContent();
      expect((await section.textContent()).split(heading)).toHaveLength(2);
    }
    await expect(page.locator('button p,button ul,button li,button h3')).toHaveCount(0);
  });
  test(`${mount} Middle valid old fixtures retain drafts, selections and earned credit without hydration writes`, async ({ page }) => {
    await page.addInitScript(() => { window.writes = 0; const set = Storage.prototype.setItem; Storage.prototype.setItem = function(...args) { window.writes++; return set.apply(this, args); }; });
    for (const name of readdirSync(new URL('../fixtures/progress/middle/', import.meta.url)).filter(name => name.endsWith('.json'))) {
      const record = fixture(name.slice(0, -5));
      if (record.safety === 'unsafe') continue;
      await open(page, mount, record.raw);
      expect(await page.evaluate(() => localStorage.getItem('dsl:middle:v1'))).toBe(record.raw);
      expect(await page.evaluate(() => window.writes)).toBe(0);
      const fields = record.raw && JSON.parse(record.raw).data?.middleState?.fields || {};
      for (const [index, id] of [[0, 'evidence-source'], [1, 'evidence-finding'], [2, 'evidence-connection'], [3, 'evidence-output'], [8, 'integrated-draft']]) await expect(page.locator(`[data-field-id="${id}"]`)).toHaveValue(fields[index] || '');
      const expected = middleAdapter.decode(record.raw === null ? null : JSON.parse(record.raw));
      for (const [id, own] of Object.entries(expected.activities)) {
        const host = page.locator(`[data-activity-id="${id}"]`);
        if (own.exploredIds) for (const item of await host.locator('[data-card-id],[data-panel-id]').all()) {
          const itemId = await item.getAttribute('data-card-id') || await item.getAttribute('data-panel-id');
          await expect(item.locator('.dsl-card-explored,.dsl-panel-explored')).toHaveJSProperty('hidden', !own.exploredIds.includes(itemId));
        }
        if (own.checkedIds) for (const input of await host.locator('input').all()) {
          // Checklist IDs are explicit component bindings, not DOM positions.
          const label = input.locator('..');
          const content = JSON.parse(readFileSync(new URL(`../../content/middle/activities/${id}.json`, import.meta.url)));
          const text = (await label.textContent()).trim();
          const check = content.data.items.find(item => item.text === text);
          expect(check).toBeTruthy();
          await expect(input).toHaveJSProperty('checked', own.checkedIds.includes(check.id));
        }
        if (own.selections) for (const question of await host.locator('[data-question-id]').all()) {
          const questionId = await question.getAttribute('data-question-id');
          for (const button of await question.locator('[data-option-id]').all()) await expect(button).toHaveAttribute('aria-pressed', String(own.selections[questionId] === await button.getAttribute('data-option-id')));
        }
      }
    }
  });
  test(`${mount} Middle immediate draft/model/cursor saves and wrong-after-credit reload`, async ({ page }) => {
    await open(page, mount, fixture('completed').raw); await visit(page, 'evidence');
    await page.locator('[data-field-id="evidence-source"]').fill('Partial synthetic source');
    await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden(); await visit(page, 'evidence');
    await expect(page.locator('[data-field-id="evidence-source"]')).toHaveValue('Partial synthetic source');
    await page.locator('[data-activity-id="evidence-writing"] .dsl-model-toggle').click();
    await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden(); await visit(page, 'evidence');
    await expect(page.locator('[data-activity-id="evidence-writing"] .dsl-writing-model')).toBeVisible();
    await visit(page, 'speaking-conflicts');
    const speaking = page.locator('[data-activity-id="speaking-simulator"]');
    await speaking.locator('.dsl-choice').first().click();
    await expect(speaking.getByRole('button', { name: 'Try Another Strategy' })).toHaveCount(0);
    await expect(speaking.locator('.dsl-question-compare')).toBeHidden();
    await expect(speaking.locator('.dsl-question-comparison')).toBeEmpty();
    await expect(speaking.locator('.dsl-question-comparison')).toBeHidden();
    await expect(speaking).not.toContainText('Choose another strategy to compare its consequence.');
    await expect(speaking.locator('.dsl-feedback')).not.toBeEmpty();
    await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden(); await visit(page, 'speaking-conflicts');
    await expect(speaking.getByRole('button', { name: 'Try Another Strategy' })).toHaveCount(0);
    await expect(speaking.locator('.dsl-question-comparison')).toBeEmpty();
    await expect(speaking.locator('.dsl-choice').first()).toHaveClass(/dsl-selected-incorrect/);
    await expect(speaking.locator('.dsl-question-next')).toBeEnabled();
    await speaking.locator('.dsl-question-next').click();
    const prompt = await speaking.locator('.dsl-question-prompt').textContent();
    await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden(); await visit(page, 'speaking-conflicts');
    await expect(speaking.locator('.dsl-question-prompt')).toHaveText(prompt);
    await visit(page, 'integrated-practice');
    await page.locator('[data-field-id="integrated-draft"]').fill('');
    await page.locator('[data-activity-id="application-checklist"] input').first().uncheck();
    await expect(page.locator('#next-section')).toBeEnabled();
    await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden(); await visit(page, 'integrated-practice');
    await expect(page.locator('#next-section')).toBeEnabled();
  });
  test(`${mount} Middle failed rich activity retries without writes or blocking fresh reference`, async ({ page }) => {
    let fail = true;
    await page.route('**/content/middle/activities/bodies/bring-evidence-back.md', route => fail ? route.fulfill({ status: 503, body: 'Synthetic unavailable body' }) : route.continue());
    await open(page, mount);
    await expect(page.locator('#view-0 [data-content-retry]').filter({ visible: true })).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('dsl:middle:v1'))).toBeNull();
    await visit(page, 'quick-reference');
    await expect(page.locator('[data-reference-print]')).toBeEnabled();
    await expect(page.locator('.middle-reference-item')).toHaveCount(5);
    await visit(page, 'welcome'); fail = false;
    await page.locator('#view-0 [data-content-retry]').filter({ visible: true }).click();
    await expect(page.locator('[data-activity-id="welcome-cards"] [data-card-id]')).toHaveCount(3);
    expect(await page.evaluate(() => localStorage.getItem('dsl:middle:v1'))).toBeNull();
    await expect(page.locator('#next-section')).toBeDisabled();
  });
  test(`${mount} Middle new rich-writing/model payload remains readable by the pinned original engine`, async ({ page }) => {
    const extended = JSON.parse(fixture('completed').raw);
    extended.futureOuter = { keep: 0 };
    extended.data.middleState.selections.futureSelection = { keep: true };
    extended.data.dslUi = { schemaVersion: 1, models: { futureModel: true }, future: 'keep' };
    await open(page, mount, JSON.stringify(extended)); await visit(page, 'evidence');
    await page.locator('[data-field-id="evidence-source"]').fill('Synthetic rollback source, October 2026');
    await page.locator('[data-activity-id="evidence-writing"] .dsl-model-toggle').click();
    await visit(page, 'integrated-practice');
    await page.locator('[data-field-id="integrated-draft"]').fill('Synthetic rollback draft — café ✓');
    await page.locator('[data-activity-id="integrated-writing"] .dsl-model-toggle').click();
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('dsl:middle:v1')));
    expect(saved.futureOuter).toEqual({ keep: 0 });
    expect(saved.data.middleState.selections.futureSelection).toEqual({ keep: true });
    expect(saved.data.dslUi.models).toEqual({ futureModel: true, 'research-model': true, 'application-model': true });
    expect(saved.data.middleState.sets.solved.application).toEqual(['a', 'b']);
    await page.goto(`/__original${mount}middle.html`);
    await expect(page.locator('[data-go="0"]')).toBeEnabled();
    await expect(page.locator('#source')).toHaveValue('Synthetic rollback source, October 2026');
    await expect(page.locator('#application-draft')).toHaveValue('Synthetic rollback draft — café ✓');
    await expect(page.locator('#progress-text')).toHaveText('8 of 8 pages completed');
  });
  test(`${mount} Middle fresh reference-only print, one Print button and settled responsive views`, async ({ page, browserName }, info) => {
    await open(page, mount);
    await expect(page.locator('[data-reference-print]')).toBeEnabled();
    await expect(page.locator('[data-reference-print]')).toHaveCount(1);
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('#view-8')).toBeVisible();
    for (let i = 0; i < 8; i++) await expect(page.locator(`#view-${i}`)).toBeHidden();
    for (const control of await page.locator('button,input,textarea,select,.topbar,.rail,.mobile-nav,.bottom-controls').all()) await expect(control).toBeHidden();
    await page.evaluate(async () => { await document.fonts.ready; await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))); });
    if (browserName === 'chromium') await page.pdf({ path: info.outputPath('middle-fresh-ordinary.pdf'), format: 'Letter', printBackground: true });
    await page.emulateMedia({ media: 'screen' }); await visit(page, 'quick-reference');
    if (browserName === 'chromium') {
      await page.emulateMedia({ media: 'print' });
      await page.evaluate(() => Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))));
      await page.pdf({ path: info.outputPath('middle-fresh-reference.pdf'), format: 'Letter', printBackground: true });
    }
    await page.emulateMedia({ media: 'screen' });
    await open(page, mount, fixture('completed').raw);
    for (const id of ['welcome', 'structure-substance', 'evidence', 'support-group', 'communication', 'speaking-conflicts', 'integrated-practice', 'knowledge-check', 'quick-reference']) {
      await visit(page, id);
      await page.evaluate(async () => { await document.fonts.ready; await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))); });
      if (browserName === 'chromium') await page.screenshot({ path: info.outputPath(`middle-${id}.png`), fullPage: true });
    }
    await page.setViewportSize({ width: 320, height: 900 }); await visit(page, 'speaking-conflicts');
    await page.locator('[data-activity-id="speaking-cards"] .dsl-card').last().click();
    await page.locator('#views').evaluate(node => { node.style.fontSize = '200%'; });
    await page.evaluate(() => Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))));
    const overflow = await page.locator('[data-activity-id="speaking-cards"] .dsl-card').last().evaluate(node => ({ scroll: node.scrollHeight, client: node.clientHeight }));
    expect(overflow.scroll).toBeLessThanOrEqual(overflow.client + 2);
    if (browserName === 'chromium') await page.screenshot({ path: info.outputPath('middle-long-card-320-enlarged.png'), fullPage: true });
  });
}

for (const failure of ['corrupt', 'denied', 'quota']) test(`Middle ${failure} storage retains in-memory credit and warns without overwriting`, async ({ page }) => {
  await page.addInitScript(failure => {
    if (failure === 'denied') Object.defineProperty(window, 'localStorage', { get() { throw Error('Synthetic denied storage'); } });
    if (failure === 'quota') Storage.prototype.setItem = () => { throw Error('Synthetic quota'); };
  }, failure);
  if (failure === 'corrupt') await open(page, '/', '{malformed');
  else { await page.goto(`/${path}`); await expect(page.locator('#lesson-status')).toBeHidden(); }
  for (const card of await page.locator('[data-activity-id="welcome-cards"] .dsl-card').all()) { await card.focus(); await card.press('Enter'); }
  await expect(page.locator('#next-section')).toBeEnabled();
  await expect(page.locator('#storage-warning')).toBeVisible();
  if (failure === 'corrupt') expect(await page.evaluate(() => localStorage.getItem('dsl:middle:v1'))).toBe('{malformed');
});
