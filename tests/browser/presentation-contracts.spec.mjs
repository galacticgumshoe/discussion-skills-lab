// MIT. Consolidated public presentation checks; original content CC BY 4.0.
import {test, expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {original} from '../helpers/baseline-source.mjs';
import {observe, compare, manifest, presentationRecord, presentationReady} from '../helpers/presentation-contracts.mjs';
import {publicVisit, settle} from '../helpers/browser-probe.mjs';
const keys = {opening: 'dsl:opening-stage:v1', middle: 'dsl:middle:v1', final: 'dsl:final:v1'};
const errors = new WeakMap();
const layoutReady = page => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
// The pinned CDN script occasionally times out. Reloading the same public page is
// a setup retry, not an unstyled oracle: every attempt still requires the real
// generated stylesheet, and a persistent CDN outage fails explicitly.
async function visitWithStylesheet(page, url, settlePage = async () => {}) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    await page.goto(url);
    await settlePage();
    try {await presentationReady(page, 20_000); return;}
    catch (error) {
      if (attempt === 3) throw new Error(`Tailwind CDN unavailable after ${attempt} page loads: ${error.message}`, {cause: error});
    }
  }
}
async function headingContract(view, size, fitBox = true) {
  const heading = view.locator('h1,h2').first();
  await expect.poll(() => heading.evaluate(n => parseFloat(getComputedStyle(n).fontSize))).toBeCloseTo(size, 1);
  await expect(heading).toHaveCSS('font-weight', '700');
  expect(await heading.evaluate((n, fitBox) => {const s = getComputedStyle(n); return (!fitBox || n.scrollWidth <= n.clientWidth + 1) && s.overflowY === 'visible' && s.maxHeight === 'none';}, fitBox)).toBe(true);
}
test.beforeEach(({page}) => {const list = []; errors.set(page, list); page.on('pageerror', e => list.push(e.message));});
test.afterEach(({page}) => expect(errors.get(page)).toEqual([]));
for (const mount of ['/', '/discussion-skills-lab/']) for (const id of ['opening', 'middle', 'final']) {
  test(`${mount}${id} all authored presentation roles/states survive consolidation at desktop/breakpoint/mobile`, async ({page}) => {
    // One case now contains an entire lesson at three/four widths, rather than
    // the old per-section cases. Keep assertions exact while budgeting the work.
    test.setTimeout(600_000);
    // Paint roles do not need to replay every half-second transition. The direct
    // component contracts separately exercise normal 3D motion and reduced motion.
    await page.emulateMedia({reducedMotion: 'reduce'});
    for (const width of id === 'middle' ? [1440, 940, 760, 390] : [1440, 780, 390]) {
      await page.setViewportSize({width, height: 1000});
      const record = JSON.parse(presentationRecord(id)); if (id === 'final') record.data.finalState.notes = {};
      await page.goto(mount); await page.evaluate(({key, record}) => localStorage.setItem(key, record), {key: keys[id], record: JSON.stringify(record)});
      await visitWithStylesheet(page, `/__original${mount}${id}.html`, async () => {await expect(page.locator('#view-0')).toBeVisible();}); const expected = await observe(page, id, true, width);
      await page.evaluate(({key, record}) => localStorage.setItem(key, record), {key: keys[id], record: JSON.stringify(record)});
      await visitWithStylesheet(page, `${mount}${id}.html`, async () => {await expect(page.locator('#lesson-status')).toBeHidden(); await expect(page.locator('[data-content-status]').filter({visible: true})).toHaveCount(0);});
      compare(await observe(page, id, false, width), expected);
    }
  });
  test(`${mount}${id} narrow controls/card faces, enlarged title/card contracts, reduced motion and restored cues`, async ({page}) => {
    const record = JSON.parse(presentationRecord(id));
    if (id === 'final') record.data.finalState.flips = {};
    const completed = JSON.stringify(record);
    await page.goto(mount); await page.evaluate(({key, completed}) => localStorage.setItem(key, completed), {key: keys[id], completed});
    await page.goto(`${mount}${id}.html`); await expect(page.locator('#lesson-status')).toBeHidden(); await page.setViewportSize({width: 320, height: 1000}); await page.emulateMedia({reducedMotion: 'reduce'});
    await settle(page);
    // Preserve the original scopes: Opening enlarges the root, Middle's card
    // check enlarges #views, Final enlarges titles separately from its controls.
    await page.evaluate(id => {if (id === 'opening') document.documentElement.style.fontSize = '200%';}, id);
    if (id === 'final') {
      // Like the old heading suite, enlarge once for the entire title sweep.
      // Repeated root-size toggles around every hidden view exercise a different
      // rem-restyling lifecycle, not the retained title/enlargement contract.
      await page.evaluate(() => {document.documentElement.style.fontSize = '200%';});
      for (const [index, section] of manifest(id).sections.entries()) {
        if (section.reference) continue;
        await publicVisit(page, section.id); await layoutReady(page);
        await headingContract(page.locator(`[data-section-id="${section.id}"]`), index === 0 ? 72 : 59.2);
      }
      await page.evaluate(() => {document.documentElement.style.fontSize = '';}); await layoutReady(page);
    }
    for (const [index, section] of manifest(id).sections.entries()) {
      if (id === 'middle') await page.evaluate(index => {document.querySelector('#views').style.fontSize = [0, 1, 2, 5].includes(index) ? '200%' : '';}, index);
      await publicVisit(page, section.id); await settle(page); await layoutReady(page);
      const view = page.locator(`[data-section-id="${section.id}"]`);
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth), {message: `${id}/${section.id} narrow overflow after layout`}).toBeLessThanOrEqual(1);
      if (!section.reference) {
        await headingContract(view, id === 'opening' ? 59.2 : index === 0 ? id === 'middle' ? 37.6 : 36 : 29.6, id !== 'middle');
      }
      for (const card of await view.locator('.dsl-card').all()) {
        await expect(card).toHaveAttribute('aria-pressed', 'false');
        if (id === 'final') await expect(card.locator('.dsl-card-front>.dsl-card-explored')).toBeHidden();
        const front = card.locator('.dsl-card-front');
        if (id === 'final') {
          await expect(front).toHaveCSS('font-weight', '400'); await expect(front).toHaveCSS('border-radius', '15px');
          await expect(front).toHaveCSS('background-color', 'rgb(255, 255, 255)'); await expect(front).toHaveCSS('color', 'rgb(20, 43, 73)');
        }
        for (const side of ['front', 'back']) {
          if (side === 'back') {await card.focus(); await card.press('Space');}
          for (const node of await card.locator(`.dsl-card-${side},.dsl-card-${side} .dsl-card-copy`).all()) expect(await node.evaluate(n => n.scrollWidth <= n.clientWidth + 1 && n.scrollHeight <= n.clientHeight + 2)).toBe(true);
        }
        await expect(card).toBeFocused(); await expect(front).toHaveAttribute('aria-hidden', 'true');
        await expect(card.locator('.dsl-card-back .dsl-card-explored')).toBeVisible();
        await card.press('Space'); await expect(card).toBeFocused(); await expect(card.locator('.dsl-card-back')).toHaveAttribute('aria-hidden', 'true');
        const cue = card.locator('.dsl-card-front>.dsl-card-explored'); await expect(cue).toHaveText('✓ Explored'); await expect(cue).toBeVisible();
        if (id === 'final') await expect(cue).toHaveCSS('color', 'rgb(8, 127, 131)');
        expect(await card.getAttribute('aria-label')).not.toContain('Explored');
        const metrics = await card.evaluate(n => {const face = n.querySelector('.dsl-card-front').getBoundingClientRect(), copy = n.querySelector('.dsl-card-front .dsl-card-content').getBoundingClientRect(), mark = n.querySelector('.dsl-card-front>.dsl-card-explored').getBoundingClientRect(), hint = n.querySelector('.dsl-card-hint').getBoundingClientRect(); return {inside: mark.left >= face.left && mark.right <= face.right + 1 && mark.bottom <= face.bottom + 1, clear: copy.bottom <= Math.min(mark.top, hint.top) + 1 / 64, separate: mark.right <= hint.left || hint.right <= mark.left || mark.bottom <= hint.top || hint.bottom <= mark.top};});
        expect(metrics).toEqual({inside: true, clear: true, separate: true});
        await expect(card.locator('.dsl-card-inner')).toHaveCSS('transition-duration', '0s');
      }
      const clipped = await view.locator('button,textarea,select').evaluateAll(nodes => nodes.filter(n => n.getClientRects().length && n.scrollWidth > n.clientWidth + 2).map(n => n.id || n.className)); expect(clipped).toEqual([]);
    }
    // The same earned cues survive a real bootstrap; card faces remain session-only.
    await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden();
    for (const section of manifest(id).sections) {
      await publicVisit(page, section.id);
      for (const card of await page.locator(`[data-section-id="${section.id}"] .dsl-card`).all()) {await expect(card).toHaveAttribute('aria-pressed', 'false'); await expect(card.locator('.dsl-card-front>.dsl-card-explored')).toBeVisible();}
    }
    await page.emulateMedia({media: 'print'}); await expect(page.locator('[data-view-role="reference"]')).toBeVisible();
    for (const view of await page.locator('[data-view-role="lesson"]').all()) await expect(view).toBeHidden();
    await expect(page.locator('button,input,textarea,select').filter({visible: true})).toHaveCount(0);
    if (id === 'opening') {await expect(page.locator('.opening-reference-group')).toHaveCount(4); await expect(page.locator('.opening-reference-1 li')).toHaveCount(6);}
  });
}

