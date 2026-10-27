import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { lessons, maps, navigate, ready, rawProgress } from '../helpers/legacy-journeys.mjs';
const fixture = (id, name) => JSON.parse(readFileSync(new URL(`../fixtures/progress/${id}/${name}.json`, import.meta.url)));
async function seed(page, id, raw) {
  // Isolated temporary origin only. Synthetic restoration setup, not earned UI credit.
  await page.goto('/');
  await page.evaluate(({ key, raw }) => { if (raw === null) localStorage.removeItem(key); else localStorage.setItem(key, raw); }, { key: maps[id].storageKey, raw });
}

for (const mount of ['/', '/discussion-skills-lab/', '/__original/', '/__original/discussion-skills-lab/']) {
  for (const id of lessons) {
    test(`${mount}${id} observed restore, durable credit/drafts and non-contiguous navigation`, async ({ page }) => {
      const migrated = id === 'middle' && !mount.startsWith('/__original/');
      for (const name of ['missing', 'fresh', 'partial-first', 'mid-lesson', 'completed', 'correct-ever-then-incorrect', 'empty-zero']) {
        const saved = fixture(id, name);
        const savedRecord = saved.raw === null ? { completed: [], data: {} } : JSON.parse(saved.raw);
        await seed(page, id, saved.raw);
        await page.goto(`${mount}${id}.html`); await ready(page);
        const restored = JSON.parse(await rawProgress(page, id) || '{"completed":[],"data":{}}');
        for (const n of savedRecord.completed) expect(restored.completed).toContain(n);
        if (id === 'opening') {
          expect(await page.locator('#draft-input').inputValue()).toBe(savedRecord.data['draft-input'] || '');
        } else {
          const fields = savedRecord.data[`${id}State`]?.fields || {};
          if (id === 'middle') for (const [index, value] of Object.entries(fields)) {
            if (['source', 'finding', 'why', 'assembled', 'application-draft'].includes(maps.middle.fields[index])) expect(await page.locator(migrated ? `[data-field-id="${maps.middle.fieldIds[maps.middle.fields[index]]}"]` : `#${maps.middle.fields[index]}`).inputValue()).toBe(value);
          }
          else for (const [field, value] of Object.entries(fields)) if (Object.keys(maps.final.fields).includes(field)) expect(await page.locator(`#${field}`).inputValue()).toBe(value);
        }
        if (name === 'completed' || name === 'correct-ever-then-incorrect') {
          await navigate(page, maps[id].countedPages - 1);
          await expect(page.locator('#next-section')).toBeEnabled();
          if (name === 'correct-ever-then-incorrect') await expect(page.locator(`.lesson-view:not([hidden]) ${migrated ? '.dsl-selected-incorrect' : '.selected-incorrect'}`).first()).toBeVisible();
        }
        if (name === 'empty-zero') {
          const selector = id === 'opening' ? '#what-how-options button' : id === 'middle' ? migrated ? '[data-activity-id="classification"] .dsl-choice' : '#classify-options button' : '#quiz-1 .choice';
          await expect(page.locator(selector).first()).toHaveAttribute('aria-pressed', 'true');
        }
        if (id === 'final' && name === 'mid-lesson') {
          const panelsOpen = savedRecord.data.finalState.panelsOpen;
          const actualOpen = await page.locator('details.panel').evaluateAll(panels => panels.map(p => p.open));
          expect(actualOpen).toEqual(actualOpen.map((_, i) => !!panelsOpen[i]));
        }
        if (name === 'partial-first' && id !== 'opening') {
          const card = page.locator(migrated ? '#view-0 .dsl-card' : '#view-0 .flip-card,#view-0 .flip').first();
          await expect(card).toHaveAttribute('aria-pressed', migrated ? 'false' : 'true');
          await card.click(); await expect(card).toHaveAttribute('aria-pressed', migrated ? 'true' : 'false');
          await page.reload();
          // KI-09: original engine restores explored cards back-side-up, not their last face.
          await expect(card).toHaveAttribute('aria-pressed', migrated ? 'false' : 'true');
          if (migrated) await expect(card.locator('.dsl-card-explored')).toBeVisible();
          const raw = JSON.parse(await rawProgress(page, id)).data[`${id}State`];
          expect(id === 'middle' ? raw.sets.flipped.welcome : raw.flips[0]).toContain(0);
        }
      }
      await seed(page, id, fixture(id, 'non-contiguous').raw);
      await page.goto(`${mount}${id}.html`); await ready(page);
      await expect(page.locator(`[data-go="${migrated ? 'evidence' : '2'}"]`)).toBeDisabled();
      await navigate(page, 3); await navigate(page, 4); await navigate(page, 0);
      await page.reload(); await ready(page);
      expect(JSON.parse(await rawProgress(page, id)).completed).toContain(3);
      if (id === 'opening') {
        await seed(page, id, fixture(id, 'quiz-earned-fallback').raw);
        await page.goto(`${mount}${id}.html`); await ready(page);
        expect(JSON.parse(await rawProgress(page, id)).completed).toContain(6);
      }
    });
  }
}

