import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const raw = JSON.parse(readFileSync(new URL('../fixtures/progress/middle/completed.json', import.meta.url))).raw;
const activate = async node => { await node.focus(); await node.press('Enter'); };
const settle = page => page.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {})));
});
const style = node => node.evaluate(node => {
  const s = getComputedStyle(node);
  return Object.fromEntries(['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'textTransform', 'color', 'backgroundColor', 'borderTopWidth', 'borderTopColor', 'borderLeftWidth', 'borderLeftColor', 'borderRadius', 'padding', 'boxShadow'].map(key => [key, s[key]]));
});
const visit = async (page, original) => {
  if (await page.locator('#section-select').isVisible()) await page.locator('#section-select').selectOption(original ? '2' : 'evidence');
  else await activate(page.locator(`[data-go="${original ? '2' : 'evidence'}"]`));
  await settle(page);
};

for (const mount of ['/', '/discussion-skills-lab/']) for (const width of [760, 1440, 390]) {
  test(`${mount} Evidence callouts, card title rows and research/writing layout retain main styles at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height:1000 });
    await page.goto(mount); await page.evaluate(raw => localStorage.setItem('dsl:middle:v1', raw), raw);
    await page.goto(`/__original${mount}middle.html`); await expect(page.locator('#view-0')).toBeVisible(); await visit(page, true);
    for (const row of await page.locator('#evidence-details details').all()) if (!await row.evaluate(node => node.open)) await activate(row.locator('summary'));
    const original = { example:await style(page.locator('#evidence-details .example').first()), cards:[] };
    const oldCards = page.locator('[data-flip-group="models"]');
    for (const card of await oldCards.all()) {
      if (await card.getAttribute('aria-pressed') === 'true') await activate(card); await settle(page);
      const front = { title:await style(card.locator('.flip-front > strong')), copy:await style(card.locator('.flip-front > p')) };
      await activate(card); await settle(page);
      original.cards.push({ front, back:{ title:await style(card.locator('.flip-back > strong')), copy:await style(card.locator('.flip-back > p')) } });
    }
    await activate(page.locator('#research-options button').nth(1)); await page.mouse.move(0, 0);
    original.panel = await style(page.locator('#research-activity'));
    original.title = await style(page.locator('#research-activity > h3'));
    original.caution = await style(page.locator('#research-activity > .caution'));
    original.prompt = await style(page.locator('#research-activity > p.font-bold'));
    original.selected = await style(page.locator('#research-options button').nth(1));
    original.neutral = await style(page.locator('#research-options button').first());
    original.feedback = await style(page.locator('#research-feedback'));
    for (const [id, value] of [['source', 'Synthetic source, October 2026'], ['finding', 'Synthetic finding'], ['why', 'Synthetic connection']]) await page.locator(`#${id}`).fill(value);
    await activate(page.locator('#assemble-button')); await page.mouse.move(0, 0);
    original.output = await page.locator('#assembled').inputValue();
    original.notice = await page.locator('#assembly-status').textContent();
    original.status = await style(page.locator('#assembly-status'));
    original.field = await style(page.locator('#source'));
    original.label = await style(page.locator('label[for="source"]'));
    original.buttons = await Promise.all(['assemble-button', 'assembly-copy-button', 'research-model-button'].map(id => style(page.locator(`#${id}`))));
    original.check = await page.locator('#research-checks input').first().evaluate(node => { const s = getComputedStyle(node); return [s.width, s.height, s.accentColor]; });
    await activate(page.locator('#research-model-button')); await settle(page);
    original.model = await style(page.locator('#research-model'));
    await page.locator('#view-2').screenshot({ path:info.outputPath('original-evidence.png') });
    await activate(page.locator('#research-options button').first()); await page.mouse.move(0, 0);
    original.incorrect = await style(page.locator('#research-options button').first());
    original.errorFeedback = await style(page.locator('#research-feedback'));

    await page.goto(`${mount}middle.html`); await expect(page.locator('#lesson-status')).toBeHidden(); await visit(page, false);
    const panels = page.locator('[data-activity-id="evidence-panels"]');
    for (const row of await panels.locator('details').all()) {
      if (!await row.evaluate(node => node.open)) await activate(row.locator('summary'));
      await expect(row.locator('summary .dsl-panel-explored')).toBeVisible();
      expect(await style(row.locator('blockquote'))).toEqual(original.example);
    }
    const cards = page.locator('[data-activity-id="research-model-cards"] .dsl-card');
    for (const [index, card] of (await cards.all()).entries()) {
      for (const side of ['front', 'back']) {
        if (side === 'back') { await activate(card); await settle(page); }
        const face = card.locator(`.dsl-card-${side}`);
        expect(await style(face.locator('.dsl-card-title'))).toEqual(original.cards[index][side].title);
        expect(await style(face.locator('.dsl-prose-p'))).toEqual(original.cards[index][side].copy);
        const gap = await face.evaluate(node => node.querySelector('.dsl-card-title').getBoundingClientRect().bottom - node.querySelector('.dsl-card-copy').getBoundingClientRect().top);
        expect(gap).toBeLessThan(1 / 64);
      }
    }
    const research = page.locator('[data-activity-id="research"]'), writing = page.locator('[data-activity-id="evidence-writing"]');
    await activate(research.locator('.dsl-choice').nth(1)); await page.mouse.move(0, 0);
    expect(await style(page.locator('[data-reveal-id="research-activity"]'))).toEqual(original.panel);
    expect(await style(page.locator('[data-reveal-id="research-activity"] > .dsl-content-block:first-child h3'))).toEqual(original.title);
    expect(await style(page.locator('[data-reveal-id="research-activity"] > .dsl-tone-caution'))).toEqual(original.caution);
    expect(await style(research.locator('.dsl-question-prompt'))).toEqual(original.prompt);
    expect(await style(research.locator('.dsl-choice').nth(1))).toEqual(original.selected);
    expect(await style(research.locator('.dsl-choice').first())).toEqual(original.neutral);
    expect(await style(research.locator('.dsl-feedback'))).toEqual(original.feedback);
    for (const [id, value] of [['evidence-source', 'Synthetic source, October 2026'], ['evidence-finding', 'Synthetic finding'], ['evidence-connection', 'Synthetic connection']]) await writing.locator(`[data-field-id="${id}"]`).fill(value);
    const buttons = ['.dsl-assemble', '.dsl-copy', '.dsl-model-toggle'];
    for (const [index, selector] of buttons.entries()) expect(await style(writing.locator(selector))).toEqual(original.buttons[index]);
    expect(await writing.evaluate(node => {
      const output = node.querySelector('[data-field-id="evidence-output"]');
      return [...node.querySelectorAll('.dsl-writing-actions button')].every(button => !!(button.compareDocumentPosition(output) & Node.DOCUMENT_POSITION_FOLLOWING));
    })).toBe(true);
    expect(await style(writing.locator('[data-field-id="evidence-source"]'))).toEqual(original.field);
    expect(await style(writing.locator('.dsl-field-label').first())).toEqual(original.label);
    await activate(writing.locator('.dsl-assemble')); await page.mouse.move(0, 0);
    await expect(writing.locator('[data-field-id="evidence-output"]')).toHaveValue(original.output);
    await expect(writing.locator('[data-field-id="evidence-output"]')).toHaveAttribute('readonly', '');
    await expect(writing.locator('.dsl-writing-status')).toHaveText(original.notice);
    expect(await style(writing.locator('.dsl-writing-status'))).toEqual(original.status);
    expect(await page.locator('[data-activity-id="research-checklist"] input').first().evaluate(node => { const s = getComputedStyle(node); return [s.width, s.height, s.accentColor]; })).toEqual(original.check);
    await activate(writing.locator('.dsl-model-toggle')); await settle(page);
    expect(await style(writing.locator('.dsl-writing-model'))).toEqual(original.model);
    await page.locator('#view-2').screenshot({ path:info.outputPath('restored-evidence.png') });
    await activate(research.locator('.dsl-choice').first()); await page.mouse.move(0, 0);
    expect(await style(research.locator('.dsl-choice').first())).toEqual(original.incorrect);
    expect(await style(research.locator('.dsl-feedback'))).toEqual(original.errorFeedback);
    await page.reload(); await expect(page.locator('#lesson-status')).toBeHidden(); await visit(page, false);
    await expect(writing.locator('[data-field-id="evidence-output"]')).toHaveValue(original.output);
    await expect(writing.locator('.dsl-writing-model')).toBeVisible();
    await expect(page.locator('#next-section')).toBeEnabled();
  });
}
