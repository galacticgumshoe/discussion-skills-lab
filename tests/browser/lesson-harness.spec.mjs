import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { invalidLessonCases, invalidLessonCandidate } from '../fixtures/harness/lesson-invalid.mjs';

const key = 'dsl:final:v1';
const fixture = path => JSON.parse(readFileSync(new URL(`../fixtures/harness/${path}`, import.meta.url)));
const manifest = fixture('content/final/lesson.json'), config = fixture('lessons/final/config.json');
const activityData = Object.fromEntries(manifest.activities.map(item => [item.id, fixture(`content/final/${item.source}`)]));
const completed = JSON.parse(readFileSync(new URL('../fixtures/progress/final/completed.json', import.meta.url))).raw;
const own = (page, id) => page.locator(`[data-activity-id="${id}"]`);
const field = (page, id) => page.locator(`[data-field-id="${id}"]`);
const state = page => page.evaluate(() => window.lessonHarness.app.state);
const counts = page => page.evaluate(() => window.lessonCalls);
const raw = page => page.evaluate(key => window.lessonNativeGet.call(localStorage, key), key);
const navigate = async (page, id) => { expect(await page.evaluate(id => window.lessonHarness.app.navigation.go(id), id)).toBe(true); };
const ready = async page => expect(page.locator('html')).toHaveAttribute('data-ready', 'true');
async function seed(page, record, failure) {
  await page.goto('/');
  await page.evaluate(({ record, key }) => { if (record === null) localStorage.removeItem(key); else localStorage.setItem(key, record); }, { key, record });
  await page.addInitScript(({ key, failure }) => {
    window.lessonCalls = { reads: 0, writes: 0, prints: 0 };
    const get = Storage.prototype.getItem, set = Storage.prototype.setItem;
    window.lessonNativeGet = get;
    Storage.prototype.getItem = function(name) {
      if (name === key) { window.lessonCalls.reads++; if (failure === 'denied') throw new DOMException('Synthetic denial', 'SecurityError'); }
      return get.call(this, name);
    };
    Storage.prototype.setItem = function(name, value) {
      if (name === key) { window.lessonCalls.writes++; if (failure === 'quota') throw new DOMException('Synthetic quota', 'QuotaExceededError'); }
      return set.call(this, name, value);
    };
    window.print = () => window.lessonCalls.prints++;
  }, { key, failure });
}
async function exploreCards(page) {
  for (const card of await own(page, 'welcome-cards').locator('.dsl-card').all()) await card.click();
}
const errors = new WeakMap();
test.beforeEach(({ page }) => { const list = []; errors.set(page, list); page.on('pageerror', error => list.push(error.message)); });
test.afterEach(({ page }) => expect(errors.get(page)).toEqual([]));

