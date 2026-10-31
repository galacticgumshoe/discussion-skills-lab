import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import http from 'node:http';
import vm from 'node:vm';
import { original, revision, productionPaths, sha256, root } from '../helpers/baseline-source.mjs';
import { extractBanks } from '../helpers/content-baseline.mjs';
import { startServer } from '../helpers/static-server.mjs';

const json = path => JSON.parse(readFileSync(`${root}tests/fixtures/${path}`));
test('public entries use one shared shell and semantic print; unchanged licenses/assets and original banks remain pinned', () => {
  for (const id of ['opening', 'middle', 'final']) {
    const html = readFileSync(`${root}${id}.html`, 'utf8');
    assert.equal((html.match(/class="app-shell"/g) || []).length, 1);
    assert.match(html, /<div class="app-shell"><\/div>/);
    assert.doesNotMatch(html, /id="(?:layout|rail-links|views|lesson-status)"|onclick=|assets\/js\/lesson-core\.js|__fixtures/);
    assert.equal((html.match(/<script type="module"/g) || []).length, 1);
    assert.match(html, new RegExp(`<script type="module" src="assets/js/${id}\\.js"`));
    const styles = [...html.matchAll(/<link[^>]*href="(assets\/css\/[^\"]+)"/g)].map(match => match[1]);
    assert.equal(styles[0], 'assets/css/tokens.css');
    assert.equal(styles.at(-1), 'assets/css/print.css');
    assert.ok(styles.indexOf('assets/css/reference.css') > styles.indexOf(`assets/css/${id}.css`));
    assert.match(html, /https:\/\/cdn\.tailwindcss\.com\/3\.4\.17/);
    assert.match(html, /fonts\.googleapis\.com/);
  }
  assert.equal(existsSync(`${root}assets/js/lesson-core.js`), false, 'retired production copy only; pinned replay remains below');
  assert.doesNotMatch(readFileSync(`${root}assets/css/print.css`, 'utf8'), /#view-[789]/);
  assert.match(readFileSync(`${root}assets/js/opening.js`, 'utf8'), /mountLesson/);
  assert.doesNotMatch(readFileSync(`${root}assets/js/opening.js`, 'utf8'), /DSL|localStorage|const (classification|quiz|practice)/);
  // README developer-testing guidance was separately authorized after extraction.
  // Keep canonical README/replay evidence pinned, but allow current documentation.
  const middleEntry = readFileSync(`${root}assets/js/middle.js`, 'utf8');
  assert.match(middleEntry, /mountLesson/);
  assert.doesNotMatch(middleEntry, /localStorage|DSL\.createLesson|const (classification|research|strategies|applications|questions)|According to/);
  const finalEntry = readFileSync(`${root}assets/js/final.js`, 'utf8');
  assert.match(finalEntry, /mountLesson/);
  assert.doesNotMatch(finalEntry, /localStorage|DSL\.createLesson|const (questions|notes|checkLabels|goalTexts)|__fixtures/);
  for (const path of ['.nojekyll', 'LICENSE', 'CONTENT_LICENSE.md', 'assets/favicon.svg']) {
    assert.deepEqual(readFileSync(`${root}${path}`), original(path), path);
  }
  // Read retired original implementation explicitly through the pinned reader,
  // never a missing-file fallback. It still independently matches sealed banks.
  const source = Object.fromEntries(productionPaths.map(path => [path, original(path).toString()]));
  assert.deepEqual(extractBanks(source), json('content/banks.json'));
});
test('canonical content/maps/progress/visual evidence has not been silently rewritten', () => {
  const manifest = json('manifest.json');
  assert.equal(manifest.revision, revision);
  for (const file of manifest.files) assert.equal(sha256(readFileSync(`${root}tests/fixtures/${file.path}`)), file.sha256, file.path);
});
test('pinned source captures, hashes, exact banks/answer/feedback associations', () => {
  const baseline = json('production.json');
  assert.equal(baseline.revision, revision);
  assert.deepEqual(baseline.files.map(f => f.path), productionPaths);
  for (const file of baseline.files) {
    assert.equal(sha256(original(file.path)), file.sha256, file.path);
    assert.equal(sha256(readFileSync(`${root}tests/fixtures/content/source/${file.path}`)), file.sha256, file.path);
  }
  const source = Object.fromEntries(productionPaths.map(path => [path, original(path).toString()]));
  assert.deepEqual(extractBanks(source), json('content/banks.json'));
  const lines = json('content/source-index.json');
  for (const { file, line, value } of lines) assert.equal(source[file].split('\n')[line - 1], value);
  assert.ok(lines.some(row => row.value.includes('By the end of this discussion, will the group agree')));
  assert.ok(lines.some(row => row.value.includes('According to ${source}')));
  assert.ok(lines.some(row => row.value.includes('Therefore, ${fields[2]')));
});

test('authored maps match contractual keys/counts and observed initialized control order', () => {
  for (const [id, count] of [['opening', 7], ['middle', 8], ['final', 9]]) {
    const map = json(`legacy-maps/${id}.json`), dom = json(`legacy-maps/${id}-initialized-dom.json`);
    assert.equal(map.storageKey, `dsl:${id === 'opening' ? 'opening-stage' : id}:v1`);
    assert.equal(map.countedPages, count);
    assert.equal(map.sections.length, count + 1);
    assert.equal(map.sections.at(-1), 'quick-reference');
    assert.equal(new Set(map.sections).size, count + 1);
    assert.equal(dom.navigation.length, count + 1);
    if (id === 'middle') {
      assert.deepEqual(dom.fields.map(f => f.id), map.fields);
      assert.equal(dom.cards.length, 9);
      dom.cards.forEach((card, i) => assert.ok(map.sets.flipped[card.group][i]));
    }
    if (id === 'final') {
      assert.equal(dom.cards.length, 8);
      assert.equal(dom.panels.length, 13);
      assert.deepEqual(dom.fields.filter(f => f.id).map(f => f.id), Object.keys(map.fields));
      assert.equal(dom.fields.filter(f => !f.id).length, 14); // 11 checks + 3 goals
      for (const card of dom.cards) assert.ok(map.flips[card.page.slice(5)][Number(card.flip)]);
      let globalPanel = 0;
      for (const [page, ids] of Object.entries(map.panels)) {
        assert.equal(dom.panels.filter(panel => panel.page === `view-${page}`).length, ids.length);
        assert.deepEqual(map.panelsOpen.slice(globalPanel, globalPanel + ids.length), ids);
        globalPanel += ids.length;
      }
    }
    if (id === 'opening') assert.equal(dom.cards.length, 0);
  }
});

// Run the real pinned core with a minimal inert DOM: this tests its permission policy,
// not a reimplementation of canVisit. Activity gate checks live in browser journeys.
function core(record) {
  let raw = record === null ? null : JSON.stringify(record);
  const element = { style: {}, setAttribute() {}, options: [], classList: { toggle() {} } };
  const context = { window: {}, localStorage: { getItem: () => raw, setItem: (_, value) => { raw = value; } },
    document: { getElementById: () => element, querySelectorAll: () => [] } };
  vm.runInNewContext(original('assets/js/lesson-core.js').toString(), context);
  return { lesson: context.window.DSL.createLesson({ id: 'test', total: 7, reference: 7, requirements: [] }), raw: () => raw };
}
test('original navigation permits first/reference/completed/immediate successor, union credit', () => {
  const { lesson, raw } = core({ completed: [0, 3], data: { unknown: 'keep' } });
  assert.deepEqual(Array.from({ length: 8 }, (_, i) => lesson.canVisit(i)), [true, true, false, true, true, false, false, true]);
  lesson.complete(1); lesson.complete(1); lesson.record('draft', 'Unicode —\n✓');
  assert.deepEqual(JSON.parse(raw()), { completed: [0, 3, 1], data: { unknown: 'keep', draft: 'Unicode —\n✓' } });
});

test('progress provenance, complete UI records and explicit unsafe fixture labels', () => {
  for (const id of ['opening', 'middle', 'final']) {
    const dir = `${root}tests/fixtures/progress/${id}`;
    for (const file of readdirSync(dir)) {
      const fixture = JSON.parse(readFileSync(`${dir}/${file}`));
      assert.equal(fixture.revision, revision);
      assert.ok(['synthetic', 'UI-observed'].includes(fixture.provenance));
      if (fixture.provenance === 'UI-observed') {
        assert.equal(fixture.mount, '/'); assert.ok(fixture.origin.startsWith('http://127.0.0.1:'));
        assert.ok(Array.isArray(fixture.actions));
      } else assert.ok(['safe', 'unsafe'].includes(fixture.safety));
    }
    const completed = json(`progress/${id}/completed.json`);
    assert.equal(completed.provenance, 'UI-observed');
    assert.equal(JSON.parse(completed.raw).completed.length, { opening: 7, middle: 8, final: 9 }[id]);
  }
});

test('server mounts, MIME, isolated pinned replay, allowlist, traversal and lifecycle', async () => {
  const server = await startServer();
  const request = path => new Promise((resolve, reject) => {
    http.get(`${server.url}${path}`, res => { const chunks = []; res.on('data', c => chunks.push(c)); res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks) })); }).on('error', reject);
  });
  try {
    for (const mount of ['/', '/discussion-skills-lab/', '/__original/', '/__original/discussion-skills-lab/']) {
      for (const path of productionPaths) {
        const result = await request(mount + path);
        const current = !mount.startsWith('/__original/');
        if (current && path === 'assets/js/lesson-core.js') {
          assert.equal(result.status, 404, 'retired production copy is not served'); continue;
        }
        assert.equal(result.status, 200, mount + path);
        const expected = current ? readFileSync(`${root}${path}`) : original(path);
        assert.deepEqual(result.body, expected);
        if (path.endsWith('.js')) assert.match(result.headers['content-type'], /^text\/javascript/);
      }
    }
    for (const mount of ['/', '/discussion-skills-lab/']) {
      for (const [path, payload, mime] of [
        ['assets/css/opening.css', readFileSync(`${root}assets/css/opening.css`, 'utf8'), 'text/css'],
        ['assets/js/opening.js', readFileSync(`${root}assets/js/opening.js`, 'utf8'), 'text/javascript']
      ]) {
        const result = await request(mount + path);
        assert.equal(result.status, 200);
        assert.equal(result.body.toString(), payload);
        assert.ok(result.headers['content-type'].startsWith(mime));
      }
    }
    assert.equal((await request('/__fixtures/legacy-maps/opening.json')).status, 200);
    assert.equal((await request('/final-harness.html')).status, 404);
    assert.equal((await request('/discussion-skills-lab/final-harness.html')).status, 404);
    assert.equal((await request('/middle-harness.html')).status, 404);
    assert.equal((await request('/discussion-skills-lab/middle-harness.html')).status, 404);
    for (const path of ['/../LICENSE', '/%2e%2e/LICENSE', '/__original/%2e%2e/LICENSE', '/assets%5c..%5cLICENSE', '/%252e%252e/LICENSE', '/%00', '/%zz']) {
      // Supply raw request path; URL parsers otherwise normalize traversal before send.
      const status = await new Promise(resolve => http.get({ hostname: '127.0.0.1', port: new URL(server.url).port, path }, res => { res.resume(); resolve(res.statusCode); }));
      assert.equal(status, 400, path);
    }
    for (const path of ['/package.json', '/.git/config', '/__original/package.json', '/discussion-skills-lab', '/missing.css']) assert.equal((await request(path)).status, 404);
  } finally { await server.close(); }
  await assert.rejects(fetch(server.url));
});
