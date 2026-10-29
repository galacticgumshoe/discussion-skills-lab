import {test, expect} from '@playwright/test';
const key = 'dsl:sample-module:v1';
for (const mount of ['/', '/discussion-skills-lab/']) {
  const url = `${mount}__fixtures/new-module/index.html`;
  test(`${mount} new module shares activities, gates, immediate drafts and ID-only progress`, async ({page}) => {
    const go = async index => {
      if (await page.locator('#section-select').isVisible()) await page.selectOption('#section-select',await page.locator('#section-select option').nth(index).getAttribute('value'));
      else await page.locator('#rail-links button').nth(index).click();
    };
    await page.goto(url); await expect(page.locator('#lesson-status')).toBeHidden();
    await expect(page.locator('strong').filter({hasText:'Test Markdown label'})).toBeVisible(); await expect(page.locator('#next-section')).toBeDisabled();
    await go(2); await expect(page.locator('[data-reference-print]')).toBeEnabled();
    await go(0); await page.getByRole('button',{name:'Test option A',exact:true}).click(); await expect(page.locator('#next-section')).toBeDisabled();
    const feedback = await page.locator('.dsl-feedback').elementHandle();
    await page.getByRole('button',{name:'Test option B',exact:true}).click(); await expect(page.locator('#next-section')).toBeEnabled();
    await page.getByRole('button',{name:'Test option A',exact:true}).click(); await expect(page.locator('#next-section')).toBeEnabled();
    expect(await feedback.evaluate(node => node === document.querySelector('.dsl-feedback'))).toBe(true);
    await page.locator('#next-section').click(); await page.getByLabel('Test draft', {exact:true}).fill('synthetic test draft');
    expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)).fields['test-draft'], key)).toBe('synthetic test draft');
    await page.getByLabel('Test check A', {exact:true}).check(); await expect(page.locator('#next-section')).toBeDisabled();
    await page.getByLabel('Test check B', {exact:true}).check(); await expect(page.locator('#next-section')).toBeEnabled();
    await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden(); await expect(page.locator('#progress-text')).toHaveText('2 of 2 pages completed');
    await go(1); await expect(page.getByLabel('Test draft',{exact:true})).toHaveValue('synthetic test draft');
    await page.getByLabel('Test draft',{exact:true}).fill(''); await page.getByLabel('Test check A',{exact:true}).uncheck(); await expect(page.locator('#next-section')).toBeEnabled();
    const record = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), key); expect(record.schemaVersion).toBe(1); expect(record.completedSections).toEqual(['test-explanation','test-worksheet']);
    expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([key]);
    await page.emulateMedia({media:'print'});
    await expect(page.locator('[data-view-role="reference"]')).toBeVisible();
    await expect(page.locator('[data-view-role="lesson"]:visible,textarea:visible,button:visible')).toHaveCount(0);
    await expect(page.locator('[data-reference-content]')).toContainText('Complete test reference label.');
  });
  test(`${mount} new reference-only configuration has no quiz or storage access`, async ({page}) => {
    await page.addInitScript(() => Object.defineProperty(window, 'localStorage', {get() {throw Error('Read-only fixture must not touch storage');}}));
    await page.goto(url.replace('index.html','reference.html')); await expect(page.locator('#lesson-status')).toBeHidden();
    await expect(page.locator('[data-reference-print]')).toBeEnabled(); await expect(page.locator('#storage-warning')).toBeHidden();
    await expect(page.locator('#progress-text')).toHaveText('0 of 0 pages completed'); await expect(page.locator('#next-section')).toBeHidden(); await expect(page.locator('.dsl-question')).toHaveCount(0);
    await page.emulateMedia({media:'print'}); await expect(page.locator('[data-view-role="reference"]')).toBeVisible(); await expect(page.locator('button:visible')).toHaveCount(0);
  });
  test(`${mount} new module corrupt and unknown-version storage is never overwritten`, async ({page}) => {
    for (const raw of ['{bad', JSON.stringify({schemaVersion:99,completedSections:[],activities:{},fields:{'test-draft':'synthetic retained'},flags:{},ui:{}})]) {
      await page.goto(mount); await page.evaluate(({key,raw}) => localStorage.setItem(key,raw),{key,raw});
      await page.goto(url); await expect(page.locator('#lesson-status')).toBeHidden(); await expect(page.locator('#storage-warning')).toBeVisible();
      await page.getByRole('button',{name:'Test option B',exact:true}).click(); await expect(page.locator('#next-section')).toBeEnabled();
      expect(await page.evaluate(key => localStorage.getItem(key),key)).toBe(raw);
    }
  });
}