for (const prefix of ['', '/discussion-skills-lab']) {
  const mount = prefix ? 'repository' : 'root', base = `${prefix}/__fixtures/harness/`;
  async function load(page, record = null, failure) {
    await seed(page, record, failure); await page.goto(`${base}lesson.html`); await ready(page);
  }
  test(`${mount}: actual bootstrap -> interaction/unlock -> fixed adapter persistence -> refresh, with no bootstrap writes`, async ({ page }) => {
    await load(page, '{"completed":[],"data":{"future":{"keep":"✓"}}}');
    expect(await counts(page)).toEqual({ reads: 1, writes: 0, prints: 0 });
    expect(await page.evaluate(() => typeof window.DSL)).toBe('undefined');
    await expect(page.locator('#progress-text')).toHaveText('0 of 9 pages completed');
    await expect(page.locator('#next-section')).toBeDisabled();
    await expect(page.locator('#view-0 .dsl-content-block').first()).toContainText('Summary captures what the group developed.');
    await exploreCards(page); expect((await state(page)).completedSections).toEqual(['welcome']);
    await page.locator('#next-section').click();
    for (const [index, question] of activityData['summary-synthesis-questions'].data.questions.entries()) {
      await own(page, 'summary-synthesis-questions').locator(`[data-option-id="${question.correctOptionId}"]`).click();
      if (index < 4) await own(page, 'summary-synthesis-questions').locator('.dsl-question-next').click();
    }
    await page.locator('#next-section').click();
    for (const panel of await own(page, 'connect-viewpoints-panels').locator('details').all()) {
      await panel.locator('summary').click();
      await expect.poll(async () => (await state(page)).activities['connect-viewpoints-panels'].openIds.length).toBe(await own(page, 'connect-viewpoints-panels').locator('details[open]').count());
    }
    await own(page, 'connect-viewpoints-questions').locator('[data-option-id="coordinate"]').click();
    for (const [index, descriptor] of activityData['synthesis-writing'].data.fields.entries()) await field(page, descriptor.id).fill(['Māya and Jordan!', 'Their concerns connect?!', 'We recommend a pilot.'][index]);
    await own(page, 'synthesis-writing').locator('.dsl-assemble').click();
    for (const check of await own(page, 'synthesis-checklist').getByRole('checkbox').all()) await check.check();
    expect((await state(page)).completedSections).not.toContain('connect-viewpoints');
    await own(page, 'synthesis-writing').locator('.dsl-model-toggle').click();
    expect((await state(page)).completedSections).toEqual(['welcome', 'summary-synthesis', 'connect-viewpoints']);
    await page.evaluate(() => {
      const container = document.querySelector('#views'); [...container.children].reverse().forEach(view => container.append(view));
      const group = document.querySelector('[data-activity-id="synthesis-writing"]'); group.prepend(document.createElement('textarea'));
    });
    const draft = 'Edited output 學生 🧭\n<em>not markup</em>';
    await field(page, 'synthesis-output').fill(draft);
    await own(page, 'synthesis-checklist').getByRole('checkbox').first().uncheck();
    const saved = JSON.parse(await raw(page));
    expect(saved.completed).toEqual([0, 1, 2]); expect(saved.data.future).toEqual({ keep: '✓' });
    expect(saved.data.finalState.fields.assembled).toBe(draft);
    await page.reload(); await ready(page);
    expect(await counts(page)).toEqual({ reads: 1, writes: 0, prints: 0 });
    expect(await page.evaluate(() => window.lessonHarness.app.navigation.currentSectionId)).toBe('welcome');
    await navigate(page, 'connect-viewpoints'); await expect(field(page, 'synthesis-output')).toHaveValue(draft);
    await expect(own(page, 'synthesis-checklist').getByRole('checkbox').first()).not.toBeChecked();
    await expect(page.locator('#next-section')).toBeEnabled();
  });

  test(`${mount}: completed hydration, repeated unmount/remount and old nodes never write or duplicate callbacks/Print`, async ({ page }) => {
    await load(page, completed); const before = await state(page);
    await page.evaluate(async () => {
      window.oldCard = document.querySelector('.dsl-card');
      const h = window.lessonHarness;
      try { h.mountLesson(h.root, h.options); } catch (error) { window.duplicateError = error.message; }
      try { h.mountLesson(document.createElement('div'), h.options); } catch (error) { window.writerError = error.message; }
      await h.remount(); await h.remount(); window.oldCard.click();
    });
    expect(await page.evaluate(() => window.duplicateError)).toContain('already mounted');
    expect(await page.evaluate(() => window.writerError)).toContain('writer');
    expect(await counts(page)).toEqual({ reads: 3, writes: 0, prints: 0 });
    expect(await state(page)).toEqual(before); expect(await raw(page)).toBe(completed);
    await expect(page.locator('#rail-links button')).toHaveCount(10); await expect(page.locator('[data-reference-print]')).toHaveCount(1);
    await navigate(page, 'quick-reference'); await page.locator('[data-reference-print]').click();
    expect((await counts(page)).prints).toBe(1);
    await navigate(page, 'connect-viewpoints'); await field(page, 'synthesis-output').fill('One callback after remount');
    expect((await counts(page)).writes).toBe(1);
  });

  test(`${mount}: every shared invalid fixture is rejected by the actual browser boundary validators`, async ({ page }) => {
    await load(page);
    const rejected = await page.evaluate(async ({ config, manifest, activityData }) => {
      const { invalidLessonCases, invalidLessonCandidate } = await import('./lesson-invalid.mjs');
      const validation = await import('../../../assets/js/app/lesson-validation.js');
      const validators = { config: validation.validateLessonConfig, manifest: validation.validateLessonManifest, activity: validation.validateActivity };
      return invalidLessonCases.map(fixture => {
        const data = invalidLessonCandidate(fixture.kind === 'activity' ? activityData[fixture.activityId] : { config, manifest }[fixture.kind], fixture);
        const context = fixture.kind === 'activity' ? { activityId: fixture.activityId } : {
          declaringUrl: new URL(fixture.kind === 'config' ? 'lessons/final/config.json' : 'content/final/lesson.json', document.baseURI), allowedRootUrl: new URL('content/', document.baseURI)
        };
        try { validators[fixture.kind](data, context); return null; } catch { return fixture.name; }
      });
    }, { config, manifest, activityData });
    expect(rejected).toEqual(invalidLessonCases.map(fixture => fixture.name));
    expect((await counts(page)).writes).toBe(0);
  });

  test(`${mount}: invalid config/manifest/IDs/paths and missing metadata fail closed before reading progress; retry works`, async ({ page }) => {
    const record = '{"completed":[0],"data":{"future":"saved"}}'; await seed(page, record);
    const cases = [invalidLessonCases.find(item => item.name === 'config key mismatch'), invalidLessonCases.find(item => item.name === 'config escapes content'), invalidLessonCases.find(item => item.name === 'manifest invalid gate'), invalidLessonCases.find(item => item.name === 'manifest duplicate activity'), { kind: 'manifest', missing: true }, { kind: 'manifest', broken: true }, { kind: 'manifest', links: true }];
    for (const invalid of cases) {
      const path = invalid.kind === 'config' ? 'lessons/final/config.json' : 'content/final/lesson.json';
      await page.route(`**${base}${path}`, route => {
        const original = invalid.kind === 'config' ? config : manifest;
        const data = invalid.links ? { ...manifest, id: 'middle' } : invalid.missing || invalid.broken ? null : invalidLessonCandidate(original, invalid);
        return route.fulfill({ status: invalid.missing ? 404 : 200, contentType: 'application/json', body: invalid.broken ? '{' : JSON.stringify(data) });
      });
      await page.goto(`${base}lesson.html`); await ready(page);
      await expect(page.locator('#lesson-status')).toContainText('Lesson could not load');
      await expect(page.locator('#lesson-retry')).toBeVisible();
      expect(await counts(page)).toEqual({ reads: 0, writes: 0, prints: 0 }); expect(await raw(page)).toBe(record);
      await expect(page.locator('.dsl-card')).toHaveCount(0);
      await page.unroute(`**${base}${path}`);
    }
    await page.locator('#lesson-retry').click(); await expect(own(page, 'welcome-cards').locator('.dsl-card')).toHaveCount(3);
    await expect(page.locator('[data-reference-print]')).toBeEnabled(); expect((await counts(page)).writes).toBe(0);
  });

  test(`${mount}: missing/invalid activity is isolated, preserves data and reference access, then hydrates on retry`, async ({ page }) => {
    const record = '{"completed":[0,1],"data":{"finalState":{"fields":{"assembled":"Saved draft ✓"}}}}';
    await seed(page, record);
    for (const kind of ['missing', 'wrong-id', 'unknown-type', 'duplicate-items']) {
      const pattern = `**${base}content/final/activities/welcome-cards.json`;
      await page.route(pattern, route => {
        const data = structuredClone(activityData['welcome-cards']);
        if (kind === 'wrong-id') data.id = 'wrong';
        if (kind === 'unknown-type') data.type = 'note-classification';
        if (kind === 'duplicate-items') data.data.items[1].id = data.data.items[0].id;
        return route.fulfill({ status: kind === 'missing' ? 404 : 200, contentType: 'application/json', body: JSON.stringify(data) });
      });
      await page.goto(`${base}lesson.html`); await ready(page);
      await expect(page.locator('#view-0 [data-content-status]').last()).toContainText('Content could not load');
      await expect(own(page, 'welcome-cards')).toHaveCount(0); expect(await raw(page)).toBe(record); expect((await counts(page)).writes).toBe(0);
      await navigate(page, 'quick-reference'); await expect(page.locator('[data-reference-print]')).toBeEnabled();
      await expect(page.locator('[data-reference-content] .final-reference-item')).toHaveCount(5);
      await navigate(page, 'connect-viewpoints'); await expect(field(page, 'synthesis-output')).toHaveValue('Saved draft ✓');
      await page.unroute(pattern); await navigate(page, 'welcome'); await page.locator('#view-0 [data-content-retry]').last().click();
      await expect(own(page, 'welcome-cards').locator('.dsl-card')).toHaveCount(3); expect((await counts(page)).writes).toBe(0);
    }
    await own(page, 'welcome-cards').locator('.dsl-card').first().click(); expect((await counts(page)).writes).toBe(1);
  });

  test(`${mount}: references preload while activity is pending, print independently, retry and never save`, async ({ page }, testInfo) => {
    await seed(page, null);
    let release; const pending = new Promise(resolve => { release = resolve; });
    await page.route(`**${base}content/final/activities/welcome-cards.json`, async route => { await pending; await route.fulfill({ status: 404, body: '' }); });
    await page.goto(`${base}lesson.html`, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('[data-reference-print]')).toBeEnabled();
    // Preparation is not decoding/hydration. A pending activity cannot block the
    // reference, but no behavior or default-state write precedes progress loading.
    expect((await counts(page)).reads).toBe(0);
    await expect(own(page, 'synthesis-writing')).toHaveCount(0);
    await navigate(page, 'quick-reference'); await expect(page.locator('#previous-section')).toBeHidden(); await expect(page.locator('#next-section')).toBeHidden();
    await page.locator('[data-reference-print]').click(); expect((await counts(page)).prints).toBe(1);
    release(); await ready(page); expect((await counts(page)).reads).toBe(1); await navigate(page, 'welcome');
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('#view-0')).toBeHidden(); await expect(page.locator('[data-reference-content]')).toBeVisible();
    await expect(page.locator('[data-reference-print]')).toBeHidden();
    if (testInfo.project.name === 'chromium') await page.pdf({ path: testInfo.outputPath(`lesson-reference-${mount}.pdf`), format: 'Letter', printBackground: true });
    expect((await counts(page)).writes).toBe(0);
  });

  test(`${mount}: reference body failure/retry does not disable ordinary activity or grant credit`, async ({ page }) => {
    const pattern = `**${base}content/final/reference/synthesis-framework.md`;
    await page.route(pattern, route => route.fulfill({ status: 503, body: '' })); await load(page);
    await expect(page.locator('[data-reference-status]')).toContainText('could not load');
    await exploreCards(page); expect((await state(page)).completedSections).toEqual(['welcome']); const before = await raw(page);
    await navigate(page, 'quick-reference'); await expect(page.locator('[data-reference-print]')).toBeDisabled();
    await page.unroute(pattern); await page.locator('[data-reference-retry]').click();
    await expect(page.locator('[data-reference-print]')).toBeEnabled(); await page.locator('[data-reference-print]').click();
    expect((await counts(page)).prints).toBe(1); expect(await raw(page)).toBe(before);
  });

  test(`${mount}: failed ordinary Markdown blocks initial credit, not references; retry never synthesizes completion`, async ({ page }) => {
    const changed = structuredClone(manifest); changed.sections[0].blocks[0].blocks[0].source = 'missing.md';
    await page.route(`**${base}content/final/lesson.json`, route => route.fulfill({ json: changed }));
    const pattern = `**${base}content/final/missing.md`;
    await page.route(pattern, route => route.fulfill({ status: 404, body: '' })); await load(page);
    await exploreCards(page); expect((await state(page)).completedSections).toEqual([]);
    await navigate(page, 'quick-reference'); await expect(page.locator('[data-reference-print]')).toBeEnabled();
    await navigate(page, 'welcome');
    await page.unroute(pattern); await page.route(pattern, route => route.fulfill({ body: '**Summary:** Organize and accurately restate findings, proposals, agreements, and unresolved questions.' }));
    const before = (await counts(page)).writes;
    await page.locator('#view-0 [data-content-retry]').first().click();
    await expect(page.locator('#view-0 .dsl-content-block').first()).toContainText('Summary: Organize');
    expect((await state(page)).completedSections).toEqual([]); expect((await counts(page)).writes).toBe(before);
    await own(page, 'welcome-cards').locator('.dsl-card').first().click();
    expect((await state(page)).completedSections).toEqual(['welcome']);
  });

  test(`${mount}: static registry is bounded; an unavailable renderer fails only its activity`, async ({ page }) => {
    await load(page, completed);
    const before = await state(page);
    const messages = await page.evaluate(async () => {
      const h = window.lessonHarness, messages = [];
      for (const registry of [{ html: { mount() {}, read() {}, write() {} } }, { writing: 'module-from-content.js' }]) {
        try { h.mountLesson(document.createElement('div'), { ...h.options, registry }); } catch (error) { messages.push(error.message); }
      }
      h.app.destroy();
      const registry = { ...h.options.registry }; delete registry.expandables;
      window.partialApp = h.mountLesson(h.root, { ...h.options, registry }); await window.partialApp.ready;
      return messages;
    });
    expect(messages).toHaveLength(2); expect(messages.every(message => message.includes('Registry'))).toBe(true);
    await expect(own(page, 'connect-viewpoints-panels')).toHaveCount(0);
    await expect(page.locator('#view-2 [data-content-status]').first()).toContainText('unavailable in the static registry');
    expect(await page.evaluate(() => window.partialApp.state)).toEqual(before); expect(await raw(page)).toBe(completed); expect((await counts(page)).writes).toBe(0);
    await page.evaluate(() => window.partialApp.navigation.go('quick-reference')); await expect(page.locator('[data-reference-print]')).toBeEnabled();
    await page.evaluate(() => window.partialApp.destroy());
  });

  for (const failure of ['corrupt', 'denied', 'quota']) test(`${mount}: ${failure} storage retains session progress/unlocking with separate persistence warning`, async ({ page }) => {
    const record = failure === 'corrupt' ? '{invalid JSON' : null; await load(page, record, failure);
    expect((await counts(page)).writes).toBe(0); await exploreCards(page);
    expect((await state(page)).completedSections).toContain('welcome'); await expect(page.locator('#next-section')).toBeEnabled();
    await expect(page.locator('#storage-warning')).toContainText(/session|saved/); await expect(page.locator('#storage-warning')).toHaveAttribute('role', 'status');
    await expect(page.locator('#lesson-status')).toBeHidden(); expect(await raw(page)).toBe(record);
    await navigate(page, 'quick-reference'); await expect(page.locator('[data-reference-print]')).toBeEnabled();
    expect((await counts(page)).writes).toBe(failure === 'quota' ? 3 : 0);
  });

  test(`${mount}: destroy during load then remount discards late work and keeps a single writer/handler set`, async ({ page }) => {
    await seed(page, null);
    let release, first = true; const pending = new Promise(resolve => { release = resolve; });
    const pattern = `**${base}content/final/activities/welcome-cards.json`;
    await page.route(pattern, async route => {
      if (!first) return route.continue(); first = false;
      await pending; await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(activityData['welcome-cards']) });
    });
    await page.goto(`${base}lesson.html`, { waitUntil: 'domcontentloaded' }); await expect(page.locator('[data-reference-print]')).toBeEnabled();
    await page.evaluate(() => window.lessonHarness.remount()); release(); await ready(page);
    await expect(own(page, 'welcome-cards').locator('.dsl-card')).toHaveCount(3); await expect(page.locator('#rail-links button')).toHaveCount(10);
    expect((await counts(page)).writes).toBe(0);
    const card = own(page, 'welcome-cards').locator('.dsl-card').first(); await card.focus(); await card.press('Enter');
    expect((await counts(page)).writes).toBe(1); await expect(card).toHaveAttribute('aria-pressed', 'true');
    await page.unroute(pattern);
  });

  test(`${mount}: all composed content data/heading hooks match independent sealed extraction, not screenshots`, async ({ page }) => {
    await load(page);
    const result = await page.evaluate(async () => {
      const { explorationActivities, questionActivities } = await import('./component-data.mjs');
      const { writingActivities } = await import('./writing-data.mjs');
      const { validateActivity } = await import('../../../assets/js/app/lesson-validation.js');
      const read = async path => (await fetch(new URL(path, document.baseURI))).text();
      const [html, banks, map] = await Promise.all([read('../content/source/final.html'), read('../content/banks.json').then(JSON.parse), read('../legacy-maps/final.json').then(JSON.parse)]);
      const documentData = new DOMParser().parseFromString(html, 'text/html');
      const exploration = explorationActivities({ final: documentData }, { final: map }, 'final'), questions = questionActivities(banks, { final: map }, 'final');
      const writing = writingActivities(documentData, banks, map, 'final')[0];
      // All five earlier writing tools also pass the new runtime boundary.
      for (const lesson of ['opening', 'middle', 'final']) {
        const source = new DOMParser().parseFromString(await read(`../content/source/${lesson}.html`), 'text/html');
        const mapping = JSON.parse(await read(`../legacy-maps/${lesson}.json`));
        const middleSource = lesson === 'middle' ? await read('../content/source/assets/js/middle.js') : '';
        for (const item of writingActivities(source, banks, mapping, lesson, middleSource)) validateActivity({ schemaVersion: 1, id: item.id, type: 'writing', profile: item.profile, data: item.data });
      }
      return { expected: {
        'welcome-cards': exploration.find(item => item.id === 'welcome-cards').data,
        'connect-viewpoints-panels': exploration.find(item => item.id === 'connect-viewpoints-panels').data,
        'summary-synthesis-questions': questions[0].data, 'connect-viewpoints-questions': questions[1].data.questions[0],
        'synthesis-writing': writing.data, 'synthesis-checklist': writing.checklist.data
      }, headings: [...documentData.querySelectorAll('.lesson-view')].map(view => view.querySelector('h1,h2,h3').textContent.trim()) };
    });
    expect(Object.fromEntries(Object.entries(activityData).map(([id, data]) => [id, data.data]))).toEqual(result.expected);
    expect(await page.locator('#views > .lesson-view').evaluateAll(views => views.map(view => view.querySelector('h1,h2,h3').textContent))).toEqual(result.headings);
    await expect(page.locator('#view-0')).toHaveAttribute('aria-labelledby', 'section-welcome-heading');
  });
}
