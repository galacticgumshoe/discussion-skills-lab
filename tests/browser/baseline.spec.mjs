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
      // Shared-shell entries no longer own instructional markup. Keep the sealed
      // original inventory oracle and compare live external content independently;
      // unit guards check current structure and exact served bytes, not old cutovers.
      const inventory = await page.evaluate(inventoryHTML, source);
      if (id === 'opening') {
        const baseline = await page.evaluate(inventoryHTML, original('opening.html').toString());
        expect(baseline).toEqual(fixture('content/opening-html.json'));
        await expect(page.locator('#lesson-status')).toBeHidden();
        await expect(page.locator('[data-activity-id]')).toHaveCount(10);
      } else if (id === 'final') {
        // Final prose/emphasis/questions are independently compared in
        // final-lesson/final-migration, not the removed inert activity shell.
        const baseline = await page.evaluate(inventoryHTML, original('final.html').toString());
        expect(baseline).toEqual(fixture('content/final-html.json'));
        await expect(page.locator('#lesson-status')).toBeHidden();
        await expect(page.locator('[data-activity-id]')).toHaveCount(21);
      } else if (id === 'middle') {
        // Exact migrated prose/emphasis/questions are independently compared in
        // middle-lesson/middle-migration, not the removed inert activity shell.
        expect(await page.evaluate(inventoryHTML, original('middle.html').toString())).toEqual(fixture('content/middle-html.json'));
        await expect(page.locator('#lesson-status')).toBeHidden();
        await expect(page.locator('[data-activity-id]')).toHaveCount(19);
       } else {
         // Preserve the immutable inert inventory, then compare the actual
         // content-driven homepage semantically rather than old DOM node paths.
         expect(await page.evaluate(inventoryHTML, original('index.html').toString())).toEqual(fixture('content/index-html.json'));
         await expect(page.locator('[data-home-status]')).toBeHidden();
         const expected = await page.evaluate(source => {
           const doc = new DOMParser().parseFromString(source, 'text/html');
           return {heading:doc.querySelector('h1').textContent, intro:doc.querySelector('.intro').textContent, note:doc.querySelector('.note').textContent, footer:doc.querySelector('footer').textContent,
             cards:[...doc.querySelectorAll('.lesson')].map(node=>[node.querySelector('h2').textContent,node.querySelector('p').textContent,node.querySelector('a').getAttribute('href')])};
         }, original('index.html').toString());
         await expect(page.locator('h1')).toHaveText(expected.heading); await expect(page.locator('.intro')).toHaveText(expected.intro);
         await expect(page.locator('.note')).toHaveText(expected.note); await expect(page.locator('footer')).toHaveText(expected.footer);
         expect(await page.locator('.lesson').evaluateAll(nodes=>nodes.map(node=>[node.querySelector('h2').textContent,node.querySelector('p').textContent,node.querySelector('a').getAttribute('href')]))).toEqual(expected.cards);
       }
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
      if (id === 'middle') {
        await expect(page.locator('.lesson-view')).toHaveCount(9);
        await expect(page.locator('#welcome-heading')).toHaveText('Making an Impact');
        await expect(page.locator('#s1-title')).toHaveText('Two Ways to Help a Discussion');
        await expect(page.locator('#reference-title')).toHaveText('Middle Stage Quick Reference');
      } else if (id === 'final') {
        await expect(page.locator('.lesson-view')).toHaveCount(10);
        await expect(page.locator('#title-0')).toHaveText('Closing with Purpose');
        await expect(page.locator('#title-1')).toHaveText('Two Ways to Bring Ideas Together');
        await expect(page.locator('#reference-title')).toHaveText('Final Stage Quick Reference');
      } else if (id === 'opening') {
        await expect(page.locator('.lesson-view')).toHaveCount(8);
        await expect(page.locator('#section-1-heading')).toHaveText('How a Discussion Round Works');
        await expect(page.locator('#quiz-heading')).toHaveText('Put the Opening Together');
        await expect(page.locator('#reference-heading')).toHaveText('Opening Stage Quick Reference');
        await expect(page.locator('.dsl-card')).toHaveCount(0);
      } else {
        expect(await page.evaluate(initializedDOM)).toEqual(fixture(`legacy-maps/${id}-initialized-dom.json`));
        expect(await page.evaluate(generatedCopy, id)).toEqual(fixture('content/generated-controls.json').lessons[id]);
      }
      for (let i = 0; i <= maps[id].countedPages; i++) {
        const allowed = i === 0 || i === maps[id].countedPages;
        const value = maps[id].sections[i];
        if (allowed) await expect(page.locator(`[data-go="${value}"]`)).toBeEnabled();
        else await expect(page.locator(`[data-go="${value}"]`)).toBeDisabled();
        expect(await page.locator(`#section-select option[value="${value}"]`).isDisabled()).toBe(!allowed);
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
