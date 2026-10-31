import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { original } from '../helpers/baseline-source.mjs';
import { validateReferenceDocument } from '../../assets/js/app/content-validation.js';
import { validateReference } from '../../scripts/validate-content.mjs';
import { candidateFor } from '../fixtures/security/reference-candidate.mjs';

const json = path => JSON.parse(readFileSync(new URL(path, import.meta.url)));
const data = json('../../content/middle/reference/reference.json');
const context = { declaringUrl: 'https://example.org/content/middle/reference/reference.json', allowedRootUrl: 'https://example.org/content/' };

test('Middle reference profile passes both boundaries; every shared invalid reference fixture still fails', () => {
  assert.equal(validateReferenceDocument(data, context), true);
  assert.deepEqual(validateReference(data, context), []);
  for (const fixture of json('../fixtures/security/reference-cases.json')) {
    const candidate = candidateFor(data, fixture);
    // This frozen fixture names Final's original document ID literally. Apply
    // the same duplicate-document condition to Middle without rewriting it.
    if (fixture.name === 'duplicate document id') candidate.items[0].id = data.id;
    assert.throws(() => validateReferenceDocument(candidate, context), fixture.name);
    assert.ok(validateReference(candidate, context).length, fixture.name);
  }
});

test('Middle displayed reference extraction exactly preserves headings, list order and strong emphasis, not the unused referenceText', () => {
  const source = original('middle.html').toString();
  assert.equal(data.layout, 'middle-reference');
  assert.equal(data.title, source.match(/<h2 id="reference-title">([^<]+)<\/h2>/)[1]);
  const items = [...source.matchAll(/<section class="reference-box middle-reference-item middle-reference-item-\d">([\s\S]*?)<\/section>/g)];
  assert.equal(items.length, 5); assert.equal(data.items.length, items.length);
  data.items.forEach((item, index) => {
    const html = items[index][1];
    assert.equal(item.number, html.match(/class="middle-reference-number">([^<]+)<\/span>/)[1]);
    assert.equal(item.title, html.match(/class="middle-reference-label">([^<]+)<\/span>/)[1]);
    const expected = [...html.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(match => match[1].replace(/<strong>(.*?)<\/strong>/g, '**$1**').trim());
    const markdown = readFileSync(new URL(`../../content/middle/reference/${item.source}`, import.meta.url), 'utf8');
    assert.deepEqual(markdown.trim().split('\n'), expected.map(value => `- ${value}`));
  });
  assert.ok(!data.items.some(item => item.source.includes('legacy')));
});
