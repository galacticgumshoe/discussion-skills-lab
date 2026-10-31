import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, mkdir, writeFile, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validateReferenceDocument } from '../../assets/js/app/content-validation.js';
import { validateReference, validateContent } from '../../scripts/validate-content.mjs';
import { candidateFor } from '../fixtures/security/reference-candidate.mjs';
import { createHash } from 'node:crypto';

const base = JSON.parse(await readFile(new URL('../../content/final/reference/reference.json', import.meta.url)));
const fixtures = JSON.parse(await readFile(new URL('../fixtures/security/reference-cases.json', import.meta.url)));
const context = { declaringUrl: 'https://example.org/content/final/reference/reference.json', allowedRootUrl: 'https://example.org/content/' };

test('vendored distributions and original licenses match the documented SHA-256 pins', async () => {
  const notices = await readFile(new URL('../../THIRD_PARTY_NOTICES.md', import.meta.url), 'utf8');
  const entries = [...notices.matchAll(/^([0-9a-f]{64})  (assets\/vendor\/[^\n]+)$/gm)];
  assert.equal(entries.length, 12);
  for (const [, expected, path] of entries) {
    assert.equal(createHash('sha256').update(await readFile(new URL('../../' + path, import.meta.url))).digest('hex'), expected, path);
  }
});

test('production reference passes full development and runtime validation', async () => {
  assert.equal(validateReferenceDocument(base, context), true);
  assert.deepEqual(validateReference(base, context), []);
  assert.deepEqual(await validateContent(), []);
});

for (const fixture of fixtures) test(`runtime/schema agree: ${fixture.name}`, () => {
  const candidate = candidateFor(base, fixture);
  assert.throws(() => validateReferenceDocument(candidate, context));
  assert.ok(validateReference(candidate, context).length);
});

test('development validator reports every invalid file and missing/escaping source without rewriting', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'dsl-content-'));
  const root = join(directory, 'content');
  await mkdir(join(root, 'nested'), { recursive: true });
  await writeFile(join(root, 'broken.json'), '{');
  await writeFile(join(root, 'shape.json'), '{"unknown":true}');
  const data = { ...base, items: [base.items[0], { ...base.items[1], source: 'escape.md' }] };
  const text = JSON.stringify(data);
  await writeFile(join(root, 'nested/reference.json'), text);
  await writeFile(join(directory, 'outside.md'), 'not content');
  await symlink(join(directory, 'outside.md'), join(root, 'nested/escape.md'));
  const errors = await validateContent(root);
  assert.ok(errors.some(error => error.includes('broken.json: invalid JSON')));
  assert.ok(errors.some(error => error.includes('shape.json')));
  assert.equal(errors.filter(error => error.includes('missing file or unsafe resolved path')).length, 2);
  assert.equal(await readFile(join(root, 'nested/reference.json'), 'utf8'), text);
});
