// MIT. Disposable DOM for exported API checks, not a lesson or storage engine.
import {expect} from '@playwright/test';
export async function apiPage(page, mount) {
  await page.goto(`${mount}__fixtures/new-module/reference.html`);
  await page.evaluate(() => window.fixtureApp.ready);
  await page.evaluate(() => { window.fixtureApp.destroy(); document.body.replaceChildren(); });
}
export async function publicVisit(page, id) {
  if (await page.locator('#section-select').isVisible()) await page.locator('#section-select').selectOption(id);
  else await page.locator(`[data-go="${id}"]`).click();
  await expect(page.locator(`[data-section-id="${id}"]`)).toBeVisible();
}
export const settle = page => page.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {})));
});
