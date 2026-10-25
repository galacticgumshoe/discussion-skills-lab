import { test, expect } from '@playwright/test';
import { lessons, maps, ready, navigate } from '../helpers/legacy-journeys.mjs';
for (const mount of ['/', '/discussion-skills-lab/']) for (const id of lessons) {
  test(`${mount}${id} prints reference only even from ordinary lesson page`, async ({ page, browserName }, info) => {
    await page.goto(`${mount}${id}.html`); await ready(page);
    if (id === 'final') await expect(page.locator('#ref-print')).toBeEnabled();
    await navigate(page, maps[id].countedPages);
    await expect(page.getByRole('button', { name: 'Print quick reference', exact: true })).toHaveCount(1);
    const reference = page.locator(`#view-${maps[id].countedPages}`);
    const prose = await reference.locator('h2,h3,h4,p,li').allTextContents();
    await navigate(page, 0);
    await page.emulateMedia({ media: 'print' });
    await expect(reference).toBeVisible();
    for (let i = 0; i < maps[id].countedPages; i++) await expect(page.locator(`#view-${i}`)).toBeHidden();
    for (const node of await page.locator('button,input,textarea,select,.topbar,.rail,.mobile-nav,.bottom-controls').all()) await expect(node).toBeHidden();
    expect(await reference.locator('h2,h3,h4,p,li').allTextContents()).toEqual(prose);
    expect(prose.join(' ')).toContain('Quick Reference');
    await page.evaluate(() => document.fonts.ready);
    if (browserName === 'chromium') {
      const path = info.outputPath(`${id}-reference.pdf`);
      await page.pdf({ path, format: 'Letter', printBackground: true, preferCSSPageSize: true });
      await info.attach('reference PDF', { path, contentType: 'application/pdf' });
      if (id === 'final') {
        await page.emulateMedia({ media: 'screen' });
        await navigate(page, maps[id].countedPages);
        await page.emulateMedia({ media: 'print' });
        const referencePath = info.outputPath('final-from-reference-view.pdf');
        await page.pdf({ path: referencePath, format: 'Letter', printBackground: true, preferCSSPageSize: true });
        await info.attach('Final PDF from reference view', { path: referencePath, contentType: 'application/pdf' });
        await expect(page.locator('#reference-status')).toBeHidden();
      }
    }
  });
}
