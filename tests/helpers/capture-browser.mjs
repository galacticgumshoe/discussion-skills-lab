// Run once, only after source capture. Never updates an existing evidence file.
import { chromium } from '@playwright/test';
import { startServer } from './static-server.mjs';
import { freeze as exclusiveFreeze } from './freeze-source.mjs';
import { access } from 'node:fs/promises';
import { original, revision, root } from './baseline-source.mjs';
import { inventoryHTML, initializedDOM } from './content-baseline.mjs';
import { lessons, runLesson, ready, navigate } from './legacy-journeys.mjs';

async function freeze(path, value) {
  if (process.argv.includes('--resume')) {
    try { await access(`${root}tests/fixtures/${path}`); console.log(`Retained existing ${path}`); return; } catch {}
  }
  return exclusiveFreeze(path, value);
}

const serving = await startServer();
const browser = await chromium.launch();
const evidence = { revision, browser: browser.version(), node: process.version, platform: process.platform,
  viewport: { width: 1440, height: 1000 }, origin: serving.url, externalFailures: [], fonts: {}, captures: [] };
try {
  for (const id of ['index', ...lessons]) {
    const context = await browser.newContext({ viewport: evidence.viewport });
    const page = await context.newPage();
    page.on('requestfailed', request => evidence.externalFailures.push({ page: id, url: request.url(), error: request.failure() }));
    page.on('pageerror', error => console.error(`${id}: ${error.message}`));
    await page.goto(`${serving.url}/${id}.html`);
    await page.evaluate(() => document.fonts.ready);
    evidence.fonts[id] = await page.evaluate(() => ({ status: document.fonts.status,
      dmSans: document.fonts.check('16px "DM Sans"'), fraunces: document.fonts.check('16px Fraunces'),
      tailwind: !![...document.querySelectorAll('style')].find(s => s.textContent.includes('--tw-')) }));
    const source = original(`${id}.html`).toString();
    await freeze(`content/${id}-html.json`, await page.evaluate(inventoryHTML, source));
    await freeze(`visual/${id}-desktop.png`, await page.screenshot({ fullPage: true }));
    evidence.captures.push(`${id}-desktop.png`);
    if (id !== 'index') {
      await ready(page);
      await freeze(`legacy-maps/${id}-initialized-dom.json`, await page.evaluate(initializedDOM));
      const result = await runLesson(page, id, async (name, data) => {
        console.log(`${id}: ${name}`);
        await freeze(`progress/${id}/${name}.json`, { provenance: 'UI-observed', revision,
          origin: serving.url, mount: '/', browser: browser.version(), ...data });
      });
      await freeze(`content/${id}-question-behavior.json`, result.questions);
      await freeze(`visual/${id}-reference.png`, await page.screenshot({ fullPage: true }));
      await navigate(page, 0);
      await page.emulateMedia({ media: 'print' });
      await freeze(`visual/${id}-reference.pdf`, await page.pdf({ format: 'Letter', printBackground: true, preferCSSPageSize: true }));
      await freeze(`visual/${id}-print.png`, await page.screenshot({ fullPage: true }));
    }
    await context.close();
    const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const mobilePage = await mobile.newPage();
    await mobilePage.goto(`${serving.url}/${id}.html`);
    await mobilePage.evaluate(() => document.fonts.ready);
    await freeze(`visual/${id}-mobile.png`, await mobilePage.screenshot({ fullPage: true }));
    await mobile.close();
  }
  await freeze('visual/environment.json', evidence);
} finally {
  await browser.close();
  await serving.close();
}
