import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { startServer } from './static-server.mjs';
import { freeze } from './freeze-source.mjs';
import { revision } from './baseline-source.mjs';
import { maps, ready, navigate } from './legacy-journeys.mjs';
const serving = await startServer(), browser = await chromium.launch();
const suffix = process.argv.includes('--settled') ? '-settled' : '';
const fonts = { revision, browser: browser.version(), origin: serving.url, pages: {} };
try {
  for (const id of ['index', 'opening', 'middle', 'final']) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto(`${serving.url}/`);
    if (id !== 'index') {
      const fixture = JSON.parse(readFileSync(new URL(`../fixtures/progress/${id}/completed.json`, import.meta.url)));
      await page.evaluate(({ key, raw }) => localStorage.setItem(key, raw), { key: maps[id].storageKey, raw: fixture.raw });
    }
    await page.goto(`${serving.url}/${id}.html`);
    if (id !== 'index') await ready(page);
    await page.evaluate(() => document.fonts.ready);
    if (suffix) await page.evaluate(async () => { await Promise.all(document.getAnimations().map(a => a.finished.catch(() => {}))); });
    fonts.pages[id] = await page.evaluate(() => ({
      status: document.fonts.status,
      dmSans400: document.fonts.check('400 16px "DM Sans"'),
      fraunces700: document.fonts.check('700 16px Fraunces'),
      faces: [...document.fonts].map(font => ({ family: font.family, weight: font.weight, status: font.status })),
      heading: { family: getComputedStyle(document.querySelector('h1,h2')).fontFamily, weight: getComputedStyle(document.querySelector('h1,h2')).fontWeight }
    }));
    if (id === 'middle' || id === 'final') {
      await freeze(`visual/${id}-explored${suffix}-mobile.png`, await page.screenshot({ fullPage: true }));
      await navigate(page, 2);
      if (suffix) await page.evaluate(async () => { await Promise.all(document.getAnimations().map(a => a.finished.catch(() => {}))); });
      await freeze(`visual/${id}-builder${suffix}-mobile.png`, await page.screenshot({ fullPage: true }));
    }
    await context.close();
  }
  await freeze(`visual/font-readiness${suffix}.json`, fonts);
} finally { await browser.close(); await serving.close(); }
