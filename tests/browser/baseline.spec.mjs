import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { lessons, maps, runLesson, navigate, ready, rawProgress } from '../helpers/legacy-journeys.mjs';
import { inventoryHTML, initializedDOM, generatedCopy } from '../helpers/content-baseline.mjs';
import { original } from '../helpers/baseline-source.mjs';
const fixture = path => JSON.parse(readFileSync(new URL(`../fixtures/${path}`, import.meta.url)));

for (const mount of ['/', '/discussion-skills-lab/']) {
  test(`${mount} homepage, exact static content and local references`, async ({ page, request }) => {
    const missing = [];
    page.on('response', response => { if (new URL(response.url()).origin === new URL(page.url()).origin && response.status() >= 400) missing.push(response.url()); });
    for (const id of ['index', ...lessons]) {
      await page.goto(`${mount}${id}.html`);
      const source = await (await request.get(`${mount}${id}.html`)).text();
      // Extraction changes head child-node positions, not instructional markup.
      // The unit test checks the entire transformed HTML byte-for-byte; compare
      // inert content against the pinned HTML without mutable node-path indexes.
      const inventory = await page.evaluate(inventoryHTML, source);
      if (id === 'opening') {
        const withoutIdentity = entries => entries.map(({ identity, ...entry }) => entry);
        const baseline = await page.evaluate(inventoryHTML, original('opening.html').toString());
        expect(baseline).toEqual(fixture('content/opening-html.json'));
        expect(withoutIdentity(inventory)).toEqual(withoutIdentity(baseline));
      } else if (id === 'final') {
        // Reference prose now has a separate exact semantic comparison against
        // the same sealed source; all non-reference static content stays exact.
        const baseline = await page.evaluate(inventoryHTML, original('final.html').toString());
        expect(baseline).toEqual(fixture('content/final-html.json'));
        const activity = entries => entries.filter(entry => entry.section !== 'view-9');
        expect(activity(inventory)).toEqual(activity(baseline));
      } else expect(inventory).toEqual(fixture(`content/${id}-html.json`));
      const urls = await page.locator('[src],a[href],link[href]').evaluateAll(nodes => nodes.map(n => n.src || n.href).filter(Boolean));
      for (const href of new Set(urls)) {
        const url = new URL(href);
        if (url.origin !== new URL(page.url()).origin) continue;
        expect(url.pathname.startsWith(mount)).toBeTruthy();
        const response = await request.get(url.href, { maxRedirects: 0 });
        expect(response.status(), url.href).toBe(200);
        if (url.hash) expect(await page.locator(url.hash).count(), url.href).toBeGreaterThan(0);
      }
    }
    expect(missing).toEqual([]);
  });

  for (const id of lessons) {
    test(`${mount}${id} fresh navigation and initialized identities`, async ({ page }) => {
      await page.goto(`${mount}${id}.html`); await ready(page);
      expect(await page.evaluate(initializedDOM)).toEqual(fixture(`legacy-maps/${id}-initialized-dom.json`));
      expect(await page.evaluate(generatedCopy, id)).toEqual(fixture('content/generated-controls.json').lessons[id]);
      for (let i = 0; i <= maps[id].countedPages; i++) {
        const allowed = i === 0 || i === maps[id].countedPages;
        if (allowed) await expect(page.locator(`[data-go="${i}"]`)).toBeEnabled();
        else await expect(page.locator(`[data-go="${i}"]`)).toBeDisabled();
        expect(await page.locator(`#section-select option[value="${i}"]`).isDisabled()).toBe(!allowed);
      }
      await expect(page.locator('#previous-section')).toBeDisabled();
      await expect(page.locator('#next-section')).toBeDisabled();
      await navigate(page, maps[id].countedPages);
      await expect(page.getByRole('button', { name: 'Print quick reference', exact: true })).toHaveCount(1);
      await expect(page.locator('#next-section')).toBeHidden();
      expect(JSON.parse(await rawProgress(page, id) || '{"completed":[]}').completed).toEqual([]);
      await navigate(page, 0);
      if (await page.locator('#rail-toggle').isVisible()) {
        await page.locator('#rail-toggle').click();
        await expect(page.locator('#rail-toggle')).toHaveAttribute('aria-expanded', 'false');
        await expect(page.locator('#rail-links')).toBeHidden();
        await page.locator('#rail-toggle').click();
        await expect(page.locator('#rail-links')).toBeVisible();
      } else await expect(page.locator('#section-select')).toBeVisible();
    });

    test(`${mount}${id} complete real activities, per-page gates, every answer and feedback`, async ({ page }) => {
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(`${mount}${id}.html`);
      const result = await runLesson(page, id);
      expect(result.questions).toEqual(fixture(`content/${id}-question-behavior.json`));
      await page.reload(); await ready(page);
      expect(JSON.parse(await rawProgress(page, id)).completed).toHaveLength(maps[id].countedPages);
      expect(errors).toEqual([]);
    });
  }
}