for (const mount of ['/', '/discussion-skills-lab/']) test(`${mount} Opening essentials retain compact paired rows at the exact mobile breakpoint`, async ({page}) => {
  const source = original('opening.html').toString();
  await page.goto(mount); await page.evaluate(() => localStorage.setItem('dsl:opening-stage:v1', JSON.stringify({completed: [0, 1, 2], data: {}})));
  await page.goto(`${mount}opening.html`); await expect(page.locator('#lesson-status')).toBeHidden(); await publicVisit(page, 'clarifications');
  const expected = await page.evaluate(source => {const panel = new DOMParser().parseFromString(source, 'text/html').querySelector('#view-3 .card.soft'); return {heading: panel.querySelector('h3').textContent, labels: [...panel.querySelector('.grid').querySelectorAll('p')].map(n => n.textContent)};}, source);
  const panel = page.locator('#view-3 .dsl-tone-soft'), grid = panel.locator(':scope>.dsl-layout-two-column');
  for (const width of [1440, 940, 780, 640, 639, 390, 320]) {
    await page.setViewportSize({width, height: 1000}); if (width === 320) await page.evaluate(() => {document.documentElement.style.fontSize = '200%';}); await settle(page);
    await expect(panel.getByRole('heading', {name: expected.heading, exact: true})).toBeVisible(); await expect(grid.locator('p').filter({hasText: /^✓ /})).toHaveText(expected.labels);
    const result = await grid.evaluate(n => {const r = n.getBoundingClientRect(), s = getComputedStyle(n); return {gap: parseFloat(s.rowGap), columns: s.gridTemplateColumns.split(' ').length, width: r.width, margins: [...n.children].map(c => parseFloat(getComputedStyle(c).marginTop)), rows: [...n.querySelectorAll('p')].filter(p => p.textContent.startsWith('✓ ')).map(p => {const a = p.getBoundingClientRect(); return {top: a.top - r.top, bottom: a.bottom - r.top, left: a.left - r.left};})};});
    expect(result.gap).toBe(12); expect(result.columns).toBe(width >= 640 ? 2 : 1); expect(result.margins).toEqual([0, 0, 0, 0]);
    result.rows.forEach((row, i) => {const column = i % result.columns, index = Math.floor(i / result.columns), above = result.rows.slice((index - 1) * result.columns, index * result.columns); expect(Math.abs(row.top - (index ? Math.max(...above.map(n => n.bottom)) + 12 : 0))).toBeLessThanOrEqual(1 / 64); expect(Math.abs(row.left - (column ? (result.width + 12) / 2 : 0))).toBeLessThanOrEqual(1 / 64);});
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
});
