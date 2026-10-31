import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveContentUrl, loadJson, loadMarkdown } from '../../assets/js/app/content-loader.js';
import { startServer } from '../helpers/static-server.mjs';

for (const prefix of ['/', '/discussion-skills-lab/']) test(`${prefix} root and nested relative URLs are root-contained`, () => {
  const html = `https://example.org${prefix}final.html`;
  const root = new URL('content/', html);
  const json = resolveContentUrl('content/final/reference/reference.json', html, root);
  assert.equal(json.href, `${root}final/reference/reference.json`);
  assert.equal(resolveContentUrl('summary-synthesis.md', json, root).href, `${root}final/reference/summary-synthesis.md`);
  assert.equal(resolveContentUrl('../shared.md', json, root).href, `${root}final/shared.md`);
  for (const input of ['https://evil.invalid/x.md', 'https://example.org/content/x.md', '//evil.invalid/x.md', '/content/x.md', 'javascript:alert(1)', 'data:text/plain,x', 'a.md?x', 'a.md#x', '../../../outside.md', '../..//outside.md', '%2e%2e/x.md', '%252e%252e/x.md', '..%2fx.md', '..\\x.md', 'a%00.md', 'a%3fb.md', 'a%23b.md', 'a b.md', '', 'a\n.md']) {
    assert.throws(() => resolveContentUrl(input, json, root), input);
  }
  assert.throws(() => resolveContentUrl('x.md', 'https://foreign.invalid/reference.json', root));
  assert.throws(() => resolveContentUrl('x.md', json, 'javascript:bad'));
  assert.throws(() => resolveContentUrl('x.md', json, `${root}?trick`));
});

test('loaders check status, parse, validation, abort, read failure and retry; do not echo response data', async () => {
  const server = await startServer();
  try {
    const url = new URL('/content/final/reference/reference.json', server.url);
    let calls = 0;
    assert.equal((await loadJson(url, { validate: () => { calls++; return true; } })).items.length, 5);
    assert.equal(calls, 1);
    await assert.rejects(loadJson(url, { validate: () => false }), /reference.json: document validation failed/);
    await assert.rejects(loadJson(url, { validate: () => { throw Error('student-secret'); } }), error => !error.message.includes('student-secret'));
    await assert.rejects(loadJson(url), /validator required/);
    await assert.rejects(loadJson(new URL('/content/final/reference/after-round.md', server.url), { validate: () => true }), /invalid JSON/);
    await assert.rejects(loadMarkdown(new URL('/content/missing.md', server.url)), /HTTP 404/);
    await assert.rejects(loadMarkdown(url, { signal: AbortSignal.abort() }), /network failure or request aborted/);
    assert.match(await loadMarkdown(new URL('/content/final/reference/after-round.md', server.url)), /Gather belongings/);
    await assert.rejects(loadMarkdown('data:text/plain,student-secret'), /Unsafe content URL/);
    const originalFetch = globalThis.fetch;
    try {
      globalThis.fetch = async () => ({ ok: true, text: async () => { throw Error('student-secret'); } });
      await assert.rejects(loadMarkdown(url), /response read failure/);
    } finally { globalThis.fetch = originalFetch; }
  } finally { await server.close(); }
  await assert.rejects(loadMarkdown(new URL('/content/final/reference/after-round.md', server.url)), /network failure/);
});
