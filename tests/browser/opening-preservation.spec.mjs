// MIT. Milestone-2 exact-extraction evidence remains immutable. Milestone 7 now
// tests the real module entry against pinned source, not obsolete classic scripts.
import { test, expect } from '@playwright/test';
import { readFileSync, readdirSync } from 'node:fs';
import { ready, navigate, maps, rawProgress } from '../helpers/legacy-journeys.mjs';
import { original } from '../helpers/baseline-source.mjs';
const fixture = name => JSON.parse(readFileSync(new URL(`../fixtures/progress/opening/${name}.json`, import.meta.url)));
const source = original('opening.html').toString();
const key = maps.opening.storageKey;
export async function seedOpening(page, raw, mount = '/') {
  await page.goto('/');
  await page.evaluate(({ key, raw }) => { if (raw === null) localStorage.removeItem(key); else localStorage.setItem(key, raw); }, { key, raw });
  await page.goto(`${mount}opening.html`); await ready(page);
}
for (const mount of ['/', '/discussion-skills-lab/']) {
  test(`${mount} Opening actual entry retains every original static passage, annotation, field and model; one writer/Print`, async ({ page }) => {
    await page.addInitScript(() => {
      window.openingWrites = [];
      const set = Storage.prototype.setItem;
      Storage.prototype.setItem = function(key, value) { if (key === 'dsl:opening-stage:v1') window.openingWrites.push(value); return set.call(this, key, value); };
      window.printCount = 0; window.print = () => window.printCount++;
    });
    await page.goto(`${mount}opening.html`); await ready(page);
    await expect(page.locator('[data-reference-print]')).toBeEnabled();
    await expect(page.locator('#classify-title')).toHaveText('Classify the Contribution');
    expect(await page.evaluate(() => window.openingWrites)).toEqual([]);
    expect(await page.evaluate(() => typeof window.DSL)).toBe('undefined');
    expect(await page.locator('script[src*="opening.js"]').getAttribute('type')).toBe('module');
    await expect(page.locator('script[src*="lesson-core.js"],.dsl-card,.flip-card')).toHaveCount(0);
    const missing = await page.evaluate(source => {
      const old = new DOMParser().parseFromString(source, 'text/html');
      const normalize = s => s.replace(/\s+/g, ' ').trim();
      const currentText = n => { const walker = document.createTreeWalker(n, NodeFilter.SHOW_TEXT); let child, out = []; while (child = walker.nextNode()) out.push(child.textContent); return normalize(out.join(' ')); };
      const missing = [];
      for (const view of old.querySelectorAll('.lesson-view')) {
        const current = document.getElementById(view.id), text = currentText(current);
        const walker = old.createTreeWalker(view, NodeFilter.SHOW_TEXT); let node;
        while (node = walker.nextNode()) {
          const value = normalize(node.textContent);
          if (value && !node.parentElement.closest('button,script,style,#quiz-summary') && !text.includes(value)) missing.push({ section: view.id, value });
        }
      }
      for (const field of old.querySelectorAll('.lesson-view [placeholder]')) if (document.getElementById(field.id)?.placeholder !== field.placeholder) missing.push({ field: field.id });
      const expected = normalize(old.querySelector('blockquote:has(.task-mark)').textContent);
      if (document.querySelector('.dsl-annotated-task').textContent !== expected) missing.push({ task: 'segment concatenation mismatch' });
      return missing;
    }, source);
    expect(missing).toEqual([]);
    await page.locator('.classify-answer').first().click(); expect(await page.evaluate(() => window.openingWrites.length)).toBe(1);
    await navigate(page, 7); await page.locator('[data-reference-print]').click(); expect(await page.evaluate(() => window.printCount)).toBe(1);
    expect(await page.evaluate(() => window.openingWrites.length)).toBe(1);
  });

  test(`${mount} Opening every valid v1 fixture silently restores drafts, selections and completed accessibility`, async ({ page }) => {
    for (const file of readdirSync(new URL('../fixtures/progress/opening/', import.meta.url))) {
      const record = fixture(file.replace('.json', ''));
      if (record.safety === 'unsafe') continue;
      await seedOpening(page, record.raw, mount);
      expect(await rawProgress(page, 'opening'), file).toBe(record.raw);
      const raw = record.raw === null ? { completed: [], data: {} } : JSON.parse(record.raw);
      for (const [id, value] of Object.entries(raw.data).filter(([id]) => id.endsWith('-input'))) await expect(page.locator(`#${id}`)).toHaveValue(value);
      for (const n of raw.completed) await expect(page.locator(`[data-go="${maps.opening.sections[n]}"]`)).toBeEnabled();
      await expect(page.locator('.analysis-tab[aria-selected="true"]')).toHaveCount(0);
      await expect(page.locator('.task-mark.on')).toHaveCount(0);
      const choice = raw.data['what-how-options'];
      if (Number.isInteger(choice)) await expect(page.locator('#what-how-options button').nth(choice)).toHaveAttribute('aria-pressed', 'true');
      if (!raw.data.dslUi) await expect(page.locator('#sequence-options [aria-pressed="true"]')).toHaveCount(0);
    }
  });
}