for (const id of lessons) {
  test(`original ${id} unsafe state boundary is characterized, not a preservation promise (KI-07)`, async ({ page }) => {
    test.info().annotations.push({ type: 'known-issue', description: 'KI-07: malformed nested values can crash the original replay engine; retain this characterization and add safe-boundary new-engine tests in milestone 4.' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const name of ['malformed-json', 'invalid-outer', 'invalid-data', 'malformed-nested', 'out-of-range']) {
      errors.length = 0;
      await seed(page, id, fixture(id, name).raw);
      await page.goto(`/__original/${id}.html`);
      await page.waitForLoadState('load');
      expect(errors.length > 0, `${id}/${name}`).toBe(name === 'malformed-nested' || (['invalid-data', 'out-of-range'].includes(name) && id !== 'opening'));
    }
  });

  test(`original ${id} unknown-property loss is explicit (KI-08)`, async ({ page }) => {
    await seed(page, id, fixture(id, 'unknown-properties').raw);
    await page.goto(`/__original/${id}.html`); await ready(page);
    if (id === 'opening') await page.locator('.classify-answer').first().click();
    const raw = JSON.parse(await rawProgress(page, id));
    expect(raw.futureOuter).toBeUndefined();
    expect(raw.data.futureData).toEqual([0, 'keep']);
    if (id !== 'opening') expect(raw.data[`${id}State`].futureNested).toBeUndefined();
  });

  test(`${id} clipboard rejection leaves selectable draft and useful status`, async ({ page }) => {
    await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw Error('Synthetic permission denial'); } } }));
    await seed(page, id, fixture(id, 'completed').raw);
    await page.goto(`/${id}.html`); await ready(page);
    const target = id === 'opening' ? { page: 4, button: '#copy-question', status: '#copy-question-status', field: '#draft-input' }
      : id === 'middle' ? { page: 2, button: '[data-activity-id="evidence-writing"] .dsl-copy', status: '[data-activity-id="evidence-writing"] .dsl-writing-status', field: '[data-field-id="evidence-output"]' }
      : { page: 2, button: '#copy-builder', status: '#builder-status', field: '#assembled' };
    await navigate(page, target.page);
    // Native keyboard activation avoids a moving pointer target while WebKit's
    // real smooth scroll/reveal animation settles; no force-click or app patch.
    await page.locator(target.button).focus();
    await expect(page.locator(target.button)).toBeFocused();
    await page.locator(target.button).press('Enter');
    await expect(page.locator(target.status)).toContainText(/cop(y|ying)/i);
    await expect(page.locator(target.field)).toBeVisible();
    expect(await page.locator(target.field).inputValue()).not.toBe('');
    if (id === 'middle') await expect(page.locator(target.field)).toHaveJSProperty('selectionStart', 0);
  });
}

test('original save/restore gaps are explicit, not silently repaired (KI-03/KI-04)', async ({ page }) => {
  await seed(page, 'middle', fixture('middle', 'completed').raw);
  await page.goto('/__original/middle.html'); await ready(page); await navigate(page, 2);
  await page.locator('#source').fill('Unsaved partial synthetic source');
  await page.locator('#research-model-button').click();
  await page.reload(); await ready(page); await navigate(page, 2);
  await expect(page.locator('#source')).not.toHaveValue('Unsaved partial synthetic source');
  await expect(page.locator('#research-model')).toBeHidden();
  await navigate(page, 7);
  const before = JSON.parse(await rawProgress(page, 'middle')).data.middleState.quizIndex;
  await page.locator('#quiz-next').click(); await page.reload(); await ready(page);
  expect(JSON.parse(await rawProgress(page, 'middle')).data.middleState.quizIndex).toBe(before);
  await seed(page, 'final', fixture('final', 'completed').raw);
  await page.goto('/__original/final.html'); await ready(page); await navigate(page, 2);
  await page.locator('#assembled').fill('Unsaved synthetic edit');
  await page.reload(); await ready(page); await navigate(page, 2);
  await expect(page.locator('#assembled')).not.toHaveValue('Unsaved synthetic edit');
  await navigate(page, 8); await page.locator('#goals input').first().check();
  await expect(page.locator('#selected-goals')).toContainText('My practice goals:');
  await page.reload(); await ready(page); await navigate(page, 8);
  await expect(page.locator('#goals input').first()).toBeChecked();
  await expect(page.locator('#selected-goals')).toHaveText('Select a goal above to make your practice plan.');
});
