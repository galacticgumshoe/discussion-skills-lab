import { chromium } from '@playwright/test';
import { freeze } from './freeze-source.mjs';
import { startServer } from './static-server.mjs';
import { generatedCopy } from './content-baseline.mjs';
import { ready } from './legacy-journeys.mjs';
import { revision } from './baseline-source.mjs';
const serving = await startServer(), browser = await chromium.launch();
const result = { revision, origin: serving.url, mount: '/__original/', lessons: {} };
try {
  for (const id of ['opening', 'middle', 'final']) {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(`${serving.url}/__original/${id}.html`); await ready(page);
    result.lessons[id] = await page.evaluate(generatedCopy, id);
    await context.close();
  }
  await freeze('content/generated-controls.json', result);
} finally { await browser.close(); await serving.close(); }
