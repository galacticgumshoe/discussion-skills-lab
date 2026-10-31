import {test, expect} from '@playwright/test';
for (const mount of ['/', '/discussion-skills-lab/']) for (const id of ['opening','middle','final']) {
  test(`${mount}${id} semantic print survives view renumbering/reordering from ordinary and reference screens`, async ({page,browserName},info) => {
    await page.goto(`${mount}${id}.html`); await expect(page.locator('[data-reference-print]')).toBeEnabled();
    await expect(page.locator('[data-reference-print]')).toHaveCount(1);
    const reference = page.locator('[data-view-role="reference"]'), prose = await reference.locator('h2,h3,h4,p,li').allTextContents();
    await page.evaluate(() => { const ref=document.querySelector('[data-view-role="reference"]'); ref.id='arbitrary-resource'; ref.parentNode.prepend(ref); document.querySelectorAll('[data-view-role="lesson"]').forEach((node,i) => {node.id=`view-${7+i}`;}); });
    for (const fromReference of [false,true]) {
      if (fromReference) { await page.emulateMedia({media:'screen'}); await page.setViewportSize({width:1100,height:900}); await page.locator('#rail-links button').last().click(); }
      await page.emulateMedia({media:'print'}); await expect(reference).toBeVisible();
      for (const node of await page.locator('[data-view-role="lesson"],button,input,textarea,select,.topbar,.rail,.mobile-nav,.bottom-controls').all()) await expect(node).toBeHidden();
      expect(await reference.locator('h2,h3,h4,p,li').allTextContents()).toEqual(prose);
      const clipped = await reference.locator('[data-reference-content] :is(p,li,h3,h4)').evaluateAll(nodes => nodes.filter(node => node.scrollWidth > node.clientWidth + 2 && getComputedStyle(node).overflowX === 'hidden').length); expect(clipped).toBe(0);
      if(browserName==='chromium') { const path=info.outputPath(`${id}-${fromReference?'reference':'ordinary'}-semantic.pdf`); await page.pdf({path,format:'Letter',printBackground:true,preferCSSPageSize:true}); await info.attach('semantic reference PDF',{path,contentType:'application/pdf'}); }
    }
  });
  test(`${mount}${id} semantic print reports incomplete references independently of failed activities`, async ({page}) => {
    await page.route(`**/content/${id}/activities/*.json`,route=>route.abort());
    await page.goto(`${mount}${id}.html`); await expect(page.locator('[data-reference-print]')).toBeEnabled();
    await page.emulateMedia({media:'print'}); await expect(page.locator('[data-reference-content]')).toBeVisible();
    await expect(page.locator('[data-content-status]:visible')).toHaveCount(0);
    await page.emulateMedia({media:'screen'});
    await page.route(`**/content/${id}/reference/*.md`,route=>route.abort());
    await page.reload(); await expect(page.locator('[data-reference-retry]')).toHaveCount(1);
    await expect(page.locator('[data-reference-status]')).toContainText('could not load');
    await page.emulateMedia({media:'print'}); await expect(page.locator('[data-reference-status]')).toBeVisible();
    await expect(page.locator('[data-reference-print]')).toBeDisabled();
    await expect(page.locator('[data-view-role="lesson"]:visible,button:visible,input:visible,textarea:visible')).toHaveCount(0);
  });
}
