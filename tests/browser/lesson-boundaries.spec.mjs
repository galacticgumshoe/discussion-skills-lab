// MIT tests; original instructional content © Rhys Jones, CC BY 4.0.
// Real Final entry: no partial lesson, test gates, lifecycle global or copied bank.
import {test, expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {finalAdapter} from '../../lessons/final/progress-adapter.js';
import {finalManifest as manifest, finalActivity, finalVisit as visit, solveFinal} from '../helpers/final-journey.mjs';
import {invalidLessonCases, invalidLessonCandidate} from '../fixtures/security/lesson-cases.mjs';
import {original} from '../helpers/baseline-source.mjs';
import {baselineReadersSource} from '../helpers/baseline-activities.mjs';
const config = JSON.parse(readFileSync(new URL('../../lessons/final/config.json', import.meta.url)));
const activities = Object.fromEntries(manifest.activities.map(item => [item.id, finalActivity(item.id)]));
const cases = invalidLessonCases(config, manifest, activities), key = finalAdapter.key;
const own = (page, id) => page.locator(`[data-activity-id="${id}"]`);
const field = (page, id) => page.locator(`[data-field-id="${id}"]`);
const calls = page => page.evaluate(() => window.boundaryCalls);
const raw = page => page.evaluate(key => window.boundaryGet.call(localStorage, key), key);
const state = async page => finalAdapter.decode(JSON.parse(await raw(page)));
const ready = async page => { await expect(page.locator('#lesson-status')).toHaveCount(1); await expect(page.locator('#lesson-status')).toBeHidden(); };
const cards = async (page, id) => { for (const card of await own(page, id).locator('.dsl-card').all()) await card.click(); };
const errors = new WeakMap();

test.beforeEach(async ({page}) => {
  const messages = []; errors.set(page, messages); page.on('pageerror', error => messages.push(error.message));
  await page.addInitScript(key => {
    window.boundaryCalls = {reads: 0, writes: 0, prints: 0};
    const get = Storage.prototype.getItem, set = Storage.prototype.setItem; window.boundaryGet = get;
    Storage.prototype.getItem = function(name) {
      if (name === key) {
        window.boundaryCalls.reads++;
        if (window.boundaryFailure === 'denied') throw new DOMException('Synthetic denial', 'SecurityError');
      }
      return get.call(this, name);
    };
    Storage.prototype.setItem = function(name, value) {
      if (name === key) {
        window.boundaryCalls.writes++;
        if (window.boundaryFailure === 'quota') throw new DOMException('Synthetic quota', 'QuotaExceededError');
      }
      return set.call(this, name, value);
    };
    window.print = () => window.boundaryCalls.prints++;
  }, key);
});
test.afterEach(({page}) => expect(errors.get(page)).toEqual([]));

for (const mount of ['/', '/discussion-skills-lab/']) {
  async function seed(page, record = null) {
    await page.goto(mount);
    await page.evaluate(({key, record}) => record === null ? localStorage.removeItem(key) : localStorage.setItem(key, record), {key, record});
  }
  const load = async (page, record = null) => { await seed(page, record); await page.goto(`${mount}final.html`); await ready(page); };

  test(`${mount} public Final actual prerequisites/unlock, fixed fields, decoys, permanent credit and refresh`, async ({page}) => {
    await load(page, '{"completed":[],"data":{"future":{"keep":"✓"}}}');
    expect(await calls(page)).toEqual({reads: 1, writes: 0, prints: 0});
    await expect(page.locator('#progress-text')).toHaveText('0 of 9 pages completed');
    await expect(page.locator('#next-section')).toBeDisabled();
    await cards(page, 'welcome-cards'); await page.locator('#next-section').click();
    // The real lesson reveals its questions only after the two cards, unlike
    // the partial migration site's always-mounted test composition.
    await expect(own(page, 'summary-synthesis-questions')).toBeHidden();
    await cards(page, 'summary-synthesis-cards');
    await expect(page.locator('#next-section')).toBeDisabled();
    await solveFinal(page, 'summary-synthesis-questions', {alternatives: false});
    await page.locator('#next-section').click();
    for (const summary of await own(page, 'connect-viewpoints-panels').locator('summary').all()) {
      await summary.click(); await expect(summary.locator('.dsl-panel-explored')).toBeVisible();
    }
    await own(page, 'connect-viewpoints-questions').locator('[data-option-id="coordinate"]').click();
    for (const [index, descriptor] of activities['synthesis-writing'].data.fields.entries()) await field(page, descriptor.id).fill(['Māya and Jordan!', 'Their concerns connect?!', 'We recommend a pilot.'][index]);
    await own(page, 'synthesis-writing').locator('.dsl-assemble').click();
    await expect(page.locator('#next-section')).toBeDisabled();
    await own(page, 'synthesis-writing').locator('.dsl-model-toggle').click();
    for (const check of await own(page, 'synthesis-checklist').getByRole('checkbox').all()) await check.check();
    await expect(page.locator('#next-section')).toBeEnabled();
    await page.locator('#views').evaluate(container => [...container.children].reverse().forEach(node => container.append(node)));
    await own(page, 'synthesis-writing').evaluate(host => host.prepend(document.createElement('textarea')));
    const draft = 'Edited output 學生 🧭\n<em>not markup</em>';
    await field(page, 'synthesis-output').fill(draft); await own(page, 'synthesis-checklist').getByRole('checkbox').first().uncheck();
    const saved = JSON.parse(await raw(page));
    expect(saved.completed).toEqual([0, 1, 2]); expect(saved.data.future).toEqual({keep: '✓'}); expect(saved.data.finalState.fields.assembled).toBe(draft);
    await page.reload(); await ready(page); expect(await calls(page)).toEqual({reads: 1, writes: 0, prints: 0});
    await expect(page.locator('[data-section-id="welcome"]')).toBeVisible(); await visit(page, 'connect-viewpoints');
    await expect(field(page, 'synthesis-output')).toHaveValue(draft); await expect(own(page, 'synthesis-checklist').getByRole('checkbox').first()).not.toBeChecked();
    await expect(page.locator('#next-section')).toBeEnabled();
  });

  test(`${mount} all 43 shared invalid cases are rejected by real browser boundaries without saves`, async ({page}) => {
    await load(page);
    const rejected = await page.evaluate(async ({mount, config, manifest, activities}) => {
      const root = new URL(mount, location.origin);
      const {invalidLessonCases, invalidLessonCandidate} = await import(new URL('__fixtures/security/lesson-cases.mjs', root));
      const validation = await import(new URL('assets/js/app/lesson-validation.js', root));
      const validators = {config: validation.validateLessonConfig, manifest: validation.validateLessonManifest, activity: validation.validateActivity};
      return invalidLessonCases(config, manifest, activities).map(fixture => {
        const data = invalidLessonCandidate(fixture.kind === 'activity' ? activities[fixture.activityId] : {config, manifest}[fixture.kind], fixture);
        const context = fixture.kind === 'activity' ? {activityId: fixture.activityId} : {
          declaringUrl: new URL(fixture.kind === 'config' ? 'lessons/final/config.json' : 'content/final/lesson.json', root), allowedRootUrl: new URL('content/', root)
        };
        try { validators[fixture.kind](data, context); return null; } catch { return fixture.name; }
      });
    }, {mount, config, manifest, activities});
    expect(rejected).toEqual(cases.map(fixture => fixture.name)); expect(rejected).toHaveLength(43);
    expect((await calls(page)).writes).toBe(0);
  });

  test(`${mount} public metadata/IDs/paths/missing/broken responses fail before storage reads; retry recovers`, async ({page}) => {
    const record = '{"completed":[0],"data":{"future":"saved"}}'; await seed(page, record);
    const invalids = ['config key mismatch', 'config escapes content', 'manifest invalid gate', 'manifest duplicate activity'].map(name => cases.find(item => item.name === name));
    invalids.push({kind: 'manifest', missing: true}, {kind: 'manifest', broken: true}, {kind: 'manifest', links: true});
    for (const invalid of invalids) {
      const path = invalid.kind === 'config' ? 'lessons/final/config.json' : 'content/final/lesson.json', pattern = `**${mount}${path}`;
      await page.route(pattern, route => {
        const original = invalid.kind === 'config' ? config : manifest;
        const data = invalid.links ? {...manifest, id: 'middle'} : invalid.missing || invalid.broken ? null : invalidLessonCandidate(original, invalid);
        return route.fulfill({status: invalid.missing ? 404 : 200, contentType: 'application/json', body: invalid.broken ? '{' : JSON.stringify(data)});
      });
      await page.goto(`${mount}final.html`); await expect(page.locator('#lesson-status')).toContainText('Lesson could not load');
      await expect(page.locator('#lesson-retry')).toBeVisible(); expect(await calls(page)).toEqual({reads: 0, writes: 0, prints: 0}); expect(await raw(page)).toBe(record);
      await expect(page.locator('.dsl-card')).toHaveCount(0); await page.unroute(pattern);
    }
    await page.locator('#lesson-retry').click(); await ready(page);
    await expect(own(page, 'welcome-cards').locator('.dsl-card')).toHaveCount(3); await expect(page.locator('[data-reference-print]')).toBeEnabled();
    expect((await calls(page)).writes).toBe(0);
  });

  test(`${mount} public missing/invalid activities isolate failure, retain drafts/reference and hydrate silently on retry`, async ({page}) => {
    const record = '{"completed":[0,1],"data":{"finalState":{"assembled":true,"fields":{"assembled":"Saved draft ✓"}}}}';
    await seed(page, record);
    for (const kind of ['missing', 'wrong-id', 'unknown-type', 'duplicate-items']) {
      const pattern = `**${mount}content/final/activities/welcome-cards.json`;
      await page.route(pattern, route => {
        const data = structuredClone(activities['welcome-cards']);
        if (kind === 'wrong-id') data.id = 'wrong';
        if (kind === 'unknown-type') data.type = 'note-classification';
        if (kind === 'duplicate-items') data.data.items[1].id = data.data.items[0].id;
        return route.fulfill({status: kind === 'missing' ? 404 : 200, json: data});
      });
      await page.goto(`${mount}final.html`); await ready(page);
      await expect(page.locator('#view-0 [data-content-status]').filter({visible: true})).toContainText('Content could not load');
      await expect(own(page, 'welcome-cards')).toHaveCount(0); expect(await raw(page)).toBe(record); expect((await calls(page)).writes).toBe(0);
      await visit(page, 'quick-reference'); await expect(page.locator('[data-reference-print]')).toBeEnabled(); await expect(page.locator('.final-reference-item')).toHaveCount(5);
      await visit(page, 'connect-viewpoints'); await expect(field(page, 'synthesis-output')).toHaveValue('Saved draft ✓');
      await page.unroute(pattern); await visit(page, 'welcome'); await page.locator('#view-0 [data-content-retry]').filter({visible: true}).click();
      await expect(own(page, 'welcome-cards').locator('.dsl-card')).toHaveCount(3); expect((await calls(page)).writes).toBe(0);
    }
    await own(page, 'welcome-cards').locator('.dsl-card').first().click(); expect((await calls(page)).writes).toBe(1);
  });

  test(`${mount} failed reference body does not disable ordinary credit; retry and Print never save`, async ({page}) => {
    const pattern = `**${mount}content/final/reference/synthesis-framework.md`;
    await page.route(pattern, route => route.fulfill({status: 503, body: ''})); await load(page);
    await expect(page.locator('[data-reference-status]')).toContainText('could not load');
    await cards(page, 'welcome-cards'); expect((await state(page)).completedSections).toEqual(['welcome']); const before = await raw(page);
    await visit(page, 'quick-reference'); await expect(page.locator('[data-reference-print]')).toBeDisabled();
    await page.unroute(pattern); await page.locator('[data-reference-retry]').click();
    await expect(page.locator('[data-reference-print]')).toBeEnabled(); await page.locator('[data-reference-print]').click();
    expect((await calls(page)).prints).toBe(1); expect(await raw(page)).toBe(before);
  });

  test(`${mount} public Final panel open-state restores silently without invented exploration and saves fixed global indexes`, async ({page}) => {
    const record = JSON.stringify({completed: [2], data: {finalState: {panelsOpen: {0: true}, panels: {2: [1]}}}});
    await load(page, record); await visit(page, 'connect-viewpoints');
    const panels = own(page, 'connect-viewpoints-panels'), listen = panels.locator('[data-panel-id="listen"]'), connect = panels.locator('[data-panel-id="connect"]');
    await expect(listen).toHaveJSProperty('open', true); expect((await state(page)).activities['connect-viewpoints-panels'].exploredIds).toEqual(['connect']);
    expect((await calls(page)).writes).toBe(0); expect(await raw(page)).toBe(record);
    await listen.locator('summary').focus(); await listen.locator('summary').press('Enter'); await expect(listen).toHaveJSProperty('open', false);
    await expect.poll(async () => (await state(page)).activities['connect-viewpoints-panels'].openIds).toEqual([]);
    expect((await state(page)).activities['connect-viewpoints-panels'].exploredIds).toEqual(['connect']);
    await listen.locator('summary').press('Space'); await expect.poll(async () => (await state(page)).activities['connect-viewpoints-panels'].exploredIds).toEqual(['connect', 'listen']);
    await connect.locator('summary').click(); await expect(connect).toHaveJSProperty('open', true); await connect.locator('summary').click(); await expect(connect).toHaveJSProperty('open', false);
    await expect.poll(async () => JSON.parse(await raw(page)).data.finalState.panelsOpen['1']).toBe(false);
    const saved = JSON.parse(await raw(page)); expect(saved.data.finalState.panelsOpen['0']).toBe(true); expect(saved.data.finalState.panels['2']).toEqual([1, 0]);
    await page.reload(); await ready(page); await visit(page, 'connect-viewpoints'); await expect(listen).toHaveJSProperty('open', true); await expect(connect).toHaveJSProperty('open', false); expect((await calls(page)).writes).toBe(0);
  });

  test(`${mount} public composed data/heading hooks retain independent sealed extraction and all writing profiles validate`, async ({page}) => {
    const completed = JSON.parse(readFileSync(new URL('../fixtures/progress/final/completed.json', import.meta.url))).raw;
    await load(page, completed);
    const expected = await page.evaluate(async ({mount, source, readers}) => {
      const root = new URL(mount, location.origin);
      const {explorationActivities, questionActivities, writingActivities} = (0, eval)(readers);
      const {validateActivity} = await import(new URL('assets/js/app/lesson-validation.js', root));
      const read = async path => (await fetch(new URL(path, root))).text();
      const banks = JSON.parse(await read('__fixtures/content/banks.json')), map = JSON.parse(await read('__fixtures/legacy-maps/final.json'));
      const doc = new DOMParser().parseFromString(source, 'text/html');
      for (const lesson of ['opening', 'middle', 'final']) {
        const html = await read(`__fixtures/content/source/${lesson}.html`), mapping = JSON.parse(await read(`__fixtures/legacy-maps/${lesson}.json`));
        const middleSource = lesson === 'middle' ? await read('__fixtures/content/source/assets/js/middle.js') : '';
        for (const item of writingActivities(new DOMParser().parseFromString(html, 'text/html'), banks, mapping, lesson, middleSource)) validateActivity({schemaVersion: 1, id: item.id, type: 'writing', profile: item.profile, data: item.data});
      }
      return {exploration: explorationActivities({final: doc}, {final: map}, 'final'), questions: questionActivities(banks, {final: map}, 'final'),
        writing: writingActivities(doc, banks, map, 'final')[0], headings: [...doc.querySelectorAll('.lesson-view')].map(view => view.querySelector('h1,h2,h3').textContent.trim())};
    }, {mount, source: original('final.html').toString(), readers: baselineReadersSource});
    const norm = text => text.replace(/\s+/g, ' ').trim();
    for (const item of expected.exploration) for (const entry of item.data.items) {
      const host = own(page, item.id).locator(`[data-card-id="${entry.id}"],[data-panel-id="${entry.id}"]`);
      if (entry.front) { expect(norm(await host.locator('.dsl-card-front').textContent())).toContain(entry.front); expect(norm(await host.locator('.dsl-card-back').textContent())).toContain(entry.back); }
      else { expect(norm(await host.locator('summary').textContent())).toContain(entry.title); expect(norm(await host.locator('.dsl-expandable-body').textContent())).toBe(entry.body); }
    }
    for (const item of expected.questions) {
      const actual = activities[item.id].data.questions;
      expect(actual).toEqual(item.data.questions);
    }
    // Hidden sections deliberately have no accessibility-tree names. Inspect
    // writing labels through the real visible section, not a hidden ancestor.
    await visit(page, 'connect-viewpoints');
    const writing = expected.writing;
    for (const descriptor of [...writing.data.fields, writing.data.output]) {
      await expect(field(page, descriptor.id)).toHaveAccessibleName(descriptor.label);
      await expect(field(page, descriptor.id)).toHaveJSProperty('readOnly', descriptor.readonly);
      if (descriptor.placeholder) await expect(field(page, descriptor.id)).toHaveAttribute('placeholder', descriptor.placeholder);
    }
    for (const block of writing.data.model.blocks) await expect(own(page, writing.id).locator('.dsl-writing-model')).toContainText(block.text);
    expect(activities[writing.id].data.assembly.template).toBe(writing.data.assembly.template);
    expect(activities['synthesis-checklist'].data).toEqual(writing.checklist.data);
    expect(await page.locator('#views > .lesson-view').evaluateAll(views => views.map(view => view.querySelector('h1,h2,h3').textContent))).toEqual(expected.headings);
    await expect(page.locator('#view-0')).toHaveAttribute('aria-labelledby', manifest.sections[0].headingId);
    expect((await calls(page)).writes).toBe(0);
  });

  for (const failure of ['corrupt', 'denied', 'quota']) test(`${mount} public ${failure} storage preserves session unlock, exact bytes and separate warning`, async ({page}) => {
    const record = failure === 'corrupt' ? '{invalid JSON' : null;
    await seed(page, record);
    // Only assign a mode here: multiple addInitScript callbacks have no promised
    // order. The one instrumentation wrapper reads this mode at interaction time.
    await page.addInitScript(failure => { window.boundaryFailure = failure; }, failure);
    await page.goto(`${mount}final.html`); await ready(page); expect((await calls(page)).writes).toBe(0);
    await cards(page, 'welcome-cards'); await expect(page.locator('#next-section')).toBeEnabled();
    await expect(page.locator('#storage-warning')).toContainText(/session|saved/); await expect(page.locator('#storage-warning')).toHaveAttribute('role', 'status');
    await expect(page.locator('#lesson-status')).toBeHidden(); expect(await raw(page)).toBe(record);
    expect((await calls(page)).writes).toBe(failure === 'quota' ? 3 : 0);
    await visit(page, 'quick-reference'); await expect(page.locator('[data-reference-print]')).toBeEnabled();
  });
}
