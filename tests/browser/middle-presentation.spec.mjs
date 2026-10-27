import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const raw = JSON.parse(readFileSync(new URL('../fixtures/progress/middle/completed.json', import.meta.url))).raw;
const settle = page => page.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {})));
});
const styles = locator => locator.evaluate(node => {
  const s = getComputedStyle(node);
  return Object.fromEntries(['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'color', 'backgroundColor', 'borderRadius'].map(key => [key, s[key]]));
});

for (const mount of ['/', '/discussion-skills-lab/']) for (const width of [940, 1440, 390]) {
  test(`${mount} Middle original prose roles, panel palette, flow badges and wrapping at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(mount); await page.evaluate(raw => localStorage.setItem('dsl:middle:v1', raw), raw);
    await page.goto(`/__original${mount}middle.html`);
    await expect(page.locator('#view-0')).toBeVisible(); await settle(page);
    const original = {
      lead: await styles(page.locator('#view-0 > .lead')),
      instruction: await styles(page.locator('#view-0 > p.font-semibold')),
      panel: await styles(page.locator('#view-0 > .panel')),
      badge: await styles(page.locator('#view-0 .flow span').first()),
      cards: await page.locator('#view-0 .flip-card').evaluateAll(nodes => nodes.map(node => { const r = node.getBoundingClientRect(); return { top:r.top, width:r.width, height:r.height }; })),
      positions: await page.locator('#view-0 > h1,#view-0 > .lead,#view-0 > .panel,#view-0 > p.font-semibold,#view-0 > .grid3').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().top))
    };
    for (const [index, card] of (await page.locator('#view-0 .flip-card').all()).entries()) {
      if (await card.getAttribute('aria-pressed') !== String(index !== 1)) { await card.focus(); await page.keyboard.press('Enter'); }
    }
    await settle(page);
    await page.locator('#view-0').screenshot({ path: info.outputPath('original-welcome.png') });

    await page.goto(`${mount}middle.html`); await expect(page.locator('#lesson-status')).toBeHidden(); await settle(page);
    expect(await styles(page.locator('#view-0 .dsl-prose-lead p'))).toEqual(original.lead);
    expect(await styles(page.locator('#view-0 .dsl-prose-instruction p'))).toEqual(original.instruction);
    expect(await styles(page.locator('#view-0 > .dsl-tone-callout'))).toEqual(original.panel);
    expect(await styles(page.locator('#view-0 .dsl-layout-flow .dsl-content-block > div > p').first())).toEqual(original.badge);
    const cards = page.locator('[data-activity-id="welcome-cards"] .dsl-card');
    const geometry = await cards.evaluateAll(nodes => nodes.map(node => { const r = node.getBoundingClientRect(); return { top:r.top, width:r.width, height:r.height }; }));
    for (let i = 0; i < geometry.length; i++) {
      expect(Math.abs(geometry[i].width - original.cards[i].width)).toBeLessThan(2);
      expect(Math.abs(geometry[i].height - original.cards[i].height)).toBeLessThan(2);
    }
    if (width > 850) expect(new Set(geometry.map(card => card.top)).size).toBe(1);
    else expect(new Set(geometry.map(card => card.top)).size).toBe(3);
    const positions = await page.locator('#view-0 > h1,#view-0 > .dsl-block-group,#view-0 > .dsl-content-block').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().top));
    expect(positions).toHaveLength(original.positions.length);
    for (let i = 1; i < positions.length; i++) expect(Math.abs((positions[i] - positions[0]) - (original.positions[i] - original.positions[0]))).toBeLessThan(3);
    await cards.first().focus(); await page.keyboard.press('Enter'); await cards.last().focus(); await page.keyboard.press('Enter'); await settle(page);
    for (const card of await cards.all()) expect(await card.evaluate(node => node.scrollWidth <= node.clientWidth + 1 && node.scrollHeight <= node.clientHeight + 2)).toBe(true);
    await page.locator('#view-0').screenshot({ path: info.outputPath('restored-welcome.png') });
  });
}

for (const mount of ['/', '/discussion-skills-lab/']) test(`${mount} prose roles match original across every Middle section; rich panels do not preserve formatting newlines`, async ({ page }, info) => {
  await page.goto(mount); await page.evaluate(raw => localStorage.setItem('dsl:middle:v1', raw), raw);
  await page.goto(`/__original${mount}middle.html`); await expect(page.locator('#view-0')).toBeVisible(); await settle(page);
  const original = await page.locator('.lesson-view p').evaluateAll(nodes => Object.fromEntries(nodes.filter(node => node.textContent.trim()).map(node => {
    const s = getComputedStyle(node);
    return [node.textContent.replace(/\s+/g, ' ').trim(), [s.fontFamily, s.fontSize, s.fontWeight, s.lineHeight, s.color]];
  })));
  await page.goto(`${mount}middle.html`); await expect(page.locator('#lesson-status')).toBeHidden(); await settle(page);
  const ids = ['welcome', 'structure-substance', 'evidence', 'support-group', 'communication', 'speaking-conflicts', 'integrated-practice', 'knowledge-check'];
  for (const id of ids) {
    if (await page.locator('#section-select').isVisible()) await page.locator('#section-select').selectOption(id);
    else await page.locator(`[data-go="${id}"]`).click();
    await settle(page);
    const roles = await page.locator('.lesson-view:not([hidden]) .dsl-prose-lead p,.lesson-view:not([hidden]) .dsl-prose-note p,.lesson-view:not([hidden]) .dsl-prose-instruction p,.lesson-view:not([hidden]) .dsl-prose-label p').evaluateAll(nodes => nodes.map(node => {
      const s = getComputedStyle(node);
      return { text:node.textContent.replace(/\s+/g, ' ').trim(), style:[s.fontFamily, s.fontSize, s.fontWeight, s.lineHeight, s.color] };
    }));
    for (const role of roles) expect(role.style, role.text).toEqual(original[role.text]);
    for (const body of await page.locator('.lesson-view:not([hidden]) .dsl-expandable-body.dsl-rich-prose').all()) await expect(body).toHaveCSS('white-space', 'normal');
    if (['evidence', 'speaking-conflicts'].includes(id)) await page.locator('.lesson-view:not([hidden])').screenshot({ path:info.outputPath(`${id}.png`) });
  }
});
