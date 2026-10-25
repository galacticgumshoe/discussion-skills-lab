import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { ready, navigate, maps, rawProgress } from '../helpers/legacy-journeys.mjs';

const fixture = name => JSON.parse(readFileSync(new URL(`../fixtures/progress/opening/${name}.json`, import.meta.url)));

// Compare the actual cascade with pinned replay, including cues that screenshots
// alone cannot reliably verify. Geometry/pixel differences remain review evidence.
function presentation() {
  const properties = ['display', 'backgroundColor', 'color', 'borderTopColor', 'borderTopWidth',
    'borderRadius', 'padding', 'fontFamily', 'fontSize', 'fontWeight', 'boxShadow'];
  return [...document.querySelectorAll('.lesson-view:not([hidden]) .card,.lesson-view:not([hidden]) .choice,.timeline-item,.timeline-item button')]
    .map(node => ({ className: node.className, styles: Object.fromEntries(properties.map(key => [key, getComputedStyle(node)[key]])) }));
}

for (const mount of ['/', '/discussion-skills-lab/']) {
  test(`${mount} Opening extracted scope/order, exact restored state and replay presentation`, async ({ page, browserName }, info) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    // Observe the real engine, without replacing any lesson behavior.
    await page.addInitScript(() => {
      window.extractionCalls = [];
      let dsl;
      Object.defineProperty(window, 'DSL', {
        configurable: true,
        get: () => dsl,
        set(value) {
          dsl = value;
          const create = value.createLesson;
          value.createLesson = config => {
            window.extractionCalls.push(['create', config.id, config.total, config.reference]);
            const lesson = create(config);
            const init = lesson.init;
            lesson.init = () => { window.extractionCalls.push(['init']); return init(); };
            return lesson;
          };
        }
      });
    });
    await page.goto('/');
    const observations = [];
    const screenshots = [];
    for (const prefix of ['/__original', '']) {
      const observation = { restores: [], styles: [] };
      for (const name of ['fresh', 'partial-first', 'mid-lesson', 'completed', 'correct-ever-then-incorrect']) {
        await page.evaluate(({ key, raw }) => localStorage.setItem(key, raw), { key: maps.opening.storageKey, raw: fixture(name).raw });
        await page.goto(`${prefix}${mount}opening.html`); await ready(page);
        expect(await page.evaluate(() => window.extractionCalls)).toEqual([['create', 'opening-stage', 7, 7], ['init']]);
        observation.restores.push({ name, raw: await rawProgress(page, 'opening'),
          fields: await page.locator('#problem-input,#accomplishment-input,#draft-input').evaluateAll(nodes => nodes.map(n => n.value)),
          selections: await page.locator('.selected,.selected-answer').evaluateAll(nodes => nodes.map(n => n.textContent)),
          progress: await page.locator('#progress-text').textContent() });
      }
      if (!prefix) {
        expect(await page.locator('head link[rel="stylesheet"]').evaluateAll(nodes => nodes.map(n => n.getAttribute('href')))).toEqual([
          'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Fraunces:wght@600;700&display=swap',
          'assets/css/opening.css', 'assets/css/shared.css'
        ]);
        expect(await page.locator('script[src]').evaluateAll(nodes => nodes.map(n => ({ src: n.getAttribute('src'), async: n.async, defer: n.defer, type: n.type })))).toEqual([
          { src: 'https://cdn.tailwindcss.com/3.4.17', async: false, defer: false, type: 'text/javascript' },
          { src: 'assets/js/lesson-core.js', async: false, defer: false, type: '' },
          { src: 'assets/js/opening.js', async: false, defer: false, type: '' }
        ]);
        await expect(page.locator('script:not([src])')).toHaveCount(0);
      }
      await page.evaluate(() => document.fonts.ready);
      const images = [];
      for (const section of [0, 1, 6, 7]) {
        await navigate(page, section);
        if (section === 1) await page.locator('.timeline-toggle').first().click();
        observation.styles.push(await page.evaluate(presentation));
        if (browserName === 'chromium') {
          const image = await page.screenshot({ fullPage: true });
          images.push(image);
          await info.attach(`${prefix ? 'original' : 'extracted'}-section-${section}`, { body: image, contentType: 'image/png' });
        }
      }
      await navigate(page, 0);
      await page.emulateMedia({ media: 'print' });
      await expect(page.locator('#view-7')).toBeVisible();
      if (browserName === 'chromium') {
        const image = await page.screenshot({ fullPage: true });
        images.push(image);
        await info.attach(`${prefix ? 'original' : 'extracted'}-print`, { body: image, contentType: 'image/png' });
        const path = info.outputPath(`${prefix ? 'original' : 'extracted'}-reference.pdf`);
        await page.pdf({ path, format: 'Letter', printBackground: true, preferCSSPageSize: true });
        await info.attach(`${prefix ? 'original' : 'extracted'} PDF`, { path, contentType: 'application/pdf' });
      }
      await page.emulateMedia({ media: 'screen' });
      observations.push(observation);
      screenshots.push(images);
    }
    expect(observations[1]).toEqual(observations[0]);
    expect(errors).toEqual([]);
    await info.attach('extraction comparison', { body: JSON.stringify({
      exactRestoresAndComputedStyles: true,
      screenshotByteEquality: screenshots[0].map((image, i) => image.equals(screenshots[1][i]))
    }, null, 2), contentType: 'application/json' });
  });
}
