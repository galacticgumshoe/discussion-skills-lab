// MIT. Shared footer on real public entries, including static/no-JavaScript output.
import {test, expect} from '@playwright/test';

const entries = ['index', 'opening', 'middle', 'final', 'before-round'];
const links = [
  {text:'CC BY 4.0', href:'CONTENT_LICENSE.md'},
  {text:'MIT License', href:'LICENSE'},
  {text:'Email Rhys for help', href:'mailto:rhysgalacticgumshoe@gmail.com'},
  {text:'GitHub repository', href:'https://github.com/galacticgumshoe/discussion-skills-lab'}
];
async function checkFooter(page, mount) {
  const footer = page.getByRole('contentinfo');
  await expect(footer).toHaveCount(1);
  await expect(footer).toBeVisible();
  await expect(footer.locator('.site-footer-copyright')).toHaveText('© Rhys Jones. Instructional content and activities: CC BY 4.0. Code: MIT License.');
  expect(await footer.locator('a').evaluateAll(nodes => nodes.map(node => ({text:node.textContent, href:node.getAttribute('href')})))).toEqual(links);
  for (const href of ['CONTENT_LICENSE.md', 'LICENSE']) {
    expect(await footer.locator(`a[href="${href}"]`).evaluate(node => new URL(node.href).pathname)).toBe(`${mount}${href}`);
  }
  return footer;
}

for (const mount of ['/', '/discussion-skills-lab/']) {
  for (const entry of entries) {
    test(`${mount}${entry} common footer: links, header identity, keyboard, wrapping and print isolation`, async ({page, browserName}) => {
      await page.goto(`${mount}${entry}.html`);
      const home = entry === 'index';
      await expect(page.locator(home ? '[data-home-status]' : '#lesson-status')).toBeHidden();
      if (!home) await expect(page.locator('[data-reference-print]')).toBeEnabled();
      const footer = await checkFooter(page, mount);
      const identity = await footer.evaluate(node => {
        const style = getComputedStyle(node), header = getComputedStyle(document.querySelector('header'));
        return {background:style.backgroundColor, color:style.color, font:style.fontFamily, headerBackground:header.backgroundColor, headerFont:header.fontFamily, position:style.position};
      });
      expect(identity.background).toBe(identity.headerBackground);
      expect(identity.color).toBe('rgb(255, 255, 255)');
      expect(identity.font).toBe(identity.headerFont);
      expect(identity.position).toBe('static');
      const email = footer.getByRole('link', {name:'Email Rhys for help'});
      await email.focus();
      await expect(email).toBeFocused();
      expect(await email.evaluate(node => getComputedStyle(node).outlineStyle)).toBe('solid');
      // macOS WebKit uses Option+Tab to include links (as in the lesson keyboard tests).
      await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
      await expect(footer.getByRole('link', {name:'GitHub repository'})).toBeFocused();
      await page.keyboard.press(browserName === 'webkit' ? 'Alt+Shift+Tab' : 'Shift+Tab');
      await expect(email).toBeFocused();
      for (const width of [1440, 850, 390, 320]) {
        await page.setViewportSize({width, height:900});
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
        expect(await footer.evaluate(node => {
          const bounds = node.getBoundingClientRect();
          return [...node.querySelectorAll('a')].every(link => [...link.getClientRects()].every(rect => rect.left >= bounds.left && rect.right <= bounds.right + 1));
        })).toBe(true);
        // Read both rectangles together; keyboard focus may still be smooth-scrolling.
        expect(await footer.evaluate((node, selector) => node.getBoundingClientRect().top >= document.querySelector(selector).getBoundingClientRect().bottom - 1, home ? 'main' : 'body > .app-shell')).toBe(true);
      }
      await page.emulateMedia({media:'print'});
      await expect(footer).toBeHidden();
      if (!home) {
        await expect(page.locator('[data-reference-sheet]')).toBeVisible();
        await expect(page.locator('[data-view-role="lesson"]:visible')).toHaveCount(0);
      }
    });
  }
  test(`${mount} common footer works on every page without JavaScript`, async ({browser}) => {
    const context = await browser.newContext({javaScriptEnabled:false});
    try {
      const page = await context.newPage();
      for (const entry of entries) {
        await page.goto(`http://127.0.0.1:${process.env.DSL_TEST_PORT}${mount}${entry}.html`);
        await checkFooter(page, mount);
      }
    } finally { await context.close(); }
  });
}
